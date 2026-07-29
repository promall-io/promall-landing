'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { CircleButton } from '@/components/ui/Primitives';
import { ArrowLeftIcon, ArrowRightIcon } from '@/components/icons';
import type { WhyCard } from '@/types/content';

type WhyCarouselProps = {
  cards: WhyCard[];
  prevLabel: string;
  nextLabel: string;
  isRtl: boolean;
};

const CARD_WIDTH = 'w-[calc((100cqw-24px)/1.15)] min-[811px]:w-[calc((100cqw-48px)/2.72)]';
const GAP = 24;
const SETTLE = 'transform 600ms var(--pw-ease)';

export function WhyCarousel({ cards, prevLabel, nextLabel, isRtl }: WhyCarouselProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const [offset, setOffset] = useState(0);
  const [maxOffset, setMaxOffset] = useState(0);
  const [dragging, setDragging] = useState(false);

  const drag = useRef({ active: false, startX: 0, startOffset: 0 });

  const measure = useCallback(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;
    setMaxOffset(Math.max(0, track.scrollWidth - viewport.clientWidth));
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure, cards.length]);

  useEffect(() => {
    setOffset((current) => Math.min(current, maxOffset));
  }, [maxOffset]);

  const step = useCallback(() => {
    const card = trackRef.current?.firstElementChild as HTMLElement | null;
    return card ? card.getBoundingClientRect().width + GAP : 320;
  }, []);

  const clamp = useCallback((value: number) => Math.min(maxOffset, Math.max(0, value)), [maxOffset]);

  const onPointerDown = (event: React.PointerEvent<HTMLUListElement>) => {
    if (maxOffset <= 0) return;
    drag.current = { active: true, startX: event.clientX, startOffset: offset };
    setDragging(true);
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      // capture is a nicety; dragging still tracks via pointermove
    }
  };

  const onPointerMove = (event: React.PointerEvent<HTMLUListElement>) => {
    if (!drag.current.active) return;
    const delta = (event.clientX - drag.current.startX) * (isRtl ? -1 : 1);
    setOffset(clamp(drag.current.startOffset - delta));
  };

  const endDrag = (event: React.PointerEvent<HTMLUListElement>) => {
    if (!drag.current.active) return;
    drag.current.active = false;
    setDragging(false);
    try {
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
    } catch {
      // already released
    }
  };

  const progress = maxOffset > 0 ? offset / maxOffset : 0;
  const filled = 0.25 + progress * 0.75;
  const sign = isRtl ? 1 : -1;

  return (
    <div>
      <div ref={viewportRef} className="overflow-hidden [container-type:inline-size]">
        <ul
          ref={trackRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onDragStart={(event) => event.preventDefault()}
          className={`flex list-none touch-pan-y select-none gap-6 will-change-transform ${
            maxOffset > 0 ? (dragging ? 'cursor-grabbing' : 'cursor-grab') : ''
          }`}
          style={{
            transform: `translate3d(${sign * offset}px, 0, 0)`,
            transition: dragging ? 'none' : SETTLE,
          }}
        >
          {cards.map((card) => (
            <li key={card.title} className={`pw-card shrink-0 p-2.5 ${CARD_WIDTH}`}>
              <div className="relative aspect-square overflow-hidden rounded-[14px] bg-[var(--pw-paper)] ring-1 ring-[var(--pw-line)]">
                <Image
                  src={card.illustration}
                  alt=""
                  aria-hidden
                  fill
                  draggable={false}
                  sizes="(max-width: 810px) 80vw, 380px"
                  className="pointer-events-none object-contain p-[14%]"
                />
              </div>
              <div className="px-3.5 pb-[18px] pt-[22px]">
                <h3 className="text-base leading-6 text-[var(--pw-cream)]">{card.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--pw-text-dim)]">
                  {card.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-7 flex items-center gap-6">
        <CircleButton
          label={prevLabel}
          disabled={offset <= 0}
          onClick={() => setOffset((current) => clamp(current - step()))}
        >
          <ArrowLeftIcon className="rtl:-scale-x-100" />
        </CircleButton>

        <div className="pw-rail flex-1 overflow-hidden">
          <div
            className="h-px w-full bg-[var(--pw-cream)] motion-reduce:transition-none"
            style={{
              transform: `scaleX(${filled})`,
              transformOrigin: isRtl ? 'right center' : 'left center',
              transition: dragging ? 'none' : 'transform 600ms var(--pw-ease)',
            }}
          />
        </div>

        <CircleButton
          label={nextLabel}
          disabled={maxOffset <= 0 || offset >= maxOffset - 1}
          onClick={() => setOffset((current) => clamp(current + step()))}
        >
          <ArrowRightIcon className="rtl:-scale-x-100" />
        </CircleButton>
      </div>
    </div>
  );
}
