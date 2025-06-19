
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Building, Users, DollarSign, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const [currentView, setCurrentView] = useState(0);
  const dashboardViews = [
    {
      title: 'Property Developer Dashboard',
      screenshot: (
        <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-200/60 rounded-2xl shadow-xl p-6 backdrop-blur-sm">
          <div className="flex items-center space-x-2 mb-6">
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
            <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
            <div className="ml-4 text-sm text-slate-600 font-medium">ProptyOS - Developer Dashboard</div>
          </div>
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl shadow-lg"></div>
              <div className="h-4 bg-gradient-to-r from-slate-300 to-slate-200 rounded-lg w-40"></div>
            </div>
            {/* Developer KPI Cards */}
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-gradient-to-tr from-purple-500 to-blue-400 rounded-2xl shadow-md p-4 transform hover:scale-105 transition-all duration-300">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="text-xs font-medium text-white/80 mb-2">Active Projects</div>
                    <div className="text-lg font-bold text-white">12</div>
                    <div className="text-xs text-white/70">3 New This Month</div>
                  </div>
                  <div className="p-2 rounded-xl bg-white/20 shadow-sm">
                    <Building className="h-4 w-4 text-white" />
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-tr from-green-400 to-teal-300 rounded-2xl shadow-md p-4 transform hover:scale-105 transition-all duration-300">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="text-xs font-medium text-white/80 mb-2">Units Sold</div>
                    <div className="text-lg font-bold text-white">845</div>
                    <div className="text-xs text-white/70">156 This Quarter</div>
                  </div>
                  <div className="p-2 rounded-xl bg-white/20 shadow-sm">
                    <DollarSign className="h-4 w-4 text-white" />
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-tr from-orange-400 to-amber-300 rounded-2xl shadow-md p-4 transform hover:scale-105 transition-all duration-300">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="text-xs font-medium text-white/80 mb-2">Active Clients</div>
                    <div className="text-lg font-bold text-white">1,247</div>
                    <div className="text-xs text-white/70">89 This Month</div>
                  </div>
                  <div className="p-2 rounded-xl bg-white/20 shadow-sm">
                    <Users className="h-4 w-4 text-white" />
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-tr from-indigo-400 to-pink-300 rounded-2xl shadow-md p-4 transform hover:scale-105 transition-all duration-300">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="text-xs font-medium text-white/80 mb-2">Revenue</div>
                    <div className="text-lg font-bold text-white">₦2.4B</div>
                    <div className="text-xs text-white/70">YTD Performance</div>
                  </div>
                  <div className="p-2 rounded-xl bg-white/20 shadow-sm">
                    <FileText className="h-4 w-4 text-white" />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-slate-50 to-slate-100/50 border border-slate-200/40 rounded-xl p-4 mt-4 shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <div className="h-4 bg-slate-400 rounded-lg w-32"></div>
                <div className="h-4 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg w-20 shadow-sm"></div>
              </div>
              <div className="space-y-3">
                <div className="flex space-x-3">
                  <div className="h-12 bg-gradient-to-br from-purple-200 to-purple-300 rounded-lg flex-1 shadow-sm"></div>
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
      title: 'Real Estate Marketer Dashboard',
      screenshot: (
        <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-200/60 rounded-2xl shadow-xl p-6 backdrop-blur-sm">
          <div className="flex items-center space-x-2 mb-6">
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
            <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
            <div className="ml-4 text-sm text-slate-600 font-medium">ProptyOS - Marketer Dashboard</div>
          </div>
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl shadow-lg"></div>
              <div className="h-4 bg-gradient-to-r from-slate-300 to-slate-200 rounded-lg w-40"></div>
            </div>
            {/* Marketer KPI Cards */}
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-gradient-to-tr from-purple-500 to-blue-400 rounded-2xl shadow-md p-4 transform hover:scale-105 transition-all duration-300">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="text-xs font-medium text-white/80 mb-2">Active Leads</div>
                    <div className="text-lg font-bold text-white">156</div>
                    <div className="text-xs text-white/70">23 New This Week</div>
                  </div>
                  <div className="p-2 rounded-xl bg-white/20 shadow-sm">
                    <Users className="h-4 w-4 text-white" />
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-tr from-green-400 to-teal-300 rounded-2xl shadow-md p-4 transform hover:scale-105 transition-all duration-300">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="text-xs font-medium text-white/80 mb-2">Sales Closed</div>
                    <div className="text-lg font-bold text-white">45</div>
                    <div className="text-xs text-white/70">28% Conversion</div>
                  </div>
                  <div className="p-2 rounded-xl bg-white/20 shadow-sm">
                    <DollarSign className="h-4 w-4 text-white" />
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-tr from-orange-400 to-amber-300 rounded-2xl shadow-md p-4 transform hover:scale-105 transition-all duration-300">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="text-xs font-medium text-white/80 mb-2">Commission Earned</div>
                    <div className="text-lg font-bold text-white">₦4.2M</div>
                    <div className="text-xs text-white/70">This Quarter</div>
                  </div>
                  <div className="p-2 rounded-xl bg-white/20 shadow-sm">
                    <Building className="h-4 w-4 text-white" />
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-tr from-rose-400 to-pink-300 rounded-2xl shadow-md p-4 transform hover:scale-105 transition-all duration-300">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="text-xs font-medium text-white/80 mb-2">Team Performance</div>
                    <div className="text-lg font-bold text-white">92%</div>
                    <div className="text-xs text-white/70">Above Target</div>
                  </div>
                  <div className="p-2 rounded-xl bg-white/20 shadow-sm">
                    <FileText className="h-4 w-4 text-white" />
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-gradient-to-br from-slate-50 to-slate-100/50 border border-slate-200/40 rounded-xl p-4 shadow-sm">
                <div className="h-4 bg-slate-400 rounded-lg w-24 mb-3"></div>
                <div className="space-y-3">
                  <div className="h-20 bg-gradient-to-br from-purple-200 to-purple-300 rounded-lg shadow-sm"></div>
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
    <section className="pt-32 pb-20 bg-gradient-to-br from-slate-50 via-white to-purple-50/30 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 leading-tight">
                Everything You Need to{' '}
                <span className="bg-gradient-to-r from-purple-600 to-purple-600 bg-clip-text text-transparent">Manage Real Estate Projects</span>{' '}
                Sales & Clients.
              </h1>
              
              <p className="text-xl text-slate-600 leading-relaxed">
                Whether you're developing estates, selling land, or managing property sales, ProptyOS provides all the tools you need to organize, allocate, track, and grow your real estate business — built for Africa.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/signup">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-purple-600 hover:from-purple-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-0"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/book-demo">
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-2 border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 px-8 py-4 text-lg font-semibold rounded-2xl transition-all duration-300"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Book a Demo
                </Button>
              </Link>
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
              <span className="bg-gradient-to-r from-purple-600 to-purple-600 bg-clip-text text-transparent font-semibold text-lg">
                {dashboardViews[currentView].title}
              </span>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-purple-200 to-purple-200 rounded-full opacity-60 animate-bounce"></div>
            <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-40 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
