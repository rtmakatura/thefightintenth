import PageHead from '@/components/PageHead/PageHead';
import Reveal from '@/components/Reveal';
import ExcerptsClient from './ExcerptsClient';
import { EXCERPTS } from '@/lib/content';

export const metadata = {
  title: "Excerpts — The Fightin' Tenth",
};

export default function ExcerptsPage() {
  return (
    <main>
      <PageHead eyebrow="From the Pages" title="Excerpts" />

      <section className="section section-light">
        <div className="container">
          <Reveal className="text-center">
            <p className="lede" style={{ marginBottom: '3rem' }}>
              Three passages from the book — the first taxi at Hahn, a TAC EVAL on a
              rubber-suit night, and the Friday on which a young lieutenant earned his
              callsign.
            </p>
          </Reveal>
          <ExcerptsClient excerpts={EXCERPTS} />
        </div>
      </section>
    </main>
  );
}
