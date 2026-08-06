import createMiddleware from 'next-intl/middleware';
import { NextResponse, type NextRequest } from 'next/server';
import {
  locales,
  defaultLocale,
  LOCALE_COOKIE_NAME,
  LOCALE_SOURCE_CHOSEN,
  LOCALE_SOURCE_COOKIE_NAME,
  LOCALE_SOURCE_DETECTED,
  type Locale,
} from './i18n/config';
import { detectLocale, isCrawler, GEO_LOCALE_REDIRECT_ENABLED } from './lib/geo-locale';
import { localeCookieHeaders } from './lib/locale-cookie';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
  localeDetection: false,
  alternateLinks: false,
});

const VARY_ON = 'Cookie, Accept-Language, User-Agent';

function hasLocalePrefix(pathname: string): boolean {
  return locales.some((locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`));
}

function isDocumentNavigation(request: NextRequest): boolean {
  const destination = request.headers.get('sec-fetch-dest');
  return destination === null || destination === 'document';
}

/**
 * Saves the first-visit detection so every later request skips it. A locale
 * the visitor chose (on app.promall.io — this site has no switcher) is left
 * untouched, and crawlers are never written to so the indexed surface stays
 * a pure function of the URL.
 *
 * Appends raw Set-Cookie lines rather than using `response.cookies` because
 * the migration off host-only cookies needs two lines per name, and
 * ResponseCookies keys its map by name alone.
 */
function persistDetectedLocale(
  response: NextResponse,
  request: NextRequest,
  locale: Locale
): NextResponse {
  if (isCrawler(request.headers.get('user-agent'))) {
    return response;
  }

  const savedSource = request.cookies.get(LOCALE_SOURCE_COOKIE_NAME)?.value;
  if (savedSource === LOCALE_SOURCE_CHOSEN) {
    return response;
  }

  const savedLocale = request.cookies.get(LOCALE_COOKIE_NAME)?.value;
  if (savedLocale === locale && savedSource === LOCALE_SOURCE_DETECTED) {
    return response;
  }

  const headers = localeCookieHeaders(
    locale,
    LOCALE_SOURCE_DETECTED,
    request.headers.get('host'),
    process.env.NODE_ENV === 'production'
  );

  for (const header of headers) {
    response.headers.append('set-cookie', header);
  }

  return response;
}

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const gateApplies =
    GEO_LOCALE_REDIRECT_ENABLED && !hasLocalePrefix(pathname) && isDocumentNavigation(request);

  if (!gateApplies) {
    return intlMiddleware(request);
  }

  const locale = detectLocale(request);

  if (locale !== defaultLocale) {
    const target = request.nextUrl.clone();
    target.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;

    const redirect = NextResponse.redirect(target, 307);
    redirect.headers.set('Cache-Control', 'no-store');
    redirect.headers.set('Vary', VARY_ON);
    return persistDetectedLocale(redirect, request, locale);
  }

  const passthrough = intlMiddleware(request);
  passthrough.headers.set('Vary', VARY_ON);
  return persistDetectedLocale(passthrough, request, locale);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
