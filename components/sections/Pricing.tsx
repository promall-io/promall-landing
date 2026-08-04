import { getLocale, getTranslations } from 'next-intl/server';
import { ArrowLink, SectionHeading } from '@/components/ui/Primitives';
import { Reveal } from '@/components/Reveal';
import { PricingCards } from '@/components/sections/PricingCards';
import {
  fetchPlanCatalog,
  formatNumber,
  toPricingPlans,
  type FeatureRowKey,
  type PlanCopy,
} from '@/lib/plans';
import { DEMO_PATH, localeHref } from '@/lib/routes';

const FEATURE_ROW_KEYS: FeatureRowKey[] = [
  'orders',
  'instagramAi',
  'analytics',
  'prioritySupport',
];

export async function Pricing() {
  const t = await getTranslations('sections.pricing');
  const locale = await getLocale();
  const catalog = await fetchPlanCatalog();
  const names = t.raw('names') as Record<string, string | undefined>;
  const descriptions = t.raw('descriptions') as Record<string, string | undefined>;
  const latinNumerals = locale === 'en';

  const copy: PlanCopy = {
    locale,
    period: t('period'),
    priceThousands: (value) => t('priceThousands', { value }),
    customPrice: t('customPrice'),
    cta: t('cta'),
    customCta: t('customCta'),
    includes: t('includes'),
    everythingInPlus: (plan) => t('everythingInPlus', { plan }),
    limit: (key, value) => t(`limits.${key}`, { value }),
    unlimitedLimit: (key) => t(`limits.${key}Unlimited`),
    storageSize: (value, unit) => t(`limits.${unit}`, { value }),
    name: (planId) => names[planId],
    description: (planId) => descriptions[planId],
    featureRows: FEATURE_ROW_KEYS.map((key) => ({ key, label: t(`featureRows.${key}`) })),
  };

  const ctaHref = localeHref(locale, DEMO_PATH);

  return (
    <section id="pricing" className="pw-section">
      <div className="pw-container pw-section-top flex flex-col gap-16">
        <Reveal>
          <div className="flex flex-col gap-8 min-[810px]:flex-row min-[810px]:items-end min-[810px]:justify-between">
            <SectionHeading
              eyebrow={t('eyebrow')}
              lead={`${t('titleLead')} ${t('titleTrail', {
                days: formatNumber(catalog.trialDays, locale),
              })}`}
            />
            <div className="min-[810px]:pb-1">
              <ArrowLink href="#pricing">{t('linkLabel')}</ArrowLink>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <PricingCards
            plans={toPricingPlans(catalog, copy)}
            yearlyLabel={t('yearlyLabel', {
              percent: formatNumber(catalog.yearlyDiscountPercent, locale),
            })}
            monthlyLabel={t('monthlyLabel')}
            latinNumerals={latinNumerals}
            ctaHref={ctaHref}
          />
        </Reveal>
      </div>
    </section>
  );
}
