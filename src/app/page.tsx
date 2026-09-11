'use client';

import { motion } from 'framer-motion';
import { Mail, Linkedin, Phone, Download, ArrowRight, Briefcase, CheckCircle, Award } from 'lucide-react';
import Image from 'next/image';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

const stats = [
  { value: '2+', label: 'Tahun Pengalaman', icon: Briefcase },
  { value: '5+', label: 'Project Ditangani', icon: CheckCircle },
  { value: '4', label: 'Sertifikasi', icon: Award },
];

export default function Home() {
  return (
    <main
      className="min-h-screen flex flex-col"
      style={{ background: 'linear-gradient(160deg, #ffffff 0%, #f8faff 50%, #f0f4ff 100%)' }}
    >
      {/* Subtle background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-30 blur-3xl"
          style={{ background: 'radial-gradient(circle, #c7d2fe, transparent)' }}
        />
        <div
          className="absolute bottom-10 -left-32 w-80 h-80 rounded-full opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(circle, #ddd6fe, transparent)' }}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center">
        <div className="max-w-6xl mx-auto px-6 py-16 lg:py-0 w-full">
          <div className="grid lg:grid-cols-[1fr_auto] gap-12 lg:gap-20 items-center">

            {/* LEFT: Text */}
            <div className="max-w-2xl">

              {/* Badge */}
              <motion.div
                custom={0} initial="hidden" animate="visible" variants={fadeUp}
                className="inline-flex items-center gap-2 mb-7 px-3.5 py-1.5 rounded-full"
                style={{
                  background: 'rgba(79,70,229,0.08)',
                  border: '1px solid rgba(79,70,229,0.2)',
                }}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: '#10b981', boxShadow: '0 0 6px #10b981' }}
                />
                <span className="text-xs font-semibold tracking-wide" style={{ color: '#4f46e5' }}>
                  Open to Opportunities
                </span>
              </motion.div>

              {/* Name */}
              <motion.h1
                custom={1} initial="hidden" animate="visible" variants={fadeUp}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-4"
                style={{ color: '#0f172a' }}
              >
                Felik{' '}
                <span style={{
                  background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  Kriswanto
                </span>
              </motion.h1>

              {/* Title */}
              <motion.p
                custom={2} initial="hidden" animate="visible" variants={fadeUp}
                className="text-xl font-semibold mb-2"
                style={{ color: '#334155' }}
              >
                IT Support &amp; Technical Support Specialist
              </motion.p>

              {/* Tagline */}
              <motion.p
                custom={3} initial="hidden" animate="visible" variants={fadeUp}
                className="text-sm font-mono mb-7"
                style={{ color: '#6366f1' }}
              >
                Turning complex tech problems into seamless solutions.
              </motion.p>

              {/* Bio */}
              <motion.p
                custom={4} initial="hidden" animate="visible" variants={fadeUp}
                className="text-base leading-relaxed mb-9"
                style={{ color: '#475569' }}
              >
                Profesional IT Support dengan 2+ tahun pengalaman dalam technical support,
                implementasi sistem, testing aplikasi, dan project handling. Lulusan S1
                Teknik Informatika (Networking) STMIK Nusa Mandiri &#8212; IPK 3,61.
              </motion.p>

              {/* Stats */}
              <motion.div
                custom={5} initial="hidden" animate="visible" variants={fadeUp}
                className="flex flex-wrap gap-6 mb-10"
              >
                {stats.map(({ value, label, icon: Icon }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: 'rgba(79,70,229,0.08)',
                        border: '1px solid rgba(79,70,229,0.18)',
                      }}
                    >
                      <Icon size={18} style={{ color: '#4f46e5' }} />
                    </div>
                    <div>
                      <p className="text-xl font-bold" style={{ color: '#0f172a' }}>{value}</p>
                      <p className="text-xs" style={{ color: '#94a3b8' }}>{label}</p>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* CTA Buttons — DIPERTAHANKAN */}
              <motion.div
                custom={6} initial="hidden" animate="visible" variants={fadeUp}
                className="flex flex-wrap gap-3 mb-10"
              >
                <a
                  href="/cv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-sm text-white transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
                  style={{
                    background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                    boxShadow: '0 4px 20px rgba(79,70,229,0.35)',
                  }}
                >
                  <Download size={16} />
                  Lihat &amp; Download CV
                </a>
                <a
                  href="mailto:felik103@gmail.com"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
                  style={{
                    color: '#4f46e5',
                    border: '1.5px solid rgba(79,70,229,0.35)',
                    background: 'rgba(79,70,229,0.05)',
                  }}
                >
                  <ArrowRight size={16} />
                  Hubungi Saya
                </a>
              </motion.div>

              {/* Contact / Social links */}
              <motion.div
                custom={7} initial="hidden" animate="visible" variants={fadeUp}
                className="flex flex-wrap items-center gap-5"
              >
                <a
                  href="https://linkedin.com/in/felikriswanto"
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm transition-colors hover:text-indigo-600"
                  style={{ color: '#94a3b8', textDecoration: 'none' }}
                >
                  <Linkedin size={14} />
                  felikriswanto
                </a>
                <span style={{ color: '#cbd5e1' }}>·</span>
                <a
                  href="mailto:felik103@gmail.com"
                  className="flex items-center gap-1.5 text-sm transition-colors hover:text-indigo-600"
                  style={{ color: '#94a3b8', textDecoration: 'none' }}
                >
                  <Mail size={14} />
                  felik103@gmail.com
                </a>
                <span style={{ color: '#cbd5e1' }}>·</span>
                <a
                  href="tel:+628997671236"
                  className="flex items-center gap-1.5 text-sm transition-colors hover:text-indigo-600"
                  style={{ color: '#94a3b8', textDecoration: 'none' }}
                >
                  <Phone size={14} />
                  +62 899-7671-236
                </a>
              </motion.div>
            </div>

            {/* RIGHT: Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:flex justify-end"
            >
              <div className="relative">
                {/* Shadow glow */}
                <div
                  className="absolute inset-0 rounded-3xl scale-105 blur-2xl opacity-25"
                  style={{ background: 'radial-gradient(ellipse, #6366f1, #7c3aed, transparent)' }}
                />
                {/* Border */}
                <div
                  className="relative p-0.5 rounded-3xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(79,70,229,0.5), rgba(124,58,237,0.3), rgba(226,232,240,0.8))',
                  }}
                >
                  <div
                    className="relative w-72 h-72 xl:w-80 xl:h-80 rounded-3xl overflow-hidden"
                    style={{ background: '#f1f5f9' }}
                  >
                    <Image
                      src="/images/profile.jpg"
                      alt="Felik Kriswanto"
                      fill
                      className="object-cover"
                      priority
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                    {/* FK initials fallback */}
                    <div
                      className="absolute inset-0 flex items-center justify-center"
                      style={{ background: 'linear-gradient(135deg, #eef2ff, #e0e7ff)' }}
                    >
                      <span
                        className="text-6xl font-bold select-none"
                        style={{
                          background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}
                      >
                        FK
                      </span>
                    </div>
                  </div>
                </div>
                {/* Dot grid */}
                <div className="absolute -bottom-5 -right-5 opacity-30">
                  <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                    {[0,1,2,3].map(r => [0,1,2,3].map(c => (
                      <circle key={`${r}-${c}`} cx={8+c*22} cy={8+r*22} r="2.5" fill="#6366f1"/>
                    )))}
                  </svg>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1, duration: 0.5 }}
        className="py-5"
        style={{ borderTop: '1px solid #e2e8f0' }}
      >
        <div
          className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs"
          style={{ color: '#94a3b8' }}
        >
          <span>&#169; {new Date().getFullYear()} Felik Kriswanto. All rights reserved.</span>
          <span>IT Support Specialist &#183; Bekasi, Jawa Barat</span>
        </div>
      </motion.footer>
    </main>
  );
}
