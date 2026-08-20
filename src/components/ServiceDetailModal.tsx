import React from 'react';
import { 
  X, 
  Check, 
  Clock, 
  ShieldCheck, 
  FileText, 
  MessageCircle, 
  Sparkles, 
  Wrench,
  Calendar
} from 'lucide-react';
import { ServiceItem } from '../types';
import { companyInfo } from '../data/mockData';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onSelectForQuote: (serviceTitle: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onSelectForQuote
}) => {
  if (!service) return null;

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Olá! Gostaria de um orçamento detalhado para o serviço de "${service.title}" na Lisboa Centro Automotivo.`
    );
    window.open(`https://wa.me/${companyInfo.whatsapp}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      
      <div 
        className="relative w-full max-w-2xl rounded-3xl bg-[#121212] border border-white/15 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header with Image */}
        <div className="relative h-48 sm:h-56 w-full bg-zinc-900 overflow-hidden flex-shrink-0">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/60 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md text-white/80 hover:text-white flex items-center justify-center border border-white/10 hover:bg-black transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6">
            <span className="text-[11px] font-bold text-red-500 uppercase tracking-wider bg-red-600/15 px-2.5 py-1 rounded-full border border-red-500/25">
              Serviço Especializado
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white mt-2">
              {service.title}
            </h3>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1">
          
          {/* Full description */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Como realizamos este serviço:
            </h4>
            <p className="text-sm text-zinc-300 leading-relaxed">
              {service.fullDesc}
            </p>
          </div>

          {/* Detailed checklist */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Itens verificados e executados:
            </h4>
            <div className="grid sm:grid-cols-2 gap-2">
              {service.itemsIncluded.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 p-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-zinc-200">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical specs */}
          <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-[#0A0A0A] border border-white/10 text-xs">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-red-500" />
              <div>
                <span className="text-zinc-500 block text-[10px]">Tempo Estimado:</span>
                <span className="font-bold text-white">{service.estimatedTime}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <div>
                <span className="text-zinc-500 block text-[10px]">Termo de Garantia:</span>
                <span className="font-bold text-white">{service.warranty}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Actions Footer */}
        <div className="p-4 sm:p-6 bg-[#0A0A0A] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 flex-shrink-0">
          <button
            onClick={() => {
              onClose();
              handleWhatsApp();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Consultar no WhatsApp</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onSelectForQuote(service.title);
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-red-600/30 transition-all hover:scale-[1.02]"
          >
            <FileText className="w-4 h-4 stroke-[2.5]" />
            <span>Solicitar Orçamento Deste Serviço</span>
          </button>
        </div>

      </div>

    </div>
  );
};
