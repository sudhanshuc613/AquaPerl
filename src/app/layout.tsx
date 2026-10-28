import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/cart/CartDrawer';
import SessionProvider from '@/components/providers/SessionProvider';
import { Toaster } from 'react-hot-toast';
import { BRAND, PHONES } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.roserviceinpatna.in'),
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    shortcut: '/favicon.ico',
    apple: '/icon-512.png',
  },
  title: {
    default: 'RO Service Patna ₹200 • ☎ 9241536586 | 2-Hour Technician',
    template: '%s | RO Service Patna ☎ 9241536586',
  },
  description:
    'RO repair & installation in Patna. ₹200 visit charge, technician in 2 HRS. All brands (Kent, Aquaguard, Livpure, Pureit, AO Smith). Genuine parts, 30-day warranty, same-day service. Call 9241536586 now! Free TDS test on every visit.',
  keywords: [
    'RO service in Patna','RO repair Patna','RO installation Patna','water purifier service Patna',
    'Kent RO service Patna','Aquaguard service Patna','Livpure service Patna','RO mechanic Patna',
    'RO filter change Patna','RO membrane change Patna','RO AMC Patna',
    'Boring Road RO service','Kankarbagh RO repair','Patna Sahib RO service','Danapur RO installation',
    'Bailey Road RO repair','Rajendra Nagar RO service','Patna RO service center',
    'RO repair near me','RO service near me','water purifier repair near me',
    'RO purifier Patna','RO spare parts Patna','RO membrane price Patna','RO filter price Patna',
    'best RO service in Patna','cheap RO service Patna','same day RO service Patna',
    'RO Service Patna','roserviceinpatna.in',
    'Digha RO service','Kadamkuan RO repair','Kumhrar RO service','Khagaul water purifier service',
    'Patna RO technician','24 hour RO service Patna','RO leakage repair Patna','RO TDS problem Patna',
    'Pureit service Patna','AO Smith service Patna','Blue Star RO repair','Havells RO service Patna',
    'LG RO service','commercial RO plant Patna','RO uninstallation Patna','RO AMC Patna 1499',
    'RO visit charge ₹200','RO repair 2 hours','genuine RO parts Patna',
  ],
  authors: [{ name: 'RO Service Patna' }],
  creator: 'RO Service Patna',
  publisher: 'RO Service Patna',
  category: 'Local Service',
  alternates: { canonical: './' },
  openGraph: {
    type: 'website', url: '/', title: 'RO Service Patna ₹200 • ☎ 9241536586 | 2-Hour Technician',
    description: 'RO repair & installation in Patna. ₹200 visit, 2-hour technician, 30-day warranty, all brands. Call 9241536586.',
    siteName: BRAND.name, locale: 'en_IN',
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'RO Service Patna — ₹200 visit, 2 hour service, Call 9241536586' }],
  },
  twitter: { card: 'summary_large_image', title: 'RO Service Patna ₹200 • ☎ 9241536586' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
  formatDetection: { telephone: true, email: true, address: true },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'Plumber', 'GeneralContractor'],
  '@id': 'https://www.roserviceinpatna.in/#localbusiness',
  name: 'RO Service Patna',
  image: 'https://www.roserviceinpatna.in/og.jpg',
  logo: 'https://www.roserviceinpatna.in/icon-512.png',
  url: 'https://www.roserviceinpatna.in',
  telephone: ['+919241536586', '+919534037266'],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-924-153-6586',
    contactType: 'customer service',
    areaServed: 'IN-BR',
    availableLanguage: ['English', 'Hindi'],
  },
  priceRange: '₹200 - ₹5000',
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
    opens: '07:00',
    closes: '22:00',
  },
  sameAs: [
    'https://www.facebook.com/people/RO-Service-Patna/61570000000000/',
    'https://wa.me/919241536586',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'RO Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'RO Visit & Diagnosis', serviceType: 'diagnosis' }, price: '200', priceCurrency: 'INR' },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'RO Repair', serviceType: 'repair' }, price: '299', priceCurrency: 'INR' },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'RO Routine Service', serviceType: 'service' }, price: '399', priceCurrency: 'INR' },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'RO Installation', serviceType: 'installation' }, price: '499', priceCurrency: 'INR' },
    ],
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '2486',
    bestRating: '5',
    worstRating: '1',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#06b6d4" />
        <meta name="google-site-verification" content="IgBBlqTT4T6ht8lnWBGyEgg0UzIOcSltbScUbFWMOC4" />
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
      </body>
    </html>
  );
}
