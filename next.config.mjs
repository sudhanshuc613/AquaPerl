/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'plus.unsplash.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: '*.amazonaws.com' },
      { protocol: 'https', hostname: '*.razorpay.com' },
      { protocol: 'https', hostname: 'images.pexels.com' },
      { protocol: 'https', hostname: '*.pixabay.com' },
      { protocol: 'http', hostname: 'localhost' },
      { protocol: 'https', hostname: '**', pathname: '/**' },
    ],
  },
  // Cache public pages aggressively for SEO speed
  async headers() {
    return [
      {
        source: '/((?!api|admin|_next/static|_next/image|favicon.ico|uploads).*)',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(self)' },
          { key: 'Cache-Control', value: 'public, max-age=0, s-maxage=60, stale-while-revalidate=300' },
        ],
      },
      {
        source: '/uploads/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // Old spam/hacked URLs → 410 Gone (batado Google ko ye page delete ho gaya)
      { source: '/kent-ro-service', destination: '/brands/kent', permanent: false },
      { source: '/kent-ro-service/', destination: '/brands/kent', permanent: false },
      { source: '/:path*/kent-ro-service', destination: '/brands/kent', permanent: false },
      // www is canonical (non-www → www 301 handled by Vercel project setting, extra safety)
    ];
  },
};

export default nextConfig;
