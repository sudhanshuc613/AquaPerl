import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, Phone, Shield, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PHONES, telLink, waLink, SERVICE_PACKAGES, AMC_PLANS } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'RO Service Price List in Patna | ₹200 Visit, ₹799 Filter, ₹1499 Membrane - RO Service Patna',
  description: 'Transparent RO service price list in Patna. Visit @ ₹200, Filter Change @ ₹799, Membrane @ ₹1499, Installation @ ₹499, AMC @ ₹1499/year. No hidden charges. Call 9241536586.',
  keywords: ['RO service charges Patna','RO repair price Patna','RO filter change cost Patna','RO membrane price Patna','RO installation charges Patna','RO AMC price Patna','RO service rate card Patna'],
  alternates: { canonical: '/pricing' },
};

export default function PricingPage() {
  return (
    <div>
      <section className="bg-aqua-gradient text-white py-14">
        <div className="container-pad text-center">
          <p className="text-xs text-white/80"><Link href="/" className="hover:text-white">Home</Link> / Pricing</p>
          <h1 className="mt-2 text-white text-3xl md:text-5xl">Transparent Price List</h1>
          <p className="mt-3 max-w-2xl mx-auto text-white/90 text-lg">Pehle quote, phir kaam. Koi hidden charge nahi, koi surprise bill nahi.</p>
        </div>
      </section>

      <section className="container-pad py-14">
        <h2 className="text-center text-2xl md:text-3xl">One-Time Service Charges</h2>
        <p className="text-center text-gray-500 mt-2">Patna ke sabse reasonable rates</p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_PACKAGES.map(p => (
            <div key={p.id} className="rounded-2xl border-2 bg-white p-6 hover:border-brand-400 transition">
              <h3 className="font-bold text-lg text-navy-900">{p.name}</h3>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-brand-600">₹{p.price}</span>
                <span className="text-gray-400 line-through">₹{p.mrp}</span>
                <span className="ml-auto rounded bg-green-100 px-2 py-0.5 text-xs font-bold text-green-700">{Math.round((p.mrp-p.price)*100/p.mrp)}% OFF</span>
              </div>
              <ul className="mt-4 space-y-2 text-sm">
                {p.includes.map(f => (
                  <li key={f} className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-green-600"/>{f}</li>
                ))}
              </ul>
              {p.note && <p className="mt-3 text-xs text-orange-600">* {p.note}</p>}
              <a href={waLink(PHONES.whatsapp, `${p.name} service chahiye Patna mein.`)} target="_blank" rel="noopener" className="mt-4 block rounded-lg bg-brand-500 py-2.5 text-center text-sm font-bold text-white hover:bg-brand-600">Book on WhatsApp</a>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-brand-50 py-14">
        <div className="container-pad">
          <h2 className="text-center text-2xl md:text-3xl flex items-center justify-center gap-2"><Shield className="h-7 w-7 text-brand-600"/>Annual AMC Plans</h2>
          <p className="text-center text-gray-500 mt-2">Save ₹3000+ every year</p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {AMC_PLANS.map(p => (
              <div key={p.name} className={`relative rounded-2xl border-2 bg-white p-6 ${p.popular?'border-cta-orange scale-105 shadow-xl':'border-gray-100'}`}>
                {p.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-cta-orange px-3 py-1 text-xs font-bold text-white">⭐ MOST POPULAR</span>}
                <h3 className="font-bold text-xl">{p.name}</h3>
                <div className="mt-2">
                  <span className="text-4xl font-extrabold text-navy-900">₹{p.price}</span><span className="text-gray-400">/year</span>
                  <span className="ml-2 text-sm text-gray-400 line-through">₹{p.mrp}</span>
                </div>
                <ul className="mt-4 space-y-2 text-sm">
                  {p.includes.map(f => <li key={f} className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 mt-0.5 text-green-600 shrink-0"/>{f}</li>)}
                </ul>
                <a href={telLink(PHONES.primary)} className="mt-5 block rounded-lg bg-brand-500 py-2.5 text-center text-sm font-bold text-white hover:bg-brand-600">Call to Subscribe</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-pad py-14">
        <div className="rounded-2xl bg-navy-900 p-8 text-white text-center">
          <h2 className="text-white">Pricing Clear Hai? Service Book Karo</h2>
          <p className="mt-2 text-white/80">15 minute mein call back, 2-4 ghante mein technician aayega.</p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <a href={telLink(PHONES.primary)} className="btn-primary bg-white !text-navy-900"><Phone className="h-4 w-4"/>Call {PHONES.primary}</a>
            <Link href="/book-service"><Button variant="navy" className="bg-white/10 border border-white/30 hover:bg-white/20"><Wrench className="h-4 w-4"/>Book Online</Button></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
