import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Download,
  MessageCircle,
  Search,
  Trash2,
  Wrench,
  XCircle,
} from 'lucide-react';
import { companyInfo } from '../data/mockData';
import { CustomerRequestRecord, CustomerRequestStatus } from '../types';
import {
  deleteCustomerRequest,
  exportCustomerRequestsAsJson,
  getCustomerRequests,
  updateCustomerRequestStatus,
} from '../utils/requestStore';

const statusLabels: Record<CustomerRequestStatus, string> = {
  new: 'Nova',
  'sent-whatsapp': 'WhatsApp enviado',
  confirmed: 'Confirmada',
  cancelled: 'Cancelada',
};

const statusClasses: Record<CustomerRequestStatus, string> = {
  new: 'border-amber-500/30 bg-amber-500/10 text-amber-300',
  'sent-whatsapp': 'border-blue-500/30 bg-blue-500/10 text-blue-300',
  confirmed: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
  cancelled: 'border-zinc-500/30 bg-zinc-500/10 text-zinc-400',
};

const formatDateTime = (iso: string) =>
  new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(iso));

const downloadJson = () => {
  const blob = new Blob([exportCustomerRequestsAsJson()], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `lisboa-solicitacoes-${new Date().toISOString().slice(0, 10)}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
};

export const AdminDashboard: React.FC = () => {
  const [records, setRecords] = useState<CustomerRequestRecord[]>([]);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | CustomerRequestStatus>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'quote' | 'appointment'>('all');

  const refresh = () => setRecords(getCustomerRequests());

  useEffect(() => {
    refresh();
    window.addEventListener('lisboa:requests-updated', refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener('lisboa:requests-updated', refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);

  const filteredRecords = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return records.filter((record) => {
      const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
      const matchesType = typeFilter === 'all' || record.type === typeFilter;
      const haystack = [
        record.protocol,
        record.name,
        record.phone,
        record.vehicleBrand,
        record.vehicleModel,
        record.serviceName,
      ].join(' ').toLowerCase();
      const matchesQuery = !normalizedQuery || haystack.includes(normalizedQuery);
      return matchesStatus && matchesType && matchesQuery;
    });
  }, [records, query, statusFilter, typeFilter]);

  const stats = useMemo(() => ({
    total: records.length,
    new: records.filter((record) => record.status === 'new').length,
    sent: records.filter((record) => record.status === 'sent-whatsapp').length,
    confirmed: records.filter((record) => record.status === 'confirmed').length,
  }), [records]);

  const handleStatusChange = (protocol: string, status: CustomerRequestStatus) => {
    updateCustomerRequestStatus(protocol, status);
    refresh();
  };

  const handleDelete = (protocol: string) => {
    if (!window.confirm(`Excluir a solicitação ${protocol}?`)) return;
    deleteCustomerRequest(protocol);
    refresh();
  };

  const openWhatsApp = (record: CustomerRequestRecord) => {
    const text = `Olá, ${record.name}! Aqui é da Lisboa Centro Automotivo. Estamos entrando em contato sobre sua solicitação ${record.protocol} referente ao serviço ${record.serviceName}.`;
    const phone = record.phone.replace(/\D/g, '');
    const target = phone.length >= 10 ? `55${phone}` : companyInfo.whatsapp;
    window.open(`https://wa.me/${target}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-zinc-100 px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <button
              type="button"
              onClick={() => { window.location.hash = ''; }}
              className="inline-flex items-center gap-2 text-xs text-zinc-400 hover:text-white mb-4"
            >
              <ArrowLeft className="w-4 h-4" /> Voltar para o site
            </button>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-500">Lisboa Centro Automotivo</p>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-white mt-2">Painel de Solicitações</h1>
            <p className="text-sm text-zinc-400 mt-2 max-w-2xl">Visualização local das solicitações registradas neste navegador. Para uso em produção por vários dispositivos, conecte este painel a um backend e banco de dados.</p>
          </div>
          <button
            type="button"
            onClick={downloadJson}
            disabled={records.length === 0}
            className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-sm font-semibold hover:bg-white/10 disabled:opacity-40"
          >
            <Download className="w-4 h-4" /> Exportar JSON
          </button>
        </header>

        <section className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {[
            ['Total', stats.total, Wrench],
            ['Novas', stats.new, Clock3],
            ['WhatsApp enviado', stats.sent, MessageCircle],
            ['Confirmadas', stats.confirmed, CheckCircle2],
          ].map(([label, value, Icon]) => (
            <article key={String(label)} className="glass-panel rounded-2xl p-5 border border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-400">{String(label)}</span>
                {React.createElement(Icon as React.ComponentType<{ className?: string }>, { className: 'w-4 h-4 text-red-500' })}
              </div>
              <strong className="block text-3xl font-heading text-white mt-3">{Number(value)}</strong>
            </article>
          ))}
        </section>

        <section className="glass-panel rounded-2xl border border-white/10 p-4 sm:p-5 space-y-4">
          <div className="grid lg:grid-cols-[1fr_auto_auto] gap-3">
            <label className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar por nome, veículo, telefone ou protocolo..."
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0A0A0A] border border-white/10 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-red-500"
              />
            </label>
            <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value as typeof typeFilter)} className="px-4 py-3 rounded-xl bg-[#0A0A0A] border border-white/10 text-sm text-white">
              <option value="all">Todos os tipos</option>
              <option value="quote">Orçamentos</option>
              <option value="appointment">Agendamentos</option>
            </select>
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as typeof statusFilter)} className="px-4 py-3 rounded-xl bg-[#0A0A0A] border border-white/10 text-sm text-white">
              <option value="all">Todos os status</option>
              <option value="new">Novas</option>
              <option value="sent-whatsapp">WhatsApp enviado</option>
              <option value="confirmed">Confirmadas</option>
              <option value="cancelled">Canceladas</option>
            </select>
          </div>
          <p className="text-xs text-zinc-500">Exibindo {filteredRecords.length} de {records.length} solicitações.</p>
        </section>

        <section className="space-y-4">
          {filteredRecords.length === 0 ? (
            <div className="glass-panel border border-white/10 rounded-2xl p-10 text-center">
              <CalendarDays className="w-8 h-8 text-zinc-600 mx-auto mb-3" />
              <h2 className="text-lg font-semibold text-white">Nenhuma solicitação encontrada</h2>
              <p className="text-sm text-zinc-500 mt-1">As solicitações feitas neste navegador aparecerão aqui.</p>
            </div>
          ) : filteredRecords.map((record) => (
            <article key={record.protocol} className="glass-panel border border-white/10 rounded-2xl p-5 sm:p-6">
              <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-5">
                <div className="space-y-4 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono text-zinc-400">{record.protocol}</span>
                    <span className={`px-2.5 py-1 rounded-full border text-[11px] font-bold ${statusClasses[record.status]}`}>{statusLabels[record.status]}</span>
                    <span className="px-2.5 py-1 rounded-full border border-white/10 bg-white/5 text-[11px] text-zinc-300">{record.type === 'quote' ? 'Orçamento' : 'Agendamento'}</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">{record.name}</h2>
                    <p className="text-sm text-zinc-400 mt-1">{record.vehicleBrand || 'Marca não informada'} {record.vehicleModel}{record.vehicleYear ? ` • ${record.vehicleYear}` : ''}</p>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                    <div><span className="block text-zinc-500">Serviço</span><strong className="text-zinc-200">{record.serviceName}</strong></div>
                    <div><span className="block text-zinc-500">Telefone</span><strong className="text-zinc-200">{record.phone}</strong></div>
                    <div><span className="block text-zinc-500">Preferência</span><strong className="text-zinc-200">{record.preferredDate || 'A combinar'} {record.preferredPeriod ? `• ${record.preferredPeriod}` : ''}</strong></div>
                    <div><span className="block text-zinc-500">Criada em</span><strong className="text-zinc-200">{formatDateTime(record.createdAt)}</strong></div>
                  </div>
                  {(record.problemDescription || record.notes) && (
                    <p className="text-sm text-zinc-400 leading-relaxed border-t border-white/5 pt-4">{record.problemDescription || record.notes}</p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row xl:flex-col gap-2 xl:w-48 flex-shrink-0">
                  <button type="button" onClick={() => openWhatsApp(record)} className="inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold">
                    <MessageCircle className="w-4 h-4" /> WhatsApp
                  </button>
                  <select value={record.status} onChange={(event) => handleStatusChange(record.protocol, event.target.value as CustomerRequestStatus)} className="px-3 py-2.5 rounded-xl bg-[#0A0A0A] border border-white/10 text-xs text-white">
                    <option value="new">Nova</option>
                    <option value="sent-whatsapp">WhatsApp enviado</option>
                    <option value="confirmed">Confirmada</option>
                    <option value="cancelled">Cancelada</option>
                  </select>
                  <button type="button" onClick={() => handleDelete(record.protocol)} className="inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 text-red-300 text-xs font-bold">
                    <Trash2 className="w-4 h-4" /> Excluir
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>

        <footer className="border-t border-white/5 pt-5 text-xs text-zinc-600 flex items-center gap-2">
          <XCircle className="w-3.5 h-3.5" /> Este painel não possui autenticação de produção e não deve ser usado como CRM definitivo até existir backend seguro.
        </footer>
      </div>
    </main>
  );
};
