'use client';
import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Phone, Mail, RefreshCw, Users as UsersIcon } from 'lucide-react';
import toast from 'react-hot-toast';

type Customer = {
  id: string; name: string; email: string | null; phone: string; createdAt: string;
  _count: { orders: number; serviceRequests: number; reviews: number };
};

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/customers?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      setCustomers(data.customers || []);
    } catch (e) { toast.error('Load nahi ho pa raha'); }
    setLoading(false);
  };
  useEffect(() => { load(); }, [q]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div><h1 className="text-2xl text-navy-900">Customers</h1><p className="text-sm text-gray-500">Registered users & their orders/service history</p></div>
        <Button variant="outline" size="sm" onClick={load}><RefreshCw className="h-4 w-4"/>Refresh</Button>
      </div>

      <Card>
        <CardContent className="p-5">
          <div className="mb-4 flex gap-2 max-w-sm">
            <div className="relative flex-1"><Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400"/><Input className="pl-9" placeholder="Naam, phone ya email se search..." value={q} onChange={e => setQ(e.target.value)}/></div>
          </div>

          {loading ? <div className="py-10 text-center text-gray-500">Loading...</div>
           : customers.length === 0 ? (
            <div className="py-12 text-center"><UsersIcon className="mx-auto h-12 w-12 text-gray-300"/><p className="mt-2 text-gray-500">Abhi tak koi customer registered nahi hai.</p><p className="text-xs text-gray-400">Jaise hi users register karenge / order karenge yahaan dikhenge.</p></div>
           ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-y bg-gray-50 text-left text-xs uppercase tracking-wider text-gray-500">
                  <th className="px-4 py-3">Customer</th><th className="px-4 py-3">Contact</th>
                  <th className="px-4 py-3">Orders</th><th className="px-4 py-3">Service Req</th>
                  <th className="px-4 py-3">Joined</th>
                </tr></thead>
                <tbody>
                  {customers.map(c => (
                    <tr key={c.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 font-bold text-brand-700">{(c.name || 'U')[0].toUpperCase()}</div>
                          <div>
                            <p className="font-semibold text-navy-900">{c.name || 'Unnamed'}</p>
                            <p className="text-xs text-gray-500">ID: {c.id.slice(0, 8)}...</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        {c.phone && <a href={`tel:${c.phone}`} className="flex items-center gap-1 text-brand-600 hover:underline"><Phone className="h-3 w-3"/>{c.phone}</a>}
                        {c.email && <a href={`mailto:${c.email}`} className="flex items-center gap-1 text-xs text-gray-500 hover:underline"><Mail className="h-3 w-3"/>{c.email}</a>}
                      </td>
                      <td className="px-4 py-3"><Badge variant={c._count.orders>0?'orange':'outline'}>{c._count.orders}</Badge></td>
                      <td className="px-4 py-3"><Badge variant={c._count.serviceRequests>0?'navy':'outline'}>{c._count.serviceRequests}</Badge></td>
                      <td className="px-4 py-3 text-xs text-gray-500">{new Date(c.createdAt).toLocaleDateString('en-IN')}</td>
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
