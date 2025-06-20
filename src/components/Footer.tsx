
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { Shield } from 'lucide-react';

const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 dark:bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-purple-400">ProptyOS</h3>
            <p className="text-gray-300 leading-relaxed">
              The all-in-one property and real estate management platform built for Africa.
            </p>
            
            {/* NDPC Certification */}
            <div className="flex items-center space-x-2 pt-4">
              <Shield className="w-6 h-6 text-green-400" />
              <div className="text-sm">
                <div className="text-green-400 font-semibold">NDPC Certified</div>
                <div className="text-gray-400">Nigeria Data Protection Commission</div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <div className="space-y-2">
              <button 
                onClick={() => scrollToSection('about')}
                className="block text-gray-300 hover:text-purple-400 transition-colors"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('features')}
                className="block text-gray-300 hover:text-purple-400 transition-colors"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="block text-gray-300 hover:text-purple-400 transition-colors"
              >
                Contact
              </button>
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Legal</h4>
            <div className="space-y-2">
              <a href="#" className="block text-gray-300 hover:text-purple-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="block text-gray-300 hover:text-purple-400 transition-colors">
                Terms of Use
              </a>
            </div>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors">
                LinkedIn
              </a>
              <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors">
                Twitter
              </a>
              <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors">
                Instagram
              </a>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-gray-700" />
        
        <div className="text-center text-gray-400">
          <p>&copy; 2025 ProptyOS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
