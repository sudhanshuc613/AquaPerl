import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

// GET order status by order number OR phone (guest friendly)
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const orderNumber = searchParams.get('orderNumber')?.trim();
  const phone = searchParams.get('phone')?.trim().replace(/\D/g,'');

  if (!orderNumber && !phone) {
    return NextResponse.json({ error: 'Order number ya phone number daalo' }, { status: 400 });
  }

  const where: any = {};
  if (orderNumber) where.orderNumber = orderNumber.toUpperCase();
  if (phone) where.notes = { contains: phone };

  // If both given, use orderNumber + phone for security
  let orders;
  if (orderNumber && phone) {
    orders = await prisma.order.findMany({
      where: { orderNumber: orderNumber.toUpperCase() },
      include: { items: true },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });
    // filter orders where phone matches notes (since address snapshotted in notes)
    orders = orders.filter(o => o.notes?.includes(phone));
  } else if (orderNumber) {
    orders = await prisma.order.findMany({
      where: { orderNumber: orderNumber.toUpperCase() },
      include: { items: true },
      orderBy: { createdAt: 'desc' },
      take: 5,
    });
  } else {
    orders = await prisma.order.findMany({
      where: { notes: { contains: phone as string } },
      include: { items: true },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });
  }

  if (!orders.length) {
    return NextResponse.json({ error: 'Koi order nahi mila. Order number ya phone sahi se daalo.' }, { status: 404 });
  }

  return NextResponse.json({ orders: orders.map(sanitizePublic) });
}

// PATCH - update order status (ADMIN only)
export async function PATCH(req: Request) {
  const session: any = await getServerSession(authOptions as any);
  if (!session || !['ADMIN','SUPER_ADMIN'].includes(session?.user?.role)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { orderId, orderStatus, paymentStatus, trackingNumber, courierName, note } = body;
    if (!orderId) return NextResponse.json({ error: 'orderId required' }, { status: 400 });

    const data: any = {};
    if (orderStatus) data.orderStatus = orderStatus;
    if (paymentStatus) data.paymentStatus = paymentStatus;
    if (trackingNumber !== undefined) data.trackingNumber = trackingNumber;
    if (courierName !== undefined) data.courierName = courierName;

    const order = await prisma.order.update({
      where: { id: orderId },
      data: {
        ...data,
        ...(orderStatus === 'DELIVERED' ? { deliveredAt: new Date() } : {}),
        statusHistory: {
          create: orderStatus ? { status: orderStatus, note: note || `Status changed to ${orderStatus}`, updatedBy: session?.user?.id } : undefined,
        },
      },
      include: { items: true },
    });

    return NextResponse.json({ order: sanitizeAdmin(order) });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

function sanitizePublic(o: any) {
  return {
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
  };
}

function sanitizeAdmin(o: any) { return o; }
