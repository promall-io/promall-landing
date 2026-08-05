import { AppReplica } from '@/components/app-replica';
import { AppReplicaMobile } from '@/components/app-replica-mobile';
import type { Locale } from '@/i18n/config';

/* Two replicas, one shown. A phone is what the visitor is holding, so under
   811px the hero shows the panel as a phone renders it rather than a desktop
   window scaled past legibility — but the choice is CSS, not a media-query
   hook: picking in JS would render the wrong device on the server and swap it
   after hydration, which is exactly the flash the fold cannot afford. */
export function HeroDashboard({ alt, locale }: { alt: string; locale: Locale }) {
  return (
    <>
      <div className="mx-auto w-full max-w-[320px] min-[811px]:hidden">
        <div className="relative rounded-[42px] bg-[var(--pw-surface-2)] p-[6px] ring-1 ring-[var(--pw-line-strong)] shadow-[var(--pw-shadow-device)]">
          <div className="relative aspect-[393/852] w-full overflow-hidden rounded-[36px] ring-1 ring-inset ring-[var(--pw-line)]">
            <span
              aria-hidden
              className="absolute start-1/2 top-[8px] z-30 h-[26px] w-[92px] -translate-x-1/2 rounded-full bg-[var(--ink-deep)] rtl:translate-x-1/2"
            />
            <AppReplicaMobile label={alt} locale={locale} />
          </div>
        </div>
      </div>

      <div className="relative hidden w-full max-w-[1080px] shrink-0 rounded-t-3xl bg-[rgb(var(--surface-card-rgb)/55%)] p-2 ring-1 ring-[var(--pw-line)] backdrop-blur-[24px] min-[811px]:block sm:p-3">
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-px opacity-70"
          style={{
            backgroundImage:
              'linear-gradient(90deg, transparent, var(--pw-cream) 30%, var(--pw-cream) 70%, transparent)',
          }}
        />

        <div className="overflow-hidden rounded-[18px]">
          <div className="relative aspect-[1280/860] w-full">
            <AppReplica label={alt} locale={locale} />
          </div>
        </div>
      </div>
    </>
  );
}
