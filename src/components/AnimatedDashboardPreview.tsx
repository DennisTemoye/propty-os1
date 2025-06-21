
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Building, 
  Home, 
  DollarSign, 
  MapPin, 
  Plus, 
  Users, 
  FileText, 
  Bell,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';

interface AnimationStep {
  id: string;
  title: string;
  description: string;
  duration: number;
  x: number;
  y: number;
  action: 'click' | 'hover' | 'scroll';
}

const AnimatedDashboardPreview = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');

  const animationSteps: AnimationStep[] = [
    { id: 'overview', title: 'Dashboard Overview', description: 'Start with key metrics', duration: 2000, x: 200, y: 150, action: 'hover' },
    { id: 'new-project', title: 'Add New Project', description: 'Click to create project', duration: 1500, x: 520, y: 80, action: 'click' },
    { id: 'clients', title: 'Navigate to Clients', description: 'Manage client database', duration: 1500, x: 100, y: 200, action: 'click' },
    { id: 'add-client', title: 'Add New Client', description: 'Register new client', duration: 1500, x: 480, y: 120, action: 'click' },
    { id: 'assign-unit', title: 'Assign Unit', description: 'Allocate property', duration: 1500, x: 350, y: 180, action: 'click' },
    { id: 'fees', title: 'Fees Collection', description: 'Record payments', duration: 1500, x: 400, y: 220, action: 'click' },
    { id: 'marketers', title: 'View Marketers', description: 'Check commissions', duration: 1500, x: 150, y: 260, action: 'click' },
    { id: 'notices', title: 'Send Notice', description: 'Communicate with clients', duration: 1500, x: 300, y: 300, action: 'click' }
  ];

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setTimeout(() => {
      const step = animationSteps[currentStep];
      
      // Animate cursor movement
      setCursorPosition({ x: step.x, y: step.y });
      
      // Show modal for certain actions
      if (step.action === 'click' && ['new-project', 'add-client', 'fees'].includes(step.id)) {
        setTimeout(() => {
          setModalType(step.id);
          setShowModal(true);
        }, 800);
        
        setTimeout(() => {
          setShowModal(false);
          setModalType('');
        }, step.duration - 300);
      }
      
      // Move to next step
      setTimeout(() => {
        setCurrentStep((prev) => (prev + 1) % animationSteps.length);
      }, step.duration);
      
    }, currentStep === 0 ? 1000 : 100);

    return () => clearTimeout(timer);
  }, [currentStep, isPlaying]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setCursorPosition({ x: 0, y: 0 });
    setShowModal(false);
    setIsPlaying(true);
  };

  return (
    <div className="relative">
      {/* Dashboard Container */}
      <div className="transform hover:scale-105 transition-transform duration-700">
        <div className="bg-white border border-gray-200/60 rounded-3xl shadow-2xl p-6 backdrop-blur-sm relative overflow-hidden">
          {/* Animated Cursor */}
          <div 
            className="absolute w-4 h-4 pointer-events-none z-50 transition-all duration-1000 ease-out"
            style={{ 
              left: `${cursorPosition.x}px`, 
              top: `${cursorPosition.y}px`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div className="w-4 h-4 bg-purple-600 rounded-full shadow-lg animate-pulse"></div>
            <div className="absolute inset-0 w-4 h-4 bg-purple-600/30 rounded-full animate-ping"></div>
          </div>

          {/* Browser Header */}
          <div className="flex items-center space-x-2 mb-6">
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
            <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
            <div className="ml-4 text-sm text-gray-600 font-medium">ProptyOS - Dashboard</div>
          </div>

          {/* Dashboard Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">Dashboard Overview</h3>
              <p className="text-sm text-gray-500 mt-1">Manage your real estate business efficiently</p>
            </div>
            <div 
              className={`bg-purple-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center cursor-pointer transition-all ${
                currentStep === 1 ? 'ring-2 ring-purple-400 scale-105' : ''
              }`}
            >
              <Plus className="h-3 w-3 mr-1" />
              New Project
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className={`bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 transition-all ${
              currentStep === 0 ? 'ring-2 ring-purple-400 scale-105' : ''
            }`}>
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
            <div className={`bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 transition-all ${
              [2, 3, 4].includes(currentStep) ? 'ring-2 ring-blue-400 scale-105' : ''
            }`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="text-xs font-medium text-gray-600 mb-1">Active Clients</div>
                  <div className="text-lg font-bold text-gray-900">845</div>
                  <div className="text-xs text-gray-500">Registered users</div>
                </div>
                <div className="p-2 rounded-lg bg-blue-100">
                  <Users className="h-4 w-4 text-blue-700" />
                </div>
              </div>
            </div>
            <div className={`bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-4 transition-all ${
              currentStep === 5 ? 'ring-2 ring-amber-400 scale-105' : ''
            }`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="text-xs font-medium text-gray-600 mb-1">Collections</div>
                  <div className="text-lg font-bold text-gray-900">₦15.2B</div>
                  <div className="text-xs text-gray-500">Total collected</div>
                </div>
                <div className="p-2 rounded-lg bg-amber-100">
                  <DollarSign className="h-4 w-4 text-amber-700" />
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-4 mb-4 text-sm">
            <div className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              currentStep === 2 ? 'bg-blue-100 text-blue-800 ring-2 ring-blue-400' : 'text-gray-600 hover:bg-gray-100'
            }`}>
              Clients
            </div>
            <div className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              currentStep === 6 ? 'bg-green-100 text-green-800 ring-2 ring-green-400' : 'text-gray-600 hover:bg-gray-100'
            }`}>
              Marketers
            </div>
            <div className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              currentStep === 7 ? 'bg-purple-100 text-purple-800 ring-2 ring-purple-400' : 'text-gray-600 hover:bg-gray-100'
            }`}>
              <Bell className="h-3 w-3 inline mr-1" />
              Notices
            </div>
          </div>

          {/* Content Area */}
          <div className="space-y-3">
            <div className={`bg-white border border-gray-200 rounded-xl p-4 transition-all ${
              currentStep === 4 ? 'ring-2 ring-green-400 scale-105' : ''
            }`}>
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
          </div>

          {/* Modal Overlays */}
          {showModal && (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-40 rounded-3xl">
              <div className="bg-white rounded-xl p-6 shadow-xl max-w-sm mx-4 animate-scale-in">
                {modalType === 'new-project' && (
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Create New Project</h4>
                    <div className="space-y-3">
                      <input className="w-full p-2 border rounded-lg text-sm" placeholder="Project Name" />
                      <input className="w-full p-2 border rounded-lg text-sm" placeholder="Location" />
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-purple-600">Create</Button>
                        <Button size="sm" variant="outline">Cancel</Button>
                      </div>
                    </div>
                  </div>
                )}
                {modalType === 'add-client' && (
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Add New Client</h4>
                    <div className="space-y-3">
                      <input className="w-full p-2 border rounded-lg text-sm" placeholder="Client Name" />
                      <input className="w-full p-2 border rounded-lg text-sm" placeholder="Email" />
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-blue-600">Save</Button>
                        <Button size="sm" variant="outline">Cancel</Button>
                      </div>
                    </div>
                  </div>
                )}
                {modalType === 'fees' && (
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Record Payment</h4>
                    <div className="space-y-3">
                      <input className="w-full p-2 border rounded-lg text-sm" placeholder="Amount" />
                      <input className="w-full p-2 border rounded-lg text-sm" placeholder="Payment Method" />
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-green-600">Record</Button>
                        <Button size="sm" variant="outline">Cancel</Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Animation Controls */}
      <div className="absolute bottom-4 right-4 flex gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={handlePlayPause}
          className="bg-white/90 backdrop-blur-sm"
        >
          {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={handleRestart}
          className="bg-white/90 backdrop-blur-sm"
        >
          <RotateCcw className="h-3 w-3" />
        </Button>
      </div>

      {/* Animation Progress */}
      <div className="absolute bottom-16 left-4 right-4">
        <div className="bg-white/90 backdrop-blur-sm rounded-full p-3">
          <div className="text-xs font-medium text-gray-700 mb-1">
            {animationSteps[currentStep]?.title}
          </div>
          <div className="text-xs text-gray-500 mb-2">
            {animationSteps[currentStep]?.description}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1">
            <div 
              className="bg-purple-600 h-1 rounded-full transition-all duration-1000"
              style={{ width: `${((currentStep + 1) / animationSteps.length) * 100}%` }}
            ></div>
          </div>
        </div>
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
