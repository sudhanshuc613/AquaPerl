'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search as SearchIcon } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function SearchPage() {
  const params = useSearchParams();
  const initialQ = params.get('q') || '';
  const [q, setQ] = useState(initialQ);
  const [submittedQ, setSubmittedQ] = useState(initialQ);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => { if (submittedQ) runSearch(submittedQ); }, [submittedQ]);
  useEffect(() => { setQ(initialQ); setSubmittedQ(initialQ); }, [initialQ]);

  const runSearch = async (query: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/shop/products?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data.products || []);
    } finally { setLoading(false); }
  };

  const handleSearch = (e: React.FormEvent) => { e.preventDefault(); setSubmittedQ(q); };

  return (
    <div className="container-pad py-10">
      <h1 className="text-2xl md:text-3xl">Search Results</h1>
      <form onSubmit={handleSearch} className="mt-4 flex max-w-xl gap-2">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-2.5 h-4 w-4 text-gray-400"/>
          <Input className="pl-9" placeholder="Search products..." value={q} onChange={e => setQ(e.target.value)}/>
        </div>
        <Button type="submit">Search</Button>
      </form>

      <div className="mt-6">
        {loading ? <p className="text-gray-500">Searching...</p>
         : submittedQ ? (
          <>
            <p className="text-sm text-gray-500">{results.length} results for "<strong>{submittedQ}</strong>"</p>
            {results.length === 0 ? (
              <div className="mt-8 rounded-xl bg-gray-50 p-10 text-center">
                <p className="text-gray-600">Koi product nahi mila.</p>
                <Link href="/categories/ro-purifiers"><Button className="mt-3">Browse All Products</Button></Link>
              </div>
            ) : (
              <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
                {results.map((p: any) => <ProductCard key={p.id} product={p}/>)}
              </div>
            )}
          </>
        ) : <p className="text-gray-500">Search bar mein type karo...</p>}
      </div>
    </div>
  );
}
