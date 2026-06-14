import type React from "react";
import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Analytics } from "@vercel/analytics/next";
import {
  locales,
  defaultLocale,
  localeDirection,
  type Locale,
} from "@/i18n/config";
import { StructuredData } from "@/components/structured-data";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const estedaad = localFont({
  src: [
    {
      path: "../../public/fonts/estedaad.woff2",
      style: "normal",
    },
    {
      path: "../../public/fonts/estedaad.ttf",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-estedaad",
  adjustFontFallback: "Arial",
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

const SITE_URL = "https://promall.io";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#f6f7f9",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages();
  const metadata = messages.metadata as { title: string; description: string };

  const localePath = locale === defaultLocale ? "" : `/${locale}`;
  const canonical = `${SITE_URL}${localePath || "/"}`;

  const languages: Record<string, string> = {};
  for (const candidate of locales) {
    const path = candidate === defaultLocale ? "/" : `/${candidate}`;
    languages[candidate] = `${SITE_URL}${path}`;
  }
  languages["x-default"] = languages[defaultLocale];

  return {
    metadataBase: new URL(SITE_URL),
    title: metadata.title,
    description: metadata.description,
    applicationName: "ProMall",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
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
      icon: "/icon.svg",
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
      className={
        locale === "fa" ? `${estedaad.variable} font-sans` : inter.variable
      }
    >
      <body
        className={locale === "fa" ? "font-sans antialiased" : "antialiased"}
        style={
          locale === "en"
            ? {
                fontFamily:
                  'var(--font-inter), ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              }
            : undefined
        }
      >
        <StructuredData locale={locale} />
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
