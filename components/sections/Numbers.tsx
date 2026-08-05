import { getLocale, getTranslations } from 'next-intl/server';
import { EyebrowPill } from '@/components/ui/Primitives';
import { Carousel } from '@/components/ui/Carousel';
import { ThemedImage } from '@/components/ThemedImage';
import { Reveal } from '@/components/Reveal';
import { NumbersParallax } from '@/components/sections/NumbersParallax';
import { CheckCircleIcon, ClockIcon, GaugeIcon, SparkIcon } from '@/components/icons';
import type { MiniStat, StatCard } from '@/types/content';

const MINI_STAT_ICONS = {
  gauge: GaugeIcon,
  checkCircle: CheckCircleIcon,
  spark: SparkIcon,
  clock: ClockIcon,
};

const CARD_SCRIM =
  'linear-gradient(180deg, rgb(var(--pw-canvas-rgb) / 55%) 0%, transparent 45%)';

const CARD_SKY =
  'radial-gradient(160% 70% at 50% 0, var(--pw-canvas-2) 0%, var(--pw-scene-mid) 40%, var(--pw-scene-dusk) 100%)';

function StatTag({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-3 rounded-full bg-[rgb(var(--pw-veil-rgb)/10%)] px-4 py-[7px] text-sm leading-[1.5] text-[var(--pw-text)] backdrop-blur-[6px]">
      <span aria-hidden className="size-[7px] shrink-0 rounded-full bg-[var(--pw-cream)]" />
      {label}
    </span>
  );
}

function StatCardTile({
  card,
  numeralClassName,
  valueSizeClassName,
  offset,
}: {
  card: StatCard;
  numeralClassName: string;
  valueSizeClassName: string;
  offset: boolean;
}) {
  return (
    <article
      className={`relative aspect-[522/738] w-full overflow-hidden rounded-[24px] ring-1 ring-[var(--pw-line)] ${
        offset ? 'min-[810px]:mt-14' : ''
      }`}
      style={{ backgroundImage: CARD_SKY }}
    >
      <ThemedImage
        src={card.image}
        alt=""
        fill
        sizes="(max-width: 810px) 100vw, 522px"
        className="scale-[1.6] object-cover object-bottom"
        style={{
          maskImage: 'linear-gradient(to bottom, transparent 0%, rgb(var(--shade-rgb)) 22%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgb(var(--shade-rgb)) 22%)',
        }}
      />
      <span aria-hidden className="absolute inset-0" style={{ background: CARD_SCRIM }} />

      <div className="relative flex size-full flex-col p-8 min-[810px]:p-12">
        <p
          className={`${numeralClassName} ${valueSizeClassName} font-light leading-[1.5] text-[var(--pw-cream)]`}
        >
          {card.value}{' '}
          <span className="text-[var(--pw-text-dim)]">{card.unit}</span>
        </p>
        <p className="mt-3 max-w-[28ch] text-base leading-[1.5] text-[var(--pw-text-dim)]">
          {card.description}
        </p>

        <div className="mt-auto">
          <StatTag label={card.tag} />
        </div>
      </div>
    </article>
  );
}

function MiniStatCell({ stat, numeralClassName }: { stat: MiniStat; numeralClassName: string }) {
  const Icon = MINI_STAT_ICONS[stat.icon];

  return (
    <li className="flex flex-col">
      <span className="text-[var(--pw-text-faint)]">
        <Icon width={20} height={20} />
      </span>
      <p className={`${numeralClassName} mt-5 text-[2rem] leading-[1.5] text-[var(--pw-cream)]`}>
        {stat.value}
      </p>
      <p className="mt-2 max-w-[22ch] text-sm leading-[1.5] text-[var(--pw-text-dim)]">
        {stat.description}
      </p>
    </li>
  );
}

export async function Numbers() {
  const t = await getTranslations('sections.numbers');
  const locale = await getLocale();
  const cards = t.raw('cards') as StatCard[];
  const stats = t.raw('stats') as MiniStat[];
  const usesLatinNumerals = locale === 'en';
  const numeralClassName = usesLatinNumerals ? 'pw-num' : '';
  const valueSizeClassName = usesLatinNumerals
    ? 'text-[3.5rem] min-[810px]:text-[4.5rem] min-[1128px]:text-[6rem]'
    : 'text-[2.75rem] min-[810px]:text-[3rem] min-[1128px]:text-[5rem]';

  return (
    /* The drifting cloud plates in NumbersParallax are hung past the container
       on purpose ([inset-inline-start:-14%]) and nothing between them and the
       viewport clipped, so they were adding up to 50px of phantom document
       width. Clipping at the section keeps the bleed past the gutter — which
       is the effect — and stops it reaching the page. */
    <section id="numbers" className="pw-section overflow-hidden">
      <div className="pw-container pw-section-top">
        <Reveal>
          <div className="flex flex-col items-start gap-6">
            <EyebrowPill label={t('eyebrow')} />
            <h2 className="pw-h2 max-w-[810px] text-balance">
              <span className="pw-h2-dim">{t('titleLead')}</span> {t('titleTrail')}
            </h2>
          </div>
        </Reveal>

        <Reveal className="relative mt-16" delay={0.08}>
          <Carousel
            label={t('railLabel')}
            railClassName="items-start min-[810px]:mx-0 min-[810px]:grid min-[810px]:grid-cols-2 min-[810px]:gap-9 min-[810px]:overflow-visible min-[810px]:px-0 min-[810px]:snap-none"
            slideClassName="w-[78vw] max-w-[420px] min-[810px]:w-auto min-[810px]:max-w-none"
            dotsClassName="min-[810px]:hidden"
          >
            {cards.map((card, index) => (
              <StatCardTile
                key={card.tag}
                card={card}
                numeralClassName={numeralClassName}
                valueSizeClassName={valueSizeClassName}
                offset={index === 1}
              />
            ))}
          </Carousel>
          <NumbersParallax />
        </Reveal>

        <Reveal className="mt-20" delay={0.12}>
          <ul className="grid grid-cols-2 gap-x-9 gap-y-12 min-[810px]:grid-cols-4">
            {stats.map((stat) => (
              <MiniStatCell key={stat.description} stat={stat} numeralClassName={numeralClassName} />
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
