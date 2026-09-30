import type { Metadata } from 'next';
import Link from 'next/link';
import { Award, Users, Clock, Shield, Phone, Wrench, CheckCircle2, MapPin, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PHONES, telLink, waLink, PATNA_AREAS, BRANDS_SERVICED } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'About Us - RO Service Patna | Patna ka #1 Trusted RO Repair & Installation',
  description: 'RO Service Patna is Patna\'s most trusted RO water purifier repair, installation & AMC service provider with 10,000+ happy customers. Same-day service @ ₹200 visit, 30-day warranty, genuine parts. Call 9241536586.',
  keywords: ['about RO Service Patna','Patna RO service company','best RO repair Patna','RO installation Patna','trusted RO service Patna'],
  alternates: { canonical: '/about' },
};

const stats = [
  { num: '10,000+', label: 'Happy Customers', icon: Users },
  { num: '8+', label: 'Years Experience', icon: Award },
  { num: '₹200', label: 'Visit Charge', icon: Wrench },
  { num: '4.9★', label: 'Customer Rating', icon: Star },
];

export default function AboutPage() {
  return (
    <div>
      <section className="bg-aqua-gradient text-white py-14">
        <div className="container-pad">
          <p className="text-xs text-white/80"><Link href="/" className="hover:text-white">Home</Link> / About</p>
          <h1 className="mt-2 text-white text-3xl md:text-5xl">About RO Service Patna</h1>
          <p className="mt-3 max-w-2xl text-white/90 text-lg">Patna ka sabse bharoseemand RO water purifier repair, installation aur AMC partner. 8+ saal ki expertise, 10,000+ satisfied customers.</p>
        </div>
      </section>

      <section className="container-pad py-14">
        <div className="grid gap-10 lg:grid-cols-2 items-center">
          <div>
            <span className="text-sm font-bold uppercase tracking-wider text-brand-600">Our Story</span>
            <h2 className="mt-2 text-3xl">Patna ke Ghar-Ghar Mein Shuddh Paani</h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              RO Service Patna ka sapna tha ki Patna ke har ghar mein safe, shuddh drinking water ho. Aaj hum Patna ke 32+ areas mein same-day RO repair, installation, filter change, membrane change aur AMC service provide karte hain.
            </p>
            <p className="mt-3 text-gray-600 leading-relaxed">
              Hum sirf kaam nahi karte, rishte banate hain. Yahi wajah hai ki 70% customers humein referral se aate hain. Har service par 30-day warranty, 100% genuine company spare parts, aur transparent pricing — koi hidden charge nahi.
            </p>
            <div className="mt-6 flex gap-3">
              <a href={telLink(PHONES.primary)} className="btn-primary"><Phone className="h-4 w-4"/>Call {PHONES.primary}</a>
              <Link href="/book-service"><Button variant="navy"><Wrench className="h-4 w-4"/>Book Service</Button></Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {stats.map(s => (
              <div key={s.label} className="card-surface p-6 text-center">
                <s.icon className="mx-auto h-10 w-10 text-brand-500"/>
                <p className="mt-3 text-3xl font-extrabold text-navy-900">{s.num}</p>
                <p className="mt-1 text-sm text-gray-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-50 py-14">
        <div className="container-pad">
          <h2 className="text-center">Why Choose Us?</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon:Clock, title:'Same-Day Service', desc:'4 PM se pehle book karne par aaj hi technician. Urgent service 2 hours mein available.' },
              { icon:Shield, title:'30-Day Warranty', desc:'Har service par 30-day warranty. Same problem wapas aaye to FREE fix.' },
              { icon:CheckCircle2, title:'100% Genuine Parts', desc:'Original company ke membranes, filters, pumps. Duplicate kabhi nahi.' },
              { icon:MapPin, title:'32+ Patna Areas', desc:'Boring Road se Bihta tak, Kankarbagh se Phulwari Sharif — pure Patna mein service.' },
              { icon:Wrench, title:'Expert Technicians', desc:'Trained, background-verified technicians. All brands (Kent, Aquaguard, Livpure, etc.) ke specialist.' },
              { icon:Star, title:'4.9★ Customer Rating', desc:'10,000+ customers ne humein 5 star diya hai. Google/Justdial pe dekho.' },
            ].map(f => (
              <div key={f.title} className="card-surface p-6">
                <f.icon className="h-10 w-10 text-brand-500"/>
                <h4 className="mt-3">{f.title}</h4>
                <p className="mt-2 text-sm text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-pad py-14">
        <h2 className="text-center">All RO Brands We Service & Sell</h2>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {BRANDS_SERVICED.map(b => <span key={b.slug} className="rounded-full bg-brand-50 border border-brand-100 px-4 py-2 text-sm font-medium text-brand-700">{b.name}</span>)}
        </div>
      </section>

      <section className="container-pad py-14">
        <h2 className="text-center">We Serve All Patna Areas</h2>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {PATNA_AREAS.map(a => (
            <Link key={a.slug} href={`/areas/${a.slug}`} className="rounded-full border px-3 py-1.5 text-sm hover:bg-brand-50 hover:border-brand-400 hover:text-brand-700 transition">📍 {a.name}</Link>
          ))}
        </div>
      </section>

      <section className="rounded-3xl bg-aqua-gradient p-8 md:p-12 text-white text-center m-4 md:m-8">
        <h2 className="text-white">Need RO Service in Patna Today?</h2>
        <p className="mt-2 text-white/90 max-w-xl mx-auto">Abhi call karo ya online book karo — 15 minute mein call back, 2-4 ghante mein technician aapke darwaje par.</p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <a href={telLink(PHONES.primary)} className="btn-primary bg-white !text-navy-900"><Phone className="h-4 w-4"/>Call {PHONES.primary}</a>
          <Link href="/book-service" className="btn-secondary border-white/30 !text-white hover:bg-white/10">Book Online</Link>
        </div>
      </section>
    </div>
  );
}
