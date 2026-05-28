import type { SchemaTypeDefinition } from 'sanity';

import { aboutPage } from './documents/aboutPage';
import { blogIntro } from './documents/blogIntro';
import { blogPost } from './documents/blogPost';
import { book } from './documents/book';
import { contactPage } from './documents/contactPage';
import { endorsement } from './documents/endorsement';
import { excerpt } from './documents/excerpt';
import { homePage } from './documents/homePage';
import { photoChapter } from './documents/photoChapter';
import { pressItem } from './documents/pressItem';
import { pressPage } from './documents/pressPage';
import { siteSettings } from './documents/siteSettings';

export const SINGLETON_TYPES = [
  'siteSettings',
  'book',
  'homePage',
  'aboutPage',
  'blogIntro',
  'pressPage',
  'contactPage',
] as const;

export const schemaTypes: SchemaTypeDefinition[] = [
  siteSettings,
  book,
  homePage,
  aboutPage,
  blogIntro,
  pressPage,
  contactPage,
  endorsement,
  excerpt,
  blogPost,
  pressItem,
  photoChapter,
];
