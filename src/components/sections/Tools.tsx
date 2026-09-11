"use client";

import { motion } from 'framer-motion';
import { Tool } from '@/data/portfolio';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ToolTile } from '@/components/ui/ToolTile';
import { staggerContainer, fadeInUp } from '@/lib/animations';

interface ToolsProps {
  data: Tool[];
}

export function Tools({ data }: ToolsProps) {
  return (
    <section id="tools" className="py-24 bg-[#0a0a0f]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeading
            title="Tools & Technologies"
            subtitle="Software and platforms I use in my day-to-day IT work."
          />
        </AnimatedSection>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3"
        >
          {data.map((tool) => (
            <motion.div key={tool.id} variants={fadeInUp}>
              <ToolTile tool={tool} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
