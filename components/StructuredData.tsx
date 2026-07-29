import { getTranslations } from 'next-intl/server';
import { SITE_URL } from '@/lib/site';

type FaqCategory = {
  items: Array<{ question: string; answer: string }>;
};

type FeatureTab = {
  label: string;
  caption: string;
};

const RIALS_PER_TOMAN = 10;
const LOWEST_MONTHLY_TOMANS = 199_000;
const HIGHEST_MONTHLY_TOMANS = 999_000;

export async function StructuredData({ locale }: { locale: string }) {
  const tMeta = await getTranslations({ locale, namespace: 'metadata' });
  const tFaq = await getTranslations({ locale, namespace: 'sections.faq' });
  const tPricing = await getTranslations({ locale, namespace: 'sections.pricing' });
  const tFeatures = await getTranslations({ locale, namespace: 'sections.features' });

  const isFa = locale === 'fa';
  const pageUrl = isFa ? SITE_URL : `${SITE_URL}/${locale}`;
  const inLanguage = isFa ? 'fa-IR' : 'en-US';
  const organizationId = `${SITE_URL}/#organization`;
  const websiteId = `${SITE_URL}/#website`;

  const categories = tFaq.raw('categories') as FaqCategory[];
  const plans = tPricing.raw('plans') as Array<{ id: string; name: string }>;
  const featureList = (tFeatures.raw('tabs') as FeatureTab[]).map(
    (tab) => `${tab.label} — ${tab.caption}`,
  );

  const graph = [
    {
      '@type': 'Organization',
      '@id': organizationId,
      name: isFa ? 'پرومال' : 'ProMall',
      alternateName: isFa ? 'ProMall' : 'پرومال',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/brand/logo.png`,
        width: 512,
        height: 512,
      },
      description: tMeta('description'),
      sameAs: ['https://instagram.com/promall.io'],
      areaServed: { '@type': 'Country', name: 'IR' },
      knowsLanguage: ['fa', 'en'],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: 'support@promall.io',
        availableLanguage: ['fa', 'en'],
      },
    },
    {
      '@type': 'WebSite',
      '@id': websiteId,
      name: isFa ? 'پرومال' : 'ProMall',
      url: SITE_URL,
      inLanguage,
      publisher: { '@id': organizationId },
    },
    {
      '@type': 'SoftwareApplication',
      '@id': `${SITE_URL}/#software`,
      name: isFa ? 'پرومال' : 'ProMall',
      url: SITE_URL,
      description: tMeta('description'),
      applicationCategory: 'BusinessApplication',
      applicationSubCategory: isFa ? 'مدیریت آنلاین شاپ' : 'Online shop management',
      operatingSystem: 'Web',
      inLanguage,
      publisher: { '@id': organizationId },
      image: `${SITE_URL}${isFa ? '/og.png' : '/og-en.png'}`,
      featureList,
      audience: {
        '@type': 'BusinessAudience',
        name: isFa ? 'فروشگاه‌های اینستاگرامی و آنلاین شاپ‌ها' : 'Instagram and online shops',
        geographicArea: { '@type': 'Country', name: 'IR' },
      },
      offers: {
        '@type': 'AggregateOffer',
        offerCount: plans.length,
        priceCurrency: 'IRR',
        lowPrice: LOWEST_MONTHLY_TOMANS * RIALS_PER_TOMAN,
        highPrice: HIGHEST_MONTHLY_TOMANS * RIALS_PER_TOMAN,
        availability: 'https://schema.org/InStock',
        url: `${pageUrl}#pricing`,
        eligibleCustomerType: 'https://schema.org/Business',
      },
      isAccessibleForFree: false,
      termsOfService: `${SITE_URL}/terms`,
      privacyPolicy: `${SITE_URL}/privacy`,
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
