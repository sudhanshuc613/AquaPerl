import type { Metadata } from 'next';
import Link from 'next/link';
import ServiceQuickBook from '@/components/service/ServiceQuickBook';
import { PATNA_AREAS, BRANDS_SERVICED, PHONES, telLink, waLink, FAQ, getAreaSEO, SERVICE_PACKAGES } from '@/lib/utils';
import { Phone, CheckCircle2, Clock, Wrench, Shield, MapPin, Star, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function generateStaticParams() {
  return PATNA_AREAS.map(a => ({ area: a.slug }));
}

export async function generateMetadata({ params }: { params: { area: string } }): Promise<Metadata> {
  const seo = getAreaSEO(params.area);
  if (!seo) {
    const name = params.area.replace(/-/g,' ');
    return {
      title: `RO Service in ${name}, Patna | ₹200 Visit - RO Service Patna`,
      description: `Best RO repair in ${name}, Patna. Same-day visit at ₹200.`,
    };
  }
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: { canonical: `/areas/${params.area}` },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: `https://www.roserviceinpatna.in/areas/${params.area}`,
      type: 'website',
      locale: 'en_IN',
    },
  };
}

export default function AreaPage({ params }: { params: { area: string } }) {
  const area = PATNA_AREAS.find(a => a.slug === params.area);
  const areaName = area?.name || params.area.replace(/-/g,' ').replace(/\b\w/g, c => c.toUpperCase());
  const pincode = (area as any)?.pincode || '';
  const landmarks = (area as any)?.landmarks || '';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness','Plumber','Service'],
    name: `RO Service ${areaName} Patna`,
    telephone: [`+91-${PHONES.primary}`,`+91-${PHONES.secondary}`],
    email: 'service@roserviceinpatna.in',
    url: `https://www.roserviceinpatna.in/areas/${params.area}`,
    address: { '@type':'PostalAddress', streetAddress: landmarks, addressLocality: areaName, postalCode: pincode, addressRegion:'Patna, Bihar', addressCountry:'IN' },
    areaServed: { '@type':'Place', name: `${areaName}, Patna, Bihar ${pincode}` },
    priceRange: '₹200 - ₹7000',
    openingHours: 'Mo-Su 07:00-22:00',
    sameAs: ['https://www.instagram.com/roservicepatna/'],
    aggregateRating: { '@type':'AggregateRating', ratingValue:'4.9', reviewCount:'2486', bestRating:'5', worstRating:'1' },
    makesOffer: [
      { '@type':'Offer', itemOffered: { '@type':'Service', name:'RO Repair in '+areaName }, price:'200', priceCurrency:'INR' },
      { '@type':'Offer', itemOffered: { '@type':'Service', name:'RO Installation in '+areaName }, price:'499', priceCurrency:'INR' },
    ],
  };

  const serviceList = [
    'RO Repair & Troubleshooting', 'New RO Installation', 'RO Uninstallation',
    'Filter Set Change (Sediment+Carbon)', 'RO Membrane Replacement (80/100 GPD)',
    'UV Lamp Replacement', 'TDS Adjustment & Calibration', 'Water Leakage Fix',
    'Low Water Pressure Fix', 'Bad Taste / Smell Problem', 'RO Not Starting',
    'Motor / Pump Replacement', 'SMPS Repair', 'Solenoid Valve Replacement',
    'Commercial RO Plant Service', 'AMC / Annual Maintenance',
    'Water Tank Sanitization', 'Preventive Maintenance',
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}/>
      {/* Hero */}
      <section className="bg-aqua-gradient text-white">
        <div className="container-pad py-10 md:py-14">
          <div className="text-xs text-white/80">
            <Link href="/" className="hover:text-white">Home</Link> /{' '}
            <Link href="/book-service" className="hover:text-white">Service Areas</Link> /{' '}
            <span className="text-white">{areaName}</span>
          </div>
          <h1 className="mt-2 text-2xl md:text-4xl lg:text-5xl font-extrabold">
            RO Service in {areaName}, Patna
            <span className="block mt-1 text-lg md:text-2xl font-semibold text-orange-200">
              Same-Day Visit @ ₹200 | 30-Day Warranty | Genuine Parts
            </span>
          </h1>
          <p className="mt-3 max-w-3xl text-white/90 text-base md:text-lg">
            Best <strong>RO repair in {areaName}</strong>, Patna (Pincode: {pincode}). Our verified technician 2-4 ghante mein aapke darwaje par.
            Sabhi brands ke RO ki repair, installation, filter change, aur membrane replacement karte hain.{' '}
            {landmarks && <>Nearby areas: <strong>{landmarks}</strong>.</>}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href={telLink(PHONES.primary)} className="btn-primary bg-white !text-navy-900 hover:bg-gray-100"><Phone className="h-4 w-4"/>Call Now {PHONES.primary}</a>
            <a href={waLink(PHONES.whatsapp, `Hi, RO service chahiye in ${areaName}, Patna.`)} className="btn-whatsapp" target="_blank" rel="noopener">WhatsApp Book</a>
            <Link href="/amc" className="btn-secondary border border-white/30 !text-white hover:bg-white/10"><Shield className="h-4 w-4"/>View AMC Plans</Link>
          </div>
          <div className="mt-5 flex flex-wrap gap-4 text-sm text-white/90">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4"/> Same-day visit (2-4 hrs)</span>
            <span className="flex items-center gap-1"><Shield className="h-4 w-4"/> 30-day service warranty</span>
            <span className="flex items-center gap-1"><CheckCircle2 className="h-4 w-4"/> 100% genuine parts</span>
            <span className="flex items-center gap-1"><Zap className="h-4 w-4"/> Transparent pricing</span>
            <span className="flex items-center gap-1"><Star className="h-4 w-4"/> 4.9★ (2486+ happy customers)</span>
          </div>
        </div>
      </section>

      <div className="container-pad py-10">
        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3 space-y-8">

            {/* Why us */}
            <div>
              <h2>Why {areaName} Locals Trust Us for RO Service?</h2>
              <p className="mt-2 text-gray-600">
                {areaName} Patna ke sabse bharoseemand RO service partner. Hum sirf RO ka kaam karte hain — isliye expert hain.
                Pura Patna (pincode {pincode}) mein humare technicians roz 20+ RO service karte hain.
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {[
                  { icon:Clock, title:'Same-Day Service in '+areaName, desc:`4 PM se pehle book karein, aaj hi technician ${areaName} mein pohoch jayega. Emergency mein 2 hour service bhi available.` },
                  { icon:Wrench, title:'All RO Brands Expert', desc:'Kent, Aquaguard (Eureka Forbes), Livpure, Pureit HUL, AO Smith, Blue Star, Havells, LG, V-Guard aur local brands bhi.' },
                  { icon:Shield, title:'30-Day Service Warranty', desc:'Service ke 30 din andar wahi problem aaye to bilkul free fix. Spare parts pe 3-6 month alag warranty.' },
                  { icon:MapPin, title:'₹200 Fixed Visit Charge', desc:'Koi hidden charge nahi. Visit charge repair quote mein adjust ho jata hai. Customer approval ke baad hi kaam.' },
                  { icon:Zap, title:'Genuine Spare Parts', desc:'Original company ke membranes, filters, UV lamps, pumps — duplicate kabhi nahi. 100% transparency.' },
                  { icon:Star, title:'4.9★ Rated in '+areaName, desc:'2486+ customers ne 5 star diya hai. Google reviews dekh sakte ho.' },
                ].map(f => (
                  <div key={f.title} className="card-surface p-4">
                    <f.icon className="h-6 w-6 text-brand-500"/>
                    <h4 className="mt-2 text-base">{f.title}</h4>
                    <p className="mt-1 text-sm text-gray-600">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <h2>RO Services We Provide in {areaName}</h2>
              <p className="mt-1 text-gray-600 text-sm">Har tarah ki RO problem ka solution ek hi jagah:</p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {serviceList.map(s => (
                  <li key={s} className="flex items-start gap-2 rounded-lg border bg-white p-3 text-sm hover:border-brand-400 transition">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600"/>{s}
                  </li>
                ))}
              </ul>
            </div>

            {/* Brands */}
            <div>
              <h2>All RO Brands We Service in {areaName}</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {BRANDS_SERVICED.map(b => <span key={b.slug} className="rounded-full bg-brand-50 border border-brand-100 px-3 py-1 text-sm font-medium text-brand-700">{b.name}</span>)}
              </div>
            </div>

            {/* Pricing */}
            <div>
              <h2>Transparent Pricing ({areaName}, Patna)</h2>
              <p className="mt-1 text-gray-600 text-sm">Pehle quote, phir kaam. Koi surprise bill nahi:</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                {SERVICE_PACKAGES.slice(0,6).map(p => (
                  <div key={p.id} className="rounded-xl border-2 border-gray-100 bg-white p-5 hover:border-brand-300 transition">
                    <h4 className="text-base">{p.name}</h4>
                    <p className="mt-2 text-3xl font-extrabold text-navy-900">₹{p.price}<span className="text-sm font-normal text-gray-400 line-through ml-2">₹{p.mrp}</span></p>
                    <ul className="mt-3 space-y-1 text-sm text-gray-600">
                      {p.includes.map(f=>(<li key={f} className="flex items-start gap-1"><CheckCircle2 className="mt-0.5 h-3 w-3 text-green-600 shrink-0"/>{f}</li>))}
                    </ul>
                    <a href={telLink(PHONES.primary)} className="mt-4 block rounded-lg bg-brand-500 py-2 text-center text-sm font-bold text-white hover:bg-brand-600">Call to Book</a>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-gray-500">
                * Spare parts cost extra (sahi quote kaam se pehle diya jata hai). Visit charge repair mein adjust ho jata hai.
              </p>
              <div className="mt-4 text-center">
                <Link href="/amc"><Button variant="navy"><Shield className="h-4 w-4 mr-2"/>See Annual AMC Plans (1499 से शुरू)</Button></Link>
              </div>
            </div>

            {/* SEO content: How it works */}
            <div className="card-surface p-6">
              <h3>How Our {areaName} RO Service Works?</h3>
              <ol className="mt-4 space-y-3">
                <li className="flex gap-3"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white font-bold">1</span><div><strong>Call/Book/WhatsApp karein:</strong> Phone 9241536586 pe call karo ya form bharo. Hum 15 minute mein call back karte hain.</div></li>
                <li className="flex gap-3"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white font-bold">2</span><div><strong>Technician {areaName} mein aayega:</strong> Aapke time slot ke according technician 2-4 ghante mein pohoch jayega.</div></li>
                <li className="flex gap-3"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white font-bold">3</span><div><strong>Free quote + approval:</strong> Technician machine check karega, exact cost batayega. Approval ke baad hi kaam shuru.</div></li>
                <li className="flex gap-3"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white font-bold">4</span><div><strong>Genuine parts se repair:</strong> Original spare parts use karenge, TDS set karenge, full testing karenge.</div></li>
                <li className="flex gap-3"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white font-bold">5</span><div><strong>Payment + 30-day warranty:</strong> Cash/UPI/online payment. 30 din ki service warranty + bill diya jayega.</div></li>
              </ol>
            </div>

            {/* FAQ */}
            <div>
              <h2>Frequently Asked Questions ({areaName})</h2>
              <div className="mt-4 space-y-2">
                {FAQ.map(f => (
                  <details key={f.q} className="card-surface p-4 group">
                    <summary className="cursor-pointer font-semibold list-none flex items-center justify-between gap-3">{f.q}<span className="text-brand-500 group-open:rotate-45 transition text-2xl leading-none shrink-0">+</span></summary>
                    <p className="mt-2 text-sm text-gray-600">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="rounded-2xl bg-aqua-gradient p-6 md:p-8 text-white">
              <h3 className="text-white">Abhi RO Problem Hai? Call Karo!</h3>
              <p className="mt-2 text-white/90">
                {areaName} mein aaj hi technician chahiye? Abhi call karo ya WhatsApp message karo.
                15 minute mein call back guarantee.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a href={telLink(PHONES.primary)} className="btn-primary bg-white !text-navy-900"><Phone className="h-4 w-4"/>Call {PHONES.primary}</a>
                <a href={waLink(PHONES.whatsapp, `Hi, RO service chahiye in ${areaName}, Patna`)} className="btn-whatsapp" target="_blank" rel="noopener">WhatsApp</a>
              </div>
            </div>

            {/* Other areas */}
            <div>
              <h2>Other Patna Areas We Serve</h2>
              <p className="mt-1 text-sm text-gray-600">In 30+ areas mein same-day RO service dete hain:</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {PATNA_AREAS.filter(a=>a.slug!==params.area).map(a => (
                  <Link key={a.slug} href={`/areas/${a.slug}`} className="rounded-full border px-3 py-1.5 text-sm hover:border-brand-500 hover:bg-brand-50 hover:text-brand-600 transition">📍 {a.name}</Link>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="sticky top-24 space-y-4">
              <ServiceQuickBook/>
              <Link href="/book-service"><Button variant="navy" className="w-full">Go to Full Booking Page →</Button></Link>

              {/* Quick call card */}
              <div className="rounded-xl border-2 border-cta-orange bg-orange-50 p-5 text-center">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-cta-orange text-white animate-pulse">
                  <Phone className="h-7 w-7"/>
                </div>
                <h4 className="mt-2 text-base text-navy-900">Urgent Service in {areaName}?</h4>
                <p className="text-sm text-gray-600 mt-1">Seedha call karo, turant help milegi:</p>
                <a href={telLink(PHONES.primary)} className="mt-3 block rounded-lg bg-cta-orange py-3 text-lg font-extrabold text-white hover:bg-orange-600">{PHONES.primary}</a>
                <a href={waLink(PHONES.whatsapp, `Hi, urgent RO chahiye in ${areaName}`)} target="_blank" rel="noopener" className="mt-2 block rounded-lg bg-[#25D366] py-2.5 text-sm font-bold text-white hover:bg-[#20ba5a]">WhatsApp Chat</a>
              </div>

              {/* Mini AMc card */}
              <div className="rounded-xl border-2 border-brand-500 bg-brand-50 p-5">
                <h4 className="flex items-center gap-2 text-base"><Shield className="h-5 w-5 text-brand-600"/>1-Year AMC @ ₹1499</h4>
                <p className="mt-1 text-sm text-gray-600">3 services + priority support + filter discount. Save ₹3000+/year.</p>
                <Link href="/amc" className="mt-3 block rounded-lg bg-brand-500 py-2 text-center text-sm font-bold text-white hover:bg-brand-600">View Plans</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
