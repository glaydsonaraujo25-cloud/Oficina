import React from 'react';
import { X, ShieldCheck, FileText } from 'lucide-react';
import { companyInfo } from '../data/mockData';

interface LegalModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const LegalModals: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      
      <div 
        className="relative w-full max-w-2xl rounded-3xl bg-[#121212] border border-white/15 shadow-2xl p-6 sm:p-8 max-h-[85vh] overflow-y-auto space-y-6 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            {type === 'privacy' ? (
              <ShieldCheck className="w-6 h-6 text-red-500" />
            ) : (
              <FileText className="w-6 h-6 text-red-500" />
            )}
            <h3 className="font-heading font-bold text-xl text-white">
              {type === 'privacy' ? 'Política de Privacidade' : 'Termos de Garantia e Atendimento'}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {type === 'privacy' ? (
          <div className="space-y-4 text-xs sm:text-sm text-zinc-300 leading-relaxed">
            <p>
              A <strong>Lisboa Centro Automotivo</strong> valoriza a privacidade de seus clientes e usuários. Esta política descreve como tratamos as informações coletadas através do nosso site.
            </p>
            <h4 className="font-bold text-white text-sm">1. Coleta de Dados</h4>
            <p>
              Coletamos apenas as informações estritamente necessárias para o agendamento e elaboração de orçamentos mecânicos, tais como: Nome, Número de Telefone / WhatsApp, e Dados do Veículo (Marca, Modelo, Ano).
            </p>
            <h4 className="font-bold text-white text-sm">2. Uso das Informações</h4>
            <p>
              Seus dados são utilizados exclusivamente para entrar em contato referente ao serviço solicitado, esclarecer dúvidas e enviar orçamentos. Não compartilhamos, vendemos ou alugamos seus dados para terceiros.
            </p>
            <h4 className="font-bold text-white text-sm">3. Segurança</h4>
            <p>
              Adotamos práticas adequadas de segurança da informação para proteger seus dados contra acessos não autorizados ou divulgação indevida.
            </p>
          </div>
        ) : (
          <div className="space-y-4 text-xs sm:text-sm text-zinc-300 leading-relaxed">
            <p>
              No <strong>Lisboa Centro Automotivo</strong>, prezamos pela transparência total. Todos os serviços executados em nossa oficina seguem diretrizes rigorosas:
            </p>
            <h4 className="font-bold text-white text-sm">1. Orçamento e Autorização Prévia</h4>
            <p>
              Nenhum serviço ou substituição de peça é executado sem a prévia autorização e ciência do cliente. O orçamento detalha valores de peças e mão de obra.
            </p>
            <h4 className="font-bold text-white text-sm">2. Garantia Legal e Contratual</h4>
            <p>
              Todos os serviços de mão de obra possuem garantia mínima de 90 (noventa) dias conforme o Código de Defesa do Consumidor (Art. 26). Peças e componentes possuem garantia de acordo com o fabricante (podendo chegar a 12 meses ou quilometragem especificada).
            </p>
            <h4 className="font-bold text-white text-sm">3. Peças Substituídas</h4>
            <p>
              As peças antigas substituídas são apresentadas ou entregues ao cliente no momento da retirada do veículo, demonstrando a integridade da manutenção.
            </p>
          </div>
        )}

        <div className="pt-4 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md shadow-red-600/30 transition-colors"
          >
            Entendido
          </button>
        </div>

      </div>

    </div>
  );
};
