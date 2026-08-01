'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Search, Upload, Save, X, ImagePlus, Eye, Loader2 } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import toast from 'react-hot-toast';

type Product = {
  id: string; name: string; slug: string; sku: string;
  price: any; compareAtPrice: any; stockQty: number;
  isActive: boolean; isFeatured: boolean; isCommercial: boolean;
  category?: { name: string; slug: string }; brand?: { name: string };
  images?: { url: string; isPrimary: boolean }[];
};

const emptyForm = {
  name: '', sku: '', price: '', compareAtPrice: '',
  categorySlug: '', stockQty: '10', description: '',
  isActive: true, isFeatured: false, isCommercial: false, warrantyMonths: '12',
  images: [] as { url: string; isPrimary: boolean }[],
  imageUrl: '',
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({ ...emptyForm });

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/products?q=${encodeURIComponent(q)}`, { cache: 'no-store' });
      const data = await res.json();
      setProducts(data.products || []);
    } catch (e) { console.error(e); toast.error('Products load nahi ho pa rahe'); }
    setLoading(false);
  };

  useEffect(() => { load(); }, [q]);
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.search.includes('new=1')) openAdd();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openAdd = () => { setForm({ ...emptyForm }); setOpen(true); };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        if (!file.type.startsWith('image/')) { toast.error('Sirf images select karo'); continue; }
        if (file.size > 5 * 1024 * 1024) { toast.error('5MB se chhoti photo daalo'); continue; }
        const fd = new FormData();
        fd.append('file', file);
        const res = await fetch('/api/upload', { method: 'POST', body: fd });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Upload fail');
        setForm(f => ({
          ...f,
          images: [...f.images, { url: data.url, isPrimary: f.images.length === 0 }],
        }));
      }
      toast.success('Photo upload ho gayi!');
    } catch (e: any) { toast.error('Upload error: ' + e.message); }
    finally { setUploading(false); e.target.value = ''; }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.sku || !form.price) { toast.error('Name, SKU, Price bharna zaroori'); return; }
    setSaving(true);
    try {
      // Merge imageUrl into images if present
      let images = [...form.images];
      if (form.imageUrl && form.imageUrl.trim().startsWith('http') && !images.find(i => i.url === form.imageUrl)) {
        images.unshift({ url: form.imageUrl.trim(), isPrimary: images.length === 0 });
      }
      const payload = {
        name: form.name, sku: form.sku,
        price: parseFloat(form.price),
        compareAtPrice: form.compareAtPrice ? parseFloat(form.compareAtPrice) : null,
        stockQty: parseInt(form.stockQty) || 0,
        warrantyMonths: parseInt(form.warrantyMonths) || 12,
        categoryId: form.categorySlug || undefined,
        isActive: form.isActive, isFeatured: form.isFeatured, isCommercial: form.isCommercial,
        description: form.description,
        images,
      };
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Product save nahi hua');
      toast.success('Product add ho gaya! 🎉');
      setOpen(false);
      setForm({ ...emptyForm });
      load();
    } catch (e: any) { toast.error('Error: ' + e.message); }
    finally { setSaving(false); }
  };

  const addImageUrl = () => {
    if (!form.imageUrl || !form.imageUrl.trim().startsWith('http')) { toast.error('Sahi URL daalo (https://...)'); return; }
    setForm(f => ({
      ...f,
      images: [...f.images, { url: f.imageUrl.trim(), isPrimary: f.images.length === 0 }],
      imageUrl: '',
    }));
  };

  const removeImage = (idx: number) => setForm(f => ({ ...f, images: f.images.filter((_, j) => j !== idx) }));
  const setPrimary = (idx: number) => setForm(f => ({ ...f, images: f.images.map((img, i) => ({ ...img, isPrimary: i === idx })) }));

  const toggleActive = async (p: Product) => {
    await fetch(`/api/admin/products/${p.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ isActive: !p.isActive }) });
    load();
  };

  const deleteProduct = async (p: Product) => {
    if (!confirm(`"${p.name}" deactivate karna hai? (Site se hat jayega)`)) return;
    const res = await fetch(`/api/admin/products/${p.id}`, { method: 'DELETE' });
    if (res.ok) { toast.success('Deactivated'); load(); }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl text-navy-900">Products</h1>
          <p className="text-sm text-gray-500">Catalog, pricing, photos & inventory — sab yahaan se manage karo</p>
        </div>
        <div className="flex gap-2"><Button onClick={openAdd}><Plus className="h-4 w-4"/>Add Product</Button></div>
      </div>

      <Card>
        <CardContent className="p-5">
          <div className="mb-4 flex flex-wrap gap-2 items-center">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400"/>
              <Input placeholder="Naam ya SKU se search..." className="pl-9" value={q} onChange={e => setQ(e.target.value)}/>
            </div>
            <Button variant="outline" size="sm" onClick={load}>Refresh</Button>
          </div>

          {loading ? <div className="py-10 text-center text-gray-500"><Loader2 className="inline h-5 w-5 animate-spin"/> Loading...</div>
           : products.length === 0 ? (
            <div className="py-10 text-center">
              <p className="text-gray-500">Abhi tak koi product nahi hai. Pehla product add karo!</p>
              <Button className="mt-3" onClick={openAdd}><Plus className="h-4 w-4"/>Add Your First Product</Button>
            </div>
           ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-y bg-gray-50 text-left text-xs uppercase tracking-wider text-gray-500">
                    <th className="px-4 py-3">Product</th><th className="px-4 py-3">SKU</th>
                    <th className="px-4 py-3">Category</th><th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3">Stock</th><th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                            {p.images && p.images.length > 0 && p.images.find(i => i.isPrimary)?.url ? (
                              <Image src={p.images.find(i => i.isPrimary)!.url} alt={p.name} fill sizes="48px" className="object-cover" unoptimized/>
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-gray-300"><Upload className="h-5 w-5"/></div>
                            )}
                          </div>
                          <div>
                            <span className="block font-medium text-navy-900 max-w-xs truncate">{p.name}</span>
                            <div className="flex gap-1 mt-0.5">
                              {p.isFeatured && <Badge variant="orange" className="text-[10px]">Featured</Badge>}
                              {p.isCommercial && <Badge variant="navy" className="text-[10px]">Commercial</Badge>}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-mono text-xs">{p.sku}</td>
                      <td className="px-4 py-3 text-gray-600">{p.category?.name || '—'}</td>
                      <td className="px-4 py-3 font-semibold">{formatPrice(Number(p.price))}</td>
                      <td className="px-4 py-3"><Badge variant={p.stockQty < 10 ? 'red' : 'green'}>{p.stockQty} units</Badge></td>
                      <td className="px-4 py-3">
                        <button onClick={() => toggleActive(p)}>
                          <Badge variant={p.isActive ? 'green' : 'outline'}>{p.isActive ? 'Active' : 'Draft'}</Badge>
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          <Link href={`/product/${p.slug}`} target="_blank"><Button size="sm" variant="ghost" title="Site pe dekhiye"><Eye className="h-4 w-4"/></Button></Link>
                          <Button size="sm" variant="ghost" className="text-red-500" title="Deactivate" onClick={() => deleteProduct(p)}><Trash2 className="h-4 w-4"/></Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
           )}
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[92vh] overflow-y-auto">
          <DialogHeader><DialogTitle>Add New Product</DialogTitle></DialogHeader>
          <form onSubmit={submit} className="space-y-4 py-2">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="text-sm font-medium">Product Name *</label>
                <Input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="e.g. AquaNexa Pro 12L RO+UV+UF TDS Controller"/>
              </div>
              <div>
                <label className="text-sm font-medium">SKU (Unique Code) *</label>
                <Input required value={form.sku} onChange={e => setForm({...form, sku: e.target.value})} placeholder="AQN-PRO-12"/>
              </div>
              <div>
                <label className="text-sm font-medium">Category</label>
                <select className="flex h-9 w-full rounded-lg border border-gray-200 bg-white px-3 py-1 text-sm outline-none focus:border-brand-500" value={form.categorySlug} onChange={e => setForm({...form, categorySlug: e.target.value})}>
                  <option value="">— Default (RO Purifiers) —</option>
                  <option value="ro-purifiers">RO Purifiers</option>
                  <option value="domestic-ro">Domestic RO</option>
                  <option value="uv-uf">UV / UF Purifiers</option>
                  <option value="spare-parts">Spare Parts</option>
                  <option value="ro-membranes">RO Membranes</option>
                  <option value="filters">Filters</option>
                  <option value="commercial-plants">Commercial Plants</option>
                  <option value="accessories">Accessories</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Selling Price (₹) *</label>
                <Input type="number" required value={form.price} onChange={e => setForm({...form, price: e.target.value})} placeholder="12999"/>
              </div>
              <div>
                <label className="text-sm font-medium">MRP (Original Price - discount dikhega)</label>
                <Input type="number" value={form.compareAtPrice} onChange={e => setForm({...form, compareAtPrice: e.target.value})} placeholder="18999"/>
              </div>
              <div>
                <label className="text-sm font-medium">Stock Qty</label>
                <Input type="number" value={form.stockQty} onChange={e => setForm({...form, stockQty: e.target.value})}/>
              </div>
              <div>
                <label className="text-sm font-medium">Warranty (months)</label>
                <Input type="number" value={form.warrantyMonths} onChange={e => setForm({...form, warrantyMonths: e.target.value})}/>
              </div>

              <div className="md:col-span-2 space-y-1 rounded-lg bg-gray-50 p-3">
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.isFeatured} onChange={e => setForm({...form, isFeatured: e.target.checked})}/>⭐ Homepage pe FEATURED product dikhao</label>
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.isCommercial} onChange={e => setForm({...form, isCommercial: e.target.checked})}/>🏭 Commercial RO Plant hai</label>
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.isActive} onChange={e => setForm({...form, isActive: e.target.checked})}/>✅ Active (site pe dikh jayega)</label>
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-medium">Product Photos</label>
                <div className="mt-2 flex flex-wrap gap-2">
                  <label className="flex h-24 w-24 cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-brand-300 bg-brand-50 text-brand-600 hover:bg-brand-100">
                    {uploading ? <Loader2 className="h-6 w-6 animate-spin"/> : <ImagePlus className="h-6 w-6"/>}
                    <span className="text-[11px] font-semibold">{uploading ? 'Uploading...' : 'Choose File'}</span>
                    <input type="file" accept="image/*" multiple className="hidden" onChange={handleFileUpload} disabled={uploading}/>
                  </label>
                  {form.images.map((img, i) => (
                    <div key={i} className="relative h-24 w-24 overflow-hidden rounded-lg border bg-gray-100">
                      <Image src={img.url} alt="" fill sizes="96px" className="object-cover" unoptimized/>
                      <button type="button" onClick={() => removeImage(i)} className="absolute top-0.5 right-0.5 rounded-full bg-red-500 p-0.5 text-white hover:bg-red-600"><X className="h-3 w-3"/></button>
                      {img.isPrimary ? (
                        <span className="absolute bottom-0.5 left-0.5 rounded bg-green-600 px-1.5 py-0.5 text-[9px] font-bold text-white">MAIN</span>
                      ) : (
                        <button type="button" onClick={() => setPrimary(i)} className="absolute bottom-0.5 left-0.5 rounded bg-gray-700/80 px-1.5 py-0.5 text-[9px] font-bold text-white hover:bg-gray-800">Set Main</button>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-2 flex gap-2">
                  <Input placeholder="...ya image ka internet URL paste (https://...)" value={form.imageUrl} onChange={e => setForm({...form, imageUrl: e.target.value})}/>
                  <Button type="button" variant="outline" onClick={addImageUrl}>Add URL</Button>
                </div>
                <p className="text-xs text-gray-500 mt-1">💡 Apne computer se photo choose kar sakte ho (direct upload), ya Unsplash/Amazon ka URL paste karo</p>
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-medium">Product Description</label>
                <textarea rows={4} className="mt-1 flex w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-500 resize-none" value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="Features, specs, kya kya aata hai box mein..."/>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild><Button type="button" variant="outline">Cancel</Button></DialogClose>
              <Button type="submit" disabled={saving || uploading}>
                {saving ? <><Loader2 className="h-4 w-4 animate-spin"/>Saving...</> : <><Save className="h-4 w-4"/>Save Product</>}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
