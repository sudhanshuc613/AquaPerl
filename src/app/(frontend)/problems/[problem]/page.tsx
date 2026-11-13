import type { Metadata } from 'next';
import Link from 'next/link';
import ServiceQuickBook from '@/components/service/ServiceQuickBook';
import { PATNA_AREAS, PHONES, telLink, waLink, FAQ } from '@/lib/utils';
import { Phone, CheckCircle2, Wrench, Shield, MapPin, Zap, AlertTriangle, Droplets } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Common RO problems — ye long-tail keywords hain jo Google pe log search karte hai
const PROBLEMS = [
  { slug: 'ro-leakage-repair', name: 'RO Leakage Repair', price: 299,
    title: 'RO Leakage Repair Patna ₹200 • ☎ 9241536586 | Same-Day Fix',
    desc: 'RO se paani tapak raha hai? Patna me same-day RO leakage repair ₹200 visit. All brands — Kent, Aquaguard, Livpure. Genuine parts, 30-day warranty. Call 9241536586!',
    short: 'RO se paani tapakna / leakage',
    causes: ['Phata hua pipe / tubing', 'Loose connector / elbow', 'Faulty solenoid valve', 'Cracked filter housing', 'Bad membrane seal', 'Tank overflow float problem'],
    fixTime: '30-60 minutes',
    warranty: '30 days service warranty',
  },
  { slug: 'ro-tds-adjustment', name: 'RO TDS Adjustment', price: 200,
    title: 'RO TDS Adjustment Patna ₹200 • ☎ 9241536586 | Free TDS Test',
    desc: 'Free TDS test on every visit! RO ka TDS badh gaya ya kam ho gaya? Patna me TDS adjustment + calibration only ₹200. Call 9241536586 — genuine technicians.',
    short: 'TDS level set / calibration',
    causes: ['Membrane purani ho gayi hai', 'TDS controller kharab hai', 'Post-carbon block', 'Input paani ka TDS badha (Patna me 800-1500 rehta hai)', 'Bypass valve khula reh gaya'],
    fixTime: '15-30 minutes',
    warranty: 'Free TDS test har visit pe',
  },
  { slug: 'ro-no-water', name: 'RO Not Giving Water', price: 299,
    title: 'RO Not Working Patna ₹200 • ☎ 9241536586 | 2-Hour Technician',
    desc: 'RO paani nahi de raha ya chalu hi nahi ho raha? Patna me RO repair ₹200 visit. 2-hour technician. Pump/SMPS/solenoid sab fix. Call 9241536586!',
    short: 'RO paani nahi de raha / bilkul band',
    causes: ['SMPS / power supply kharab', 'Booster pump pressure low', 'Solenoid valve blocked', 'Filters poori tarah choke', 'Low input water pressure', 'Float valve / auto-cutoff issue'],
    fixTime: '30-90 minutes',
    warranty: '30 days service warranty',
  },
  { slug: 'ro-bad-taste-smell', name: 'Bad Taste / Smell in RO Water', price: 399,
    title: 'RO Bad Taste Smell Patna ₹200 • ☎ 9241536586 | Filter Change',
    desc: 'RO ke paani ka taste kharab hai ya badboo aa rahi hai? Patna me filter cleaning + replacement ₹399 se. Tank sanitization free with service. Call 9241536586!',
    short: 'Paani ka taste kharab / badboo',
    causes: ['Carbon filter expired', 'Tank me bacteria jam gaya', 'Biofilm in pipeline', 'Old membrane smell', 'Monsoon me iron contamination'],
    fixTime: '45-60 minutes (tank flush ke saath)',
    warranty: 'Free tank sanitization',
  },
  { slug: 'ro-membrane-change', name: 'RO Membrane Change', price: 1499,
    title: 'RO Membrane Change Patna ₹1499 • ☎ 9241536586 | Original Membrane',
    desc: 'Original 80 GPD RO membrane change ₹1499 (6-month warranty) in Patna. Kent/Aquaguard/Livpure/Pureit sab brands. TDS calibration free. Call 9241536586!',
    short: 'Membrane replacement (80/100 GPD)',
    causes: ['TDS 300+ ho gaya ho', 'Paani ka output bahut kam ho gaya', 'Membrane 2+ saal purani ho', 'White scale jam gaya membrane me'],
    fixTime: '45 minutes',
    warranty: '6 months membrane warranty',
  },
  { slug: 'ro-filter-change', name: 'RO Filter Change', price: 799,
    title: 'RO Filter Change Patna ₹799 • ☎ 9241536586 | Sediment+Carbon Set',
    desc: 'Complete RO filter set change (sediment + carbon + pre-filter) ₹799 in Patna. Original filters, installation free. Call 9241536586 — same-day service.',
    short: 'Sediment + Carbon filter set',
    causes: ['3-4 mahine se filter nahi badla', 'Paani ka flow slow ho gaya', 'Awaaz aa rahi pump se', 'Taste change ho gaya'],
    fixTime: '30 minutes',
    warranty: '3 months filter warranty',
  },
  { slug: 'ro-low-pressure', name: 'RO Low Water Pressure', price: 299,
    title: 'RO Low Water Pressure Patna ₹200 • ☎ 9241536586 | Fast Fix',
    desc: 'RO me paani ka pressure bahut kam hai? Patna me low pressure / slow water problem fix ₹200 visit. Pump, filters, pipeline sab check. Call 9241536586!',
    short: 'Slow water flow / low pressure',
    causes: ['Filters choke ho gaye', 'Pump ki pressure kam ho gayi', 'Input pressure low (Patna me common)', 'Pipe me blockage', 'Membrane jam gayi'],
    fixTime: '30-60 minutes',
    warranty: '30-day warranty',
  },
  { slug: 'ro-noise-sound', name: 'RO Making Noise / Sound', price: 200,
    title: 'RO Making Noise Patna ₹200 • ☎ 9241536586 | Same-Day Fix',
    desc: 'RO se ajeeb awaz (vibration, siren sound, khad-khad) aa rahi hai? Patna me 2-hour technician ₹200 visit. Call 9241536586 — all brands.',
    short: 'RO se awaz / vibration / siren',
    causes: ['Pump bearing kharab', 'Solenoid vibration', 'Pipe me air lock', 'SMPS kharab', 'Loose mounting'],
    fixTime: '30 minutes',
    warranty: '30-day warranty',
  },
  { slug: 'ro-installation', name: 'New RO Installation', price: 499,
    title: 'RO Installation Patna ₹499 • ☎ 9241536586 | Free Demo',
    desc: 'Naye RO ki professional installation Patna me ₹499. Wall mounting, pipe fittings, electrical connection, full setup + free demo. Call 9241536586!',
    short: 'Naya RO lagwana / wall mounting',
    causes: null,
    fixTime: '60-90 minutes',
    warranty: '7-day installation warranty',
  },
  { slug: 'ro-service-near-me', name: 'RO Service Near Me in Patna', price: 200,
    title: 'RO Service Near Me Patna ₹200 • ☎ 9241536586 | 2-Hour Technician',
    desc: 'RO service near me in Patna? ₹200 visit, 2-hour technician at your door. 42+ areas me same-day service, 30-day warranty. Call 9241536586!',
    short: 'Aas paas RO mechanic',
    causes: null,
    fixTime: '2-hour arrival',
    warranty: '30-day warranty',
  },
];

export function generateStaticParams() {
  return PROBLEMS.map(p => ({ problem: p.slug }));
}

export function generateMetadata({ params }: { params: { problem: string } }): Metadata {
  const p = PROBLEMS.find(x => x.slug === params.problem);
  if (!p) {
    return { title: 'RO Service Patna', description: 'Best RO repair in Patna. Call 9241536586.' };
  }
  return {
    title: p.title,
    description: p.desc,
    alternates: { canonical: `/problems/${p.slug}` },
    openGraph: {
      title: p.title,
      description: p.desc,
      url: `https://www.roserviceinpatna.in/problems/${p.slug}`,
      type: 'website', locale: 'en_IN',
    },
  };
}

export default function ProblemPage({ params }: { params: { problem: string } }) {
  const p = PROBLEMS.find(x => x.slug === params.problem);
  if (!p) return <div className="container-pad py-12"><h1>Page not found</h1><Link href="/">Go home</Link></div>;

  const jsonLd = {
    '@context':'https://schema.org',
    '@type':['Service','Offer'],
    name: p.name + ' in Patna',
    provider: { '@type':'LocalBusiness', name:'RO Service Patna', telephone:'+919241536586' },
    areaServed: { '@type':'City', name:'Patna' },
    offers: { '@type':'Offer', price:p.price, priceCurrency:'INR', availability:'https://schema.org/InStock' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}/>
      <section className="bg-aqua-gradient text-white">
        <div className="container-pad py-10 md:py-14">
          <div className="text-xs text-white/80">
            <Link href="/" className="hover:text-white">Home</Link> / <span>{p.name}</span>
          </div>
          <h1 className="mt-2 text-2xl md:text-4xl lg:text-5xl font-extrabold">
            {p.name} in Patna
            <span className="block mt-1 text-lg md:text-2xl font-semibold text-orange-200">
              Starting ₹{p.price} | {p.fixTime} | {p.warranty}
            </span>
          </h1>
          <p className="mt-3 max-w-3xl text-white/90 text-base md:text-lg">{p.desc}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href={telLink(PHONES.primary)} className="btn-primary bg-white !text-navy-900"><Phone className="h-4 w-4"/>Call {PHONES.primary}</a>
            <a href={waLink(PHONES.whatsapp, `Hi, ${p.name} chahiye Patna me.`)} className="btn-whatsapp" target="_blank" rel="noopener">WhatsApp Book</a>
          </div>
        </div>
      </section>

      <div className="container-pad py-10">
        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3 space-y-8">
            {p.causes && (
              <div className="card-surface p-6">
                <h2 className="flex items-center gap-2"><AlertTriangle className="h-6 w-6 text-cta-orange"/>Common Causes of {p.short}</h2>
                <p className="mt-2 text-gray-600 text-sm">Patna ke paani ki quality alag hai (TDS 800-1500, hard water, iron, monsoon contamination) — isliye ye problems aam hain:</p>
                <ul className="mt-4 space-y-2">
                  {p.causes.map(c => (
                    <li key={c} className="flex items-start gap-2 text-sm"><Droplets className="mt-0.5 h-4 w-4 text-brand-500 shrink-0"/>{c}</li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <h2>How We Fix It?</h2>
              <ol className="mt-4 space-y-3">
                <li className="flex gap-3"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white font-bold">1</span><div><strong>Free inspection:</strong> Technician aake poora machine check karega, exact problem batayega.</div></li>
                <li className="flex gap-3"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white font-bold">2</span><div><strong>Transparent quote:</strong> Kya part chahiye, kitna kharcha — pehle batayenge. Approval ke baad hi kaam.</div></li>
                <li className="flex gap-3"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white font-bold">3</span><div><strong>Original parts:</strong> Genuine spare parts use karenge (duplicate kabhi nahi).</div></li>
                <li className="flex gap-3"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white font-bold">4</span><div><strong>Full testing:</strong> TDS check, water flow check, leak test kar ke aapko demo denge.</div></li>
                <li className="flex gap-3"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white font-bold">5</span><div><strong>Warranty + Bill:</strong> Proper invoice + 30-day service warranty + parts warranty.</div></li>
              </ol>
            </div>

            <div>
              <h2>Pricing for {p.name}</h2>
              <div className="mt-4 rounded-xl border-2 border-cta-orange p-6">
                <p className="text-4xl font-extrabold text-navy-900">₹{p.price} <span className="text-base font-normal text-gray-500">starting</span></p>
                <p className="mt-2 text-sm text-gray-600">{p.warranty}. Visit charge repair me adjust ho jata hai. Spare parts cost extra (if required).</p>
                <a href={telLink(PHONES.primary)} className="mt-4 inline-flex items-center gap-2 rounded-lg bg-cta-orange px-5 py-3 font-bold text-white hover:bg-orange-600"><Phone className="h-4 w-4"/>Book Now {PHONES.primary}</a>
              </div>
            </div>

            <div>
              <h2>Frequently Asked Questions</h2>
              <div className="mt-4 space-y-2">
                {FAQ.slice(0,5).map(f => (
                  <details key={f.q} className="card-surface p-4 group">
                    <summary className="cursor-pointer font-semibold list-none flex items-center justify-between gap-3">{f.q}<span className="text-brand-500 group-open:rotate-45 transition text-2xl leading-none shrink-0">+</span></summary>
                    <p className="mt-2 text-sm text-gray-600">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-aqua-gradient p-6 md:p-8 text-white">
              <h3 className="text-white">Need {p.name} Today?</h3>
              <p className="mt-2 text-white/90">Abhi call karo ya WhatsApp bhejo — 2 hour mein technician haazir!</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a href={telLink(PHONES.primary)} className="btn-primary bg-white !text-navy-900"><Phone className="h-4 w-4"/>Call {PHONES.primary}</a>
                <a href={waLink(PHONES.whatsapp, `Hi, ${p.name} chahiye.`)} target="_blank" rel="noopener" className="btn-whatsapp">WhatsApp</a>
              </div>
            </div>

            <div>
              <h2>Service Areas in Patna</h2>
              <p className="mt-1 text-sm text-gray-600">42+ areas me same-day service dete hain:</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {PATNA_AREAS.slice(0,25).map(a => (
                  <Link key={a.slug} href={`/areas/${a.slug}`} className="rounded-full border px-3 py-1.5 text-sm hover:border-brand-500 hover:bg-brand-50 hover:text-brand-600 transition">📍 {a.name}</Link>
                ))}
              </div>
              <Link href="/book-service" className="mt-4 inline-block text-sm font-semibold text-brand-600 hover:underline">See all areas →</Link>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="sticky top-24 space-y-4">
              <ServiceQuickBook/>
              <div className="rounded-xl border-2 border-cta-orange bg-orange-50 p-5 text-center">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-cta-orange text-white animate-pulse">
                  <Phone className="h-7 w-7"/>
                </div>
                <h4 className="mt-2 text-base text-navy-900">Urgent Fix Needed?</h4>
                <p className="text-sm text-gray-600 mt-1">Seedha call karo, turant help:</p>
                <a href={telLink(PHONES.primary)} className="mt-3 block rounded-lg bg-cta-orange py-3 text-lg font-extrabold text-white">{PHONES.primary}</a>
                <a href={waLink(PHONES.whatsapp, `Urgent: ${p.name}`)} target="_blank" rel="noopener" className="mt-2 block rounded-lg bg-[#25D366] py-2.5 text-sm font-bold text-white">WhatsApp Chat</a>
              </div>
              <div className="rounded-xl border-2 border-brand-500 bg-brand-50 p-5">
                <h4 className="flex items-center gap-2 text-base"><Shield className="h-5 w-5 text-brand-600"/>Other Problems We Fix</h4>
                <ul className="mt-3 space-y-1 text-sm">
                  {PROBLEMS.filter(x=>x.slug!==params.problem).slice(0,7).map(x => (
                    <li key={x.slug}><Link href={`/problems/${x.slug}`} className="hover:text-brand-600"><Wrench className="inline h-3 w-3 mr-1"/>{x.name}</Link></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
