"use client";

import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useContactForm } from '@/hooks/useContactForm';

export function ContactForm() {
  const { fields, errors, status, handleChange, handleSubmit } = useContactForm();

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {/* Success Notification */}
      {status === 'success' && (
        <div className="flex items-center gap-3 p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400">
          <CheckCircle size={18} className="shrink-0" />
          <p className="text-sm">Pesan berhasil dikirim! Saya akan menghubungi kamu segera.</p>
        </div>
      )}

      {/* Error Notification */}
      {status === 'error' && (
        <div className="flex items-center gap-3 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400">
          <AlertCircle size={18} className="shrink-0" />
          <p className="text-sm">Gagal mengirim pesan. Silakan coba lagi atau hubungi saya langsung via email.</p>
        </div>
      )}

      {/* Name */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="text-sm font-medium text-slate-300">
          Nama <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={fields.name}
          onChange={handleChange}
          placeholder="Nama lengkap Anda"
          required
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
          className={`px-4 py-3 rounded-lg bg-[#1a1a24] border text-slate-100 placeholder-slate-600 text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${
            errors.name ? 'border-red-500/60' : 'border-[#1e1e2e] focus:border-indigo-500/50'
          }`}
        />
        {errors.name && (
          <p id="name-error" className="text-xs text-red-400">{errors.name}</p>
        )}
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm font-medium text-slate-300">
          Email <span className="text-red-400">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={fields.email}
          onChange={handleChange}
          placeholder="email@example.com"
          required
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
          className={`px-4 py-3 rounded-lg bg-[#1a1a24] border text-slate-100 placeholder-slate-600 text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${
            errors.email ? 'border-red-500/60' : 'border-[#1e1e2e] focus:border-indigo-500/50'
          }`}
        />
        {errors.email && (
          <p id="email-error" className="text-xs text-red-400">{errors.email}</p>
        )}
      </div>

      {/* Subject */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="subject" className="text-sm font-medium text-slate-300">
          Subjek <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={fields.subject}
          onChange={handleChange}
          placeholder="Subjek pesan"
          required
          aria-invalid={!!errors.subject}
          aria-describedby={errors.subject ? 'subject-error' : undefined}
          className={`px-4 py-3 rounded-lg bg-[#1a1a24] border text-slate-100 placeholder-slate-600 text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${
            errors.subject ? 'border-red-500/60' : 'border-[#1e1e2e] focus:border-indigo-500/50'
          }`}
        />
        {errors.subject && (
          <p id="subject-error" className="text-xs text-red-400">{errors.subject}</p>
        )}
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm font-medium text-slate-300">
          Pesan <span className="text-red-400">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={fields.message}
          onChange={handleChange}
          placeholder="Tulis pesan Anda di sini..."
          required
          rows={5}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
          className={`px-4 py-3 rounded-lg bg-[#1a1a24] border text-slate-100 placeholder-slate-600 text-sm resize-none transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${
            errors.message ? 'border-red-500/60' : 'border-[#1e1e2e] focus:border-indigo-500/50'
          }`}
        />
        {errors.message && (
          <p id="message-error" className="text-xs text-red-400">{errors.message}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-indigo-500 text-white font-semibold text-sm hover:bg-indigo-400 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200 shadow-lg shadow-indigo-500/20"
      >
        {status === 'loading' ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Mengirim...
          </>
        ) : (
          <>
            <Send size={16} />
            Send Message
          </>
        )}
      </button>
    </form>
  );
}
