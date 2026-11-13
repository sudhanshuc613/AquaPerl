import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const base = 'https://www.roserviceinpatna.in';
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Sirf genuinely private pages disallow — baaki sab allow taaki GSC "blocked by robots.txt" na aaye
        disallow: [
          '/admin/',       // admin panel private
          '/api/',         // APIs private (but /api/og etc allowed nahi hai)
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
