import Link from 'next/link';
import { redirect } from 'next/navigation';
import {
  LayoutDashboard, Package, ShoppingBag, Wrench, Users, Settings,
  Search as SearchIcon, BarChart3, Tag, LogOut, Menu, Bell,
} from 'lucide-react';
import { Droplets } from 'lucide-react';

// NOTE: In production, use NextAuth middleware + getServerSession to protect all /admin routes.
// Example:
//   import { getServerSession } from 'next-auth';
//   const session = await getServerSession();
//   if (!session || session.user.role !== 'ADMIN') redirect('/login');

const nav = [
  { href: '/admin/dashboard',    label: 'Dashboard',      icon: LayoutDashboard },
  { href: '/admin/orders',       label: 'Orders',         icon: ShoppingBag },
  { href: '/admin/products',     label: 'Products',       icon: Package },
  { href: '/admin/services',     label: 'Service Tickets',icon: Wrench },
  { href: '/admin/customers',    label: 'Customers',      icon: Users },
  { href: '/admin/seo',          label: 'SEO & Content',  icon: BarChart3 },
  { href: '/admin/settings',     label: 'Settings',       icon: Settings },
];

export const metadata = { title: 'Admin Dashboard | AquaNexa' };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col bg-navy-900 text-white md:flex">
        <div className="border-b border-white/10 p-5">
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-aqua-gradient">
              <Droplets className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-lg font-extrabold">Aqua<span className="text-brand-400">Nexa</span></p>
              <p className="text-[10px] uppercase tracking-wider text-gray-400">Admin Panel</p>
            </div>
          </Link>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {nav.map(n => (
            <Link
              key={n.href}
              href={n.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-300 transition-colors hover:bg-white/5 hover:text-white"
            >
              <n.icon className="h-5 w-5 text-brand-400" />
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-white/10 p-3">
          <Link href="/" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-400 hover:text-white">
            <LogOut className="h-5 w-5" /> Back to Store
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6 shadow-sm">
          <div className="flex items-center gap-3">
            <button className="md:hidden"><Menu className="h-6 w-6" /></button>
            <div className="relative hidden md:block">
              <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                placeholder="Search products, orders, customers..."
                className="h-10 w-80 rounded-lg border border-gray-200 bg-gray-50 pl-9 pr-4 text-sm outline-none focus:border-brand-500 focus:bg-white"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative rounded-lg p-2 hover:bg-gray-100">
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-cta-orange" />
            </button>
            <div className="flex items-center gap-2 border-l pl-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-aqua-gradient font-bold text-white">A</div>
              <div className="hidden text-sm md:block">
                <p className="font-semibold text-navy-900">Admin</p>
                <p className="text-xs text-gray-500">Super Admin</p>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
