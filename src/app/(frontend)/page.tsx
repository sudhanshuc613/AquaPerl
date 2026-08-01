// Client component to avoid build-time Prisma issues on Vercel; fetches DB products client-side with fallback.
'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import HeroSection from '@/components/home/HeroSection';
import CategoryShowcase from '@/components/home/CategoryShowcase';
import ProductCard from '@/components/product/ProductCard';
import ServiceQuickBook from '@/components/service/ServiceQuickBook';
import { formatPrice, PHONES, waLink, telLink } from '@/lib/utils';
import {
  Shield, Truck, Clock, Award, Phone, Wrench, Star, CheckCircle2,
  Headphones, Zap, MapPin, ArrowRight, Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const PATNA_AREAS = [
  'Boring Road', 'Kankarbagh', 'Patna Sahib', 'Danapur', 'Bailey Road', 'Rajendra Nagar',
  'Gandhi Maidan', 'Mithapur', 'Anisabad', 'Phulwari Sharif', 'Patliputra', 'Kidwaipuri',
  'Bakerganj', 'Machuatoli', 'Frazer Road', 'Srikrishnapuri', 'Lohia Nagar', 'Khemnichak',
];

const sampleProducts = [
    { id:'s1', name:'AquaNexa Pro 12L RO+UV+UF TDS Controller', slug:'aquanexa-pro-12l', price:12999, compareAtPrice:18999, primaryImage:'https://images.unsplash.com/photo-1564419320461-6870880221ad?w=600', brand:{name:'AquaNexa',slug:'aquanexa'}, avgRating:4.7, reviewCount:342, isCommercial:false },
    { id:'s2', name:'Kent Super Plus RO+UV+UF 8L', slug:'kent-super-plus', price:15499, compareAtPrice:19000, primaryImage:'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600', brand:{name:'Kent',slug:'kent'}, avgRating:4.5, reviewCount:612, isCommercial:false },
    { id:'s3', name:'Commercial RO Plant 100 LPH (SS Body)', slug:'commercial-100-lph', price:65000, compareAtPrice:85000, primaryImage:'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600', brand:{name:'AquaNexa',slug:'aquanexa'}, avgRating:4.8, reviewCount:86, isCommercial:true },
    { id:'s4', name:'RO Membrane 80 GPD Original', slug:'ro-membrane-80-gpd', price:1499, compareAtPrice:2200, primaryImage:'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=600', brand:null, avgRating:4.4, reviewCount:1291, isCommercial:false },
    { id:'s5', name:'Sediment + Carbon Filter Set', slug:'filter-set', price:599, compareAtPrice:899, primaryImage:'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600', brand:null, avgRating:4.3, reviewCount:421, isCommercial:false },
    { id:'s6', name:'UV Lamp 11W Replacement', slug:'uv-lamp-11w', price:799, compareAtPrice:1200, primaryImage:'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600', brand:null, avgRating:4.5, reviewCount:231, isCommercial:false },
    { id:'s7', name:'Livpure Glo 7L RO+UV', slug:'livpure-glo-7l', price:10999, compareAtPrice:14500, primaryImage:'https://images.unsplash.com/photo-1564419320461-6870880221ad?w=600', brand:{name:'Livpure',slug:'livpure'}, avgRating:4.4, reviewCount:318, isCommercial:false },
    { id:'s8', name:'AquaNexa Under-Sink RO 10L', slug:'under-sink-10l', price:18999, compareAtPrice:24999, primaryImage:'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600', brand:{name:'AquaNexa',slug:'aquanexa'}, avgRating:4.6, reviewCount:98, isCommercial:false },
  ];

const uspStats = [
  { num: '10,000+', label: 'Happy Customers' },
  { num: '₹100', label: 'Patna Visit Charge' },
  { num: '50+', label: 'Brands Available' },
  { num: '24/7', label: 'Support' },
];

export default function HomePage() {
  const [products, setProducts] = useState<any[]>(sampleProducts);
  useEffect(() => {
    fetch('/api/shop/products?take=8').then(r => r.json()).then(d => {
      if (d.products && d.products.length) setProducts(d.products);
    }).catch(() => {});
  }, []);

  return (
    <div>
      <HeroSection />

      {/* USP strip */}
      <section className="border-y border-gray-100 bg-white">
        <div className="container-pad grid gap-6 py-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Truck, title: 'Free Pan-India Delivery', sub: 'On orders above ₹500' },
            { icon: Shield, title: '100% Genuine Parts', sub: 'Original membranes & filters' },
            { icon: Clock, title: 'Same-Day Patna Service', sub: 'Booking before 5PM' },
            { icon: Award, title: '1-Year Warranty', sub: 'On all new purifiers' },
          ].map(u => (
            <div key={u.title} className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600"><u.icon className="h-5 w-5"/></div>
              <div><p className="text-sm font-bold text-navy-900">{u.title}</p><p className="text-xs text-gray-500">{u.sub}</p></div>
            </div>
          ))}
        </div>
      </section>

      <CategoryShowcase />

      {/* Featured Products */}
      <section className="container-pad py-14">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <span className="text-sm font-bold uppercase tracking-wider text-brand-600">Best Sellers</span>
            <h2 className="mt-1">Featured Products</h2>
            <p className="mt-1 text-gray-500">Handpicked RO purifiers & parts — best quality at lowest price</p>
          </div>
          <Link href="/categories/ro-purifiers" className="hidden md:inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:underline">View All <ArrowRight className="h-4 w-4"/></Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
          {products.map(p => <ProductCard key={p.id} product={p}/>)}
        </div>
      </section>

      {/* Dual promo banners */}
      <section className="container-pad grid gap-4 md:grid-cols-2">
        <Link href="/categories/commercial-plants" className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-navy-900 to-navy-700 p-8 text-white shadow-xl">
          <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">For Offices & Factories</span>
          <h3 className="mt-3 text-2xl md:text-3xl">Commercial RO Plants</h3>
          <p className="mt-1 text-brand-100">50 LPH to 10,000 LPH. Installation & AMC all over India.</p>
          <Button className="mt-4 bg-white !text-navy-900 hover:bg-gray-100">Explore Now <ArrowRight className="h-4 w-4"/></Button>
          <Sparkles className="absolute -right-4 -top-4 h-24 w-24 text-white/10"/>
        </Link>
        <Link href="/book-service" className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-cta-orange to-orange-600 p-8 text-white shadow-xl">
          <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">Patna Locals Only</span>
          <h3 className="mt-3 text-2xl md:text-3xl">RO Repair @₹100 Visit</h3>
          <p className="mt-1 text-orange-100">Same-day service. Expert technicians. Genuine parts.</p>
          <Button className="mt-4 bg-white !text-cta-orange hover:bg-gray-100">Book Service Now <Wrench className="h-4 w-4"/></Button>
          <Phone className="absolute -right-4 -top-4 h-24 w-24 text-white/10"/>
        </Link>
      </section>

      {/* Patna Service Section */}
      <section className="container-pad py-14">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <span className="text-sm font-bold uppercase tracking-wider text-cta-orange">Patna RO Service</span>
            <h2 className="mt-1 text-3xl md:text-4xl">Patna ka #1 RO Repair & Installation Service</h2>
            <p className="mt-3 text-gray-600">
              Hum Patna ke har area mein same-day RO repair, installation, filter change, aur membrane change karte hain.
              Sirf <strong>₹100 visit charge</strong> — koi hidden fee nahi. Sab brands ka service: Kent, Aquaguard, Livpure,
              Pureit, Eureka Forbes, AO Smith, aur local brands bhi.
            </p>
            <ul className="mt-5 space-y-2">
              {[
                '₹100 hi visit charge — repair na ho to bhi koi paisa nahi extra',
                'Genuine spare parts — 100% original company ke',
                '24-hour ke andar technician at your door',
                '30-day service warranty',
                'All brands supported: Kent, Aquaguard, Livpure, Pureit, etc.',
                'Online booking + instant WhatsApp confirmation',
              ].map(f => (
                <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600"/>{f}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={waLink(PHONES.whatsapp, 'Hi, RO service chahiye Patna mein')} className="btn-whatsapp">
                <svg viewBox="0 0 32 32" className="h-4 w-4 fill-current"><path d="M16 .396C7.384.396.396 7.384.396 16c0 2.76.73 5.475 2.114 7.866L.054 31.604l7.937-2.387A15.54 15.54 0 0 0 16 31.604c8.616 0 15.604-6.988 15.604-15.604S24.616.396 16 .396z"/></svg>
                WhatsApp Book
              </a>
              <a href={telLink(PHONES.primary)} className="btn-navy"><Phone className="h-4 w-4"/>Call {PHONES.primary}</a>
            </div>
          </div>

          <ServiceQuickBook />
        </div>
      </section>

      {/* Service Areas */}
      <section className="bg-navy-50 py-12">
        <div className="container-pad">
          <div className="flex items-center gap-2 text-cta-orange">
            <MapPin className="h-5 w-5"/> <span className="text-sm font-bold uppercase tracking-wider">Service Areas</span>
          </div>
          <h3 className="mt-1 text-2xl">Hum in sab Patna areas mein service dete hain:</h3>
          <div className="mt-6 flex flex-wrap gap-2">
            {PATNA_AREAS.map(a => (
              <span key={a} className="rounded-full border border-navy-200 bg-white px-4 py-1.5 text-sm font-medium text-navy-800 shadow-sm hover:border-brand-500 hover:text-brand-600">
                📍 {a}
              </span>
            ))}
          </div>
          <p className="mt-4 text-sm text-gray-600">
            Agar aapka area list mein nahi hai to bhi <a href={telLink(PHONES.primary)} className="font-semibold text-brand-600 hover:underline">call karo</a>, hum dekh lenge!
          </p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="container-pad py-14">
        <div className="text-center">
          <span className="text-sm font-bold uppercase tracking-wider text-brand-600">Why AquaNexa</span>
          <h2 className="mt-1 text-3xl">India ke Trusted RO Partner</h2>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon:Zap, title:'Fastest Delivery', desc:'Pan-India fast shipping; Patna same-day' },
            { icon:Headphones, title:'Expert Support', desc:'Hindi/English mein phone pe help' },
            { icon:Shield, title:'Secure Payments', desc:'UPI, Card, NetBanking, COD' },
            { icon:Star, title:'4.8★ Rating', desc:'10,000+ satisfied customers' },
          ].map(f => (
            <div key={f.title} className="card-surface p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-aqua-gradient text-white shadow-lg shadow-brand-500/30"><f.icon className="h-6 w-6"/></div>
              <p className="mt-4 font-bold text-navy-900">{f.title}</p>
              <p className="mt-1 text-sm text-gray-500">{f.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
          {uspStats.map(s => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-extrabold text-brand-600 md:text-4xl">{s.num}</div>
              <div className="mt-1 text-sm text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-navy-900 py-14 text-white">
        <div className="container-pad">
          <div className="text-center">
            <span className="text-sm font-bold uppercase tracking-wider text-brand-400">Testimonials</span>
            <h2 className="mt-1 text-3xl">Customers kya bolte hain</h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              { name:'Ravi Kumar', area:'Kankarbagh, Patna', text:'Mera Kent RO 2 din se nahi chal raha tha. Subah 9 baje call kiya, 11 baje technician aaya, filter badal diya. Sirf ₹600 total kharcha. Bohot achha service!' },
              { name:'Priya Devi', area:'Boring Road, Patna', text:'AquaNexa se naya RO kharida. Price market se ₹3000 kam tha aur free installation mila. Patna ka best RO shop!' },
              { name:'Amit Singh', area:'Mumbai', text:'Commercial plant order kiya tha apne office ke liye. Shipping fast thi, installation guide bhi diya. Quality superb hai.' },
            ].map(t => (
              <div key={t.name} className="rounded-2xl bg-white/5 p-6 backdrop-blur">
                <div className="flex gap-0.5 text-yellow-400">{Array.from({length:5}).map((_,i)=><Star key={i} className="h-4 w-4 fill-current"/>)}</div>
                <p className="mt-3 text-sm text-gray-200">"{t.text}"</p>
                <div className="mt-4 border-t border-white/10 pt-3 text-sm">
                  <p className="font-bold">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.area}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container-pad py-14">
        <div className="rounded-3xl bg-gradient-to-br from-brand-500 to-brand-700 p-10 text-center text-white shadow-2xl shadow-brand-500/30">
          <h2 className="text-3xl md:text-4xl">Abhi order karo ya service book karo!</h2>
          <p className="mt-2 text-brand-100">Same-day Patna service • Pan-India delivery • 100% genuine products</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a href={telLink(PHONES.primary)} className="btn-primary bg-white !text-brand-700 hover:bg-gray-100"><Phone className="h-4 w-4"/>Call: {PHONES.primary}</a>
            <Link href="/categories/ro-purifiers" className="btn-primary !bg-navy-900 hover:!bg-navy-800">Shop RO Purifiers</Link>
            <Link href="/book-service" className="btn-whatsapp"><Wrench className="h-4 w-4"/>Book Service</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
