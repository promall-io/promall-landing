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
import { absoluteUrl, languageAlternates, SITE_NAME, SITE_URL } from '@/lib/site';
import { GOOGLE_SITE_VERIFICATION } from '@/lib/seo-config';
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
    alternates: {
      canonical: absoluteUrl(locale, '/'),
      languages: languageAlternates('/'),
    },
    robots: isIndexed
      ? {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-snippet': -1,
            'max-image-preview': 'large',
            'max-video-preview': -1,
          },
        }
      : { index: false, follow: true },
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
