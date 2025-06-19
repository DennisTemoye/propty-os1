
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';

const HeroSection = () => {
  const [currentView, setCurrentView] = useState(0);
  const dashboardViews = [
    {
      title: 'Real Estate Company Dashboard',
      screenshot: (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div className="ml-4 text-xs text-gray-500 dark:text-gray-400">ProptyOS - Company Dashboard</div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-purple-600 rounded-lg"></div>
              <div className="h-3 bg-purple-200 dark:bg-purple-800 rounded w-32"></div>
            </div>
            <div className="grid grid-cols-4 gap-3">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                <div className="w-6 h-6 bg-blue-500 rounded mb-2"></div>
                <div className="h-2 bg-blue-200 dark:bg-blue-800 rounded w-12 mb-1"></div>
                <div className="h-4 bg-blue-600 rounded w-8 font-bold"></div>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                <div className="w-6 h-6 bg-green-500 rounded mb-2"></div>
                <div className="h-2 bg-green-200 dark:bg-green-800 rounded w-16 mb-1"></div>
                <div className="h-4 bg-green-600 rounded w-10 font-bold"></div>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
                <div className="w-6 h-6 bg-purple-500 rounded mb-2"></div>
                <div className="h-2 bg-purple-200 dark:bg-purple-800 rounded w-14 mb-1"></div>
                <div className="h-4 bg-purple-600 rounded w-12 font-bold"></div>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg">
                <div className="w-6 h-6 bg-orange-500 rounded mb-2"></div>
                <div className="h-2 bg-orange-200 dark:bg-orange-800 rounded w-10 mb-1"></div>
                <div className="h-4 bg-orange-600 rounded w-14 font-bold"></div>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mt-3">
              <div className="flex justify-between items-center mb-2">
                <div className="h-3 bg-gray-400 rounded w-24"></div>
                <div className="h-3 bg-purple-500 rounded w-16"></div>
              </div>
              <div className="space-y-2">
                <div className="flex space-x-2">
                  <div className="h-8 bg-purple-200 dark:bg-purple-800 rounded flex-1"></div>
                  <div className="h-8 bg-blue-200 dark:bg-blue-800 rounded flex-1"></div>
                  <div className="h-8 bg-green-200 dark:bg-green-800 rounded flex-1"></div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Landlord Dashboard',
      screenshot: (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div className="ml-4 text-xs text-gray-500 dark:text-gray-400">ProptyOS - Landlord Dashboard</div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-purple-600 rounded-lg"></div>
              <div className="h-3 bg-purple-200 dark:bg-purple-800 rounded w-32"></div>
            </div>
            <div className="grid grid-cols-4 gap-3">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                <div className="w-6 h-6 bg-blue-500 rounded mb-2"></div>
                <div className="h-2 bg-blue-200 dark:bg-blue-800 rounded w-16 mb-1"></div>
                <div className="h-4 bg-blue-600 rounded w-6 font-bold"></div>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                <div className="w-6 h-6 bg-green-500 rounded mb-2"></div>
                <div className="h-2 bg-green-200 dark:bg-green-800 rounded w-12 mb-1"></div>
                <div className="h-4 bg-green-600 rounded w-8 font-bold"></div>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
                <div className="w-6 h-6 bg-purple-500 rounded mb-2"></div>
                <div className="h-2 bg-purple-200 dark:bg-purple-800 rounded w-14 mb-1"></div>
                <div className="h-4 bg-purple-600 rounded w-10 font-bold"></div>
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <div className="w-6 h-6 bg-red-500 rounded mb-2"></div>
                <div className="h-2 bg-red-200 dark:bg-red-800 rounded w-18 mb-1"></div>
                <div className="h-4 bg-red-600 rounded w-12 font-bold"></div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                <div className="h-3 bg-gray-400 rounded w-20 mb-2"></div>
                <div className="space-y-2">
                  <div className="h-16 bg-gradient-to-r from-purple-200 to-purple-300 dark:from-purple-800 dark:to-purple-700 rounded"></div>
                  <div className="grid grid-cols-3 gap-1">
                    <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
                    <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
                    <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                <div className="h-3 bg-gray-400 rounded w-24 mb-2"></div>
                <div className="space-y-2">
                  <div className="flex space-x-1">
                    <div className="w-8 h-8 bg-green-400 rounded-full"></div>
                    <div className="w-6 h-8 bg-orange-400 rounded-full"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
                    <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
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
            <div className="transform rotate-3 hover:rotate-0 transition-transform duration-500">
              {dashboardViews[currentView].screenshot}
            </div>

            {/* Dashboard Title */}
            <div className="mt-4 text-center">
              <span className="text-purple-600 dark:text-purple-400 font-semibold text-lg">
                {dashboardViews[currentView].title}
              </span>
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
