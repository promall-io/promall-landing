import { FA_ARTICLES } from '@/content/blog.fa';
import { EN_ARTICLES } from '@/content/blog.en';
import { defaultLocale, type Locale } from '@/i18n/config';
import type { Article, ArticleBlock } from '@/types/blog';

const WORDS_PER_MINUTE = 200;
const MIN_READING_MINUTES = 2;
const TEHRAN_UTC_OFFSET = '+03:30';
const PUBLISH_HOUR = '09:00:00';

const ARTICLES_BY_LOCALE: Record<Locale, Article[]> = {
  fa: FA_ARTICLES,
  en: EN_ARTICLES,
};

function assertSlugParity(): void {
  const fa = FA_ARTICLES.map((article) => article.slug);
  const en = EN_ARTICLES.map((article) => article.slug);
  const missing = fa.filter((slug) => !en.includes(slug));
  const extra = en.filter((slug) => !fa.includes(slug));

  if (missing.length > 0 || extra.length > 0) {
    throw new Error(
      `Blog slugs diverge between locales — missing in en: [${missing.join(', ')}], missing in fa: [${extra.join(', ')}]`,
    );
  }
}

assertSlugParity();

function resolveLocale(locale: string): Locale {
  return locale in ARTICLES_BY_LOCALE ? (locale as Locale) : defaultLocale;
}

export function getArticles(locale: string): Article[] {
  return ARTICLES_BY_LOCALE[resolveLocale(locale)];
}

export function getArticle(locale: string, slug: string): Article | undefined {
  return getArticles(locale).find((article) => article.slug === slug);
}

export function getRelatedArticles(locale: string, article: Article): Article[] {
  return article.relatedSlugs
    .map((slug) => getArticle(locale, slug))
    .filter((related): related is Article => Boolean(related));
}

function blockText(block: ArticleBlock): string {
  switch (block.kind) {
    case 'list':
    case 'steps':
      return block.items.join(' ');
    case 'table':
      return [...block.head, ...block.rows.flat()].join(' ');
    case 'callout':
      return `${block.title} ${block.text}`;
    default:
      return block.text;
  }
}

export function countWords(article: Article): number {
  return article.blocks.reduce(
    (total, block) => total + blockText(block).split(/\s+/).filter(Boolean).length,
    0,
  );
}

export function readingMinutes(article: Article): number {
  return Math.max(MIN_READING_MINUTES, Math.round(countWords(article) / WORDS_PER_MINUTE));
}

export function articleTimestamp(isoDate: string): string {
  return isoDate.includes('T') ? isoDate : `${isoDate}T${PUBLISH_HOUR}${TEHRAN_UTC_OFFSET}`;
}

export const ARTICLE_SLUGS = FA_ARTICLES.map((article) => article.slug);

export const PILLAR_SLUG = 'modiriat-online-shop';
