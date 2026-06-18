import PageHead from '@/components/PageHead/PageHead';
import Reveal from '@/components/Reveal';
import ExcerptsClient from './ExcerptsClient';
import { EXCERPTS, ORDER_URL } from '@/lib/content';
import { pageMetadata } from '@/lib/metadata';
import { sanityFetch } from '@/lib/sanity/fetch';
import { excerptsQuery, siteSettingsQuery } from '@/lib/sanity/queries';
import type { Excerpt, SiteSettings } from '@/lib/sanity/types';

export const metadata = pageMetadata({
  path: '/excerpts',
  title: "Read an Excerpt — THE FIGHTIN' TENTH",
  description:
    "Sample chapters from THE FIGHTIN' TENTH — inside the cockpit of the 10th TFS during the Cold War and Operation Desert Storm.",
});

export const dynamic = 'force-dynamic';

export default async function ExcerptsPage() {
  const [settings, fetched] = await Promise.all([
    sanityFetch<SiteSettings | null>(siteSettingsQuery),
    sanityFetch<Excerpt[]>(excerptsQuery),
  ]);

  const preorderUrl = settings?.preorderUrl ?? ORDER_URL;
  const source: Excerpt[] =
    fetched && fetched.length > 0
      ? fetched
      : (EXCERPTS.map((e, i) => ({
          _id: `fallback-${i}`,
          chapter: e.chapter,
          chapterNum: Number(e.chapterNum),
          title: e.title,
          setting: e.setting,
          pages: e.pages,
          readMin: e.readMin,
          callsign: e.callsign,
          tag: e.tag,
          photo: e.photo,
          opener: e.opener,
          preview: e.preview,
          body: e.body,
          inlineImage: e.inlineImage,
        })) as Excerpt[]);

  const ordered = [...source].sort(
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
