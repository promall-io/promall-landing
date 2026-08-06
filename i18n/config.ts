export const locales = ['en', 'fa'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'fa';

export const indexedLocales: readonly Locale[] = ['fa'];

export const LOCALE_COOKIE_NAME = 'NEXT_LOCALE';
export const LOCALE_COOKIE_MAX_AGE = 365 * 24 * 60 * 60;

/**
 * Mirrors promall-ui: `detected` is a first-visit guess a stronger signal may
 * still correct, `chosen` came from the visitor and is never overridden. This
 * site has no switcher, so it only ever writes `detected` — the value is read
 * so a choice made on app.promall.io survives a visit here.
 */
export const LOCALE_SOURCE_COOKIE_NAME = 'NEXT_LOCALE_SOURCE';
export const LOCALE_SOURCE_DETECTED = 'detected';
export const LOCALE_SOURCE_CHOSEN = 'chosen';

export type LocaleSource =
  | typeof LOCALE_SOURCE_DETECTED
  | typeof LOCALE_SOURCE_CHOSEN;

export function isValidLocale(value: string | undefined | null): value is Locale {
  return typeof value === 'string' && (locales as readonly string[]).includes(value);
}

export const localeDirection: Record<Locale, 'ltr' | 'rtl'> = {
  en: 'ltr',
  fa: 'rtl',
};
