/** @type {import('next').NextConfig} */
// build: 2026-06-27
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'iqzwviqsqmstafxarkuw.supabase.co' },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Robots-Tag', value: 'index, follow' },
        ],
      },
    ]
  },
}

module.exports = nextConfig
