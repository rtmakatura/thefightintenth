import PageHead from '@/components/PageHead/PageHead';
import Reveal from '@/components/Reveal';
import { BLOG, BLOG_INTRO } from '@/lib/content';
import styles from './blog.module.css';

export const metadata = {
  title: "From the Author — The Fightin' Tenth",
};

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

function parseDate(s: string): { month: string; day: string; year: string } {
  const d = new Date(s);
  if (isNaN(d.getTime())) return { month: '', day: '', year: '' };
  return {
    month: MONTHS[d.getMonth()],
    day: String(d.getDate()).padStart(2, '0'),
    year: String(d.getFullYear()),
  };
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export default function BlogPage() {
  return (
    <main>
      <PageHead eyebrow="Notes & Dispatches" title="From the Author" />

      <section className={styles.stage}>
        <div className="container">
          <Reveal className={styles.ledeWrap}>
            <div className={styles.ornament}>Field Notes</div>
            <p className={styles.ledeIntro}>
              Reflections on service, the squadron, and the things worth remembering —
              filed as they come.
            </p>
          </Reveal>

          <Reveal className={styles.intro}>
            <div className={styles.kicker}>{BLOG_INTRO.kicker}</div>
            <p className={styles.question}>{BLOG_INTRO.question}</p>
            <h2 className={styles.lede}>{BLOG_INTRO.lede}</h2>
            <div className={styles.dotRule} aria-hidden="true">
              <span className={styles.line} />
              <span className={styles.dot} />
              <span className={styles.line} />
            </div>
            <div className={styles.body}>
              {BLOG_INTRO.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Reveal>

          <Reveal className={styles.indexWrap}>
            <nav className={styles.index} aria-label="Posts in this dispatch">
              {BLOG.map((post, i) => {
                const { month, day } = parseDate(post.date);
                return (
                  <a key={post.title} href={`#post-${slugify(post.title)}`}>
                    <div className={styles.ixNum}>№ {String(i + 1).padStart(2, '0')}</div>
                    <div className={styles.ixTitle}>{post.title}</div>
                    <div className={styles.ixDate}>
                      {month} {day}
                    </div>
                  </a>
                );
              })}
            </nav>
          </Reveal>

          {BLOG.map((post, i) => {
            const { month, day, year } = parseDate(post.date);
            const total = BLOG.length;
            const showRule = post.body.length > 4;
            const ruleAfterIdx = Math.floor(post.body.length / 2) - 1;

            return (
              <Reveal key={post.title}>
                <article className={styles.post} id={`post-${slugify(post.title)}`}>
                  <header className={styles.postHead}>
                    <div className={styles.datestamp}>
                      <span className={styles.month}>{month}</span>
                      <span className={styles.day}>{day}</span>
                      <span className={styles.year}>{year}</span>
                      <span className={styles.postNum}>
                        № {String(i + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                      </span>
                    </div>
                    <div className={styles.headText}>
                      {post.kicker && <div className={styles.kickerLine}>{post.kicker}</div>}
                      <h2 className={styles.title}>{post.title}</h2>
                      {post.lede && <p className={styles.deck}>{post.lede}</p>}
                    </div>
                  </header>

                  <div className={styles.bodyContent}>
                    {post.body.map((para, j) => (
                      <div key={j}>
                        <p>{para}</p>
                        {showRule && j === ruleAfterIdx && (
                          <div className={styles.dotRule} aria-hidden="true">
                            <span className={styles.line} />
                            <span className={styles.dot} />
                            <span className={styles.line} />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <footer className={styles.foot}>
                    <span className={styles.signature}>— Mak</span>
                    <span className={styles.tag}>{post.kicker || 'Dispatch'}</span>
                  </footer>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>
    </main>
  );
}
