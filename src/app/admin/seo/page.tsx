'use client';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Save, Globe, Search as SearchIcon, Plus, Trash2, Check } from 'lucide-react';
import toast from 'react-hot-toast';

type SeoItem = {
  pagePath: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  ogImage?: string | null;
};

const DEFAULT_PAGES = [
  { path: '/', title: 'RO Service in Patna | ₹200 Visit Charge | Same-Day Repair & Installation - RO Service Patna', desc: 'Best RO service in Patna at ₹200 visit charge. Same-day RO repair, installation, filter/membrane change for all brands (Kent, Aquaguard, Livpure, AO Smith). Genuine RO purifiers, spare parts & commercial plants with free pan-India delivery. Call 9241536586.' },
  { path: '/book-service', title: 'Book RO Service in Patna | ₹200 Visit Charge | Same-Day Repair', desc: 'Book RO repair, installation, AMC & filter change in Patna online. Same-day doorstep visit ₹200. Verified technicians, 30-day warranty, genuine parts. Call 9241536586.' },
  { path: '/categories/ro-purifiers', title: 'Buy RO Water Purifier Online in India | Best Price 2026 - RO Service Patna', desc: 'Buy domestic RO + UV + UF purifiers online from Kent, Aquaguard, Livpure, Pureit, AO Smith at lowest price in India. Free shipping + 1 year warranty. Patna free installation.' },
  { path: '/categories/spare-parts', title: 'Genuine RO Spare Parts Online India | Membrane, Filter, UV Lamp - RO Service Patna', desc: 'Buy original RO spare parts online - membrane 80/100 GPD, sediment+carbon filter kit, UV lamp, booster pump, SMPS, connectors. Pan-India delivery. COD available.' },
  { path: '/categories/commercial-plants', title: 'Commercial RO Plant Manufacturer & Supplier in India | 50-10000 LPH', desc: 'Buy commercial RO plants 50 LPH to 10000 LPH for office, school, factory. Best price in India, installation & AMC available across India. Contact 9241536586 for quote.' },
  { path: '/track-order', title: 'Track Your Order - RO Service Patna', desc: 'Track your RO purifier or spare parts order online using order number or mobile number. Real-time status, tracking number, delivery updates.' },
  { path: '/cart', title: 'Shopping Cart - RO Service Patna', desc: 'Review your cart - RO purifiers, spare parts, membranes, filters. Easy checkout with COD, UPI, NetBanking, Razorpay.' },
];

export default function AdminSeo() {
  const [items, setItems] = useState<SeoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [newPath, setNewPath] = useState('');
  const [newTitle, setNewTitle] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/seo');
      const data = await res.json();
      // Merge with defaults (show defaults even if not saved yet)
      const savedMap: Record<string, SeoItem> = {};
      (data.items || []).forEach((it: SeoItem) => { savedMap[it.pagePath] = it; });
      const merged: SeoItem[] = DEFAULT_PAGES.map(p => savedMap[p.path] || {
        pagePath: p.path, metaTitle: p.title, metaDescription: p.desc, metaKeywords: [],
      });
      // Add saved ones not in defaults (e.g. area pages added dynamically)
      Object.values(savedMap).forEach(it => {
        if (!merged.find(m => m.pagePath === it.pagePath)) merged.push(it);
      });
      setItems(merged);
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const update = (idx: number, patch: Partial<SeoItem>) => {
    setItems(items.map((it, i) => i === idx ? { ...it, ...patch } : it));
  };

  const save = async (it: SeoItem) => {
    setSaving(it.pagePath);
    try {
      const res = await fetch('/api/admin/seo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(it),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      toast.success('SEO saved: ' + it.pagePath);
    } catch (e: any) { toast.error(e.message); }
    finally { setSaving(null); }
  };

  const addNew = () => {
    if (!newPath.startsWith('/')) return toast.error('Path / se shuru hona chahiye (jaise /amc)');
    if (items.find(i => i.pagePath === newPath)) return toast.error('Ye path pehle se hai');
    setItems([...items, { pagePath: newPath, metaTitle: newTitle || 'Title', metaDescription: 'Description', metaKeywords: [] }]);
    setNewPath(''); setNewTitle('');
    toast.success('Naya page add ho gaya, ab edit karke save karo');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl text-navy-900">SEO & Keywords Control</h1>
        <p className="text-sm text-gray-500">Har page ka meta title, description, keywords yaha se change karo (Google ranking ke liye important)</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card><CardContent className="p-5 flex items-center gap-3"><Globe className="h-8 w-8 text-brand-500"/><div><p className="text-2xl font-bold">{items.length}</p><p className="text-xs text-gray-500">Pages Managed</p></div></CardContent></Card>
        <Card><CardContent className="p-5 flex items-center gap-3"><SearchIcon className="h-8 w-8 text-orange-500"/><div><p className="text-2xl font-bold">30+</p><p className="text-xs text-gray-500">Patna Area SEO Pages</p></div></CardContent></Card>
        <Card><CardContent className="p-5 flex items-center gap-3"><div className="h-8 w-8 text-green-500 font-bold text-2xl">📈</div><div><p className="text-2xl font-bold">Auto</p><p className="text-xs text-gray-500">Schema & Sitemap</p></div></CardContent></Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Global Site SEO Settings</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-gray-600 space-y-2">
          <p>✅ <strong>Primary keyword:</strong> RO Service in Patna, RO Repair Patna, RO Service near me</p>
          <p>✅ <strong>LocalBusiness schema.org JSON-LD</strong> har area page pe automatically inject hota hai.</p>
          <p>✅ <strong>Sitemap.xml</strong> automatically generated (all 30+ area pages + categories + products).</p>
          <p>✅ <strong>Robots.txt</strong> Google ko sab crawl karne ke liye open hai.</p>
          <p>✅ <strong>WhatsApp click-to-chat</strong> sticky button har page pe.</p>
          <p>✅ <strong>Canonical URLs, Open Graph tags, Twitter cards</strong> sab set hai.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Page-wise Meta Editor</CardTitle></CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-wrap gap-2">
            <Input value={newPath} onChange={e=>setNewPath(e.target.value)} placeholder="Naya page path (e.g. /amc)" className="max-w-xs"/>
            <Input value={newTitle} onChange={e=>setNewTitle(e.target.value)} placeholder="Title (optional)" className="max-w-xs"/>
            <Button onClick={addNew}><Plus className="h-4 w-4 mr-1"/>Add Page</Button>
          </div>

          {loading ? <p className="py-4 text-center text-gray-500">Loading...</p> : (
          <div className="space-y-4">
            {items.map((it, idx) => (
              <div key={it.pagePath} className="rounded-lg border p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <code className="rounded bg-brand-50 px-2 py-0.5 text-xs font-bold text-brand-700">{it.pagePath}</code>
                    {DEFAULT_PAGES.find(p => p.path === it.pagePath) ? <Badge variant="outline">default</Badge> : <Badge variant="green">custom</Badge>}
                  </div>
                  <Button size="sm" onClick={() => save(it)} disabled={saving === it.pagePath}>
                    {saving === it.pagePath ? 'Saving...' : <><Save className="h-3 w-3 mr-1"/>Save</>}
                  </Button>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600">Meta Title ({it.metaTitle.length}/60 chars recommended)</label>
                  <Input value={it.metaTitle} onChange={e=>update(idx, { metaTitle: e.target.value })} className={it.metaTitle.length>60?'border-red-300':''}/>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600">Meta Description ({it.metaDescription.length}/160 chars recommended)</label>
                  <Input value={it.metaDescription} onChange={e=>update(idx, { metaDescription: e.target.value })} className={it.metaDescription.length>160?'border-red-300':''}/>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600">Keywords (comma separated)</label>
                  <Input value={it.metaKeywords.join(', ')} onChange={e=>update(idx, { metaKeywords: e.target.value.split(',').map(k=>k.trim()).filter(Boolean) })} placeholder="ro service patna, ro repair patna, ..."/>
                  {it.metaKeywords.length>0 && (
                    <div className="mt-1 flex flex-wrap gap-1">
                      {it.metaKeywords.map(k=> <Badge key={k} variant="outline" className="text-xs">{k}</Badge>)}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>)}
          <div className="mt-6 rounded-lg bg-amber-50 border border-amber-200 p-4 text-sm text-amber-800">
            <strong>💡 SEO Tip:</strong> Har page ka title 50-60 characters, description 150-160 characters rakho. Primary keyword naturally daalo.
            "RO service in Patna" primary keyword hai — usko title + description + content mein 2-3 baar laao par keyword stuffing mat karo.
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Target Keywords (already site pe)</CardTitle></CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {[
              'ro service in patna','ro repair patna','ro water purifier service patna',
              'kent ro service patna','aquaguard service patna','ro installation patna',
              'ro service near me','water purifier repair patna','ro membrane change patna',
              'best ro service in patna','patna ro service centre','ro amc patna',
              'ro mechanic patna','ro technician patna','livpure service patna',
              'pureit service patna','ao smith service patna','ro shop patna',
              'commercial ro plant patna','ro spare parts patna','ro purifier price patna',
              'ro filter change patna','cheap ro service patna',
            ].map(k => <Badge key={k} className="bg-brand-50 text-brand-700 hover:bg-brand-100">{k}</Badge>)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
