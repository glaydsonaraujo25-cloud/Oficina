import React from 'react';
import { 
  ShieldCheck, 
  Users, 
  Car, 
  Award, 
  CheckCircle2, 
  Clock, 
  HeartHandshake,
  Calendar,
  Sparkles
} from 'lucide-react';

interface AboutSectionProps {
  onOpenAppointment: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenAppointment }) => {
  const stats = [
    { value: '0', label: 'Anos de Experiência', icon: Clock, desc: 'Tradição e confiabilidade em Samambaia' },
    { value: '0', label: 'Veículos Atendidos', icon: Car, desc: 'Manutenções executadas com sucesso' },
    { value: '0%', label: 'Clientes Satisfeitos', icon: HeartHandshake, desc: 'Avaliações positivas no Google' },
    { value: '0', label: 'Especialistas Certificados', icon: Award, desc: 'Técnicos em constante capacitação' },
  ];

  const pillars = [
    'Transparência com fotos e vídeos via WhatsApp',
    'Orçamento detalhado sem custos ocultos',
    'Ferramentas calibradas e scanners modernos',
    'Atendimento humanizado com respeito ao cliente',
  ];

  return (
    <section id="sobre" className="py-20 sm:py-24 bg-[#0A0A0A] border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600/10 border border-red-500/20 text-red-500 text-xs font-semibold uppercase tracking-wider">
              <Users className="w-3.5 h-3.5" />
              <span>Quem Somos</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Excelência, tecnologia e respeito pelo seu veículo.
            </h2>

            <div className="space-y-4 text-zinc-300 text-sm sm:text-base leading-relaxed">
              <p>
                A <strong className="text-white font-semibold">Lisboa Centro Automotivo</strong> nasceu com o propósito de transformar a experiência de quem precisa de manutenção automotiva em Samambaia Sul e em todo o Distrito Federal.
              </p>
              <p className="text-zinc-400">
                "Somos uma oficina especializada em manutenção automotiva, comprometida em oferecer serviços de qualidade, atendimento transparente e soluções confiáveis para nossos clientes. Nosso objetivo é cuidar do seu veículo com responsabilidade, utilizando boas práticas, equipamentos adequados e profissionais preparados."
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 pt-2">
              {pillars.map((pillar, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-[#121212] border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-zinc-300 font-medium leading-snug">{pillar}</span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenAppointment}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-lg shadow-red-600/30 transition-all hover:scale-[1.02]"
              >
                <Calendar className="w-4 h-4 stroke-[2.5]" />
                <span>Agendar uma Visita à Oficina</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden border border-white/10 shadow-xl h-48 sm:h-64 relative group">
                  <img
                    src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=700&q=80"
                    alt="Equipe técnica Lisboa Centro Automotivo"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-3 left-3 text-[11px] font-bold text-white bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-white/10">
                    Alinhamento 3D Digital
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-[#141414] border border-red-500/20 space-y-1">
                  <div className="flex items-center gap-2 text-red-500">
                    <ShieldCheck className="w-5 h-5" />
                    <span className="font-bold text-sm">Garantia Formal</span>
                  </div>
                  <p className="text-xs text-zinc-400">
                    Ordem de serviço detalhada com garantia de peças e mão de obra.
                  </p>
                </div>
              </div>

              <div className="space-y-4 pt-6">
                <div className="p-4 rounded-2xl bg-[#141414] border border-white/10 space-y-1">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <Sparkles className="w-5 h-5" />
                    <span className="font-bold text-sm">Ambiente Limpo</span>
                  </div>
                  <p className="text-xs text-zinc-400">
                    Bancadas organizadas, sala de espera com café, Wi-Fi e ar-condicionado.
                  </p>
                </div>

                <div className="rounded-2xl overflow-hidden border border-white/10 shadow-xl h-48 sm:h-64 relative group">
                  <img
                    src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=700&q=80"
                    alt="Manutenção de Motor na Lisboa Centro Automotivo"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-3 left-3 text-[11px] font-bold text-white bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-white/10">
                    Revisão de Motor & Injeção
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-12 border-t border-white/10 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-2xl bg-[#121212] border border-white/5 hover:border-red-600/30 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-red-600/10 flex items-center justify-center text-red-500 mb-3 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white group-hover:text-red-500 transition-colors">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-bold text-zinc-200 mt-1">
                  {stat.label}
                </div>
                <p className="text-[11px] sm:text-xs text-zinc-500 mt-1">
                  {stat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
