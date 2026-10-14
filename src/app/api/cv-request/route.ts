import { NextRequest, NextResponse } from 'next/server';
import { recordCVRequest, getCVRequests } from '@/lib/analytics-store';
import { getEnvFromHost } from '@/lib/supabase';

// POST /api/cv-request
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nama, company, email, whatsapp } = body;
    if (!nama || !company || !email)
      return NextResponse.json({ ok: false, error: 'Missing required fields' }, { status: 400 });
    const env = getEnvFromHost(req.headers.get('host'));
    await recordCVRequest(nama, company, email, whatsapp ?? '', env);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('cv-request POST error:', err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

// GET /api/cv-request?env=&search=&from=&to=&page=&pageSize=
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const env      = (searchParams.get('env') === 'development' ? 'development' : 'production') as 'development' | 'production';
    const search   = searchParams.get('search') ?? '';
    const from     = searchParams.get('from') ?? '';
    const to       = searchParams.get('to') ?? '';
    const page     = Math.max(1, parseInt(searchParams.get('page') ?? '1'));
    const pageSize = parseInt(searchParams.get('pageSize') ?? '10');

    const data = await getCVRequests(env, { search, from, to });
    const total = data.length;
    const start = (page - 1) * pageSize;
    const paged = data.slice(start, start + pageSize);

    return NextResponse.json({ data: paged, total, page, pageSize });
  } catch (err) {
    console.error('cv-request GET error:', err);
    return NextResponse.json({ data: [], total: 0, page: 1, pageSize: 10 }, { status: 500 });
  }
}