/**
 * Patna Service Area Map — ADVANCED with actual Patna city boundary polygon overlay
 * 
 * Features:
 * - Google Maps embed (Patna city centered)
 * - Red dotted polygon = Patna Municipal Corporation boundary (approximate)
 * - Pulsing center pin on Patna
 * - "Patna, Patna, Bihar" info card with Open in Maps button
 * - 24×7 badge
 * - Service area chips
 * - Two modes: full (used on /contact, /) and compact (used on service pages)
 * 
 * Polygon Patna city boundary approximate trace (Ganges river north side,
 * southern bypass south side, Danapur west, Deedarganj east).
 */
'use client';
import Link from 'next/link';
import { MapPin, Navigation, Clock, Phone, MessageCircle, CheckCircle2, Shield } from 'lucide-react';
import { PATNA_AREAS, waLink } from '@/lib/utils';
import { PhoneText, TelLink, WaLink } from './PhoneLink';

// Patna center (Gandhi Maidan)
const PATNA_CENTER = { lat: 25.5941, lng: 85.1376 };

// Patna city boundary polygon (lat, lng) — approximate trace of PMC limit + Ganges bank
// North edge = Ganges river, south = Patna bypass / Phulwari line, W=Danapur, E=Deedarganj
const PATNA_BOUNDARY_LATLNG: [number, number][] = [
  // West edge (Danapur cantonment area, going north towards Ganges)
  [25.612, 85.038],
  [25.622, 85.055],
  // North (Ganges riverbank) — eastbound curve
  [25.630, 85.080],
  [25.635, 85.100],
  [25.632, 85.125],
  [25.630, 85.150],
  [25.633, 85.175],
  [25.628, 85.200],
  [25.625, 85.220],
  [25.632, 85.240],
  [25.628, 85.255], // near Deedarganj / Sabalpur
  // East edge (turning south along railway)
  [25.610, 85.255],
  [25.595, 85.235],
  // South edge (bypass / Phulwari Sharif / Sampatchak)
  [25.578, 85.220],
  [25.565, 85.190],
  [25.558, 85.160],
  [25.555, 85.130],
  [25.560, 85.100],
  [25.565, 85.075],
  [25.580, 85.055],
  // Back to west (Khagaul/Danapur road)
  [25.600, 85.045],
  [25.612, 85.038], // close
];

// Map viewport (roughly what the iframe shows at z=12 centered on Patna)
const MAP_BOUNDS = {
  north: 25.680, // top of iframe
  south: 25.500, // bottom
  west: 84.990,  // left
  east: 85.290,  // right
};

function latLngToXY(lat: number, lng: number) {
  const x = ((lng - MAP_BOUNDS.west) / (MAP_BOUNDS.east - MAP_BOUNDS.west)) * 100;
  const y = ((MAP_BOUNDS.north - lat) / (MAP_BOUNDS.north - MAP_BOUNDS.south)) * 100;
  return { x, y };
}

const POLYGON_POINTS = PATNA_BOUNDARY_LATLNG.map(([lat, lng]) => {
  const { x, y } = latLngToXY(lat, lng);
  return `${x.toFixed(2)}%,${y.toFixed(2)}%`;
}).join(' ');

interface Props {
  compact?: boolean;
}

export default function PatnaServiceMap({ compact = false }: Props) {
  const mapSrc = `https://maps.google.com/maps?q=Patna,Bihar,India&ll=${PATNA_CENTER.lat},${PATNA_CENTER.lng}&z=12&t=m&output=embed&iwloc=near`;
  const openMapsUrl = `https://www.google.com/maps/search/?api=1&query=RO+Service+Patna`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${PATNA_CENTER.lat},${PATNA_CENTER.lng}`;

  if (compact) {
    // Compact strip — har page ke footer ke upar (small map + call to action)
    return (
      <section className="relative bg-gradient-to-br from-navy-950 via-navy-900 to-brand-900 py-10 text-white">
        <div className="container-pad">
          <div className="grid items-center gap-6 md:grid-cols-5">
            {/* Mini map */}
            <div className="relative md:col-span-2 overflow-hidden rounded-2xl border-4 border-white/20 shadow-2xl h-48 md:h-56">
              <iframe
                title="RO Service Patna Coverage"
                src={mapSrc}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full"
              />
              {/* Patna boundary polygon overlay */}
              <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <filter id="glow-mini"><feGaussianBlur stdDeviation="0.5" result="b"/></filter>
                </defs>
                <polygon points={POLYGON_POINTS} fill="rgba(239,68,68,0.18)" stroke="#ef4444" strokeWidth="0.5" strokeDasharray="1.2,0.8" strokeLinejoin="round" filter="url(#glow-mini)"/>
              </svg>
              {/* Center pin */}
              <div className="pointer-events-none absolute left-1/2 top-[calc((25.680-25.5941)/0.18*100%)] -translate-x-1/2 -translate-y-1/2">
                <div className="relative flex h-4 w-4 items-center justify-center">
                  <div className="absolute h-full w-full animate-ping rounded-full bg-red-500/60"/>
                  <div className="h-3 w-3 rounded-full bg-red-600 ring-2 ring-white"/>
                </div>
              </div>
              {/* Badge */}
              <div className="absolute bottom-2 right-2 rounded bg-green-500 px-2 py-0.5 text-[10px] font-bold text-white shadow">
                ✓ 24×7 Service
              </div>
            </div>

            {/* Text + CTAs */}
            <div className="md:col-span-3">
              <div className="mb-2 inline-flex items-center gap-1 rounded-full bg-red-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-red-300">
                <MapPin className="h-3 w-3"/> Serving Entire Patna
              </div>
              <h3 className="text-2xl md:text-3xl font-extrabold leading-tight">
                2-Hour RO Service, <span className="text-brand-400">64+ Patna Localities</span> Me
              </h3>
              <p className="mt-2 text-white/80 text-sm md:text-base">
                Danapur se Deedarganj tak, Phulwari se Patna Sahib tak — hum technician 2 ghante mein aapke darwaje par.
                Genuine spare parts, 30-day warranty, transparent pricing.
              </p>

              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                {['Danapur','Kankarbagh','Boring Road','Patliputra','Bailey Road','Rajendra Nagar','Gandhi Maidan','Patna Sahib'].map(a => (
                  <span key={a} className="flex items-center gap-1 text-white/90">
                    <CheckCircle2 className="h-3 w-3 text-green-400 shrink-0"/> {a}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <TelLink kind="primary" className="btn-primary flex items-center gap-1.5 bg-white !text-navy-900 hover:bg-gray-100">
                  <Phone className="h-4 w-4"/> Call <PhoneText kind="primary"/>
                </TelLink>
                <WaLink message="Hi, RO service chahiye Patna mein" className="btn-whatsapp flex items-center gap-1.5">
                  <MessageCircle className="h-4 w-4"/> WhatsApp
                </WaLink>
                <Link href="/book-service" className="btn-secondary flex items-center gap-1.5 bg-white/10 border border-white/30 text-white hover:bg-white/20">
                  <Navigation className="h-4 w-4"/> Book Online
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // FULL mode (contact page / homepage)
  return (
    <section className="bg-white">
      <div className="container-pad py-14">
        <div className="mb-8 text-center">
          <span className="inline-flex items-center gap-1 rounded-full bg-brand-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-700">
            <MapPin className="h-3.5 w-3.5" /> Service Coverage Zone
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-navy-900 md:text-4xl">
            Pura Patna Covered <span className="text-red-500">●</span>
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-gray-600">
            Hum Patna ke har kone mein RO service dete hain. Laal dotted line dekh lo — yeh humara service area hai. Technician 2 ghante mein aapke darwaje par.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-5">
            <div className="card-surface p-6">
              <h3 className="flex items-center gap-2 text-2xl font-bold text-navy-900">
                <Clock className="h-6 w-6 text-brand-600" /> Business Hours
              </h3>
              <ul className="mt-4 space-y-2 text-navy-900">
                {['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'].map(d => (
                  <li key={d} className="flex items-center justify-between border-b border-gray-100 py-1.5 text-base">
                    <span className="font-medium">{d}</span>
                    <span className="font-bold text-green-600 flex items-center gap-1">
                      <span className="inline-block h-2 w-2 rounded-full bg-green-500 animate-pulse"/> 24 Hours
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 rounded-lg bg-green-50 p-3 text-sm text-green-800">
                ✅ Emergency service bhi available — raat ko bhi call karo.
              </p>
            </div>

            <div className="card-surface p-6">
              <h3 className="text-lg font-bold text-navy-900 flex items-center gap-2">
                <Phone className="h-5 w-5 text-cta-orange" /> Quick Contact
              </h3>
              <div className="mt-3 space-y-2">
                <TelLink kind="primary" className="flex items-center justify-between rounded-lg bg-cta-orange px-4 py-3 text-sm font-bold text-white hover:bg-orange-600">
                  <span className="flex items-center gap-2"><Phone className="h-4 w-4"/> Call Now</span>
                  <span><PhoneText kind="primary"/></span>
                </TelLink>
                <WaLink message="Hi, RO service chahiye Patna mein" className="flex items-center justify-between rounded-lg bg-[#25D366] px-4 py-3 text-sm font-bold text-white hover:bg-[#20ba5a]">
                  <span className="flex items-center gap-2"><MessageCircle className="h-4 w-4"/> WhatsApp</span>
                  <span><PhoneText kind="primary"/></span>
                </WaLink>
              </div>
            </div>

            <div className="card-surface p-6">
              <h3 className="text-lg font-bold text-navy-900 mb-3 flex items-center gap-2">
                <Shield className="h-5 w-5 text-brand-600"/> Service Highlights
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                {[
                  'Same-day doorstep service',
                  '2 hour response time',
                  'Genuine spare parts with warranty',
                  'Factory-trained technicians',
                  'Transparent pricing — no hidden charges',
                  'All RO brands serviced (Kent/Aquaguard/Livpure/Pureit/AO Smith)',
                ].map(t => (
                  <li key={t} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-600"/> {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Map with polygon overlay */}
          <div className="lg:col-span-3">
            <div className="relative overflow-hidden rounded-2xl border-4 border-white shadow-2xl ring-1 ring-gray-200">
              <iframe
                title="RO Service Patna — Service Area Map (Entire Patna covered)"
                src={mapSrc}
                width="100%"
                height="520"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />

              {/* Patna city boundary polygon — Google Business Profile style red dotted overlay */}
              <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <filter id="glow-strong" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="0.8" result="b"/>
                    <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                  </filter>
                </defs>
                {/* Subtle red fill to show coverage zone */}
                <polygon points={POLYGON_POINTS} fill="rgba(239,68,68,0.12)" stroke="none"/>
                {/* Red dotted boundary (like Google service area) */}
                <polygon
                  points={POLYGON_POINTS}
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="0.7"
                  strokeDasharray="1.5,1"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  filter="url(#glow-strong)"
                />
              </svg>

              {/* Info card top-left */}
              <div className="absolute left-4 top-4 max-w-[280px] rounded-xl bg-white p-4 shadow-2xl">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-500 text-white">
                    <MapPin className="h-5 w-5" fill="currentColor"/>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-gray-900">Patna</p>
                    <p className="text-sm text-gray-500">Patna, Bihar</p>
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <a href={openMapsUrl} target="_blank" rel="noopener noreferrer"
                     className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700">
                    <Navigation className="h-4 w-4"/> Open in Maps
                  </a>
                  <a href={directionsUrl} target="_blank" rel="noopener noreferrer"
                     className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100"
                     aria-label="Get directions">
                    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M21.71 11.29l-9-9a1 1 0 00-1.42 0l-9 9a1 1 0 000 1.42l9 9a1 1 0 001.42 0l9-9a1 1 0 000-1.42zM14 14.5V12h-4v3H8v-4a1 1 0 011-1h5V7.5l3.5 3.5z"/></svg>
                  </a>
                </div>
                <div className="mt-3 rounded-lg bg-green-50 px-2 py-1.5 text-center text-xs font-bold text-green-700">
                  ✓ Service Available 24×7
                </div>
              </div>

              {/* Center pin (Patna/Gandhi Maidan) */}
              <div
                className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${((PATNA_CENTER.lng - MAP_BOUNDS.west) / (MAP_BOUNDS.east - MAP_BOUNDS.west)) * 100}%`,
                  top: `${((MAP_BOUNDS.north - PATNA_CENTER.lat) / (MAP_BOUNDS.north - MAP_BOUNDS.south)) * 100}%`,
                }}
              >
                <div className="relative flex h-10 w-10 items-center justify-center">
                  <div className="absolute h-full w-full animate-ping rounded-full bg-red-500/40"/>
                  <div className="absolute h-8 w-8 animate-pulse rounded-full bg-red-500/60"/>
                  <div className="relative flex h-7 w-7 items-center justify-center rounded-full bg-red-600 ring-4 ring-white shadow-lg">
                    <MapPin className="h-4 w-4 text-white" fill="currentColor"/>
                  </div>
                </div>
              </div>

              {/* Coverage badge bottom-right */}
              <div className="absolute bottom-4 right-4 rounded-lg bg-white/95 px-3 py-2 text-xs font-semibold shadow-lg backdrop-blur">
                <p className="text-navy-900"><span className="text-red-500">●</span> 25 km Radius Covered</p>
                <p className="text-gray-500">{PATNA_AREAS.length}+ Localities Served</p>
              </div>
            </div>

            {/* Legend */}
            <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-gray-600">
              <span className="flex items-center gap-2">
                <svg width="30" height="10"><line x1="0" y1="5" x2="30" y2="5" stroke="#ef4444" strokeWidth="2" strokeDasharray="4,3"/></svg>
                Service Area Boundary (Patna city limit)
              </span>
              <span className="flex items-center gap-2">
                <span className="inline-block h-3 w-3 rounded-full bg-red-500 ring-2 ring-red-500/40"/>
                Hub Location
              </span>
            </div>

            {/* Areas chips */}
            <div className="mt-5">
              <p className="mb-2 text-sm font-semibold text-navy-900">हम इन इलाक़ों में सर्विस देते हैं — All of Patna:</p>
              <div className="flex flex-wrap gap-2">
                {PATNA_AREAS.slice(0, 24).map(a => (
                  <Link key={a.slug} href={`/areas/${a.slug}`}
                        className="rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700 hover:bg-brand-600 hover:text-white transition">
                    {a.name}
                  </Link>
                ))}
                <Link href="/book-service" className="rounded-full bg-navy-900 px-3 py-1 text-xs font-semibold text-white hover:bg-navy-700">
                  +{PATNA_AREAS.length - 24} more areas →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
