import Image from 'next/image';
import PageHead from '@/components/PageHead/PageHead';
import Reveal from '@/components/Reveal';
import styles from './about.module.css';

export const metadata = {
  title: "About the Author — The Fightin' Tenth",
};

export default function AboutPage() {
  return (
    <main>
      <PageHead eyebrow="The Author" title="About the Author" />
      <section className="section section-light">
        <div className="container-narrow">
          <Reveal className={styles.card}>
            <div className={styles.photos}>
              <figure className={styles.photo}>
                <div className={styles.frame}>
                  <Image
                    src="/assets/makatura-cockpit-1989.jpg"
                    alt="2nd Lt. Michael Makatura in the cockpit of an F-16 at Hahn Air Base, 1989"
                    width={800}
                    height={1000}
                    className={styles.frameImg}
                  />
                </div>
                <figcaption className={styles.cap}>2nd Lt. Makatura · Hahn AB · 1989</figcaption>
              </figure>
              <figure className={styles.photo}>
                <div className={styles.frame}>
                  <Image
                    src="/assets/makatura-headshot.jpg"
                    alt="Michael Makatura, present day"
                    width={800}
                    height={1000}
                    className={styles.frameImg}
                  />
                </div>
                <figcaption className={styles.cap}>Author Portrait · 2025</figcaption>
              </figure>
            </div>

            <div className="kicker">
              <span className="bar" />
              Captain Michael Makatura
            </div>
            <h3 className={styles.h3}>From a Pittsburgh kid to the 10th TFS.</h3>
            <p className="text-sec">
              Michael Makatura served as the Executive Officer of the 10th Tactical Fighter
              Squadron at Hahn Air Base, Germany, and later as an Air Force Intelligence
              Officer where he was the Distinguished Graduate of two Air Force Intelligence
              Officer schools. Born into a working-class family in Pittsburgh, Pennsylvania,
              he never imagined he would one day be part of a fighter squadron that would
              help shape the final days of the Cold War and later participate in Operation
              Desert Storm.
            </p>
            <p className="text-sec">
              He wrote this book to honor the men and women of the &ldquo;Fightin&apos; Tenth&rdquo;
              whose patriotism, professionalism, and courage defined one of the most
              meaningful periods of his life.
            </p>
            <p className="text-sec">
              &ldquo;Mak&rdquo; graduated from Pitt Johnstown in 1987. He is married to his
              wife, Rhonda; together they have five children and make their home in Winter
              Garden, Florida.
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
