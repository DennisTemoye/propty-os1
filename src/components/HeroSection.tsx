
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';

const HeroSection = () => {
  const [currentView, setCurrentView] = useState(0);
  const dashboardViews = [
    'Real Estate Company Dashboard',
    'Landlord Dashboard'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentView((prev) => (prev + 1) % dashboardViews.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="pt-32 pb-20 bg-gradient-to-br from-purple-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                Everything You Need to{' '}
                <span className="text-purple-600 dark:text-purple-400">Manage Properties</span>{' '}
                and Real Estate — In One Place.
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                Whether you're building an entire estate or renting few properties, ProptyOS gives you all the tools to manage sale and rent from one smart dashboard — built for Africa.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-400 dark:hover:text-white px-8 py-4 text-lg font-semibold rounded-2xl transition-all duration-300"
              >
                <Play className="mr-2 h-5 w-5" />
                Book a Demo
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>No credit card required</span>
              </div>
            </div>
          </div>

          {/* Right Content - Dashboard Preview */}
          <div className="relative">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div className="ml-4 text-sm text-gray-500 dark:text-gray-400">ProptyOS Dashboard</div>
              </div>
              
              <div className="space-y-4">
                <div className="h-4 bg-purple-200 dark:bg-purple-800 rounded w-3/4 animate-pulse"></div>
                <div className="h-32 bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-800 rounded-xl flex items-center justify-center">
                  <span className="text-purple-600 dark:text-purple-400 font-semibold text-lg">
                    {dashboardViews[currentView]}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-16 bg-gray-100 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                  <div className="h-16 bg-gray-100 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                  <div className="h-16 bg-gray-100 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                </div>
                <div className="h-20 bg-gray-100 dark:bg-gray-700 rounded-lg animate-pulse"></div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-purple-100 dark:bg-purple-900 rounded-full opacity-60 animate-bounce"></div>
            <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-purple-200 dark:bg-purple-800 rounded-full opacity-40 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
