import { defaultLocale } from '@/i18n/config';

export const DEMO_PATH = '/demo';
export const BLOG_PATH = '/blog';
export const PRIVACY_PATH = '/privacy';
export const TERMS_PATH = '/terms';

export function localeHref(locale: string, path: string): string {
  const suffix = path === '/' ? '' : path;
  if (locale === defaultLocale) {
    return suffix || '/';
  }
  return `/${locale}${suffix}`;
}

export function articleHref(locale: string, slug: string): string {
  return localeHref(locale, `${BLOG_PATH}/${slug}`);
}
