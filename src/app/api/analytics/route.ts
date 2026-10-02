import { NextRequest, NextResponse } from 'next/server';
import { getViews, getClicks, getLast7DaysViews } from '@/lib/analytics-store';

// Generate semua tanggal dalam range dengan count default 0
function fillDateRange(
  from: string,
  to: string,
  data: { date: string; count: number }[]
): { date: string; count: number }[] {
  const map = new Map(data.map(d => [d.date, d.count]));
  const result: { date: string; count: number }[] = [];

  const [fy, fm, fd] = from.split('-').map(Number);
  const [ty, tm, td] = to.split('-').map(Number);
  const start = new Date(fy, fm - 1, fd);
  const end   = new Date(ty, tm - 1, td);

  const cur = new Date(start);
  while (cur <= end) {
    const y = cur.getFullYear();
    const m = String(cur.getMonth() + 1).padStart(2, '0');
    const d = String(cur.getDate()).padStart(2, '0');
    const dateStr = `${y}-${m}-${d}`;
    result.push({ date: dateStr, count: map.get(dateStr) ?? 0 });
    cur.setDate(cur.getDate() + 1);
  }

  return result;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const from = searchParams.get('from') ?? (() => {
    const d = new Date(); d.setDate(d.getDate() - 29);
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  })();
  const to = searchParams.get('to') ?? (() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  })();

  const [rawViews, clicks, last7] = await Promise.all([
    getViews(from, to),
    getClicks(from, to),
    getLast7DaysViews(),
  ]);

  // Fill semua hari dalam range (hari tanpa data = 0)
  const views = fillDateRange(from, to, rawViews);

  const totalViews = views.reduce((s, v) => s + v.count, 0);
  const [fy, fm, fd] = from.split('-').map(Number);
  const [ty, tm, td] = to.split('-').map(Number);
  const msPerDay = 86400000;
  const diffDays = Math.round((new Date(ty, tm-1, td).getTime() - new Date(fy, fm-1, fd).getTime()) / msPerDay);
  const days     = Math.max(1, diffDays + 1);
  const avgViews = Math.round((totalViews / days) * 10) / 10;

  const totalClicks = {
    email:     clicks.reduce((s, c) => s + c.email, 0),
    whatsapp:  clicks.reduce((s, c) => s + c.whatsapp, 0),
    address:   clicks.reduce((s, c) => s + c.address, 0),
    instagram: clicks.reduce((s, c) => s + c.instagram, 0),
    linkedin:  clicks.reduce((s, c) => s + c.linkedin, 0),
  };

  return NextResponse.json({ views, clicks, last7, totalViews, avgViews, totalClicks, from, to });
}
