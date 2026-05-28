import Reveal from '@/components/Reveal';
import styles from './PatchInterlude.module.css';

const DEFAULTS = {
  topLabel: '10 TFS',
  bottomLabel: 'Sabres',
  mantra:
    'The culture demanded thick skin, sharp wits, and absolute focus. It chewed up the lazy and spit out the unprepared.',
  mantraSource: "— from The Fightin' Tenth",
};

type Props = {
  topLabel?: string;
  bottomLabel?: string;
  mantra?: string;
  mantraSource?: string;
};

export default function PatchInterlude({
  topLabel,
  bottomLabel,
  mantra,
  mantraSource,
}: Props = {}) {
  return (
    <section className={styles.section}>
      <Reveal>
        <div className={styles.mark} aria-hidden="true">
          <span className={styles.ring} />
          <span className={styles.ring2} />
          <span className={styles.topLabel}>{topLabel ?? DEFAULTS.topLabel}</span>
          <span className={`${styles.tick} ${styles.t1}`} />
          <span className={`${styles.tick} ${styles.t2}`} />
          <span className={`${styles.tick} ${styles.t3}`} />
          <span className={`${styles.tick} ${styles.t4}`} />
          <span className={styles.x}>X</span>
          <span className={styles.bottomLabel}>{bottomLabel ?? DEFAULTS.bottomLabel}</span>
        </div>
        <p className={styles.mantra}>
          &ldquo;{mantra ?? DEFAULTS.mantra}&rdquo;
          <span className={styles.src}>{mantraSource ?? DEFAULTS.mantraSource}</span>
        </p>
      </Reveal>
    </section>
  );
}
