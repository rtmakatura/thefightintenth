import type { SchemaTypeDefinition } from 'sanity';

import { aboutPage } from './documents/aboutPage';
import { blogPost } from './documents/blogPost';
import { book } from './documents/book';
import { endorsement } from './documents/endorsement';
import { excerpt } from './documents/excerpt';
import { homePage } from './documents/homePage';
import { photo } from './documents/photo';
import { pressItem } from './documents/pressItem';
import { siteSettings } from './documents/siteSettings';

export const SINGLETON_TYPES = ['siteSettings', 'book', 'homePage', 'aboutPage'] as const;

export const schemaTypes: SchemaTypeDefinition[] = [
  siteSettings,
  book,
  homePage,
  aboutPage,
  endorsement,
  excerpt,
  blogPost,
  pressItem,
  photo,
];
