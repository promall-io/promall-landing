import type { Metadata } from 'next';
import { defaultLocale, indexedLocales, type Locale } from '@/i18n/config';

export const SITE_URL = 'https://promall.io';

export const HOME_URL = `${SITE_URL}/`;

export const SITE_NAME: Record<Locale, string> = { fa: 'پرومال', en: 'ProMall' };

export const LATIN_BRAND_VARIANTS = ['ProMall', 'Promall', 'promall'];

export const SUPPORT_EMAIL = 'support@promall.io';

export const SOCIAL_CHANNELS = [
  { name: 'Instagram', url: 'https://www.instagram.com/promall.io' },
  { name: 'Telegram', url: 'https://t.me/promall_io' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/company/promall-io' },
  { name: 'X', url: 'https://x.com/promall_io' },
] as const;

export type SocialChannelName = (typeof SOCIAL_CHANNELS)[number]['name'];

export const SOCIAL_PROFILES = SOCIAL_CHANNELS.map((channel) => channel.url);

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
  return resolved === '/' ? HOME_URL : `${SITE_URL}${resolved}`;
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

export function isIndexedLocale(locale: string): boolean {
  return (indexedLocales as readonly string[]).includes(locale);
}

const INDEXED_ROBOTS = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-image-preview': 'large',
    'max-video-preview': -1,
  },
} as const satisfies Metadata['robots'];

const EXCLUDED_ROBOTS = { index: false, follow: true } as const satisfies Metadata['robots'];

export function robotsForLocale(locale: string): Metadata['robots'] {
  return isIndexedLocale(locale) ? INDEXED_ROBOTS : EXCLUDED_ROBOTS;
}

export function pageAlternates(locale: string, path: string): Metadata['alternates'] {
  return { canonical: absoluteUrl(locale, path), languages: languageAlternates(path) };
}
