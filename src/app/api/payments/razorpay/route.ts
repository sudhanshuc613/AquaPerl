import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { prisma } from '@/lib/prisma';
import { generateOrderNumber } from '@/lib/utils';

// Create Razorpay order from cart
export async function POST(req: Request) {
  try {
    const { addressId, couponCode, items } = await req.json();
    // items: [{ productId, quantity, price }]

    if (!items?.length) return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });

    const subtotal = items.reduce((s: number, i: any) => s + i.price * i.quantity, 0);
    const shipping = subtotal >= 999 ? 0 : 79;
    const tax = Math.round(subtotal * 0.0); // GST can be computed per product slab
    const discount = 0; // apply coupon logic
    const total = subtotal + shipping + tax - discount;

    // Persist order
    const order = await prisma.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        subtotal, shippingAmount: shipping, taxAmount: tax,
        discountAmount: discount, totalAmount: total,
        paymentMethod: 'RAZORPAY',
        addressId,
        items: {
          create: items.map((i: any) => ({
            productId: i.productId,
            productName: i.name,
            productSlug: i.slug,
            image: i.image,
            quantity: i.quantity,
            unitPrice: i.price,
            totalPrice: i.price * i.quantity,
          })),
        },
      },
    });

    const rzp = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });
    const rzpOrder = await rzp.orders.create({
      amount: Math.round(total * 100), // paise
      currency: 'INR',
      receipt: order.orderNumber,
      notes: { orderId: order.id },
    });

    return NextResponse.json({
      orderId: order.id,
      orderNumber: order.orderNumber,
      amount: total,
      razorpayKey: process.env.RAZORPAY_KEY_ID,
      razorpayOrderId: rzpOrder.id,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
