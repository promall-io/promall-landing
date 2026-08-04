import Link from 'next/link';
import { getLocale } from 'next-intl/server';
import { Reveal } from '@/components/Reveal';
import { EyebrowPill } from '@/components/ui/Primitives';
import { ArrowLeftIcon, ProMallMark } from '@/components/icons';
import { localizeDigits } from '@/lib/demo-form';

export type LegalSection = {
  id: string;
  title: string;
  content: string[];
};

type LegalDocumentProps = {
  badge: string;
  title: string;
  subtitle: string;
  lastUpdatedLabel: string;
  lastUpdatedDate: string;
  backLabel: string;
  introduction: string;
  sections: LegalSection[];
  contact: { title: string; description: string; email: string };
  footerNote: string;
};

export async function LegalDocument({
  badge,
  title,
  subtitle,
  lastUpdatedLabel,
  lastUpdatedDate,
  backLabel,
  introduction,
  sections,
  contact,
  footerNote,
}: LegalDocumentProps) {
  const locale = await getLocale();

  return (
    <div className="pw-section pb-24">
      <div className="mx-auto w-full max-w-[760px]">
        <header className="flex items-center justify-between pt-10">
          <Link
            href="/"
            aria-label={badge}
            className="pw-touch-target pw-link relative inline-flex text-[var(--pw-text-dim)]"
          >
            <ProMallMark size={26} />
          </Link>
          <Link
            href="/"
            className="pw-link pw-small -my-2 inline-flex min-h-[var(--pw-touch)] items-center gap-2"
          >
            <ArrowLeftIcon width={16} height={16} className="rtl:-scale-x-100" />
            {backLabel}
          </Link>
        </header>

        <Reveal className="pt-24">
          <EyebrowPill label={badge} />
          <h1 className="pw-h1 mt-6 max-w-[20ch] text-balance">{title}</h1>
          <p className="pw-body mt-5 max-w-[52ch] text-[var(--pw-text-dim)]">{subtitle}</p>
          <p className="pw-micro mt-6">
            {lastUpdatedLabel}: {lastUpdatedDate}
          </p>
        </Reveal>

        <Reveal className="mt-14" delay={0.06}>
          <p className="pw-body border-s-2 border-[var(--pw-gold)] ps-6 text-[var(--pw-text)]">
            {introduction}
          </p>
        </Reveal>

        <div className="mt-20 flex flex-col gap-16">
          {sections.map((section, index) => (
            <Reveal key={section.id} delay={0.04}>
              <section id={section.id}>
                <div className="flex items-baseline gap-4">
                  <span className="pw-num text-sm text-[var(--pw-text-faint)]">
                    {localizeDigits(String(index + 1).padStart(2, '0'), locale)}
                  </span>
                  <h2 className="pw-h3 flex-1">{section.title}</h2>
                </div>

                <div className="pw-rail mt-5" />

                <ul className="mt-6 flex flex-col gap-3.5">
                  {section.content.map((item) => (
                    <li key={item} className="flex gap-3.5">
                      <span
                        aria-hidden
                        className="mt-[11px] h-px w-3 shrink-0 bg-[var(--pw-text-faint)]"
                      />
                      <span className="pw-small text-[var(--pw-text)]">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20" delay={0.06}>
          <div className="pw-card p-8">
            <h2 className="pw-h3">{contact.title}</h2>
            <p className="pw-small mt-3 max-w-[48ch]">{contact.description}</p>
            <a href={`mailto:${contact.email}`} className="pw-button mt-6 pw-latin">
              {contact.email}
            </a>
          </div>
        </Reveal>

        <p className="pw-micro mt-14 text-center">{footerNote}</p>
      </div>
    </div>
  );
}
