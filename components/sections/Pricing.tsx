import { getLocale, getTranslations } from 'next-intl/server';
import { ArrowLink, SectionHeading } from '@/components/ui/Primitives';
import { Reveal } from '@/components/Reveal';
import { EnterprisePlan } from '@/components/sections/EnterprisePlan';
import { PricingCards } from '@/components/sections/PricingCards';
import {
  fetchPlanCatalog,
  formatNumber,
  planDescription,
  planName,
  planSlaPercent,
  splitPlans,
  toPricingPlan,
  type FeatureRowKey,
  type PlanCopy,
} from '@/lib/plans';
import { DEMO_PATH, localeHref } from '@/lib/routes';

const FEATURE_ROW_KEYS: FeatureRowKey[] = [
  'orders',
  'instagramAi',
  'domainApi',
  'realtimeSupport',
];

export async function Pricing() {
  const t = await getTranslations('sections.pricing');
  const locale = await getLocale();
  const catalog = await fetchPlanCatalog();
  const { fixed, custom } = splitPlans(catalog);
  const descriptions = t.raw('descriptions') as Record<string, string | undefined>;
  const latinNumerals = locale === 'en';

  const copy: PlanCopy = {
    locale,
    period: t('period'),
    priceThousands: (value) => t('priceThousands', { value }),
    customPrice: t('customPrice'),
    cta: t('cta'),
    unlimited: t('unlimited'),
    meta: {
      products: (value) => t('metaProducts', { value }),
      orders: (value) => t('metaOrders', { value }),
      users: (value) => t('metaUsers', { value }),
    },
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
          <div className="flex flex-col gap-10">
            <PricingCards
              plans={fixed.map((plan) => toPricingPlan(plan, copy))}
              yearlyLabel={t('yearlyLabel', {
                percent: formatNumber(catalog.yearlyDiscountPercent, locale),
              })}
              monthlyLabel={t('monthlyLabel')}
              latinNumerals={latinNumerals}
              ctaHref={ctaHref}
            />

            {custom.map((plan) => {
              const sla = planSlaPercent(plan, locale);

              return (
                <EnterprisePlan
                  key={plan.id}
                  name={planName(plan, locale)}
                  description={planDescription(plan, copy)}
                  priceLabel={t('customPrice')}
                  unlimitedLabel={t('enterprise.unlimitedLabel')}
                  slaLabel={sla ? t('enterprise.slaLabel', { value: sla }) : null}
                  cta={t('enterprise.cta')}
                  ctaHref={ctaHref}
                  latinNumerals={latinNumerals}
                />
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
