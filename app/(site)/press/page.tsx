import PageHead from '@/components/PageHead/PageHead';
import Reveal from '@/components/Reveal';
import { PRESS } from '@/lib/content';
import styles from './press.module.css';

export const metadata = {
  title: "Press — The Fightin' Tenth",
};

export default function PressPage() {
  const [feature, ...rest] = PRESS.coverage;

  return (
    <main>
      <PageHead eyebrow="The Newsroom" title="Press" />

      {/* Featured */}
      <section className="section section-light" style={{ paddingBottom: '3rem' }}>
        <div className="container">
          <Reveal>
            <article className={styles.feature}>
              <div className={styles.featureMeta}>
                <span className={styles.tag}>{feature.type.toUpperCase()}</span>
                <span className={styles.featureOutlet}>{feature.outlet}</span>
                <span className={styles.date}>{feature.date}</span>
              </div>
              <h2 className={styles.featureTitle}>{feature.headline}</h2>
              <p className={styles.featureDeck}>{feature.deck}</p>
              <a
                className={styles.link}
                href={feature.link}
                target={feature.link.startsWith('http') ? '_blank' : undefined}
                rel={feature.link.startsWith('http') ? 'noreferrer' : undefined}
              >
                Read on {feature.outlet} →
              </a>
            </article>
          </Reveal>
        </div>
      </section>

      {/* Pull-quote ribbon */}
      <section
        className="section section-dark"
        style={{ paddingTop: '3rem', paddingBottom: '3rem' }}
      >
        <div className="container">
          <Reveal>
            <div className={styles.ribbon}>
              {PRESS.pullQuotes.map((q, i) => (
                <figure key={i} className={styles.pullCard}>
                  <blockquote>&ldquo;{q.quote}&rdquo;</blockquote>
                  <figcaption>— {q.who}</figcaption>
                </figure>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Coverage grid */}
      <section className="section section-light">
        <div className="container">
          <Reveal>
            <h3 className={styles.h3} style={{ marginBottom: '2rem' }}>
              Coverage &amp; conversations
            </h3>
          </Reveal>
          <Reveal>
            <div className={styles.grid}>
              {rest.map((c) => (
                <article key={c.outlet + c.date} className={styles.card}>
                  <div className={styles.cardHead}>
                    <span className={styles.tag}>{c.type.toUpperCase()}</span>
                    <span className={styles.date}>{c.date}</span>
                  </div>
                  <div className={styles.cardOutlet}>
                    {c.outlet}{' '}
                    <span className={styles.kickerSm}>· {c.kicker}</span>
                  </div>
                  <h4 className={styles.cardTitle}>{c.headline}</h4>
                  <p className={styles.cardDeck}>{c.deck}</p>
                  <a className={styles.link} href={c.link}>
                    Read →
                  </a>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Appearances (tour) */}
      <section className="section section-dark">
        <div className="container">
          <Reveal>
            <div className="kicker">
              <span className="bar" />
              On the road
            </div>
          </Reveal>
          <Reveal>
            <h3 className={styles.h3Light} style={{ marginBottom: '2rem' }}>
              Upcoming appearances
            </h3>
          </Reveal>
          <Reveal>
            <ul className={styles.tourList}>
              {PRESS.appearances.map((a) => (
                <li key={a.date + a.venue} className={styles.tourRow}>
                  <div className={styles.tourDate}>
                    <span className={styles.tdDay}>{a.weekday}</span>
                    <span className={styles.tdNum}>{a.date}</span>
                    <span className={styles.tdTime}>{a.time}</span>
                  </div>
                  <div>
                    <div className={styles.tourVenue}>{a.venue}</div>
                    <div className={styles.tourKind}>{a.kind}</div>
                  </div>
                  <a className={styles.tourRsvp} href="#">
                    Details →
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Press contact */}
      <section className="section section-light">
        <div className="container-narrow">
          <div className={styles.contact}>
            <div className="kicker">
              <span className="bar" />
              {PRESS.contact.name}
            </div>
            <a className={styles.email} href={`mailto:${PRESS.contact.email}`}>
              {PRESS.contact.email}
            </a>
            <div className={styles.contactMeta}>
              <span>{PRESS.contact.phone}</span>
              <span className={styles.contactDot} />
              <span>{PRESS.contact.hours}</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
