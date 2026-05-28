import Image from 'next/image';
import PageHead from '@/components/PageHead/PageHead';
import Reveal from '@/components/Reveal';
import { urlFor } from '@/lib/sanity/image';
import { sanityFetch } from '@/lib/sanity/fetch';
import { aboutPageQuery } from '@/lib/sanity/queries';
import { toParagraphText } from '@/lib/sanity/portable';
import type { AboutPage, AboutPagePhoto } from '@/lib/sanity/types';
import styles from './about.module.css';

export const metadata = {
  title: "About the Author — The Fightin' Tenth",
};

export const dynamic = 'force-dynamic';

const DEFAULTS = {
  eyebrow: 'The Author',
  title: 'About the Author',
  kicker: 'Captain Michael Makatura',
  heading: 'From a Pittsburgh kid to the 10th TFS.',
  body: [
    'Michael Makatura served as the Executive Officer of the 10th Tactical Fighter Squadron at Hahn Air Base, Germany, and later as an Air Force Intelligence Officer where he was the Distinguished Graduate of two Air Force Intelligence Officer schools. Born into a working-class family in Pittsburgh, Pennsylvania, he never imagined he would one day be part of a fighter squadron that would help shape the final days of the Cold War and later participate in Operation Desert Storm.',
    'He wrote this book to honor the men and women of the "Fightin\' Tenth" whose patriotism, professionalism, and courage defined one of the most meaningful periods of his life.',
    '"Mak" graduated from Pitt Johnstown in 1987. He is married to his wife, Rhonda; together they have five children and make their home in Winter Garden, Florida.',
  ],
  leftPhoto: {
    src: '/assets/makatura-cockpit-1989.jpg',
    alt: '2nd Lt. Michael Makatura in the cockpit of an F-16 at Hahn Air Base, 1989',
    caption: '2nd Lt. Makatura · Hahn AB · 1989',
  },
  rightPhoto: {
    src: '/assets/makatura-headshot.jpg',
    alt: 'Michael Makatura, present day',
    caption: 'Author Portrait · 2025',
  },
};

function photoSrc(p: AboutPagePhoto | undefined, fallbackPath: string): string {
  if (p?.image) {
    try {
      return urlFor(p.image).width(800).height(1000).fit('crop').auto('format').url();
    } catch {
      return fallbackPath;
    }
  }
  return fallbackPath;
}

export default async function AboutPage() {
  const data = await sanityFetch<AboutPage | null>(aboutPageQuery);

  const eyebrow = data?.eyebrow ?? DEFAULTS.eyebrow;
  const title = data?.title ?? DEFAULTS.title;
  const kicker = data?.kicker ?? DEFAULTS.kicker;
  const heading = data?.heading ?? DEFAULTS.heading;
  const body =
    data?.body && data.body.length > 0
      ? data.body.map(toParagraphText)
      : DEFAULTS.body;

  const leftSrc = photoSrc(data?.leftPhoto, DEFAULTS.leftPhoto.src);
  const leftAlt = data?.leftPhoto?.alt ?? DEFAULTS.leftPhoto.alt;
  const leftCap = data?.leftPhoto?.caption ?? DEFAULTS.leftPhoto.caption;

  const rightSrc = photoSrc(data?.rightPhoto, DEFAULTS.rightPhoto.src);
  const rightAlt = data?.rightPhoto?.alt ?? DEFAULTS.rightPhoto.alt;
  const rightCap = data?.rightPhoto?.caption ?? DEFAULTS.rightPhoto.caption;

  const leftIsRemote = leftSrc.startsWith('http');
  const rightIsRemote = rightSrc.startsWith('http');

  return (
    <main>
      <PageHead eyebrow={eyebrow} title={title} />
      <section className="section section-light">
        <div className="container-narrow">
          <Reveal className={styles.card}>
            <div className={styles.photos}>
              <figure className={styles.photo}>
                <div className={styles.frame}>
                  <Image
                    src={leftSrc}
                    alt={leftAlt}
                    width={800}
                    height={1000}
                    className={styles.frameImg}
                    unoptimized={leftIsRemote}
                  />
                </div>
                <figcaption className={styles.cap}>{leftCap}</figcaption>
              </figure>
              <figure className={styles.photo}>
                <div className={styles.frame}>
                  <Image
                    src={rightSrc}
                    alt={rightAlt}
                    width={800}
                    height={1000}
                    className={styles.frameImg}
                    unoptimized={rightIsRemote}
                  />
                </div>
                <figcaption className={styles.cap}>{rightCap}</figcaption>
              </figure>
            </div>

            <div className="kicker">
              <span className="bar" />
              {kicker}
            </div>
            <h3 className={styles.h3}>{heading}</h3>
            {body.map((p, i) => (
              <p key={i} className="text-sec">
                {p}
              </p>
            ))}
          </Reveal>
        </div>
      </section>
    </main>
  );
}
