'use client';

import { useRef } from 'react';
import Image from 'next/image';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';

type Hill = {
  src: string;
  width: number;
  height: number;
  travel: number;
  minHeight: number;
  priority?: boolean;
};

const BACKDROP_HILLS: Hill[] = [
  {
    src: '/landscape/hill-back.png',
    width: 2464,
    height: 909,
    travel: 24,
    minHeight: 260,
    priority: true,
  },
  {
    src: '/landscape/hill-mid.png',
    width: 2464,
    height: 848,
    travel: 40,
    minHeight: 230,
  },
];

const FOREGROUND_HILL: Hill = {
  src: '/landscape/hill-front.png',
  width: 2464,
  height: 488,
  travel: 64,
  minHeight: 120,
};

function HillLayer({
  hill,
  progress,
  still,
}: {
  hill: Hill;
  progress: MotionValue<number>;
  still: boolean;
}) {
  const travel = still ? 0 : hill.travel;
  const y = useTransform(progress, [0, 1], [-travel, 0]);

  return (
    <motion.div className="absolute inset-x-0" style={{ bottom: -travel, y }}>
      <Image
        src={hill.src}
        alt=""
        width={hill.width}
        height={hill.height}
        sizes="100vw"
        priority={hill.priority}
        className="h-auto w-full object-cover"
        style={{ minHeight: hill.minHeight }}
      />
    </motion.div>
  );
}

export function HeroLandscape() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const still = useReducedMotion() ?? false;

  return (
    <>
      <div
        ref={sectionRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        {BACKDROP_HILLS.map((hill) => (
          <HillLayer key={hill.src} hill={hill} progress={scrollYProgress} still={still} />
        ))}
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
        <HillLayer hill={FOREGROUND_HILL} progress={scrollYProgress} still={still} />
      </div>
    </>
  );
}
