import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

async function isAdmin() {
  const session = await getServerSession(authOptions);
  return !!(session && ['ADMIN','SUPER_ADMIN'].includes((session.user as any)?.role));
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const body = await req.json();
    const data: any = {};
    for (const key of ['name','slug','sku','shortDescription','description','type','metaTitle','metaDescription']) {
      if (body[key] !== undefined) data[key] = body[key];
    }
    for (const key of ['price','compareAtPrice','costPrice','weight']) {
      if (body[key] !== undefined && body[key] !== '') data[key] = Number(body[key]);
      else if (body[key] === '') data[key] = null;
    }
    for (const key of ['stockQty','warrantyMonths']) {
      if (body[key] !== undefined) data[key] = Number(body[key]);
    }
    for (const key of ['isActive','isFeatured','isCommercial']) {
      if (body[key] !== undefined) data[key] = !!body[key];
    }
    if (body.categoryId) data.categoryId = body.categoryId;
    if (body.brandId !== undefined) data.brandId = body.brandId || null;
    if (Array.isArray(body.metaKeywords)) data.metaKeywords = body.metaKeywords;

    const product = await prisma.product.update({ where: { id: params.id }, data });
    return NextResponse.json(product);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // Soft delete: mark inactive (safer)
    await prisma.product.update({ where: { id: params.id }, data: { isActive: false } });
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
