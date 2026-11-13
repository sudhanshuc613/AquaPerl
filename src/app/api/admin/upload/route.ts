import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import crypto from 'crypto';

// Hero banner upload — auto-resize is done client-side before upload (see admin page)
// Server pe sirf save karta hai public/uploads me
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !['ADMIN','SUPER_ADMIN'].includes((session.user as any)?.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const form = await req.formData();
    const file = form.get('file') as File | null;
    const folder = (form.get('folder') as string) || 'banners';

    if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 });

    const bytes = Buffer.from(await file.arrayBuffer());
    const ext = (file.name.split('.').pop() || 'jpg').toLowerCase();
    const safeExt = ['jpg','jpeg','png','webp','gif','svg'].includes(ext) ? ext : 'jpg';
    const name = `${Date.now()}-${crypto.randomBytes(4).toString('hex')}.${safeExt}`;

    const uploadDir = path.join(process.cwd(), 'public', 'uploads', folder);
    if (!existsSync(uploadDir)) await mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, name);
    await writeFile(filePath, bytes);

    return NextResponse.json({ url: `/uploads/${folder}/${name}`, name });
  } catch (e: any) {
    console.error('Upload error', e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
