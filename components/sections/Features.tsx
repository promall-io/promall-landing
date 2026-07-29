import { getTranslations } from 'next-intl/server';
import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/ui/Primitives';
import type { FeatureTab } from '@/types/content';
import { FeaturesTabs } from './FeaturesTabs';

export async function Features() {
  const t = await getTranslations('sections.features');
  const tabs = t.raw('tabs') as FeatureTab[];

  return (
    <section id="features" className="pw-section pw-section-top">
      <div className="pw-container">
        <Reveal>
          <SectionHeading
            eyebrow={t('eyebrow')}
            lead={t('titleLead')}
            trail={t('titleTrail')}
            description={t('description')}
          />
        </Reveal>
        <Reveal delay={0.1}>
          <FeaturesTabs tabs={tabs} prevLabel={t('prevLabel')} nextLabel={t('nextLabel')} />
        </Reveal>
      </div>
    </section>
  );
}
