import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // Always use canonical domain - ignore env var that may point to vercel preview
  const base = 'https://www.roserviceinpatna.in';
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/', '/checkout', '/cart', '/wishlist', '/orders', '/auth/', '/login'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin', '/api/', '/checkout'],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
