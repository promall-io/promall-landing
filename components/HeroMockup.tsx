import type { SVGProps } from 'react';
import { ArrowRightIcon, BoltIcon, MenuIcon, ProMallMark, SearchIcon } from '@/components/icons';

type GlyphProps = SVGProps<SVGSVGElement> & { size?: number };

const glyphBase = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.4,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

function Glyph({ children, size = 20, ...rest }: GlyphProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden {...glyphBase} {...rest}>
      {children}
    </svg>
  );
}

const PaperclipGlyph = (p: GlyphProps) => (
  <Glyph {...p}>
    <path d="M18 11.5 12 17.5a3.5 3.5 0 0 1-5-5l6.5-6.5a2.4 2.4 0 0 1 3.4 3.4L10.4 16" />
  </Glyph>
);

const BarsGlyph = (p: GlyphProps) => (
  <Glyph {...p}>
    <path d="M6 18v-4M12 18V8M18 18v-7" />
  </Glyph>
);

const MicGlyph = (p: GlyphProps) => (
  <Glyph {...p}>
    <rect x="9.5" y="3.5" width="5" height="10" rx="2.5" />
    <path d="M6 11.5a6 6 0 0 0 12 0M12 17.5V21" />
  </Glyph>
);

const ArrowUpGlyph = (p: GlyphProps) => (
  <Glyph {...p}>
    <path d="M12 19V5m0 0-5.5 5.5M12 5l5.5 5.5" />
  </Glyph>
);

export type HeroMockupProps = {
  greeting: string;
  prompt: string;
  placeholder: string;
  tabs: string[];
  suggestions: string[];
  className?: string;
};

export function HeroMockup({
  greeting,
  prompt,
  placeholder,
  tabs,
  suggestions,
  className,
}: HeroMockupProps) {
  return (
    <div
      className={`relative w-full max-w-[960px] overflow-hidden rounded-t-3xl border border-b-0 border-[var(--pw-line)] bg-[rgba(24,35,58,0.66)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_-30px_90px_-40px_rgba(0,0,0,0.8)] backdrop-blur-[28px] sm:p-9 ${className ?? ''}`}
    >
      <div className="flex h-12 items-center justify-between">
        <ProMallMark size={32} className="text-[var(--pw-text-dim)]" />
        <span
          aria-hidden
          className="flex size-9 items-center justify-center rounded-full bg-[rgba(255,255,255,0.05)] text-[var(--pw-text-dim)] ring-1 ring-[var(--pw-line)]"
        >
          <MenuIcon width={20} height={20} />
        </span>
      </div>

      <div className="mt-8 flex justify-center sm:mt-12">
        <div className="flex w-full flex-col items-center gap-9 min-[810px]:max-w-[66%] min-[810px]:gap-16">
          <div className="flex w-full flex-col items-center gap-6 sm:gap-9">
            <div className="flex flex-col items-center gap-2 text-center">
              <p className="pw-h3">{greeting}</p>
              <p className="pw-small">{prompt}</p>
            </div>

            <div className="flex w-full flex-col gap-4 rounded-2xl bg-[rgba(255,255,255,0.05)] p-4 ring-1 ring-[var(--pw-line)] backdrop-blur-sm">
              <p className="min-h-12 text-start text-sm leading-[1.5] text-[var(--pw-text-faint)]">
                {placeholder}
              </p>
              <div className="flex items-center justify-between gap-4">
                <span aria-hidden className="flex items-center gap-3 text-[var(--pw-text-faint)]">
                  <PaperclipGlyph />
                  <BarsGlyph />
                  <BoltIcon width={20} height={20} />
                </span>
                <span aria-hidden className="flex items-center gap-2">
                  <span className="flex size-[30px] items-center justify-center rounded-full bg-[rgba(255,255,255,0.08)] text-[var(--pw-text-dim)] ring-1 ring-[var(--pw-line)]">
                    <MicGlyph size={16} />
                  </span>
                  <span className="flex size-[30px] items-center justify-center rounded-full bg-[var(--pw-cream)] text-[var(--pw-black)]">
                    <ArrowUpGlyph size={16} />
                  </span>
                </span>
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col items-start gap-6">
            <div className="flex w-full items-center gap-4">
              <div className="flex min-w-0 flex-1 items-center gap-1 overflow-hidden [mask-image:linear-gradient(to_right,#000_86%,transparent)] rtl:[mask-image:linear-gradient(to_left,#000_86%,transparent)]">
                {tabs.map((tab, index) => (
                  <span
                    key={tab}
                    className={
                      index === 0
                        ? 'whitespace-nowrap rounded-full bg-[rgba(255,255,255,0.1)] px-3 py-1 text-sm leading-[1.5] text-[var(--pw-cream)]'
                        : 'whitespace-nowrap rounded-full px-3 py-1 text-sm leading-[1.5] text-[var(--pw-text-dim)] ring-1 ring-[var(--pw-line)]'
                    }
                  >
                    {tab}
                  </span>
                ))}
              </div>
              <SearchIcon width={20} height={20} className="shrink-0 text-[var(--pw-text-dim)]" />
            </div>

            <div className="flex w-full flex-col">
              {suggestions.map((suggestion, index) => (
                <div
                  key={suggestion}
                  className={`flex items-center justify-between gap-4 border-t border-[var(--pw-line)] py-4 ${
                    index === 0 ? '' : 'opacity-45 max-[810px]:hidden'
                  }`}
                >
                  <p className="text-start text-sm leading-[1.5] text-[var(--pw-text)]">
                    {suggestion}
                  </p>
                  <span
                    aria-hidden
                    className="flex size-6 shrink-0 items-center justify-center rounded-full text-[var(--pw-text-dim)] ring-1 ring-[var(--pw-line)]"
                  >
                    <ArrowRightIcon width={12} height={12} className="rtl:-scale-x-100" />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
