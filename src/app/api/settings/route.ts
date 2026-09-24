import { NextRequest, NextResponse } from 'next/server';
import { getSetting, setSetting } from '@/lib/analytics-store';

// In-memory fallback jika Supabase belum siap
const memoryStore: Record<string, string> = {
  open_to_opportunities: 'true',
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get('key');
  if (!key) return NextResponse.json({ error: 'key required' }, { status: 400 });

  try {
    const value = await getSetting(key);
    // Update memory fallback
    if (value !== null) memoryStore[key] = value;
    return NextResponse.json({ key, value: value ?? memoryStore[key] ?? 'false' });
  } catch {
    return NextResponse.json({ key, value: memoryStore[key] ?? 'false' });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { key, value } = body;
  if (!key || value === undefined) return NextResponse.json({ error: 'key and value required' }, { status: 400 });

  // Update memory fallback dulu (instant response)
  memoryStore[key] = String(value);

  try {
    await setSetting(key, String(value));
    return NextResponse.json({ ok: true });
  } catch {
    // Memory sudah diupdate, return ok agar UI tetap berfungsi
    return NextResponse.json({ ok: true, note: 'saved in memory only' });
  }
}
