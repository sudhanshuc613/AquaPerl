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
  visitCharge: 200,
};

// PHONE NUMBERS - admin panel se change honge ye to defaults hai
export const PHONES = {
  primary: '9241536586',
  secondary: '9534037266',
  whatsapp: '9241536586',
};

// Patna areas (40+ SEO-focused - competitor analysis ke baad jo areas log actually search karte hai)
export const PATNA_AREAS = [
  { slug: 'boring-road', name: 'Boring Road', pincode: '800001', landmarks: 'Nageshwar Colony, Boring Canal Road, Sri Krishna Puri' },
  { slug: 'kankarbagh', name: 'Kankarbagh', pincode: '800020', landmarks: 'Rajiv Nagar, Punaichak, Bhootnath Road' },
  { slug: 'patna-sahib', name: 'Patna Sahib', pincode: '800008', landmarks: 'Patna City, Gulzarbagh, Agamkuan' },
  { slug: 'danapur', name: 'Danapur', pincode: '801503', landmarks: 'Bailey Road, Danapur Cantt, Khagaul Road' },
  { slug: 'bailey-road', name: 'Bailey Road', pincode: '800001', landmarks: 'RPS More, Patel Nagar, Patna High Court' },
  { slug: 'rajendra-nagar', name: 'Rajendra Nagar', pincode: '800016', landmarks: 'Kankarbagh Road, Boring Road Junction' },
  { slug: 'gandhi-maidan', name: 'Gandhi Maidan', pincode: '800001', landmarks: 'Dak Bungalow, Frazer Road, Ashok Rajpath' },
  { slug: 'mithapur', name: 'Mithapur', pincode: '800001', landmarks: 'Jaganpura, Ram Krishna Nagar, Patna Airport' },
  { slug: 'anisabad', name: 'Anisabad', pincode: '800002', landmarks: 'Gardanibagh, Phulwari Road, Beur More' },
  { slug: 'phulwari-sharif', name: 'Phulwari Sharif', pincode: '801505', landmarks: 'Phulwari Bazaar, Jaga Narayan Path, IIT Patna' },
  { slug: 'patliputra', name: 'Patliputra', pincode: '800013', landmarks: 'Patliputra Colony, Patliputra Industrial Area' },
  { slug: 'kidwaipuri', name: 'Kidwaipuri', pincode: '800001', landmarks: 'Veerchand Patel Marg, Nageshwar Colony' },
  { slug: 'frazer-road', name: 'Frazer Road', pincode: '800001', landmarks: 'Dak Bungalow, Gandhi Maidan, Exhibition Road' },
  { slug: 'lohia-nagar', name: 'Lohia Nagar', pincode: '800020', landmarks: 'Kankarbagh, Mithapur Bypass' },
  { slug: 'khemnichak', name: 'Khemnichak', pincode: '800027', landmarks: 'New Jaganpura Road, Ram Krishna Nagar' },
  { slug: 'khagaul', name: 'Khagaul', pincode: '801105', landmarks: 'Danapur, Bihta Road' },
  { slug: 'saguna-more', name: 'Saguna More', pincode: '801503', landmarks: 'Bailey Road, Danapur, RPS More' },
  { slug: 'beur', name: 'Beur', pincode: '800002', landmarks: 'Anisabad, Phulwari Sharif' },
  { slug: 'bihta', name: 'Bihta', pincode: '801103', landmarks: 'IIT Patna, NH-98' },
  { slug: 'gardanibagh', name: 'Gardanibagh', pincode: '800002', landmarks: 'Anisabad, Patna Airport' },
  { slug: 'punaichak', name: 'Punaichak', pincode: '800023', landmarks: 'Boring Road, Patliputra' },
  { slug: 'sri-krishna-puri', name: 'Sri Krishna Puri', pincode: '800001', landmarks: 'Boring Road, Nageshwar Colony' },
  { slug: 'bakerganj', name: 'Bakerganj', pincode: '800004', landmarks: 'Gandhi Maidan, Patna Sahib' },
  { slug: 'machuatoli', name: 'Machuatoli', pincode: '800004', landmarks: 'Patna City, Ashok Rajpath' },
  { slug: 'kurji', name: 'Kurji', pincode: '800010', landmarks: 'Patna Sahib Road, Kurji Holy Family Hospital' },
  { slug: 'dikshanti-nagar', name: 'Dikshanti Nagar', pincode: '800010', landmarks: 'Patna City' },
  { slug: 'chitkohra', name: 'Chitkohra', pincode: '800008', landmarks: 'Patna Sahib' },
  { slug: 'west-patel-nagar', name: 'West Patel Nagar', pincode: '800023', landmarks: 'Bailey Road, Patliputra' },
  { slug: 'rajiv-nagar', name: 'Rajiv Nagar', pincode: '800024', landmarks: 'Kankarbagh, Punaichak' },
  { slug: 'ashok-nagar', name: 'Ashok Nagar', pincode: '800020', landmarks: 'Kankarbagh' },
  { slug: 'jp-nagar', name: 'JP Nagar', pincode: '800013', landmarks: 'Patliputra' },
  { slug: 'digha', name: 'Digha', pincode: '800011', landmarks: 'Digha Ghat, Patliputra, Danapur Road' },
  { slug: 'kadamkuan', name: 'Kadamkuan', pincode: '800003', landmarks: 'Rajendra Nagar, Nala Road, Patna Junction' },
  { slug: 'kumhrar', name: 'Kumhrar', pincode: '800026', landmarks: 'Kankarbagh, Patna City' },
  { slug: 'raja-bazar', name: 'Raja Bazar', pincode: '800014', landmarks: 'Patna Junction, Boring Road, Nala Road' },
  { slug: 'khajpura', name: 'Khajpura', pincode: '800014', landmarks: 'Boring Road, Patliputra' },
  { slug: 'boring-canal-road', name: 'Boring Canal Road', pincode: '800001', landmarks: 'Boring Road, Nageshwar Colony' },
  { slug: 'rukanpura', name: 'Rukanpura', pincode: '800014', landmarks: 'Bailey Road, Patliputra' },
  { slug: 'patel-nagar', name: 'Patel Nagar', pincode: '800023', landmarks: 'Bailey Road, Patliputra, RPS More' },
  { slug: 'nala-road', name: 'Nala Road', pincode: '800003', landmarks: 'Kadamkuan, Raja Bazar, Patna Junction' },
  { slug: 'ag-colony', name: 'AG Colony', pincode: '800023', landmarks: 'Patliputra, Patel Nagar' },
  { slug: 'mahendru', name: 'Mahendru', pincode: '800006', landmarks: 'Patna Sahib, Ashok Rajpath' },
];

// All RO brands serviced with logos
export const BRANDS_SERVICED = [
  { name: 'Kent', logo: '/brands/kent.png', slug: 'kent' },
  { name: 'Aquaguard (Eureka Forbes)', logo: '/brands/aquaguard.png', slug: 'aquaguard-eureka-forbes' },
  { name: 'Livpure', logo: '/brands/livpure.png', slug: 'livpure' },
  { name: 'Pureit (HUL)', logo: '/brands/pureit.png', slug: 'pureit-hul' },
  { name: 'AO Smith', logo: '/brands/ao-smith.png', slug: 'ao-smith' },
  { name: 'Blue Star', logo: '/brands/blue-star.png', slug: 'blue-star' },
  { name: 'Havells', logo: '/brands/havells.png', slug: 'havells' },
  { name: 'LG', logo: '/brands/lg.png', slug: 'lg' },
  { name: 'Samsung', logo: '/brands/samsung.png', slug: 'samsung' },
  { name: 'Whirlpool', logo: '/brands/whirlpool.png', slug: 'whirlpool' },
  { name: 'V-Guard', logo: '/brands/v-guard.png', slug: 'v-guard' },
  { name: 'Usha Shriram', logo: '/brands/usha-shriram.png', slug: 'usha-shriram' },
  { name: 'Blue Mount', logo: '/brands/bluemount.png', slug: 'blue-mount' },
  { name: 'Nasaka', logo: '/brands/nasaka.png', slug: 'nasaka' },
  { name: 'Aquafresh', logo: '/brands/aquafresh.png', slug: 'aquafresh' },
  { name: 'Aqua Natural', logo: '/brands/aqua-natural.png', slug: 'aqua-natural' },
  { name: 'Tata Swach', logo: '/brands/tata-swach.png', slug: 'tata-swach' },
  { name: 'Eureka Forbes', logo: '/brands/eureka-forbes.png', slug: 'eureka-forbes' },
];

// Services offered (competitor analysis - unke packages)
export const SERVICE_PACKAGES = [
  { id: 'visit', name: 'General Visit & Diagnosis', price: 200, mrp: 299, includes: ['Complete machine check-up', 'Problem diagnosis', 'Quote for repairs', 'No hidden charges'], note: 'Visit charge adjustable in repair' },
  { id: 'repair', name: 'RO Repair (Labour)', price: 299, mrp: 499, includes: ['All types of repair', 'Leakage fix', 'Pressure issue', '30-day service warranty'], note: 'Spare parts extra' },
  { id: 'service', name: 'Routine Service', price: 399, mrp: 599, includes: ['Complete cleaning', 'Filter check & cleaning', 'TDS adjustment', 'Water flow optimization'], note: 'Filters cost extra' },
  { id: 'filter-change', name: 'Filter Change Kit', price: 799, mrp: 1200, includes: ['Sediment filter', 'Carbon filter', 'Pre-filter set', 'Installation included'] },
  { id: 'membrane-change', name: 'RO Membrane Change', price: 1499, mrp: 2200, includes: ['80 GPD membrane', 'Installation', 'TDS calibration', '6-month warranty'] },
  { id: 'installation', name: 'New RO Installation', price: 499, mrp: 799, includes: ['Wall mounting', 'All pipe fittings', 'Electrical connection', 'Initial setup & demo'] },
  { id: 'uninstallation', name: 'RO Uninstallation', price: 299, mrp: 499, includes: ['Safe removal', 'Pipe disconnection', 'Packing for transport'] },
];

// AMC Plans (competitor analysis ke baad)
export const AMC_PLANS = [
  {
    name: 'Basic AMC',
    price: 1499, mrp: 2000,
    color: 'cyan',
    popular: false,
    includes: [
      '3 periodical services (1 year)',
      'Complete system check-up',
      'Filter & tank cleaning',
      'TDS adjustment',
      'Priority customer support'
    ],
    excludes: ['Spare parts chargeable', 'Membrane not included', 'Breakdown repairs chargeable']
  },
  {
    name: 'Silver AMC',
    price: 2499, mrp: 3500,
    color: 'blue',
    popular: true,
    includes: [
      '3 periodical services',
      'Complete cleaning & diagnostics',
      '1 Set of Pre-Filters FREE',
      'TDS & flow optimization',
      'Priority support',
      'Free water quality test'
    ],
    excludes: ['RO Membrane chargeable', 'Electrical parts chargeable']
  },
  {
    name: 'Gold AMC',
    price: 4999, mrp: 7000,
    color: 'orange',
    popular: false,
    includes: [
      'Unlimited service visits',
      '1 Complete filter set FREE',
      '1 RO Membrane FREE',
      'All mechanical breakdowns FREE',
      'Highest priority (2hr response)',
      'Free water testing every quarter',
      '10% off on all spare parts'
    ],
    excludes: ['Only electrical parts (pump/SMPS) chargeable']
  }
];

export const FAQ = [
  { q: 'RO repair mein kitna kharcha aata hai Patna mein?', a: 'Hamara ₹200 visit charge hai (diagnosis ke liye). Repair ka actual kaam dekh ke quote dete hain, aur customer ke approval ke baad hi kaam karte hain. Koi hidden charge nahi. Routine service ₹399, filter change ₹799 se, membrane change ₹1499 se start. Sabse sasta Patna mein!' },
  { q: 'Kitne time mein technician aa jata hai?', a: 'Agar aap subah 4 baje se pehle book karte hain to same-day service available hai. Usually 2-4 ghante mein technician aapke darwaje par pohoch jata hai. Emergency service bhi available hai — bas call karo 9241536586.' },
  { q: 'Kaun-kaun se brand ke RO service karte ho?', a: 'Hum sab major brands service karte hain — Kent, Aquaguard (Eureka Forbes), Livpure, Pureit (HUL), AO Smith, Blue Star, Havells, LG, Samsung, Whirlpool, V-Guard, Tata Swach, aur local/generic brands bhi. Sabhi purifier models pe kaam karte hain.' },
  { q: 'Service par warranty milti hai?', a: 'Ji haan! Har service par 30-day ki service warranty milti hai. Agar usi problem se 30 din mein fir se issue aaye to bilkul free mein fix karte hain. Spare parts pe alag se 3-6 month warranty milti hai.' },
  { q: 'Genuine parts hi use karte ho?', a: 'Haan bhai, 100% original company ke spare parts use karte hain. Membranes (80 GPD / 100 GPD), carbon/sediment filters, UV lamps, pumps — sab branded. Local duplicate parts kabhi nahi dalte.' },
  { q: 'Patna ke kin areas mein service dete ho?', a: 'Hum pure Patna mein service dete hain — Boring Road, Kankarbagh, Patna Sahib, Danapur, Bailey Road, Patliputra, Phulwari Sharif, Rajendra Nagar, Mithapur, Anisabad, Beur, Khagaul, Gardanibagh, Bihta, Kurji, aur 30+ areas mein. Pincode 800001 to 801505 sab covered.' },
  { q: 'AMC plans bhi available hain?', a: 'Haan! 3 AMC plans hain — Basic ₹1499/year, Silver ₹2499/year (pre-filters free), Gold ₹4999/year (membrane bhi free + unlimited visits). Gold AMC se har saal ₹3000+ ki bachat hoti hai.' },
  { q: 'Naya RO kharidna bhi chahte hain?', a: 'Bilkul! Hum naye RO purifiers, commercial plants, aur genuine spare parts bhi bechte hain. Website se order karein ya seedha call karo — free delivery pan-India, Patna mein free installation.' },
];

// SEO keywords jo log Google pe search karte hai (competitor analysis ke baad)
export const SEO_KEYWORDS = [
  'ro service in patna',
  'ro repair patna',
  'ro water purifier service patna',
  'kent ro service patna',
  'aquaguard service patna',
  'ro installation patna',
  'ro service near me',
  'water purifier repair patna',
  'ro membrane change patna',
  'ro filter change patna',
  'ro repair near me',
  'best ro service in patna',
  'patna ro service centre',
  'ro amc patna',
  'cheap ro service patna',
  'ro mechanic patna',
  'ro technician patna',
  'livpure service patna',
  'pureit service patna',
  'ao smith service patna',
  'ro shop patna',
  'commercial ro plant patna',
  'ro spare parts patna',
  'ro purifier price patna',
  'ro service boring road',
  'ro service kankarbagh',
  'ro repair danapur patna',
  'ro repair near me patna',
  'kent ro repair patna',
  'ro water problem patna',
  'ro leakage repair patna',
  'ro tds problem patna',
  'water purifier mechanic near me',
  'ro installation near me',
  'domestic ro service patna',
  '24 hour ro service patna',
  'same day ro service patna',
  'ro repair patna contact number',
  'ro service patna number',
  'eureka forbes service patna',
];

export function waLink(phone: string, msg?: string) {
  const clean = phone.replace(/\D/g,'');
  const text = msg ? `?text=${encodeURIComponent(msg)}` : '';
  return `https://wa.me/91${clean}${text}`;
}

export function telLink(phone: string) {
  return `tel:+91${phone.replace(/\D/g,'')}`;
}

// Generate SEO meta for an area page
export function getAreaSEO(areaSlug: string) {
  const area = PATNA_AREAS.find(a => a.slug === areaSlug);
  if (!area) return null;
  return {
    title: `RO Service in ${area.name} Patna | ₹200 Visit Charge | Same-Day Repair - RO Service Patna`,
    description: `Best RO service in ${area.name}, Patna. Same-day RO repair, installation, filter & membrane change starting ₹200 visit charge. All brands — Kent, Aquaguard, Livpure. Call 9241536586 now!`,
    keywords: [
      `RO service in ${area.name}`,
      `RO repair ${area.name} Patna`,
      `water purifier service ${area.name}`,
      `RO installation ${area.name}`,
      `RO mechanic near ${area.name}`,
      `Kent RO service ${area.name} Patna`,
      `Aquaguard service ${area.name}`,
      `RO filter change ${area.name}`,
      `${area.name} Patna RO repair`,
      `best RO service near ${area.name}`,
      `RO AMC ${area.name} Patna`,
      `water purifier repair ${area.name} Patna`,
    ],
  };
}
