// Deletes any stale draft documents for singletons whose schemas have changed.
// Drafts in Sanity are stored as documents with IDs prefixed by `drafts.`.
// When a schema is reshaped, old drafts hold invalid data and can't be
// published without errors.
//
// Run with:
//   node --env-file=.env.local scripts/cleanup-stale-drafts.mjs

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
  perspective: 'raw',
});

// IDs of singletons that have been reshaped in recent migrations.
const SINGLETONS = [
  'aboutPage',
  'homePage',
  'contactPage',
  'siteSettings',
  'book',
  'blogIntro',
  'pressPage',
];

async function run() {
  console.log('Checking for stale drafts…');
  const draftIds = SINGLETONS.map((id) => `drafts.${id}`);
  const existing = await client.fetch(
    `*[_id in $ids]{_id}`,
    { ids: draftIds },
  );

  if (existing.length === 0) {
    console.log('No stale drafts found. Nothing to do.');
    return;
  }

  console.log(`Found ${existing.length} stale draft(s):`);
  for (const d of existing) console.log(`  - ${d._id}`);

  let tx = client.transaction();
  for (const d of existing) tx = tx.delete(d._id);
  const result = await tx.commit();
  console.log(`\nDeleted ${result.results.length} draft(s).`);
}

run().catch((err) => {
  console.error('\nCleanup failed:', err.message ?? err);
  process.exit(1);
});
