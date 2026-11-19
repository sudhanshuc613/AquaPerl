/**
 * Patna Service Area Map component.
 * 
 * Features:
 * 1. Google Maps iframe embed (Patna centered, Bihar).
 * 2. Overlay: "Service Area — Entire Patna" with dotted boundary ring (like screenshot).
 * 3. Info card "Patna, Patna, Bihar" with "Open in Maps" + direction buttons.
 * 4. Service areas chip list (top 18 areas) with links.
 * 5. "24 Hours All Days" business hours section.
 * 
 * Bina API key ke kaam karta hai (Google Maps public embed via ll=lat,lng&z=zoom).
 */
'use client';
import Link from 'next/link';
import { MapPin, Navigation, Clock, Phone, MessageCircle, CheckCircle2 } from 'lucide-react';
import { PATNA_AREAS, telLink, waLink } from '@/lib/utils';
import { PhoneText, TelLink, WaLink } from './PhoneLink';

// Patna center coordinates (Gandhi Maidan area)
const PATNA_CENTER = { lat: 25.5941, lng: 85.1376 };

export default function PatnaServiceMap() {
  // Google Maps embed URL — bina API key ke chalta hai (standard public q= parameter)
  const mapSrc = `https://maps.google.com/maps?q=Patna,Bihar,India&ll=${PATNA_CENTER.lat},${PATNA_CENTER.lng}&z=12&t=m&output=embed&iwloc=near`;
  const openMapsUrl = `https://www.google.com/maps/search/?api=1&query=RO+Service+Patna&query_place_id=ChIJYxON8lBakjkReXt6I5wHx3k`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${PATNA_CENTER.lat},${PATNA_CENTER.lng}`;

  return (
    <section className="bg-white">
      <div className="container-pad py-14">
        <div className="mb-8 text-center">
          <span className="inline-flex items-center gap-1 rounded-full bg-brand-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-700">
            <MapPin className="h-3.5 w-3.5" /> Service Coverage
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-navy-900 md:text-4xl">
            Served All Across Patna
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-gray-600">
            Hum Patna ke har kone mein RO service dete hain. Technician 2 ghante mein aapke darwaje par.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Left: Business Hours */}
          <div className="lg:col-span-2 space-y-5">
            <div className="card-surface p-6">
              <h3 className="flex items-center gap-2 text-2xl font-bold text-navy-900">
                <Clock className="h-6 w-6 text-brand-600" /> Business Hours
              </h3>
              <ul className="mt-4 space-y-2 text-navy-900">
                {['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'].map(d => (
                  <li key={d} className="flex items-center justify-between border-b border-gray-100 py-1.5 text-base">
                    <span className="font-medium">{d}</span>
                    <span className="font-bold text-brand-600 flex items-center gap-1">
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
              <h3 className="text-lg font-bold text-navy-900 mb-3">Service Highlights</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                {[
                  'Same-day doorstep service',
                  '2 hour response time',
                  'Genuine spare parts with warranty',
                  'Factory-trained technicians',
                  'Transparent pricing — no hidden charges',
                  'All RO brands serviced',
                ].map(t => (
                  <li key={t} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-600"/> {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Map with overlay */}
          <div className="lg:col-span-3">
            <div className="relative overflow-hidden rounded-2xl border shadow-xl">
              <iframe
                title="RO Service Patna — Service Area Map"
                src={mapSrc}
                width="100%"
                height="520"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />

              {/* Info card — top left on map */}
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

              {/* Service area ring (center dot + pulsing ring) */}
              <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative flex h-28 w-28 items-center justify-center">
                  <div className="absolute h-full w-full animate-ping rounded-full border-2 border-dashed border-red-500/50"/>
                  <div className="absolute h-4/5 w-4/5 animate-pulse rounded-full border-2 border-dashed border-red-500/70"/>
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 ring-4 ring-red-500/30">
                    <MapPin className="h-3.5 w-3.5 text-white" fill="currentColor"/>
                  </div>
                </div>
              </div>

              {/* Coverage badge — bottom right */}
              <div className="absolute bottom-4 right-4 rounded-lg bg-white/95 px-3 py-2 text-xs font-semibold shadow-lg backdrop-blur">
                <p className="text-navy-900"><span className="text-red-500">●</span> 25 km Radius Covered</p>
                <p className="text-gray-500">{PATNA_AREAS.length}+ Localities Served</p>
              </div>

              {/* Google-style terms bar (iframe ke upar nahi dikhta, isliye neeche) */}
            </div>

            {/* Areas chips — SEO keyword signals */}
            <div className="mt-5">
              <p className="mb-2 text-sm font-semibold text-navy-900">हम इन इलाक़ों में सर्विस देते हैं:</p>
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
