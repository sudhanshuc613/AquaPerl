import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Seed default categories
    const catDefaults = [
      { name: 'RO Purifiers', slug: 'ro-purifiers', type: 'PRODUCT' as const, sortOrder: 1 },
      { name: 'Domestic RO', slug: 'domestic-ro', type: 'PRODUCT' as const, sortOrder: 2 },
      { name: 'UV/UF Purifiers', slug: 'uv-uf', type: 'PRODUCT' as const, sortOrder: 3 },
      { name: 'Under-Sink RO', slug: 'under-sink', type: 'PRODUCT' as const, sortOrder: 4 },
      { name: 'Wall-Mount RO', slug: 'wall-mount', type: 'PRODUCT' as const, sortOrder: 5 },
      { name: 'Spare Parts', slug: 'spare-parts', type: 'PRODUCT' as const, sortOrder: 10 },
      { name: 'RO Membranes', slug: 'ro-membranes', type: 'PRODUCT' as const, sortOrder: 11 },
      { name: 'Filters', slug: 'filters', type: 'PRODUCT' as const, sortOrder: 12 },
      { name: 'UV Lamps', slug: 'uv-lamps', type: 'PRODUCT' as const, sortOrder: 13 },
      { name: 'Pumps & Motors', slug: 'pumps', type: 'PRODUCT' as const, sortOrder: 14 },
      { name: 'Connectors & Pipes', slug: 'connectors', type: 'PRODUCT' as const, sortOrder: 15 },
      { name: 'Accessories', slug: 'accessories', type: 'PRODUCT' as const, sortOrder: 16 },
      { name: 'Commercial Plants', slug: 'commercial-plants', type: 'PRODUCT' as const, sortOrder: 20 },
      { name: '50 LPH Plants', slug: '50-lph', type: 'PRODUCT' as const, sortOrder: 21 },
      { name: '100 LPH Plants', slug: '100-lph', type: 'PRODUCT' as const, sortOrder: 22 },
      { name: '250+ LPH Plants', slug: '250-lph', type: 'PRODUCT' as const, sortOrder: 23 },
      { name: 'Industrial RO', slug: 'industrial', type: 'PRODUCT' as const, sortOrder: 24 },
    ];
    for (const c of catDefaults) {
      await prisma.category.upsert({ where: { slug: c.slug }, create: c, update: {} });
    }

    // Create admin
    const existing = await prisma.user.findFirst({ where: { email: 'admin@rokadoctor.in' } });
    let created = false;
    if (!existing) {
      const hash = await bcrypt.hash('admin@123', 10);
      await prisma.user.create({
        data: { name: 'Admin', email: 'admin@rokadoctor.in', phone: '8969821440', passwordHash: hash, role: 'SUPER_ADMIN' },
      });
      created = true;
    }
    const catCount = await prisma.category.count();
    const prodCount = await prisma.product.count();

    return new NextResponse(
      `<!doctype html><html><head><meta charset="utf-8"><title>AquaNexa Setup Complete</title>
      <style>body{font-family:system-ui;max-width:600px;margin:40px auto;padding:20px;background:#f0f9ff}
      .card{background:white;padding:30px;border-radius:16px;box-shadow:0 10px 30px rgba(0,0,0,.08)}
      h1{color:#0e7490} .ok{color:#16a34a;font-weight:700}.warn{color:#ea580c}
      code{background:#f1f5f9;padding:2px 6px;border-radius:4px;font-size:13px}</style></head>
      <body><div class="card">
      <h1>✅ AquaNexa Setup Complete</h1>
      <p class="ok">✓ Admin user ready: <code>admin@rokadoctor.in</code> / <code>admin@123</code> ${created ? '(created fresh)' : '(already existed)'}</p>
      <p class="ok">✓ Default categories seeded (${catCount} categories)</p>
      <p>Products in DB: ${prodCount}</p>
      <p><a href="/admin/dashboard" style="display:inline-block;background:#06b6d4;color:white;padding:10px 20px;border-radius:8px;text-decoration:none;margin-top:10px;">Go to Admin Dashboard →</a></p>
      <p><a href="/" style="color:#06b6d4">← Back to Homepage</a></p>
      </div></body></html>`,
      { headers: { 'Content-Type': 'text/html' } }
    );
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
