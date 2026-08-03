import type { MetadataRoute } from 'next';
import { defaultLocale } from '@/i18n/config';
import { getArticles, PILLAR_SLUG } from '@/lib/blog';
import { BLOG_PATH, PRIVACY_PATH, TERMS_PATH } from '@/lib/routes';
import { absoluteUrl } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getArticles(defaultLocale);
  const latestModified = articles
    .map((article) => article.modifiedIso)
    .sort()
    .at(-1);

  return [
    {
      url: absoluteUrl(defaultLocale, '/'),
      lastModified: latestModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: absoluteUrl(defaultLocale, BLOG_PATH),
      lastModified: latestModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...articles.map((article) => ({
      url: absoluteUrl(defaultLocale, `${BLOG_PATH}/${article.slug}`),
      lastModified: article.modifiedIso,
      changeFrequency: 'monthly' as const,
      priority: article.slug === PILLAR_SLUG ? 0.9 : 0.7,
    })),
    ...[PRIVACY_PATH, TERMS_PATH].map((path) => ({
      url: absoluteUrl(defaultLocale, path),
      changeFrequency: 'yearly' as const,
      priority: 0.2,
    })),
  ];
}
