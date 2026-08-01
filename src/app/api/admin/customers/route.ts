import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !['ADMIN','SUPER_ADMIN'].includes((session.user as any)?.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q') || '';
    const take = Math.min(parseInt(searchParams.get('take') || '50'), 200);

    const where: any = { role: { in: ['CUSTOMER'] } };
    if (q) where.OR = [
      { name: { contains: q, mode: 'insensitive' } },
      { phone: { contains: q } },
      { email: { contains: q, mode: 'insensitive' } },
    ];

    const [total, users] = await prisma.$transaction([
      prisma.user.count({ where }),
      prisma.user.findMany({
        where, take, orderBy: { createdAt: 'desc' },
        select: {
          id: true, name: true, email: true, phone: true, role: true, createdAt: true,
          _count: { select: { orders: true, serviceRequests: true, reviews: true } },
        },
      }),
    ]);

    return NextResponse.json({ total, customers: users });
  } catch (e: any) {
    return NextResponse.json({ total: 0, customers: [], error: e.message });
  }
}
