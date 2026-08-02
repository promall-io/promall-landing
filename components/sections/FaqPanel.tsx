'use client';

import { useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronDownIcon } from '@/components/icons';
import { REVEAL_EASE } from '@/components/Reveal';
import type { FaqCategory } from '@/types/content';

type FaqPanelProps = {
  categories: FaqCategory[];
  contact: ReactNode;
};

export function FaqPanel({ categories, contact }: FaqPanelProps) {
  const [activeId, setActiveId] = useState(categories[0]?.id ?? '');
  const [openKey, setOpenKey] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();
  const panelMotion = { duration: reduceMotion ? 0 : 0.35, ease: REVEAL_EASE };

  const active = categories.find((category) => category.id === activeId) ?? categories[0];

  if (!active) {
    return null;
  }

  const selectCategory = (id: string) => {
    setActiveId(id);
    setOpenKey(null);
  };

  return (
    <div className="grid grid-cols-1 gap-8 min-[811px]:grid-cols-[380px_1fr] min-[811px]:gap-12">
      <div className="contents min-[811px]:flex min-[811px]:min-w-0 min-[811px]:flex-col">
        <div
          data-lenis-prevent-wheel
          className="order-1 flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden min-[811px]:sticky min-[811px]:top-[120px] min-[811px]:flex-col min-[811px]:overflow-visible"
        >
          {categories.map((category) => {
            const isActive = category.id === active.id;

            return (
              <button
                key={category.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => selectCategory(category.id)}
                className={`shrink-0 whitespace-nowrap rounded-full px-5 py-3 text-center text-base [transition:color_0.4s_var(--pw-ease),background-color_0.4s_var(--pw-ease)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--pw-line-strong)] ${
                  isActive
                    ? 'bg-[var(--pw-surface-2)] text-[var(--pw-cream)] ring-1 ring-[var(--pw-line)]'
                    : 'text-[var(--pw-text-dim)]'
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </div>

        <div className="order-3 min-[811px]:mt-auto min-[811px]:pt-12">{contact}</div>
      </div>

      <div className="order-2 flex flex-col gap-3">
        {active.items.map((item, index) => {
          const rowKey = `${active.id}-${index}`;
          const isOpen = openKey === rowKey;
          const triggerId = `faq-trigger-${rowKey}`;
          const panelId = `faq-panel-${rowKey}`;

          return (
            <div
              key={rowKey}
              className="overflow-hidden rounded-[18px] bg-[var(--pw-surface-1)] ring-1 ring-[var(--pw-line)]"
            >
              <h3>
                <button
                  id={triggerId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenKey(isOpen ? null : rowKey)}
                  className="flex w-full items-center justify-between gap-6 px-7 py-[26px] text-start focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--pw-line-strong)]"
                >
                  <span className="text-base leading-[1.5] text-[var(--pw-cream)]">
                    {item.question}
                  </span>
                  <span
                    aria-hidden
                    className={`flex size-[30px] shrink-0 items-center justify-center rounded-full text-[var(--pw-text-dim)] ring-1 ring-[var(--pw-line)] transition-transform duration-[0.4s] ease-[var(--pw-ease)] ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  >
                    <ChevronDownIcon width={16} height={16} />
                  </span>
                </button>
              </h3>

              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    id={panelId}
                    role="region"
                    aria-labelledby={triggerId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={panelMotion}
                    className="overflow-hidden"
                  >
                    <p className="px-7 pb-[26px] text-sm leading-[1.85] text-[var(--pw-text-dim)]">
                      {item.answer}
                    </p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
