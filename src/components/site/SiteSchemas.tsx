import { PHONES, PATNA_AREAS, FAQ } from '@/lib/utils';

/**
 * Patna city boundary polygon (approximate PMC + Patna Urban Agglomeration limit).
 * Yeh coordinates Google LocalBusiness / serviceArea GeoShape me daalte hain —
 * Google ko exact geographic signal milta hai ki hum "service area business" hain
 * aur poora Patna cover karte hain (bilkul Google Business Profile ke jaisa).
 *
 * Format (schema.org GeoShape polygon): lat1 lng1 lat2 lng2 lat3 lng3 ... (space separated)
 */
const PATNA_POLYGON_COORDS = [
  [25.612, 85.038],
  [25.622, 85.055],
  [25.630, 85.080],
  [25.635, 85.100],
  [25.632, 85.125],
  [25.630, 85.150],
  [25.633, 85.175],
  [25.628, 85.200],
  [25.625, 85.220],
  [25.632, 85.240],
  [25.628, 85.255],
  [25.610, 85.255],
  [25.595, 85.235],
  [25.578, 85.220],
  [25.565, 85.190],
  [25.558, 85.160],
  [25.555, 85.130],
  [25.560, 85.100],
  [25.565, 85.075],
  [25.580, 85.055],
  [25.600, 85.045],
  [25.612, 85.038],
];
const PATNA_POLYGON_STR = PATNA_POLYGON_COORDS.map(([lat,lng]) => `${lat} ${lng}`).join(' ');

/**
 * Server-rendered JSON-LD schemas (ADVANCED LOCAL SEO — Google Local Pack #1 laane ke liye).
 *
 * Special features for Patna local ranking:
 *  - serviceArea with GeoShape polygon (exact Patna boundary — Google Business Profile jaisa)
 *  - areaServed places (30+ Patna localities with pincode)
 *  - @type: LocalBusiness + Plumber + HomeAndConstructionBusiness
 *  - Multiple ContactPoint (customer service + emergency 24×7)
 *  - 24x7 openingHoursSpecification
 *  - AggregateRating + 3 reviews
 *  - FAQPage schema
 *  - hasOfferCatalog with exact prices (6 offers)
 *  - GeoCoordinates + hasMap (specific Google Maps direction link)
 *  - availableLanguage: Hindi + English + Bhojpuri
 *  - CurrenciesAccepted + PaymentAccepted
 */
export default function SiteSchemas({ settings: s }: { settings: Record<string, any> }) {
  const primary = String(s['contact.primaryPhone'] || PHONES.primary);
  const secondary = String(s['contact.secondaryPhone'] || PHONES.secondary || '').trim();
  const visit = Number(s['service.visitCharge'] ?? 200);
  const repair = Number(s['service.repairLabour'] ?? 299);
  const routine = Number(s['service.routineService'] ?? 399);
  const filterChg = Number(s['service.filterChange'] ?? 799);
  const membrane = Number(s['service.membraneChange'] ?? 1499);
  const install = Number(s['service.installation'] ?? 499);

  // Telephone list — secondary hoga tabhi add karo (nahi to Google ko blank number pass hoga)
  const telephones = [`+91${primary}`];
  if (secondary) telephones.push(`+91${secondary}`);

  // areaServed places: Patna ke major localities — Google ko pata chalta hai hum sab jagah service dete hain
  const servedPlaces = PATNA_AREAS.slice(0, 30).map(a => ({
    '@type': 'Place',
    name: a.name,
    address: {
      '@type': 'PostalAddress',
      addressLocality: a.name,
      addressRegion: 'Patna',
      addressCountry: 'IN',
      postalCode: a.pincode,
    },
  }));

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'Plumber', 'GeneralContractor', 'HomeAndConstructionBusiness'],
    '@id': 'https://www.roserviceinpatna.in/#localbusiness',
    name: 'RO Service Patna',
    alternateName: ['Aqua RO Patna', 'RO Service Centre Patna', 'RO Repair Patna'],
    image: [
      'https://www.roserviceinpatna.in/og.jpg',
      'https://www.roserviceinpatna.in/icon-512.png',
    ],
    url: 'https://www.roserviceinpatna.in',
    telephone: telephones,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: `+91-${primary.slice(0,3)}-${primary.slice(3,6)}-${primary.slice(6)}`,
        contactType: 'customer service',
        areaServed: 'Patna',
        availableLanguage: ['English', 'Hindi', 'Bhojpuri'],
        contactOption: 'TollFree',
      },
      {
        '@type': 'ContactPoint',
        telephone: `+91-${primary.slice(0,3)}-${primary.slice(3,6)}-${primary.slice(6)}`,
        contactType: 'emergency',
        areaServed: 'Patna',
        availableLanguage: ['English', 'Hindi'],
      },
    ],
    priceRange: `₹${visit} - ₹10000`,
    email: 'service@roserviceinpatna.in',
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, UPI, Debit Card, Credit Card, GPay, PhonePe',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Main Road',
      addressLocality: 'Patna',
      addressRegion: 'Bihar',
      addressCountry: 'IN',
    },
    geo: { '@type': 'GeoCoordinates', latitude: 25.5941, longitude: 85.1376 },
    hasMap: 'https://www.google.com/maps?q=RO+Service+Patna&ll=25.5941,85.1376',
    // SERVICE AREA BUSINESS (SAB) — Google Business Profile ke jaisa exact polygon
    // 2026 ke liye ye MOST IMPORTANT signal hai (Atlas Digital / Whitespark research)
    serviceArea: {
      '@type': 'GeoShape',
      name: 'Patna RO Service Coverage Zone',
      description: 'Entire Patna city and adjoining localities within 25 km radius',
      polygon: PATNA_POLYGON_STR,
      circle: {
        '@type': 'GeoCircle',
        geoMidpoint: { '@type': 'GeoCoordinates', latitude: 25.5941, longitude: 85.1376 },
        geoRadius: '25000',
      },
    },
    // areaServed with Wikidata entity reference (Patna city Q1353 — Google entity disambiguation ke liye)
    areaServed: [
      ...servedPlaces,
      {
        '@type': 'City',
        name: 'Patna',
        '@id': 'https://www.wikidata.org/wiki/Q1353',
        containedInPlace: { '@type': 'AdministrativeArea', name: 'Patna District', '@id': 'https://www.wikidata.org/wiki/Q1486555' },
        geo: { '@type': 'GeoCoordinates', latitude: 25.5941, longitude: 85.1376 },
      },
      { '@type': 'AdministrativeArea', name: 'Patna District' },
    ],
    keywords: 'RO service Patna, RO repair Patna, Kent RO service Patna, Aquaguard service Patna, RO installation Patna, water purifier service Patna, RO mechanic Patna, RO AMC Patna, Patna RO service centre',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
        opens: '00:00', closes: '23:59',
      },
    ],
    sameAs: [
      'https://wa.me/91' + primary,
      'https://www.facebook.com/roservicepatna',
      'https://www.instagram.com/roservicepatna/',
      'https://www.justdial.com/Patna/Ro-Service-Patna/0612PXX612-XX612-261119122712-E4Z7_BZDET',
      'https://www.indiamart.com/roservicepatna/',
    ],
    // Logo dimensions required by Google logo guidelines
    logo: {
      '@type': 'ImageObject',
      url: 'https://www.roserviceinpatna.in/icon-512.png',
      width: 512, height: 512,
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'RO Water Purifier Services in Patna',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'RO Visit & Diagnosis in Patna', serviceType: 'diagnosis', areaServed: 'Patna' }, price: String(visit), priceCurrency: 'INR', availability: 'https://schema.org/InStock' },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'RO Repair Service in Patna', serviceType: 'repair', areaServed: 'Patna' }, price: String(repair), priceCurrency: 'INR', availability: 'https://schema.org/InStock' },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'RO Routine Service in Patna', serviceType: 'service', areaServed: 'Patna' }, price: String(routine), priceCurrency: 'INR', availability: 'https://schema.org/InStock' },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'RO Filter Change in Patna', serviceType: 'filter-replacement', areaServed: 'Patna' }, price: String(filterChg), priceCurrency: 'INR', availability: 'https://schema.org/InStock' },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'RO Membrane Change in Patna', serviceType: 'membrane-replacement', areaServed: 'Patna' }, price: String(membrane), priceCurrency: 'INR', availability: 'https://schema.org/InStock' },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'New RO Installation in Patna', serviceType: 'installation', areaServed: 'Patna' }, price: String(install), priceCurrency: 'INR', availability: 'https://schema.org/InStock' },
      ],
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '2486',
      ratingCount: '2486',
      bestRating: '5',
      worstRating: '1',
    },
    review: [
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Sumit Kumar' },
        datePublished: '2025-10-15',
        reviewBody: 'Maine Kent RO service ke liye call kiya, 2 ghante mein technician aaya aur problem solve kar di. Charges bhi theek hai. Highly recommended!',
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
        itemReviewed: { '@type': 'LocalBusiness', name: 'RO Service Patna' },
      },
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Priya Sharma' },
        datePublished: '2025-09-22',
        reviewBody: 'Kankarbagh mein rehti hoon, Aquaguard RO ka kaam karwaya. Technician samay par aaya, genuine parts use kiye aur proper demo diya. 6 months warranty bhi mili.',
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
        itemReviewed: { '@type': 'LocalBusiness', name: 'RO Service Patna' },
      },
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Rajeev Ranjan' },
        datePublished: '2025-08-10',
        reviewBody: 'Best RO service in Patna. Membrane change kiya, price sabse kam tha aur genuine membrane lagaya. 2 saal se inhi se service karwa raha hoon.',
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
        itemReviewed: { '@type': 'LocalBusiness', name: 'RO Service Patna' },
      },
    ],
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://www.roserviceinpatna.in/#organization',
    name: 'RO Service Patna',
    alternateName: 'Aqua RO Patna',
    url: 'https://www.roserviceinpatna.in',
    logo: 'https://www.roserviceinpatna.in/icon-512.png',
    telephone: telephones,
    email: 'service@roserviceinpatna.in',
    address: { '@type':'PostalAddress', addressLocality:'Patna', addressRegion:'Bihar', addressCountry:'IN' },
    areaServed: { '@type':'City', name:'Patna', containedInPlace: { '@type':'AdministrativeArea', name:'Bihar' } },
    foundingDate: '2018',
    slogan: 'Patna ka #1 trusted RO repair service',
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

  // FAQ Schema — Google rich snippet
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.slice(0, 8).map((f: any) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}
