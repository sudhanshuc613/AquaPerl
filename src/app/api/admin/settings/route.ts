import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
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
    for (const [k, v] of Object.entries(body)) await setSetting(k, v);
    return NextResponse.json({ success: true });
  } catch (e: any) { return NextResponse.json({ error: e.message }, { status: 400 }); }
}
