import React, { useState } from 'react';
import { 
  MapPin, 
  Clock, 
  Phone, 
  MessageCircle, 
  Instagram, 
  Mail, 
  Navigation, 
  Copy, 
  Check, 
  ExternalLink,
  Car,
  Compass
} from 'lucide-react';
import { companyInfo } from '../data/mockData';

export const LocationContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(companyInfo.fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const openWaze = () => {
    window.open('https://waze.com/ul?q=Samambaia%20Sul%20Brasilia', '_blank', 'noopener,noreferrer');
  };

  const openGoogleMaps = () => {
    window.open('https://maps.google.com/?q=Samambaia+Sul+Brasilia+DF', '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="localizacao" className="py-20 sm:py-24 bg-[#0A0A0A] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600/10 border border-red-500/20 text-red-500 text-xs font-semibold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            <span>Fácil Acesso em Samambaia</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Onde Estamos & Contato
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg">
            Venha tomar um café conosco enquanto cuidamos do seu carro. Estrutura ampla com estacionamento próprio.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Contact Cards & Info */}
          <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
            
            {/* Address Card */}
            <div className="p-6 rounded-2xl bg-[#121212] border border-white/10 space-y-3">
              <div className="flex items-center gap-3 text-red-500">
                <div className="w-10 h-10 rounded-xl bg-red-600/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-white">Endereço da Oficina</h3>
                  <p className="text-xs text-zinc-400">{companyInfo.locationNeighborhood}, Brasília - DF</p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 pt-2 leading-relaxed">
                {companyInfo.fullAddress}
              </p>

              <div className="pt-2 flex items-center gap-2">
                <button
                  onClick={handleCopyAddress}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-zinc-300 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-zinc-400" />}
                  <span>{copied ? 'Endereço Copiado!' : 'Copiar Endereço'}</span>
                </button>
              </div>
            </div>

            {/* Hours Card */}
            <div className="p-6 rounded-2xl bg-[#121212] border border-white/10 space-y-3">
              <div className="flex items-center gap-3 text-red-500">
                <div className="w-10 h-10 rounded-xl bg-red-600/10 flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-white">Horário de Funcionamento</h3>
                  <p className="text-xs text-zinc-400">Atendimento de Segunda a Sábado</p>
                </div>
              </div>

              <div className="space-y-1.5 pt-2 text-xs sm:text-sm">
                <div className="flex items-center justify-between text-zinc-300">
                  <span className="font-medium">Segunda a Sexta:</span>
                  <span className="font-bold text-white">08h00 às 18h00</span>
                </div>
                <div className="flex items-center justify-between text-zinc-300">
                  <span className="font-medium">Sábado:</span>
                  <span className="font-bold text-white">08h00 às 12h00</span>
                </div>
                <div className="flex items-center justify-between text-zinc-500 text-xs">
                  <span>Domingos e Feriados:</span>
                  <span>Fechado</span>
                </div>
              </div>
            </div>

            {/* Direct Contacts Grid */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={`https://wa.me/${companyInfo.whatsapp}?text=${encodeURIComponent('Olá! Gostaria de falar com o atendimento da Lisboa Centro Automotivo.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 transition-all flex flex-col justify-between"
              >
                <MessageCircle className="w-5 h-5 mb-2" />
                <div>
                  <span className="text-[11px] text-zinc-400 block">WhatsApp</span>
                  <span className="font-bold text-xs sm:text-sm text-emerald-300">(61) 98267-2684</span>
                </div>
              </a>

              <a
                href={`tel:${companyInfo.phone}`}
                className="p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all flex flex-col justify-between"
              >
                <Phone className="w-5 h-5 mb-2 text-red-500" />
                <div>
                  <span className="text-[11px] text-zinc-400 block">Telefone Fixo / Cel</span>
                  <span className="font-bold text-xs sm:text-sm text-zinc-200">(61) 98267-2684</span>
                </div>
              </a>
            </div>

            {/* Route buttons */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <button
                onClick={openGoogleMaps}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs shadow-md shadow-red-600/30 transition-all hover:scale-[1.02]"
              >
                <Navigation className="w-4 h-4 fill-white" />
                <span>Como Chegar (Maps)</span>
              </button>

              <button
                onClick={openWaze}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#1A1A1A] hover:bg-[#252525] border border-white/10 text-white font-extrabold text-xs shadow-md transition-all hover:scale-[1.02]"
              >
                <Compass className="w-4 h-4 text-red-500" />
                <span>Abrir no Waze</span>
              </button>
            </div>

          </div>

          {/* Right Column: Interactive Embedded Map */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="relative rounded-3xl overflow-hidden glass-panel border border-white/10 shadow-2xl flex-1 min-h-[420px] sm:min-h-[460px]">
              
              {/* Google Maps Embed iframe with Samambaia coordinates */}
              <iframe
                title="Localização Lisboa Centro Automotivo Samambaia Sul"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3837.785367858908!2d-48.0934!3d-15.8772!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935a2d8e411b22e1%3A0x4015f60b457e5e34!2sSamambaia%20Sul%2C%20Bras%C3%ADlia%20-%20DF!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(85%) contrast(120%)' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full"
              />

              {/* Floating Map Overlay Card */}
              <div className="absolute top-4 left-4 right-4 sm:right-auto sm:max-w-xs p-4 rounded-2xl bg-[#0A0A0A]/95 backdrop-blur-md border border-red-500/30 shadow-2xl space-y-2 z-10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white font-bold">
                    <Car className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-sm text-white">Lisboa Centro Automotivo</h4>
                    <p className="text-[11px] text-red-500 font-medium">Samambaia Sul - Brasília DF</p>
                  </div>
                </div>
                <p className="text-[11px] text-zinc-300">
                  Próximo às principais vias de acesso com estacionamento exclusivo para clientes.
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
