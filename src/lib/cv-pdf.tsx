import React from 'react';
import {
  Document, Page, Text, View, StyleSheet, Font,
} from '@react-pdf/renderer';

// ─── Styles ───────────────────────────────────────────────────────────────────
const S = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 9,
    color: '#111111',
    paddingTop: 36,
    paddingBottom: 36,
    paddingLeft: 48,
    paddingRight: 48,
    lineHeight: 1.4,
  },
  // Header
  headerName: { fontSize: 16, fontFamily: 'Helvetica-Bold', letterSpacing: 1, textAlign: 'center', marginBottom: 3 },
  headerTitle: { fontSize: 10, textAlign: 'center', color: '#333', marginBottom: 4 },
  headerContact: { fontSize: 8.5, textAlign: 'center', color: '#444', marginBottom: 10 },
  // Section
  sectionTitle: { fontSize: 9.5, fontFamily: 'Helvetica-Bold', letterSpacing: 0.8, color: '#111', marginBottom: 2, marginTop: 10, textTransform: 'uppercase' },
  divider: { borderBottomWidth: 1, borderBottomColor: '#333', marginBottom: 6 },
  // Job
  jobRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 1 },
  jobTitle: { fontFamily: 'Helvetica-Bold', fontSize: 9 },
  jobCompany: { fontSize: 9, color: '#222' },
  jobPeriod: { fontSize: 8.5, color: '#555', textAlign: 'right' },
  bullet: { flexDirection: 'row', marginBottom: 1.5, paddingLeft: 8 },
  bulletDot: { width: 10, fontSize: 9 },
  bulletText: { flex: 1, fontSize: 8.5, color: '#222', lineHeight: 1.4 },
  // Skills
  twoCol: { flexDirection: 'row', gap: 20 },
  colHalf: { flex: 1 },
  skillLabel: { fontFamily: 'Helvetica-Bold', fontSize: 9.5, marginBottom: 4 },
  skillItem: { fontSize: 8.5, color: '#333', marginBottom: 2, flexDirection: 'row' },
  // Cert
  certIssuer: { fontFamily: 'Helvetica-Bold', fontSize: 8.5, color: '#333', marginBottom: 1.5 },
  certItem: { fontSize: 8.5, color: '#222', marginBottom: 1, paddingLeft: 8 },
  certDate: { color: '#666' },
  // Education
  gpa: { fontSize: 8.5, color: '#444', paddingLeft: 0, marginTop: -1, marginBottom: 3 },
  // Summary
  summaryText: { fontSize: 8.5, color: '#222', lineHeight: 1.6 },
});

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
    period: 'Oktober 2023 - April 2027',
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
    period: 'Januari 2023 - Juli 2023',
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
    period: 'Juni 2021 - Oktober 2021',
    items: [
      'Bertugas sebagai IT Support di PT Lintas Teknologi Indonesia',
      'Melakukan implementasi security software Carbon Black EDR (APP/CTR) pada perangkat PT Telkomsel',
      'Membuat laporan pekerjaan harian tim IT',
    ],
  },
  {
    title: 'Magang',
    company: 'Kementerian Perindustrian',
    period: 'Agustus 2019 - September 2019',
    items: [
      'Memberikan dukungan administratif dan operasional kantor',
      'Melakukan pengecekan serta input data ke dalam database',
    ],
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
export function CVDocument() {
  return (
    <Document title="CV Felik Kriswanto" author="Felik Kriswanto">
      <Page size="A4" style={S.page}>

        {/* Header */}
        <Text style={S.headerName}>FELIK KRISWANTO</Text>
        <Text style={S.headerTitle}>IT Support &amp; Technical Support Specialist</Text>
        <Text style={S.headerContact}>
          Felik103@gmail.com  |  +62 899-7671-236  |  Bekasi, Jawa Barat, Indonesia
        </Text>

        {/* Ringkasan Profil */}
        <Text style={S.sectionTitle}>RINGKASAN PROFIL</Text>
        <View style={S.divider} />
        <Text style={S.summaryText}>
          Profesional IT Support dengan pengalaman lebih dari 4 tahun di bidang IT sebagai IT Service Staff dan IT Support,
          dengan keahlian dalam technical support, implementasi sistem, testing aplikasi, serta penanganan project aplikasi
          seperti HRMS, POS/Kasir, TMS, dan Website System. Berpengalaman sebagai PIC project dan aplikasi, melakukan
          troubleshooting perangkat dan sistem, serta memberikan training kepada user dan client. Lulusan S1 Teknik Informatika
          konsentrasi Networking dari STMIK Nusa Mandiri Jakarta dengan IPK 3,61. Pribadi yang jujur, teliti, bertanggung jawab,
          komunikatif, dan adaptif terhadap teknologi baru.
        </Text>

        {/* Pengalaman Kerja */}
        <Text style={S.sectionTitle}>PENGALAMAN KERJA</Text>
        <View style={S.divider} />
        {experiences.map((exp, i) => (
          <View key={i} style={{ marginBottom: 8 }}>
            <View style={S.jobRow}>
              <View style={{ flex: 1 }}>
                <Text>
                  <Text style={S.jobTitle}>{exp.title}, </Text>
                  <Text style={S.jobCompany}>{exp.company}</Text>
                </Text>
              </View>
              <Text style={S.jobPeriod}>{exp.period}</Text>
            </View>
            {exp.items.map((item, j) => (
              <View key={j} style={S.bullet}>
                <Text style={S.bulletDot}>•</Text>
                <Text style={S.bulletText}>{item}</Text>
              </View>
            ))}
          </View>
        ))}

        {/* Pendidikan */}
        <Text style={S.sectionTitle}>PENDIDIKAN</Text>
        <View style={S.divider} />
        {[
          { title: 'S1 Teknik Informatika (Networking)', company: 'STMIK Nusa Mandiri Jakarta', period: '2016-2020', gpa: 'IPK: 3,61' },
          { title: 'SMK Teknik Komputer dan Jaringan', company: 'SMK Tinta Emas Indonesia', period: '2013-2016' },
          { title: 'SMP Negeri 10 Kota Bekasi', company: 'Kota Bekasi, Jawa Barat', period: '2010-2013' },
          { title: 'SD Negeri Padurenan 1', company: 'Bekasi, Jawa Barat', period: '2004-2010' },
        ].map((edu, i) => (
          <View key={i} style={{ marginBottom: 4 }}>
            <View style={S.jobRow}>
              <Text>
                <Text style={S.jobTitle}>{edu.title}, </Text>
                <Text style={S.jobCompany}>{edu.company}</Text>
              </Text>
              <Text style={S.jobPeriod}>{edu.period}</Text>
            </View>
            {edu.gpa && <Text style={S.gpa}>  {edu.gpa}</Text>}
          </View>
        ))}

        {/* Sertifikasi */}
        <Text style={S.sectionTitle}>SERTIFIKASI</Text>
        <View style={S.divider} />
        {certifications.map((group, i) => (
          <View key={i} style={{ marginBottom: 6 }}>
            <Text style={S.certIssuer}>{group.issuer}</Text>
            {group.items.map((item, j) => (
              <Text key={j} style={S.certItem}>
                {item.name} <Text style={S.certDate}>— {item.date}</Text>
              </Text>
            ))}
          </View>
        ))}

        {/* Keterampilan */}
        <Text style={S.sectionTitle}>KETERAMPILAN</Text>
        <View style={S.divider} />
        <View style={S.twoCol}>
          <View style={S.colHalf}>
            <Text style={S.skillLabel}>Soft Skill</Text>
            {softSkills.map((s, i) => (
              <View key={i} style={S.bullet}>
                <Text style={S.bulletDot}>•</Text>
                <Text style={S.bulletText}>{s}</Text>
              </View>
            ))}
          </View>
          <View style={S.colHalf}>
            <Text style={S.skillLabel}>Hard Skill</Text>
            {hardSkills.map((s, i) => (
              <View key={i} style={S.bullet}>
                <Text style={S.bulletDot}>•</Text>
                <Text style={S.bulletText}>{s}</Text>
              </View>
            ))}
          </View>
        </View>

      </Page>
    </Document>
  );
}
