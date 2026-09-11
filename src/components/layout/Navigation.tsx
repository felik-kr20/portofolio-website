"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useActiveSection } from '@/hooks/useActiveSection';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
] as const;

const SECTION_IDS = NAV_LINKS.map((l) => l.href.slice(1));

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeSection = useActiveSection(SECTION_IDS);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const id = href.slice(1);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1e1e2e] bg-[#0a0a0f]/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo / Name */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); handleNavClick('#hero'); }}
            className="text-lg font-bold text-slate-100 hover:text-indigo-400 transition-colors duration-200"
          >
            Felik<span className="text-indigo-400">.</span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {NAV_LINKS.map(({ label, href }) => {
              const id = href.slice(1);
              const isActive = activeSection === id;
              return (
                <a
                  key={href}
                  href={href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(href); }}
                  className={`relative px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                    isActive
                      ? 'text-indigo-400'
                      : 'text-slate-400 hover:text-slate-100'
                  }`}
                >
                  {label}
                  {isActive && (
                    <motion.span
                      layoutId="active-nav-indicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-indigo-400 rounded-full"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-md text-slate-400 hover:text-slate-100 hover:bg-[#1a1a24] transition-colors duration-200"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden border-t border-[#1e1e2e] bg-[#0a0a0f]"
          >
            <nav className="flex flex-col px-4 py-3 gap-1" aria-label="Mobile navigation">
              {NAV_LINKS.map(({ label, href }) => {
                const id = href.slice(1);
                const isActive = activeSection === id;
                return (
                  <a
                    key={href}
                    href={href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(href); }}
                    className={`px-4 py-3 rounded-md text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? 'text-indigo-400 bg-indigo-500/10'
                        : 'text-slate-400 hover:text-slate-100 hover:bg-[#1a1a24]'
                    }`}
                  >
                    {label}
                  </a>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
