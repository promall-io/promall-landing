import createMiddleware from 'next-intl/middleware';
import { NextResponse, type NextRequest } from 'next/server';
import { locales, defaultLocale } from './i18n/config';
import { detectLocale } from './lib/geo-locale';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
  localeDetection: false,
});

function hasLocalePrefix(pathname: string): boolean {
  return locales.some((locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`));
}

function isDocumentNavigation(request: NextRequest): boolean {
  const destination = request.headers.get('sec-fetch-dest');
  return destination === null || destination === 'document';
}

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!hasLocalePrefix(pathname) && isDocumentNavigation(request)) {
    const locale = detectLocale(request);

    if (locale !== defaultLocale) {
      const target = request.nextUrl.clone();
      target.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;

      const redirect = NextResponse.redirect(target, 307);
      redirect.headers.set('Cache-Control', 'no-store');
      redirect.headers.set('Vary', 'Cookie, Accept-Language, User-Agent');
      return redirect;
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
