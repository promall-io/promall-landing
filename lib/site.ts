export const SITE_URL = 'https://promall.io';

export const SITE_SECTIONS = [
  'hero',
  'intro',
  'instagram',
  'features',
  'why',
  'about',
  'integrations',
  'changelog',
  'numbers',
  'pricing',
  'faq',
  'testimonials',
  'blog',
  'cta',
] as const;

export type SiteSection = (typeof SITE_SECTIONS)[number];
