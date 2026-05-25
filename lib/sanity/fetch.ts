import { cache } from 'react';

import { client } from './client';

export const sanityFetch = cache(async <T>(query: string): Promise<T> => {
  return client.fetch<T>(query);
});
