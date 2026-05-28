import { createClient } from 'next-sanity';

import { apiVersion, dataset, projectId } from './env';

// useCdn: false so each ISR regeneration gets fresh data from Sanity's API.
// With useCdn: true, the Sanity CDN can serve up-to-60s-stale data on top of
// Next.js's own 60s revalidate, which stacks to ~2 min lag between Publish in
// Studio and the change appearing on the live site. The cost is a slightly
// slower fetch per regeneration; volume is low so this is the right tradeoff.
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});
