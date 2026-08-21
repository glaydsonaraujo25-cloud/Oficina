import React, { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { InteractiveDiagnosticTool } from './components/InteractiveDiagnosticTool';
import { ServicesSection } from './components/ServicesSection';
import { AboutSection } from './components/AboutSection';
import { DifferentialsSection } from './components/DifferentialsSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { ReviewsSection } from './components/ReviewsSection';
import { QuoteFormSection } from './components/QuoteFormSection';
import { FAQSection } from './components/FAQSection';
import { LocationContactSection } from './components/LocationContactSection';
import { Footer } from './components/Footer';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { AppointmentModal } from './components/AppointmentModal';
import { LegalModals } from './components/LegalModals';
import { AdminDashboard } from './components/AdminDashboard';
import { ServiceItem } from './types';

const isAdminHash = () => window.location.hash.toLowerCase() === '#admin';

export default function App() {
  const [isAdminView, setIsAdminView] = useState(isAdminHash);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [appointmentServiceId, setAppointmentServiceId] = useState('revisao-preventiva');
  const [selectedServiceDetail, setSelectedServiceDetail] = useState<ServiceItem | null>(null);
  const [quoteServiceTitle, setQuoteServiceTitle] = useState('');
  const [quoteProblemText, setQuoteProblemText] = useState('');
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      setIsAdminView(isAdminHash());
      window.scrollTo({ top: 0, behavior: 'auto' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (isAdminView) {
    return <AdminDashboard />;
  }

  const handleOpenAppointment = (serviceId?: string) => {
    if (serviceId) setAppointmentServiceId(serviceId);
    setIsAppointmentModalOpen(true);
  };

  const handleScrollToQuote = () => {
    const element = document.getElementById('orcamento');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectServiceForQuote = (serviceTitle: string, problemText?: string) => {
    setQuoteServiceTitle(serviceTitle);
    if (problemText) setQuoteProblemText(problemText);
    handleScrollToQuote();
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-zinc-100 selection:bg-red-600 selection:text-white">
      <Navbar onOpenAppointment={handleOpenAppointment} />

      <main>
        <Hero onOpenAppointment={handleOpenAppointment} onOpenQuote={handleScrollToQuote} />
        <InteractiveDiagnosticTool onSelectServiceForQuote={handleSelectServiceForQuote} />
        <ServicesSection
          onSelectService={(serviceTitle) => handleSelectServiceForQuote(serviceTitle)}
          onOpenDetails={setSelectedServiceDetail}
        />
        <AboutSection onOpenAppointment={() => handleOpenAppointment()} />
        <DifferentialsSection />
        <HowItWorksSection onOpenAppointment={() => handleOpenAppointment()} />
        <ReviewsSection />
        <QuoteFormSection
          preselectedService={quoteServiceTitle}
          initialProblemText={quoteProblemText}
        />
        <FAQSection />
        <LocationContactSection />
      </main>

      <Footer
        onOpenPrivacyPolicy={() => setLegalModalType('privacy')}
        onOpenTerms={() => setLegalModalType('terms')}
      />

      <WhatsAppFloat />

      <ServiceDetailModal
        service={selectedServiceDetail}
        onClose={() => setSelectedServiceDetail(null)}
        onSelectForQuote={(title) => handleSelectServiceForQuote(title)}
      />

      <AppointmentModal
        isOpen={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
        initialServiceId={appointmentServiceId}
      />

      <LegalModals
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />
    </div>
  );
}
