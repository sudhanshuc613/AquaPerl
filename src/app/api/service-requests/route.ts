import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { generateTicketNumber } from '@/lib/utils';
import { authOptions } from '@/lib/auth';

const schema = z.object({
  customerName: z.string().min(2, 'Name zaroori hai'),
  phone: z.string().regex(/^[0-9]{10}$/, '10 digit mobile number daalo'),
  altPhone: z.string().regex(/^[0-9]{10}$/).optional().or(z.literal('')),
  email: z.string().email('Sahi email daalo').optional().or(z.literal('')),
  address: z.string().min(10, 'Pura address likho (min 10 chars)'),
  city: z.string().default('Patna'),
  pincode: z.string().regex(/^[0-9]{6}$/, '6 digit pincode daalo'),
  area: z.string().optional(),
  machineBrand: z.string().optional(),
  machineModel: z.string().optional(),
  issueType: z.enum(['INSTALLATION','REPAIR','AMC','FILTER_CHANGE','RO_MEMBRANE_CHANGE','NOT_WORKING','LEAKAGE','LOW_WATER_PRESSURE','BAD_TASTE','OTHER']),
  issueDescription: z.string().min(5, 'Thoda detail mein problem batayein'),
  preferredDate: z.string().optional(),
  preferredSlot: z.enum(['MORNING','AFTERNOON','EVENING']).optional(),
  userId: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = schema.parse(body);
    if (data.pincode && !/^80/.test(data.pincode)) {
      // Warn but allow — non-Patna can still enquire
    }
    const ticket = await prisma.serviceRequest.create({
      data: {
        ticketNumber: generateTicketNumber(),
        customerName: data.customerName.trim(),
        phone: data.phone,
        altPhone: data.altPhone || null,
        email: data.email || null,
        address: data.address,
        city: data.city,
        pincode: data.pincode,
        machineBrand: data.machineBrand || null,
        machineModel: data.machineModel || null,
        issueType: data.issueType,
        issueDescription: data.issueDescription,
        preferredDate: data.preferredDate ? new Date(data.preferredDate) : null,
        preferredSlot: data.preferredSlot,
      },
    });
    return NextResponse.json({
      success: true,
      ticketNumber: ticket.ticketNumber,
      id: ticket.id,
      whatsappMessage: `Hi! My RO service ticket ${ticket.ticketNumber} is booked. Name: ${data.customerName}, Phone: ${data.phone}`,
    });
  } catch (err: any) {
    console.error('Service request error:', err);
    return NextResponse.json(
      { success: false, error: err?.issues ? err.issues.map((i: any) => i.message).join(', ') : (err.message || 'Kuch galat hua') },
      { status: 400 }
    );
  }
}

export async function GET(req: Request) {
  // Admin-only — require session
  const session = await getServerSession(authOptions);
  if (!session || !['ADMIN','SUPER_ADMIN'].includes((session.user as any)?.role)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const q = searchParams.get('q') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const take = 50;
    const where: any = {};
    if (status) where.status = status;
    if (q) where.OR = [
      { customerName: { contains: q, mode: 'insensitive' } },
      { phone: { contains: q } },
      { ticketNumber: { contains: q, mode: 'insensitive' } },
    ];
    const [total, items] = await prisma.$transaction([
      prisma.serviceRequest.count({ where }),
      prisma.serviceRequest.findMany({
        where, take, skip: (page - 1) * take,
        orderBy: { createdAt: 'desc' },
        include: { technician: { select: { name: true } } },
      }),
    ]);
    return NextResponse.json({ total, page, items });
  } catch (e: any) {
    return NextResponse.json({ total: 0, page: 1, items: [], error: e.message });
  }
}
