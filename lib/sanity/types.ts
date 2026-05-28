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
  publisher?: string;
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

export type HudRow = { label?: string; value?: string; accent?: boolean };

export type Act = { num?: string; label?: string; title?: string; body?: string };

export type TelemetryItem = { em?: string; text: string };

export type HomePage = {
  hero?: {
    bylineLabel?: string;
    titleLine1?: string;
    titleLine2?: string;
    hud?: HudRow[];
  };
  telemetryItems?: TelemetryItem[];
  aboutBook?: {
    kicker?: string;
    heading?: string;
    headingEm?: string;
    lede?: string;
    acts?: Act[];
  };
  patchInterlude?: {
    topLabel?: string;
    bottomLabel?: string;
    mantra?: string;
    mantraSource?: string;
  };
  ctaBanner?: {
    kicker?: string;
    audiences?: string[];
    tagline?: string;
  };
};

export type ContactPage = {
  readout?: {
    stationLabel?: string;
    stationValue?: string;
    hoursLabel?: string;
    hoursValue?: string;
    replyLabel?: string;
    replyValue?: string;
  };
  lede?: string;
  subLede?: string;
  directCard?: {
    tag?: string;
    title?: string;
    note?: string;
  };
};

export type Endorsement = {
  _id: string;
  name: string;
  role?: string;
  detail?: string;
  quote: string;
  rank?: string;
};

export type AboutPagePhoto = {
  image?: SanityImage;
  alt?: string;
  caption?: string;
};

export type AboutPage = {
  eyebrow?: string;
  title?: string;
  leftPhoto?: AboutPagePhoto;
  rightPhoto?: AboutPagePhoto;
  kicker?: string;
  heading?: string;
  body?: string[];
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
  photo?: SanityImage;
  opener?: string;
  preview?: string;
  body?: string[];
  inlineImage?: {
    image?: SanityImage;
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
  type?: string;
  kicker?: string;
  date?: string;
  headline: string;
  description?: string;
  url: string;
  featured?: boolean;
  order?: number;
};

export type PressPage = {
  factSheet?: {
    title?: string;
    subtitle?: string;
    author?: string;
    pubDate?: string;
    publisher?: string;
    format?: string;
    pages?: string;
    isbn?: string;
    genre?: string;
    price?: string;
  };
  contact?: {
    name?: string;
    email?: string;
    phone?: string;
    hours?: string;
  };
  availability?: string[];
  talkingPoints?: string[];
  pullQuotes?: { quote: string; who?: string }[];
  appearances?: {
    date?: string;
    weekday?: string;
    time?: string;
    venue: string;
    kind?: string;
    url?: string;
  }[];
};

export type PhotoPlate = {
  image: SanityImage;
  span?: 'wide' | 'tall' | 'wide-tall' | 'square';
  label?: string;
  caption?: string;
};

export type PhotoChapter = {
  _id: string;
  order?: number;
  kicker?: string;
  title: string;
  dates?: string;
  blurb?: string;
  plates?: PhotoPlate[];
};
