
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Users, Building2, TrendingUp, Zap, Shield, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden">
      {/* Vibrant geometric background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-80 h-80 bg-gradient-purple opacity-30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-20 w-96 h-96 bg-gradient-emerald opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-gradient-blue opacity-25 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-gradient-orange opacity-15 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-10 w-48 h-48 bg-gradient-pink opacity-20 rounded-full blur-2xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Main Hero Content */}
          <div className="text-center space-y-12 mb-20">
            <div className="space-y-8">
              <div className="inline-flex items-center px-6 py-3 bg-card/80 backdrop-blur-sm border border-border text-primary rounded-full text-sm font-medium shadow-lg">
                <Zap className="w-4 h-4 mr-2" />
                The Complete Real Estate Management Platform for Africa
              </div>
              
              <h1 className="text-6xl lg:text-7xl font-bold text-foreground leading-tight max-w-5xl mx-auto">
                Transform Your{' '}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Real Estate Operations
                </span>{' '}
                Today
              </h1>
              
              <p className="text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Streamline projects, manage clients, track sales, and scale your team with Africa's most comprehensive real estate platform. 
                <span className="text-primary font-semibold"> Built for African markets.</span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/signup">
                <Button 
                  size="lg"
                  className="bg-gradient-primary text-primary-foreground hover:opacity-90 px-10 py-6 text-xl font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-0 min-w-[200px]"
                >
                  Start Free Trial
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </Link>
              <Link to="/book-demo">
                <Button 
                  variant="outline"
                  size="lg"
                  className="bg-card/80 backdrop-blur-sm text-foreground hover:bg-card px-10 py-6 text-xl font-semibold rounded-2xl transition-all duration-300 min-w-[200px]"
                >
                  <Play className="mr-3 h-6 w-6" />
                  Book Demo
                </Button>
              </Link>
            </div>

            {/* Enhanced trust indicators */}
            <div className="flex flex-wrap justify-center gap-8 text-muted-foreground">
              <div className="flex items-center space-x-3 bg-card/60 backdrop-blur-sm px-4 py-2 rounded-full">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <span className="font-medium">14-day free trial</span>
              </div>
              <div className="flex items-center space-x-3 bg-card/60 backdrop-blur-sm px-4 py-2 rounded-full">
                <Shield className="w-5 h-5 text-emerald-500" />
                <span className="font-medium">No credit card required</span>
              </div>
              <div className="flex items-center space-x-3 bg-card/60 backdrop-blur-sm px-4 py-2 rounded-full">
                <Zap className="w-5 h-5 text-emerald-500" />
                <span className="font-medium">Setup in 5 minutes</span>
              </div>
            </div>
          </div>

          {/* Feature highlights grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 hover:border-purple-300">
              <div className="w-16 h-16 bg-gradient-purple rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Project Management</h3>
              <p className="text-muted-foreground">Manage unlimited projects, blocks, and units with advanced mapping and allocation features.</p>
            </div>

            <div className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 hover:border-emerald-300">
              <div className="w-16 h-16 bg-gradient-emerald rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Team Collaboration</h3>
              <p className="text-muted-foreground">Scale your team with role-based access, CRM pipelines, and commission management.</p>
            </div>

            <div className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 hover:border-orange-300">
              <div className="w-16 h-16 bg-gradient-orange rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Analytics & Reports</h3>
              <p className="text-muted-foreground">Track sales performance, revenue analytics, and generate comprehensive reports.</p>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
