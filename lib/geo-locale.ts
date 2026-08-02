import type { NextRequest } from 'next/server';
import { defaultLocale, isValidLocale, LOCALE_COOKIE_NAME, type Locale } from '@/i18n/config';

const IRAN_COUNTRY_CODE = 'IR';

const GEO_COUNTRY_HEADERS = [
  'x-vercel-ip-country',
  'cf-ipcountry',
  'cloudfront-viewer-country',
  'x-geo-country',
] as const;

const CRAWLER_USER_AGENT_PATTERN =
  /bot|crawl|spider|slurp|facebookexternalhit|whatsapp|embedly|quora|pinterest|ia_archiver|w3c_validator|google-inspectiontool|googleother|google-extended|mediapartners|chatgpt-user|perplexity|lighthouse|headlesschrome|prerender|archiver|validator|scraper|feedfetcher/i;

export function isCrawler(userAgent: string | null): boolean {
  return userAgent !== null && CRAWLER_USER_AGENT_PATTERN.test(userAgent);
}

function localeFromAcceptLanguage(acceptLanguage: string): Locale | null {
  const ranked = acceptLanguage
    .split(',')
    .map((entry) => {
      const [tag, quality] = entry.trim().split(';q=');
      return {
        code: tag?.split('-')[0]?.toLowerCase() ?? '',
        quality: quality ? Number.parseFloat(quality) : 1,
      };
    })
    .filter((entry) => entry.code.length > 0)
    .sort((a, b) => b.quality - a.quality);

  for (const { code } of ranked) {
    if (isValidLocale(code)) {
      return code;
    }
  }

  return ranked.length > 0 ? 'en' : null;
}

export function detectLocale(request: NextRequest): Locale {
  if (isCrawler(request.headers.get('user-agent'))) {
    return defaultLocale;
  }

  const savedLocale = request.cookies.get(LOCALE_COOKIE_NAME)?.value;
  if (isValidLocale(savedLocale)) {
    return savedLocale;
  }

  for (const header of GEO_COUNTRY_HEADERS) {
    const country = request.headers.get(header)?.toUpperCase();
    if (country) {
      return country === IRAN_COUNTRY_CODE ? 'fa' : 'en';
    }
  }

  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    const preferred = localeFromAcceptLanguage(acceptLanguage);
    if (preferred) {
      return preferred;
    }
  }

  return 'en';
}
