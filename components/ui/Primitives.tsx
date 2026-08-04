import type { ReactNode } from 'react';
import Link from 'next/link';

export function EyebrowPill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-[var(--pw-surface-2)] px-3.5 py-1.5 text-xs text-[var(--pw-text-dim)] ring-1 ring-[var(--pw-line)]">
      <span className="size-1.5 rounded-full bg-[var(--pw-text-faint)]" />
      {label}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  lead,
  trail,
  description,
  dimTrail = true,
  action,
}: {
  eyebrow: string;
  lead: string;
  trail?: string;
  description?: string;
  dimTrail?: boolean;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
      <div className="flex flex-col items-start gap-6">
        <EyebrowPill label={eyebrow} />
        <h2 className="pw-h2 max-w-[18ch] text-balance">
          {lead}
          {trail ? <span className={dimTrail ? 'pw-h2-dim' : undefined}> {trail}</span> : null}
        </h2>
      </div>
      {description ? <p className="pw-small max-w-[34ch] md:pb-2">{description}</p> : null}
      {action ? <div className="md:pb-2">{action}</div> : null}
    </div>
  );
}

/* An inline text link is only as tall as its line box, which is roughly half a
   thumb. The padding buys the height back and the matching negative margin
   gives it to the tap target rather than to the layout, so nothing around it
   moves. */
export function ArrowLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="pw-link pw-small -my-2 inline-flex min-h-[var(--pw-touch)] items-center gap-2 whitespace-nowrap"
    >
      {children}
      <span aria-hidden className="rtl:-scale-x-100">
        →
      </span>
    </Link>
  );
}

export function CircleButton({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className="flex size-11 items-center justify-center rounded-full bg-[var(--pw-surface-3)] text-[var(--pw-text)] ring-1 ring-[var(--pw-line)] [transition:background-color_0.4s_var(--pw-ease),color_0.4s_var(--pw-ease),opacity_0.4s_var(--pw-ease)] hover:bg-[rgb(var(--pw-veil-rgb)/16%)] focus-visible:outline-none focus-visible:ring-[var(--ring)] disabled:opacity-40"
    >
      {children}
    </button>
  );
}
