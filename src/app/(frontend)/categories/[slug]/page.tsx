'use client';
import { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, SlidersHorizontal, ArrowUpDown, Loader2 } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import { Button } from '@/components/ui/button';
import ProductFilters from '@/components/product/ProductFilters';

type SortKey = 'popularity' | 'priceAsc' | 'priceDesc' | 'newest' | 'rating';

const sampleByCategory: Record<string, any[]> = {
  'ro-purifiers': [
    { id:'s1', name:'AquaNexa Pro 12L RO+UV+UF TDS', slug:'aquanexa-pro-12l', price:12999, compareAtPrice:18999, primaryImage:'https://images.unsplash.com/photo-1564419320461-6870880221ad?w=600', brand:{name:'AquaNexa',slug:'aquanexa'}, avgRating:4.7, reviewCount:342, isCommercial:false },
    { id:'s2', name:'Kent Super Plus RO+UV+UF 8L', slug:'kent-super-plus', price:15499, compareAtPrice:19000, primaryImage:'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600', brand:{name:'Kent',slug:'kent'}, avgRating:4.5, reviewCount:612, isCommercial:false },
    { id:'s7', name:'Livpure Glo 7L RO+UV', slug:'livpure-glo-7l', price:10999, compareAtPrice:14500, primaryImage:'https://images.unsplash.com/photo-1564419320461-6870880221ad?w=600', brand:{name:'Livpure',slug:'livpure'}, avgRating:4.4, reviewCount:318, isCommercial:false },
    { id:'s8', name:'AquaNexa Under-Sink RO 10L', slug:'under-sink-10l', price:18999, compareAtPrice:24999, primaryImage:'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600', brand:{name:'AquaNexa',slug:'aquanexa'}, avgRating:4.6, reviewCount:98, isCommercial:false },
  ],
  'spare-parts': [
    { id:'s4', name:'RO Membrane 80 GPD Original', slug:'ro-membrane-80-gpd', price:1499, compareAtPrice:2200, primaryImage:'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=600', brand:null, avgRating:4.4, reviewCount:1291, isCommercial:false },
    { id:'s5', name:'Sediment + Carbon Filter Set', slug:'filter-set', price:599, compareAtPrice:899, primaryImage:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600', brand:null, avgRating:4.3, reviewCount:421, isCommercial:false },
    { id:'s6', name:'UV Lamp 11W Replacement', slug:'uv-lamp-11w', price:799, compareAtPrice:1200, primaryImage:'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600', brand:null, avgRating:4.5, reviewCount:231, isCommercial:false },
    { id:'s9', name:'High Pressure Booster Pump', slug:'booster-pump', price:1899, compareAtPrice:2500, primaryImage:'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600', brand:null, avgRating:4.2, reviewCount:187, isCommercial:false },
  ],
  'commercial-plants': [
    { id:'s3', name:'Commercial RO Plant 100 LPH (SS)', slug:'commercial-100-lph', price:65000, compareAtPrice:85000, primaryImage:'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600', brand:{name:'AquaNexa',slug:'aquanexa'}, avgRating:4.8, reviewCount:86, isCommercial:true },
    { id:'s10', name:'Commercial RO 50 LPH Compact', slug:'commercial-50-lph', price:38000, compareAtPrice:48000, primaryImage:'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600', brand:{name:'AquaNexa',slug:'aquanexa'}, avgRating:4.6, reviewCount:42, isCommercial:true },
    { id:'s11', name:'Industrial RO 250 LPH', slug:'industrial-250-lph', price:125000, compareAtPrice:155000, primaryImage:'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600', brand:{name:'AquaNexa',slug:'aquanexa'}, avgRating:4.9, reviewCount:18, isCommercial:true },
    { id:'s12', name:'Commercial 100 LPH FRP', slug:'commercial-frp-100', price:55000, compareAtPrice:72000, primaryImage:'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600', brand:null, avgRating:4.5, reviewCount:31, isCommercial:true },
  ],
};
function getSample(slug: string) {
  if (sampleByCategory[slug]) return sampleByCategory[slug];
  // Inherit from parent
  if (['domestic-ro','uv-uf','under-sink','wall-mount'].includes(slug)) return sampleByCategory['ro-purifiers'];
  if (['ro-membranes','filters','uv-lamps','pumps','connectors','accessories'].includes(slug)) return sampleByCategory['spare-parts'];
  if (['50-lph','100-lph','250-lph','industrial'].includes(slug)) return sampleByCategory['commercial-plants'];
  return sampleByCategory['ro-purifiers'];
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState<SortKey>('popularity');
  const [mobileFilters, setMobileFilters] = useState(false);
  const categoryName = params.slug.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase());

  useEffect(() => {
    setLoading(true);
    fetch(`/api/shop/products?category=${encodeURIComponent(params.slug)}&take=24`)
      .then(r => r.json())
      .then(data => {
        if (data.products && data.products.length) setProducts(data.products);
        else setProducts(getSample(params.slug));
      })
      .catch(() => setProducts(getSample(params.slug)))
      .finally(() => setLoading(false));
  }, [params.slug]);

  const sorted = useMemo(() => {
    const arr = [...products];
    switch (sort) {
      case 'priceAsc': arr.sort((a,b) => a.price - b.price); break;
      case 'priceDesc': arr.sort((a,b) => b.price - a.price); break;
      case 'newest': arr.reverse(); break;
      case 'rating': arr.sort((a,b) => Number(b.avgRating) - Number(a.avgRating)); break;
      default: arr.sort((a,b) => b.reviewCount - a.reviewCount);
    }
    return arr;
  }, [products, sort]);

  return (
    <>
      <div className="border-b border-gray-100 bg-gray-50">
        <div className="container-pad py-4 text-xs text-gray-500 flex items-center">
          <Link href="/" className="hover:text-brand-600">Home</Link>
          <ChevronRight className="inline h-3 w-3 mx-1"/>
          <span className="text-navy-900">{categoryName}</span>
        </div>
      </div>
      <div className="container-pad py-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1>{categoryName}</h1>
            <p className="mt-1 text-gray-500">{loading ? 'Loading...' : `${sorted.length} products found`}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="lg:hidden" onClick={() => setMobileFilters(!mobileFilters)}>
              <SlidersHorizontal className="h-4 w-4 mr-1"/>Filters
            </Button>
            <div className="flex items-center gap-2">
              <ArrowUpDown className="h-4 w-4 text-gray-400"/>
              <select className="h-9 rounded-lg border border-gray-200 bg-white px-3 py-1 text-sm outline-none focus:border-brand-500" value={sort} onChange={e => setSort(e.target.value as SortKey)}>
                <option value="popularity">Sort: Popularity</option>
                <option value="newest">Newest First</option>
                <option value="priceAsc">Price: Low → High</option>
                <option value="priceDesc">Price: High → Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <aside className={`${mobileFilters ? 'block' : 'hidden'} lg:block`}>
            <ProductFilters/>
          </aside>
          <div>
            {loading ? (
              <div className="flex items-center justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-brand-500"/></div>
            ) : (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
                {sorted.map(p => <ProductCard key={p.id} product={p}/>)}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
