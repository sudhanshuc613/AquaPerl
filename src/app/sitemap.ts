import type { MetadataRoute } from 'next';
import { PATNA_AREAS } from '@/lib/utils';

// Static sitemap - must include ALL important pages for Google indexing.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.roserviceinpatna.in').replace(/\/$/, '');

  const categories = [
    'ro-purifiers','domestic-ro','uv-uf','under-sink','wall-mount',
    'spare-parts','ro-membranes','filters','uv-lamps','pumps','connectors','accessories',
    'commercial-plants','50-lph','100-lph','250-lph',
  ];

  const staticUrls = [
    { path: '/', freq: 'daily' as const, pri: 1.0 },
    { path: '/book-service', freq: 'daily' as const, pri: 0.98 },
    { path: '/amc', freq: 'weekly' as const, pri: 0.9 },
    { path: '/categories/ro-purifiers', freq: 'weekly' as const, pri: 0.9 },
    { path: '/categories/spare-parts', freq: 'weekly' as const, pri: 0.9 },
    { path: '/categories/commercial-plants', freq: 'weekly' as const, pri: 0.9 },
    { path: '/track-order', freq: 'monthly' as const, pri: 0.3 },
    { path: '/auth/login', freq: 'yearly' as const, pri: 0.2 },
    { path: '/auth/register', freq: 'yearly' as const, pri: 0.2 },
  ];

  return [
    ...staticUrls.map(u => ({
      url: `${base}${u.path}`,
      lastModified: new Date(),
      changeFrequency: u.freq,
      priority: u.pri,
    })),
    ...categories.map(slug => ({
      url: `${base}/categories/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.75,
    })),
    ...PATNA_AREAS.map(a => ({
      url: `${base}/areas/${a.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.85,  // area pages HIGH priority for local SEO
    })),
  ];
}
