import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Send, 
  Car, 
  Calendar, 
  Clock, 
  Phone, 
  User, 
  CheckCircle2, 
  MessageCircle, 
  Sparkles, 
  AlertCircle,
  HelpCircle,
  Wrench,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { servicesData, carBrandsList, companyInfo } from '../data/mockData';
import { QuoteFormData } from '../types';

interface QuoteFormSectionProps {
  preselectedService?: string;
  initialProblemText?: string;
}

export const QuoteFormSection: React.FC<QuoteFormSectionProps> = ({ 
  preselectedService = '',
  initialProblemText = ''
}) => {
  const [formData, setFormData] = useState<QuoteFormData>({
    name: '',
    phone: '',
    vehicleBrand: '',
    vehicleModel: '',
    vehicleYear: '',
    serviceId: preselectedService || 'revisao-preventiva',
    problemDescription: initialProblemText || '',
    preferredDate: '',
    preferredPeriod: 'indiferente',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Update when preselectedService or initialProblemText props change
  useEffect(() => {
    if (preselectedService) {
      const match = servicesData.find(s => s.title.toLowerCase() === preselectedService.toLowerCase() || s.id === preselectedService);
      setFormData(prev => ({
        ...prev,
        serviceId: match ? match.id : preselectedService,
      }));
    }
  }, [preselectedService]);

  useEffect(() => {
    if (initialProblemText) {
      setFormData(prev => ({
        ...prev,
        problemDescription: `Sintoma identificado: ${initialProblemText}`,
      }));
    }
  }, [initialProblemText]);

  // Phone masking
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    
    if (value.length > 6) {
      value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    } else if (value.length > 2) {
      value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    }
    
    setFormData(prev => ({ ...prev, phone: value }));
  };

  const getServiceName = (id: string) => {
    const s = servicesData.find(item => item.id === id);
    return s ? s.title : id;
  };

  const generateWhatsAppMessage = () => {
    const sName = getServiceName(formData.serviceId);
    const text = `*SOLICITAÇÃO DE ORÇAMENTO / AGENDAMENTO* 🚗🔧
*Oficina:* Lisboa Centro Automotivo

👤 *Cliente:* ${formData.name || 'Não informado'}
📱 *WhatsApp:* ${formData.phone || 'Não informado'}
🚘 *Veículo:* ${formData.vehicleBrand || ''} ${formData.vehicleModel || ''} (${formData.vehicleYear || 'Ano não informado'})
🛠️ *Serviço Desejado:* ${sName}
📝 *Descrição / Sintoma:* ${formData.problemDescription || 'Nenhum detalhe adicional informado.'}
📅 *Preferência de Data:* ${formData.preferredDate || 'A combinar'} (${formData.preferredPeriod.toUpperCase()})

_Enviado pelo site oficial da Lisboa Centro Automotivo._`;

    return encodeURIComponent(text);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.vehicleModel.trim()) {
      setErrorMsg('Por favor, preencha seu Nome, WhatsApp e o Modelo do veículo.');
      return;
    }

    setErrorMsg('');
    setIsSubmitted(true);

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#dc2626', '#ef4444', '#b91c1c', '#ffffff']
      });
    } catch {
      // ignore
    }
  };

  const handleSendToWhatsAppDirectly = () => {
    const encoded = generateWhatsAppMessage();
    window.open(`https://wa.me/${companyInfo.whatsapp}?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      name: '',
      phone: '',
      vehicleBrand: '',
      vehicleModel: '',
      vehicleYear: '',
      serviceId: 'revisao-preventiva',
      problemDescription: '',
      preferredDate: '',
      preferredPeriod: 'indiferente',
    });
  };

  return (
    <section id="orcamento" className="py-20 sm:py-24 bg-[#0A0A0A] border-y border-white/5 relative">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-red-600/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600/10 border border-red-500/20 text-red-500 text-xs font-semibold uppercase tracking-wider">
            <FileText className="w-3.5 h-3.5" />
            <span>Orçamento Rápido e Sem Compromisso</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Solicite seu Orçamento ou Agendamento
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg">
            Preencha os dados do seu veículo abaixo. Retornamos rapidamente com valores prévios e disponibilidade na nossa oficina em Samambaia Sul.
          </p>
        </div>

        {/* Form Container */}
        <div className="max-w-4xl mx-auto">
          
          {!isSubmitted ? (
            <form 
              onSubmit={handleSubmit}
              className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl space-y-8"
            >
              {errorMsg && (
                <div className="flex items-center gap-2.5 p-4 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs sm:text-sm">
                  <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Step 1: Personal Contact */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-white font-heading font-bold text-lg border-b border-white/10 pb-2">
                  <User className="w-5 h-5 text-red-500" />
                  <span>1. Seus Dados de Contato</span>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-zinc-300">
                      Seu Nome Completo *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="Ex: João da Silva"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 text-sm rounded-xl bg-[#0A0A0A] border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-zinc-300">
                      WhatsApp / Telefone *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        placeholder="(61) 99999-9999"
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        className="w-full pl-10 pr-4 py-3 text-sm rounded-xl bg-[#0A0A0A] border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 transition-colors"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2: Vehicle Details */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-white font-heading font-bold text-lg border-b border-white/10 pb-2">
                  <Car className="w-5 h-5 text-red-500" />
                  <span>2. Dados do Veículo</span>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  
                  {/* Brand select */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-zinc-300">
                      Marca do Veículo
                    </label>
                    <select
                      value={formData.vehicleBrand}
                      onChange={(e) => setFormData({ ...formData, vehicleBrand: e.target.value })}
                      className="w-full px-3.5 py-3 text-sm rounded-xl bg-[#0A0A0A] border border-white/10 text-white focus:outline-none focus:border-red-500 transition-colors"
                    >
                      <option value="">Selecione a marca...</option>
                      {carBrandsList.map((brand) => (
                        <option key={brand} value={brand} className="bg-[#121212] text-white">
                          {brand}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Model input */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-zinc-300">
                      Modelo do Carro *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Corolla, HB20, Onix, Renegade..."
                      value={formData.vehicleModel}
                      onChange={(e) => setFormData({ ...formData, vehicleModel: e.target.value })}
                      className="w-full px-4 py-3 text-sm rounded-xl bg-[#0A0A0A] border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 transition-colors"
                    />
                  </div>

                  {/* Year input */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-zinc-300">
                      Ano de Fabricação
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: 2020"
                      maxLength={4}
                      value={formData.vehicleYear}
                      onChange={(e) => setFormData({ ...formData, vehicleYear: e.target.value.replace(/\D/g, '') })}
                      className="w-full px-4 py-3 text-sm rounded-xl bg-[#0A0A0A] border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 transition-colors"
                    />
                  </div>

                </div>
              </div>

              {/* Step 3: Service Selection & Problem Description */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-white font-heading font-bold text-lg border-b border-white/10 pb-2">
                  <Wrench className="w-5 h-5 text-red-500" />
                  <span>3. Serviço & Descrição do Problema</span>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-zinc-300">
                      Serviço Desejado
                    </label>
                    <select
                      value={formData.serviceId}
                      onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                      className="w-full px-3.5 py-3 text-sm rounded-xl bg-[#0A0A0A] border border-white/10 text-white focus:outline-none focus:border-red-500 transition-colors"
                    >
                      {servicesData.map((svc) => (
                        <option key={svc.id} value={svc.id} className="bg-[#121212] text-white">
                          {svc.title}
                        </option>
                      ))}
                      <option value="outro" className="bg-[#121212] text-white">Outro serviço / Avaliação geral</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-zinc-300">
                      Descreva o que o carro está apresentando (opcional mas recomendado)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Ex: Barulho na suspensão ao passar em buracos, ar-condicionado parou de gelar, troca de óleo vencendo..."
                      value={formData.problemDescription}
                      onChange={(e) => setFormData({ ...formData, problemDescription: e.target.value })}
                      className="w-full p-4 text-sm rounded-xl bg-[#0A0A0A] border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 transition-colors resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Step 4: Preferred Date & Shift */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-white font-heading font-bold text-lg border-b border-white/10 pb-2">
                  <Calendar className="w-5 h-5 text-red-500" />
                  <span>4. Preferência de Data e Horário</span>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-zinc-300">
                      Data Preferencial
                    </label>
                    <input
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full px-4 py-3 text-sm rounded-xl bg-[#0A0A0A] border border-white/10 text-white focus:outline-none focus:border-red-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-zinc-300">
                      Período Preferido
                    </label>
                    <div className="grid grid-cols-3 gap-2 pt-0.5">
                      {[
                        { id: 'manha', label: 'Manhã (08h-12h)' },
                        { id: 'tarde', label: 'Tarde (13h-18h)' },
                        { id: 'indiferente', label: 'Qualquer' },
                      ].map((period) => (
                        <button
                          key={period.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, preferredPeriod: period.id as any })}
                          className={`py-2.5 px-2 text-xs font-semibold rounded-xl border transition-all ${
                            formData.preferredPeriod === period.id
                              ? 'bg-red-600 text-white border-red-600 font-bold shadow-md shadow-red-600/30'
                              : 'bg-[#0A0A0A] border-white/10 text-zinc-400 hover:text-white'
                          }`}
                        >
                          {period.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit CTA Buttons */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-zinc-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Seus dados são seguros e protegidos. Sem spam.</span>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                  <button
                    type="submit"
                    id="btn-submit-orcamento"
                    className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-base shadow-xl shadow-red-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Send className="w-4 h-4 stroke-[2.5]" />
                    <span>Solicitar Orçamento</span>
                  </button>
                </div>
              </div>

            </form>
          ) : (
            /* Confirmation State Card */
            <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-red-500/30 text-center space-y-6 animate-in zoom-in-95 duration-300">
              
              <div className="w-16 h-16 rounded-full bg-red-600/20 text-red-500 flex items-center justify-center mx-auto border border-red-500/30">
                <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-red-500">
                  Solicitação Recebida com Sucesso!
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white">
                  Obrigado, {formData.name}!
                </h3>
                <p className="text-zinc-300 text-sm sm:text-base max-w-xl mx-auto">
                  Recebemos seus dados para o <strong className="text-red-500">{formData.vehicleBrand} {formData.vehicleModel}</strong>. Nossa equipe técnica já está analisando o serviço solicitado (<strong className="text-white">{getServiceName(formData.serviceId)}</strong>).
                </p>
              </div>

              {/* Fast WhatsApp Dispatch button */}
              <div className="p-5 rounded-2xl bg-[#0A0A0A] border border-white/10 max-w-md mx-auto space-y-3 text-left">
                <div className="flex items-center justify-between text-xs font-semibold text-zinc-400">
                  <span>Quer agilizar ainda mais seu atendimento?</span>
                  <span className="text-emerald-400">1 clique</span>
                </div>
                <button
                  type="button"
                  onClick={handleSendToWhatsAppDirectly}
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-lg shadow-emerald-600/30 transition-all hover:scale-[1.02]"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>Enviar Detalhes Direto no WhatsApp</span>
                </button>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-xs text-zinc-400 hover:text-white underline transition-colors"
                >
                  Fazer outra solicitação
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
};
