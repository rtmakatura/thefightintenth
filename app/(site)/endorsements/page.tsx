import PageHead from '@/components/PageHead/PageHead';
import Reveal from '@/components/Reveal';
import { ENDORSEMENTS, type Endorsement } from '@/lib/content';
import styles from './endorsements.module.css';

export const metadata = {
  title: "Endorsements — The Fightin' Tenth",
};

function getInitials(name: string): string {
  const clean = name
    .replace(/["'][^"']*["']/g, '')
    .replace(/\([^)]*\)/g, '')
    .trim();
  const parts = clean.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '—';
  if (parts.length === 1) return (parts[0][0] || '—').toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function getCallsign(name: string): string | null {
  const m = name.match(/["']([^"']+)["']/);
  return m ? m[1] : null;
}

function rankBadge(role: string): string {
  const r = role.toLowerCase();
  if (r.includes('brigadier general')) return 'BG';
  if (r.includes('general')) return 'GEN';
  if (r.includes('colonel') && r.includes('lt')) return 'LtC';
  if (r.includes('colonel')) return 'COL';
  if (r.includes('major')) return 'MAJ';
  if (r.includes('captain')) return 'CPT';
  if (r.includes('lieutenant')) return 'LT';
  if (r.includes('tsgt') || r.includes('sergeant')) return 'TSgt';
  if (r.includes('pilot')) return 'PLT';
  if (r.includes('penguin') || r.includes('random house') || r.includes('markets')) return 'PUB';
  if (r.includes('author')) return 'AUT';
  return '—';
}

function pickPunchLine(quote: string): string {
  const sentences = quote.match(/[^.!?]+[.!?]+/g) || [quote];
  const punch =
    sentences
      .map((s) => s.trim())
      .find((s) => s.length > 24 && s.length < 130) || sentences[0];
  return punch.replace(/^["']|["']$/g, '').trim();
}

function Spread({ e, idx, total }: { e: Endorsement; idx: number; total: number }) {
  const flip = idx % 2 === 1;
  const cs = getCallsign(e.name);
  const initials = getInitials(e.name);
  const punch = pickPunchLine(e.quote);

  // Body without the punch sentence (so the pull quote isn't redundant).
  const sentencesIn = e.quote.match(/[^.!?]+[.!?]+/g) || [e.quote];
  const punchSrc =
    sentencesIn.map((s) => s.trim()).find((s) => s.length > 24 && s.length < 130) ||
    sentencesIn[0];
  const body = e.quote.replace(punchSrc, '').replace(/\s\s+/g, ' ').trim();
  const drop = (body[0] || e.quote[0] || '"').toUpperCase();
  const bodyRest = body.slice(1);

  return (
    <Reveal>
      <article className={`${styles.spread} ${flip ? styles.flip : ''}`}>
        <div className={styles.plate}>
          <div className={styles.plateShade} aria-hidden="true" />
          <div className={styles.plateContent}>
            <div className={styles.plateInit} aria-hidden="true">
              {initials}
            </div>
            <div className={styles.plateCs}>
              {cs ? `"${cs}"` : `— ${rankBadge(e.role)}`}
            </div>
            <div className={styles.plateMeta}>
              <span>PLATE {String(idx + 1).padStart(2, '0')}</span>
              <span className={styles.plateDot} />
              <span>{rankBadge(e.role)}</span>
              <span className={styles.plateDot} />
              <span>10 TFS</span>
            </div>
            <div className={styles.plateBar} />
          </div>
          <div className={`${styles.plateCorner} ${styles.cornerTL}`} aria-hidden="true" />
          <div className={`${styles.plateCorner} ${styles.cornerBR}`} aria-hidden="true" />
        </div>
        <div className={styles.text}>
          <div className={styles.kicker}>
            <span className={styles.bar} />
            Endorsement № {String(idx + 1).padStart(2, '0')} of{' '}
            {String(total).padStart(2, '0')}
            <span className={styles.bar} />
            <span className={styles.readtime}>3 MIN</span>
          </div>
          <h3 className={styles.pull}>{punch}</h3>
          <div className={styles.folioRule}>
            <span className={styles.folioTick} />
            <span className={styles.folioName}>{e.name}</span>
            <span className={styles.folioTick} />
          </div>
          <p className={styles.body}>
            <span className={styles.drop}>{drop}</span>
            {bodyRest}
          </p>
          <div className={styles.attrib}>
            <div className={styles.attribL}>
              <div className={styles.name}>{e.name}</div>
              <div className={styles.role}>{e.role}</div>
              {e.detail && <div className={styles.detail}>{e.detail}</div>}
            </div>
            <div>
              <div className={styles.sig}>№ {String(idx + 1).padStart(2, '0')}</div>
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export default function EndorsementsPage() {
  const total = ENDORSEMENTS.length;
  return (
    <main>
      <PageHead eyebrow="Praise for the Book" title="Endorsements" />

      <section className="section section-light">
        <div className="container">
          <div className={styles.editorial}>
            <Reveal>
              <header className={styles.masthead}>
                <div className={styles.mastheadL}>
                  <div className={styles.issue}>ISSUE 10 · SPRING 2026</div>
                  <div className={styles.folio}>VOL. I · The Squadron Reader</div>
                </div>
                <div className={styles.mastheadC}>
                  <h2 className={styles.mhTitle}>PRAISE</h2>
                  <div className={styles.mhSub}>EIGHT VOICES · ONE SQUADRON</div>
                </div>
                <div className={styles.mastheadR}>
                  <div className={`${styles.issue} ${styles.right}`}>
                    PP. 01—{String(total * 2).padStart(2, '0')}
                  </div>
                  <div className={`${styles.folio} ${styles.right}`}>
                    A FIGHTIN&apos; TENTH PORTFOLIO
                  </div>
                </div>
              </header>
            </Reveal>

            {ENDORSEMENTS.map((e, i) => (
              <Spread key={e.name} e={e} idx={i} total={total} />
            ))}

            <Reveal>
              <footer className={styles.colophon}>
                <div className={styles.colRule} />
                <div className={styles.colText}>
                  <span>END OF PORTFOLIO</span>
                  <span className={styles.colDot} />
                  <span>SET IN PLAYFAIR DISPLAY &amp; SOURCE SANS 3</span>
                  <span className={styles.colDot} />
                  <span>THE FIGHTIN&apos; TENTH · KOEHLER BOOKS · 2026</span>
                </div>
                <div className={styles.colRule} />
              </footer>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
