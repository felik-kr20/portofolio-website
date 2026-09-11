"use client";

import { motion } from 'framer-motion';
import { Responsibility } from '@/data/portfolio';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ResponsibilityCard } from '@/components/ui/ResponsibilityCard';
import { staggerContainer, fadeInUp } from '@/lib/animations';

interface WhatIDoProps {
  data: Responsibility[];
}

export function WhatIDo({ data }: WhatIDoProps) {
  return (
    <section id="what-i-do" className="py-24 bg-[#0a0a0f]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeading
            title="What I Do"
            subtitle="Day-to-day responsibilities and areas of expertise."
          />
        </AnimatedSection>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {data.map((responsibility) => (
            <motion.div key={responsibility.id} variants={fadeInUp}>
              <ResponsibilityCard responsibility={responsibility} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
