import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms & Conditions - RO Service Patna',
  description: 'Terms and Conditions for using RO Service Patna (roserviceinpatna.in).',
  robots: { index: true, follow: true },
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <section className="container-pad py-12 max-w-3xl prose prose-sm prose-gray mx-auto">
      <p className="text-xs text-gray-500"><Link href="/" className="hover:underline">Home</Link> / Terms & Conditions</p>
      <h1>Terms & Conditions</h1>
      <p className="text-sm text-gray-500">Last updated: September 2026</p>
      <p>By accessing or using services from RO Service Patna (roserviceinpatna.in), you agree to these terms.</p>
      <h2>Services</h2>
      <p>We provide RO repair, installation, AMC and related services in Patna Bihar, and sell RO purifiers / spare parts across India. Visit charge is ₹200 which is adjusted against the final repair bill if you avail repair.</p>
      <h2>Warranty</h2>
      <p>Services carry a 30-day service warranty. Spare parts carry manufacturer warranty (3-6 months as applicable). Warranty is void if the unit is tampered with by another party after service.</p>
      <h2>Pricing & Payment</h2>
      <p>Prices displayed on the website are indicative. Final repair cost is quoted by the technician after inspection. Payment is to be made on completion via cash/UPI/online.</p>
      <h2>Orders</h2>
      <p>Products sold are subject to availability. Damages in transit must be reported within 24 hours of delivery. Returns are accepted for manufacturing defects only within 7 days.</p>
      <h2>Limitation of Liability</h2>
      <p>We are not liable for any consequential damages arising from use of our products or services beyond the value of the service/order paid.</p>
      <h2>Governing Law</h2>
      <p>These terms are governed by the laws of India. Any disputes are subject to Patna jurisdiction.</p>
    </section>
  );
}
