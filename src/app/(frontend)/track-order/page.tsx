'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Search, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState('');

  return (
    <div className="container-pad py-16">
      <div className="mx-auto max-w-xl text-center">
        <Package className="mx-auto h-16 w-16 text-brand-500"/>
        <h1 className="mt-4">Track Your Order</h1>
        <p className="mt-2 text-gray-500">Apna order ID daalo (e.g. AQN-20260731-1234)</p>
        <form onSubmit={e => { e.preventDefault(); alert('Order tracking abhi live nahi hai, call karo 8969821440'); }} className="mt-6 flex gap-2">
          <Input value={orderId} onChange={e => setOrderId(e.target.value)} placeholder="Order ID"/>
          <Button type="submit"><Search className="h-4 w-4"/>Track</Button>
        </form>
        <Link href="/" className="mt-4 inline-block text-sm text-brand-600 hover:underline">&larr; Back to Home</Link>
      </div>
    </div>
  );
}
