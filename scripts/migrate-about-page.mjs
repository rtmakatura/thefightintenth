// One-off migration: uploads the two About Page photos as Sanity assets and
// createOrReplaces the aboutPage singleton with the v1 hardcoded content
// reshaped to match the new schema (eyebrow, title, leftPhoto, rightPhoto,
// kicker, heading, body[]).
//
// Idempotent: Sanity dedupes uploads by SHA1; doc is upserted by ID.
//
// Run with:
//   node --env-file=.env.local scripts/migrate-about-page.mjs

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

const PUBLIC_DIR = path.join(process.cwd(), 'public');

async function uploadAsset(publicPath) {
  const rel = publicPath.replace(/^\//, '');
  const abs = path.join(PUBLIC_DIR, rel);
  if (!existsSync(abs)) {
    throw new Error(`File not found: ${abs}`);
  }
  const filename = path.basename(abs);
  console.log(`  ↑ upload ${publicPath}`);
  const asset = await client.assets.upload('image', createReadStream(abs), { filename });
  return asset._id;
}

function imageRef(assetId) {
  return { _type: 'image', asset: { _type: 'reference', _ref: assetId } };
}

async function run() {
  console.log('Uploading About Page photos…');
  const leftId = await uploadAsset('/assets/makatura-cockpit-1989.jpg');
  const rightId = await uploadAsset('/assets/makatura-headshot.jpg');

  console.log('\nUpserting aboutPage singleton…');
  const result = await client.createOrReplace({
    _id: 'aboutPage',
    _type: 'aboutPage',
    eyebrow: 'The Author',
    title: 'About the Author',
    leftPhoto: {
      image: imageRef(leftId),
      alt: '2nd Lt. Michael Makatura in the cockpit of an F-16 at Hahn Air Base, 1989',
      caption: '2nd Lt. Makatura · Hahn AB · 1989',
    },
    rightPhoto: {
      image: imageRef(rightId),
      alt: 'Michael Makatura, present day',
      caption: 'Author Portrait · 2025',
    },
    kicker: 'Captain Michael Makatura',
    heading: 'From a Pittsburgh kid to the 10th TFS.',
    body: [
      'Michael Makatura served as the Executive Officer of the 10th Tactical Fighter Squadron at Hahn Air Base, Germany, and later as an Air Force Intelligence Officer where he was the Distinguished Graduate of two Air Force Intelligence Officer schools. Born into a working-class family in Pittsburgh, Pennsylvania, he never imagined he would one day be part of a fighter squadron that would help shape the final days of the Cold War and later participate in Operation Desert Storm.',
      'He wrote this book to honor the men and women of the "Fightin\' Tenth" whose patriotism, professionalism, and courage defined one of the most meaningful periods of his life.',
      '"Mak" graduated from Pitt Johnstown in 1987. He is married to his wife, Rhonda; together they have five children and make their home in Winter Garden, Florida.',
    ],
  });

  console.log(`\nDone. Upserted ${result._id} (rev ${result._rev}).`);
}

run().catch((err) => {
  console.error('\nMigration failed:', err.message ?? err);
  process.exit(1);
});
