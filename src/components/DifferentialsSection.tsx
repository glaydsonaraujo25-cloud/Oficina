import React from 'react';
import { 
  Award, 
  Eye, 
  Wrench, 
  ShieldCheck, 
  Zap, 
  FileCheck, 
  Sparkles,
  CheckCircle2 
} from 'lucide-react';
import { differentialsData } from '../data/mockData';

export const DifferentialsSection: React.FC = () => {
  const renderDiffIcon = (iconName: string) => {
    switch (iconName) {
      case 'Award': return <Award className="w-6 h-6" />;
      case 'Eye': return <Eye className="w-6 h-6" />;
      case 'Wrench': return <Wrench className="w-6 h-6" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6" />;
      case 'Zap': return <Zap className="w-6 h-6" />;
      case 'FileCheck': return <FileCheck className="w-6 h-6" />;
      default: return <Sparkles className="w-6 h-6" />;
    }
  };

  return (
    <section id="diferenciais" className="py-20 sm:py-24 bg-[#0A0A0A] relative">
      {/* Background Accent */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600/10 border border-red-500/20 text-red-500 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Nossos Diferenciais</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Por que escolher a Lisboa Centro Automotivo?
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg">
            Combinamos ética profissional, tecnologia de ponta e respeito ao cliente para oferecer a melhor experiência mecânica de Brasília.
          </p>
        </div>

        {/* Differentials 6 Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {differentialsData.map((item) => (
            <div
              key={item.id}
              className="p-7 rounded-2xl bg-[#121212] border border-white/10 hover:border-red-600/40 transition-all duration-300 group hover:shadow-xl hover:shadow-black/60 hover:-translate-y-1 relative overflow-hidden flex flex-col justify-between"
            >
              {/* Subtle metallic top line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-600/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="space-y-4">
                {/* Icon and Pill */}
                <div className="flex items-center justify-between">
                  <div className="w-13 h-13 rounded-xl bg-[#181818] border border-white/10 flex items-center justify-center text-red-500 group-hover:bg-red-600 group-hover:text-white transition-colors shadow-lg">
                    {renderDiffIcon(item.iconName)}
                  </div>

                  {item.highlightText && (
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-red-600/10 text-red-500 border border-red-500/20">
                      {item.highlightText}
                    </span>
                  )}
                </div>

                {/* Title and Description */}
                <div>
                  <h3 className="font-heading text-xl font-bold text-white group-hover:text-red-500 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-zinc-400 text-sm mt-2.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Verified check indicator */}
              <div className="pt-4 mt-4 border-t border-white/5 flex items-center gap-1.5 text-xs font-medium text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-red-500" />
                <span>Padrão de Qualidade Lisboa</span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
