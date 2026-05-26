import HeroV2 from '@/components/home/HeroV2';
import Telemetry from '@/components/home/Telemetry';
import AboutBookV2 from '@/components/home/AboutBookV2';
import PatchInterlude from '@/components/home/PatchInterlude';
import PraiseStage from '@/components/home/PraiseStage';
import CTABanner from '@/components/home/CTABanner';
import { ORDER_URL } from '@/lib/content';
import { sanityFetch } from '@/lib/sanity/fetch';
import {
  allEndorsementsQuery,
  bookQuery,
  siteSettingsQuery,
} from '@/lib/sanity/queries';
import type { Book, Endorsement, SiteSettings } from '@/lib/sanity/types';

export const revalidate = 60;

export default async function HomePage() {
  const [settings, book, endorsements] = await Promise.all([
    sanityFetch<SiteSettings | null>(siteSettingsQuery),
    sanityFetch<Book | null>(bookQuery),
    sanityFetch<Endorsement[]>(allEndorsementsQuery),
  ]);

  const preorderUrl = settings?.preorderUrl ?? ORDER_URL;

  return (
    <main>
      <HeroV2 preorderUrl={preorderUrl} pubDate={book?.pubDate} />
      <Telemetry />
      <AboutBookV2 preorderUrl={preorderUrl} book={book} />
      <PatchInterlude />
      <PraiseStage endorsements={endorsements ?? []} />
      <CTABanner preorderUrl={preorderUrl} pubDate={book?.pubDate} />
    </main>
  );
}
