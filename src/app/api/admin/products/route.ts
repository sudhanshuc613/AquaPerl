import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import slugify from 'slugify';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

// Helper: ensure a default category exists and return its id
async function getDefaultCategoryId(): Promise<string> {
  let def = await prisma.category.findFirst({ where: { slug: 'ro-purifiers' } })
         ?? await prisma.category.findFirst();
  if (!def) {
    def = await prisma.category.create({
      data: { name: 'RO Purifiers', slug: 'ro-purifiers', type: 'PRODUCT' },
    });
  }
  return def.id;
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !['ADMIN', 'SUPER_ADMIN'].includes((session.user as any)?.role)) {
      return NextResponse.json({ error: 'Unauthorized - please login again' }, { status: 401 });
    }
    const data = await req.json();
    if (!data.name || !data.sku || !data.price) {
      return NextResponse.json({ error: 'Name, SKU, aur Price zaroori hai' }, { status: 400 });
    }

    let categoryId = data.categoryId;
    if (!categoryId) categoryId = await getDefaultCategoryId();
    else {
      // If categoryId is a slug (not cuid), resolve or create
      const exists = await prisma.category.findUnique({ where: { id: categoryId } }).catch(() => null);
      if (!exists) {
        const bySlug = await prisma.category.findUnique({ where: { slug: categoryId } });
        if (bySlug) categoryId = bySlug.id;
        else {
          const created = await prisma.category.create({
            data: { name: categoryId.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase()), slug: categoryId, type: 'PRODUCT' },
          });
          categoryId = created.id;
        }
      }
    }

    const baseSlug = slugify(String(data.name), { lower: true, strict: true });
    const existing = await prisma.product.findUnique({ where: { slug: baseSlug } });
    const slug = existing ? `${baseSlug}-${Date.now()}` : baseSlug;

    // Normalise images: accept string (URL) or object {url,isPrimary}; skip any non-url/empty
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
        metaTitle: data.metaTitle || null,
        metaDescription: data.metaDescription || null,
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
    const where: any = {
      ...(q ? { OR: [{ name: { contains: q, mode: 'insensitive' } }, { sku: { contains: q, mode: 'insensitive' } }] } : {}),
    };
    const [total, products] = await prisma.$transaction([
      prisma.product.count({ where }),
      prisma.product.findMany({
        where, take, skip: (page - 1) * take,
        orderBy: { createdAt: 'desc' },
        include: {
          category: { select: { name: true, slug: true } },
          brand: { select: { name: true } },
          images: { orderBy: { sortOrder: 'asc' } },
        },
      }),
    ]);
    return NextResponse.json({ total, page, products });
  } catch (e: any) {
    console.error('Product GET error:', e);
    return NextResponse.json({ total: 0, page: 1, products: [], error: e.message });
  }
}
