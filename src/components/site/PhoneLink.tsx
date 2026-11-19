'use client';
import { useSetting } from '@/components/providers/SettingsProvider';
import { PHONES as DEFAULTS, waLink, telLink } from '@/lib/utils';

/**
 * Admin-editable tel: link.
 * Kind: 'primary' | 'secondary' | 'whatsapp'
 * Sab jagah isko use karo — Navbar, Footer, Sticky bar, CTA buttons.
 */
export function TelLink({
  kind = 'primary',
  children,
  className = '',
  ...rest
}: {
  kind?: 'primary'|'secondary'|'whatsapp';
  children: React.ReactNode;
  className?: string;
  [k: string]: any;
}) {
  const phone = useSetting(`contact.${kind}Phone`, DEFAULTS[kind]);
  return (
    <a href={telLink(String(phone))} className={className} {...rest}>{children}</a>
  );
}

export function WaLink({
  message = 'Hi, RO service chahiye Patna mein',
  children,
  className = '',
  ...rest
}: {
  message?: string;
  children: React.ReactNode;
  className?: string;
  [k: string]: any;
}) {
  const phone = useSetting('contact.whatsapp', DEFAULTS.whatsapp);
  return (
    <a href={waLink(String(phone), message)} target="_blank" rel="noopener noreferrer" className={className} {...rest}>
      {children}
    </a>
  );
}

/** Plain phone number display (no link) */
export function PhoneText({ kind = 'primary', className = '' }: { kind?: 'primary'|'secondary'|'whatsapp', className?: string }) {
  const phone = useSetting(`contact.${kind}Phone`, DEFAULTS[kind]);
  // Format: 924 153 6586
  const raw = String(phone).replace(/\D/g, '');
  const fmt = raw.length === 10 ? `${raw.slice(0,3)} ${raw.slice(3,6)} ${raw.slice(6)}` : raw;
  return <span className={className}>{fmt}</span>;
}

/** Visit charge display (₹200) */
export function VisitCharge({ className = '' }: { className?: string }) {
  const v = useSetting('service.visitCharge', 200);
  return <span className={className}>₹{Number(v) || 200}</span>;
}
