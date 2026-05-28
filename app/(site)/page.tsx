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
  homePageQuery,
  siteSettingsQuery,
} from '@/lib/sanity/queries';
import type {
  Book,
  Endorsement,
  HomePage,
  SiteSettings,
} from '@/lib/sanity/types';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [settings, book, endorsements, home] = await Promise.all([
    sanityFetch<SiteSettings | null>(siteSettingsQuery),
    sanityFetch<Book | null>(bookQuery),
    sanityFetch<Endorsement[]>(allEndorsementsQuery),
    sanityFetch<HomePage | null>(homePageQuery),
  ]);

  const preorderUrl = settings?.preorderUrl ?? ORDER_URL;

  return (
    <main>
      <HeroV2
        preorderUrl={preorderUrl}
        pubDate={book?.pubDate}
        bylineLabel={home?.hero?.bylineLabel}
        author={settings?.author}
        titleLine1={home?.hero?.titleLine1}
        titleLine2={home?.hero?.titleLine2}
        subtitle={settings?.subtitle}
        hud={home?.hero?.hud}
      />
      <Telemetry items={home?.telemetryItems} />
      <AboutBookV2
        preorderUrl={preorderUrl}
        book={book}
        kicker={home?.aboutBook?.kicker}
        heading={home?.aboutBook?.heading}
        headingEm={home?.aboutBook?.headingEm}
        lede={home?.aboutBook?.lede}
        acts={home?.aboutBook?.acts}
      />
      <PatchInterlude
        topLabel={home?.patchInterlude?.topLabel}
        bottomLabel={home?.patchInterlude?.bottomLabel}
        mantra={home?.patchInterlude?.mantra}
        mantraSource={home?.patchInterlude?.mantraSource}
      />
      <PraiseStage endorsements={endorsements ?? []} />
      <CTABanner
        preorderUrl={preorderUrl}
        pubDate={book?.pubDate}
        kicker={home?.ctaBanner?.kicker}
        audiences={home?.ctaBanner?.audiences}
        tagline={home?.ctaBanner?.tagline}
      />
    </main>
  );
}
