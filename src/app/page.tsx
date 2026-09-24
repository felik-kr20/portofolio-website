'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Download, ArrowRight, Briefcase, CheckCircle,
  Mail, X, Linkedin, ExternalLink, ZoomIn,
  Copy, Check, MapPin,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePageView, trackClick } from '@/hooks/useTracker';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

const stats = [
  { value: '4+', label: 'Tahun Pengalaman', icon: Briefcase, href: '/portfolio?tab=experience' },
  { value: '10+', label: 'Project Ditangani', icon: CheckCircle, href: '/portfolio?tab=projects' },
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

function WhatsAppIcon({ size = 20, color }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color ?? 'currentColor'}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.524 5.849L.057 23.5l5.805-1.521A11.93 11.93 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.886 0-3.65-.494-5.178-1.362l-.372-.22-3.444.903.921-3.355-.242-.386A9.94 9.94 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
    </svg>
  );
}

// Profile avatar component — reusable for both mobile (small) and desktop (large with rings)
function ProfileAvatar({ size = 160, ringSize = 320, showRings = true, onPhotoClick }: {
  size?: number;
  ringSize?: number;
  showRings?: boolean;
  onPhotoClick?: () => void;
}) {
  if (!showRings) {
    // Mobile: simple circle, no spinning rings
    return (
      <div
        onClick={onPhotoClick}
        className="rounded-full overflow-hidden mx-auto relative group"
        style={{
          width: size,
          height: size,
          border: '2px solid rgba(0, 200, 255, 0.5)',
          boxShadow: '0 0 20px rgba(0,200,255,0.3)',
          cursor: onPhotoClick ? 'pointer' : 'default',
        }}
      >
        <Image
          src="/images/profile.png"
          alt="Felik Kriswanto"
          width={size}
          height={size}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          style={{ objectPosition: 'center 15%' }}
          priority
        />
        {onPhotoClick && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full"
            style={{ background: 'rgba(0,0,0,0.35)' }}>
            <ZoomIn size={24} style={{ color: '#00c8ff' }} />
          </div>
        )}
      </div>
    );
  }

  // Desktop: full rings animation
  return (
    <div className="relative flex items-center justify-center" style={{ width: ringSize, height: ringSize }}>
      {/* Outermost ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 rounded-full"
        style={{ border: '1.5px solid rgba(0,200,255,0.25)', boxShadow: '0 0 20px rgba(0,200,255,0.08)' }}
      />
      {/* Second ring */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
        className="absolute rounded-full"
        style={{ inset: 20, border: '1.5px solid rgba(0,200,255,0.35)', boxShadow: '0 0 16px rgba(0,200,255,0.12)' }}
      >
        <div className="absolute rounded-full" style={{ width: 8, height: 8, background: '#00c8ff', top: -4, left: '50%', transform: 'translateX(-50%)', boxShadow: '0 0 8px #00c8ff' }} />
      </motion.div>
      {/* Third ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        className="absolute rounded-full"
        style={{ inset: 44, border: '1px dashed rgba(0,200,255,0.3)' }}
      >
        <div className="absolute rounded-full" style={{ width: 6, height: 6, background: '#818cf8', bottom: -3, left: '50%', transform: 'translateX(-50%)', boxShadow: '0 0 6px #818cf8' }} />
      </motion.div>
      {/* Inner glow */}
      <div className="absolute rounded-full" style={{ inset: 64, background: 'radial-gradient(circle, rgba(0,200,255,0.15) 0%, rgba(99,102,241,0.1) 60%, transparent 100%)', boxShadow: 'inset 0 0 30px rgba(0,200,255,0.12)' }} />
      {/* Center photo */}
      <div
        onClick={onPhotoClick}
        className="relative z-10 rounded-full overflow-hidden group"
        style={{ width: size, height: size, border: '2px solid rgba(0,200,255,0.5)', boxShadow: '0 0 30px rgba(0,200,255,0.25)', flexShrink: 0, cursor: onPhotoClick ? 'pointer' : 'default' }}
      >
        <Image
          src="/images/profile.png"
          alt="Felik Kriswanto"
          width={size}
          height={size}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          style={{ objectPosition: 'center 15%' }}
          priority
        />
        {onPhotoClick && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full"
            style={{ background: 'rgba(0,0,0,0.35)' }}>
            <ZoomIn size={28} style={{ color: '#00c8ff' }} />
          </div>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const [showContactModal, setShowContactModal] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);

  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  usePageView();

  const [openToWork, setOpenToWork] = useState(true);

  useEffect(() => {
    fetch('/api/settings?key=open_to_opportunities')
      .then(r => r.json())
      .then(d => setOpenToWork(d.value === 'true'))
      .catch(() => {}); // default true jika gagal
  }, []);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    });
  };

  return (
    <>
      <main className="relative min-h-screen flex flex-col overflow-hidden">

        {/* Background */}
        <div className="fixed inset-0 -z-10" style={{ backgroundImage: 'url(/images/bg.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} />
        <div className="fixed inset-0 -z-10" style={{ background: 'linear-gradient(135deg, rgba(5,8,20,0.82) 0%, rgba(5,8,20,0.70) 50%, rgba(5,8,20,0.60) 100%)' }} />

        {/* Main content */}
        <div className="flex-1 flex items-center">
          <div className="max-w-6xl mx-auto px-6 py-16 lg:py-0 w-full">
            <div className="grid lg:grid-cols-[1fr_auto] gap-12 lg:gap-16 items-center">

              {/* LEFT / MOBILE: Text content */}
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-2xl mx-auto lg:mx-0">

                {/* Mobile-only: photo at top */}
                <motion.div
                  custom={0} initial="hidden" animate="visible" variants={fadeUp}
                  className="mb-6 lg:hidden"
                >
                  <ProfileAvatar size={120} showRings={false} onPhotoClick={() => setShowPhotoModal(true)} />
                </motion.div>

                {/* Badge */}
                <motion.div
                  custom={1} initial="hidden" animate="visible" variants={fadeUp}
                  className="inline-flex items-center gap-2 mb-6 px-3.5 py-1.5 rounded-full"
                  style={{
                    background: openToWork ? 'rgba(0,200,255,0.1)' : 'rgba(100,116,139,0.1)',
                    border: openToWork ? '1px solid rgba(0,200,255,0.3)' : '1px solid rgba(100,116,139,0.3)',
                  }}
                >
                  <span className="w-2 h-2 rounded-full" style={{
                    background: openToWork ? '#10b981' : '#94a3b8',
                    boxShadow: openToWork ? '0 0 6px #10b981' : 'none',
                  }} />
                  <span className="text-xs font-semibold tracking-wide" style={{ color: openToWork ? '#00c8ff' : '#94a3b8' }}>
                    {openToWork ? 'Open to Opportunities' : 'Not Available'}
                  </span>
                </motion.div>

                {/* Name */}
                <motion.h1
                  custom={2} initial="hidden" animate="visible" variants={fadeUp}
                  className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-4"
                  style={{ color: '#f0f9ff' }}
                >
                  Felik{' '}
                  <span style={{ background: 'linear-gradient(135deg, #00c8ff, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    Kriswanto
                  </span>
                </motion.h1>

                {/* Title */}
                <motion.p custom={3} initial="hidden" animate="visible" variants={fadeUp}
                  className="text-xl font-semibold mb-2" style={{ color: '#cbd5e1' }}>
                  IT Support &amp; Technical Support Specialist
                </motion.p>

                {/* Tagline */}
                <motion.p custom={4} initial="hidden" animate="visible" variants={fadeUp}
                  className="text-sm font-mono mb-7" style={{ color: '#00c8ff' }}>
                  Mengubah permasalahan teknologi yang kompleks menjadi solusi yang efektif dan mudah diterapkan.
                </motion.p>

                {/* Bio */}
                <motion.p custom={5} initial="hidden" animate="visible" variants={fadeUp}
                  className="text-base leading-relaxed mb-9" style={{ color: '#94a3b8' }}>
                  Profesional IT Support dengan pengalaman lebih dari 4 tahun dalam menangani technical support, troubleshooting perangkat dan sistem, implementasi aplikasi, testing, serta koordinasi dan penanganan proyek IT. Terbiasa menganalisis dan menyelesaikan permasalahan teknis, memberikan dukungan kepada pengguna, serta memastikan sistem berjalan dengan baik dan sesuai kebutuhan operasional. Memiliki kemampuan komunikasi, problem solving, dan koordinasi yang baik dalam menangani kebutuhan teknis pengguna maupun proyek. Lulusan S1 Teknik Informatika (Networking) dari STMIK Nusa Mandiri, tahun 2020.

                </motion.p>

                {/* Stats */}
                <motion.div custom={6} initial="hidden" animate="visible" variants={fadeUp}
                  className="flex flex-wrap justify-center lg:justify-start gap-6 mb-10">
                  {stats.map(({ value, label, icon: Icon, href }) => (
                    <Link
                      key={label}
                      href={href}
                      className="flex items-center gap-3 group transition-transform duration-200 hover:-translate-y-0.5"
                      style={{ textDecoration: 'none' }}
                      title={`Lihat ${label}`}
                    >
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200 group-hover:scale-110"
                        style={{ background: 'rgba(0,200,255,0.1)', border: '1px solid rgba(0,200,255,0.25)' }}>
                        <Icon size={18} style={{ color: '#00c8ff' }} />
                      </div>
                      <div>
                        <p className="text-xl font-bold" style={{ color: '#f0f9ff' }}>{value}</p>
                        <p className="text-xs transition-colors duration-200 group-hover:text-cyan-400" style={{ color: '#64748b' }}>{label}</p>
                      </div>
                    </Link>
                  ))}
                </motion.div>

                {/* CTA Buttons */}
                <motion.div custom={7} initial="hidden" animate="visible" variants={fadeUp}
                  className="flex flex-wrap justify-center lg:justify-start gap-3 mb-10 w-full">
                  {/* Download CV */}
                  <a
                    href="/cv"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-sm text-white transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
                    style={{ background: 'linear-gradient(135deg, #0ea5e9, #6366f1)', boxShadow: '0 4px 20px rgba(14,165,233,0.4)' }}
                  >
                    <Download size={16} />
                    Lihat &amp; Unduh CV
                  </a>
                  {/* My Portfolio */}
                  <Link
                    href="/portfolio"
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
                    style={{ color: '#f0f9ff', background: 'linear-gradient(135deg, rgba(0,200,255,0.2), rgba(99,102,241,0.2))', border: '1.5px solid rgba(0,200,255,0.35)' }}
                  >
                    <ExternalLink size={16} />
                    Portofolio
                  </Link>
                  {/* Kontak Saya */}
                  <button
                    onClick={() => setShowContactModal(true)}
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                    style={{ color: '#e0f2fe', border: '1.5px solid rgba(0,200,255,0.4)', background: 'rgba(0,200,255,0.08)' }}
                  >
                    <ArrowRight size={16} />
                    Kontak Saya
                  </button>
                </motion.div>

                {/* Social links */}
                <motion.div custom={8} initial="hidden" animate="visible" variants={fadeUp}
                  className="flex items-center justify-center lg:justify-start gap-5">
                  <a href="https://www.instagram.com/felik.kr20" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm transition-colors"
                    style={{ color: '#64748b', textDecoration: 'none' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#ec4899'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#64748b'}
                    onClick={() => trackClick('instagram')}>
                    <InstagramIcon size={14} />
                    felik.kr20
                  </a>
                  <span style={{ color: '#334155' }}>·</span>
                  <a href="https://www.linkedin.com/in/felik-kriswanto-2139561b6" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm transition-colors"
                    style={{ color: '#64748b', textDecoration: 'none' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#38bdf8'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#64748b'}
                    onClick={() => trackClick('linkedin')}>
                    <Linkedin size={14} />
                    felikriswanto
                  </a>
                </motion.div>

              </div>

              {/* RIGHT: Desktop avatar with rings — hidden on mobile */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="hidden lg:flex justify-end items-center"
              >
                <ProfileAvatar size={160} ringSize={320} showRings={true} onPhotoClick={() => setShowPhotoModal(true)} />
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
          <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs"
            style={{ color: '#475569' }}>
            <span>&#169; {new Date().getFullYear()} Felik Kriswanto. All rights reserved.</span>
            <span>IT Support Specialist &#183; Bekasi, Jawa Barat</span>
          </div>
        </motion.footer>
      </main>

      {/* CONTACT MODAL */}
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
                style={{ background: 'white', boxShadow: '0 24px 60px rgba(0,0,0,0.4), 0 4px 16px rgba(0,200,255,0.1)', pointerEvents: 'auto' }}
              >
                {/* Close */}
                <button
                  onClick={() => setShowContactModal(false)}
                  className="absolute top-4 right-4 flex items-center justify-center w-8 h-8 rounded-full transition-colors hover:bg-slate-100"
                  style={{ color: '#94a3b8' }}
                  aria-label="Tutup"
                >
                  <X size={18} />
                </button>

                <div className="mb-5">
                  <h2 className="text-lg font-bold" style={{ color: '#0f172a' }}>Hubungi Saya</h2>
                  <p className="text-sm mt-1" style={{ color: '#94a3b8' }}>
                    Pilih cara menghubungi yang paling nyaman untuk kamu.
                  </p>
                </div>

                <div className="flex flex-col gap-3">

                  {/* EMAIL */}
                  <div className="flex items-center gap-3 p-4 rounded-xl"
                    style={{ border: '1.5px solid #e2e8f0', background: '#f8fafc' }}>
                    <a
                      href="mailto:felik103@gmail.com"
                      onClick={() => setShowContactModal(false)}
                      className="flex items-center gap-3 flex-1 min-w-0"
                      style={{ textDecoration: 'none' }}
                    >
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: 'rgba(79,70,229,0.1)' }}>
                        <Mail size={18} style={{ color: '#4f46e5' }} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold" style={{ color: '#0f172a' }}>Email</p>
                        <p className="text-xs mt-0.5 truncate" style={{ color: '#64748b' }}>felik103@gmail.com</p>
                      </div>
                    </a>
                    <button
                      onClick={() => handleCopy('felik103@gmail.com', 'email')}
                      className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200"
                      style={{
                        background: copiedKey === 'email' ? 'rgba(34,197,94,0.12)' : 'rgba(79,70,229,0.08)',
                        border: `1px solid ${copiedKey === 'email' ? 'rgba(34,197,94,0.3)' : 'rgba(79,70,229,0.2)'}`,
                        color: copiedKey === 'email' ? '#22c55e' : '#4f46e5',
                      }}
                      title="Salin email"
                    >
                      {copiedKey === 'email' ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </div>

                  {/* WHATSAPP */}
                  <div className="flex items-center gap-3 p-4 rounded-xl"
                    style={{ border: '1.5px solid #e2e8f0', background: '#f8fafc' }}>
                    <a
                      href="https://wa.me/628997671236"
                      target="_blank" rel="noopener noreferrer"
                      onClick={() => setShowContactModal(false)}
                      className="flex items-center gap-3 flex-1 min-w-0"
                      style={{ textDecoration: 'none' }}
                    >
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: '#25d366' }}>
                        <WhatsAppIcon size={18} color="white" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold" style={{ color: '#0f172a' }}>WhatsApp</p>
                        <p className="text-xs mt-0.5" style={{ color: '#64748b' }}>+62 899-7671-236</p>
                      </div>
                    </a>
                    <button
                      onClick={() => handleCopy('+628997671236', 'wa')}
                      className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200"
                      style={{
                        background: copiedKey === 'wa' ? 'rgba(34,197,94,0.12)' : 'rgba(37,211,102,0.1)',
                        border: `1px solid ${copiedKey === 'wa' ? 'rgba(34,197,94,0.3)' : 'rgba(37,211,102,0.25)'}`,
                        color: copiedKey === 'wa' ? '#22c55e' : '#25d366',
                      }}
                      title="Salin nomor WhatsApp"
                    >
                      {copiedKey === 'wa' ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </div>

                  {/* ALAMAT */}
                  <div className="flex items-center gap-3 p-4 rounded-xl"
                    style={{ border: '1.5px solid #e2e8f0', background: '#f8fafc' }}>
                    <a
                      href="https://maps.app.goo.gl/uqjJA3jEqLzDSdB88"
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-3 flex-1 min-w-0"
                      style={{ textDecoration: 'none' }}
                    >
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: 'rgba(239,68,68,0.1)' }}>
                        <MapPin size={18} style={{ color: '#ef4444' }} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold" style={{ color: '#0f172a' }}>Alamat</p>
                        <p className="text-xs mt-0.5" style={{ color: '#64748b' }}>Bekasi Timur Regensi Blok F7 No 15, RT 02 RW 014,</p>
                        <p className="text-xs" style={{ color: '#64748b' }}>Kel. Cimuning, Kec. Mustika Jaya, Kota Bekasi 17155</p>
                      </div>
                    </a>
                    <button
                      onClick={() => handleCopy('Bekasi Timur Regensi Blok F7 No 15, RT 02 RW 014, Kel. Cimuning, Kec. Mustika Jaya, Kota Bekasi 17155', 'alamat')}
                      className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200"
                      style={{
                        background: copiedKey === 'alamat' ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.08)',
                        border: `1px solid ${copiedKey === 'alamat' ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.2)'}`,
                        color: copiedKey === 'alamat' ? '#22c55e' : '#ef4444',
                      }}
                      title="Salin alamat"
                    >
                      {copiedKey === 'alamat' ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </div>

                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* PHOTO LIGHTBOX */}
      <AnimatePresence>
        {showPhotoModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-50 cursor-pointer"
              style={{ background: 'rgba(5,8,20,0.92)', backdropFilter: 'blur(16px)' }}
              onClick={() => setShowPhotoModal(false)}
            />

            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 z-50 flex items-center justify-center p-6"
              style={{ pointerEvents: 'none' }}
            >
              <div className="relative" style={{ pointerEvents: 'auto' }}>
                {/* Close button */}
                <button
                  onClick={() => setShowPhotoModal(false)}
                  className="absolute -top-4 -right-4 z-10 flex items-center justify-center w-9 h-9 rounded-full transition-colors"
                  style={{ background: 'rgba(0,200,255,0.15)', border: '1px solid rgba(0,200,255,0.3)', color: '#00c8ff' }}
                >
                  <X size={18} />
                </button>

                {/* Photo container — uncroppedm full photo */}
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{
                    boxShadow: '0 0 60px rgba(0,200,255,0.25), 0 0 0 2px rgba(0,200,255,0.4)',
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/profile.png"
                    alt="Felik Kriswanto"
                    style={{
                      display: 'block',
                      maxWidth: '85vw',
                      maxHeight: '80vh',
                      width: 'auto',
                      height: 'auto',
                      objectFit: 'contain',
                    }}
                  />
                </div>

                {/* Caption */}
                <p className="text-center mt-3 text-sm font-medium" style={{ color: '#94a3b8' }}>
                  Felik Kriswanto — IT Support Specialist
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
