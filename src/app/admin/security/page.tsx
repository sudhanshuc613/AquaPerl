'use client';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Lock, Eye, EyeOff, Loader2, Shield, CheckCircle2, AlertCircle, Key } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminSecurity() {
  const [oldPwd, setOldPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);

  const strength = (() => {
    let s = 0;
    if (newPwd.length >= 6) s++;
    if (newPwd.length >= 10) s++;
    if (/[A-Z]/.test(newPwd)) s++;
    if (/[0-9]/.test(newPwd)) s++;
    if (/[^A-Za-z0-9]/.test(newPwd)) s++;
    return s; // 0-5
  })();
  const strengthLabel = ['बहुत कमज़ोर', 'कमज़ोर', 'ठीक', 'अच्छा', 'मज़बूत', 'बहुत मज़बूत'][strength];
  const strengthColor = ['bg-red-500', 'bg-red-400', 'bg-yellow-400', 'bg-lime-500', 'bg-green-500', 'bg-emerald-600'][strength];

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setDone(false);
    if (newPwd !== confirmPwd) { toast.error('Naya password aur confirm password same hona chahiye'); return; }
    if (newPwd.length < 6) { toast.error('Password 6 characters se lamba hona chahiye'); return; }
    setSaving(true);
    try {
      const res = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ oldPassword: oldPwd, newPassword: newPwd }),
      });
      const d = await res.json();
      if (!res.ok) { toast.error(d.error || 'Kuch galat hua'); return; }
      toast.success(d.message || 'Password change ho gaya!');
      setDone(true);
      setOldPwd(''); setNewPwd(''); setConfirmPwd('');
    } catch (e: any) {
      toast.error('Error: ' + e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl text-navy-900 flex items-center gap-2">
          <Shield className="h-6 w-6 text-brand-600" /> Security & Password
        </h1>
        <p className="text-sm text-gray-500">Yahan se apna admin password change karo. Koi aur access nahi kar payega.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Key className="h-5 w-5"/> Change Admin Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Purana Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input type={showOld ? 'text' : 'password'} className="pl-10 pr-10" placeholder="Purana password daalo" value={oldPwd} onChange={e=>setOldPwd(e.target.value)} required />
                <button type="button" onClick={()=>setShowOld(!showOld)} className="absolute right-3 top-3 text-gray-400 hover:text-gray-700">
                  {showOld ? <EyeOff className="h-4 w-4"/> : <Eye className="h-4 w-4"/>}
                </button>
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Naya Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input type={showNew ? 'text' : 'password'} className="pl-10 pr-10" placeholder="Naya strong password (min 6 chars)" value={newPwd} onChange={e=>setNewPwd(e.target.value)} required />
                <button type="button" onClick={()=>setShowNew(!showNew)} className="absolute right-3 top-3 text-gray-400 hover:text-gray-700">
                  {showNew ? <EyeOff className="h-4 w-4"/> : <Eye className="h-4 w-4"/>}
                </button>
              </div>
              {newPwd && (
                <div className="mt-2">
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(i => (
                      <div key={i} className={`h-1.5 flex-1 rounded ${i <= strength ? strengthColor : 'bg-gray-200'}`} />
                    ))}
                  </div>
                  <p className="mt-1 text-xs text-gray-500">Password strength: <strong>{strengthLabel}</strong></p>
                </div>
              )}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Naya Password (Confirm)</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input type="password" className="pl-10" placeholder="Naya password fir se daalo" value={confirmPwd} onChange={e=>setConfirmPwd(e.target.value)} required />
              </div>
              {confirmPwd && newPwd !== confirmPwd && (
                <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle className="h-3 w-3"/> Password match nahi ho raha</p>
              )}
            </div>

            {done && (
              <div className="rounded-lg bg-green-50 p-3 text-sm text-green-800 flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                <div>
                  <strong>Password successfully change ho gaya!</strong>
                  <p className="mt-0.5 text-xs">Agla login naye password se karna. Purana password ab kaam nahi karega.</p>
                </div>
              </div>
            )}

            <div className="rounded-lg bg-blue-50 p-3 text-xs text-blue-800">
              <strong>Tip:</strong> Strong password mein capital letter, number, aur ek special character (!@#) daalo taaki koi hack na kar sake.
            </div>

            <Button size="lg" type="submit" disabled={saving} className="w-full">
              {saving ? <><Loader2 className="h-4 w-4 animate-spin mr-2"/> Changing...</> : <>🔐 Update Password</>}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Session Info</CardTitle></CardHeader>
        <CardContent className="text-sm text-gray-600 space-y-1">
          <p>✅ Login session <strong>30 din</strong> tak active rehta hai</p>
          <p>✅ 24 ghante mein token auto-refresh hota hai (logout nahi hoga)</p>
          <p>✅ Sirf ADMIN role wale hi is panel ko access kar sakte hain</p>
          <p>⚠️ Password change karne ke baad purane sessions khulenege — next time login naya password se hoga</p>
        </CardContent>
      </Card>
    </div>
  );
}
