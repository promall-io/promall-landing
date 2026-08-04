import { getTranslations } from 'next-intl/server';
import {
  fetchPlanCatalog,
  monthlyRialRange,
  planMonthlyRial,
  planName,
  type ApiPlan,
} from '@/lib/plans';
import { getArticles } from '@/lib/blog';
import { resolveFaqCategories } from '@/lib/faq-tokens';
import { BLOG_PATH, DEMO_PATH } from '@/lib/routes';
import { absoluteUrl, SITE_NAME, SITE_URL, SOCIAL_PROFILES, SUPPORT_EMAIL } from '@/lib/site';

type FaqCategory = {
  items: Array<{ question: string; answer: string }>;
};

type FeatureTab = {
  label: string;
  caption: string;
};

type InstagramStep = {
  title: string;
  description: string;
};

type JsonValue = Record<string, unknown>;

const TOPIC = {
  fa: 'مدیریت آنلاین شاپ',
  en: 'Online shop management',
} as const;

const RELATED_TOPICS = {
  fa: [
    'مدیریت فروشگاه اینستاگرامی',
    'پاسخ خودکار دایرکت اینستاگرام',
    'مدیریت سفارش و فاکتور',
    'انبارداری و موجودی',
    'گزارش فروش',
  ],
  en: [
    'Instagram shop management',
    'Automated Instagram DM replies',
    'Order and invoice management',
    'Inventory management',
    'Sales reporting',
  ],
} as const;

function planOffer(plan: ApiPlan, name: string, topic: string, pageUrl: string): JsonValue {
  const rial = planMonthlyRial(plan);

  return {
    '@type': 'Offer',
    name,
    url: `${pageUrl}#pricing`,
    priceCurrency: 'IRR',
    availability: 'https://schema.org/InStock',
    eligibleCustomerType: 'https://schema.org/Business',
    category: topic,
    ...(rial === null
      ? {}
      : {
          price: rial,
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: rial,
            priceCurrency: 'IRR',
            billingDuration: 1,
            unitCode: 'MON',
          },
        }),
  };
}

export async function StructuredData({ locale }: { locale: string }) {
  const tMeta = await getTranslations({ locale, namespace: 'metadata' });
  const tFaq = await getTranslations({ locale, namespace: 'sections.faq' });
  const tFeatures = await getTranslations({ locale, namespace: 'sections.features' });
  const tInstagram = await getTranslations({ locale, namespace: 'sections.instagram' });
  const tPricing = await getTranslations({ locale, namespace: 'sections.pricing' });
  const tBlog = await getTranslations({ locale, namespace: 'blog' });

  const isFa = locale === 'fa';
  const key = isFa ? 'fa' : 'en';
  const topic = TOPIC[key];
  const brand = isFa ? SITE_NAME.fa : SITE_NAME.en;
  const pageUrl = absoluteUrl(locale, '/');
  const inLanguage = isFa ? 'fa-IR' : 'en-US';
  const organizationId = `${SITE_URL}/#organization`;
  const websiteId = `${SITE_URL}/#website`;
  const softwareId = `${SITE_URL}/#software`;
  const ogImage = `${SITE_URL}${isFa ? '/og.png' : '/og-en.png'}`;

  const planNames = tPricing.raw('names') as Record<string, string | undefined>;
  const catalog = await fetchPlanCatalog();
  const categories = resolveFaqCategories(
    tFaq.raw('categories') as FaqCategory[],
    catalog,
    locale,
  );
  const priceRange = monthlyRialRange(catalog);
  const featureTabs = tFeatures.raw('tabs') as FeatureTab[];
  const featureList = featureTabs.map((tab) => `${tab.label} — ${tab.caption}`);
  const instagramSteps = tInstagram.raw('steps') as InstagramStep[];
  const articles = getArticles(locale);

  const graph: JsonValue[] = [
    {
      '@type': 'Organization',
      '@id': organizationId,
      name: brand,
      ...(isFa ? { alternateName: SITE_NAME.en } : {}),
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/brand/logo.png`,
        width: 512,
        height: 512,
      },
      image: ogImage,
      description: tMeta('description'),
      slogan: tMeta('title'),
      sameAs: SOCIAL_PROFILES,
      areaServed: { '@type': 'Country', name: 'IR' },
      knowsAbout: [topic, ...RELATED_TOPICS[key]],
      knowsLanguage: ['fa', 'en'],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: SUPPORT_EMAIL,
        availableLanguage: ['fa', 'en'],
      },
    },
    {
      '@type': 'WebSite',
      '@id': websiteId,
      name: brand,
      url: SITE_URL,
      description: tMeta('description'),
      inLanguage,
      publisher: { '@id': organizationId },
    },
    {
      '@type': 'WebPage',
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name: tMeta('title'),
      description: tMeta('description'),
      inLanguage,
      isPartOf: { '@id': websiteId },
      about: { '@id': softwareId },
      primaryImageOfPage: { '@type': 'ImageObject', url: ogImage },
      breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
      mentions: RELATED_TOPICS[key].map((name) => ({ '@type': 'Thing', name })),
      speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.pw-h2'] },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${pageUrl}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: tBlog('homeLabel'), item: pageUrl },
      ],
    },
    {
      '@type': 'SoftwareApplication',
      '@id': softwareId,
      name: brand,
      url: SITE_URL,
      description: tMeta('description'),
      applicationCategory: 'BusinessApplication',
      applicationSubCategory: topic,
      operatingSystem: 'Web',
      browserRequirements: 'Requires JavaScript',
      inLanguage,
      availableLanguage: ['fa', 'en'],
      publisher: { '@id': organizationId },
      image: ogImage,
      screenshot: ogImage,
      ...(isFa ? { featureList } : {}),
      keywords: (tMeta.raw('keywords') as string[]).join(', '),
      audience: {
        '@type': 'BusinessAudience',
        name: isFa ? 'فروشگاه‌های اینستاگرامی و آنلاین شاپ‌ها' : 'Instagram and online shops',
        geographicArea: { '@type': 'Country', name: 'IR' },
      },
      offers: {
        '@type': 'AggregateOffer',
        offerCount: catalog.plans.length,
        priceCurrency: 'IRR',
        ...(priceRange ? { lowPrice: priceRange.low, highPrice: priceRange.high } : {}),
        availability: 'https://schema.org/InStock',
        url: `${pageUrl}#pricing`,
        eligibleCustomerType: 'https://schema.org/Business',
        offers: catalog.plans.map((plan) =>
          planOffer(plan, planNames[plan.id] ?? planName(plan, locale), topic, pageUrl),
        ),
      },
      isAccessibleForFree: false,
      termsOfService: `${SITE_URL}/terms`,
      privacyPolicy: `${SITE_URL}/privacy`,
    },
    {
      '@type': 'Service',
      '@id': `${pageUrl}#service`,
      name: topic,
      serviceType: topic,
      description: tMeta('description'),
      provider: { '@id': organizationId },
      areaServed: { '@type': 'Country', name: 'IR' },
      audience: { '@type': 'BusinessAudience', name: RELATED_TOPICS[key][0] },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: topic,
        itemListElement: featureTabs.map((tab) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: tab.label, description: tab.caption },
        })),
      },
    },
    ...(isFa
      ? [
          {
            '@type': 'ItemList',
            '@id': `${pageUrl}#features`,
            name: `${tFeatures('titleLead')} ${tFeatures('titleTrail')}`,
            itemListOrder: 'https://schema.org/ItemListOrderAscending',
            numberOfItems: featureTabs.length,
            itemListElement: featureTabs.map((tab, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: tab.label,
              description: tab.caption,
            })),
          },
        ]
      : []),
    {
      '@type': 'HowTo',
      '@id': `${pageUrl}#howto`,
      name: isFa
        ? 'چطور آنلاین شاپت رو با پرومال مدیریت کنی'
        : 'How to run your online shop with ProMall',
      description: tInstagram('description'),
      inLanguage,
      totalTime: 'PT10M',
      supply: {
        '@type': 'HowToSupply',
        name: isFa ? 'پیج اینستاگرام و لیست محصولات' : 'An Instagram page and a product list',
      },
      tool: { '@type': 'HowToTool', name: brand },
      step: instagramSteps.map((step, index) => ({
        '@type': 'HowToStep',
        position: index + 1,
        name: step.title,
        text: step.description,
        url: `${pageUrl}#instagram`,
      })),
    },
    {
      '@type': 'FAQPage',
      '@id': `${pageUrl}#faq`,
      inLanguage,
      isPartOf: { '@id': websiteId },
      mainEntity: categories.flatMap((category) =>
        category.items.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      ),
    },
    {
      '@type': 'ItemList',
      '@id': `${absoluteUrl(locale, BLOG_PATH)}#index`,
      name: tBlog('title'),
      numberOfItems: articles.length,
      itemListElement: articles.map((article, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: article.title,
        url: absoluteUrl(locale, `${BLOG_PATH}/${article.slug}`),
      })),
    },
    {
      '@type': 'ContactPage',
      '@id': `${absoluteUrl(locale, DEMO_PATH)}#contact`,
      url: absoluteUrl(locale, DEMO_PATH),
      name: tMeta('title'),
      inLanguage,
      isPartOf: { '@id': websiteId },
    },
  ];

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
