// TODO: Temporarily set to English only. Re-enable Persian by uncommenting 'fa' in locales array
export const locales = ['en'] as const; // Full: ['en', 'fa']
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

// Keep these for when Persian is re-enabled
export const localeNames: Record<string, string> = {
  en: 'English',
  fa: 'فارسی',
};

export const localeDirection: Record<string, 'ltr' | 'rtl'> = {
  en: 'ltr',
  fa: 'rtl',
};
