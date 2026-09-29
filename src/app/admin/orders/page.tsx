'use client';
import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, RefreshCw, Phone, IndianRupee, Package, ChevronDown, Truck, CheckCircle2 } from 'lucide-react';
import { formatPrice, formatDate, PHONES, waLink, telLink } from '@/lib/utils';
import toast from 'react-hot-toast';

type Order = any;

const STATUSES = ['PENDING','CONFIRMED','PROCESSING','SHIPPED','OUT_FOR_DELIVERY','DELIVERED','CANCELLED','RETURNED','REFUNDED'];

const statusColor: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  CONFIRMED: 'bg-blue-100 text-blue-800',
  PROCESSING: 'bg-indigo-100 text-indigo-800',
  SHIPPED: 'bg-purple-100 text-purple-800',
  OUT_FOR_DELIVERY: 'bg-orange-100 text-orange-800',
  DELIVERED: 'bg-green-100 text-green-800',
  CANCELLED: 'bg-red-100 text-red-800',
  RETURNED: 'bg-gray-200 text-gray-800',
  REFUNDED: 'bg-slate-200 text-slate-700',
};

const NEXT_ACTIONS: Record<string, { label: string; next: string }[]> = {
  PENDING: [{ label:'Confirm', next:'CONFIRMED' }, { label:'Cancel', next:'CANCELLED' }],
  CONFIRMED: [{ label:'Start Processing', next:'PROCESSING' }, { label:'Cancel', next:'CANCELLED' }],
  PROCESSING: [{ label:'Mark Shipped', next:'SHIPPED' }, { label:'Cancel', next:'CANCELLED' }],
  SHIPPED: [{ label:'Out for Delivery', next:'OUT_FOR_DELIVERY' }],
  OUT_FOR_DELIVERY: [{ label:'Mark Delivered', next:'DELIVERED' }],
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [updating, setUpdating] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [trackingInput, setTrackingInput] = useState<Record<string, any>>({});
  const [kpi, setKpi] = useState({ total: 0, revenue: 0, pending: 0, delivered: 0, todayOrders: 0 });

  const load = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (q) params.set('q', q);
      if (statusFilter) params.set('status', statusFilter);
      const res = await fetch(`/api/admin/orders?${params.toString()}`);
      const data = await res.json();
      setOrders(data.orders || []);
      const today = new Date().toISOString().slice(0,10);
      setKpi({
        total: data.total,
        revenue: data.totalRevenue,
        pending: (data.orders || []).filter((o: Order) => ['PENDING','CONFIRMED','PROCESSING'].includes(o.orderStatus)).length,
        delivered: (data.orders || []).filter((o: Order) => o.orderStatus === 'DELIVERED').length,
        todayOrders: (data.orders || []).filter((o: Order) => new Date(o.createdAt).toISOString().slice(0,10) === today).length,
      });
    } finally { setLoading(false); }
  };
  useEffect(() => { load(); }, [statusFilter]);

  const changeStatus = async (orderId: string, newStatus: string) => {
    setUpdating(orderId);
    try {
      const tracking = trackingInput[orderId];
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
          orderStatus: newStatus,
          trackingNumber: tracking?.trackingNumber || undefined,
          courierName: tracking?.courierName || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      toast.success(`Order ${newStatus} ho gaya`);
      await load();
    } catch (e: any) {
      toast.error(e.message);
    } finally { setUpdating(null); }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div><h1 className="text-2xl text-navy-900">Orders</h1><p className="text-sm text-gray-500">Customer orders, payment, tracking sab yaha manage karo</p></div>
        <Button variant="outline" onClick={load}><RefreshCw className="h-4 w-4"/>Refresh</Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Card><CardContent className="flex items-center justify-between p-4"><div><p className="text-xs text-gray-500">Total Orders</p><p className="mt-1 text-2xl font-extrabold text-navy-900">{kpi.total}</p></div><Package className="h-8 w-8 text-brand-500"/></CardContent></Card>
        <Card><CardContent className="flex items-center justify-between p-4"><div><p className="text-xs text-gray-500">Total Revenue</p><p className="mt-1 text-2xl font-extrabold text-green-600">{formatPrice(kpi.revenue)}</p></div><IndianRupee className="h-8 w-8 text-green-500"/></CardContent></Card>
        <Card><CardContent className="flex items-center justify-between p-4"><div><p className="text-xs text-gray-500">Processing/Pending</p><p className="mt-1 text-2xl font-extrabold text-orange-600">{kpi.pending}</p></div></CardContent></Card>
        <Card><CardContent className="flex items-center justify-between p-4"><div><p className="text-xs text-gray-500">Delivered</p><p className="mt-1 text-2xl font-extrabold text-green-600">{kpi.delivered}</p></div></CardContent></Card>
        <Card><CardContent className="flex items-center justify-between p-4"><div><p className="text-xs text-gray-500">Today</p><p className="mt-1 text-2xl font-extrabold text-brand-600">{kpi.todayOrders}</p></div></CardContent></Card>
      </div>

      <Card>
        <CardContent className="p-5">
          <div className="mb-4 flex flex-wrap gap-2">
            <div className="relative max-w-sm flex-1"><Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400"/><Input className="pl-9" placeholder="Order no, name, phone..." value={q} onChange={e => setQ(e.target.value)} onKeyDown={e => e.key === 'Enter' && load()}/></div>
            <select className="h-9 rounded-lg border border-gray-200 px-3 text-sm" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
              <option value="">All Status</option>
              {STATUSES.map(s => <option key={s} value={s}>{s.replace(/_/g,' ')}</option>)}
            </select>
            <Button onClick={load}>Filter</Button>
          </div>

          {loading ? <div className="py-10 text-center text-gray-500">Loading orders...</div>
           : orders.length === 0 ? (
            <div className="py-12 text-center"><Package className="mx-auto h-12 w-12 text-gray-300"/><p className="mt-2 text-gray-500">Abhi tak koi order nahi aaya hai.</p></div>
           ) : (
            <div className="space-y-3">
              {orders.map(o => {
                const actions = NEXT_ACTIONS[o.orderStatus] || [];
                const phoneMatch = o.notes?.match(/(?:phone|Phone|Mobile|mobile)[^\d]*(\d{10})/);
                const customerPhone = o.address?.phone || phoneMatch?.[1] || '';
                const isExp = expanded === o.id;
                const track = trackingInput[o.id] || { trackingNumber: o.trackingNumber || '', courierName: o.courierName || '' };
                return (
                  <div key={o.id} className="rounded-xl border hover:border-brand-300 transition">
                    <div className="grid grid-cols-12 gap-2 p-4 items-center">
                      <div className="col-span-12 md:col-span-3">
                        <p className="font-mono text-sm font-bold text-brand-600">{o.orderNumber}</p>
                        <p className="text-xs text-gray-500">{formatDate(o.createdAt)}</p>
                      </div>
                      <div className="col-span-6 md:col-span-3">
                        <p className="text-sm font-semibold">{o.address?.recipient || o.user?.name || 'Guest'}</p>
                        {customerPhone && (
                          <div className="flex items-center gap-2 mt-1">
                            <a href={telLink(customerPhone)} className="text-xs text-brand-600 hover:underline inline-flex items-center gap-1"><Phone className="h-3 w-3"/>{customerPhone}</a>
                            <a href={waLink(PHONES.whatsapp, `Hi, aapke order ${o.orderNumber} ke baare mein baat karni hai.`)} target="_blank" rel="noopener" className="text-green-600 hover:underline"><svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163C.646 16.073.25 14.215.25 12.28.25 5.764 5.603.5 12.12.5c3.174 0 6.152 1.24 8.397 3.495 2.245 2.255 3.474 5.24 3.474 8.42 0 6.523-5.35 11.796-11.87 11.796-1.99 0-3.94-.523-5.633-1.51L.057 24z"/></svg></a>
                          </div>
                        )}
                      </div>
                      <div className="col-span-3 md:col-span-1 text-sm">{o.items.length} items</div>
                      <div className="col-span-3 md:col-span-2 text-sm font-bold">{formatPrice(Number(o.totalAmount))}</div>
                      <div className="col-span-6 md:col-span-2">
                        <Badge className={statusColor[o.orderStatus] || ''}>{o.orderStatus.replace(/_/g,' ')}</Badge>
                        <p className="text-xs mt-1 text-gray-500">{o.paymentMethod} • {o.paymentStatus}</p>
                      </div>
                      <div className="col-span-6 md:col-span-1 text-right">
                        <button onClick={() => setExpanded(isExp ? null : o.id)} className="rounded p-1 hover:bg-gray-100">
                          <ChevronDown className={`h-5 w-5 transition ${isExp ? 'rotate-180' : ''}`}/>
                        </button>
                      </div>
                    </div>
                    {isExp && (
                      <div className="border-t bg-gray-50 p-4 space-y-3">
                        {/* Quick actions */}
                        {actions.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {actions.map(a => (
                              <Button key={a.next} size="sm" variant={a.next === 'CANCELLED' ? 'destructive' : 'default'} onClick={() => changeStatus(o.id, a.next)} disabled={updating === o.id}>
                                {updating === o.id ? 'Updating...' : a.label}
                              </Button>
                            ))}
                            {['SHIPPED','OUT_FOR_DELIVERY'].includes(o.orderStatus) && (
                              <Button size="sm" variant="outline" onClick={() => changeStatus(o.id, 'DELIVERED')}><CheckCircle2 className="h-4 w-4 mr-1"/>Mark Delivered</Button>
                            )}
                          </div>
                        )}

                        {/* Tracking entry */}
                        <div className="rounded-lg bg-white p-3">
                          <p className="text-sm font-semibold flex items-center gap-2"><Truck className="h-4 w-4"/>Tracking Details</p>
                          <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-2">
                            <Input placeholder="Courier (Delhivery, Bluedart...)" value={track.courierName} onChange={e => setTrackingInput({...trackingInput, [o.id]: {...track, courierName: e.target.value}})}/>
                            <Input placeholder="Tracking number" value={track.trackingNumber} onChange={e => setTrackingInput({...trackingInput, [o.id]: {...track, trackingNumber: e.target.value}})}/>
                            <Button size="sm" onClick={() => changeStatus(o.id, o.orderStatus === 'PROCESSING' ? 'SHIPPED' : o.orderStatus)} disabled={updating === o.id}>
                              {o.trackingNumber ? 'Update Tracking' : 'Save & Mark Shipped'}
                            </Button>
                          </div>
                        </div>

                        {/* Items */}
                        <div className="rounded-lg bg-white p-3">
                          <p className="text-sm font-semibold mb-2">Items ({o.items.length})</p>
                          <div className="space-y-1 text-sm">
                            {o.items.map((it: any, i: number) => (
                              <div key={i} className="flex justify-between border-b last:border-0 py-1">
                                <span>{it.productName} × {it.quantity}</span>
                                <span className="font-semibold">{formatPrice(Number(it.totalPrice))}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Address */}
                        {o.notes && (
                          <div className="rounded-lg bg-white p-3 text-sm">
                            <p className="font-semibold">Address snapshot:</p>
                            <p className="text-gray-600 whitespace-pre-wrap text-xs mt-1">{o.notes}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
