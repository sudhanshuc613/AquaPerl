import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, XCircle, Shield, Phone, Wrench, Clock, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AMC_PLANS, PHONES, telLink, waLink, SERVICE_PACKAGES, BRANDS_SERVICED } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'RO AMC Plans in Patna | ₹1499/year - 3 Visits + Free Filters - RO Service Patna',
  description: 'Best RO AMC plans in Patna starting ₹1499/year. 3 preventive services, free filters, priority support, genuine parts. Kent, Aquaguard, Livpure sab brands. Call 9241536586.',
  keywords: ['RO AMC Patna','RO annual maintenance contract Patna','RO service plan Patna','RO yearly service Patna','cheap RO AMC Patna','RO maintenance Patna'],
};

export default function AMCPage() {
  return (
    <>
      <section className="bg-aqua-gradient text-white">
        <div className="container-pad py-12 text-center">
          <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-xs font-bold backdrop-blur">🛡️ Annual Maintenance Plans</span>
          <h1 className="mt-3 text-white text-3xl md:text-5xl">RO AMC Plans in Patna</h1>
          <p className="mt-3 text-white/90 text-lg max-w-2xl mx-auto">
            Saal mein 3 professional services, free filters, priority support — aur har bachat ₹3000+ ki.
            Genuine parts, 30-day warranty, same-day Patna service.
          </p>
          <div className="mt-5 flex flex-wrap gap-3 justify-center">
            <a href={telLink(PHONES.primary)} className="btn-primary bg-white !text-navy-900"><Phone className="h-4 w-4"/>Call {PHONES.primary}</a>
            <a href={waLink(PHONES.whatsapp, 'Hi, AMC plan ke baare mein jankari chahiye.')} className="btn-whatsapp">WhatsApp Quote</a>
          </div>
        </div>
      </section>

      <section className="container-pad py-12">
        <div className="grid gap-6 md:grid-cols-3">
          {AMC_PLANS.map(plan => (
            <div key={plan.name} className={`relative rounded-2xl border-2 p-6 transition ${plan.popular ? 'border-brand-500 bg-brand-50 shadow-xl scale-105' : 'border-gray-200 bg-white hover:border-brand-300'}`}>
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-cta-orange px-3 py-1 text-xs font-bold text-white shadow">⭐ MOST POPULAR</span>
              )}
              <h3 className="text-xl font-extrabold text-navy-900">{plan.name}</h3>
              <div className="mt-3">
                <span className="text-4xl font-extrabold text-navy-900">₹{plan.price}</span>
                <span className="text-gray-400">/year</span>
                <span className="ml-2 text-sm text-gray-400 line-through">₹{plan.mrp}</span>
                <p className="mt-1 text-sm text-green-600 font-semibold">Save ₹{plan.mrp - plan.price}/year</p>
              </div>

              <div className="mt-5 space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-500">What's included:</p>
                {plan.includes.map(f => (
                  <div key={f} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-green-600 mt-0.5"/>{f}
                  </div>
                ))}
                {plan.excludes.length > 0 && (
                  <>
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mt-4">Not included:</p>
                    {plan.excludes.map(f => (
                      <div key={f} className="flex items-start gap-2 text-sm text-gray-500">
                        <XCircle className="h-4 w-4 shrink-0 text-red-400 mt-0.5"/>{f}
                      </div>
                    ))}
                  </>
                )}
              </div>

              <div className="mt-6 space-y-2">
                <a href={telLink(PHONES.primary)} className="block w-full rounded-lg bg-brand-500 py-2.5 text-center text-sm font-bold text-white hover:bg-brand-600">Call to Subscribe</a>
                <a href={waLink(PHONES.whatsapp, `Hi, ${plan.name} AMC plan lena hai.`)} target="_blank" rel="noopener" className="block w-full rounded-lg bg-[#25D366] py-2.5 text-center text-sm font-bold text-white hover:bg-[#20ba5a]">WhatsApp Book</a>
              </div>
            </div>
          ))}
        </div>

        {/* Why AMC */}
        <div className="mt-16 grid gap-6 md:grid-cols-4">
          {[
            { icon:Shield, title:'30-Day Warranty', desc:'Har service par 30-day warranty' },
            { icon:Clock, title:'Priority Response', desc:'AMC customers ko 2 hour mein service' },
            { icon:Wrench, title:'Trained Technicians', desc:'Background-verified, experienced pros' },
            { icon:Zap, title:'Genuine Parts', desc:'100% original company ke parts' },
          ].map(f => (
            <div key={f.title} className="card-surface p-5 text-center">
              <f.icon className="mx-auto h-10 w-10 text-brand-500"/>
              <h4 className="mt-2">{f.title}</h4>
              <p className="mt-1 text-sm text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* One-time services */}
        <div className="mt-16">
          <h2 className="text-center">One-Time Services (No AMC Needed)</h2>
          <p className="mt-2 text-center text-gray-600">Agar AMC nahi chahiye to one-time service bhi le sakte ho:</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICE_PACKAGES.map(p => (
              <div key={p.id} className="rounded-xl border-2 bg-white p-5 hover:border-brand-300 transition">
                <h4 className="font-bold text-navy-900">{p.name}</h4>
                <p className="mt-2 text-2xl font-extrabold">₹{p.price}<span className="text-sm font-normal text-gray-400 line-through ml-2">₹{p.mrp}</span></p>
                <ul className="mt-3 space-y-1 text-sm text-gray-600">
                  {p.includes.map(f => (
                    <li key={f} className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600"/>{f}</li>
                  ))}
                </ul>
                {p.note && <p className="mt-2 text-xs text-orange-600">* {p.note}</p>}
                <a href={waLink(PHONES.whatsapp, `${p.name} service chahiye Patna mein.`)} target="_blank" rel="noopener" className="mt-4 block rounded-lg bg-brand-500 py-2 text-center text-sm font-bold text-white hover:bg-brand-600">Book on WhatsApp</a>
              </div>
            ))}
          </div>
        </div>

        {/* Brands */}
        <div className="mt-16">
          <h2 className="text-center">All Brands Covered Under AMC</h2>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {BRANDS_SERVICED.map(b => <span key={b.slug} className="rounded-full bg-brand-50 border border-brand-100 px-4 py-1.5 text-sm font-medium text-brand-700">{b.name}</span>)}
          </div>
        </div>

        <div className="mt-16 rounded-2xl bg-aqua-gradient p-8 text-white text-center">
          <h2 className="text-white">AMC Activate Karna Hai?</h2>
          <p className="mt-2 text-white/90">Abhi call karo — aaj hi technician aake AMC activate kar dega.</p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <a href={telLink(PHONES.primary)} className="btn-primary bg-white !text-navy-900"><Phone className="h-4 w-4"/>Call {PHONES.primary}</a>
            <Link href="/book-service"><Button variant="navy" className="bg-white/20 hover:bg-white/30 text-white"><Wrench className="h-4 w-4"/>Book Online</Button></Link>
          </div>
        </div>
      </section>
    </>
  );
}
