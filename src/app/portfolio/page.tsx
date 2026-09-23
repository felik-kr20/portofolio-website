'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Tag, Sparkles, Briefcase,
  GraduationCap, Calendar, Award, Eye, FileText,
  MapPin, Building2,
} from 'lucide-react';
import Link from 'next/link';
import { portfolioData } from '@/data/portfolio';

// ─── Types ───────────────────────────────────────────────────────────────────
type Tab = 'projects' | 'experience' | 'skills' | 'education' | 'certifications';

const TABS: { key: Tab; label: string }[] = [
  { key: 'projects',       label: 'Proyek' },
  { key: 'experience',     label: 'Pengalaman' },
  { key: 'skills',         label: 'Keahlian' },
  { key: 'education',      label: 'Pendidikan' },
  { key: 'certifications', label: 'Sertifikasi' },
];

// ─── Skill level colors ───────────────────────────────────────────────────────
const levelColor: Record<string, string> = {
  advanced:     'rgba(0,200,255,0.15)',
  intermediate: 'rgba(129,140,248,0.12)',
  beginner:     'rgba(100,116,139,0.12)',
};
const levelBorder: Record<string, string> = {
  advanced:     'rgba(0,200,255,0.3)',
  intermediate: 'rgba(129,140,248,0.25)',
  beginner:     'rgba(100,116,139,0.2)',
};
const levelText: Record<string, string> = {
  advanced:     '#00c8ff',
  intermediate: '#818cf8',
  beginner:     '#64748b',
};

// ─── Project data (self-contained, NOT from portfolioData) ───────────────────
interface Project {
  id: string;
  title: string;
  client: string;
  category: string;
  description: string;
  role: string;
  technologies: string[];
  keyContribution: string;
  initials: string; // for SVG placeholder
  color: string;    // accent color for placeholder
}

const projects: Project[] = [
  {
    id: 'p-tms',
    title: 'Tracking Management System (TMS)',
    client: 'PT Dino Logistics Perkasa',
    category: 'Project Implementation',
    description: 'Implementasi sistem pelacakan manajemen logistik (TMS) untuk memantau pergerakan armada dan status pengiriman secara real-time. Sistem ini membantu tim operasional PT Dino Logistics Perkasa meningkatkan visibilitas dan efisiensi proses logistik.',
    role: 'Project PIC / IT Service Staff',
    technologies: ['TMS', 'Testing & QA', 'User Training', 'Documentation'],
    keyContribution: 'Bertanggung jawab penuh sebagai PIC project dari kick-off hingga go-live, termasuk koordinasi teknis, testing fungsional, dan pelatihan pengguna akhir.',
    initials: 'TMS',
    color: '#00c8ff',
  },
  {
    id: 'p-pcs',
    title: 'Petty Cash System',
    client: 'PT Dino Logistics Perkasa',
    category: 'Project Implementation',
    description: 'Implementasi sistem manajemen kas kecil (Petty Cash) berbasis web untuk mendigitalisasi pencatatan pengeluaran operasional harian. Menggantikan proses manual yang rentan kesalahan dengan sistem yang terstruktur dan mudah diaudit.',
    role: 'Project PIC / IT Service Staff',
    technologies: ['Petty Cash System', 'Testing & QA', 'User Training', 'Documentation'],
    keyContribution: 'Melakukan setup sistem, konfigurasi akun dan hak akses, serta memastikan seluruh pengguna dapat mengoperasikan sistem sesuai SOP yang ditetapkan.',
    initials: 'PCS',
    color: '#818cf8',
  },
  {
    id: 'p-web',
    title: 'Website System',
    client: 'PT Dino Logistics Perkasa',
    category: 'Project Implementation',
    description: 'Implementasi dan konfigurasi sistem website korporat PT Dino Logistics Perkasa yang mencakup halaman profil perusahaan, layanan, dan formulir kontak. Termasuk pengujian lintas browser dan pelatihan pengelolaan konten.',
    role: 'Project PIC / IT Service Staff',
    technologies: ['Website System', 'CMS', 'Testing & QA', 'Documentation'],
    keyContribution: 'Mengkoordinasikan proses setup, pengujian fungsional end-to-end, dan serah terima sistem kepada tim internal klien beserta dokumentasi teknis.',
    initials: 'WEB',
    color: '#10b981',
  },
  {
    id: 'p-hrms',
    title: 'Setup & Implementasi HRMS Enterprise',
    client: 'PT Thai Makmur & PT Tri Boga Abadi',
    category: 'Application Implementation',
    description: 'Setup dan implementasi sistem HRMS (Human Resource Management System) untuk dua klien enterprise. Sistem mencakup modul absensi, penggajian, dan manajemen karyawan yang terintegrasi.',
    role: 'Application PIC / IT Service Staff',
    technologies: ['HRMS', 'User Training', 'System Configuration', 'Documentation'],
    keyContribution: 'Setup HRMS dari awal hingga production-ready untuk dua perusahaan, melatih tim HR sehingga dapat mengoperasikan sistem secara mandiri.',
    initials: 'HRMS',
    color: '#f59e0b',
  },
  {
    id: 'p-edr',
    title: 'Implementasi Carbon Black EDR',
    client: 'PT Telkomsel',
    category: 'Security Implementation',
    description: 'Implementasi security software Carbon Black EDR (APP/CTR) pada perangkat-perangkat PT Telkomsel sebagai bagian dari proyek pengamanan endpoint perusahaan skala nasional.',
    role: 'IT Support',
    technologies: ['Carbon Black EDR', 'Endpoint Security', 'Windows', 'Reporting'],
    keyContribution: 'Mengeksekusi deployment EDR secara sistematis pada seluruh endpoint target, memastikan instalasi berjalan sesuai prosedur, dan membuat laporan progress harian.',
    initials: 'EDR',
    color: '#ef4444',
  },
  {
    id: 'p-umpc',
    title: 'Instalasi UMPC pada Kendaraan Berat',
    client: 'KPC Kalimantan Timur',
    category: 'Hardware Implementation',
    description: 'Instalasi dan maintenance perangkat UMPC (Unit Mikrocontroller Personal Computer) pada armada kendaraan berat di area pertambangan batu bara KPC Kalimantan Timur untuk mendukung sistem operasional lapangan.',
    role: 'IT Staff (Field Technician)',
    technologies: ['UMPC', 'Hardware Installation', 'Field Maintenance', 'Troubleshooting'],
    keyContribution: 'Instalasi UMPC langsung di lapangan pertambangan, pengecekan berkala, dan troubleshooting perangkat di kondisi operasional ekstrem.',
    initials: 'UMPC',
    color: '#6366f1',
  },
  {
    id: 'p-toyota',
    title: 'Visualization Sequence Stacking for Big Part',
    client: 'PT Toyota',
    category: 'System Implementation',
    description: 'Implementasi sistem visualisasi urutan stacking untuk komponen besar (big part) di lini produksi PT Toyota. Sistem ini membantu operator memahami dan mengikuti urutan penumpukan yang benar untuk meningkatkan efisiensi dan keselamatan di area produksi.',
    role: 'IT Support / Project Support',
    technologies: ['Visualization System', 'Testing & QA', 'User Training', 'Documentation'],
    keyContribution: 'Mendukung implementasi sistem, melakukan testing fungsional, dan memberikan pelatihan kepada operator lini produksi.',
    initials: 'VSS',
    color: '#e11d48',
  },
  {
    id: 'p-msgchannel',
    title: 'Messaging Channel',
    client: 'Multi-Client / SaaS Product (Open untuk semua bisnis)',
    category: 'Application Testing & Support',
    description: 'Aplikasi web SaaS untuk layanan berlangganan blast WhatsApp (WA Blast). Platform ini terbuka untuk semua bisnis — siapapun dapat mendaftar sebagai client dan menggunakan layanan blast WA secara terjadwal dan terstruktur.',
    role: 'IT Service Staff / QA Tester',
    technologies: ['Web Application', 'WhatsApp API', 'Testing & QA', 'User Support'],
    keyContribution: 'Melakukan testing fitur aplikasi, memastikan kualitas sebelum rilis, dan memberikan dukungan teknis kepada pengguna.',
    initials: 'MC',
    color: '#25d366',
  },
  {
    id: 'p-bonusmu',
    title: 'Bonusmu.id',
    client: 'PT Bintang Mahameru Utama',
    category: 'Application Implementation',
    description: 'Implementasi dan dukungan teknis untuk platform Bonusmu.id milik PT Bintang Mahameru Utama. Platform ini merupakan aplikasi manajemen program reward untuk customer setiap pembelian smartphone Samsung.',
    role: 'IT Service Staff / Application Support',
    technologies: ['Web Application', 'Testing & QA', 'User Training', 'Documentation'],
    keyContribution: 'Mendukung implementasi platform, melakukan testing end-to-end, dan memberikan pelatihan kepada pengguna.',
    initials: 'BMU',
    color: '#f97316',
  },
  {
    id: 'p-vireopos',
    title: 'Vireo POS',
    client: 'Internal Product / Customer Training',
    category: 'Application Testing & Training',
    description: 'Aplikasi Point of Sale (POS) berbasis software yang digunakan oleh berbagai customer UMKM. Sebagai IT Service Staff, wajib memahami sistem ini secara mendalam untuk keperluan training ke customer baru dan pengujian setiap update fitur terbaru. (Deskripsi sementara — akan diperbarui)',
    role: 'IT Service Staff / Trainer & QA Tester',
    technologies: ['POS System', 'Testing & QA', 'Customer Training', 'Feature Testing', 'Documentation'],
    keyContribution: 'Menguasai seluruh fitur aplikasi Vireo POS, melakukan regression testing pada setiap update, dan memberikan training langsung kepada customer UMKM sehingga dapat mengoperasikan POS secara mandiri.',
    initials: 'POS',
    color: '#8b5cf6',
  },
];

// ─── Education data ───────────────────────────────────────────────────────────
const educationItems = [
  {
    degree: 'S1 Teknik Informatika — Konsentrasi Networking',
    institution: 'STMIK Nusa Mandiri Jakarta',
    period: '2016 – 2020',
    detail: 'IPK: 3,61',
  },
  {
    degree: 'SMK Teknik Komputer dan Jaringan',
    institution: 'SMK Tinta Emas Indonesia',
    period: '2013 – 2016',
    detail: '',
  },
  {
    degree: 'SMP Negeri 10 Kota Bekasi',
    institution: 'Kota Bekasi, Jawa Barat',
    period: '2010 – 2013',
    detail: '',
  },
  {
    degree: 'SD Negeri Padurenan 1 Kota Bekasi',
    institution: 'Bekasi, Jawa Barat',
    period: '2004 – 2010',
    detail: '',
  },
];

// ─── Certification data with document links ───────────────────────────────────
interface CertItem {
  name: string;
  date: string;
  docUrl: string | null; // null = placeholder, will be updated by user
}
interface CertGroup {
  issuer: string;
  items: CertItem[];
}

const certGroups: CertGroup[] = [
  {
    issuer: 'Balai Pelatihan dan Pengembangan Teknologi Informasi dan Komunikasi (BPPTIK)',
    items: [
      {
        name: 'Skema Teknisi Utama Jaringan Komputer',
        date: '2–4 Mei 2018',
        docUrl: null, // ganti dengan URL dokumen/foto setelah diupload
      },
    ],
  },
  {
    issuer: 'Cisco Networking Academy',
    items: [
      {
        name: 'CCNA: Introduction to Network',
        date: '3 Agustus 2018',
        docUrl: null,
      },
      {
        name: 'CCNA: Routing and Switching Essentials',
        date: '6 Februari 2019',
        docUrl: null,
      },
      {
        name: 'CCNA Security',
        date: '18 Agustus 2020',
        docUrl: null,
      },
    ],
  },
];

// ─── Work Experience data ─────────────────────────────────────────────────────
interface WorkExp {
  id: string;
  logo: string | null;       // null = pakai placeholder SVG
  logoInitials: string;      // untuk placeholder
  logoColor: string;
  logoBg?: string;           // opsional — background warna logo (default transparan)
  company: string;
  address: string;           // null = akan diupdate nanti
  startDate: string;
  endDate: string;
  jobTitle: string;
  description: string;
  responsibilities: string[];
}

const workExperiences: WorkExp[] = [
  {
    id: 'we-1',
    logo: '/images/sis.jpg',
    logoInitials: 'SIS',
    logoColor: '#00c8ff',
    company: 'PT Sentra Inovasi Solusindo',
    address: 'Graha Sentra, Jl. Agung Perkasa 9 Jl. Danau Sunter Utara No.K1 No.26-27, RW.14, Sunter Agung, Kec. Tanjung Priok, Jakarta Utara, DKI Jakarta 14350',
    startDate: 'Oktober 2023',
    endDate: 'April 2027',
    jobTitle: 'IT Service Staff',
    description: 'Bertanggung jawab atas layanan teknis end-user, testing dan implementasi aplikasi bisnis, serta menjadi PIC project untuk beberapa klien enterprise.',
    responsibilities: [
      'Memberikan dukungan teknis (service) untuk perangkat PC, laptop, dan printer',
      'Menyiapkan dan melakukan konfigurasi perangkat pendukung operasional kerja',
      'Melakukan testing dan quality assurance aplikasi Kasir, HRMS, TMS, dan aplikasi Sales',
      'Menjadi PIC aplikasi HRMS untuk PT Thai Makmur dan PT Tri Boga Abadi',
      'Menjadi PIC Project TMS, Petty Cash System, dan Website System di PT Dino Logistics Perkasa',
      'Mendukung implementasi Visualization Sequence Stacking for Big Part untuk PT Toyota',
      'Mendukung testing dan implementasi Messaging Channel (WA Blast) dan Bonusmu.id',
      'Setup aplikasi Vireo POS untuk customer UMKM dan memberikan training',
      'Melakukan standby sebagai Call Center dan Host to Host monitoring',
    ],
  },
  {
    id: 'we-2',
    logo: '/images/leader.jpg',
    logoInitials: 'LITS',
    logoColor: '#818cf8',
    company: 'PT Leader IT Service Solutions',
    address: 'Rukan Puri Mutiara Nomor 53 A, JL. Griya Utama, Sunter Agung, 14350 Jakarta Utara, Indonesia, RT.2/RW.5, Sunter Agung, Tanjung Priok, North Jakarta City, Jakarta 14350',
    startDate: 'Januari 2023',
    endDate: 'Juli 2023',
    jobTitle: 'IT Staff',
    description: 'Bertugas di area pertambangan batu bara milik KPC Kalimantan Timur, fokus pada instalasi dan pemeliharaan perangkat UMPC pada kendaraan berat.',
    responsibilities: [
      'Melakukan instalasi UMPC pada unit kendaraan berat di area pertambangan',
      'Melakukan pengecekan perangkat secara berkala',
      'Melakukan troubleshooting jika terjadi kendala pada perangkat',
    ],
  },
  {
    id: 'we-3',
    logo: '/images/lti.png',
    logoInitials: 'LTI',
    logoColor: '#f59e0b',
    logoBg: 'white',
    company: 'PT Lintas Teknologi Indonesia',
    address: 'Menara MTH LT.16, Jl. MT Haryono KAV.23 Tebet Timur, Jakarta Selatan, DKI Jakarta',
    startDate: 'Juni 2021',
    endDate: 'Oktober 2021',
    jobTitle: 'IT Support',
    description: 'Bertugas sebagai IT Support di PT Lintas Teknologi Indonesia, fokus pada implementasi security software Carbon Black EDR pada perangkat PT Telkomsel.',
    responsibilities: [
      'Melakukan implementasi security software Carbon Black EDR (APP/CTR) pada perangkat PT Telkomsel',
      'Membuat laporan pekerjaan harian tim IT',
    ],
  },
  {
    id: 'we-4',
    logo: '/images/kemenprin.jpg',
    logoInitials: 'KP',
    logoColor: '#10b981',
    company: 'Kementerian Perindustrian',
    address: 'Jalan Jenderal Gatot Subroto Kav 52-53 Jakarta 12950',
    startDate: 'Agustus 2019',
    endDate: 'September 2019',
    jobTitle: 'Magang',
    description: 'Memberikan dukungan administratif dan operasional kantor dalam program magang.',
    responsibilities: [
      'Memberikan dukungan administratif dan operasional kantor',
      'Melakukan pengecekan serta input data ke dalam database',
    ],
  },
];

// ─── Animation variants ───────────────────────────────────────────────────────
const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.07, duration: 0.42, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

// ─── SVG Placeholder image ────────────────────────────────────────────────────
function ProjectPlaceholder({ initials, color, size = 180 }: { initials: string; color: string; size?: number }) {
  return (
    <svg
      width={size}
      height={Math.round(size * 0.56)}
      viewBox={`0 0 ${size} ${Math.round(size * 0.56)}`}
      xmlns="http://www.w3.org/2000/svg"
      className="w-full"
      style={{ display: 'block' }}
    >
      {/* Background */}
      <rect width="100%" height="100%" fill="#0a0e1a" />
      {/* Grid lines */}
      {Array.from({ length: 6 }).map((_, i) => (
        <line key={`v${i}`} x1={i * (size / 5)} y1="0" x2={i * (size / 5)} y2="100%"
          stroke={color} strokeOpacity="0.07" strokeWidth="1" />
      ))}
      {Array.from({ length: 5 }).map((_, i) => (
        <line key={`h${i}`} x1="0" y1={i * 20 + '%'} x2="100%" y2={i * 20 + '%'}
          stroke={color} strokeOpacity="0.07" strokeWidth="1" />
      ))}
      {/* Glow circle */}
      <circle cx={size / 2} cy="50%" r={Math.round(size * 0.22)}
        fill={color} fillOpacity="0.08" />
      {/* Border circle */}
      <circle cx={size / 2} cy="50%" r={Math.round(size * 0.18)}
        fill="none" stroke={color} strokeOpacity="0.4" strokeWidth="1.5" strokeDasharray="4 3" />
      {/* Initials */}
      <text
        x="50%" y="50%"
        dominantBaseline="central"
        textAnchor="middle"
        fill={color}
        fontSize={Math.round(size * 0.13)}
        fontWeight="700"
        fontFamily="monospace"
        letterSpacing="2"
      >
        {initials}
      </text>
    </svg>
  );
}

// ─── Company Logo Placeholder ─────────────────────────────────────────────────
function CompanyLogo({ initials, color, size = 56 }: { initials: string; color: string; size?: number }) {
  return (
    <div
      className="flex-shrink-0 rounded-xl flex items-center justify-center font-bold font-mono select-none"
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, ${color}22, ${color}11)`,
        border: `1.5px solid ${color}44`,
        color: color,
        fontSize: Math.round(size * 0.22),
        letterSpacing: '-0.5px',
      }}
    >
      {initials}
    </div>
  );
}

// ─── Tab: Experience ──────────────────────────────────────────────────────────
function ExperienceTab() {
  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-6">
      {workExperiences.map((exp, i) => (
        <motion.div
          key={exp.id}
          initial="hidden" animate="visible" variants={fadeUp} custom={i}
          className="rounded-2xl overflow-hidden"
          style={{ background: 'rgba(0,200,255,0.04)', border: '1px solid rgba(0,200,255,0.12)' }}
        >
          {/* Header */}
          <div className="flex items-start gap-4 p-5 pb-4">
            {/* Logo */}
            {exp.logo ? (
              <img
                src={exp.logo}
                alt={exp.company}
                className="flex-shrink-0 rounded-xl object-contain"
                style={{
                  width: 56,
                  height: 56,
                  border: '1.5px solid rgba(0,200,255,0.2)',
                  background: exp.logoBg ?? 'white',
                  padding: '6px',
                }}
              />
            ) : (
              <CompanyLogo initials={exp.logoInitials} color={exp.logoColor} size={56} />
            )}

            {/* Company info */}
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-bold leading-snug mb-0.5" style={{ color: '#f0f9ff' }}>
                {exp.company}
              </h3>
              <p className="text-sm font-semibold mb-2" style={{ color: exp.logoColor }}>
                {exp.jobTitle}
              </p>
              <div className="flex flex-wrap items-center gap-3">
                {/* Period */}
                <div className="flex items-center gap-1.5">
                  <Calendar size={11} style={{ color: '#64748b' }} />
                  <span className="text-xs" style={{ color: '#64748b' }}>
                    {exp.startDate} – {exp.endDate}
                  </span>
                </div>
                {/* Address */}
                <div className="flex items-center gap-1.5">
                  <MapPin size={11} style={{ color: '#64748b' }} />
                  <span className="text-xs" style={{ color: '#64748b' }}>{exp.address}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: '1px', background: 'rgba(0,200,255,0.08)', margin: '0 20px' }} />

          {/* Description + responsibilities */}
          <div className="p-5 pt-4 flex flex-col gap-3">
            {/* Description */}
            <p className="text-sm leading-relaxed" style={{ color: '#94a3b8' }}>
              {exp.description}
            </p>

            {/* Responsibilities */}
            {exp.responsibilities.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#475569' }}>
                  Tanggung Jawab
                </p>
                <ul className="flex flex-col gap-1.5">
                  {exp.responsibilities.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-xs" style={{ color: '#94a3b8' }}>
                      <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: exp.logoColor }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Tab: Projects ────────────────────────────────────────────────────────────
function ProjectsTab() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {projects.map((project, i) => (
        <motion.div
          key={project.id}
          initial="hidden" animate="visible" variants={fadeUp} custom={i}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="rounded-2xl overflow-hidden flex flex-col"
          style={{ background: 'rgba(0,200,255,0.04)', border: '1px solid rgba(0,200,255,0.12)' }}
        >
          {/* Image / placeholder */}
          <div className="w-full overflow-hidden" style={{ background: '#0a0e1a' }}>
            <ProjectPlaceholder initials={project.initials} color={project.color} />
          </div>

          {/* Content */}
          <div className="flex flex-col gap-3 p-5 flex-1">
            {/* Category + Client */}
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full"
                style={{ background: 'rgba(0,200,255,0.12)', color: '#00c8ff', border: '1px solid rgba(0,200,255,0.2)' }}
              >
                <Tag size={10} />{project.category}
              </span>
              <span className="text-xs" style={{ color: '#475569' }}>
                {project.client}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-base font-bold leading-snug" style={{ color: '#f0f9ff' }}>
              {project.title}
            </h3>

            {/* Description */}
            <p className="text-sm leading-relaxed flex-1" style={{ color: '#94a3b8' }}>
              {project.description}
            </p>

            {/* Role */}
            <div className="flex items-center gap-2 text-xs">
              <Briefcase size={11} style={{ color: '#00c8ff' }} />
              <span style={{ color: '#00c8ff' }}>Peran:</span>
              <span style={{ color: '#94a3b8' }}>{project.role}</span>
            </div>

            {/* Key contribution */}
            <div className="flex items-start gap-2 text-xs">
              <Sparkles size={11} className="mt-0.5 flex-shrink-0" style={{ color: '#818cf8' }} />
              <p style={{ color: '#94a3b8' }}>{project.keyContribution}</p>
            </div>

            {/* Technologies */}
            <div className="flex flex-wrap gap-1.5 mt-1">
              {project.technologies.map(tech => (
                <span
                  key={tech}
                  className="text-xs px-2 py-0.5 rounded font-mono"
                  style={{ background: 'rgba(99,102,241,0.12)', color: '#818cf8', border: '1px solid rgba(99,102,241,0.2)' }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Tab: Skills ─────────────────────────────────────────────────────────────
function SkillsTab() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {portfolioData.skillCategories.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial="hidden" animate="visible" variants={fadeUp} custom={i}
            className="rounded-2xl p-5"
            style={{ background: 'rgba(0,200,255,0.03)', border: '1px solid rgba(0,200,255,0.1)' }}
          >
            <h3 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#00c8ff' }}>
              {cat.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {cat.skills.map(skill => (
                <span
                  key={skill.name}
                  className="text-xs px-2.5 py-1 rounded-lg font-mono"
                  style={{
                    background: levelColor[skill.level ?? 'intermediate'],
                    border: `1px solid ${levelBorder[skill.level ?? 'intermediate']}`,
                    color: levelText[skill.level ?? 'intermediate'],
                  }}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        className="flex items-center justify-center gap-6 mt-8"
      >
        {(['advanced', 'intermediate', 'beginner'] as const).map(level => (
          <div key={level} className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: levelText[level] }} />
            <span className="text-xs capitalize" style={{ color: '#64748b' }}>{level}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// ─── Tab: Education ───────────────────────────────────────────────────────────
function EducationTab() {
  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-4">
      {educationItems.map((item, i) => (
        <motion.div
          key={i}
          initial="hidden" animate="visible" variants={fadeUp} custom={i}
          className="flex items-start gap-4 rounded-2xl p-5"
          style={{ background: 'rgba(0,200,255,0.04)', border: '1px solid rgba(0,200,255,0.12)' }}
        >
          <div
            className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(0,200,255,0.12)' }}
          >
            <GraduationCap size={20} style={{ color: '#00c8ff' }} />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-sm mb-0.5" style={{ color: '#f0f9ff' }}>{item.degree}</h3>
            <p className="text-xs mb-1.5" style={{ color: '#818cf8' }}>{item.institution}</p>
            <div className="flex items-center gap-2 flex-wrap">
              <Calendar size={11} style={{ color: '#64748b' }} />
              <span className="text-xs" style={{ color: '#64748b' }}>{item.period}</span>
              {item.detail && (
                <>
                  <span style={{ color: '#334155' }}>·</span>
                  <span className="text-xs font-semibold" style={{ color: '#00c8ff' }}>{item.detail}</span>
                </>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Tab: Certifications ──────────────────────────────────────────────────────
function CertificationsTab() {
  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-8">
      {certGroups.map((group, gi) => (
        <div key={gi}>
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#818cf8' }}>
            {group.issuer}
          </p>
          <div className="flex flex-col gap-3">
            {group.items.map((item, ji) => (
              <motion.div
                key={ji}
                initial="hidden" animate="visible" variants={fadeUp} custom={gi * 4 + ji}
                className="flex items-center gap-4 rounded-xl p-4"
                style={{ background: 'rgba(129,140,248,0.06)', border: '1px solid rgba(129,140,248,0.15)' }}
              >
                {/* Icon */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(129,140,248,0.15)' }}
                >
                  <Award size={18} style={{ color: '#818cf8' }} />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate" style={{ color: '#f0f9ff' }}>{item.name}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <Calendar size={11} style={{ color: '#64748b' }} />
                    <span className="text-xs" style={{ color: '#64748b' }}>{item.date}</span>
                  </div>
                </div>

                {/* View document button */}
                {item.docUrl ? (
                  <a
                    href={item.docUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-200 hover:-translate-y-0.5"
                    style={{
                      color: '#818cf8',
                      background: 'rgba(129,140,248,0.12)',
                      border: '1px solid rgba(129,140,248,0.3)',
                      textDecoration: 'none',
                    }}
                  >
                    <Eye size={12} />
                    Lihat
                  </a>
                ) : (
                  <span
                    className="flex-shrink-0 flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg cursor-not-allowed"
                    title="Dokumen belum tersedia"
                    style={{
                      color: '#475569',
                      background: 'rgba(71,85,105,0.1)',
                      border: '1px solid rgba(71,85,105,0.2)',
                    }}
                  >
                    <FileText size={12} />
                    Segera
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      ))}

      {/* Info note */}
      <p className="text-xs text-center" style={{ color: '#334155' }}>
        * Dokumen sertifikat akan ditambahkan. Klik tombol &quot;Lihat&quot; untuk membuka dokumen.
      </p>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
function PortfolioContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<Tab>('projects');

  useEffect(() => {
    const tab = searchParams.get('tab') as Tab | null;
    const validTabs: Tab[] = ['projects', 'experience', 'skills', 'education', 'certifications'];
    if (tab && validTabs.includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const tabContent: Record<Tab, React.ReactNode> = {
    projects:       <ProjectsTab />,
    experience:     <ExperienceTab />,
    skills:         <SkillsTab />,
    education:      <EducationTab />,
    certifications: <CertificationsTab />,
  };

  const tabTitles: Record<Tab, { title: string; subtitle: string }> = {
    projects:       { title: 'Proyek',              subtitle: 'Project IT yang pernah saya tangani' },
    experience:     { title: 'Pengalaman Kerja',    subtitle: 'Riwayat pekerjaan profesional saya' },
    skills:         { title: 'Keahlian Teknis',     subtitle: 'Teknologi dan tools yang saya kuasai' },
    education:      { title: 'Pendidikan',           subtitle: 'Latar belakang pendidikan saya' },
    certifications: { title: 'Sertifikasi',          subtitle: 'Sertifikat profesional yang saya miliki' },
  };

  return (
    <>
      {/* Background */}
      <div className="fixed inset-0 -z-10"
        style={{ backgroundImage: 'url(/images/bg.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
      <div className="fixed inset-0 -z-10"
        style={{ background: 'linear-gradient(135deg, rgba(5,8,20,0.88) 0%, rgba(5,8,20,0.80) 50%, rgba(5,8,20,0.75) 100%)' }} />

      <main className="min-h-screen flex flex-col">
        {/* Top bar */}
        <div className="sticky top-0 z-50"
          style={{ background: 'rgba(5,8,20,0.92)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(0,200,255,0.1)' }}>
          <div className="max-w-6xl mx-auto px-6 h-14 flex items-center gap-4">
            <Link href="/"
              className="flex items-center gap-2 text-sm font-medium transition-colors duration-200 hover:text-white"
              style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>
              <ArrowLeft size={16} />
              Kembali
            </Link>
            <span style={{ color: '#334155' }}>·</span>
            <span className="font-bold" style={{ color: '#00c8ff' }}>Portofolio</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 max-w-6xl mx-auto px-6 py-10 w-full">

          {/* Section heading */}
          <motion.div key={activeTab + '-heading'}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
            className="mb-8 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2" style={{ color: '#f0f9ff' }}>
              {tabTitles[activeTab].title}
            </h1>
            <p className="text-sm" style={{ color: '#00c8ff' }}>{tabTitles[activeTab].subtitle}</p>
          </motion.div>

          {/* Tabs */}
          <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
            {TABS.map(tab => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                className="relative px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
                style={{
                  color: activeTab === tab.key ? '#0f172a' : 'rgba(255,255,255,0.5)',
                  background: activeTab === tab.key ? 'linear-gradient(135deg, #00c8ff, #6366f1)' : 'rgba(255,255,255,0.05)',
                  border: activeTab === tab.key ? '1px solid transparent' : '1px solid rgba(255,255,255,0.1)',
                  boxShadow: activeTab === tab.key ? '0 4px 16px rgba(0,200,255,0.3)' : 'none',
                }}>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <AnimatePresence mode="wait">
            <motion.div key={activeTab}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
              {tabContent[activeTab]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <footer className="py-5 text-center text-xs"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)', color: '#475569' }}>
          © {new Date().getFullYear()} Felik Kriswanto
        </footer>
      </main>
    </>
  );
}

export default function PortfolioPage() {
  return (
    <Suspense fallback={null}>
      <PortfolioContent />
    </Suspense>
  );
}