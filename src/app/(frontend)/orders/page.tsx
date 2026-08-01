'use client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils';

export default function OrdersPage() {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session) {
      fetch('/api/orders').then(r => r.json()).then(d => setOrders(d.orders || [])).finally(() => setLoading(false));
    } else setLoading(false);
  }, [session]);

  if (status === 'loading' || loading) return <div className="container-pad py-16 text-center">Loading...</div>;
  if (!session) {
    return (
      <div className="container-pad py-20 text-center">
        <Package className="mx-auto h-16 w-16 text-gray-300"/>
        <h2 className="mt-4">Login to view your orders</h2>
        <p className="mt-2 text-gray-500">Apne orders dekhne ke liye login karein.</p>
        <div className="mt-4 flex justify-center gap-2">
          <Link href={`/auth/login?callbackUrl=/orders`}><Button>Login</Button></Link>
          <Link href="/auth/register"><Button variant="outline">Register</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-pad py-10">
      <h1>My Orders</h1>
      <p className="mt-1 text-gray-500">Welcome back, {session.user?.name}!</p>
      {orders.length === 0 ? (
        <div className="mt-8 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 p-10 text-center">
          <Package className="mx-auto h-16 w-16 text-gray-400"/>
          <h3 className="mt-3 text-xl text-navy-900">Abhi tak koi order nahi hai</h3>
          <Link href="/categories/ro-purifiers"><Button className="mt-4">Browse Products</Button></Link>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {orders.map((o: any) => (
            <div key={o.id} className="rounded-xl border p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-mono text-sm font-bold text-brand-600">{o.orderNumber}</p>
                  <p className="text-xs text-gray-500">{new Date(o.createdAt).toLocaleString('en-IN')}</p>
                </div>
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-800">{o.orderStatus}</span>
              </div>
              <div className="mt-3 flex items-center justify-between border-t pt-3">
                <span className="text-sm text-gray-600">{o.items.length} item(s)</span>
                <span className="font-bold">{formatPrice(Number(o.totalAmount))}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
