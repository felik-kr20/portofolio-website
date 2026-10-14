'use client';

import { useEffect, useRef } from 'react';
import { X, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useCVEmailForm } from '@/hooks/useCVEmailForm';

interface CVEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CVEmailModal({ isOpen, onClose }: CVEmailModalProps) {
  const autoCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { fields, errors, status, errorMessage, handleChange, handleSubmit, reset } =
    useCVEmailForm(() => {
      // Auto-close 3 seconds after success
      autoCloseTimer.current = setTimeout(() => {
        handleClose();
      }, 3000);
    });

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (autoCloseTimer.current) clearTimeout(autoCloseTimer.current);
    };
  }, []);

  // Trap scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleClose = () => {
    if (status === 'loading') return; // Block close while sending
    if (autoCloseTimer.current) clearTimeout(autoCloseTimer.current);
    onClose();
    // Reset form state after close animation settles
    setTimeout(reset, 300);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) handleClose();
  };

  if (!isOpen) return null;

  return (
    /* ── Backdrop ── */
    <div
      className="no-print"
      onClick={handleBackdropClick}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'rgba(0, 0, 0, 0.55)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        animation: 'fadeIn 0.18s ease',
      }}
    >
      {/* ── Modal Card ── */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cv-modal-title"
        style={{
          background: 'white',
          borderRadius: '16px',
          padding: '32px',
          width: '100%',
          maxWidth: '440px',
          boxShadow: '0 24px 64px rgba(0,0,0,0.2)',
          position: 'relative',
          animation: 'slideUp 0.22s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        {/* ── Close button ── */}
        {status !== 'loading' && (
          <button
            onClick={handleClose}
            aria-label="Tutup modal"
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#94a3b8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '4px',
              borderRadius: '6px',
              transition: 'color 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#475569')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
          >
            <X size={20} />
          </button>
        )}

        {/* ── Success State ── */}
        {status === 'success' ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: '16px',
              padding: '8px 0',
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #d1fae5, #a7f3d0)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CheckCircle size={32} color="#059669" />
            </div>
            <div>
              <h2
                id="cv-modal-title"
                style={{ fontSize: '18px', fontWeight: 700, color: '#111', marginBottom: '8px' }}
              >
                Permintaan Diterima!
              </h2>
              <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6 }}>
                Data Anda sudah tersimpan. CV akan segera dikirim ke email Anda.
                Modal ini akan tertutup otomatis.
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* ── Header ── */}
            <div style={{ marginBottom: '24px', paddingRight: '32px' }}>
              <h2
                id="cv-modal-title"
                style={{ fontSize: '20px', fontWeight: 700, color: '#111', marginBottom: '6px' }}
              >
                Kirim CV ke Email Anda
              </h2>
              <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5 }}>
                Isi form di bawah dan CV Felik akan dikirim langsung ke email Anda.
              </p>
            </div>

            {/* ── Form ── */}
            <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Nama Lengkap */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <label htmlFor="cv-nama" style={labelStyle}>
                  Nama Lengkap <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  id="cv-nama"
                  name="nama"
                  type="text"
                  value={fields.nama}
                  onChange={handleChange}
                  placeholder="Contoh: Budi Santoso"
                  disabled={status === 'loading'}
                  style={inputStyle(!!errors.nama)}
                  autoComplete="name"
                />
                {errors.nama && <span style={fieldErrorStyle}>{errors.nama}</span>}
              </div>

              {/* Company */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <label htmlFor="cv-company" style={labelStyle}>
                  Company / Perusahaan <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  id="cv-company"
                  name="company"
                  type="text"
                  value={fields.company}
                  onChange={handleChange}
                  placeholder="Contoh: PT Maju Bersama"
                  disabled={status === 'loading'}
                  style={inputStyle(!!errors.company)}
                  autoComplete="organization"
                />
                {errors.company && <span style={fieldErrorStyle}>{errors.company}</span>}
              </div>

              {/* Email */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <label htmlFor="cv-email" style={labelStyle}>
                  Email <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  id="cv-email"
                  name="email"
                  type="email"
                  value={fields.email}
                  onChange={handleChange}
                  placeholder="Contoh: budi@perusahaan.com"
                  disabled={status === 'loading'}
                  style={inputStyle(!!errors.email)}
                  autoComplete="email"
                />
                {errors.email && <span style={fieldErrorStyle}>{errors.email}</span>}
              </div>

              {/* WhatsApp (optional) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <label htmlFor="cv-whatsapp" style={labelStyle}>
                  Nomor WhatsApp{' '}
                  <span style={{ color: '#94a3b8', fontWeight: 400 }}>(opsional)</span>
                </label>
                <input
                  id="cv-whatsapp"
                  name="whatsapp"
                  type="tel"
                  value={fields.whatsapp}
                  onChange={handleChange}
                  placeholder="Contoh: 08123456789"
                  disabled={status === 'loading'}
                  style={inputStyle(false)}
                  autoComplete="tel"
                />
              </div>

              {/* Inline error (API-level) */}
              {status === 'error' && errorMessage && (
                <div
                  role="alert"
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '8px',
                    background: '#fef2f2',
                    border: '1px solid #fecaca',
                    borderRadius: '8px',
                    padding: '10px 12px',
                    fontSize: '13px',
                    color: '#dc2626',
                    lineHeight: 1.5,
                  }}
                >
                  <AlertCircle size={16} style={{ flexShrink: 0, marginTop: '1px' }} />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={status === 'loading'}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  borderRadius: '10px',
                  border: 'none',
                  background:
                    status === 'loading'
                      ? '#a5b4fc'
                      : 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                  color: 'white',
                  fontSize: '15px',
                  fontWeight: 700,
                  cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                  boxShadow:
                    status === 'loading' ? 'none' : '0 4px 14px rgba(79,70,229,0.3)',
                  transition: 'opacity 0.15s, box-shadow 0.15s',
                  marginTop: '4px',
                }}
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 size={16} style={{ animation: 'spin 0.8s linear infinite' }} />
                    Mengirim...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Kirim CV ke Email Saya
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </div>

      {/* ── Keyframe animations injected once ── */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

/* ── Shared style helpers ── */
const labelStyle: React.CSSProperties = {
  fontSize: '13px',
  fontWeight: 600,
  color: '#374151',
};

function inputStyle(hasError: boolean): React.CSSProperties {
  return {
    padding: '10px 12px',
    borderRadius: '8px',
    border: `1.5px solid ${hasError ? '#ef4444' : '#e2e8f0'}`,
    fontSize: '14px',
    color: '#111',
    outline: 'none',
    transition: 'border-color 0.15s',
    background: 'white',
    width: '100%',
  };
}

const fieldErrorStyle: React.CSSProperties = {
  fontSize: '12px',
  color: '#ef4444',
  fontWeight: 500,
};
