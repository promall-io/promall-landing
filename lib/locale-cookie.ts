/**
 * One locale decision for the whole platform.
 *
 * The landing site, the dashboard and every shop subdomain are separate hosts
 * under `promall.io`, so a host-only cookie would make each of them ask the
 * question again and answer it differently. Scoping to the registrable domain
 * means a visitor is asked once, and a language they chose on the dashboard is
 * the language they get here.
 *
 * Off-platform hosts (localhost, Vercel preview deploys) get a host-only
 * cookie — a Domain attribute the browser cannot match is silently dropped,
 * which would leave the locale unpersistable there.
 *
 * Mirrored from promall-ui/src/i18n/cookie.ts; keep the two in lock-step.
 */

import {
  LOCALE_COOKIE_MAX_AGE,
  LOCALE_COOKIE_NAME,
  LOCALE_SOURCE_COOKIE_NAME,
  type Locale,
  type LocaleSource,
} from '@/i18n/config';

export const LOCALE_COOKIE_ROOT_DOMAIN = 'promall.io';

export function localeCookieDomain(
  hostname: string | null | undefined
): string | undefined {
  const host = hostname?.split(':')[0]?.trim().toLowerCase();

  if (!host) {
    return undefined;
  }

  const isPlatformHost =
    host === LOCALE_COOKIE_ROOT_DOMAIN ||
    host.endsWith(`.${LOCALE_COOKIE_ROOT_DOMAIN}`);

  return isPlatformHost ? `.${LOCALE_COOKIE_ROOT_DOMAIN}` : undefined;
}

function serializeCookie(
  name: string,
  value: string,
  maxAge: number,
  domain: string | undefined,
  secure: boolean
): string {
  const attributes = [`${name}=${value}`, 'Path=/', `Max-Age=${maxAge}`, 'SameSite=Lax'];

  if (domain) {
    attributes.push(`Domain=${domain}`);
  }

  if (secure) {
    attributes.push('Secure');
  }

  return attributes.join('; ');
}

/**
 * Set-Cookie lines that persist a locale decision, plus — when the cookie is
 * domain-scoped — the lines that evict any host-only cookie of the same name
 * left behind by an earlier release. Two cookies with one name differ only by
 * scope, and the browser sends both; the stale one would shadow the fresh one
 * because it was created first.
 */
export function localeCookieHeaders(
  locale: Locale,
  source: LocaleSource,
  hostname: string | null | undefined,
  secure: boolean
): string[] {
  const domain = localeCookieDomain(hostname);

  const headers = [
    serializeCookie(LOCALE_COOKIE_NAME, locale, LOCALE_COOKIE_MAX_AGE, domain, secure),
    serializeCookie(
      LOCALE_SOURCE_COOKIE_NAME,
      source,
      LOCALE_COOKIE_MAX_AGE,
      domain,
      secure
    ),
  ];

  if (domain) {
    headers.push(
      serializeCookie(LOCALE_COOKIE_NAME, '', 0, undefined, secure),
      serializeCookie(LOCALE_SOURCE_COOKIE_NAME, '', 0, undefined, secure)
    );
  }

  return headers;
}
