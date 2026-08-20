import React, { useState, useEffect } from 'react';
import { 
  Wrench, 
  Phone, 
  MessageCircle, 
  MapPin, 
  Clock, 
  Menu, 
  X, 
  Calendar, 
  ShieldCheck,
  ChevronRight 
} from 'lucide-react';
import { companyInfo } from '../data/mockData';

interface NavbarProps {
  onOpenAppointment: (serviceId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAppointment }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', href: '#inicio' },
    { name: 'Serviços', href: '#servicos' },
    { name: 'Diagnóstico', href: '#diagnostico' },
    { name: 'Sobre Nós', href: '#sobre' },
    { name: 'Diferenciais', href: '#diferenciais' },
    { name: 'Como Funciona', href: '#como-funciona' },
    { name: 'Avaliações', href: '#avaliacoes' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Onde Estamos', href: '#localizacao' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent("Olá! Encontrei a Lisboa Centro Automotivo pelo site e gostaria de tirar uma dúvida.");
    window.open(`https://wa.me/${companyInfo.whatsapp}?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Bar for desktop */}
      <div className="hidden lg:block bg-[#050505] border-b border-white/5 py-1.5 text-xs text-zinc-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1.5 text-zinc-300">
              <MapPin className="w-3.5 h-3.5 text-red-500" />
              <span>{companyInfo.locationNeighborhood}, Brasília - DF</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-red-500" />
              <span>Seg à Sex: 08h às 18h | Sáb: 08h às 12h</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-600/10 text-red-500 border border-red-500/20 font-medium text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
              Atendimento Online Ativo
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <a 
              href={`tel:${companyInfo.phone}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-zinc-400" />
              <span>{companyInfo.formattedPhone}</span>
            </a>
            <span className="text-zinc-700">|</span>
            <button
              onClick={openWhatsApp}
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp: (61) 98267-2684</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#0F0F0F]/95 backdrop-blur-md py-3 shadow-xl border-b border-white/10 shadow-black/80' 
          : 'bg-[#0A0A0A]/90 backdrop-blur-sm py-4 border-b border-white/5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <a 
              href="#inicio" 
              className="flex items-center gap-3 group text-left"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#inicio');
              }}
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-red-600 flex items-center justify-center shadow-lg shadow-red-600/30 border border-red-500/40 group-hover:scale-105 transition-transform">
                <Wrench className="w-5 h-5 sm:w-6 sm:h-6 text-white stroke-[2.5]" />
              </div>
              <div>
                <div className="font-heading font-bold text-lg sm:text-xl tracking-wider text-white flex items-center gap-1.5">
                  <span>LISBOA</span>
                  <span className="text-red-500 text-xs px-1.5 py-0.5 rounded bg-red-600/10 border border-red-500/30 font-sans font-semibold">AUTO</span>
                </div>
                <div className="text-[10px] sm:text-[11px] text-zinc-400 tracking-widest uppercase font-medium">
                  Centro Automotivo
                </div>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden xl:flex items-center space-x-1 lg:space-x-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="px-3 py-1.5 text-sm font-medium text-zinc-300 hover:text-red-500 rounded-lg hover:bg-white/5 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="hidden sm:flex items-center gap-3">
              <button
                onClick={openWhatsApp}
                className="hidden md:inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-200 border border-white/10 text-xs font-semibold transition-all hover:scale-[1.02]"
                title="Falar no WhatsApp"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp</span>
              </button>

              <button
                onClick={() => onOpenAppointment()}
                id="btn-nav-agendar"
                className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-bold shadow-lg shadow-red-600/30 hover:shadow-red-600/50 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Calendar className="w-4 h-4 stroke-[2.5]" />
                <span>Agendar Serviço</span>
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center gap-2 xl:hidden">
              <button
                onClick={() => onOpenAppointment()}
                className="sm:hidden px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs font-bold shadow-md shadow-red-600/20"
              >
                Agendar
              </button>
              
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-white/5 text-zinc-300 hover:text-white border border-white/10 focus:outline-none"
                aria-label="Abrir menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-[#0F0F0F] border-b border-white/10 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-200">
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-white/10">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-200 bg-white/[0.03] hover:bg-white/[0.08] hover:text-red-500 transition-colors"
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />
                </a>
              ))}
            </div>

            {/* Mobile info details */}
            <div className="pt-2 text-xs text-zinc-400 space-y-2">
              <div className="flex items-center gap-2 text-zinc-300">
                <MapPin className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span>Samambaia Sul, Brasília - DF</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span>Seg à Sex: 08h às 18h | Sáb: 08h às 12h</span>
              </div>
            </div>

            {/* Mobile CTAs */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openWhatsApp();
                }}
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 text-zinc-200 border border-white/10 text-xs font-bold"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAppointment();
                }}
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-lg shadow-red-600/30"
              >
                <Calendar className="w-4 h-4 stroke-[2.5]" />
                <span>Agendar Agora</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
