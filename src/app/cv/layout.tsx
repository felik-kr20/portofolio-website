import type { ReactNode } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CV — Felik Kriswanto',
  description: 'Curriculum Vitae Felik Kriswanto — IT Support & Technical Support Specialist',
};

export default function CVLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
