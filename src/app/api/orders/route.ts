import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import { generateOrderNumber } from '@/lib/utils';
import { z } from 'zod';

const itemSchema = z.object({
  productId: z.string(),
  productName: z.string(),
  productSlug: z.string(),
  image: z.string().optional().nullable(),
  quantity: z.number().min(1),
  unitPrice: z.number(),
});

const schema = z.object({
  items: z.array(itemSchema).min(1, 'Cart empty hai'),
  address: z.object({
    name: z.string().min(2), phone: z.string().regex(/^[0-9]{10}$/),
    line1: z.string().min(5), line2: z.string().optional(), city: z.string(), state: z.string(), pincode: z.string().regex(/^[0-9]{6}$/),
  }),
  paymentMethod: z.enum(['COD','NETBANKING','UPI','RAZORPAY']).default('COD'),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();
    const data = schema.parse(body);

    const subtotal = data.items.reduce((s, i) => s + i.unitPrice * i.quantity, 0);
    const shipping = subtotal >= 500 ? 0 : 99;
    const total = subtotal + shipping;
    const addr = `${data.address.name} | ${data.address.phone} | ${data.address.line1}${data.address.line2 ? ', ' + data.address.line2 : ''}, ${data.address.city}, ${data.address.state} - ${data.address.pincode}`;

    // Build items data — for demo/sample productIds starting with 's' or invalid,
    // we skip the FK constraint by NOT linking (product becomes snapshot only).
    const orderItemsData = await Promise.all(data.items.map(async (i) => {
      const base: any = {
        productName: i.productName,
        productSlug: i.productSlug,
        image: i.image || null,
        quantity: i.quantity,
        unitPrice: i.unitPrice,
        totalPrice: i.unitPrice * i.quantity,
      };
      // Only set productId FK if product actually exists in DB (not a sample id)
      if (!i.productId.startsWith('s')) {
        try {
          const exists = await prisma.product.findUnique({ where: { id: i.productId }, select: { id: true } });
          if (exists) base.productId = i.productId;
        } catch {}
      }
      return base;
    }));

    const order = await prisma.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        userId: session?.user ? (session.user as any).id : undefined,
        subtotal, shippingAmount: shipping, totalAmount: total,
        paymentMethod: data.paymentMethod,
        paymentStatus: 'PENDING',
        orderStatus: 'CONFIRMED', // COD = confirm immediately
        notes: `Shipping: ${addr}`,
        items: { create: orderItemsData },
      },
    });

    return NextResponse.json({ success: true, orderNumber: order.orderNumber, id: order.id, total });
  } catch (e: any) {
    console.error('Order create:', e);
    const msg = e?.issues ? e.issues.map((i: any) => i.message).join(', ') : (e.message || 'Order nahi ho paya');
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ orders: [] });
  const orders = await prisma.order.findMany({
    where: { userId: (session.user as any).id },
    include: { items: true },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json({ orders });
}
