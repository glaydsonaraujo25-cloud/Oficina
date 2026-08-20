import React, { useState, useEffect } from 'react';
import { 
  MessageCircle, 
  X, 
  Send, 
  Clock, 
  CheckCheck, 
  Sparkles, 
  Wrench,
  ChevronRight,
  PhoneCall
} from 'lucide-react';
import { companyInfo } from '../data/mockData';

export const WhatsAppFloat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasPrompted, setHasPrompted] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const defaultMessage = "Olá! Encontrei a oficina pelo site e gostaria de solicitar um orçamento para meu veículo.";

  // Show a gentle preview popup after 4 seconds to invite conversation
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasPrompted(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const openWhatsAppWith = (text: string) => {
    const encoded = encodeURIComponent(text || defaultMessage);
    window.open(`https://wa.me/${companyInfo.whatsapp}?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  const handleSendCustom = (e: React.FormEvent) => {
    e.preventDefault();
    openWhatsAppWith(customMsg || defaultMessage);
    setCustomMsg('');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Expanded Quick Chat Widget */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 rounded-2xl bg-[#121212] border border-emerald-500/30 shadow-2xl shadow-black/80 overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          
          {/* WhatsApp Header */}
          <div className="p-4 bg-gradient-to-r from-emerald-700 to-teal-800 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-emerald-900 border-2 border-emerald-400 flex items-center justify-center font-bold text-white text-sm">
                  LA
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-emerald-900 rounded-full"></span>
              </div>
              <div>
                <h4 className="font-bold text-sm leading-tight">Lisboa Centro Automotivo</h4>
                <p className="text-[11px] text-emerald-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse"></span>
                  Online agora no WhatsApp
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Body Mock */}
          <div className="p-4 space-y-3 bg-[#0A0A0A] text-xs">
            <div className="bg-[#181818] p-3 rounded-2xl rounded-tl-none border border-white/10 text-zinc-200 space-y-1 max-w-[90%]">
              <p className="font-semibold text-emerald-400">Atendimento Lisboa Automotivo 👋</p>
              <p>Olá! Como podemos ajudar seu carro hoje? Você pode solicitar um orçamento ou agendar sua revisão agora mesmo.</p>
              <div className="flex items-center justify-end gap-1 text-[10px] text-zinc-400 pt-1">
                <span>08:00</span>
                <CheckCheck className="w-3 h-3 text-emerald-400" />
              </div>
            </div>

            {/* Quick Action Pills */}
            <div className="space-y-1.5 pt-1">
              <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                Assuntos Rápidos:
              </p>
              <button
                onClick={() => openWhatsAppWith('Olá! Gostaria de um orçamento para troca de óleo e filtros.')}
                className="w-full text-left p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-200 border border-white/5 text-xs flex items-center justify-between transition-colors"
              >
                <span>🛢️ Orçamento de Troca de Óleo</span>
                <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />
              </button>
              <button
                onClick={() => openWhatsAppWith('Olá! Gostaria de agendar uma revisão de freios e suspensão.')}
                className="w-full text-left p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-200 border border-white/5 text-xs flex items-center justify-between transition-colors"
              >
                <span>🛠️ Revisão de Freios e Suspensão</span>
                <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />
              </button>
              <button
                onClick={() => openWhatsAppWith('Olá! A luz da injeção do meu carro acendeu e preciso de um diagnóstico.')}
                className="w-full text-left p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-200 border border-white/5 text-xs flex items-center justify-between transition-colors"
              >
                <span>⚡ Diagnóstico com Scanner</span>
                <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />
              </button>
            </div>
          </div>

          {/* Quick Input Bar */}
          <form onSubmit={handleSendCustom} className="p-3 bg-[#121212] border-t border-white/10 flex items-center gap-2">
            <input
              type="text"
              placeholder="Digite sua mensagem..."
              value={customMsg}
              onChange={(e) => setCustomMsg(e.target.value)}
              className="flex-1 px-3.5 py-2 text-xs rounded-xl bg-[#0A0A0A] border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
            />
            <button
              type="submit"
              className="p-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold transition-transform hover:scale-105"
              title="Enviar no WhatsApp"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}

      {/* Floating Prompt Bubble before opened */}
      {!isOpen && hasPrompted && (
        <div className="mb-2 mr-1 p-3 rounded-2xl bg-[#121212] border border-emerald-500/30 text-white shadow-xl shadow-black/60 text-xs max-w-xs flex items-center gap-3 animate-in fade-in slide-in-from-right-4 duration-300">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping flex-shrink-0" />
          <div className="space-y-0.5">
            <p className="font-bold text-emerald-400">Orçamento Rápido?</p>
            <p className="text-zinc-300 text-[11px]">Fale com o mecânico no WhatsApp em 1 clique!</p>
          </div>
          <button
            onClick={() => setHasPrompted(false)}
            className="text-zinc-500 hover:text-zinc-300 p-0.5"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Floating WhatsApp Trigger Button */}
      <button
        onClick={() => {
          if (isOpen) {
            setIsOpen(false);
          } else {
            // Direct launch on mobile or open box on desktop
            openWhatsAppWith(defaultMessage);
          }
        }}
        id="btn-whatsapp-float"
        className="group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black shadow-2xl shadow-emerald-500/40 hover:shadow-emerald-500/60 transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label="Falar no WhatsApp"
      >
        {/* Pulsing ring animation */}
        <span className="absolute -inset-1 rounded-full bg-emerald-500/40 animate-ping pointer-events-none opacity-60"></span>

        <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 fill-black text-black stroke-[1.5]" />

        {/* Small badge count */}
        <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-600 text-white font-extrabold text-[10px] flex items-center justify-center border-2 border-[#0A0A0A]">
          1
        </span>
      </button>

    </div>
  );
};
