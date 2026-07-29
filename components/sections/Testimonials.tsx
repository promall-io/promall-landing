import { getTranslations } from 'next-intl/server';
import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/ui/Primitives';
import { TestimonialsCarousel } from '@/components/sections/TestimonialsCarousel';
import type { Testimonial } from '@/types/content';

export async function Testimonials() {
  const t = await getTranslations('sections.testimonials');
  const items = t.raw('items') as Testimonial[];

  return (
    <section id="testimonials" className="pw-section pw-section-top">
      <div className="pw-container flex flex-col gap-16">
        <Reveal>
          <SectionHeading
            eyebrow={t('eyebrow')}
            lead={t('titleLead')}
            trail={t('titleTrail')}
            dimTrail={false}
            description={t('description')}
          />
        </Reveal>
        <Reveal delay={0.12}>
          <TestimonialsCarousel
            items={items}
            prevLabel={t('prevLabel')}
            nextLabel={t('nextLabel')}
          />
        </Reveal>
      </div>
    </section>
  );
}
