import React, { useEffect, useState } from 'react';
import {
  FileText,
  Send,
  Car,
  Calendar,
  Phone,
  User,
  CheckCircle2,
  MessageCircle,
  AlertCircle,
  Wrench,
  ShieldCheck,
  Copy,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { servicesData, carBrandsList, companyInfo } from '../data/mockData';
import { CustomerRequestRecord, QuoteFormData } from '../types';
import {
  formatPhone,
  getToday,
  isPastDate,
  isValidPhone,
  isValidVehicleYear,
} from '../utils/validation';
import {
  createCustomerRequest,
  markCustomerRequestAsSent,
} from '../utils/requestStore';

interface QuoteFormSectionProps {
  preselectedService?: string;
  initialProblemText?: string;
}

const initialFormData: QuoteFormData = {
  name: '',
  phone: '',
  vehicleBrand: '',
  vehicleModel: '',
  vehicleYear: '',
  serviceId: 'revisao-preventiva',
  problemDescription: '',
  preferredDate: '',
  preferredPeriod: 'indiferente',
};

export const QuoteFormSection: React.FC<QuoteFormSectionProps> = ({
  preselectedService = '',
  initialProblemText = '',
}) => {
  const [formData, setFormData] = useState<QuoteFormData>(initialFormData);
  const [requestRecord, setRequestRecord] = useState<CustomerRequestRecord | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!preselectedService) return;

    const match = servicesData.find(
      (service) =>
        service.title.toLowerCase() === preselectedService.toLowerCase() ||
        service.id === preselectedService,
    );

    setFormData((current) => ({
      ...current,
      serviceId: match ? match.id : preselectedService,
    }));
  }, [preselectedService]);

  useEffect(() => {
    if (!initialProblemText) return;
    setFormData((current) => ({
      ...current,
      problemDescription: `Sintoma identificado: ${initialProblemText}`,
    }));
  }, [initialProblemText]);

  const getServiceName = (id: string) => {
    const service = servicesData.find((item) => item.id === id);
    return service ? service.title : id === 'outro' ? 'Outro serviço / Avaliação geral' : id;
  };

  const validateForm = () => {
    if (formData.name.trim().length < 3) return 'Informe seu nome completo.';
    if (!isValidPhone(formData.phone)) return 'Informe um WhatsApp válido com DDD.';
    if (formData.vehicleModel.trim().length < 2) return 'Informe o modelo do veículo.';
    if (!isValidVehicleYear(formData.vehicleYear)) return 'Informe um ano de veículo válido.';
    if (isPastDate(formData.preferredDate)) return 'Escolha uma data de hoje em diante.';
    if (formData.problemDescription.length > 700) return 'A descrição deve ter no máximo 700 caracteres.';
    return '';
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const validationError = validateForm();

    if (validationError) {
      setErrorMsg(validationError);
      return;
    }

    const serviceName = getServiceName(formData.serviceId);
    const record = createCustomerRequest({
      type: 'quote',
      name: formData.name.trim(),
      phone: formData.phone,
      vehicleBrand: formData.vehicleBrand,
      vehicleModel: formData.vehicleModel.trim(),
      vehicleYear: formData.vehicleYear,
      serviceId: formData.serviceId,
      serviceName,
      problemDescription: formData.problemDescription.trim(),
      preferredDate: formData.preferredDate,
      preferredPeriod: formData.preferredPeriod,
    });

    setRequestRecord(record);
    setErrorMsg('');

    try {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    } catch {
      // Decorative only.
    }
  };

  const generateWhatsAppMessage = () => {
    const protocol = requestRecord?.protocol || 'Não gerado';
    const text = `*SOLICITAÇÃO DE ORÇAMENTO - LISBOA CENTRO AUTOMOTIVO* 🚗🔧\n\n🔖 *Protocolo:* ${protocol}\n👤 *Cliente:* ${formData.name}\n📱 *WhatsApp:* ${formData.phone}\n🚘 *Veículo:* ${formData.vehicleBrand || 'Marca não informada'} ${formData.vehicleModel}${formData.vehicleYear ? ` (${formData.vehicleYear})` : ''}\n🛠️ *Serviço:* ${getServiceName(formData.serviceId)}\n📝 *Descrição / Sintoma:* ${formData.problemDescription || 'Nenhum detalhe adicional informado.'}\n📅 *Preferência:* ${formData.preferredDate || 'A combinar'} (${formData.preferredPeriod.toUpperCase()})\n\n_Solicitação gerada pelo site da Lisboa Centro Automotivo. O orçamento e o horário serão confirmados pela equipe._`;
    return encodeURIComponent(text);
  };

  const handleSendToWhatsApp = () => {
    if (requestRecord) markCustomerRequestAsSent(requestRecord.protocol);
    window.open(
      `https://wa.me/${companyInfo.whatsapp}?text=${generateWhatsAppMessage()}`,
      '_blank',
      'noopener,noreferrer',
    );
  };

  const handleCopyProtocol = async () => {
    if (!requestRecord) return;
    try {
      await navigator.clipboard.writeText(requestRecord.protocol);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const handleReset = () => {
    setRequestRecord(null);
    setCopied(false);
    setErrorMsg('');
    setFormData(initialFormData);
  };

  return (
    <section id="orcamento" className="py-20 sm:py-24 bg-[#0A0A0A] border-y border-white/5 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-red-600/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600/10 border border-red-500/20 text-red-500 text-xs font-semibold uppercase tracking-wider">
            <FileText className="w-3.5 h-3.5" />
            <span>Orçamento rápido e sem compromisso</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Solicite seu orçamento
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg">
            Informe os dados do veículo e receba um protocolo para acompanhar a solicitação pelo WhatsApp.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {!requestRecord ? (
            <form onSubmit={handleSubmit} className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl space-y-8">
              {errorMsg && (
                <div role="alert" className="flex items-start gap-2.5 p-4 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs sm:text-sm">
                  <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-white font-heading font-bold text-lg border-b border-white/10 pb-2">
                  <User className="w-5 h-5 text-red-500" />
                  <span>1. Contato</span>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <label className="space-y-1.5 text-xs font-semibold text-zinc-300">
                    Nome completo *
                    <input required minLength={3} autoComplete="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="mt-1.5 w-full px-4 py-3 text-sm rounded-xl bg-[#0A0A0A] border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500" placeholder="Ex: João da Silva" />
                  </label>
                  <label className="space-y-1.5 text-xs font-semibold text-zinc-300">
                    WhatsApp *
                    <div className="relative mt-1.5">
                      <Phone className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input required inputMode="tel" autoComplete="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: formatPhone(e.target.value) })} className="w-full pl-10 pr-4 py-3 text-sm rounded-xl bg-[#0A0A0A] border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500" placeholder="(61) 99999-9999" />
                    </div>
                  </label>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-white font-heading font-bold text-lg border-b border-white/10 pb-2">
                  <Car className="w-5 h-5 text-red-500" />
                  <span>2. Veículo</span>
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  <label className="space-y-1.5 text-xs font-semibold text-zinc-300">Marca
                    <select value={formData.vehicleBrand} onChange={(e) => setFormData({ ...formData, vehicleBrand: e.target.value })} className="mt-1.5 w-full px-3.5 py-3 text-sm rounded-xl bg-[#0A0A0A] border border-white/10 text-white focus:outline-none focus:border-red-500">
                      <option value="">Selecione...</option>
                      {carBrandsList.map((brand) => <option key={brand} value={brand}>{brand}</option>)}
                    </select>
                  </label>
                  <label className="space-y-1.5 text-xs font-semibold text-zinc-300">Modelo *
                    <input required minLength={2} value={formData.vehicleModel} onChange={(e) => setFormData({ ...formData, vehicleModel: e.target.value })} className="mt-1.5 w-full px-4 py-3 text-sm rounded-xl bg-[#0A0A0A] border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500" placeholder="Ex: Corolla" />
                  </label>
                  <label className="space-y-1.5 text-xs font-semibold text-zinc-300">Ano
                    <input inputMode="numeric" maxLength={4} value={formData.vehicleYear} onChange={(e) => setFormData({ ...formData, vehicleYear: e.target.value.replace(/\D/g, '').slice(0, 4) })} className="mt-1.5 w-full px-4 py-3 text-sm rounded-xl bg-[#0A0A0A] border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500" placeholder="Ex: 2022" />
                  </label>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-white font-heading font-bold text-lg border-b border-white/10 pb-2">
                  <Wrench className="w-5 h-5 text-red-500" />
                  <span>3. Serviço e problema</span>
                </div>
                <label className="space-y-1.5 text-xs font-semibold text-zinc-300">Serviço desejado
                  <select value={formData.serviceId} onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })} className="mt-1.5 w-full px-3.5 py-3 text-sm rounded-xl bg-[#0A0A0A] border border-white/10 text-white focus:outline-none focus:border-red-500">
                    {servicesData.map((service) => <option key={service.id} value={service.id}>{service.title}</option>)}
                    <option value="outro">Outro serviço / Avaliação geral</option>
                  </select>
                </label>
                <label className="space-y-1.5 text-xs font-semibold text-zinc-300">Descreva o problema
                  <textarea rows={4} maxLength={700} value={formData.problemDescription} onChange={(e) => setFormData({ ...formData, problemDescription: e.target.value })} className="mt-1.5 w-full p-4 text-sm rounded-xl bg-[#0A0A0A] border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 resize-none" placeholder="Ex: Barulho ao frear, luz no painel, perda de força..." />
                  <span className="block text-right text-[10px] text-zinc-500">{formData.problemDescription.length}/700</span>
                </label>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-white font-heading font-bold text-lg border-b border-white/10 pb-2">
                  <Calendar className="w-5 h-5 text-red-500" />
                  <span>4. Preferência de atendimento</span>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <label className="space-y-1.5 text-xs font-semibold text-zinc-300">Data
                    <input type="date" min={getToday()} value={formData.preferredDate} onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })} className="mt-1.5 w-full px-4 py-3 text-sm rounded-xl bg-[#0A0A0A] border border-white/10 text-white focus:outline-none focus:border-red-500" />
                  </label>
                  <label className="space-y-1.5 text-xs font-semibold text-zinc-300">Período
                    <select value={formData.preferredPeriod} onChange={(e) => setFormData({ ...formData, preferredPeriod: e.target.value as QuoteFormData['preferredPeriod'] })} className="mt-1.5 w-full px-4 py-3 text-sm rounded-xl bg-[#0A0A0A] border border-white/10 text-white focus:outline-none focus:border-red-500">
                      <option value="manha">Manhã (08h às 12h)</option>
                      <option value="tarde">Tarde (13h às 18h)</option>
                      <option value="indiferente">Qualquer período</option>
                    </select>
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-start gap-2 text-xs text-zinc-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>O envio gera uma solicitação, não um orçamento final nem confirmação automática de horário.</span>
                </div>
                <button type="submit" className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-base shadow-xl shadow-red-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]">
                  <Send className="w-4 h-4" />
                  <span>Gerar solicitação</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-red-500/30 text-center space-y-6 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-red-600/20 text-red-500 flex items-center justify-center mx-auto border border-red-500/30">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-red-500">Solicitação criada</span>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white">Protocolo {requestRecord.protocol}</h3>
                <p className="text-zinc-300 text-sm sm:text-base max-w-xl mx-auto">
                  Seus dados foram organizados. Para a oficina receber a solicitação agora, envie o resumo pelo WhatsApp.
                </p>
              </div>

              <div className="max-w-md mx-auto p-4 rounded-2xl bg-[#0A0A0A] border border-white/10 text-left space-y-2 text-xs text-zinc-300">
                <p><strong className="text-white">Veículo:</strong> {formData.vehicleBrand || 'Marca não informada'} {formData.vehicleModel}</p>
                <p><strong className="text-white">Serviço:</strong> {getServiceName(formData.serviceId)}</p>
                <p><strong className="text-white">Preferência:</strong> {formData.preferredDate || 'A combinar'} • {formData.preferredPeriod}</p>
              </div>

              <div className="max-w-md mx-auto grid sm:grid-cols-2 gap-3">
                <button type="button" onClick={handleSendToWhatsApp} className="flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-lg shadow-emerald-600/30 transition-all">
                  <MessageCircle className="w-5 h-5" />
                  <span>Enviar no WhatsApp</span>
                </button>
                <button type="button" onClick={handleCopyProtocol} className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-sm transition-colors">
                  <Copy className="w-4 h-4" />
                  <span>{copied ? 'Protocolo copiado' : 'Copiar protocolo'}</span>
                </button>
              </div>

              <button type="button" onClick={handleReset} className="text-xs text-zinc-400 hover:text-white underline">Fazer outra solicitação</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
