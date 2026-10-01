import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2, 'Name zaroori hai'),
  email: z.string().email('Sahi email daalo').optional().or(z.literal('')),
  phone: z.string().regex(/^[0-9]{10}$/, '10-digit mobile number daalo'),
  password: z.string().min(6, 'Password minimum 6 characters ka hona chahiye'),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    const existing = await prisma.user.findFirst({
      where: { OR: [{ phone: data.phone }, ...(data.email ? [{ email: data.email }] : [])] },
    });
    if (existing) return NextResponse.json({ error: 'Is phone/email se pehle se account hai. Please login.' }, { status: 400 });

    const passwordHash = await bcrypt.hash(data.password, 10);
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email || null,
        phone: data.phone,
        passwordHash,
        role: 'CUSTOMER',
      },
    });

    return NextResponse.json({ success: true, id: user.id });
  } catch (e: any) {
    console.error('Register error:', e);
    const msg = e?.issues ? e.issues.map((i: any) => i.message).join(', ') : (e.message || 'Registration fail hua');
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
