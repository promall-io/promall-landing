import Link from 'next/link';
import { getLocale, getTranslations } from 'next-intl/server';
import { DEMO_PATH, localeHref } from '@/lib/routes';
import { defaultLocale, isValidLocale } from '@/i18n/config';
import { PlayIcon } from '@/components/icons';
import { CircleButton } from '@/components/ui/Primitives';
import { Reveal } from '@/components/Reveal';
import { HERO_PARALLAX_RATE } from '@/lib/hero-parallax';
import { HeroParallax } from '@/components/HeroParallax';
import { HeroDashboard } from '@/components/HeroDashboard';
import { HeroLandscape } from '@/components/sections/HeroLandscape';
import { HeroStarfield } from '@/components/sections/HeroStarfield';
import { AnnouncementBar } from '@/components/AnnouncementBar';

const SKY_GRADIENT =
  'radial-gradient(200% 83% at 50% 0, var(--pw-black) 0%, var(--pw-slate-light) 42%, var(--pw-gold-deep) 100%)';

const HERO_RISE = 24;

export async function Hero() {
  const t = await getTranslations('sections.hero');
  const locale = await getLocale();
  const heroLocale = isValidLocale(locale) ? locale : defaultLocale;

  return (
    <section
      id="hero"
      className="pw-section relative isolate overflow-hidden"
      style={{ backgroundImage: SKY_GRADIENT }}
    >
      <HeroStarfield />
      <HeroLandscape />

      <div className="pw-container relative z-10 pt-[120px] text-center">
        <Reveal spring distance={HERO_RISE}>
          <AnnouncementBar />
        </Reveal>

        <Reveal spring distance={HERO_RISE} delay={0.1}>
          <h1 className="pw-h1 mx-auto max-w-[22ch] text-balance max-[380px]:text-[1.9rem]">
            <span className={locale === 'fa' ? 'block whitespace-nowrap' : 'block'}>
              {t('titleLead')}
            </span>
            <span className="block">{t('titleTrail')}</span>
          </h1>
        </Reveal>

        <Reveal spring distance={HERO_RISE} delay={0.2}>
          <p className="mx-auto mt-5 max-w-[38ch] text-sm leading-[1.5] text-[var(--pw-text)]">
            {t('subtitle')}
          </p>
        </Reveal>

        <div className="mt-10 flex items-center justify-center gap-2.5">
          <Reveal spring distance={HERO_RISE} delay={0.3}>
            <Link href={localeHref(locale, DEMO_PATH)} className="pw-button pw-button-primary">
              {t('primaryCta')}
            </Link>
          </Reveal>
          <Reveal spring distance={HERO_RISE} delay={0.4}>
            <CircleButton label={t('playLabel')}>
              <PlayIcon />
            </CircleButton>
          </Reveal>
        </div>

        <HeroParallax
          rate={HERO_PARALLAX_RATE.dashboard}
          className="mt-20 flex justify-center max-[810px]:-mx-6 max-[810px]:mt-14 max-[810px]:justify-start"
        >
          <HeroDashboard alt={t('dashboard.alt')} locale={heroLocale} />
        </HeroParallax>
      </div>
    </section>
  );
}
