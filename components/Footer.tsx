import Link from 'next/link';
import { getLocale, getTranslations } from 'next-intl/server';
import { localeHref } from '@/lib/routes';
import { EnamadSeal } from '@/components/EnamadSeal';
import { LocaleSwitcher } from '@/components/LocaleSwitcher';
import {
  InstagramIcon,
  LinkedinIcon,
  ProMallMark,
  TelegramIcon,
  XIcon,
} from '@/components/icons';
import type { FooterColumn } from '@/types/content';

const socialChannels = [
  { name: 'Instagram', href: 'https://instagram.com/promall.io', Icon: InstagramIcon },
  { name: 'Telegram', href: 'https://t.me/promall_io', Icon: TelegramIcon },
  { name: 'LinkedIn', href: 'https://linkedin.com/company/promall', Icon: LinkedinIcon },
  { name: 'X', href: 'https://x.com/promall_io', Icon: XIcon },
];

export async function Footer({ anchorsToHome = false }: { anchorsToHome?: boolean } = {}) {
  const t = await getTranslations('footer');
  const tLocaleSwitcher = await getTranslations('localeSwitcher');
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
              className="pw-link inline-flex shrink-0 text-[var(--pw-text-dim)]"
            >
              <ProMallMark size={28} />
            </Link>

            <EnamadSeal label={t('enamadLabel')} alt={t('enamadAlt')} />
          </div>

          <div className="flex flex-col gap-12 min-[810px]:flex-row min-[810px]:gap-24">
            {columns.map((column, columnIndex) => {
              const titleId = `footer-column-${columnIndex}`;

              return (
                <nav key={column.title} aria-labelledby={titleId}>
                  <p id={titleId} className="text-sm font-normal text-[var(--pw-cream)]">
                    {column.title}
                  </p>
                  <ul className="mt-6 flex flex-col gap-[14px]">
                    {column.links.map((link, linkIndex) => {
                      const className =
                        columnIndex === 0 && linkIndex === 0
                          ? 'pw-link text-sm text-[var(--pw-cream)]'
                          : 'pw-link text-sm text-[var(--pw-text-dim)]';

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
          <div className="flex flex-col gap-6 min-[810px]:flex-row min-[810px]:items-center min-[810px]:gap-8">
            <p className="pw-micro">{t('copyright')}</p>
            <LocaleSwitcher label={tLocaleSwitcher('label')} />
          </div>

          <ul aria-label={t('socialLabel')} className="flex items-center gap-6">
            {socialChannels.map(({ name, href, Icon }) => (
              <li key={name}>
                <a
                  href={href}
                  aria-label={name}
                  target="_blank"
                  rel="noreferrer"
                  className="pw-link inline-flex text-[var(--pw-text-faint)]"
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
