import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // 1. Categories
  const catRO = await prisma.category.upsert({
    where: { slug: 'ro-purifiers' },
    update: {},
    create: { name: 'New RO Purifiers', slug: 'ro-purifiers', type: 'PRODUCT', image: '/cat-ro.jpg' },
  });
  const catParts = await prisma.category.upsert({
    where: { slug: 'spare-parts' },
    update: {},
    create: { name: 'Spare Parts', slug: 'spare-parts', type: 'PRODUCT', image: '/cat-parts.jpg' },
  });
  const catCommercial = await prisma.category.upsert({
    where: { slug: 'commercial-plants' },
    update: {},
    create: { name: 'Commercial Plants', slug: 'commercial-plants', type: 'PRODUCT', image: '/cat-commercial.jpg' },
  });

  // 2. Sub-categories
  await prisma.category.createMany({
    data: [
      { name: 'Domestic RO', slug: 'domestic-ro', parentId: catRO.id },
      { name: 'UV + UF Purifiers', slug: 'uv-uf', parentId: catRO.id },
      { name: 'RO Membranes', slug: 'ro-membranes', parentId: catParts.id },
      { name: 'Filters', slug: 'filters', parentId: catParts.id },
      { name: '50 LPH Plants', slug: '50-lph', parentId: catCommercial.id },
      { name: '100 LPH Plants', slug: '100-lph', parentId: catCommercial.id },
    ],
    skipDuplicates: true,
  });

  // 3. Brand
  const brand = await prisma.brand.upsert({
    where: { slug: 'aquanexa' },
    update: {},
    create: { name: 'AquaNexa', slug: 'aquanexa' },
  });

  // 4. Patna pincodes (sample)
  const patnaPins = ['800001','800002','800003','800004','800005','800006','800007','800008','800014','800020','801503','801505'];
  for (const pin of patnaPins) {
    await prisma.pincode.upsert({
      where: { pincode: pin },
      update: { isPatnaService: true, city: 'Patna', state: 'Bihar', codAvailable: true, deliveryDays: 1, serviceAvailable: true },
      create: { pincode: pin, city: 'Patna', state: 'Bihar', codAvailable: true, deliveryDays: 1, serviceAvailable: true, isPatnaService: true },
    });
  }

  // 5. Sample products
  const sampleProducts = [
    { name: 'AquaNexa Pro 12L RO+UV+UF+TDS', sku: 'AQN-PRO-12', price: 12999, compareAtPrice: 18999, categoryId: catRO.id, brandId: brand.id, type: 'RO_PURIFIER' as const, isFeatured: true, warrantyMonths: 24, images: [{ url: 'https://images.unsplash.com/photo-1564419320461-6870880221ad?w=800', isPrimary: true }], specifications: { Capacity: '12 L', Technology: 'RO+UV+UF+TDS', Stages: 8 } },
    { name: 'Commercial RO Plant 100 LPH', sku: 'AQN-C100', price: 65000, compareAtPrice: 85000, categoryId: catCommercial.id, brandId: brand.id, type: 'COMMERCIAL_PLAN' as const, isFeatured: true, isCommercial: true, warrantyMonths: 12, images: [{ url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800', isPrimary: true }] },
    { name: 'Genuine RO Membrane 80 GPD', sku: 'AQN-MEM-80', price: 1499, compareAtPrice: 2200, categoryId: catParts.id, brandId: brand.id, type: 'SPARE_PART' as const, isFeatured: true, warrantyMonths: 6, images: [{ url: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=800', isPrimary: true }] },
    { name: 'Sediment + Carbon Filter Kit', sku: 'AQN-FK', price: 899, compareAtPrice: 1500, categoryId: catParts.id, brandId: brand.id, type: 'SPARE_PART' as const, images: [{ url: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800', isPrimary: true }] },
  ];

  for (const p of sampleProducts) {
    const exists = await prisma.product.findUnique({ where: { sku: p.sku } });
    if (!exists) {
      await prisma.product.create({
        data: {
          name: p.name, slug: p.sku.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          sku: p.sku, price: p.price, compareAtPrice: p.compareAtPrice,
          categoryId: p.categoryId, brandId: p.brandId, type: p.type,
          isFeatured: p.isFeatured, isCommercial: p.isCommercial, warrantyMonths: p.warrantyMonths ?? 12,
          stockQty: 100, avgRating: 4.5, reviewCount: 50,
          specifications: p.specifications,
          images: { create: p.images.map((img, i) => ({ ...img, alt: p.name, sortOrder: i })) },
        },
      });
    }
  }

  // 6. Sample banners
  await prisma.banner.createMany({
    data: [
      { title: "India's Best RO Purifiers", subtitle: 'Delivered anywhere', image: '/banner-1.jpg', position: 'hero', ctaText: 'Shop Now', ctaLink: '/categories/ro-purifiers', isActive: true, sortOrder: 1 },
      { title: 'RO Service in Patna ₹100', subtitle: 'Same-day doorstep', image: '/banner-2.jpg', position: 'hero', ctaText: 'Book Now', ctaLink: '/book-service', isActive: true, sortOrder: 2 },
    ],
    skipDuplicates: true,
  });

  // 7. Site settings
  await prisma.siteSetting.upsert({
    where: { key: 'contact.phones' }, update: {},
    create: { key: 'contact.phones', value: ['8969821440', '9661288308'] },
  });
  await prisma.siteSetting.upsert({
    where: { key: 'shipping.freeAbove' }, update: {},
    create: { key: 'shipping.freeAbove', value: 999 },
  });

  console.log('✅ Database seeded successfully');
}

main().catch(console.error).finally(() => prisma.$disconnect());
