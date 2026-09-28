import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Public product API - homepage, PLP, search use this
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const take = Math.min(parseInt(searchParams.get('take') || '12'), 50);
    const page = parseInt(searchParams.get('page') || '1');
    const categorySlug = searchParams.get('category') || '';
    const q = searchParams.get('q') || '';

    const where: any = { isActive: true };
    if (categorySlug) {
      // Match category by slug OR parent category slug
      where.OR = [
        { category: { slug: categorySlug } },
        { category: { parent: { slug: categorySlug } } },
      ];
    }
    if (q) where.AND = [{ name: { contains: q, mode: 'insensitive' } }];

    const products = await prisma.product.findMany({
      where,
      take, skip: (page - 1) * take,
      orderBy: [{ isFeatured: 'desc' }, { createdAt: 'desc' }],
      include: {
        images: { orderBy: { sortOrder: 'asc' } },
        brand: { select: { name: true, slug: true } },
        category: { select: { name: true, slug: true } },
      },
    });

    return NextResponse.json({
      products: products.map(p => ({
        id: p.id, name: p.name, slug: p.slug,
        price: Number(p.price), compareAtPrice: p.compareAtPrice ? Number(p.compareAtPrice) : null,
        primaryImage: (p.images.find(i => i.isPrimary) || p.images[0])?.url || null,
        brand: p.brand, avgRating: Number(p.avgRating) || 4.5,
        reviewCount: p.reviewCount || 0, isCommercial: p.isCommercial,
      })),
      page, take,
    });
  } catch (e: any) {
    return NextResponse.json({ products: [], error: e.message });
  }
}
