import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Save, Globe, Search as SearchIcon } from 'lucide-react';

const pages = [
  { path: '/', title: 'AquaNexa — Buy RO Purifiers & Book Patna RO Service', desc: 'India\'s trusted RO store and Patna service provider.' },
  { path: '/book-service', title: 'Book RO Service in Patna | ₹100 Visit Charge', desc: 'Same-day RO repair in Patna at just ₹100 visit charge.' },
  { path: '/categories/ro-purifiers', title: 'RO Water Purifiers Online at Best Price', desc: 'Buy domestic RO purifiers from top brands.' },
  { path: '/categories/spare-parts', title: 'Genuine RO Spare Parts Online', desc: 'Membranes, filters, pumps and all RO parts.' },
  { path: '/categories/commercial-plants', title: 'Commercial RO Plants in India', desc: '50-10000 LPH commercial RO solutions.' },
];

export default function AdminSeo() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl text-navy-900">SEO & Content Control</h1>
        <p className="text-sm text-gray-500">Update meta titles, descriptions, OG tags & schema for every page/product</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card><CardContent className="p-5 flex items-center gap-3"><Globe className="h-8 w-8 text-brand-500"/><div><p className="text-2xl font-bold">86</p><p className="text-xs text-gray-500">Pages Indexed</p></div></CardContent></Card>
        <Card><CardContent className="p-5 flex items-center gap-3"><SearchIcon className="h-8 w-8 text-orange-500"/><div><p className="text-2xl font-bold">142</p><p className="text-xs text-gray-500">Keywords Ranking</p></div></CardContent></Card>
        <Card><CardContent className="p-5 flex items-center gap-3"><div className="h-8 w-8 text-green-500 font-bold text-2xl">📈</div><div><p className="text-2xl font-bold">+32%</p><p className="text-xs text-gray-500">Organic Traffic (MoM)</p></div></CardContent></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Page Meta Settings</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-y bg-gray-50 text-left text-xs uppercase text-gray-500">
                  <th className="px-4 py-3">Path</th><th className="px-4 py-3">Meta Title</th>
                  <th className="px-4 py-3">Meta Description</th><th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pages.map(p => (
                  <tr key={p.path} className="border-b">
                    <td className="px-4 py-3 font-mono text-xs text-brand-600">{p.path}</td>
                    <td className="px-4 py-3"><Input defaultValue={p.title} className="min-w-[300px]"/></td>
                    <td className="px-4 py-3"><Input defaultValue={p.desc} className="min-w-[300px]"/></td>
                    <td className="px-4 py-3"><Button size="sm"><Save className="h-3 w-3"/>Save</Button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-gray-500">💡 Product pages auto-sync SEO from their own fields in Products section. For Local SEO, "RO service in Patna" schema is injected on /book-service automatically.</p>
        </CardContent>
      </Card>
    </div>
  );
}
