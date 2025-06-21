
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedDashboardPreview from './AnimatedDashboardPreview';

const HeroSection = () => {
  return (
    <section className="pt-32 pb-20 bg-gradient-to-br from-white via-purple-50/30 to-blue-50/20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-100/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-50/20 to-blue-50/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                🚀 Complete Real Estate Management Platform
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Manage Your{' '}
                <span className="bg-gradient-to-r from-purple-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Real Estate Business
                </span>{' '}
                Like a Pro
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                From project development to client management and sales tracking — ProptyOS is the all-in-one platform built specifically for African real estate professionals.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/signup">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-0"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/book-demo">
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 px-8 py-4 text-lg font-semibold rounded-2xl transition-all duration-300"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </Button>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span>No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span>Setup in 5 minutes</span>
              </div>
            </div>
          </div>

          {/* Right Content - Animated Dashboard Preview */}
          <div className="relative">
            <AnimatedDashboardPreview />
            
            {/* Caption */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 font-medium">
                See how ProptyOS helps you manage real estate in real-time
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
