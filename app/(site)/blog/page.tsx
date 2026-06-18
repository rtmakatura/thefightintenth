import PageHead from '@/components/PageHead/PageHead';
import Reveal from '@/components/Reveal';
import { JsonLd } from '@/components/JsonLd';
import { BLOG_INTRO } from '@/lib/content';
import { buildArticleJsonLd } from '@/lib/jsonld';
import { pageMetadata } from '@/lib/metadata';
import { sanityFetch } from '@/lib/sanity/fetch';
import { toParagraphText } from '@/lib/sanity/portable';
import { blogIntroQuery, blogPostsQuery } from '@/lib/sanity/queries';
import type { BlogIntro, BlogPost } from '@/lib/sanity/types';
import styles from './blog.module.css';

export const metadata = pageMetadata({
  path: '/blog',
  title: "From the Author — THE FIGHTIN' TENTH",
  description:
    'Field notes and dispatches from Capt. Michael Makatura — reflections on service, the squadron, and the things worth remembering.',
});

export const dynamic = 'force-dynamic';

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

function parseDate(s: string): { month: string; day: string; year: string } {
  const d = new Date(s);
  if (isNaN(d.getTime())) return { month: '', day: '', year: '' };
  return {
    month: MONTHS[d.getUTCMonth()],
    day: String(d.getUTCDate()).padStart(2, '0'),
    year: String(d.getUTCFullYear()),
  };
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export default async function BlogPage() {
  const [fetchedIntro, fetchedPosts] = await Promise.all([
    sanityFetch<BlogIntro | null>(blogIntroQuery),
    sanityFetch<BlogPost[]>(blogPostsQuery),
  ]);

  const intro: BlogIntro = fetchedIntro ?? BLOG_INTRO;
  const posts: BlogPost[] = fetchedPosts ?? [];

  const introBody = (intro.body ?? []).map(toParagraphText);
  const articleSchemas = posts.map(buildArticleJsonLd);

  return (
    <main>
      {articleSchemas.length > 0 && <JsonLd data={articleSchemas} />}
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
            {intro.kicker && <div className={styles.kicker}>{intro.kicker}</div>}
            {intro.question && <p className={styles.question}>{intro.question}</p>}
            {intro.lede && <h2 className={styles.lede}>{intro.lede}</h2>}
            <div className={styles.dotRule} aria-hidden="true">
              <span className={styles.line} />
              <span className={styles.dot} />
              <span className={styles.line} />
            </div>
            <div className={styles.body}>
              {introBody.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <div className={styles.introSig}>— Mak</div>
            </div>
          </Reveal>

          <Reveal className={styles.indexWrap}>
            <nav className={styles.index} aria-label="Posts in this dispatch">
              {posts.map((post, i) => {
                const { month, day } = parseDate(post.date);
                return (
                  <a key={post._id} href={`#post-${slugify(post.title)}`}>
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

          {posts.map((post, i) => {
            const { month, day, year } = parseDate(post.date);
            const total = posts.length;
            const body = (post.body ?? []).map(toParagraphText);
            const showRule = body.length > 4;
            const ruleAfterIdx = Math.floor(body.length / 2) - 1;
            const signOff = post.signOff ?? 'Mak';

            return (
              <Reveal key={post._id}>
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
                    {body.map((para, j) => (
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
                    <span className={styles.signature}>— {signOff}</span>
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
