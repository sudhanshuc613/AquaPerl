'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, RefreshCw, Phone, Eye, IndianRupee, Package } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

type Order = any;

const statusColor: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  CONFIRMED: 'bg-blue-100 text-blue-800',
  SHIPPED: 'bg-indigo-100 text-indigo-800',
  DELIVERED: 'bg-green-100 text-green-800',
  CANCELLED: 'bg-red-100 text-red-800',
  RETURNED: 'bg-gray-200 text-gray-800',
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [kpi, setKpi] = useState({ total: 0, revenue: 0, pending: 0, delivered: 0 });

  const load = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (q) params.set('q', q);
      if (statusFilter) params.set('status', statusFilter);
      const res = await fetch(`/api/admin/orders?${params.toString()}`);
      const data = await res.json();
      setOrders(data.orders || []);
      setKpi({
        total: data.total,
        revenue: data.totalRevenue,
        pending: (data.orders || []).filter((o: Order) => ['PENDING','CONFIRMED'].includes(o.orderStatus)).length,
        delivered: (data.orders || []).filter((o: Order) => o.orderStatus === 'DELIVERED').length,
      });
    } finally { setLoading(false); }
  };
  useEffect(() => { load(); }, [statusFilter]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div><h1 className="text-2xl text-navy-900">Orders</h1><p className="text-sm text-gray-500">Customer orders & payment status</p></div>
        <Button variant="outline" onClick={load}><RefreshCw className="h-4 w-4"/>Refresh</Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        <Card><CardContent className="flex items-center justify-between p-5"><div><p className="text-sm text-gray-500">Total Orders</p><p className="mt-1 text-3xl font-extrabold text-navy-900">{kpi.total}</p></div><Package className="h-10 w-10 text-brand-500"/></CardContent></Card>
        <Card><CardContent className="flex items-center justify-between p-5"><div><p className="text-sm text-gray-500">Total Revenue</p><p className="mt-1 text-3xl font-extrabold text-green-600">{formatPrice(kpi.revenue)}</p></div><IndianRupee className="h-10 w-10 text-green-500"/></CardContent></Card>
        <Card><CardContent className="flex items-center justify-between p-5"><div><p className="text-sm text-gray-500">Pending</p><p className="mt-1 text-3xl font-extrabold text-orange-600">{kpi.pending}</p></div></CardContent></Card>
        <Card><CardContent className="flex items-center justify-between p-5"><div><p className="text-sm text-gray-500">Delivered</p><p className="mt-1 text-3xl font-extrabold text-green-600">{kpi.delivered}</p></div></CardContent></Card>
      </div>

      <Card>
        <CardContent className="p-5">
          <div className="mb-4 flex flex-wrap gap-2">
            <div className="relative max-w-sm flex-1"><Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400"/><Input className="pl-9" placeholder="Order no, name, phone..." value={q} onChange={e => setQ(e.target.value)} onKeyDown={e => e.key === 'Enter' && load()}/></div>
            <select className="h-9 rounded-lg border border-gray-200 px-3 text-sm" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
              <option value="">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="CONFIRMED">Confirmed</option>
              <option value="SHIPPED">Shipped</option>
              <option value="DELIVERED">Delivered</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
            <Button onClick={load}>Filter</Button>
          </div>

          {loading ? <div className="py-10 text-center text-gray-500">Loading orders...</div>
           : orders.length === 0 ? (
            <div className="py-12 text-center"><Package className="mx-auto h-12 w-12 text-gray-300"/><p className="mt-2 text-gray-500">Abhi tak koi order nahi aaya hai.</p><p className="text-xs text-gray-400">Jaise hi customers checkout karenge orders yahaan dikhenge.</p></div>
           ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-y bg-gray-50 text-left text-xs uppercase tracking-wider text-gray-500">
                  <th className="px-4 py-3">Order</th><th className="px-4 py-3">Customer</th><th className="px-4 py-3">Items</th>
                  <th className="px-4 py-3">Total</th><th className="px-4 py-3">Payment</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Date</th>
                </tr></thead>
                <tbody>
                  {orders.map(o => (
                    <tr key={o.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 font-mono text-xs font-bold text-brand-600">{o.orderNumber}</td>
                      <td className="px-4 py-3">
                        <p className="font-semibold">{o.address?.recipient || o.user?.name || 'Guest'}</p>
                        {o.address?.phone && <a href={`tel:${o.address.phone}`} className="flex items-center gap-1 text-xs text-brand-600 hover:underline"><Phone className="h-3 w-3"/>{o.address.phone}</a>}
                        <p className="text-xs text-gray-500 truncate max-w-[200px]">{o.address?.city}, {o.address?.line1}</p>
                      </td>
                      <td className="px-4 py-3 text-xs">{o.items.length} item(s)</td>
                      <td className="px-4 py-3 font-semibold">{formatPrice(Number(o.totalAmount))}</td>
                      <td className="px-4 py-3"><Badge variant={o.paymentStatus === 'PAID' ? 'green' : 'outline'}>{o.paymentStatus}</Badge></td>
                      <td className="px-4 py-3"><Badge className={statusColor[o.orderStatus] || ''}>{o.orderStatus}</Badge></td>
                      <td className="px-4 py-3 text-xs text-gray-500">{new Date(o.createdAt).toLocaleString('en-IN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
