import Link from 'next/link';
import Image from 'next/image';
import { Droplets, Factory, Wrench, Settings2, ChevronRight } from 'lucide-react';

const cats = [
  { icon: Droplets, name: 'Domestic RO', desc: 'Home purifiers', href: '/categories/ro-purifiers', color: 'from-brand-400 to-brand-600', count: '45+' },
  { icon: Factory, name: 'Commercial Plants', desc: '50–1000+ LPH', href: '/categories/commercial-plants', color: 'from-navy-600 to-navy-800', count: '20+' },
  { icon: Settings2, name: 'Spare Parts', desc: 'Membranes, filters & more', href: '/categories/spare-parts', color: 'from-orange-400 to-orange-600', count: '120+' },
  { icon: Wrench, name: 'RO Service', desc: 'Patna doorstep', href: '/book-service', color: 'from-green-500 to-emerald-700', count: '24/7' },
];

export default function CategoryShowcase() {
  return (
    <section className="section">
      <div className="container-pad">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <span className="badge bg-brand-100 text-brand-700">Shop by Category</span>
            <h2 className="mt-2">Everything you need for pure water</h2>
          </div>
          <Link href="/categories" className="hidden items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700 md:inline-flex">
            View All <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cats.map((c) => (
            <Link key={c.name} href={c.href} className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
              <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${c.color} text-white shadow-lg transition-transform group-hover:scale-110`}>
                <c.icon className="h-7 w-7" />
              </div>
              <h3 className="text-lg">{c.name}</h3>
              <p className="text-sm text-gray-500">{c.desc}</p>
              <span className="mt-2 inline-block text-xs font-bold text-brand-600">{c.count} items →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
