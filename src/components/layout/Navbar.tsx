'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  Search, ShoppingCart, User, Menu, X, Phone, ChevronDown, Wrench,
  Droplets, Factory, Settings2, LogOut, LayoutDashboard, Package, MapPin, Shield, Truck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn, PHONES, PATNA_AREAS, telLink } from '@/lib/utils';
import { useCart } from '@/lib/store';

const categoryMega = [
  {
    title: 'RO Purifiers', icon: Droplets, href: '/categories/ro-purifiers',
    sub: [
      { name: 'Domestic RO', href: '/categories/domestic-ro' },
      { name: 'UV + UF Purifiers', href: '/categories/uv-uf' },
      { name: 'Under-Sink Models', href: '/categories/under-sink' },
      { name: 'Wall-Mount Models', href: '/categories/wall-mount' },
    ],
  },
  {
    title: 'Spare Parts', icon: Settings2, href: '/categories/spare-parts',
    sub: [
      { name: 'RO Membranes', href: '/categories/ro-membranes' },
      { name: 'Filter Sets', href: '/categories/filters' },
      { name: 'UV Lamps', href: '/categories/uv-lamps' },
      { name: 'Pumps & Motors', href: '/categories/pumps' },
      { name: 'Connectors & Pipes', href: '/categories/connectors' },
    ],
  },
  {
    title: 'Commercial Plants', icon: Factory, href: '/categories/commercial-plants',
    sub: [
      { name: '50 LPH Plants', href: '/categories/50-lph' },
      { name: '100 LPH Plants', href: '/categories/100-lph' },
      { name: '250+ LPH Plants', href: '/categories/250-lph' },
    ],
  },
];

// Split Patna areas into 3 columns for premium megamenu
const AREA_COLS = [
  PATNA_AREAS.slice(0, Math.ceil(PATNA_AREAS.length / 3)),
  PATNA_AREAS.slice(Math.ceil(PATNA_AREAS.length / 3), Math.ceil(PATNA_AREAS.length * 2 / 3)),
  PATNA_AREAS.slice(Math.ceil(PATNA_AREAS.length * 2 / 3)),
];

export default function Navbar() {
  const { data: session } = useSession();
  const isAdmin = !!(session && ['ADMIN','SUPER_ADMIN'].includes((session.user as any)?.role));
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeCat, setActiveCat] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [acctOpen, setAcctOpen] = useState(false);
  const [searchQ, setSearchQ] = useState('');
  const items = useCart(s => s.items);
  const count = items.reduce((s, i) => s + i.quantity, 0);
  const setCartOpen = useCart(s => s.setOpen);

  const doSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQ.trim()) router.push(`/search?q=${encodeURIComponent(searchQ.trim())}`);
  };

  const toggleMobile = (key: string) => setMobileExpanded(mobileExpanded === key ? null : key);

  return (
    <>
      {/* Top strip */}
      <div className="bg-navy-900 text-white text-xs">
        <div className="container-pad flex items-center justify-between py-2">
          <div className="hidden items-center gap-4 md:flex">
            <span className="flex items-center gap-1.5">
              <Truck/> 🚚 Pan-India Delivery
            </span>
            <span className="text-white/30">|</span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3 w-3"/> 🔧 Patna RO Service ₹200 Visit
            </span>
            <span className="text-white/30">|</span>
            <span className="flex items-center gap-1.5 text-yellow-300">⭐ 4.9★ (2486+ reviews)</span>
          </div>
          <div className="flex items-center gap-3">
            <a href={telLink(PHONES.primary)} className="flex items-center gap-1 font-bold bg-cta-orange hover:bg-orange-600 transition px-3 py-1 rounded-md shadow-sm">
              <Phone className="h-3 w-3 animate-pulse"/> Call Now: {PHONES.primary}
            </a>
            <Link href="/track-order" className="hidden hover:text-brand-300 md:inline text-xs font-medium">Track Order</Link>
            <Link href="/amc" className="hidden hover:text-brand-300 md:inline-flex items-center gap-1 text-xs font-medium"><Shield className="h-3 w-3"/>AMC</Link>
            {isAdmin && <Link href="/admin/dashboard" className="flex items-center gap-1 font-semibold text-brand-300 hover:text-white text-xs">Admin</Link>}
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="container-pad">
          <div className="flex h-20 items-center gap-6">
            <button className="md:hidden -ml-2 p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
              {mobileOpen ? <X className="h-6 w-6"/> : <Menu className="h-6 w-6"/>}
            </button>

            {/* Brand Logo */}
            <Link href="/" className="flex shrink-0 items-center gap-3">
              <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 shadow-lg shadow-brand-500/30">
                <Droplets className="h-7 w-7 text-white"/>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-xl md:text-2xl font-extrabold tracking-tight text-navy-900">RO Service <span className="text-brand-500">Patna</span></span>
                <span className="-mt-1 text-[10px] font-bold uppercase tracking-widest text-cta-orange">RO • Spare Parts • Service</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1 ml-4">
              {categoryMega.map((cat) => (
                <div key={cat.title} className="group relative"
                  onMouseEnter={() => setActiveCat(cat.title)}
                  onMouseLeave={() => setActiveCat(null)}>
                  <button className="flex items-center gap-1.5 rounded-lg px-3.5 py-2.5 text-sm font-semibold text-navy-800 hover:bg-brand-50 hover:text-brand-600 transition">
                    <cat.icon className="h-4.5 w-4.5"/>{cat.title}
                    <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', activeCat===cat.title && 'rotate-180')}/>
                  </button>
                  {activeCat === cat.title && (
                    <div className="absolute left-0 top-full w-64 pt-2 z-50">
                      <div className="rounded-xl border border-gray-100 bg-white p-2 shadow-2xl">
                        <Link href={cat.href} className="flex items-center gap-2 rounded-lg bg-brand-50 px-3 py-2.5 text-sm font-bold text-brand-700" onClick={() => setActiveCat(null)}>
                          <cat.icon className="h-4 w-4"/>View All {cat.title}
                        </Link>
                        <div className="mt-1 space-y-0.5">
                          {cat.sub.map(s => <Link key={s.name} href={s.href} className="block rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-brand-50 hover:text-brand-600" onClick={() => setActiveCat(null)}>{s.name}</Link>)}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <div className="group relative"
                onMouseEnter={() => setActiveCat('areas')}
                onMouseLeave={() => setActiveCat(null)}>
                <button className="flex items-center gap-1.5 rounded-lg px-3.5 py-2.5 text-sm font-semibold text-navy-800 hover:bg-brand-50 hover:text-brand-600 transition">
                  <MapPin className="h-4.5 w-4.5"/>Service Areas
                  <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', activeCat==='areas' && 'rotate-180')}/>
                </button>
                {activeCat === 'areas' && (
                  <div className="absolute left-0 top-full w-[680px] pt-2 z-50">
                    <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-2xl">
                      <Link href="/book-service" className="flex items-center gap-2 rounded-lg bg-orange-50 px-4 py-2.5 text-sm font-bold text-cta-orange" onClick={() => setActiveCat(null)}>
                        <MapPin className="h-4 w-4"/>All 32+ Patna Areas Covered
                      </Link>
                      <div className="mt-3 grid grid-cols-3 gap-x-4 gap-y-0.5">
                        {AREA_COLS.map((col, ci) => (
                          <div key={ci}>
                            {col.map(a => (
                              <Link key={a.slug} href={`/areas/${a.slug}`} className="flex items-center gap-1.5 rounded px-2 py-1.5 text-sm text-gray-700 hover:bg-brand-50 hover:text-brand-600" onClick={() => setActiveCat(null)}>
                                <MapPin className="h-3 w-3 text-brand-500"/>{a.name}
                              </Link>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <Link href="/book-service" className="flex items-center gap-1.5 rounded-lg px-3.5 py-2.5 text-sm font-semibold text-cta-orange hover:bg-orange-50 transition">
                <Wrench className="h-4.5 w-4.5"/>Patna RO Service
              </Link>
              <Link href="/amc" className="flex items-center gap-1.5 rounded-lg px-3.5 py-2.5 text-sm font-semibold text-navy-800 hover:bg-brand-50 hover:text-brand-600 transition">
                <Shield className="h-4.5 w-4.5"/>AMC Plans
              </Link>
            </nav>

            {/* Search Bar - properly spaced */}
            <form onSubmit={doSearch} className="hidden lg:flex flex-1 justify-end">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"/>
                <input type="text" value={searchQ} onChange={e => setSearchQ(e.target.value)}
                  placeholder="Search products, brands, service..."
                  className="w-full h-11 rounded-full border-2 border-gray-200 bg-gray-50 pl-11 pr-4 text-sm outline-none transition focus:border-brand-500 focus:bg-white focus:shadow-sm"/>
              </div>
            </form>

            {/* Right Actions */}
            <div className="flex items-center gap-1 ml-auto lg:ml-0">
              <Link href="/book-service" className="hidden md:inline-flex">
                <Button variant="navy" size="default" className="gap-1.5 h-11 px-5 shadow-md">
                  <Wrench className="h-4 w-4"/>Book Service ₹200
                </Button>
              </Link>
              <button className="lg:hidden rounded-lg p-2.5 hover:bg-brand-50" aria-label="Search"><Search className="h-5 w-5 text-navy-800"/></button>
              <div className="relative" onMouseEnter={() => setAcctOpen(true)} onMouseLeave={() => setAcctOpen(false)}>
                <button className="rounded-lg p-2.5 hover:bg-brand-50"><User className="h-5 w-5 text-navy-800"/></button>
                {acctOpen && (
                  <div className="absolute right-0 top-full w-56 pt-2 z-50">
                    <div className="rounded-xl border border-gray-100 bg-white p-2 shadow-2xl">
                      {session ? (
                        <>
                          <div className="px-3 py-2"><p className="text-xs text-gray-500">Hello,</p><p className="text-sm font-semibold truncate">{session.user?.name||session.user?.email}</p></div>
                          <div className="my-1 h-px bg-gray-100"/>
                          {isAdmin && <Link href="/admin/dashboard" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50"><LayoutDashboard className="h-4 w-4"/>Admin Dashboard</Link>}
                          <Link href="/orders" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-brand-50"><Package className="h-4 w-4"/>My Orders</Link>
                          <Link href="/track-order" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-brand-50"><Search className="h-4 w-4"/>Track Order</Link>
                          <button onClick={() => {signOut(); setAcctOpen(false);}} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50"><LogOut className="h-4 w-4"/>Logout</button>
                        </>
                      ) : (
                        <>
                          <p className="px-3 py-2 text-xs text-gray-500">Welcome! Login for orders</p>
                          <Link href="/auth/login" className="block rounded-lg px-3 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50">Login</Link>
                          <Link href="/auth/register" className="block rounded-lg px-3 py-2 text-sm hover:bg-brand-50">Create Account</Link>
                          <Link href="/track-order" className="block rounded-lg px-3 py-2 text-sm hover:bg-brand-50">Track Order</Link>
                          <div className="my-1 h-px bg-gray-100"/>
                          <a href={telLink(PHONES.primary)} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold text-cta-orange hover:bg-orange-50"><Phone className="h-4 w-4"/>Call {PHONES.primary}</a>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <button onClick={() => setCartOpen(true)} className="relative rounded-lg p-2.5 hover:bg-brand-50">
                <ShoppingCart className="h-5 w-5 text-navy-800"/>
                {count>0 && <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-cta-orange text-[10px] font-bold text-white ring-2 ring-white">{count>99?'99+':count}</span>}
              </button>
            </div>
          </div>

          {/* Mobile search */}
          <form onSubmit={doSearch} className="flex pb-3 lg:hidden">
            <div className="relative flex w-full items-center rounded-full bg-gray-50 border border-gray-200">
              <Search className="ml-4 h-4 w-4 text-gray-400"/>
              <input value={searchQ} onChange={e => setSearchQ(e.target.value)} type="text" placeholder="Search products, service..." className="w-full bg-transparent px-3 py-2.5 text-sm outline-none"/>
            </div>
          </form>
          <div className="flex items-center gap-3 border-t border-gray-100 py-2 lg:hidden">
            <Link href="/book-service" className="flex-1"><Button className="w-full gap-1.5 h-11" size="sm"><Wrench className="h-4 w-4"/>Book RO Service ₹200</Button></Link>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="border-t border-gray-100 bg-white lg:hidden max-h-[70vh] overflow-y-auto">
            <div className="container-pad space-y-2 py-4">
              {categoryMega.map(cat => (
                <div key={cat.title}>
                  <div className="flex items-center justify-between rounded-lg px-3 py-2 font-semibold text-navy-800 hover:bg-brand-50 cursor-pointer" onClick={() => toggleMobile(cat.title)}>
                    <Link href={cat.href} className="flex items-center gap-2 flex-1" onClick={() => setMobileOpen(false)}>
                      <cat.icon className="h-5 w-5 text-brand-500"/>{cat.title}
                    </Link>
                    <ChevronDown className={cn('h-4 w-4 transition', mobileExpanded===cat.title && 'rotate-180')}/>
                  </div>
                  {mobileExpanded === cat.title && (
                    <div className="pl-8 space-y-0.5 pb-2">
                      {cat.sub.map(s => <Link key={s.name} href={s.href} className="block px-3 py-1.5 text-sm text-gray-700" onClick={() => setMobileOpen(false)}>{s.name}</Link>)}
                    </div>
                  )}
                </div>
              ))}
              <div>
                <div className="flex items-center justify-between rounded-lg px-3 py-2 font-semibold text-navy-800 hover:bg-brand-50 cursor-pointer" onClick={() => toggleMobile('areas')}>
                  <span className="flex items-center gap-2"><MapPin className="h-5 w-5 text-brand-500"/>Service Areas</span>
                  <ChevronDown className={cn('h-4 w-4 transition', mobileExpanded==='areas' && 'rotate-180')}/>
                </div>
                {mobileExpanded === 'areas' && (
                  <div className="pl-8 grid grid-cols-2 gap-x-2 pb-2">
                    {PATNA_AREAS.map(a => (
                      <Link key={a.slug} href={`/areas/${a.slug}`} className="block px-2 py-1 text-sm text-gray-700" onClick={() => setMobileOpen(false)}>📍 {a.name}</Link>
                    ))}
                  </div>
                )}
              </div>
              <Link href="/book-service" className="flex items-center gap-2 rounded-lg px-3 py-2 font-semibold text-cta-orange hover:bg-orange-50" onClick={() => setMobileOpen(false)}>
                <Wrench className="h-5 w-5"/>Patna RO Service ₹200
              </Link>
              <Link href="/amc" className="flex items-center gap-2 rounded-lg px-3 py-2 font-semibold text-navy-800 hover:bg-brand-50" onClick={() => setMobileOpen(false)}>
                <Shield className="h-5 w-5"/>AMC Plans
              </Link>
              <Link href="/track-order" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm" onClick={() => setMobileOpen(false)}>
                <Package className="h-5 w-5"/>Track Order
              </Link>
              <div className="my-2 h-px bg-gray-100"/>
              {session ? (
                <>
                  {isAdmin && <Link href="/admin/dashboard" className="block rounded-lg px-3 py-2 text-sm font-semibold text-brand-700" onClick={() => setMobileOpen(false)}>Admin Dashboard</Link>}
                  <Link href="/orders" className="block rounded-lg px-3 py-2 text-sm" onClick={() => setMobileOpen(false)}>My Orders</Link>
                  <button onClick={() => {signOut(); setMobileOpen(false);}} className="block w-full text-left rounded-lg px-3 py-2 text-sm text-red-600">Logout</button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" className="block rounded-lg bg-brand-50 px-3 py-2 text-sm font-semibold text-brand-700" onClick={() => setMobileOpen(false)}>🔐 Login</Link>
                  <Link href="/auth/register" className="block rounded-lg px-3 py-2 text-sm" onClick={() => setMobileOpen(false)}>Create Account</Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
