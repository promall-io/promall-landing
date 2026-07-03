export const locales = ['en', 'fa'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'fa';

export const indexedLocales: readonly Locale[] = ['fa'];

export const localeNames: Record<Locale, string> = {
  en: 'English',
  fa: 'فارسی',
};

export const localeDirection: Record<Locale, 'ltr' | 'rtl'> = {
  en: 'ltr',
  fa: 'rtl',
};
