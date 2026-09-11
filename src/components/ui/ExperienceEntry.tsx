"use client";

import { motion } from 'framer-motion';
import { MapPin, Calendar, CheckCircle, Star } from 'lucide-react';
import { WorkExperience } from '@/data/portfolio';
import { slideInLeft } from '@/lib/animations';

interface ExperienceEntryProps {
  experience: WorkExperience;
  isLast?: boolean;
}

export function ExperienceEntry({ experience, isLast = false }: ExperienceEntryProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={slideInLeft}
      className="relative pl-8"
    >
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-[7px] top-5 bottom-0 w-px bg-indigo-500/20" />
      )}
      {/* Timeline dot */}
      <div className="absolute left-0 top-2 w-3.5 h-3.5 rounded-full bg-indigo-500 border-2 border-[#0a0a0f] shadow-[0_0_8px_rgba(99,102,241,0.6)]" />

      <div className="pb-10">
        {/* Header */}
        <div className="mb-3">
          <h3 className="text-xl font-bold text-slate-100">{experience.jobTitle}</h3>
          <p className="text-indigo-400 font-medium mt-0.5">{experience.company}</p>
          <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-slate-500">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {experience.startDate} – {experience.endDate}
            </span>
            {experience.location && (
              <span className="flex items-center gap-1.5">
                <MapPin size={14} />
                {experience.location}
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-400 text-sm leading-relaxed mb-4">{experience.description}</p>

        {/* Responsibilities */}
        {experience.responsibilities.length > 0 && (
          <div className="mb-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">
              Tanggung Jawab
            </h4>
            <ul className="space-y-1.5">
              {experience.responsibilities.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-slate-400">
                  <CheckCircle size={14} className="text-indigo-400 mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Achievements (conditional) */}
        {experience.achievements && experience.achievements.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">
              Pencapaian
            </h4>
            <ul className="space-y-1.5">
              {experience.achievements.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                  <Star size={14} className="text-amber-400 mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Technologies */}
        {experience.technologies && experience.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {experience.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded text-xs font-mono bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
