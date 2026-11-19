'use client';
import { usePathname } from 'next/navigation';
import PatnaServiceMap from './PatnaServiceMap';

/**
 * Har public page ke footer ke upar Patna service area strip.
 * /contact pe full map already hai — waha compact strip mat dikhao.
 * Admin/API/login/cart/checkout/track-order pages pe bhi nahi chahiye.
 */
export default function ServiceAreaFooter() {
  const pathname = usePathname() || '';

  // Pages jaha strip nahi dikhani:
  const HIDE_PATHS = [
    '/contact',   // contact pe already full map hai
    '/admin',     // admin panel
    '/login',     // login page
    '/api',       // API
    '/cart',      // cart/checkout — transaction flow me distract na kare
    '/checkout',
    '/track-order',
  ];

  if (HIDE_PATHS.some(p => pathname.startsWith(p))) return null;
  // Homepage pe full map already hai (page me add kar diya), to strip mat dikhao
  if (pathname === '/' || pathname === '') return null;
  return <PatnaServiceMap compact />;
}
