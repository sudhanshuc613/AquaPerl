import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import slugify from 'slugify';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

async function getDefaultCategoryId(): Promise<string> {
  let def = await prisma.category.findFirst({ where: { slug: 'ro-purifiers' } }) ?? await prisma.category.findFirst();
  if (!def) {
    def = await prisma.category.create({ data: { name: 'RO Purifiers', slug: 'ro-purifiers', type: 'PRODUCT' } });
  }
  return def.id;
}

async function resolveCategoryId(input: string | undefined): Promise<string> {
  if (!input) return getDefaultCategoryId();
  const s = String(input).trim();
  const isUuid = /^c[a-z0-9]{20,}$/i.test(s) || /^[0-9a-f-]{36}$/i.test(s); // cuid/uuid
  if (isUuid) {
    const found = await prisma.category.findUnique({ where: { id: s } }).catch(() => null);
    if (found) return found.id;
  }
  const bySlug = await prisma.category.findUnique({ where: { slug: s.toLowerCase() } });
  if (bySlug) return bySlug.id;
  // Create new category from slug/name
  const slug = s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || `cat-${Date.now()}`;
  const name = s.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const created = await prisma.category.create({ data: { name, slug, type: 'PRODUCT' } });
  return created.id;
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !['ADMIN', 'SUPER_ADMIN'].includes((session.user as any)?.role)) {
      return NextResponse.json({ error: 'Unauthorized - login fir se karo' }, { status: 401 });
    }
    const data = await req.json();
    if (!data.name || !data.sku || !data.price) {
      return NextResponse.json({ error: 'Name, SKU, Price zaroori hai' }, { status: 400 });
    }

    const categoryId = await resolveCategoryId(data.categoryId);

    const baseSlug = slugify(String(data.name), { lower: true, strict: true });
    const existing = await prisma.product.findUnique({ where: { slug: baseSlug } });
    const slug = existing ? `${baseSlug}-${Date.now()}` : baseSlug;

    const rawImages: any[] = Array.isArray(data.images) ? data.images : [];
    if (data.imageUrl && typeof data.imageUrl === 'string' && data.imageUrl.startsWith('http')) {
      rawImages.unshift({ url: data.imageUrl, isPrimary: true });
    }
    const images = rawImages
      .filter((i: any) => i && (typeof i === 'string' ? i.startsWith('http') || i.startsWith('data:') : (i.url && (i.url.startsWith('http') || i.url.startsWith('data:')))))
      .map((i: any, idx: number) => ({
        url: typeof i === 'string' ? i : i.url,
        alt: typeof i === 'object' && i.alt ? i.alt : data.name,
        isPrimary: idx === 0 ? true : !!(typeof i === 'object' && i.isPrimary),
        sortOrder: idx,
      }));

    const product = await prisma.product.create({
      data: {
        name: String(data.name),
        slug,
        sku: String(data.sku),
        shortDescription: data.shortDescription || String(data.description || '').slice(0, 160),
        description: data.description || null,
        categoryId,
        brandId: data.brandId && data.brandId !== '' ? String(data.brandId) : undefined,
        type: (data.type as any) || 'RO_PURIFIER',
        price: Number(data.price),
        compareAtPrice: data.compareAtPrice ? Number(data.compareAtPrice) : null,
        stockQty: Number(data.stockQty) || 0,
        weight: data.weight ? Number(data.weight) : null,
        isActive: data.isActive !== false,
        isFeatured: !!data.isFeatured,
        isCommercial: !!data.isCommercial,
        warrantyMonths: Number(data.warrantyMonths) || 12,
        metaKeywords: Array.isArray(data.metaKeywords) ? data.metaKeywords : [],
        images: images.length ? { create: images } : undefined,
      },
    });
    return NextResponse.json(product, { status: 201 });
  } catch (e: any) {
    console.error('Product create error:', e);
    return NextResponse.json({ error: e?.message || 'Kuch galat hua' }, { status: 400 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const q = searchParams.get('q') || '';
    const take = 50;
    const where: any = { ...(q ? { OR: [{ name: { contains: q, mode: 'insensitive' } }, { sku: { contains: q, mode: 'insensitive' } }] } : {}) };
    const [total, products] = await prisma.$transaction([
      prisma.product.count({ where }),
      prisma.product.findMany({
        where, take, skip: (page - 1) * take, orderBy: { createdAt: 'desc' },
        include: { category: { select: { name: true, slug: true, id: true } }, brand: { select: { name: true } }, images: { orderBy: { sortOrder: 'asc' } } },
      }),
    ]);
    return NextResponse.json({ total, page, products });
  } catch (e: any) {
    return NextResponse.json({ total: 0, page: 1, products: [], error: e.message });
  }
}
