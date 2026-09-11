# Requirements Document

## Introduction

Website personal portfolio profesional untuk IT Support professional, dibangun dengan Next.js + TypeScript + Tailwind CSS + Framer Motion + Lucide React. Website ini merupakan single-page application dengan dark theme, minimalis, premium, dan responsive. Semua data portfolio disimpan di file terpisah. Form kontak menggunakan mailto atau EmailJS tanpa backend. Data portfolio menggunakan placeholder realistis dengan nama perusahaan fiktif dan proyek IT tipikal.

## Glossary

- **Portfolio Site**: Aplikasi web single-page yang menampilkan profil, pengalaman, dan proyek IT Support professional.
- **Section**: Bagian konten utama dalam single-page layout (Navigation, Hero, About, What I Do, Technical Skills, Work Experience, Selected Projects, Tools & Technologies, Contact, Footer).
- **Data File**: File TypeScript/JSON terpisah yang menyimpan semua data portfolio (pengalaman, proyek, skill, dll).
- **Component**: Unit antarmuka React yang dapat digunakan ulang (reusable).
- **Smooth Scroll**: Perilaku scroll halus antar section pada halaman yang sama.
- **EmailJS**: Layanan pengiriman email berbasis JavaScript tanpa backend server.
- **Framer Motion**: Library animasi React untuk transisi dan hover effect.
- **Lucide React**: Library ikon React berbasis SVG.
- **CTA**: Call-to-action, tombol atau tautan yang mengajak pengguna melakukan tindakan tertentu.
- **Placeholder Data**: Data fiktif namun realistis yang digunakan sebagai konten demonstrasi portfolio.
- **IT Support Professional**: Peran profesional yang bertanggung jawab atas dukungan teknis, pemeliharaan sistem, dan penyelesaian masalah perangkat keras/lunak.

---

## Requirements

### Requirement 1 — Tech Stack dan Arsitektur Proyek

**User Story:** As an IT Support professional, I want my portfolio built on a modern, maintainable tech stack, so that the site is performant, type-safe, and easy to update.

#### Acceptance Criteria

1. THE Portfolio Site SHALL be implemented using Next.js with TypeScript as the primary framework.
2. THE Portfolio Site SHALL use Tailwind CSS as the sole styling system.
3. THE Portfolio Site SHALL use Framer Motion for all animation and transition effects.
4. THE Portfolio Site SHALL use Lucide React as the icon library.
5. THE Portfolio Site SHALL follow a component-based architecture where every UI section is encapsulated in a reusable, single-responsibility React component.
6. THE Portfolio Site SHALL store all portfolio content data (experience, projects, skills, tools) in a dedicated data file (e.g., `src/data/portfolio.ts`) separate from component files.

---

### Requirement 2 — Layout dan Navigasi

**User Story:** As a visitor, I want a clear and accessible navigation system, so that I can quickly jump to any section of the page.

#### Acceptance Criteria

1. THE Portfolio Site SHALL render as a single-page application with all ten sections on one continuous scrollable page.
2. THE Portfolio Site SHALL display a sticky navigation bar that remains visible while scrolling.
3. WHEN a visitor clicks a navigation link, THE Portfolio Site SHALL scroll smoothly to the corresponding section.
4. WHEN a visitor scrolls to a section, THE Navigation SHALL highlight the corresponding active navigation link.
5. WHILE viewing the site on a mobile viewport (width < 768px), THE Navigation SHALL collapse into a hamburger menu.
6. WHEN the hamburger menu icon is tapped, THE Navigation SHALL toggle open a full-width mobile navigation drawer.
7. THE Portfolio Site SHALL include the following ten sections in order: Navigation, Hero, About Me, What I Do, Technical Skills, Work Experience, Selected Projects, Tools & Technologies, Contact, Footer.

---

### Requirement 3 — Desain Visual dan Tema

**User Story:** As a visitor, I want a visually premium and consistent dark-themed experience, so that the portfolio conveys professionalism and technical expertise.

#### Acceptance Criteria

1. THE Portfolio Site SHALL apply a dark color theme as the default and only theme.
2. THE Portfolio Site SHALL apply consistent typography using a modern sans-serif typeface throughout all sections.
3. THE Portfolio Site SHALL be fully responsive across three breakpoints: mobile (< 768px), tablet (768px–1023px), and desktop (≥ 1024px).
4. WHEN a visitor hovers over an interactive element (button, card, link, icon), THE Portfolio Site SHALL display a smooth hover animation using Framer Motion or Tailwind transitions.
5. WHEN a section enters the viewport during scrolling, THE Portfolio Site SHALL trigger a subtle entrance animation (e.g., fade-in, slide-up) using Framer Motion.
6. THE Portfolio Site SHALL maintain a minimum color contrast ratio of 4.5:1 between text and background in compliance with WCAG AA.

---

### Requirement 4 — Section Hero

**User Story:** As a visitor, I want to immediately understand who the professional is and what they do, so that I can quickly decide to explore further.

#### Acceptance Criteria

1. THE Hero Section SHALL display the professional's full name as the primary heading.
2. THE Hero Section SHALL display the job title "IT Support" as a subtitle below the name.
3. THE Hero Section SHALL display a professional introduction paragraph summarizing the professional's background and areas of work.
4. THE Hero Section SHALL display a "View My Work" CTA button that, when clicked, scrolls smoothly to the Selected Projects section.
5. THE Hero Section SHALL display a "Contact Me" CTA button that, when clicked, scrolls smoothly to the Contact section.
6. THE Hero Section SHALL display social media links (LinkedIn, GitHub, or equivalent) as icon buttons.
7. WHEN a visitor hovers over a CTA button, THE Hero Section SHALL animate the button with a scale or color transition effect.

---

### Requirement 5 — Section About Me

**User Story:** As a visitor, I want to learn more about the professional's background and personality, so that I can assess cultural and professional fit.

#### Acceptance Criteria

1. THE About Me Section SHALL display a short biographical paragraph describing the professional's background, values, and approach to IT work.
2. THE About Me Section SHALL display a profile photo placeholder (image element with defined dimensions and alt text).
3. THE About Me Section SHALL display at least three key personal/professional highlights (e.g., years of experience, certifications, specialization areas) as visual stat or badge elements.

---

### Requirement 6 — Section What I Do

**User Story:** As a visitor, I want to see the range of IT Support responsibilities the professional handles, so that I can evaluate the professional's scope of expertise.

#### Acceptance Criteria

1. THE What I Do Section SHALL display exactly eight responsibility cards with the following labels: IT Support, User Support, Hardware and Software Troubleshooting, System Support, Project Implementation Support, IT Operations Support, Documentation, Data Validation.
2. THE What I Do Section SHALL display each responsibility card with a relevant Lucide React icon, a title, and a short description.
3. WHEN a visitor hovers over a responsibility card, THE What I Do Section SHALL highlight the card with a border or background color transition.
4. THE What I Do Section SHALL arrange the eight cards in a responsive grid (4 columns on desktop, 2 columns on tablet, 1 column on mobile).

---

### Requirement 7 — Section Technical Skills

**User Story:** As a visitor or recruiter, I want to see the professional's technical skill set organized by category, so that I can assess technical depth at a glance.

#### Acceptance Criteria

1. THE Technical Skills Section SHALL group skills into the following eight categories: Operating Systems, Networking, Hardware, Software, Database, Data Tools, IT Support Tools, Other Technical Skills.
2. THE Technical Skills Section SHALL display each skill within its category as a labeled badge or tag element.
3. THE Technical Skills Section SHALL use placeholder skill data sourced from the dedicated data file.
4. WHEN a visitor hovers over a skill badge, THE Technical Skills Section SHALL apply a subtle highlight or scale animation.
5. THE Technical Skills Section SHALL render the category groupings in a responsive layout (multi-column on desktop, single-column on mobile).

---

### Requirement 8 — Section Work Experience

**User Story:** As a recruiter, I want to see the professional's employment history in a structured timeline, so that I can evaluate career progression and relevant experience.

#### Acceptance Criteria

1. THE Work Experience Section SHALL display each work experience entry in a vertical timeline format.
2. THE Work Experience Section SHALL display the following fields for each entry: job title, company name, employment period (start month/year – end month/year or "Present"), and job description.
3. THE Work Experience Section SHALL display a list of key responsibilities for each entry.
4. WHERE achievements are present for an entry, THE Work Experience Section SHALL display the achievements as a separate labeled list.
5. THE Work Experience Section SHALL use placeholder data with fictional company names sourced from the dedicated data file.
6. WHEN a work experience entry enters the viewport, THE Work Experience Section SHALL animate the entry with a slide-in or fade-in effect.

---

### Requirement 9 — Section Selected Projects

**User Story:** As a visitor, I want to browse IT projects the professional has worked on, so that I can assess practical experience and impact.

#### Acceptance Criteria

1. THE Selected Projects Section SHALL display each project as a card containing: project title, category, description, professional's role, technologies/tools used, and key contribution.
2. THE Selected Projects Section SHALL display an image placeholder element with defined dimensions and alt text for each project card.
3. THE Selected Projects Section SHALL only display non-coding IT projects (e.g., infrastructure rollout, system migration, IT asset management, helpdesk implementation).
4. THE Selected Projects Section SHALL not display any confidential or sensitive information.
5. THE Selected Projects Section SHALL use placeholder data with realistic but fictional IT project details sourced from the dedicated data file.
6. WHEN a visitor hovers over a project card, THE Selected Projects Section SHALL elevate the card with a shadow or border highlight animation.
7. THE Selected Projects Section SHALL arrange project cards in a responsive grid (3 columns on desktop, 2 on tablet, 1 on mobile).

---

### Requirement 10 — Section Tools & Technologies

**User Story:** As a visitor, I want to see a visual overview of the tools and technologies the professional uses, so that I can quickly identify technology familiarity.

#### Acceptance Criteria

1. THE Tools & Technologies Section SHALL display each tool/technology as a labeled icon tile containing a logo image or icon and the tool name.
2. THE Tools & Technologies Section SHALL use placeholder tool data sourced from the dedicated data file.
3. THE Tools & Technologies Section SHALL arrange tiles in a responsive multi-column grid.
4. WHEN a visitor hovers over a tool tile, THE Tools & Technologies Section SHALL apply a scale or glow animation.

---

### Requirement 11 — Section Contact

**User Story:** As a recruiter or collaborator, I want to contact the professional directly from the website, so that I can reach out without leaving the page.

#### Acceptance Criteria

1. THE Contact Section SHALL display a contact form with the following fields: Name (text, required), Email (email, required), Subject (text, required), and Message (textarea, required).
2. WHEN a visitor submits the contact form with all required fields filled, THE Contact Section SHALL send the message via EmailJS or open a pre-filled mailto link.
3. WHEN a visitor submits the form with one or more required fields empty, THE Contact Section SHALL display an inline validation error message for each empty field without refreshing the page.
4. WHEN the message is sent successfully, THE Contact Section SHALL display a success notification to the visitor.
5. IF the message sending fails, THEN THE Contact Section SHALL display an error notification and preserve the visitor's form input.
6. THE Contact Section SHALL also display direct contact information: email address, LinkedIn URL, and optional phone number as static text elements.

---

### Requirement 12 — Section Footer

**User Story:** As a visitor, I want a clean footer at the bottom of the page, so that the site feels complete and I can find key links easily.

#### Acceptance Criteria

1. THE Footer Section SHALL display the professional's name or logo mark.
2. THE Footer Section SHALL display a copyright notice with the current year.
3. THE Footer Section SHALL display navigation shortcut links to the main sections.
4. THE Footer Section SHALL display social media icon links consistent with those in the Hero section.

---

### Requirement 13 — Data File dan Placeholder Content

**User Story:** As a developer, I want all portfolio data centralized in a single file, so that content updates do not require touching component code.

#### Acceptance Criteria

1. THE Portfolio Site SHALL store all variable content (personal info, experience entries, project entries, skill categories, tool list) in a single dedicated data file typed with TypeScript interfaces.
2. THE Portfolio Site SHALL use realistic placeholder data: fictional company names (e.g., "PT. Solusi Teknologi Nusantara"), typical IT Support project titles, and standard IT skills.
3. THE Portfolio Site SHALL define TypeScript interfaces for each data entity (WorkExperience, Project, SkillCategory, Tool, PersonalInfo) in the data file or a co-located types file.
4. WHEN a developer updates the data file, THE Portfolio Site SHALL reflect the updated data across all sections without requiring changes to component files.

---

### Requirement 14 — Performa dan SEO Dasar

**User Story:** As an IT Support professional, I want my portfolio to load fast and be discoverable, so that recruiters can find and use it without friction.

#### Acceptance Criteria

1. THE Portfolio Site SHALL include a `<title>` tag and `<meta name="description">` tag with relevant content in the HTML head.
2. THE Portfolio Site SHALL include Open Graph meta tags (`og:title`, `og:description`, `og:image`) for social media link previews.
3. THE Portfolio Site SHALL use Next.js Image component for all images to enable automatic optimization.
4. THE Portfolio Site SHALL achieve a Lighthouse Performance score of 80 or above on desktop when tested against the production build.
5. THE Portfolio Site SHALL use semantic HTML elements (`<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`) for each corresponding page region.
