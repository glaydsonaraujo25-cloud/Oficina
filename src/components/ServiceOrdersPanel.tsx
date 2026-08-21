import React, { useEffect, useMemo, useState } from 'react';
import { ClipboardList, Plus, Search, Trash2 } from 'lucide-react';
import { ServiceOrderRecord, ServiceOrderStatus } from '../types';
import { createServiceOrder, deleteServiceOrder, getServiceOrders, updateServiceOrderStatus } from '../utils/serviceOrderStore';

const statusLabels: Record<ServiceOrderStatus, string> = {
  draft: 'Rascunho',
  approved: 'Aprovada',
  'in-progress': 'Em execução',
  'waiting-parts': 'Aguardando peças',
  finished: 'Finalizada',
  delivered: 'Entregue',
  cancelled: 'Cancelada',
};

const money = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value || 0);

const totalOf = (record: ServiceOrderRecord) => {
  const items = record.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  return Math.max(0, items + record.laborValue - record.discount);
};

export const ServiceOrdersPanel: React.FC = () => {
  const [orders, setOrders] = useState<ServiceOrderRecord[]>([]);
  const [query, setQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    customerName: '', phone: '', vehicleBrand: '', vehicleModel: '', vehicleYear: '', plate: '', mileage: '', complaint: '', diagnosis: '',
    itemDescription: '', itemQuantity: '1', itemPrice: '', laborValue: '', discount: '', notes: '',
  });

  const refresh = () => setOrders(getServiceOrders());

  useEffect(() => {
    refresh();
    window.addEventListener('lisboa:service-orders-updated', refresh);
    return () => window.removeEventListener('lisboa:service-orders-updated', refresh);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return orders;
    return orders.filter((order) => [order.number, order.customerName, order.phone, order.vehicleBrand, order.vehicleModel, order.plate].join(' ').toLowerCase().includes(q));
  }, [orders, query]);

  const handleCreate = (event: React.FormEvent) => {
    event.preventDefault();
    if (form.customerName.trim().length < 3 || form.vehicleModel.trim().length < 2) return;

    const itemPrice = Number(form.itemPrice.replace(',', '.')) || 0;
    const itemQuantity = Number(form.itemQuantity) || 1;
    const items = form.itemDescription.trim() ? [{
      id: crypto.randomUUID?.() || String(Date.now()),
      description: form.itemDescription.trim(),
      quantity: itemQuantity,
      unitPrice: itemPrice,
    }] : [];

    createServiceOrder({
      customerName: form.customerName.trim(),
      phone: form.phone.trim(),
      vehicleBrand: form.vehicleBrand.trim(),
      vehicleModel: form.vehicleModel.trim(),
      vehicleYear: form.vehicleYear.trim() || undefined,
      plate: form.plate.trim().toUpperCase() || undefined,
      mileage: form.mileage.trim() || undefined,
      complaint: form.complaint.trim() || undefined,
      diagnosis: form.diagnosis.trim() || undefined,
      items,
      laborValue: Number(form.laborValue.replace(',', '.')) || 0,
      discount: Number(form.discount.replace(',', '.')) || 0,
      notes: form.notes.trim() || undefined,
    });

    setForm({ customerName: '', phone: '', vehicleBrand: '', vehicleModel: '', vehicleYear: '', plate: '', mileage: '', complaint: '', diagnosis: '', itemDescription: '', itemQuantity: '1', itemPrice: '', laborValue: '', discount: '', notes: '' });
    setShowForm(false);
    refresh();
  };

  return (
    <section className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="font-heading text-2xl font-bold text-white">Ordens de Serviço</h2>
          <p className="text-sm text-zinc-500">Crie e acompanhe o andamento dos serviços da oficina.</p>
        </div>
        <button type="button" onClick={() => setShowForm((value) => !value)} className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-sm font-bold text-white">
          <Plus className="w-4 h-4" /> Nova OS
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="glass-panel border border-white/10 rounded-2xl p-5 sm:p-6 space-y-5">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <input required minLength={3} placeholder="Nome do cliente *" value={form.customerName} onChange={(e) => setForm({ ...form, customerName: e.target.value })} className="input-admin" />
            <input placeholder="WhatsApp" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input-admin" />
            <input placeholder="Marca" value={form.vehicleBrand} onChange={(e) => setForm({ ...form, vehicleBrand: e.target.value })} className="input-admin" />
            <input required minLength={2} placeholder="Modelo *" value={form.vehicleModel} onChange={(e) => setForm({ ...form, vehicleModel: e.target.value })} className="input-admin" />
            <input placeholder="Ano" maxLength={4} value={form.vehicleYear} onChange={(e) => setForm({ ...form, vehicleYear: e.target.value.replace(/\D/g, '') })} className="input-admin" />
            <input placeholder="Placa" maxLength={8} value={form.plate} onChange={(e) => setForm({ ...form, plate: e.target.value })} className="input-admin" />
            <input placeholder="Quilometragem" value={form.mileage} onChange={(e) => setForm({ ...form, mileage: e.target.value })} className="input-admin" />
            <input placeholder="Mão de obra (R$)" inputMode="decimal" value={form.laborValue} onChange={(e) => setForm({ ...form, laborValue: e.target.value })} className="input-admin" />
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <textarea rows={3} placeholder="Reclamação do cliente" value={form.complaint} onChange={(e) => setForm({ ...form, complaint: e.target.value })} className="input-admin resize-none" />
            <textarea rows={3} placeholder="Diagnóstico técnico" value={form.diagnosis} onChange={(e) => setForm({ ...form, diagnosis: e.target.value })} className="input-admin resize-none" />
          </div>

          <div className="grid sm:grid-cols-[1fr_120px_160px] gap-3">
            <input placeholder="Peça / serviço" value={form.itemDescription} onChange={(e) => setForm({ ...form, itemDescription: e.target.value })} className="input-admin" />
            <input type="number" min="1" placeholder="Qtd." value={form.itemQuantity} onChange={(e) => setForm({ ...form, itemQuantity: e.target.value })} className="input-admin" />
            <input placeholder="Valor unitário" inputMode="decimal" value={form.itemPrice} onChange={(e) => setForm({ ...form, itemPrice: e.target.value })} className="input-admin" />
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <input placeholder="Desconto (R$)" inputMode="decimal" value={form.discount} onChange={(e) => setForm({ ...form, discount: e.target.value })} className="input-admin" />
            <input placeholder="Observações" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="input-admin" />
          </div>

          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2.5 rounded-xl border border-white/10 text-sm text-zinc-300">Cancelar</button>
            <button type="submit" className="px-5 py-2.5 rounded-xl bg-red-600 text-sm font-bold text-white">Criar OS</button>
          </div>
        </form>
      )}

      <label className="relative block">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar OS por número, cliente, veículo ou placa..." className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0A0A0A] border border-white/10 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-red-500" />
      </label>

      {filtered.length === 0 ? (
        <div className="glass-panel border border-white/10 rounded-2xl p-10 text-center">
          <ClipboardList className="w-8 h-8 text-zinc-600 mx-auto mb-3" />
          <p className="text-white font-semibold">Nenhuma OS encontrada</p>
          <p className="text-sm text-zinc-500 mt-1">Crie a primeira ordem de serviço pelo botão “Nova OS”.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((order) => (
            <article key={order.number} className="glass-panel border border-white/10 rounded-2xl p-5 sm:p-6">
              <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-5">
                <div className="space-y-4 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs text-red-400">{order.number}</span>
                    <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-300">{statusLabels[order.status]}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{order.customerName}</h3>
                    <p className="text-sm text-zinc-400">{order.vehicleBrand} {order.vehicleModel}{order.vehicleYear ? ` • ${order.vehicleYear}` : ''}{order.plate ? ` • ${order.plate}` : ''}{order.mileage ? ` • ${order.mileage} km` : ''}</p>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                    <div><span className="block text-zinc-500">Peças/serviços</span><strong className="text-zinc-200">{money(order.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0))}</strong></div>
                    <div><span className="block text-zinc-500">Mão de obra</span><strong className="text-zinc-200">{money(order.laborValue)}</strong></div>
                    <div><span className="block text-zinc-500">Desconto</span><strong className="text-zinc-200">{money(order.discount)}</strong></div>
                    <div><span className="block text-zinc-500">Total</span><strong className="text-red-400 text-base">{money(totalOf(order))}</strong></div>
                  </div>
                  {(order.complaint || order.diagnosis) && <div className="grid sm:grid-cols-2 gap-3 text-sm border-t border-white/5 pt-4"><p className="text-zinc-400"><strong className="text-zinc-200">Reclamação:</strong> {order.complaint || '—'}</p><p className="text-zinc-400"><strong className="text-zinc-200">Diagnóstico:</strong> {order.diagnosis || '—'}</p></div>}
                </div>
                <div className="flex flex-col sm:flex-row xl:flex-col gap-2 xl:w-48 flex-shrink-0">
                  <select value={order.status} onChange={(e) => { updateServiceOrderStatus(order.number, e.target.value as ServiceOrderStatus); refresh(); }} className="px-3 py-2.5 rounded-xl bg-[#0A0A0A] border border-white/10 text-xs text-white">
                    {Object.entries(statusLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                  </select>
                  <button type="button" onClick={() => { if (window.confirm(`Excluir ${order.number}?`)) { deleteServiceOrder(order.number); refresh(); } }} className="inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border border-red-500/20 bg-red-500/5 text-red-300 text-xs font-bold"><Trash2 className="w-4 h-4" /> Excluir</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};
