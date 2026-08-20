import React, { useEffect, useState } from 'react';
import {
  X,
  Calendar,
  Phone,
  CheckCircle2,
  MessageCircle,
  AlertCircle,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { servicesData, carBrandsList, companyInfo } from '../data/mockData';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceId?: string;
}

const getToday = () => new Date().toISOString().split('T')[0];

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  initialServiceId = 'revisao-preventiva',
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [serviceId, setServiceId] = useState(initialServiceId);
  const [date, setDate] = useState('');
  const [period, setPeriod] = useState<'manha' | 'tarde'>('manha');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (isOpen) {
      setServiceId(initialServiceId);
      setSubmitted(false);
      setErrorMsg('');
    }
  }, [isOpen, initialServiceId]);

  if (!isOpen) return null;

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
    const service = servicesData.find((item) => item.id === id);
    return service ? service.title : id;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const phoneDigits = phone.replace(/\D/g, '');
    if (name.trim().length < 3) {
      setErrorMsg('Informe um nome válido para continuar.');
      return;
    }
    if (phoneDigits.length < 10) {
      setErrorMsg('Informe um WhatsApp válido com DDD.');
      return;
    }
    if (model.trim().length < 2) {
      setErrorMsg('Informe o modelo do veículo.');
      return;
    }
    if (date && date < getToday()) {
      setErrorMsg('Escolha uma data de hoje em diante.');
      return;
    }

    setErrorMsg('');
    setSubmitted(true);

    try {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.5 } });
    } catch {
      // Confetti is decorative only.
    }
  };

  const handleDirectWhatsApp = () => {
    const serviceName = getServiceName(serviceId);
    const text = `*SOLICITAÇÃO DE AGENDAMENTO - LISBOA CENTRO AUTOMOTIVO* 🚗\n👤 *Nome:* ${name}\n📱 *WhatsApp:* ${phone}\n🚘 *Veículo:* ${brand || 'Marca não informada'} ${model}\n🛠️ *Serviço:* ${serviceName}\n📅 *Data desejada:* ${date || 'A combinar'} (${period.toUpperCase()})\n📝 *Observações:* ${notes || 'Sem observações.'}\n\n_A solicitação será confirmada pela equipe da oficina._`;

    window.open(
      `https://wa.me/${companyInfo.whatsapp}?text=${encodeURIComponent(text)}`,
      '_blank',
      'noopener,noreferrer',
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="appointment-title"
    >
      <div
        className="relative w-full max-w-lg rounded-3xl bg-[#121212] border border-red-500/30 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 sm:p-6 bg-[#0A0A0A] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-red-600/10 text-red-500 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 id="appointment-title" className="font-heading font-bold text-lg text-white">Agendar Atendimento</h3>
              <p className="text-xs text-zinc-400">Lisboa Centro Automotivo • Samambaia Sul</p>
            </div>
          </div>

          <button onClick={onClose} aria-label="Fechar agendamento" className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
            {errorMsg && (
              <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/25 text-red-200 text-xs">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-300">Seu Nome Completo *</label>
              <input type="text" required minLength={3} placeholder="Ex: Carlos Silva" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-[#0A0A0A] border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500" />
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-300">WhatsApp *</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input type="tel" required inputMode="tel" placeholder="(61) 99999-9999" value={phone} onChange={handlePhoneChange} className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl bg-[#0A0A0A] border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-300">Marca do Carro</label>
                <select value={brand} onChange={(e) => setBrand(e.target.value)} className="w-full px-3 py-2.5 text-sm rounded-xl bg-[#0A0A0A] border border-white/10 text-white focus:outline-none focus:border-red-500">
                  <option value="">Selecione...</option>
                  {carBrandsList.map((item) => <option key={item} value={item} className="bg-[#121212] text-white">{item}</option>)}
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-300">Modelo do Veículo *</label>
              <input type="text" required minLength={2} placeholder="Ex: HB20 1.6, Corolla, Gol..." value={model} onChange={(e) => setModel(e.target.value)} className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-[#0A0A0A] border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500" />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-300">Serviço Pretendido</label>
              <select value={serviceId} onChange={(e) => setServiceId(e.target.value)} className="w-full px-3 py-2.5 text-sm rounded-xl bg-[#0A0A0A] border border-white/10 text-white focus:outline-none focus:border-red-500">
                {servicesData.map((service) => <option key={service.id} value={service.id} className="bg-[#121212] text-white">{service.title}</option>)}
              </select>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-300">Data Preferencial</label>
                <input type="date" min={getToday()} value={date} onChange={(e) => setDate(e.target.value)} className="w-full px-3 py-2.5 text-sm rounded-xl bg-[#0A0A0A] border border-white/10 text-white focus:outline-none focus:border-red-500" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-300">Período</label>
                <select value={period} onChange={(e) => setPeriod(e.target.value as 'manha' | 'tarde')} className="w-full px-3 py-2.5 text-sm rounded-xl bg-[#0A0A0A] border border-white/10 text-white focus:outline-none focus:border-red-500">
                  <option value="manha" className="bg-[#121212] text-white">Manhã (08h às 12h)</option>
                  <option value="tarde" className="bg-[#121212] text-white">Tarde (13h às 18h)</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-300">Observações adicionais (opcional)</label>
              <textarea rows={2} maxLength={500} placeholder="Ex: Gostaria de trocar o óleo e verificar um barulho na roda dianteira." value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full p-3 text-xs rounded-xl bg-[#0A0A0A] border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 resize-none" />
            </div>

            <p className="text-[11px] leading-relaxed text-zinc-500">O envio do formulário não confirma automaticamente o horário. A equipe da oficina confirma a disponibilidade pelo WhatsApp.</p>

            <button type="submit" className="w-full py-3.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm shadow-xl shadow-red-600/30 transition-all">Revisar solicitação</button>
          </form>
        ) : (
          <div className="p-8 text-center space-y-5">
            <div className="w-14 h-14 rounded-full bg-red-600/20 text-red-500 flex items-center justify-center mx-auto border border-red-500/30"><CheckCircle2 className="w-8 h-8 stroke-[2.5]" /></div>
            <div className="space-y-1">
              <h4 className="font-heading text-xl font-bold text-white">Solicitação pronta para envio</h4>
              <p className="text-xs text-zinc-300">Confira os dados e envie pelo WhatsApp para a equipe confirmar o horário do <strong className="text-red-500">{model}</strong>.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#0A0A0A] border border-white/10 space-y-3 text-left">
              <div className="text-xs text-zinc-300 space-y-1">
                <p><strong className="text-white">Serviço:</strong> {getServiceName(serviceId)}</p>
                <p><strong className="text-white">Data:</strong> {date || 'A combinar'} • {period === 'manha' ? 'Manhã' : 'Tarde'}</p>
              </div>
              <button type="button" onClick={handleDirectWhatsApp} className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-600/30">
                <MessageCircle className="w-4 h-4" />
                <span>Enviar solicitação no WhatsApp</span>
              </button>
            </div>
            <div className="flex justify-center gap-4">
              <button onClick={() => setSubmitted(false)} className="text-xs text-zinc-400 hover:text-white underline">Editar dados</button>
              <button onClick={onClose} className="text-xs text-zinc-400 hover:text-white underline">Fechar</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
