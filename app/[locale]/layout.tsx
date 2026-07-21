import type React from "react";
import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Inter, Instrument_Serif } from "next/font/google";
import localFont from "next/font/local";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Analytics } from "@vercel/analytics/next";
import {
  locales,
  defaultLocale,
  indexedLocales,
  localeDirection,
  type Locale,
} from "@/i18n/config";
import { StructuredData } from "@/components/structured-data";
import { SITE_URL } from "@/lib/site";
import { PageviewTracker } from "@/components/analytics/pageview-tracker";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-instrument",
});

const estedaad = localFont({
  src: "../../public/fonts/estedaad.woff2",
  display: "swap",
  variable: "--font-estedaad",
  adjustFontFallback: "Arial",
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#080d17",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const THEME_INIT_SCRIPT = `(function(){try{var e=document.documentElement;e.style.colorScheme='dark';}catch(e){}})();`;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages();
  const metadata = messages.metadata as { title: string; description: string };

  const localePath = locale === defaultLocale ? "" : `/${locale}`;
  const canonical = `${SITE_URL}${localePath || "/"}`;

  const languages: Record<string, string> = {};
  for (const candidate of indexedLocales) {
    const path = candidate === defaultLocale ? "/" : `/${candidate}`;
    languages[candidate] = `${SITE_URL}${path}`;
  }
  languages["x-default"] = languages[defaultLocale];

  const isIndexable = indexedLocales.includes(locale as Locale);

  return {
    metadataBase: new URL(SITE_URL),
    title: metadata.title,
    description: metadata.description,
    applicationName: "ProMall",
    robots: isIndexable
      ? {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        }
      : {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
          },
        },
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: "ProMall",
      title: metadata.title,
      description: metadata.description,
      locale: locale === "fa" ? "fa_IR" : "en_US",
      alternateLocale: locale === "fa" ? ["en_US"] : ["fa_IR"],
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.title,
      description: metadata.description,
    },
    icons: {
      icon: [
        { url: "/brand/icon.svg", type: "image/svg+xml" },
        { url: "/brand/favicon.png", type: "image/png" },
      ],
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();
  const dir = localeDirection[locale as Locale];

  return (
    <html
      lang={locale}
      dir={dir}
      style={{ colorScheme: "dark" }}
      className={
        locale === "fa"
          ? `${estedaad.variable} ${instrument.variable} font-sans`
          : `${inter.variable} ${instrument.variable}`
      }
    >
      <body className="font-sans antialiased">
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <StructuredData locale={locale} />
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <Analytics />
        <PageviewTracker locale={locale} />
      </body>
    </html>
  );
}
