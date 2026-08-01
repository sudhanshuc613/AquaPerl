'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PHONES, telLink, waLink } from '@/lib/utils';
import { useCart } from '@/lib/store';
import { useEffect } from 'react';

export default function OrderSuccessPage() {
  const params = useSearchParams();
  const orderNo = params.get('order') || 'AQN-XXXX';
  const clear = useCart(s => s.clear);
  useEffect(() => { clear(); }, [clear]);

  return (
    <div className="container-pad py-16">
      <div className="mx-auto max-w-2xl rounded-3xl border-2 border-green-200 bg-gradient-to-br from-green-50 to-white p-10 text-center shadow-xl">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 className="h-12 w-12 text-green-600"/>
        </div>
        <h1 className="mt-5 text-3xl text-navy-900">Order Placed! 🎉</h1>
        <p className="mt-2 text-gray-600">Aapka order successfully place ho gaya. Hum jaldi hi phone pe confirm karte hain.</p>
        <div className="mt-5 inline-block rounded-xl bg-white px-6 py-3 shadow">
          <p className="text-xs text-gray-500">Your Order Number</p>
          <p className="font-mono text-2xl font-bold text-brand-600">{orderNo}</p>
        </div>
        <p className="mt-5 text-sm text-gray-500">
          Aap <a href={telLink(PHONES.primary)} className="font-semibold text-brand-600">{PHONES.primary}</a> pe call karke status pooch sakte ho.
          Confirmation WhatsApp pe bhi aayega.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/orders"><Button variant="navy"><Package className="h-4 w-4"/>My Orders</Button></Link>
          <Link href="/"><Button>Continue Shopping</Button></Link>
          <a href={waLink(PHONES.whatsapp, `Hi, mera order ${orderNo} confirm karna hai`)} className="btn-whatsapp">WhatsApp</a>
        </div>
      </div>
    </div>
  );
}
