export type FeatureTab = {
  id: string;
  label: string;
  caption: string;
  image: string;
  alt: string;
};

export type WhyCard = {
  title: string;
  description: string;
  illustration: string;
};

export type AboutCard = {
  eyebrow: string;
  title: string;
  description: string;
  footnote: string;
  image: string;
  alt: string;
};

export type IntegrationFeature = {
  title: string;
  description: string;
  icon: 'plug' | 'bolt' | 'shield' | 'trend';
};

export type ChangelogEntry = {
  title: string;
  description: string;
  date: string;
};

export type StatCard = {
  value: string;
  unit: string;
  description: string;
  tag: string;
  image: string;
};

export type MiniStat = {
  value: string;
  description: string;
  icon: 'gauge' | 'checkCircle' | 'spark' | 'clock';
};

export type PricingFeature = {
  label: string;
  included: boolean;
};

export type PricingPlan = {
  id: string;
  name: string;
  price: string;
  yearlyPrice: string;
  period: string;
  description: string;
  cta: string;
  meta: string[];
  features: PricingFeature[];
  featured: boolean;
  hasToggle: boolean;
};

export type FaqCategory = {
  id: string;
  label: string;
  items: { question: string; answer: string }[];
};

export type DmOrderCard = {
  title: string;
  meta: string;
  price: string;
  action: string;
};

export type DmMessage = {
  from: 'customer' | 'assistant';
  step: number;
  text?: string;
  card?: DmOrderCard;
};

export type DmStep = {
  title: string;
  description: string;
};

export type DmThreadChrome = {
  contact: string;
  presence: string;
  avatarInitial: string;
  autoReply: string;
  dayStamp: string;
  composer: string;
  seen: string;
  liveLabel: string;
};

export type NavLink = {
  label: string;
  href: string;
};

export type FooterColumn = {
  title: string;
  links: NavLink[];
};
