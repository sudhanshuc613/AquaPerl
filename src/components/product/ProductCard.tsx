'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Star, ShoppingCart, Check } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatPrice, calculateDiscount } from '@/lib/utils';
import { useCart } from '@/lib/store';
import toast from 'react-hot-toast';
import type { ProductCard as P } from '@/types';

export default function ProductCard({ product }: { product: P }) {
  const discount = calculateDiscount(product.compareAtPrice ?? 0, product.price);
  const add = useCart(s => s.add);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    add({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      image: product.primaryImage,
      price: product.price,
      compareAtPrice: product.compareAtPrice,
      brand: product.brand?.name || null,
    });
    toast.success(`${product.name.slice(0, 30)}... cart mein add ho gaya!`, { icon: '🛒' });
  };

  return (
    <Card className="group relative flex flex-col overflow-hidden p-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {discount > 0 && (
        <Badge variant="orange" className="absolute left-3 top-3 z-10">{discount}% OFF</Badge>
      )}
      {product.isCommercial && (
        <Badge variant="navy" className="absolute right-3 top-3 z-10">Commercial</Badge>
      )}

      <Link href={`/product/${product.slug}`} className="relative block aspect-square overflow-hidden bg-gradient-to-b from-brand-50/50 to-white">
        {product.primaryImage ? (
          <Image
            src={product.primaryImage}
            alt={product.name}
            fill
            sizes="(max-width:768px) 50vw, (max-width:1200px) 33vw, 25vw"
            className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
            unoptimized={product.primaryImage.startsWith('data:')}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-300">No Image</div>
        )}
        {/* Quick Buy overlay */}
        <div className="absolute inset-x-3 bottom-3 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <Button size="sm" className="w-full bg-white !text-navy-900 shadow-lg hover:!bg-brand-500 hover:!text-white" onClick={handleAdd}>
            <ShoppingCart className="h-4 w-4"/> Quick Add
          </Button>
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        {product.brand && (
          <span className="text-xs font-medium uppercase tracking-wider text-brand-600">{product.brand.name}</span>
        )}
        <Link href={`/product/${product.slug}`}>
          <h3 className="line-clamp-2 min-h-[2.75rem] text-sm font-semibold text-navy-900 hover:text-brand-600">{product.name}</h3>
        </Link>

        <div className="flex items-center gap-1">
          <div className="flex items-center gap-0.5 rounded bg-green-600 px-1.5 py-0.5 text-xs font-bold text-white">
            {Number(product.avgRating).toFixed(1)} <Star className="h-3 w-3 fill-white"/>
          </div>
          <span className="text-xs text-gray-500">({product.reviewCount})</span>
        </div>

        <div className="mt-auto flex items-end justify-between gap-2 pt-2">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-navy-900">{formatPrice(product.price)}</span>
              {product.compareAtPrice && Number(product.compareAtPrice) > product.price && (
                <span className="text-xs text-gray-400 line-through">{formatPrice(product.compareAtPrice)}</span>
              )}
            </div>
            {discount > 0 && <p className="text-xs text-green-600 font-semibold">You save {discount}%</p>}
          </div>
          <Button size="icon" variant="primary" className="h-9 w-9 rounded-full" aria-label="Add to cart" onClick={handleAdd}>
            <ShoppingCart className="h-4 w-4"/>
          </Button>
        </div>
      </div>
    </Card>
  );
}
