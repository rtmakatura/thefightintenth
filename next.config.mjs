/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
