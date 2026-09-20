'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Download, ArrowRight, Briefcase, CheckCircle, Award,
  Mail, X, Linkedin,
} from 'lucide-react';
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
  { value: '4+', label: 'Tahun Pengalaman', icon: Briefcase },
  { value: '5+', label: 'Project Ditangani', icon: CheckCircle },
];

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.524 5.849L.057 23.5l5.805-1.521A11.93 11.93 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.886 0-3.65-.494-5.178-1.362l-.372-.22-3.444.903.921-3.355-.242-.386A9.94 9.94 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
    </svg>
  );
}

// Circular FK Avatar — styled like the tech rings in the background image
function FKAvatar() {
  return (
    <div className="relative flex items-center justify-center" style={{ width: 320, height: 320 }}>
      {/* Outermost ring — slow spin */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 rounded-full"
        style={{
          border: '1.5px solid rgba(0, 200, 255, 0.25)',
          boxShadow: '0 0 20px rgba(0, 200, 255, 0.08)',
        }}
      />
      {/* Second ring — counter spin */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
        className="absolute rounded-full"
        style={{
          inset: 20,
          border: '1.5px solid rgba(0, 200, 255, 0.35)',
          boxShadow: '0 0 16px rgba(0, 200, 255, 0.12)',
        }}
      >
        {/* Dot on second ring */}
        <div
          className="absolute rounded-full"
          style={{
            width: 8, height: 8,
            background: '#00c8ff',
            top: -4, left: '50%',
            transform: 'translateX(-50%)',
            boxShadow: '0 0 8px #00c8ff',
          }}
        />
      </motion.div>
      {/* Third ring — slow spin */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        className="absolute rounded-full"
        style={{
          inset: 44,
          border: '1px dashed rgba(0, 200, 255, 0.3)',
        }}
      >
        {/* Dot on third ring */}
        <div
          className="absolute rounded-full"
          style={{
            width: 6, height: 6,
            background: '#818cf8',
            bottom: -3, left: '50%',
            transform: 'translateX(-50%)',
            boxShadow: '0 0 6px #818cf8',
          }}
        />
      </motion.div>
      {/* Inner glow circle */}
      <div
        className="absolute rounded-full"
        style={{
          inset: 64,
          background: 'radial-gradient(circle, rgba(0,200,255,0.15) 0%, rgba(99,102,241,0.1) 60%, transparent 100%)',
          boxShadow: 'inset 0 0 30px rgba(0,200,255,0.12)',
        }}
      />
      {/* Center avatar circle — profile photo */}
      <div
        className="relative z-10 rounded-full overflow-hidden"
        style={{
          width: 160, height: 160,
          border: '2px solid rgba(0, 200, 255, 0.5)',
          boxShadow: '0 0 30px rgba(0,200,255,0.25), 0 0 0 4px rgba(0,200,255,0.08)',
          flexShrink: 0,
        }}
      >
        <Image
          src="/images/profile.png"
          alt="Felik Kriswanto"
          width={100}
          height={100}
          className="w-full h-full object-cover object-top"
          priority
        />
      </div>
    </div>
  );
}

export default function Home() {
  const [showContactModal, setShowContactModal] = useState(false);

  return (
    <>
      <main className="relative min-h-screen flex flex-col overflow-hidden">

        {/* ── BACKGROUND IMAGE ── */}
        <div
          className="fixed inset-0 -z-10"
          style={{
            backgroundImage: 'url(/images/bg.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        {/* Dark overlay for readability */}
        <div
          className="fixed inset-0 -z-10"
          style={{ background: 'linear-gradient(135deg, rgba(5,8,20,0.82) 0%, rgba(5,8,20,0.70) 50%, rgba(5,8,20,0.60) 100%)' }}
        />

        {/* Main content */}
        <div className="flex-1 flex items-center">
          <div className="max-w-6xl mx-auto px-6 py-16 lg:py-0 w-full">
            <div className="grid lg:grid-cols-[1fr_auto] gap-12 lg:gap-16 items-center">

              {/* LEFT: Text */}
              <div className="max-w-2xl">

                {/* Badge */}
                <motion.div
                  custom={0} initial="hidden" animate="visible" variants={fadeUp}
                  className="inline-flex items-center gap-2 mb-7 px-3.5 py-1.5 rounded-full"
                  style={{
                    background: 'rgba(0, 200, 255, 0.1)',
                    border: '1px solid rgba(0, 200, 255, 0.3)',
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: '#10b981', boxShadow: '0 0 6px #10b981' }}
                  />
                  <span className="text-xs font-semibold tracking-wide" style={{ color: '#00c8ff' }}>
                    Open to Opportunities
                  </span>
                </motion.div>

                {/* Name */}
                <motion.h1
                  custom={1} initial="hidden" animate="visible" variants={fadeUp}
                  className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-4"
                  style={{ color: '#f0f9ff' }}
                >
                  Felik{' '}
                  <span style={{
                    background: 'linear-gradient(135deg, #00c8ff, #818cf8)',
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
                  style={{ color: '#cbd5e1' }}
                >
                  IT Support &amp; Technical Support Specialist
                </motion.p>

                {/* Tagline */}
                <motion.p
                  custom={3} initial="hidden" animate="visible" variants={fadeUp}
                  className="text-sm font-mono mb-7"
                  style={{ color: '#00c8ff' }}
                >
                  Turning complex tech problems into seamless solutions.
                </motion.p>

                {/* Bio */}
                <motion.p
                  custom={4} initial="hidden" animate="visible" variants={fadeUp}
                  className="text-base leading-relaxed mb-9"
                  style={{ color: '#94a3b8' }}
                >
                  Profesional IT Support dengan 4+ tahun pengalaman dalam technical support,
                  implementasi sistem, testing aplikasi, dan project handling. Lulusan S1
                  Teknik Informatika (Networking) STMIK Nusa Mandiri Tahun 2020.
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
                          background: 'rgba(0,200,255,0.1)',
                          border: '1px solid rgba(0,200,255,0.25)',
                        }}
                      >
                        <Icon size={18} style={{ color: '#00c8ff' }} />
                      </div>
                      <div>
                        <p className="text-xl font-bold" style={{ color: '#f0f9ff' }}>{value}</p>
                        <p className="text-xs" style={{ color: '#64748b' }}>{label}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                  custom={6} initial="hidden" animate="visible" variants={fadeUp}
                  className="flex flex-wrap gap-3 mb-10"
                >
                  <a
                    href="/cv"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inlifne-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-sm text-white transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
                    style={{
                      background: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
                      boxShadow: '0 4px 20px rgba(14,165,233,0.4)',
                    }}
                  >
                    <Download size={16} />
                    Lihat &amp; Download CV
                  </a>
                  <button
                    onClick={() => setShowContactModal(true)}
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                    style={{
                      color: '#e0f2fe',
                      border: '1.5px solid rgba(0,200,255,0.4)',
                      background: 'rgba(0,200,255,0.08)',
                    }}
                  >
                    <ArrowRight size={16} />
                    Hubungi Saya
                  </button>
                </motion.div>

                {/* Social links */}
                <motion.div
                  custom={7} initial="hidden" animate="visible" variants={fadeUp}
                  className="flex items-center gap-5"
                >
                  <a
                    href="https://www.instagram.com/felik.kr20"
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm transition-colors"
                    style={{ color: '#64748b', textDecoration: 'none' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#ec4899'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#64748b'}
                  >
                    <InstagramIcon size={14} />
                    felik.kr20
                  </a>
                  <span style={{ color: '#334155' }}>·</span>
                  <a
                    href="https://www.linkedin.com/in/felik-kriswanto-2139561b6"
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm transition-colors"
                    style={{ color: '#64748b', textDecoration: 'none' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#38bdf8'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#64748b'}
                  >
                    <Linkedin size={14} />
                    felikriswanto
                  </a>
                </motion.div>

              </div>

              {/* RIGHT: FK Avatar */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="hidden lg:flex justify-end items-center"
              >
                <FKAvatar />
              </motion.div>

            </div>
          </div>
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.5 }}
          className="py-5 relative z-10"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
        >
          <div
            className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs"
            style={{ color: '#475569' }}
          >
            <span>&#169; {new Date().getFullYear()} Felik Kriswanto. All rights reserved.</span>
            <span>IT Support Specialist &#183; Bekasi, Jawa Barat</span>
          </div>
        </motion.footer>
      </main>

      {/* ── CONTACT MODAL ── */}
      <AnimatePresence>
        {showContactModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 cursor-pointer"
              style={{ background: 'rgba(5,8,20,0.7)', backdropFilter: 'blur(6px)' }}
              onClick={() => setShowContactModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 16 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 z-50 flex items-center justify-center px-4"
              style={{ pointerEvents: 'none' }}
            >
              <div
                className="relative w-full max-w-sm rounded-2xl p-6"
                style={{
                  background: 'white',
                  boxShadow: '0 24px 60px rgba(0,0,0,0.4), 0 4px 16px rgba(0,200,255,0.1)',
                  pointerEvents: 'auto',
                }}
              >
                <button
                  onClick={() => setShowContactModal(false)}
                  className="absolute top-4 right-4 flex items-center justify-center w-8 h-8 rounded-full transition-colors hover:bg-slate-100"
                  style={{ color: '#94a3b8' }}
                  aria-label="Tutup"
                >
                  <X size={18} />
                </button>
                <div className="mb-6">
                  <h2 className="text-lg font-bold" style={{ color: '#0f172a' }}>Hubungi Saya</h2>
                  <p className="text-sm mt-1" style={{ color: '#94a3b8' }}>
                    Pilih cara menghubungi yang paling nyaman untuk kamu.
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <a
                    href="mailto:felik103@gmail.com"
                    onClick={() => setShowContactModal(false)}
                    className="flex items-center gap-4 p-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
                    style={{ border: '1.5px solid #e2e8f0', background: '#f8fafc', textDecoration: 'none' }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(79,70,229,0.4)';
                      (e.currentTarget as HTMLElement).style.background = 'rgba(79,70,229,0.04)';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = '#e2e8f0';
                      (e.currentTarget as HTMLElement).style.background = '#f8fafc';
                    }}
                  >
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(79,70,229,0.1)' }}>
                      <Mail size={20} style={{ color: '#4f46e5' }} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: '#0f172a' }}>Email</p>
                      <p className="text-xs mt-0.5" style={{ color: '#64748b' }}>felik103@gmail.com</p>
                    </div>
                  </a>
                  <a
                    href="https://wa.me/628997671236"
                    target="_blank" rel="noopener noreferrer"
                    onClick={() => setShowContactModal(false)}
                    className="flex items-center gap-4 p-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
                    style={{ border: '1.5px solid #e2e8f0', background: '#f8fafc', textDecoration: 'none' }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(37,211,102,0.4)';
                      (e.currentTarget as HTMLElement).style.background = 'rgba(37,211,102,0.04)';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = '#e2e8f0';
                      (e.currentTarget as HTMLElement).style.background = '#f8fafc';
                    }}
                  >
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(37,211,102,0.12)' }}>
                      <WhatsAppIcon size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: '#0f172a' }}>WhatsApp</p>
                      <p className="text-xs mt-0.5" style={{ color: '#64748b' }}>+62 899-7671-236</p>
                    </div>
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
