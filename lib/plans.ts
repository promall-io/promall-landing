import { API_BASE_URL } from '@/lib/api-config';
import type { PricingPlan } from '@/types/content';

const PLANS_REVALIDATE_SECONDS = 3600;
const PLANS_REQUEST_TIMEOUT_MS = 10_000;
const PLANS_FETCH_ATTEMPTS = 3;
const PLANS_RETRY_BASE_DELAY_MS = 500;
const HIDDEN_PLAN_IDS = new Set(['TEST']);
const MONTHLY_CYCLE = 'MONTHLY';
const YEARLY_CYCLE = 'YEARLY';
const CUSTOM_PRICE = 0;
const UNLIMITED = -1;
const TOMANS_PER_UNIT = 1000;
const RIALS_PER_TOMAN = 10;
const BYTES_PER_MEGABYTE = 1024 * 1024;
const BYTES_PER_GIGABYTE = BYTES_PER_MEGABYTE * 1024;

type ApiPlanPricing = {
  cycle: string;
  finalPrice: number;
  monthlyEquivalent: number;
  cycleDiscountPercent: number;
};

type ApiPlanFeatures = {
  maxProducts: number;
  maxCategories: number;
  maxVariantsPerProduct: number;
  maxMediaPerProduct: number;
  maxOrders: number;
  maxUsers: number;
  storageBytes: number;
  instagramDMLimit: number;
  hasInstagramDM: boolean;
  hasAnalytics: boolean;
  hasPrioritySupport: boolean;
};

type ApiPlan = {
  id: string;
  name: string;
  nameFa: string;
  description: string;
  descriptionFa: string;
  isRecommended: boolean;
  features: ApiPlanFeatures;
  pricing: ApiPlanPricing[];
  order: number;
};

export type PlanCatalog = {
  plans: ApiPlan[];
  trialDays: number;
  yearlyDiscountPercent: number;
};

export type PlanCopy = {
  locale: string;
  period: string;
  periodYearly: string;
  priceThousands: (value: string) => string;
  customPrice: string;
  cta: string;
  customCta: string;
  includes: string;
  everythingInPlus: (plan: string) => string;
  limit: (key: LimitRowKey, value: string) => string;
  unlimitedLimit: (key: LimitRowKey) => string;
  storageSize: (value: string, unit: StorageUnit) => string;
  name: (planId: string) => string | undefined;
  description: (planId: string) => string | undefined;
  featureRows: Array<{ key: FeatureRowKey; label: string }>;
};

export type FeatureRowKey = 'orders' | 'instagramAi' | 'analytics' | 'prioritySupport';

export type StorageUnit = 'gigabytes' | 'megabytes';

export type LimitRowKey =
  | 'aiReplies'
  | 'products'
  | 'orders'
  | 'categories'
  | 'variants'
  | 'media'
  | 'users'
  | 'storage';

type LimitRow = {
  key: LimitRowKey;
  read: (features: ApiPlanFeatures) => number;
  isOffered?: (features: ApiPlanFeatures) => boolean;
  isStorage?: boolean;
};

const LIMIT_ROWS: LimitRow[] = [
  {
    key: 'aiReplies',
    read: (features) => features.instagramDMLimit,
    isOffered: (features) => features.hasInstagramDM,
  },
  { key: 'products', read: (features) => features.maxProducts },
  { key: 'orders', read: (features) => features.maxOrders },
  { key: 'categories', read: (features) => features.maxCategories },
  { key: 'variants', read: (features) => features.maxVariantsPerProduct },
  { key: 'media', read: (features) => features.maxMediaPerProduct },
  { key: 'users', read: (features) => features.maxUsers },
  { key: 'storage', read: (features) => features.storageBytes, isStorage: true },
];

const FEATURE_ROW_PREDICATES: Record<FeatureRowKey, (features: ApiPlanFeatures) => boolean> = {
  orders: () => true,
  instagramAi: (features) => features.hasInstagramDM,
  analytics: (features) => features.hasAnalytics,
  prioritySupport: (features) => features.hasPrioritySupport,
};

const REQUIRED_FEATURE_FLAGS = [
  'hasInstagramDM',
  'hasAnalytics',
  'hasPrioritySupport',
] as const;

const REQUIRED_FEATURE_QUOTAS = [
  'maxProducts',
  'maxCategories',
  'maxVariantsPerProduct',
  'maxMediaPerProduct',
  'maxOrders',
  'maxUsers',
  'storageBytes',
  'instagramDMLimit',
] as const;

/* a missing flag would render every comparison row as excluded rather than
   failing, and a missing quota would print "up to NaN", so the shape is checked
   before anything reaches the page */
function assertPlanShape(plan: ApiPlan): void {
  const missingFlags = REQUIRED_FEATURE_FLAGS.filter(
    (flag) => typeof plan.features?.[flag] !== 'boolean',
  );

  if (missingFlags.length > 0) {
    throw new Error(`Plan ${plan.id} is missing feature flags: ${missingFlags.join(', ')}`);
  }

  const missingQuotas = REQUIRED_FEATURE_QUOTAS.filter(
    (quota) => !Number.isFinite(plan.features?.[quota]),
  );

  if (missingQuotas.length > 0) {
    throw new Error(`Plan ${plan.id} is missing feature quotas: ${missingQuotas.join(', ')}`);
  }

  if (!Array.isArray(plan.pricing) || plan.pricing.length === 0) {
    throw new Error(`Plan ${plan.id} has no pricing cycles`);
  }
}

function unwrapPlansPayload(body: unknown): { plans: ApiPlan[]; trialDays: number } {
  const billing = (body as { data?: { billing?: unknown } })?.data?.billing;
  const payload = billing as { plans?: unknown; trialDays?: unknown } | undefined;

  if (!payload || !Array.isArray(payload.plans) || payload.plans.length === 0) {
    throw new Error('Plans response did not contain a plan list');
  }

  return {
    plans: payload.plans as ApiPlan[],
    trialDays: typeof payload.trialDays === 'number' ? payload.trialDays : 0,
  };
}

function findCycle(plan: ApiPlan, cycle: string): ApiPlanPricing | undefined {
  return plan.pricing.find((entry) => entry.cycle === cycle);
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function requestPlansOnce(): Promise<unknown> {
  const response = await Promise.race([
    fetch(`${API_BASE_URL}/billing/plans`, {
      headers: { accept: 'application/json' },
      next: { revalidate: PLANS_REVALIDATE_SECONDS },
    }),
    delay(PLANS_REQUEST_TIMEOUT_MS).then(() => {
      throw new Error(`Plans request timed out after ${PLANS_REQUEST_TIMEOUT_MS}ms`);
    }),
  ]);

  if (!response.ok) {
    throw new Error(`Plans request failed with ${response.status}`);
  }

  return response.json();
}

async function requestPlans(): Promise<unknown> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= PLANS_FETCH_ATTEMPTS; attempt += 1) {
    try {
      return await requestPlansOnce();
    } catch (error) {
      lastError = error;

      if (attempt < PLANS_FETCH_ATTEMPTS) {
        await delay(PLANS_RETRY_BASE_DELAY_MS * attempt);
      }
    }
  }

  const reason = lastError instanceof Error ? lastError.message : String(lastError);
  throw new Error(`Plans request failed after ${PLANS_FETCH_ATTEMPTS} attempts: ${reason}`);
}

export async function fetchPlanCatalog(): Promise<PlanCatalog> {
  const { plans, trialDays } = unwrapPlansPayload(await requestPlans());
  const visible = plans
    .filter((plan) => !HIDDEN_PLAN_IDS.has(plan.id))
    .sort((first, second) => first.order - second.order);

  if (visible.length === 0) {
    throw new Error('Plans response contained no publicly listable plans');
  }

  visible.forEach(assertPlanShape);

  const discounts = visible
    .map((plan) => findCycle(plan, YEARLY_CYCLE)?.cycleDiscountPercent ?? 0)
    .filter((percent) => percent > 0);

  return {
    plans: visible,
    trialDays,
    yearlyDiscountPercent: discounts.length > 0 ? Math.max(...discounts) : 0,
  };
}

export function isCustomPricedPlan(plan: ApiPlan): boolean {
  return (findCycle(plan, MONTHLY_CYCLE)?.finalPrice ?? CUSTOM_PRICE) === CUSTOM_PRICE;
}

/* the entry tier that unlocks Instagram AI moves whenever plans are repriced, so
   the marketing claim is read from the catalog instead of naming a plan in copy */
export function entryPlanWithInstagramAi(catalog: PlanCatalog): ApiPlan | null {
  return (
    catalog.plans.find((plan) => plan.features.hasInstagramDM && !isCustomPricedPlan(plan)) ?? null
  );
}

export function monthlyTomanRange(catalog: PlanCatalog): { low: number; high: number } | null {
  const prices = catalog.plans
    .map((plan) => findCycle(plan, MONTHLY_CYCLE)?.finalPrice ?? CUSTOM_PRICE)
    .filter((price) => price > CUSTOM_PRICE);

  if (prices.length === 0) {
    return null;
  }

  return { low: Math.min(...prices), high: Math.max(...prices) };
}

export function planMonthlyRial(plan: ApiPlan): number | null {
  const price = findCycle(plan, MONTHLY_CYCLE)?.finalPrice ?? CUSTOM_PRICE;

  return price > CUSTOM_PRICE ? price * RIALS_PER_TOMAN : null;
}

export function monthlyRialRange(catalog: PlanCatalog): { low: number; high: number } | null {
  const range = monthlyTomanRange(catalog);

  return range
    ? { low: range.low * RIALS_PER_TOMAN, high: range.high * RIALS_PER_TOMAN }
    : null;
}

export function formatNumber(value: number, locale: string): string {
  return new Intl.NumberFormat(locale).format(value);
}

function formatStorage(bytes: number, copy: PlanCopy): string {
  const gigabytes = bytes / BYTES_PER_GIGABYTE;

  return gigabytes >= 1
    ? copy.storageSize(formatNumber(gigabytes, copy.locale), 'gigabytes')
    : copy.storageSize(formatNumber(bytes / BYTES_PER_MEGABYTE, copy.locale), 'megabytes');
}

function limitLabel(row: LimitRow, features: ApiPlanFeatures, copy: PlanCopy): string {
  const value = row.read(features);

  if (value === UNLIMITED) {
    return copy.unlimitedLimit(row.key);
  }

  return copy.limit(
    row.key,
    row.isStorage ? formatStorage(value, copy) : formatNumber(value, copy.locale),
  );
}

function planLimits(features: ApiPlanFeatures, copy: PlanCopy): string[] {
  return LIMIT_ROWS.filter((row) => row.isOffered?.(features) ?? true).map((row) =>
    limitLabel(row, features, copy),
  );
}

function formatPrice(tomans: number, copy: PlanCopy): string {
  return copy.priceThousands(
    formatNumber(Math.round(tomans / TOMANS_PER_UNIT), copy.locale),
  );
}

export function planName(plan: ApiPlan, locale: string): string {
  return locale === 'fa' ? plan.nameFa : plan.name;
}

export function planDescription(plan: ApiPlan, copy: PlanCopy): string {
  return (
    copy.description(plan.id) ?? (copy.locale === 'fa' ? plan.descriptionFa : plan.description)
  );
}

export function toPricingPlan(
  plan: ApiPlan,
  copy: PlanCopy,
  previousPlan?: ApiPlan,
): PricingPlan {
  const monthly = findCycle(plan, MONTHLY_CYCLE);
  const yearly = findCycle(plan, YEARLY_CYCLE);
  const custom = isCustomPricedPlan(plan);
  const { features } = plan;

  return {
    id: plan.id,
    name: copy.name(plan.id) ?? planName(plan, copy.locale),
    price: custom || !monthly ? copy.customPrice : formatPrice(monthly.finalPrice, copy),
    yearlyPrice: custom || !yearly ? copy.customPrice : formatPrice(yearly.monthlyEquivalent, copy),
    period: custom ? '' : copy.period,
    periodYearly: custom ? '' : copy.periodYearly,
    description: planDescription(plan, copy),
    cta: custom ? copy.customCta : copy.cta,
    metaHeading: previousPlan
      ? copy.everythingInPlus(copy.name(previousPlan.id) ?? planName(previousPlan, copy.locale))
      : copy.includes,
    meta: planLimits(features, copy),
    featured: plan.isRecommended,
    hasToggle: !custom && Boolean(yearly && yearly.monthlyEquivalent !== monthly?.finalPrice),
    features: copy.featureRows.map((row) => ({
      label: row.label,
      included: FEATURE_ROW_PREDICATES[row.key](features),
    })),
  };
}

/* the catalog is already sorted by tier, so each card can name the plan it
   builds on instead of restating what the visitor read one column earlier */
export function toPricingPlans(catalog: PlanCatalog, copy: PlanCopy): PricingPlan[] {
  return catalog.plans.map((plan, index) => toPricingPlan(plan, copy, catalog.plans[index - 1]));
}

export type { ApiPlan };
