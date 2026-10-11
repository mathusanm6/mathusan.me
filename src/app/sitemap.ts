import type { MetadataRoute } from 'next';
import { CATEGORIES } from '@/lib/categories';
import { getAllPosts } from '@/lib/posts';
import { SITE } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const latest = posts[0] ? new Date(posts[0].date) : new Date();

  return [
    { url: `${SITE.url}/`, lastModified: latest },
    { url: `${SITE.url}/about/` },
    { url: `${SITE.url}/categories/` },
    ...CATEGORIES.map((c) => ({ url: `${SITE.url}/categories/${c.slug}/` })),
    ...posts.map((p) => ({
      url: `${SITE.url}/blog/${p.slug}/`,
      lastModified: new Date(p.date),
    })),
  ];
}
