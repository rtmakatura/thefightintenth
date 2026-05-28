import Reveal from '@/components/Reveal';
import { releaseStatus } from '@/lib/sanity/release';
import styles from './CTABanner.module.css';

const WHO = ['Veterans', 'Aviation buffs', 'Cold War history fans', 'Squadron families'];

type Props = {
  preorderUrl: string;
  pubDate?: string;
};

export default function CTABanner({ preorderUrl, pubDate }: Props) {
  const status = releaseStatus(pubDate);

  return (
    <section className={styles.banner}>
      <div className={styles.bg} aria-hidden="true" />
      <div className={styles.overlay} aria-hidden="true" />

      <Reveal>
        <div className={styles.vrule} />
      </Reveal>

      <Reveal>
        <div className={`kicker ${styles.kickerCenter}`}>
          <span className="bar" />
          Who It&apos;s For
          <span className="bar" />
        </div>
      </Reveal>

      <Reveal>
        <div className={styles.who}>
          {WHO.map((w) => (
            <span key={w}>{w}</span>
          ))}
        </div>
      </Reveal>

      <Reveal>
        <p className={styles.text}>
          — and anyone who&apos;s ever wondered what it&apos;s really like to be part of a
          United States Air Force fighter squadron.
        </p>
      </Reveal>

      <Reveal>
        <a
          href={preorderUrl}
          className="btn btn-outline-light"
          target="_blank"
          rel="noreferrer"
        >
          {status.ctaLabel}
        </a>
      </Reveal>
    </section>
  );
}
