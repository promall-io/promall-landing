import Link from 'next/link';
import { getLocale, getTranslations } from 'next-intl/server';
import { localeHref } from '@/lib/routes';
import { EnamadSeal } from '@/components/EnamadSeal';
import { InstagramIcon, LinkedinIcon, ProMallMark, TelegramIcon } from '@/components/icons';
import { SOCIAL_CHANNELS, type SocialChannelName } from '@/lib/site';
import type { FooterColumn } from '@/types/content';

const socialIcons = {
  Instagram: InstagramIcon,
  Telegram: TelegramIcon,
  LinkedIn: LinkedinIcon,
} satisfies Record<SocialChannelName, typeof InstagramIcon>;

const socialChannels = SOCIAL_CHANNELS.map(({ name, url }) => ({
  name,
  href: url,
  Icon: socialIcons[name],
}));

export async function Footer({ anchorsToHome = false }: { anchorsToHome?: boolean } = {}) {
  const t = await getTranslations('footer');
  const locale = await getLocale();
  const columns = t.raw('columns') as FooterColumn[];
  const homeHref = localeHref(locale, '/');
  const resolveHref = (href: string) => {
    if (href.startsWith('/')) {
      return localeHref(locale, href);
    }
    if (href.startsWith('#')) {
      return anchorsToHome ? `${homeHref}${href}` : href;
    }
    return href;
  };

  return (
    <footer className="pw-section">
      <div className="pw-container pt-16 pb-16">
        <div className="flex flex-col gap-14 min-[810px]:flex-row min-[810px]:justify-between">
          <div className="flex flex-col items-start gap-10">
            <Link
              href={localeHref(locale, '/')}
              aria-label={t('brand')}
              className="pw-touch-target pw-link relative inline-flex shrink-0 text-[var(--pw-text-dim)]"
            >
              <ProMallMark size={28} />
            </Link>

            {locale === 'fa' ? (
              <EnamadSeal label={t('enamadLabel')} alt={t('enamadAlt')} />
            ) : null}
          </div>

          {/* Three link groups end to end is most of a screen on a phone. Two
              columns fold the same content into a third of the height without
              changing a single row's rhythm. */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-12 min-[810px]:flex min-[810px]:flex-row min-[810px]:gap-24">
            {columns.map((column, columnIndex) => {
              const titleId = `footer-column-${columnIndex}`;

              return (
                <nav key={column.title} aria-labelledby={titleId}>
                  <p id={titleId} className="text-sm font-normal text-[var(--pw-cream)]">
                    {column.title}
                  </p>
                  <ul className="mt-4 flex flex-col min-[810px]:mt-6">
                    {column.links.map((link, linkIndex) => {
                      const tone =
                        columnIndex === 0 && linkIndex === 0
                          ? 'text-[var(--pw-cream)]'
                          : 'text-[var(--pw-text-dim)]';
                      const className = `pw-link flex min-h-[var(--pw-touch)] items-center text-sm ${tone}`;

                      return (
                        <li key={link.label}>
                          {link.href.startsWith('mailto:') ? (
                            <a href={link.href} className={className}>
                              {link.label}
                            </a>
                          ) : (
                            <Link href={resolveHref(link.href)} className={className}>
                              {link.label}
                            </Link>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              );
            })}
          </div>
        </div>

        <div className="pw-rail mt-14" />

        <div className="mt-14 flex flex-col gap-8 min-[810px]:flex-row min-[810px]:items-center min-[810px]:justify-between">
          <p className="pw-micro">{t('copyright')}</p>

          {/* -ms-3 pulls the first icon's new padding back off the edge so the
              row still starts flush with the column above it. */}
          <ul aria-label={t('socialLabel')} className="-ms-3 flex items-center">
            {socialChannels.map(({ name, href, Icon }) => (
              <li key={name}>
                <a
                  href={href}
                  aria-label={name}
                  target="_blank"
                  rel="noreferrer"
                  className="pw-link inline-flex size-[var(--pw-touch)] items-center justify-center rounded-full text-[var(--pw-text-faint)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ring)]"
                >
                  <Icon />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
