"use client";

import { motion } from 'framer-motion';
import { Skill } from '@/data/portfolio';

interface SkillBadgeProps {
  skill: Skill;
}

const levelColors: Record<string, string> = {
  advanced:     'text-indigo-300 border-indigo-500/30',
  intermediate: 'text-slate-300 border-slate-500/30',
  beginner:     'text-slate-400 border-slate-600/30',
};

export function SkillBadge({ skill }: SkillBadgeProps) {
  const levelClass = skill.level ? levelColors[skill.level] : levelColors.intermediate;

  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      className={`inline-flex items-center px-3 py-1.5 rounded-md text-sm font-mono border bg-[#1a1a24] cursor-default select-none transition-colors duration-200 ${levelClass}`}
    >
      {skill.name}
    </motion.span>
  );
}
