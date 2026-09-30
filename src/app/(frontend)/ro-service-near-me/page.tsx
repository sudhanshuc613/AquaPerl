import type { Metadata } from 'next';
import Link from 'next/link';
import ServiceQuickBook from '@/components/service/ServiceQuickBook';
import { PATNA_AREAS, PHONES, telLink, waLink, SERVICE_PACKAGES } from '@/lib/utils';
import { Phone, Clock, Shield, CheckCircle2, MapPin, Wrench, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'RO Service Near Me in Patna | Same-Day RO Repair @ ₹200 Visit - RO Service Patna',
  description: 'Looking for RO service near me in Patna? RO Service Patna provides same-day RO repair, installation, filter & membrane change at ₹200 visit charge. 32+ areas covered. Call 9241536586 now!',
  keywords: [
    'RO service near me','RO repair near me','water purifier service near me','RO mechanic near me',
    'RO service near Patna','RO repair near me in Patna','best RO service near me',
    'nearby RO service centre','water purifier repair near me','RO technician near me',
    'Kent RO service near me','Aquaguard service near me','RO installation near me',
  ],
  alternates: { canonical: '/ro-service-near-me' },
};

export default function NearMePage() {
  return (
    <>
      <section className="bg-gradient-to-br from-orange-500 via-cta-orange to-red-500 text-white">
        <div className="container-pad py-12 md:py-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-xs font-bold backdrop-blur">
            <MapPin className="h-4 w-4 animate-pulse"/> LOCAL SERVICE IN PATNA
          </div>
          <h1 className="mt-4 text-white text-3xl md:text-5xl lg:text-6xl font-extrabold">
            RO Service Near Me <span className="block text-yellow-200">in Patna</span>
          </h1>
          <p className="mt-4 max-w-2xl text-white/95 text-lg">
            Agar aap "RO service near me" search kar rahe ho, toh aap jagah pe aaye ho. Hum Patna ke 32+ areas mein
            <strong> same-day doorstep RO repair</strong> dete hain. Sirf ₹200 visit charge. Call karo abhi.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a href={telLink(PHONES.primary)} className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-bold text-orange-600 shadow-xl hover:scale-105 transition">
              <Phone className="h-5 w-5"/> Call Now {PHONES.primary}
            </a>
            <a href={waLink(PHONES.whatsapp, 'Hi, RO service chahiye near me in Patna.')} target="_blank" rel="noopener" className="btn-whatsapp h-14 rounded-xl px-6">WhatsApp Quick Book</a>
          </div>

          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl">
            {[
              { icon:Clock, title:'2 Hours mein', sub:'technician at door' },
              { icon:Shield, title:'30-Day', sub:'service warranty' },
              { icon:Wrench, title:'₹200 Only', sub:'visit charge' },
              { icon:Star, title:'4.9★ Rated', sub:'by 2486+ customers' },
            ].map((f,i) => (
              <div key={i} className="rounded-xl bg-white/15 backdrop-blur p-4">
                <f.icon className="h-6 w-6 text-yellow-200"/>
                <p className="mt-2 font-bold text-white">{f.title}</p>
                <p className="text-sm text-white/80">{f.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container-pad py-10">
        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3 space-y-8">
            <div>
              <h2>Why RO Service Patna is the Best "RO Service Near Me"?</h2>
              <p className="mt-3 text-gray-600 leading-relaxed">
                Google pe "RO service near me" search karne par bahut options aate hain, lekin sab reliable nahi hote.
                RO Service Patna Patna ka local service provider hai — humare technicians Patna ke har kone mein maujood
                hain, isliye service 2-4 ghante mein pohochti hai.
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {[
                  'Technicians har zone mein deployed hain (2hr response)',
                  '100% genuine company ke spare parts (duplicate kabhi nahi)',
                  'Transparent pricing — kaam se pehle quote',
                  'Koi hidden charge nahi',
                  '30-day service warranty',
                  'All brands serviced (Kent, Aquaguard, Livpure, Pureit, AO Smith etc.)',
                  'Cash/UPI/online payment accepted',
                  'AMC plans starting at ₹1499/year',
                ].map(b => (
                  <div key={b} className="flex items-start gap-2 p-3 rounded-lg bg-green-50">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-green-600 mt-0.5"/>
                    <span className="text-sm">{b}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2>We Serve All These Patna Areas Near You</h2>
              <p className="mt-2 text-sm text-gray-600">Click on your area for specific service details:</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {PATNA_AREAS.map(a => (
                  <Link key={a.slug} href={`/areas/${a.slug}`} className="inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-sm hover:border-brand-500 hover:bg-brand-50 hover:text-brand-600 transition">
                    <MapPin className="h-3 w-3"/> {a.name}
                  </Link>
                ))}
              </div>
              <p className="mt-4 text-sm text-gray-600">
                Agar aapka area list mein nahi dikh raha to bhi <a href={telLink(PHONES.primary)} className="font-bold text-brand-600 hover:underline">call karo</a> — har Patna area mein service dete hain.
              </p>
            </div>

            <div>
              <h2>Quick Pricing (Patna Near-You Service)</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {SERVICE_PACKAGES.slice(0,6).map(p => (
                  <div key={p.id} className="rounded-xl border-2 bg-white p-4">
                    <p className="text-sm font-semibold">{p.name}</p>
                    <p className="mt-1 text-2xl font-extrabold text-navy-900">₹{p.price}</p>
                    <Link href="/pricing" className="text-xs text-brand-600 hover:underline">Details →</Link>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-surface p-6">
              <h3>How to Book RO Service Near Me?</h3>
              <ol className="mt-3 space-y-3">
                {[
                  'Phone/WhatsApp/Online form bharo (1 minute)',
                  'Hum 15 minute mein call back karenge',
                  'Address confirm kar ke technician bhejenge',
                  'Technician 2-4 ghante mein aapke ghar pohoch jayega',
                  'Problem check karega, quote dega',
                  'Approval ke baad repair karega',
                  'Payment cash/UPI/online — 30-day warranty free',
                ].map((s,i) => (
                  <li key={i} className="flex gap-3"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white font-bold">{i+1}</span><span className="pt-1">{s}</span></li>
                ))}
              </ol>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="sticky top-24">
              <ServiceQuickBook/>
              <div className="mt-4 rounded-2xl border-2 border-cta-orange bg-orange-50 p-5 text-center">
                <p className="text-sm text-gray-700">Urgent? Seedha call karo:</p>
                <a href={telLink(PHONES.primary)} className="mt-2 block rounded-xl bg-cta-orange py-3 text-xl font-extrabold text-white hover:bg-orange-600">📞 {PHONES.primary}</a>
                <p className="mt-2 text-xs text-gray-500">Available 7 AM - 10 PM (all days)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
