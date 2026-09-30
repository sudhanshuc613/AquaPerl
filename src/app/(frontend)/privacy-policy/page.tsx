import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy - RO Service Patna',
  description: 'Privacy Policy for RO Service Patna (roserviceinpatna.in). Learn how we handle your personal information.',
  robots: { index: true, follow: true },
  alternates: { canonical: '/privacy-policy' },
};

export default function PrivacyPage() {
  return (
    <section className="container-pad py-12 max-w-3xl prose prose-sm prose-gray mx-auto">
      <p className="text-xs text-gray-500"><Link href="/" className="hover:underline">Home</Link> / Privacy Policy</p>
      <h1>Privacy Policy</h1>
      <p className="text-sm text-gray-500">Last updated: September 2026</p>
      <p>RO Service Patna ("we", "us", "our") operates https://www.roserviceinpatna.in. This page informs you of our policies regarding the collection, use and disclosure of personal information we receive from users of the site.</p>
      <h2>Information We Collect</h2>
      <ul>
        <li>Information you provide via forms: name, phone number, address, pincode, email, service details</li>
        <li>Information required for orders: name, shipping address, phone, payment details (we don't store card info)</li>
        <li>Analytics data (pages visited, device type, referral source)</li>
      </ul>
      <h2>How We Use Your Information</h2>
      <ul>
        <li>To provide RO service delivery and order fulfilment</li>
        <li>To contact you regarding your service request or order</li>
        <li>To send service/order updates via WhatsApp/SMS/Call</li>
        <li>To improve our website and services</li>
      </ul>
      <h2>Information Sharing</h2>
      <p>We do not sell your personal information. We share information only with our service technicians for the purpose of fulfilling your service request, or with payment gateways / courier partners as required for orders.</p>
      <h2>Cookies</h2>
      <p>We use cookies for session management (cart, login) and analytics. You can disable cookies in your browser, though some features may not work.</p>
      <h2>Your Rights</h2>
      <p>You can request deletion of your data or opt out of marketing communications by contacting us at service@roserviceinpatna.in or calling {`${"9241536586"}`}.</p>
      <h2>Contact</h2>
      <p>For any privacy queries, contact us at service@roserviceinpatna.in or call {`${"9241536586"}`}.</p>
    </section>
  );
}
