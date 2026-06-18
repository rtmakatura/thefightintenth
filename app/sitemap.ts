import type { MetadataRoute } from 'next';

import { sanityFetch } from '@/lib/sanity/fetch';

export const revalidate = 3600;

const BASE = 'https://www.thefightintenth.com';

type ChangeFreq = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
type RouteConfig = { path: string; changeFrequency: ChangeFreq; priority: number };

const ROUTES: RouteConfig[] = [
  { path: '/', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/excerpts', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/blog', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/photos', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/press', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/endorsements', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/contact', changeFrequency: 'yearly', priority: 0.5 },
];

const lastModQuery = `*[_type in [
  "siteSettings","book","homePage","contactPage","aboutPage",
  "excerpt","blogPost","blogIntro","pressItem","pressPage",
  "photoChapter","endorsement"
]] | order(_updatedAt desc)[0]{_updatedAt}`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let lastModified: Date | undefined;
  try {
    const latest = await sanityFetch<{ _updatedAt?: string } | null>(lastModQuery);
    if (latest?._updatedAt) lastModified = new Date(latest._updatedAt);
  } catch {
    // Sanity unreachable at build/regen time — emit sitemap without lastmod rather than crashing.
  }

  return ROUTES.map((r) => ({
    url: `${BASE}${r.path}`,
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
