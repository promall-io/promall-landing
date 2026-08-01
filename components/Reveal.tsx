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
import type { Transition, Variants } from 'framer-motion';

export const REVEAL_EASE = [0.44, 0, 0.56, 1] as const;

export const REVEAL_SPRING: Transition = { type: 'spring', duration: 0.5, bounce: 0 };

export const REVEAL_VIEWPORT = { once: true, amount: 0.15 } as const;

const REVEAL_THRESHOLD = 0.15;

const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

type RevealVariantOptions = {
  delay?: number;
  distance?: number;
  spring?: boolean;
};

export function revealVariants({
  delay = 0,
  distance = 36,
  spring = false,
}: RevealVariantOptions = {}): Variants {
  return {
    hidden: { opacity: 0, y: spring ? 0 : distance, transition: { duration: 0 } },
    visible: {
      opacity: 1,
      y: 0,
      transition: spring ? { ...REVEAL_SPRING, delay } : { duration: 1, ease: REVEAL_EASE, delay },
    },
  };
}

export function motionAllowed() {
  return (
    typeof IntersectionObserver !== 'undefined' &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

export function useRevealArmed() {
  const [armed, setArmed] = useState(false);

  useIsomorphicLayoutEffect(() => {
    if (motionAllowed()) {
      setArmed(true);
    }
  }, []);

  return armed;
}

type RevealPhase = 'idle' | 'pending' | 'in';

export function useRevealState<T extends HTMLElement>(): {
  ref: RefObject<T | null>;
  dataReveal: 'pending' | 'in' | undefined;
} {
  const ref = useRef<T>(null);
  const [phase, setPhase] = useState<RevealPhase>('idle');

  useIsomorphicLayoutEffect(() => {
    if (motionAllowed()) {
      setPhase('pending');
    }
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
  spring = false,
}: RevealVariantOptions = {}): CSSProperties {
  return {
    '--pw-reveal-delay': `${delay}s`,
    '--pw-reveal-distance': `${spring ? 0 : distance}px`,
    '--pw-reveal-duration': spring ? '0.5s' : '1s',
  } as CSSProperties;
}

type RevealProps = RevealVariantOptions & {
  children: ReactNode;
  className?: string;
};

export function Reveal({ children, className, delay = 0, distance = 36, spring }: RevealProps) {
  const { ref, dataReveal } = useRevealState<HTMLDivElement>();

  return (
    <div
      ref={ref}
      data-reveal={dataReveal}
      className={className ? `pw-reveal ${className}` : 'pw-reveal'}
      style={revealStyle({ delay, distance, spring })}
    >
      {children}
    </div>
  );
}
