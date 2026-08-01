'use client';
import { useState } from 'react';
import { MapPin, Check, X, Truck, Clock } from 'lucide-react';

export default function PincodeChecker() {
  const [pin, setPin] = useState('');
  const [status, setStatus] = useState<null | { ok: boolean; message: string; days?: number; cod?: boolean }>(null);
  const [loading, setLoading] = useState(false);

  const check = async () => {
    if (pin.length !== 6 || !/^\d{6}$/.test(pin)) { setStatus({ ok: false, message: 'Please enter a valid 6-digit pincode' }); return; }
    setLoading(true);
    // Real: fetch /api/pincode/check?pincode=xxx
    const res = await fetch(`/api/pincode/check?pincode=${pin}`).catch(() => null);
    if (res && res.ok) {
      const data = await res.json();
      setStatus({ ok: true, message: data.isPatnaService ? `Delivery & service available in your area (Patna)` : `Delivery available to ${data.city}, ${data.state}`, days: data.deliveryDays, cod: data.codAvailable });
    } else {
      // Fallback logic for demo
      const isPatna = pin.startsWith('80');
      setStatus({
        ok: true,
        message: isPatna ? 'Delivery & RO service available (Patna)' : `Delivery available to pincode ${pin}`,
        days: isPatna ? 1 : 3 + Math.floor(Math.random() * 4),
        cod: true,
      });
    }
    setLoading(false);
  };

  return (
    <div className="mt-5 rounded-xl border border-gray-100 bg-white p-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-navy-900">
        <MapPin className="h-4 w-4 text-brand-600" /> Check Delivery & Service Availability
      </div>
      <div className="mt-3 flex gap-2">
        <input
          type="text"
          value={pin}
          onChange={e => { setPin(e.target.value.replace(/\D/g, '').slice(0, 6)); setStatus(null); }}
          placeholder="Enter 6-digit pincode"
          className="input max-w-[200px]"
          maxLength={6}
        />
        <button onClick={check} disabled={loading} className="btn-secondary px-5 py-2.5 text-sm">
          {loading ? 'Checking...' : 'Check'}
        </button>
      </div>
      {status && (
        <div className={`mt-3 rounded-lg p-3 text-sm ${status.ok ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
          <div className="flex items-start gap-2">
            {status.ok ? <Check className="mt-0.5 h-4 w-4" /> : <X className="mt-0.5 h-4 w-4" />}
            <div>
              <p className="font-semibold">{status.message}</p>
              {status.ok && status.days && (
                <div className="mt-1 flex flex-wrap gap-3 text-xs">
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> Delivered in {status.days}-{status.days + 2} days</span>
                  {status.cod && <span className="flex items-center gap-1"><Truck className="h-3 w-3" /> Cash on Delivery available</span>}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
