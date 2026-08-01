'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  TrendingUp, IndianRupee, ShoppingBag, Wrench, Users, Package,
  ArrowUpRight, ArrowDownRight, Phone,
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils';

const revenueData = [
  { day: 'Mon', revenue: 48500, orders: 12 },
  { day: 'Tue', revenue: 62000, orders: 18 },
  { day: 'Wed', revenue: 54800, orders: 15 },
  { day: 'Thu', revenue: 78900, orders: 24 },
  { day: 'Fri', revenue: 91200, orders: 31 },
  { day: 'Sat', revenue: 124500, orders: 42 },
  { day: 'Sun', revenue: 83600, orders: 27 },
];
const categoryData = [
  { name: 'Domestic RO', value: 58, color: '#06b6d4' },
  { name: 'Spare Parts', value: 22, color: '#ff6b1a' },
  { name: 'Commercial', value: 14, color: '#1e3a8a' },
  { name: 'Services', value: 6, color: '#16a34a' },
];

export default function AdminDashboard() {
  const [kpi, setKpi] = useState({
    revenue: 1248000, orders: 1248, pendingServices: 0, customers: 186,
    recentOrders: [] as any[], recentServices: [] as any[],
  });

  useEffect(() => {
    fetch('/api/service-requests')
      .then(r => r.json())
      .then(data => setKpi(k => ({ ...k, pendingServices: (data.items || []).filter((t: any) => ['NEW','CONTACTED','SCHEDULED','TECHNICIAN_ASSIGNED','IN_PROGRESS'].includes(t.status)).length })))
      .catch(() => {});
  }, []);

  const stats = [
    { label: 'Total Revenue (Month)', value: formatPrice(kpi.revenue), delta: '+18.2%', up: true, icon: IndianRupee, href: '/admin/orders', color: 'from-brand-500 to-brand-600' },
    { label: 'Total Orders', value: kpi.orders.toLocaleString(), delta: '+12.4%', up: true, icon: ShoppingBag, href: '/admin/orders', color: 'from-orange-500 to-orange-600' },
    { label: 'Pending Services', value: kpi.pendingServices || '—', delta: '+4 today', up: false, icon: Wrench, href: '/admin/services', color: 'from-red-500 to-red-600' },
    { label: 'New Customers', value: kpi.customers, delta: '+23%', up: true, icon: Users, href: '/admin/customers', color: 'from-green-500 to-green-600' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl text-navy-900">Dashboard Overview</h1>
          <p className="text-sm text-gray-500">Welcome back. Here's what's happening with AquaNexa today.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/products"><Button variant="outline"><Package className="h-4 w-4" /> Manage Products</Button></Link>
          <Link href="/admin/products?new=1"><Button><Package className="h-4 w-4" /> Add Product</Button></Link>
          <Link href="/admin/services"><Button variant="navy"><Phone className="h-4 w-4" /> View Service Calls</Button></Link>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(s => (
          <Link key={s.label} href={s.href}>
            <Card className="transition-all hover:shadow-md">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${s.color} text-white shadow`}>
                    <s.icon className="h-5 w-5" />
                  </div>
                  <span className={`flex items-center gap-0.5 text-xs font-semibold ${s.up ? 'text-green-600' : 'text-orange-600'}`}>
                    {s.up ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
                    {s.delta}
                  </span>
                </div>
                <p className="mt-4 text-2xl font-extrabold text-navy-900">{s.value}</p>
                <p className="text-xs text-gray-500">{s.label}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle className="text-base">Revenue & Orders (Last 7 Days)</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0' }} />
                <Legend />
                <Line type="monotone" dataKey="revenue" name="Revenue (₹)" stroke="#06b6d4" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="orders" name="Orders" stroke="#ff6b1a" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">Sales by Category</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={categoryData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={90} paddingAngle={3}>
                  {categoryData.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Patna Service Tickets — Recent</CardTitle>
          <Link href="/admin/services" className="text-xs font-semibold text-brand-600 hover:underline">Manage all →</Link>
        </CardHeader>
        <CardContent className="p-0">
          <div className="py-10 text-center text-gray-500 text-sm">
            {kpi.pendingServices > 0
              ? `${kpi.pendingServices} pending tickets — click "View Service Calls" to manage`
              : 'No pending service tickets. New form submissions will appear here.'}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
