import type { MetadataRoute } from 'next';
import { PATNA_AREAS } from '@/lib/utils';

export const revalidate = 60;
export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.roserviceinpatna.in';
  const now = new Date();

  const categories = [
    'ro-purifiers','domestic-ro','uv-uf','under-sink','wall-mount',
    'spare-parts','ro-membranes','filters','uv-lamps','pumps','connectors','accessories',
    'commercial-plants','50-lph','100-lph','250-lph',
  ];

  const brands = [
    'kent','aquaguard-eureka-forbes','livpure','pureit-hul','ao-smith','blue-star',
    'havells','lg','samsung','whirlpool','v-guard','usha-shriram','blue-mount',
    'nasaka','aquafresh','aqua-natural','tata-swach','eureka-forbes',
  ];

  // Problem-specific long-tail pages
  const problems = [
    'ro-leakage-repair','ro-tds-adjustment','ro-no-water','ro-bad-taste-smell',
    'ro-membrane-change','ro-filter-change','ro-low-pressure','ro-noise-sound',
    'ro-installation','ro-service-near-me',
  ];

  const staticUrls = [
    { path: '/', pri: 1.0, freq: 'daily' as const },
    { path: '/book-service', pri: 0.98, freq: 'daily' as const },
    { path: '/ro-service-near-me', pri: 0.96, freq: 'daily' as const },
    { path: '/amc', pri: 0.9, freq: 'weekly' as const },
    { path: '/pricing', pri: 0.85, freq: 'weekly' as const },
    { path: '/brands', pri: 0.8, freq: 'weekly' as const },
    { path: '/categories/ro-purifiers', pri: 0.9, freq: 'weekly' as const },
    { path: '/categories/spare-parts', pri: 0.9, freq: 'weekly' as const },
    { path: '/categories/commercial-plants', pri: 0.9, freq: 'weekly' as const },
    { path: '/contact', pri: 0.7, freq: 'monthly' as const },
    { path: '/about', pri: 0.7, freq: 'monthly' as const },
    { path: '/faq', pri: 0.7, freq: 'monthly' as const },
    { path: '/track-order', pri: 0.3, freq: 'monthly' as const },
    { path: '/privacy-policy', pri: 0.2, freq: 'yearly' as const },
    { path: '/terms', pri: 0.2, freq: 'yearly' as const },
  ];

  return [
    ...staticUrls.map(u => ({
      url: `${base}${u.path}`,
      lastModified: now,
      changeFrequency: u.freq,
      priority: u.pri,
    })),
    ...categories.map(slug => ({
      url: `${base}/categories/${slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.75,
    })),
    ...PATNA_AREAS.map(a => ({
      url: `${base}/areas/${a.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    })),
    ...brands.map(slug => ({
      url: `${base}/brands/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    })),
    ...problems.map(slug => ({
      url: `${base}/problems/${slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  ];
}
