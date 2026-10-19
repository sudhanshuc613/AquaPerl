import type { MetadataRoute } from 'next';

// Force Google/Bing to recrawl by updating lastmod to now
export const revalidate = 60;
export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.roserviceinpatna.in';

  const categories = [
    'ro-purifiers','domestic-ro','uv-uf','under-sink','wall-mount',
    'spare-parts','ro-membranes','filters','uv-lamps','pumps','connectors','accessories',
    'commercial-plants','50-lph','100-lph','250-lph',
  ];

  // Import areas and brands
  const areas = [
    'boring-road','kankarbagh','patna-sahib','danapur','bailey-road','rajendra-nagar',
    'gandhi-maidan','mithapur','anisabad','phulwari-sharif','patliputra','kidwaipuri',
    'frazer-road','lohia-nagar','khemnichak','khagaul','saguna-more','beur','bihta',
    'gardanibagh','punaichak','sri-krishna-puri','bakerganj','machuatoli','kurji',
    'dikshanti-nagar','chitkohra','west-patel-nagar','rajiv-nagar','ashok-nagar',
    'jp-nagar','digha','kadamkuan','kumhrar','raja-bazar','khajpura','boring-canal-road',
    'rukanpura','patel-nagar','nala-road','ag-colony','mahendru',
  ];

  const brands = [
    'kent','aquaguard-eureka-forbes','livpure','pureit-hul','ao-smith','blue-star',
    'havells','lg','samsung','whirlpool','v-guard','usha-shriram','blue-mount',
    'nasaka','aquafresh','aqua-natural','tata-swach','eureka-forbes',
  ];

  const now = new Date();

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
    ...areas.map(slug => ({
      url: `${base}/areas/${slug}`,
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
  ];
}
