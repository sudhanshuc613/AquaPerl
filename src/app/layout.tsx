import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/cart/CartDrawer';
import SessionProvider from '@/components/providers/SessionProvider';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://rokadoctor.in'),
  title: {
    default: 'AquaNexa (RokaDoctor) - RO Purifier Buy Online | Patna RO Service ₹100',
    template: '%s | AquaNexa - RokaDoctor',
  },
  description:
    'AquaNexa by RokaDoctor: Buy Kent, Aquaguard, Livpure & branded RO water purifiers online at best price in India. Same-day RO repair, installation & service in Patna, Bihar - visit charge only ₹100. Genuine spare parts, membranes, filters, commercial RO plants. Call 8969821440.',
  keywords: [
    // Pan-India eCommerce
    'RO purifier online','buy RO water purifier','best RO purifier India','Kent RO price','Aquaguard RO online',
    'Livpure RO','RO membrane 80 GPD','sediment filter','carbon filter RO','RO spare parts online',
    'commercial RO plant','industrial RO system','RO UV UF purifier','under sink RO','wall mount RO',
    // Patna local SEO (gold mine)
    'RO service Patna','RO repair Patna','RO installation Patna','Patna RO service center',
    'RO repair near me Patna','Kent RO service Patna','Aquaguard service Patna','RO mechanic Patna',
    'RO filter change Patna','RO membrane change Patna','RO AMC Patna','water purifier service Patna Bihar',
    'Boring Road RO service','Kankarbagh RO repair','Patna Sahib RO service','Danapur RO installation',
    'RokaDoctor','rokadoctor.in','AquaNexa Patna',
  ],
  authors: [{ name: 'AquaNexa (RokaDoctor)' }],
  creator: 'AquaNexa',
  publisher: 'AquaNexa',
  category: 'Shopping',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    title: 'AquaNexa (RokaDoctor) - RO Purifiers & Patna RO Service',
    description: 'Buy RO purifiers, spare parts & commercial plants pan-India. Patna RO repair/service only ₹100 visit charge. Genuine parts, expert technicians. Call 8969821440.',
    siteName: 'AquaNexa - RokaDoctor',
    locale: 'en_IN',
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'AquaNexa RO Purifiers & Service' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AquaNexa - RO Purifiers & Patna RO Service ₹100',
    description: 'Best RO purifiers online + Patna local repair service.',
  },
  robots: {
    index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  verification: {
    google: 'google-site-verification', // replace with real code when you get one
  },
  formatDetection: { telephone: true, email: true, address: true },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://rokadoctor.in/#localbusiness',
  name: 'AquaNexa - RokaDoctor RO Service & Sales',
  image: 'https://rokadoctor.in/og.jpg',
  logo: 'https://rokadoctor.in/logo.png',
  url: 'https://rokadoctor.in',
  telephone: ['+91-8969821440', '+91-9661288308'],
  priceRange: '₹100 - ₹1,00,000',
  email: 'support@rokadoctor.in',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Main Road, Patna',
    addressLocality: 'Patna',
    addressRegion: 'Bihar',
    postalCode: '800001',
    addressCountry: 'IN',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 25.5941, longitude: 85.1376 },
  areaServed: [
    { '@type': 'City', name: 'Patna' },
    { '@type': 'AdministrativeArea', name: 'Patna district' },
    { '@type': 'Place', name: 'Boring Road' },
    { '@type': 'Place', name: 'Kankarbagh' },
    { '@type': 'Place', name: 'Patna Sahib' },
    { '@type': 'Place', name: 'Danapur' },
    { '@type': 'Place', name: 'Bailey Road' },
    { '@type': 'Place', name: 'Rajendra Nagar' },
    { '@type': 'Place', name: 'Gandhi Maidan' },
    { '@type': 'Place', name: 'Mithapur' },
    { '@type': 'Place', name: 'Anisabad' },
    { '@type': 'Place', name: 'Phulwari Sharif' },
    // PAN India delivery
    { '@type': 'Country', name: 'India' },
  ],
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
    opens: '08:00', closes: '20:00',
  },
  sameAs: [],
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', reviewCount: '1247' },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'AquaNexa (RokaDoctor)',
  url: 'https://rokadoctor.in',
  logo: 'https://rokadoctor.in/logo.png',
  contactPoint: [
    { '@type': 'ContactPoint', telephone: '+91-8969821440', contactType: 'customer service', areaServed: 'IN', availableLanguage: ['Hindi','English'] },
    { '@type': 'ContactPoint', telephone: '+91-9661288308', contactType: 'service', areaServed: 'Patna', availableLanguage: ['Hindi','English'] },
  ],
  sameAs: [],
};

const webSiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'AquaNexa - RokaDoctor',
  url: 'https://rokadoctor.in',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://rokadoctor.in/categories/ro-purifiers?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#06b6d4" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="geo.region" content="IN-BR" />
        <meta name="geo.placename" content="Patna" />
        <meta name="geo.position" content="25.5941;85.1376" />
        <meta name="ICBM" content="25.5941, 85.1376" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        <SessionProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <CartDrawer />
          <div id="modal-root" />
          <Toaster position="top-right" toastOptions={{ duration: 3500 }} />
        </SessionProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }} />
      </body>
    </html>
  );
}
