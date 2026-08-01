export type ArticleBlock =
  | { kind: 'paragraph'; text: string }
  | { kind: 'heading'; id: string; text: string }
  | { kind: 'subheading'; text: string }
  | { kind: 'list'; items: string[] }
  | { kind: 'steps'; items: string[] }
  | { kind: 'callout'; title: string; text: string }
  | { kind: 'table'; head: string[]; rows: string[][] };

export type ArticleFaqItem = {
  question: string;
  answer: string;
};

export type Article = {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  excerpt: string;
  keywords: string[];
  category: string;
  displayDate: string;
  publishedIso: string;
  modifiedIso: string;
  image: string;
  imageAlt: string;
  tocLabel: string;
  faqLabel: string;
  blocks: ArticleBlock[];
  faq: ArticleFaqItem[];
  relatedSlugs: string[];
  ctaTitle: string;
  ctaDescription: string;
  ctaLabel: string;
};
