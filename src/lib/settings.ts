import { prisma } from './prisma';

const DEFAULTS: Record<string, any> = {
  'brand.name': 'RO Service Patna',
  'brand.tagline': 'Patna ka #1 RO Repair & Installation Service',
  'brand.domain': 'roserviceinpatna.in',
  'contact.primaryPhone': '9241536586',
  'contact.secondaryPhone': '9534037266',
  'contact.whatsapp': '9241536586',
  'contact.email': 'service@roserviceinpatna.in',
  'service.visitCharge': 200,
  'service.repairLabour': 299,
  'service.routineService': 399,
  'service.filterChange': 799,
  'service.membraneChange': 1499,
  'service.installation': 499,
  'service.uninstallation': 299,
  'amc.basic': 1499,
  'amc.silver': 2499,
  'amc.gold': 4999,
  'seo.metaTitle': 'RO Service in Patna | ₹200 Visit | Same-Day Repair & RO Sale - RO Service Patna',
  'seo.metaDescription': 'Best RO service in Patna at ₹200 visit charge. Same-day RO repair, installation, filter/membrane change for all brands (Kent, Aquaguard, Livpure, AO Smith). Genuine RO purifiers, spare parts & commercial plants with free pan-India delivery. Call 9241536586.',
  'seo.metaKeywords': 'ro service in patna, ro repair patna, ro water purifier service patna, kent ro service patna, aquaguard service patna, ro installation patna, ro service near me, water purifier repair patna, ro membrane change patna, best ro service in patna, patna ro service centre, ro amc patna, ro purifier price patna, commercial ro plant patna',
  'seo.patnaAreas': ['Boring Road','Kankarbagh','Patna Sahib','Danapur','Bailey Road','Rajendra Nagar','Gandhi Maidan','Mithapur','Anisabad','Phulwari Sharif','Patliputra','Kidwaipuri','Frazer Road','Lohia Nagar','Khemnichak','Khagaul','Saguna More','Beur','Bihta','Gardanibagh','Punaichak','Sri Krishna Puri','Bakerganj','Machuatoli','Kurji','Chitkohra','West Patel Nagar','Rajiv Nagar','Ashok Nagar','JP Nagar','Digha','Kadamkuan','Kumhrar','Raja Bazar','Khajpura','Boring Canal Road','Rukanpura','Patel Nagar','Nala Road','AG Colony','Mahendru'],
  'seo.brandsServiced': ['Kent','Aquaguard (Eureka Forbes)','Livpure','Pureit (HUL)','AO Smith','Blue Star','Havells','LG','Samsung','Whirlpool','V-Guard','Tata Swach','Aquafresh','Generic/Local Brands'],
};

export async function getSetting<T = any>(key: string): Promise<T> {
  try {
    const s = await prisma.siteSetting.findUnique({ where: { key } });
    if (s) return s.value as T;
    return DEFAULTS[key] as T;
  } catch {
    return DEFAULTS[key] as T;
  }
}

export async function getAllSettings(): Promise<Record<string, any>> {
  const out: Record<string, any> = {};
  for (const k of Object.keys(DEFAULTS)) out[k] = DEFAULTS[k];
  try {
    const rows = await prisma.siteSetting.findMany();
    for (const r of rows) out[r.key] = r.value;
  } catch {}
  return out;
}

export async function setSetting(key: string, value: any) {
  try {
    await prisma.siteSetting.upsert({ where: { key }, update: { value }, create: { key, value } });
  } catch (e) { console.error('setSetting', e); }
}
