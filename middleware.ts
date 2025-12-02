import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/config';

// TODO: Temporarily forcing English only. Persian translations are preserved in /messages/fa.json
export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed', // Changed to 'as-needed' so root URL works without /en prefix
});

export const config = {
  // Match all pathnames except for
  // - API routes
  // - _next (Next.js internals)
  // - _vercel (Vercel internals)
  // - static files (e.g. .js, .css, .json, .png)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
