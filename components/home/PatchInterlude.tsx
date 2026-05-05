import Reveal from '@/components/Reveal';
import styles from './PatchInterlude.module.css';

/**
 * Squadron mantra section. The "patch" is a CSS-drawn placeholder until
 * the real squadron patch asset is available — the README flags it for
 * replacement with an SVG/transparent PNG sourced from the author.
 */
export default function PatchInterlude() {
  return (
    <section className={styles.section}>
      <Reveal>
        <div className={styles.mark} aria-hidden="true">
          <span className={styles.ring} />
          <span className={styles.ring2} />
          <span className={styles.topLabel}>10 TFS</span>
          <span className={`${styles.tick} ${styles.t1}`} />
          <span className={`${styles.tick} ${styles.t2}`} />
          <span className={`${styles.tick} ${styles.t3}`} />
          <span className={`${styles.tick} ${styles.t4}`} />
          <span className={styles.x}>X</span>
          <span className={styles.bottomLabel}>Sabres</span>
        </div>
        <p className={styles.mantra}>
          &ldquo;The culture demanded thick skin, sharp wits, and absolute focus. It chewed
          up the lazy and spit out the unprepared.&rdquo;
          <span className={styles.src}>— from The Fightin&apos; Tenth</span>
        </p>
      </Reveal>
    </section>
  );
}
