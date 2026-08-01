// Podcast referral short links. Add a new slug here and it becomes a 302
// redirect from /<slug> to the homepage with matching UTM parameters.
// Keep slugs distinct from real routes (about, blog, contact, endorsements,
// excerpts, news, photos, press, studio) — redirects run before page routes.
const PODCAST_REFERRAL_SLUGS = [
  'cwc',
  'beard',
  'fafo',
  'middle',
  'truestory',
  'cuppa',
  'elsplend',
  'infinite',
];

const podcastRedirect = (slug) => ({
  source: `/${slug}`,
  destination: `/?utm_source=${slug}&utm_medium=podcast&utm_campaign=fightin-tenth`,
  permanent: false, // temporary redirect — destinations may change later
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return PODCAST_REFERRAL_SLUGS.map(podcastRedirect);
  },
  async headers() {
    return [
      {
        // Prevent browser caching of every site-rendered page so Sanity edits
        // appear on the next request without requiring a hard refresh.
        // The /studio bundle still benefits from default Next.js asset caching.
        source: '/((?!studio|_next/static|_next/image|api).*)',
        headers: [
          { key: 'Cache-Control', value: 'no-store, must-revalidate' },
        ],
      },
    ];
  },
};

export default nextConfig;
