import PageHead from '@/components/PageHead/PageHead';
import Reveal from '@/components/Reveal';
import { AUTHOR_EMAIL } from '@/lib/content';
import { sanityFetch } from '@/lib/sanity/fetch';
import { contactPageQuery, siteSettingsQuery } from '@/lib/sanity/queries';
import type { ContactPage, SiteSettings } from '@/lib/sanity/types';
import ContactForm from './ContactForm';
import FaqAccordion from './FaqAccordion';
import styles from './contact.module.css';

export const metadata = {
  title: "Contact — The Fightin' Tenth",
};

export const dynamic = 'force-dynamic';

const DEFAULTS = {
  readout: {
    stationLabel: 'STATION',
    stationValue: 'Winter Garden, FL · 28.56°N · 81.58°W',
    hoursLabel: 'HRS',
    hoursValue: 'Mon–Fri · 0900–1700 ET',
    replyLabel: 'REPLY',
    replyValue: '3–5 business days',
  },
  lede:
    "Whether you flew with the Tenth, write for an outlet I've never heard of, or just want a copy of the book signed for your father — pick a channel and write.",
  subLede: 'I read every message myself.',
  directCard: {
    tag: 'Direct · Author',
    title: 'Write to Mak',
    note:
      'Reader notes, press & media, talks & appearances, signed copies, squadron stories — all routed through the form below or sent directly to the address above.',
  },
};

export default async function ContactPage() {
  const [settings, page] = await Promise.all([
    sanityFetch<SiteSettings | null>(siteSettingsQuery),
    sanityFetch<ContactPage | null>(contactPageQuery),
  ]);

  const email = settings?.contactEmail ?? AUTHOR_EMAIL;
  const r = page?.readout ?? {};
  const dc = page?.directCard ?? {};

  return (
    <main className={styles.stage}>
      <PageHead eyebrow="Open Channel" title="Contact" />

      <div className={styles.readout}>
        <div className="container">
          <div className={styles.readoutRow}>
            <span>
              <span className={styles.blink} />
              <b>{r.stationLabel ?? DEFAULTS.readout.stationLabel}</b>{' '}
              {r.stationValue ?? DEFAULTS.readout.stationValue}
            </span>
            <span>
              <b>{r.hoursLabel ?? DEFAULTS.readout.hoursLabel}</b>{' '}
              {r.hoursValue ?? DEFAULTS.readout.hoursValue}
            </span>
            <span>
              <b>{r.replyLabel ?? DEFAULTS.readout.replyLabel}</b>{' '}
              {r.replyValue ?? DEFAULTS.readout.replyValue}
            </span>
          </div>
        </div>
      </div>

      <section className="section section-light">
        <div className="container">
          <Reveal className="text-center">
            <p className="lede" style={{ maxWidth: '720px', margin: '0 auto 0.4rem' }}>
              {page?.lede ?? DEFAULTS.lede}
            </p>
            <p style={{ color: 'var(--text-sec)', maxWidth: '720px', margin: '0 auto' }}>
              {page?.subLede ?? DEFAULTS.subLede}
            </p>
          </Reveal>

          <Reveal>
            <div className={styles.directWrap}>
              <div className={styles.directCard}>
                <div className={styles.chTag}>{dc.tag ?? DEFAULTS.directCard.tag}</div>
                <h3 className={styles.chTitle}>{dc.title ?? DEFAULTS.directCard.title}</h3>
                <div className={styles.chAddr}>
                  <a href={`mailto:${email}`}>{email}</a>
                </div>
                <p className={styles.chNote}>{dc.note ?? DEFAULTS.directCard.note}</p>
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
