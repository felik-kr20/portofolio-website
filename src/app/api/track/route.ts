import { NextRequest, NextResponse } from 'next/server';
import { recordView, recordClick } from '@/lib/analytics-store';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type } = body;
    if (type === 'view') {
      await recordView();
    } else if (type === 'click' && body.target) {
      await recordClick(body.target as 'email' | 'whatsapp' | 'address' | 'instagram' | 'linkedin');
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Track error:', err);
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
