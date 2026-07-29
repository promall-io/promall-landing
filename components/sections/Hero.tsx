import Link from 'next/link';
import { getLocale, getTranslations } from 'next-intl/server';
import { DEMO_PATH, localeHref } from '@/lib/routes';
import { PlayIcon } from '@/components/icons';
import { CircleButton } from '@/components/ui/Primitives';
import { Reveal } from '@/components/Reveal';
import { HeroDashboard } from '@/components/HeroDashboard';
import { HeroLandscape } from '@/components/sections/HeroLandscape';
import { AnnouncementBar } from '@/components/AnnouncementBar';

const SKY_GRADIENT =
  'radial-gradient(200% 83% at 50% 0, var(--pw-slate) 0%, var(--pw-slate-light) 42%, var(--pw-rose) 100%)';

export async function Hero() {
  const t = await getTranslations('sections.hero');
  const locale = await getLocale();

  return (
    <section
      id="hero"
      className="pw-section relative isolate overflow-hidden"
      style={{ backgroundImage: SKY_GRADIENT }}
    >
      <HeroLandscape />

      <div className="pw-container relative z-10 pt-[120px] text-center">
        <Reveal spring>
          <AnnouncementBar />
        </Reveal>

        <Reveal delay={0.04}>
          <h1 className="pw-h1 mx-auto max-w-[20ch] text-balance">{t('title')}</h1>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="mx-auto mt-5 max-w-[38ch] text-sm leading-[1.5] text-[var(--pw-text)]">
            {t('subtitle')}
          </p>
        </Reveal>

        <Reveal delay={0.16} className="mt-10 flex items-center justify-center gap-2.5">
          <Link href={localeHref(locale, DEMO_PATH)} className="pw-button pw-button-primary">
            {t('primaryCta')}
          </Link>
          <CircleButton label={t('playLabel')}>
            <PlayIcon />
          </CircleButton>
        </Reveal>

        <Reveal
          delay={0.24}
          className="mt-20 flex justify-center max-[810px]:-mx-6 max-[810px]:mt-14 max-[810px]:justify-start"
        >
          <HeroDashboard alt={t('dashboard.alt')} />
        </Reveal>
      </div>
    </section>
  );
}
