import { getLocale, getTranslations } from 'next-intl/server';
import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/ui/Primitives';
import { WhyCarousel } from '@/components/sections/WhyCarousel';
import { localeDirection, type Locale } from '@/i18n/config';
import type { WhyCard } from '@/types/content';

export async function Why() {
  const t = await getTranslations('sections.why');
  const locale = await getLocale();
  const cards = t.raw('cards') as WhyCard[];

  return (
    <section id="why" className="pw-section pw-section-top">
      <div className="pw-container flex flex-col gap-16">
        <Reveal>
          <SectionHeading
            eyebrow={t('eyebrow')}
            lead={t('titleLead')}
            trail={t('titleTrail')}
            description={t('description')}
          />
        </Reveal>
        <Reveal delay={0.12}>
          <WhyCarousel
            cards={cards}
            prevLabel={t('prevLabel')}
            nextLabel={t('nextLabel')}
            isRtl={localeDirection[locale as Locale] === 'rtl'}
          />
        </Reveal>
      </div>
    </section>
  );
}
