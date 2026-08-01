'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Droplets, Mail, Lock, Eye, EyeOff, AlertCircle, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const params = useSearchParams();
  const callback = params.get('callbackUrl') || '/admin/dashboard';
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [err, setErr] = useState('');
  const [form, setForm] = useState({ identifier: '', password: '' });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr('');
    setLoading(true);
    try {
      const res = await signIn('credentials', {
        email: form.identifier,
        phone: form.identifier,
        password: form.password,
        redirect: false,
        callbackUrl: callback,
      });
      if (res?.error) {
        setErr('Galat email ya password. Admin bana hai? Neeche "Setup Admin" button se pehle banao.');
        setLoading(false);
        return;
      }
      if (res?.ok) {
        toast.success('Login successful!');
        // Hard redirect to admin dashboard
        window.location.href = '/admin/dashboard';
      }
    } catch (e: any) {
      setErr(e?.message || 'Kuch error aaya');
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-gradient-to-br from-brand-50 via-white to-navy-50 p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardContent className="p-8">
          <div className="mb-6 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-aqua-gradient shadow-lg shadow-brand-500/30">
              <Droplets className="h-9 w-9 text-white" />
            </div>
            <h1 className="mt-4 text-2xl text-navy-900">Admin Login</h1>
            <p className="mt-1 text-sm text-gray-500">Sirf admin ke liye. Normal users homepage pe shopping kar sakte hain.</p>
          </div>

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input className="pl-10" placeholder="admin@rokadoctor.in" value={form.identifier} onChange={e => setForm({...form, identifier: e.target.value})} required />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input type={showPwd ? 'text' : 'password'} className="pl-10 pr-10" placeholder="admin password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required />
                <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-3 text-gray-400 hover:text-gray-700">
                  {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {err && (
              <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700 flex items-start gap-2">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                {err}
              </div>
            )}

            <Button size="lg" className="w-full" type="submit" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In to Dashboard'}
            </Button>
          </form>

          <div className="mt-4 rounded-lg bg-brand-50 p-3 text-xs text-brand-800">
            <p className="font-semibold">Pehli dafa? Admin user banao:</p>
            <p className="mt-1">Naya browser tab khol ke yeh URL open karo:
              <code className="mt-1 block rounded bg-white px-2 py-1 font-mono text-[11px] break-all">
                /api/setup-admin
              </code>
            </p>
            <p className="mt-2">Uske baad yahaan <strong>admin@rokadoctor.in</strong> / <strong>admin@123</strong> se login karo.</p>
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
            <Link href="/" className="flex items-center gap-1 font-semibold text-brand-600 hover:underline">
              <Home className="h-3 w-3" /> Back to Home (public)
            </Link>
            <Link href="/" className="text-gray-400 hover:text-brand-600">AquaNexa Home</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
