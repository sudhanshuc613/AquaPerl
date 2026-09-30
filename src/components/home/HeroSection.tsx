'use client';
import Link from 'next/link';
import { Phone, Wrench, Shield, Truck, Award, ChevronRight, Clock, CheckCircle2, Star, MapPin, Sparkles, Headphones } from 'lucide-react';
import { PHONES, telLink, waLink, PATNA_AREAS } from '@/lib/utils';
import 'swiper/css';
import 'swiper/css/pagination';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-sky-50 via-cyan-50/60 to-blue-50">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-brand-300/20 blur-3xl" />
        <div className="absolute right-0 top-20 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute -bottom-32 left-1/2 h-72 w-72 rounded-full bg-orange-200/30 blur-3xl" />
      </div>

      {/* Water bubble decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-brand-400/20"
            style={{
              width: `${8 + (i % 4) * 6}px`,
              height: `${8 + (i % 4) * 6}px`,
              left: `${(i * 9 + 5) % 100}%`,
              top: `${(i * 13) % 100}%`,
              animation: `float ${3 + (i % 3)}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>

      <div className="container-pad relative py-10 md:py-16 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          {/* LEFT: Content */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-1.5 shadow-sm">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500"><CheckCircle2 className="h-3 w-3 text-white"/></span>
              <span className="text-xs font-bold text-navy-800">PATNA'S #1 RATED RO SERVICE</span>
              <span className="text-xs text-gray-400">•</span>
              <span className="flex items-center gap-0.5 text-xs font-bold text-orange-500">
                <Star className="h-3 w-3 fill-orange-500"/>4.9 (2486+ Reviews)
              </span>
            </div>

            <div>
              <h1 className="text-[34px] md:text-5xl lg:text-6xl font-extrabold leading-[1.1] text-navy-950 tracking-tight">
                Best RO Service
                <br />
                <span className="bg-gradient-to-r from-brand-500 via-cyan-500 to-blue-600 bg-clip-text text-transparent">
                  in Patna
                </span>
              </h1>

              <h2 className="mt-3 text-2xl md:text-3xl lg:text-4xl font-extrabold text-navy-900 leading-tight">
                <span className="bg-gradient-to-r from-brand-500 via-cyan-500 to-blue-600 bg-clip-text text-transparent">Patna's Leading</span>{' '}
                Water Purifier Sale & Service Provider
              </h2>
            </div>

            <p className="max-w-2xl text-base md:text-lg text-gray-600 leading-relaxed">
              24x7 expert RO water purifier service at your doorstep in Patna. Fast, reliable repair,
              installation, and AMC plans for all major brands. Our certified technicians provide same-day
              support, often within <strong className="text-brand-600">2 hours</strong>.
            </p>

            {/* Trust features inline */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {[
                { icon: Clock, title: 'Service in 2 Hours', sub: 'Quick response guaranteed', color: 'cyan' },
                { icon: Shield, title: '30-Day Warranty', sub: 'Complete peace of mind', color: 'blue' },
                { icon: Award, title: 'Starts @ ₹200/-', sub: 'Affordable & transparent', color: 'orange' },
              ].map((f, i) => (
                <div key={i} className="flex items-center gap-3 rounded-xl bg-white p-3.5 shadow-sm border border-gray-100 hover:shadow-md transition">
                  <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${i === 2 ? 'bg-orange-100 text-orange-600' : 'bg-brand-100 text-brand-600'}`}>
                    <f.icon className="h-5 w-5"/>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-navy-900">{f.title}</p>
                    <p className="text-xs text-gray-500">{f.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-3">
              <a href={telLink(PHONES.primary)}
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-brand-500/30 hover:shadow-xl hover:shadow-brand-500/40 hover:-translate-y-0.5 transition-all">
                <Phone className="h-5 w-5"/> Call Now for Service
                <span className="ml-1 rounded bg-white/20 px-2 py-0.5 text-sm font-mono">{PHONES.primary}</span>
              </a>
              <Link href="/book-service"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-brand-500 bg-white px-8 py-4 text-base font-bold text-brand-600 hover:bg-brand-50 hover:shadow-md transition-all">
                Book Service Online <ChevronRight className="h-5 w-5"/>
              </Link>
            </div>

            {/* Secondary quick actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2 text-sm">
              <a href={waLink(PHONES.whatsapp, 'Hi, RO service chahiye Patna mein.')} target="_blank" rel="noopener"
                className="inline-flex items-center gap-2 text-[#25D366] font-semibold hover:underline">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#25D366]/10">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.876 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                </span>
                WhatsApp Quick Book
              </a>
              <span className="text-gray-300 hidden sm:inline">|</span>
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <Headphones className="h-3.5 w-3.5"/> 7 AM - 10 PM (all days)
              </span>
            </div>
          </div>

          {/* RIGHT: Visual card (competitor jaisa) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md">
              {/* Main gradient card */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-400 via-brand-500 to-blue-600 p-8 md:p-10 shadow-2xl shadow-brand-500/30">
                {/* Decorative swoosh */}
                <div className="pointer-events-none absolute -top-16 -left-16 h-48 w-48 rounded-full bg-white/10 blur-2xl"/>
                <div className="pointer-events-none absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-white/10 blur-3xl"/>

                {/* Water wave */}
                <svg className="pointer-events-none absolute top-0 left-0 h-full w-24 opacity-30" viewBox="0 0 100 400" preserveAspectRatio="none">
                  <path d="M0,200 Q25,100 50,200 T100,200 L100,400 L0,400 Z" fill="white"/>
                </svg>

                {/* "Now in Patna" */}
                <div className="relative text-right">
                  <p className="text-white/90 text-lg font-semibold">Now in</p>
                  <p className="text-white text-5xl md:text-6xl font-black tracking-tight leading-none drop-shadow-md">Patna</p>
                </div>

                {/* RO Expert badge */}
                <div className="mt-8 flex justify-end">
                  <div className="relative inline-flex items-center gap-2 rounded-full bg-white/95 backdrop-blur px-5 py-2.5 shadow-lg">
                    <DropletLogo/>
                    <span className="text-lg font-black text-brand-700">RO EXPERT</span>
                  </div>
                </div>

                {/* Technician + RO visual */}
                <div className="relative mt-4 flex items-end justify-between">
                  {/* RO Machine SVG */}
                  <div className="relative">
                    <div className="h-28 w-20 rounded-lg bg-gradient-to-b from-white/90 to-white/70 shadow-lg flex flex-col items-center justify-around p-1.5 border-2 border-white/60">
                      <div className="h-5 w-full rounded-sm bg-red-500/90"/>
                      <div className="h-4 w-4/5 rounded-full bg-blue-500/90"/>
                      <div className="h-4 w-4/5 rounded-full bg-blue-500/70"/>
                      <div className="flex gap-1">
                        <div className="h-2 w-2 rounded-full bg-red-500"/>
                        <div className="h-2 w-2 rounded-full bg-green-500"/>
                      </div>
                      <div className="h-6 w-2 bg-gray-700 rounded-b"/>
                    </div>
                  </div>

                  {/* Technician avatar (emoji+SVG) */}
                  <div className="relative">
                    <div className="relative h-44 w-32">
                      {/* Shirt/body */}
                      <div className="absolute bottom-0 left-0 right-0 h-28 rounded-t-3xl bg-white shadow-lg"/>
                      <div className="absolute bottom-16 left-3 right-3 h-10 rounded-t-full bg-gradient-to-b from-orange-100 to-orange-200"/>
                      {/* Face */}
                      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 h-16 w-16 rounded-full bg-gradient-to-b from-orange-100 to-orange-200 shadow-md border-4 border-white">
                        <div className="absolute top-5 left-3 h-1.5 w-1.5 rounded-full bg-gray-800"/>
                        <div className="absolute top-5 right-3 h-1.5 w-1.5 rounded-full bg-gray-800"/>
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 h-2 w-6 rounded-b-full border-b-2 border-gray-700"/>
                      </div>
                      {/* Hair */}
                      <div className="absolute bottom-36 left-1/2 -translate-x-1/2 h-6 w-14 rounded-t-full bg-gradient-to-b from-amber-900 to-amber-800"/>
                      {/* Collar logo */}
                      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex h-6 w-6 items-center justify-center rounded-full bg-brand-500 text-[8px] font-black text-white shadow">
                        RO
                      </div>
                      {/* Wrench in hand */}
                      <div className="absolute bottom-10 -right-1 rotate-[-20deg]">
                        <Wrench className="h-8 w-8 text-gray-700"/>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating rating badge */}
                <div className="absolute top-8 left-6 flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 shadow-lg">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400"/>
                  <span className="text-sm font-black text-navy-900">4.9+</span>
                  <span className="text-[10px] text-gray-500 font-medium">RATINGS</span>
                </div>

                {/* Phone pill */}
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-2xl">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#25D366] animate-pulse">
                    <Phone className="h-4 w-4 text-white"/>
                  </div>
                  <div>
                    <p className="text-[9px] font-semibold text-gray-500 uppercase tracking-wide">Customer Support</p>
                    <a href={telLink(PHONES.primary)} className="text-lg font-black text-navy-900 hover:text-brand-600">{PHONES.primary}</a>
                  </div>
                </div>
              </div>

              {/* Floating service card */}
              <div className="absolute -left-4 top-10 hidden md:flex items-center gap-3 rounded-2xl bg-white p-3 shadow-xl border border-gray-100 animate-float">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle2 className="h-5 w-5 text-green-600"/>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Today's Bookings</p>
                  <p className="text-base font-black text-navy-900">47+ Served</p>
                </div>
              </div>

              <div className="absolute -right-4 bottom-20 hidden md:flex items-center gap-3 rounded-2xl bg-white p-3 shadow-xl border border-gray-100 animate-float" style={{animationDelay:'1.2s'}}>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
                  <MapPin className="h-5 w-5 text-orange-600"/>
                </div>
                <div>
                  <p className="text-xs text-gray-500">32+ Areas</p>
                  <p className="text-base font-black text-navy-900">Covered</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Areas strip */}
        <div className="mt-10 md:mt-14 rounded-2xl border border-gray-100 bg-white/70 backdrop-blur p-4 md:p-5 shadow-sm">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
            <span className="flex items-center gap-1.5 font-bold text-navy-900">
              <MapPin className="h-4 w-4 text-brand-500"/> Service available in:
            </span>
            {PATNA_AREAS.slice(0, 16).map(a => (
              <Link key={a.slug} href={`/areas/${a.slug}`} className="rounded-full bg-gray-50 hover:bg-brand-50 hover:text-brand-700 px-3 py-1 text-xs font-medium text-gray-600 transition">
                📍 {a.name}
              </Link>
            ))}
            <Link href="/book-service" className="rounded-full bg-brand-500 text-white px-3 py-1 text-xs font-bold hover:bg-brand-600">
              +{PATNA_AREAS.length - 16} more →
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
      `}</style>
    </section>
  );
}

function DropletLogo() {
  return (
    <svg className="h-6 w-6 text-brand-500" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.5s6 7.5 6 12a6 6 0 01-12 0c0-4.5 6-12 6-12z"/>
    </svg>
  );
}
