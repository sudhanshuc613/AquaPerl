import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PHONES, telLink, waLink, PATNA_AREAS } from '@/lib/utils';
import ServiceQuickBook from '@/components/service/ServiceQuickBook';

export const metadata: Metadata = {
  title: 'Contact Us - RO Service Patna | Call 9241536586',
  description: 'Contact RO Service Patna for RO repair, installation, AMC or product queries. Call 9241536586, WhatsApp 9241536586, or book online. Same-day service in all Patna areas.',
  keywords: ['RO service Patna contact','Patna RO service phone number','RO repair Patna contact','RO Service Patna helpline'],
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <div>
      <section className="bg-aqua-gradient text-white py-14">
        <div className="container-pad">
          <p className="text-xs text-white/80"><Link href="/" className="hover:text-white">Home</Link> / Contact</p>
          <h1 className="mt-2 text-white text-3xl md:text-5xl">Contact Us</h1>
          <p className="mt-3 max-w-2xl text-white/90 text-lg">RO repair chahiye? Naya RO kharidna hai? AMC chahiye? Call/WhatsApp/Online — har madad ke liye haazir hain.</p>
        </div>
      </section>

      <div className="container-pad py-12 grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-2 space-y-4">
          {[
            { icon:Phone, title:'Primary Phone', val:PHONES.primary, href:telLink(PHONES.primary), action:'Call Now' },
            { icon:MessageCircle, title:'WhatsApp (Instant)', val:PHONES.whatsapp, href:waLink(PHONES.whatsapp, 'Hi, RO service chahiye.'), action:'WhatsApp Chat', whatsapp:true },
            { icon:Phone, title:'Secondary Phone', val:PHONES.secondary, href:telLink(PHONES.secondary), action:'Call' },
            { icon:Mail, title:'Email', val:'service@roserviceinpatna.in', href:'mailto:service@roserviceinpatna.in', action:'Email' },
            { icon:MapPin, title:'Service Areas', val:'Patna ke 32+ areas', href:'/book-service', action:'View Areas' },
            { icon:Clock, title:'Working Hours', val:'All days 7 AM - 10 PM', href:'#', action:'Same-Day Service' },
          ].map(c => (
            <a key={c.title} href={c.href} target={c.whatsapp?'_blank':undefined} rel="noopener noreferrer" className="card-surface p-5 flex items-center gap-4 hover:shadow-md transition">
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${c.whatsapp?'bg-[#25D366] text-white':'bg-brand-100 text-brand-600'}`}>
                <c.icon className="h-6 w-6"/>
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">{c.title}</p>
                <p className="text-lg font-bold text-navy-900">{c.val}</p>
              </div>
              <Button size="sm" variant={c.whatsapp?'default':'outline'} className={c.whatsapp?'bg-[#25D366] hover:bg-[#20ba5a]':''}>{c.action}</Button>
            </a>
          ))}
        </div>
        <div className="lg:col-span-3">
          <ServiceQuickBook/>
        </div>
      </div>
    </div>
  );
}
