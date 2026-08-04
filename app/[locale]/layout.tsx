import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Inter, Fragment_Mono } from 'next/font/google';
import { getTranslations } from 'next-intl/server';
import { locales, localeDirection, type Locale } from '@/i18n/config';
import { SmoothScroll } from '@/components/SmoothScroll';
import { PageviewTracker } from '@/components/PageviewTracker';
import { absoluteUrl, pageAlternates, robotsForLocale, SITE_NAME, SITE_URL } from '@/lib/site';
import { GOOGLE_SITE_VERIFICATION } from '@/lib/seo-config';
import {
  defaultTheme,
  PAGE_BACKGROUND,
  THEME_ATTRIBUTE,
  THEME_BOOTSTRAP_SCRIPT,
} from '@/lib/theme';
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

const ESTEDAD_FONT_URL = '/fonts/estedaad.woff2';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  const ogImage = {
    url: locale === 'fa' ? '/og.png' : '/og-en.png',
    width: 1200,
    height: 630,
    alt: t('title'),
  };

  const siteName = locale === 'fa' ? SITE_NAME.fa : SITE_NAME.en;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t('title'),
      template: `%s | ${siteName}`,
    },
    description: t('description'),
    keywords: t.raw('keywords') as string[],
    applicationName: siteName,
    category: locale === 'fa' ? 'مدیریت آنلاین شاپ' : 'Online shop management',
    authors: [{ name: siteName, url: SITE_URL }],
    creator: siteName,
    publisher: siteName,
    formatDetection: { telephone: false, address: false, email: false },
    alternates: pageAlternates(locale, '/'),
    robots: robotsForLocale(locale),
    verification: GOOGLE_SITE_VERIFICATION ? { google: GOOGLE_SITE_VERIFICATION } : undefined,
    openGraph: {
      type: 'website',
      siteName,
      locale: locale === 'fa' ? 'fa_IR' : 'en_US',
      url: absoluteUrl(locale, '/'),
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
  themeColor: PAGE_BACKGROUND[defaultTheme],
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
      className={`${inter.variable} ${fragmentMono.variable}`}
      {...{ [THEME_ATTRIBUTE]: defaultTheme }}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOTSTRAP_SCRIPT }} />
      </head>
      <body>
        <link
          rel="preload"
          href={ESTEDAD_FONT_URL}
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <NextIntlClientProvider locale={locale} messages={{}}>
          <SmoothScroll />
          <PageviewTracker locale={locale} />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
