// Script to create the first admin user
// Run:  npx ts-node --compiler-options '{"module":"CommonJS"}' prisma/create-admin.ts
// or:   npx tsx prisma/create-admin.ts

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();

async function main() {
  const email = 'admin@rokadoctor.in';
  const phone = '8969821440';
  const password = 'admin@123'; // BADAL DENA PRODUCTION MEIN!
  const name = 'AquaNexa Admin';

  const existing = await prisma.user.findFirst({ where: { OR: [{ email }, { phone }] } });
  if (existing) {
    console.log('⚠️  Admin already exists:', existing.email);
    await prisma.user.update({
      where: { id: existing.id },
      data: { role: 'SUPER_ADMIN', passwordHash: await bcrypt.hash(password, 10) },
    });
    console.log('✅ Role upgraded to SUPER_ADMIN, password reset to:', password);
    return;
  }

  const admin = await prisma.user.create({
    data: {
      name,
      email,
      phone,
      passwordHash: await bcrypt.hash(password, 10),
      role: 'SUPER_ADMIN',
      emailVerified: new Date(),
    },
  });

  console.log('\n✅ Admin created!');
  console.log('📧 Email:   ', email);
  console.log('📱 Phone:  ', phone);
  console.log('🔑 Password:', password);
  console.log('\n👉 Ab http://localhost:3000/login pe jaake login karo, then /admin/dashboard\n');
  console.log('⚠️  PRODUCTION mein password change karna mat bhoolna!\n');
}

main().catch(console.error).finally(() => prisma.$disconnect());
