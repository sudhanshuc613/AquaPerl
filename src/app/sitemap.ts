import type { MetadataRoute } from 'next';

// Static sitemap (safe for serverless — no DB call at build time to prevent failures).
// Product URLs still get crawled via internal links.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://rokadoctor.in';

  const categories = [
    'ro-purifiers','domestic-ro','uv-uf','spare-parts','ro-membranes','filters',
    'commercial-plants','accessories','pumps','uv-lamps','connectors','under-sink',
    'wall-mount','50-lph','100-lph','250-lph',
  ];

  return [
    { url: `${base}/`, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${base}/book-service`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.95 },
    { url: `${base}/categories/ro-purifiers`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/categories/spare-parts`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/categories/commercial-plants`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/cart`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
    ...categories.map(slug => ({
      url: `${base}/categories/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
  ];
}
