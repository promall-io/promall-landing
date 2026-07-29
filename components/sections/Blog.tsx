import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { ArrowLink, SectionHeading } from '@/components/ui/Primitives';
import { Reveal } from '@/components/Reveal';
import type { BlogPost } from '@/types/content';

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={post.href}
      className="pw-card group block overflow-hidden p-2 transition-colors duration-500 ease-[var(--pw-ease)] hover:bg-[var(--pw-surface-2)]"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[14px]">
        <Image
          src={post.image}
          alt=""
          fill
          sizes="(max-width: 810px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 ease-[var(--pw-ease)] group-hover:scale-[1.03]"
        />
      </div>

      <div className="px-5 pt-5 pb-6">
        <h3 className="line-clamp-3 text-[1.25rem] leading-[1.6] text-[var(--pw-cream)]">
          {post.title}
        </h3>
        <p className="mt-4 flex items-center gap-2 text-sm text-[var(--pw-text-faint)]">
          <span>{post.category}</span>
          <span aria-hidden>·</span>
          <span>{post.date}</span>
        </p>
      </div>
    </Link>
  );
}

export async function Blog() {
  const t = await getTranslations('sections.blog');
  const posts = t.raw('posts') as BlogPost[];

  return (
    <section id="blog" className="pw-section">
      <div className="pw-container pw-section-top flex flex-col gap-12">
        <Reveal>
          <div className="flex flex-col gap-8 min-[810px]:flex-row min-[810px]:items-end min-[810px]:justify-between">
            <SectionHeading eyebrow={t('eyebrow')} lead={t('titleLead')} trail={t('titleTrail')} dimTrail={false} />
            <div className="min-[810px]:pb-1">
              <ArrowLink href="#blog">{t('linkLabel')}</ArrowLink>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 min-[810px]:grid-cols-3">
          {posts.map((post, index) => (
            <Reveal key={post.title} delay={index * 0.08}>
              <BlogCard post={post} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
