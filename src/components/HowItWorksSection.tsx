import React from 'react';
import { 
  MessageSquare, 
  Search, 
  Calculator, 
  CheckCircle2, 
  ArrowRight, 
  ChevronRight, 
  Calendar,
  Sparkles
} from 'lucide-react';
import { stepsData } from '../data/mockData';

interface HowItWorksSectionProps {
  onOpenAppointment: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ onOpenAppointment }) => {
  const renderStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'MessageSquare': return <MessageSquare className="w-6 h-6" />;
      case 'Search': return <Search className="w-6 h-6" />;
      case 'Calculator': return <Calculator className="w-6 h-6" />;
      case 'CheckCircle2': return <CheckCircle2 className="w-6 h-6" />;
      default: return <Sparkles className="w-6 h-6" />;
    }
  };

  return (
    <section id="como-funciona" className="py-20 sm:py-24 bg-[#0A0A0A] border-y border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600/10 border border-red-500/20 text-red-500 text-xs font-semibold uppercase tracking-wider">
            <span>Passo a Passo Simples</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Como funciona o atendimento na Lisboa
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg">
            Um processo 100% transparente para que você tenha total controle e segurança sobre cada etapa da manutenção do seu carro.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {stepsData.map((step, idx) => (
            <div
              key={step.step}
              className="relative p-6 rounded-2xl bg-[#121212] border border-white/10 hover:border-red-600/40 transition-all duration-300 flex flex-col justify-between group hover:shadow-xl hover:shadow-black/60"
            >
              {/* Step Number Glow Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-red-600/10 border border-red-500/20 flex items-center justify-center text-red-500 group-hover:bg-red-600 group-hover:text-white transition-colors font-bold">
                  {renderStepIcon(step.iconName)}
                </div>
                
                <span className="font-heading font-extrabold text-3xl text-zinc-700 group-hover:text-red-600/30 transition-colors">
                  0{step.step}
                </span>
              </div>

              {/* Title & Description */}
              <div className="space-y-2.5 flex-1">
                <h3 className="font-heading text-xl font-bold text-white group-hover:text-red-500 transition-colors">
                  {step.title}
                </h3>
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Detail pill */}
              <div className="pt-4 mt-4 border-t border-white/5 text-[11px] font-semibold text-red-500 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{step.detail}</span>
              </div>

              {/* Connector arrow on desktop for steps 1, 2, 3 */}
              {idx < 3 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 text-zinc-700">
                  <ArrowRight className="w-6 h-6" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Action button below */}
        <div className="mt-12 text-center">
          <button
            onClick={onOpenAppointment}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-red-600/30 transition-all hover:scale-[1.02]"
          >
            <Calendar className="w-5 h-5 stroke-[2.5]" />
            <span>Iniciar Atendimento Agora</span>
          </button>
        </div>

      </div>
    </section>
  );
};
