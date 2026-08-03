import { absoluteUrl, SITE_NAME, SITE_URL, SOCIAL_PROFILES } from '@/lib/site';
import { articleTimestamp, countWords, readingMinutes } from '@/lib/blog';
import { BLOG_PATH } from '@/lib/routes';
import type { Article } from '@/types/blog';

type JsonValue = Record<string, unknown>;

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

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

function publisherNodes(locale: string, inLanguage: string): JsonValue[] {
  const brand = brandName(locale);

  return [
    {
      '@type': 'Organization',
      '@id': ORGANIZATION_ID,
      name: brand,
      ...(locale === 'fa' ? { alternateName: SITE_NAME.en } : {}),
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        '@id': `${SITE_URL}/#logo`,
        url: `${SITE_URL}/brand/logo.png`,
        width: 512,
        height: 512,
        caption: brand,
      },
      image: { '@id': `${SITE_URL}/#logo` },
      sameAs: SOCIAL_PROFILES,
    },
    {
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      name: brand,
      url: SITE_URL,
      inLanguage,
      publisher: { '@id': ORGANIZATION_ID },
    },
  ];
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
        ...publisherNodes(locale, inLanguage),
        {
          '@type': 'Blog',
          '@id': `${pageUrl}#blog`,
          name: title,
          description,
          url: pageUrl,
          inLanguage,
          publisher: { '@id': ORGANIZATION_ID },
          isPartOf: { '@id': WEBSITE_ID },
          blogPost: articles.map((article) => ({
            '@type': 'BlogPosting',
            '@id': `${absoluteUrl(locale, `${BLOG_PATH}/${article.slug}`)}#article`,
            headline: article.title,
            url: absoluteUrl(locale, `${BLOG_PATH}/${article.slug}`),
            datePublished: articleTimestamp(article.publishedIso),
            dateModified: articleTimestamp(article.modifiedIso),
            image: `${SITE_URL}${article.image}`,
            author: { '@id': ORGANIZATION_ID },
            publisher: { '@id': ORGANIZATION_ID },
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

  const blogUrl = absoluteUrl(locale, BLOG_PATH);

  const graph: JsonValue[] = [
    ...publisherNodes(locale, inLanguage),
    {
      '@type': 'Blog',
      '@id': `${blogUrl}#blog`,
      url: blogUrl,
      inLanguage,
      publisher: { '@id': ORGANIZATION_ID },
      isPartOf: { '@id': WEBSITE_ID },
    },
    {
      '@type': 'BlogPosting',
      '@id': `${pageUrl}#article`,
      headline: article.title,
      alternativeHeadline: article.metaTitle,
      description: article.description,
      url: pageUrl,
      mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
      inLanguage,
      datePublished: articleTimestamp(article.publishedIso),
      dateModified: articleTimestamp(article.modifiedIso),
      wordCount: countWords(article),
      timeRequired: `PT${readingMinutes(article)}M`,
      keywords: article.keywords.join(', '),
      articleSection: article.category,
      image: {
        '@type': 'ImageObject',
        url: `${SITE_URL}${article.image}`,
        caption: article.imageAlt,
      },
      author: { '@id': ORGANIZATION_ID },
      publisher: { '@id': ORGANIZATION_ID },
      isPartOf: { '@id': `${blogUrl}#blog` },
      about: {
        '@type': 'Thing',
        name: locale === 'fa' ? 'مدیریت آنلاین شاپ' : 'Online shop management',
      },
      mentions: {
        '@type': 'SoftwareApplication',
        name: brandName(locale),
        url: SITE_URL,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
      },
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
