"use client";

import {
  Headphones,
  Users,
  Wrench,
  Server,
  FolderKanban,
  Settings2,
  FileText,
  DatabaseZap,
  LucideIcon,
} from 'lucide-react';
import { Responsibility } from '@/data/portfolio';

const iconMap: Record<string, LucideIcon> = {
  Headphones,
  Users,
  Wrench,
  Server,
  FolderKanban,
  Settings2,
  FileText,
  DatabaseZap,
};

interface ResponsibilityCardProps {
  responsibility: Responsibility;
}

export function ResponsibilityCard({ responsibility }: ResponsibilityCardProps) {
  const Icon = iconMap[responsibility.icon] ?? Headphones;

  return (
    <div className="group flex flex-col gap-3 p-6 rounded-xl border border-[#1e1e2e] bg-[#1a1a24] transition-all duration-300 hover:border-indigo-500/50 hover:bg-[#22222e] cursor-default">
      <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-indigo-500/10 text-indigo-400 group-hover:text-indigo-300 transition-colors duration-300">
        <Icon size={24} strokeWidth={1.5} />
      </div>
      <h3 className="text-base font-semibold text-slate-100">{responsibility.title}</h3>
      <p className="text-sm text-slate-400 leading-relaxed">{responsibility.description}</p>
    </div>
  );
}
