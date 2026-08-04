import { getLocale, getTranslations } from 'next-intl/server';
import { ArrowLink, SectionHeading } from '@/components/ui/Primitives';
import { Reveal } from '@/components/Reveal';
import { FaqPanel } from '@/components/sections/FaqPanel';
import {
  entryPlanWithInstagramAi,
  fetchPlanCatalog,
  formatNumber,
  monthlyTomanRange,
  planName,
} from '@/lib/plans';
import type { FaqCategory } from '@/types/content';

const MONTHLY_FROM_TOKEN = '__MONTHLY_FROM__';
const YEARLY_DISCOUNT_TOKEN = '__YEARLY_DISCOUNT__';
const AI_ENTRY_PLAN_TOKEN = '__AI_ENTRY_PLAN__';
const FA_LOCALE = 'fa';
const TOMAN_THOUSANDS_UNIT = 1000;

function formatMonthlyFromToken(monthlyLow: number, locale: string): string {
  return locale === FA_LOCALE
    ? formatNumber(Math.round(monthlyLow / TOMAN_THOUSANDS_UNIT), locale)
    : formatNumber(monthlyLow, locale);
}

function substituteFaqTokens(
  categories: FaqCategory[],
  replacements: Record<string, string>,
): FaqCategory[] {
  const applyTokens = (text: string): string =>
    Object.entries(replacements).reduce(
      (result, [token, value]) => result.split(token).join(value),
      text,
    );

  return categories.map((category) => ({
    ...category,
    items: category.items.map((item) => ({
      question: applyTokens(item.question),
      answer: applyTokens(item.answer),
    })),
  }));
}

function FaqContactCard({
  title,
  description,
  cta,
}: {
  title: string;
  description: string;
  cta: string;
}) {
  return (
    <div className="pw-card p-7">
      <p className="pw-h3">{title}</p>
      <p className="mt-3 max-w-[30ch] text-sm leading-[1.85] text-[var(--pw-text-dim)]">
        {description}
      </p>
      <div className="mt-7">
        <ArrowLink href="#cta">{cta}</ArrowLink>
      </div>
    </div>
  );
}

export async function Faq() {
  const t = await getTranslations('sections.faq');
  const locale = await getLocale();
  const catalog = await fetchPlanCatalog();
  const monthlyRange = monthlyTomanRange(catalog);
  const aiEntryPlan = entryPlanWithInstagramAi(catalog);
  const rawCategories = t.raw('categories') as FaqCategory[];
  const categories = substituteFaqTokens(rawCategories, {
    [MONTHLY_FROM_TOKEN]: monthlyRange
      ? formatMonthlyFromToken(monthlyRange.low, locale)
      : '',
    [YEARLY_DISCOUNT_TOKEN]: formatNumber(catalog.yearlyDiscountPercent, locale),
    [AI_ENTRY_PLAN_TOKEN]: aiEntryPlan ? planName(aiEntryPlan, locale) : '',
  });

  return (
    <section id="faq" className="pw-section">
      <div className="pw-container pw-section-top flex flex-col gap-16">
        <Reveal>
          <SectionHeading
            eyebrow={t('eyebrow')}
            lead={`${t('titleLead')} ${t('titleTrail')}`}
            description={t('description')}
          />
        </Reveal>

        <Reveal delay={0.08}>
          <FaqPanel
            categories={categories}
            contact={
              <FaqContactCard
                title={t('contact.title')}
                description={t('contact.description')}
                cta={t('contact.cta')}
              />
            }
          />
        </Reveal>
      </div>
    </section>
  );
}
