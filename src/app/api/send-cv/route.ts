import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { generateCVPdf } from '@/lib/cv-pdf';
import { recordCVRequest } from '@/lib/analytics-store';
import { getEnvFromHost } from '@/lib/supabase';

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

    // 1. Save recruiter data to Supabase
    const env = getEnvFromHost(req.headers.get('host'));
    await recordCVRequest(nama, company, email, whatsapp ?? '', env);

    // 2. Generate PDF buffer using pdf-lib
    const pdfBytes = await generateCVPdf();

    // 3. Send email via Resend with PDF attachment
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: 'Felik Kriswanto <onboarding@resend.dev>',
      to: [email],
      subject: `CV Felik Kriswanto`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
          <p>Halo <strong>{nama}</strong> dari <strong>{company}</strong>,</p>
          <p>Terima kasih telah mengunjungi website portofolio saya.</p>
          <p>
            Sesuai permintaan Anda, CV saya terlampir dalam email ini untuk memberikan
            informasi lebih lanjut mengenai profil profesional, pengalaman kerja, dan keahlian saya.
          </p>
          <p>
            Untuk melihat informasi lainnya, kunjungi juga website portofolio saya:<br/>
            <a href="https://felik-kr20.vercel.app" style="color: #4f46e5;">https://felik-kr20.vercel.app</a>
          </p>
          <p>Terima kasih atas waktu dan ketertarikan Anda.</p>
          <br/>
          <p>
            Salam,<br/>
            <strong>Felik Kriswanto</strong><br/>
            IT Support &amp; Technical Support Specialist<br/>
            <a href="mailto:felik103@gmail.com" style="color: #4f46e5;">felik103@gmail.com</a>
          </p>
        </div>
      `,
      attachments: [
        {
          filename: 'CV_Felik_Kriswanto.pdf',
          content: Buffer.from(pdfBytes),
        },
      ],
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ ok: false, error: String(error) }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('send-cv error:', err);
    const msg = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}