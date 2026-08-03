import { getLocale, getTranslations } from 'next-intl/server';
import { IntroScene } from '@/components/sections/IntroScene';
import type { IntroTiles } from '@/types/content';

export async function Intro() {
  const t = await getTranslations('sections.intro');
  const locale = await getLocale();
  const tiles = t.raw('tiles') as IntroTiles;

  return (
    <section id="intro" className="pw-section">
      <div className="pw-container relative pt-[88px] min-[900px]:pt-[112px]">
        <IntroScene
          eyebrow={t('eyebrow')}
          lead={t('lead')}
          note={t('note')}
          tiles={tiles}
          locale={locale}
        />
      </div>
    </section>
  );
}
