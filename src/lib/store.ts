'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CartLine = {
  id: string;          // unique line id = productId|variantId
  productId: string;
  variantId?: string;
  name: string;
  slug: string;
  image: string | null;
  price: number;
  compareAtPrice: number | null;
  brand: string | null;
  quantity: number;
};

type CartState = {
  items: CartLine[];
  isOpen: boolean;
  add: (item: Omit<CartLine, 'id' | 'quantity'> & { quantity?: number }) => void;
  remove: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clear: () => void;
  setOpen: (open: boolean) => void;
};

const lineId = (productId: string, variantId?: string) => `${productId}${variantId ? `_${variantId}` : ''}`;

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      add: (raw) => {
        const id = lineId(raw.productId, raw.variantId);
        const qty = raw.quantity ?? 1;
        const existing = get().items.find(i => i.id === id);
        if (existing) {
          set({
            items: get().items.map(i => i.id === id ? { ...i, quantity: i.quantity + qty } : i),
            isOpen: true,
          });
        } else {
          set({ items: [...get().items, { ...raw, id, quantity: qty }], isOpen: true });
        }
      },
      remove: (id) => set({ items: get().items.filter(i => i.id !== id) }),
      updateQty: (id, qty) => {
        if (qty <= 0) { set({ items: get().items.filter(i => i.id !== id) }); return; }
        set({ items: get().items.map(i => i.id === id ? { ...i, quantity: qty } : i) });
      },
      clear: () => set({ items: [] }),
      setOpen: (isOpen) => set({ isOpen }),
    }),
    { name: 'aquanexa-cart' }
  )
);

export const cartCount = () => useCart.getState().items.reduce((s, i) => s + i.quantity, 0);
export const cartSubtotal = () => useCart.getState().items.reduce((s, i) => s + i.price * i.quantity, 0);
