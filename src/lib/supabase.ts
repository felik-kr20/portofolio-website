import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? '';

if (!supabaseUrl || !supabaseKey) {
  console.error(
    '[Supabase] Missing environment variables: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY. ' +
    'Analytics will not work. Set these in Vercel Dashboard → Settings → Environment Variables.'
  );
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseKey || 'placeholder-key'
);

// Deteksi environment dari host header request
// Tidak perlu env var — lokal = localhost, live = domain asli
export function getEnvFromHost(host: string | null): 'development' | 'production' {
  if (!host) return 'production';
  const h = host.split(':')[0]; // hapus port
  if (h === 'localhost' || h === '127.0.0.1' || h.startsWith('192.168.')) {
    return 'development';
  }
  return 'production';
}

// Fallback untuk kode lama yang masih pakai getEnv() tanpa req
export function getEnv(): 'development' | 'production' {
  if (process.env.APP_ENV === 'production') return 'production';
  if (process.env.APP_ENV === 'development') return 'development';
  if (process.env.NODE_ENV !== 'production') return 'development';
  return 'production';
}
