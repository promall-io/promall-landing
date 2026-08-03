'use client';

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { BoxIcon, CartIcon, ChatIcon, ProMallMark, TrendIcon } from '@/components/icons';
import type { IntroTiles } from '@/types/content';

const STOCK_LEVELS = [0.74, 0.18, 0.93];
const STOCK_LOW_LEVEL = 0.3;
const REVENUE_BARS = [0.34, 0.52, 0.41, 0.63, 0.55, 0.78, 1];
const COUNT_DURATION = 1500;

function beat(seconds: number, exit?: number): CSSProperties {
  return {
    '--pw-beat': `${seconds}s`,
    ...(exit === undefined ? {} : { '--pw-beat-exit': `${exit}s` }),
  } as CSSProperties;
}

function Tile({
  icon,
  title,
  caption,
  chip,
  chipClassName,
  className,
  children,
}: {
  icon: ReactNode;
  title: string;
  caption: string;
  chip: string;
  chipClassName: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <article className={`pw-card flex flex-col gap-6 p-5 sm:p-6 ${className ?? ''}`}>
      <header className="flex items-start justify-between gap-4">
        <h3 className="flex items-center gap-2.5 text-[1.0625rem] leading-7 text-[var(--pw-cream)]">
          <span className="text-[var(--pw-text-faint)]">{icon}</span>
          {title}
        </h3>
        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] leading-none ${chipClassName}`}
        >
          {chip}
        </span>
      </header>

      <div className="flex-1">{children}</div>

      <p className="text-sm leading-6 text-[var(--pw-text-dim)]">{caption}</p>
    </article>
  );
}

function DmTile({ dm }: { dm: IntroTiles['dm'] }) {
  return (
    <Tile
      icon={<ChatIcon width={19} height={19} />}
      title={dm.title}
      caption={dm.caption}
      chip={dm.chip}
      chipClassName="pw-intro-flash bg-[var(--surface-chip)] text-[var(--pw-text-dim)] ring-1 ring-[var(--pw-line)]"
      className="min-[900px]:col-span-7"
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-full bg-[var(--pw-surface-3)] text-xs text-[var(--pw-cream)]">
            {dm.contact.trim().charAt(0)}
          </span>
          <span className="text-[13px] text-[var(--pw-cream)]">{dm.contact}</span>
        </div>

        <p
          data-beat="in"
          style={beat(0.1)}
          className="max-w-[86%] rounded-2xl rounded-es-md bg-[var(--pw-surface-3)] px-3.5 py-2.5 text-[13px] leading-6 text-[var(--pw-text)]"
        >
          {dm.customer}
        </p>

        <div className="relative">
          <span
            data-beat="pass"
            style={beat(0.85, 2.05)}
            className="absolute inset-x-0 top-1 flex items-center justify-end gap-2"
          >
            <span className="pw-micro">{dm.typing}</span>
            <span className="flex items-center gap-1">
              <span className="pw-intro-dot" />
              <span className="pw-intro-dot [animation-delay:0.15s]" />
              <span className="pw-intro-dot [animation-delay:0.3s]" />
            </span>
          </span>

          <p
            data-beat="in"
            style={beat(2.35)}
            className="ms-auto max-w-[92%] rounded-2xl rounded-ee-md bg-[var(--gold-soft)] px-3.5 py-2.5 text-[13px] leading-6 text-[var(--pw-cream)]"
          >
            {dm.assistant}
          </p>
        </div>

        <div
          data-beat="in"
          style={beat(3.15)}
          className="ms-auto flex w-full max-w-[92%] items-center justify-between gap-4 rounded-2xl bg-[var(--pw-surface-2)] p-3 ring-1 ring-[var(--pw-line)]"
        >
          <span className="min-w-0">
            <span className="block text-[13px] text-[var(--pw-cream)]">{dm.card.title}</span>
            <span className="pw-micro block truncate">{dm.card.meta}</span>
          </span>
          <span className="flex h-8 shrink-0 items-center rounded-full bg-[var(--pw-gold)] px-3.5 text-[12px] text-[var(--text-on-gold)]">
            {dm.card.action}
          </span>
        </div>
      </div>
    </Tile>
  );
}

function StockTile({ stock }: { stock: IntroTiles['stock'] }) {
  return (
    <Tile
      icon={<BoxIcon width={19} height={19} />}
      title={stock.title}
      caption={stock.caption}
      chip={stock.chip}
      chipClassName="pw-intro-flash bg-[var(--warning-soft)] text-[var(--warning-ink)]"
      className="min-[900px]:col-span-4"
    >
      <ul className="flex flex-col gap-4">
        {stock.items.map((item, index) => {
          const level = STOCK_LEVELS[index] ?? 0.5;

          return (
            <li key={item.name} className="flex flex-col gap-2">
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-[13px] text-[var(--pw-cream)]">{item.name}</span>
                <span className="pw-micro whitespace-nowrap">{item.meta}</span>
              </div>
              <span className="block h-1 w-full overflow-hidden rounded-full bg-[var(--pw-line)]">
                <span
                  data-grow
                  style={{
                    ...beat(0.2 + index * 0.16),
                    inlineSize: `${level * 100}%`,
                    background: level < STOCK_LOW_LEVEL ? 'var(--warning)' : 'var(--pw-gold)',
                  }}
                  className="block h-full rounded-full"
                />
              </span>
            </li>
          );
        })}
      </ul>
    </Tile>
  );
}

function RevenueTile({ revenue, locale, play }: { revenue: IntroTiles['revenue']; locale: string; play: boolean }) {
  const [shown, setShown] = useState(revenue.amount);

  useEffect(() => {
    if (!play || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    let frame = 0;
    let start = 0;

    const tick = (now: number) => {
      start ||= now;

      const elapsed = Math.min(1, (now - start) / COUNT_DURATION);
      setShown(Math.round(revenue.amount * (1 - (1 - elapsed) ** 3)));

      if (elapsed < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [play, revenue.amount]);

  const peak = REVENUE_BARS.indexOf(Math.max(...REVENUE_BARS));

  return (
    <Tile
      icon={<TrendIcon width={19} height={19} />}
      title={revenue.title}
      caption={revenue.caption}
      chip={revenue.chip}
      chipClassName="bg-[var(--success-soft)] text-[var(--pw-success)]"
      className="min-[900px]:col-span-4"
    >
      <div className="flex flex-col gap-5">
        <div>
          <p className="pw-micro">{revenue.label}</p>
          <p className="mt-1 text-lg text-[var(--pw-cream)]">
            <span className="pw-num" suppressHydrationWarning>
              {new Intl.NumberFormat(locale).format(shown)}
            </span>{' '}
            <span className="text-sm text-[var(--pw-text-dim)]">{revenue.unit}</span>
          </p>
        </div>

        <div className="flex items-end gap-1.5">
          {revenue.columns.map((column, index) => (
            <span key={`${column}-${index}`} className="flex flex-1 flex-col items-center gap-2">
              <span className="flex h-16 w-full items-end">
                <span
                  data-rise
                  style={{
                    ...beat(0.24 + index * 0.08),
                    blockSize: `${(REVENUE_BARS[index] ?? 0.5) * 100}%`,
                    background: index === peak ? 'var(--pw-gold)' : 'var(--pw-surface-3)',
                  }}
                  className="w-full rounded-t-[4px]"
                />
              </span>
              <span className="pw-micro">{column}</span>
            </span>
          ))}
        </div>
      </div>
    </Tile>
  );
}

function OrderTile({ order }: { order: IntroTiles['order'] }) {
  return (
    <Tile
      icon={<CartIcon width={19} height={19} />}
      title={order.title}
      caption={order.caption}
      chip={order.chip}
      chipClassName="bg-[var(--surface-chip)] text-[var(--pw-text-dim)] ring-1 ring-[var(--pw-line)]"
      className="min-[900px]:col-span-4"
    >
      <ol className="relative flex flex-col gap-5">
        <span
          aria-hidden
          className="absolute inset-y-3 start-[9px] w-px overflow-hidden bg-[var(--pw-line)]"
        >
          <span data-trail style={beat(0.3)} className="block h-full w-full bg-[var(--pw-gold)]" />
        </span>

        {order.steps.map((step, index) => (
          <li key={step} className="relative flex items-center gap-3.5">
            <span className="z-10 flex size-[19px] shrink-0 items-center justify-center rounded-full bg-[var(--pw-surface-2)] ring-1 ring-[var(--pw-line)]">
              <svg
                viewBox="0 0 16 16"
                width={11}
                height={11}
                aria-hidden
                fill="none"
                stroke="var(--pw-gold)"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path data-draw style={beat(0.5 + index * 0.4)} d="m3.5 8.4 3 3L12.5 5" />
              </svg>
            </span>
            <span
              data-beat="in"
              style={beat(0.5 + index * 0.4)}
              className="text-[13px] text-[var(--pw-cream)]"
            >
              {step}
            </span>
          </li>
        ))}
      </ol>
    </Tile>
  );
}

export function IntroScene({
  eyebrow,
  lead,
  note,
  tiles,
  locale,
}: {
  eyebrow: string;
  lead: string;
  note: string;
  tiles: IntroTiles;
  locale: string;
}) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const scene = sceneRef.current;

    if (!scene || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          setPlay(true);
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(scene);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sceneRef} data-play={play || undefined} className="pw-intro-scene">
      <span aria-hidden className="pw-intro-bridge" />

      <div className="grid grid-cols-1 gap-4 min-[900px]:grid-cols-12">
        <div className="pw-card relative flex flex-col justify-between gap-10 overflow-hidden p-5 sm:p-6 min-[900px]:col-span-5">
          <div>
            <span className="pw-micro">{eyebrow}</span>
            <h2 className="pw-h2 mt-4 text-balance text-[clamp(1.5rem,1.2rem+0.7vw,1.75rem)] leading-[1.55]">
              {lead}
            </h2>
          </div>

          <div className="flex items-end justify-between gap-6">
            <p className="pw-small max-w-[26ch]">{note}</p>
            <span className="relative flex shrink-0 items-center justify-center text-[var(--pw-gold)]">
              <span aria-hidden className="pw-intro-halo" />
              <ProMallMark size={34} />
            </span>
          </div>
        </div>

        <DmTile dm={tiles.dm} />
        <StockTile stock={tiles.stock} />
        <RevenueTile revenue={tiles.revenue} locale={locale} play={play} />
        <OrderTile order={tiles.order} />
      </div>
    </div>
  );
}
