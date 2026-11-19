'use client';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Save, Loader2, AlertCircle, Upload, Image as ImageIcon, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminSettings() {
  const [settings, setSettings] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/admin/settings').then(r => r.json()).then(d => { setSettings(d); setLoading(false); });
  }, []);

  const save = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/settings', { method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify(settings) });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        toast.success('✅ Settings saved! Site ab turant refresh ho raha hai...');
        // Nudge next tick to reload cache
        setTimeout(() => window.location.reload(), 1500);
      } else {
        toast.error('Save nahi hua: ' + (data.error || 'unknown error'));
      }
    } catch (e: any) {
      toast.error('Save error: ' + e.message);
    }
    setSaving(false);
  };

  // Hero banner upload (client-side resize to 1600x900 max, WebApp/photo quality)
  const [uploadingBanner, setUploadingBanner] = useState(false);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  const handleBannerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setUploadingBanner(true);
    try {
      // Client-side resize using canvas (auto-fits any photo to hero size)
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const img = new globalThis.Image();
        img.onload = () => {
          const MAX_W = 1600, MAX_H = 900;
          let w = img.width, h = img.height;
          if (w > MAX_W) { h = Math.round(h * MAX_W / w); w = MAX_W; }
          if (h > MAX_H) { w = Math.round(w * MAX_H / h); h = MAX_H; }
          const canvas = document.createElement('canvas');
          canvas.width = w; canvas.height = h;
          const ctx = canvas.getContext('2d');
          if (!ctx) return reject('no canvas');
          ctx.drawImage(img, 0, 0, w, h);
          resolve(canvas.toDataURL('image/jpeg', 0.85));
        };
        img.onerror = reject;
        img.src = URL.createObjectURL(f);
      });
      // Convert data URL to blob
      const resBlob = await fetch(dataUrl);
      const blob = await resBlob.blob();
      const form = new FormData();
      form.append('file', blob, 'hero.jpg');
      form.append('folder', 'banners');
      const up = await fetch('/api/admin/upload', { method:'POST', body: form });
      const d = await up.json();
      if (d.url) {
        setSettings(s => ({ ...s, 'hero.bannerImage': d.url }));
        toast.success('Banner upload ho gaya! Save button dabao.');
      } else {
        toast.error(d.error || 'Upload failed');
      }
    } catch (err: any) {
      toast.error('Upload error: ' + err.message);
    } finally {
      setUploadingBanner(false);
    }
  };

  const removeBanner = () => setSettings(s => ({ ...s, 'hero.bannerImage': '' }));

  if (loading) return <div className="py-10 text-center"><Loader2 className="inline h-6 w-6 animate-spin"/></div>;

  const field = (key: string, label: string, type: string = 'text', note?: string) => (
    <div>
      <label className="mb-1 block text-sm font-medium">{label}</label>
      <Input type={type} value={settings[key] ?? ''} onChange={e => setSettings({ ...settings, [key]: type==='number' ? Number(e.target.value) : e.target.value })}/>
      {note && <p className="mt-1 text-xs text-gray-500">{note}</p>}
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl text-navy-900">Site Settings</h1>
        <p className="text-sm text-gray-500">Yahan se phone number, prices, service charge change karo — BINA CODE EDIT kiye site pe turant reflect ho jayega.</p>
      </div>

      <Card>
        <CardHeader><CardTitle>📞 Contact Information</CardTitle></CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          {field('contact.primaryPhone', 'Primary Phone Number (Call)', 'tel', 'Ye number top strip, call buttons, WhatsApp pe dikhega')}
          {field('contact.secondaryPhone', 'Secondary Phone Number', 'tel')}
          {field('contact.whatsapp', 'WhatsApp Number', 'tel', 'WhatsApp button is number pe jayega')}
          {field('contact.email', 'Email Address', 'email')}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>🏷️ Brand</CardTitle></CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          {field('brand.name', 'Brand Name')}
          {field('brand.tagline', 'Tagline')}
          {field('brand.domain', 'Domain')}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>🔧 Patna Service Pricing (₹)</CardTitle></CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          {field('service.visitCharge', 'Visit / Diagnosis Charge', 'number', 'Default: 200')}
          {field('service.repairLabour', 'Repair Labour Charge', 'number', 'Only labour, parts extra')}
          {field('service.routineService', 'Routine Service Charge', 'number', 'Cleaning + TDS adjustment')}
          {field('service.filterChange', 'Filter Change Kit Price', 'number', 'Sediment + Carbon set')}
          {field('service.membraneChange', 'RO Membrane Change Price', 'number', '80 GPD membrane + install')}
          {field('service.installation', 'New RO Installation', 'number')}
          {field('service.uninstallation', 'RO Uninstallation', 'number')}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>🛡️ AMC Plan Pricing (Yearly ₹)</CardTitle></CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          {field('amc.basic', 'Basic AMC Price', 'number', '3 services, no parts')}
          {field('amc.silver', 'Silver AMC Price', 'number', '3 services + pre-filters free')}
          {field('amc.gold', 'Gold AMC Price', 'number', 'All-inclusive + membrane free')}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>🖼️ Homepage Hero Banner</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-500">
            Yahan se homepage ka hero image upload karo. Koi bhi photo daalo — automatic resize ho jayega (1600x900 max, Web-quality), koi size/format ki chinta mat karo.
            Agar khali chhoda to default cyan gradient use hoga.
          </p>

          {settings['hero.bannerImage'] ? (
            <div className="relative overflow-hidden rounded-xl border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={settings['hero.bannerImage']} alt="Hero banner preview" className="h-64 w-full object-cover"/>
              <button onClick={removeBanner} className="absolute right-3 top-3 flex items-center gap-1 rounded-lg bg-red-500 px-3 py-1.5 text-xs font-bold text-white hover:bg-red-600">
                <Trash2 className="h-3.5 w-3.5"/> Remove
              </button>
            </div>
          ) : (
            <div className="flex h-40 items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50">
              <p className="text-sm text-gray-500">Koi banner upload nahi hai — default gradient use ho raha hai</p>
            </div>
          )}

          <input ref={bannerInputRef} type="file" accept="image/*" onChange={handleBannerUpload} className="hidden"/>
          <Button type="button" variant="outline" onClick={() => bannerInputRef.current?.click()} disabled={uploadingBanner}>
            {uploadingBanner ? <><Loader2 className="h-4 w-4 animate-spin mr-2"/>Uploading...</> : <><Upload className="h-4 w-4 mr-2"/>{settings['hero.bannerImage'] ? 'Replace Banner' : 'Upload Banner Image'}</>}
          </Button>

          <div className="grid gap-4 md:grid-cols-2 pt-2">
            {field('hero.bannerHeadline', 'Hero Headline Text (optional)', 'text', 'Empty chhodo to default headline use hoga')}
            {field('hero.bannerSubtext', 'Hero Sub-text (optional)', 'text', 'Empty chhodo to default')}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>🔍 Global SEO Settings</CardTitle></CardHeader>
        <CardContent className="grid gap-4">
          {field('seo.metaTitle', 'Homepage Meta Title', 'text', 'Homepage title (Google me jo dikhta hai) - 60 chars')}
          <div>
            <label className="mb-1 block text-sm font-medium">Homepage Meta Description</label>
            <textarea className="input min-h-[80px]" value={settings['seo.metaDescription'] ?? ''} onChange={e => setSettings({ ...settings, 'seo.metaDescription': e.target.value })}/>
            <p className="mt-1 text-xs text-gray-500">150-160 characters. "RO service in Patna" keyword jarur daalo.</p>
          </div>
          {field('seo.metaKeywords', 'Global Keywords (comma separated)', 'text')}
        </CardContent>
      </Card>

      <Card className="border-orange-200 bg-orange-50">
        <CardContent className="flex gap-3 p-4">
          <AlertCircle className="h-5 w-5 shrink-0 text-orange-600 mt-0.5"/>
          <div className="text-sm text-orange-800">
            <strong>Important:</strong> Settings save karne ke baad 1-2 minute mein site pe reflect ho jayega. Agar nahi dikh raha to browser ka hard refresh karo (Ctrl+F5).
            Phone numbers change karne se navbar, footer, area pages, WhatsApp link sabme automatically change ho jayega.
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button size="lg" onClick={save} disabled={saving}>{saving ? <><Loader2 className="h-4 w-4 animate-spin mr-2"/>Saving...</> : <><Save className="h-4 w-4 mr-2"/>Save All Settings</>}</Button>
      </div>
    </div>
  );
}
