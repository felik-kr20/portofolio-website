import { NextRequest, NextResponse } from 'next/server';
import { recordView, recordClick } from '@/lib/analytics-store';
import { getEnvFromHost } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type } = body;
    const env = getEnvFromHost(req.headers.get('host'));

    if (type === 'view') {
      await recordView(env);
    } else if (type === 'click' && body.target) {
      await recordClick(body.target as 'email' | 'whatsapp' | 'address' | 'instagram' | 'linkedin', env);
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Track error:', err);
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
