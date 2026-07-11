import type { MetadataRoute } from "next";
import { defaultLocale, indexedLocales } from "@/i18n/config";

const SITE_URL = "https://promall.io";

const ROUTES = [""] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const route of ROUTES) {
    for (const locale of indexedLocales) {
      const localePrefix = locale === defaultLocale ? "" : `/${locale}`;
      const url = `${SITE_URL}${localePrefix}${route}`;

      const languages: Record<string, string> = {};
      for (const candidate of indexedLocales) {
        const candidatePrefix = candidate === defaultLocale ? "" : `/${candidate}`;
        languages[candidate] = `${SITE_URL}${candidatePrefix}${route}`;
      }

      entries.push({
        url,
        lastModified: now,
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? (locale === defaultLocale ? 1.0 : 0.8) : 0.5,
        alternates: { languages },
      });
    }
  }

  return entries;
}
