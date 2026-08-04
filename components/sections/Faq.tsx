import { getLocale, getTranslations } from 'next-intl/server';
import { ArrowLink, SectionHeading } from '@/components/ui/Primitives';
import { Reveal } from '@/components/Reveal';
import { FaqPanel } from '@/components/sections/FaqPanel';
import { resolveFaqCategories } from '@/lib/faq-tokens';
import { fetchPlanCatalog } from '@/lib/plans';
import type { FaqCategory } from '@/types/content';

function FaqContactCard({
  title,
  description,
  cta,
}: {
  title: string;
  description: string;
  cta: string;
}) {
  return (
    <div className="pw-card p-7">
      <p className="pw-h3">{title}</p>
      <p className="mt-3 max-w-[30ch] text-sm leading-[1.85] text-[var(--pw-text-dim)]">
        {description}
      </p>
      <div className="mt-7">
        <ArrowLink href="#cta">{cta}</ArrowLink>
      </div>
    </div>
  );
}

export async function Faq() {
  const t = await getTranslations('sections.faq');
  const locale = await getLocale();
  const catalog = await fetchPlanCatalog();
  const rawCategories = t.raw('categories') as FaqCategory[];
  const categories = resolveFaqCategories(rawCategories, catalog, locale);

  return (
    <section id="faq" className="pw-section">
      <div className="pw-container pw-section-top flex flex-col gap-16">
        <Reveal>
          <SectionHeading
            eyebrow={t('eyebrow')}
            lead={`${t('titleLead')} ${t('titleTrail')}`}
            description={t('description')}
          />
        </Reveal>

        <Reveal delay={0.08}>
          <FaqPanel
            categories={categories}
            contact={
              <FaqContactCard
                title={t('contact.title')}
                description={t('contact.description')}
                cta={t('contact.cta')}
              />
            }
          />
        </Reveal>
      </div>
    </section>
  );
}
