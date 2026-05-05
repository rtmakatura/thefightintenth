'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import Reveal from '@/components/Reveal';
import { ORDER_URL, type Excerpt } from '@/lib/content';
import styles from './excerpts.module.css';

type Props = { excerpts: Excerpt[] };

export default function ExcerptsClient({ excerpts }: Props) {
  const [active, setActive] = useState<Excerpt | null>(null);

  return (
    <>
      <div className={styles.stack}>
        {excerpts.map((e, i) => (
          <Spread key={e.title} excerpt={e} idx={i} onOpen={() => setActive(e)} />
        ))}
      </div>
      {active && <ExcerptModal excerpt={active} onClose={() => setActive(null)} />}
    </>
  );
}

function Spread({
  excerpt,
  idx,
  onOpen,
}: {
  excerpt: Excerpt;
  idx: number;
  onOpen: () => void;
}) {
  const flip = idx % 2 === 1;
  const opener = excerpt.opener;
  const drop = opener.charAt(0);
  const openerRest = opener.slice(1);
  const restOfPreview = excerpt.preview.slice(opener.length).trim();

  return (
    <Reveal>
      <article
        className={`${styles.spread} ${flip ? styles.flip : ''}`}
        onClick={onOpen}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onOpen();
          }
        }}
        aria-label={`Read excerpt: ${excerpt.title}`}
      >
        <div className={styles.photo}>
          <Image
            src={excerpt.photo}
            alt=""
            width={1400}
            height={900}
            className={styles.photoImg}
          />
          <div className={styles.photoOverlay} aria-hidden="true" />
          <div className={styles.photoCap}>
            <span className={styles.capK}>Plate {String(idx + 1).padStart(2, '0')}</span>
            <span className={styles.capV}>{excerpt.setting}</span>
          </div>
        </div>
        <div className={styles.text}>
          <div className={styles.numeral} aria-hidden="true">
            {excerpt.chapterNum}
          </div>
          <div className={styles.meta}>
            <span>{excerpt.chapter}</span>
            <span className={styles.dot} />
            <span>{excerpt.pages}</span>
            <span className={styles.dot} />
            <span>{excerpt.readMin} min</span>
          </div>
          <h3 className={styles.title}>{excerpt.title}</h3>
          <p className={styles.opener}>
            <span className={styles.dropcap}>{drop}</span>
            {openerRest}
          </p>
          <p className={styles.rest}>{restOfPreview}</p>
          <div className={styles.foot}>
            <button
              type="button"
              className={styles.cta}
              onClick={(ev) => {
                ev.stopPropagation();
                onOpen();
              }}
            >
              Continue reading
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
                <path d="M1 5h11M8.5 1L13 5l-4.5 4" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </button>
            <span className={styles.tag}>{excerpt.tag}</span>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function ExcerptModal({ excerpt, onClose }: { excerpt: Excerpt; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      className={styles.modalBg}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={excerpt.title}
    >
      <div
        className={styles.modalCard}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className={styles.modalClose}
          onClick={onClose}
          aria-label="Close"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>
        <div className={styles.modalChap}>{excerpt.chapter}</div>
        <h2 className={styles.modalTitle}>{excerpt.title}</h2>
        <div className={styles.modalRule} />
        <div className={styles.modalBody}>
          {excerpt.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <div className={styles.modalFoot}>
          <div className={styles.modalFootText}>
            Continue the story — the book is available now.
          </div>
          <a
            href={ORDER_URL}
            className="btn btn-dark"
            target="_blank"
            rel="noreferrer"
          >
            Order on Amazon
          </a>
        </div>
      </div>
    </div>
  );
}
