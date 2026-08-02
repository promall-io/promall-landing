import { getTranslations } from 'next-intl/server';
import { EyebrowPill } from '@/components/ui/Primitives';
import { Reveal } from '@/components/Reveal';

export async function Intro() {
  const t = await getTranslations('sections.intro');
  const paragraphs = t.raw('paragraphs') as string[];

  return (
    <section id="intro" className="pw-section">
      <div className="pw-container pw-section-top flex flex-col items-center text-center">
        <Reveal spring>
          <EyebrowPill label={t('eyebrow')} />
        </Reveal>

        <Reveal delay={0.08} className="w-full">
          <h2 className="pw-h2 mx-auto mt-9 max-w-[42ch] text-balance">{t('lead')}</h2>
        </Reveal>

        <Reveal delay={0.16} className="w-full">
          <div className="mx-auto mt-16 grid max-w-[860px] grid-cols-1 gap-x-16 gap-y-10 min-[720px]:grid-cols-2">
            {paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="border-t border-[var(--pw-line)] pt-7 leading-[1.9] text-[var(--pw-text)]"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
