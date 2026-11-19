import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { revalidatePath, revalidateTag } from 'next/cache';
import { authOptions } from '@/lib/auth';
import { getAllSettings, setSetting } from '@/lib/settings';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !['ADMIN','SUPER_ADMIN'].includes((session.user as any)?.role)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    return NextResponse.json(await getAllSettings());
  } catch (e: any) { return NextResponse.json({ error: e.message }); }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !['ADMIN','SUPER_ADMIN'].includes((session.user as any)?.role)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const body = await req.json();

    const changedKeys = Object.keys(body);
    for (const [k, v] of Object.entries(body)) await setSetting(k, v);

    // Immediately revalidate affected pages so changes reflect on site
    try {
      revalidatePath('/', 'layout');      // root layout → metadata + footer/navbar
      revalidatePath('/', 'page');         // homepage
      revalidatePath('/book-service');
      revalidatePath('/amc');
      revalidatePath('/pricing');
      revalidatePath('/contact');
      revalidatePath('/about');
      revalidatePath('/brands');
      revalidatePath('/ro-service-near-me');
      // All area/brand/problem pages use "content" tag
      revalidateTag('area-page');
      revalidateTag('brand-page');
      revalidateTag('problem-page');
    } catch {}

    return NextResponse.json({ success: true, revalidated: true, changedKeys });
  } catch (e: any) { return NextResponse.json({ error: e.message }, { status: 400 }); }
}
