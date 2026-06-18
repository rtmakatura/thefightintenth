import type { Metadata } from 'next';

export const SITE_BASE_URL = 'https://www.thefightintenth.com';

export const SITE_TITLE = "THE FIGHTIN' TENTH — A Memoir by Capt. Michael Makatura";

export const SITE_DESCRIPTION =
  "Cold War to Desert Storm with the 10th — one of NATO's most elite fighter squadrons. A memoir by Captain Michael Makatura.";

export function pageMetadata({
  path,
  title,
  description,
}: {
  path: string;
  title: string;
  description: string;
}): Metadata {
  const url = `${SITE_BASE_URL}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url },
    twitter: { title, description },
  };
}
