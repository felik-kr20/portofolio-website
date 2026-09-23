'use client';

import './cv.css';
import { Printer } from 'lucide-react';

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
    issuer: 'Balai Pelatihan dan Pengembangan Teknologi dan Komunikasi',
    items: [{ name: 'Skema Teknisi Utama Jaringan Komputer', date: '2-4 Mei 2018' }],
  },
  {
    issuer: 'Cisco Networking Academy',
    items: [
      { name: 'CCNA Routing and Switching Introduction to Network', date: '3 Agustus 2018' },
      { name: 'CCNA Routing and Switching Essentials', date: '6 Februari 2019' },
      { name: 'CCNA Security', date: '18 Agustus 2020' },
    ],
  },
];

const experiences = [
  {
    title: 'IT Service Staff',
    company: 'PT Sentra Inovasi Solusindo',
    period: 'Oktober 2023 – April 2027',
    items: [
      'Memberikan dukungan teknis (service) untuk perangkat PC, laptop, dan printer',
      'Menyiapkan dan melakukan konfigurasi perangkat pendukung operasional kerja',
      'Melakukan testing dan quality assurance aplikasi Kasir, HRMS, TMS, dan aplikasi Sales',
      'Melakukan setup serta menjadi PIC aplikasi HRMS untuk PT Thai Makmur dan PT Tri Boga Abadi',
      'Melakukan setup aplikasi kasir (Vireo POS) untuk customer UMKM dan memberikan training kepada customer/client',
      'Menjadi PIC Project aplikasi TMS (Tracking Management System) di PT Dino Logistics Perkasa',
      'Menjadi PIC Project aplikasi Petty Cash System di PT Dino Logistics Perkasa',
      'Menjadi PIC Project Website System di PT Dino Logistics Perkasa',
      'Melakukan testing dan implementasi proyek aplikasi Visualization Sequence Stacking for Big Part untuk PT Toyota',
      'Menjadi PIC Project aplikasi platform Messaging Channel',
      'Menjadi PIC Project aplikasi platform Bonusmu.id untuk PT Bintang Mahameru Utama',
      'Melakukan standby sebagai Call Center dan Host to Host untuk monitoring dan support sistem',
    ],
  },
  {
    title: 'IT Staff',
    company: 'PT Leader IT Service Solutions',
    period: 'Januari 2023 – Juli 2023',
    items: [
      'Bertugas di area pertambangan batu bara milik KPC Kalimantan Timur',
      'Melakukan instalasi UMPC pada unit kendaraan berat',
      'Melakukan pengecekan perangkat secara berkala',
      'Melakukan troubleshooting jika terjadi kendala pada perangkat',
    ],
  },
  {
    title: 'IT Support',
    company: 'PT Lintas Teknologi Indonesia',
    period: 'Juni 2021 – Oktober 2021',
    items: [
      'Bertugas sebagai IT Support di PT Lintas Teknologi Indonesia',
      'Melakukan implementasi security software Carbon Black EDR (APP/CTR) pada perangkat PT Telkomsel',
      'Membuat laporan pekerjaan harian tim IT',
    ],
  },
  {
    title: 'Magang',
    company: 'Kementerian Perindustrian',
    period: 'Agustus 2019 – September 2019',
    items: [
      'Memberikan dukungan administratif dan operasional kantor',
      'Melakukan pengecekan serta input data ke dalam database',
    ],
  },
];

export default function CVPage() {
  return (
    <>
      {/* ── Toolbar (hidden on print) ── */}
      <div className="no-print" style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'white', borderBottom: '1px solid #e2e8f0',
        padding: '10px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        boxShadow: '0 1px 8px rgba(0,0,0,0.08)',
      }}>
        <a href="/" style={{
          color: '#4f46e5', fontSize: '14px', fontWeight: 600,
          textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px',
        }}>
          &#8592; Kembali
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '13px', color: '#94a3b8' }}>
            Klik tombol &#8594; pilih <strong style={{ color: '#334155' }}>Save as PDF</strong>
          </span>
          <button
            onClick={() => window.print()}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '9px 20px', borderRadius: '10px', border: 'none',
              background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
              color: 'white', fontSize: '14px', fontWeight: 700,
              cursor: 'pointer', boxShadow: '0 4px 14px rgba(79,70,229,0.3)',
            }}
          >
            <Printer size={16} />
            Download / Print PDF
          </button>
        </div>
      </div>

      {/* ── Page wrapper ── */}
      <div style={{ paddingTop: '56px', paddingBottom: '32px', background: '#f0f0f0' }}
        className="no-print-pad">

        {/* ── CV Document ── */}
        <div className="cv-page" style={{
          boxShadow: '0 4px 32px rgba(0,0,0,0.12)',
          fontFamily: "'Calibri', 'Arial', sans-serif",
        }}>

          {/* ── HEADER ── */}
          <div style={{ textAlign: 'center', marginBottom: '10px' }}>
            <h1 style={{ fontSize: '17pt', fontWeight: 700, letterSpacing: '1px', color: '#111', marginBottom: '2px' }}>
              FELIK KRISWANTO
            </h1>
            <p style={{ fontSize: '11pt', fontWeight: 400, color: '#333', marginBottom: '6px' }}>
              IT Support &amp; Technical Support Specialist
            </p>
            <p style={{ fontSize: '9.5pt', color: '#444' }}>
              Felik103@gmail.com &nbsp;|&nbsp; +62 899-7671-236 &nbsp;|&nbsp; Bekasi, Jawa Barat, Indonesia
            </p>
          </div>

          {/* ── RINGKASAN PROFIL ── */}
          <div style={{ marginBottom: '10px' }}>
            <p className="section-title">RINGKASAN PROFIL</p>
            <hr className="section-divider" />
            <p style={{ fontSize: '10pt', color: '#222', lineHeight: 1.6 }}>
              Profesional IT Support dengan pengalaman lebih dari 4 tahun di bidang IT sebagai IT Service Staff dan IT Support,
              dengan keahlian dalam technical support, implementasi sistem, testing aplikasi, serta penanganan project aplikasi
              seperti HRMS, POS/Kasir, TMS, dan Website System. Berpengalaman sebagai PIC project dan aplikasi, melakukan
              troubleshooting perangkat dan sistem, serta memberikan training kepada user dan client. Lulusan S1 Teknik Informatika
              konsentrasi Networking dari STMIK Nusa Mandiri Jakarta dengan IPK 3,61. Pribadi yang jujur, teliti, bertanggung jawab,
              komunikatif, dan adaptif terhadap teknologi baru.
            </p>
          </div>

          {/* ── PENGALAMAN KERJA ── */}
          <div style={{ marginBottom: '10px' }}>
            <p className="section-title">PENGALAMAN KERJA</p>
            <hr className="section-divider" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
              {experiences.map((exp, i) => (
                <div key={i}>
                  <div className="job-header">
                    <div>
                      <span className="job-title">{exp.title}, </span>
                      <span className="job-company">{exp.company}</span>
                    </div>
                    <span className="job-period">{exp.period}</span>
                  </div>
                  <ul className="bullet-list">
                    {exp.items.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* ── PENDIDIKAN ── */}
          <div style={{ marginBottom: '10px' }}>
            <p className="section-title">PENDIDIKAN</p>
            <hr className="section-divider" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <div className="job-header">
                <div>
                  <span className="job-title">S1 Teknik Informatika (Networking), </span>
                  <span className="job-company">STMIK Nusa Mandiri Jakarta</span>
                </div>
                <span className="job-period">2016–2020</span>
              </div>
              <p style={{ fontSize: '9.5pt', color: '#444', paddingLeft: '0', marginTop: '-3px', marginBottom: '2px' }}>
                &#160;&#160;IPK: 3,61
              </p>
              <div className="job-header">
                <div>
                  <span className="job-title">SMK Teknik Komputer dan Jaringan, </span>
                  <span className="job-company">SMK Tinta Emas Indonesia</span>
                </div>
                <span className="job-period">2013–2016</span>
              </div>
              <div className="job-header">
                <div>
                  <span className="job-title">SMP Negeri 10 Kota Bekasi, </span>
                  <span className="job-company">Kota Bekasi, Jawa Barat</span>
                </div>
                <span className="job-period">2010–2013</span>
              </div>
              <div className="job-header">
                <div>
                  <span className="job-title">SD Negeri Padurenan 1, </span>
                  <span className="job-company">Bekasi, Jawa Barat</span>
                </div>
                <span className="job-period">2004–2010</span>
              </div>
            </div>
          </div>

          {/* ── SERTIFIKASI ── */}
          <div style={{ marginBottom: '10px' }}>
            <p className="section-title">SERTIFIKASI</p>
            <hr className="section-divider" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {certifications.map((group, i) => (
                <div key={i}>
                  <p className="cert-issuer">{group.issuer}</p>
                  {group.items.map((item, j) => (
                    <p key={j} className="cert-item">
                      {item.name} <span className="cert-date">— {item.date}</span>
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* ── KETERAMPILAN ── */}
          <div>
            <p className="section-title">KETERAMPILAN</p>
            <hr className="section-divider" />
            <div className="two-col">
              {/* Soft Skills */}
              <div>
                <p style={{ fontSize: '10.5pt', fontWeight: 700, color: '#111', marginBottom: '5px' }}>
                  Soft Skill
                </p>
                {softSkills.map((skill, i) => (
                  <p key={i} className="skill-item">{skill}</p>
                ))}
              </div>
              {/* Hard Skills */}
              <div>
                <p style={{ fontSize: '10.5pt', fontWeight: 700, color: '#111', marginBottom: '5px' }}>
                  Hard Skill
                </p>
                {hardSkills.map((skill, i) => (
                  <p key={i} className="skill-item">{skill}</p>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
