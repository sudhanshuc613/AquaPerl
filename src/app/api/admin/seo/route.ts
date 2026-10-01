import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

async function isAdmin() {
  try {
    const session: any = await getServerSession(authOptions as any);
    return session && ['ADMIN','SUPER_ADMIN'].includes(session?.user?.role);
  } catch { return false; }
}

export async function GET() {
  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const rows = await prisma.seoMeta.findMany({ orderBy: { pagePath: 'asc' } });
  return NextResponse.json({ items: rows });
}

export async function POST(req: Request) {
  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const { pagePath, metaTitle, metaDescription, metaKeywords, ogImage } = await req.json();
    if (!pagePath || !metaTitle) return NextResponse.json({ error: 'pagePath and metaTitle required' }, { status: 400 });
    const keywords = typeof metaKeywords === 'string'
      ? metaKeywords.split(',').map((k: string) => k.trim()).filter(Boolean)
      : Array.isArray(metaKeywords) ? metaKeywords : [];

    const saved = await prisma.seoMeta.upsert({
      where: { pagePath },
      create: { pagePath, metaTitle, metaDescription: metaDescription || '', metaKeywords: keywords, ogImage },
      update: { metaTitle, metaDescription: metaDescription || '', metaKeywords: keywords, ogImage },
    });
    return NextResponse.json({ ok: true, item: saved });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { searchParams } = new URL(req.url);
  const pagePath = searchParams.get('pagePath');
  if (!pagePath) return NextResponse.json({ error: 'pagePath required' }, { status: 400 });
  await prisma.seoMeta.delete({ where: { pagePath } }).catch(() => {});
  return NextResponse.json({ ok: true });
}
