import {
  entryPlanWithInstagramAi,
  formatNumber,
  monthlyTomanRange,
  planName,
  type PlanCatalog,
} from '@/lib/plans';

/* Structural, not the canonical FaqCategory: the JSON-LD builder carries its own
   narrower shape and only the items are rewritten, so each caller keeps its type. */
type FaqItem = { question: string; answer: string };
type FaqCategoryLike = { items: FaqItem[] };

/* The pricing cards render `sections.pricing.names` over the catalog's own name, so
   a plan named in an FAQ answer has to read the same override or the two surfaces
   disagree until the catalog itself is renamed. */
type PlanNameOverrides = Record<string, string | undefined>;

/* The FAQ answers carry price claims, so they are authored with tokens and
   resolved from the live catalog at render time — a repricing must never leave
   a stale number in copy. Both surfaces that render these answers resolve them
   here: the visible accordion and the FAQPage JSON-LD, which would otherwise
   hand Google the raw token. */
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

export function buildFaqTokenReplacements(
  catalog: PlanCatalog,
  locale: string,
  planNames: PlanNameOverrides = {},
): Record<string, string> {
  const monthlyRange = monthlyTomanRange(catalog);
  const aiEntryPlan = entryPlanWithInstagramAi(catalog);

  return {
    [MONTHLY_FROM_TOKEN]: monthlyRange
      ? formatMonthlyFromToken(monthlyRange.low, locale)
      : '',
    [YEARLY_DISCOUNT_TOKEN]: formatNumber(catalog.yearlyDiscountPercent, locale),
    [AI_ENTRY_PLAN_TOKEN]: aiEntryPlan
      ? planNames[aiEntryPlan.id] ?? planName(aiEntryPlan, locale)
      : '',
  };
}

export function resolveFaqCategories<TCategory extends FaqCategoryLike>(
  categories: TCategory[],
  catalog: PlanCatalog,
  locale: string,
  planNames: PlanNameOverrides = {},
): TCategory[] {
  const replacements = buildFaqTokenReplacements(catalog, locale, planNames);
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
