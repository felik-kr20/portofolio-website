"use client";

import { SkillCategory } from '@/data/portfolio';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SkillBadge } from '@/components/ui/SkillBadge';

interface TechnicalSkillsProps {
  data: SkillCategory[];
}

export function TechnicalSkills({ data }: TechnicalSkillsProps) {
  return (
    <section id="skills" className="py-24 bg-[#111118]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeading
            title="Technical Skills"
            subtitle="Technologies and tools I work with, organized by category."
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.map((category, index) => (
            <AnimatedSection key={category.id} delay={index * 0.05}>
              <div className="flex flex-col gap-3 p-6 rounded-xl border border-[#1e1e2e] bg-[#1a1a24]">
                <h3 className="text-sm font-semibold uppercase tracking-widest text-indigo-400">
                  {category.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <SkillBadge key={skill.name} skill={skill} />
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
