'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Droplets, Phone, Lock, User, Home, Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [err, setErr] = useState('');
  const [form, setForm] = useState({ name: '', phone: '', email: '', password: '' });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(''); setLoading(true);
    try {
      if (!/^[0-9]{10}$/.test(form.phone)) { setErr('10-digit mobile number daalo'); setLoading(false); return; }
      if (form.password.length < 6) { setErr('Password minimum 6 characters ka hona chahiye'); setLoading(false); return; }

      const res = await fetch('/api/auth/register', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Registration fail');

      toast.success('Account ban gaya! Ab login kar rahe hain...');
      const signinRes = await signIn('credentials', { phone: form.phone, email: form.email, password: form.password, redirect: false });
      if (signinRes?.ok) { router.push('/'); router.refresh(); }
      else router.push('/auth/login');
    } catch (e: any) { setErr(e.message); setLoading(false); }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-gradient-to-br from-brand-50 via-white to-orange-50 p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardContent className="p-8">
          <div className="mb-6 text-center">
            <Link href="/" className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-aqua-gradient shadow-lg shadow-brand-500/30">
              <Droplets className="h-9 w-9 text-white"/>
            </Link>
            <h1 className="text-2xl text-navy-900">Create Account</h1>
            <p className="mt-1 text-sm text-gray-500">AquaNexa pe apna account banayein - orders track karein, offers paayein</p>
          </div>

          <form onSubmit={submit} className="space-y-3">
            <div>
              <label className="mb-1 block text-sm font-medium">Full Name *</label>
              <div className="relative"><User className="absolute left-3 top-3 h-4 w-4 text-gray-400"/><Input className="pl-10" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Apna naam"/></div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Mobile Number *</label>
              <div className="relative"><Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400"/><Input className="pl-10" required type="tel" maxLength={10} value={form.phone} onChange={e => setForm({...form, phone: e.target.value.replace(/\D/g,'')})} placeholder="10-digit mobile"/></div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Email (optional)</label>
              <Input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="you@email.com"/>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Password * (min 6 chars)</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400"/>
                <Input type={showPwd ? 'text' : 'password'} className="pl-10 pr-10" required value={form.password} onChange={e => setForm({...form, password: e.target.value})} placeholder="Password"/>
                <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-3 text-gray-400">{showPwd ? <Eye className="h-4 w-4"/> : <EyeOff className="h-4 w-4"/>}</button>
              </div>
            </div>

            {err && <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700 flex items-start gap-2"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0"/>{err}</div>}

            <Button size="lg" className="w-full" type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create Account'}</Button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            Pehle se account hai? <Link href="/auth/login" className="font-semibold text-brand-600 hover:underline">Sign in</Link>
          </p>
          <div className="mt-4 flex items-center justify-center text-xs text-gray-500">
            <Link href="/" className="flex items-center gap-1 font-semibold text-brand-600 hover:underline"><Home className="h-3 w-3"/>Back to Home</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
