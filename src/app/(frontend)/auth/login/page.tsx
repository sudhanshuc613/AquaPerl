'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Droplets, Mail, Lock, Phone, Home, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const callback = params.get('callbackUrl') || '/';
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [err, setErr] = useState('');
  const [form, setForm] = useState({ identifier: '', password: '' });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(''); setLoading(true);
    try {
      const res = await signIn('credentials', {
        email: form.identifier,
        phone: form.identifier,
        password: form.password,
        redirect: false,
        callbackUrl: callback,
      });
      if (res?.error) { setErr('Galat phone/email ya password'); setLoading(false); return; }
      toast.success('Login successful!');
      router.push(callback);
      router.refresh();
    } catch (e: any) { setErr(e?.message || 'Error'); setLoading(false); }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-gradient-to-br from-brand-50 via-white to-orange-50 p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardContent className="p-8">
          <div className="mb-6 text-center">
            <Link href="/" className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-aqua-gradient shadow-lg shadow-brand-500/30">
              <Droplets className="h-9 w-9 text-white" />
            </Link>
            <h1 className="text-2xl text-navy-900">Welcome back</h1>
            <p className="mt-1 text-sm text-gray-500">Login to track orders & view wishlist</p>
          </div>

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Email or Phone</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400"/>
                <Input className="pl-10" placeholder="10-digit mobile or email" value={form.identifier} onChange={e => setForm({...form, identifier: e.target.value})} required/>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400"/>
                <Input type={showPwd ? 'text' : 'password'} className="pl-10 pr-10" placeholder="Password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required/>
                <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-3 text-gray-400"><EyeOff className={`h-4 w-4 ${showPwd ? 'hidden' : 'block'}`}/><Eye className={`h-4 w-4 ${showPwd ? 'block' : 'hidden'}`}/></button>
              </div>
            </div>

            {err && <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700 flex items-start gap-2"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0"/>{err}</div>}

            <Button size="lg" className="w-full" type="submit" disabled={loading}>{loading ? 'Signing in...' : 'Sign In'}</Button>
          </form>

          <div className="mt-4 text-center text-sm text-gray-600">
            Naya account nahi hai? <Link href="/auth/register" className="font-semibold text-brand-600 hover:underline">Register karein</Link>
          </div>
          <div className="mt-4 rounded-lg bg-yellow-50 p-3 text-[11px] text-yellow-800">
            💡 <strong>Admin ho?</strong> Admin alag login se aata hai. Owner hi admin use kare.
          </div>
          <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
            <Link href="/" className="flex items-center gap-1 font-semibold text-brand-600 hover:underline"><Home className="h-3 w-3"/>Back to Home</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
