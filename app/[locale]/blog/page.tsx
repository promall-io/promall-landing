import type { Metadata } from 'next';
import { ThemedImage } from '@/components/ThemedImage';
import Link from 'next/link';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { locales } from '@/i18n/config';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Reveal } from '@/components/Reveal';
import { EyebrowPill } from '@/components/ui/Primitives';
import { BlogIndexStructuredData } from '@/components/blog/BlogStructuredData';
import { getArticles, readingMinutes } from '@/lib/blog';
import { articleHref, BLOG_PATH, localeHref } from '@/lib/routes';
import { absoluteUrl, pageAlternates, robotsForLocale, SITE_NAME } from '@/lib/site';
import { localizeDigits } from '@/lib/demo-form';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });
  const ogImage = {
    url: locale === 'fa' ? '/og.png' : '/og-en.png',
    width: 1200,
    height: 630,
    alt: t('metaTitle'),
  };

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    keywords: t.raw('keywords') as string[],
    alternates: pageAlternates(locale, BLOG_PATH),
    robots: robotsForLocale(locale),
    openGraph: {
      type: 'website',
      siteName: locale === 'fa' ? SITE_NAME.fa : SITE_NAME.en,
      locale: locale === 'fa' ? 'fa_IR' : 'en_US',
      url: absoluteUrl(locale, BLOG_PATH),
      title: t('metaTitle'),
      description: t('metaDescription'),
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('metaTitle'),
      description: t('metaDescription'),
      images: [ogImage],
    },
  };
}

export default async function BlogIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('blog');
  const articles = getArticles(locale);
  const [featured, ...rest] = articles;

  return (
    <>
      <BlogIndexStructuredData
        locale={locale}
        title={t('title')}
        description={t('metaDescription')}
        articles={articles}
        homeLabel={t('homeLabel')}
        blogLabel={t('blogLabel')}
      />
      <Nav anchorsToHome />
      <main id="main" tabIndex={-1} className="pw-section pb-24">
        <div className="pw-container">
          <Reveal className="pt-28 min-[811px]:pt-[140px]">
            <nav
              aria-label={t('breadcrumbLabel')}
              className="pw-micro -my-3 flex min-h-[var(--pw-touch)] items-center gap-2"
            >
              <Link
                href={localeHref(locale, '/')}
                className="pw-link flex min-h-[var(--pw-touch)] items-center"
              >
                {t('homeLabel')}
              </Link>
              <span aria-hidden>/</span>
              <span className="text-[var(--pw-text-faint)]">{t('blogLabel')}</span>
            </nav>

            <div className="mt-8">
              <EyebrowPill label={t('eyebrow')} />
            </div>
            <h1 className="pw-h1 mt-6 max-w-[24ch] text-balance">{t('title')}</h1>
            <p className="pw-body mt-5 max-w-[56ch] text-[var(--pw-text-dim)]">
              {t('description')}
            </p>
          </Reveal>

          {featured ? (
            <Reveal className="mt-16" delay={0.06}>
              <Link
                href={articleHref(locale, featured.slug)}
                className="pw-card group grid gap-2 overflow-hidden p-2 transition-colors duration-500 ease-[var(--pw-ease)] hover:bg-[var(--pw-surface-2)] min-[810px]:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[14px]">
                  <ThemedImage
                    src={featured.image}
                    alt={featured.imageAlt}
                    fill
                    priority
                    sizes="(max-width: 810px) 100vw, 55vw"
                    className="object-cover transition-transform duration-500 ease-[var(--pw-ease)] group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-col justify-center gap-4 px-6 py-8 min-[810px]:px-10">
                  <span className="pw-micro text-[var(--pw-gold)]">{t('featuredLabel')}</span>
                  <h2 className="pw-h3">{featured.title}</h2>
                  <p className="pw-small">{featured.excerpt}</p>
                  <p className="pw-micro flex flex-wrap items-center gap-2">
                    <span>{featured.category}</span>
                    <span aria-hidden>·</span>
                    <span>{featured.displayDate}</span>
                    <span aria-hidden>·</span>
                    <span>
                      {t('readingTime', {
                        minutes: localizeDigits(String(readingMinutes(featured)), locale),
                      })}
                    </span>
                  </p>
                </div>
              </Link>
            </Reveal>
          ) : null}

          <div className="mt-8 grid grid-cols-1 gap-6 min-[810px]:grid-cols-3">
            {rest.map((article, index) => (
              <Reveal key={article.slug} delay={index * 0.08}>
                <Link
                  href={articleHref(locale, article.slug)}
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
                    <h2 className="line-clamp-3 text-[1.25rem] leading-[1.6] text-[var(--pw-cream)]">
                      {article.title}
                    </h2>
                    <p className="pw-small mt-3 line-clamp-2">{article.excerpt}</p>
                    <p className="pw-micro mt-4 flex flex-wrap items-center gap-2">
                      <span>{article.category}</span>
                      <span aria-hidden>·</span>
                      <span>{article.displayDate}</span>
                      <span aria-hidden>·</span>
                      <span>
                        {t('readingTime', {
                          minutes: localizeDigits(String(readingMinutes(article)), locale),
                        })}
                      </span>
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </main>
      <Footer anchorsToHome />
    </>
  );
}
