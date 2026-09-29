import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const orderNumber = searchParams.get('orderNumber')?.trim();
  const phone = searchParams.get('phone')?.trim().replace(/\D/g,'');

  if (!orderNumber && !phone) {
    return NextResponse.json({ error: 'Order number ya phone number daalo' }, { status: 400 });
  }

  try {
    let orders: any[] = [];

    if (orderNumber && phone) {
      // Find by order number, then ensure phone matches (phone is inside notes as snapshot)
      const found = await prisma.order.findMany({
        where: { orderNumber: orderNumber.toUpperCase() },
        include: { items: true },
        orderBy: { createdAt: 'desc' },
        take: 5,
      });
      orders = found.filter(o => o.notes?.includes(phone));
    } else if (orderNumber) {
      orders = await prisma.order.findMany({
        where: { orderNumber: orderNumber.toUpperCase() },
        include: { items: true },
        orderBy: { createdAt: 'desc' },
        take: 5,
      });
    } else if (phone) {
      // Lookup by phone in notes (since orders are created with address snapshot in notes)
      orders = await prisma.order.findMany({
        where: { notes: { contains: phone } },
        include: { items: true },
        orderBy: { createdAt: 'desc' },
        take: 10,
      });
    }

    return NextResponse.json({
      orders: orders.map(o => ({
        id: o.id,
        orderNumber: o.orderNumber,
        orderStatus: o.orderStatus,
        paymentStatus: o.paymentStatus,
        totalAmount: o.totalAmount,
        paymentMethod: o.paymentMethod,
        trackingNumber: o.trackingNumber,
        courierName: o.courierName,
        estimatedDelivery: o.estimatedDelivery,
        deliveredAt: o.deliveredAt,
        createdAt: o.createdAt,
        items: (o.items || []).map((i: any) => ({
          productName: i.productName,
          quantity: i.quantity,
          totalPrice: i.totalPrice,
          image: i.image,
        })),
        addressSnapshot: o.notes || '',
      })),
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
