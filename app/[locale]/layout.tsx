import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Inter, Fragment_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import { getTranslations } from 'next-intl/server';
import { locales, localeDirection, indexedLocales, type Locale } from '@/i18n/config';
import { SmoothScroll } from '@/components/SmoothScroll';
import { PageviewTracker } from '@/components/PageviewTracker';
import { SITE_URL } from '@/lib/site';
import '../globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-inter',
});

const fragmentMono = Fragment_Mono({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-fragment',
});

const estedad = localFont({
  src: '../../public/fonts/estedaad.woff2',
  display: 'swap',
  variable: '--font-estedad',
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  const isIndexed = (indexedLocales as readonly string[]).includes(locale);
  const ogImage = {
    url: locale === 'fa' ? '/og.png' : '/og-en.png',
    width: 1200,
    height: 630,
    alt: t('title'),
  };

  return {
    metadataBase: new URL(SITE_URL),
    title: t('title'),
    description: t('description'),
    keywords: t.raw('keywords') as string[],
    applicationName: locale === 'fa' ? 'پرومال' : 'ProMall',
    alternates: {
      canonical: locale === 'fa' ? '/' : `/${locale}`,
      languages: Object.fromEntries(locales.map((item) => [item, item === 'fa' ? '/' : `/${item}`])),
    },
    robots: isIndexed ? { index: true, follow: true } : { index: false, follow: true },
    openGraph: {
      type: 'website',
      siteName: locale === 'fa' ? 'پرومال' : 'ProMall',
      locale: locale === 'fa' ? 'fa_IR' : 'en_US',
      url: locale === 'fa' ? SITE_URL : `${SITE_URL}/${locale}`,
      title: t('title'),
      description: t('description'),
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: [ogImage],
    },
  };
}

export const viewport: Viewport = {
  themeColor: '#000000',
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!(locales as readonly string[]).includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const direction = localeDirection[locale as Locale];

  return (
    <html
      lang={locale}
      dir={direction}
      className={`${inter.variable} ${fragmentMono.variable} ${estedad.variable}`}
      suppressHydrationWarning
    >
      <body>
        <NextIntlClientProvider locale={locale} messages={{}}>
          <SmoothScroll />
          <PageviewTracker locale={locale} />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
