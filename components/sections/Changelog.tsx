import { getTranslations } from 'next-intl/server';
import { ArrowLink, SectionHeading } from '@/components/ui/Primitives';
import { Reveal } from '@/components/Reveal';
import type { ChangelogEntry } from '@/types/content';

function TimelineRail() {
  return (
    <div aria-hidden className="hidden items-center min-[391px]:flex">
      <span className="size-[5px] shrink-0 rounded-full bg-[var(--pw-text-dim)]" />
      <span className="pw-rail flex-1" />
    </div>
  );
}

function ChangelogColumn({ entry }: { entry: ChangelogEntry }) {
  return (
    <li className="relative flex flex-col">
      <span
        aria-hidden
        className="absolute top-2 start-0 -ms-[2px] size-[5px] rounded-full bg-[var(--pw-text-dim)] min-[391px]:hidden"
      />
      <TimelineRail />

      <div className="flex min-h-[130px] flex-col ps-6 min-[391px]:mt-11 min-[391px]:ps-0 min-[391px]:pe-9">
        <h3 className="text-sm leading-[1.5] text-[var(--pw-cream)]">{entry.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-[1.5] text-[var(--pw-text-dim)]">
          {entry.description}
        </p>
        <p className="mt-auto pt-7 text-sm leading-[1.5] text-[var(--pw-text-faint)]">
          {entry.date}
        </p>
      </div>
    </li>
  );
}

export async function Changelog() {
  const t = await getTranslations('sections.changelog');
  const entries = t.raw('entries') as ChangelogEntry[];

  return (
    <section id="changelog" className="pw-section">
      <div className="pw-container pw-section-top flex flex-col gap-16">
        <Reveal>
          <div className="flex flex-col gap-8 min-[810px]:flex-row min-[810px]:items-end min-[810px]:justify-between">
            <SectionHeading eyebrow={t('eyebrow')} lead={t('titleLead')} trail={t('titleTrail')} dimTrail={false} />
            <div className="min-[810px]:pb-1">
              <ArrowLink href="#changelog">{t('linkLabel')}</ArrowLink>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <ul className="grid grid-cols-1 gap-y-10 border-s border-[var(--pw-line)] min-[391px]:grid-cols-2 min-[391px]:gap-y-14 min-[391px]:border-s-0 min-[810px]:grid-cols-4 min-[810px]:gap-y-0">
            {entries.map((entry) => (
              <ChangelogColumn key={entry.title} entry={entry} />
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
