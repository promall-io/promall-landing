'use client';

import type { ReactNode } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

type HeroParallaxProps = {
  rate: number;
  children: ReactNode;
  className?: string;
};

export function HeroParallax({ rate, children, className }: HeroParallaxProps) {
  const { scrollY } = useScroll();
  const still = useReducedMotion() ?? false;
  const y = useTransform(scrollY, (value) => (still ? 0 : Math.round(value * rate)));

  return (
    <motion.div className={className} style={{ y }}>
      {children}
    </motion.div>
  );
}
