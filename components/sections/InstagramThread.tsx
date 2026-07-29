'use client';

import { useEffect, useRef, useState, type SVGProps } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { REVEAL_EASE } from '@/components/Reveal';
import { localizeDigits } from '@/lib/demo-form';
import type { DmMessage, DmStep, DmThreadChrome } from '@/types/content';

const DEVICE_BUTTONS = [
  {
    key: 'silent',
    className: '-left-[2px] rounded-l-full',
    top: 114,
    height: 20,
  },
  {
    key: 'volume-up',
    className: '-left-[2px] rounded-l-full',
    top: 150,
    height: 40,
  },
  {
    key: 'volume-down',
    className: '-left-[2px] rounded-l-full',
    top: 202,
    height: 40,
  },
  {
    key: 'power',
    className: '-right-[2px] rounded-r-full',
    top: 165,
    height: 66,
  },
];

const CUSTOMER_DELAY = 1400;
const TYPING_LEAD = 550;
const TYPING_DURATION = 1250;
const CARD_DELAY = 850;
const LOOP_PAUSE = 4600;

const glyphBase = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

type GlyphProps = SVGProps<SVGSVGElement> & { size?: number };

function Glyph({ children, size = 22, ...rest }: GlyphProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden {...glyphBase} {...rest}>
      {children}
    </svg>
  );
}

const BackGlyph = (p: GlyphProps) => (
  <Glyph {...p}>
    <path d="M15 4.5 7.5 12l7.5 7.5" />
  </Glyph>
);

const CallGlyph = (p: GlyphProps) => (
  <Glyph {...p}>
    <path d="M7.2 3.8 9 8l-2 1.7a12 12 0 0 0 5.3 5.3L14 13l4.2 1.8v3.4c0 1-.8 1.9-1.9 1.8C9 19.6 4.4 15 3.8 7.7c-.1-1 .8-1.9 1.8-1.9h1.6Z" />
  </Glyph>
);

const VideoGlyph = (p: GlyphProps) => (
  <Glyph {...p}>
    <rect x="2.5" y="6.5" width="12.5" height="11" rx="3" />
    <path d="M15 11.2 21.5 8v8L15 12.8z" />
  </Glyph>
);

const CameraGlyph = (p: GlyphProps) => (
  <Glyph {...p} strokeWidth={1.5}>
    <path d="M3.5 8.5h3l1.4-2h7.2l1.4 2h3a1.5 1.5 0 0 1 1.5 1.5v7a1.5 1.5 0 0 1-1.5 1.5h-16A1.5 1.5 0 0 1 2 17v-7a1.5 1.5 0 0 1 1.5-1.5Z" />
    <circle cx="12" cy="13.2" r="3.2" />
  </Glyph>
);

const MicGlyph = (p: GlyphProps) => (
  <Glyph {...p}>
    <rect x="9" y="3" width="6" height="11" rx="3" />
    <path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3" />
  </Glyph>
);

const ImageGlyph = (p: GlyphProps) => (
  <Glyph {...p}>
    <rect x="3" y="4.5" width="18" height="15" rx="3" />
    <circle cx="8.5" cy="10" r="1.6" />
    <path d="m4 17 4.8-4.6 3.4 3 3-2.6L20 17" />
  </Glyph>
);

const StickerGlyph = (p: GlyphProps) => (
  <Glyph {...p}>
    <path d="M12 3a9 9 0 1 1-9 9c0-.4 0-.7.1-1.1 4.9.5 9.5-3.4 9.9-8.4L12 3Z" />
    <path d="M8.7 10.5h.01M14.5 9.6h.01M9.5 15c1.6 1.2 3.6 1 5-.4" />
  </Glyph>
);

const BoltGlyph = (p: GlyphProps) => (
  <Glyph {...p} strokeWidth={1.5}>
    <path d="M13 3 5 14h6l-1 7 8-11h-6l1-7Z" />
  </Glyph>
);

function StatusBar({ clock }: { clock: string }) {
  return (
    <div className="relative z-20 flex h-[34px] shrink-0 items-center justify-between px-6 text-[11px] font-semibold text-[var(--ig-text)]">
      <span dir="ltr" className="pw-num">
        {clock}
      </span>
      <span aria-hidden className="flex items-center gap-[3px]">
        {[4, 6, 8, 10].map((height) => (
          <span
            key={height}
            style={{ height }}
            className="w-[3px] rounded-[1px] bg-[var(--ig-text)]"
          />
        ))}
        <span className="ms-1.5 h-[9px] w-[17px] rounded-[3px] border border-[var(--ig-text)]/60 p-[1.5px]">
          <span className="block h-full w-3/4 rounded-[1px] bg-[var(--ig-text)]" />
        </span>
      </span>
    </div>
  );
}

function ThreadHeader({ chrome }: { chrome: DmThreadChrome }) {
  return (
    <div className="flex shrink-0 items-center gap-3 border-b border-[var(--ig-separator)] px-3 pb-2.5">
      <BackGlyph className="shrink-0 text-[var(--ig-text)] rtl:-scale-x-100" />

      <span className="shrink-0 rounded-full p-[2px]" style={{ backgroundImage: 'var(--ig-ring)' }}>
        <span className="flex size-[34px] items-center justify-center rounded-full border-2 border-[var(--ig-canvas)] bg-[var(--ig-separator)] text-[13px] font-semibold text-[var(--ig-text)]">
          {chrome.avatarInitial}
        </span>
      </span>

      <span className="min-w-0 flex-1">
        <span className="block truncate text-[15px] font-semibold text-[var(--ig-text)]">
          {chrome.contact}
        </span>
        <span className="block truncate text-[11px] text-[var(--ig-text-secondary)]">
          {chrome.presence}
        </span>
      </span>

      <CallGlyph className="shrink-0 text-[var(--ig-text)]" />
      <VideoGlyph className="shrink-0 text-[var(--ig-text)]" />
    </div>
  );
}

function AutoReplyStrip({ label }: { label: string }) {
  return (
    <div className="flex shrink-0 items-center gap-2 border-b border-[var(--ig-separator)] bg-[var(--ig-surface)] px-3.5 py-1.5">
      <BoltGlyph size={13} className="shrink-0 text-[var(--pw-gold)]" />
      <span className="truncate text-[10.5px] text-[var(--ig-text-secondary)]">{label}</span>
      <span className="ms-auto size-1.5 shrink-0 rounded-full bg-[#4ade80]" />
    </div>
  );
}

function Composer({ placeholder }: { placeholder: string }) {
  return (
    <div className="shrink-0 px-3 pb-2 pt-2.5">
      <div className="flex items-center gap-2.5 rounded-full border border-[var(--ig-separator)] py-1.5 pe-3.5 ps-1.5">
        <span className="flex size-[26px] shrink-0 items-center justify-center rounded-full bg-[var(--ig-blue)]">
          <CameraGlyph size={15} className="text-white" />
        </span>
        <span className="flex-1 truncate text-[12.5px] text-[var(--ig-text-secondary)]">
          {placeholder}
        </span>
        <MicGlyph size={17} className="shrink-0 text-[var(--ig-text)]" />
        <ImageGlyph size={17} className="shrink-0 text-[var(--ig-text)]" />
        <StickerGlyph size={17} className="shrink-0 text-[var(--ig-text)]" />
      </div>
      <span className="mx-auto mt-2 block h-[3px] w-[110px] rounded-full bg-white/25" />
    </div>
  );
}

function TypingBubble() {
  return (
    <motion.span
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.25, ease: REVEAL_EASE }}
      className="ms-auto flex w-fit shrink-0 items-center gap-1 rounded-[18px] rounded-ee-[5px] px-3.5 py-3"
      style={{ backgroundImage: 'var(--ig-bubble-out)' }}
    >
      {[0, 1, 2].map((dot) => (
        <span key={dot} className="pw-ig-dot" style={{ animationDelay: `${dot * 0.18}s` }} />
      ))}
    </motion.span>
  );
}

function OrderCard({ card }: { card: NonNullable<DmMessage['card']> }) {
  return (
    <motion.span
      layout
      initial={{ opacity: 0, y: 14, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.45, ease: REVEAL_EASE }}
      className="ms-auto block w-[78%] shrink-0 overflow-hidden rounded-[18px] rounded-ee-[5px] bg-[var(--ig-separator)]"
    >
      <span className="block border-b border-white/10 px-3.5 py-2.5">
        <span className="block text-[11.5px] font-semibold text-[var(--ig-text)]">
          {card.title}
        </span>
        <span className="mt-0.5 block text-[10.5px] text-[var(--ig-text-secondary)]">
          {card.meta}
        </span>
      </span>
      <span className="flex items-center justify-between gap-2 px-3.5 py-2.5">
        <span className="text-[11.5px] font-semibold text-[var(--ig-text)]">{card.price}</span>
        <span className="rounded-full bg-[var(--ig-blue)] px-3 py-1 text-[10.5px] font-semibold text-white">
          {card.action}
        </span>
      </span>
    </motion.span>
  );
}

function Bubble({ message }: { message: DmMessage }) {
  if (message.card) {
    return <OrderCard card={message.card} />;
  }

  const outgoing = message.from === 'assistant';

  return (
    <motion.span
      layout
      initial={{ opacity: 0, y: 14, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.4, ease: REVEAL_EASE }}
      className={`block w-fit max-w-[78%] shrink-0 px-3.5 py-2 text-[12.5px] leading-[1.7] text-white ${
        outgoing
          ? 'ms-auto rounded-[18px] rounded-ee-[5px]'
          : 'me-auto rounded-[18px] rounded-es-[5px] bg-[var(--ig-bubble-in)]'
      }`}
      style={outgoing ? { backgroundImage: 'var(--ig-bubble-out)' } : undefined}
    >
      {message.text}
    </motion.span>
  );
}

function useScriptPlayer(script: DmMessage[], enabled: boolean) {
  const [visible, setVisible] = useState(0);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    if (visible >= script.length) {
      const reset = setTimeout(() => setVisible(0), LOOP_PAUSE);
      return () => clearTimeout(reset);
    }

    const next = script[visible];
    const advance = () => {
      setTyping(false);
      setVisible((current) => current + 1);
    };

    if (next.from !== 'assistant') {
      const timer = setTimeout(advance, visible === 0 ? 700 : CUSTOMER_DELAY);
      return () => clearTimeout(timer);
    }

    if (next.card) {
      const timer = setTimeout(advance, CARD_DELAY);
      return () => clearTimeout(timer);
    }

    const lead = setTimeout(() => setTyping(true), TYPING_LEAD);
    const timer = setTimeout(advance, TYPING_LEAD + TYPING_DURATION);
    return () => {
      clearTimeout(lead);
      clearTimeout(timer);
    };
  }, [enabled, script, visible]);

  useEffect(() => {
    if (!enabled) {
      setTyping(false);
    }
  }, [enabled]);

  return { visible, typing };
}

type InstagramThreadProps = {
  script: DmMessage[];
  steps: DmStep[];
  chrome: DmThreadChrome;
  locale: string;
};

export function InstagramThread({ script, steps, chrome, locale }: InstagramThreadProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inView = useInView(stageRef, { margin: '-120px 0px' });
  const reduceMotion = useReducedMotion();
  const playing = inView && !reduceMotion;

  const { visible, typing } = useScriptPlayer(script, playing);
  const shown = reduceMotion ? script.length : visible;
  const activeStep = shown === 0 ? 0 : (script[Math.min(shown, script.length) - 1]?.step ?? 0);
  const progress = ((activeStep + 1) / steps.length) * 100;

  useEffect(() => {
    const node = scrollRef.current;
    if (!node) {
      return;
    }
    node.scrollTo({
      top: node.scrollHeight,
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
  }, [shown, typing, reduceMotion]);

  return (
    <div
      ref={stageRef}
      className="grid grid-cols-1 items-center gap-14 min-[811px]:grid-cols-[minmax(0,306px)_minmax(0,440px)] min-[811px]:justify-between min-[811px]:gap-10"
    >
      <div className="mx-auto w-full max-w-[300px]">
        <div className="relative">
          {DEVICE_BUTTONS.map((button) => (
            <span
              key={button.key}
              aria-hidden
              className={`absolute w-[3px] bg-[var(--pw-surface-3)] ${button.className}`}
              style={{ top: button.top, height: button.height }}
            />
          ))}

          <div className="relative rounded-[42px] bg-[var(--pw-surface-2)] p-[6px] ring-1 ring-[var(--pw-line-strong)] shadow-[0_30px_70px_-30px_rgba(0,0,0,0.75)]">
            <div
              dir={locale === 'fa' ? 'rtl' : 'ltr'}
              className="relative flex aspect-[393/852] w-full flex-col overflow-hidden rounded-[36px] bg-[var(--ig-canvas)] ring-1 ring-inset ring-white/[0.06]"
            >
              <span
                aria-hidden
                className="absolute left-1/2 top-[8px] z-20 h-[26px] w-[92px] -translate-x-1/2 rounded-full bg-black"
              />
              <StatusBar clock={chrome.dayStamp} />
              <ThreadHeader chrome={chrome} />
              <AutoReplyStrip label={chrome.autoReply} />

              <div
                ref={scrollRef}
                className="pw-ig-scroll flex flex-1 flex-col gap-1.5 overflow-y-auto px-3 py-3"
              >
                <span className="mt-auto" aria-hidden />
                <AnimatePresence initial={false}>
                  {script.slice(0, shown).map((message, index) => (
                    <Bubble key={`${message.step}-${index}`} message={message} />
                  ))}
                  {typing ? <TypingBubble key="typing" /> : null}
                </AnimatePresence>
                {shown >= script.length ? (
                  <span className="ms-auto shrink-0 pt-0.5 text-[10px] text-[var(--ig-text-secondary)]">
                    {chrome.seen}
                  </span>
                ) : null}
              </div>

              <Composer placeholder={chrome.composer} />
            </div>
          </div>
        </div>

        <p className="mt-5 flex items-center justify-center gap-2 text-[13px] text-[var(--pw-text-faint)]">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full rounded-full bg-[#4ade80] opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-[#4ade80]" />
          </span>
          {chrome.liveLabel}
        </p>
      </div>

      <ol className="relative flex flex-col gap-9 ps-8">
        <span aria-hidden className="absolute inset-y-1 start-[3px] w-px bg-[var(--pw-line)]">
          <motion.span
            className="block w-px bg-[var(--pw-gold)]"
            animate={{ height: `${progress}%` }}
            transition={{ duration: reduceMotion ? 0 : 0.6, ease: REVEAL_EASE }}
          />
        </span>

        {steps.map((step, index) => {
          const active = index === activeStep;

          return (
            <motion.li
              key={step.title}
              className="relative"
              animate={{ opacity: active ? 1 : 0.32 }}
              transition={{
                duration: reduceMotion ? 0 : 0.5,
                ease: REVEAL_EASE,
              }}
            >
              <span
                aria-hidden
                className={`absolute -start-8 top-[9px] size-[7px] rounded-full ring-4 ring-[var(--pw-black)] ${
                  active ? 'bg-[var(--pw-gold)]' : 'bg-[var(--pw-text-faint)]'
                }`}
              />
              <span className="pw-num block text-[11px] text-[var(--pw-text-faint)]">
                {localizeDigits(String(index + 1).padStart(2, '0'), locale)}
              </span>
              <h3 className="mt-1.5 text-[19px] leading-[1.4] text-[var(--pw-cream)]">
                {step.title}
              </h3>
              <p className="mt-1.5 text-sm leading-[1.75] text-[var(--pw-text-dim)]">
                {step.description}
              </p>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}
