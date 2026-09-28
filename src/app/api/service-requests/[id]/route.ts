import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !['ADMIN','SUPER_ADMIN'].includes((session.user as any)?.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const body = await req.json();
    const update = z.object({
      status: z.enum(['NEW','CONTACTED','SCHEDULED','TECHNICIAN_ASSIGNED','IN_PROGRESS','COMPLETED','CANCELLED','NO_RESPONSE']).optional(),
      technicianId: z.string().optional().nullable(),
      resolutionNotes: z.string().optional(),
      visitCharge: z.number().optional(),
      partsCost: z.number().optional(),
      laborCost: z.number().optional(),
      totalCost: z.number().optional(),
      paymentStatus: z.enum(['PENDING','PAID','FAILED','REFUNDED']).optional(),
    }).parse(body);

    const ticket = await prisma.serviceRequest.update({
      where: { id: params.id },
      data: {
        ...update,
        resolvedAt: update.status === 'COMPLETED' ? new Date() : undefined,
      },
    });

    // activityLog model may not exist yet — safe try/catch
    try {
      await prisma.activityLog.create({
        data: { action: `SERVICE_${update.status ?? 'UPDATED'}`, entityType: 'ServiceRequest', entityId: params.id },
      });
    } catch (_) { /* ignore if table missing */ }

    return NextResponse.json(ticket);
  } catch (e: any) {
    console.error('Service PATCH error:', e);
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
