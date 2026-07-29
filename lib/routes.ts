import { defaultLocale } from '@/i18n/config';

export const DEMO_PATH = '/demo';

export function localeHref(locale: string, path: string): string {
  const suffix = path === '/' ? '' : path;
  if (locale === defaultLocale) {
    return suffix || '/';
  }
  return `/${locale}${suffix}`;
}
