
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Users, Building2, TrendingUp, Zap, Shield, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 overflow-hidden">
      {/* Modern geometric background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-80 h-80 bg-gradient-to-br from-purple-200/30 to-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-20 w-96 h-96 bg-gradient-to-tr from-blue-200/20 to-purple-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-gradient-to-bl from-indigo-200/25 to-cyan-200/25 rounded-full blur-2xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Main Hero Content */}
          <div className="text-center space-y-12 mb-20">
            <div className="space-y-8">
              <div className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm border border-purple-200/50 text-purple-700 rounded-full text-sm font-medium shadow-lg">
                <Zap className="w-4 h-4 mr-2" />
                The Complete Real Estate Management Platform for Africa
              </div>
              
              <h1 className="text-6xl lg:text-7xl font-bold text-slate-900 leading-tight max-w-5xl mx-auto">
                Transform Your{' '}
                <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
                  Real Estate Operations
                </span>{' '}
                Today
              </h1>
              
              <p className="text-2xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
                Streamline projects, manage clients, track sales, and scale your team with Africa's most comprehensive real estate platform. 
                <span className="text-purple-600 font-semibold"> Built for African markets.</span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/signup">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-10 py-6 text-xl font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-0 min-w-[200px]"
                >
                  Start Free Trial
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </Link>
              <Link to="/book-demo">
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-2 border-slate-300 bg-white/80 backdrop-blur-sm text-slate-700 hover:bg-white hover:border-purple-300 px-10 py-6 text-xl font-semibold rounded-2xl transition-all duration-300 min-w-[200px]"
                >
                  <Play className="mr-3 h-6 w-6" />
                  Watch Demo
                </Button>
              </Link>
            </div>

            {/* Enhanced trust indicators */}
            <div className="flex flex-wrap justify-center gap-8 text-slate-600">
              <div className="flex items-center space-x-3 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <span className="font-medium">14-day free trial</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
                <Shield className="w-5 h-5 text-emerald-500" />
                <span className="font-medium">No credit card required</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
                <Zap className="w-5 h-5 text-emerald-500" />
                <span className="font-medium">Setup in 5 minutes</span>
              </div>
            </div>
          </div>

          {/* Feature highlights grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Building2 className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Project Management</h3>
              <p className="text-slate-600">Manage unlimited projects, blocks, and units with advanced mapping and allocation features.</p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Team Collaboration</h3>
              <p className="text-slate-600">Scale your team with role-based access, CRM pipelines, and commission management.</p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Analytics & Reports</h3>
              <p className="text-slate-600">Track sales performance, revenue analytics, and generate comprehensive reports.</p>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
