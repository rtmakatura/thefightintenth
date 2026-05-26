import PageHead from '@/components/PageHead/PageHead';
import Reveal from '@/components/Reveal';
import ExcerptsClient from './ExcerptsClient';
import { EXCERPTS, ORDER_URL } from '@/lib/content';
import { sanityFetch } from '@/lib/sanity/fetch';
import { siteSettingsQuery } from '@/lib/sanity/queries';
import type { SiteSettings } from '@/lib/sanity/types';

export const metadata = {
  title: "Excerpts — The Fightin' Tenth",
};

export const revalidate = 60;

export default async function ExcerptsPage() {
  const settings = await sanityFetch<SiteSettings | null>(siteSettingsQuery);
  const preorderUrl = settings?.preorderUrl ?? ORDER_URL;

  const ordered = [...EXCERPTS].sort(
    (a, b) => Number(a.chapterNum) - Number(b.chapterNum),
  );

  return (
    <main>
      <PageHead eyebrow="From the Pages" title="Excerpts" />

      <section className="section section-light">
        <div className="container">
          <Reveal className="text-center">
            <p className="lede" style={{ marginBottom: '3rem' }}>
              Three passages from the book — a 1990 four-ship cleared to engage
              over Germany, the squadron tradition that turns mistakes into
              callsigns, and the ninety-six-hour grind of a NATO TAC EVAL.
            </p>
          </Reveal>
          <ExcerptsClient excerpts={ordered} preorderUrl={preorderUrl} />
        </div>
      </section>
    </main>
  );
}
