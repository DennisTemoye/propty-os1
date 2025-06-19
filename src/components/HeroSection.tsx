
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';

const HeroSection = () => {
  const [currentView, setCurrentView] = useState(0);
  const dashboardViews = [
    {
      title: 'Real Estate Company Dashboard',
      screenshot: (
        <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-200/60 rounded-2xl shadow-xl p-6 backdrop-blur-sm">
          <div className="flex items-center space-x-2 mb-6">
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
            <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
            <div className="ml-4 text-sm text-slate-600 font-medium">ProptyOS - Company Dashboard</div>
          </div>
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-purple-700 rounded-xl shadow-lg"></div>
              <div className="h-4 bg-gradient-to-r from-slate-300 to-slate-200 rounded-lg w-40"></div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200/40 p-4 rounded-xl shadow-sm">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg mb-3 shadow-md"></div>
                <div className="h-3 bg-blue-200 rounded-lg w-16 mb-2"></div>
                <div className="h-5 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg w-12 shadow-sm"></div>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 border border-emerald-200/40 p-4 rounded-xl shadow-sm">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg mb-3 shadow-md"></div>
                <div className="h-3 bg-emerald-200 rounded-lg w-20 mb-2"></div>
                <div className="h-5 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-lg w-14 shadow-sm"></div>
              </div>
              <div className="bg-gradient-to-br from-violet-50 to-violet-100/50 border border-violet-200/40 p-4 rounded-xl shadow-sm">
                <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-violet-600 rounded-lg mb-3 shadow-md"></div>
                <div className="h-3 bg-violet-200 rounded-lg w-18 mb-2"></div>
                <div className="h-5 bg-gradient-to-r from-violet-600 to-violet-700 rounded-lg w-16 shadow-sm"></div>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200/40 p-4 rounded-xl shadow-sm">
                <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg mb-3 shadow-md"></div>
                <div className="h-3 bg-amber-200 rounded-lg w-14 mb-2"></div>
                <div className="h-5 bg-gradient-to-r from-amber-600 to-amber-700 rounded-lg w-18 shadow-sm"></div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-slate-50 to-slate-100/50 border border-slate-200/40 rounded-xl p-4 mt-4 shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <div className="h-4 bg-slate-400 rounded-lg w-32"></div>
                <div className="h-4 bg-gradient-to-r from-violet-500 to-purple-600 rounded-lg w-20 shadow-sm"></div>
              </div>
              <div className="space-y-3">
                <div className="flex space-x-3">
                  <div className="h-12 bg-gradient-to-br from-violet-200 to-violet-300 rounded-lg flex-1 shadow-sm"></div>
                  <div className="h-12 bg-gradient-to-br from-blue-200 to-blue-300 rounded-lg flex-1 shadow-sm"></div>
                  <div className="h-12 bg-gradient-to-br from-emerald-200 to-emerald-300 rounded-lg flex-1 shadow-sm"></div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="h-5 bg-slate-200 rounded-lg"></div>
                  <div className="h-5 bg-slate-200 rounded-lg"></div>
                  <div className="h-5 bg-slate-200 rounded-lg"></div>
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
        <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-200/60 rounded-2xl shadow-xl p-6 backdrop-blur-sm">
          <div className="flex items-center space-x-2 mb-6">
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
            <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
            <div className="ml-4 text-sm text-slate-600 font-medium">ProptyOS - Landlord Dashboard</div>
          </div>
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-purple-700 rounded-xl shadow-lg"></div>
              <div className="h-4 bg-gradient-to-r from-slate-300 to-slate-200 rounded-lg w-40"></div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200/40 p-4 rounded-xl shadow-sm">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg mb-3 shadow-md"></div>
                <div className="h-3 bg-blue-200 rounded-lg w-20 mb-2"></div>
                <div className="h-5 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg w-10 shadow-sm"></div>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 border border-emerald-200/40 p-4 rounded-xl shadow-sm">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg mb-3 shadow-md"></div>
                <div className="h-3 bg-emerald-200 rounded-lg w-16 mb-2"></div>
                <div className="h-5 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-lg w-12 shadow-sm"></div>
              </div>
              <div className="bg-gradient-to-br from-violet-50 to-violet-100/50 border border-violet-200/40 p-4 rounded-xl shadow-sm">
                <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-violet-600 rounded-lg mb-3 shadow-md"></div>
                <div className="h-3 bg-violet-200 rounded-lg w-18 mb-2"></div>
                <div className="h-5 bg-gradient-to-r from-violet-600 to-violet-700 rounded-lg w-14 shadow-sm"></div>
              </div>
              <div className="bg-gradient-to-br from-rose-50 to-rose-100/50 border border-rose-200/40 p-4 rounded-xl shadow-sm">
                <div className="w-8 h-8 bg-gradient-to-br from-rose-500 to-rose-600 rounded-lg mb-3 shadow-md"></div>
                <div className="h-3 bg-rose-200 rounded-lg w-22 mb-2"></div>
                <div className="h-5 bg-gradient-to-r from-rose-600 to-rose-700 rounded-lg w-16 shadow-sm"></div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-gradient-to-br from-slate-50 to-slate-100/50 border border-slate-200/40 rounded-xl p-4 shadow-sm">
                <div className="h-4 bg-slate-400 rounded-lg w-24 mb-3"></div>
                <div className="space-y-3">
                  <div className="h-20 bg-gradient-to-br from-violet-200 to-violet-300 rounded-lg shadow-sm"></div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="h-4 bg-slate-300 rounded-lg"></div>
                    <div className="h-4 bg-slate-300 rounded-lg"></div>
                    <div className="h-4 bg-slate-300 rounded-lg"></div>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-slate-50 to-slate-100/50 border border-slate-200/40 rounded-xl p-4 shadow-sm">
                <div className="h-4 bg-slate-400 rounded-lg w-28 mb-3"></div>
                <div className="space-y-3">
                  <div className="flex space-x-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full shadow-md"></div>
                    <div className="w-8 h-10 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full shadow-md"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="h-4 bg-slate-300 rounded-lg"></div>
                    <div className="h-4 bg-slate-300 rounded-lg"></div>
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
    <section className="pt-32 pb-20 bg-gradient-to-br from-slate-50 via-white to-violet-50/30 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 leading-tight">
                Everything You Need to{' '}
                <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">Manage Properties</span>{' '}
                and Real Estate — In One Place.
              </h1>
              
              <p className="text-xl text-slate-600 leading-relaxed">
                Whether you're building an entire estate or renting few properties, ProptyOS gives you all the tools to manage sale and rent from one smart dashboard — built for Africa.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-0"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-2 border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 px-8 py-4 text-lg font-semibold rounded-2xl transition-all duration-300"
              >
                <Play className="mr-2 h-5 w-5" />
                Book a Demo
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center space-x-6 text-sm text-slate-500">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span>No credit card required</span>
              </div>
            </div>
          </div>

          {/* Right Content - Dashboard Preview */}
          <div className="relative">
            <div className="transform rotate-2 hover:rotate-0 transition-transform duration-500">
              {dashboardViews[currentView].screenshot}
            </div>

            {/* Dashboard Title */}
            <div className="mt-6 text-center">
              <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent font-semibold text-lg">
                {dashboardViews[currentView].title}
              </span>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-violet-200 to-purple-200 rounded-full opacity-60 animate-bounce"></div>
            <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-gradient-to-br from-blue-200 to-violet-200 rounded-full opacity-40 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
