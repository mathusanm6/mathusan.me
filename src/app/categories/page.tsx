import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { CATEGORIES } from '@/lib/categories';
import { getAllPosts } from '@/lib/posts';

export const metadata: Metadata = {
  title: 'Categories',
  description: 'Browse posts by category.',
  alternates: { canonical: '/categories/' },
};

export default function CategoriesPage() {
  const posts = getAllPosts();
  return (
    <div className="mx-auto w-full max-w-[860px] px-6 pt-6 sm:pt-12">
      <h1 className="mb-10 text-[28px] font-medium tracking-tight sm:text-[32px]">
        Categories
      </h1>
      <ul className="border-t border-line">
        {CATEGORIES.map((cat) => {
          const count = posts.filter((p) => p.category.slug === cat.slug).length;
          const Icon = cat.icon;
          return (
            <li key={cat.slug}>
              <Link
                href={`/categories/${cat.slug}/`}
                className="group grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-1 border-b border-line py-5 md:grid-cols-[1fr_6rem_auto]"
              >
                <span className="flex items-center gap-3 text-[15px] font-medium transition-colors group-hover:text-muted">
                  <Icon className="size-4 text-muted" aria-hidden />
                  {cat.name}
                </span>
                <span className="hidden text-[13px] text-muted md:block">
                  {count} {count === 1 ? 'post' : 'posts'}
                </span>
                <ArrowUpRight
                  className="size-4 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg"
                  aria-hidden
                />
                <span className="text-[13px] text-muted md:hidden">
                  {cat.description}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
