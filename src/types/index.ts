export type ProductCard = {
  id: string;
  name: string;
  slug: string;
  price: number;
  compareAtPrice: number | null;
  primaryImage: string | null;
  brand: { name: string; slug: string } | null;
  avgRating: number;
  reviewCount: number;
  isCommercial: boolean;
};

export type ProductDetail = ProductCard & {
  sku: string;
  shortDescription: string | null;
  description: string | null;
  stockQty: number;
  warrantyMonths: number;
  specifications: Record<string, string | number> | null;
  images: { url: string; alt: string | null; isPrimary: boolean }[];
  brand: { name: string; slug: string } | null;
  category: { name: string; slug: string };
  metaTitle: string | null;
  metaDescription: string | null;
};

export type CategoryNav = {
  id: string;
  name: string;
  slug: string;
  image: string | null;
  children: CategoryNav[];
};

export type CartItem = {
  id: string;
  productId: string;
  name: string;
  slug: string;
  image: string | null;
  price: number;
  quantity: number;
};

export type ServiceForm = {
  customerName: string;
  phone: string;
  altPhone?: string;
  address: string;
  pincode: string;
  machineBrand?: string;
  machineModel?: string;
  issueType:
    | 'INSTALLATION' | 'REPAIR' | 'AMC' | 'FILTER_CHANGE'
    | 'RO_MEMBRANE_CHANGE' | 'NOT_WORKING' | 'LEAKAGE'
    | 'LOW_WATER_PRESSURE' | 'BAD_TASTE' | 'OTHER';
  issueDescription: string;
  preferredDate?: string;
  preferredSlot?: 'MORNING' | 'AFTERNOON' | 'EVENING';
};
