"use client";

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Wraps content in a Framer Motion div that animates into view
 * using the fadeInUp variant when the element enters the viewport.
 *
 * - Triggers once per page load (viewport.once = true)
 * - Fires when 20% of the element is visible (amount: 0.2)
 * - Optional delay prop for staggered entrance sequences
 */
export function AnimatedSection({
  children,
  className,
  delay = 0,
}: AnimatedSectionProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeInUp}
      transition={{ delay, duration: 0.6, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
