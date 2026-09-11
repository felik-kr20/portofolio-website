"use client";

import { motion } from 'framer-motion';
import { Linkedin, Github, Mail, ArrowRight } from 'lucide-react';
import { PersonalInfo } from '@/data/portfolio';
import { fadeInUp, staggerContainer } from '@/lib/animations';

interface HeroProps {
  data: PersonalInfo;
}

const socialIcons: Record<string, React.ElementType> = {
  linkedin: Linkedin,
  github: Github,
  email: Mail,
};

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export function Hero({ data }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center px-4 py-20 overflow-hidden"
    >
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-indigo-500/5 blur-3xl" />
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto gap-5"
      >
        {/* Greeting */}
        <motion.p variants={fadeInUp} className="text-sm font-mono text-indigo-400 tracking-widest uppercase">
          Hello, I&apos;m
        </motion.p>

        {/* Name */}
        <motion.h1
          variants={fadeInUp}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight bg-gradient-to-r from-indigo-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent"
        >
          {data.name}
        </motion.h1>

        {/* Title */}
        <motion.p variants={fadeInUp} className="text-xl sm:text-2xl font-semibold text-slate-300">
          {data.title}
        </motion.p>

        {/* Tagline */}
        <motion.p variants={fadeInUp} className="text-base text-slate-500 font-mono italic">
          &ldquo;{data.tagline}&rdquo;
        </motion.p>

        {/* Bio */}
        <motion.p variants={fadeInUp} className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl">
          {data.bio}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={fadeInUp} className="flex flex-wrap items-center justify-center gap-4 mt-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollTo('projects')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-indigo-500 text-white font-semibold text-sm hover:bg-indigo-400 transition-colors duration-200 shadow-lg shadow-indigo-500/20"
          >
            View My Work
            <ArrowRight size={16} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollTo('contact')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-indigo-500/50 text-indigo-400 font-semibold text-sm hover:bg-indigo-500/10 transition-colors duration-200"
          >
            Contact Me
          </motion.button>
        </motion.div>

        {/* Social Links */}
        {data.social.length > 0 && (
          <motion.div variants={fadeInUp} className="flex items-center gap-4 mt-1">
            {data.social.map((link) => {
              const Icon = socialIcons[link.platform] ?? Mail;
              return (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="flex items-center justify-center w-10 h-10 rounded-full border border-[#1e1e2e] bg-[#1a1a24] text-slate-400 hover:text-indigo-400 hover:border-indigo-500/50 transition-all duration-200"
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </motion.div>
        )}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-600"
      >
        <span className="text-xs tracking-widest uppercase font-mono">scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-0.5 h-6 bg-indigo-500/40 rounded-full"
        />
      </motion.div>
    </section>
  );
}
