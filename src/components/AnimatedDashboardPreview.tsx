
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Building, Home, DollarSign, MapPin, Plus, Users, FileText, Bell, Play, Pause, RotateCcw } from 'lucide-react';

interface AnimationStep {
  id: string;
  action: string;
  duration: number;
  cursorPosition: { x: number; y: number };
  description: string;
}

const AnimatedDashboardPreview = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showModal, setShowModal] = useState<string | null>(null);
  const [animatedCursor, setAnimatedCursor] = useState({ x: 50, y: 50 });

  const animationSteps: AnimationStep[] = [
    { id: 'overview', action: 'Viewing Dashboard Overview', duration: 3000, cursorPosition: { x: 50, y: 30 }, description: 'Main dashboard with KPIs' },
    { id: 'new-project', action: 'Adding New Project', duration: 4000, cursorPosition: { x: 85, y: 15 }, description: 'Click +New to add project' },
    { id: 'clients', action: 'Managing Clients', duration: 3500, cursorPosition: { x: 20, y: 60 }, description: 'Navigate to clients section' },
    { id: 'assign-unit', action: 'Assigning Unit', duration: 4000, cursorPosition: { x: 70, y: 70 }, description: 'Assign property to client' },
    { id: 'fees', action: 'Recording Payment', duration: 3500, cursorPosition: { x: 30, y: 80 }, description: 'Process fee collection' },
    { id: 'marketers', action: 'Viewing Commissions', duration: 3000, cursorPosition: { x: 60, y: 50 }, description: 'Check marketer performance' },
    { id: 'notices', action: 'Sending Notice', duration: 3500, cursorPosition: { x: 40, y: 90 }, description: 'Send automated notices' },
  ];

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setTimeout(() => {
      setCurrentStep((prev) => (prev + 1) % animationSteps.length);
    }, animationSteps[currentStep].duration);

    // Animate cursor movement
    const cursorTimer = setTimeout(() => {
      setAnimatedCursor(animationSteps[currentStep].cursorPosition);
    }, 500);

    // Show modal for certain steps
    if (['new-project', 'assign-unit', 'fees'].includes(animationSteps[currentStep].id)) {
      const modalTimer = setTimeout(() => {
        setShowModal(animationSteps[currentStep].id);
      }, 1500);

      const hideModalTimer = setTimeout(() => {
        setShowModal(null);
      }, animationSteps[currentStep].duration - 500);

      return () => {
        clearTimeout(timer);
        clearTimeout(cursorTimer);
        clearTimeout(modalTimer);
        clearTimeout(hideModalTimer);
      };
    }

    return () => {
      clearTimeout(timer);
      clearTimeout(cursorTimer);
    };
  }, [currentStep, isPlaying]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setIsPlaying(true);
    setShowModal(null);
  };

  return (
    <div className="relative">
      {/* Controls */}
      <div className="absolute -top-4 right-4 z-20 flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePlayPause}
          className="bg-white/90 backdrop-blur-sm shadow-lg"
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRestart}
          className="bg-white/90 backdrop-blur-sm shadow-lg"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

      {/* Main Dashboard Container */}
      <div className="transform hover:scale-105 transition-transform duration-700">
        <div className="bg-white border border-gray-200/60 rounded-3xl shadow-2xl p-6 backdrop-blur-sm relative overflow-hidden">
          
          {/* Animated Cursor */}
          <div 
            className={`absolute w-6 h-6 pointer-events-none z-30 transition-all duration-1000 ease-in-out ${isPlaying ? 'opacity-100' : 'opacity-0'}`}
            style={{ 
              left: `${animatedCursor.x}%`, 
              top: `${animatedCursor.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div className="w-6 h-6 bg-purple-600 rounded-full shadow-lg animate-pulse">
              <div className="w-2 h-2 bg-white rounded-full absolute top-1 left-1"></div>
            </div>
          </div>

          {/* Browser Header */}
          <div className="flex items-center space-x-2 mb-6">
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
            <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
            <div className="ml-4 text-sm text-gray-600 font-medium">ProptyOS - Company Dashboard</div>
          </div>

          {/* Dashboard Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">Dashboard Overview</h3>
              <p className="text-sm text-gray-500 mt-1">{animationSteps[currentStep].description}</p>
            </div>
            <div className={`bg-purple-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center transition-all duration-300 ${currentStep === 1 ? 'ring-4 ring-purple-200 scale-110' : ''}`}>
              <Plus className="h-3 w-3 mr-1" />
              New Project
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <div className={`bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 transition-all duration-500 ${currentStep === 0 ? 'ring-2 ring-purple-300 scale-105' : ''}`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="text-xs font-medium text-gray-600 mb-1">Total Projects</div>
                  <div className="text-lg font-bold text-gray-900">12</div>
                  <div className="text-xs text-emerald-600">+2 this month</div>
                </div>
                <div className="p-2 rounded-lg bg-purple-100">
                  <Building className="h-4 w-4 text-purple-700" />
                </div>
              </div>
            </div>

            <div className={`bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-4 transition-all duration-500 ${currentStep === 2 ? 'ring-2 ring-emerald-300 scale-105' : ''}`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="text-xs font-medium text-gray-600 mb-1">Active Clients</div>
                  <div className="text-lg font-bold text-gray-900">347</div>
                  <div className="text-xs text-emerald-600">+15 this week</div>
                </div>
                <div className="p-2 rounded-lg bg-emerald-100">
                  <Users className="h-4 w-4 text-emerald-700" />
                </div>
              </div>
            </div>

            <div className={`bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 transition-all duration-500 ${currentStep === 4 ? 'ring-2 ring-blue-300 scale-105' : ''}`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="text-xs font-medium text-gray-600 mb-1">Fees Collected</div>
                  <div className="text-lg font-bold text-gray-900">₦2.1M</div>
                  <div className="text-xs text-emerald-600">This month</div>
                </div>
                <div className="p-2 rounded-lg bg-blue-100">
                  <DollarSign className="h-4 w-4 text-blue-700" />
                </div>
              </div>
            </div>

            <div className={`bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-4 transition-all duration-500 ${currentStep === 5 ? 'ring-2 ring-amber-300 scale-105' : ''}`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="text-xs font-medium text-gray-600 mb-1">Commissions</div>
                  <div className="text-lg font-bold text-gray-900">₦185K</div>
                  <div className="text-xs text-amber-600">Pending payout</div>
                </div>
                <div className="p-2 rounded-lg bg-amber-100">
                  <DollarSign className="h-4 w-4 text-amber-700" />
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
            {['Projects', 'Clients', 'Fees', 'Marketers', 'Tools'].map((tab, index) => (
              <div
                key={tab}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                  [1, 2, 4, 5, 6].includes(currentStep) && index === Math.floor(currentStep / 2) + 1
                    ? 'bg-white text-purple-600 shadow-sm ring-2 ring-purple-200'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {tab}
              </div>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="space-y-3">
            <div className={`bg-white border border-gray-200 rounded-xl p-4 transition-all duration-500 ${currentStep === 3 ? 'ring-2 ring-green-300 scale-105' : ''}`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="text-sm font-semibold text-gray-800">Unit Assignment</div>
                    <div className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">New</div>
                  </div>
                  <div className="text-xs text-gray-600">
                    Assigned Block A, Unit 15 to John Doe
                  </div>
                </div>
                <div className="text-xs text-gray-500">2 min ago</div>
              </div>
            </div>

            <div className={`bg-white border border-gray-200 rounded-xl p-4 transition-all duration-500 ${currentStep === 6 ? 'ring-2 ring-orange-300 scale-105' : ''}`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="text-sm font-semibold text-gray-800">Notice Sent</div>
                    <div className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">Active</div>
                  </div>
                  <div className="text-xs text-gray-600">
                    Payment reminder sent to 25 clients
                  </div>
                </div>
                <div className="text-xs text-gray-500">5 min ago</div>
              </div>
            </div>
          </div>

          {/* Animated Modals */}
          {showModal === 'new-project' && (
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-20 animate-fade-in">
              <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-md w-full mx-4 animate-scale-in">
                <h3 className="text-lg font-semibold mb-4">Create New Project</h3>
                <div className="space-y-3">
                  <input 
                    type="text" 
                    placeholder="Project Name" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    defaultValue="Marina Heights Estate"
                  />
                  <input 
                    type="text" 
                    placeholder="Location" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    defaultValue="Victoria Island, Lagos"
                  />
                </div>
              </div>
            </div>
          )}

          {showModal === 'assign-unit' && (
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-20 animate-fade-in">
              <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-md w-full mx-4 animate-scale-in">
                <h3 className="text-lg font-semibold mb-4">Assign Unit to Client</h3>
                <div className="space-y-3">
                  <div className="text-sm text-gray-600">Client: John Doe</div>
                  <div className="text-sm text-gray-600">Unit: Block A, Unit 15</div>
                  <div className="text-sm text-emerald-600 font-medium">✓ Assignment Successful</div>
                </div>
              </div>
            </div>
          )}

          {showModal === 'fees' && (
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-20 animate-fade-in">
              <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-md w-full mx-4 animate-scale-in">
                <h3 className="text-lg font-semibold mb-4">Record Payment</h3>
                <div className="space-y-3">
                  <div className="text-sm text-gray-600">Amount: ₦150,000</div>
                  <div className="text-sm text-gray-600">Client: Sarah Johnson</div>
                  <div className="text-sm text-emerald-600 font-medium">✓ Payment Recorded</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Caption */}
      <div className="text-center mt-6">
        <p className="text-sm text-gray-600 italic">
          See how ProptyOS helps you manage real estate in real-time.
        </p>
      </div>

      {/* Floating Badge */}
      <div className="absolute -top-4 -right-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
        Live Demo
      </div>

      {/* Floating elements */}
      <div className="absolute -top-8 -left-8 w-20 h-20 bg-gradient-to-br from-purple-200/60 to-purple-300/60 rounded-full opacity-60 animate-pulse"></div>
      <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-gradient-to-br from-blue-200/60 to-blue-300/60 rounded-full opacity-40 animate-bounce"></div>
    </div>
  );
};

export default AnimatedDashboardPreview;
