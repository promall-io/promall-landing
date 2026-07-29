'use client';

import { useRef, useState, type KeyboardEvent } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { CircleButton } from '@/components/ui/Primitives';
import { ArrowLeftIcon, ArrowRightIcon } from '@/components/icons';
import { REVEAL_EASE } from '@/components/Reveal';
import type { FeatureTab } from '@/types/content';

const PANEL_ID = 'features-stage';

const tabId = (id: string) => `features-tab-${id}`;

type FeaturesTabsProps = {
  tabs: FeatureTab[];
  prevLabel: string;
  nextLabel: string;
};

export function FeaturesTabs({ tabs, prevLabel, nextLabel }: FeaturesTabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduceMotion = useReducedMotion();
  const crossfade = { duration: reduceMotion ? 0 : 0.4, ease: REVEAL_EASE };

  const active = tabs[activeIndex];

  const step = (delta: number) => setActiveIndex((current) => (current + delta + tabs.length) % tabs.length);

  const focusTab = (index: number) => {
    setActiveIndex(index);
    tabRefs.current[index]?.focus();
  };

  const handleTablistKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const { key } = event;
    if (key !== 'ArrowRight' && key !== 'ArrowLeft' && key !== 'Home' && key !== 'End') {
      return;
    }

    event.preventDefault();

    if (key === 'Home') {
      focusTab(0);
      return;
    }

    if (key === 'End') {
      focusTab(tabs.length - 1);
      return;
    }

    const isRtl = getComputedStyle(event.currentTarget).direction === 'rtl';
    const forward = key === 'ArrowRight' ? !isRtl : isRtl;
    focusTab((activeIndex + (forward ? 1 : -1) + tabs.length) % tabs.length);
  };

  if (!active) {
    return null;
  }

  return (
    <div className="mt-[90px]">
      <div
        role="tablist"
        aria-orientation="horizontal"
        onKeyDown={handleTablistKeyDown}
        className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden min-[811px]:grid min-[811px]:grid-cols-4 min-[811px]:gap-0 min-[811px]:overflow-visible"
      >
        {tabs.map((tab, index) => {
          const selected = index === activeIndex;

          return (
            <button
              key={tab.id}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={tabId(tab.id)}
              aria-selected={selected}
              aria-controls={PANEL_ID}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveIndex(index)}
              className={`flex h-10 shrink-0 items-center justify-center whitespace-nowrap rounded-full px-4 text-base [transition:color_0.4s_var(--pw-ease),background-color_0.4s_var(--pw-ease)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--pw-line-strong)] ${
                selected
                  ? 'bg-[var(--pw-surface-2)] text-[var(--pw-cream)] ring-1 ring-[var(--pw-line)]'
                  : 'text-[var(--pw-text-faint)]'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div
        id={PANEL_ID}
        role="tabpanel"
        tabIndex={0}
        aria-labelledby={tabId(active.id)}
        className="relative mt-8 aspect-[1080/610] w-full overflow-hidden rounded-[24px] bg-[var(--pw-surface-solid)] ring-1 ring-[var(--pw-line)] focus-visible:outline-none focus-visible:ring-[var(--pw-line-strong)]"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={crossfade}
            className="absolute inset-0"
          >
            <Image
              src={active.image}
              alt={active.alt}
              fill
              sizes="(max-width: 810px) 100vw, 1080px"
              priority={false}
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
        <CircleButton label={prevLabel} onClick={() => step(-1)}>
          <ArrowLeftIcon className="rtl:-scale-x-100" />
        </CircleButton>

        <div className="order-last min-h-6 w-full text-center min-[811px]:order-none min-[811px]:w-auto">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={active.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={crossfade}
              className="text-[14px] text-[var(--pw-text)] min-[391px]:text-base"
            >
              {active.caption}
            </motion.p>
          </AnimatePresence>
        </div>

        <CircleButton label={nextLabel} onClick={() => step(1)}>
          <ArrowRightIcon className="rtl:-scale-x-100" />
        </CircleButton>
      </div>
    </div>
  );
}
