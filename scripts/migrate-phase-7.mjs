// Phase 7 migration: populates the expanded homePage singleton, the new
// contactPage singleton, and adds `publisher` to siteSettings.
//
// Idempotent: createOrReplace + set patches.
//
// Run with:
//   node --env-file=.env.local scripts/migrate-phase-7.mjs

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

const k = () => randomUUID();

const HOME_PAGE = {
  hero: {
    bylineLabel: 'A memoir by',
    titleLine1: "THE FIGHTIN'",
    titleLine2: 'TENTH',
    hud: [
      { _key: k(), _type: 'hudRow', label: 'Squadron', value: '10 TFS' },
      { _key: k(), _type: 'hudRow', label: 'Base', value: 'HAHN AB' },
      { _key: k(), _type: 'hudRow', label: 'Airframe', value: 'F-16C', accent: true },
      { _key: k(), _type: 'hudRow', label: 'Tail', value: 'HR-1310' },
      { _key: k(), _type: 'hudRow', label: 'Era', value: '1989—91' },
    ],
  },
  telemetryItems: [
    { _key: k(), _type: 'telemetryItem', em: '10TFS', text: 'HAHN AB' },
    { _key: k(), _type: 'telemetryItem', text: '49°56′N · 7°16′E' },
    { _key: k(), _type: 'telemetryItem', em: 'SABRES', text: '· NATO TAC EVAL · 1989' },
    { _key: k(), _type: 'telemetryItem', text: 'OP DESERT STORM · 1991' },
    { _key: k(), _type: 'telemetryItem', text: 'VIPER · F-16C BLOCK 30' },
    { _key: k(), _type: 'telemetryItem', em: '282 PAGES', text: '· KOEHLER BOOKS' },
    { _key: k(), _type: 'telemetryItem', text: 'PUB DATE 05.05.26' },
  ],
  aboutBook: {
    kicker: 'The Book',
    heading: 'A squadron, a Viper,',
    headingEm: 'and the years that defined them.',
    lede:
      "Behind the wire of one of NATO's most elite tactical fighter squadrons — the 10th — during the tense final years of the Cold War and into Operation Desert Storm. Part history, part military life, part personal transformation.",
    acts: [
      {
        _key: k(),
        _type: 'act',
        num: 'I.',
        label: 'Act One · 1987–1989',
        title: 'Officer Training and the long road to Hahn.',
        body:
          'The mental gauntlet of OTS, the wide-eyed arrival in Europe, and the first taxi out of a fighter ramp as a brand-new lieutenant.',
      },
      {
        _key: k(),
        _type: 'act',
        num: 'II.',
        label: 'Act Two · 1989–1990',
        title: 'The Tenth, the Mosel, and life on the wire.',
        body:
          'Nuclear cert, low-level training at 540 knots, evenings in the river valley villages, and the brotherhood that grew up around the Sabres.',
      },
      {
        _key: k(),
        _type: 'act',
        num: 'III.',
        label: 'Act Three · 1991',
        title: 'Desert Storm and the proving of the squadron.',
        body:
          'The deployment east, hundreds of high-risk missions over Iraq, SCUD hunts, and the way a unit forged in peace performs under fire.',
      },
    ],
  },
  patchInterlude: {
    topLabel: '10 TFS',
    bottomLabel: 'Sabres',
    mantra:
      'The culture demanded thick skin, sharp wits, and absolute focus. It chewed up the lazy and spit out the unprepared.',
    mantraSource: "— from The Fightin' Tenth",
  },
  ctaBanner: {
    kicker: "Who It's For",
    audiences: ['Veterans', 'Aviation buffs', 'Cold War history fans', 'Squadron families'],
    tagline:
      "— and anyone who's ever wondered what it's really like to be part of a United States Air Force fighter squadron.",
  },
};

const CONTACT_PAGE = {
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

async function run() {
  console.log('Building Phase 7 migration transaction…');
  const tx = client.transaction();

  tx.createOrReplace({ _id: 'homePage', _type: 'homePage', ...HOME_PAGE });
  tx.createOrReplace({ _id: 'contactPage', _type: 'contactPage', ...CONTACT_PAGE });
  tx.patch('siteSettings', (p) => p.set({ publisher: 'Koehler Books' }));

  const result = await tx.commit();
  console.log(`\nDone. ${result.results.length} operations applied.`);
  for (const r of result.results) {
    console.log(`  ${r.operation.padEnd(8)} ${r.id}`);
  }
}

run().catch((err) => {
  console.error('\nMigration failed:', err.message ?? err);
  process.exit(1);
});
