'use client';

import { useRef, useState, type KeyboardEvent } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { CircleButton } from '@/components/ui/Primitives';
import { Carousel } from '@/components/ui/Carousel';
import { ArrowLeftIcon, ArrowRightIcon } from '@/components/icons';
import { REVEAL_EASE } from '@/components/Reveal';
import type { FeatureTab } from '@/types/content';

const PANEL_ID = 'features-stage';

const STAGE_SOURCE_WIDTH = 2048;
const STAGE_SIZES = `(max-width: 810px) 100vw, ${STAGE_SOURCE_WIDTH}px`;
const STAGE_QUALITY = 88;

const tabId = (id: string) => `features-tab-${id}`;

type FeaturesTabsProps = {
  tabs: FeatureTab[];
  prevLabel: string;
  nextLabel: string;
  stageLabel: string;
};

export function FeaturesTabs({ tabs, prevLabel, nextLabel, stageLabel }: FeaturesTabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const crossfade = { duration: 0.4, ease: REVEAL_EASE };

  const active = tabs[activeIndex];

  const revealTab = (index: number) => {
    setActiveIndex(index);
    tabRefs.current[index]?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'nearest',
    });
  };

  const step = (delta: number) => revealTab((activeIndex + delta + tabs.length) % tabs.length);

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
    <div className="mt-12 min-[811px]:mt-[90px]">
      {/* The strip scrolls on a phone, so the tab the arrows move to has to be
          brought into view — a keyboard or arrow-button step that lands on an
          off-screen tab looks like nothing happened. Snapping keeps a tab from
          resting half-cut after a flick. */}
      <div
        role="tablist"
        aria-orientation="horizontal"
        onKeyDown={handleTablistKeyDown}
        data-lenis-prevent-wheel
        className="-mx-[var(--pw-gutter)] flex snap-x snap-mandatory gap-2 overflow-x-auto scroll-px-[var(--pw-gutter)] px-[var(--pw-gutter)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden min-[811px]:mx-0 min-[811px]:grid min-[811px]:grid-cols-4 min-[811px]:gap-0 min-[811px]:overflow-visible min-[811px]:px-0"
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
              className={`flex h-[var(--pw-control)] shrink-0 snap-start items-center justify-center whitespace-nowrap rounded-full px-4 text-base [transition:color_0.4s_var(--pw-ease),background-color_0.4s_var(--pw-ease)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ring)] ${
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

      {/* The stage is a rail, not a crossfade: on a phone the way to change a
          screenshot is to push it, and a tab that only responds to a tap leaves
          the visitor swiping at a picture that never moves. Selecting a tab
          scrolls the rail, swiping the rail selects the tab. */}
      <Carousel
        id={PANEL_ID}
        label={stageLabel}
        activeIndex={activeIndex}
        onActiveChange={revealTab}
        dots={false}
        bleed={false}
        className="mt-8"
        railClassName="gap-3"
        slideClassName="w-full"
      >
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className="relative aspect-[4/5] w-full overflow-hidden rounded-[24px] bg-[var(--pw-surface-2)] ring-1 ring-[var(--pw-line)] min-[811px]:aspect-[1080/610]"
          >
            {/* A 2500px-wide desktop panel letterboxed into 342px is 0.14 scale
                — a picture of text, not text. The portrait crop trades the
                panel's edges for 2.2x the type size, which is the difference
                between a screenshot you read and one you scroll past. */}
            <Image
              src={tab.image}
              alt={tab.alt}
              fill
              sizes={STAGE_SIZES}
              quality={STAGE_QUALITY}
              priority={false}
              className="object-cover object-center"
            />
          </div>
        ))}
      </Carousel>

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
