import React from 'react';
import { 
  ShieldCheck, 
  Calendar, 
  FileText, 
  MessageCircle, 
  Star, 
  MapPin, 
  Wrench, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  Award,
  Zap
} from 'lucide-react';
import { companyInfo } from '../data/mockData';

interface HeroProps {
  onOpenAppointment: (serviceId?: string) => void;
  onOpenQuote: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenAppointment, onOpenQuote }) => {
  const openWhatsApp = () => {
    const text = encodeURIComponent("Olá! Encontrei a Lisboa Centro Automotivo pelo site e gostaria de solicitar um orçamento para meu veículo.");
    window.open(`https://wa.me/${companyInfo.whatsapp}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const trustBadges = [
    { icon: Award, label: 'Atendimento Especializado' },
    { icon: FileText, label: 'Orçamento Transparente' },
    { icon: ShieldCheck, label: 'Serviço com Garantia' },
    { icon: Zap, label: 'Peças de 1ª Linha' },
  ];

  return (
    <section id="inicio" className="relative min-h-[92vh] pt-32 lg:pt-36 pb-20 flex items-center overflow-hidden carbon-pattern">
      {/* Dynamic Background Effects & Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Glow circles */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-red-800/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-10 left-10 w-[350px] h-[350px] bg-zinc-800/20 rounded-full blur-[100px]" />
        
        {/* Subtle grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines, Slogan, and CTAs */}
          <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
            
            {/* Top Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600/10 border border-red-500/25 text-red-500 text-xs sm:text-sm font-semibold tracking-wide shadow-inner">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
              </span>
              <span>Oficina Mecânica Especializada em Samambaia Sul - DF</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
                Seu carro em <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-red-500 via-red-600 to-red-400 bg-clip-text text-transparent">
                  boas mãos.
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-zinc-300 font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Manutenção automotiva com qualidade, transparência e confiança.
              </p>
              <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto lg:mx-0">
                {companyInfo.slogan}
              </p>
            </div>

            {/* Strategic CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={() => onOpenAppointment()}
                id="btn-hero-agendar"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-base shadow-xl shadow-red-600/30 hover:shadow-red-600/50 transition-all hover:scale-[1.02] active:scale-[0.98] group"
              >
                <Calendar className="w-5 h-5 stroke-[2.5] group-hover:rotate-6 transition-transform" />
                <span>Agendar Serviço</span>
              </button>

              <button
                onClick={onOpenQuote}
                id="btn-hero-orcamento"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-[#151515] hover:bg-[#202020] text-white font-bold text-base border border-white/10 hover:border-red-600/40 shadow-lg shadow-black/60 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <FileText className="w-5 h-5 text-red-500" />
                <span>Solicitar Orçamento</span>
              </button>

              <button
                onClick={openWhatsApp}
                id="btn-hero-whatsapp"
                className="inline-flex items-center justify-center gap-2 px-5 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-200 hover:text-white font-bold text-sm sm:text-base border border-white/10 hover:border-emerald-500/30 transition-all hover:scale-[1.02]"
              >
                <MessageCircle className="w-5 h-5 text-emerald-400" />
                <span>WhatsApp</span>
              </button>
            </div>

            {/* Trust Indicators Pill Row */}
            <div className="pt-4 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
              {trustBadges.map((badge, idx) => {
                const Icon = badge.icon;
                return (
                  <div 
                    key={idx} 
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-[#121212] border border-white/5"
                  >
                    <div className="w-7 h-7 rounded-lg bg-red-600/10 flex items-center justify-center flex-shrink-0 text-red-500">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-medium text-zinc-300 leading-tight">
                      {badge.label}
                    </span>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Right Column: Hero Visual & Interactive Badge */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Outer decorative glow frame */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-red-600/30 to-red-900/30 rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition duration-1000"></div>

              {/* Main Visual Card */}
              <div className="relative rounded-2xl overflow-hidden glass-panel border border-white/10 shadow-2xl">
                <div className="relative h-72 sm:h-96 w-full overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1613214149922-f1809c99b414?auto=format&fit=crop&w=1000&q=80"
                    alt="Oficina Mecânica Lisboa Centro Automotivo em Samambaia Sul"
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                    loading="eager"
                  />
                  {/* Subtle dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-black/40" />
                  
                  {/* Top Badge on image */}
                  <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-white text-xs font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-red-500" />
                    <span>Samambaia Sul - DF</span>
                  </div>

                  <div className="absolute top-4 right-4 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    <span>08:00 às 18:00</span>
                  </div>
                </div>

                {/* Floating Metrics Bar inside Card */}
                <div className="p-5 bg-[#0F0F0F] border-t border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <div className="flex text-red-500">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-red-500" />
                          ))}
                        </div>
                        <span className="text-sm font-bold text-white">4.9 / 5.0</span>
                      </div>
                      <p className="text-xs text-zinc-400 mt-0.5">Avaliações no Google em Samambaia</p>
                    </div>

                    <div className="text-right">
                      <span className="text-lg font-heading font-bold text-red-500">+12 Anos</span>
                      <p className="text-xs text-zinc-400">De experiência automotiva</p>
                    </div>
                  </div>

                  {/* Highlights Pill */}
                  <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs text-zinc-300">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-red-500" />
                      <span>Diagnóstico com Scanner</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-red-500" />
                      <span>Vídeos no WhatsApp</span>
                    </span>
                  </div>
                </div>

              </div>

              {/* Floating Quick Action Card */}
              <div className="absolute -bottom-6 -left-4 sm:-left-6 p-3.5 rounded-xl bg-[#151515]/95 backdrop-blur-md border border-red-500/30 shadow-2xl flex items-center gap-3 hidden sm:flex">
                <div className="w-10 h-10 rounded-lg bg-red-600 flex items-center justify-center text-white font-bold flex-shrink-0 shadow-md shadow-red-600/30">
                  <Wrench className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Revisão Rápida sem Espera</p>
                  <p className="text-[11px] text-zinc-400">Agende e seja atendido no horário</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
