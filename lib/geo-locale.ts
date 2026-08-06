/**
 * Locale detection contract — promotion-only, mirroring promall-ui.
 *
 * Every signal answers "is this visitor Persian-speaking?"; a negative from
 * one signal is never a positive for English. Geo is the weakest of them —
 * a VPN moves the exit IP but not the OS clock or the browser's language
 * list — so it may only ever promote to `fa`. English is reached solely when
 * the browser names its languages and Persian is absent from them.
 */

import type { NextRequest } from 'next/server';
import {
  defaultLocale,
  isValidLocale,
  LOCALE_COOKIE_NAME,
  LOCALE_SOURCE_CHOSEN,
  LOCALE_SOURCE_COOKIE_NAME,
  type Locale,
} from '@/i18n/config';

const IRAN_COUNTRY_CODE = 'IR';

export const GEO_LOCALE_REDIRECT_ENABLED = true;

const GEO_COUNTRY_HEADERS = [
  'x-vercel-ip-country',
  'cf-ipcountry',
  'cloudfront-viewer-country',
  'x-geo-country',
] as const;

const IRAN_TIMEZONES = ['Asia/Tehran', 'Iran'] as const;

const PERSIAN_LANGUAGE_SUBTAG = 'fa';
const WILDCARD_LANGUAGE_SUBTAG = '*';

const CRAWLER_USER_AGENT_PATTERN =
  /bot|crawl|spider|slurp|facebookexternalhit|whatsapp|telegram|skypeuripreview|discord|linkedinbot|embedly|quora|pinterest|redditbot|vkshare|ia_archiver|w3c_validator|google-inspectiontool|googleother|google-extended|google-pagespeed|mediapartners|chatgpt-user|oai-searchbot|gptbot|perplexity|claude|anthropic|cohere|diffbot|youbot|duckassist|lighthouse|pagespeed|pingdom|gtmetrix|webpagetest|headlesschrome|chrome-headless|phantomjs|puppeteer|playwright|prerender|archiver|validator|scraper|feedfetcher|yandex|baidu|sogou|seznam|petalbot|applebot|bingpreview|ahrefs|semrush|moz\.com|dotbot|screaming frog|sitebulb|serpstat|majestic|dataforseo/i;

export function isCrawler(userAgent: string | null): boolean {
  return userAgent !== null && CRAWLER_USER_AGENT_PATTERN.test(userAgent);
}

function rankedLanguageSubtags(acceptLanguage: string): string[] {
  return acceptLanguage
    .split(',')
    .map((entry) => {
      const [tag, quality] = entry.trim().split(';q=');
      const parsedQuality = quality === undefined ? 1 : Number.parseFloat(quality);

      return {
        subtag: tag?.trim().split('-')[0]?.toLowerCase() ?? '',
        quality: Number.isFinite(parsedQuality) ? parsedQuality : 0,
      };
    })
    .filter(
      (entry) =>
        entry.subtag.length > 0 &&
        entry.subtag !== WILDCARD_LANGUAGE_SUBTAG &&
        entry.quality > 0
    )
    .sort((a, b) => b.quality - a.quality)
    .map((entry) => entry.subtag);
}

function prefersPersianLanguage(acceptLanguage: string | null): boolean {
  return (
    acceptLanguage !== null &&
    rankedLanguageSubtags(acceptLanguage).includes(PERSIAN_LANGUAGE_SUBTAG)
  );
}

function isIranTimezone(timezone: string | null): boolean {
  return (
    timezone !== null &&
    (IRAN_TIMEZONES as readonly string[]).includes(timezone.trim())
  );
}

function isIranCountry(country: string | null): boolean {
  return country !== null && country.trim().toUpperCase() === IRAN_COUNTRY_CODE;
}

function geoCountry(request: NextRequest): string | null {
  return GEO_COUNTRY_HEADERS.reduce<string | null>(
    (found, header) => found ?? request.headers.get(header),
    null
  );
}

function hasPersianSignal(request: NextRequest): boolean {
  return (
    prefersPersianLanguage(request.headers.get('accept-language')) ||
    isIranTimezone(request.headers.get('x-timezone')) ||
    isIranCountry(geoCountry(request))
  );
}

export function detectLocale(request: NextRequest): Locale {
  if (isCrawler(request.headers.get('user-agent'))) {
    return defaultLocale;
  }

  const savedLocale = request.cookies.get(LOCALE_COOKIE_NAME)?.value;
  const savedSource = request.cookies.get(LOCALE_SOURCE_COOKIE_NAME)?.value;

  if (isValidLocale(savedLocale)) {
    if (savedSource === LOCALE_SOURCE_CHOSEN) {
      return savedLocale;
    }

    return savedLocale !== 'fa' && hasPersianSignal(request) ? 'fa' : savedLocale;
  }

  if (hasPersianSignal(request)) {
    return 'fa';
  }

  const acceptLanguage = request.headers.get('accept-language');
  const namesOtherLanguages =
    acceptLanguage !== null && rankedLanguageSubtags(acceptLanguage).length > 0;

  return namesOtherLanguages ? 'en' : defaultLocale;
}
