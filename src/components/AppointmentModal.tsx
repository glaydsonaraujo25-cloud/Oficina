import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  Phone, 
  User, 
  Car, 
  Wrench, 
  Send, 
  CheckCircle2, 
  MessageCircle,
  ShieldCheck 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { servicesData, carBrandsList, companyInfo } from '../data/mockData';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceId?: string;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  initialServiceId = 'revisao-preventiva'
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [serviceId, setServiceId] = useState(initialServiceId);
  const [date, setDate] = useState('');
  const [period, setPeriod] = useState<'manha' | 'tarde'>('manha');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    if (value.length > 6) {
      value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    } else if (value.length > 2) {
      value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    }
    setPhone(value);
  };

  const getServiceName = (id: string) => {
    const s = servicesData.find(item => item.id === id);
    return s ? s.title : id;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.5 },
        colors: ['#dc2626', '#ef4444', '#ffffff']
      });
    } catch {
      // ignore
    }
  };

  const handleDirectWhatsApp = () => {
    const sName = getServiceName(serviceId);
    const text = `*AGENDAMENTO RÁPIDO - LISBOA CENTRO AUTOMOTIVO* 🚗
👤 *Nome:* ${name}
📱 *WhatsApp:* ${phone}
🚘 *Veículo:* ${brand} ${model}
🛠️ *Serviço:* ${sName}
📅 *Data Desejada:* ${date || 'A combinar'} (${period.toUpperCase()})
📝 *Observações:* ${notes || 'Sem observações.'}`;

    window.open(`https://wa.me/${companyInfo.whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      
      <div 
        className="relative w-full max-w-lg rounded-3xl bg-[#121212] border border-red-500/30 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#0A0A0A] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-red-600/10 text-red-500 flex items-center justify-center font-bold">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-white">Agendar Atendimento</h3>
              <p className="text-xs text-zinc-400">Lisboa Centro Automotivo • Samambaia Sul</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {!submitted ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-300">Seu Nome Completo *</label>
              <input
                type="text"
                required
                placeholder="Ex: Carlos Silva"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-[#0A0A0A] border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-300">WhatsApp *</label>
                <input
                  type="tel"
                  required
                  placeholder="(61) 99999-9999"
                  value={phone}
                  onChange={handlePhoneChange}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-[#0A0A0A] border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-300">Marca do Carro</label>
                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm rounded-xl bg-[#0A0A0A] border border-white/10 text-white focus:outline-none focus:border-red-500"
                >
                  <option value="">Selecione...</option>
                  {carBrandsList.map(b => (
                    <option key={b} value={b} className="bg-[#121212] text-white">{b}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-300">Modelo do Veículo *</label>
              <input
                type="text"
                required
                placeholder="Ex: HB20 1.6, Corolla, Gol..."
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-[#0A0A0A] border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-300">Serviço Pretendido</label>
              <select
                value={serviceId}
                onChange={(e) => setServiceId(e.target.value)}
                className="w-full px-3 py-2.5 text-sm rounded-xl bg-[#0A0A0A] border border-white/10 text-white focus:outline-none focus:border-red-500"
              >
                {servicesData.map(s => (
                  <option key={s.id} value={s.id} className="bg-[#121212] text-white">{s.title}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-300">Data Preferencial</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm rounded-xl bg-[#0A0A0A] border border-white/10 text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-300">Período</label>
                <select
                  value={period}
                  onChange={(e) => setPeriod(e.target.value as any)}
                  className="w-full px-3 py-2.5 text-sm rounded-xl bg-[#0A0A0A] border border-white/10 text-white focus:outline-none focus:border-red-500"
                >
                  <option value="manha" className="bg-[#121212] text-white">Manhã (08h às 12h)</option>
                  <option value="tarde" className="bg-[#121212] text-white">Tarde (13h às 18h)</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-300">Observações adicionais (opcional)</label>
              <textarea
                rows={2}
                placeholder="Ex: Gostaria de trocar o óleo e verificar um barulho na roda dianteira."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-3 text-xs rounded-xl bg-[#0A0A0A] border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 resize-none"
              />
            </div>

            <div className="pt-3">
              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm shadow-xl shadow-red-600/30 transition-all"
              >
                Confirmar Agendamento
              </button>
            </div>
          </form>
        ) : (
          /* Confirmation */
          <div className="p-8 text-center space-y-5">
            <div className="w-14 h-14 rounded-full bg-red-600/20 text-red-500 flex items-center justify-center mx-auto border border-red-500/30">
              <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
            </div>

            <div className="space-y-1">
              <h4 className="font-heading text-xl font-bold text-white">Agendamento Pré-Confirmado!</h4>
              <p className="text-xs text-zinc-300">
                Obrigado, <strong className="text-white">{name}</strong>! Recebemos sua solicitação para o <strong className="text-red-500">{model}</strong>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0A0A0A] border border-white/10 space-y-2 text-left">
              <p className="text-xs text-zinc-400">
                Clique abaixo para enviar a confirmação imediata direto no WhatsApp da oficina:
              </p>
              <button
                type="button"
                onClick={handleDirectWhatsApp}
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-600/30"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Enviar no WhatsApp</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="text-xs text-zinc-400 hover:text-white underline pt-1"
            >
              Fechar janela
            </button>
          </div>
        )}

      </div>

    </div>
  );
};
