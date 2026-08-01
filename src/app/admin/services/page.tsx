'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Phone, UserPlus, CheckCircle2, Search, Filter, RefreshCw, Trash2 } from 'lucide-react';

type ServiceTicket = {
  id: string;
  ticketNumber: string;
  customerName: string;
  phone: string;
  address: string;
  area: string;
  city: string;
  pincode: string;
  machineBrand?: string;
  issueType: string;
  issueDescription: string;
  status: string;
  technician?: { name: string } | null;
  visitCharge: number;
  createdAt: string;
};

const statusStyles: Record<string, string> = {
  NEW: 'bg-red-100 text-red-700',
  CONTACTED: 'bg-blue-100 text-blue-700',
  SCHEDULED: 'bg-purple-100 text-purple-700',
  TECHNICIAN_ASSIGNED: 'bg-orange-100 text-orange-700',
  IN_PROGRESS: 'bg-indigo-100 text-indigo-700',
  COMPLETED: 'bg-green-100 text-green-700',
  CANCELLED: 'bg-gray-100 text-gray-700',
  NO_RESPONSE: 'bg-yellow-100 text-yellow-700',
};

export default function AdminServicesPage() {
  const [tickets, setTickets] = useState<ServiceTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [kpi, setKpi] = useState({ new: 0, inProgress: 0, completed: 0, total: 0 });

  const loadTickets = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter) params.set('status', statusFilter);
      const res = await fetch(`/api/service-requests?${params.toString()}`, { cache: 'no-store' });
      const data = await res.json();
      setTickets(data.items || []);
      // Count KPIs
      const all = data.items || [];
      setKpi({
        new: all.filter((t: ServiceTicket) => t.status === 'NEW').length,
        inProgress: all.filter((t: ServiceTicket) => ['CONTACTED','SCHEDULED','TECHNICIAN_ASSIGNED','IN_PROGRESS'].includes(t.status)).length,
        completed: all.filter((t: ServiceTicket) => t.status === 'COMPLETED').length,
        total: all.length,
      });
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => { loadTickets(); }, [statusFilter]);

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/service-requests/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    loadTickets();
  };

  const filtered = tickets.filter(t =>
    !filter ||
    t.customerName.toLowerCase().includes(filter.toLowerCase()) ||
    t.phone.includes(filter) ||
    t.ticketNumber.toLowerCase().includes(filter.toLowerCase()) ||
    t.address.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl text-navy-900">Service Requests (Patna)</h1>
          <p className="text-sm text-gray-500">Local RO repair & installation tickets — live database</p>
        </div>
        <Button onClick={loadTickets} variant="outline"><RefreshCw className="h-4 w-4"/>Refresh</Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        <Card><CardContent className="flex items-center justify-between p-5"><div><p className="text-sm text-gray-500">New Today</p><p className="mt-1 text-3xl font-extrabold text-navy-900">{kpi.new}</p></div><div className="h-12 w-12 rounded-xl bg-red-500 opacity-80" /></CardContent></Card>
        <Card><CardContent className="flex items-center justify-between p-5"><div><p className="text-sm text-gray-500">In Progress</p><p className="mt-1 text-3xl font-extrabold text-navy-900">{kpi.inProgress}</p></div><div className="h-12 w-12 rounded-xl bg-indigo-500 opacity-80" /></CardContent></Card>
        <Card><CardContent className="flex items-center justify-between p-5"><div><p className="text-sm text-gray-500">Completed</p><p className="mt-1 text-3xl font-extrabold text-navy-900">{kpi.completed}</p></div><div className="h-12 w-12 rounded-xl bg-green-500 opacity-80" /></CardContent></Card>
        <Card><CardContent className="flex items-center justify-between p-5"><div><p className="text-sm text-gray-500">Total</p><p className="mt-1 text-3xl font-extrabold text-navy-900">{kpi.total}</p></div><div className="h-12 w-12 rounded-xl bg-brand-500 opacity-80" /></CardContent></Card>
      </div>

      <Card>
        <CardContent className="p-5">
          <div className="mb-4 flex flex-wrap gap-2 items-center">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input placeholder="Name, phone, ticket, address..." className="pl-9" value={filter} onChange={e => setFilter(e.target.value)} />
            </div>
            <select className="h-9 rounded-lg border border-gray-200 bg-white px-3 py-1 text-sm outline-none focus:border-brand-500 max-w-[200px]" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
              <option value="">All statuses</option>
              <option value="NEW">New</option>
              <option value="CONTACTED">Contacted</option>
              <option value="SCHEDULED">Scheduled</option>
              <option value="TECHNICIAN_ASSIGNED">Technician Assigned</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>

          {loading ? (
            <div className="py-10 text-center text-gray-500">Loading tickets...</div>
          ) : filtered.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-gray-500">Koi service request abhi nahi mili.</p>
              <p className="mt-1 text-xs text-gray-400">Form bhare jaane par yahaan dikhenge.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-y bg-gray-50 text-left text-xs uppercase tracking-wider text-gray-500">
                    <th className="px-4 py-3">Ticket</th>
                    <th className="px-4 py-3">Customer</th>
                    <th className="px-4 py-3">Area / Patna</th>
                    <th className="px-4 py-3">Issue</th>
                    <th className="px-4 py-3">Technician</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Time</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(t => (
                    <tr key={t.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 font-mono text-xs font-bold text-brand-600">{t.ticketNumber}</td>
                      <td className="px-4 py-3">
                        <p className="font-medium text-navy-900">{t.customerName}</p>
                        <a href={`tel:${t.phone}`} className="text-xs text-brand-600 hover:underline flex items-center gap-1"><Phone className="h-3 w-3"/>{t.phone}</a>
                      </td>
                      <td className="px-4 py-3 text-gray-600 text-xs max-w-[200px] truncate">{t.address}</td>
                      <td className="px-4 py-3"><Badge variant="outline">{t.issueType.replace(/_/g,' ')}</Badge></td>
                      <td className="px-4 py-3">
                        {t.technician ? (
                          <span className="inline-flex items-center gap-1 text-sm"><span className="h-7 w-7 rounded-full bg-brand-100 flex items-center justify-center text-xs font-bold text-brand-700">{t.technician.name[0]}</span>{t.technician.name}</span>
                        ) : (
                          <Button size="sm" variant="outline" onClick={() => updateStatus(t.id, 'TECHNICIAN_ASSIGNED')}><UserPlus className="h-3 w-3"/>Assign</Button>
                        )}
                      </td>
                      <td className="px-4 py-3"><Badge className={statusStyles[t.status] || 'bg-gray-100 text-gray-700'}>{t.status.replace(/_/g,' ')}</Badge></td>
                      <td className="px-4 py-3 text-gray-500 text-xs">{new Date(t.createdAt).toLocaleString('en-IN')}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          <select
                            className="text-xs border rounded px-2 py-1"
                            defaultValue=""
                            onChange={e => { if (e.target.value) { updateStatus(t.id, e.target.value); e.target.value=''; } }}
                          >
                            <option value="">Change status…</option>
                            <option value="CONTACTED">Mark Contacted</option>
                            <option value="SCHEDULED">Mark Scheduled</option>
                            <option value="IN_PROGRESS">In Progress</option>
                            <option value="COMPLETED">Mark Completed</option>
                            <option value="CANCELLED">Cancel</option>
                          </select>
                          <a href={`tel:${t.phone}`} className="p-1 rounded hover:bg-brand-50" title="Call"><Phone className="h-4 w-4 text-brand-600"/></a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
