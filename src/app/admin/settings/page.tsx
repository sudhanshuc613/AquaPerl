'use client';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Save, Loader2, AlertCircle } from 'lucide-react';
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
    const res = await fetch('/api/admin/settings', { method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify(settings) });
    if (res.ok) toast.success('Settings saved! 2 minute mein site pe reflect ho jayega');
    else toast.error('Save nahi hua');
    setSaving(false);
  };

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
