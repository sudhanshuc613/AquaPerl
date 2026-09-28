'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Check, CreditCard, Truck, ShieldCheck, MapPin, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/lib/store';
import toast from 'react-hot-toast';

const steps = ['Address', 'Delivery', 'Payment'];

export default function CheckoutPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const items = useCart(s => s.items);
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: '', phone: '', email: '', line1: '', line2: '', city: '', state: 'Bihar', pincode: '',
    payment: 'COD' as 'COD'|'UPI'|'NETBANKING',
  });
  const [loading, setLoading] = useState(false);

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const shipping = subtotal >= 500 ? 0 : 99;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="container-pad py-20 text-center">
        <h2>Cart khali hai</h2>
        <p className="mt-2 text-gray-500">Pehle products add karo checkout ke liye</p>
        <Link href="/categories/ro-purifiers"><Button className="mt-4">Browse Products</Button></Link>
      </div>
    );
  }

  const validateAddress = () => {
    if (!form.name || !form.phone || !form.line1 || !form.city || !form.state || !form.pincode) {
      toast.error('Saare required fields bharo (* wale)');
      return false;
    }
    if (!/^[0-9]{10}$/.test(form.phone)) { toast.error('10-digit phone daalo'); return false; }
    if (!/^[0-9]{6}$/.test(form.pincode)) { toast.error('6-digit pincode daalo'); return false; }
    return true;
  };

  const proceed = () => {
    if (step === 0 && !validateAddress()) return;
    if (step < 2) setStep(step + 1);
    else placeOrder();
  };

  const placeOrder = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(i => ({
            productId: i.productId, productName: i.name, productSlug: i.slug,
            image: i.image, quantity: i.quantity, unitPrice: i.price,
          })),
          address: { name: form.name, phone: form.phone, line1: form.line1, city: form.city, state: form.state, pincode: form.pincode },
          paymentMethod: form.payment,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      toast.success('Order place ho gaya!');
      router.push(`/checkout/success?order=${data.orderNumber}`);
    } catch (e: any) {
      toast.error(e.message);
      setLoading(false);
    }
  };

  return (
    <div className="container-pad py-8">
      <h1 className="mb-6">Checkout</h1>

      {!session && (
        <div className="mb-6 rounded-xl bg-orange-50 border border-orange-200 p-4 text-sm text-orange-800">
          💡 <strong>Tip:</strong> <Link href={`/auth/login?callbackUrl=/checkout`} className="font-bold underline">Login</Link> ya <Link href="/auth/register" className="font-bold underline">Register</Link> kar lo taaki order history save ho sake.
          Abhi guest checkout bhi ho jayega.
        </div>
      )}

      {/* Stepper */}
      <div className="mb-8 flex items-center justify-center gap-2 text-sm overflow-x-auto">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2 shrink-0">
            <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${i < step ? 'bg-green-600 text-white' : i === step ? 'bg-brand-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
              {i < step ? <Check className="h-4 w-4"/> : i + 1}
            </div>
            <span className={i === step ? 'font-bold text-navy-900' : 'text-gray-500'}>{s}</span>
            {i < steps.length - 1 && <div className={`h-0.5 w-8 md:w-12 ${i < step ? 'bg-green-600' : 'bg-gray-200'}`}/>}
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          {step === 0 && (
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 flex items-center gap-2 text-lg"><MapPin className="h-5 w-5 text-brand-500"/>Delivery Address</h3>
                <div className="grid gap-3 md:grid-cols-2">
                  <Input required placeholder="Full Name *" value={form.name} onChange={e => setForm({...form, name: e.target.value})}/>
                  <Input required placeholder="Phone * (10-digit)" maxLength={10} value={form.phone} onChange={e => setForm({...form, phone: e.target.value.replace(/\D/g,'')})}/>
                  <Input placeholder="Email (optional)" type="email" className="md:col-span-2" value={form.email} onChange={e => setForm({...form, email: e.target.value})}/>
                  <Input required placeholder="House/Street Address *" className="md:col-span-2" value={form.line1} onChange={e => setForm({...form, line1: e.target.value})}/>
                  <Input placeholder="Landmark / Area (optional)" className="md:col-span-2" value={form.line2} onChange={e => setForm({...form, line2: e.target.value})}/>
                  <Input required placeholder="Pincode *" maxLength={6} value={form.pincode} onChange={e => setForm({...form, pincode: e.target.value.replace(/\D/g,'')})}/>
                  <Input required placeholder="City *" value={form.city} onChange={e => setForm({...form, city: e.target.value})}/>
                  <Input required placeholder="State *" value={form.state} onChange={e => setForm({...form, state: e.target.value})}/>
                </div>
              </CardContent>
            </Card>
          )}
          {step === 1 && (
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 flex items-center gap-2 text-lg"><Truck className="h-5 w-5 text-brand-500"/>Delivery Method</h3>
                <div className="space-y-2">
                  <label className="flex cursor-pointer items-center justify-between rounded-xl border-2 border-brand-500 bg-brand-50 p-4">
                    <div>
                      <p className="font-semibold">Standard Delivery</p>
                      <p className="text-sm text-gray-500">3-7 business days • Pan India</p>
                    </div>
                    <span className="font-bold text-green-600">{subtotal >= 500 ? 'FREE' : formatPrice(99)}</span>
                  </label>
                  <div className="rounded-lg bg-blue-50 p-3 text-sm text-blue-800">
                    🚚 Patna local orders 24-hour delivery available. Free shipping on orders above ₹500.
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          {step === 2 && (
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 flex items-center gap-2 text-lg"><CreditCard className="h-5 w-5 text-brand-500"/>Payment Method</h3>
                <div className="space-y-2">
                  {[
                    { id: 'COD', title: 'Cash on Delivery (COD)', desc: 'Paise product milne pe de do', icon: '💵' },
                    { id: 'UPI', title: 'UPI / PhonePe / GPay / Paytm', desc: 'Instant payment', icon: '📱' },
                    { id: 'NETBANKING', title: 'Cards / Net Banking', desc: 'Debit/Credit card, all banks', icon: '💳' },
                  ].map((o: any) => (
                    <label key={o.id} className={`flex cursor-pointer items-start gap-3 rounded-xl border-2 p-4 ${form.payment===o.id?'border-brand-500 bg-brand-50':'border-gray-200'}`} onClick={() => setForm({...form, payment: o.id})}>
                      <div className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 shrink-0 ${form.payment===o.id?'border-brand-500':'border-gray-300'}`}>
                        {form.payment===o.id && <div className="h-2.5 w-2.5 rounded-full bg-brand-500"/>}
                      </div>
                      <span className="text-xl">{o.icon}</span>
                      <div>
                        <p className="font-semibold">{o.title}</p>
                        <p className="text-xs text-gray-500">{o.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
                <div className="mt-4 flex items-start gap-2 rounded-lg bg-green-50 p-3 text-sm text-green-800">
                  <Lock className="mt-0.5 h-4 w-4 shrink-0"/> Payment 100% secure hai. COD available hai bilkus tension free order karo.
                </div>
              </CardContent>
            </Card>
          )}
          <div className="flex gap-3">
            {step > 0 && <Button variant="outline" onClick={() => setStep(step-1)} disabled={loading}>Back</Button>}
            <Button size="lg" className="flex-1" onClick={proceed} disabled={loading}>
              {step === 2 ? `Place Order - ${formatPrice(total)}` : 'Continue'}
            </Button>
          </div>
        </div>

        <Card className="h-fit">
          <CardContent className="p-6">
            <h3 className="mb-4 font-bold">Order Summary ({items.length} items)</h3>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {items.map(i => (
                <div key={i.id} className="flex gap-3">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-gray-50">
                    {i.image ? <Image src={i.image} alt={i.name} fill sizes="56px" className="object-contain p-1" unoptimized={i.image.startsWith('data:')}/> : <div className="h-full w-full bg-gray-100"/>}
                  </div>
                  <div className="flex-1 min-w-0 text-sm">
                    <p className="line-clamp-2 font-medium">{i.name}</p>
                    <p className="text-xs text-gray-500">Qty: {i.quantity}</p>
                  </div>
                  <p className="text-sm font-bold shrink-0">{formatPrice(i.price * i.quantity)}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 space-y-2 border-t pt-4 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span>{formatPrice(subtotal)}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Shipping</span><span className={shipping ? '' : 'text-green-600 font-semibold'}>{shipping ? formatPrice(shipping) : 'FREE'}</span></div>
              {subtotal < 500 && <div className="rounded bg-amber-50 p-2 text-xs text-amber-700">Add {formatPrice(500 - subtotal)} more for FREE shipping!</div>}
              <div className="flex justify-between border-t pt-3 text-lg font-bold text-navy-900"><span>Total</span><span>{formatPrice(total)}</span></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
