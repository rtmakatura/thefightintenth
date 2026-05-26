'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import Reveal from '@/components/Reveal';
import type { Endorsement } from '@/lib/sanity/types';
import styles from './PraiseStage.module.css';

const FADE_MS = 400;
const ROTATE_MS = 7500;
const MAX_LEN = 380;

function trim(quote: string) {
  if (quote.length <= MAX_LEN) return quote;
  return quote.slice(0, MAX_LEN).replace(/[\s.,;:!?]+$/, '') + '…';
}

type Props = {
  endorsements: Endorsement[];
};

export default function PraiseStage({ endorsements }: Props) {
  const total = endorsements.length;
  const [idx, setIdx] = useState(0);
  const [fading, setFading] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const goTo = (next: number) => {
    setFading(true);
    window.setTimeout(() => {
      setIdx(((next % total) + total) % total);
      setFading(false);
    }, FADE_MS);
  };

  useEffect(() => {
    if (total === 0) return;
    intervalRef.current = window.setInterval(() => {
      setFading(true);
      window.setTimeout(() => {
        setIdx((i) => (i + 1) % total);
        setFading(false);
      }, FADE_MS);
    }, ROTATE_MS);
    return () => {
      if (intervalRef.current !== null) window.clearInterval(intervalRef.current);
    };
  }, [total]);

  if (total === 0) return null;

  const e = endorsements[idx];

  return (
    <section className="section section-dark">
      <div className="container">
        <Reveal className="text-center">
          <div className="kicker">
            <span className="bar" />
            Praise
            <span className="bar" />
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.6rem)' }}>
            From those who know the story.
          </h2>
          <div className="rule" />
        </Reveal>

        <div className={styles.stage}>
          <div className={`${styles.quote} ${fading ? styles.fading : ''}`}>{trim(e.quote)}</div>
          <div className={`${styles.attrib} ${fading ? styles.fading : ''}`}>
            <div className={styles.name}>{e.name}</div>
            <div className={styles.role}>
              {e.role}
              {e.detail ? ` · ${e.detail}` : ''}
            </div>
          </div>

          <div className={styles.controls}>
            {endorsements.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`${styles.dot} ${i === idx ? styles.dotActive : ''}`}
                onClick={() => {
                  if (intervalRef.current !== null) window.clearInterval(intervalRef.current);
                  goTo(i);
                }}
                aria-label={`Quote ${i + 1}`}
              />
            ))}
            <span className={styles.counter}>
              {String(idx + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
          </div>
        </div>

        <Reveal className="text-center">
          <div style={{ marginTop: '2.5rem' }}>
            <Link href="/endorsements" className="btn btn-outline-light">
              All Endorsements →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
