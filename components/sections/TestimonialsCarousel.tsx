'use client';

import { useState, type ReactNode } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { CircleButton } from '@/components/ui/Primitives';
import { ArrowLeftIcon, ArrowRightIcon } from '@/components/icons';
import { REVEAL_EASE } from '@/components/Reveal';
import type { Testimonial } from '@/types/content';

type TestimonialsCarouselProps = {
  items: Testimonial[];
  prevLabel: string;
  nextLabel: string;
};

const COMPANY_MARKS: ReactNode[] = [
  <g key="mark-blocks">
    <rect x="4" y="7" width="20" height="20" rx="6" />
    <rect x="16" y="13" width="20" height="20" rx="6" />
  </g>,
  <g key="mark-rings">
    <circle cx="20" cy="20" r="13" />
    <circle cx="20" cy="20" r="6.5" />
    <path d="M20 7v6M20 27v6" />
  </g>,
  <g key="mark-prism">
    <path d="m20 6 12 7v14l-12 7-12-7V13l12-7Z" />
    <path d="m20 20 12-7M20 20v14m0-14-12-7" />
  </g>,
  <g key="mark-grid">
    <circle cx="9" cy="9" r="2" />
    <circle cx="31" cy="9" r="2" />
    <circle cx="9" cy="31" r="2" />
    <circle cx="31" cy="31" r="2" />
    <circle cx="20" cy="20" r="7" />
  </g>,
  <g key="mark-diamond">
    <path d="M20 4 36 20 20 36 4 20 20 4Z" />
    <path d="M20 12.5 27.5 20 20 27.5 12.5 20 20 12.5Z" />
  </g>,
];

function CompanyMark({ variant }: { variant: number }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className="size-10 opacity-50"
      fill="none"
      stroke="var(--pw-cream)"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {COMPANY_MARKS[variant % COMPANY_MARKS.length]}
    </svg>
  );
}

export function TestimonialsCarousel({ items, prevLabel, nextLabel }: TestimonialsCarouselProps) {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const active = items[index];
  const transition = { duration: reduceMotion ? 0 : 0.4, ease: REVEAL_EASE };
  const fade = { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } };

  const goPrev = () => setIndex((current) => (current - 1 + items.length) % items.length);
  const goNext = () => setIndex((current) => (current + 1) % items.length);

  return (
    <div className="pw-card grid grid-cols-1 gap-10 rounded-3xl! p-8 min-[811px]:min-h-[640px] min-[811px]:grid-cols-[1fr_380px]">
      <div className="flex flex-col min-[811px]:h-full">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`quote-${index}`}
            className="flex flex-1 flex-col"
            initial={fade.initial}
            animate={fade.animate}
            exit={fade.exit}
            transition={transition}
          >
            <CompanyMark variant={index} />
            <blockquote className="mt-auto max-w-[40ch] pt-10 text-[22px] leading-[1.75] text-[var(--pw-cream)]">
              {active.quote}
            </blockquote>
          </motion.div>
        </AnimatePresence>

        <div className="mt-7 flex flex-wrap items-center gap-y-4 border-t border-[var(--pw-line)] pt-6">
          <div className="flex items-center gap-2">
            <CircleButton label={prevLabel} onClick={goPrev}>
              <ArrowLeftIcon className="rtl:-scale-x-100" />
            </CircleButton>
            <CircleButton label={nextLabel} onClick={goNext}>
              <ArrowRightIcon className="rtl:-scale-x-100" />
            </CircleButton>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`byline-${index}`}
              className="ms-5 flex flex-col"
              initial={fade.initial}
              animate={fade.animate}
              exit={fade.exit}
              transition={transition}
            >
              <span className="text-sm text-[var(--pw-cream)]">{active.name}</span>
              <span className="text-sm text-[var(--pw-text-dim)]">{active.role}</span>
            </motion.div>
          </AnimatePresence>

          <div className="ms-auto flex items-center">
            {items.map((item, itemIndex) => (
              <button
                key={item.avatar}
                type="button"
                className="p-1.5"
                aria-label={item.name}
                aria-current={itemIndex === index ? 'true' : undefined}
                onClick={() => setIndex(itemIndex)}
              >
                <span
                  className={`block size-1 rounded-full [transition:background-color_0.4s_var(--pw-ease)] ${
                    itemIndex === index ? 'bg-[var(--pw-cream)]' : 'bg-[var(--pw-text-faint)]'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="relative order-first aspect-[3/4] overflow-hidden rounded-[14px] bg-[var(--pw-surface-2)] min-[811px]:order-none min-[811px]:h-full">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`portrait-${index}`}
            className="absolute inset-0"
            initial={fade.initial}
            animate={fade.animate}
            exit={fade.exit}
            transition={transition}
          >
            <Image
              src={active.avatar}
              alt={active.name}
              fill
              sizes="(max-width: 810px) 100vw, 380px"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
