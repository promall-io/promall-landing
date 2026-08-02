'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { usePathname } from '@/i18n/navigation';
import {
  locales,
  localeNames,
  localeShortNames,
  LOCALE_COOKIE_MAX_AGE,
  LOCALE_COOKIE_NAME,
  type Locale,
} from '@/i18n/config';
import { localeHref } from '@/lib/routes';

function persistLocale(locale: Locale) {
  const secure = window.location.protocol === 'https:' ? '; secure' : '';
  document.cookie = `${LOCALE_COOKIE_NAME}=${locale}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE}; samesite=lax${secure}`;
}

export function LocaleSwitcher({ label }: { label: string }) {
  const pathname = usePathname();
  const activeLocale = useLocale();

  return (
    <div
      role="group"
      aria-label={label}
      className="inline-flex items-center gap-1 rounded-full p-1 ring-1 ring-[var(--pw-line)]"
    >
      {locales.map((locale) => {
        const isActive = locale === activeLocale;

        return (
          <Link
            key={locale}
            href={localeHref(locale, pathname)}
            hrefLang={locale}
            lang={locale}
            aria-label={localeNames[locale]}
            aria-current={isActive ? 'true' : undefined}
            onClick={() => persistLocale(locale)}
            className={
              isActive
                ? 'flex h-7 min-w-9 items-center justify-center rounded-full bg-[rgba(255,255,255,0.12)] px-2 text-xs text-[var(--pw-cream)]'
                : 'flex h-7 min-w-9 items-center justify-center rounded-full px-2 text-xs text-[var(--pw-text-faint)] [transition:color_0.4s_var(--pw-ease)] hover:text-[var(--pw-cream)]'
            }
          >
            {localeShortNames[locale]}
          </Link>
        );
      })}
    </div>
  );
}
