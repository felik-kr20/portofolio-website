import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { renderToBuffer } from '@react-pdf/renderer';
import { CVDocument } from '@/lib/cv-pdf';
import { recordCVRequest } from '@/lib/analytics-store';
import { getEnvFromHost } from '@/lib/supabase';
import React from 'react';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nama, company, email, whatsapp } = body as {
      nama: string; company: string; email: string; whatsapp?: string;
    };

    if (!nama || !company || !email) {
      return NextResponse.json({ ok: false, error: 'Missing required fields' }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey || apiKey.includes('xxxxxxx')) {
      return NextResponse.json({ ok: false, error: 'Email service not configured' }, { status: 500 });
    }

    // 1. Save to Supabase
    const env = getEnvFromHost(req.headers.get('host'));
    await recordCVRequest(nama, company, email, whatsapp ?? '', env);

    // 2. Generate PDF
    const pdfBuffer = await renderToBuffer(React.createElement(CVDocument));

    // 3. Send via Resend
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: 'Felik Kriswanto <onboarding@resend.dev>',
      to: [email],
      subject: 'CV Felik Kriswanto',
      html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#333"><p>Halo <strong></strong> dari <strong></strong>,</p><p>Terima kasih telah mengunjungi website portofolio saya.</p><p>Sesuai permintaan Anda, CV saya terlampir dalam email ini untuk memberikan informasi lebih lanjut mengenai profil profesional, pengalaman kerja, dan keahlian saya.</p><p>Untuk melihat informasi lainnya: <a href="https://felik-kr20.vercel.app" style="color:#4f46e5">https://felik-kr20.vercel.app</a></p><p>Terima kasih atas waktu dan ketertarikan Anda.</p><br/><p>Salam,<br/><strong>Felik Kriswanto</strong><br/>IT Support &amp; Technical Support Specialist<br/><a href="mailto:felik103@gmail.com">felik103@gmail.com</a></p></div>`,
      attachments: [{ filename: 'CV_Felik_Kriswanto.pdf', content: pdfBuffer }],
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ ok: false, error: String(error) }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('send-cv error:', err);
    return NextResponse.json({ ok: false, error: 'Internal server error' }, { status: 500 });
  }
}
