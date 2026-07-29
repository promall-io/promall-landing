import { API_BASE_URL } from '@/lib/api-config';
import type { PricingPlan } from '@/types/content';

const PLANS_REVALIDATE_SECONDS = 3600;
const HIDDEN_PLAN_IDS = new Set(['TEST']);
const MONTHLY_CYCLE = 'MONTHLY';
const YEARLY_CYCLE = 'YEARLY';
const CUSTOM_PRICE = 0;
const UNLIMITED = -1;
const TOMANS_PER_UNIT = 1000;
const RIALS_PER_TOMAN = 10;

type ApiPlanPricing = {
  cycle: string;
  finalPrice: number;
  monthlyEquivalent: number;
  cycleDiscountPercent: number;
};

type ApiPlanFeatures = {
  maxProducts: number;
  maxOrders: number;
  maxUsers: number;
  hasInvoice: boolean;
  hasInstagramDM: boolean;
  hasRealTimeAnalytics: boolean;
  hasApiAccess: boolean;
  hasCustomDomain: boolean;
  hasPhoneSupport: boolean;
  slaGuarantee?: number;
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
  priceThousands: (value: string) => string;
  customPrice: string;
  cta: string;
  unlimited: string;
  meta: {
    products: (value: string) => string;
    orders: (value: string) => string;
    users: (value: string) => string;
  };
  description: (planId: string) => string | undefined;
  featureRows: Array<{ key: FeatureRowKey; label: string }>;
};

export type FeatureRowKey = 'orders' | 'instagramAi' | 'domainApi' | 'realtimeSupport';

const FEATURE_ROW_PREDICATES: Record<FeatureRowKey, (features: ApiPlanFeatures) => boolean> = {
  orders: (features) => features.hasInvoice,
  instagramAi: (features) => features.hasInstagramDM,
  domainApi: (features) => features.hasCustomDomain && features.hasApiAccess,
  realtimeSupport: (features) => features.hasRealTimeAnalytics && features.hasPhoneSupport,
};

const REQUIRED_FEATURE_FLAGS = [
  'hasInvoice',
  'hasInstagramDM',
  'hasRealTimeAnalytics',
  'hasApiAccess',
  'hasCustomDomain',
  'hasPhoneSupport',
] as const;

/* a missing flag would render every comparison row as excluded rather than
   failing, so the shape is checked before anything reaches the page */
function assertPlanShape(plan: ApiPlan): void {
  const missing = REQUIRED_FEATURE_FLAGS.filter(
    (flag) => typeof plan.features?.[flag] !== 'boolean',
  );

  if (missing.length > 0) {
    throw new Error(`Plan ${plan.id} is missing feature flags: ${missing.join(', ')}`);
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

export async function fetchPlanCatalog(): Promise<PlanCatalog> {
  const response = await fetch(`${API_BASE_URL}/billing/plans`, {
    headers: { accept: 'application/json' },
    next: { revalidate: PLANS_REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new Error(`Plans request failed with ${response.status}`);
  }

  const { plans, trialDays } = unwrapPlansPayload(await response.json());
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

export function splitPlans(catalog: PlanCatalog): { fixed: ApiPlan[]; custom: ApiPlan[] } {
  return {
    fixed: catalog.plans.filter((plan) => !isCustomPricedPlan(plan)),
    custom: catalog.plans.filter((plan) => isCustomPricedPlan(plan)),
  };
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

export function monthlyRialRange(catalog: PlanCatalog): { low: number; high: number } | null {
  const range = monthlyTomanRange(catalog);

  return range
    ? { low: range.low * RIALS_PER_TOMAN, high: range.high * RIALS_PER_TOMAN }
    : null;
}

export function formatNumber(value: number, locale: string): string {
  return new Intl.NumberFormat(locale).format(value);
}

function formatCount(value: number, locale: string, unlimited: string): string {
  return value === UNLIMITED ? unlimited : formatNumber(value, locale);
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

export function planSlaPercent(plan: ApiPlan, locale: string): string | null {
  return typeof plan.features.slaGuarantee === 'number'
    ? formatNumber(plan.features.slaGuarantee, locale)
    : null;
}

export function toPricingPlan(plan: ApiPlan, copy: PlanCopy): PricingPlan {
  const monthly = findCycle(plan, MONTHLY_CYCLE);
  const yearly = findCycle(plan, YEARLY_CYCLE);
  const { features } = plan;

  return {
    id: plan.id,
    name: planName(plan, copy.locale),
    price: monthly ? formatPrice(monthly.finalPrice, copy) : copy.customPrice,
    yearlyPrice: yearly ? formatPrice(yearly.monthlyEquivalent, copy) : copy.customPrice,
    period: copy.period,
    description: planDescription(plan, copy),
    cta: copy.cta,
    meta: [
      copy.meta.products(formatCount(features.maxProducts, copy.locale, copy.unlimited)),
      copy.meta.orders(formatCount(features.maxOrders, copy.locale, copy.unlimited)),
      copy.meta.users(formatCount(features.maxUsers, copy.locale, copy.unlimited)),
    ],
    featured: plan.isRecommended,
    hasToggle: Boolean(yearly && yearly.monthlyEquivalent !== monthly?.finalPrice),
    features: copy.featureRows.map((row) => ({
      label: row.label,
      included: FEATURE_ROW_PREDICATES[row.key](features),
    })),
  };
}

export type { ApiPlan };
