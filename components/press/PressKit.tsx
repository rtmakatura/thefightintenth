'use client';

import { useEffect, useMemo, useState } from 'react';
import styles from './PressKit.module.css';

type Anchor = { label: string; href: string };
type Fact = { k: string; v: string };
type Link = { label: string; href: string };
type Talk = { title: string; body: string };
type QuestionGroup = { group: string; items: string[] };
type Praise = { quote: string; name: string; role: string };
type Asset = { name: string; meta: string; href: string };

const COVER_HREF = '/assets/cover.jpg';
const AUTHOR_PHOTO_HREF = '/press/author-photo.jpg';
const ONE_SHEET_HREF = '/press/the-fightin-tenth-one-sheet.pdf';
const PRESS_KIT_ZIP_HREF = '/press/the-fightin-tenth-press-kit.zip';

const ANCHORS: Anchor[] = [
  { label: 'Book', href: '#book' },
  { label: 'Author', href: '#author' },
  { label: 'Synopsis', href: '#synopsis' },
  { label: 'Q&A', href: '#qa' },
  { label: 'Assets', href: '#assets' },
  { label: 'Contact', href: '#contact' },
];

const ONE_SHEET: Fact[] = [
  { k: 'Title', v: "The Fightin' Tenth" },
  { k: 'Subtitle', v: 'Cold War to Desert Storm' },
  { k: 'Author', v: 'Captain Michael Makatura, USAF (Ret.)' },
  { k: 'Publisher', v: 'Köehler Books · Virginia Beach, VA' },
  { k: 'Publication date', v: 'May 5, 2026' },
  { k: 'ISBN (Softcover)', v: '979-8-89747-116-4' },
  { k: 'ISBN (Hardcover)', v: '979-8-89747-118-8' },
  { k: 'Page count', v: '282 pages' },
  { k: 'Formats', v: 'Hardcover · Softcover · Kindle · Audiobook (TBD)' },
  { k: 'Category', v: 'Military Memoir / Aviation History' },
  { k: 'Price', v: 'Softcover $18.95 · Hardcover $28.95' },
];

const BUY_LINKS: Link[] = [
  {
    label: 'Amazon',
    href: 'https://www.amazon.com/Fightin-Tenth-Cold-Desert-Storm-ebook/dp/B0GWW6P518',
  },
  {
    label: 'Köehler Books',
    href: 'https://www.koehlerbooks.com/book/the-fightin-tenth-cold-war-to-desert-storm/',
  },
];

const SYNOPSIS_SHORT = [
  "An Executive Officer's account of the 10th Tactical Fighter Squadron, from Cold War alert duty at Hahn Air Base, West Germany, to the opening night of Operation Desert Storm.",
];
const SYNOPSIS_MEDIUM = [
  "In 1989, Captain Michael Makatura arrived at Hahn Air Base, West Germany, to serve as Executive Officer of the 10th Tactical Fighter Squadron — a front-line unit flying the F-16C on alert against the Soviet threat. Then the wall came down, the mission inverted, and within a year the squadron was bound for the Persian Gulf. The Fightin' Tenth is the insider's account of that whiplash: the alert pads and daily grind of Cold War Europe, the culture of a fighter squadron, and Operation Desert Storm seen from the operations side. It is less about the hardware than about the people who lived around it — the pilots, the maintainers, the support crews, and the families who held the line at home.",
];
const SYNOPSIS_LONG = [
  "When Captain Michael Makatura reported to Hahn Air Base in 1989 as its incoming Executive Officer, the 10th Tactical Fighter Squadron sat on the most contested ground in the world. Its F-16Cs stood alert against a Soviet armored force that everyone trained to fight but no one expected to actually face. The work was relentless and largely invisible — the personnel, logistics, and daily discipline of a unit kept permanently ready for a war that never came.",
  'Then the ground shifted. The Berlin Wall fell, the threat that had defined the squadron evaporated, and within months the 10th was no longer guarding a European frontier — it was packing for the desert.',
  "The Fightin' Tenth follows that turn. Makatura saw the war from the operations side, where he managed administration, logistics, and the daily reality of running a squadron at war. It is a memoir of a fighter squadron caught between two very different wars — the callsigns and hierarchies and hard-won trust, the families and maintainers and logistics, the rapid deployment to the Gulf, and the opening nights of the air campaign. Makatura writes without myth-making, more interested in the people than the machinery, and in what the work asked of everyone who kept the jets flying. The result is a precise, unsentimental record of a moment most histories skip — the seam between the Cold War and the wars that followed — told by the insider who lived it from the ground up.",
];

const BIO_50 = [
  'Michael Makatura served as Executive Officer of the 10th Tactical Fighter Squadron at Hahn Air Base, Germany, through the final years of the Cold War and Operation Desert Storm. A 1987 graduate of Pitt Johnstown, he and his wife, Rhonda, have five children and live in Winter Garden, Florida.',
];
const BIO_150 = [
  "Michael Makatura served as Executive Officer of the 10th Tactical Fighter Squadron at Hahn Air Base, Germany, during the final years of the Cold War and into Operation Desert Storm. Born into a working-class family in Port Vue, Pennsylvania, a blue-collar suburb of Pittsburgh, he never imagined he would one day be part of a fighter squadron that helped shape the end of the Cold War. He graduated from the University of Pittsburgh at Johnstown in 1987 and joined the Air Force soon after, earning his commission as a second lieutenant through Officer Training School. Selected for operations management — a non-flying support role for flying squadrons — he was assigned to Hahn in 1989, where he succeeded Captain Bill Turner as the squadron's executive officer. He remained at Hahn through Desert Shield and Desert Storm. He and his wife, Rhonda, have five children and reside in Winter Garden, Florida.",
];
const BIO_300 = [
  'Michael Makatura was born into a working-class family in Port Vue, Pennsylvania, a blue-collar suburb of Pittsburgh, and never imagined he would one day be part of a fighter squadron that helped shape the final days of the Cold War. He graduated from the University of Pittsburgh at Johnstown in 1987 and joined the Air Force shortly after, earning his commission as a second lieutenant through Officer Training School. Rather than the cockpit, his path led to operations management — the non-flying career field that keeps a flying squadron running.',
  "In 1989 he was assigned to Hahn Air Base, Germany, where he succeeded Captain Bill Turner as Executive Officer of the 10th Tactical Fighter Squadron. As XO, Makatura sat at the administrative center of the unit — personnel, logistics, and the daily machinery of a front-line squadron flying the F-16C on Cold War alert along NATO's eastern frontier. It was a vantage point few memoirs capture: close enough to the flight line to know the pilots by callsign, yet responsible for the work that made their missions possible.",
  "When the Berlin Wall fell and the squadron reoriented for war in the Persian Gulf, Makatura was there through Desert Shield and Desert Storm, watching the 10th go to war from the operations side. The Fightin' Tenth is his account of that transition — the insider's view of a fighter squadron between two very different eras, and his first book. He and his wife, Rhonda, have five children and reside in Winter Garden, Florida.",
];

const TALKING_POINTS: Talk[] = [
  {
    title: 'Cold War Europe, from the inside',
    body: 'The view a young executive officer had of the front line — the work behind the flight line, not the version in the history books.',
  },
  {
    title: 'The F-4-to-F-16 transition',
    body: 'What the move from the F-4 to the F-16 meant for how a squadron was organized, supported, and run — told from the operations side.',
  },
  {
    title: 'Running a fighter squadron at Hahn AB',
    body: 'What it actually took to keep a forward-based unit in West Germany manned, supplied, and ready to fly.',
  },
  {
    title: 'The pivot to the Gulf',
    body: 'A squadron built to face the Soviets reoriented for desert combat in a matter of weeks.',
  },
  {
    title: 'Squadron culture',
    body: 'Callsigns, hierarchy, humor, and the trust that binds a fighter squadron — seen from the inside.',
  },
  {
    title: 'What other Gulf War books missed',
    body: 'The ordinary, unglamorous machinery of an air campaign that rarely makes the highlight reel.',
  },
  {
    title: "The story the pilots don't tell",
    body: 'War from the operations side — the families, the maintainers, and the logistics that made every sortie possible.',
  },
];

const QUESTION_GROUPS: QuestionGroup[] = [
  {
    group: 'Personal Arc',
    items: [
      'How did a kid from Port Vue, Pennsylvania end up as Executive Officer of an F-16 squadron in Cold War Germany?',
      "You served as the squadron's young executive officer at Hahn. What did a normal week actually look like?",
      'When did the Cold War mission start to feel real rather than theoretical?',
    ],
  },
  {
    group: 'The Squadron',
    items: [
      "For listeners who aren't aviators, what made the F-16C such a leap for the 10th?",
      'The squadron transitioned from the F-4 to the F-16. What did that change, on the ground and in the air?',
      'You watched the squadron go to war from the operations side — the families, the maintainers, the logistics. What did the war look like from where you stood?',
    ],
  },
  {
    group: 'Historical Context',
    items: [
      'Hahn Air Base, 1989 to 1991 — what was the strategic picture in Europe?',
      'How fast did the squadron pivot from a Soviet-facing posture to Desert Storm?',
      'Where does the 10th TFS fit in the larger story of the air campaign?',
    ],
  },
  {
    group: 'Surprises',
    items: [
      "What's the most common misconception about life in a fighter squadron that you'd want to correct?",
      'What detail from those years still surprises people when you tell it?',
    ],
  },
  {
    group: 'Takeaways',
    items: [
      'What do you want younger service members to take from this book?',
      'Looking back, what did that period cost you — and what did it give you?',
      'If a reader finishes the book with one thing, what should it be?',
    ],
  },
];

const PRAISE: Praise[] = [
  {
    quote:
      "In The Fightin' Tenth, Mak captures the remarkable transition of the 10th Tactical Fighter Squadron from Cold War missions in Europe to combat operations in Desert Storm. From aviation enthusiasts to readers discovering air combat for the first time, this is a compelling story of American airpower and the men and women who made it happen.",
    name: 'Lt Gen Steve "Woody" Wood, USAF (Ret.)',
    role: '10th TFS pilot and Sabre 1 (1991)',
  },
  {
    quote: "Mak scored a 'shack' — a direct hit on the bullseye — with this book.",
    name: 'Col Edward "Julio" Houle, USAF (Ret.)',
    role: 'Former F-16 pilot and 10th TFS Sabre 1',
  },
  {
    quote:
      'The Tenth played hard, trained harder, and fought to win! This book is a must-read for the military enthusiast.',
    name: 'BGen Joey "BooBoo" Booher, USAF (Ret.)',
    role: 'F-16 pilot with the 10th TFS',
  },
  {
    quote:
      "The Fightin' Tenth is an outstanding read that I couldn't put down. Mak puts you in the middle of the action of a story that's exciting and true.",
    name: 'BGen Paul "Doodle" Dordal, USAF (Ret.)',
    role: '10th TFS pilot and Sabre 1 (1987–1989)',
  },
];

const ASSETS: Asset[] = [
  { name: 'Book cover', meta: 'JPG · 74 KB', href: COVER_HREF },
  { name: 'Author photo', meta: 'JPG · 31 KB', href: AUTHOR_PHOTO_HREF },
  { name: 'One-sheet', meta: 'PDF · 1 page · 439 KB', href: ONE_SHEET_HREF },
  {
    name: 'Full press kit',
    meta: 'ZIP · cover, photo, one-sheet, text · 1.1 MB',
    href: PRESS_KIT_ZIP_HREF,
  },
];

const QUICK_FACTS: Fact[] = [
  { k: 'RELEASE', v: '2026-05-05' },
  { k: 'ISBN', v: '979-8-89747-116-4' },
  { k: 'GENRE', v: 'MILITARY MEMOIR / AVIATION' },
  { k: 'CONTACT', v: 'makaturaorlando@gmail.com' },
];

function CopyButton({ getText, label = 'Copy' }: { getText: () => string; label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className={styles.copyBtn}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(getText());
        } catch {
          /* clipboard unavailable */
        }
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1500);
      }}
    >
      {copied ? 'Copied ✓' : label}
    </button>
  );
}

function CopyPanel({ label, paragraphs }: { label: string; paragraphs: string[] }) {
  return (
    <div className={styles.panel}>
      <div className={styles.panelHead}>
        <span className={styles.panelLabel}>{label}</span>
        <CopyButton getText={() => paragraphs.join('\n\n')} />
      </div>
      {paragraphs.map((p, i) => (
        <p key={i} className={styles.panelText}>
          {p}
        </p>
      ))}
    </div>
  );
}

function SectionHead({ index, eyebrow, title }: { index: string; eyebrow: string; title: string }) {
  return (
    <>
      <div className={styles.eyebrow}>
        {index} — {eyebrow}
      </div>
      <h2 className={styles.h2}>{title}</h2>
      <div className={styles.rule} />
    </>
  );
}

export default function PressKit() {
  const [email, setEmail] = useState('makaturaorlando [at] gmail.com');
  useEffect(() => {
    setEmail('makaturaorlando' + '@' + 'gmail.com');
  }, []);

  const numberedGroups = useMemo(() => {
    let n = 0;
    return QUESTION_GROUPS.map((g) => ({
      group: g.group,
      items: g.items.map((q) => ({ n: String(++n).padStart(2, '0'), q })),
    }));
  }, []);

  const allQuestionsText = useMemo(
    () =>
      numberedGroups
        .map(
          (g) => `${g.group.toUpperCase()}\n${g.items.map((i) => `${i.n}. ${i.q}`).join('\n')}`,
        )
        .join('\n\n'),
    [numberedGroups],
  );

  const mailtoHref = `mailto:${email}`;
  const interviewHref = `mailto:${email}?subject=${encodeURIComponent(
    "Interview request — The Fightin' Tenth",
  )}`;

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <header className={styles.hero}>
          <div className={styles.heroEyebrow}>Press Kit</div>
          <h1 className={styles.heroTitle}>The Fightin&rsquo; Tenth</h1>
          <p className={styles.heroSubtitle}>Cold War to Desert Storm</p>
          <p className={styles.pitch}>
            The 10th Tactical Fighter Squadron flew F-16Cs on the front edge of the Cold War —
            then went to war. This is the view from inside the squadron.
          </p>
          <div className={styles.readout}>
            10 TFS &nbsp;·&nbsp; F-16C &nbsp;·&nbsp; HAHN AB, WEST GERMANY &nbsp;·&nbsp; 1989–91
            &nbsp;·&nbsp; OPERATION DESERT STORM
          </div>
          <nav className={styles.nav}>
            {ANCHORS.map((a) => (
              <a key={a.href} href={a.href} className={styles.navLink}>
                {a.label}
              </a>
            ))}
          </nav>
        </header>

        <section id="book" className={styles.section}>
          <SectionHead index="01" eyebrow="At a Glance" title="The book at a glance" />
          <div className={styles.bookRow}>
            <div className={styles.coverCol}>
              <img
                className={styles.cover}
                src={COVER_HREF}
                alt="The Fightin' Tenth — book cover"
              />
            </div>
            <div className={styles.sheetCol}>
              {ONE_SHEET.map((row) => (
                <div key={row.k} className={styles.sheetRow}>
                  <span className={styles.sheetKey}>{row.k}</span>
                  <span className={styles.sheetVal}>{row.v}</span>
                </div>
              ))}
              <div className={styles.buyRow}>
                {BUY_LINKS.map((b) => (
                  <a
                    key={b.label}
                    className={styles.buyBtn}
                    href={b.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {b.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="synopsis" className={styles.section}>
          <SectionHead index="02" eyebrow="Synopsis" title="Synopsis — three lengths" />
          <CopyPanel label="Short · ~25 words" paragraphs={SYNOPSIS_SHORT} />
          <CopyPanel label="Medium · ~100 words" paragraphs={SYNOPSIS_MEDIUM} />
          <CopyPanel label="Long · ~300 words" paragraphs={SYNOPSIS_LONG} />
        </section>

        <section id="author" className={styles.section}>
          <SectionHead index="03" eyebrow="Author" title="Captain Michael Makatura" />
          <div className={styles.authorRow}>
            <div className={styles.photoCol}>
              <img
                className={styles.photo}
                src={AUTHOR_PHOTO_HREF}
                alt="Captain Michael Makatura"
              />
              <a className={styles.photoDownload} href={AUTHOR_PHOTO_HREF} download>
                Download photo — JPG ↓
              </a>
            </div>
            <div className={styles.bioCol}>
              <CopyPanel label="Bio · 50 words" paragraphs={BIO_50} />
              <CopyPanel label="Bio · 150 words" paragraphs={BIO_150} />
              <CopyPanel label="Bio · 300 words" paragraphs={BIO_300} />
            </div>
          </div>
        </section>

        <section id="talking" className={styles.section}>
          <SectionHead index="04" eyebrow="Talking Points" title="Themes a host can riff on" />
          <div className={styles.talkGrid}>
            {TALKING_POINTS.map((t) => (
              <div key={t.title} className={styles.talkItem}>
                <h3 className={styles.talkTitle}>{t.title}</h3>
                <p className={styles.talkBody}>{t.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="qa" className={styles.section}>
          <div className={styles.qaHead}>
            <div>
              <div className={styles.eyebrow}>05 — Interview Questions</div>
              <h2 className={styles.h2}>Sample interview questions</h2>
            </div>
            <CopyButton getText={() => allQuestionsText} label="Copy all" />
          </div>
          <div className={styles.rule} />
          <div className={styles.qaGrid}>
            {numberedGroups.map((g) => (
              <div key={g.group}>
                <div className={styles.qaGroupLabel}>{g.group}</div>
                {g.items.map((q) => (
                  <div key={q.n} className={styles.qaItem}>
                    <span className={styles.qaNum}>{q.n}</span>
                    <span className={styles.qaText}>{q.q}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        <section id="praise" className={styles.section}>
          <SectionHead index="06" eyebrow="Praise" title="Praise &amp; endorsements" />
          <div className={styles.praiseGrid}>
            {PRAISE.map((p) => (
              <figure key={p.name} className={styles.figure}>
                <blockquote className={styles.quote}>&ldquo;{p.quote}&rdquo;</blockquote>
                <figcaption className={styles.figcaption}>
                  <span className={styles.figName}>{p.name}</span> · {p.role}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section id="assets" className={styles.section}>
          <SectionHead index="07" eyebrow="Downloads" title="Downloadable assets" />
          <div className={styles.assetGrid}>
            {ASSETS.map((d) => (
              <a key={d.name + d.meta} className={styles.assetTile} href={d.href} download>
                <span className={styles.assetInfo}>
                  <span className={styles.assetName}>{d.name}</span>
                  <span className={styles.assetMeta}>{d.meta}</span>
                </span>
                <span className={styles.assetArrow}>↓</span>
              </a>
            ))}
          </div>
        </section>

        <section id="contact" className={styles.section}>
          <SectionHead index="08" eyebrow="Contact" title="Booking &amp; press contact" />
          <div className={styles.contactWrap}>
            <div className={styles.contactCol}>
              <div>
                <div className={styles.contactLabel}>Press &amp; Publicity</div>
                <div className={styles.contactVal}>
                  Direct contact via the author — no publicist on this title.
                </div>
              </div>
              <div>
                <div className={styles.contactLabel}>Email</div>
                <a className={styles.emailLink} href={mailtoHref}>
                  {email}
                </a>
              </div>
              <div>
                <div className={styles.contactLabel}>Response time</div>
                <div className={styles.contactVal}>Typically within a few business days</div>
              </div>
            </div>
            <div className={styles.ctaCol}>
              <a className={styles.ctaBtn} href={interviewHref}>
                Email to request an interview →
              </a>
              <div className={styles.ctaNote}>// Scheduling handled directly via email</div>
            </div>
          </div>
        </section>
      </div>

      <div className={styles.ribbon}>
        <div className={styles.ribbonInner}>
          {QUICK_FACTS.map((f) => (
            <span key={f.k}>
              <span className={styles.factKey}>{f.k}</span>
              {f.v}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
