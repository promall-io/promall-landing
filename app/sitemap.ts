import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";

const SITE_URL = "https://promall.io";

const ROUTES = ["", "/privacy"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const route of ROUTES) {
    for (const locale of locales) {
      const localePrefix = locale === "en" ? "" : `/${locale}`;
      const url = `${SITE_URL}${localePrefix}${route}`;

      const languages: Record<string, string> = {};
      for (const candidate of locales) {
        const candidatePrefix = candidate === "en" ? "" : `/${candidate}`;
        languages[candidate] = `${SITE_URL}${candidatePrefix}${route}`;
      }

      entries.push({
        url,
        lastModified: now,
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1.0 : 0.5,
        alternates: { languages },
      });
    }
  }

  return entries;
}
