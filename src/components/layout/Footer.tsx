import Link from 'next/link';
import { Droplets, Phone, Mail, MapPin, Facebook, Instagram, Youtube, Send } from 'lucide-react';
import { PHONES, waLink, PATNA_AREAS } from '@/lib/utils';

export default function Footer() {
  return (
    <footer className="mt-20 bg-navy-950 text-gray-300">
      <div className="container-pad py-14">
        <div className="mb-12 flex flex-col gap-4 rounded-2xl bg-aqua-gradient p-8 text-white shadow-xl md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-2xl text-white md:text-3xl">Need Urgent RO Repair in Patna?</h3>
            <p className="mt-1 text-brand-100">Visit charge only ₹100. Same-day service all over Patna.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={`tel:+91${PHONES.primary}`} className="btn-primary bg-white !text-navy-900 hover:bg-gray-100"><Phone className="h-4 w-4"/>Call {PHONES.primary}</a>
            <a href={waLink(PHONES.whatsapp, 'Hi, I need RO service')} className="btn-whatsapp"><Send className="h-4 w-4"/>WhatsApp</a>
          </div>
        </div>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-aqua-gradient">
                <Droplets className="h-6 w-6 text-white"/>
              </div>
              <div>
                <span className="text-2xl font-extrabold text-white">RO Service <span className="text-brand-400">Patna</span></span>
                <p className="text-xs text-gray-400">roserviceinpatna.in</p>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-gray-400">
              Patna's #1 trusted RO repair & installation service with 10,000+ happy customers.
              Also sell genuine RO purifiers, spare parts and commercial plants across India.
            </p>
            <div className="mt-5 space-y-2 text-sm">
              <a href={`tel:+91${PHONES.primary}`} className="flex items-center gap-2 hover:text-brand-400"><Phone className="h-4 w-4 text-brand-400"/>+91 {PHONES.primary} (Primary)</a>
              <a href={`tel:+91${PHONES.secondary}`} className="flex items-center gap-2 hover:text-brand-400"><Phone className="h-4 w-4 text-brand-400"/>+91 {PHONES.secondary} (Secondary)</a>
              <a href="mailto:service@roserviceinpatna.in" className="flex items-center gap-2 hover:text-brand-400"><Mail className="h-4 w-4 text-brand-400"/>service@roserviceinpatna.in</a>
              <div className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-400"/><span>Serving entire Patna, Bihar</span></div>
            </div>
            <div className="mt-5 flex gap-3">
              {[Facebook, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 hover:bg-brand-500"><Icon className="h-5 w-5"/></a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Services</h4>
            <ul className="space-y-2 text-sm">
              {['RO Repair','New Installation','Filter Replacement','Membrane Change','TDS Adjustment','Leakage Fix','AMC Subscription','Commercial Service'].map(l => (
                <li key={l}><Link href="/book-service" className="hover:text-brand-400">{l}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Shop</h4>
            <ul className="space-y-2 text-sm">
              {['RO Purifiers','Spare Parts','Membranes','Filters','UV Lamps','Commercial Plants','Accessories'].map(l => (
                <li key={l}><Link href="/categories/ro-purifiers" className="hover:text-brand-400">{l}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Service Areas (Patna)</h4>
            <ul className="grid grid-cols-2 gap-1 text-sm">
              {PATNA_AREAS.slice(0,12).map(a => (
                <li key={a.slug}><Link href={`/areas/${a.slug}`} className="hover:text-brand-400">{a.name}</Link></li>
              ))}
            </ul>
            <Link href="/book-service" className="mt-3 inline-block text-xs font-semibold text-brand-400 hover:underline">View all areas →</Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-gray-500 md:flex-row">
          <p>© {new Date().getFullYear()} RO Service Patna (roserviceinpatna.in). All rights reserved.</p>
          <div className="flex gap-4">Payments: UPI • Cards • NetBanking • COD</div>
        </div>
      </div>

      <a href={waLink(PHONES.whatsapp, 'Hi, I need RO service in Patna')} target="_blank" rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl shadow-green-500/40 hover:scale-110" aria-label="Chat on WhatsApp">
        <svg viewBox="0 0 32 32" className="h-7 w-7 fill-current"><path d="M16 .396C7.384.396.396 7.384.396 16c0 2.76.73 5.475 2.114 7.866L.054 31.604l7.937-2.387A15.54 15.54 0 0 0 16 31.604c8.616 0 15.604-6.988 15.604-15.604S24.616.396 16 .396zm7.092 23.148c-.296.834-1.722 1.593-2.384 1.697-.614.097-1.392.14-2.246-.154-.516-.178-1.18-.384-2.03-.749-3.572-1.538-5.898-5.14-6.075-5.374-.176-.234-1.442-1.918-1.442-3.66 0-1.742.914-2.598 1.238-2.954.324-.357.706-.446.94-.446.236 0 .47.002.676.012.218.01.51-.082.8.608.296.706 1.008 2.444 1.096 2.62.088.176.146.382.028.616-.116.234-.176.38-.354.586-.176.206-.372.46-.53.618-.176.174-.36.366-.154.718.206.352.914 1.508 1.962 2.44 1.346 1.2 2.482 1.58 2.822 1.756.34.178.538.15.738-.09.2-.242.854-.994 1.084-1.34.23-.344.46-.288.774-.174.314.112 1.998.942 2.34 1.114.342.17.57.254.654.394.082.14.082.808-.212 1.642z"/></svg>
      </a>
    </footer>
  );
}
