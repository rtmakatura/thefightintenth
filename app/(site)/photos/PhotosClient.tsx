'use client';

import { useEffect, useMemo, useState } from 'react';
import Reveal from '@/components/Reveal';
import { urlFor } from '@/lib/sanity/image';
import type { PhotoChapter, PhotoPlate } from '@/lib/sanity/types';
import styles from './photos.module.css';

type Props = { chapters: PhotoChapter[] };

type Flat = {
  plate: PhotoPlate;
  chapter: PhotoChapter;
  ci: number;
  pi: number;
  globalIdx: number;
};

function thumbUrl(image: PhotoPlate['image']): string | null {
  if (!image) return null;
  try {
    return urlFor(image).width(1400).height(900).fit('crop').auto('format').url();
  } catch {
    return null;
  }
}

function fullUrl(image: PhotoPlate['image']): string | null {
  if (!image) return null;
  try {
    return urlFor(image).width(2400).auto('format').url();
  } catch {
    return null;
  }
}

export default function PhotosClient({ chapters }: Props) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const flat: Flat[] = useMemo(() => {
    const out: Flat[] = [];
    chapters.forEach((c, ci) =>
      (c.plates ?? []).forEach((p, pi) =>
        out.push({ plate: p, chapter: c, ci, pi, globalIdx: out.length }),
      ),
    );
    return out;
  }, [chapters]);

  const plateNumberFor = (ci: number, pi: number) => {
    let n = 0;
    for (let i = 0; i < ci; i++) n += chapters[i].plates?.length ?? 0;
    return n + pi + 1;
  };

  const close = () => setOpenIdx(null);
  const step = (delta: number) => {
    if (openIdx === null) return;
    setOpenIdx(((openIdx + delta) % flat.length + flat.length) % flat.length);
  };

  useEffect(() => {
    if (openIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') step(1);
      else if (e.key === 'ArrowLeft') step(-1);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openIdx]);

  const open = openIdx !== null ? flat[openIdx] : null;

  return (
    <>
      {chapters.map((ch, ci) => (
        <section
          key={ch._id}
          className={`section ${ci % 2 === 0 ? 'section-light' : styles.sectionCream} ${styles.chapter}`}
        >
          <div className="container">
            <Reveal>
              <header className={styles.chapterHead}>
                <div className={styles.chapterRule} />
                <div className={styles.chapterMeta}>
                  {ch.kicker && (
                    <span className="kicker">
                      <span className="bar" />
                      {ch.kicker}
                    </span>
                  )}
                  {ch.dates && <span className={styles.chapterDates}>{ch.dates}</span>}
                </div>
                <h2 className={styles.chapterTitle}>{ch.title}</h2>
                {ch.blurb && <p className={styles.chapterBlurb}>{ch.blurb}</p>}
              </header>
            </Reveal>

            <div className={styles.mosaic}>
              {(ch.plates ?? []).map((p, pi) => {
                const num = plateNumberFor(ci, pi);
                const span = p.span || 'square';
                const fl = flat.find((f) => f.ci === ci && f.pi === pi);
                const src = thumbUrl(p.image);
                if (!src) return null;
                return (
                  <Reveal
                    key={pi}
                    delay={((pi % 4) + 1) as 1 | 2 | 3 | 4}
                    className={`${styles.plate} ${styles[`span_${span.replace('-', '_')}`]}`}
                  >
                    <figure
                      className={styles.plateInner}
                      onClick={() => fl && setOpenIdx(fl.globalIdx)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if ((e.key === 'Enter' || e.key === ' ') && fl) {
                          e.preventDefault();
                          setOpenIdx(fl.globalIdx);
                        }
                      }}
                      aria-label={`Enlarge plate ${num}: ${p.label ?? ''}`}
                    >
                      <div className={styles.frame}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={src} alt={p.caption ?? p.label ?? ''} loading="lazy" />
                        <div className={styles.plateHover} aria-hidden="true">
                          <span className={styles.plateZoom}>↗ Enlarge</span>
                        </div>
                      </div>
                      <figcaption className={styles.plateCaption}>
                        <div className={styles.plateLine}>
                          <span className={styles.plateNum}>
                            Plate {String(num).padStart(2, '0')}
                          </span>
                          {p.label && <span className={styles.plateLabel}>{p.label}</span>}
                        </div>
                        {p.caption && <p className={styles.plateText}>{p.caption}</p>}
                      </figcaption>
                    </figure>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      ))}

      {open && (
        <div className={styles.lightbox} onClick={close}>
          <button
            type="button"
            className={styles.lbClose}
            onClick={close}
            aria-label="Close"
          >
            ×
          </button>
          <button
            type="button"
            className={`${styles.lbArrow} ${styles.lbPrev}`}
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            aria-label="Previous"
          >
            ‹
          </button>
          <button
            type="button"
            className={`${styles.lbArrow} ${styles.lbNext}`}
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            aria-label="Next"
          >
            ›
          </button>
          <figure className={styles.lbStage} onClick={(e) => e.stopPropagation()}>
            <div className={styles.lbImage}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={fullUrl(open.plate.image) ?? ''}
                alt={open.plate.caption ?? open.plate.label ?? ''}
              />
            </div>
            <figcaption className={styles.lbCap}>
              <div className={styles.lbCapRow}>
                <span className={styles.lbNum}>
                  Plate {String(plateNumberFor(open.ci, open.pi)).padStart(2, '0')} /{' '}
                  {String(flat.length).padStart(2, '0')}
                </span>
                <span className={styles.lbChapter}>
                  {open.chapter.title}
                  {open.chapter.dates && ` · ${open.chapter.dates}`}
                </span>
              </div>
              {open.plate.label && <h4 className={styles.lbLabel}>{open.plate.label}</h4>}
              {open.plate.caption && <p className={styles.lbText}>{open.plate.caption}</p>}
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
