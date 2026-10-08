/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: '**' },
    ],
  },
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: false },
  async redirects() {
    return [
      // Force www canonical so Google doesn't split ranking between www and non-www
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'roserviceinpatna.in' }],
        destination: 'https://www.roserviceinpatna.in/:path*',
        permanent: true,
      },
      // OLD purane slugs 301 redirect to new pages (GSC mein purane urls the)
      { source: '/brands/aquanexa', destination: '/', permanent: true },
      { source: '/brands/generic-local-brands', destination: '/', permanent: true },
      { source: '/product/aquafresh', destination: '/brands/aquafresh', permanent: true },
      { source: '/product/aqn-mem-80', destination: '/categories/ro-membranes', permanent: true },
      { source: '/product/aqn-c100', destination: '/categories/commercial-plants', permanent: true },
      { source: '/product/commercial-50-lph', destination: '/categories/50-lph', permanent: true },
      { source: '/product/commercial-frp-100', destination: '/categories/100-lph', permanent: true },
      { source: '/product/aquanexa-pro-12l', destination: '/product/ro-patna-pro-12l', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },
};

export default nextConfig;
