import { SITE_BASE_URL, SITE_DESCRIPTION } from './metadata';
import { urlFor } from './sanity/image';
import { toParagraphText } from './sanity/portable';
import type { BlogPost, Book, SiteSettings } from './sanity/types';

const FALLBACK_COVER = `${SITE_BASE_URL}/assets/cover.jpg`;
const PERSON_ID = `${SITE_BASE_URL}/about#person`;

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function parsePrice(raw?: string): string | undefined {
  if (!raw) return undefined;
  const m = raw.match(/[\d.]+/);
  return m ? m[0] : undefined;
}

function priceCurrency(raw?: string): string {
  if (raw && /£/.test(raw)) return 'GBP';
  if (raw && /€/.test(raw)) return 'EUR';
  return 'USD';
}

export function buildBookJsonLd(settings: SiteSettings | null, book: Book | null) {
  const author = settings?.author ?? 'Captain Michael Makatura';
  const publisher = settings?.publisher;
  const preorderUrl = settings?.preorderUrl;
  const cover = book?.coverImage ? urlFor(book.coverImage).width(800).url() : FALLBACK_COVER;
  const description =
    (book?.description ?? []).map(toParagraphText).join(' ').trim() || SITE_DESCRIPTION;

  const buildFormatOffer = (price?: string) => {
    const p = parsePrice(price);
    if (!p || !preorderUrl) return undefined;
    return {
      '@type': 'Offer' as const,
      price: p,
      priceCurrency: priceCurrency(price),
      availability: 'https://schema.org/PreOrder',
      url: preorderUrl,
    };
  };

  const workExample: Record<string, unknown>[] = [];
  if (book?.softcover?.isbn) {
    const offer = buildFormatOffer(book.softcover.price);
    workExample.push({
      '@type': 'Book',
      '@id': `${SITE_BASE_URL}/#book-paperback`,
      bookFormat: 'https://schema.org/Paperback',
      inLanguage: 'en-US',
      isbn: book.softcover.isbn,
      ...(offer && { offers: offer }),
    });
  }
  if (book?.hardcover?.isbn) {
    const offer = buildFormatOffer(book.hardcover.price);
    workExample.push({
      '@type': 'Book',
      '@id': `${SITE_BASE_URL}/#book-hardcover`,
      bookFormat: 'https://schema.org/Hardcover',
      inLanguage: 'en-US',
      isbn: book.hardcover.isbn,
      ...(offer && { offers: offer }),
    });
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'Book',
    '@id': `${SITE_BASE_URL}/#book`,
    name: settings?.title ?? "THE FIGHTIN' TENTH",
    alternateName: settings?.subtitle,
    description,
    image: cover,
    url: SITE_BASE_URL,
    inLanguage: 'en-US',
    author: {
      '@type': 'Person',
      '@id': PERSON_ID,
      name: author,
      url: `${SITE_BASE_URL}/about`,
    },
    ...(publisher && {
      publisher: {
        '@type': 'Organization',
        name: publisher,
      },
    }),
    ...(book?.pubDate && { datePublished: book.pubDate }),
    ...(book?.pageCount && { numberOfPages: book.pageCount }),
    ...(workExample.length > 0 && { workExample }),
  };
}

export function buildPersonJsonLd(settings: SiteSettings | null) {
  const name = settings?.author ?? 'Captain Michael Makatura';
  const sameAs = [
    settings?.social?.facebook,
    settings?.social?.instagram,
    settings?.social?.linkedin,
  ].filter((s): s is string => Boolean(s));

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': PERSON_ID,
    name,
    jobTitle: 'Author',
    description:
      "F-16 pilot, NATO 10th Tactical Fighter Squadron veteran, Operation Desert Storm veteran, and author of THE FIGHTIN' TENTH.",
    url: `${SITE_BASE_URL}/about`,
    ...(sameAs.length > 0 && { sameAs }),
  };
}

export function buildWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_BASE_URL}/#website`,
    name: "THE FIGHTIN' TENTH",
    url: SITE_BASE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: 'en-US',
  };
}

export function buildArticleJsonLd(post: BlogPost) {
  const url = `${SITE_BASE_URL}/blog#post-${slugify(post.title)}`;
  const body = (post.body ?? []).map(toParagraphText).join(' ').trim();
  const description = post.excerpt || post.lede || body.slice(0, 200);

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': url,
    headline: post.title,
    description,
    ...(body && { articleBody: body }),
    ...(post.date && { datePublished: post.date }),
    inLanguage: 'en-US',
    url,
    mainEntityOfPage: url,
    author: {
      '@type': 'Person',
      '@id': PERSON_ID,
      name: 'Captain Michael Makatura',
      url: `${SITE_BASE_URL}/about`,
    },
    publisher: {
      '@type': 'Person',
      '@id': PERSON_ID,
      name: 'Captain Michael Makatura',
    },
  };
}
