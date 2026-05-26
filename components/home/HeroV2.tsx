import { releaseStatus } from '@/lib/sanity/release';
import styles from './HeroV2.module.css';

type Props = {
  preorderUrl: string;
  pubDate?: string;
};

function formatStylizedDate(pubDateIso?: string): string {
  if (!pubDateIso) return '05.05.26';
  const d = new Date(pubDateIso);
  if (Number.isNaN(d.getTime())) return '05.05.26';
  const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(d.getUTCDate()).padStart(2, '0');
  const yy = String(d.getUTCFullYear()).slice(-2);
  return `${mm}.${dd}.${yy}`;
}

export default function HeroV2({ preorderUrl, pubDate }: Props) {
  const status = releaseStatus(pubDate);
  const stylizedDate = formatStylizedDate(pubDate);
  const statusLine =
    status.released && status.formattedDate
      ? `Released ${status.formattedDate} — Available now`
      : status.statusLine;

  return (
    <section className={styles.hero}>
      <div className={styles.bg} aria-hidden="true" />
      <div className={styles.overlay} aria-hidden="true" />
      <div className={styles.frame} aria-hidden="true" />

      <div className={styles.hud} aria-label="Mission readout">
        <div className={styles.hudRow}>
          <span className={styles.hudLbl}>Squadron</span>
          <span className={styles.hudSep} />
          <span className={styles.hudVal}>10 TFS</span>
        </div>
        <div className={styles.hudRow}>
          <span className={styles.hudLbl}>Base</span>
          <span className={styles.hudSep} />
          <span className={styles.hudVal}>HAHN AB</span>
        </div>
        <div className={styles.hudRow}>
          <span className={styles.hudLbl}>Airframe</span>
          <span className={styles.hudSep} />
          <span className={`${styles.hudVal} ${styles.hudValAccent}`}>F-16C</span>
        </div>
        <div className={styles.hudRow}>
          <span className={styles.hudLbl}>Tail</span>
          <span className={styles.hudSep} />
          <span className={styles.hudVal}>HR-1310</span>
        </div>
        <div className={styles.hudRow}>
          <span className={styles.hudLbl}>Era</span>
          <span className={styles.hudSep} />
          <span className={styles.hudVal}>1989—91</span>
        </div>
      </div>

      <div className={styles.poster}>
        <div className={styles.byline}>
          <span className={styles.bylineText}>
            <span className={styles.bylineBy}>A memoir by</span>
            Captain Michael Makatura
          </span>
        </div>

        <h1 className={styles.title}>
          <span className={styles.titleLine}>THE FIGHTIN&apos;</span>
          <span className={styles.titleLine}>TENTH</span>
          <span className={styles.titleSub}>Cold War to Desert Storm</span>
        </h1>

        <div className={styles.bottombar}>
          <div className={styles.pubmeta}>
            <span className={styles.pubNum}>{stylizedDate}</span>
            {statusLine}
          </div>
          <div className={styles.actions}>
            <a
              href={preorderUrl}
              className="btn btn-outline-light"
              target="_blank"
              rel="noreferrer"
            >
              {status.ctaLabel}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className={styles.scrollHint} aria-hidden="true">
        <span className={styles.blink} />
        Scroll · Roll In
      </div>
    </section>
  );
}
