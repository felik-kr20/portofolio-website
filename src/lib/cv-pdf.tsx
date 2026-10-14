import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

// ─── Data ─────────────────────────────────────────────────────────────────────
const softSkills = [
  'Manajemen waktu dan penentuan prioritas kerja',
  'Komunikasi efektif dengan user, client, dan tim',
  'Teamwork dan kolaborasi lintas divisi',
  'Problem solving dan analytical thinking',
  'Tanggung jawab dan disiplin kerja',
  'Adaptif terhadap teknologi dan sistem baru',
  'Teliti dalam testing dan troubleshooting',
  'Customer service oriented',
  'Mampu bekerja di bawah tekanan dan sistem standby',
];

const hardSkills = [
  'IT Support & Technical Support',
  'Troubleshooting hardware dan software',
  'Setup & konfigurasi PC, laptop, printer',
  'Testing & Quality Assurance aplikasi',
  'HRMS, POS/Kasir, TMS, Website System',
  'Project handling & PIC aplikasi',
  'Networking (LAN, WAN, Routing & Switching dasar)',
  'Linux Server (basic administration)',
  'Security Software (Carbon Black EDR)',
  'Monitoring Host to Host',
  'Instalasi UMPC',
  'Microsoft Word & Excel (reporting & dokumentasi)',
  'CCTV installation & basic maintenance',
];

const certifications = [
  {
    issuer: 'Balai Pelatihan dan Pengembangan Teknologi Informasi dan Komunikasi',
    items: [{ name: 'Skema Teknisi Utama Jaringan Komputer', date: '2-4 Mei 2018' }],
  },
  {
    issuer: 'Cisco Networking Academy',
    items: [
      { name: 'CCNA: Introduction to Network', date: '3 Agustus 2018' },
      { name: 'CCNA: Routing and Switching Essentials', date: '6 Februari 2019' },
      { name: 'CCNA Security', date: '18 Agustus 2020' },
    ],
  },
];

const experiences = [
  {
    title: 'IT Service Staff',
    company: 'PT Sentra Inovasi Solusindo',
    period: 'Oktober 2023 - April 2027',
    items: [
      'Memberikan dukungan teknis untuk perangkat PC, laptop, dan printer',
      'Menyiapkan dan konfigurasi perangkat pendukung operasional kerja',
      'Testing dan QA aplikasi Kasir, HRMS, TMS, dan aplikasi Sales',
      'Setup & PIC aplikasi HRMS untuk PT Thai Makmur dan PT Tri Boga Abadi',
      'Setup aplikasi kasir (Vireo POS) dan training kepada customer/client',
      'PIC Project TMS (Tracking Management System) di PT Dino Logistics Perkasa',
      'PIC Project Petty Cash System di PT Dino Logistics Perkasa',
      'PIC Project Website System di PT Dino Logistics Perkasa',
      'Testing aplikasi Visualization Sequence Stacking for Big Part (PT Toyota)',
      'PIC Project platform Messaging Channel',
      'PIC Project platform Bonusmu.id untuk PT Bintang Mahameru Utama',
      'Standby Call Center dan Host to Host monitoring dan support sistem',
    ],
  },
  {
    title: 'IT Staff',
    company: 'PT Leader IT Service Solutions',
    period: 'Januari 2023 - Juli 2023',
    items: [
      'Bertugas di area pertambangan batu bara KPC Kalimantan Timur',
      'Melakukan instalasi UMPC pada unit kendaraan berat',
      'Pengecekan perangkat secara berkala',
      'Troubleshooting kendala pada perangkat',
    ],
  },
  {
    title: 'IT Support',
    company: 'PT Lintas Teknologi Indonesia',
    period: 'Juni 2021 - Oktober 2021',
    items: [
      'IT Support di PT Lintas Teknologi Indonesia',
      'Implementasi security software Carbon Black EDR pada perangkat PT Telkomsel',
      'Membuat laporan pekerjaan harian tim IT',
    ],
  },
  {
    title: 'Magang',
    company: 'Kementerian Perindustrian',
    period: 'Agustus 2019 - September 2019',
    items: [
      'Dukungan administratif dan operasional kantor',
      'Pengecekan serta input data ke dalam database',
    ],
  },
];

// ─── Helper: draw text with word-wrap returning new Y ─────────────────────────
function drawWrapped(
  page: ReturnType<PDFDocument['addPage']>,
  text: string,
  x: number, y: number,
  maxWidth: number, fontSize: number,
  font: Awaited<ReturnType<PDFDocument['embedFont']>>,
  color = rgb(0.13, 0.13, 0.13),
  lineHeight = 1.45,
): number {
  const words = text.split(' ');
  let line = '';
  let curY = y;
  const lh = fontSize * lineHeight;
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    const w = font.widthOfTextAtSize(test, fontSize);
    if (w > maxWidth && line) {
      page.drawText(line, { x, y: curY, size: fontSize, font, color });
      curY -= lh;
      line = word;
    } else {
      line = test;
    }
  }
  if (line) {
    page.drawText(line, { x, y: curY, size: fontSize, font, color });
    curY -= lh;
  }
  return curY;
}

// ─── Main generator ───────────────────────────────────────────────────────────
export async function generateCVPdf(): Promise<Uint8Array> {
  const doc   = await PDFDocument.create();
  const bold  = await doc.embedFont(StandardFonts.HelveticaBold);
  const reg   = await doc.embedFont(StandardFonts.Helvetica);

  const W = 595.28; // A4 width pt
  const H = 841.89; // A4 height pt
  const ML = 48, MR = 48, MT = 40, MB = 40;
  const TW = W - ML - MR; // text width

  let page = doc.addPage([W, H]);
  let y = H - MT;

  const black  = rgb(0.07, 0.07, 0.07);
  const gray   = rgb(0.4, 0.4, 0.4);
  const lgray  = rgb(0.6, 0.6, 0.6);
  const indigo = rgb(0.31, 0.27, 0.9);

  // ensure new page when needed
  const ensurePage = (needed: number) => {
    if (y - needed < MB) {
      page = doc.addPage([W, H]);
      y = H - MT;
    }
  };

  // section title helper
  const drawSection = (title: string) => {
    ensurePage(24);
    y -= 8;
    page.drawText(title, { x: ML, y, size: 9, font: bold, color: black });
    y -= 4;
    page.drawLine({ start: { x: ML, y }, end: { x: W - MR, y }, thickness: 0.8, color: rgb(0.2,0.2,0.2) });
    y -= 7;
  };

  // ── HEADER ──
  const nameW = bold.widthOfTextAtSize('FELIK KRISWANTO', 16);
  page.drawText('FELIK KRISWANTO', { x: (W - nameW) / 2, y, size: 16, font: bold, color: black });
  y -= 18;
  const titleStr = 'IT Support & Technical Support Specialist';
  const titleW = reg.widthOfTextAtSize(titleStr, 10);
  page.drawText(titleStr, { x: (W - titleW) / 2, y, size: 10, font: reg, color: gray });
  y -= 14;
  const contact = 'Felik103@gmail.com  |  +62 899-7671-236  |  Bekasi, Jawa Barat, Indonesia';
  const contactW = reg.widthOfTextAtSize(contact, 8.5);
  page.drawText(contact, { x: (W - contactW) / 2, y, size: 8.5, font: reg, color: lgray });
  y -= 14;

  // ── RINGKASAN PROFIL ──
  drawSection('RINGKASAN PROFIL');
  const summary = 'Profesional IT Support dengan pengalaman lebih dari 4 tahun sebagai IT Service Staff dan IT Support, dengan keahlian dalam technical support, implementasi sistem, testing aplikasi, serta penanganan project seperti HRMS, POS/Kasir, TMS, dan Website System. Lulusan S1 Teknik Informatika (Networking) STMIK Nusa Mandiri Jakarta IPK 3,61. Pribadi yang jujur, teliti, bertanggung jawab, komunikatif, dan adaptif.';
  y = drawWrapped(page, summary, ML, y, TW, 8.5, reg, black);
  y -= 2;

  // ── PENGALAMAN KERJA ──
  drawSection('PENGALAMAN KERJA');
  for (const exp of experiences) {
    ensurePage(30);
    const jobLine = `${exp.title},  ${exp.company}`;
    const periodW = reg.widthOfTextAtSize(exp.period, 8);
    page.drawText(jobLine, { x: ML, y, size: 8.5, font: bold, color: black });
    page.drawText(exp.period, { x: W - MR - periodW, y, size: 8, font: reg, color: lgray });
    y -= 11;
    for (const item of exp.items) {
      ensurePage(12);
      page.drawText('•', { x: ML + 4, y, size: 8.5, font: reg, color: black });
      y = drawWrapped(page, item, ML + 14, y, TW - 14, 8.5, reg, black);
    }
    y -= 3;
  }

  // ── PENDIDIKAN ──
  drawSection('PENDIDIKAN');
  const edu = [
    { title: 'S1 Teknik Informatika (Networking),  STMIK Nusa Mandiri Jakarta', period: '2016-2020', note: 'IPK: 3,61' },
    { title: 'SMK Teknik Komputer dan Jaringan,  SMK Tinta Emas Indonesia', period: '2013-2016' },
    { title: 'SMP Negeri 10 Kota Bekasi', period: '2010-2013' },
    { title: 'SD Negeri Padurenan 1, Bekasi', period: '2004-2010' },
  ];
  for (const e of edu) {
    ensurePage(20);
    const pw = reg.widthOfTextAtSize(e.period, 8);
    page.drawText(e.title, { x: ML, y, size: 8.5, font: bold, color: black });
    page.drawText(e.period, { x: W - MR - pw, y, size: 8, font: reg, color: lgray });
    y -= 11;
    if (e.note) {
      page.drawText(e.note, { x: ML + 8, y, size: 8, font: reg, color: gray });
      y -= 11;
    }
  }
  y -= 2;

  // ── SERTIFIKASI ──
  drawSection('SERTIFIKASI');
  for (const group of certifications) {
    ensurePage(20);
    page.drawText(group.issuer, { x: ML, y, size: 8.5, font: bold, color: black });
    y -= 11;
    for (const item of group.items) {
      ensurePage(12);
      page.drawText('•', { x: ML + 4, y, size: 8.5, font: reg, color: black });
      page.drawText(`${item.name} — ${item.date}`, { x: ML + 14, y, size: 8.5, font: reg, color: black });
      y -= 11;
    }
    y -= 3;
  }

  // ── KETERAMPILAN ──
  drawSection('KETERAMPILAN');
  ensurePage(20);
  const colW = (TW - 20) / 2;
  page.drawText('Soft Skill', { x: ML, y, size: 9, font: bold, color: black });
  page.drawText('Hard Skill', { x: ML + colW + 20, y, size: 9, font: bold, color: black });
  y -= 12;

  const maxRows = Math.max(softSkills.length, hardSkills.length);
  for (let i = 0; i < maxRows; i++) {
    ensurePage(12);
    if (softSkills[i]) {
      page.drawText('•', { x: ML + 4, y, size: 8.5, font: reg, color: black });
      page.drawText(softSkills[i], { x: ML + 12, y, size: 8.5, font: reg, color: black });
    }
    if (hardSkills[i]) {
      page.drawText('•', { x: ML + colW + 24, y, size: 8.5, font: reg, color: black });
      const hw = hardSkills[i];
      page.drawText(hw.length > 38 ? hw.slice(0, 36) + '...' : hw, { x: ML + colW + 32, y, size: 8.5, font: reg, color: black });
    }
    y -= 12;
  }

  void indigo; // suppress unused warning
  const bytes = await doc.save();
  return bytes;
}