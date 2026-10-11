import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import PostRows from '@/components/PostRows';
import { CATEGORIES } from '@/lib/categories';
import { getPostsByCategory, groupByYear } from '@/lib/posts';

export const dynamicParams = false;

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = CATEGORIES.find((c) => c.slug === slug);
  if (!cat) return {};
  return {
    title: cat.name,
    description: cat.description,
    alternates: { canonical: `/categories/${cat.slug}/` },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const cat = CATEGORIES.find((c) => c.slug === slug);
  if (!cat) notFound();

  const years = groupByYear(getPostsByCategory(cat.slug));
  const Icon = cat.icon;

  return (
    <div className="mx-auto w-full max-w-[860px] px-6 pt-6 sm:pt-12">
      <Link
        href="/categories/"
        className="mb-8 inline-flex items-center gap-2 text-[13px] text-muted transition-colors hover:text-fg"
      >
        <ArrowLeft className="size-3.5" aria-hidden />
        Categories
      </Link>
      <h1 className="flex items-center gap-3 text-[28px] font-medium tracking-tight sm:text-[32px]">
        <Icon className="size-6 text-muted" aria-hidden />
        {cat.name}
      </h1>
      <p className="mb-12 mt-3 max-w-md text-sm leading-relaxed text-muted">
        {cat.description}
      </p>

      {years.length === 0 ? (
        <p className="border-t border-line py-10 text-sm text-muted">
          Nothing here yet.
        </p>
      ) : (
        years.map(({ year, posts }) => (
          <section
            key={year}
            className="grid border-t border-line md:grid-cols-[11.5rem_1fr]"
          >
            <h2 className="pt-5 text-sm md:py-5">{year}</h2>
            <PostRows posts={posts} />
          </section>
        ))
      )}
    </div>
  );
}
