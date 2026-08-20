import React, { useState } from 'react';
import { 
  Droplet, 
  ShieldAlert, 
  Activity, 
  Compass, 
  Cpu, 
  Gauge, 
  Wind, 
  ClipboardCheck, 
  Cog, 
  Clock, 
  Shield, 
  Check, 
  ChevronRight, 
  ArrowUpRight, 
  FileText,
  Sparkles,
  Search
} from 'lucide-react';
import { servicesData, companyInfo } from '../data/mockData';
import { ServiceItem, ServiceCategory } from '../types';

interface ServicesSectionProps {
  onSelectService: (serviceTitle: string) => void;
  onOpenDetails: (service: ServiceItem) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ 
  onSelectService,
  onOpenDetails
}) => {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: { id: ServiceCategory; label: string }[] = [
    { id: 'all', label: 'Todos os Serviços' },
    { id: 'preventiva', label: 'Revisão & Troca de Óleo' },
    { id: 'seguranca', label: 'Freios & Suspensão' },
    { id: 'mecanica', label: 'Motor & Câmbio' },
    { id: 'climatizacao', label: 'Ar-Condicionado' },
    { id: 'eletrica', label: 'Diagnóstico & Scanner' },
  ];

  const filteredServices = servicesData.filter((service) => {
    const matchesCategory = activeCategory === 'all' || service.category === activeCategory;
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          service.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          service.itemsIncluded.some(item => item.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const renderServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Droplet': return <Droplet className="w-6 h-6" />;
      case 'ShieldAlert': return <ShieldAlert className="w-6 h-6" />;
      case 'Activity': return <Activity className="w-6 h-6" />;
      case 'Compass': return <Compass className="w-6 h-6" />;
      case 'Cpu': return <Cpu className="w-6 h-6" />;
      case 'Gauge': return <Gauge className="w-6 h-6" />;
      case 'Wind': return <Wind className="w-6 h-6" />;
      case 'ClipboardCheck': return <ClipboardCheck className="w-6 h-6" />;
      case 'Cog': return <Cog className="w-6 h-6" />;
      default: return <Sparkles className="w-6 h-6" />;
    }
  };

  return (
    <section id="servicos" className="py-20 sm:py-24 bg-[#0A0A0A] relative">
      {/* Subtle Glow Background */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-red-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600/10 border border-red-500/20 text-red-500 text-xs font-semibold uppercase tracking-wider">
            <span>Soluções Completas em Mecânica</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Nossos Serviços Automotivos
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg">
            Tecnologia de ponta, ferramental moderno e técnicos qualificados para cuidar de todos os sistemas do seu carro com garantia total.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none p-1 rounded-2xl bg-[#121212] border border-white/5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-red-600 text-white shadow-md shadow-red-600/30 font-bold'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar serviço (ex: freio, óleo)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-[#121212] border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 transition-colors"
            />
          </div>

        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="group relative rounded-2xl bg-[#121212] border border-white/10 hover:border-red-600/40 transition-all duration-300 flex flex-col justify-between overflow-hidden hover:shadow-xl hover:shadow-black/70 hover:-translate-y-1"
            >
              {/* Card Image */}
              <div className="relative h-48 w-full overflow-hidden bg-zinc-900">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/40 to-transparent" />
                
                {/* Popular Pill */}
                {service.popular && (
                  <div className="absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-600 text-white text-[11px] font-extrabold shadow-lg shadow-red-600/30">
                    <Sparkles className="w-3 h-3" />
                    <span>Destaque</span>
                  </div>
                )}

                {/* Floating Icon */}
                <div className="absolute bottom-3 left-4 w-12 h-12 rounded-xl bg-[#0A0A0A] border border-white/15 flex items-center justify-center text-red-500 shadow-xl group-hover:bg-red-600 group-hover:text-white transition-colors">
                  {renderServiceIcon(service.iconName)}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 pt-3 flex-1 flex flex-col justify-between space-y-4">
                
                <div>
                  <h3 className="font-heading text-xl font-bold text-white group-hover:text-red-500 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-zinc-400 text-xs sm:text-sm mt-2 leading-relaxed line-clamp-2">
                    {service.shortDesc}
                  </p>
                </div>

                {/* Included Checklist items */}
                <div className="space-y-1.5 pt-2 border-t border-white/5">
                  <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block">
                    O que inclui:
                  </span>
                  <div className="space-y-1">
                    {service.itemsIncluded.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-zinc-300">
                        <Check className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Service Specs: Warranty & Estimated time */}
                <div className="pt-3 border-t border-white/5 grid grid-cols-2 gap-2 text-[11px] text-zinc-400">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                    <span className="truncate">{service.estimatedTime}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                    <span className="truncate">{service.warranty}</span>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-white/10 flex items-center gap-2">
                  <button
                    onClick={() => onSelectService(service.title)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md shadow-red-600/30 transition-all hover:scale-[1.02]"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Solicitar Orçamento</span>
                  </button>

                  <button
                    onClick={() => onOpenDetails(service)}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 text-xs font-semibold transition-colors"
                    title="Ver detalhes completos"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>

        {/* Empty state if search filters out everything */}
        {filteredServices.length === 0 && (
          <div className="text-center py-16 bg-[#121212] rounded-2xl border border-white/5 space-y-3">
            <p className="text-zinc-400 text-sm">Nenhum serviço encontrado com o termo "{searchQuery}".</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold shadow-md shadow-red-600/30"
            >
              Ver todos os serviços
            </button>
          </div>
        )}

        {/* Bottom Banner with Custom Problem / WhatsApp CTA */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl glass-panel-glow flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1.5 max-w-xl">
            <h4 className="font-heading text-xl sm:text-2xl font-bold text-white">
              Não encontrou o serviço que precisa?
            </h4>
            <p className="text-xs sm:text-sm text-zinc-300">
              Fazemos desde revisões simples até reparos complexos em câmbio, injeção e motor. Fale diretamente com nossos mecânicos no WhatsApp!
            </p>
          </div>

          <a
            href={`https://wa.me/${companyInfo.whatsapp}?text=${encodeURIComponent('Olá! Preciso de um serviço específico para meu carro e gostaria de consultar a disponibilidade.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm shadow-xl shadow-red-600/30 transition-all hover:scale-[1.02] flex-shrink-0"
          >
            <span>Consultar Serviço no WhatsApp</span>
            <ChevronRight className="w-4 h-4 stroke-[3]" />
          </a>
        </div>

      </div>
    </section>
  );
};
