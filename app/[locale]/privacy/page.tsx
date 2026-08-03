import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { LegalDocument, type LegalSection } from '@/components/LegalDocument';
import { locales } from '@/i18n/config';
import { PRIVACY_PATH } from '@/lib/routes';
import { pageAlternates, robotsForLocale } from '@/lib/site';

const SECTION_IDS = [
  'informationCollected',
  'howWeUse',
  'dataSharing',
  'dataSecurity',
  'dataDeletion',
] as const;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'privacy' });

  return {
    title: t('title'),
    description: t('subtitle'),
    alternates: pageAlternates(locale, PRIVACY_PATH),
    robots: robotsForLocale(locale),
  };
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('privacy');

  const sections: LegalSection[] = SECTION_IDS.map((id) => ({
    id,
    title: t(`sections.${id}.title`),
    content: t.raw(`sections.${id}.content`) as string[],
  }));

  return (
    <LegalDocument
      badge={t('badge')}
      title={t('title')}
      subtitle={t('subtitle')}
      lastUpdatedLabel={t('lastUpdated')}
      lastUpdatedDate={t('lastUpdatedDate')}
      backLabel={t('backToHome')}
      introduction={t('introduction')}
      sections={sections}
      contact={{
        title: t('contact.title'),
        description: t('contact.description'),
        email: t('contact.email'),
      }}
      footerNote={t('footerNote')}
    />
  );
}
