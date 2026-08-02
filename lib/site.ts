import { defaultLocale, indexedLocales, type Locale } from '@/i18n/config';

export const SITE_URL = 'https://promall.io';

export const SITE_NAME: Record<Locale, string> = { fa: 'پرومال', en: 'ProMall' };

export const SUPPORT_EMAIL = 'support@promall.io';

export const SOCIAL_PROFILES = ['https://instagram.com/promall.io'];

export const SITE_SECTIONS = [
  'hero',
  'intro',
  'instagram',
  'features',
  'why',
  'about',
  'integrations',
  'changelog',
  'numbers',
  'pricing',
  'faq',
  'blog',
  'cta',
] as const;

export type SiteSection = (typeof SITE_SECTIONS)[number];

export function localePath(locale: string, path: string): string {
  const suffix = path === '/' ? '' : path;
  return locale === defaultLocale ? suffix || '/' : `/${locale}${suffix}`;
}

export function absoluteUrl(locale: string, path: string): string {
  const resolved = localePath(locale, path);
  return resolved === '/' ? SITE_URL : `${SITE_URL}${resolved}`;
}

export function languageAlternates(path: string): Record<string, string> {
  const entries = indexedLocales.map(
    (locale: Locale) => [locale, localePath(locale, path)] as const,
  );
  return {
    ...Object.fromEntries(entries),
    'x-default': localePath(defaultLocale, path),
  };
}
