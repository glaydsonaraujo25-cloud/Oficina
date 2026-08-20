import React, { useState } from 'react';
import { 
  Star, 
  ShieldCheck, 
  MessageSquare, 
  Car, 
  ExternalLink, 
  ThumbsUp, 
  CheckCircle2,
  Sparkles,
  Quote
} from 'lucide-react';
import { testimonialsData, companyInfo } from '../data/mockData';

export const ReviewsSection: React.FC = () => {
  const [filter, setFilter] = useState<'all' | '5stars'>('all');

  const filteredReviews = testimonialsData.filter((rev) => {
    if (filter === '5stars') return rev.rating === 5;
    return true;
  });

  return (
    <section id="avaliacoes" className="py-20 sm:py-24 bg-[#0A0A0A] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-red-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header with Google Reviews Metric */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600/10 border border-red-500/20 text-red-500 text-xs font-semibold uppercase tracking-wider">
              <Star className="w-3.5 h-3.5 fill-red-500 text-red-500" />
              <span>Avaliações Reais de Clientes</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              O que nossos clientes dizem
            </h2>
            <p className="text-zinc-400 text-base sm:text-lg">
              A satisfação e a tranquilidade de quem confia a manutenção do seu veículo à equipe da Lisboa Centro Automotivo.
            </p>
          </div>

          {/* Google Reviews Badge */}
          <div className="p-5 rounded-2xl bg-[#121212] border border-red-500/20 shadow-xl flex items-center gap-4 flex-shrink-0">
            <div className="w-14 h-14 rounded-xl bg-red-600/10 border border-red-500/30 flex items-center justify-center font-heading font-extrabold text-2xl text-red-500">
              4.9
            </div>
            <div>
              <div className="flex items-center gap-1 text-red-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-red-500" />
                ))}
              </div>
              <p className="text-xs font-bold text-white mt-1">Google Meu Negócio</p>
              <p className="text-[11px] text-zinc-400">Mais de 240 avaliações 5 estrelas</p>
            </div>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="p-6 sm:p-7 rounded-2xl bg-[#121212] border border-white/10 hover:border-red-600/30 transition-all flex flex-col justify-between group hover:shadow-xl hover:shadow-black/60"
            >
              <div className="space-y-4">
                
                {/* Header of review: Stars & Date */}
                <div className="flex items-center justify-between">
                  <div className="flex text-red-500 gap-0.5">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-red-500" />
                    ))}
                  </div>

                  <span className="text-[11px] text-zinc-500 font-medium">
                    {review.date}
                  </span>
                </div>

                {/* Comment */}
                <div className="relative">
                  <Quote className="w-8 h-8 text-white/5 absolute -top-3 -left-2 pointer-events-none" />
                  <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed relative z-10 italic">
                    "{review.comment}"
                  </p>
                </div>

              </div>

              {/* Author & Vehicle Info Footer */}
              <div className="pt-4 mt-6 border-t border-white/5 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-sm text-white group-hover:text-red-500 transition-colors">
                    {review.name}
                  </div>
                  {review.verified && (
                    <span className="inline-flex items-center gap-1 text-[10px] text-red-500 bg-red-600/10 px-2 py-0.5 rounded-full border border-red-500/20 font-semibold">
                      <CheckCircle2 className="w-3 h-3 text-red-500" />
                      Verificado
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between text-[11px] text-zinc-400">
                  <span className="flex items-center gap-1 text-zinc-300">
                    <Car className="w-3.5 h-3.5 text-red-500" />
                    {review.vehicleModel}
                  </span>
                  <span className="text-zinc-500 truncate max-w-[120px]">
                    {review.serviceDone}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom Callout to Google */}
        <div className="mt-12 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-200 hover:text-white border border-white/10 text-xs font-semibold transition-colors"
          >
            <span>Ver perfil no Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <a
            href={`https://wa.me/${companyInfo.whatsapp}?text=${encodeURIComponent('Olá! Gostaria de deixar um depoimento sobre o atendimento da Lisboa Centro Automotivo.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-red-600/10 hover:bg-red-600/20 text-red-500 border border-red-500/30 text-xs font-semibold transition-colors"
          >
            <ThumbsUp className="w-3.5 h-3.5 text-red-500" />
            <span>Avaliar nossa oficina</span>
          </a>
        </div>

      </div>
    </section>
  );
};
