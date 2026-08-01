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
    const status = searchParams.get('status');
    const q = searchParams.get('q') || '';
    const take = 50;

    const where: any = {};
    if (status) where.orderStatus = status;
    if (q) where.OR = [
      { orderNumber: { contains: q, mode: 'insensitive' } },
      { address: { recipient: { contains: q, mode: 'insensitive' } } },
      { address: { phone: { contains: q } } },
    ];

    const [total, orders, revenue] = await prisma.$transaction([
      prisma.order.count({ where }),
      prisma.order.findMany({
        where, take, orderBy: { createdAt: 'desc' },
        include: {
          items: true,
          address: true,
          user: { select: { name: true, email: true, phone: true } },
        },
      }),
      prisma.order.aggregate({
        _sum: { totalAmount: true },
        where: { orderStatus: { not: 'CANCELLED' } },
      }),
    ]);

    return NextResponse.json({ total, orders, totalRevenue: Number(revenue._sum.totalAmount) || 0 });
  } catch (e: any) {
    return NextResponse.json({ total: 0, orders: [], totalRevenue: 0, error: e.message });
  }
}
