
import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import TrustedBySection from '../components/TrustedBySection';
import WhoIsProptyOSForSection from '../components/WhoIsProptyOSForSection';
import WhyProptyOSSection from '../components/WhyProptyOSSection';
import FeaturesSection from '../components/FeaturesSection';
import PricingSection from '../components/PricingSection';
import ContactSection from '../components/ContactSection';
import FAQSection from '../components/FAQSection';
import FinalCTASection from '../components/FinalCTASection';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <HeroSection />
      <TrustedBySection />
      <WhoIsProptyOSForSection />
      <WhyProptyOSSection />
      <FeaturesSection />
      <PricingSection />
      <ContactSection />
      <FAQSection />
      <FinalCTASection />
      <Footer />
    </div>
  );
};

export default Index;
