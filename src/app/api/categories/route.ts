import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');
    const categories = await prisma.category.findMany({
      where: { isActive: true, ...(type ? { type: type as any } : {}) },
      include: { _count: { select: { products: true } } },
      orderBy: { sortOrder: 'asc' },
    });
    return NextResponse.json({ categories });
  } catch (e: any) {
    return NextResponse.json({ categories: [], error: e.message });
  }
}

// Auto-seed default categories if none exist
export async function POST(req: Request) {
  try {
    const defaults = [
      { name: 'RO Purifiers', slug: 'ro-purifiers', type: 'PRODUCT', sortOrder: 1 },
      { name: 'Domestic RO', slug: 'domestic-ro', type: 'PRODUCT', sortOrder: 2 },
      { name: 'UV/UF Purifiers', slug: 'uv-uf', type: 'PRODUCT', sortOrder: 3 },
      { name: 'Under-Sink RO', slug: 'under-sink', type: 'PRODUCT', sortOrder: 4 },
      { name: 'Wall-Mount RO', slug: 'wall-mount', type: 'PRODUCT', sortOrder: 5 },
      { name: 'Spare Parts', slug: 'spare-parts', type: 'PRODUCT', sortOrder: 10 },
      { name: 'RO Membranes', slug: 'ro-membranes', type: 'PRODUCT', sortOrder: 11 },
      { name: 'Filters', slug: 'filters', type: 'PRODUCT', sortOrder: 12 },
      { name: 'UV Lamps', slug: 'uv-lamps', type: 'PRODUCT', sortOrder: 13 },
      { name: 'Pumps & Motors', slug: 'pumps', type: 'PRODUCT', sortOrder: 14 },
      { name: 'Connectors & Pipes', slug: 'connectors', type: 'PRODUCT', sortOrder: 15 },
      { name: 'Accessories', slug: 'accessories', type: 'PRODUCT', sortOrder: 16 },
      { name: 'Commercial Plants', slug: 'commercial-plants', type: 'PRODUCT', sortOrder: 20 },
      { name: '50 LPH Plants', slug: '50-lph', type: 'PRODUCT', sortOrder: 21 },
      { name: '100 LPH Plants', slug: '100-lph', type: 'PRODUCT', sortOrder: 22 },
      { name: '250+ LPH Plants', slug: '250-lph', type: 'PRODUCT', sortOrder: 23 },
      { name: 'Industrial RO', slug: 'industrial', type: 'PRODUCT', sortOrder: 24 },
    ] as const;
    for (const c of defaults) {
      await prisma.category.upsert({ where: { slug: c.slug }, create: c as any, update: {} });
    }
    return NextResponse.json({ success: true, count: defaults.length });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
