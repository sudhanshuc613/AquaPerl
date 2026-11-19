// Client component to avoid build-time Prisma issues on Vercel; fetches DB products client-side with fallback.
'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import HeroSection from '@/components/home/HeroSection';
import CategoryShowcase from '@/components/home/CategoryShowcase';
import ProductCard from '@/components/product/ProductCard';
import ServiceQuickBook from '@/components/service/ServiceQuickBook';
import { formatPrice, PHONES, waLink, telLink, PATNA_AREAS } from '@/lib/utils';
import {
  Shield, Truck, Clock, Award, Phone, Wrench, Star, CheckCircle2,
  Headphones, Zap, MapPin, ArrowRight, Sparkles, Droplets, AlertTriangle, Package,
} from 'lucide-react';

const PROBLEMS = [
  { slug:'ro-leakage-repair', name:'RO Leakage Repair', icon:Droplets, price:'₹299' },
  { slug:'ro-tds-adjustment', name:'TDS Adjustment / Free Test', icon:Droplets, price:'₹200' },
  { slug:'ro-no-water', name:'RO Not Giving Water', icon:AlertTriangle, price:'₹299' },
  { slug:'ro-bad-taste-smell', name:'Bad Taste / Smell Fix', icon:Droplets, price:'₹399' },
  { slug:'ro-membrane-change', name:'Membrane Change (Original)', icon:Droplets, price:'₹1499' },
  { slug:'ro-filter-change', name:'Filter Set Change', icon:Droplets, price:'₹799' },
  { slug:'ro-low-pressure', name:'Low Water Pressure Fix', icon:Droplets, price:'₹299' },
  { slug:'ro-installation', name:'New RO Installation', icon:Wrench, price:'₹499' },
];
import { Button } from '@/components/ui/button';
import PatnaServiceMap from '@/components/site/PatnaServiceMap';

const sampleProducts = [
    { id:'s1', name:'RO Service Patna Pro 12L RO+UV+UF TDS Controller', slug:'ro-patna-pro-12l', price:12999, compareAtPrice:18999, primaryImage:'https://images.unsplash.com/photo-1564419320461-6870880221ad?w=600', brand:{name:'RO Service Patna',slug:'ro-service-patna'}, avgRating:4.7, reviewCount:342, isCommercial:false },
    { id:'s2', name:'Kent Super Plus RO+UV+UF 8L', slug:'kent-super-plus', price:15499, compareAtPrice:19000, primaryImage:'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600', brand:{name:'Kent',slug:'kent'}, avgRating:4.5, reviewCount:612, isCommercial:false },
    { id:'s3', name:'Commercial RO Plant 100 LPH (SS Body)', slug:'commercial-100-lph', price:65000, compareAtPrice:85000, primaryImage:'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600', brand:{name:'RO Service Patna',slug:'ro-service-patna'}, avgRating:4.8, reviewCount:86, isCommercial:true },
    { id:'s4', name:'RO Membrane 80 GPD Original', slug:'ro-membrane-80-gpd', price:1499, compareAtPrice:2200, primaryImage:'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=600', brand:null, avgRating:4.4, reviewCount:1291, isCommercial:false },
    { id:'s5', name:'Sediment + Carbon Filter Set', slug:'filter-set', price:599, compareAtPrice:899, primaryImage:'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600', brand:null, avgRating:4.3, reviewCount:421, isCommercial:false },
    { id:'s6', name:'UV Lamp 11W Replacement', slug:'uv-lamp-11w', price:799, compareAtPrice:1200, primaryImage:'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600', brand:null, avgRating:4.5, reviewCount:231, isCommercial:false },
    { id:'s7', name:'Livpure Glo 7L RO+UV', slug:'livpure-glo-7l', price:10999, compareAtPrice:14500, primaryImage:'https://images.unsplash.com/photo-1564419320461-6870880221ad?w=600', brand:{name:'Livpure',slug:'livpure'}, avgRating:4.4, reviewCount:318, isCommercial:false },
    { id:'s8', name:'RO Service Patna Under-Sink RO 10L', slug:'under-sink-10l', price:18999, compareAtPrice:24999, primaryImage:'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600', brand:{name:'RO Service Patna',slug:'ro-service-patna'}, avgRating:4.6, reviewCount:98, isCommercial:false },
  ];

const uspStats = [
  { num: '10,000+', label: 'Happy Customers' },
  { num: '₹200', label: 'Patna Visit Charge' },
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
          <h3 className="mt-3 text-2xl md:text-3xl">RO Repair @₹200 Visit</h3>
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
              Sirf <strong>₹200 visit charge</strong> — koi hidden fee nahi. Sab brands ka service: Kent, Aquaguard, Livpure,
              Pureit, Eureka Forbes, AO Smith, aur local brands bhi.
            </p>
            <ul className="mt-5 space-y-2">
              {[
                '₹200 hi visit charge — repair na ho to bhi koi paisa nahi extra',
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
              <Link key={a.slug} href={`/areas/${a.slug}`} className="rounded-full border border-navy-200 bg-white px-4 py-1.5 text-sm font-medium text-navy-800 shadow-sm hover:border-brand-500 hover:bg-brand-50 hover:text-brand-600 transition">
                📍 {a.name}
              </Link>
            ))}
          </div>
          <p className="mt-4 text-sm text-gray-600">
            Agar aapka area list mein nahi hai to bhi <a href={telLink(PHONES.primary)} className="font-semibold text-brand-600 hover:underline">call karo</a>, hum dekh lenge!
          </p>
        </div>
      </section>

      {/* RO Problems we fix */}
      <section className="container-pad py-14">
        <div className="text-center">
          <span className="text-sm font-bold uppercase tracking-wider text-cta-orange">RO Problems We Fix</span>
          <h2 className="mt-1 text-3xl">Har RO Problem ka Solution Ek Hi Jagah</h2>
          <p className="mt-2 text-gray-600">Patna ke paani ki quality (high TDS 800-1500, hard water, iron, monsoon bacteria) ke hisab se expert technicians:</p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PROBLEMS.map(p => (
            <Link key={p.slug} href={`/problems/${p.slug}`} className="card-surface p-5 hover:border-brand-400 hover:shadow-lg transition group">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 group-hover:bg-brand-500 group-hover:text-white transition">
                <p.icon className="h-6 w-6"/>
              </div>
              <h4 className="mt-3 text-base">{p.name}</h4>
              <p className="mt-1 text-sm font-bold text-cta-orange">Starting {p.price}</p>
              <p className="mt-1 text-xs text-gray-500 flex items-center gap-1">Book Now <ArrowRight className="h-3 w-3"/></p>
            </Link>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="container-pad py-14">
        <div className="text-center">
          <span className="text-sm font-bold uppercase tracking-wider text-brand-600">Why RO Service Patna</span>
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
              { name:'Priya Devi', area:'Boring Road, Patna', text:'RO Service Patna se naya RO kharida. Price market se ₹3000 kam tha aur free installation mila. Patna ka best RO shop!' },
              { name:'Amit Singh', area:'Patna', text:'Commercial plant order kiya tha apne office ke liye. Shipping fast thi, installation guide bhi diya. Quality superb hai.' },
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

      {/* Patna Water Quality Education (SEO-critical, competitors pe bhi ye content hai) */}
      <section className="bg-gradient-to-br from-navy-900 to-navy-700 py-14 text-white">
        <div className="container-pad grid gap-8 lg:grid-cols-2">
          <div>
            <span className="text-sm font-bold uppercase tracking-wider text-brand-400">Patna Water Quality Guide</span>
            <h2 className="mt-1 text-3xl md:text-4xl text-white">Patna ke Paani mein TDS, Hardness aur Iron — Kyu Zaruri hai Regular RO Service?</h2>
            <p className="mt-3 text-white/80">
              Patna ka groundwater (Ganga basin) usually <strong>800-1500 TDS</strong> ka hota hai, aur monsoon season mein iron aur bacterial contamination bhi aam baat hai.
              Bina regular servicing ke RO membrane 6 mahine mein hi kharab ho jati hai — aur naya membrane ₹2000+ ka padta hai.
            </p>
            <p className="mt-3 text-white/80">
              Hum har service mein <strong>FREE TDS test</strong> dete hain — taaki aapko paani ki sahi quality pata rahe.
              Agar TDS 300 se upar hai to membrane change ya service ki zarurat hai.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl bg-white/10 p-4 backdrop-blur">
                <p className="text-2xl font-extrabold text-brand-400">800-1500</p>
                <p className="text-xs text-white/70">Average TDS in Patna (ppm)</p>
              </div>
              <div className="rounded-xl bg-white/10 p-4 backdrop-blur">
                <p className="text-2xl font-extrabold text-brand-400">3-6 mo</p>
                <p className="text-xs text-white/70">Filter change ideal interval</p>
              </div>
              <div className="rounded-xl bg-white/10 p-4 backdrop-blur">
                <p className="text-2xl font-extrabold text-brand-400">1-2 yr</p>
                <p className="text-xs text-white/70">Membrane life (with service)</p>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <a href={telLink(PHONES.primary)} className="btn-primary bg-white !text-navy-900"><Phone className="h-4 w-4"/>Call for FREE TDS Test</a>
              <Link href="/book-service" className="btn-primary border border-white/30 bg-transparent hover:bg-white/10">Book Service ₹200</Link>
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-white">Signs that your RO needs service in Patna:</h3>
            {[
              {t:'Paani ka taste badla hua hai',d:'Carbon filter kharab hone se aisa hota hai — monsoon mein bacteria bhi ho sakta hai.'},
              {t:'Water flow slow ho gaya',d:'Filters choke ho gaye hain ya pump pressure kam ho gaya.'},
              {t:'TDS 300+ dikha raha hai',d:'Membrane expire ho chuki hai — turant badalni chahiye.'},
              {t:'RO se paani tapak raha hai',d:'Pipe phat gayi hai ya connector loose — turant fix karo warna wall/paint kharab hoga.'},
              {t:'Awaaz aa rahi hai',d:'Pump bearing ya SMPS kharab — agar jaldi fix nahi kiya to poora pump jal sakta hai.'},
            ].map(x => (
              <div key={x.t} className="rounded-xl bg-white/5 p-4 backdrop-blur">
                <p className="font-bold text-orange-300">⚠️ {x.t}</p>
                <p className="mt-1 text-sm text-white/70">{x.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust/Awards section (Mannubhai/ROCareIndia style) */}
      <section className="bg-white py-12 border-y border-gray-100">
        <div className="container-pad">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-gray-400">Recognized & Certified</p>
          <h2 className="mt-1 text-center text-2xl font-bold text-navy-900">Awards, Certifications & Trust Badges</h2>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
            {[
              { t: 'Customer Service\nExcellence Award', c: 'from-yellow-400 to-orange-500', i:'🏆' },
              { t: 'ISO 9001:2015\nCertified', c: 'from-blue-400 to-blue-600', i:'✅' },
              { t: 'Trademark\nRegistered', c: 'from-purple-400 to-purple-600', i:'®' },
              { t: '4.9★ Google\n2,486+ Reviews', c: 'from-green-400 to-green-600', i:'⭐' },
              { t: '10,000+ Happy\nCustomers', c: 'from-cyan-400 to-cyan-600', i:'👥' },
              { t: 'Genuine Parts\nOnly', c: 'from-pink-400 to-red-500', i:'🔧' },
            ].map(b => (
              <div key={b.t} className="card-surface p-5 text-center hover:shadow-lg transition">
                <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br ${b.c} text-2xl text-white shadow-md`}>{b.i}</div>
                <p className="mt-3 whitespace-pre-line text-sm font-bold text-navy-900">{b.t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Services Section - like ROCare/Mannubhai packages */}
      <section className="bg-gray-50 py-14">
        <div className="container-pad">
          <div className="text-center">
            <span className="text-sm font-bold uppercase tracking-wider text-brand-600">Our Services</span>
            <h2 className="mt-1 text-3xl md:text-4xl">RO Repair, Service & Installation Packages</h2>
            <p className="mt-2 max-w-2xl mx-auto text-gray-600">
              Transparent pricing. Pehle inspection, quote phir kaam. Koi hidden charge nahi. Har service mein FREE TDS test included.
            </p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name:'RO Repair', price:'299', mrp:'450', book:'2K+', icon:Wrench, feats:['Price include visit & diagnosis','Spare part rate as per rate card','Chip/control box repair extra','FREE Water Quality (TDS) Test'] },
              { name:'Routine Service', price:'399', mrp:'599', book:'3K+', icon:Shield, feats:['Full inspection & cleaning','Filters/Machine cleaned','Complete purifier checkup','FREE TDS test on every visit'] },
              { name:'Installation', price:'499', mrp:'700', book:'3K+', icon:Truck, feats:['Wall mounting & stand fixing','Inlet water assembly','Electricity connection','FREE TDS test + demo'] },
              { name:'Un-Installation', price:'299', mrp:'499', book:'4K+', icon:Package, feats:['Safe dismantle from wall','Disconnect pipes & electric','Pack for transport','No damage guarantee'] },
            ].map(p => (
              <div key={p.name} className="relative rounded-2xl border-2 border-white bg-white p-6 shadow-sm hover:border-brand-300 hover:shadow-xl transition">
                <div className="absolute -top-3 right-4 rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-bold text-cta-orange">★ 4.7 ({p.book} Bookings)</div>
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-50 text-brand-600"><p.icon className="h-7 w-7"/></div>
                <h3 className="mt-3 text-lg font-bold text-navy-900">{p.name}</h3>
                <p className="mt-2 flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-navy-900">₹{p.price}</span>
                  <span className="text-sm text-gray-400 line-through">₹{p.mrp}</span>
                </p>
                <ul className="mt-4 space-y-1.5">
                  {p.feats.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-500"/>{f}
                    </li>
                  ))}
                </ul>
                <a href={telLink(PHONES.primary)} className="mt-5 block rounded-lg bg-aqua-gradient py-2.5 text-center text-sm font-bold text-white hover:opacity-90">Book Now</a>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-xs text-gray-500">* Spare parts charges extra if required. Visit charge repair quote mein adjust ho jata hai.</p>
        </div>
      </section>

      {/* What Affects Price + How Booking Works (Mannubhai style educational content) */}
      <section className="container-pad py-14">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <span className="text-sm font-bold uppercase tracking-wider text-brand-600">Transparent Pricing</span>
            <h2 className="mt-1 text-3xl">What Affects RO Service Charges in Patna?</h2>
            <p className="mt-3 text-gray-600">
              Water purifier service charges depend on the nature of the fault, purifier type, parts condition, aur replacement ki zarurat hai ya nahi.
              Simple cleaning/minor repair usually cost kam hoti hai; multi-part repair (pump, membrane, circuit) zyada.
            </p>
            <div className="mt-4 space-y-3">
              {[
                'Simple cleaning / inspection: ₹200-399',
                'Filter set change (sediment+carbon): ₹799-1200',
                'Membrane replacement: ₹1499-2200',
                'Pump / SMPS replacement: ₹1200-2500',
                'Full service + all filters + membrane: ₹2500-3500',
              ].map(x=>(
                <div key={x} className="flex items-center gap-3 rounded-lg bg-gray-50 p-3 text-sm">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-green-600"/>{x}
                </div>
              ))}
            </div>
            <p className="mt-3 text-sm text-gray-500">
              Final quote inspection ke baad diya jata hai — technician pehle machine check karega, exact cost batayega, approval ke baad hi kaam.
            </p>
          </div>
          <div>
            <span className="text-sm font-bold uppercase tracking-wider text-cta-orange">Simple Process</span>
            <h2 className="mt-1 text-3xl">How Our RO Service Works?</h2>
            <ol className="mt-5 space-y-4">
              {[
                {n:1, t:'Call/Book karein', d:'Phone 9534037266 pe call karo ya WhatsApp bhejo. Hum 15 minute mein call back karte hain.'},
                {n:2, t:'Technician at your door', d:'Aapke time slot ke mutabik 2-4 ghante mein technician aapke ghar pohoch jata hai.'},
                {n:3, t:'Inspection + Free Quote', d:'Machine poori tarah check karenge, problem identify karenge, exact cost batayenge. Approval ke baad hi kaam.'},
                {n:4, t:'Genuine Parts se Repair', d:'Original spare parts use karenge, TDS set karenge, full testing karenge.'},
                {n:5, t:'Payment + 30-day Warranty', d:'Cash/UPI/online payment. 30-day service warranty + proper bill diya jayega.'},
              ].map(s => (
                <li key={s.n} className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cta-orange font-bold text-white">{s.n}</span>
                  <div><p className="font-bold text-navy-900">{s.t}</p><p className="text-sm text-gray-600">{s.d}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Patna Service Area Map — Google ranking ke liye full map homepage pe bhi */}
      <PatnaServiceMap />

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
