'use client';
import { useState } from 'react';
import { Phone, Send, MapPin, Wrench, Clock, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { PHONES, telLink, waLink } from '@/lib/utils';
import toast from 'react-hot-toast';

const issueTypes = [
  { label: 'New Installation', val: 'INSTALLATION' },
  { label: 'RO Repair', val: 'REPAIR' },
  { label: 'Filter Change', val: 'FILTER_CHANGE' },
  { label: 'Membrane Change', val: 'RO_MEMBRANE_CHANGE' },
  { label: 'RO Not Working', val: 'NOT_WORKING' },
  { label: 'Water Leakage', val: 'LEAKAGE' },
  { label: 'Low Pressure', val: 'LOW_WATER_PRESSURE' },
  { label: 'Bad Taste/Smell', val: 'BAD_TASTE' },
  { label: 'AMC Service', val: 'AMC' },
  { label: 'Other', val: 'OTHER' },
];

export default function ServiceQuickBook() {
  const [submitted, setSubmitted] = useState(false);
  const [ticket, setTicket] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '', phone: '', address: '', pincode: '',
    issue: 'REPAIR', description: '',
  });
  const [err, setErr] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(''); setLoading(true);
    try {
      if (!/^[0-9]{10}$/.test(form.phone)) throw new Error('10-digit mobile number daalo');
      if (!/^[0-9]{6}$/.test(form.pincode)) throw new Error('6-digit pincode daalo');
      if (form.address.length < 10) throw new Error('Pura address likho');

      const res = await fetch('/api/service-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: form.name,
          phone: form.phone,
          address: form.address,
          pincode: form.pincode,
          city: 'Patna',
          issueType: form.issue,
          issueDescription: form.description || 'Service request from homepage form',
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Submit nahi ho paya');
      setTicket(data);
      setSubmitted(true);
      toast.success('Service book ho gaya!');
    } catch (e: any) {
      setErr(e.message);
      toast.error(e.message);
    } finally { setLoading(false); }
  };

  if (submitted && ticket) {
    return (
      <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-white">
        <CardContent className="flex flex-col items-center gap-3 p-10 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-12 w-12 text-green-600" />
          </div>
          <h3 className="text-2xl text-navy-900">Booking Confirmed! ✅</h3>
          <p className="text-sm text-gray-500">Aapka ticket number</p>
          <p className="rounded-lg bg-green-100 px-4 py-2 font-mono text-lg font-bold text-green-800">{ticket.ticketNumber}</p>
          <p className="text-gray-700">Hum aapko <strong>{form.phone}</strong> pe 15 minute mein call karenge. Patna mein 2-4 ghante mein technician pohoch jayega.</p>
          <div className="mt-2 flex flex-wrap justify-center gap-2">
            <a href={waLink(PHONES.whatsapp, `Hi, meri RO service ticket ${ticket.ticketNumber} confirm hai. Name: ${form.name}`)} className="btn-whatsapp"><Send className="h-4 w-4"/>WhatsApp par confirm karein</a>
            <a href={telLink(PHONES.primary)} className="btn-navy"><Phone className="h-4 w-4"/>Abhi call karein</a>
          </div>
          <Button variant="outline" className="mt-2" onClick={() => { setSubmitted(false); setTicket(null); setForm({ name:'', phone:'', address:'', pincode:'', issue:'REPAIR', description:'' }); }}>
            Dusri booking karni hai
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <div className="space-y-5 lg:col-span-2">
        <div>
          <span className="inline-flex items-center gap-1 rounded-full bg-brand-100 px-3 py-1 text-xs font-bold text-brand-700"><Clock className="h-3 w-3"/> Same-Day Patna Service</span>
          <h2 className="mt-3">Book RO Service in Patna</h2>
          <p className="mt-2 text-gray-600">Expert technicians at your doorstep. Visit charge only <strong className="text-cta-orange">₹100</strong>. Genuine spare parts. 30-day service warranty.</p>
        </div>
        <div className="space-y-3">
          {[
            { icon: Wrench, title: 'Verified Technicians', desc: 'Background-verified, trained pros' },
            { icon: MapPin, title: 'All Patna Areas', desc: 'Boring Road, Kankarbagh, Danapur, Patna Sahib +more' },
            { icon: Clock, title: 'Same-Day Visit', desc: '4 PM se pehle book karein aaj ke liye' },
          ].map(f => (
            <div key={f.title} className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-100"><f.icon className="h-5 w-5 text-brand-600"/></div>
              <div><h4 className="font-semibold text-navy-900">{f.title}</h4><p className="text-sm text-gray-500">{f.desc}</p></div>
            </div>
          ))}
        </div>
        <div className="rounded-2xl bg-aqua-gradient p-5 text-white shadow-lg">
          <p className="text-sm opacity-90">Urgent hai? Seedha call karo:</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <a href={telLink(PHONES.primary)} className="inline-flex items-center gap-2 rounded-lg bg-white/20 px-4 py-2 font-bold backdrop-blur-sm hover:bg-white/30"><Phone className="h-4 w-4"/>{PHONES.primary}</a>
            <a href={waLink(PHONES.whatsapp)} className="btn-whatsapp px-4 py-2"><Send className="h-4 w-4"/>WhatsApp</a>
          </div>
        </div>
      </div>

      <Card className="lg:col-span-3">
        <CardContent className="p-6 md:p-8">
          <h3 className="text-xl">Quick Service Form</h3>
          <p className="mt-1 text-sm text-gray-500">Bharo, hum 15 minute mein call back karte hain.</p>
          <form onSubmit={handleSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
            <div><label className="mb-1 block text-sm font-medium">Aapka Naam *</label><Input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Ravi Kumar"/></div>
            <div><label className="mb-1 block text-sm font-medium">Mobile Number *</label><Input required type="tel" maxLength={10} value={form.phone} onChange={e => setForm({...form, phone: e.target.value.replace(/\D/g,'')})} placeholder="10-digit mobile"/></div>
            <div><label className="mb-1 block text-sm font-medium">Pincode *</label><Input required maxLength={6} value={form.pincode} onChange={e => setForm({...form, pincode: e.target.value.replace(/\D/g,'')})} placeholder="800001"/></div>
            <div><label className="mb-1 block text-sm font-medium">Service Type *</label>
              <select required className="input" value={form.issue} onChange={e => setForm({...form, issue: e.target.value})}>
                {issueTypes.map(t => <option key={t.val} value={t.val}>{t.label}</option>)}
              </select>
            </div>
            <div className="md:col-span-2"><label className="mb-1 block text-sm font-medium">Pura Address *</label><Input required value={form.address} onChange={e => setForm({...form, address: e.target.value})} placeholder="House no, Gali, Area, Patna"/></div>
            <div className="md:col-span-2"><label className="mb-1 block text-sm font-medium">Problem Detail (optional)</label>
              <textarea rows={3} className="input resize-none" value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="Kya problem hai thoda detail mein..."/>
            </div>
            {err && <div className="md:col-span-2 rounded-lg bg-red-50 p-2 text-sm text-red-700">{err}</div>}
            <div className="md:col-span-2">
              <Button type="submit" size="lg" className="w-full" disabled={loading}>
                {loading ? 'Booking...' : <><Wrench className="h-4 w-4"/> Book Service (₹100 Visit)</>}
              </Button>
              <p className="mt-2 text-center text-xs text-gray-400">Submit karte hi aapka ticket ban jayega. Technician confirm karega phone pe.</p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
