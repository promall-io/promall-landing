import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { SectionHeading } from '@/components/ui/Primitives';
import { Reveal } from '@/components/Reveal';
import type { AboutCard } from '@/types/content';

const CARD_SOURCE_WIDTH = 1080;
const CARD_SIZES = `(max-width: 810px) 100vw, ${CARD_SOURCE_WIDTH}px`;
const CARD_QUALITY = 88;

function CrosshairGlyph() {
  return (
    <svg
      viewBox="0 0 16 16"
      width={16}
      height={16}
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth={1.1}
      strokeLinecap="round"
      className="shrink-0 text-[var(--pw-text-faint)]"
    >
      <path d="M1 8h4M11 8h4M8 3v10" />
    </svg>
  );
}

function AboutStackCard({ card, index }: { card: AboutCard; index: number }) {
  const isMirrored = index % 2 === 1;
  const textOrder = isMirrored ? 'order-2' : 'order-2 min-[810px]:order-1';
  const imageOrder = isMirrored ? 'order-1' : 'order-1 min-[810px]:order-2';

  return (
    <div className="min-[810px]:sticky min-[810px]:top-[120px]" style={{ zIndex: index + 1 }}>
      <article className="grid h-auto grid-cols-1 overflow-hidden rounded-[24px] bg-[var(--pw-surface-2)] ring-1 ring-[var(--pw-line)] min-[810px]:h-[628px] min-[810px]:grid-cols-2">
        <div className={`${textOrder} flex flex-col p-8 min-[810px]:p-10`}>
          <span className="inline-flex items-center gap-2 text-sm text-[var(--pw-text-dim)]">
            <span aria-hidden className="size-1.5 rounded-full bg-[var(--pw-text-faint)]" />
            {card.eyebrow}
          </span>

          <h3 className="mt-8 max-w-[24ch] text-[1.5rem] font-medium leading-[1.6] text-[var(--pw-cream)] min-[810px]:mt-14">
            {card.title}
          </h3>

          <p className="pw-small mt-4 max-w-[34ch]">{card.description}</p>

          <p className="mt-10 flex items-center gap-3 text-sm text-[var(--pw-text-dim)] min-[810px]:mt-auto">
            <CrosshairGlyph />
            {card.footnote}
          </p>
        </div>

        <div className={`${imageOrder} relative aspect-[16/10] w-full min-[810px]:aspect-auto min-[810px]:h-full`}>
          <Image
            src={card.image}
            alt={card.alt}
            fill
            sizes={CARD_SIZES}
            quality={CARD_QUALITY}
            className="object-cover"
          />
        </div>
      </article>
    </div>
  );
}

export async function About() {
  const t = await getTranslations('sections.about');
  const cards = t.raw('cards') as AboutCard[];

  return (
    <section id="about" className="pw-section">
      <div className="pw-container flex flex-col gap-16 pw-section-top">
        <Reveal>
          <SectionHeading
            eyebrow={t('eyebrow')}
            lead={t('titleLead')}
            trail={t('titleTrail')}
            description={t('description')}
          />
        </Reveal>

        <div className="flex flex-col gap-6 min-[810px]:pb-[120px]">
          {cards.map((card, index) => (
            <AboutStackCard key={card.title} card={card} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
