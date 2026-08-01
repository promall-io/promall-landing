import { getLocale, getTranslations } from 'next-intl/server';
import { NavShell } from '@/components/NavShell';
import { DEMO_PATH, localeHref } from '@/lib/routes';
import type { NavLink } from '@/types/content';

export async function Nav({ anchorsToHome = false }: { anchorsToHome?: boolean } = {}) {
  const t = await getTranslations('nav');
  const locale = await getLocale();
  const homeHref = localeHref(locale, '/');

  const links: NavLink[] = (t.raw('links') as NavLink[]).map((link) => {
    if (link.href.startsWith('/')) {
      return { label: link.label, href: localeHref(locale, link.href) };
    }
    if (link.href.startsWith('#')) {
      return { label: link.label, href: anchorsToHome ? `${homeHref}${link.href}` : link.href };
    }
    return link;
  });

  return (
    <NavShell
      brand={t('brand')}
      links={links}
      cta={t('cta')}
      ctaHref={localeHref(locale, DEMO_PATH)}
      homeHref={homeHref}
      menuOpenLabel={t('menuOpen')}
      menuCloseLabel={t('menuClose')}
      skipToContent={t('skipToContent')}
    />
  );
}
