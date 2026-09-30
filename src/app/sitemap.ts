import type { MetadataRoute } from 'next';
import { PATNA_AREAS, BRANDS_SERVICED } from '@/lib/utils';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.roserviceinpatna.in';

  const categories = [
    'ro-purifiers','domestic-ro','uv-uf','under-sink','wall-mount',
    'spare-parts','ro-membranes','filters','uv-lamps','pumps','connectors','accessories',
    'commercial-plants','50-lph','100-lph','250-lph',
  ];

  const staticUrls = [
    { path: '/', freq: 'daily' as const, pri: 1.0 },
    { path: '/book-service', freq: 'daily' as const, pri: 0.98 },
    { path: '/ro-service-near-me', freq: 'daily' as const, pri: 0.95 },
    { path: '/about', freq: 'monthly' as const, pri: 0.7 },
    { path: '/contact', freq: 'monthly' as const, pri: 0.7 },
    { path: '/pricing', freq: 'weekly' as const, pri: 0.8 },
    { path: '/amc', freq: 'weekly' as const, pri: 0.9 },
    { path: '/faq', freq: 'monthly' as const, pri: 0.6 },
    { path: '/brands', freq: 'weekly' as const, pri: 0.8 },
    { path: '/categories/ro-purifiers', freq: 'weekly' as const, pri: 0.9 },
    { path: '/categories/spare-parts', freq: 'weekly' as const, pri: 0.9 },
    { path: '/categories/commercial-plants', freq: 'weekly' as const, pri: 0.9 },
    { path: '/track-order', freq: 'monthly' as const, pri: 0.3 },
    { path: '/privacy-policy', freq: 'yearly' as const, pri: 0.2 },
    { path: '/terms', freq: 'yearly' as const, pri: 0.2 },
  ];

  const brandSlugs = BRANDS_SERVICED.map(b => b.slug);

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
      priority: 0.85,
    })),
    ...brandSlugs.map(slug => ({
      url: `${base}/brands/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
