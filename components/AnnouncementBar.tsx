import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { ArrowRightIcon } from '@/components/icons';

const ANNOUNCEMENT_HREF = '#instagram';

export async function AnnouncementBar() {
  const t = await getTranslations('announcement');
  const text = t('text');

  return (
    <aside
      aria-label={t('ariaLabel')}
      className="flex h-16 items-center justify-center min-[811px]:h-24"
    >
      <Link
        href={ANNOUNCEMENT_HREF}
        className="pw-touch-target group relative flex h-9 max-w-full items-center gap-2 rounded-full bg-[var(--pw-surface-2)] ps-[18px] pe-1.5 ring-1 ring-[var(--pw-line)] backdrop-blur-[8px]"
      >
        <span
          className="block w-[300px] min-w-0 shrink overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0, rgb(var(--shade-rgb)) 20px, rgb(var(--shade-rgb)) calc(100% - 20px), transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to right, transparent 0, rgb(var(--shade-rgb)) 20px, rgb(var(--shade-rgb)) calc(100% - 20px), transparent 100%)',
          }}
        >
          <span className="pw-marquee flex w-max group-hover:[animation-play-state:paused] group-focus-visible:[animation-play-state:paused]">
            <span className="pw-micro whitespace-nowrap pe-10 text-[var(--pw-text)]">{text}</span>
            <span aria-hidden className="pw-micro whitespace-nowrap pe-10 text-[var(--pw-text)]">
              {text}
            </span>
          </span>
        </span>
        <span
          aria-hidden
          className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[var(--pw-surface-3)] text-[var(--pw-cream)] ring-1 ring-[var(--pw-line)] [transition:background-color_0.4s_var(--pw-ease),color_0.4s_var(--pw-ease)] group-hover:bg-[rgb(var(--pw-veil-rgb)/18%)]"
        >
          <ArrowRightIcon width={14} height={14} className="rtl:-scale-x-100" />
        </span>
      </Link>
    </aside>
  );
}
