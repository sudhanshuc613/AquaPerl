'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import { Phone, Wrench, Shield, Truck, Award, ChevronRight, Droplet, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PHONES, telLink, waLink } from '@/lib/utils';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const slides = [
  {
    title: "India's Best RO Purifiers",
    subtitle: "Delivered Anywhere in India",
    description: "Premium domestic & commercial RO systems with free installation. Up to 40% off on top brands.",
    cta: "Shop Now",
    ctaLink: "/categories/ro-purifiers",
    secondary: "View Commercial Plants",
    secondaryLink: "/categories/commercial-plants",
    bg: "from-navy-900 via-brand-700 to-brand-500",
    icon: Droplet,
    badges: ["Free Shipping", "1-Year Warranty", "Top Brands"],
  },
  {
    title: "Expert RO Service in Patna",
    subtitle: "Visit Charge Only ₹100",
    description: "Same-day doorstep service by verified technicians. Repair, installation, AMC, filter change — all at your home.",
    cta: "Call Now",
    ctaLink: telLink(PHONES.primary),
    secondary: "Book Online",
    secondaryLink: "/book-service",
    bg: "from-cta-orange via-orange-600 to-red-600",
    icon: Wrench,
    badges: ["Same-Day Service", "Genuine Parts", "100% Safe"],
    isService: true,
  },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-brand-50">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{ clickable: true, el: '.hero-dots' }}
        loop
        className="h-[520px] md:h-[600px]"
      >
        {slides.map((s, i) => (
          <SwiperSlide key={i}>
            <div className={`relative flex h-full items-center bg-gradient-to-br ${s.bg} text-white`}>
              {/* Decorative bubbles */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute left-10 top-10 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
                <div className="absolute bottom-0 right-10 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
                {[...Array(8)].map((_, k) => (
                  <div
                    key={k}
                    className="absolute rounded-full bg-white/20 animate-float"
                    style={{
                      width: `${10 + Math.random() * 20}px`,
                      height: `${10 + Math.random() * 20}px`,
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${k * 0.4}s`,
                      animationDuration: `${3 + Math.random() * 3}s`,
                    }}
                  />
                ))}
              </div>

              <div className="container-pad relative z-10 grid items-center gap-8 md:grid-cols-2">
                <div>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {s.badges.map(b => (
                      <span key={b} className="badge bg-white/20 text-white backdrop-blur-sm">{b}</span>
                    ))}
                  </div>
                  <p className="mb-3 text-lg font-semibold text-white/90">
                    <s.icon className="mr-2 inline h-5 w-5" />
                    {s.subtitle}
                  </p>
                  <h1 className="mb-4 text-4xl font-extrabold leading-tight text-white md:text-6xl text-balance">
                    {s.title}
                  </h1>
                  <p className="mb-8 max-w-xl text-lg text-white/90">{s.description}</p>

                  {s.isService ? (
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <a href={s.ctaLink} className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-bold text-orange-600 shadow-xl transition-all hover:scale-105 hover:shadow-2xl">
                        <Phone className="h-5 w-5" /> Call {PHONES.primary}
                      </a>
                      <a href={waLink(PHONES.whatsapp, 'Hi, I need RO service in Patna.')} className="btn-whatsapp h-14 rounded-xl px-8 text-base">
                        WhatsApp {PHONES.secondary}
                      </a>
                      <Link href={s.secondaryLink} className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/40 bg-white/10 px-6 py-4 text-base font-bold backdrop-blur-sm hover:bg-white/20">
                        {s.secondary} <ChevronRight className="h-5 w-5" />
                      </Link>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <Link href={s.ctaLink} className="btn-primary h-14 rounded-xl bg-white !px-8 text-base !text-navy-900 hover:bg-gray-100">
                        {s.cta} <ChevronRight className="h-5 w-5" />
                      </Link>
                      <Link href={s.secondaryLink} className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/40 bg-white/10 px-6 py-4 text-base font-bold text-white backdrop-blur-sm hover:bg-white/20">
                        {s.secondary}
                      </Link>
                    </div>
                  )}

                  {/* trust bar */}
                  <div className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-white/20 pt-6 text-sm">
                    <div><Shield className="mb-1 h-5 w-5" />100% Genuine</div>
                    <div><Truck className="mb-1 h-5 w-5" />Free Delivery</div>
                    <div><Award className="mb-1 h-5 w-5" />Certified</div>
                  </div>
                </div>

                {/* Right visual */}
                <div className="relative hidden h-full items-center justify-center md:flex">
                  <div className="relative h-[420px] w-[420px]">
                    <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-3xl" />
                    <div className="absolute inset-8 rounded-full bg-white/5" />
                    <div className="absolute inset-0 flex items-center justify-center animate-float">
                      <s.icon className="h-56 w-56 text-white drop-shadow-2xl" strokeWidth={1} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="hero-dots absolute bottom-5 left-1/2 z-20 -translate-x-1/2 [&_.swiper-pagination-bullet]:!bg-white/50 [&_.swiper-pagination-bullet-active]:!bg-white [&_.swiper-pagination-bullet]:!w-3 [&_.swiper-pagination-bullet]:!h-3" />
    </section>
  );
}
