'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

const CLOUDS = [
  {
    src: '/landscape/stat-card-a.png',
    width: 493,
    height: 302,
    className: 'absolute top-[34%] w-[46%] max-w-[520px] [inset-inline-start:-14%]',
  },
  {
    src: '/landscape/stat-card-b.png',
    width: 378,
    height: 221,
    className: 'absolute top-[1%] w-[30%] max-w-[400px] [inset-inline-end:-6%]',
  },
] as const;

export function NumbersParallax() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const nearDrift = useTransform(scrollYProgress, [0, 1], ['-8%', '10%']);
  const farDrift = useTransform(scrollYProgress, [0, 1], ['6%', '-9%']);
  const drifts = [nearDrift, farDrift];

  return (
    <div ref={containerRef} aria-hidden className="pointer-events-none absolute inset-0 z-10">
      {CLOUDS.map((cloud, index) => (
        <motion.div
          key={cloud.src}
          style={prefersReducedMotion ? undefined : { x: drifts[index] }}
          className={cloud.className}
        >
          <Image
            src={cloud.src}
            alt=""
            width={cloud.width}
            height={cloud.height}
            sizes="(max-width: 810px) 60vw, 520px"
            className="h-auto w-full"
          />
        </motion.div>
      ))}
    </div>
  );
}
