import { PHONES } from '@/lib/utils';

/**
 * Server-rendered JSON-LD schemas. Phone numbers & prices DB se aate hain.
 */
export default function SiteSchemas({ settings: s }: { settings: Record<string, any> }) {
  const primary = String(s['contact.primaryPhone'] || PHONES.primary);
  const secondary = String(s['contact.secondaryPhone'] || PHONES.secondary);
  const visit = Number(s['service.visitCharge'] ?? 200);
  const repair = Number(s['service.repairLabour'] ?? 299);
  const routine = Number(s['service.routineService'] ?? 399);
  const install = Number(s['service.installation'] ?? 499);

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'Plumber', 'GeneralContractor'],
    '@id': 'https://www.roserviceinpatna.in/#localbusiness',
    name: 'RO Service Patna',
    image: 'https://www.roserviceinpatna.in/og.jpg',
    logo: 'https://www.roserviceinpatna.in/icon-512.png',
    url: 'https://www.roserviceinpatna.in',
    telephone: [`+91${primary}`, `+91${secondary}`],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: `+91-${primary.slice(0,3)}-${primary.slice(3,6)}-${primary.slice(6)}`,
      contactType: 'customer service',
      areaServed: 'IN-BR',
      availableLanguage: ['English', 'Hindi'],
    },
    priceRange: `₹${visit} - ₹5000`,
    email: 'service@roserviceinpatna.in',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Patna',
      addressLocality: 'Patna',
      addressRegion: 'Bihar',
      postalCode: '800001',
      addressCountry: 'IN',
    },
    geo: { '@type': 'GeoCoordinates', latitude: 25.5941, longitude: 85.1376 },
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: { '@type': 'GeoCoordinates', latitude: 25.5941, longitude: 85.1376 },
      geoRadius: '25000',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
      opens: '07:00', closes: '22:00',
    },
    sameAs: [
      'https://wa.me/91' + primary,
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'RO Services Patna',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'RO Visit & Diagnosis', serviceType: 'diagnosis' }, price: String(visit), priceCurrency: 'INR' },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'RO Repair', serviceType: 'repair' }, price: String(repair), priceCurrency: 'INR' },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'RO Routine Service', serviceType: 'service' }, price: String(routine), priceCurrency: 'INR' },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'RO Installation', serviceType: 'installation' }, price: String(install), priceCurrency: 'INR' },
      ],
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9', reviewCount: '2486', bestRating: '5', worstRating: '1',
    },
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://www.roserviceinpatna.in/#organization',
    name: 'RO Service Patna',
    alternateName: 'Aqua RO Patna',
    url: 'https://www.roserviceinpatna.in',
    logo: 'https://www.roserviceinpatna.in/icon-512.png',
    telephone: [`+91${primary}`, `+91${secondary}`],
    email: 'service@roserviceinpatna.in',
    address: { '@type':'PostalAddress', addressLocality:'Patna', addressRegion:'Bihar', postalCode:'800001', addressCountry:'IN' },
    areaServed: { '@type':'City', name:'Patna' },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://www.roserviceinpatna.in/#website',
    url: 'https://www.roserviceinpatna.in',
    name: 'RO Service Patna',
    publisher: { '@id': 'https://www.roserviceinpatna.in/#organization' },
    inLanguage: 'en-IN',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://www.roserviceinpatna.in/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
    </>
  );
}
