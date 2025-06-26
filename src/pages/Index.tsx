
import React from 'react';
import { FullWidthLayout } from '@/components/layouts/FullWidthLayout';
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
    <FullWidthLayout padding="none" background="default">
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
    </FullWidthLayout>
  );
};

export default Index;
