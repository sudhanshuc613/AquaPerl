import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const base = 'https://www.roserviceinpatna.in';
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/', '/checkout', '/cart', '/wishlist', '/orders', '/auth/', '/login', '/api/auth/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin', '/api/', '/checkout', '/auth/', '/login', '/wishlist', '/orders'],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
