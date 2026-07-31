import type { Metadata } from 'next';
import Link from 'next/link';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Reveal } from '@/components/Reveal';
import { EyebrowPill } from '@/components/ui/Primitives';
import { ArrowLeftIcon, ProMallMark } from '@/components/icons';
import { DemoRequestForm, type DemoFormLabels } from '@/components/DemoRequestForm';
import { locales, defaultLocale } from '@/i18n/config';
import { localizeDigits } from '@/lib/demo-form';

const STEP_KEYS = ['call', 'demo', 'launch'] as const;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'demo' });

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    robots: { index: false, follow: true },
  };
}

export default async function DemoPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('demo');

  const homeHref = locale === defaultLocale ? '/' : `/${locale}`;

  const labels: DemoFormLabels = {
    formTitle: t('formTitle'),
    formSubtitle: t('formSubtitle'),
    phoneLabel: t('phoneLabel'),
    phonePlaceholder: t('phonePlaceholder'),
    phoneError: t('phoneError'),
    instagramLabel: t('instagramLabel'),
    instagramPlaceholder: t('instagramPlaceholder'),
    instagramError: t('instagramError'),
    sendCode: t('sendCode'),
    sendingCode: t('sendingCode'),
    codeTitle: t('codeTitle'),
    codeSubtitle: t('codeSubtitle'),
    codeLabel: t('codeLabel'),
    codePlaceholder: t('codePlaceholder'),
    codeError: t('codeError'),
    codeExpiredError: t('codeExpiredError'),
    editPhone: t('editPhone'),
    resend: t('resend'),
    resendCountdown: t('resendCountdown'),
    submit: t('submit'),
    submitting: t('submitting'),
    rateLimitError: t('rateLimitError'),
    sendFailedError: t('sendFailedError'),
    submitError: t('submitError'),
    privacyNote: t('privacyNote'),
    successTitle: t('successTitle'),
    successSubtitle: t('successSubtitle'),
    successPhoneLabel: t('successPhoneLabel'),
    successHandleLabel: t('successHandleLabel'),
    successCta: t('successCta'),
  };

  return (
    <div className="pw-section flex min-h-[100svh] flex-col pb-20">
      <header className="pw-container flex items-center justify-between pt-10">
        <Link
          href={homeHref}
          aria-label={t('badge')}
          className="pw-link inline-flex text-[var(--pw-text-dim)]"
        >
          <ProMallMark size={26} />
        </Link>
        <Link href={homeHref} className="pw-link pw-small inline-flex items-center gap-2">
          <ArrowLeftIcon width={16} height={16} className="rtl:-scale-x-100" />
          {t('backHome')}
        </Link>
      </header>

      <main className="pw-container flex flex-1 items-center pt-20 min-[811px]:pt-28">
        <div className="grid w-full grid-cols-1 items-start gap-14 min-[811px]:grid-cols-[1fr_minmax(0,420px)] min-[811px]:gap-20">
          <div>
            <Reveal>
              <EyebrowPill label={t('badge')} />
              <h1 className="pw-h1 mt-6 max-w-[16ch] text-balance">
                {t('titleLine1')}
                <span className="pw-h2-dim"> {t('titleLine2')}</span>
              </h1>
              <p className="pw-body mt-5 max-w-[42ch] text-[var(--pw-text-dim)]">
                {t('subtitle')}
              </p>
            </Reveal>

            <Reveal className="mt-14" delay={0.1}>
              <ol className="relative flex flex-col gap-8 ps-8">
                <span aria-hidden className="absolute inset-y-2 start-[3px] w-px bg-[var(--pw-line)]" />
                {STEP_KEYS.map((key, index) => (
                  <li key={key} className="relative">
                    <span
                      aria-hidden
                      className="absolute -start-8 top-[7px] size-[7px] rounded-full bg-[var(--pw-gold)] ring-4 ring-[var(--pw-black)]"
                    />
                    <span className="pw-num block text-[11px] text-[var(--pw-text-faint)]">
                      {localizeDigits(String(index + 1).padStart(2, '0'), locale)}
                    </span>
                    <h2 className="mt-1.5 text-base text-[var(--pw-cream)]">
                      {t(`steps.${key}.title`)}
                    </h2>
                    <p className="pw-small mt-1 max-w-[40ch]">{t(`steps.${key}.description`)}</p>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>

          <Reveal delay={0.08}>
            <DemoRequestForm labels={labels} locale={locale} homeHref={homeHref} />
          </Reveal>
        </div>
      </main>
    </div>
  );
}
