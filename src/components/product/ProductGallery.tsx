'use client';
import { useState } from 'react';
import Image from 'next/image';
import { ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type Img = { url: string; alt: string | null; isPrimary: boolean };

export default function ProductGallery({ images, productName }: { images: Img[]; productName: string }) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [pos, setPos] = useState({ x: 50, y: 50 });

  const imgs = images.length > 0 ? images : [{ url: '/placeholder.png', alt: productName, isPrimary: true }];
  const current = imgs[active];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPos({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
  };

  const prev = () => setActive((active - 1 + imgs.length) % imgs.length);
  const next = () => setActive((active + 1) % imgs.length);

  return (
    <div>
      <div
        className="group relative aspect-square overflow-hidden rounded-2xl border border-gray-100 bg-gradient-to-br from-brand-50/30 to-white"
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => setZoom(false)}
        onMouseMove={handleMouseMove}
      >
        <Image
          src={current.url}
          alt={current.alt ?? productName}
          fill
          sizes="(max-width:1024px) 100vw, 50vw"
          priority
          className={cn('object-contain p-6 transition-transform duration-200', zoom && 'scale-[2.5]')}
          style={zoom ? { transformOrigin: `${pos.x}% ${pos.y}%` } : undefined}
        />
        <button
          onClick={() => setZoom(z => !z)}
          className="absolute right-3 top-3 rounded-full bg-white/90 p-2 shadow opacity-0 transition-opacity group-hover:opacity-100"
          aria-label="Zoom"
        >
          <ZoomIn className="h-4 w-4 text-navy-800" />
        </button>
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow opacity-0 transition-opacity group-hover:opacity-100"
        >
          <ChevronLeft className="h-5 w-5 text-navy-800" />
        </button>
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow opacity-0 transition-opacity group-hover:opacity-100"
        >
          <ChevronRight className="h-5 w-5 text-navy-800" />
        </button>
      </div>

      {/* Thumbnails */}
      {imgs.length > 1 && (
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {imgs.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={cn(
                'relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all',
                active === i ? 'border-brand-500 shadow-md' : 'border-gray-100 hover:border-brand-300'
              )}
            >
              <Image src={img.url} alt={img.alt ?? ''} fill sizes="80px" className="object-contain p-1" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
