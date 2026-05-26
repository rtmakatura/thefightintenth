import type { PortableTextBlock } from '@portabletext/react';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

export type SanityImage = SanityImageSource & {
  alt?: string;
};

export type SiteSettings = {
  title: string;
  subtitle?: string;
  author: string;
  preorderUrl?: string;
  contactEmail?: string;
  social?: {
    facebook?: string;
    linkedin?: string;
    instagram?: string;
  };
  shareImage?: SanityImage;
};

export type Book = {
  coverImage?: SanityImage;
  pageCount?: number;
  pubDate?: string;
  softcover?: { price?: string; isbn?: string };
  hardcover?: { price?: string; isbn?: string };
  description?: PortableTextBlock[];
};

export type HomePage = {
  heroImage?: SanityImage;
  heroKicker?: string;
  ctaBannerImage?: SanityImage;
  ctaBannerQuote?: string;
};

export type Endorsement = {
  _id: string;
  name: string;
  role?: string;
  detail?: string;
  quote: string;
  rank?: string;
};

export type AboutPage = {
  kicker?: string;
  lede?: string;
  body?: PortableTextBlock[];
  personalNote?: string;
  portrait?: SanityImage;
};

export type Excerpt = {
  _id: string;
  chapter: string;
  chapterNum: number;
  title: string;
  setting?: string;
  pages?: string;
  readMin?: number;
  callsign?: string;
  tag?: string;
  photo?: string;
  opener?: string;
  preview?: string;
  body?: string[];
  inlineImage?: {
    src?: string;
    alt?: string;
    caption?: string;
    afterParagraph?: number;
  };
};

export type BlogPost = {
  _id: string;
  title: string;
  date: string;
  kicker?: string;
  lede?: string;
  excerpt?: string;
  body?: string[];
  signOff?: string;
};

export type BlogIntro = {
  kicker?: string;
  question?: string;
  lede?: string;
  body?: string[];
};

export type PressItem = {
  _id: string;
  outlet: string;
  date?: string;
  headline: string;
  description?: string;
  url: string;
};

export type Photo = {
  _id: string;
  image: SanityImage;
  caption?: string;
};
