import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://rokadoctor.in';
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/admin', '/api', '/checkout'] },
      { userAgent: 'Googlebot', allow: '/', disallow: ['/admin', '/api', '/checkout'] },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
