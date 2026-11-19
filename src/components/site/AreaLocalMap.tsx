/**
 * Per-area mini map with area centered pin.
 * Har /areas/[slug] page pe use hota hai — Google ko strong local signal:
 * "Hum is specific locality me physically service dete hain".
 * Also helps Local Pack ranking because the page explicitly shows
 * the area on a map with our service pin.
 */
'use client';
import { MapPin, Navigation, Phone, MessageCircle } from 'lucide-react';
import { PhoneText, TelLink, WaLink } from './PhoneLink';

interface Props {
  areaName: string;
  pincode: string;
  lat: number;
  lng: number;
}

export default function AreaLocalMap({ areaName, pincode, lat, lng }: Props) {
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(areaName + ', Patna, Bihar ' + pincode)}&ll=${lat},${lng}&z=15&t=m&output=embed`;
  const openMaps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('RO Service ' + areaName + ' Patna')}&query_place_id=${lat},${lng}`;

  return (
    <section className="my-10">
      <div className="mb-4 flex items-center gap-2">
        <MapPin className="h-5 w-5 text-red-500" />
        <h3 className="text-xl font-bold text-navy-900">
          RO Service in {areaName}, Patna — We Are Near You
        </h3>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {/* Map */}
        <div className="relative md:col-span-2 overflow-hidden rounded-2xl border shadow-lg h-64 md:h-72">
          <iframe
            title={`RO Service ${areaName} Patna ${pincode} location map`}
            src={mapSrc}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
          {/* Center pin */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
            <div className="flex flex-col items-center">
              <div className="relative flex h-10 w-10 items-center justify-center">
                <div className="absolute h-full w-full animate-ping rounded-full bg-red-500/40" />
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-white ring-4 ring-white shadow-lg">
                  <MapPin className="h-5 w-5" fill="currentColor" />
                </div>
              </div>
            </div>
          </div>
          {/* Badge */}
          <div className="absolute bottom-2 left-2 rounded bg-white/95 px-2 py-1 text-[11px] font-semibold text-navy-900 shadow">
            📍 {areaName}, Patna — 2 Hrs mein service
          </div>
        </div>

        {/* Info card */}
        <div className="card-surface p-5 flex flex-col justify-center">
          <p className="text-sm text-gray-500 uppercase tracking-wide">Servicing Locality</p>
          <h4 className="text-xl font-bold text-navy-900">{areaName}</h4>
          <p className="text-sm text-gray-600">Patna, Bihar</p>

          <div className="mt-4 space-y-2">
            <TelLink kind="primary" className="flex items-center justify-between rounded-lg bg-cta-orange px-3 py-2 text-sm font-bold text-white hover:bg-orange-600">
              <span className="flex items-center gap-2"><Phone className="h-4 w-4" /> Call Now</span>
              <span><PhoneText kind="primary"/></span>
            </TelLink>
            <WaLink message={`Hi, RO service chahiye ${areaName}, Patna mein`} className="flex items-center justify-between rounded-lg bg-[#25D366] px-3 py-2 text-sm font-bold text-white hover:bg-[#20ba5a]">
              <span className="flex items-center gap-2"><MessageCircle className="h-4 w-4" /> WhatsApp</span>
              <span><PhoneText kind="primary"/></span>
            </WaLink>
            <a href={openMaps} target="_blank" rel="noopener noreferrer"
               className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-bold text-white hover:bg-blue-700">
              <Navigation className="h-4 w-4" /> Open {areaName} in Maps
            </a>
          </div>

          <p className="mt-4 text-xs text-green-700 bg-green-50 rounded p-2">
            ✅ {areaName} mein hamara technician 2 ghante mein aata hai. Genuine spare parts, 30-day warranty.
          </p>
        </div>
      </div>
    </section>
  );
}
