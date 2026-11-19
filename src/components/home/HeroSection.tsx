import Link from 'next/link';
import Image from 'next/image';
import { Phone, Wrench, Shield, Clock, CheckCircle2, MapPin, Star, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PHONES, telLink, waLink } from '@/lib/utils';
import { getSetting } from '@/lib/settings';
import 'swiper/css';
import 'swiper/css/pagination';

export const revalidate = 60; // settings 1 minute me refresh

export default async function HeroSection() {
  const visitCharge = await getSetting<number>('service.visitCharge').catch(() => 200) || 200;
  const primaryPhone = String(await getSetting<string>('contact.primaryPhone').catch(() => PHONES.primary) || PHONES.primary);
  const whatsappPhone = String(await getSetting<string>('contact.whatsapp').catch(() => PHONES.whatsapp) || PHONES.whatsapp);
  const banner = await getSetting<string>('hero.bannerImage').catch(() => '') || '';
  const headline = await getSetting<string>('hero.bannerHeadline').catch(() => '') || '';
  const subtext = await getSetting<string>('hero.bannerSubtext').catch(() => '') || '';

  return (
    <section className={`relative overflow-hidden ${banner ? 'bg-navy-950' : 'bg-gradient-to-br from-cyan-50 via-sky-50 to-blue-50'}`}>
      {/* Admin-uploaded banner as background */}
      {banner && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={banner} alt="" className="absolute inset-0 h-full w-full object-cover"/>
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950/85 via-navy-900/70 to-brand-900/50"/>
        </>
      )}

      {/* Decorative blobs (only when no banner) */}
      {!banner && (
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-brand-300/20 blur-3xl" />
          <div className="absolute -right-24 top-40 h-96 w-96 rounded-full bg-cyan-400/20 blur-3xl" />
          <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-orange-200/30 blur-3xl" />
        </div>
      )}

      {/* Water bubbles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full ${banner ? 'bg-white/10' : 'bg-brand-400/15'}`}
            style={{
              width: `${8 + (i % 4) * 5}px`, height: `${8 + (i % 4) * 5}px`,
              left: `${(i * 11 + 5) % 100}%`, top: `${(i * 13) % 100}%`,
              animation: `float ${3 + (i % 3)}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>

      <div className="container-pad relative py-8 md:py-14 lg:py-16">
        <div className="grid items-center gap-8 lg:grid-cols-12">

          {/* LEFT */}
          <div className="lg:col-span-7 space-y-5">
            {/* Top badge */}
            <div className={`inline-flex items-center gap-2 rounded-full border ${banner ? 'border-white/30 bg-white/15 backdrop-blur' : 'border-brand-200 bg-white/80 backdrop-blur'} px-4 py-1.5 shadow-sm`}>
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500"><CheckCircle2 className="h-3 w-3 text-white"/></span>
              <span className={`text-xs font-bold ${banner?'text-white':'text-navy-800'}`}>PATNA'S #1 RATED RO SERVICE</span>
              <span className={`text-xs ${banner?'text-white/50':'text-gray-400'}`}>•</span>
              <span className="flex items-center gap-0.5 text-xs font-bold text-yellow-400">
                <Star className="h-3 w-3 fill-yellow-400"/>4.9 (2486+ Reviews)
              </span>
            </div>

            <div>
              <h1 className={`text-[32px] md:text-5xl lg:text-[56px] font-extrabold leading-[1.1] tracking-tight ${banner?'text-white':'text-navy-950'}`}>
                {headline || (<>Best RO Service<br/><span className={banner?'text-cyan-300':'bg-gradient-to-r from-brand-500 via-cyan-500 to-blue-600 bg-clip-text text-transparent'}>in Patna</span></>)}
              </h1>

              {!headline && (
                <h2 className={`mt-2 text-xl md:text-3xl lg:text-4xl font-extrabold leading-tight ${banner?'text-white':'text-navy-900'}`}>
                  <span className={banner?'text-cyan-300':'bg-gradient-to-r from-brand-500 via-cyan-500 to-blue-600 bg-clip-text text-transparent'}>Patna's Leading</span>{' '}
                  Water Purifier Sale & Service
                </h2>
              )}
            </div>

            <p className={`max-w-2xl text-base md:text-lg leading-relaxed ${banner?'text-white/90':'text-gray-600'}`}>
              {subtext || (
                <>24×7 expert RO water purifier service at your doorstep in Patna. Certified technicians
                reach you in <strong className={banner?'text-yellow-300':'text-brand-600'}>2 hours</strong>. Genuine spare parts,
                <strong className={banner?'text-orange-300':'text-orange-600'}> transparent pricing, ₹{visitCharge} fixed visit charge</strong>,
                and complete 30-day service warranty. 18+ brands supported.</>
              )}
            </p>

            {/* COMPETITOR-BEATING BADGES ROW */}
            <div className="flex flex-wrap gap-2 pt-1">
              {[
                { t: '🏆 Customer Service Excellence Award', c: banner?'bg-yellow-400/20 text-yellow-200 border-yellow-400/40':'bg-yellow-50 text-yellow-800 border-yellow-300' },
                { t: `₹${Math.max(0,(visitCharge-299))} सस्ता vs ROCare/UrbanCompany`, c: banner?'bg-green-400/20 text-green-200 border-green-400/40':'bg-green-50 text-green-700 border-green-200' },
                { t: 'FREE TDS Test on Every Visit', c: banner?'bg-blue-400/20 text-blue-200 border-blue-400/40':'bg-blue-50 text-blue-700 border-blue-200' },
                { t: '2 Hour Response — Patna Local Team', c: banner?'bg-orange-400/20 text-orange-200 border-orange-400/40':'bg-orange-50 text-orange-700 border-orange-200' },
                { t: `Coupon: RO${visitCharge} — ₹${visitCharge} First Visit`, c: banner?'bg-red-400/20 text-red-200 border-red-400/40 animate-pulse':'bg-red-50 text-red-700 border-red-200 animate-pulse' },
              ].map((b, i) => (
                <span key={i} className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold ${b.c}`}>
                  <CheckCircle2 className="h-3 w-3"/> {b.t}
                </span>
              ))}
            </div>

            {/* Trust boxes */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-1">
              {[
                { icon: Clock, title: '2 Hours Mein Technician', sub: 'Quickest in Patna' },
                { icon: Shield, title: '30-Day Service Warranty', sub: 'Satisfaction Guaranteed' },
                { icon: MapPin, title: `Fixed ₹${visitCharge} Visit`, sub: 'No Hidden Charges' },
                { icon: Star, title: '4.9★ (2,486+ Reviews)', sub: 'Patna Ka #1 Rated' },
              ].map((f, i) => (
                <div key={i} className={`flex items-start gap-2 rounded-xl ${banner?'bg-white/15 border-white/20 backdrop-blur':'bg-white/80 border-white'} p-3 shadow-sm`}>
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                    banner?'bg-white/20 text-white':
                    i===2?'bg-orange-100 text-orange-600':
                    i===3?'bg-green-100 text-green-600':
                    'bg-brand-100 text-brand-600'}`}>
                    <f.icon className="h-5 w-5"/>
                  </div>
                  <div>
                    <p className={`text-xs md:text-sm font-bold leading-tight ${banner?'text-white':'text-navy-900'}`}>{f.title}</p>
                    <p className={`text-[11px] ${banner?'text-white/70':'text-gray-500'}`}>{f.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <a href={telLink(primaryPhone)}
                className={`group inline-flex items-center justify-center gap-2 rounded-xl ${banner?'bg-cta-orange hover:bg-orange-600 shadow-orange-500/40':'bg-gradient-to-r from-brand-500 to-brand-600 shadow-brand-500/30 hover:shadow-brand-500/40'} px-8 py-4 text-base font-bold text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all`}>
                <Phone className="h-5 w-5"/> Call Now for Service
                <span className="ml-1 rounded bg-white/20 px-2 py-0.5 text-sm font-mono">{primaryPhone}</span>
              </a>
              <Link href="/book-service"
                className={`inline-flex items-center justify-center gap-2 rounded-xl border-2 px-8 py-4 text-base font-bold transition-all ${banner?'border-white bg-transparent text-white hover:bg-white/10':'border-brand-500 bg-white text-brand-600 hover:bg-brand-50 hover:shadow-md'}`}>
                Book Service Online
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-1 text-sm">
              <a href={waLink(whatsappPhone, 'Hi, RO service chahiye Patna mein.')} target="_blank" rel="noopener"
                className="inline-flex items-center gap-2 text-[#25D366] font-semibold hover:underline">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#25D366]/10">
                  <MessageCircle className="h-4 w-4"/>
                </span>
                WhatsApp Quick Book
              </a>
              <span className="text-gray-300 hidden sm:inline">|</span>
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <Clock className="h-3.5 w-3.5"/> 7 AM - 10 PM (all days)
              </span>
            </div>
          </div>

          {/* RIGHT - Real RO visual card (competitor style, better) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md">
              {/* Main gradient card */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-400 via-brand-500 to-blue-600 p-6 md:p-8 shadow-2xl shadow-brand-500/30">
                <div className="pointer-events-none absolute -top-20 -left-20 h-48 w-48 rounded-full bg-white/10 blur-2xl"/>
                <div className="pointer-events-none absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-white/10 blur-3xl"/>

                {/* Decorative cyan wave (competitor jaisa) */}
                <svg className="pointer-events-none absolute left-0 top-0 h-full w-24 opacity-25" viewBox="0 0 100 400" preserveAspectRatio="none">
                  <path d="M0,100 Q30,50 50,120 T100,100 L100,400 L0,400 Z" fill="white"/>
                </svg>

                {/* "Now in Patna" text */}
                <div className="relative text-right">
                  <p className="text-white/90 text-base md:text-lg font-semibold">Now in</p>
                  <p className="text-white text-5xl md:text-7xl font-black tracking-tight drop-shadow-md leading-none">Patna</p>
                </div>

                {/* RO EXPERT badge */}
                <div className="relative mt-6 flex justify-end">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/95 backdrop-blur px-4 py-2 shadow-lg">
                    <svg className="h-6 w-6 text-brand-500" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.5s6 7.5 6 12a6 6 0 01-12 0c0-4.5 6-12 6-12z"/></svg>
                    <span className="text-lg font-black text-brand-700">RO EXPERT</span>
                  </div>
                </div>

                {/* RO image + technician */}
                <div className="relative mt-6 flex items-end justify-between min-h-[200px]">
                  {/* Real RO Purifier image */}
                  <div className="relative h-40 w-28 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-xl bg-white/20 backdrop-blur shadow-inner"/>
                    <Image
                      src="/images/ro-hero.webp"
                      alt="RO Water Purifier"
                      fill
                      sizes="112px"
                      className="object-contain drop-shadow-2xl p-2"
                      priority
                    />
                  </div>

                  {/* Technician */}
                  <div className="relative h-48 w-36">
                    {/* Shirt */}
                    <div className="absolute bottom-0 left-0 right-0 h-28 rounded-t-3xl bg-white shadow-lg"/>
                    <div className="absolute bottom-20 left-3 right-3 h-10 rounded-t-full bg-gradient-to-b from-orange-100 to-orange-200"/>
                    {/* Face */}
                    <div className="absolute bottom-28 left-1/2 -translate-x-1/2 h-16 w-16 rounded-full bg-gradient-to-b from-orange-100 to-orange-200 shadow-md border-4 border-white">
                      <div className="absolute top-5 left-3 h-1.5 w-1.5 rounded-full bg-gray-800"/>
                      <div className="absolute top-5 right-3 h-1.5 w-1.5 rounded-full bg-gray-800"/>
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 h-2 w-6 rounded-b-full border-b-2 border-gray-700"/>
                    </div>
                    {/* Hair */}
                    <div className="absolute bottom-42 left-1/2 -translate-x-1/2 h-6 w-14 rounded-t-full bg-gradient-to-b from-amber-900 to-amber-800"/>
                    {/* Collar logo */}
                    <div className="absolute bottom-14 left-1/2 -translate-x-1/2 flex h-7 w-7 items-center justify-center rounded-full bg-brand-500 text-[9px] font-black text-white shadow">RO</div>
                    {/* Wrench */}
                    <div className="absolute bottom-12 -right-1 rotate-[-20deg]">
                      <Wrench className="h-9 w-9 text-gray-700"/>
                    </div>
                  </div>
                </div>

                {/* Floating Rating */}
                <div className="absolute top-8 left-5 flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 shadow-lg">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400"/>
                  <span className="text-sm font-black text-navy-900">4.9+</span>
                  <span className="text-[10px] text-gray-500 font-medium">RATINGS</span>
                </div>

                {/* Served today */}
                <div className="absolute top-1/2 -left-6 hidden sm:flex items-center gap-2 rounded-2xl bg-white px-3 py-2 shadow-lg">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle2 className="h-4 w-4 text-green-600"/>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 font-semibold">Today's Bookings</p>
                    <p className="text-base font-black text-navy-900">47+ Served</p>
                  </div>
                </div>

                {/* Areas */}
                <div className="absolute bottom-24 -right-4 hidden sm:flex items-center gap-2 rounded-2xl bg-white px-3 py-2 shadow-lg">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-100">
                    <MapPin className="h-4 w-4 text-orange-600"/>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 font-semibold">32+ Areas</p>
                    <p className="text-base font-black text-navy-900">Covered</p>
                  </div>
                </div>

                {/* Phone pill */}
                <div className="relative mt-4 flex items-center gap-3 rounded-full bg-white px-4 py-3 shadow-2xl">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#25D366] animate-pulse">
                    <Phone className="h-5 w-5 text-white"/>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide">Customer Support</p>
                    <a href={telLink(primaryPhone)} className="text-xl font-black text-navy-900 hover:text-brand-600">{primaryPhone}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trusted brands marquee bar */}
      <div className="border-y border-gray-100 bg-white/60 backdrop-blur py-10 overflow-hidden">
        <div className="container-pad">
          <p className="text-center text-sm font-bold uppercase tracking-widest text-gray-500 mb-6">
            Authorized Service Partner for 18+ Leading RO Brands
          </p>
          <div className="marquee flex gap-10 items-center whitespace-nowrap animate-marquee">
            {[...Array(2)].map((_, n) => (
              <div key={n} className="flex gap-10 items-center shrink-0">
                {BRAND_LOGOS.map(b => (
                  <div key={b.alt+n} className="h-24 w-56 flex items-center justify-center shrink-0 transition-all duration-300 hover:scale-110 hover:shadow-lg rounded-xl">
                    <Image src={b.src} alt={b.alt} width={220} height={92} className="object-contain max-h-20 w-auto" priority />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%,100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee { animation: marquee 35s linear infinite; }
      `}</style>
    </section>
  );
}

// Brand logos for marquee
const BRAND_LOGOS = [
  { src: '/brands/kent.png', alt: 'Kent RO' },
  { src: '/brands/aquaguard.png', alt: 'Aquaguard' },
  { src: '/brands/livpure.png', alt: 'Livpure' },
  { src: '/brands/pureit.png', alt: 'Pureit' },
  { src: '/brands/eureka-forbes.png', alt: 'Eureka Forbes' },
  { src: '/brands/ao-smith.png', alt: 'AO Smith' },
  { src: '/brands/blue-star.png', alt: 'Blue Star' },
  { src: '/brands/havells.png', alt: 'Havells' },
  { src: '/brands/lg.png', alt: 'LG' },
  { src: '/brands/samsung.png', alt: 'Samsung' },
  { src: '/brands/whirlpool.png', alt: 'Whirlpool' },
  { src: '/brands/v-guard.png', alt: 'V-Guard' },
  { src: '/brands/usha-shriram.png', alt: 'Usha Shriram' },
  { src: '/brands/bluemount.png', alt: 'Blue Mount' },
  { src: '/brands/nasaka.png', alt: 'Nasaka' },
  { src: '/brands/aquafresh.png', alt: 'Aquafresh' },
  { src: '/brands/tata-swach.png', alt: 'Tata Swach' },
  { src: '/brands/aqua-natural.png', alt: 'Aqua Natural RO' },
];
