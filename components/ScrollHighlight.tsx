'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

const FOCUS_RATIO = 0.5;
const INACTIVE_OPACITY = 0.25;

type ScrollHighlightProps = {
  items: ReactNode[];
  className?: string;
  itemClassName?: string;
};

export function ScrollHighlight({ items, className, itemClassName }: ScrollHighlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [tracking, setTracking] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!node || query.matches) {
      return;
    }

    setTracking(true);
    let frame = 0;

    const measure = () => {
      frame = 0;
      const focusLine = window.innerHeight * FOCUS_RATIO;
      const children = Array.from(node.children) as HTMLElement[];

      let next = 0;
      children.forEach((child, index) => {
        if (child.getBoundingClientRect().top < focusLine) {
          next = index;
        }
      });

      setActive(next);
    };

    const schedule = () => {
      if (!frame) {
        frame = requestAnimationFrame(measure);
      }
    };

    measure();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);

  return (
    <div ref={containerRef} className={className}>
      {items.map((item, index) => (
        <div
          key={index}
          className={itemClassName}
          style={{
            opacity: !tracking || index === active ? 1 : INACTIVE_OPACITY,
            transition: tracking ? 'opacity 0.4s var(--pw-ease)' : undefined,
            willChange: tracking ? 'opacity' : undefined,
          }}
        >
          {item}
        </div>
      ))}
    </div>
  );
}
