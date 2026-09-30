import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone } from 'lucide-react';
import { FAQ, PHONES, telLink, waLink } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'FAQs - RO Service Patna | Common RO Repair Questions Answered',
  description: 'Common questions about RO service, repair, installation, pricing, AMC, warranty in Patna. Get all answers here. Call 9241536586 for any query.',
  keywords: ['RO service Patna FAQ','RO repair questions Patna','RO AMC questions','RO service warranty Patna'],
  alternates: { canonical: '/faq' },
};

export default function FAQPage() {
  return (
    <div>
      <section className="bg-aqua-gradient text-white py-14">
        <div className="container-pad">
          <p className="text-xs text-white/80"><Link href="/" className="hover:text-white">Home</Link> / FAQ</p>
          <h1 className="mt-2 text-white text-3xl md:text-5xl">Frequently Asked Questions</h1>
          <p className="mt-3 max-w-2xl text-white/90">Har RO service se related common questions ke jawab yahan. Aur koi sawal ho to seedha call karo.</p>
        </div>
      </section>

      <section className="container-pad py-12">
        <div className="mx-auto max-w-3xl space-y-3">
          {FAQ.map((f, i) => (
            <details key={i} className="card-surface p-5 group" open={i<2}>
              <summary className="cursor-pointer font-bold text-navy-900 flex items-center justify-between gap-4">
                {f.q}
                <span className="text-brand-500 text-2xl leading-none group-open:rotate-45 transition shrink-0">+</span>
              </summary>
              <p className="mt-3 text-gray-600 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>

        <div className="mt-12 text-center card-surface max-w-xl mx-auto p-8">
          <h3>Aur koi sawal hai?</h3>
          <p className="mt-2 text-gray-600">Seedha call ya WhatsApp karo — turant jawab milega.</p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <a href={telLink(PHONES.primary)} className="btn-primary"><Phone className="h-4 w-4"/>Call {PHONES.primary}</a>
            <a href={waLink(PHONES.whatsapp, 'Hi, ek sawal puchna tha.')} target="_blank" rel="noopener" className="btn-whatsapp">WhatsApp</a>
          </div>
        </div>
      </section>
    </div>
  );
}
