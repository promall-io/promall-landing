import type { Metadata } from 'next';
import { ThemedImage } from '@/components/ThemedImage';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { locales } from '@/i18n/config';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Reveal } from '@/components/Reveal';
import { EyebrowPill } from '@/components/ui/Primitives';
import { ArticleBody } from '@/components/blog/ArticleBody';
import { ArticleStructuredData } from '@/components/blog/BlogStructuredData';
import {
  ARTICLE_SLUGS,
  articleTimestamp,
  getArticle,
  getRelatedArticles,
  readingMinutes,
} from '@/lib/blog';
import { articleHref, BLOG_PATH, DEMO_PATH, localeHref } from '@/lib/routes';
import { absoluteUrl, pageAlternates, robotsForLocale, SITE_NAME } from '@/lib/site';
import { localizeDigits } from '@/lib/demo-form';

export function generateStaticParams() {
  return locales.flatMap((locale) => ARTICLE_SLUGS.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = getArticle(locale, slug);

  if (!article) {
    return {};
  }

  const path = `${BLOG_PATH}/${article.slug}`;
  const ogImage = { url: article.image, alt: article.imageAlt };

  return {
    title: article.metaTitle,
    description: article.description,
    keywords: article.keywords,
    alternates: pageAlternates(locale, path),
    robots: robotsForLocale(locale),
    openGraph: {
      type: 'article',
      siteName: locale === 'fa' ? SITE_NAME.fa : SITE_NAME.en,
      locale: locale === 'fa' ? 'fa_IR' : 'en_US',
      url: absoluteUrl(locale, path),
      title: article.metaTitle,
      description: article.description,
      publishedTime: articleTimestamp(article.publishedIso),
      modifiedTime: articleTimestamp(article.modifiedIso),
      section: article.category,
      tags: article.keywords,
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.metaTitle,
      description: article.description,
      images: [ogImage],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const article = getArticle(locale, slug);

  if (!article) {
    notFound();
  }

  const t = await getTranslations('blog');
  const related = getRelatedArticles(locale, article);
  const tocEntries = article.blocks.filter((block) => block.kind === 'heading');

  return (
    <>
      <ArticleStructuredData
        locale={locale}
        article={article}
        homeLabel={t('homeLabel')}
        blogLabel={t('blogLabel')}
      />
      <Nav anchorsToHome />
      <main id="main" tabIndex={-1} className="pw-section pb-24">
        <div className="pw-container">
          <article className="mx-auto w-full max-w-[760px]">
            <Reveal className="pt-28 min-[811px]:pt-[140px]">
              <nav
                aria-label={t('breadcrumbLabel')}
                className="pw-micro -my-3 flex flex-wrap items-center gap-x-2"
              >
                <Link
                  href={localeHref(locale, '/')}
                  className="pw-link flex min-h-[var(--pw-touch)] items-center"
                >
                  {t('homeLabel')}
                </Link>
                <span aria-hidden>/</span>
                <Link
                  href={localeHref(locale, BLOG_PATH)}
                  className="pw-link flex min-h-[var(--pw-touch)] items-center"
                >
                  {t('blogLabel')}
                </Link>
                <span aria-hidden>/</span>
                <span className="text-[var(--pw-text-faint)]">{article.category}</span>
              </nav>

              <div className="mt-8">
                <EyebrowPill label={article.category} />
              </div>
              <h1 className="pw-h1 mt-6 text-balance">{article.title}</h1>
              <p data-speakable className="pw-body mt-5 text-[var(--pw-text-dim)]">
                {article.excerpt}
              </p>
              <p className="pw-micro mt-6 flex flex-wrap items-center gap-2">
                <span>
                  {t('publishedLabel')}: {article.displayDate}
                </span>
                <span aria-hidden>·</span>
                <span>
                  {t('readingTime', {
                    minutes: localizeDigits(String(readingMinutes(article)), locale),
                  })}
                </span>
              </p>
            </Reveal>

            <Reveal className="mt-12" delay={0.06}>
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[20px]">
                <ThemedImage
                  src={article.image}
                  alt={article.imageAlt}
                  fill
                  priority
                  sizes="(max-width: 800px) 100vw, 760px"
                  className="object-cover"
                />
              </div>
            </Reveal>

            {tocEntries.length > 0 ? (
              <Reveal className="mt-12" delay={0.08}>
                <nav aria-label={article.tocLabel} className="pw-card p-6">
                  <p className="text-sm text-[var(--pw-cream)]">{article.tocLabel}</p>
                  <ol className="mt-2 flex flex-col">
                    {tocEntries.map((entry, index) => (
                      <li key={entry.kind === 'heading' ? entry.id : index}>
                        <Link
                          href={`#${entry.kind === 'heading' ? entry.id : ''}`}
                          className="pw-link pw-small flex min-h-[var(--pw-touch)] items-center text-[var(--pw-text-dim)]"
                        >
                          {entry.kind === 'heading' ? entry.text : ''}
                        </Link>
                      </li>
                    ))}
                  </ol>
                </nav>
              </Reveal>
            ) : null}

            <div className="mt-14">
              <ArticleBody blocks={article.blocks} />
            </div>

            {article.faq.length > 0 ? (
              <Reveal className="mt-20">
                <h2 className="pw-h2 text-balance">{article.faqLabel}</h2>
                <div className="mt-8 flex flex-col gap-4">
                  {article.faq.map((item) => (
                    <details key={item.question} className="pw-card p-6">
                      <summary className="cursor-pointer text-base leading-[1.6] text-[var(--pw-cream)] marker:content-['']">
                        {item.question}
                      </summary>
                      <p className="pw-body mt-3 text-[var(--pw-text-dim)]">{item.answer}</p>
                    </details>
                  ))}
                </div>
              </Reveal>
            ) : null}

            <Reveal className="mt-20">
              <section className="pw-card flex flex-col items-start gap-5 p-8 min-[810px]:p-12">
                <h2 className="pw-h3 text-balance">{article.ctaTitle}</h2>
                <p className="pw-small">{article.ctaDescription}</p>
                <Link
                  href={localeHref(locale, DEMO_PATH)}
                  className="pw-button pw-button-primary mt-1"
                >
                  {article.ctaLabel}
                </Link>
              </section>
            </Reveal>

            {related.length > 0 ? (
              <Reveal className="mt-20">
                <h2 className="pw-h3">{t('relatedTitle')}</h2>
                <div className="mt-6 grid grid-cols-1 gap-4 min-[810px]:grid-cols-2">
                  {related.map((item) => (
                    <Link
                      key={item.slug}
                      href={articleHref(locale, item.slug)}
                      className="pw-card block p-6 transition-colors duration-500 ease-[var(--pw-ease)] hover:bg-[var(--pw-surface-2)]"
                    >
                      <p className="pw-micro text-[var(--pw-gold)]">{item.category}</p>
                      <p className="mt-2 text-base leading-[1.6] text-[var(--pw-cream)]">
                        {item.title}
                      </p>
                      <p className="pw-small mt-2 line-clamp-2">{item.excerpt}</p>
                    </Link>
                  ))}
                </div>
              </Reveal>
            ) : null}

            <Reveal className="mt-16">
              <Link
                href={localeHref(locale, BLOG_PATH)}
                className="pw-link pw-small -my-2 inline-flex min-h-[var(--pw-touch)] items-center"
              >
                {t('backToBlog')}
              </Link>
            </Reveal>
          </article>
        </div>
      </main>
      <Footer anchorsToHome />
    </>
  );
}
