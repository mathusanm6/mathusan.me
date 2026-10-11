import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { findCategory, type Category } from './categories';

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts');
const PUBLIC_DIR = path.join(process.cwd(), 'public');

export interface PostMeta {
  slug: string;
  title: string;
  /** ISO date, YYYY-MM-DD */
  date: string;
  summary: string;
  category: Category;
  /** Public URL of the cover image, only set when the file exists. */
  cover?: string;
  readingMinutes: number;
  draft: boolean;
}

export interface Post extends PostMeta {
  content: string;
}

function toIsoDate(value: unknown, file: string): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}/.test(value)) {
    return value.slice(0, 10);
  }
  throw new Error(`[${file}] frontmatter "date" must look like 2026-10-11`);
}

function readingMinutes(markdown: string): number {
  const words = markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/[`*_>#\-[\]()!]/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

function parsePost(file: string): Post {
  const slug = file.replace(/\.md$/, '');
  const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8');
  const { data, content } = matter(raw);

  if (typeof data.title !== 'string') {
    throw new Error(`[${file}] frontmatter "title" is required`);
  }
  const category = findCategory(String(data.category ?? ''));
  if (!category) {
    throw new Error(
      `[${file}] unknown category "${data.category}". Add it to src/lib/categories.ts or fix the frontmatter.`,
    );
  }

  let cover: string | undefined;
  if (typeof data.cover === 'string' && data.cover) {
    const onDisk = path.join(PUBLIC_DIR, data.cover.replace(/^\//, ''));
    if (fs.existsSync(onDisk)) cover = data.cover;
  }

  return {
    slug,
    title: data.title,
    date: toIsoDate(data.date, file),
    summary: typeof data.summary === 'string' ? data.summary : '',
    category,
    cover,
    readingMinutes: readingMinutes(content),
    draft: data.draft === true,
    content,
  };
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  const includeDrafts = process.env.NODE_ENV !== 'production';
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.md'))
    .map(parsePost)
    .filter((p) => includeDrafts || !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function getPostsByCategory(categorySlug: string): Post[] {
  return getAllPosts().filter((p) => p.category.slug === categorySlug);
}

export function groupByYear(posts: Post[]): { year: string; posts: Post[] }[] {
  const map = new Map<string, Post[]>();
  for (const post of posts) {
    const year = post.date.slice(0, 4);
    map.set(year, [...(map.get(year) ?? []), post]);
  }
  return [...map.entries()].map(([year, list]) => ({ year, posts: list }));
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${iso}T00:00:00Z`));
}
