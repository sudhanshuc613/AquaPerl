'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Search, Package, CheckCircle2, Clock, Truck, MapPin, Phone, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PHONES, telLink, waLink, formatPrice, formatDate } from '@/lib/utils';

type TrackedOrder = {
  orderNumber: string;
  orderStatus: string;
  paymentStatus: string;
  totalAmount: string | number;
  paymentMethod: string;
  trackingNumber?: string;
  courierName?: string;
  estimatedDelivery?: string;
  deliveredAt?: string;
  createdAt: string;
  items: { productName: string; quantity: number; totalPrice: string | number; image?: string }[];
  addressSnapshot: string;
};

const STATUS_FLOW = ['PENDING','CONFIRMED','PROCESSING','SHIPPED','OUT_FOR_DELIVERY','DELIVERED'];
const STATUS_LABELS: Record<string, { label: string; icon: any; color: string; desc: string }> = {
  PENDING: { label:'Order Placed', icon:Clock, color:'bg-yellow-500', desc:'Aapka order receive ho gaya hai, confirmation pending hai.' },
  CONFIRMED: { label:'Order Confirmed', icon:CheckCircle2, color:'bg-blue-500', desc:'Order confirm ho gaya hai. Jald hi packing shuru karenge.' },
  PROCESSING: { label:'Processing', icon:Package, color:'bg-indigo-500', desc:'Apka order pack kiya ja raha hai.' },
  SHIPPED: { label:'Shipped', icon:Truck, color:'bg-purple-500', desc:'Order courier ko de diya gaya hai.' },
  OUT_FOR_DELIVERY: { label:'Out for Delivery', icon:MapPin, color:'bg-orange-500', desc:'Aaj deliver ho jayega.' },
  DELIVERED: { label:'Delivered', icon:CheckCircle2, color:'bg-green-500', desc:'Order deliver ho chuka hai.' },
  CANCELLED: { label:'Cancelled', icon:AlertCircle, color:'bg-red-500', desc:'Order cancel ho gaya hai.' },
  RETURNED: { label:'Returned', icon:AlertCircle, color:'bg-red-500', desc:'Order return kar diya gaya hai.' },
  REFUNDED: { label:'Refunded', icon:CheckCircle2, color:'bg-gray-500', desc:'Refund process ho gaya hai.' },
};

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const [orders, setOrders] = useState<TrackedOrder[]>([]);
  const [searched, setSearched] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(''); setLoading(true); setOrders([]); setSearched(true);
    try {
      const params = new URLSearchParams();
      if (orderNumber.trim()) params.set('orderNumber', orderNumber.trim());
      if (phone.trim()) params.set('phone', phone.trim());
      if (!params.toString()) throw new Error('Order number ya phone number daalo');

      const res = await fetch(`/api/orders/lookup?${params.toString()}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Order nahi mila');
      setOrders(data.orders || []);
      if (!data.orders?.length) setErr('Koi order nahi mila. Details sahi se daalo.');
    } catch (e: any) {
      setErr(e.message);
    } finally { setLoading(false); }
  };

  return (
    <div className="container-pad py-10 md:py-14">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <Package className="mx-auto h-14 w-14 text-brand-500"/>
          <h1 className="mt-3">Track Your Order</h1>
          <p className="mt-2 text-gray-600">Apna order number ya phone number daal ke order status dekhiye.</p>
        </div>

        <form onSubmit={onSubmit} className="mt-6 card-surface p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">Order Number (optional)</label>
              <Input value={orderNumber} onChange={e=>setOrderNumber(e.target.value.toUpperCase())} placeholder="ORD-20260929-1234"/>
              <p className="mt-1 text-xs text-gray-500">Order confirmation page/screenshot me mila hoga</p>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Mobile Number *</label>
              <Input value={phone} onChange={e=>setPhone(e.target.value.replace(/\D/g,''))} maxLength={10} placeholder="10-digit mobile number jo order me diya tha"/>
            </div>
          </div>
          {err && <div className="mt-3 rounded-lg bg-red-50 p-3 text-sm text-red-700">{err}</div>}
          <Button type="submit" className="mt-4 w-full" size="lg" disabled={loading}>
            {loading ? 'Searching...' : <><Search className="h-4 w-4 mr-2"/>Track Order</>}
          </Button>
          <p className="mt-2 text-center text-xs text-gray-400">Account nahi hai? Bina login ke sirf phone se bhi track kar sakte ho.</p>
        </form>

        {searched && !loading && orders.length > 0 && (
          <div className="mt-6 space-y-4">
            <h3 className="text-lg font-bold">{orders.length} Order{orders.length>1?'s':''} Found</h3>
            {orders.map(o => <OrderCard key={o.orderNumber} order={o}/>)}
          </div>
        )}

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">Problem hai? Seedha call karo:</p>
          <a href={telLink(PHONES.primary)} className="mt-2 inline-flex items-center gap-2 rounded-lg bg-cta-orange px-5 py-2.5 text-white font-bold hover:bg-orange-600">
            <Phone className="h-4 w-4"/>{PHONES.primary}
          </a>
          <div className="mt-3"><Link href="/" className="text-sm text-brand-600 hover:underline">&larr; Back to Home</Link></div>
        </div>
      </div>
    </div>
  );
}

function OrderCard({ order }: { order: TrackedOrder }) {
  const statusInfo = STATUS_LABELS[order.orderStatus] || STATUS_LABELS.PENDING;
  const StatusIcon = statusInfo.icon;
  const activeStep = STATUS_FLOW.indexOf(order.orderStatus);
  const isCancelled = ['CANCELLED','RETURNED','REFUNDED'].includes(order.orderStatus);

  return (
    <div className="card-surface p-5">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b pb-4">
        <div>
          <p className="text-xs text-gray-500">Order Number</p>
          <p className="font-mono text-lg font-bold text-navy-900">{order.orderNumber}</p>
          <p className="text-xs text-gray-500">Placed on {formatDate(order.createdAt)}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">Total Amount</p>
          <p className="text-xl font-extrabold text-navy-900">{formatPrice(order.totalAmount)}</p>
          <p className="text-xs text-gray-500">{order.paymentMethod} • {order.paymentStatus}</p>
        </div>
      </div>

      {/* Status badge */}
      <div className="mt-4 flex items-center gap-3">
        <div className={`flex h-10 w-10 items-center justify-center rounded-full ${statusInfo.color} text-white`}>
          <StatusIcon className="h-5 w-5"/>
        </div>
        <div>
          <p className="font-bold text-navy-900">{statusInfo.label}</p>
          <p className="text-sm text-gray-600">{statusInfo.desc}</p>
        </div>
      </div>

      {/* Progress bar */}
      {!isCancelled && (
        <div className="mt-4">
          <div className="flex items-center justify-between">
            {STATUS_FLOW.map((s, i) => {
              const info = STATUS_LABELS[s];
              const done = activeStep >= i;
              return (
                <div key={s} className="flex flex-col items-center flex-1">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold ${done ? info.color+' text-white' : 'bg-gray-200 text-gray-400'}`}>
                    {done ? <CheckCircle2 className="h-4 w-4"/> : i+1}
                  </div>
                  <p className={`mt-1 text-[10px] text-center leading-tight ${done ? 'text-navy-900 font-semibold' : 'text-gray-400'}`}>{info.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tracking */}
      {order.trackingNumber && (
        <div className="mt-4 rounded-lg bg-blue-50 p-3 text-sm">
          <strong>Tracking:</strong> {order.courierName} - <span className="font-mono">{order.trackingNumber}</span>
        </div>
      )}

      {/* Items */}
      <div className="mt-4">
        <p className="text-sm font-semibold text-gray-700 mb-2">Items:</p>
        <div className="space-y-2">
          {order.items.map((it, i) => (
            <div key={i} className="flex items-center justify-between rounded border p-2 text-sm">
              <span>{it.productName} × {it.quantity}</span>
              <span className="font-semibold">{formatPrice(it.totalPrice)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* WhatsApp help */}
      <div className="mt-4 flex flex-wrap gap-2">
        <a href={waLink(PHONES.whatsapp, `Hi, meri order ${order.orderNumber} ke baare mein help chahiye.`)} target="_blank" rel="noopener" className="btn-whatsapp text-sm py-2 px-4">Help via WhatsApp</a>
        <a href={telLink(PHONES.primary)} className="inline-flex items-center gap-2 rounded-lg bg-navy-900 px-4 py-2 text-sm text-white font-semibold hover:bg-navy-800"><Phone className="h-4 w-4"/>Call Support</a>
      </div>
    </div>
  );
}
