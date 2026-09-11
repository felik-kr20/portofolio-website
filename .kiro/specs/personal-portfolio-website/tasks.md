# Implementation Plan: Personal Portfolio Website — IT Support Professional

## Overview

Implementasi single-page portfolio Next.js 14 (App Router) dengan TypeScript, Tailwind CSS, Framer Motion, dan Lucide React. Arsitektur terdiri dari satu page server component (`page.tsx`) yang meng-compose semua section client components, dengan seluruh data portfolio terpusat di `src/data/portfolio.ts`. Contact form menggunakan EmailJS dengan fallback mailto.

---

## Tasks

- [x] 1. Setup project structure, dependencies, dan konfigurasi dasar
  - Inisialisasi proyek Next.js 14 dengan TypeScript menggunakan `create-next-app`
  - Install dependencies: `framer-motion`, `lucide-react`, `@emailjs/browser`, `clsx`, `tailwind-merge`
  - Konfigurasi `tailwind.config.ts`: extend color tokens sesuai design (bg, accent, text, border CSS vars)
  - Buat `src/app/globals.css`: definisikan CSS custom properties color system, scroll-behavior smooth, reset/base styles
  - Buat `src/app/layout.tsx`: load font Inter dan JetBrains Mono via `next/font/google`, pasang metadata SEO + Open Graph
  - Buat `src/lib/utils.ts`: export fungsi `cn()` menggunakan `clsx` + `tailwind-merge`
  - Buat `src/lib/animations.ts`: export Framer Motion variants `fadeInUp`, `staggerContainer`, `slideInLeft`, `cardHover`
  - Buat file `.env.local` dengan placeholder keys: `NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`, `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
  - Buat struktur direktori: `public/images/projects/`, `src/components/layout/`, `src/components/sections/`, `src/components/ui/`, `src/data/`, `src/hooks/`
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 14.1, 14.2_

- [x] 2. Buat data file terpusat dan TypeScript interfaces
  - [x] 2.1 Definisikan semua TypeScript interfaces di `src/data/portfolio.ts`
    - Buat interfaces: `SocialLink`, `Highlight`, `ContactInfo`, `PersonalInfo`, `Responsibility`, `Skill`, `SkillCategory`, `WorkExperience`, `Project`, `Tool`, `PortfolioData`
    - Pastikan field `achievements?: string[]` bersifat optional di `WorkExperience`
    - Pastikan field `phone?: string` bersifat optional di `ContactInfo`
    - _Requirements: 1.6, 13.1, 13.3_

  - [x] 2.2 Isi placeholder data lengkap di `src/data/portfolio.ts`
    - `personal`: name "Rizky Pratama", title "IT Support", tagline, bio, aboutBio, 3 highlights, profileImage, 2 social links, contactInfo
    - `responsibilities`: 8 kartu (IT Support, User Support, Hardware & Software Troubleshooting, System Support, Project Implementation Support, IT Operations Support, Documentation, Data Validation) masing-masing dengan icon Lucide, title, description
    - `skillCategories`: 8 kategori (Operating Systems, Networking, Hardware, Software, Database, Data Tools, IT Support Tools, Other Technical Skills) dengan skill badges sesuai design
    - `experiences`: 2 entri pengalaman kerja dengan company fiktif (PT. Solusi Teknologi Nusantara, CV. Mitra Digital Solusi), responsibilities, achievements
    - `projects`: 4 proyek IT non-coding (Migrasi ERP, Helpdesk ITSM, Rollout Jaringan, IT Asset Management)
    - `tools`: 20 tool/teknologi (Windows, Linux, macOS, Office 365, Teams, Jira, ServiceNow, Zendesk, TeamViewer, AnyDesk, Zabbix, Nagios, Active Directory, Azure AD, VMware, VirtualBox, Wireshark, Cisco Packet Tracer, MySQL Workbench, Power BI)
    - Export `portfolioData` sebagai `PortfolioData`
    - _Requirements: 1.6, 13.1, 13.2, 13.4_

  - [ ]* 2.3 Tulis property test untuk Data File Round-Trip Rendering
    - **Property 1: Data File Round-Trip Rendering**
    - Untuk setiap item di `portfolioData` (experience, project, skill, tool, personal info), verifikasi bahwa key identifying text tersedia dalam data yang di-export
    - **Validates: Requirements 1.6, 13.1, 13.4**

- [x] 3. Buat shared UI components
  - [x] 3.1 Buat `src/components/ui/AnimatedSection.tsx`
    - Client component dengan `motion.div`, `initial="hidden"`, `whileInView="visible"`, `viewport={{ once: true, amount: 0.2 }}`
    - Gunakan variant `fadeInUp` dari `src/lib/animations.ts`
    - Props: `children`, `className?`, `delay?`
    - _Requirements: 3.5_

  - [x] 3.2 Buat `src/components/ui/SectionHeading.tsx`
    - Komponen reusable untuk judul section: `<h2>` + optional subtitle `<p>`
    - Styling: `text-text-primary`, font Inter, sesuai typography tokens
    - _Requirements: 1.5_

  - [x] 3.3 Buat `src/components/ui/SkillBadge.tsx`
    - Render badge/tag untuk skill individual
    - `whileHover={{ scale: 1.05 }}` via Framer Motion
    - Styling: `bg-bg-card border border-border text-text-secondary text-mono`
    - _Requirements: 7.2_

  - [x] 3.4 Buat `src/components/ui/ResponsibilityCard.tsx`
    - Props: `responsibility: Responsibility`
    - Render Lucide icon (dynamic), title, description
    - Hover: `hover:border-accent hover:bg-bg-elevated` via Tailwind transition
    - _Requirements: 6.2, 6.3_

  - [x] 3.5 Buat `src/components/ui/ExperienceEntry.tsx`
    - Props: `experience: WorkExperience`
    - Render: jobTitle, company, period (startDate–endDate), description, responsibilities list, achievements list (conditional)
    - Timeline dot + vertical line styling
    - Entrance animation: `slideInLeft` variant via Framer Motion `whileInView`
    - _Requirements: 8.1, 8.2, 8.3, 8.4_

  - [ ]* 3.6 Tulis property test untuk Work Experience Complete Field Rendering
    - **Property 5: Work Experience Complete Field Rendering**
    - Untuk setiap `WorkExperience` entry, verifikasi semua field wajib ter-render dan achievements hanya muncul jika array non-empty
    - **Validates: Requirements 8.2, 8.3, 8.4**

  - [x] 3.7 Buat `src/components/ui/ProjectCard.tsx`
    - Props: `project: Project`
    - Render: Next.js `Image` (placeholder), category badge, title, description, role, technologies tags, keyContribution
    - Hover: `whileHover={{ y: -8 }}` + `shadow-accent/10 border-accent/30` transition
    - _Requirements: 9.1, 9.2_

  - [ ]* 3.8 Tulis property test untuk Project Card Complete Field Rendering
    - **Property 6: Project Card Complete Field Rendering**
    - Untuk setiap `Project` entry, verifikasi semua field (title, category, description, role, technologies, keyContribution) ter-render sebagai teks
    - **Validates: Requirements 9.1**

  - [x] 3.9 Buat `src/components/ui/ToolTile.tsx`
    - Props: `tool: Tool`
    - Render: icon/logo + name label
    - Hover: `whileHover={{ scale: 1.1 }}` + glow shadow via Framer Motion
    - _Requirements: 10.1_

  - [ ]* 3.10 Tulis property test untuk Tool Tile Name Rendering
    - **Property 12: Tool Tile Name Rendering**
    - Untuk setiap `Tool` entry, verifikasi `name` ter-render sebagai visible text di dalam tile element
    - **Validates: Requirements 10.1**

- [x] 4. Checkpoint — Pastikan semua UI components dapat di-import tanpa error TypeScript
  - Ensure all tests pass, ask the user if questions arise.

- [x] 5. Buat custom hooks
  - [x] 5.1 Buat `src/hooks/useActiveSection.ts`
    - Terima array `sectionIds: string[]`
    - Gunakan `IntersectionObserver` dengan `threshold: 0.4` dan `rootMargin: '-80px 0px 0px 0px'`
    - Return `activeSection: string`
    - _Requirements: 2.4_

  - [ ]* 5.2 Tulis property test untuk Navigation Drawer Toggle Idempotence
    - **Property 2: Navigation Drawer Toggle Idempotence**
    - Toggle genap kali → kembali ke state awal; toggle ganjil kali → opposite state
    - Test menggunakan state machine sederhana atau React Testing Library
    - **Validates: Requirements 2.6**

  - [x] 5.3 Buat `src/hooks/useContactForm.ts`
    - Manage state `fields: FormFields`, `errors: FormErrors`, `status: SubmitStatus`
    - Implementasi fungsi `validate()`: cek semua field required + format email regex
    - `handleSubmit`: jalankan validasi → jika valid kirim via EmailJS → fallback mailto jika env vars kosong
    - Preserve form values saat status `'error'`; reset form saat status `'success'`
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5_

  - [ ]* 5.4 Tulis property test untuk Contact Form Validation Completeness
    - **Property 7: Contact Form Validation Completeness**
    - Untuk setiap kombinasi field kosong (name, email, subject, message), submit form SHALL menghasilkan error message untuk setiap field yang kosong
    - Generate semua 15 kombinasi subset non-empty dari 4 field required
    - **Validates: Requirements 11.3**

- [x] 6. Buat Navigation component
  - [x] 6.1 Buat `src/components/layout/Navigation.tsx`
    - Sticky nav: `position sticky top-0 z-50`, `bg-bg-primary/80 backdrop-blur-md`
    - Render logo/name di kiri, nav links di kanan (desktop)
    - Gunakan `useActiveSection` hook untuk highlight active link (`text-accent border-b-2 border-accent`)
    - Mobile: hamburger icon (Lucide `Menu`/`X`), toggle drawer state
    - Mobile drawer: full-width, slides dari top, tampilkan semua nav links
    - Smooth scroll on nav link click via `href="#section-id"`
    - _Requirements: 2.2, 2.3, 2.4, 2.5, 2.6_

- [x] 7. Buat Hero section
  - [x] 7.1 Buat `src/components/sections/Hero.tsx`
    - Props: `data: PersonalInfo`
    - Render: greeting text, name sebagai `<h1>` dengan gradient text (`bg-gradient-to-r from-accent to-accent-light`), title, tagline, bio paragraph
    - CTA primary: "View My Work" → scroll ke `#projects`; CTA secondary: "Contact Me" → scroll ke `#contact`
    - Social icon links (LinkedIn, GitHub) menggunakan Lucide icons
    - CTA primary: `whileHover={{ scale: 1.05 }}`; outline button: `hover:bg-accent/10`
    - Full viewport height: `min-h-screen`
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7_

  - [ ]* 7.2 Tulis property test untuk Hero Personal Info Rendering
    - **Property 4: Hero Personal Info Rendering**
    - Untuk setiap `PersonalInfo` object, verifikasi `name` ter-render sebagai `h1`, `title` sebagai subtitle, `bio` sebagai paragraph, dan setiap item `social` ter-render sebagai link
    - **Validates: Requirements 4.1, 4.3, 4.6**

- [x] 8. Buat About section
  - [x] 8.1 Buat `src/components/sections/About.tsx`
    - Props: `data: PersonalInfo`
    - Two-column layout desktop (photo kiri, teks kanan), stacked mobile
    - Profile photo: `Next.js Image` component, `width=400 height=400`, `rounded-2xl`, border dengan accent glow
    - Render `aboutBio` paragraph
    - Render `highlights` sebagai 3 visual stat cards: icon + value + label
    - _Requirements: 5.1, 5.2, 5.3_

  - [ ]* 8.2 Tulis property test untuk About Highlights Complete Rendering
    - **Property 13: About Highlights Complete Rendering**
    - Untuk setiap `PersonalInfo` dengan `highlights` array, verifikasi setiap highlight item ter-render sebagai visual element
    - **Validates: Requirements 5.1, 5.3**

- [x] 9. Buat What I Do section
  - [x] 9.1 Buat `src/components/sections/WhatIDo.tsx`
    - Props: `data: Responsibility[]`
    - Render `SectionHeading` + responsive grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`
    - Render 8 `ResponsibilityCard` components
    - Wrap dengan `AnimatedSection`
    - _Requirements: 6.1, 6.4_

- [x] 10. Buat Technical Skills section
  - [x] 10.1 Buat `src/components/sections/TechnicalSkills.tsx`
    - Props: `data: SkillCategory[]`
    - Render `SectionHeading` + per-category heading dengan `SkillBadge` rows
    - Responsive layout: 2-col pada tablet, 1-col pada mobile
    - Wrap setiap kategori dengan `AnimatedSection` + stagger delay
    - _Requirements: 7.1, 7.2, 7.3, 7.5_

  - [ ]* 10.2 Tulis property test untuk Skill Badge Complete Rendering
    - **Property 11: Skill Badge Complete Rendering**
    - Untuk setiap `SkillCategory` entry, verifikasi setiap skill dalam `skills` array ter-render sebagai badge element dengan text yang sesuai
    - **Validates: Requirements 7.2**

- [x] 11. Buat Work Experience section
  - [x] 11.1 Buat `src/components/sections/WorkExperience.tsx`
    - Props: `data: WorkExperience[]`
    - Render `SectionHeading` + vertical timeline container
    - Timeline line: `border-l-2 border-accent/30 ml-4`
    - Render `ExperienceEntry` untuk setiap experience
    - _Requirements: 8.1, 8.5, 8.6_

- [x] 12. Buat Selected Projects section
  - [x] 12.1 Buat `src/components/sections/Projects.tsx`
    - Props: `data: Project[]`
    - Render `SectionHeading` + responsive grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
    - Render `ProjectCard` untuk setiap project
    - Wrap dengan `AnimatedSection` + stagger
    - _Requirements: 9.1, 9.3, 9.4, 9.5, 9.7_

- [x] 13. Buat Tools & Technologies section
  - [x] 13.1 Buat `src/components/sections/Tools.tsx`
    - Props: `data: Tool[]`
    - Render `SectionHeading` + responsive grid: `grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8`
    - Render `ToolTile` untuk setiap tool
    - Wrap dengan `AnimatedSection`
    - _Requirements: 10.1, 10.2, 10.3_

- [x] 14. Buat Contact Form dan Contact section
  - [x] 14.1 Buat `src/components/ui/ContactForm.tsx`
    - Gunakan `useContactForm` hook
    - Render 4 field: Name, Email, Subject, Message (textarea) — semua required
    - Tampilkan inline error per field jika `errors[field]` ada (merah, di bawah input)
    - Submit button: "Send Message", disable + loading state saat `status === 'loading'`
    - Tampilkan success notification saat `status === 'success'`
    - Tampilkan error notification saat `status === 'error'` (form values tetap preserved)
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5_

  - [x] 14.2 Buat `src/components/sections/Contact.tsx`
    - Props: `data: PersonalInfo`
    - Two-column layout: form kiri, contact info kanan
    - Contact info: email, LinkedIn URL, phone (conditional) sebagai static text elements
    - _Requirements: 11.1, 11.6_

  - [ ]* 14.3 Tulis property test untuk Contact Section Static Info Rendering
    - **Property 8: Contact Section Static Info Rendering**
    - Untuk setiap `ContactInfo` object, verifikasi email dan linkedin ter-render sebagai visible static text; phone hanya muncul jika ada
    - **Validates: Requirements 11.6**

- [x] 15. Checkpoint — Pastikan semua section components dapat di-import dan semua test hooks pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 16. Buat Footer component
  - [x] 16.1 Buat `src/components/layout/Footer.tsx`
    - Props: `data: PersonalInfo`
    - Render: name/logo mark, copyright notice dengan current year (`new Date().getFullYear()`)
    - Navigation shortcut links ke section utama
    - Social media icon links (konsisten dengan Hero — platform dan URL sama)
    - _Requirements: 12.1, 12.2, 12.3, 12.4_

  - [ ]* 16.2 Tulis property test untuk Footer Social Links Consistency
    - **Property 9: Footer Social Links Consistency**
    - Untuk setiap `PersonalInfo` dengan `social` array, verifikasi Footer me-render social links dengan platform dan URL yang identik dengan Hero
    - **Validates: Requirements 12.4**

  - [ ]* 16.3 Tulis property test untuk Footer Copyright Year Currency
    - **Property 10: Footer Copyright Year Currency**
    - Untuk setiap current calendar year Y, verifikasi Footer me-render string copyright yang mengandung representasi string dari Y
    - **Validates: Requirements 12.2**

- [x] 17. Wire semua komponen di page.tsx
  - [x] 17.1 Buat `src/app/page.tsx` sebagai Server Component
    - Import `portfolioData` dari `src/data/portfolio.ts`
    - Import semua section components
    - Render dalam urutan: `Navigation`, `<main>`, Hero, About, WhatIDo, TechnicalSkills, WorkExperience, Projects, Tools, Contact, `Footer`
    - Setiap section mendapat `id` attribute sesuai anchor mapping
    - Pass data props yang relevan ke setiap section dari `portfolioData`
    - Gunakan semantic HTML: `<header>` (nav), `<main>`, `<section>`, `<footer>`
    - _Requirements: 2.1, 2.7, 14.5_

  - [ ]* 17.2 Tulis property test untuk WCAG AA Color Contrast
    - **Property 3: WCAG AA Color Contrast**
    - Untuk setiap pasangan text-background color dari design system, verifikasi contrast ratio ≥ 4.5:1 menggunakan formula WCAG
    - Test pasangan: text-primary/bg-primary, text-secondary/bg-card, accent/bg-primary
    - **Validates: Requirements 3.6**

- [-] 18. Final checkpoint — Build dan verifikasi
  - Jalankan `npm run build` untuk memastikan tidak ada TypeScript error dan build berhasil
  - Verifikasi semua section terintegrasi dan dapat diakses via anchor links
  - Ensure all tests pass, ask the user if questions arise.

---

## Notes

- Tasks bertanda `*` bersifat opsional dan dapat dilewati untuk MVP yang lebih cepat
- Setiap task mereferensikan requirement spesifik untuk keterlacakan
- Property tests memvalidasi 13 correctness properties dari design document
- Semua data portfolio hanya diubah di `src/data/portfolio.ts`, tidak perlu menyentuh component files
- Gunakan `Next.js Image` component untuk semua gambar (`public/images/`)
- EmailJS env vars harus diisi di `.env.local` agar contact form berfungsi penuh; tanpa env vars, fallback ke mailto otomatis aktif
- Color contrast telah diverifikasi di design: semua pasangan utama memenuhi WCAG AA (≥ 4.5:1)

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["2.1"] },
    { "id": 1, "tasks": ["2.2"] },
    { "id": 2, "tasks": ["2.3", "3.1", "3.2", "5.1"] },
    { "id": 3, "tasks": ["3.3", "3.4", "3.5", "3.9", "5.3"] },
    { "id": 4, "tasks": ["3.6", "3.7", "3.10", "5.2", "5.4"] },
    { "id": 5, "tasks": ["3.8", "6.1", "7.1", "8.1", "9.1", "10.1", "11.1", "12.1", "13.1", "14.1"] },
    { "id": 6, "tasks": ["7.2", "8.2", "10.2", "14.2"] },
    { "id": 7, "tasks": ["14.3", "16.1"] },
    { "id": 8, "tasks": ["16.2", "16.3", "17.1"] },
    { "id": 9, "tasks": ["17.2"] }
  ]
}
```
