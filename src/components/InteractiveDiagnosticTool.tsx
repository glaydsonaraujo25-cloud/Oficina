import React, { useState } from 'react';
import {
  Stethoscope,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Disc,
  Activity,
  Wind,
  Droplet,
  Compass,
  ArrowRight,
  MessageCircle,
  Calendar,
  Sparkles,
  Info,
} from 'lucide-react';
import { diagnosticSymptomsData, companyInfo } from '../data/mockData';
import { DiagnosticSymptom } from '../types';

interface InteractiveDiagnosticToolProps {
  onSelectServiceForQuote: (serviceName: string, problemText?: string) => void;
}

export const InteractiveDiagnosticTool: React.FC<InteractiveDiagnosticToolProps> = ({
  onSelectServiceForQuote,
}) => {
  const [selectedSymptom, setSelectedSymptom] = useState<DiagnosticSymptom>(diagnosticSymptomsData[0]);

  const getUrgencyBadge = (urgency: DiagnosticSymptom['urgency']) => {
    switch (urgency) {
      case 'imediata':
        return {
          bg: 'bg-red-500/15 text-red-400 border-red-500/30',
          label: 'Urgência Imediata',
          helper: 'Evite rodar com o veículo até uma avaliação técnica.',
          dot: 'bg-red-500',
        };
      case 'alta':
        return {
          bg: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
          label: 'Urgência Alta',
          helper: 'Procure avaliação técnica o quanto antes.',
          dot: 'bg-orange-500',
        };
      case 'media':
        return {
          bg: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
          label: 'Urgência Moderada',
          helper: 'Agende uma inspeção para evitar evolução do problema.',
          dot: 'bg-amber-400',
        };
      default:
        return {
          bg: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
          label: 'Prevenção / Conforto',
          helper: 'Pode ser avaliado em uma revisão programada.',
          dot: 'bg-blue-400',
        };
    }
  };

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Disc': return <Disc className="w-5 h-5" />;
      case 'AlertTriangle': return <AlertTriangle className="w-5 h-5" />;
      case 'Compass': return <Compass className="w-5 h-5" />;
      case 'Wind': return <Wind className="w-5 h-5" />;
      case 'Activity': return <Activity className="w-5 h-5" />;
      case 'Droplet': return <Droplet className="w-5 h-5" />;
      default: return <HelpCircle className="w-5 h-5" />;
    }
  };

  const handleWhatsAppDiagnostic = () => {
    const text = encodeURIComponent(
      `Olá! Usei o assistente de diagnóstico do site da Lisboa Centro Automotivo.\n\nSintoma selecionado: ${selectedSymptom.label}\nCategoria: ${selectedSymptom.category}\nUrgência indicada pelo site: ${getUrgencyBadge(selectedSymptom.urgency).label}\nServiço recomendado: ${selectedSymptom.recommendedService}\n\nGostaria de agendar uma avaliação técnica do veículo.`,
    );

    window.open(
      `https://wa.me/${companyInfo.whatsapp}?text=${text}`,
      '_blank',
      'noopener,noreferrer',
    );
  };

  const urgencyInfo = getUrgencyBadge(selectedSymptom.urgency);

  return (
    <section id="diagnostico" className="py-16 sm:py-20 bg-[#0A0A0A] border-y border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-600/10 border border-red-500/20 text-red-500 text-xs font-semibold uppercase tracking-wider">
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Assistente de Diagnóstico Lisboa</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Seu carro está com algum barulho ou sintoma estranho?
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            Selecione o sintoma que mais se aproxima do que você percebeu. O resultado serve como orientação preliminar para ajudar no atendimento da oficina.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-2.5">
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2 px-1">
              Escolha um sintoma comum:
            </p>

            <div className="space-y-2">
              {diagnosticSymptomsData.map((symptom) => {
                const isSelected = selectedSymptom.id === symptom.id;
                return (
                  <button
                    key={symptom.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setSelectedSymptom(symptom)}
                    className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition-all duration-200 ${
                      isSelected
                        ? 'bg-red-600/10 border-red-500/50 text-white shadow-lg shadow-red-600/10 translate-x-1'
                        : 'bg-[#121212] hover:bg-[#181818] border-white/5 text-zinc-300 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${isSelected ? 'bg-red-600 text-white font-bold' : 'bg-white/5 text-red-500'}`}>
                        {renderIcon(symptom.iconName)}
                      </div>
                      <div>
                        <div className="text-xs text-red-500 font-medium">{symptom.category}</div>
                        <div className="text-sm font-semibold">{symptom.label}</div>
                      </div>
                    </div>
                    <ArrowRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-red-500 translate-x-1' : 'text-zinc-600'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-72 h-72 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-red-500">
                      Orientação Preliminar • {selectedSymptom.category}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">{selectedSymptom.label}</h3>
                  </div>

                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border ${urgencyInfo.bg}`}>
                    <span className={`w-2 h-2 rounded-full ${urgencyInfo.dot}`} />
                    <span>{urgencyInfo.label}</span>
                  </div>
                </div>

                <div className="text-sm text-zinc-300 leading-relaxed">
                  <p>{selectedSymptom.description}</p>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-100 text-xs leading-relaxed">
                  <Info className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-blue-300">Importante:</strong> esta ferramenta não substitui uma inspeção mecânica presencial. Ela ajuda a organizar os sintomas antes do atendimento.
                  </span>
                </div>

                {selectedSymptom.warningAlert && (
                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-red-500/10 border border-red-500/25 text-red-200 text-xs">
                    <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                    <span><strong className="text-red-300">Atenção Técnica:</strong> {selectedSymptom.warningAlert}</span>
                  </div>
                )}

                <div className={`p-3.5 rounded-xl border ${urgencyInfo.bg}`}>
                  <p className="text-xs font-semibold">Recomendação: {urgencyInfo.helper}</p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-red-500" />
                    <span>Possíveis causas para inspeção:</span>
                  </h4>
                  <div className="grid gap-2">
                    {selectedSymptom.possibleCauses.map((cause, idx) => (
                      <div key={`${selectedSymptom.id}-${idx}`} className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white/[0.03] border border-white/5 text-xs text-zinc-200">
                        <CheckCircle2 className="w-4 h-4 text-red-500 flex-shrink-0" />
                        <span>{cause}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[11px] text-zinc-400 block">Serviço recomendado para avaliação:</span>
                    <span className="text-sm font-bold text-red-500">{selectedSymptom.recommendedService}</span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch gap-2.5">
                    <button
                      type="button"
                      onClick={() => onSelectServiceForQuote(selectedSymptom.recommendedService, selectedSymptom.label)}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md shadow-red-600/30 transition-all hover:scale-[1.02]"
                    >
                      <Calendar className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>Solicitar avaliação</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleWhatsAppDiagnostic}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-200 border border-white/10 text-xs font-bold transition-all"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Enviar sintoma no WhatsApp</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
