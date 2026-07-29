import type { ComponentType, SVGProps } from 'react';
import { getTranslations } from 'next-intl/server';
import { EyebrowPill } from '@/components/ui/Primitives';
import { Reveal } from '@/components/Reveal';
import { ScrollHighlight } from '@/components/ScrollHighlight';

type MarkProps = SVGProps<SVGSVGElement>;

function Mark({ children, ...rest }: MarkProps) {
  return (
    <svg
      viewBox="0 0 88 24"
      width={88}
      height={24}
      aria-hidden
      fill="currentColor"
      className="h-6 w-auto shrink-0"
      {...rest}
    >
      {children}
    </svg>
  );
}

const placeholderMarks: { id: string; Glyph: ComponentType<MarkProps> }[] = [
  {
    id: 'slashes',
    Glyph: (p) => (
      <Mark {...p}>
        <path d="M6 20 16 4h6L12 20H6Zm12 0L28 4h6L24 20h-6Zm12 0L40 4h6L36 20h-6Z" />
        <rect x="52" y="9" width="30" height="6" rx="3" />
      </Mark>
    ),
  },
  {
    id: 'quadrant',
    Glyph: (p) => (
      <Mark {...p}>
        <path d="M14 2a10 10 0 1 0 10 10H14V2Z" />
        <circle cx="30" cy="18" r="6" />
        <rect x="42" y="10" width="40" height="4" rx="2" />
      </Mark>
    ),
  },
  {
    id: 'stack',
    Glyph: (p) => (
      <Mark {...p}>
        <path d="M16 2 30 9 16 16 2 9l14-7Zm0 12.5L30 21 16 24 2 21l14-6.5Z" />
        <rect x="40" y="6" width="42" height="4" rx="2" />
        <rect x="40" y="14" width="28" height="4" rx="2" />
      </Mark>
    ),
  },
  {
    id: 'dots',
    Glyph: (p) => (
      <Mark {...p}>
        <rect x="2" y="4" width="8" height="16" rx="2" />
        <circle cx="20" cy="12" r="5" />
        <circle cx="34" cy="12" r="5" />
        <rect x="46" y="9" width="36" height="6" rx="3" />
      </Mark>
    ),
  },
  {
    id: 'ring',
    Glyph: (p) => (
      <Mark {...p}>
        <path d="M14 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20Zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z" />
        <path d="M32 4h6l8 16h-6L32 4Zm14 0h6l-8 16h-6l8-16Z" />
        <rect x="58" y="9" width="24" height="6" rx="3" />
      </Mark>
    ),
  },
  {
    id: 'hexagon',
    Glyph: (p) => (
      <Mark {...p}>
        <path d="M12 2 22 8v8l-10 6-10-6V8l10-6Zm0 5.5L7 10.5v3l5 3 5-3v-3l-5-3Z" />
        <rect x="30" y="4" width="6" height="16" rx="3" />
        <rect x="40" y="4" width="6" height="16" rx="3" />
        <rect x="50" y="9" width="32" height="6" rx="3" />
      </Mark>
    ),
  },
];

export async function Intro() {
  const t = await getTranslations('sections.intro');
  const paragraphs = t.raw('paragraphs') as string[];

  return (
    <section id="intro" className="pw-section">
      <div className="pw-container pw-section-top">
        <div className="flex w-full flex-col items-start gap-7 min-[810px]:max-w-[46%]">
          <Reveal spring>
            <EyebrowPill label={t('eyebrow')} />
          </Reveal>

          <Reveal delay={0.08} className="w-full">
            <ScrollHighlight
              className="flex flex-col gap-7"
              itemClassName="max-w-[34ch]"
              items={[t('lead'), ...paragraphs].map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-[1.375rem] leading-[1.6] text-[var(--pw-cream)]"
                >
                  {paragraph}
                </p>
              ))}
            />
          </Reveal>
        </div>

        <Reveal delay={0.08} className="mt-[120px]">
          <h2 className="sr-only">{t('logosLabel')}</h2>
          <ul className="flex flex-wrap items-center justify-between gap-x-12 gap-y-10 text-[var(--pw-cream)] opacity-[0.35] [filter:grayscale(1)]">
            {placeholderMarks.map(({ id, Glyph }) => (
              <li key={id} className="flex items-center">
                <Glyph />
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
