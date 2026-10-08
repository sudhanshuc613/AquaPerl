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
    default: 'RO Service in Patna | ₹200 Visit Charge | Same-Day Repair & Installation - RO Service Patna',
    template: '%s | RO Service Patna',
  },
  description:
    'Patna ka #1 trusted RO repair & installation service. Same-day doorstep service in all Patna areas for just ₹200 visit charge. We service Kent, Aquaguard, Livpure, Pureit, AO Smith and all brands. 10,000+ happy customers. Call 9241536586 now! Genuine spare parts, 30-day service warranty. Also sell RO purifiers, membranes & filters at best price in Patna.',
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
    type: 'website', url: '/', title: 'RO Service in Patna | ₹200 Visit Charge - Same-Day Service',
    description: 'Patna ka #1 RO repair service. ₹200 visit charge. Same-day technician at door. All brands supported. Call 9241536586.',
    siteName: BRAND.name, locale: 'en_IN',
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'RO Service Patna' }],
  },
  twitter: { card: 'summary_large_image', title: 'RO Service Patna - ₹200 Visit Charge' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
  formatDetection: { telephone: true, email: true, address: true },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://www.roserviceinpatna.in/#localbusiness',
  name: 'RO Service Patna',
  image: 'https://www.roserviceinpatna.in/og.jpg',
  url: 'https://www.roserviceinpatna.in',
  telephone: [`+91-${PHONES.primary}`, `+91-${PHONES.secondary}`],
  priceRange: '₹200 - ₹7000',
  email: 'service@roserviceinpatna.in',
  address: { '@type': 'PostalAddress', streetAddress: 'Patna', addressLocality: 'Patna', addressRegion: 'Bihar', postalCode: '800001', addressCountry: 'IN' },
  geo: { '@type': 'GeoCoordinates', latitude: 25.5941, longitude: 85.1376 },
  areaServed: {
    '@type': 'GeoCircle',
    geoMidpoint: { '@type': 'GeoCoordinates', latitude: 25.5941, longitude: 85.1376 },
    geoRadius: '25000',
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
    opens: '08:00', closes: '20:00',
  },
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '2147' },
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
