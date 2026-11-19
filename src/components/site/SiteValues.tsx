'use client';
import { useSetting } from '@/components/providers/SettingsProvider';
import { PHONES as DEFAULTS } from '@/lib/utils';

/**
 * Admin-editable phone display.
 * Key = 'primary' | 'secondary' | 'whatsapp'
 * Server pe DB se fetch hoga, default se fallback karega.
 */
export function SitePhone({ kind = 'primary', className = '' }: { kind?: 'primary'|'secondary'|'whatsapp', className?: string }) {
  const val = useSetting(`contact.${kind}Phone`, DEFAULTS[kind]);
  return <span className={className}>{String(val).replace(/\D/g, '').replace(/^(\d{3})(\d{3})(\d{4})$/, '$1 $2 $3')}</span>;
}

export function SitePhoneRaw({ kind = 'primary' }: { kind?: 'primary'|'secondary'|'whatsapp' }) {
  const val = useSetting(`contact.${kind}Phone`, DEFAULTS[kind]);
  return String(val);
}

export function SitePrice({ serviceKey, fallback }: { serviceKey: string, fallback: number }) {
  // serviceKey e.g. 'visitCharge', 'membraneChange'
  const val = useSetting(`service.${serviceKey}`, fallback);
  const n = Number(val) || fallback;
  return <>₹{n.toLocaleString('en-IN')}</>;
}

export function SiteAmc({ plan, fallback }: { plan: 'basic'|'silver'|'gold', fallback: number }) {
  const val = useSetting(`amc.${plan}`, fallback);
  const n = Number(val) || fallback;
  return <>₹{n.toLocaleString('en-IN')}</>;
}
