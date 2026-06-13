import { getTranslations } from "next-intl/server";

const SITE_URL = "https://promall.io";

const FAQ_KEYS = [
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

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ProMall",
    alternateName: "پرومال",
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    description: tMeta("description"),
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ProMall",
    url: SITE_URL,
    inLanguage,
    publisher: { "@type": "Organization", name: "ProMall" },
  };

  const application = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "ProMall",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web browser, Windows",
    inLanguage,
    description: tMeta("description"),
    featureList: [
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

  const graph = [organization, website, application, faqPage];
  const json = JSON.stringify(graph).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
