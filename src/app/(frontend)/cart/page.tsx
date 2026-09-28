'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Trash2, ShoppingBag, ArrowRight, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { formatPrice, PHONES, telLink } from '@/lib/utils';
import { useCart } from '@/lib/store';

export default function CartPage() {
  const items = useCart(s => s.items);
  const updateQty = useCart(s => s.updateQty);
  const remove = useCart(s => s.remove);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const shipping = subtotal >= 999 || subtotal === 0 ? 0 : 79;
  const total = subtotal + shipping;

  if (!mounted) return (
    <div className="container-pad py-12"><div className="h-40 animate-pulse rounded-xl bg-gray-100" /></div>
  );

  return (
    <div className="container-pad py-8">
      <h1 className="mb-6">Shopping Cart {items.length > 0 && <span className="text-base font-normal text-gray-500">({items.length} item{items.length > 1 ? 's' : ''})</span>}</h1>
      {items.length === 0 ? (
        <Card className="p-12 text-center">
          <ShoppingBag className="mx-auto h-16 w-16 text-gray-300" />
          <h3 className="mt-4">Your cart is empty</h3>
          <p className="mt-1 text-sm text-gray-500">Browse our catalog and pick the best RO for your home</p>
          <Link href="/"><Button className="mt-4">Start Shopping</Button></Link>
        </Card>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-3 lg:col-span-2">
            {items.map(i => (
              <Card key={i.id}>
                <CardContent className="flex items-center gap-4 p-4">
                  <Link href={`/product/${i.slug}`} className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-gray-50">
                    {i.image ? (
                      <Image src={i.image} alt={i.name} fill sizes="96px" className="object-contain p-2" />
                    ) : <ShoppingBag className="h-full w-full p-6 text-gray-200" />}
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link href={`/product/${i.slug}`} className="font-semibold text-navy-900 hover:text-brand-600 line-clamp-2">{i.name}</Link>
                    {i.brand && <p className="text-xs text-gray-500">{i.brand}</p>}
                    <div className="mt-2 flex items-center gap-3">
                      <div className="flex items-center rounded-lg border">
                        <button onClick={() => updateQty(i.id, i.quantity - 1)} className="px-3 py-1 font-bold">−</button>
                        <span className="w-8 text-center text-sm">{i.quantity}</span>
                        <button onClick={() => updateQty(i.id, i.quantity + 1)} className="px-3 py-1 font-bold">+</button>
                      </div>
                      <button onClick={() => remove(i.id)} className="flex items-center gap-1 text-xs text-red-500 hover:underline"><Trash2 className="h-3 w-3" /> Remove</button>
                    </div>
                  </div>
                  <p className="text-lg font-bold text-navy-900">{formatPrice(i.price * i.quantity)}</p>
                </CardContent>
              </Card>
            ))}
            <div className="flex gap-3">
              <Link href="/categories/ro-purifiers"><Button variant="outline">Continue Shopping</Button></Link>
            </div>
          </div>
          <Card className="h-fit sticky top-24">
            <CardContent className="p-6">
              <h3 className="text-lg">Order Summary</h3>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span>{formatPrice(subtotal)}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Shipping</span><span className="font-semibold text-cta-green">{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span></div>
                {shipping > 0 && <p className="text-xs text-gray-400">Add {formatPrice(999 - subtotal)} more for free shipping!</p>}
              </div>
              <div className="mt-4 flex justify-between border-t pt-4 text-lg font-bold text-navy-900">
                <span>Total</span><span>{formatPrice(total)}</span>
              </div>
              <Link href="/checkout"><Button size="lg" className="mt-5 w-full gap-2">
                Proceed to Checkout <ArrowRight className="h-4 w-4" />
              </Button></Link>
              <a href={telLink(PHONES.primary)} className="mt-3 flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-brand-600">
                <Phone className="h-4 w-4" /> Need help ordering? Call {PHONES.primary}
              </a>
              <div className="mt-4 rounded-lg bg-brand-50 p-3 text-xs text-brand-800">
                <p className="font-semibold">🔒 Safe & Secure Checkout</p>
                <p className="mt-1">100% genuine products • Easy returns • Pan-India shipping</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
