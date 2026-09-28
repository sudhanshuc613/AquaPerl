'use client';
import Link from 'next/link';
import Image from 'next/image';
import { X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart, cartSubtotal, cartCount } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import { useEffect } from 'react';

export default function CartDrawer() {
  const isOpen = useCart(s => s.isOpen);
  const setOpen = useCart(s => s.setOpen);
  const items = useCart(s => s.items);
  const updateQty = useCart(s => s.updateQty);
  const remove = useCart(s => s.remove);
  const subtotal = cartSubtotal();
  const shipping = subtotal >= 999 || subtotal === 0 ? 0 : 79;

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }, [isOpen]);

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity ${isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        onClick={() => setOpen(false)}
      />
      <aside className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between border-b p-5">
          <h3 className="text-lg font-bold text-navy-900 flex items-center gap-2"><ShoppingBag className="h-5 w-5 text-brand-500"/>Shopping Cart ({cartCount()})</h3>
          <button onClick={() => setOpen(false)} className="rounded-full p-2 hover:bg-gray-100"><X className="h-5 w-5"/></button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <ShoppingBag className="h-16 w-16 text-gray-200"/>
              <p className="mt-4 font-semibold text-navy-900">Your cart is empty</p>
              <p className="mt-1 text-sm text-gray-500">Add items to get started</p>
              <Button className="mt-4" onClick={() => setOpen(false)}>Browse Products</Button>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map(i => (
                <div key={i.id} className="flex gap-3 rounded-xl border p-3">
                  <Link href={`/product/${i.slug}`} onClick={() => setOpen(false)} className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-50">
                    {i.image ? (
                      <Image src={i.image} alt={i.name} fill sizes="80px" className="object-contain p-1"/>
                    ) : <div className="flex h-full w-full items-center justify-center text-gray-300"><ShoppingBag className="h-8 w-8"/></div>}
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link href={`/product/${i.slug}`} onClick={() => setOpen(false)} className="line-clamp-2 text-sm font-semibold hover:text-brand-600">{i.name}</Link>
                    {i.brand && <p className="text-xs text-gray-500">{i.brand}</p>}
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center rounded-lg border">
                        <button onClick={() => updateQty(i.id, i.quantity - 1)} className="px-2 py-1 font-bold">−</button>
                        <span className="w-8 text-center text-xs">{i.quantity}</span>
                        <button onClick={() => updateQty(i.id, i.quantity + 1)} className="px-2 py-1 font-bold">+</button>
                      </div>
                      <p className="font-bold text-navy-900">{formatPrice(i.price * i.quantity)}</p>
                    </div>
                  </div>
                  <button onClick={() => remove(i.id)} className="text-gray-400 hover:text-red-500 self-start"><Trash2 className="h-4 w-4"/></button>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t p-5 space-y-3">
            <div className="flex justify-between text-sm"><span className="text-gray-500">Subtotal</span><span>{formatPrice(subtotal)}</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-500">Shipping</span><span className={shipping ? '' : 'text-cta-green font-semibold'}>{shipping ? formatPrice(shipping) : 'FREE'}</span></div>
            <div className="flex justify-between border-t pt-3 text-lg font-bold"><span>Total</span><span>{formatPrice(subtotal + shipping)}</span></div>
            {shipping > 0 && <p className="text-xs text-gray-500">Add {formatPrice(999 - subtotal)} more for FREE shipping!</p>}
            <Link href="/checkout" onClick={() => setOpen(false)}>
              <Button size="lg" className="w-full gap-2">Checkout <ArrowRight className="h-4 w-4"/></Button>
            </Link>
            <Link href="/cart" onClick={() => setOpen(false)} className="block text-center text-sm text-brand-600 hover:underline">View Full Cart</Link>
          </div>
        )}
      </aside>
    </>
  );
}
