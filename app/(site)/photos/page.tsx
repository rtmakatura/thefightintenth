import PageHead from '@/components/PageHead/PageHead';
import Reveal from '@/components/Reveal';
import { pageMetadata } from '@/lib/metadata';
import { sanityFetch } from '@/lib/sanity/fetch';
import { photoChaptersQuery } from '@/lib/sanity/queries';
import type { PhotoChapter } from '@/lib/sanity/types';
import PhotosClient from './PhotosClient';
import styles from './photos.module.css';

export const metadata = pageMetadata({
  path: '/photos',
  title: "Photos — THE FIGHTIN' TENTH",
  description:
    "A visual memoir of the 10th Tactical Fighter Squadron — F-16s on the line, squadron life, Cold War to Desert Storm.",
});

export const dynamic = 'force-dynamic';

export default async function PhotosPage() {
  const chapters = (await sanityFetch<PhotoChapter[]>(photoChaptersQuery)) ?? [];
  const totalPlates = chapters.reduce(
    (acc, c) => acc + (c.plates?.length ?? 0),
    0,
  );

  return (
    <main className={styles.page}>
      <PageHead eyebrow="Image Archive" title="Photos" />

      <section className={`section section-light ${styles.intro}`}>
        <div className="container-narrow">
          <Reveal className="text-center">
            <p className="lede" style={{ maxWidth: '720px', margin: '0 auto' }}>
              A working archive from the book — Cold-War alert duty in the Hunsrück,
              forty-three days over the desert, and the squadron that bracketed both. Click
              any plate to enlarge.
            </p>
          </Reveal>
          <Reveal>
            <div className={styles.archiveMeta}>
              <div>
                <span className={styles.k}>Plates</span>
                <span className={styles.v}>{totalPlates}</span>
              </div>
              <div>
                <span className={styles.k}>Sections</span>
                <span className={styles.v}>{chapters.length}</span>
              </div>
              <div>
                <span className={styles.k}>Years</span>
                <span className={styles.v}>1988 – 1991</span>
              </div>
              <div>
                <span className={styles.k}>Bases</span>
                <span className={styles.v}>Hahn · Al Minhad</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <PhotosClient chapters={chapters} />

      <section className="section section-light">
        <div className="container-narrow text-center">
          <Reveal>
            <p className={styles.archiveNote}>
              More photographs, flight logs, and squadron memorabilia continue to surface as
              the book moves toward its release.
            </p>
          </Reveal>
          <Reveal>
            <div style={{ marginTop: '1.4rem' }}>
              <a
                className="btn btn-ghost"
                href="https://www.michaelmakatura.com/"
                target="_blank"
                rel="noreferrer"
              >
                Visit the author&apos;s site
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
