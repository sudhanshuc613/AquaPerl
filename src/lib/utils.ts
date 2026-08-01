import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(value: number | string) {
  const n = typeof value === 'string' ? parseFloat(value) : value;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(n);
}

export function formatDate(d: Date | string) {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
  }).format(new Date(d));
}

export function calculateDiscount(mrp: number, price: number) {
  if (!mrp || mrp <= price) return 0;
  return Math.round(((mrp - price) / mrp) * 100);
}

export function generateOrderNumber() {
  const d = new Date();
  const pad = (n: number, len = 2) => String(n).padStart(len, '0');
  const date = `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `AQN-${date}-${rand}`;
}

export function generateTicketNumber() {
  const d = new Date();
  const pad = (n: number, len = 2) => String(n).padStart(len, '0');
  const date = `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `SR-${date}-${rand}`;
}

export const PHONES = {
  primary: '8969821440',
  secondary: '9661288308',
  whatsapp: '8969821440',
};

export function waLink(phone: string, msg?: string) {
  const clean = phone.replace(/\D/g, '');
  const text = msg ? `?text=${encodeURIComponent(msg)}` : '';
  return `https://wa.me/91${clean}${text}`;
}

export function telLink(phone: string) {
  return `tel:+91${phone.replace(/\D/g, '')}`;
}
