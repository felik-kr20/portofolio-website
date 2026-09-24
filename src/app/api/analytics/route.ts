import { NextRequest, NextResponse } from 'next/server';
import { getViews, getClicks, getLast7DaysViews } from '@/lib/analytics-store';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const from = searchParams.get('from') ?? new Date(Date.now() - 29 * 86400000).toISOString().slice(0, 10);
  const to   = searchParams.get('to')   ?? new Date().toISOString().slice(0, 10);

  const [views, clicks, last7] = await Promise.all([
    getViews(from, to),
    getClicks(from, to),
    getLast7DaysViews(),
  ]);

  const totalViews = views.reduce((s, v) => s + v.count, 0);
  const days       = Math.max(1, Math.ceil((new Date(to).getTime() - new Date(from).getTime()) / 86400000) + 1);
  const avgViews   = Math.round((totalViews / days) * 10) / 10;

  const totalClicks = {
    email:     clicks.reduce((s, c) => s + c.email, 0),
    whatsapp:  clicks.reduce((s, c) => s + c.whatsapp, 0),
    address:   clicks.reduce((s, c) => s + c.address, 0),
    instagram: clicks.reduce((s, c) => s + c.instagram, 0),
    linkedin:  clicks.reduce((s, c) => s + c.linkedin, 0),
  };

  return NextResponse.json({ views, clicks, last7, totalViews, avgViews, totalClicks, from, to });
}
