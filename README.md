# Portofolio Website — IT Support Professional

Personal portfolio website untuk IT Support professional, dibangun dengan **Next.js 14**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, dan **Lucide React**.

## Fitur

- Single-page application dengan 10 section: Hero, About, What I Do, Technical Skills, Work Experience, Projects, Tools, Contact, Footer
- Dark theme premium dan minimalis
- Animasi scroll dan hover menggunakan Framer Motion
- Navigasi sticky dengan active link highlighting
- Responsive di mobile, tablet, dan desktop
- Contact form dengan EmailJS (atau fallback mailto)
- SEO-ready dengan Open Graph meta tags
- Semua konten portfolio terpusat di satu file data

## Prerequisites

- **Node.js 18+** — unduh di [nodejs.org](https://nodejs.org/)
- npm 9+ (sudah termasuk bersama Node.js)

## Setup & Development

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Jalankan development server:**

   ```bash
   npm run dev
   ```

3. Buka [http://localhost:3000](http://localhost:3000) di browser.

## Build untuk Production

```bash
npm run build
npm run start
```

## Cara Mengustomisasi Konten Portfolio

Seluruh konten portfolio disimpan di satu file:

```
src/data/portfolio.ts
```

Edit file tersebut untuk mengubah:

| Data | Field |
|------|-------|
| Nama, jabatan, bio | `personal.name`, `personal.title`, `personal.bio` |
| Foto profil | `personal.profileImage` (path ke `public/images/profile.jpg`) |
| Highlight stats | `personal.highlights` |
| Social links | `personal.social` |
| Info kontak | `personal.contact` |
| Kartu "What I Do" | `responsibilities` |
| Kategori skill | `skillCategories` |
| Pengalaman kerja | `experiences` |
| Proyek | `projects` |
| Tools & teknologi | `tools` |

Setelah mengubah `portfolio.ts`, semua section di website akan otomatis mencerminkan data terbaru — tidak perlu menyentuh file component.

## Setup EmailJS (Contact Form)

Contact form menggunakan [EmailJS](https://www.emailjs.com/) untuk mengirim pesan tanpa backend server.

1. Daftar akun gratis di [emailjs.com](https://www.emailjs.com/)
2. Buat **Email Service** (Gmail, Outlook, dll.) dan catat **Service ID**
3. Buat **Email Template** dan catat **Template ID**
4. Salin **Public Key** dari halaman Account > API Keys

5. Isi file `.env.local` di root project:

   ```env
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxx
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxxxx
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxx
   ```

> **Catatan:** Jika env vars tidak diisi, contact form akan otomatis fallback ke `mailto:` link.

## Menambahkan Foto Asli

### Foto Profil

Letakkan foto profil di:

```
public/images/profile.jpg
```

Ukuran yang direkomendasikan: **400×400px** (square), format JPG atau PNG.

### Foto Proyek

Letakkan foto untuk setiap proyek di:

```
public/images/projects/project-1.jpg
public/images/projects/project-2.jpg
public/images/projects/project-3.jpg
public/images/projects/project-4.jpg
```

Ukuran yang direkomendasikan: **800×450px** (16:9), format JPG atau PNG.

Path gambar di `portfolio.ts` sudah sesuai dengan lokasi di atas.

## Struktur Proyek

```
src/
├── app/
│   ├── globals.css        # CSS custom properties (color system)
│   ├── layout.tsx         # Root layout + SEO metadata
│   └── page.tsx           # Main page (server component)
├── components/
│   ├── layout/
│   │   ├── Navigation.tsx # Sticky nav + mobile drawer
│   │   └── Footer.tsx     # Footer dengan social links
│   ├── sections/          # Section components (Hero, About, dll.)
│   └── ui/                # Reusable UI components
├── data/
│   └── portfolio.ts       # ← EDIT INI untuk mengubah konten
├── hooks/
│   ├── useActiveSection.ts
│   └── useContactForm.ts
└── lib/
    ├── animations.ts      # Framer Motion variants
    └── utils.ts           # cn() helper
```

## Tech Stack

| Library | Versi | Kegunaan |
|---------|-------|----------|
| Next.js | 14.x | Framework React + SSR |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 3.x | Styling |
| Framer Motion | 11.x | Animasi |
| Lucide React | 0.436.x | Icon library |
| EmailJS Browser | 4.x | Contact form |
