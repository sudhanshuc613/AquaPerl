'use client';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function WishlistPage() {
  return (
    <div className="container-pad py-10">
      <h1>My Wishlist</h1>
      <div className="mt-8 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 p-10 text-center">
        <Heart className="mx-auto h-16 w-16 text-gray-400"/>
        <h3 className="mt-3 text-xl text-navy-900">Wishlist khali hai</h3>
        <p className="mt-1 text-gray-500">Products pe ❤️ click kar ke wishlist mein add karo.</p>
        <Link href="/categories/ro-purifiers"><Button className="mt-4">Browse Products</Button></Link>
      </div>
    </div>
  );
}
