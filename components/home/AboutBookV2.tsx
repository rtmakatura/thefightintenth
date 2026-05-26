import Link from 'next/link';
import Image from 'next/image';
import Reveal from '@/components/Reveal';
import { ORDER_URL } from '@/lib/content';
import styles from './AboutBookV2.module.css';

const ACTS = [
  {
    num: 'I.',
    label: 'Act One · 1987–1989',
    title: 'Officer Training and the long road to Hahn.',
    body:
      'The mental gauntlet of OTS, the wide-eyed arrival in Europe, and the first taxi out of a fighter ramp as a brand-new lieutenant.',
  },
  {
    num: 'II.',
    label: 'Act Two · 1989–1990',
    title: 'The Tenth, the Mosel, and life on the wire.',
    body:
      'Nuclear cert, low-level training at 540 knots, evenings in the river valley villages, and the brotherhood that grew up around the Sabres.',
  },
  {
    num: 'III.',
    label: 'Act Three · 1991',
    title: 'Desert Storm and the proving of the squadron.',
    body:
      'The deployment east, hundreds of high-risk missions over Iraq, SCUD hunts, and the way a unit forged in peace performs under fire.',
  },
];

const META: { lbl: string; val: string; small?: boolean }[] = [
  { lbl: 'Pages', val: '282' },
  { lbl: 'Softcover', val: '$18.95' },
  { lbl: 'Hardcover', val: '$28.95' },
  { lbl: 'Pub Date', val: 'May 5, 2026' },
  { lbl: 'Publisher', val: 'Koehler Books', small: true },
];

export default function AboutBookV2() {
  return (
    <section className="section section-light">
      <div className="container">
        <div className={styles.grid}>
          <Reveal className={styles.coverStage}>
            <div className={styles.plinth}>
              <Image
                src="/assets/cover.jpg"
                width={576}
                height={871}
                alt="The Fightin' Tenth book cover"
                className={styles.coverImg}
                priority
              />
            </div>
            <div className={styles.metaStrip}>
              {META.map((m) => (
                <div className={styles.metaRow} key={m.lbl}>
                  <span className={styles.metaLbl}>{m.lbl}</span>
                  <span
                    className={styles.metaVal}
                    style={m.small ? { fontSize: '0.95rem' } : undefined}
                  >
                    {m.val}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

          <div>
            <Reveal>
              <div className="kicker">
                <span className="bar" />
                The Book
              </div>
            </Reveal>
            <Reveal>
              <h2 className={styles.h2}>
                A squadron, a Viper,
                <br />
                <em className={styles.h2Em}>and the years that defined them.</em>
              </h2>
            </Reveal>
            <Reveal>
              <div className="rule rule-left" />
            </Reveal>

            <Reveal>
              <p className="lede" style={{ maxWidth: '58ch' }}>
                Behind the wire of one of NATO&apos;s most elite tactical fighter squadrons —
                the 10th — during the tense final years of the Cold War and into Operation
                Desert Storm. Part history, part military life, part personal transformation.
              </p>
            </Reveal>

            <div className={styles.acts}>
              {ACTS.map((a, i) => (
                <Reveal key={a.num} delay={(i + 1) as 1 | 2 | 3}>
                  <div className={styles.act}>
                    <div className={styles.actNum}>{a.num}</div>
                    <div>
                      <div className={styles.actLabel}>{a.label}</div>
                      <h4 className={styles.actTitle}>{a.title}</h4>
                      <p className={styles.actBody}>{a.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <div className={styles.cta}>
                <a
                  href={ORDER_URL}
                  className="btn btn-dark"
                  target="_blank"
                  rel="noreferrer"
                >
                  Order on Amazon
                </a>
                <Link href="/excerpts" className="btn btn-ghost">
                  Read Excerpts
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
