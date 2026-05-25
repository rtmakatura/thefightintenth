import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { sanityFetch } from '@/lib/sanity/fetch';
import { siteSettingsQuery } from '@/lib/sanity/queries';
import type { SiteSettings } from '@/lib/sanity/types';

const DEFAULT_TITLE = "The Fightin' Tenth";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await sanityFetch<SiteSettings | null>(siteSettingsQuery);
  const title = settings?.title ?? DEFAULT_TITLE;

  return (
    <>
      <Navbar title={title} />
      <main className="flex-1">{children}</main>
      <Footer title={title} social={settings?.social} />
    </>
  );
}
