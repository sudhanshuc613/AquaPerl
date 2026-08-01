'use client';
import { useState } from 'react';
import { Check, Star } from 'lucide-react';

const priceRanges = [
  { label: 'Under ₹1,000', min: 0, max: 1000 },
  { label: '₹1,000 – ₹5,000', min: 1000, max: 5000 },
  { label: '₹5,000 – ₹15,000', min: 5000, max: 15000 },
  { label: '₹15,000 – ₹30,000', min: 15000, max: 30000 },
  { label: 'Above ₹30,000', min: 30000, max: 99999999 },
];
const brands = ['AquaNexa', 'Kent', 'Aquaguard', 'Eureka Forbes', 'Pureit', 'Livpure', 'Blue Star'];
const purifTech = ['RO', 'RO+UV', 'RO+UV+UF', 'UV Only', 'UF Only', 'Copper+Mineral'];
const ratings = [4, 3, 2];

export default function ProductFilters() {
  const [filters, setFilters] = useState<{ brands: string[]; price: number[]; rating: number | null; tech: string[] }>({
    brands: [], price: [], rating: null, tech: [],
  });
  const toggle = (key: 'brands' | 'tech', val: string) => {
    setFilters(f => ({ ...f, [key]: f[key].includes(val) ? f[key].filter(x => x !== val) : [...f[key], val] }));
  };
  const setPrice = (range: number[]) => {
    setFilters(f => ({ ...f, price: f.price[0] === range[0] && f.price[1] === range[1] ? [] : range }));
  };

  const section = 'mb-6 border-b pb-5';
  const label = 'mb-3 text-xs font-bold uppercase tracking-wider text-navy-800';
  const chip = (active: boolean) =>
    `flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-all cursor-pointer ${
      active ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-gray-200 hover:border-brand-300'
    }`;

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5">
      <h4 className="mb-4 flex items-center gap-2 font-bold text-navy-900">Filters</h4>

      <div className={section}>
        <p className={label}>Price Range</p>
        <div className="space-y-2">
          {priceRanges.map(r => (
            <label key={r.label} className={chip(filters.price[0] === r.min && filters.price[1] === r.max)} onClick={() => setPrice([r.min, r.max])}>
              <div className={`flex h-4 w-4 items-center justify-center rounded border ${filters.price[0] === r.min ? 'border-brand-500 bg-brand-500' : 'border-gray-300'}`}>
                {filters.price[0] === r.min && <Check className="h-3 w-3 text-white" />}
              </div>
              {r.label}
            </label>
          ))}
        </div>
      </div>

      <div className={section}>
        <p className={label}>Brands</p>
        <div className="space-y-2">
          {brands.map(b => (
            <label key={b} className={chip(filters.brands.includes(b))} onClick={() => toggle('brands', b)}>
              <div className={`flex h-4 w-4 items-center justify-center rounded border ${filters.brands.includes(b) ? 'border-brand-500 bg-brand-500' : 'border-gray-300'}`}>
                {filters.brands.includes(b) && <Check className="h-3 w-3 text-white" />}
              </div>
              {b}
            </label>
          ))}
        </div>
      </div>

      <div className={section}>
        <p className={label}>Purification Technology</p>
        <div className="space-y-2">
          {purifTech.map(t => (
            <label key={t} className={chip(filters.tech.includes(t))} onClick={() => toggle('tech', t)}>
              <div className={`flex h-4 w-4 items-center justify-center rounded border ${filters.tech.includes(t) ? 'border-brand-500 bg-brand-500' : 'border-gray-300'}`}>
                {filters.tech.includes(t) && <Check className="h-3 w-3 text-white" />}
              </div>
              {t}
            </label>
          ))}
        </div>
      </div>

      <div className={section}>
        <p className={label}>Customer Rating</p>
        <div className="space-y-2">
          {ratings.map(r => (
            <label
              key={r}
              className={chip(filters.rating === r)}
              onClick={() => setFilters(f => ({ ...f, rating: f.rating === r ? null : r }))}
            >
              <div className={`flex h-4 w-4 items-center justify-center rounded border ${filters.rating === r ? 'border-brand-500 bg-brand-500' : 'border-gray-300'}`}>
                {filters.rating === r && <Check className="h-3 w-3 text-white" />}
              </div>
              <span className="flex items-center gap-0.5">{r}<Star className="h-3 w-3 fill-orange-400 text-orange-400" /> & above</span>
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={() => setFilters({ brands: [], price: [], rating: null, tech: [] })}
        className="w-full rounded-lg border-2 border-brand-500 py-2 text-sm font-semibold text-brand-600 hover:bg-brand-50"
      >
        Clear Filters
      </button>
    </div>
  );
}
