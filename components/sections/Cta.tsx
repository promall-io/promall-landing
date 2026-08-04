import { Fragment, type SVGProps } from 'react';
import Link from 'next/link';
import { getLocale, getTranslations } from 'next-intl/server';
import { DEMO_PATH, localeHref } from '@/lib/routes';
import { Reveal } from '@/components/Reveal';
import { HeroMockup } from '@/components/HeroMockup';
import { ThemedImage } from '@/components/ThemedImage';

const CTA_GRADIENT =
  'linear-gradient(180deg, var(--pw-canvas) 0%, var(--pw-canvas-2) 42%, var(--pw-scene-mid) 74%, var(--pw-scene-dusk) 100%)';

type BadgeGlyphProps = SVGProps<SVGSVGElement>;

const badgeGlyphBase = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.3,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

function BadgeGlyph({ children, ...rest }: BadgeGlyphProps) {
  return (
    <svg viewBox="0 0 24 24" width={22} height={22} aria-hidden {...badgeGlyphBase} {...rest}>
      {children}
    </svg>
  );
}

const LockGlyph = (p: BadgeGlyphProps) => (
  <BadgeGlyph {...p}>
    <rect x="5" y="10.5" width="14" height="9.5" rx="2.5" />
    <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5M12 14v2.5" />
  </BadgeGlyph>
);

const ServerGlyph = (p: BadgeGlyphProps) => (
  <BadgeGlyph {...p}>
    <rect x="4" y="4.5" width="16" height="6" rx="2" />
    <rect x="4" y="13.5" width="16" height="6" rx="2" />
    <path d="M7.5 7.5h.01M7.5 16.5h.01" />
  </BadgeGlyph>
);

const BADGE_GLYPHS = [LockGlyph, ServerGlyph];

export async function Cta() {
  const t = await getTranslations('sections.cta');
  const tMockup = await getTranslations('sections.hero.mockup');
  const locale = await getLocale();
  const badges = t.raw('badges') as string[];
  const tabs = tMockup.raw('tabs') as string[];
  const suggestions = tMockup.raw('suggestions') as string[];

  return (
    <section
      id="cta"
      className="pw-section relative isolate overflow-hidden"
      style={{ backgroundImage: CTA_GRADIENT }}
    >
      <div className="pw-container relative z-0 grid grid-cols-1 gap-10 pt-[110px] min-[811px]:h-[910px] min-[811px]:grid-cols-[minmax(0,420px)_1fr] min-[811px]:gap-[60px] min-[811px]:pt-[180px]">
        <div className="flex flex-col">
          <Reveal>
            <h2 className="pw-h2 max-w-[16ch] text-balance">{t('title')}</h2>
            <p className="mt-5 max-w-[32ch] text-base leading-[1.6] text-[var(--pw-text)]">
              {t('description')}
            </p>
            <Link href={localeHref(locale, DEMO_PATH)} className="pw-button pw-button-primary mt-8">
              {t('primaryCta')}
            </Link>
          </Reveal>

          <Reveal
            delay={0.12}
            className="mt-14 flex flex-wrap items-center gap-x-9 gap-y-6 min-[811px]:mt-[140px]"
          >
            {badges.map((badge, index) => {
              const Glyph = BADGE_GLYPHS[index % BADGE_GLYPHS.length] ?? LockGlyph;

              return (
                <Fragment key={badge}>
                  {index > 0 ? (
                    <span aria-hidden className="h-14 w-px bg-[var(--pw-line)]" />
                  ) : null}
                  <span className="flex items-center gap-2.5">
                    <span
                      aria-hidden
                      className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[rgb(var(--pw-veil-rgb)/6%)] text-[var(--pw-cream)] ring-1 ring-[var(--pw-line)]"
                    >
                      <Glyph />
                    </span>
                    <span className="text-base text-[var(--pw-cream)]">{badge}</span>
                  </span>
                </Fragment>
              );
            })}
          </Reveal>
        </div>

        <div className="relative min-w-0 max-[810px]:pb-[104px]">
          <div className="min-[811px]:absolute min-[811px]:-top-8 min-[811px]:start-0 min-[811px]:w-[960px] min-[811px]:max-w-none">
            <HeroMockup
              greeting={tMockup('greeting')}
              prompt={tMockup('prompt')}
              placeholder={tMockup('placeholder')}
              tabs={tabs}
              suggestions={suggestions}
              className="max-[810px]:[mask-image:linear-gradient(to_bottom,rgb(var(--shade-rgb))_82%,transparent_100%)]"
            />
          </div>
        </div>
      </div>

      <ThemedImage
        src="/landscape/dunes.png"
        alt=""
        aria-hidden
        width={1600}
        height={349}
        sizes="100vw"
        quality={85}
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-auto w-full object-cover"
      />
    </section>
  );
}
