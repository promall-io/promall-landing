'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from 'react';

/* A swipeable rail.

   The scrolling is the browser's, not ours: `overflow-x: auto` plus scroll-snap
   is the only thing that gives a thumb real momentum, rubber-banding and
   interruptible flicks, and every hand-rolled transform carousel loses all
   three. So this adds only what native scrolling has no opinion about — which
   slide is current, dots that say how many there are, arrow keys, and a
   grab-drag for the mouse users a touch rail leaves out.

   Reading the position is deliberately direction-agnostic: `scrollLeft` is
   positive in LTR and negative in RTL, so no arithmetic on it is portable,
   whereas measuring each slide's box against the scrollport's is. Moving is
   left to scrollIntoView({inline:'start'}), which is the one API that already
   knows about both `direction` and `scroll-padding`. */

type CarouselProps = {
  children: ReactNode[];
  label: string;
  /* Lands on the scrollport, so a tablist elsewhere can aria-control it. */
  id?: string;
  className?: string;
  /* The scrollport bleeds to the screen edge by default, so the slide cut off
     at the boundary is what says "this scrolls" without drawing a scrollbar. */
  bleed?: boolean;
  /* Utilities that stand the rail down above a breakpoint, so the same markup
     is a grid on a desktop and a rail on a phone without shipping both. */
  railClassName?: string;
  slideClassName?: string;
  dotsClassName?: string;
  dots?: boolean;
  style?: CSSProperties;
  onActiveChange?: (index: number) => void;
  activeIndex?: number;
};

const DRAG_THRESHOLD = 4;

export function Carousel({
  children,
  label,
  id,
  className,
  bleed = true,
  railClassName,
  slideClassName,
  dotsClassName,
  dots = true,
  style,
  onActiveChange,
  activeIndex,
}: CarouselProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [current, setCurrent] = useState(0);

  const count = children.length;
  const active = activeIndex ?? current;

  /* The slide whose inline-start edge is nearest the scrollport's, because
     snap-start is what the rail lands on — measuring centres instead reports
     the second card as current the moment a wide viewport shows two of them,
     while the rail has not moved at all. Reading the start edge means reading
     `right` in RTL, which is the whole reason this is a measurement and not
     arithmetic on scrollLeft. */
  const measure = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;

    const style = getComputedStyle(rail);
    const rtl = style.direction === 'rtl';
    const railBox = rail.getBoundingClientRect();
    const padStart = parseFloat(rtl ? style.paddingRight : style.paddingLeft) || 0;
    const portStart = rtl ? railBox.right - padStart : railBox.left + padStart;

    let nearest = 0;
    let best = Infinity;

    slideRefs.current.forEach((slide, index) => {
      if (!slide) return;
      const box = slide.getBoundingClientRect();
      const distance = Math.abs((rtl ? box.right : box.left) - portStart);
      if (distance < best) {
        best = distance;
        nearest = index;
      }
    });

    setCurrent((previous) => (previous === nearest ? previous : nearest));
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    measure();
    rail.addEventListener('scroll', measure, { passive: true });
    window.addEventListener('resize', measure);
    return () => {
      rail.removeEventListener('scroll', measure);
      window.removeEventListener('resize', measure);
    };
  }, [measure]);

  const notify = useRef(onActiveChange);
  notify.current = onActiveChange;
  const applied = useRef(activeIndex);
  const mounted = useRef(false);

  useEffect(() => {
    /* The rail moved under its own steam, so whatever the owner sets in
       response is an echo, not a command — record it as already applied or the
       controlled effect below will re-scroll a rail that is still settling. */
    applied.current = current;
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    notify.current?.(current);
  }, [current]);

  const goTo = useCallback((index: number) => {
    slideRefs.current[index]?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    });
  }, []);

  /* Controlled mode: the owner moved the selection (a tab was clicked) and the
     rail follows. Keyed on the incoming value alone — reacting to `current` too
     would make the rail chase the echo of its own scroll. */
  useEffect(() => {
    if (activeIndex === undefined || activeIndex === applied.current) return;
    applied.current = activeIndex;
    goTo(activeIndex);
  }, [activeIndex, goTo]);

  const step = (delta: number) => {
    const next = Math.min(count - 1, Math.max(0, active + delta));
    if (next !== active) goTo(next);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    event.preventDefault();
    const rtl = getComputedStyle(event.currentTarget).direction === 'rtl';
    const forward = event.key === 'ArrowRight' ? !rtl : rtl;
    step(forward ? 1 : -1);
  };

  /* Mouse drag only. Touch already has momentum from the scrollport and a
     pointer handler would fight it, so this never arms for a finger. */
  const drag = useRef<{ id: number; x: number; moved: boolean } | null>(null);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse' || event.button !== 0) return;
    drag.current = { id: event.pointerId, x: event.clientX, moved: false };
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const state = drag.current;
    const rail = railRef.current;
    if (!state || !rail || state.id !== event.pointerId) return;

    const delta = state.x - event.clientX;
    if (!state.moved && Math.abs(delta) < DRAG_THRESHOLD) return;

    if (!state.moved) {
      state.moved = true;
      rail.setPointerCapture(event.pointerId);
      rail.dataset.dragging = 'true';
      /* Snap has to stand down mid-drag, or every frame yanks back to a stop. */
      rail.style.scrollSnapType = 'none';
    }

    rail.scrollLeft += delta;
    state.x = event.clientX;
  };

  const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    const state = drag.current;
    const rail = railRef.current;
    drag.current = null;
    if (!state?.moved || !rail) return;

    if (rail.hasPointerCapture(event.pointerId)) rail.releasePointerCapture(event.pointerId);
    delete rail.dataset.dragging;
    rail.style.scrollSnapType = '';
    /* Restoring snap does not re-snap on its own; landing on the nearest slide
       is what makes a release feel like a flick rather than a stop. */
    rail.dataset.dragged = 'true';
    requestAnimationFrame(() => goTo(current));
  };

  /* A drag that travelled must not also click whatever it started on. */
  const onClickCapture = (event: ReactMouseEvent<HTMLDivElement>) => {
    const rail = railRef.current;
    if (rail?.dataset.dragged !== 'true') return;
    delete rail.dataset.dragged;
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div className={className}>
      <div
        ref={railRef}
        id={id}
        role="group"
        aria-roledescription="carousel"
        aria-label={label}
        style={style}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
        data-lenis-prevent
        className={`pw-swipe flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ring)] ${
          bleed ? '-mx-[var(--pw-gutter)] scroll-px-[var(--pw-gutter)] px-[var(--pw-gutter)]' : ''
        } ${railClassName ?? ''}`}
      >
        {children.map((slide, index) => (
          <div
            key={index}
            ref={(node) => {
              slideRefs.current[index] = node;
            }}
            aria-roledescription="slide"
            aria-label={`${index + 1} / ${count}`}
            className={`shrink-0 snap-start ${slideClassName ?? ''}`}
          >
            {slide}
          </div>
        ))}
      </div>

      {dots && count > 1 ? (
        <div className={`mt-6 flex items-center justify-center gap-2 ${dotsClassName ?? ''}`}>
          {children.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`${index + 1} / ${count}`}
              aria-current={index === active ? 'true' : undefined}
              className={`pw-touch-target relative h-1.5 rounded-full [transition:width_0.4s_var(--pw-ease),background-color_0.4s_var(--pw-ease)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ring)] ${
                index === active
                  ? 'w-6 bg-[var(--pw-cream)]'
                  : 'w-1.5 bg-[rgb(var(--pw-veil-rgb)/24%)]'
              }`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
