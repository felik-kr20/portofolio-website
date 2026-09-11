"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Briefcase, CheckCircle, Award, LucideIcon } from 'lucide-react';
import { PersonalInfo } from '@/data/portfolio';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { fadeInUp, staggerContainer } from '@/lib/animations';

interface AboutProps {
  data: PersonalInfo;
}

const highlightIconMap: Record<string, LucideIcon> = {
  Briefcase,
  CheckCircle,
  Ticket: Award,       // fallback — Ticket may not exist in older lucide versions
  Award,
};

export function About({ data }: AboutProps) {
  return (
    <section id="about" className="py-24 bg-[#111118]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeading title="About Me" subtitle="A bit about who I am and what I do." />
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Profile Photo — left column on desktop */}
          <AnimatedSection delay={0.1}>
            <div className="flex justify-center lg:justify-start">
              <div className="relative">
                {/* Accent glow border */}
                <div className="absolute -inset-1 rounded-2xl bg-indigo-500/20 blur-lg" />
                <Image
                  src={data.profileImage}
                  alt={`${data.name} — ${data.title}`}
                  width={400}
                  height={400}
                  className="relative rounded-2xl object-cover border border-indigo-500/20 shadow-2xl shadow-indigo-500/10"
                  priority={false}
                />
              </div>
            </div>
          </AnimatedSection>

          {/* Bio + Highlight stats — right column on desktop */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col gap-6"
          >
            {/* aboutBio paragraph */}
            <motion.p variants={fadeInUp} className="text-slate-400 text-base leading-relaxed">
              {data.aboutBio}
            </motion.p>

            {/* Highlights — 3 stat cards */}
            <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-4">
              {data.highlights.map((highlight) => {
                const Icon = highlightIconMap[highlight.icon] ?? Award;
                return (
                  <div
                    key={highlight.label}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl border border-[#1e1e2e] bg-[#1a1a24] text-center"
                  >
                    <Icon size={22} className="text-indigo-400" />
                    <span className="text-2xl font-bold text-slate-100">{highlight.value}</span>
                    <span className="text-xs text-slate-500 leading-tight">{highlight.label}</span>
                  </div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
