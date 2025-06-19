
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Building, Users, DollarSign, FileText, TrendingUp, Calendar } from 'lucide-react';
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

          {/* Right Content - Dashboard Preview */}
          <div className="relative">
            <div className="transform hover:scale-105 transition-transform duration-700">
              {/* General Dashboard Overview */}
              <div className="bg-white border border-gray-200/60 rounded-3xl shadow-2xl p-6 backdrop-blur-sm">
                {/* Browser Header */}
                <div className="flex items-center space-x-2 mb-6">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
                  <div className="ml-4 text-sm text-gray-600 font-medium">ProptyOS Dashboard</div>
                </div>

                {/* Dashboard Header */}
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">Business Overview</h3>
                    <p className="text-sm text-gray-500 mt-1">Real-time insights for your real estate business</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-500">Last 30 days</span>
                  </div>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gradient-to-tr from-purple-500 to-purple-600 rounded-xl shadow-md p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="text-xs font-medium text-white/80 mb-1">Total Revenue</div>
                        <div className="text-lg font-bold text-white">₦2.4B</div>
                        <div className="text-xs text-white/70">+12% this month</div>
                      </div>
                      <div className="p-2 rounded-lg bg-white/20">
                        <DollarSign className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-tr from-blue-500 to-blue-600 rounded-xl shadow-md p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="text-xs font-medium text-white/80 mb-1">Active Projects</div>
                        <div className="text-lg font-bold text-white">24</div>
                        <div className="text-xs text-white/70">3 new this week</div>
                      </div>
                      <div className="p-2 rounded-lg bg-white/20">
                        <Building className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-tr from-emerald-500 to-emerald-600 rounded-xl shadow-md p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="text-xs font-medium text-white/80 mb-1">Total Clients</div>
                        <div className="text-lg font-bold text-white">1,847</div>
                        <div className="text-xs text-white/70">156 active</div>
                      </div>
                      <div className="p-2 rounded-lg bg-white/20">
                        <Users className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-tr from-amber-500 to-amber-600 rounded-xl shadow-md p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="text-xs font-medium text-white/80 mb-1">Growth Rate</div>
                        <div className="text-lg font-bold text-white">28%</div>
                        <div className="text-xs text-white/70">year over year</div>
                      </div>
                      <div className="p-2 rounded-lg bg-white/20">
                        <TrendingUp className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Chart Area */}
                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                  <div className="flex justify-between items-center mb-3">
                    <div className="h-4 bg-gray-400 rounded w-32"></div>
                    <div className="h-4 bg-purple-500 rounded w-20"></div>
                  </div>
                  <div className="h-32 bg-gradient-to-t from-purple-100 to-white rounded-lg relative overflow-hidden">
                    <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-purple-200/60 to-transparent rounded-lg"></div>
                    <div className="absolute bottom-0 left-0 w-full flex items-end justify-between px-4 pb-2">
                      <div className="w-8 h-16 bg-gradient-to-t from-purple-400 to-purple-300 rounded-t"></div>
                      <div className="w-8 h-20 bg-gradient-to-t from-purple-500 to-purple-400 rounded-t"></div>
                      <div className="w-8 h-12 bg-gradient-to-t from-purple-300 to-purple-200 rounded-t"></div>
                      <div className="w-8 h-24 bg-gradient-to-t from-purple-600 to-purple-500 rounded-t"></div>
                      <div className="w-8 h-18 bg-gradient-to-t from-purple-400 to-purple-300 rounded-t"></div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white border border-gray-200 rounded-lg p-3 flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <FileText className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <div className="text-xs font-medium text-gray-800">Recent Activity</div>
                      <div className="text-xs text-gray-500">23 new updates</div>
                    </div>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg p-3 flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Users className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-xs font-medium text-gray-800">Team Performance</div>
                      <div className="text-xs text-gray-500">92% efficiency</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -top-4 -right-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
              Live Dashboard
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
