import PageHead from '@/components/PageHead/PageHead';
import Reveal from '@/components/Reveal';
import { sanityFetch } from '@/lib/sanity/fetch';
import { pressItemsQuery, pressPageQuery } from '@/lib/sanity/queries';
import type { PressItem, PressPage } from '@/lib/sanity/types';
import styles from './press.module.css';

export const metadata = {
  title: "Press — The Fightin' Tenth",
};

export const revalidate = 60;

function fmtDate(iso?: string): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

export default async function PressPage() {
  const [page, items] = await Promise.all([
    sanityFetch<PressPage | null>(pressPageQuery),
    sanityFetch<PressItem[]>(pressItemsQuery),
  ]);

  const featured = items.find((i) => i.featured) ?? items[0];
  const rest = items.filter((i) => i._id !== featured?._id);
  const pullQuotes = page?.pullQuotes ?? [];
  const appearances = page?.appearances ?? [];
  const contact = page?.contact;

  return (
    <main>
      <PageHead eyebrow="The Newsroom" title="Press" />

      {/* Featured */}
      {featured && (
        <section className="section section-light" style={{ paddingBottom: '3rem' }}>
          <div className="container">
            <Reveal>
              <article className={styles.feature}>
                <div className={styles.featureMeta}>
                  {featured.type && (
                    <span className={styles.tag}>{featured.type.toUpperCase()}</span>
                  )}
                  <span className={styles.featureOutlet}>{featured.outlet}</span>
                  {featured.date && (
                    <span className={styles.date}>{fmtDate(featured.date)}</span>
                  )}
                </div>
                <h2 className={styles.featureTitle}>{featured.headline}</h2>
                {featured.description && (
                  <p className={styles.featureDeck}>{featured.description}</p>
                )}
                {featured.url && (
                  <a
                    className={styles.link}
                    href={featured.url}
                    target={featured.url.startsWith('http') ? '_blank' : undefined}
                    rel={featured.url.startsWith('http') ? 'noreferrer' : undefined}
                  >
                    Read on {featured.outlet} →
                  </a>
                )}
              </article>
            </Reveal>
          </div>
        </section>
      )}

      {/* Pull-quote ribbon */}
      {pullQuotes.length > 0 && (
        <section
          className="section section-dark"
          style={{ paddingTop: '3rem', paddingBottom: '3rem' }}
        >
          <div className="container">
            <Reveal>
              <div className={styles.ribbon}>
                {pullQuotes.map((q, i) => (
                  <figure key={i} className={styles.pullCard}>
                    <blockquote>&ldquo;{q.quote}&rdquo;</blockquote>
                    {q.who && <figcaption>— {q.who}</figcaption>}
                  </figure>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Coverage grid */}
      {rest.length > 0 && (
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
                  <article key={c._id} className={styles.card}>
                    <div className={styles.cardHead}>
                      {c.type && <span className={styles.tag}>{c.type.toUpperCase()}</span>}
                      {c.date && <span className={styles.date}>{fmtDate(c.date)}</span>}
                    </div>
                    <div className={styles.cardOutlet}>
                      {c.outlet}
                      {c.kicker && <span className={styles.kickerSm}> · {c.kicker}</span>}
                    </div>
                    <h4 className={styles.cardTitle}>{c.headline}</h4>
                    {c.description && <p className={styles.cardDeck}>{c.description}</p>}
                    {c.url && (
                      <a
                        className={styles.link}
                        href={c.url}
                        target={c.url.startsWith('http') ? '_blank' : undefined}
                        rel={c.url.startsWith('http') ? 'noreferrer' : undefined}
                      >
                        Read →
                      </a>
                    )}
                  </article>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Appearances (tour) */}
      {appearances.length > 0 && (
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
                {appearances.map((a, i) => (
                  <li key={i} className={styles.tourRow}>
                    <div className={styles.tourDate}>
                      {a.weekday && <span className={styles.tdDay}>{a.weekday}</span>}
                      {a.date && <span className={styles.tdNum}>{a.date}</span>}
                      {a.time && <span className={styles.tdTime}>{a.time}</span>}
                    </div>
                    <div>
                      <div className={styles.tourVenue}>{a.venue}</div>
                      {a.kind && <div className={styles.tourKind}>{a.kind}</div>}
                    </div>
                    {a.url ? (
                      <a
                        className={styles.tourRsvp}
                        href={a.url}
                        target={a.url.startsWith('http') ? '_blank' : undefined}
                        rel={a.url.startsWith('http') ? 'noreferrer' : undefined}
                      >
                        Details →
                      </a>
                    ) : (
                      <span className={styles.tourRsvp} aria-hidden="true">
                        &nbsp;
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
      )}

      {/* Press contact */}
      {contact && (
        <section className="section section-light">
          <div className="container-narrow">
            <div className={styles.contact}>
              {contact.name && (
                <div className="kicker">
                  <span className="bar" />
                  {contact.name}
                </div>
              )}
              {contact.email && (
                <a className={styles.email} href={`mailto:${contact.email}`}>
                  {contact.email}
                </a>
              )}
              <div className={styles.contactMeta}>
                {contact.phone && <span>{contact.phone}</span>}
                {contact.phone && contact.hours && (
                  <span className={styles.contactDot} />
                )}
                {contact.hours && <span>{contact.hours}</span>}
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
