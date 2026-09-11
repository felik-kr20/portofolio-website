"use client";

import { WorkExperience as WorkExperienceType } from '@/data/portfolio';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ExperienceEntry } from '@/components/ui/ExperienceEntry';

interface WorkExperienceProps {
  data: WorkExperienceType[];
}

export function WorkExperience({ data }: WorkExperienceProps) {
  return (
    <section id="experience" className="py-24 bg-[#0a0a0f]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeading
            title="Work Experience"
            subtitle="My professional journey so far."
          />
        </AnimatedSection>

        <div className="max-w-3xl">
          {data.map((experience, index) => (
            <ExperienceEntry
              key={experience.id}
              experience={experience}
              isLast={index === data.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
