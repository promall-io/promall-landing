'use client';

import { useState, type CSSProperties } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { CheckIcon, CrossIcon } from '@/components/icons';
import { REVEAL_EASE } from '@/components/Reveal';
import type { PricingPlan } from '@/types/content';

type BillingToggleProps = {
  checked: boolean;
  label: string;
  labelId: string;
  onToggle: () => void;
};

function BillingToggle({ checked, label, labelId, onToggle }: BillingToggleProps) {
  return (
    <span className="flex items-center gap-2.5">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-labelledby={labelId}
        onClick={onToggle}
        className={`flex h-[18px] w-9 shrink-0 items-center rounded-full p-[3px] [transition:background-color_0.4s_var(--pw-ease)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--pw-line-strong)] ${
          checked ? 'bg-[var(--pw-teal)]' : 'bg-[rgba(255,255,255,0.16)]'
        }`}
      >
        <span
          aria-hidden
          className={`size-3 rounded-full bg-[var(--pw-cream)] transition-transform duration-[0.35s] ease-[var(--pw-ease)] ${
            checked ? 'translate-x-[18px] rtl:-translate-x-[18px]' : 'translate-x-0'
          }`}
        />
      </button>
      <span id={labelId} className="whitespace-nowrap text-sm text-[var(--pw-text)]">
        {label}
      </span>
    </span>
  );
}

type PlanCardProps = {
  plan: PricingPlan;
  yearly: boolean;
  billingLabel: string;
  latinNumerals: boolean;
  ctaHref: string;
  isFirst: boolean;
  isLast: boolean;
  priceFade: { duration: number; ease: readonly number[] };
  onToggle: () => void;
};

function PlanCard({
  plan,
  yearly,
  billingLabel,
  latinNumerals,
  ctaHref,
  isFirst,
  isLast,
  priceFade,
  onToggle,
}: PlanCardProps) {
  const price = plan.hasToggle && yearly ? plan.yearlyPrice : plan.price;

  const surface = plan.featured
    ? 'bg-[var(--pw-surface-raised)] min-[811px]:z-[1] min-[811px]:-my-6 min-[811px]:py-[52px]'
    : 'bg-[var(--pw-surface-1)]';

  const corners = plan.featured
    ? ''
    : `${isFirst ? 'min-[811px]:rounded-e-none' : ''} ${isLast ? 'min-[811px]:rounded-s-none' : ''}`;

  return (
    <div className={`relative flex flex-col rounded-[24px] p-7 ${surface} ${corners}`}>
      <div className="flex h-5 items-center justify-between gap-3">
        <span className="text-xs uppercase tracking-[0.12em] text-[var(--pw-text-dim)]">
          {plan.name}
        </span>
        {plan.hasToggle ? (
          <BillingToggle
            checked={yearly}
            label={billingLabel}
            labelId={`pricing-billing-${plan.id}`}
            onToggle={onToggle}
          />
        ) : null}
      </div>

      <span aria-hidden className="pw-rail my-5 block" />

      <p className="flex flex-wrap items-baseline gap-x-2 text-[40px] leading-[1.2] text-[var(--pw-cream)]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={price}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={priceFade}
            className={latinNumerals ? 'pw-num' : undefined}
          >
            {price}
          </motion.span>
        </AnimatePresence>
        {plan.period ? (
          <span className="text-base text-[var(--pw-text-dim)]">{plan.period}</span>
        ) : null}
      </p>

      <p className="mt-3.5 max-w-[24ch] text-sm leading-[1.6] text-[var(--pw-text-dim)] min-[811px]:min-h-[45px]">
        {plan.description}
      </p>

      <Link
        href={ctaHref}
        className={`pw-button mt-[22px] self-start ${plan.featured ? 'pw-button-primary' : ''}`}
      >
        {plan.cta}
      </Link>

      <div className="mt-7 flex flex-col">
        {plan.meta.map((item) => (
          <p
            key={item}
            className="border-t border-[var(--pw-line)] py-4 text-sm text-[var(--pw-text)]"
          >
            {item}
          </p>
        ))}

        {plan.features.map((feature) => (
          <p
            key={feature.label}
            className={`flex items-center gap-3 border-t border-[var(--pw-line)] py-4 text-sm ${
              feature.included ? 'text-[var(--pw-cream)]' : 'text-[var(--pw-text-faint)]'
            }`}
          >
            {feature.included ? (
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[rgba(255,255,255,0.14)] text-[var(--pw-cream)]">
                <CheckIcon width={12} height={12} />
              </span>
            ) : (
              <CrossIcon width={16} height={16} className="shrink-0 text-[var(--pw-text-faint)]" />
            )}
            {feature.label}
          </p>
        ))}
      </div>
    </div>
  );
}

type PricingCardsProps = {
  plans: PricingPlan[];
  yearlyLabel: string;
  monthlyLabel: string;
  latinNumerals: boolean;
  ctaHref: string;
};

export function PricingCards({
  plans,
  yearlyLabel,
  monthlyLabel,
  latinNumerals,
  ctaHref,
}: PricingCardsProps) {
  const [yearly, setYearly] = useState(true);
  const reduceMotion = useReducedMotion();
  const priceFade = { duration: reduceMotion ? 0 : 0.25, ease: REVEAL_EASE };

  return (
    <div
      className="pw-pricing-grid"
      style={{ '--pw-pricing-columns': plans.length } as CSSProperties}
    >
      {plans.map((plan, index) => (
        <PlanCard
          key={plan.id}
          plan={plan}
          yearly={yearly}
          billingLabel={yearly ? yearlyLabel : monthlyLabel}
          latinNumerals={latinNumerals}
          ctaHref={ctaHref}
          isFirst={index === 0}
          isLast={index === plans.length - 1}
          priceFade={priceFade}
          onToggle={() => setYearly((current) => !current)}
        />
      ))}
    </div>
  );
}
