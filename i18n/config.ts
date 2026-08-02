export const locales = ['en', 'fa'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'fa';

export const indexedLocales: readonly Locale[] = ['fa'];

export const localeNames: Record<Locale, string> = {
  en: 'English',
  fa: 'فارسی',
};

export const localeShortNames: Record<Locale, string> = {
  en: 'EN',
  fa: 'فا',
};

export const LOCALE_COOKIE_NAME = 'NEXT_LOCALE';

export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export function isValidLocale(value: string | undefined | null): value is Locale {
  return typeof value === 'string' && (locales as readonly string[]).includes(value);
}

export const localeDirection: Record<Locale, 'ltr' | 'rtl'> = {
  en: 'ltr',
  fa: 'rtl',
};
