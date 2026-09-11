# Design Document

## Personal Portfolio Website — IT Support Professional

---

## Overview

Website personal portfolio profesional IT Support dibangun sebagai **Next.js 14 App Router single-page application** dengan TypeScript, Tailwind CSS, Framer Motion, dan Lucide React. Semua data portfolio disimpan di satu file `src/data/portfolio.ts` dan dikonsumsi oleh komponen-komponen yang terpisah. Form kontak menggunakan EmailJS sebagai opsi utama dengan fallback ke mailto. Aplikasi menggunakan dark theme eksklusif tanpa toggle, dan semua animasi dikelola via Framer Motion.

---

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Next.js App Router                │
│  src/app/page.tsx  (single page, server component)  │
│  src/app/layout.tsx (metadata, fonts, global styles)│
└────────────────────┬────────────────────────────────┘
                     │ imports
         ┌───────────▼───────────┐
         │   Section Components  │  (client components)
         │  (one per section)    │
         └───────────┬───────────┘
                     │ reads
         ┌───────────▼───────────┐
         │   src/data/portfolio.ts│  (pure data, typed)
         └───────────────────────┘
```

### Rendering Strategy

- `src/app/page.tsx` — Server Component yang meng-import semua section components.
- Section components yang memerlukan interaktivitas (scroll, hover, animation, form state) menggunakan directive `"use client"`.
- Static data dipassing sebagai props dari `page.tsx` ke tiap section, sehingga data fetching terjadi di server side.
- `src/app/layout.tsx` menangani `<head>` metadata, font loading, dan global CSS.

---

## Folder & File Structure

```
portofolio-website/
├── public/
│   ├── images/
│   │   ├── profile.jpg           # profile photo placeholder
│   │   └── projects/
│   │       ├── project-1.jpg
│   │       ├── project-2.jpg
│   │       └── project-3.jpg
│   └── og-image.jpg              # Open Graph image
│
├── src/
│   ├── app/
│   │   ├── layout.tsx            # root layout, metadata, fonts
│   │   ├── page.tsx              # single page, composes all sections
│   │   └── globals.css           # Tailwind base, custom CSS vars, scroll behavior
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navigation.tsx    # sticky nav + mobile drawer
│   │   │   └── Footer.tsx        # footer with links
│   │   │
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── WhatIDo.tsx
│   │   │   ├── TechnicalSkills.tsx
│   │   │   ├── WorkExperience.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── Tools.tsx
│   │   │   └── Contact.tsx
│   │   │
│   │   └── ui/
│   │       ├── SectionHeading.tsx     # reusable section title + subtitle
│   │       ├── AnimatedSection.tsx    # Framer Motion viewport wrapper
│   │       ├── SkillBadge.tsx         # skill tag/badge element
│   │       ├── ProjectCard.tsx        # individual project card
│   │       ├── ExperienceEntry.tsx    # single timeline entry
│   │       ├── ResponsibilityCard.tsx # What I Do card
│   │       ├── ToolTile.tsx           # tool icon + name tile
│   │       └── ContactForm.tsx        # form with validation + EmailJS
│   │
│   ├── data/
│   │   └── portfolio.ts          # ALL portfolio content + TypeScript interfaces
│   │
│   ├── hooks/
│   │   ├── useActiveSection.ts   # IntersectionObserver for nav highlighting
│   │   └── useContactForm.ts     # form state, validation, EmailJS submit
│   │
│   └── lib/
│       └── utils.ts              # cn() helper (clsx + tailwind-merge)
│
├── .env.local                    # EMAILJS_SERVICE_ID, PUBLIC_KEY, TEMPLATE_ID
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Component Hierarchy

```
page.tsx (Server Component)
├── Navigation           [layout/Navigation.tsx]  "use client"
├── <main>
│   ├── Hero             [sections/Hero.tsx]       "use client"
│   ├── About            [sections/About.tsx]      "use client"
│   ├── WhatIDo          [sections/WhatIDo.tsx]    "use client"
│   │   └── ResponsibilityCard × 8
│   ├── TechnicalSkills  [sections/TechnicalSkills.tsx] "use client"
│   │   └── SkillBadge × N (grouped by category)
│   ├── WorkExperience   [sections/WorkExperience.tsx]  "use client"
│   │   └── ExperienceEntry × N
│   ├── Projects         [sections/Projects.tsx]   "use client"
│   │   └── ProjectCard × N
│   ├── Tools            [sections/Tools.tsx]      "use client"
│   │   └── ToolTile × N
│   └── Contact          [sections/Contact.tsx]    "use client"
│       └── ContactForm
└── Footer               [layout/Footer.tsx]       "use client"
```

Setiap section menerima data props yang relevan. Komponen `AnimatedSection` membungkus konten section untuk entrance animation.

---

## Data Structures & TypeScript Interfaces

Semua interface dan data didefinisikan di `src/data/portfolio.ts`.

```typescript
// ─── Personal Info ────────────────────────────────────────────────────────────
export interface SocialLink {
  platform: 'linkedin' | 'github' | 'email';
  url: string;
  label: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;         // short subtitle below title
  bio: string;             // hero introduction paragraph
  aboutBio: string;        // longer about me paragraph
  highlights: Highlight[];
  profileImage: string;    // path to public/images/profile.jpg
  social: SocialLink[];
  contact: ContactInfo;
}

export interface Highlight {
  label: string;           // e.g. "3+ Years Experience"
  value: string;           // e.g. "3+"
  icon: string;            // Lucide icon name string
}

export interface ContactInfo {
  email: string;
  linkedin: string;
  phone?: string;
}

// ─── Responsibilities (What I Do) ─────────────────────────────────────────────
export interface Responsibility {
  id: string;
  title: string;
  description: string;
  icon: string;            // Lucide icon name string
}

// ─── Technical Skills ─────────────────────────────────────────────────────────
export interface Skill {
  name: string;
  level?: 'beginner' | 'intermediate' | 'advanced';  // optional, used for styling
}

export interface SkillCategory {
  id: string;
  category: string;        // e.g. "Operating Systems"
  skills: Skill[];
}

// ─── Work Experience ──────────────────────────────────────────────────────────
export interface WorkExperience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;       // format: "MMM YYYY", e.g. "Jan 2022"
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
  category: string;        // e.g. "Infrastructure Rollout", "System Migration"
  description: string;
  role: string;
  technologies: string[];
  keyContribution: string;
  image: string;           // path to public/images/projects/*.jpg
  imageAlt: string;
}

// ─── Tools & Technologies ─────────────────────────────────────────────────────
export interface Tool {
  id: string;
  name: string;
  icon: string;            // path to SVG/PNG in public/ OR Lucide icon name
  category: string;        // for grouping, e.g. "Remote Support", "OS", "Office"
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
```

### Placeholder Data Overview

```typescript
// src/data/portfolio.ts (excerpt — placeholder values)
export const portfolioData: PortfolioData = {
  personal: {
    name: "Rizky Pratama",
    title: "IT Support",
    tagline: "Keeping systems running, people productive.",
    bio: "Profesional IT Support dengan pengalaman lebih dari 3 tahun...",
    aboutBio: "Saya berfokus pada stabilitas sistem, kepuasan pengguna...",
    highlights: [
      { label: "Tahun Pengalaman", value: "3+", icon: "Briefcase" },
      { label: "Proyek Selesai",   value: "15+", icon: "CheckCircle" },
      { label: "Tiket Diselesaikan", value: "500+", icon: "Ticket" },
    ],
    profileImage: "/images/profile.jpg",
    social: [
      { platform: "linkedin", url: "https://linkedin.com/in/rizkypratama", label: "LinkedIn" },
      { platform: "github",   url: "https://github.com/rizkypratama",    label: "GitHub" },
    ],
    contact: {
      email: "rizky.pratama@email.com",
      linkedin: "https://linkedin.com/in/rizkypratama",
      phone: "+62 812-3456-7890",
    },
  },

  experiences: [
    {
      id: "exp-1",
      jobTitle: "IT Support Specialist",
      company: "PT. Solusi Teknologi Nusantara",
      location: "Jakarta, Indonesia",
      startDate: "Mar 2022",
      endDate: "Present",
      description: "Bertanggung jawab atas dukungan teknis harian...",
      responsibilities: [
        "Mengelola 200+ endpoint Windows dan macOS",
        "Implementasi dan pemeliharaan Active Directory",
        "Penanganan tiket helpdesk dengan SLA < 4 jam",
      ],
      achievements: [
        "Mengurangi downtime 40% melalui proactive monitoring",
        "Implementasi otomatisasi onboarding yang memangkas waktu setup 60%",
      ],
      technologies: ["Windows Server", "Active Directory", "Jira", "Zabbix"],
    },
    {
      id: "exp-2",
      jobTitle: "IT Support Technician",
      company: "CV. Mitra Digital Solusi",
      location: "Bandung, Indonesia",
      startDate: "Jun 2020",
      endDate: "Feb 2022",
      description: "Memberikan dukungan teknis...",
      responsibilities: [
        "Troubleshooting hardware dan software pengguna",
        "Instalasi dan konfigurasi OS Windows 10/11",
        "Manajemen aset IT perusahaan",
      ],
      achievements: [],
      technologies: ["Windows 10", "Office 365", "TeamViewer"],
    },
  ],

  projects: [
    {
      id: "proj-1",
      title: "Migrasi Sistem ERP ke Cloud",
      category: "System Migration",
      description: "Koordinasi migrasi sistem ERP on-premise ke cloud Azure...",
      role: "IT Support Lead",
      technologies: ["Microsoft Azure", "Windows Server 2019", "SQL Server"],
      keyContribution: "Memimpin koordinasi teknis migrasi 50+ workstation...",
      image: "/images/projects/project-1.jpg",
      imageAlt: "Diagram migrasi sistem ERP ke cloud Azure",
    },
    // ... more projects
  ],

  // ... skills, tools, responsibilities
};
```

---

## Color Palette & Typography

### Color System

Didefinisikan sebagai CSS custom properties di `src/app/globals.css` dan dikonfigurasi di `tailwind.config.ts`.

```css
/* src/app/globals.css */
:root {
  /* Background layers */
  --color-bg-primary:    #0a0a0f;   /* darkest background */
  --color-bg-secondary:  #111118;   /* section alternating bg */
  --color-bg-card:       #1a1a24;   /* card backgrounds */
  --color-bg-elevated:   #22222e;   /* elevated / hover states */

  /* Accent */
  --color-accent:        #6366f1;   /* indigo-500 — primary CTA, active states */
  --color-accent-light:  #818cf8;   /* indigo-400 — hover accent */
  --color-accent-glow:   rgba(99, 102, 241, 0.15); /* glow/shadow */

  /* Text */
  --color-text-primary:  #f1f5f9;   /* slate-100 — headings */
  --color-text-secondary:#94a3b8;   /* slate-400 — body text */
  --color-text-muted:    #475569;   /* slate-600 — labels, captions */

  /* Border */
  --color-border:        #1e1e2e;   /* subtle card borders */
  --color-border-accent: rgba(99, 102, 241, 0.3); /* accent-tinted border */

  /* Status */
  --color-success:       #22c55e;   /* green-500 */
  --color-error:         #ef4444;   /* red-500 */
}
```

```ts
// tailwind.config.ts (extend colors)
colors: {
  bg: {
    primary:   'var(--color-bg-primary)',
    secondary: 'var(--color-bg-secondary)',
    card:      'var(--color-bg-card)',
    elevated:  'var(--color-bg-elevated)',
  },
  accent:    'var(--color-accent)',
  'accent-light': 'var(--color-accent-light)',
  text: {
    primary:   'var(--color-text-primary)',
    secondary: 'var(--color-text-secondary)',
    muted:     'var(--color-text-muted)',
  },
  border: {
    DEFAULT: 'var(--color-border)',
    accent: 'var(--color-border-accent)',
  },
}
```

**Kontras yang dipastikan:**
- `--color-text-primary` (#f1f5f9) on `--color-bg-primary` (#0a0a0f): ratio ≈ **17.5:1** ✓
- `--color-text-secondary` (#94a3b8) on `--color-bg-card` (#1a1a24): ratio ≈ **6.2:1** ✓
- `--color-accent` (#6366f1) on `--color-bg-primary` (#0a0a0f): ratio ≈ **5.1:1** ✓ (digunakan hanya pada ikon/dekoratif, bukan body text)

### Typography

Font dimuat via `next/font/google` di `src/app/layout.tsx`.

```tsx
// src/app/layout.tsx
import { Inter, JetBrains_Mono } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});
```

| Token            | Font                     | Size (desktop) | Weight | Usage                    |
|------------------|--------------------------|----------------|--------|--------------------------|
| `text-hero`      | Inter                    | 4.5rem (72px)  | 700    | Hero name heading        |
| `text-h1`        | Inter                    | 3rem (48px)    | 700    | Section headings         |
| `text-h2`        | Inter                    | 2rem (32px)    | 600    | Sub-headings             |
| `text-h3`        | Inter                    | 1.25rem (20px) | 600    | Card titles              |
| `text-body`      | Inter                    | 1rem (16px)    | 400    | Body text                |
| `text-small`     | Inter                    | 0.875rem (14px)| 400    | Labels, captions         |
| `text-mono`      | JetBrains Mono           | 0.875rem (14px)| 400    | Tech stack tags, code    |

**Responsive scaling:** headings scale down ~20% on mobile via Tailwind responsive prefixes (`text-4xl md:text-5xl lg:text-7xl`).

---

## Section Designs

### Navigation

```
┌────────────────────────────────────────────────────────┐
│  [Logo/Name]    About  Skills  Experience  Projects  Contact  │
└────────────────────────────────────────────────────────┘
```

- `position: sticky; top: 0; z-index: 50`
- Background: `bg-bg-primary/80 backdrop-blur-md` — glassmorphism dark
- Active link: `text-accent` with `border-b-2 border-accent`
- Mobile: hamburger icon (Lucide `Menu`/`X`), drawer slides in from top
- Active section detection via `useActiveSection` hook (IntersectionObserver)

**Nav Links (internal anchors):**

| Label        | href anchor       |
|--------------|-------------------|
| About        | `#about`          |
| Skills       | `#skills`         |
| Experience   | `#experience`     |
| Projects     | `#projects`       |
| Contact      | `#contact`        |

### Hero Section (`#hero`)

```
┌─────────────────────────────────────────────┐
│                                             │
│   [GREETING: "Hello, I'm"]                  │
│   [NAME — h1, large, bold]                  │
│   [TITLE — gradient accent text]            │
│   [Tagline — body text]                     │
│   [Bio paragraph]                           │
│                                             │
│   [View My Work ▶]  [Contact Me]            │
│   [🔗 LinkedIn]  [🔗 GitHub]               │
│                                             │
└─────────────────────────────────────────────┘
```

- Full viewport height (`min-h-screen`)
- Name uses gradient text: `bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent`
- CTA primary button: `bg-accent hover:bg-accent-light text-white`
- CTA secondary button: `border border-accent text-accent hover:bg-accent/10`
- Social icons: Lucide `Linkedin`, `Github`

### About Section (`#about`)

Two-column layout on desktop, stacked on mobile:

```
┌──────────────────┬──────────────────────────────┐
│  [Profile Photo] │  [Bio Paragraph]              │
│  (rounded, border│  [Highlight 1] [Highlight 2]  │
│   accent glow)   │  [Highlight 3]                │
└──────────────────┴──────────────────────────────┘
```

- Photo: `Next.js Image` component, `width=400 height=400`, `rounded-2xl`, border with accent glow
- Highlights displayed as icon + value + label cards in 3-column flex row

### What I Do Section (`#what-i-do`)

```
┌────────────────────────────────────────────────────┐
│  [Section Heading: "What I Do"]                     │
│                                                    │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
│  │ [Icon]   │  │ [Icon]   │  │ [Icon]   │  │ [Icon]   │
│  │ Title    │  │ Title    │  │ Title    │  │ Title    │
│  │ Desc...  │  │ Desc...  │  │ Desc...  │  │ Desc...  │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘
│  ... (2nd row of 4 cards)                           │
└────────────────────────────────────────────────────┘
```

Grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`
Card hover: `border-accent` transition + `bg-bg-elevated`

**Eight Responsibility Cards:**

| Icon (Lucide)       | Title                                  |
|---------------------|----------------------------------------|
| `Headphones`        | IT Support                             |
| `Users`             | User Support                           |
| `Wrench`            | Hardware & Software Troubleshooting    |
| `Server`            | System Support                         |
| `FolderKanban`      | Project Implementation Support         |
| `Settings2`         | IT Operations Support                  |
| `FileText`          | Documentation                          |
| `DatabaseZap`       | Data Validation                        |

### Technical Skills Section (`#skills`)

```
┌────────────────────────────────────────────────────┐
│  [Section Heading: "Technical Skills"]              │
│                                                    │
│  Operating Systems                                 │
│  [Windows 10/11] [Windows Server] [Linux Ubuntu]   │
│                                                    │
│  Networking                                        │
│  [TCP/IP] [DNS] [DHCP] [VPN] [LAN/WAN]             │
│  ... (8 categories)                               │
└────────────────────────────────────────────────────┘
```

Eight categories, each with header + badge row. Responsive: categories 2-col on tablet, 1-col on mobile.

**Skill Categories & Placeholder Skills:**

| Category               | Placeholder Skills                                          |
|------------------------|-------------------------------------------------------------|
| Operating Systems      | Windows 10/11, Windows Server 2016/2019, Ubuntu, CentOS    |
| Networking             | TCP/IP, DNS, DHCP, VPN, Firewall, LAN/WAN, Wi-Fi           |
| Hardware               | PC Assembly, Printer, UPS, CCTV, Cabling, Rack             |
| Software               | MS Office 365, Adobe Acrobat, Antivirus, ERP SAP           |
| Database               | MySQL, SQL Server, PostgreSQL (query-level)                |
| Data Tools             | Microsoft Excel (pivot, VLOOKUP), Power BI (basic)         |
| IT Support Tools       | Jira, ServiceNow, Zendesk, TeamViewer, AnyDesk, Zabbix     |
| Other Technical Skills | Active Directory, Group Policy, ITIL v4, Remote Desktop    |

### Work Experience Section (`#experience`)

Vertical timeline with center-line divider on desktop, left-aligned on mobile:

```
      ● ── [Job Title @ Company] ── [Period]
      │    [Description]
      │    Responsibilities:
      │    • item 1
      │    • item 2
      │    Achievements:
      │    ★ achievement 1
      │
      ● ── [Next Entry]
```

- Timeline line: `border-l-2 border-accent/30 ml-4`
- Timeline dot: `w-3 h-3 bg-accent rounded-full absolute -left-[7px]`
- Each entry animates in with `motion.div` slide-from-left when in viewport

### Selected Projects Section (`#projects`)

```
┌────────────────────────────────────────────────────┐
│  [Section Heading: "Selected Projects"]             │
│                                                    │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│  │ [Image]     │  │ [Image]     │  │ [Image]     │
│  │ Category    │  │ Category    │  │ Category    │
│  │ Title       │  │ Title       │  │ Title       │
│  │ Description │  │ Description │  │ Description │
│  │ Role        │  │ Role        │  │ Role        │
│  │ [Tech tags] │  │ [Tech tags] │  │ [Tech tags] │
│  │ Contribution│  │ Contribution│  │ Contribution│
│  └─────────────┘  └─────────────┘  └─────────────┘
└────────────────────────────────────────────────────┘
```

Grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
Card hover: `shadow-lg shadow-accent/10 border-accent/30` transition

**Placeholder Projects:**

| Title                              | Category              |
|------------------------------------|-----------------------|
| Migrasi Sistem ERP ke Cloud        | System Migration      |
| Implementasi Helpdesk ITSM         | IT Operations Support |
| Rollout Infrastruktur Jaringan     | Infrastructure        |
| IT Asset Management System         | IT Asset Management   |

### Tools & Technologies Section (`#tools`)

```
┌────────────────────────────────────────────────────┐
│  [Section Heading: "Tools & Technologies"]          │
│                                                    │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐         │
│  │ [Logo]   │  │ [Logo]   │  │ [Logo]   │  ...    │
│  │  Name    │  │  Name    │  │  Name    │         │
│  └──────────┘  └──────────┘  └──────────┘         │
└────────────────────────────────────────────────────┘
```

Grid: `grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8`
Tile hover: `scale-110 shadow-accent/20` via Framer Motion `whileHover`

**Placeholder Tools:**

Windows, Linux, macOS, Office 365, Teams, Jira, ServiceNow, Zendesk, TeamViewer, AnyDesk, Zabbix, Nagios, Active Directory, Azure AD, VMware, VirtualBox, Wireshark, Cisco Packet Tracer, MySQL Workbench, Power BI

### Contact Section (`#contact`)

Two-column layout — form left, contact info right:

```
┌──────────────────────────┬────────────────────────┐
│  Contact Form            │  Contact Info           │
│  [Name field]            │  📧 email@example.com   │
│  [Email field]           │  🔗 LinkedIn URL        │
│  [Subject field]         │  📱 +62 xxx-xxxx        │
│  [Message textarea]      │                         │
│  [Send Message ▶]        │                         │
│  [✓ Success msg]         │                         │
└──────────────────────────┴────────────────────────┘
```

---

## Routing & Scroll Behavior

### Smooth Scroll

```css
/* src/app/globals.css */
html {
  scroll-behavior: smooth;
}
```

Setiap section memiliki `id` attribute yang menjadi anchor target:

```tsx
// section ID mapping
const SECTIONS = [
  { id: 'hero',       label: 'Home' },
  { id: 'about',      label: 'About' },
  { id: 'what-i-do',  label: null },      // tidak tampil di nav
  { id: 'skills',     label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects',   label: 'Projects' },
  { id: 'tools',      label: null },      // tidak tampil di nav
  { id: 'contact',    label: 'Contact' },
] as const;
```

### Active Section Detection

```ts
// src/hooks/useActiveSection.ts
export function useActiveSection(sectionIds: string[]): string {
  const [activeSection, setActiveSection] = useState(sectionIds[0]);

  useEffect(() => {
    const observers = sectionIds.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.4, rootMargin: '-80px 0px 0px 0px' }
      );
      observer.observe(el);
      return observer;
    });

    return () => observers.forEach((o) => o?.disconnect());
  }, [sectionIds]);

  return activeSection;
}
```

---

## Animation Patterns

### Framer Motion Variants (shared across components)

```ts
// src/lib/animations.ts

// Entrance animation — section content
export const fadeInUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

// Stagger container — child items animate sequentially
export const staggerContainer = {
  hidden:  {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

// Slide in from left — timeline entries
export const slideInLeft = {
  hidden:  { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

// Card hover — subtle lift
export const cardHover = {
  rest:  { scale: 1, y: 0 },
  hover: { scale: 1.02, y: -4, transition: { duration: 0.2 } },
};
```

### AnimatedSection Wrapper Component

```tsx
// src/components/ui/AnimatedSection.tsx
"use client";
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedSection({ children, className, delay = 0 }: AnimatedSectionProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeInUp}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

### Hover Animations by Element Type

| Element             | Animation                                  | Implementation                        |
|---------------------|--------------------------------------------|---------------------------------------|
| CTA Button (primary)| scale 1.05 + background lighten            | `whileHover={{ scale: 1.05 }}`        |
| CTA Button (outline)| background fill accent/10                  | Tailwind `hover:bg-accent/10`         |
| Responsibility Card | border-accent + bg-elevated                | Tailwind `hover:border-accent`        |
| Skill Badge         | scale 1.05 + accent text                   | `whileHover={{ scale: 1.05 }}`        |
| Project Card        | y: -8 + shadow-accent                      | `whileHover={{ y: -8 }}`             |
| Tool Tile           | scale 1.1 + glow shadow                    | `whileHover={{ scale: 1.1 }}`        |
| Social Icon         | color to accent + scale 1.1               | Tailwind `hover:text-accent`          |
| Nav Link            | color to accent                            | Tailwind `hover:text-accent`          |

---

## Contact Form Implementation

### Architecture

Form menggunakan `useContactForm` custom hook yang memisahkan logika dari UI:

```ts
// src/hooks/useContactForm.ts
import emailjs from '@emailjs/browser';

export interface FormFields {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type FormErrors = Partial<Record<keyof FormFields, string>>;
export type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

function validate(fields: FormFields): FormErrors {
  const errors: FormErrors = {};
  if (!fields.name.trim())    errors.name    = 'Nama wajib diisi.';
  if (!fields.email.trim())   errors.email   = 'Email wajib diisi.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
                               errors.email   = 'Format email tidak valid.';
  if (!fields.subject.trim()) errors.subject = 'Subjek wajib diisi.';
  if (!fields.message.trim()) errors.message = 'Pesan wajib diisi.';
  return errors;
}

export function useContactForm() {
  const [fields, setFields]   = useState<FormFields>({ name:'', email:'', subject:'', message:'' });
  const [errors, setErrors]   = useState<FormErrors>({});
  const [status, setStatus]   = useState<SubmitStatus>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFields(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormFields]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(fields);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setStatus('loading');
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        { ...fields },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
      );
      setStatus('success');
      setFields({ name:'', email:'', subject:'', message:'' });
    } catch {
      setStatus('error');
      // fields preserved — no reset on error
    }
  };

  return { fields, errors, status, handleChange, handleSubmit };
}
```

### EmailJS Setup

```
.env.local
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxxxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxx
```

EmailJS template variables: `{{name}}`, `{{email}}`, `{{subject}}`, `{{message}}`

### Mailto Fallback

Jika EmailJS tidak dikonfigurasi (env vars kosong), form fallback ke:

```ts
const mailtoUrl = `mailto:${contactInfo.email}?subject=${encodeURIComponent(fields.subject)}&body=${encodeURIComponent(`Name: ${fields.name}\nEmail: ${fields.email}\n\n${fields.message}`)}`;
window.open(mailtoUrl);
```

---

## SEO & Metadata

```tsx
// src/app/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rizky Pratama — IT Support Professional',
  description: 'Portfolio profesional IT Support dengan pengalaman 3+ tahun dalam sistem administrasi, jaringan, helpdesk, dan infrastruktur IT.',
  openGraph: {
    title: 'Rizky Pratama — IT Support Professional',
    description: 'Portfolio profesional IT Support dengan pengalaman 3+ tahun.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rizky Pratama — IT Support Professional',
    description: 'Portfolio profesional IT Support dengan pengalaman 3+ tahun.',
  },
};
```

---

## Responsive Design Breakpoints

| Breakpoint | Range         | Grid Columns                              |
|------------|---------------|-------------------------------------------|
| Mobile     | < 768px       | 1 column; hamburger nav; stacked layouts  |
| Tablet     | 768–1023px    | 2 columns for cards; responsive nav       |
| Desktop    | ≥ 1024px      | Full multi-column; sticky nav; side-by-side sections |

All responsive classes follow Tailwind mobile-first convention: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`.

---

## Error Handling

| Scenario                   | Handling                                                  |
|----------------------------|-----------------------------------------------------------|
| Contact form — empty field | Inline error message below field, red border on input     |
| EmailJS send failure       | Error notification banner, form values preserved          |
| Image load failure         | Next.js Image fallback via `placeholder="blur"` or onError|
| EmailJS env vars missing   | Fallback to mailto behavior                               |
| TypeScript type errors     | Strict mode enabled; compile-time enforcement             |

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Data File Round-Trip Rendering

For any portfolio data item stored in `portfolioData` (experience entry, project, skill, tool, personal info field), the corresponding section component when rendered with that data SHALL include that item's key identifying text in the rendered output.

**Validates: Requirements 1.6, 13.1, 13.4**

---

### Property 2: Navigation Drawer Toggle Idempotence

For any initial navigation drawer state (open or closed), clicking the hamburger button an even number of times SHALL return the drawer to its original state, and clicking an odd number of times SHALL result in the opposite state.

**Validates: Requirements 2.6**

---

### Property 3: WCAG AA Color Contrast

For any text-background color pair used in the design system (as defined in CSS custom properties), the computed WCAG contrast ratio SHALL be greater than or equal to 4.5:1.

**Validates: Requirements 3.6**

---

### Property 4: Hero Personal Info Rendering

For any `PersonalInfo` object, the Hero component SHALL render the `name` field as the primary heading (`h1`), the `title` field as the subtitle, the `bio` field as the introduction paragraph, and all entries in the `social` array as icon links.

**Validates: Requirements 4.1, 4.3, 4.6**

---

### Property 5: Work Experience Complete Field Rendering

For any `WorkExperience` entry, the `ExperienceEntry` component SHALL render all of: `jobTitle`, `company`, `startDate`/`endDate` period, `description`, and every item in the `responsibilities` array. When the `achievements` array is non-empty, the component SHALL also render each achievement in a separate labeled section.

**Validates: Requirements 8.2, 8.3, 8.4**

---

### Property 6: Project Card Complete Field Rendering

For any `Project` entry, the `ProjectCard` component SHALL render all of: `title`, `category`, `description`, `role`, every item in `technologies`, and `keyContribution`.

**Validates: Requirements 9.1**

---

### Property 7: Contact Form Validation Completeness

For any combination of empty required fields in the contact form (name, email, subject, message), submitting the form SHALL produce an inline validation error message for each and every empty field, without submitting to EmailJS or refreshing the page.

**Validates: Requirements 11.3**

---

### Property 8: Contact Section Static Info Rendering

For any `ContactInfo` object, the Contact section SHALL render the `email` address and `linkedin` URL as visible static text elements. When `phone` is present, it SHALL also be rendered.

**Validates: Requirements 11.6**

---

### Property 9: Footer Social Links Consistency

For any `PersonalInfo` with a `social` array, the Footer component SHALL render the same set of social links (same platforms and URLs) as the Hero component.

**Validates: Requirements 12.4**

---

### Property 10: Footer Copyright Year Currency

For any current calendar year Y, the Footer component SHALL render a copyright notice string that contains the string representation of Y.

**Validates: Requirements 12.2**

---

### Property 11: Skill Badge Complete Rendering

For any `SkillCategory` entry with a `skills` array, the `TechnicalSkills` section SHALL render a labeled badge element for every skill in that array, grouped under the category heading.

**Validates: Requirements 7.2**

---

### Property 12: Tool Tile Name Rendering

For any `Tool` entry in the tools data array, the `Tools` section SHALL render a tile element that contains the tool's `name` as visible text.

**Validates: Requirements 10.1**

---

### Property 13: About Highlights Complete Rendering

For any `PersonalInfo` with a `highlights` array, the `About` section SHALL render a visual element for every item in the array.

**Validates: Requirements 5.1, 5.3**
