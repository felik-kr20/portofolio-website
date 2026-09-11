"use client";

import { Linkedin, Github, Mail } from 'lucide-react';
import { PersonalInfo } from '@/data/portfolio';

interface FooterProps {
  data: PersonalInfo;
}

const NAV_SHORTCUTS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
] as const;

const socialIcons: Record<string, React.ElementType> = {
  linkedin: Linkedin,
  github: Github,
  email: Mail,
};

function scrollTo(href: string) {
  const id = href.slice(1);
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export function Footer({ data }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#1e1e2e] bg-[#0a0a0f] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-8">
          {/* Logo / Name */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); scrollTo('#hero'); }}
            className="text-xl font-bold text-slate-100 hover:text-indigo-400 transition-colors duration-200"
          >
            {data.name}<span className="text-indigo-400">.</span>
          </a>

          {/* Nav Shortcuts */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2" aria-label="Footer navigation">
            {NAV_SHORTCUTS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={(e) => { e.preventDefault(); scrollTo(href); }}
                className="text-sm text-slate-500 hover:text-slate-300 transition-colors duration-200"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Social Links — same as Hero */}
          {data.social.length > 0 && (
            <div className="flex items-center gap-3">
              {data.social.map((link) => {
                const Icon = socialIcons[link.platform] ?? Mail;
                return (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="flex items-center justify-center w-9 h-9 rounded-full border border-[#1e1e2e] bg-[#1a1a24] text-slate-500 hover:text-indigo-400 hover:border-indigo-500/50 transition-all duration-200"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          )}

          {/* Divider */}
          <div className="w-full border-t border-[#1e1e2e]" />

          {/* Copyright */}
          <p className="text-sm text-slate-600">
            &copy; {year} {data.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
