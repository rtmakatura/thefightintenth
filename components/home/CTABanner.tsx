import Reveal from '@/components/Reveal';
import { releaseStatus } from '@/lib/sanity/release';
import styles from './CTABanner.module.css';

const DEFAULT_AUDIENCES = ['Veterans', 'Aviation buffs', 'Cold War history fans', 'Squadron families'];
const DEFAULT_TAGLINE =
  "— and anyone who's ever wondered what it's really like to be part of a United States Air Force fighter squadron.";

type Props = {
  preorderUrl: string;
  pubDate?: string;
  kicker?: string;
  audiences?: string[];
  tagline?: string;
};

export default function CTABanner({
  preorderUrl,
  pubDate,
  kicker,
  audiences,
  tagline,
}: Props) {
  const status = releaseStatus(pubDate);
  const list = audiences && audiences.length > 0 ? audiences : DEFAULT_AUDIENCES;

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
          {kicker ?? "Who It's For"}
          <span className="bar" />
        </div>
      </Reveal>

      <Reveal>
        <div className={styles.who}>
          {list.map((w) => (
            <span key={w}>{w}</span>
          ))}
        </div>
      </Reveal>

      <Reveal>
        <p className={styles.text}>{tagline ?? DEFAULT_TAGLINE}</p>
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
