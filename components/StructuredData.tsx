import { getTranslations } from 'next-intl/server';
import { SITE_URL } from '@/lib/site';

type FaqCategory = {
  items: Array<{ question: string; answer: string }>;
};

export async function StructuredData({ locale }: { locale: string }) {
  const tMeta = await getTranslations({ locale, namespace: 'metadata' });
  const tFaq = await getTranslations({ locale, namespace: 'sections.faq' });
  const tPricing = await getTranslations({ locale, namespace: 'sections.pricing' });

  const isFa = locale === 'fa';
  const pageUrl = isFa ? SITE_URL : `${SITE_URL}/${locale}`;
  const inLanguage = isFa ? 'fa-IR' : 'en-US';
  const organizationId = `${SITE_URL}/#organization`;
  const websiteId = `${SITE_URL}/#website`;

  const categories = tFaq.raw('categories') as FaqCategory[];
  const freePlan = (tPricing.raw('plans') as Array<{ id: string; name: string }>).find(
    (plan) => plan.id === 'starter',
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
      operatingSystem: 'Web',
      inLanguage,
      publisher: { '@id': organizationId },
      image: `${SITE_URL}${isFa ? '/og.png' : '/og-en.png'}`,
      offers: {
        '@type': 'Offer',
        name: freePlan?.name,
        price: '0',
        priceCurrency: 'IRR',
        availability: 'https://schema.org/InStock',
        url: `${pageUrl}#pricing`,
      },
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
