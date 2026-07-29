import { getLocale, getTranslations } from 'next-intl/server';
import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/ui/Primitives';
import type { DmMessage, DmStep, DmThreadChrome } from '@/types/content';
import { InstagramThread } from './InstagramThread';

export async function InstagramDemo() {
  const locale = await getLocale();
  const t = await getTranslations('sections.instagram');

  return (
    <section id="instagram" className="pw-section">
      <div className="pw-container pw-section-top">
        <Reveal>
          <SectionHeading
            eyebrow={t('eyebrow')}
            lead={t('titleLead')}
            trail={t('titleTrail')}
            description={t('description')}
          />
        </Reveal>

        <Reveal className="mt-20" delay={0.1}>
          <InstagramThread
            script={t.raw('script') as DmMessage[]}
            steps={t.raw('steps') as DmStep[]}
            chrome={t.raw('chrome') as DmThreadChrome}
            locale={locale}
          />
        </Reveal>
      </div>
    </section>
  );
}
