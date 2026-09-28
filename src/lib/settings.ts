import { prisma } from './prisma';

const DEFAULTS: Record<string, any> = {
  'brand.name': 'RO Service Patna',
  'brand.tagline': 'Patna ka #1 RO Repair & Installation Service',
  'brand.domain': 'roserviceinpatna.in',
  'contact.primaryPhone': '9241536586',
  'contact.secondaryPhone': '9534037266',
  'contact.whatsapp': '9241536586',
  'contact.email': 'service@roserviceinpatna.in',
  'service.visitCharge': 100,
  'service.filterChange': 499,
  'service.fullService': 1499,
  'seo.patnaAreas': ['Boring Road','Kankarbagh','Patna Sahib','Danapur','Bailey Road','Rajendra Nagar','Gandhi Maidan','Mithapur','Anisabad','Phulwari Sharif','Patliputra','Kidwaipuri','Frazer Road','Lohia Nagar','Khemnichak','Khagaul','Saguna More','Beur','Ashok Rajpath','Bakerganj'],
  'seo.brandsServiced': ['Kent','Aquaguard (Eureka Forbes)','Livpure','Pureit','AO Smith','Blue Star','Havells','LG','Samsung','RO Care India','Generic/Local'],
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
