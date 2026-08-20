import React, { useState } from 'react';
import { 
  Wrench, 
  MapPin, 
  Phone, 
  MessageCircle, 
  Clock, 
  Instagram, 
  ChevronRight, 
  ShieldCheck, 
  ArrowUp,
  Heart
} from 'lucide-react';
import { companyInfo, servicesData } from '../data/mockData';

interface FooterProps {
  onOpenPrivacyPolicy: () => void;
  onOpenTerms: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacyPolicy, onOpenTerms }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Início', href: '#inicio' },
    { name: 'Nossos Serviços', href: '#servicos' },
    { name: 'Diagnóstico de Sintomas', href: '#diagnostico' },
    { name: 'Quem Somos', href: '#sobre' },
    { name: 'Diferenciais', href: '#diferenciais' },
    { name: 'Como Funciona', href: '#como-funciona' },
    { name: 'Avaliações', href: '#avaliacoes' },
    { name: 'Perguntas Frequentes (FAQ)', href: '#faq' },
    { name: 'Localização & Contato', href: '#localizacao' },
  ];

  return (
    <footer className="bg-[#0A0A0A] border-t border-white/10 text-zinc-400 text-xs relative overflow-hidden">
      
      {/* Top Banner Accent */}
      <div className="h-1 bg-gradient-to-r from-red-600 via-red-500 to-red-600" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-14">
          
          {/* Col 1: Brand & Slogan (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white font-bold shadow-lg shadow-red-600/30">
                <Wrench className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <div className="font-heading font-bold text-lg text-white tracking-wider">
                  LISBOA CENTRO AUTOMOTIVO
                </div>
                <div className="text-[10px] text-red-500 uppercase tracking-widest font-semibold">
                  Mecânica de Precisão
                </div>
              </div>
            </div>

            <p className="text-zinc-400 leading-relaxed text-xs sm:text-sm">
              "{companyInfo.slogan}"
            </p>

            <p className="text-zinc-500 text-xs">
              Especialistas em manutenção preventiva e corretiva, injeção eletrônica, suspensão, freios, troca de óleo e alinhamento 3D em Samambaia Sul, Brasília - DF.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={companyInfo.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-gradient-to-tr hover:from-purple-600 hover:to-pink-500 text-zinc-300 hover:text-white flex items-center justify-center transition-all"
                title="Instagram Lisboa Centro Automotivo"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href={`https://wa.me/${companyInfo.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-white flex items-center justify-center transition-all"
                title="WhatsApp Oficial"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              <a
                href={`tel:${companyInfo.phone}`}
                className="w-9 h-9 rounded-lg bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white flex items-center justify-center transition-all"
                title="Telefone"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wider">
              Navegação
            </h4>
            <ul className="space-y-2">
              {navLinks.slice(0, 6).map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="hover:text-red-500 transition-colors flex items-center gap-1.5"
                  >
                    <ChevronRight className="w-3 h-3 text-zinc-600" />
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wider">
              Principais Serviços
            </h4>
            <ul className="space-y-2">
              {servicesData.slice(0, 6).map((svc) => (
                <li key={svc.id}>
                  <a
                    href="#servicos"
                    className="hover:text-red-500 transition-colors flex items-center gap-1.5"
                  >
                    <ChevronRight className="w-3 h-3 text-red-500/50" />
                    <span>{svc.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Schedule (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wider">
              Atendimento & Endereço
            </h4>
            
            <div className="space-y-2.5">
              <div className="flex items-start gap-2 text-zinc-300">
                <MapPin className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                <span>{companyInfo.locationNeighborhood}, Brasília - DF</span>
              </div>

              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <MessageCircle className="w-4 h-4 flex-shrink-0" />
                <span>WhatsApp: (61) 98267-2684</span>
              </div>

              <div className="flex items-center gap-2 text-zinc-300">
                <Phone className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span>Telefone: (61) 98267-2684</span>
              </div>

              <div className="flex items-start gap-2 text-zinc-400">
                <Clock className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p>Segunda a Sexta: 08h às 18h</p>
                  <p>Sábado: 08h às 12h</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Local SEO keywords bar */}
        <div className="py-6 border-y border-white/5 text-[11px] text-zinc-500 leading-relaxed space-y-1">
          <p className="font-semibold text-zinc-400">Palavras-chave de atendimento:</p>
          <p>
            Mecânica automotiva em Samambaia Sul • Oficina mecânica em Brasília DF • Revisão automotiva completa • Troca de óleo e filtros • Freios e ABS • Suspensão e amortecedores • Alinhamento 3D computadorizado • Diagnóstico eletrônico com scanner • Carga de gás ar-condicionado • Troca de correia dentada • Lisboa Centro Automotivo.
          </p>
        </div>

        {/* Bottom copyright & Back to top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left space-y-1">
            <p className="text-zinc-400">
              © {new Date().getFullYear()} Lisboa Centro Automotivo. Todos os direitos reservados.
            </p>
            <div className="flex items-center justify-center sm:justify-start gap-4 text-[11px] text-zinc-500">
              <button 
                onClick={onOpenPrivacyPolicy}
                className="hover:text-zinc-300 underline transition-colors"
              >
                Política de Privacidade
              </button>
              <span>•</span>
              <button 
                onClick={onOpenTerms}
                className="hover:text-zinc-300 underline transition-colors"
              >
                Termos de Atendimento & Garantia
              </button>
            </div>
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 text-xs transition-colors"
          >
            <span>Voltar ao topo</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
