// Phase 5 migration: uploads all photo + excerpt image binaries from /public
// to Sanity's asset library, then creates 3 photoChapter docs (Hahn / Storm /
// Squadron) and patches the 3 excerpts to reference the uploaded images.
//
// Idempotent: Sanity dedupes uploads by SHA1, so re-running won't duplicate
// binaries. Chapter docs are createOrReplace (deterministic IDs).
//
// Run with:
//   node --env-file=.env.local scripts/migrate-phase-5.mjs
//
// Requires SANITY_API_WRITE_TOKEN in .env.local (Editor permission).

import { randomUUID } from 'node:crypto';
import { createReadStream, existsSync } from 'node:fs';
import path from 'node:path';

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

const PROJECT_ROOT = process.cwd();
const PUBLIC_DIR = path.join(PROJECT_ROOT, 'public');

const uploadCache = new Map();

async function uploadAsset(publicPath) {
  if (uploadCache.has(publicPath)) return uploadCache.get(publicPath);
  const rel = publicPath.replace(/^\//, '');
  const abs = path.join(PUBLIC_DIR, rel);
  if (!existsSync(abs)) {
    console.warn(`  ⚠ skip (missing file): ${publicPath}`);
    uploadCache.set(publicPath, null);
    return null;
  }
  const filename = path.basename(abs);
  console.log(`  ↑ upload ${publicPath}`);
  const asset = await client.assets.upload('image', createReadStream(abs), { filename });
  uploadCache.set(publicPath, asset._id);
  return asset._id;
}

function imageRef(assetId) {
  return {
    _type: 'image',
    asset: { _type: 'reference', _ref: assetId },
  };
}

// ===== v1 PHOTO_CHAPTERS =====

const PHOTO_CHAPTERS = [
  {
    id: 'hahn',
    kicker: 'Chapter I',
    title: 'Hahn Air Base · Germany',
    dates: '1988 — 1990',
    blurb:
      'Cold-War alert duty in the Hunsrück. Ramp inspections at dawn, four-ships over the Mosel, and weekend escapes to vineyards a half-hour from the wire.',
    plates: [
      { src: '/assets/f16s-hahn.jpg', span: 'wide-tall', label: 'Two-ship · Hunsrück', caption: 'A pair of 10th TFS Vipers over the Hunsrück, tail code HR.' },
      { src: '/assets/photos/mak-with-jet.jpg', span: 'tall', label: 'Boom-Boom · HR-377', caption: 'Author with HR-377 in the hangar at Hahn — early winter, 1989.' },
      { src: '/assets/photos/jd-mak-grenze.jpg', span: 'wide', label: 'Inner-German Border', caption: '"Achtung! diesseitiges Ufer Grenze." JD and Mak on the western bank, looking east.' },
      { src: '/assets/photos/hans-und-franz.jpg', span: 'tall', label: 'Hans und Franz · June 1989', caption: 'A summer night at the squadron bar — long before anyone said the word "Desert."' },
      { src: '/assets/photos/mosel-vineyards.jpg', span: 'tall', label: 'Mosel Vineyards', caption: 'Riesling country: terraced slopes above the Mosel, a thirty-minute drive from the flight line.' },
      { src: '/assets/flightops.jpg', span: 'wide', label: 'Over the Mosel', caption: 'A 10TFS Viper banking over the Mosel — tail proudly displaying the squadron heraldry.' },
    ],
  },
  {
    id: 'storm',
    kicker: 'Chapter II',
    title: 'Desert Storm',
    dates: 'January — March 1991',
    blurb:
      'Forty-three days of combat operations from Al Minhad. Saudi divert charts in the kneeboard, ordnance loaded and signed, the ramp at sunrise.',
    plates: [
      { src: '/assets/photos/cockpit-helmet.jpg', span: 'wide-tall', label: 'RTB · 22 Jan 91', caption: 'Two-ship returning to base after a deep strike — wingman framed in the canopy bow.' },
      { src: '/assets/photos/cbu-message.jpg', span: 'tall', label: 'Hand-Inked Ordnance', caption: '"Hey Saddam, feel fortunate. Barney wanted to string you up on the F-86." CBU-87, 27 Feb 91.' },
      { src: '/assets/photos/gun-camera.png', span: 'square', label: 'HUD Tape', caption: 'CCIP solution captured on gun-camera tape — STPT 8, 13:03:19 local.' },
      { src: '/assets/photos/divert-map.jpg', span: 'wide', label: 'Divert Field Chart', caption: "Author's working chart of Saudi divert fields — circles in red and blue grease pencil, January 1991." },
      { src: '/assets/photos/tanker-eight.jpg', span: 'wide-tall', label: 'The Tanker Eight', caption: 'Eight Sabres post-mission, 22 January 1991 — first long-range package, home in one piece.' },
      { src: '/assets/photos/abner-ivan-joey-psycho.jpg', span: 'tall', label: 'Abner · Ivan · Joey · Psycho', caption: 'Four-ship on the Al Minhad ramp before stepping to the jets.' },
      { src: '/assets/photos/moap-flightline.jpg', span: 'wide', label: 'Mother of All Parties · 2 Mar 91', caption: 'Cat Canavan, JD Hay, Blake Motlong on the flightline — autographs on a USO program the day after the cease-fire.' },
    ],
  },
  {
    id: 'squadron',
    kicker: 'Chapter III',
    title: 'The Squadron',
    dates: 'Hahn · Al Minhad · Hahn',
    blurb:
      'Crud in the bar, hooches built from scrap lumber, swords presented in front of plywood shields. The fraternity that flew the missions and remade itself between them.',
    plates: [
      { src: '/assets/photos/squadron-group.jpg', span: 'wide-tall', label: 'The Sabres', caption: 'The 10th Tactical Fighter Squadron in front of HR-267 at Al Minhad, March 1991.' },
      { src: '/assets/photos/building-hooch.jpg', span: 'wide', label: 'Building the Hooch', caption: 'Scrap lumber, two-by-fours, and a desert sky — the squadron building its own quarters at Al Minhad.' },
      { src: '/assets/photos/chowhallenweg.jpg', span: 'tall', label: 'Chowhallenweg · Meisterstraße', caption: 'Hand-painted street signs — German precision applied to a Saudi tent city.' },
      { src: '/assets/photos/vipers-pit-interior.jpg', span: 'wide', label: "Vipers' Pit", caption: 'The squadron bar at Al Minhad — patches on the wall, beer on the table, the cease-fire still warm.' },
      { src: '/assets/photos/frenchie-aloha.jpg', span: 'tall', label: 'Frenchie', caption: 'Frenchie in full aloha kit — squadron color, off the clock.' },
      { src: '/assets/photos/uso-randy-travis.jpg', span: 'tall', label: 'USO · Randy Travis', caption: 'Cat and Dewey getting an autograph on the flightline — USO swing through the Gulf, 1991.' },
      { src: '/assets/photos/sword-presento.jpg', span: 'wide', label: 'Sabre One · Going-Away', caption: 'A presentation sword for the outgoing commander — June 1991, back at Hahn.' },
      { src: '/assets/photos/doodle-trophy.jpg', span: 'tall', label: 'Doodle Trophy', caption: 'The Doodle Trophy — black-and-white print of a tradition older than the squadron itself.' },
      { src: '/assets/photos/homecoming.jpg', span: 'wide', label: 'Homecoming', caption: "Spring 1991 — flight suit, flowers, a Polaroid in someone's hand, and three small arms holding on." },
    ],
  },
];

// ===== Excerpt image refs =====

const EXCERPT_IMAGES = [
  {
    id: 'excerpt-1',
    photo: '/assets/excerpts/ch01-formation.jpg',
    inline: {
      src: '/assets/excerpts/ch01-hud.png',
      alt: 'F-16 HUD frame from a CCIP bombing run',
      caption: 'F-16 HUD / gun-camera frame — CCIP bombing solution at 500 ft AGL.',
      afterParagraph: 2,
    },
  },
  {
    id: 'excerpt-5',
    photo: '/assets/excerpts/ch05-callsigns.jpg',
    inline: {
      src: '/assets/excerpts/ch05-pilots.jpg',
      alt: '10th Tactical Fighter Squadron pilots',
      caption: '10th TFS · Hahn Air Base.',
      afterParagraph: 3,
    },
  },
  {
    id: 'excerpt-15',
    photo: '/assets/excerpts/ch15-tac-eval.jpg',
    inline: null,
  },
];

// ===== migration =====

async function run() {
  console.log('Phase 5 migration starting…\n');
  console.log('Step 1/3 · Uploading binaries to Sanity asset library');

  // Pre-upload everything sequentially so we can show progress and
  // populate the cache. (Could be parallelized, but sequential keeps
  // the log readable and is fast enough for ~30 small images.)
  for (const c of PHOTO_CHAPTERS) {
    for (const p of c.plates) await uploadAsset(p.src);
  }
  for (const e of EXCERPT_IMAGES) {
    await uploadAsset(e.photo);
    if (e.inline) await uploadAsset(e.inline.src);
  }

  console.log(`\nStep 2/3 · Building transaction (${uploadCache.size} assets cached)`);
  let tx = client.transaction();

  // Create photo chapters
  PHOTO_CHAPTERS.forEach((c, idx) => {
    const plates = c.plates
      .map((p) => {
        const assetId = uploadCache.get(p.src);
        if (!assetId) return null;
        return {
          _key: randomUUID(),
          _type: 'plate',
          image: imageRef(assetId),
          span: p.span,
          label: p.label,
          caption: p.caption,
        };
      })
      .filter(Boolean);

    tx = tx.createOrReplace({
      _id: `photoChapter-${c.id}`,
      _type: 'photoChapter',
      order: (idx + 1) * 10,
      kicker: c.kicker,
      title: c.title,
      dates: c.dates,
      blurb: c.blurb,
      plates,
    });
  });

  // Patch excerpts with image refs
  for (const e of EXCERPT_IMAGES) {
    const photoId = uploadCache.get(e.photo);
    const setOps = {};
    const unsetOps = [];
    if (photoId) setOps.photo = imageRef(photoId);

    if (e.inline) {
      const inlineId = uploadCache.get(e.inline.src);
      if (inlineId) {
        setOps.inlineImage = {
          image: imageRef(inlineId),
          alt: e.inline.alt,
          caption: e.inline.caption,
          afterParagraph: e.inline.afterParagraph,
        };
      } else {
        unsetOps.push('inlineImage');
      }
    } else {
      unsetOps.push('inlineImage');
    }

    tx = tx.patch(e.id, (p) => {
      let chain = p;
      if (Object.keys(setOps).length) chain = chain.set(setOps);
      if (unsetOps.length) chain = chain.unset(unsetOps);
      return chain;
    });
  }

  console.log('Step 3/3 · Committing transaction');
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
