import { getTranslations } from "next-intl/server";

const SITE_URL = "https://promall.io";

const FAQ_KEYS = [
  "manageShop",
  "whatIsOnlineShop",
  "noTech",
  "withoutAi",
  "howAi",
  "instagramSafe",
  "payments",
  "print",
  "switchPlans",
  "support",
] as const;

type Props = {
  locale: string;
};

export async function StructuredData({ locale }: Props) {
  const tFaq = await getTranslations("faq");
  const tMeta = await getTranslations("metadata");

  const inLanguage = locale === "fa" ? "fa-IR" : "en-US";

  const brandName = locale === "fa" ? "پرومال" : "ProMall";
  const altBrandName = locale === "fa" ? "ProMall" : "پرومال";

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brandName,
    alternateName: altBrandName,
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    inLanguage,
    description: tMeta("description"),
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: brandName,
    url: SITE_URL,
    inLanguage,
    publisher: { "@type": "Organization", name: brandName },
  };

  const application = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: brandName,
    applicationCategory: "BusinessApplication",
    applicationSubCategory:
      locale === "fa" ? "مدیریت آنلاین شاپ" : "Online shop management",
    operatingSystem: "Web browser, Windows",
    inLanguage,
    description: tMeta("description"),
    offers: {
      "@type": "Offer",
      price: "2000000",
      priceCurrency: "IRR",
      name: locale === "fa" ? "پلن حرفه‌ای (ماهانه)" : "Professional (monthly)",
      availability: "https://schema.org/InStock",
    },
    featureList:
      locale === "fa"
        ? [
            "مدیریت آنلاین شاپ اینستاگرام",
            "دایرکت هوشمند با هوش مصنوعی",
            "فروشگاه‌ساز و ویترین آنلاین اختصاصی",
            "مدیریت محصول، واریانت و انبار زنده",
            "مدیریت سفارش، مرجوعی و لینک پرداخت",
            "درگاه پرداخت ایرانی و کارت‌به‌کارت",
            "چاپ خودکار فاکتور روی پرینتر مغازه",
            "گزارش فروش، سود و مشتری",
          ]
        : [
            "Instagram DM AI sales agent",
            "Online store builder & hosted storefront",
            "Products, variants & live inventory",
            "Orders, returns & shareable payment links",
            "Iranian payment gateways & card-to-card",
            "Auto order printing via a Windows agent",
            "Sales, profit & customer analytics",
          ],
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage,
    mainEntity: FAQ_KEYS.map((key) => ({
      "@type": "Question",
      name: tFaq(`items.${key}.question`),
      acceptedAnswer: {
        "@type": "Answer",
        text: tFaq(`items.${key}.answer`),
      },
    })),
  };

  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name:
      locale === "fa"
        ? "مدیریت آنلاین شاپ اینستاگرام"
        : "Instagram online-shop management",
    serviceType:
      locale === "fa"
        ? "نرم‌افزار مدیریت آنلاین شاپ"
        : "Online shop management software",
    provider: { "@type": "Organization", name: brandName, url: SITE_URL },
    areaServed: "IR",
    inLanguage,
    description: tMeta("description"),
  };

  const graph = [organization, website, application, service, faqPage];
  const json = JSON.stringify(graph).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
