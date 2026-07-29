import { getLocale, getTranslations } from 'next-intl/server';
import { NavShell } from '@/components/NavShell';
import { DEMO_PATH, localeHref } from '@/lib/routes';
import type { NavLink } from '@/types/content';

export async function Nav() {
  const t = await getTranslations('nav');
  const locale = await getLocale();

  return (
    <NavShell
      brand={t('brand')}
      links={t.raw('links') as NavLink[]}
      cta={t('cta')}
      ctaHref={localeHref(locale, DEMO_PATH)}
      homeHref={localeHref(locale, '/')}
      menuOpenLabel={t('menuOpen')}
      menuCloseLabel={t('menuClose')}
      skipToContent={t('skipToContent')}
    />
  );
}
