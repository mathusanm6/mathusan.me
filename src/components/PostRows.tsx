import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Post } from '@/lib/posts';
import { CategoryLabel } from './CategoryChip';

export default function PostRows({ posts }: { posts: Post[] }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.slug}>
          <Link
            href={`/blog/${post.slug}/`}
            className="group grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-1.5 border-b border-line py-5 md:grid-cols-[1fr_11.5rem_auto]"
          >
            <span className="text-[15px] font-medium leading-snug transition-colors group-hover:text-muted">
              {post.title}
            </span>
            <span className="hidden md:inline-flex">
              <CategoryLabel category={post.category} />
            </span>
            <ArrowUpRight
              className="size-4 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg"
              aria-hidden
            />
            <span className="md:hidden">
              <CategoryLabel category={post.category} />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
