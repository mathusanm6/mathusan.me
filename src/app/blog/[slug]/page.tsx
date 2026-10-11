import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { CategoryPill } from '@/components/CategoryChip';
import CodeCopy from '@/components/CodeCopy';
import Cover from '@/components/Cover';
import ReadingProgress from '@/components/ReadingProgress';
import { renderMarkdown } from '@/lib/markdown';
import { formatDate, getAllPosts, getPost } from '@/lib/posts';
import { SITE } from '@/lib/site';

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const url = `/blog/${post.slug}/`;
  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: post.title,
      description: post.summary,
      publishedTime: post.date,
      authors: [SITE.name],
      tags: [post.category.name],
      ...(post.cover ? { images: [{ url: post.cover }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      ...(post.cover ? { images: [post.cover] } : {}),
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const html = await renderMarkdown(post.content);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.summary,
    datePublished: post.date,
    author: { '@type': 'Person', name: SITE.name, url: SITE.url },
    mainEntityOfPage: `${SITE.url}/blog/${post.slug}/`,
    ...(post.cover ? { image: `${SITE.url}${post.cover}` } : {}),
  };

  return (
    <article className="px-6">
      <ReadingProgress targetId="article-body" />
      <CodeCopy targetId="article-body" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="mx-auto max-w-[680px] pt-6 sm:pt-10">
        <div className="mb-5 flex items-center gap-2 text-xs text-muted">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden>·</span>
          <span>{post.readingMinutes} min read</span>
        </div>
        <h1 className="text-[28px] font-semibold leading-[1.2] tracking-tight sm:text-[34px]">
          {post.title}
        </h1>
        {post.summary && (
          <p className="mt-4 text-[15px] leading-relaxed text-muted sm:text-base">
            {post.summary}
          </p>
        )}
        <div className="mt-5">
          <Link href={`/categories/${post.category.slug}/`}>
            <CategoryPill category={post.category} />
          </Link>
        </div>
      </header>

      <div className="mx-auto mt-10 max-w-[860px]">
        <Cover src={post.cover} alt="" />
      </div>

      <div
        id="article-body"
        className="prose-post mx-auto mt-12 max-w-[680px]"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      <div className="mx-auto mt-16 max-w-[680px] border-t border-line pt-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[13px] text-muted transition-colors hover:text-fg"
        >
          <ArrowLeft className="size-3.5" aria-hidden />
          All posts
        </Link>
      </div>
    </article>
  );
}
