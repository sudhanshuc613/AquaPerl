import type { Metadata } from 'next';
import Link from 'next/link';
import { BRANDS_SERVICED, PHONES, telLink } from '@/lib/utils';
import { Phone, Wrench, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'All RO Brands Service in Patna | Kent, Aquaguard, Livpure, Pureit, AO Smith',
  description: 'Authorized RO service for all brands in Patna - Kent, Aquaguard, Livpure, Pureit, AO Smith, Blue Star, Havells, LG. Same-day service @ ₹200 visit. Call 9241536586.',
  keywords: ['Kent RO service Patna','Aquaguard service Patna','Livpure service Patna','Pureit service Patna','AO Smith service Patna','Blue Star RO service Patna','Havells RO service Patna'],
  alternates: { canonical: '/brands' },
};

const BRAND_LINKS = BRANDS_SERVICED.map(b => {
  const slug = b.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  return { name: b, slug };
});

export default function BrandsPage() {
  return (
    <div>
      <section className="bg-aqua-gradient text-white py-14">
        <div className="container-pad text-center">
          <p className="text-xs text-white/80"><Link href="/" className="hover:text-white">Home</Link> / Brands</p>
          <h1 className="mt-2 text-white text-3xl md:text-5xl">Service for All RO Brands</h1>
          <p className="mt-3 max-w-2xl mx-auto text-white/90">Har brand ka RO service, repair, installation ek hi jagah. Original spare parts, trained technicians.</p>
        </div>
      </section>

      <section className="container-pad py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BRAND_LINKS.map(b => (
            <Link key={b.slug} href={`/brands/${b.slug}`} className="group card-surface p-6 hover:border-brand-400 hover:shadow-md transition">
              <h3 className="text-lg font-bold text-navy-900 group-hover:text-brand-600">{b.name} RO Service in Patna →</h3>
              <div className="mt-3 space-y-1 text-sm text-gray-600">
                {['Repair & troubleshooting','Filter & membrane change','New installation','AMC plans','Same-day visit @ ₹200'].map(f => (
                  <p key={f} className="flex items-start gap-1"><CheckCircle2 className="h-3.5 w-3.5 mt-0.5 text-green-600 shrink-0"/>{f}</p>
                ))}
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center card-surface p-8 max-w-xl mx-auto">
          <h3>Abhi Service Chahiye?</h3>
          <a href={telLink(PHONES.primary)} className="mt-4 inline-flex items-center gap-2 btn-primary"><Phone className="h-4 w-4"/>Call {PHONES.primary}</a>
          <p className="mt-2 text-sm text-gray-500">Ya brand page pe ja ke aur details dekho.</p>
        </div>
      </section>
    </div>
  );
}
