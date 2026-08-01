'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  ShoppingCart, User, Menu, X, Phone, ChevronDown, Wrench,
  Droplets, Factory, Settings2, LogOut, Package, Heart, Search as SearchIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { PHONES, telLink } from '@/lib/utils';
import { useCart } from '@/lib/store';

const categoryMega = [
  {
    title: 'New RO Purifiers',
    icon: Droplets,
    href: '/categories/ro-purifiers',
    sub: [
      { name: 'Domestic RO', href: '/categories/domestic-ro' },
      { name: 'UV + UF Purifiers', href: '/categories/uv-uf' },
      { name: 'Under-Sink Models', href: '/categories/under-sink' },
      { name: 'Wall-Mount Models', href: '/categories/wall-mount' },
    ],
  },
  {
    title: 'Spare Parts',
    icon: Settings2,
    href: '/categories/spare-parts',
    sub: [
      { name: 'RO Membranes', href: '/categories/ro-membranes' },
      { name: 'Filter Sets', href: '/categories/filters' },
      { name: 'UV Lamps', href: '/categories/uv-lamps' },
      { name: 'Pumps & Motors', href: '/categories/pumps' },
    ],
  },
  {
    title: 'Commercial Plants',
    icon: Factory,
    href: '/categories/commercial-plants',
    sub: [
      { name: '50 LPH Plants', href: '/categories/50-lph' },
      { name: '100 LPH Plants', href: '/categories/100-lph' },
      { name: '250+ LPH Plants', href: '/categories/250-lph' },
    ],
  },
];

export default function Navbar() {
  const { data: session } = useSession();
  const isAdmin = !!(session && ['ADMIN','SUPER_ADMIN'].includes((session.user as any)?.role));
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeCat, setActiveCat] = useState<string | null>(null);
  const [acctOpen, setAcctOpen] = useState(false);
  const [searchQ, setSearchQ] = useState('');

  const items = useCart(s => s.items);
  const count = items.reduce((s, i) => s + i.quantity, 0);
  const setCartOpen = useCart(s => s.setOpen);

  const doSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQ.trim()) router.push(`/search?q=${encodeURIComponent(searchQ.trim())}`);
  };

  return (
    <>
      {/* Top strip */}
      <div className="bg-navy-900 text-white text-xs">
        <div className="container-pad flex items-center justify-between py-1.5">
          <div className="hidden items-center gap-4 md:flex">
            <span className="flex items-center gap-1">🚚 Pan-India Delivery | 🔧 Patna RO Service ₹100 Visit</span>
          </div>
          <div className="flex items-center gap-4">
            <a href={telLink(PHONES.primary)} className="flex items-center gap-1 font-semibold hover:text-brand-300">
              <Phone className="h-3 w-3" /> +91 {PHONES.primary}
            </a>
            <Link href="/track-order" className="hidden hover:text-brand-300 md:inline">Track Order</Link>
            {/* Admin link ONLY when logged in as admin */}
            {isAdmin && (
              <Link href="/admin/dashboard" className="flex items-center gap-1 font-semibold text-brand-300 hover:text-white">
                Admin Panel
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="container-pad">
          <div className="flex h-16 items-center gap-3">
            <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            <Link href="/" className="flex shrink-0 items-center gap-2">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-aqua-gradient shadow-lg shadow-brand-500/30">
                <Droplets className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-xl font-extrabold tracking-tight text-navy-900">
                  Aqua<span className="text-brand-500">Nexa</span>
                </span>
                <span className="-mt-1 text-[10px] font-medium uppercase tracking-widest text-gray-400">rokadoctor.in</span>
              </div>
            </Link>

            <nav className="ml-2 hidden items-center gap-1 md:flex">
              {categoryMega.map((cat) => (
                <div
                  key={cat.title}
                  className="group relative"
                  onMouseEnter={() => setActiveCat(cat.title)}
                  onMouseLeave={() => setActiveCat(null)}
                >
                  <button className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold text-navy-800 hover:bg-brand-50 hover:text-brand-600">
                    <cat.icon className="h-4 w-4" />
                    {cat.title}
                    <ChevronDown className={cn('h-4 w-4 transition-transform', activeCat === cat.title && 'rotate-180')} />
                  </button>
                  {activeCat === cat.title && (
                    <div className="absolute left-0 top-full w-64 pt-2">
                      <div className="rounded-xl border border-gray-100 bg-white p-3 shadow-xl">
                        <Link href={cat.href} className="flex items-center gap-2 rounded-lg bg-brand-50 px-3 py-2 text-sm font-bold text-brand-700" onClick={() => setActiveCat(null)}>
                          <cat.icon className="h-4 w-4" /> View All {cat.title}
                        </Link>
                        <div className="mt-2 space-y-1">
                          {cat.sub.map(s => (
                            <Link key={s.name} href={s.href} className="block rounded-lg px-3 py-1.5 text-sm text-gray-700 hover:bg-brand-50 hover:text-brand-600" onClick={() => setActiveCat(null)}>{s.name}</Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <Link href="/book-service" className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold text-cta-orange hover:bg-orange-50">
                <Wrench className="h-4 w-4" /> Patna RO Service
              </Link>
            </nav>

            <form onSubmit={doSearch} className="hidden flex-1 md:flex justify-center">
              <div className="relative flex w-full max-w-xl items-center rounded-xl border-2 border-transparent bg-gray-50 transition-all focus-within:border-brand-500 focus-within:bg-white focus-within:shadow-lg focus-within:shadow-brand-500/10">
                <SearchIcon className="ml-3 h-5 w-5 text-gray-400"/>
                <input
                  type="text"
                  value={searchQ}
                  onChange={e => setSearchQ(e.target.value)}
                  placeholder="Search RO, membrane, Kent service, filter..."
                  className="w-full bg-transparent px-3 py-2.5 text-sm outline-none placeholder:text-gray-400"
                />
                <Button type="submit" className="m-1">Search</Button>
              </div>
            </form>

            <div className="ml-auto flex items-center gap-1">
              <Link href="/book-service" className="hidden lg:inline-flex">
                <Button variant="navy" size="sm" className="gap-1.5"><Wrench className="h-4 w-4" />Book Service</Button>
              </Link>

              {/* Account - NO admin mention to public */}
              <div className="relative" onMouseEnter={() => setAcctOpen(true)} onMouseLeave={() => setAcctOpen(false)}>
                <button className="rounded-lg p-2 hover:bg-brand-50" aria-label="Account"><User className="h-5 w-5 text-navy-800" /></button>
                {acctOpen && (
                  <div className="absolute right-0 top-full w-60 pt-2">
                    <div className="rounded-xl border border-gray-100 bg-white p-2 shadow-xl">
                      {session ? (
                        <>
                          <div className="px-3 py-2">
                            <p className="text-xs text-gray-500">Hello,</p>
                            <p className="text-sm font-semibold text-navy-900 truncate">{session.user?.name || session.user?.email}</p>
                          </div>
                          <div className="my-1 h-px bg-gray-100"/>
                          {isAdmin && (
                            <Link href="/admin/dashboard" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50" onClick={() => setAcctOpen(false)}>
                              Admin Dashboard
                            </Link>
                          )}
                          <Link href="/orders" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-brand-50" onClick={() => setAcctOpen(false)}><Package className="h-4 w-4"/>My Orders</Link>
                          <Link href="/wishlist" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-brand-50" onClick={() => setAcctOpen(false)}><Heart className="h-4 w-4"/>Wishlist</Link>
                          <button onClick={() => { signOut(); setAcctOpen(false); }} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50"><LogOut className="h-4 w-4"/>Logout</button>
                        </>
                      ) : (
                        <>
                          <p className="px-3 py-2 text-xs text-gray-500">Welcome! Login to track orders</p>
                          <Link href="/auth/login" className="block rounded-lg px-3 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50" onClick={() => setAcctOpen(false)}>Login</Link>
                          <Link href="/auth/register" className="block rounded-lg px-3 py-2 text-sm hover:bg-brand-50" onClick={() => setAcctOpen(false)}>Create Account</Link>
                          <div className="my-1 h-px bg-gray-100"/>
                          <Link href="/book-service" className="block rounded-lg px-3 py-2 text-sm hover:bg-brand-50" onClick={() => setAcctOpen(false)}>Book RO Service</Link>
                          <a href={telLink(PHONES.primary)} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-cta-orange hover:bg-orange-50"><Phone className="h-4 w-4"/>Call {PHONES.primary}</a>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <button onClick={() => setCartOpen(true)} className="relative rounded-lg p-2 hover:bg-brand-50" aria-label="Cart">
                <ShoppingCart className="h-5 w-5 text-navy-800"/>
                {count > 0 && <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-cta-orange text-[10px] font-bold text-white">{count > 99 ? '99+' : count}</span>}
              </button>
            </div>
          </div>

          {/* Mobile search */}
          <form onSubmit={doSearch} className="flex pb-2 md:hidden">
            <div className="relative flex w-full items-center rounded-lg bg-gray-50">
              <SearchIcon className="ml-3 h-4 w-4 text-gray-400"/>
              <input value={searchQ} onChange={e => setSearchQ(e.target.value)} type="text" placeholder="Search products..." className="w-full bg-transparent px-2 py-2 text-sm outline-none"/>
            </div>
          </form>

          <div className="flex items-center gap-3 border-t border-gray-100 py-2 md:hidden">
            <Link href="/book-service" className="flex-1"><Button className="w-full gap-1.5" size="sm"><Wrench className="h-4 w-4"/>Book Patna RO Service</Button></Link>
          </div>
        </div>

        {mobileOpen && (
          <div className="border-t border-gray-100 bg-white md:hidden">
            <div className="container-pad space-y-2 py-4">
              {categoryMega.map(cat => (
                <div key={cat.title}>
                  <Link href={cat.href} className="flex items-center gap-2 rounded-lg px-3 py-2 font-semibold text-navy-800 hover:bg-brand-50" onClick={() => setMobileOpen(false)}>
                    <cat.icon className="h-5 w-5 text-brand-500"/> {cat.title}
                  </Link>
                </div>
              ))}
              <Link href="/book-service" className="flex items-center gap-2 rounded-lg px-3 py-2 font-semibold text-cta-orange hover:bg-orange-50" onClick={() => setMobileOpen(false)}>
                <Wrench className="h-5 w-5"/> Patna RO Service
              </Link>
              <div className="my-2 h-px bg-gray-100"/>
              {session ? (
                <>
                  {isAdmin && <Link href="/admin/dashboard" className="block rounded-lg px-3 py-2 text-sm font-semibold text-brand-700" onClick={() => setMobileOpen(false)}>Admin Dashboard</Link>}
                  <Link href="/orders" className="block rounded-lg px-3 py-2 text-sm" onClick={() => setMobileOpen(false)}>My Orders</Link>
                  <button onClick={() => { signOut(); setMobileOpen(false); }} className="block w-full rounded-lg px-3 py-2 text-left text-sm text-red-600">Logout</button>
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
