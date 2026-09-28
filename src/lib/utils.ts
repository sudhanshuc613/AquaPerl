import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(value: number | string) {
  const n = typeof value === 'string' ? parseFloat(value) : value;
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
}

export function formatDate(d: Date | string) {
  return new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(d));
}

export function calculateDiscount(mrp: number, price: number) {
  if (!mrp || mrp <= price) return 0;
  return Math.round(((mrp - price) / mrp) * 100);
}

export function generateOrderNumber() {
  const d = new Date();
  const pad = (n: number, len = 2) => String(n).padStart(len, '0');
  return `ORD-${d.getFullYear()}${pad(d.getMonth()+1)}${pad(d.getDate())}-${Math.floor(1000+Math.random()*9000)}`;
}

export function generateTicketNumber() {
  const d = new Date();
  const pad = (n: number, len = 2) => String(n).padStart(len, '0');
  return `PAT-${d.getFullYear()}${pad(d.getMonth()+1)}${pad(d.getDate())}-${Math.floor(1000+Math.random()*9000)}`;
}

export const BRAND = {
  name: 'RO Service Patna',
  shortName: 'RO Patna',
  tagline: 'Patna ka #1 RO Repair & Installation Service',
  domain: 'roserviceinpatna.in',
  visitCharge: 100,
};

// NEW PHONE NUMBERS
export const PHONES = {
  primary: '9241536586',
  secondary: '9534037266',
  whatsapp: '9241536586',
};

// Patna areas (for SEO area pages)
export const PATNA_AREAS = [
  { slug: 'boring-road', name: 'Boring Road' },
  { slug: 'kankarbagh', name: 'Kankarbagh' },
  { slug: 'patna-sahib', name: 'Patna Sahib' },
  { slug: 'danapur', name: 'Danapur' },
  { slug: 'bailey-road', name: 'Bailey Road' },
  { slug: 'rajendra-nagar', name: 'Rajendra Nagar' },
  { slug: 'gandhi-maidan', name: 'Gandhi Maidan' },
  { slug: 'mithapur', name: 'Mithapur' },
  { slug: 'anisabad', name: 'Anisabad' },
  { slug: 'phulwari-sharif', name: 'Phulwari Sharif' },
  { slug: 'patliputra', name: 'Patliputra' },
  { slug: 'kidwaipuri', name: 'Kidwaipuri' },
  { slug: 'frazer-road', name: 'Frazer Road' },
  { slug: 'lohia-nagar', name: 'Lohia Nagar' },
  { slug: 'khemnichak', name: 'Khemnichak' },
  { slug: 'khagaul', name: 'Khagaul' },
  { slug: 'saguna-more', name: 'Saguna More' },
  { slug: 'beur', name: 'Beur' },
];

export const BRANDS_SERVICED = ['Kent','Aquaguard (Eureka Forbes)','Livpure','Pureit (HUL)','AO Smith','Blue Star','Havells','LG','Samsung','Whirlpool','V-Guard','Generic/Local'];

export const FAQ = [
  { q: 'RO repair mein kitna kharcha aata hai?', a: 'Hamara sirf ₹100 visit charge hai. Repair ka actual kaam dekh ke quote dete hain, aur customer ke approval ke baad hi kaam karte hain. Koi hidden charge nahi. Filter change ₹499 se start, membrane change ₹1499 se start.' },
  { q: 'Kitne time mein technician aajata hai?', a: 'Agar aap subah 4 baje se pehle book karte hain to same-day service available hai. Usually 2-4 ghante mein technician aapke darwaje par pohoch jata hai.' },
  { q: 'Kaun kaun se brand ke RO service karte ho?', a: 'Hum sab major brands service karte hain - Kent, Aquaguard (Eureka Forbes), Livpure, Pureit, AO Smith, Blue Star, Havells, LG, Samsung, aur local brands bhi.' },
  { q: 'Koi warranty milti hai service par?', a: 'Ji haan! Har service par 30-day ki service warranty milti hai. Agar usi problem 30 din mein fir se aaye to free mein fix karte hain.' },
  { q: 'Genuine parts hi use karte ho?', a: 'Haan, 100% original company ke spare parts use karte hain. Membranes, filters sab branded hote hain.' },
  { q: 'Naya RO kharidna bhi chahte hain, kya karna hoga?', a: 'Hum naye RO purifiers bhi sell karte hain with free installation. Website se order karein ya seedha call kar sakte hain.' },
];

export function waLink(phone: string, msg?: string) {
  const clean = phone.replace(/\D/g,'');
  const text = msg ? `?text=${encodeURIComponent(msg)}` : '';
  return `https://wa.me/91${clean}${text}`;
}

export function telLink(phone: string) {
  return `tel:+91${phone.replace(/\D/g,'')}`;
}
