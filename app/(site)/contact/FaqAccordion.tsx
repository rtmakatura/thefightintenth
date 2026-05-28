'use client';

import { useState, type ReactNode } from 'react';
import styles from './contact.module.css';

type FaqItem = { q: string; a: ReactNode };

const FAQS: FaqItem[] = [
  {
    q: 'Are signed copies available?',
    a: (
      <>
        Yes. Send a request through the form above (set the channel to{' '}
        <b>Signed &amp; Bulk</b>) with the inscription you&apos;d like and a shipping
        address. I sign and ship from Pittsburgh, usually within ten business days.
        There&apos;s a small flat-rate ship fee inside the U.S. Veteran groups, libraries,
        and ROTC programs get a discount — say so in the message.
      </>
    ),
  },
  {
    q: 'Will you do a reading or talk for our group?',
    a: (
      <>
        Almost certainly. I&apos;ve spoken at libraries, civic groups, museums, ROTC and
        JROTC programs, and book clubs both in-person and over video. For travel dates,
        please give me at least eight weeks of lead time. Book-club video calls are free
        for veteran groups and small for everyone else.
      </>
    ),
  },
  {
    q: 'Do you take podcast and radio interviews?',
    a: (
      <>
        Yes — fiction or nonfiction, military or general-interest, big show or basement
        studio. The press kit on the Press page has cover art, a headshot, a one-page fact
        sheet, suggested questions, and a list of talking points. If you need anything
        else, ask.
      </>
    ),
  },
  {
    q: 'I served in the 10th TFS (or my dad / spouse / friend did). Can I send you something?',
    a: (
      <>
        Please do. Photos, scanned letters, journal pages, callsign stories, hooch
        sketches, anything. Use the <b>Squadron Mates</b> channel above and tell me what
        you&apos;ve got — I&apos;ll write back with a way to send originals safely.
        Nothing leaves your hands until we&apos;ve talked.
      </>
    ),
  },
  {
    q: "What's your response time?",
    a: (
      <>
        I read and answer email myself. Most messages get a reply within three to five
        business days. Press requests on a same-week deadline — flag it in the subject line
        and I&apos;ll get to it faster.
      </>
    ),
  },
  {
    q: 'Are foreign rights or audio rights available?',
    a: (
      <>
        The book is independently published; foreign-language and audio rights are open.
        Use the <b>Press &amp; Media</b> channel and I&apos;ll put you in touch with the
        right person.
      </>
    ),
  },
];

export default function FaqAccordion() {
  const [open, setOpen] = useState<number>(0);

  return (
    <div className={styles.faq}>
      <div className={styles.faqEyebrow}>Common Questions · Read These First</div>
      <h3 className={styles.faqH3}>Before you write</h3>
      <div className={styles.faqRule} />
      {FAQS.map((f, i) => (
        <div
          key={i}
          className={`${styles.faqItem} ${open === i ? styles.faqOpen : ''}`}
        >
          <button
            type="button"
            onClick={() => setOpen(open === i ? -1 : i)}
            aria-expanded={open === i}
          >
            <span style={{ display: 'flex', alignItems: 'center' }}>
              <span className={styles.faqNum}>{String(i + 1).padStart(2, '0')}</span>
              <span>{f.q}</span>
            </span>
            <span className={styles.faqToggle}>+</span>
          </button>
          <div className={styles.faqAnswer}>
            <div className={styles.faqAnswerInner}>{f.a}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
