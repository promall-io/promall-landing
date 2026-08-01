import { absoluteUrl, SITE_NAME, SITE_URL } from '@/lib/site';
import { countWords, readingMinutes } from '@/lib/blog';
import { BLOG_PATH } from '@/lib/routes';
import type { Article } from '@/types/blog';

type JsonValue = Record<string, unknown>;

function JsonLd({ graph }: { graph: JsonValue[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(
          /</g,
          '\\u003c',
        ),
      }}
    />
  );
}

function brandName(locale: string) {
  return locale === 'fa' ? SITE_NAME.fa : SITE_NAME.en;
}

function breadcrumb(
  locale: string,
  trail: Array<{ name: string; path: string }>,
  id: string,
): JsonValue {
  return {
    '@type': 'BreadcrumbList',
    '@id': id,
    itemListElement: trail.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(locale, item.path),
    })),
  };
}

export function BlogIndexStructuredData({
  locale,
  title,
  description,
  articles,
  homeLabel,
  blogLabel,
}: {
  locale: string;
  title: string;
  description: string;
  articles: Article[];
  homeLabel: string;
  blogLabel: string;
}) {
  const pageUrl = absoluteUrl(locale, BLOG_PATH);
  const inLanguage = locale === 'fa' ? 'fa-IR' : 'en-US';

  return (
    <JsonLd
      graph={[
        {
          '@type': 'Blog',
          '@id': `${pageUrl}#blog`,
          name: title,
          description,
          url: pageUrl,
          inLanguage,
          publisher: { '@id': `${SITE_URL}/#organization` },
          isPartOf: { '@id': `${SITE_URL}/#website` },
          blogPost: articles.map((article) => ({
            '@type': 'BlogPosting',
            '@id': `${absoluteUrl(locale, `${BLOG_PATH}/${article.slug}`)}#article`,
            headline: article.title,
            url: absoluteUrl(locale, `${BLOG_PATH}/${article.slug}`),
            datePublished: article.publishedIso,
            dateModified: article.modifiedIso,
            image: `${SITE_URL}${article.image}`,
            author: { '@id': `${SITE_URL}/#organization` },
          })),
        },
        breadcrumb(
          locale,
          [
            { name: homeLabel, path: '/' },
            { name: blogLabel, path: BLOG_PATH },
          ],
          `${pageUrl}#breadcrumb`,
        ),
      ]}
    />
  );
}

export function ArticleStructuredData({
  locale,
  article,
  homeLabel,
  blogLabel,
}: {
  locale: string;
  article: Article;
  homeLabel: string;
  blogLabel: string;
}) {
  const pageUrl = absoluteUrl(locale, `${BLOG_PATH}/${article.slug}`);
  const inLanguage = locale === 'fa' ? 'fa-IR' : 'en-US';

  const graph: JsonValue[] = [
    {
      '@type': 'BlogPosting',
      '@id': `${pageUrl}#article`,
      headline: article.title,
      alternativeHeadline: article.metaTitle,
      description: article.description,
      url: pageUrl,
      mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
      inLanguage,
      datePublished: article.publishedIso,
      dateModified: article.modifiedIso,
      wordCount: countWords(article),
      timeRequired: `PT${readingMinutes(article)}M`,
      keywords: article.keywords.join(', '),
      articleSection: article.category,
      image: {
        '@type': 'ImageObject',
        url: `${SITE_URL}${article.image}`,
        caption: article.imageAlt,
      },
      author: { '@id': `${SITE_URL}/#organization` },
      publisher: { '@id': `${SITE_URL}/#organization` },
      isPartOf: { '@id': `${absoluteUrl(locale, BLOG_PATH)}#blog` },
      about: {
        '@type': 'Thing',
        name: locale === 'fa' ? 'مدیریت آنلاین شاپ' : 'Online shop management',
      },
      mentions: { '@id': `${SITE_URL}/#software` },
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['h1', '[data-speakable]'],
      },
    },
    breadcrumb(
      locale,
      [
        { name: homeLabel, path: '/' },
        { name: blogLabel, path: BLOG_PATH },
        { name: article.title, path: `${BLOG_PATH}/${article.slug}` },
      ],
      `${pageUrl}#breadcrumb`,
    ),
  ];

  if (article.faq.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${pageUrl}#faq`,
      inLanguage,
      name: `${article.title} — ${brandName(locale)}`,
      mainEntity: article.faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    });
  }

  return <JsonLd graph={graph} />;
}
