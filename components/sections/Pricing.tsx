import { getLocale, getTranslations } from 'next-intl/server';
import { ArrowLink, SectionHeading } from '@/components/ui/Primitives';
import { Reveal } from '@/components/Reveal';
import { PricingCards } from '@/components/sections/PricingCards';
import { DEMO_PATH, localeHref } from '@/lib/routes';
import type { PricingPlan } from '@/types/content';

export async function Pricing() {
  const t = await getTranslations('sections.pricing');
  const locale = await getLocale();
  const plans = t.raw('plans') as PricingPlan[];

  return (
    <section id="pricing" className="pw-section">
      <div className="pw-container pw-section-top flex flex-col gap-16">
        <Reveal>
          <div className="flex flex-col gap-8 min-[810px]:flex-row min-[810px]:items-end min-[810px]:justify-between">
            <SectionHeading eyebrow={t('eyebrow')} lead={`${t('titleLead')} ${t('titleTrail')}`} />
            <div className="min-[810px]:pb-1">
              <ArrowLink href="#pricing">{t('linkLabel')}</ArrowLink>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <PricingCards
            plans={plans}
            yearlyLabel={t('yearlyLabel')}
            monthlyLabel={t('monthlyLabel')}
            latinNumerals={locale === 'en'}
            ctaHref={localeHref(locale, DEMO_PATH)}
          />
        </Reveal>
      </div>
    </section>
  );
}
