import { releaseStatus } from '@/lib/sanity/release';
import type { HudRow } from '@/lib/sanity/types';
import styles from './HeroV2.module.css';

type Props = {
  preorderUrl: string;
  pubDate?: string;
  bylineLabel?: string;
  author?: string;
  titleLine1?: string;
  titleLine2?: string;
  subtitle?: string;
  hud?: HudRow[];
};

const DEFAULTS = {
  bylineLabel: 'A memoir by',
  author: 'Captain Michael Makatura',
  titleLine1: "THE FIGHTIN'",
  titleLine2: 'TENTH',
  subtitle: 'Cold War to Desert Storm',
  hud: [
    { label: 'Squadron', value: '10 TFS' },
    { label: 'Base', value: 'HAHN AB' },
    { label: 'Airframe', value: 'F-16C', accent: true },
    { label: 'Tail', value: 'HR-1310' },
    { label: 'Era', value: '1989—91' },
  ] as HudRow[],
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

export default function HeroV2({
  preorderUrl,
  pubDate,
  bylineLabel,
  author,
  titleLine1,
  titleLine2,
  subtitle,
  hud,
}: Props) {
  const status = releaseStatus(pubDate);
  const stylizedDate = formatStylizedDate(pubDate);
  const statusLine =
    status.released && status.formattedDate
      ? `Released ${status.formattedDate} — Available now`
      : status.statusLine;

  const hudRows = hud && hud.length > 0 ? hud : DEFAULTS.hud;

  return (
    <section className={styles.hero}>
      <div className={styles.bg} aria-hidden="true" />
      <div className={styles.overlay} aria-hidden="true" />
      <div className={styles.frame} aria-hidden="true" />

      <div className={styles.hud} aria-label="Mission readout">
        {hudRows.map((row, i) => (
          <div key={i} className={styles.hudRow}>
            <span className={styles.hudLbl}>{row.label}</span>
            <span className={styles.hudSep} />
            <span
              className={`${styles.hudVal} ${row.accent ? styles.hudValAccent : ''}`}
            >
              {row.value}
            </span>
          </div>
        ))}
      </div>

      <div className={styles.poster}>
        <div className={styles.byline}>
          <span className={styles.bylineText}>
            <span className={styles.bylineBy}>{bylineLabel ?? DEFAULTS.bylineLabel}</span>
            {author ?? DEFAULTS.author}
          </span>
        </div>

        <h1 className={styles.title}>
          <span className={styles.titleLine}>{titleLine1 ?? DEFAULTS.titleLine1}</span>
          <span className={styles.titleLine}>{titleLine2 ?? DEFAULTS.titleLine2}</span>
          <span className={styles.titleSub}>{subtitle ?? DEFAULTS.subtitle}</span>
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
