import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import bcrypt from 'bcryptjs';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

/**
 * Admin apna password change kar sakta hai.
 * Old password verify hoga, phir naya password bcrypt se hash hoke DB mein save hoga.
 */
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !['ADMIN', 'SUPER_ADMIN'].includes((session.user as any)?.role)) {
      return NextResponse.json({ error: 'Unauthorized — pehle login karo' }, { status: 401 });
    }

    const userId = (session.user as any)?.id;
    if (!userId) return NextResponse.json({ error: 'User session invalid' }, { status: 401 });

    const { oldPassword, newPassword } = await req.json();

    if (!oldPassword || !newPassword) {
      return NextResponse.json({ error: 'Old password aur new password dono daalo' }, { status: 400 });
    }
    if (String(newPassword).length < 6) {
      return NextResponse.json({ error: 'Naya password kam se kam 6 characters ka hona chahiye' }, { status: 400 });
    }
    if (String(newPassword) === String(oldPassword)) {
      return NextResponse.json({ error: 'Naya password purane se alag hona chahiye' }, { status: 400 });
    }

    // Load current user
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return NextResponse.json({ error: 'User nahi mila' }, { status: 404 });

    // Verify old password
    const ok = await bcrypt.compare(String(oldPassword), user.passwordHash || '');
    if (!ok) return NextResponse.json({ error: 'Purana password galat hai' }, { status: 400 });

    // Hash new password
    const hash = await bcrypt.hash(String(newPassword), 12);
    await prisma.user.update({ where: { id: userId }, data: { passwordHash: hash } });

    return NextResponse.json({ success: true, message: 'Password change ho gaya! Next login naya password use karo.' });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Kuch error aaya' }, { status: 500 });
  }
}
