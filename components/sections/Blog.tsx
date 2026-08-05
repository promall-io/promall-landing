import { ThemedImage } from '@/components/ThemedImage';
import Link from 'next/link';
import { getLocale, getTranslations } from 'next-intl/server';
import { ArrowLink, SectionHeading } from '@/components/ui/Primitives';
import { Carousel } from '@/components/ui/Carousel';
import { Reveal } from '@/components/Reveal';
import { getArticles } from '@/lib/blog';
import { articleHref, BLOG_PATH, localeHref } from '@/lib/routes';
import type { Article } from '@/types/blog';

function BlogCard({ article, href }: { article: Article; href: string }) {
  return (
    <Link
      href={href}
      className="pw-card group block h-full overflow-hidden p-2 transition-colors duration-500 ease-[var(--pw-ease)] hover:bg-[var(--pw-surface-2)]"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[14px]">
        <ThemedImage
          src={article.image}
          alt={article.imageAlt}
          fill
          sizes="(max-width: 810px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 ease-[var(--pw-ease)] group-hover:scale-[1.03]"
        />
      </div>

      <div className="px-5 pt-5 pb-6">
        <h3 className="line-clamp-3 text-[1.25rem] leading-[1.6] text-[var(--pw-cream)]">
          {article.title}
        </h3>
        <p className="mt-4 flex items-center gap-2 text-sm text-[var(--pw-text-faint)]">
          <span>{article.category}</span>
          <span aria-hidden>·</span>
          <span>{article.displayDate}</span>
        </p>
      </div>
    </Link>
  );
}

export async function Blog() {
  const t = await getTranslations('sections.blog');
  const locale = await getLocale();
  const articles = getArticles(locale).slice(0, 3);

  return (
    <section id="blog" className="pw-section">
      <div className="pw-container pw-section-top flex flex-col gap-12">
        <Reveal>
          <div className="flex flex-col gap-8 min-[810px]:flex-row min-[810px]:items-end min-[810px]:justify-between">
            <SectionHeading
              eyebrow={t('eyebrow')}
              lead={t('titleLead')}
              trail={t('titleTrail')}
              dimTrail={false}
            />
            <div className="min-[810px]:pb-1">
              <ArrowLink href={localeHref(locale, BLOG_PATH)}>{t('linkLabel')}</ArrowLink>
            </div>
          </div>
        </Reveal>

        <Carousel
          label={t('railLabel')}
          railClassName="min-[810px]:mx-0 min-[810px]:grid min-[810px]:grid-cols-3 min-[810px]:gap-6 min-[810px]:overflow-visible min-[810px]:px-0 min-[810px]:snap-none"
          slideClassName="w-[78vw] max-w-[340px] min-[810px]:w-auto min-[810px]:max-w-none"
          dotsClassName="min-[810px]:hidden"
        >
          {articles.map((article, index) => (
            <Reveal key={article.slug} delay={index * 0.08} className="h-full">
              <BlogCard article={article} href={articleHref(locale, article.slug)} />
            </Reveal>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
