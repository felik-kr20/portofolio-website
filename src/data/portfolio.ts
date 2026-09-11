// ─── Personal Info ────────────────────────────────────────────────────────────

export interface SocialLink {
  platform: 'linkedin' | 'github' | 'email';
  url: string;
  label: string;
}

export interface Highlight {
  label: string;
  value: string;
  icon: string;
}

export interface ContactInfo {
  email: string;
  linkedin: string;
  phone?: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  aboutBio: string;
  highlights: Highlight[];
  profileImage: string;
  social: SocialLink[];
  contact: ContactInfo;
}

// ─── Responsibilities (What I Do) ─────────────────────────────────────────────

export interface Responsibility {
  id: string;
  title: string;
  description: string;
  icon: string;
}

// ─── Technical Skills ─────────────────────────────────────────────────────────

export interface Skill {
  name: string;
  level?: 'beginner' | 'intermediate' | 'advanced';
}

export interface SkillCategory {
  id: string;
  category: string;
  skills: Skill[];
}

// ─── Work Experience ──────────────────────────────────────────────────────────

export interface WorkExperience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string | 'Present';
  description: string;
  responsibilities: string[];
  achievements?: string[];
  technologies?: string[];
}

// ─── Projects ─────────────────────────────────────────────────────────────────

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  role: string;
  technologies: string[];
  keyContribution: string;
  image: string;
  imageAlt: string;
}

// ─── Tools & Technologies ─────────────────────────────────────────────────────

export interface Tool {
  id: string;
  name: string;
  icon: string;
  category: string;
}

// ─── Root Data Export ─────────────────────────────────────────────────────────

export interface PortfolioData {
  personal: PersonalInfo;
  responsibilities: Responsibility[];
  skillCategories: SkillCategory[];
  experiences: WorkExperience[];
  projects: Project[];
  tools: Tool[];
}

// ─── Portfolio Data ────────────────────────────────────────────────────────────

export const portfolioData: PortfolioData = {
  // ── Personal Info ────────────────────────────────────────────────────────
  personal: {
    name: 'Felik Kriswanto',
    title: 'IT Support & Technical Support Specialist',
    tagline: 'Turning complex tech problems into seamless solutions.',
    bio: 'Profesional IT Support dengan pengalaman lebih dari 4 tahun dalam technical support, implementasi sistem, testing aplikasi, dan project handling. Terbiasa menjadi PIC project dan berkolaborasi lintas tim untuk memastikan sistem berjalan optimal.',
    aboutBio:
      'Saya Felik Kriswanto, lulusan S1 Teknik Informatika konsentrasi Networking dari STMIK Nusa Mandiri Jakarta dengan IPK 3,61. Saya memiliki rekam jejak yang solid dalam IT Service, mulai dari dukungan teknis end-user, implementasi dan testing aplikasi bisnis (HRMS, POS/Kasir, TMS, Website System), hingga menjadi PIC project di lingkungan enterprise. Saya dikenal sebagai pribadi yang teliti, komunikatif, dan adaptif—selalu siap menghadapi tantangan teknologi baru dengan pendekatan yang terstruktur dan berorientasi pada solusi.',
    highlights: [
      { label: 'Tahun Pengalaman', value: '4+', icon: 'Briefcase' },
      { label: 'Project Ditangani', value: '5+', icon: 'CheckCircle' },
      { label: 'Sertifikasi', value: '4', icon: 'Award' },
    ],
    profileImage: '/images/profile.jpg',
    social: [
      {
        platform: 'linkedin',
        url: 'https://linkedin.com/in/felikriswanto',
        label: 'LinkedIn',
      },
      {
        platform: 'github',
        url: 'https://github.com/felikriswanto',
        label: 'GitHub',
      },
    ],
    contact: {
      email: 'felik103@gmail.com',
      linkedin: 'https://linkedin.com/in/felikriswanto',
      phone: '+62 899-7671-236',
    },
  },

  // ── Responsibilities (What I Do) ─────────────────────────────────────────
  responsibilities: [
    {
      id: 'resp-1',
      title: 'IT Support & Technical Service',
      description:
        'Memberikan dukungan teknis untuk perangkat PC, laptop, dan printer; termasuk setup, konfigurasi, dan penanganan insiden secara langsung maupun remote.',
      icon: 'Headphones',
    },
    {
      id: 'resp-2',
      title: 'User & Client Training',
      description:
        'Memberikan pelatihan penggunaan aplikasi bisnis seperti HRMS dan POS/Kasir kepada user dan client agar dapat mengoperasikan sistem secara mandiri.',
      icon: 'Users',
    },
    {
      id: 'resp-3',
      title: 'Hardware & Software Troubleshooting',
      description:
        'Mendiagnosis dan menyelesaikan masalah perangkat keras maupun lunak, memastikan perangkat kembali beroperasi dengan cepat dan efisien.',
      icon: 'Wrench',
    },
    {
      id: 'resp-4',
      title: 'Application Testing & QA',
      description:
        'Melakukan testing dan quality assurance pada aplikasi Kasir, HRMS, TMS, dan aplikasi Sales sebelum deployment ke lingkungan produksi.',
      icon: 'Server',
    },
    {
      id: 'resp-5',
      title: 'Project & Application PIC',
      description:
        'Menjadi penanggung jawab (PIC) dalam project implementasi aplikasi, mengelola koordinasi teknis, jadwal, dan komunikasi dengan stakeholder.',
      icon: 'FolderKanban',
    },
    {
      id: 'resp-6',
      title: 'System Monitoring & Standby',
      description:
        'Melakukan standby sebagai Call Center dan Host-to-Host monitoring untuk memastikan ketersediaan dan stabilitas sistem secara real-time.',
      icon: 'Settings2',
    },
    {
      id: 'resp-7',
      title: 'Documentation & Reporting',
      description:
        'Membuat laporan pekerjaan harian tim IT, dokumentasi teknis, dan panduan operasional sebagai referensi internal maupun untuk keperluan audit.',
      icon: 'FileText',
    },
    {
      id: 'resp-8',
      title: 'Data Checking & Validation',
      description:
        'Melakukan pengecekan dan input data ke dalam database, memastikan keakuratan dan integritas data dalam sistem informasi perusahaan.',
      icon: 'DatabaseZap',
    },
  ],

  // ── Technical Skills ─────────────────────────────────────────────────────
  skillCategories: [
    {
      id: 'cat-os',
      category: 'Operating Systems',
      skills: [
        { name: 'Windows 10/11', level: 'advanced' },
        { name: 'Windows Server', level: 'intermediate' },
        { name: 'Linux Server', level: 'intermediate' },
      ],
    },
    {
      id: 'cat-network',
      category: 'Networking',
      skills: [
        { name: 'LAN / WAN', level: 'advanced' },
        { name: 'Routing & Switching', level: 'intermediate' },
        { name: 'TCP/IP', level: 'advanced' },
        { name: 'DNS / DHCP', level: 'intermediate' },
        { name: 'CCNA (Certified)', level: 'intermediate' },
      ],
    },
    {
      id: 'cat-hardware',
      category: 'Hardware',
      skills: [
        { name: 'Setup & Konfigurasi PC/Laptop', level: 'advanced' },
        { name: 'Printer Maintenance', level: 'advanced' },
        { name: 'CCTV Installation', level: 'intermediate' },
        { name: 'Instalasi UMPC', level: 'intermediate' },
      ],
    },
    {
      id: 'cat-software',
      category: 'Business Applications',
      skills: [
        { name: 'HRMS', level: 'advanced' },
        { name: 'POS / Kasir', level: 'advanced' },
        { name: 'TMS (Tracking Management System)', level: 'advanced' },
        { name: 'Website System', level: 'intermediate' },
        { name: 'Petty Cash System', level: 'intermediate' },
      ],
    },
    {
      id: 'cat-security',
      category: 'Security & Monitoring',
      skills: [
        { name: 'Carbon Black EDR (APP/CTR)', level: 'intermediate' },
        { name: 'Host to Host Monitoring', level: 'intermediate' },
        { name: 'Security Software Implementation', level: 'intermediate' },
       ],
    },
    {
      id: 'cat-datatools',
      category: 'Data & Productivity Tools',
      skills: [
        { name: 'Microsoft Excel (Reporting)', level: 'advanced' },
        { name: 'Microsoft Word (Dokumentasi)', level: 'advanced' },
      ],
    },
    {
      id: 'cat-itsupport',
      category: 'IT Support Tools',
      skills: [
        { name: 'Remote Desktop / TeamViewer', level: 'advanced' },
        { name: 'Call Center Support', level: 'advanced' },
        { name: 'Ticketing System', level: 'intermediate' },
      ],
    },
    {
      id: 'cat-other',
      category: 'Other Technical Skills',
      skills: [
        { name: 'Testing & QA Aplikasi', level: 'advanced' },
        { name: 'Project Handling & PIC', level: 'advanced' },
        { name: 'Customer Service Oriented', level: 'advanced' },
        { name: 'Dokumentasi Teknis', level: 'advanced' },
      ],
    },
  ],

  // ── Work Experience ───────────────────────────────────────────────────────
  experiences: [
    {
      id: 'exp-1',
      jobTitle: 'IT Service Staff',
      company: 'PT Sentra Inovasi Solusindo',
      location: 'Indonesia',
      startDate: 'Okt 2023',
      endDate: 'Apr 2026',
      description:
        'Bertanggung jawab atas layanan teknis end-user, testing dan implementasi aplikasi bisnis, serta menjadi PIC project untuk beberapa klien enterprise.',
      responsibilities: [
        'Memberikan dukungan teknis (service) untuk perangkat PC, laptop, dan printer',
        'Menyiapkan dan melakukan konfigurasi perangkat pendukung operasional kerja',
        'Melakukan testing dan quality assurance aplikasi Kasir, HRMS, TMS, dan aplikasi Sales',
        'Melakukan setup serta menjadi PIC aplikasi HRMS untuk PT Thai Makmur dan PT Tri Boga Abadi',
        'Melakukan setup aplikasi kasir untuk customer UMKM',
        'Memberikan training penggunaan aplikasi HRMS dan kasir kepada customer/client',
        'Menjadi PIC Project aplikasi TMS, Petty Cash System, dan Website System di PT Dino Logistics Perkasa',
        'Melakukan standby sebagai Call Center untuk penanganan kendala teknis',
        'Melakukan standby Host to Host untuk monitoring dan support sistem',
      ],
      achievements: [
        'Berhasil menjadi PIC project implementasi TMS, Petty Cash System, dan Website System di PT Dino Logistics Perkasa',
        'Setup dan implementasi aplikasi HRMS untuk 2 klien enterprise (PT Thai Makmur & PT Tri Boga Abadi)',
        'Meningkatkan kepuasan client melalui program training aplikasi yang terstruktur',
      ],
      technologies: [
        'HRMS', 'POS/Kasir', 'TMS', 'Website System', 'Petty Cash System',
      ],
    },
    {
      id: 'exp-2',
      jobTitle: 'IT Staff',
      company: 'PT Leader IT Service Solutions',
      location: 'KPC Kalimantan Timur',
      startDate: 'Jan 2023',
      endDate: 'Jul 2023',
      description:
        'Bertugas di area pertambangan batu bara milik KPC Kalimantan Timur, fokus pada instalasi dan pemeliharaan perangkat UMPC pada kendaraan berat.',
      responsibilities: [
        'Bertugas di area pertambangan batu bara milik KPC Kalimantan Timur',
        'Melakukan instalasi UMPC pada unit kendaraan berat',
        'Melakukan pengecekan perangkat secara berkala',
        'Melakukan troubleshooting jika terjadi kendala pada perangkat',
      ],
      achievements: [],
      technologies: [
        'UMPC', 'Hardware Maintenance', 'Field Support',
      ],
    },
    {
      id: 'exp-3',
      jobTitle: 'IT Support',
      company: 'PT Satu Sumber Sarana',
      location: 'Jakarta, Indonesia',
      startDate: 'Jun 2021',
      endDate: 'Okt 2021',
      description:
        'Bertugas sebagai IT Support di PT Lintas Teknologi Indonesia, fokus pada implementasi security software Carbon Black EDR pada perangkat PT Telkomsel.',
      responsibilities: [
        'Bertugas sebagai IT Support di PT Lintas Teknologi Indonesia',
        'Melakukan implementasi security software Carbon Black EDR (APP/CTR) pada perangkat PT Telkomsel',
        'Membuat laporan pekerjaan harian tim IT',
      ],
      achievements: [
        'Berhasil mengimplementasikan Carbon Black EDR (APP/CTR) pada seluruh perangkat target di PT Telkomsel sesuai jadwal',
      ],
      technologies: [
        'Carbon Black EDR', 'Security Software', 'Windows',
      ],
    },
    {
      id: 'exp-4',
      jobTitle: 'Magang',
      company: 'Kementerian Perindustrian',
      location: 'Jakarta, Indonesia',
      startDate: 'Agu 2019',
      endDate: 'Sep 2019',
      description:
        'Memberikan dukungan administratif dan operasional kantor, termasuk pengecekan dan input data ke dalam database.',
      responsibilities: [
        'Memberikan dukungan administratif dan operasional kantor',
        'Melakukan pengecekan serta input data ke dalam database',
      ],
      achievements: [],
      technologies: [
        'Microsoft Office', 'Database Input',
      ],
    },
  ],

  // ── Projects ──────────────────────────────────────────────────────────────
  projects: [
    {
      id: 'proj-1',
      title: 'Implementasi TMS, Petty Cash & Website System',
      category: 'Project Implementation',
      description:
        'Menjadi PIC Project untuk tiga sistem sekaligus di PT Dino Logistics Perkasa: Tracking Management System (TMS), Petty Cash System, dan Website System—dari setup, testing, hingga go-live.',
      role: 'Project PIC / IT Service Staff',
      technologies: [
        'TMS', 'Petty Cash System', 'Website System', 'Testing & QA',
      ],
      keyContribution:
        'Bertanggung jawab penuh sebagai PIC project, memimpin koordinasi teknis dan komunikasi dengan klien PT Dino Logistics Perkasa dari awal implementasi hingga sistem berjalan stabil di lingkungan produksi.',
      image: '/images/projects/project-1.jpg',
      imageAlt: 'Implementasi TMS dan Petty Cash System di PT Dino Logistics Perkasa',
    },
    {
      id: 'proj-2',
      title: 'Setup & Implementasi HRMS Enterprise',
      category: 'Application Implementation',
      description:
        'Melakukan setup dan menjadi PIC aplikasi HRMS untuk dua klien enterprise: PT Thai Makmur dan PT Tri Boga Abadi, termasuk konfigurasi sistem dan training user.',
      role: 'Application PIC / IT Service Staff',
      technologies: [
        'HRMS', 'User Training', 'System Configuration',
      ],
      keyContribution:
        'Setup sistem HRMS dari nol hingga production-ready untuk dua perusahaan klien, memberikan training langsung kepada pengguna akhir sehingga tim HR dapat mengoperasikan sistem secara mandiri.',
      image: '/images/projects/project-2.jpg',
      imageAlt: 'Setup dan implementasi aplikasi HRMS untuk klien enterprise',
    },
    {
      id: 'proj-3',
      title: 'Implementasi Carbon Black EDR di PT Telkomsel',
      category: 'Security Implementation',
      description:
        'Melakukan implementasi security software Carbon Black EDR (APP/CTR) pada perangkat-perangkat PT Telkomsel sebagai bagian dari proyek pengamanan endpoint perusahaan.',
      role: 'IT Support',
      technologies: [
        'Carbon Black EDR', 'Endpoint Security', 'Windows',
      ],
      keyContribution:
        'Mengeksekusi deployment Carbon Black EDR secara sistematis pada seluruh endpoint target PT Telkomsel, memastikan instalasi berjalan sesuai prosedur dan membuat laporan progress harian.',
      image: '/images/projects/project-3.jpg',
      imageAlt: 'Implementasi Carbon Black EDR pada perangkat PT Telkomsel',
    },
    {
      id: 'proj-4',
      title: 'Instalasi UMPC pada Kendaraan Berat Pertambangan',
      category: 'Hardware Implementation',
      description:
        'Melakukan instalasi dan maintenance perangkat UMPC pada armada kendaraan berat di area pertambangan batu bara KPC Kalimantan Timur untuk mendukung sistem operasional lapangan.',
      role: 'IT Staff (Field Technician)',
      technologies: [
        'UMPC', 'Hardware Installation', 'Field Maintenance',
      ],
      keyContribution:
        'Melakukan instalasi UMPC pada unit kendaraan berat secara langsung di lapangan pertambangan, serta melakukan pengecekan berkala dan troubleshooting untuk memastikan perangkat beroperasi dengan baik di kondisi ekstrem.',
      image: '/images/projects/project-4.jpg',
      imageAlt: 'Instalasi UMPC pada kendaraan berat di area pertambangan KPC Kalimantan',
    },
  ],

  // ── Tools & Technologies ──────────────────────────────────────────────────
  tools: [
    { id: 'tool-windows',     name: 'Windows',          icon: 'Monitor',      category: 'OS' },
    { id: 'tool-linux',       name: 'Linux Server',     icon: 'Terminal',     category: 'OS' },
    { id: 'tool-hrms',        name: 'HRMS',             icon: 'Users',        category: 'Business App' },
    { id: 'tool-pos',         name: 'POS / Kasir',      icon: 'ShoppingCart', category: 'Business App' },
    { id: 'tool-tms',         name: 'TMS',              icon: 'Kanban',       category: 'Business App' },
    { id: 'tool-website',     name: 'Website System',   icon: 'Globe',        category: 'Business App' },
    { id: 'tool-carbonblack', name: 'Carbon Black EDR', icon: 'Shield',       category: 'Security' },
    { id: 'tool-teamviewer',  name: 'TeamViewer',       icon: 'MonitorCheck', category: 'Remote Support' },
    { id: 'tool-rdp',         name: 'Remote Desktop',   icon: 'Share2',       category: 'Remote Support' },
    { id: 'tool-word',        name: 'Microsoft Word',   icon: 'FileText',     category: 'Productivity' },
    { id: 'tool-excel',       name: 'Microsoft Excel',  icon: 'BarChart2',    category: 'Productivity' },
    { id: 'tool-cctv',        name: 'CCTV',             icon: 'Camera',       category: 'Hardware' },
    { id: 'tool-umpc',        name: 'UMPC',             icon: 'Laptop',       category: 'Hardware' },
    { id: 'tool-printer',     name: 'Printer',          icon: 'Printer',      category: 'Hardware' },
    { id: 'tool-lan',         name: 'LAN / WAN',        icon: 'Network',      category: 'Networking' },
    { id: 'tool-cisco',       name: 'Cisco',            icon: 'Wifi',         category: 'Networking' },
    { id: 'tool-ccna',        name: 'CCNA',             icon: 'BookOpen',     category: 'Networking' },
    { id: 'tool-callcenter',  name: 'Call Center',      icon: 'Phone',        category: 'Support' },
    { id: 'tool-o365',        name: 'Office 365',       icon: 'Briefcase',    category: 'Productivity' },
    { id: 'tool-db',          name: 'Database',         icon: 'Database',     category: 'Data' },
  ],
};
