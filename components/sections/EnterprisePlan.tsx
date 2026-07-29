import Link from 'next/link';

type EnterprisePlanProps = {
  name: string;
  description: string;
  priceLabel: string;
  unlimitedLabel: string;
  slaLabel: string | null;
  cta: string;
  ctaHref: string;
  latinNumerals: boolean;
};

export function EnterprisePlan({
  name,
  description,
  priceLabel,
  unlimitedLabel,
  slaLabel,
  cta,
  ctaHref,
  latinNumerals,
}: EnterprisePlanProps) {
  return (
    <div className="flex flex-col gap-6 rounded-[24px] bg-[var(--pw-surface-1)] p-7 min-[811px]:flex-row min-[811px]:items-center min-[811px]:justify-between min-[811px]:gap-10">
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="text-xs uppercase tracking-[0.12em] text-[var(--pw-text-dim)]">
            {name}
          </span>
          <span className="text-2xl leading-[1.2] text-[var(--pw-cream)]">{priceLabel}</span>
        </div>
        <p className="max-w-[46ch] text-sm leading-[1.6] text-[var(--pw-text-dim)]">
          {description}
        </p>
      </div>

      <div className="flex flex-col gap-5 min-[811px]:items-end">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[var(--pw-text)]">
          <span>{unlimitedLabel}</span>
          {slaLabel ? (
            <>
              <span aria-hidden className="size-1 rounded-full bg-[var(--pw-line-strong)]" />
              <span className={latinNumerals ? 'pw-num' : undefined}>{slaLabel}</span>
            </>
          ) : null}
        </p>
        <Link href={ctaHref} className="pw-button self-start min-[811px]:self-auto">
          {cta}
        </Link>
      </div>
    </div>
  );
}
