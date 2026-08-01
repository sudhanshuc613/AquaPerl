import type { Metadata } from 'next';
import ServiceQuickBook from '@/components/service/ServiceQuickBook';
import { Phone, CheckCircle2, Shield, Clock, Users, Wrench } from 'lucide-react';
import { PHONES, telLink, waLink } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Book RO Service in Patna | ₹100 Visit Charge - AquaNexa',
  description: 'Expert RO repair, installation, AMC & filter change service in Patna. Same-day doorstep visit at just ₹100. Verified technicians, genuine parts. Call 8969821440 now.',
  keywords: ['RO service Patna','RO repair Patna','RO installation Patna','water purifier service Patna','AquaNexa service','RO AMC Patna'],
};

const steps = [
  { n: 1, title: 'Book Online / Call', desc: 'Fill form or call us directly' },
  { n: 2, title: 'Technician Arrives', desc: 'Same-day visit at your door' },
  { n: 3, title: 'Issue Diagnosed', desc: 'Transparent quote upfront' },
  { n: 4, title: 'Service Completed', desc: 'Pay only after satisfaction' },
];

export default function BookServicePage() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'RO Water Purifier Repair & Installation',
    provider: { '@type': 'LocalBusiness', name: 'AquaNexa', telephone: '+91-8969821440' },
    areaServed: { '@type': 'City', name: 'Patna' },
    offers: { '@type': 'Offer', price: '100', priceCurrency: 'INR', description: 'Visit charge only ₹100' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <div className="bg-aqua-gradient text-white">
        <div className="container-pad py-12 md:py-16">
          <span className="badge bg-white/20 text-white backdrop-blur-sm"><Clock className="h-3 w-3" /> Same-Day Patna Service</span>
          <h1 className="mt-3 text-white md:text-5xl">Book RO Service in Patna</h1>
          <p className="mt-3 max-w-2xl text-lg text-white/90">
            Expert repair, installation, AMC & filter change. Visit charge just <strong className="text-yellow-300">₹100</strong>.
            Genuine parts • Transparent pricing • 100% satisfaction.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={telLink(PHONES.primary)} className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-bold text-navy-900 shadow-lg hover:bg-gray-100">
              <Phone className="h-5 w-5" /> Call {PHONES.primary}
            </a>
            <a href={waLink(PHONES.whatsapp, 'Hi, I need RO service in Patna')} className="btn-whatsapp h-12 rounded-xl px-6">
              WhatsApp Booking
            </a>
          </div>
        </div>
      </div>

      <div className="container-pad py-12">
        <ServiceQuickBook />
      </div>

      {/* Process */}
      <section className="section bg-gray-50">
        <div className="container-pad">
          <div className="mb-10 text-center">
            <h2>How It Works</h2>
            <p className="mt-2 text-gray-500">4 simple steps to pure water again</p>
          </div>
          <div className="grid gap-6 md:grid-cols-4">
            {steps.map((s) => (
              <div key={s.n} className="relative rounded-2xl bg-white p-6 text-center shadow-sm">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-aqua-gradient text-xl font-bold text-white shadow-lg">
                  {s.n}
                </div>
                <h3 className="mt-4 text-lg">{s.title}</h3>
                <p className="mt-1 text-sm text-gray-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section">
        <div className="container-pad">
          <div className="mb-10 text-center">
            <h2>Transparent Pricing</h2>
            <p className="mt-2 text-gray-500">No hidden charges — what you see is what you pay</p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { title: 'Basic Visit', price: 100, features: ['Visit & diagnosis', 'Minor adjustments', 'General cleaning', 'Repair quote provided'] },
              { title: 'Filter Change', price: 499, features: ['Sediment + Carbon filter', 'Inspection & cleaning', '30-day service warranty', 'Free TDS check'] },
              { title: 'Full Service / AMC', price: 1499, features: ['Complete filter set change', 'Membrane check', 'Sanitization', '3 services in year', 'Priority response'], popular: true },
            ].map(p => (
              <div key={p.title} className={`relative rounded-2xl border-2 bg-white p-6 shadow-sm ${p.popular ? 'border-brand-500 shadow-lg' : 'border-gray-100'}`}>
                {p.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-cta-orange px-3 py-1 text-xs font-bold text-white">Most Popular</span>}
                <h3 className="text-xl">{p.title}</h3>
                <p className="mt-2 text-4xl font-extrabold text-navy-900">₹{p.price}</p>
                <p className="text-xs text-gray-500">Starting price</p>
                <ul className="mt-5 space-y-2 text-sm">
                  {p.features.map(f => (
                    <li key={f} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cta-green" /> {f}
                    </li>
                  ))}
                </ul>
                <a href={telLink(PHONES.primary)} className="mt-6 block rounded-lg bg-brand-500 py-2.5 text-center text-sm font-semibold text-white hover:bg-brand-600">
                  Book Now
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Patna service areas */}
      <section className="section bg-navy-900 text-white">
        <div className="container-pad text-center">
          <h2 className="text-white">We Serve All Across Patna</h2>
          <p className="mt-2 text-gray-300">Our technicians reach every corner of Patna within 2 hours</p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {['Kankarbagh','Boring Road','Patliputra','Danapur','Bailey Road','Gandhi Maidan','Rajendra Nagar','Bihar School','Kidwaipuri','Anisabad','Beur','Saguna More','Khagaul','Phulwari Sharif','Mithapur','Patna City','Ashok Rajpath','Raja Bazaar','Lohia Nagar','Khemnichak'].map(area => (
              <span key={area} className="rounded-full bg-white/10 px-4 py-1.5 text-sm backdrop-blur-sm">{area}</span>
            ))}
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-4">
            {[
              { icon: Shield, n: '10K+', l: 'Patna Customers' },
              { icon: Users, n: '15+', l: 'Certified Technicians' },
              { icon: Clock, n: '2hr', l: 'Avg Response Time' },
              { icon: Wrench, n: '4.8★', l: 'Service Rating' },
            ].map(s => (
              <div key={s.l} className="rounded-xl bg-white/5 p-5 backdrop-blur">
                <s.icon className="h-8 w-8 text-brand-400" />
                <p className="mt-2 text-2xl font-extrabold text-white">{s.n}</p>
                <p className="text-xs text-gray-400">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
