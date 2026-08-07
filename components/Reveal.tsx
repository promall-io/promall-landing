'use client';

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type RefObject,
} from 'react';

export const REVEAL_EASE = [0.44, 0, 0.56, 1] as const;

const REVEAL_THRESHOLD = 0.15;

const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

type RevealVariantOptions = {
  delay?: number;
  distance?: number;
  duration?: number;
  spring?: boolean;
};

/* Reveals are a one-shot entrance fade, not scroll-coupled motion, so they run
   for every visitor — see the motion policy in app/globals.css. This used to
   also return false on `prefers-reduced-motion: reduce`, which left every
   machine with Windows' animation effects turned off with a page where nothing
   ever animated. The only hard requirement is an observer to arm them. */
export function motionAllowed() {
  return typeof IntersectionObserver !== 'undefined';
}

type RevealPhase = 'idle' | 'pending' | 'in';

export function useRevealState<T extends HTMLElement>(): {
  ref: RefObject<T | null>;
  dataReveal: 'pending' | 'in' | undefined;
} {
  const ref = useRef<T>(null);
  const [phase, setPhase] = useState<RevealPhase>('idle');

  useIsomorphicLayoutEffect(() => {
    const node = ref.current;

    if (!node || !motionAllowed() || node.getBoundingClientRect().top < window.innerHeight) {
      return;
    }

    setPhase('pending');
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (phase !== 'pending' || !node) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          setPhase('in');
        }
      },
      { threshold: REVEAL_THRESHOLD },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [phase]);

  return { ref, dataReveal: phase === 'idle' ? undefined : phase };
}

export function revealStyle({
  delay = 0,
  distance = 36,
  duration = 1,
  spring = false,
}: RevealVariantOptions = {}): CSSProperties {
  return {
    '--pw-reveal-delay': `${delay}s`,
    '--pw-reveal-distance': `${distance}px`,
    '--pw-reveal-duration': `${duration}s`,
    '--pw-reveal-ease': spring ? 'var(--pw-spring)' : 'var(--pw-ease)',
  } as CSSProperties;
}

type RevealProps = RevealVariantOptions & {
  children: ReactNode;
  className?: string;
};

export function Reveal({
  children,
  className,
  delay = 0,
  distance = 36,
  duration = 1,
  spring,
}: RevealProps) {
  const { ref, dataReveal } = useRevealState<HTMLDivElement>();

  return (
    <div
      ref={ref}
      data-reveal={dataReveal}
      className={className ? `pw-reveal ${className}` : 'pw-reveal'}
      style={revealStyle({ delay, distance, duration, spring })}
    >
      {children}
    </div>
  );
}
