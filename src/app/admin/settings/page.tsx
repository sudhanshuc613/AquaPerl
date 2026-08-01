import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Save } from 'lucide-react';

export default function AdminSettings() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl text-navy-900">Site Settings</h1>
        <p className="text-sm text-gray-500">Configure contact info, payment keys, shipping rules & integrations</p>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Contact & Store Information</CardTitle></CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div><label className="text-sm font-medium">Primary Phone</label><Input defaultValue="8969821440"/></div>
          <div><label className="text-sm font-medium">Secondary Phone</label><Input defaultValue="9661288308"/></div>
          <div><label className="text-sm font-medium">WhatsApp Number</label><Input defaultValue="8969821440"/></div>
          <div><label className="text-sm font-medium">Support Email</label><Input defaultValue="support@rokadoctor.in"/></div>
          <div className="md:col-span-2"><label className="text-sm font-medium">Patna Office Address</label><Input defaultValue="Patna, Bihar, India"/></div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Shipping Rules</CardTitle></CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div><label className="text-sm font-medium">Free Shipping Above (₹)</label><Input defaultValue="999" type="number"/></div>
          <div><label className="text-sm font-medium">Standard Shipping (₹)</label><Input defaultValue="79" type="number"/></div>
          <div><label className="text-sm font-medium">Patna Same-Day Delivery</label><Input defaultValue="true" type="text"/></div>
          <div><label className="text-sm font-medium">Default Delivery Days (non-Patna)</label><Input defaultValue="4" type="number"/></div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Payment Gateway Keys</CardTitle></CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div><label className="text-sm font-medium">Razorpay Key ID</label><Input placeholder="rzp_live_..."/></div>
          <div><label className="text-sm font-medium">Razorpay Secret</label><Input type="password" placeholder="••••••••"/></div>
          <div><label className="text-sm font-medium">Stripe Publishable Key</label><Input/></div>
          <div><label className="text-sm font-medium">Stripe Secret</label><Input type="password"/></div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">WhatsApp & Notifications (Twilio/Meta)</CardTitle></CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div><label className="text-sm font-medium">Twilio Account SID</label><Input/></div>
          <div><label className="text-sm font-medium">Twilio Auth Token</label><Input type="password"/></div>
          <div><label className="text-sm font-medium">WhatsApp From Number</label><Input defaultValue="whatsapp:+14155238886"/></div>
          <div><label className="text-sm font-medium">SMTP Host (Email)</label><Input/></div>
        </CardContent>
      </Card>

      <div className="flex gap-3"><Button><Save className="h-4 w-4"/>Save Settings</Button></div>
    </div>
  );
}
