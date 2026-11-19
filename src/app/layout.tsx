import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/cart/CartDrawer';
import SessionProvider from '@/components/providers/SessionProvider';
import SettingsProvider from '@/components/providers/SettingsProvider';
import { Toaster } from 'react-hot-toast';
import { BRAND, PHONES } from '@/lib/utils';
import { getAllSettings } from '@/lib/settings';
import SiteSchemas from '@/components/site/SiteSchemas';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

// Dynamic metadata — admin se phone/title change karne par Google ko bhi new values milenge
export async function generateMetadata(): Promise<Metadata> {
  const s = await getAllSettings();
  const primary = String(s['contact.primaryPhone'] || PHONES.primary);
  const secondary = String(s['contact.secondaryPhone'] || PHONES.secondary);
  const visit = Number(s['service.visitCharge'] ?? 200);
  const metaTitle = String(s['seo.metaTitle'] || `RO Service Patna ₹${visit} • ☎ ${primary} | 2-Hour Technician`);
  const metaDesc = String(s['seo.metaDescription'] ||
    `RO repair & installation in Patna. ₹${visit} visit charge, technician in 2 HRS. All brands (Kent, Aquaguard, Livpure, Pureit, AO Smith). Genuine parts, 30-day warranty, same-day service. Call ${primary} now! Free TDS test on every visit.`);

  const phoneFmt = primary.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');

  return {
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
      default: metaTitle,
      template: '%s',
    },
    description: metaDesc,
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
      'LG RO service','commercial RO plant Patna','RO uninstallation Patna',
      `RO visit charge ₹${visit}`, 'RO repair 2 hours','genuine RO parts Patna',
    ],
    authors: [{ name: 'RO Service Patna' }],
    creator: 'RO Service Patna',
    publisher: 'RO Service Patna',
    category: 'Local Service',
    alternates: { canonical: './' },
    openGraph: {
      type: 'website', url: '/', title: metaTitle,
      description: `RO repair & installation in Patna. ₹${visit} visit, 2-hour technician, 30-day warranty, all brands. Call ${primary}.`,
      siteName: BRAND.name, locale: 'en_IN',
      images: [{ url: '/og.jpg', width: 1200, height: 630, alt: `RO Service Patna — ₹${visit} visit, 2 hour service, Call ${phoneFmt}` }],
    },
    twitter: { card: 'summary_large_image', title: `RO Service Patna ₹${visit} • ☎ ${phoneFmt}` },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
    formatDetection: { telephone: true, email: true, address: true },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const s = await getAllSettings();
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>
        <SessionProvider>
          <SettingsProvider>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <CartDrawer />
            <div id="modal-root" />
            <Toaster position="top-right" toastOptions={{ duration: 3500 }} />
            {/* JSON-LD schemas (server-rendered, DB ke phone/price use karte hai) */}
            <SiteSchemas settings={s} />
          </SettingsProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
