import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const pincode = searchParams.get('pincode');
  if (!pincode) return NextResponse.json({ error: 'pincode required' }, { status: 400 });

  const record = await prisma.pincode.findUnique({ where: { pincode } }).catch(() => null);
  if (record) return NextResponse.json(record);

  // Default heuristic: Patna pincodes start with 80
  const isPatna = pincode.startsWith('80');
  return NextResponse.json({
    pincode,
    city: isPatna ? 'Patna' : 'Your city',
    state: isPatna ? 'Bihar' : 'India',
    deliveryDays: isPatna ? 1 : 4,
    codAvailable: true,
    serviceAvailable: true,
    isPatnaService: isPatna,
  });
}
