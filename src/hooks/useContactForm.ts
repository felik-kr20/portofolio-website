'use client';

import { useState } from 'react';
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

  if (!fields.name.trim()) {
    errors.name = 'Nama wajib diisi.';
  }

  if (!fields.email.trim()) {
    errors.email = 'Email wajib diisi.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = 'Format email tidak valid.';
  }

  if (!fields.subject.trim()) {
    errors.subject = 'Subjek wajib diisi.';
  }

  if (!fields.message.trim()) {
    errors.message = 'Pesan wajib diisi.';
  }

  return errors;
}

const INITIAL_FIELDS: FormFields = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

export function useContactForm() {
  const [fields, setFields] = useState<FormFields>(INITIAL_FIELDS);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    // Clear field error as the user types
    if (errors[name as keyof FormFields]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validate(fields);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; // Block submission — no EmailJS call, no page refresh
    }

    setStatus('loading');

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (serviceId && templateId && publicKey) {
      // EmailJS path — env vars configured
      try {
        await emailjs.send(
          serviceId,
          templateId,
          {
            name: fields.name,
            email: fields.email,
            subject: fields.subject,
            message: fields.message,
          },
          publicKey
        );
        setStatus('success');
        setFields(INITIAL_FIELDS); // Reset form only on success
      } catch {
        setStatus('error');
        // Fields are intentionally preserved on error so the user doesn't lose their message
      }
    } else {
      // Mailto fallback — env vars not configured
      const mailtoUrl = `mailto:felik103@gmail.com?subject=${encodeURIComponent(
        fields.subject
      )}&body=${encodeURIComponent(
        `Name: ${fields.name}\nEmail: ${fields.email}\n\n${fields.message}`
      )}`;
      window.open(mailtoUrl);
      setStatus('success');
      setFields(INITIAL_FIELDS);
    }
  };

  return { fields, errors, status, handleChange, handleSubmit };
}
