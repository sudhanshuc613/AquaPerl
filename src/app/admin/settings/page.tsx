'use client';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Save, Loader2 } from 'lucide-react';
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
    if (res.ok) toast.success('Settings saved!');
    else toast.error('Save nahi hua');
    setSaving(false);
  };

  if (loading) return <div className="py-10 text-center"><Loader2 className="inline h-6 w-6 animate-spin"/></div>;

  const field = (key: string, label: string, type: string = 'text') => (
    <div>
      <label className="mb-1 block text-sm font-medium">{label}</label>
      <Input type={type} value={settings[key] ?? ''} onChange={e => setSettings({ ...settings, [key]: e.target.value })}/>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl text-navy-900">Site Settings</h1>
        <p className="text-sm text-gray-500">Yahan se phone number, brand name, prices change karo - site pe automatically reflect ho jayega.</p>
      </div>

      <Card>
        <CardHeader><CardTitle>Contact Information</CardTitle></CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          {field('contact.primaryPhone', 'Primary Phone Number', 'tel')}
          {field('contact.secondaryPhone', 'Secondary Phone Number', 'tel')}
          {field('contact.whatsapp', 'WhatsApp Number', 'tel')}
          {field('contact.email', 'Email Address', 'email')}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Brand</CardTitle></CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          {field('brand.name', 'Brand Name')}
          {field('brand.tagline', 'Tagline')}
          {field('brand.domain', 'Domain')}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Pricing (Patna Service)</CardTitle></CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          {field('service.visitCharge', 'Visit Charge (₹)', 'number')}
          {field('service.filterChange', 'Filter Change Price (₹)', 'number')}
          {field('service.fullService', 'Full Service / AMC Price (₹)', 'number')}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button size="lg" onClick={save} disabled={saving}>{saving ? <><Loader2 className="h-4 w-4 animate-spin"/>Saving...</> : <><Save className="h-4 w-4"/>Save Settings</>}</Button>
      </div>
    </div>
  );
}
