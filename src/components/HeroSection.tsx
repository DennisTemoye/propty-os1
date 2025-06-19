
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const [currentDashboard, setCurrentDashboard] = useState(0);

  const dashboards = [
    {
      title: "Real Estate Company Dashboard",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Landlord Dashboard",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDashboard((prev) => (prev + 1) % dashboards.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="pt-24 pb-16 bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Everything You Need to{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-800">
                  Manage Properties
                </span>{' '}
                and Real Estate — In One Place.
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Whether you're building an entire estate or renting few properties, ProptyOS gives you all the tools to manage sale and rent from one smart dashboard — built for Africa.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Start Free Trial
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-4 text-lg font-semibold rounded-2xl transition-all duration-300"
              >
                Book a Demo
              </Button>
            </div>
          </div>

          {/* Right Column - Dashboard Preview */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-white">
              <div className="absolute top-4 left-4 z-10">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-md">
                  <p className="text-sm font-medium text-gray-700">
                    {dashboards[currentDashboard].title}
                  </p>
                </div>
              </div>
              
              <img
                src={dashboards[currentDashboard].image}
                alt={dashboards[currentDashboard].title}
                className="w-full h-96 object-cover transition-all duration-1000"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent"></div>
            </div>

            {/* Dashboard Toggle Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {dashboards.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentDashboard(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentDashboard 
                      ? 'bg-purple-600 scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
