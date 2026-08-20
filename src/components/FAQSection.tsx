import React, { useState } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  MessageCircle, 
  Search, 
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { faqData, companyInfo } from '../data/mockData';

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleAccordion = (id: string) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  const filteredFaqs = faqData.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="faq" className="py-20 sm:py-24 bg-[#0A0A0A] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600/10 border border-red-500/20 text-red-500 text-xs font-semibold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Tire Suas Dúvidas</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Perguntas Frequentes (FAQ)
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg">
            Respostas claras para as principais dúvidas sobre atendimento, prazos, formas de pagamento e garantias.
          </p>
        </div>

        {/* Search inside FAQ */}
        <div className="relative mb-8">
          <Search className="w-4 h-4 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Pesquise uma dúvida (ex: garantia, agendamento, pagamento)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 text-sm rounded-2xl bg-[#121212] border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 transition-colors"
          />
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen 
                    ? 'bg-[#151515] border-red-500/40 shadow-lg shadow-black/60' 
                    : 'bg-[#121212] border-white/5 hover:border-white/15'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className={`font-heading text-base sm:text-lg font-bold transition-colors ${
                    isOpen ? 'text-red-500' : 'text-white'
                  }`}>
                    {faq.question}
                  </span>
                  
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                    isOpen ? 'bg-red-600 text-white rotate-180 font-bold shadow-md shadow-red-600/30' : 'bg-white/5 text-zinc-400'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 text-sm text-zinc-300 leading-relaxed border-t border-white/5 pt-4 animate-in fade-in-50 duration-200">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}

          {filteredFaqs.length === 0 && (
            <div className="text-center py-10 text-zinc-400 text-sm">
              Nenhuma pergunta encontrada para sua busca. Fale conosco no WhatsApp!
            </div>
          )}
        </div>

        {/* Need more help CTA box */}
        <div className="mt-12 p-6 rounded-2xl bg-[#121212] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <h4 className="font-heading font-bold text-lg text-white">
              Ainda ficou com alguma dúvida?
            </h4>
            <p className="text-xs text-zinc-400">
              Nossos consultores técnicos estão online para te atender no WhatsApp ou telefone.
            </p>
          </div>

          <a
            href={`https://wa.me/${companyInfo.whatsapp}?text=${encodeURIComponent('Olá! Tenho uma dúvida sobre os serviços da Lisboa Centro Automotivo.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md shadow-red-600/30 transition-all hover:scale-[1.02] flex-shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Falar com Atendente</span>
          </a>
        </div>

      </div>
    </section>
  );
};
