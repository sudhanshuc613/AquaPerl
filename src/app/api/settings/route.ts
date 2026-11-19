import { NextResponse } from 'next/server';
import { getAllSettings } from '@/lib/settings';

/**
 * Public settings endpoint (no auth required).
 * Sirf wohi keys expose karta hai jo frontend pe chahiye — contact, pricing, hero, brand.
 * Admin/SEO secrets nahi deta.
 */
const PUBLIC_KEY_PREFIXES = ['contact.', 'service.', 'amc.', 'hero.', 'brand.'];

export async function GET() {
  try {
    const all = await getAllSettings();
    const pub: Record<string, any> = {};
    for (const k of Object.keys(all)) {
      if (PUBLIC_KEY_PREFIXES.some(p => k.startsWith(p))) pub[k] = all[k];
    }
    return NextResponse.json(pub, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export const revalidate = 60;
