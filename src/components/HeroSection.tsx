
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Building, Home, DollarSign, MapPin, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

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

          {/* Right Content - Projects Dashboard Preview */}
          <div className="relative">
            <div className="transform hover:scale-105 transition-transform duration-700">
              {/* Projects Dashboard Overview */}
              <div className="bg-white border border-gray-200/60 rounded-3xl shadow-2xl p-6 backdrop-blur-sm">
                {/* Browser Header */}
                <div className="flex items-center space-x-2 mb-6">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
                  <div className="ml-4 text-sm text-gray-600 font-medium">ProptyOS - Projects Dashboard</div>
                </div>

                {/* Dashboard Header */}
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">Projects</h3>
                    <p className="text-sm text-gray-500 mt-1">Manage your real estate projects, blocks, and units</p>
                  </div>
                  <div className="bg-purple-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center">
                    <Plus className="h-3 w-3 mr-1" />
                    New Project
                  </div>
                </div>

                {/* Project KPI Cards */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="text-xs font-medium text-gray-600 mb-1">Total Projects</div>
                        <div className="text-lg font-bold text-gray-900">12</div>
                        <div className="text-xs text-gray-500">All registered</div>
                      </div>
                      <div className="p-2 rounded-lg bg-purple-100">
                        <Building className="h-4 w-4 text-purple-700" />
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="text-xs font-medium text-gray-600 mb-1">Total Units</div>
                        <div className="text-lg font-bold text-gray-900">1,247</div>
                        <div className="text-xs text-gray-500">Across all projects</div>
                      </div>
                      <div className="p-2 rounded-lg bg-emerald-100">
                        <Home className="h-4 w-4 text-emerald-700" />
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="text-xs font-medium text-gray-600 mb-1">Units Sold</div>
                        <div className="text-lg font-bold text-gray-900">845</div>
                        <div className="text-xs text-gray-500">Successfully closed</div>
                      </div>
                      <div className="p-2 rounded-lg bg-blue-100">
                        <DollarSign className="h-4 w-4 text-blue-700" />
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="text-xs font-medium text-gray-600 mb-1">Total Revenue</div>
                        <div className="text-lg font-bold text-gray-900">₦15.2B</div>
                        <div className="text-xs text-gray-500">All time earnings</div>
                      </div>
                      <div className="p-2 rounded-lg bg-amber-100">
                        <DollarSign className="h-4 w-4 text-amber-700" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Projects List Preview */}
                <div className="space-y-3">
                  <div className="bg-white border border-gray-200 rounded-xl p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="text-sm font-semibold text-gray-800">Victoria Gardens Estate</div>
                          <div className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Housing</div>
                          <div className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">ongoing</div>
                        </div>
                        <div className="flex items-center text-xs text-gray-500 mb-2">
                          <MapPin className="h-3 w-3 mr-1" />
                          Lekki, Lagos
                        </div>
                        <div className="flex gap-4 text-xs text-gray-600">
                          <span>5 blocks • 150 units</span>
                          <span className="text-green-600 font-medium">89 sold</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-purple-600">₦2.5B</div>
                        <div className="text-xs text-gray-500">Revenue</div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '59%' }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-xl p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="text-sm font-semibold text-gray-800">Emerald Heights</div>
                          <div className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">Mixed</div>
                          <div className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">ongoing</div>
                        </div>
                        <div className="flex items-center text-xs text-gray-500 mb-2">
                          <MapPin className="h-3 w-3 mr-1" />
                          Abuja, FCT
                        </div>
                        <div className="flex gap-4 text-xs text-gray-600">
                          <span>8 blocks • 200 units</span>
                          <span className="text-green-600 font-medium">156 sold</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-purple-600">₦4.2B</div>
                        <div className="text-xs text-gray-500">Revenue</div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '78%' }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-xl p-4 opacity-60">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="text-sm font-semibold text-gray-800">Golden View Towers</div>
                          <div className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Housing</div>
                        </div>
                        <div className="flex items-center text-xs text-gray-500 mb-2">
                          <MapPin className="h-3 w-3 mr-1" />
                          Victoria Island, Lagos
                        </div>
                        <div className="flex gap-4 text-xs text-gray-600">
                          <span>12 blocks • 300 units</span>
                          <span className="text-gray-400">View details...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -top-4 -right-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
              Live Projects
            </div>

            {/* Floating elements */}
            <div className="absolute -top-8 -left-8 w-20 h-20 bg-gradient-to-br from-purple-200/60 to-purple-300/60 rounded-full opacity-60 animate-pulse"></div>
            <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-gradient-to-br from-blue-200/60 to-blue-300/60 rounded-full opacity-40 animate-bounce"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
