import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ServiceQuickBook from '@/components/service/ServiceQuickBook';
import { BRANDS_SERVICED, PHONES, telLink, waLink, PATNA_AREAS } from '@/lib/utils';
import { Phone, CheckCircle2, Wrench, Clock, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

function getBrand(slug: string) {
  return BRANDS_SERVICED.find(b => b.slug === slug);
}

export function generateStaticParams() {
  return BRANDS_SERVICED.map(b => ({ brand: b.slug }));
}

export async function generateMetadata({ params }: { params: { brand: string } }): Promise<Metadata> {
  const brand = getBrand(params.brand);
  if (!brand) return { title: 'Brand Not Found' };
  return {
    title: `${brand.name} RO Service in Patna | Same-Day Repair @ ₹200 - RO Service Patna`,
    description: `Expert ${brand.name} RO repair, installation & service in Patna. Same-day visit @ ₹200. Genuine ${brand.name} spare parts, trained technicians, 30-day warranty. Call 9241536586.`,
    keywords: [
      `${brand.name} RO service Patna`,`${brand.name} water purifier service Patna`,`${brand.name} RO repair Patna`,
      `${brand.name} service centre Patna`,`${brand.name} RO installation Patna`,`${brand.name} AMC Patna`,
    ],
    alternates: { canonical: `/brands/${params.brand}` },
  };
}

export default function BrandPage({ params }: { params: { brand: string } }) {
  const brand = getBrand(params.brand);
  if (!brand) notFound();

  return (
    <>
      <section className="bg-aqua-gradient text-white py-12">
        <div className="container-pad">
          <p className="text-xs text-white/80"><Link href="/" className="hover:text-white">Home</Link> / <Link href="/brands" className="hover:text-white">Brands</Link> / {brand.name}</p>
          <h1 className="mt-2 text-white text-3xl md:text-5xl">{brand.name} RO Service in Patna</h1>
          <p className="mt-3 max-w-2xl text-white/90 text-lg">
            Certified {brand.name} technician in Patna. Same-day doorstep repair, filter/membrane change, installation.
            100% genuine {brand.name} spare parts, 30-day service warranty.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href={telLink(PHONES.primary)} className="btn-primary bg-white !text-navy-900"><Phone className="h-4 w-4"/>Call {PHONES.primary}</a>
            <a href={waLink(PHONES.whatsapp, `Hi, ${brand.name} RO service chahiye Patna mein.`)} target="_blank" rel="noopener" className="btn-whatsapp">WhatsApp Book</a>
          </div>
        </div>
      </section>

      <div className="container-pad py-10 grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3 space-y-6">
          <div>
            <h2>{brand.name} RO Services We Provide in Patna</h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {[
                `${brand.name} RO repair & troubleshooting`,
                `${brand.name} New RO installation`,
                `${brand} Filter set change (genuine)`,
                `${brand.name} RO Membrane replacement (original)`,
                `${brand} UV lamp replacement`,
                `${brand} TDS calibration & adjustment`,
                `${brand} Leakage / water flow fix`,
                `${brand} Pump / SMPS repair`,
                `${brand.name} AMC / annual maintenance`,
                `${brand} Water tank sanitization`,
                `${brand} Under-sink model service`,
                `${brand} Commercial unit service`,
              ].map(s => (
                <li key={s} className="flex items-start gap-2 p-3 rounded-lg border bg-white">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-green-600"/>{s}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { icon:Clock, title:'Same-Day Visit', sub:'2-4 hours' },
              { icon:Shield, title:'30-Day Warranty', sub:'service par' },
              { icon:Wrench, title:'Genuine Parts', sub:`original ${brand}` },
            ].map(f => (
              <div key={f.title} className="card-surface p-4 text-center">
                <f.icon className="mx-auto h-8 w-8 text-brand-500"/>
                <p className="mt-2 font-bold">{f.title}</p>
                <p className="text-sm text-gray-500">{f.sub}</p>
              </div>
            ))}
          </div>

          <div>
            <h2>Patna Areas for {brand.name} RO Service</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {PATNA_AREAS.slice(0,24).map(a => (
                <Link key={a.slug} href={`/areas/${a.slug}`} className="rounded-full border px-3 py-1.5 text-sm hover:border-brand-500 hover:text-brand-600">📍 {a.name}</Link>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="sticky top-24 space-y-4">
            <ServiceQuickBook/>
            <div className="card-surface p-5 text-center">
              <p className="text-sm">Urgent {brand.name} RO repair?</p>
              <a href={telLink(PHONES.primary)} className="mt-2 block rounded-lg bg-cta-orange py-3 text-lg font-extrabold text-white">📞 {PHONES.primary}</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
