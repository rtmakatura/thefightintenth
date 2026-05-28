// Phase 4 migration: creates the pressPage singleton and patches the 6
// existing pressItems with their `type` and `kicker` fields (and marks the
// first one as featured).
//
// Idempotent: re-running upserts via deterministic IDs.
//
// Run with:
//   node --env-file=.env.local scripts/migrate-phase-4.mjs

import { randomUUID } from 'node:crypto';

import { createClient } from '@sanity/client';

function required(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

const client = createClient({
  projectId: required('NEXT_PUBLIC_SANITY_PROJECT_ID'),
  dataset: required('NEXT_PUBLIC_SANITY_DATASET'),
  token: required('SANITY_API_WRITE_TOKEN'),
  apiVersion: '2026-05-23',
  useCdn: false,
});

// ===== v1 PRESS singleton data =====

const PRESS_PAGE = {
  factSheet: {
    title: "THE FIGHTIN' TENTH",
    subtitle: 'Cold War to Desert Storm',
    author: 'Captain Michael Makatura, USAF (Ret.)',
    pubDate: 'May 5, 2026',
    publisher: 'Independently Published',
    format: 'Hardcover · Trade Paperback · eBook',
    pages: '352 pp.',
    isbn: '978-1-XXXXXX-XX-X',
    genre: 'Military Memoir / Aviation History',
    price: '$28.99 (HC) · $18.99 (PB) · $9.99 (eBook)',
  },
  contact: {
    name: 'Press & Media Inquiries',
    email: 'press@michaelmakatura.com',
    phone: 'Available upon request',
    hours: 'Mon–Fri · 0900–1700 ET',
  },
  availability: [
    'Print, broadcast, and podcast interviews',
    'Op-ed contributions on Cold War and Desert Storm history',
    'Speaking engagements: military bases, libraries, civic groups',
    'Book club video calls (small fee waived for veteran groups)',
  ],
  talkingPoints: [
    'What it actually felt like to sit alert at Hahn in the final years of the Cold War.',
    'Why the F-16 Viper became the airframe — and the culture — of a generation.',
    'Inside the 43 days of Desert Storm from the cockpit of a NATO-tasked squadron.',
    "How squadron callsigns get earned (and why they're nearly impossible to lose).",
    'The lessons Cold War aviators carry into a world that looks, again, a lot like 1989.',
    'What civilians most often get wrong about life inside an Air Force fighter squadron.',
  ],
  pullQuotes: [
    { quote: 'The rare military book that lingers on the quiet evenings between the missions.', who: 'Pass the Torch' },
    { quote: 'Honest, unsentimental, and very, very good.', who: 'Air & Space Forces Magazine' },
    { quote: 'Mak writes the way pilots actually talk — clipped, dry, and dead serious about the things that matter.', who: 'The Afterburn Podcast' },
  ],
  appearances: [
    { date: 'MAY 05', weekday: 'TUE', time: '1900', venue: 'Penguin Bookshop · Sewickley, PA', kind: 'Launch · reading + signing' },
    { date: 'MAY 12', weekday: 'TUE', time: '1830', venue: 'Soldiers & Sailors Memorial · Pittsburgh', kind: 'Talk + Q&A' },
    { date: 'MAY 22', weekday: 'FRI', time: '1200', venue: 'Air Force Museum · Dayton, OH', kind: 'Lunchtime lecture' },
    { date: 'JUN 06', weekday: 'SAT', time: '1400', venue: 'Pritzker Military Museum · Chicago', kind: 'Panel + signing' },
    { date: 'JUN 14', weekday: 'SAT', time: '1100', venue: 'USAF Heritage Day · Hill AFB, UT', kind: 'Reading + flightline tour' },
    { date: 'JUN 21', weekday: 'SAT', time: '1500', venue: 'Books-a-Million · Virginia Beach', kind: 'Signing' },
  ],
};

// ===== pressItem patches (type + kicker for each of the 6 already migrated) =====

const PRESS_ITEM_PATCHES = [
  { id: 'pressItem-pass-the-torch', type: 'Feature', kicker: 'Digital magazine', featured: true },
  { id: 'pressItem-air-space-forces-magazine', type: 'Review', kicker: 'Print + online' },
  { id: 'pressItem-the-afterburn-podcast', type: 'Interview', kicker: 'Episode 142 · 58 min' },
  { id: 'pressItem-veterans-breakfast-club', type: 'Conversation', kicker: 'Live · YouTube' },
  { id: 'pressItem-pittsburgh-post-gazette', type: 'Profile', kicker: 'Sunday edition' },
  { id: 'pressItem-wesa-confluence', type: 'Radio', kicker: '20-minute segment' },
];

// ===== migration =====

async function run() {
  console.log('Building Phase 4 migration transaction…');
  let tx = client.transaction();

  // pressPage singleton
  tx = tx.createOrReplace({
    _id: 'pressPage',
    _type: 'pressPage',
    factSheet: PRESS_PAGE.factSheet,
    contact: PRESS_PAGE.contact,
    availability: PRESS_PAGE.availability,
    talkingPoints: PRESS_PAGE.talkingPoints,
    pullQuotes: PRESS_PAGE.pullQuotes.map((q) => ({ _key: randomUUID(), _type: 'pullQuote', ...q })),
    appearances: PRESS_PAGE.appearances.map((a) => ({ _key: randomUUID(), _type: 'appearance', ...a })),
  });

  // Patch each pressItem with type + kicker (+ featured for the first)
  for (const p of PRESS_ITEM_PATCHES) {
    const set = { type: p.type, kicker: p.kicker };
    if (p.featured) set.featured = true;
    tx = tx.patch(p.id, (patch) => patch.set(set));
  }

  const result = await tx.commit();
  console.log(`Done. ${result.results.length} operations applied.`);
  for (const r of result.results) {
    console.log(`  ${r.operation.padEnd(8)} ${r.id}`);
  }
}

run().catch((err) => {
  console.error('Migration failed:', err.message ?? err);
  process.exit(1);
});
