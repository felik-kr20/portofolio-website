"use client";

import { motion } from 'framer-motion';
import { Project } from '@/data/portfolio';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { staggerContainer, fadeInUp } from '@/lib/animations';

interface ProjectsProps {
  data: Project[];
}

export function Projects({ data }: ProjectsProps) {
  return (
    <section id="projects" className="py-24 bg-[#111118]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeading
            title="Selected Projects"
            subtitle="IT projects and implementations I've worked on."
          />
        </AnimatedSection>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {data.map((project) => (
            <motion.div key={project.id} variants={fadeInUp}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
