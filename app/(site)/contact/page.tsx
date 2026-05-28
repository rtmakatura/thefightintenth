import PageHead from '@/components/PageHead/PageHead';
import Reveal from '@/components/Reveal';
import { AUTHOR_EMAIL } from '@/lib/content';
import { sanityFetch } from '@/lib/sanity/fetch';
import { siteSettingsQuery } from '@/lib/sanity/queries';
import type { SiteSettings } from '@/lib/sanity/types';
import ContactForm from './ContactForm';
import FaqAccordion from './FaqAccordion';
import styles from './contact.module.css';

export const metadata = {
  title: "Contact — The Fightin' Tenth",
};

export const revalidate = 60;

export default async function ContactPage() {
  const settings = await sanityFetch<SiteSettings | null>(siteSettingsQuery);
  const email = settings?.contactEmail ?? AUTHOR_EMAIL;

  return (
    <main className={styles.stage}>
      <PageHead eyebrow="Open Channel" title="Contact" />

      <div className={styles.readout}>
        <div className="container">
          <div className={styles.readoutRow}>
            <span>
              <span className={styles.blink} />
              <b>STATION</b> Winter Garden, FL · 28.56°N · 81.58°W
            </span>
            <span>
              <b>HRS</b> Mon–Fri · 0900–1700 ET
            </span>
            <span>
              <b>REPLY</b> 3–5 business days
            </span>
          </div>
        </div>
      </div>

      <section className="section section-light">
        <div className="container">
          <Reveal className="text-center">
            <p className="lede" style={{ maxWidth: '720px', margin: '0 auto 0.4rem' }}>
              Whether you flew with the Tenth, write for an outlet I&apos;ve never heard of,
              or just want a copy of the book signed for your father — pick a channel and
              write.
            </p>
            <p style={{ color: 'var(--text-sec)', maxWidth: '720px', margin: '0 auto' }}>
              I read every message myself.
            </p>
          </Reveal>

          <Reveal>
            <div className={styles.directWrap}>
              <div className={styles.directCard}>
                <div className={styles.chTag}>Direct · Author</div>
                <h3 className={styles.chTitle}>Write to Mak</h3>
                <div className={styles.chAddr}>
                  <a href={`mailto:${email}`}>{email}</a>
                </div>
                <p className={styles.chNote}>
                  Reader notes, press &amp; media, talks &amp; appearances, signed copies,
                  squadron stories — all routed through the form below or sent directly to the
                  address above.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="container-narrow" style={{ padding: 0 }}>
            <Reveal>
              <ContactForm />
            </Reveal>
          </div>

          <div className="container-narrow" style={{ padding: 0 }}>
            <Reveal>
              <FaqAccordion />
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
