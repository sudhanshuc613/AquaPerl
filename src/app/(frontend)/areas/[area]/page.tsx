import type { Metadata } from 'next';
import Link from 'next/link';
import ServiceQuickBook from '@/components/service/ServiceQuickBook';
import { PATNA_AREAS, BRANDS_SERVICED, PHONES, telLink, waLink, FAQ } from '@/lib/utils';
import { Phone, CheckCircle2, Clock, Wrench, Shield, MapPin, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function generateStaticParams() {
  return PATNA_AREAS.map(a => ({ area: a.slug }));
}

export async function generateMetadata({ params }: { params: { area: string } }): Promise<Metadata> {
  const area = PATNA_AREAS.find(a => a.slug === params.area);
  const name = area?.name || params.area.replace(/-/g,' ');
  return {
    title: `RO Service in ${name}, Patna | ₹100 Visit Charge - Same Day`,
    description: `Best RO repair & installation service in ${name}, Patna. Same-day doorstep visit at just ₹100. All brands (Kent, Aquaguard, Livpure) supported. 30-day warranty. Call ${PHONES.primary} now!`,
    keywords: [
      `RO service in ${name}`, `RO repair ${name} Patna`, `water purifier service ${name}`,
      `RO installation ${name}`, `Kent RO service ${name}`, `Aquaguard service ${name} Patna`,
      `RO mechanic ${name}`, `RO filter change ${name}`,
    ],
    alternates: { canonical: `/areas/${params.area}` },
  };
}

const pricing = [
  { title:'Basic Visit & Diagnosis', price:100, features:['Doorstep visit', 'Problem diagnosis', 'Repair quote', 'Minor adjustments'] },
  { title:'Filter Change Service', price:499, features:['Sediment + Carbon filter set', 'TDS check', 'Cleaning & sanitization', '30-day warranty'] },
  { title:'Full Service / AMC', price:1499, features:['Complete filter set change', 'Membrane check/change', 'Full sanitization', '3 visits in year'] },
];

export default function AreaPage({ params }: { params: { area: string } }) {
  const area = PATNA_AREAS.find(a => a.slug === params.area);
  const areaName = area?.name || params.area.replace(/-/g,' ').replace(/\b\w/g, c => c.toUpperCase());

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `RO Service ${areaName} Patna`,
    telephone: [`+91-${PHONES.primary}`,`+91-${PHONES.secondary}`],
    address: { '@type':'PostalAddress', addressLocality: areaName, addressRegion:'Patna, Bihar', addressCountry:'IN' },
    areaServed: { '@type':'Place', name: areaName },
    priceRange: '₹100 - ₹5000',
    aggregateRating: { '@type':'AggregateRating', ratingValue:'4.9', reviewCount:'2147' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}/>
      {/* Hero */}
      <section className="bg-aqua-gradient text-white">
        <div className="container-pad py-10 md:py-14">
          <div className="text-xs text-white/80">
            <Link href="/" className="hover:text-white">Home</Link> / Service Areas / <span className="text-white">{areaName}</span>
          </div>
          <h1 className="mt-2 text-white md:text-4xl lg:text-5xl">RO Service in {areaName}, Patna</h1>
          <p className="mt-3 max-w-2xl text-white/90 text-lg">
            Same-day doorstep RO repair & installation in {areaName}. Just ₹100 visit charge.
            We service all brands - Kent, Aquaguard, Livpure, Pureit and more. 100% genuine parts, 30-day warranty.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href={telLink(PHONES.primary)} className="btn-primary bg-white !text-navy-900 hover:bg-gray-100"><Phone className="h-4 w-4"/>Call {PHONES.primary}</a>
            <a href={waLink(PHONES.whatsapp, `Hi, RO service chahiye in ${areaName}`)} className="btn-whatsapp">WhatsApp Book</a>
          </div>
          <div className="mt-5 flex flex-wrap gap-4 text-sm text-white/90">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4"/> Same-day visit</span>
            <span className="flex items-center gap-1"><Shield className="h-4 w-4"/> 30-day warranty</span>
            <span className="flex items-center gap-1"><CheckCircle2 className="h-4 w-4"/> Genuine parts</span>
            <span className="flex items-center gap-1"><Star className="h-4 w-4"/> 4.9★ (2147 reviews)</span>
          </div>
        </div>
      </section>

      <div className="container-pad py-10">
        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3 space-y-8">
            <div>
              <h2>Why Choose Us for RO Service in {areaName}?</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {[
                  { icon:Clock, title:'Same-Day Service', desc:`Book before 4PM, technician ${areaName} mein 2-4 ghante mein pohochta hai` },
                  { icon:Wrench, title:'All Brands Supported', desc:'Kent, Aquaguard, Livpure, Pureit, AO Smith, aur local brands bhi' },
                  { icon:Shield, title:'30-Day Warranty', desc:'Service ke 30 din andar same problem aaye to free fix' },
                  { icon:MapPin, title:'₹100 Fixed Visit', desc:'Koi hidden charge nahi. Visit charge final hai' },
                ].map(f => (
                  <div key={f.title} className="card-surface p-4">
                    <f.icon className="h-6 w-6 text-brand-500"/>
                    <h4 className="mt-2 text-base">{f.title}</h4>
                    <p className="mt-1 text-sm text-gray-600">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2>Services We Provide in {areaName}</h2>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {['RO Repair & Troubleshooting','New RO Installation','Filter Set Change','RO Membrane Replacement','UV Lamp Replacement','TDS Adjustment','Leakage Fix','Low Water Pressure Fix','Bad Taste/Smell Solution','AMC / Annual Maintenance','Commercial RO Service','RO Uninstallation / Reinstallation'].map(s => (
                  <li key={s} className="flex items-start gap-2 rounded-lg border bg-white p-3 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600"/>{s}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2>Brands We Service</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {BRANDS_SERVICED.map(b => <span key={b} className="rounded-full bg-brand-50 px-3 py-1 text-sm font-medium text-brand-700">{b}</span>)}
              </div>
            </div>

            <div>
              <h2>Transparent Pricing</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {pricing.map(p => (
                  <div key={p.title} className="rounded-xl border-2 border-gray-100 bg-white p-5">
                    <h4 className="text-base">{p.title}</h4>
                    <p className="mt-2 text-3xl font-extrabold text-navy-900">₹{p.price}</p>
                    <ul className="mt-3 space-y-1 text-sm text-gray-600">
                      {p.features.map(f=>(<li key={f} className="flex items-start gap-1"><CheckCircle2 className="mt-0.5 h-3 w-3 text-green-600"/>{f}</li>))}
                    </ul>
                    <a href={telLink(PHONES.primary)} className="mt-4 block rounded-lg bg-brand-500 py-2 text-center text-sm font-bold text-white hover:bg-brand-600">Call Now</a>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2>Frequently Asked Questions</h2>
              <div className="mt-4 space-y-2">
                {FAQ.map(f => (
                  <details key={f.q} className="card-surface p-4 group">
                    <summary className="cursor-pointer font-semibold list-none flex items-center justify-between">{f.q}<span className="text-brand-500 group-open:rotate-45 transition">+</span></summary>
                    <p className="mt-2 text-sm text-gray-600">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>

            <div>
              <h2>Other Patna Areas We Serve</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {PATNA_AREAS.filter(a=>a.slug!==params.area).slice(0,12).map(a => (
                  <Link key={a.slug} href={`/areas/${a.slug}`} className="rounded-full border px-3 py-1.5 text-sm hover:border-brand-500 hover:text-brand-600">📍 {a.name}</Link>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="sticky top-24">
              <ServiceQuickBook/>
              <Link href="/book-service"><Button variant="navy" className="mt-4 w-full">Book Full Service Page →</Button></Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
