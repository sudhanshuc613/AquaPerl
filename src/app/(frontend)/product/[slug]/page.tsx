import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import {
  Star, Truck, Shield, Award, Phone, Heart, Share2, Check, MapPin,
  ChevronRight, ShoppingCart, Zap,
} from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import ProductGallery from '@/components/product/ProductGallery';
import ProductCard from '@/components/product/ProductCard';
import { formatPrice, calculateDiscount, PHONES, telLink, waLink } from '@/lib/utils';
import AddToCartButton from '@/components/product/AddToCartButton';
import PincodeChecker from '@/components/product/PincodeChecker';
import type { ProductCard as PC } from '@/types';

export const revalidate = 300;
export const dynamicParams = true;

async function getProduct(slug: string) {
  try {
    const p = await prisma.product.findUnique({
      where: { slug },
      include: {
        brand: true,
        category: true,
        images: { orderBy: { sortOrder: 'asc' } },
        reviews: { where: { isApproved: true }, take: 5, orderBy: { createdAt: 'desc' }, include: { user: { select: { name: true } } } },
      },
    });
    return p;
  } catch { return null; }
}

async function getRelated(id: string, categoryId: string): Promise<PC[]> {
  try {
    const items = await prisma.product.findMany({
      where: { id: { not: id }, categoryId, isActive: true },
      take: 4, include: { brand: true, images: { where: { isPrimary: true }, take: 1 } },
    });
    return items.map(p => ({
      id: p.id, name: p.name, slug: p.slug, price: Number(p.price),
      compareAtPrice: p.compareAtPrice ? Number(p.compareAtPrice) : null,
      primaryImage: p.images[0]?.url ?? null, brand: p.brand ? { name: p.brand.name, slug: p.brand.slug } : null,
      avgRating: Number(p.avgRating), reviewCount: p.reviewCount, isCommercial: p.isCommercial,
    }));
  } catch { return []; }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const p = await getProduct(params.slug);
  if (!p) return { title: 'Product Not Found' };
  return {
    title: p.metaTitle ?? `${p.name} - Buy Online at Best Price | AquaNexa`,
    description: p.metaDescription ?? `Buy ${p.name} online at best price in India. ${p.warrantyMonths} months warranty, free shipping, genuine product.`,
    keywords: p.metaKeywords,
    openGraph: { images: p.images[0]?.url ? [{ url: p.images[0].url }] : undefined },
  };
}

const sample: Record<string, any> = {
  'aquanexa-pro-12l': {
    id: '1', name: 'AquaNexa Pro 12L RO+UV+UF+TDS Water Purifier', slug: 'aquanexa-pro-12l',
    sku: 'AQN-PRO-12', price: 12999, compareAtPrice: 18999, stockQty: 42, warrantyMonths: 24,
    shortDescription: 'Premium 12L RO+UV+UF+Copper+TDS controller with 8-stage purification and digital display.',
    description: `The AquaNexa Pro is our flagship domestic water purifier, built for Indian households with advanced multi-stage purification:
- **Sediment pre-filter** to remove visible dirt
- **Activated carbon** for chlorine & VOC removal
- **Reverse Osmosis Membrane (80 GPD)** removes TDS, heavy metals (arsenic, lead), fluoride
- **UV disinfection** kills bacteria & viruses
- **UF post-filter** to polish taste
- **Copper+Zinc mineral cartridge** adds essential minerals back
- **TDS controller** retains natural taste
- **Digital display** for filter-life & TDS indication

Suitable for water with TDS up to 2500 ppm. Free installation in Patna; free pan-India delivery.`,
    avgRating: 4.6, reviewCount: 234,
    specifications: {
      'Capacity': '12 Litres',
      'Purification Technology': 'RO + UV + UF + Copper + TDS Controller',
      'Stages': '8-stage purification',
      'Membrane Type': 'Thin Film Composite (TFC)',
      'Membrane Life': 'Up to 2500 litres / 1 year',
      'Max TDS': '2500 ppm',
      'Flow Rate': '~15 LPH',
      'Power': '60W',
      'Voltage': '230V AC, 50Hz',
      'Body Material': 'Food-grade ABS',
      'Dimensions': '36 x 36 x 50 cm (WxDxH)',
      'Weight': '8.5 kg',
      'Mounting': 'Wall mount / Table top',
      'Warranty': '24 months on product, 12 months on membrane',
    },
    isCommercial: false, isFeatured: true,
    brand: { id: '1', name: 'AquaNexa', slug: 'aquanexa' },
    category: { id: 'c1', name: 'Domestic RO Purifiers', slug: 'ro-purifiers' },
    images: [
      { url: 'https://images.unsplash.com/photo-1564419320461-6870880221ad?w=800', alt: 'Front view', isPrimary: true },
      { url: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800', alt: 'Side view', isPrimary: false },
      { url: 'https://images.unsplash.com/photo-1591342264384-2622e98366b6?w=800', alt: 'Installation', isPrimary: false },
      { url: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=800', alt: 'Filters', isPrimary: false },
    ],
    reviews: [],
  },
};

export default async function ProductPage({ params }: { params: { slug: string } }) {
  let product = await getProduct(params.slug);
  if (!product && sample[params.slug]) product = sample[params.slug] as any;
  if (!product) notFound();

  const discount = calculateDiscount(Number(product.compareAtPrice ?? 0), Number(product.price));
  const related = await getRelated(product.id, product.categoryId);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    sku: product.sku,
    brand: { '@type': 'Brand', name: product.brand?.name },
    image: product.images.map((i: any) => i.url),
    description: product.shortDescription ?? product.description,
    offers: {
      '@type': 'Offer',
      url: `https://rokadoctor.in/product/${product.slug}`,
      priceCurrency: 'INR',
      price: Number(product.price),
      availability: product.stockQty > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
    },
    aggregateRating: product.reviewCount > 0 ? {
      '@type': 'AggregateRating', ratingValue: Number(product.avgRating), reviewCount: product.reviewCount,
    } : undefined,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Breadcrumb */}
      <div className="border-b border-gray-100 bg-gray-50">
        <div className="container-pad flex items-center gap-1 overflow-x-auto py-3 text-xs text-gray-500">
          <Link href="/" className="hover:text-brand-600">Home</Link>
          <ChevronRight className="h-3 w-3 shrink-0" />
          <Link href={`/categories/${product.category.slug}`} className="hover:text-brand-600">{product.category.name}</Link>
          <ChevronRight className="h-3 w-3 shrink-0" />
          <span className="truncate text-navy-900">{product.name}</span>
        </div>
      </div>

      <div className="container-pad py-8">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Left: Gallery */}
          <ProductGallery images={product.images} productName={product.name} />

          {/* Right: Details */}
          <div>
            {product.brand && (
              <Link href={`/brands/${product.brand.slug}`} className="text-sm font-semibold uppercase tracking-wider text-brand-600 hover:underline">
                {product.brand.name}
              </Link>
            )}
            <h1 className="mt-1 text-2xl md:text-3xl">{product.name}</h1>

            <div className="mt-3 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1 rounded bg-cta-green px-2 py-0.5 text-sm font-bold text-white">
                {Number(product.avgRating).toFixed(1)} <Star className="h-3.5 w-3.5 fill-white" />
              </div>
              <span className="text-sm text-gray-500">{product.reviewCount.toLocaleString()} Ratings & Reviews</span>
              {product.isCommercial && <Badge variant="navy">Commercial</Badge>}
            </div>

            {/* Price */}
            <div className="mt-5 rounded-2xl bg-gradient-to-br from-brand-50/50 to-white p-5">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-extrabold text-navy-900">{formatPrice(Number(product.price))}</span>
                {product.compareAtPrice && Number(product.compareAtPrice) > Number(product.price) && (
                  <>
                    <span className="text-lg text-gray-400 line-through">{formatPrice(Number(product.compareAtPrice))}</span>
                    <span className="text-lg font-bold text-cta-green">{discount}% off</span>
                  </>
                )}
              </div>
              <p className="mt-1 text-xs text-gray-500">Inclusive of all taxes. Free pan-India delivery.</p>
              {product.stockQty > 0 ? (
                <p className="mt-2 flex items-center gap-1 text-sm font-semibold text-cta-green">
                  <Check className="h-4 w-4" /> In Stock ({product.stockQty} available)
                </p>
              ) : (
                <p className="mt-2 text-sm font-semibold text-red-600">Out of Stock</p>
              )}
            </div>

            {/* Offers */}
            <div className="mt-4 space-y-2">
              {[
                { label: 'Bank Offer', text: '10% instant discount on HDFC credit cards' },
                { label: 'Freebie', text: 'Free pre-filter & installation in Patna' },
                { label: 'Delivery', text: 'Free delivery across India on this product' },
                { label: 'EMI', text: 'EMI starting from ₹' + Math.round(Number(product.price) / 12) + '/month' },
              ].slice(0, 3).map(o => (
                <div key={o.label} className="flex items-start gap-2 text-sm">
                  <Zap className="mt-0.5 h-4 w-4 shrink-0 text-cta-orange" />
                  <span><strong className="text-navy-800">{o.label}:</strong> <span className="text-gray-600">{o.text}</span></span>
                </div>
              ))}
            </div>

            {/* Pincode check */}
            <PincodeChecker />

              {/* CTA */}
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <AddToCartButton
                  productId={product.id}
                  name={product.name}
                  slug={product.slug}
                  price={Number(product.price)}
                  compareAtPrice={product.compareAtPrice ? Number(product.compareAtPrice) : null}
                  image={product.images.find((i: any) => i.isPrimary)?.url ?? product.images[0]?.url ?? null}
                  brand={product.brand?.name ?? null}
                  stock={product.stockQty}
                />
                <Button size="lg" variant="outline" aria-label="Wishlist" className="sm:flex-none">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button size="lg" variant="ghost" aria-label="Share" className="sm:flex-none">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

            {/* Need help */}
            <div className="mt-5 flex items-center gap-3 rounded-xl border border-dashed border-brand-200 bg-brand-50/50 p-4">
              <Phone className="h-8 w-8 shrink-0 text-brand-600" />
              <div className="flex-1 text-sm">
                <p className="font-semibold text-navy-900">Need help buying or installing?</p>
                <p className="text-gray-600">Call us at <a href={telLink(PHONES.primary)} className="font-bold text-brand-600">{PHONES.primary}</a> or <a href={waLink(PHONES.whatsapp)} className="font-bold text-[#25D366]">WhatsApp</a></p>
              </div>
            </div>

            {/* Delivery highlights */}
            <div className="mt-5 grid grid-cols-2 gap-3 border-t pt-5 sm:grid-cols-4">
              {[
                { icon: Truck, t: 'Free Delivery', d: 'Pan-India' },
                { icon: Shield, t: '100% Genuine', d: 'Brand Warranty' },
                { icon: Award, t: product.warrantyMonths + ' Months', d: 'Warranty' },
                { icon: MapPin, t: 'Patna Install', d: 'Free & Same-Day' },
              ].map(h => (
                <div key={h.t} className="text-center">
                  <h.icon className="mx-auto h-6 w-6 text-brand-600" />
                  <p className="mt-1 text-xs font-bold text-navy-900">{h.t}</p>
                  <p className="text-[10px] text-gray-500">{h.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Description + Specs */}
        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardContent className="p-6 md:p-8">
              <h2 className="text-2xl">Product Description</h2>
              <div className="prose prose-sm mt-4 max-w-none text-gray-700 whitespace-pre-line">
                {product.description ?? product.shortDescription ?? 'High-quality water purifier from AquaNexa.'}
              </div>

              {product.specifications && (
                <>
                  <h3 className="mt-8 text-xl">Technical Specifications</h3>
                  <div className="mt-4 overflow-hidden rounded-xl border">
                    <table className="w-full text-sm">
                      <tbody>
                        {Object.entries(product.specifications as Record<string, any>).map(([k, v], i) => (
                          <tr key={k} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                            <th className="w-1/3 px-4 py-2.5 text-left text-navy-800">{k}</th>
                            <td className="px-4 py-2.5 text-gray-700">{String(v)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Card>
              <CardContent className="p-5">
                <h4 className="font-bold text-navy-900">Patna Installation?</h4>
                <p className="mt-1 text-sm text-gray-600">We offer free same-day installation in Patna. After placing the order, our technician will call you.</p>
                <Link href="/book-service" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-600">Book installation service →</Link>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <h4 className="font-bold text-navy-900">Warranty & Support</h4>
                <ul className="mt-2 space-y-1.5 text-sm text-gray-600">
                  <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 text-cta-green" /> {product.warrantyMonths} months comprehensive warranty</li>
                  <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 text-cta-green" /> On-site service in Patna</li>
                  <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 text-cta-green" /> Lifetime WhatsApp support</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-14">
            <h2 className="mb-6">Related Products</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
