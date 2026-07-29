'use client';

import { useEffect, useRef } from 'react';

const REVEAL_SCROLL_OFFSET = 150;
const FADE_LAMBDA = 14;
const SETTLED_EPSILON = 0.002;
const MAX_FRAME_SECONDS = 0.05;

export function NavScrim() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    const targetOpacity = () => (window.scrollY > REVEAL_SCROLL_OFFSET ? 1 : 0);

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const snap = () => {
        node.style.opacity = String(targetOpacity());
      };
      snap();
      window.addEventListener('scroll', snap, { passive: true });
      return () => window.removeEventListener('scroll', snap);
    }

    let opacity = targetOpacity();
    let frame = 0;
    let previousTime = 0;

    node.style.opacity = String(opacity);

    const step = (time: number) => {
      const elapsed = previousTime
        ? Math.min((time - previousTime) / 1000, MAX_FRAME_SECONDS)
        : 1 / 60;
      previousTime = time;

      const target = targetOpacity();
      opacity += (target - opacity) * (1 - Math.exp(-FADE_LAMBDA * elapsed));

      if (Math.abs(target - opacity) < SETTLED_EPSILON) {
        opacity = target;
        frame = 0;
        previousTime = 0;
      } else {
        frame = requestAnimationFrame(step);
      }

      node.style.opacity = opacity.toFixed(3);
    };

    const schedule = () => {
      if (!frame) {
        previousTime = 0;
        frame = requestAnimationFrame(step);
      }
    };

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });

    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frame) {
        cancelAnimationFrame(frame);
      }
    };
  }, []);

  return <div ref={ref} aria-hidden className="pw-nav-scrim" style={{ opacity: 0 }} />;
}
