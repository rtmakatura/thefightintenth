import Nav from '@/components/Nav/Nav';
import Footer from '@/components/Footer/Footer';
import { sanityFetch } from '@/lib/sanity/fetch';
import { siteSettingsQuery } from '@/lib/sanity/queries';
import type { SiteSettings } from '@/lib/sanity/types';

export const revalidate = 60;

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await sanityFetch<SiteSettings | null>(siteSettingsQuery);

  return (
    <>
      <Nav title={settings?.title} />
      {children}
      <Footer
        title={settings?.title}
        author={settings?.author}
        social={settings?.social}
      />
    </>
  );
}
