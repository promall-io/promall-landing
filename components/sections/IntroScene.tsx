'use client';

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { BoxIcon, CartIcon, ChatIcon, CheckIcon, ProMallMark, TrendIcon } from '@/components/icons';
import { EyebrowPill } from '@/components/ui/Primitives';
import type { IntroTiles } from '@/types/content';

const STOCK_LEVELS = [0.74, 0.18, 0.93];
const STOCK_LOW_LEVEL = 0.3;
const REVENUE_BARS = [0.34, 0.52, 0.41, 0.63, 0.55, 0.78, 1];
const COUNT_DURATION = 1600;
const REVENUE_TICKS = [240000, 185000, 320000, 155000];
const REVENUE_TICK_MS = 4200;
const REVENUE_TICK_START_MS = 3200;
const DM_CYCLE_MS = 9600;
const ORDER_CYCLE_MS = 8400;

function beat(seconds: number, exit?: number): CSSProperties {
  return {
    '--pw-beat': `${seconds}s`,
    ...(exit === undefined ? {} : { '--pw-beat-exit': `${exit}s` }),
  } as CSSProperties;
}

function enter(seconds: number): CSSProperties {
  return { '--pw-enter': `${seconds}s` } as CSSProperties;
}

function BentoCard({
  icon,
  title,
  chip,
  chipClassName,
  caption,
  className,
  style,
  children,
}: {
  icon: ReactNode;
  title: string;
  chip: string;
  chipClassName: string;
  caption: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <article className={`pw-bento-card ${className ?? ''}`} style={style}>
      <header className="flex items-start justify-between gap-4">
        <h3 className="flex items-center gap-3 text-[1.0625rem] leading-7 text-[var(--pw-cream)]">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-[10px] bg-[var(--pw-surface-2)] text-[var(--pw-text-dim)] ring-1 ring-[var(--pw-line)]">
            {icon}
          </span>
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

function DmWidget({ dm, paid, cycle }: { dm: IntroTiles['dm']; paid: string; cycle: number }) {
  return (
    <div key={cycle} className="flex h-full flex-col justify-center gap-5">
      <div className="flex items-center gap-2.5">
        <span className="flex size-9 items-center justify-center rounded-full bg-[var(--pw-surface-3)] text-[13px] text-[var(--pw-cream)]">
          {dm.contact.trim().charAt(0)}
        </span>
        <span className="text-[13px] text-[var(--pw-cream)]">{dm.contact}</span>
        <span aria-hidden className="pw-pulse-dot" />
      </div>

      <p
        data-beat="in"
        style={beat(0.3)}
        className="max-w-[84%] rounded-[20px] rounded-es-md bg-[var(--pw-surface-3)] px-4 py-3 text-[13.5px] leading-6 text-[var(--pw-text)]"
      >
        {dm.customer}
      </p>

      <div className="relative">
        <span
          data-beat="pass"
          style={beat(0.9, 2.6)}
          className="absolute inset-x-0 top-0 flex items-center justify-end gap-2.5"
        >
          <span className="relative flex items-center justify-center text-[var(--pw-gold)]">
            <span aria-hidden className="pw-intro-halo" />
            <ProMallMark size={18} />
          </span>
          <span className="pw-micro">{dm.typing}</span>
          <span className="flex items-center gap-1">
            <span className="pw-intro-dot" />
            <span className="pw-intro-dot [animation-delay:0.15s]" />
            <span className="pw-intro-dot [animation-delay:0.3s]" />
          </span>
        </span>

        <p
          data-beat="in"
          style={beat(2.9)}
          className="ms-auto max-w-[90%] rounded-[20px] rounded-ee-md bg-[var(--gold-soft)] px-4 py-3 text-[13.5px] leading-6 text-[var(--pw-cream)] ring-1 ring-[var(--pw-line)]"
        >
          {dm.assistant}
        </p>
      </div>

      <div
        data-beat="pop"
        style={beat(3.9)}
        className="pw-intro-card ms-auto flex w-full max-w-[90%] items-center justify-between gap-4 rounded-[18px] bg-[var(--pw-surface-2)] p-3.5"
      >
        <span className="min-w-0">
          <span className="block text-[13px] text-[var(--pw-cream)]">{dm.card.title}</span>
          <span className="pw-micro block truncate">{dm.card.meta}</span>
        </span>
        <span className="flex h-9 shrink-0 items-center rounded-full bg-[var(--pw-gold)] px-4 text-[12px] text-[var(--text-on-gold)]">
          {dm.card.action}
        </span>
      </div>

      <span
        data-beat="in"
        style={beat(5)}
        className="ms-auto flex items-center gap-1.5 rounded-full bg-[var(--success-soft)] px-3 py-1.5 text-[12px] leading-none text-[var(--pw-success)]"
      >
        <CheckIcon width={13} height={13} />
        {paid}
      </span>
    </div>
  );
}

function RevenueWidget({
  revenue,
  locale,
  active,
  live,
}: {
  revenue: IntroTiles['revenue'];
  locale: string;
  active: boolean;
  live: boolean;
}) {
  const [shown, setShown] = useState(revenue.amount);
  const [tick, setTick] = useState<{ gen: number; value: number } | null>(null);

  useEffect(() => {
    if (!active || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(revenue.amount);
      return;
    }

    let frame = 0;
    let start = 0;

    const step = (now: number) => {
      start ||= now;

      const elapsed = Math.min(1, (now - start) / COUNT_DURATION);
      setShown(Math.round(revenue.amount * (1 - (1 - elapsed) ** 3)));

      if (elapsed < 1) {
        frame = requestAnimationFrame(step);
      }
    };

    frame = requestAnimationFrame(step);

    return () => cancelAnimationFrame(frame);
  }, [active, revenue.amount]);

  useEffect(() => {
    if (!live) {
      return;
    }

    let index = 0;
    let interval = 0;

    const timeout = window.setTimeout(() => {
      interval = window.setInterval(() => {
        const value = REVENUE_TICKS[index % REVENUE_TICKS.length];
        index += 1;
        setShown((current) => current + value);
        setTick({ gen: index, value });
      }, REVENUE_TICK_MS);
    }, REVENUE_TICK_START_MS);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [live]);

  const peak = REVENUE_BARS.indexOf(Math.max(...REVENUE_BARS));
  const signed = new Intl.NumberFormat(locale, { signDisplay: 'always' });

  return (
    <div className="flex h-full flex-col justify-between gap-6">
      <div className="relative">
        <p className="pw-micro">{revenue.label}</p>
        <p className="mt-1 text-[clamp(1.375rem,1.15rem+0.7vw,1.625rem)] leading-tight text-[var(--pw-cream)]">
          <span className="pw-num" suppressHydrationWarning>
            {new Intl.NumberFormat(locale).format(shown)}
          </span>{' '}
          <span className="text-sm text-[var(--pw-text-dim)]">{revenue.unit}</span>
        </p>

        {tick ? (
          <span key={tick.gen} className="pw-revenue-tick pw-num">
            {signed.format(tick.value)}
          </span>
        ) : null}
      </div>

      <div className="flex items-end gap-1.5">
        {revenue.columns.map((column, index) => (
          <span key={`${column}-${index}`} className="flex flex-1 flex-col items-center gap-2">
            <span className="flex h-16 w-full items-end">
              <span
                data-rise
                data-peak={index === peak ? 'true' : undefined}
                style={{
                  ...beat(0.3 + index * 0.09),
                  blockSize: `${(REVENUE_BARS[index] ?? 0.5) * 100}%`,
                  background: index === peak ? 'var(--pw-gold)' : 'var(--pw-surface-3)',
                }}
                className="pw-revenue-bar w-full rounded-t-[4px]"
              />
            </span>
            <span className="pw-micro">{column}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function StockWidget({ stock }: { stock: IntroTiles['stock'] }) {
  return (
    <ul className="flex h-full flex-col justify-center gap-5">
      {stock.items.map((item, index) => {
        const level = STOCK_LEVELS[index] ?? 0.5;
        const low = level < STOCK_LOW_LEVEL;

        return (
          <li key={item.name} className="flex flex-col gap-2">
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-[13px] text-[var(--pw-cream)]">{item.name}</span>
              <span
                className={`pw-micro whitespace-nowrap ${low ? 'text-[var(--warning-ink)]' : ''}`}
              >
                {item.meta}
              </span>
            </div>
            <span className="block h-[3px] w-full overflow-hidden rounded-full bg-[var(--pw-line)]">
              <span
                data-grow
                style={{
                  ...beat(0.3 + index * 0.18),
                  inlineSize: `${level * 100}%`,
                  background: low ? 'var(--warning)' : 'var(--pw-gold)',
                }}
                className="block h-full rounded-full"
              />
            </span>
          </li>
        );
      })}
    </ul>
  );
}

function OrderWidget({ order, cycle }: { order: IntroTiles['order']; cycle: number }) {
  return (
    <div key={cycle} className="flex h-full flex-col justify-center py-2">
      <div className="relative">
        <span
          aria-hidden
          className="absolute top-[11px] h-px"
          style={{ insetInlineStart: '16.6%', insetInlineEnd: '16.6%' }}
        >
          <span className="absolute inset-0 overflow-hidden rounded-full bg-[var(--pw-line)]">
            <span className="pw-order-trail block h-full w-full bg-[var(--pw-gold)]" />
          </span>
          <span aria-hidden className="pw-order-dot" />
        </span>

        <ol className="relative flex justify-between gap-3">
          {order.steps.map((step, index) => (
            <li key={step} className="flex flex-1 flex-col items-center gap-3 text-center">
              <span className="z-10 flex size-[23px] shrink-0 items-center justify-center rounded-full bg-[var(--pw-surface-1)] ring-1 ring-[var(--pw-line)]">
                <svg
                  viewBox="0 0 16 16"
                  width={12}
                  height={12}
                  aria-hidden
                  fill="none"
                  stroke="var(--pw-gold)"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path data-draw style={beat(0.5 + index * 1.2)} d="m3.5 8.4 3 3L12.5 5" />
                </svg>
              </span>
              <span
                data-beat="in"
                style={beat(0.5 + index * 1.2)}
                className="max-w-[16ch] text-[12.5px] leading-5 text-[var(--pw-cream)]"
              >
                {step}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
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
  const [reduced, setReduced] = useState(false);
  const [dmCycle, setDmCycle] = useState(0);
  const [orderCycle, setOrderCycle] = useState(0);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(query.matches);

    sync();
    query.addEventListener('change', sync);

    return () => query.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    const scene = sceneRef.current;

    if (!scene || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => setPlay(entries.some((entry) => entry.isIntersecting)),
      { rootMargin: '-10% 0px -14% 0px' },
    );

    observer.observe(scene);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!play || reduced) {
      return;
    }

    const dm = window.setInterval(() => setDmCycle((cycle) => cycle + 1), DM_CYCLE_MS);
    const order = window.setInterval(() => setOrderCycle((cycle) => cycle + 1), ORDER_CYCLE_MS);

    return () => {
      clearInterval(dm);
      clearInterval(order);
    };
  }, [play, reduced]);

  return (
    <div ref={sceneRef} data-play={play || undefined} className="pw-intro-scene">
      <span aria-hidden className="pw-intro-bridge" />

      <header className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col items-start gap-6">
          <EyebrowPill label={eyebrow} />
          <h2 className="pw-h2 max-w-[34ch] text-balance text-[clamp(1.5rem,1.15rem+1.3vw,2rem)] leading-[1.5]">
            {lead}
          </h2>
        </div>
        <p className="pw-small max-w-[34ch] md:pb-2">{note}</p>
      </header>

      <div className="mt-12 grid grid-cols-1 gap-4 min-[900px]:mt-16 min-[900px]:grid-cols-12">
        <BentoCard
          icon={<ChatIcon width={17} height={17} />}
          title={tiles.dm.title}
          chip={tiles.dm.chip}
          chipClassName="pw-intro-flash bg-[var(--surface-chip)] text-[var(--pw-text-dim)] ring-1 ring-[var(--pw-line)]"
          caption={tiles.dm.caption}
          className="min-[900px]:col-span-7 min-[900px]:row-span-2"
          style={enter(0)}
        >
          <DmWidget dm={tiles.dm} paid={tiles.order.steps[1]} cycle={dmCycle} />
        </BentoCard>

        <BentoCard
          icon={<TrendIcon width={17} height={17} />}
          title={tiles.revenue.title}
          chip={tiles.revenue.chip}
          chipClassName="bg-[var(--success-soft)] text-[var(--pw-success)]"
          caption={tiles.revenue.caption}
          className="min-[900px]:col-span-5"
          style={enter(0.09)}
        >
          <RevenueWidget
            revenue={tiles.revenue}
            locale={locale}
            active={play}
            live={play && !reduced}
          />
        </BentoCard>

        <BentoCard
          icon={<BoxIcon width={17} height={17} />}
          title={tiles.stock.title}
          chip={tiles.stock.chip}
          chipClassName="pw-intro-flash bg-[var(--warning-soft)] text-[var(--warning-ink)]"
          caption={tiles.stock.caption}
          className="min-[900px]:col-span-5"
          style={enter(0.18)}
        >
          <StockWidget stock={tiles.stock} />
        </BentoCard>

        <BentoCard
          icon={<CartIcon width={17} height={17} />}
          title={tiles.order.title}
          chip={tiles.order.chip}
          chipClassName="bg-[var(--surface-chip)] text-[var(--pw-text-dim)] ring-1 ring-[var(--pw-line)]"
          caption={tiles.order.caption}
          className="min-[900px]:col-span-12"
          style={enter(0.27)}
        >
          <OrderWidget order={tiles.order} cycle={orderCycle} />
        </BentoCard>
      </div>
    </div>
  );
}
