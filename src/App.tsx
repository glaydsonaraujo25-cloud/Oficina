import React, { useState } from 'react';
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
import { ServiceItem } from './types';

export default function App() {
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [appointmentServiceId, setAppointmentServiceId] = useState('revisao-preventiva');
  const [selectedServiceDetail, setSelectedServiceDetail] = useState<ServiceItem | null>(null);
  
  // State to pass to the inline QuoteFormSection
  const [quoteServiceTitle, setQuoteServiceTitle] = useState('');
  const [quoteProblemText, setQuoteProblemText] = useState('');
  
  // Legal modal state
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);

  const handleOpenAppointment = (serviceId?: string) => {
    if (serviceId) {
      setAppointmentServiceId(serviceId);
    }
    setIsAppointmentModalOpen(true);
  };

  const handleScrollToQuote = () => {
    const el = document.getElementById('orcamento');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceForQuote = (serviceTitle: string, problemText?: string) => {
    setQuoteServiceTitle(serviceTitle);
    if (problemText) {
      setQuoteProblemText(problemText);
    }
    handleScrollToQuote();
  };

  const handleOpenServiceDetails = (service: ServiceItem) => {
    setSelectedServiceDetail(service);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-zinc-100 selection:bg-red-600 selection:text-white">
      
      {/* Top Sticky Header */}
      <Navbar onOpenAppointment={handleOpenAppointment} />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero Section */}
        <Hero 
          onOpenAppointment={handleOpenAppointment} 
          onOpenQuote={handleScrollToQuote} 
        />

        {/* 2. Interactive Symptoms Diagnostic Tool */}
        <InteractiveDiagnosticTool 
          onSelectServiceForQuote={handleSelectServiceForQuote} 
        />

        {/* 3. Services Section */}
        <ServicesSection 
          onSelectService={(serviceTitle) => handleSelectServiceForQuote(serviceTitle)}
          onOpenDetails={handleOpenServiceDetails}
        />

        {/* 4. About the Workshop ("Quem Somos") */}
        <AboutSection onOpenAppointment={() => handleOpenAppointment()} />

        {/* 5. Differentials ("Por que escolher a Lisboa?") */}
        <DifferentialsSection />

        {/* 6. How It Works (4 Steps) */}
        <HowItWorksSection onOpenAppointment={() => handleOpenAppointment()} />

        {/* 7. Customer Reviews & Google Rating */}
        <ReviewsSection />

        {/* 8. Quote & Appointment Request Form */}
        <QuoteFormSection 
          preselectedService={quoteServiceTitle}
          initialProblemText={quoteProblemText}
        />

        {/* 9. Frequently Asked Questions (FAQ) */}
        <FAQSection />

        {/* 10. Location & Contact ("Onde Estamos") */}
        <LocationContactSection />
      </main>

      {/* Footer */}
      <Footer 
        onOpenPrivacyPolicy={() => setLegalModalType('privacy')}
        onOpenTerms={() => setLegalModalType('terms')}
      />

      {/* Floating WhatsApp Action Button */}
      <WhatsAppFloat />

      {/* Modals */}
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
