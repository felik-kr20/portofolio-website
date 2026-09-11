"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Briefcase, Tag, Wrench, Sparkles } from 'lucide-react';
import { Project } from '@/data/portfolio';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="group flex flex-col rounded-xl border border-[#1e1e2e] bg-[#1a1a24] overflow-hidden transition-all duration-300 hover:border-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/10"
    >
      {/* Image */}
      <div className="relative w-full h-48 bg-[#0a0a0f] overflow-hidden">
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          className="object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={(e) => {
            // fallback: hide broken image, show gradient
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a24] via-[#1a1a24]/20 to-transparent" />
        {/* Category badge */}
        <span className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 backdrop-blur-sm">
          <Tag size={11} />
          {project.category}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-5 flex-1">
        <h3 className="text-lg font-bold text-slate-100 leading-snug group-hover:text-indigo-200 transition-colors">
          {project.title}
        </h3>

        <p className="text-sm text-slate-400 leading-relaxed flex-1">{project.description}</p>

        {/* Role */}
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Briefcase size={14} className="text-indigo-400 shrink-0" />
          <span className="font-medium text-indigo-400">Role:</span>
          <span className="text-slate-400">{project.role}</span>
        </div>

        {/* Key Contribution */}
        <div className="flex items-start gap-2 text-sm">
          <Sparkles size={14} className="text-amber-400 mt-0.5 shrink-0" />
          <p className="text-slate-400 leading-relaxed">{project.keyContribution}</p>
        </div>

        {/* Technologies */}
        {project.technologies.length > 0 && (
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <Wrench size={12} className="text-slate-500" />
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Tools</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded text-xs font-mono bg-[#22222e] text-slate-400 border border-[#1e1e2e]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
