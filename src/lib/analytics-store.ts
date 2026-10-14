import { supabase } from './supabase';

export interface ViewEntry {
  date: string;
  count: number;
}

export interface ClickEntry {
  date: string;
  email: number;
  whatsapp: number;
  address: number;
  instagram: number;
  linkedin: number;
}

function today(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

export async function recordView(env: 'development' | 'production' = 'production'): Promise<void> {
  const date = today();
  const { data: existing } = await supabase
    .from('page_views').select('id, count').eq('date', date).eq('env', env).maybeSingle();
  if (existing) {
    await supabase.from('page_views')
      .update({ count: existing.count + 1, updated_at: new Date().toISOString() })
      .eq('id', existing.id);
  } else {
    await supabase.from('page_views').insert({ date, env, count: 1 });
  }
}

export async function recordClick(
  type: 'email' | 'whatsapp' | 'address' | 'instagram' | 'linkedin',
  env: 'development' | 'production' = 'production'
): Promise<void> {
  const date = today();
  const { data: existing } = await supabase
    .from('contact_clicks')
    .select('id, email, whatsapp, address, instagram, linkedin')
    .eq('date', date).eq('env', env).maybeSingle();
  if (existing) {
    await supabase.from('contact_clicks')
      .update({ [type]: (existing[type] as number) + 1, updated_at: new Date().toISOString() })
      .eq('id', existing.id);
  } else {
    const entry: Record<string, number | string> = { date, env, email: 0, whatsapp: 0, address: 0, instagram: 0, linkedin: 0 };
    entry[type] = 1;
    await supabase.from('contact_clicks').insert(entry);
  }
}

export async function getViews(from: string, to: string, env: 'development' | 'production' = 'production'): Promise<ViewEntry[]> {
  const { data } = await supabase.from('page_views')
    .select('date, count').eq('env', env)
    .gte('date', from).lte('date', to).order('date', { ascending: true });
  return (data ?? []).map(r => ({ date: r.date, count: r.count }));
}

export async function getClicks(from: string, to: string, env: 'development' | 'production' = 'production'): Promise<ClickEntry[]> {
  const { data } = await supabase.from('contact_clicks')
    .select('date, email, whatsapp, address, instagram, linkedin')
    .eq('env', env).gte('date', from).lte('date', to).order('date', { ascending: true });
  return (data ?? []).map(r => ({
    date: r.date, email: r.email ?? 0, whatsapp: r.whatsapp ?? 0,
    address: r.address ?? 0, instagram: r.instagram ?? 0, linkedin: r.linkedin ?? 0,
  }));
}

export async function getLast7DaysViews(env: 'development' | 'production' = 'production'): Promise<ViewEntry[]> {
  const from = (() => {
    const d = new Date(Date.now() - 6 * 86400000);
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  })();
  const to = today();
  const { data } = await supabase.from('page_views')
    .select('date, count').eq('env', env)
    .gte('date', from).lte('date', to).order('date', { ascending: true });
  const map = new Map((data ?? []).map(r => [r.date, r.count]));
  const result: ViewEntry[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400000);
    const dateStr = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    result.push({ date: dateStr, count: map.get(dateStr) ?? 0 });
  }
  return result;
}

// ── Site Settings ─────────────────────────────────────────────────────────────

const SETTING_DEFAULTS: Record<string, string> = {
  open_to_opportunities: 'true',
};

export async function getSetting(key: string): Promise<string> {
  const { data, error } = await supabase
    .from('site_settings').select('value').eq('key', key).maybeSingle();
  if (error || !data) {
    const defaultVal = SETTING_DEFAULTS[key] ?? 'false';
    try {
      await supabase.from('site_settings')
        .upsert({ key, value: defaultVal, updated_at: new Date().toISOString() }, { onConflict: 'key' });
    } catch { /* ignore */ }
    return defaultVal;
  }
  return data.value;
}

export async function setSetting(key: string, value: string): Promise<void> {
  const { error } = await supabase.from('site_settings')
    .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' });
  if (error) console.warn('setSetting warning:', error.message);
}

// ── CV Requests ───────────────────────────────────────────────────────────────

export interface CVRequestEntry {
  id: number;
  nama: string;
  company: string;
  email: string;
  whatsapp: string | null;
  env: string;
  created_at: string;
}

export async function recordCVRequest(
  nama: string,
  company: string,
  email: string,
  whatsapp: string,
  env: 'development' | 'production' = 'production'
): Promise<void> {
  const { error } = await supabase.from('cv_requests').insert({
    nama,
    company,
    email,
    whatsapp: whatsapp || null,
    env,
  });
  if (error) console.warn('recordCVRequest error:', error.message);
}

export async function getCVRequests(
  env: 'development' | 'production' = 'production',
  filters?: { search?: string; from?: string; to?: string }
): Promise<CVRequestEntry[]> {
  let query = supabase
    .from('cv_requests')
    .select('id, nama, company, email, whatsapp, env, created_at')
    .eq('env', env)
    .order('created_at', { ascending: false });

  if (filters?.from) query = query.gte('created_at', filters.from + 'T00:00:00.000Z');
  if (filters?.to)   query = query.lte('created_at', filters.to   + 'T23:59:59.999Z');

  const { data, error } = await query;
  if (error) {
    console.warn('getCVRequests error:', error.message);
    return [];
  }

  let result = (data ?? []) as CVRequestEntry[];

  // Client-side search across nama, company, email, whatsapp
  if (filters?.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(r =>
      r.nama.toLowerCase().includes(q) ||
      r.company.toLowerCase().includes(q) ||
      r.email.toLowerCase().includes(q) ||
      (r.whatsapp ?? '').toLowerCase().includes(q)
    );
  }

  return result;
}