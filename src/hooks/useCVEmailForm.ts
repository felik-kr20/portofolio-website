'use client';

import { useState } from 'react';

export interface CVEmailFields {
  nama: string;
  company: string;
  email: string;
  whatsapp: string;
}

export type CVEmailErrors = Partial<Record<keyof CVEmailFields, string>>;
export type CVEmailStatus = 'idle' | 'loading' | 'success' | 'error';

function validate(fields: CVEmailFields): CVEmailErrors {
  const errors: CVEmailErrors = {};
  if (!fields.nama.trim())    errors.nama    = 'Nama lengkap wajib diisi.';
  if (!fields.company.trim()) errors.company = 'Company / Perusahaan wajib diisi.';
  if (!fields.email.trim()) {
    errors.email = 'Email wajib diisi.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = 'Format email tidak valid.';
  }
  return errors;
}

const INITIAL: CVEmailFields = { nama: '', company: '', email: '', whatsapp: '' };

export function useCVEmailForm(onSuccess?: () => void) {
  const [fields, setFields]             = useState<CVEmailFields>(INITIAL);
  const [errors, setErrors]             = useState<CVEmailErrors>({});
  const [status, setStatus]             = useState<CVEmailStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFields(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof CVEmailFields]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const reset = () => {
    setFields(INITIAL);
    setErrors({});
    setStatus('idle');
    setErrorMessage('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const ve = validate(fields);
    if (Object.keys(ve).length > 0) { setErrors(ve); return; }

    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/send-cv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nama: fields.nama,
          company: fields.company,
          email: fields.email,
          whatsapp: fields.whatsapp || '',
        }),
      });

      const json = await res.json();

      if (!res.ok || !json.ok) {
        throw new Error(json.error ?? 'Gagal mengirim CV.');
      }

      setStatus('success');
      setFields(INITIAL);
      onSuccess?.();
    } catch (err) {
      setStatus('error');
      setErrorMessage(
        err instanceof Error
          ? err.message
          : 'Gagal mengirim CV. Silakan coba lagi atau hubungi langsung via felik103@gmail.com.'
      );
    }
  };

  return { fields, errors, status, errorMessage, handleChange, handleSubmit, reset };
}