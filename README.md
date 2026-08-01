# AquaNexa — RO Purifier E-commerce + Patna Service Booking

**Domain:** [rokadoctor.in](https://rokadoctor.in)
**Stack:** Next.js 14 (App Router) • TypeScript • Tailwind CSS • Prisma ORM • PostgreSQL • NextAuth • Razorpay/Stripe • Twilio (WhatsApp)

A production-ready dual-model platform:
1. **Pan-India E-commerce** — RO purifiers, commercial plants & spare parts.
2. **Patna Local Service** — doorstep RO repair, installation & AMC with ₹100 visit charge.

---

## 📁 Directory Structure

```
aquanexa/
├── prisma/
│   ├── schema.prisma            # Full relational PostgreSQL schema
│   └── seed.ts                  # Initial categories, brands, pincodes, sample products
├── public/                      # Static images, uploads
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout (Navbar + Footer + JSON-LD)
│   │   ├── globals.css          # Tailwind + brand design tokens
│   │   ├── loading.tsx
│   │   │
│   │   ├── (frontend)/          # User-facing routes
│   │   │   ├── page.tsx                        # Homepage (Hero, categories, featured, service form, why-us, reviews)
│   │   │   ├── categories/[slug]/page.tsx      # Category/PLP with filters
│   │   │   ├── product/[slug]/page.tsx         # Product detail (PDP) with zoom, specs, pincode, schema
│   │   │   ├── book-service/page.tsx           # Patna service booking (form, pricing, areas, schema)
│   │   │   ├── cart/page.tsx                   # Cart page
│   │   │   └── checkout/page.tsx               # Multi-step checkout
│   │   │
│   │   ├── admin/               # Admin dashboard (protected)
│   │   │   ├── layout.tsx       # Sidebar + topbar
│   │   │   ├── dashboard/page.tsx             # Analytics KPIs, Recharts
│   │   │   ├── products/page.tsx              # Product CRUD list
│   │   │   ├── orders/page.tsx                # Order management
│   │   │   ├── services/page.tsx              # Patna service ticket manager
│   │   │   ├── customers/page.tsx             # CRM
│   │   │   ├── seo/page.tsx                   # Meta / SEO editor
│   │   │   └── settings/page.tsx              # Site configuration
│   │   │
│   │   └── api/
│   │       ├── service-requests/              # POST create, GET list
│   │       │   └── [id]/route.ts              # PATCH status/assign
│   │       ├── admin/products/                # Product CRUD
│   │       │   └── [id]/route.ts
│   │       ├── payments/razorpay/route.ts     # RZP order creation
│   │       └── pincode/check/route.ts         # Serviceability checker
│   │
│   ├── components/
│   │   ├── ui/                  # Button, Input, Card, Badge, Dialog (shadcn-style)
│   │   ├── layout/              # Navbar, Footer
│   │   ├── home/                # HeroSection, CategoryShowcase
│   │   ├── product/             # ProductCard, ProductGallery, ProductFilters, AddToCartButton, PincodeChecker
│   │   ├── service/             # ServiceQuickBook
│   │   └── cart, checkout, admin
│   │
│   ├── lib/                     # prisma client, utils (price, waLink, phone)
│   ├── hooks/                   # Custom hooks
│   ├── types/                   # TypeScript interfaces
│   └── utils/
│
├── tailwind.config.ts           # Brand theme (aqua, navy, orange CTAs)
├── next.config.mjs
├── tsconfig.json
├── postcss.config.js
├── .env.example
└── package.json
```

---

## 🗄️ Database Architecture (PostgreSQL)

Implemented in `prisma/schema.prisma` with proper indexes, relations, and enums:

| Module | Tables | Purpose |
|---|---|---|
| **Auth/Users** | `User`, `Address` | Customers, technicians, admins (RBAC via Role enum) |
| **Catalog** | `Category`, `Brand`, `Product`, `ProductImage`, `ProductVariant` | Hierarchical categories, multi-image products, variants, JSON specs, per-product SEO |
| **Cart/Wishlist** | `CartItem`, `Wishlist`, `AbandonedCart` | Guest+user carts, abandoned-cart recovery |
| **Orders** | `Order`, `OrderItem`, `OrderStatusHistory`, `Transaction`, `Coupon` | Full order lifecycle (Pending→Shipped→Delivered), snapshot line items, coupon engine, multi-payment |
| **Reviews** | `Review` | Moderated product reviews with rating |
| **Service (Patna)** | `ServiceRequest`, `Technician` | Local tickets with issue type, slot, technician assignment, visit charges, costs |
| **Logistics** | `Pincode` | Pincode-level COD, delivery days, Patna service-zone flag |
| **Content/SEO** | `SeoMeta`, `Banner` | Per-page meta, OG, JSON-LD schema; hero banners |
| **Analytics** | `ActivityLog`, `Notification` | Audit trail & user notifications |
| **Config** | `SiteSetting` | Key-value store for phones, pricing, API keys |

**Enums:** `Role`, `CatalogType`, `ProductType`, `PaymentMethod`, `PaymentStatus`, `OrderStatus`, `CouponType`, `ServiceIssueType`, `ServiceStatus`, `TimeSlot`.

---

## 🚀 Roadmap (Phased Rollout)

### Phase 1 — MVP (Weeks 1-3) — COMPLETE IN REPO
- [x] Next.js 14 + Tailwind brand theme
- [x] Homepage (hero, categories, featured, service form, trust, reviews)
- [x] Product listing (PLP) with filters (price, brand, tech, rating)
- [x] Product detail (PDP) with zoom gallery, specs, pincode check, related
- [x] Service booking form + WhatsApp/Call CTAs (Patna ₹100)
- [x] Cart & multi-step checkout UI
- [x] Admin layout + dashboard (charts/KPIs)
- [x] Admin: orders, products, services, customers, SEO, settings UIs
- [x] Core API routes (service requests, products CRUD, RZP init, pincode)
- [x] Prisma schema + seed data
- [x] Local Business + Product JSON-LD schema

### Phase 2 — Integration (Weeks 4-6)
- [ ] NextAuth credentials + OTP login (phone OTP via Twilio)
- [ ] Admin auth middleware + role guards
- [ ] Razorpay/Stripe checkout completion & webhook verification
- [ ] Order confirmation emails (Nodemailer) + WhatsApp alerts
- [ ] Image upload via S3/Cloudinary for products
- [ ] Shipment tracking integration (Shiprocket/Delhivery API)
- [ ] Live product search with Algolia/Meilisearch
- [ ] Coupon logic applied at checkout

### Phase 3 — Growth (Weeks 7-10)
- [ ] Abandoned cart recovery (cron + WhatsApp/email drip)
- [ ] Product reviews (verified purchaser gate)
- [ ] Referral / loyalty program
- [ ] AMC subscription plans (recurring billing via Stripe/Razorpay Subscriptions)
- [ ] Technician app / dashboard for Patna field staff
- [ ] Live WhatsApp chat widget (official Business API)
- [ ] Google Analytics 4 + Meta Pixel + Google Merchant Center feed
- [ ] Sitemap generation (`/sitemap.xml`) + robots.txt
- [ ] Blog content (Next MDX) for SEO
- [ ] PWA installability for repeat orders

### Phase 4 — Scale
- [ ] Multi-vendor / marketplace for other RO technicians across India
- [ ] Mobile app (React Native) sharing same API
- [ ] Predictive service reminders based on purchase date
- [ ] Admin mobile push for new service tickets
- [ ] GST-compliant e-invoicing integration

---

## 🔧 Setup Instructions

```bash
# 1. Install deps
cd aquanexa
npm install

# 2. Configure env
cp .env.example .env
# Fill DATABASE_URL, RAZORPAY keys, TWILIO creds, NEXTAUTH_SECRET

# 3. Setup database
npx prisma migrate dev --name init
npm run db:seed

# 4. Run dev
npm run dev
# Open http://localhost:3000
# Admin: http://localhost:3000/admin
```

---

## 🎨 Design System

| Role | Color | Hex |
|---|---|---|
| Primary (Aqua) | Cyan-500 | `#06b6d4` |
| Secondary (Navy) | Navy-800 | `#1e3a8a` |
| CTA (Buy) | Orange | `#ff6b1a` |
| CTA (WhatsApp) | Green | `#25D366` |
| Background | White | `#ffffff` |
| Text | Navy-900 | `#0b1e3f` |

- **Typography:** Inter (Google Fonts)
- **Components:** shadcn/ui-style primitives (Radix + cva)
- **Motion:** Framer Motion + Swiper carousels
- **Charts:** Recharts
- **Responsive:** Mobile-first, breakpoints at sm/md/lg/xl

---

## 📞 Business Contact Hard-coded (editable via Admin → Settings)
- Primary: **8969821440**
- Secondary: **9661288308**
- WhatsApp: **8969821440**
- Service area: Patna, Bihar (visit ₹100)
- Pan-India shipping (free above ₹999)

---

## 🔌 API Endpoints Summary

| Method | Path | Purpose |
|---|---|---|
| POST | `/api/service-requests` | Create Patna service ticket |
| GET  | `/api/service-requests?status=&page=` | Admin list tickets |
| PATCH| `/api/service-requests/:id` | Update status/assign tech/resolve |
| POST | `/api/admin/products` | Create product |
| GET  | `/api/admin/products?q=&categoryId=` | List products admin |
| PATCH| `/api/admin/products/:id` | Update product |
| DELETE| `/api/admin/products/:id` | Soft-delete product |
| POST | `/api/payments/razorpay` | Create RZP order & pending Order row |
| POST | `/api/payments/razorpay/verify` | Verify signature & confirm order |
| GET  | `/api/pincode/check?pincode=` | Delivery/service availability |
| POST | `/api/auth/[...nextauth]` | NextAuth routes |

---

## ✅ SEO Strategy Implemented

1. **Per-page metadata** with templates via Next.js `generateMetadata`
2. **JSON-LD structured data** on homepage (`LocalBusiness`) and PDP (`Product` + `AggregateRating` + `Offer`)
3. **Service page schema** (`@type: Service`) for "RO service in Patna"
4. **Dynamic SEO** editable from `/admin/seo` (stored in `SeoMeta` table)
5. **Breadcrumbs** on PLP & PDP
6. **Semantic HTML** (h1-h6, alt-text on images)
7. **Image optimization** via Next/Image (webp/avif, lazy-loaded, responsive sizes)
8. **ISR revalidation** (`revalidate = 300`) for product & category pages
9. **Sitemap + robots** hook-up (Phase 3)
10. **Core Web Vitals** friendly: minimal JS, font-display:swap, above-fold content SSR'd

---

Built with ❤️ for AquaNexa (rokadoctor.in) — scalable, SEO-ready, fully responsive.
