import Link from 'next/link';
import { Droplets, Phone, Mail, MapPin, Facebook, Instagram, Youtube, Send } from 'lucide-react';
import { PHONES, waLink } from '@/lib/utils';

export default function Footer() {
  return (
    <footer className="mt-20 bg-navy-950 text-gray-300">
      <div className="container-pad py-14">
        {/* Top CTA */}
        <div className="mb-12 flex flex-col gap-4 rounded-2xl bg-aqua-gradient p-8 text-white shadow-xl md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-2xl text-white md:text-3xl">Need Urgent RO Repair in Patna?</h3>
            <p className="mt-1 text-brand-100">Visit charge only ₹100. Same-day service available.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={`tel:+91${PHONES.primary}`} className="btn-primary bg-white !text-navy-900 hover:bg-gray-100">
              <Phone className="h-4 w-4" /> Call {PHONES.primary}
            </a>
            <a href={waLink(PHONES.whatsapp, 'Hi, I need RO service')} className="btn-whatsapp">
              <Send className="h-4 w-4" /> WhatsApp Now
            </a>
          </div>
        </div>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-aqua-gradient">
                <Droplets className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-2xl font-extrabold text-white">Aqua<span className="text-brand-400">Nexa</span></span>
                <p className="text-xs text-gray-400">rokadoctor.in</p>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-gray-400">
              India's trusted destination for RO water purifiers, commercial plants, spare parts, and expert repair services.
              Serving Patna locally and delivering quality products nationwide.
            </p>
            <div className="mt-5 space-y-2 text-sm">
              <a href={`tel:+91${PHONES.primary}`} className="flex items-center gap-2 hover:text-brand-400">
                <Phone className="h-4 w-4 text-brand-400" /> +91 {PHONES.primary} / {PHONES.secondary}
              </a>
              <a href="mailto:support@rokadoctor.in" className="flex items-center gap-2 hover:text-brand-400">
                <Mail className="h-4 w-4 text-brand-400" /> support@rokadoctor.in
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                <span>Patna, Bihar — Pan-India delivery available</span>
              </div>
            </div>
            <div className="mt-5 flex gap-3">
              {[Facebook, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 transition-colors hover:bg-brand-500">
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Shop</h4>
            <ul className="space-y-2 text-sm">
              {['Domestic RO Purifiers','UV/UF Purifiers','Commercial Plants','Spare Parts','Accessories','AMC Plans'].map(l => (
                <li key={l}><Link href="#" className="hover:text-brand-400">{l}</Link></li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Services</h4>
            <ul className="space-y-2 text-sm">
              {['RO Installation','Repair & Service','Filter Replacement','Membrane Change','AMC Subscription','Commercial Service'].map(l => (
                <li key={l}><Link href="/book-service" className="hover:text-brand-400">{l}</Link></li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Company</h4>
            <ul className="space-y-2 text-sm">
              {['About Us','Contact','Blog','FAQs','Privacy Policy','Terms of Service','Shipping & Returns'].map(l => (
                <li key={l}><Link href="#" className="hover:text-brand-400">{l}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-gray-500 md:flex-row">
          <p>© {new Date().getFullYear()} AquaNexa (rokadoctor.in). All rights reserved.</p>
          <div className="flex gap-4">
            <span>Payments: UPI • Cards • NetBanking • COD</span>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp */}
      <a
        href={waLink(PHONES.whatsapp, 'Hi AquaNexa, I have a query.')}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl shadow-green-500/40 transition-transform hover:scale-110"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 32 32" className="h-7 w-7 fill-current"><path d="M16 .396C7.384.396.396 7.384.396 16c0 2.76.73 5.475 2.114 7.866L.054 31.604l7.937-2.387A15.54 15.54 0 0 0 16 31.604c8.616 0 15.604-6.988 15.604-15.604S24.616.396 16 .396zm0 28.454a12.85 12.85 0 0 1-6.56-1.803l-.47-.279-4.71 1.418 1.453-4.594-.307-.496a12.83 12.83 0 1 1 10.594 5.754zm7.092-9.596c-.388-.194-2.294-1.131-2.648-1.26-.355-.13-.613-.194-.871.194s-1.001 1.26-1.227 1.519c-.227.259-.452.292-.84.098-.388-.195-1.638-.604-3.119-1.926-1.15-1.027-1.926-2.294-2.152-2.681-.227-.388-.024-.598.17-.791.174-.173.388-.453.583-.68.195-.227.259-.388.388-.647.13-.259.065-.486-.032-.68-.098-.194-.871-2.1-1.194-2.874-.315-.754-.636-.653-.871-.666l-.742-.014a1.42 1.42 0 0 0-1.033.486c-.355.388-1.356 1.325-1.356 3.231s1.388 3.749 1.582 4.008c.194.259 2.734 4.171 6.62 5.848.926.4 1.648.639 2.213.818.929.295 1.774.253 2.442.153.744-.111 2.294-.937 2.617-1.843.323-.906.323-1.682.226-1.843-.097-.162-.355-.26-.744-.454z"/></svg>
      </a>
    </footer>
  );
}
