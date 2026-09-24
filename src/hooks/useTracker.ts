'use client';
import { useEffect } from 'react';

export function usePageView() {
  useEffect(() => {
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'view' }),
    }).catch(() => {});
  }, []);
}

export function trackClick(target: 'email' | 'whatsapp' | 'address' | 'instagram' | 'linkedin') {
  fetch('/api/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: 'click', target }),
  }).catch(() => {});
}
