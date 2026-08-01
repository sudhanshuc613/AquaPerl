'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Check, Loader2, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/store';
import toast from 'react-hot-toast';

type Props = {
  productId: string;
  name: string;
  slug: string;
  price: number;
  compareAtPrice?: number | null;
  image: string | null;
  brand?: string | null;
  stock: number;
};

export default function AddToCartButton({ productId, name, slug, price, compareAtPrice, image, brand, stock }: Props) {
  const add = useCart(s => s.add);
  const [qty, setQty] = useState(1);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const router = useRouter();

  const handleAdd = () => {
    if (stock <= 0) { toast.error('Out of stock'); return; }
    setAdding(true);
    setTimeout(() => {
      add({ productId, name, slug, price, compareAtPrice: compareAtPrice ?? null, image, brand: brand ?? null, quantity: qty });
      setAdding(false);
      setAdded(true);
      toast.success(`Added ${qty} × ${name.slice(0, 28)}${name.length > 28 ? '…' : ''} to cart`);
      setTimeout(() => setAdded(false), 1500);
    }, 500);
  };

  const buyNow = () => {
    handleAdd();
    setTimeout(() => router.push('/checkout'), 300);
  };

  return (
    <div className="flex flex-1 items-stretch gap-2">
      <div className="flex items-center rounded-lg border border-gray-200">
        <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2.5 text-lg font-bold text-gray-600 hover:bg-gray-50" aria-label="Decrease">−</button>
        <span className="w-10 text-center text-sm font-semibold">{qty}</span>
        <button onClick={() => setQty(Math.min(stock || 99, qty + 1))} className="px-3 py-2.5 text-lg font-bold text-gray-600 hover:bg-gray-50" aria-label="Increase">+</button>
      </div>
      <Button size="lg" variant="primary" className="flex-1 gap-2" onClick={handleAdd} disabled={adding || stock <= 0}>
        {adding ? <Loader2 className="h-5 w-5 animate-spin" /> : added ? <Check className="h-5 w-5" /> : <ShoppingCart className="h-5 w-5" />}
        {added ? 'Added!' : 'Add to Cart'}
      </Button>
      <Button size="lg" variant="navy" className="hidden sm:flex" onClick={buyNow} disabled={stock <= 0}>
        <Zap className="h-5 w-5" /> Buy Now
      </Button>
    </div>
  );
}
