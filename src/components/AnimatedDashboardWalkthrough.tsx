
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Building, 
  Users, 
  DollarSign, 
  MapPin, 
  Plus,
  Home,
  ChevronRight,
  X
} from 'lucide-react';

interface AnimationStep {
  id: string;
  duration: number;
  description: string;
  cursorX: number;
  cursorY: number;
  action?: 'click' | 'hover' | 'navigate';
  targetElement?: string;
}

const animationSteps: AnimationStep[] = [
  { id: 'dashboard-overview', duration: 2000, description: 'Viewing Dashboard Overview', cursorX: 50, cursorY: 30 },
  { id: 'hover-projects', duration: 1500, description: 'Hovering over Projects menu', cursorX: 15, cursorY: 25, action: 'hover' },
  { id: 'click-projects', duration: 1000, description: 'Navigating to Projects', cursorX: 15, cursorY: 25, action: 'click' },
  { id: 'view-projects', duration: 2500, description: 'Viewing Projects Overview', cursorX: 50, cursorY: 40 },
  { id: 'hover-new-project', duration: 1000, description: 'Hovering over New Project button', cursorX: 85, cursorY: 15, action: 'hover' },
  { id: 'click-new-project', duration: 1000, description: 'Opening New Project form', cursorX: 85, cursorY: 15, action: 'click' },
  { id: 'fill-project-form', duration: 3000, description: 'Creating new project', cursorX: 50, cursorY: 50 },
  { id: 'assign-unit', duration: 2500, description: 'Assigning unit to client', cursorX: 70, cursorY: 60 },
  { id: 'record-payment', duration: 2000, description: 'Recording payment', cursorX: 60, cursorY: 70 }
];

export function AnimatedDashboardWalkthrough() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [activeView, setActiveView] = useState('dashboard');
  const [cursorPosition, setCursorPosition] = useState({ x: 50, y: 30 });

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      const step = animationSteps[currentStep];
      
      // Animate cursor movement
      setCursorPosition({ x: step.cursorX, y: step.cursorY });
      
      // Handle step actions
      setTimeout(() => {
        switch (step.id) {
          case 'hover-projects':
            setShowSidebar(true);
            break;
          case 'click-projects':
            setActiveView('projects');
            setShowSidebar(false);
            break;
          case 'click-new-project':
            setShowProjectModal(true);
            break;
          case 'fill-project-form':
            // Simulate form completion
            break;
          case 'assign-unit':
            setShowProjectModal(false);
            break;
        }
      }, step.duration * 0.3);

      setCurrentStep((prev) => {
        const next = (prev + 1) % animationSteps.length;
        if (next === 0) {
          // Reset to dashboard view at the end of cycle
          setTimeout(() => {
            setActiveView('dashboard');
            setShowProjectModal(false);
            setShowSidebar(false);
          }, 2000);
        }
        return next;
      });
    }, animationSteps[currentStep]?.duration || 2000);

    return () => clearInterval(interval);
  }, [isPlaying, currentStep]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setActiveView('dashboard');
    setShowProjectModal(false);
    setShowSidebar(false);
    setCursorPosition({ x: 50, y: 30 });
    setIsPlaying(true);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Animated Cursor */}
      <div 
        className="absolute w-6 h-6 pointer-events-none z-50 transition-all duration-1000 ease-out"
        style={{ 
          left: `${cursorPosition.x}%`, 
          top: `${cursorPosition.y}%`,
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div className="w-6 h-6 bg-purple-600 rounded-full shadow-lg animate-pulse opacity-80">
          <div className="absolute inset-0 bg-purple-400 rounded-full animate-ping"></div>
        </div>
      </div>

      {/* Dashboard Container */}
      <Card className="bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden">
        {/* Browser Header */}
        <div className="flex items-center px-4 py-3 bg-gray-100 border-b">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
          </div>
          <div className="ml-4 text-sm text-gray-600 font-medium">ProptyOS - Real Estate Management</div>
        </div>

        <div className="flex h-96 relative">
          {/* Sidebar */}
          <div className={`w-60 bg-gradient-to-b from-slate-900 to-blue-900 text-white transition-all duration-300 ${showSidebar ? 'translate-x-0' : '-translate-x-48'}`}>
            <div className="p-4">
              <div className="flex items-center mb-6">
                <Building className="h-6 w-6 mr-2 text-blue-300" />
                <h2 className="text-lg font-semibold">ProptyOS</h2>
              </div>
              <nav className="space-y-2">
                <div className={`flex items-center px-3 py-2 rounded-lg cursor-pointer transition-colors ${activeView === 'dashboard' ? 'bg-blue-700' : 'hover:bg-blue-800'}`}>
                  <Home className="h-4 w-4 mr-3" />
                  Dashboard
                </div>
                <div className={`flex items-center px-3 py-2 rounded-lg cursor-pointer transition-colors ${activeView === 'projects' ? 'bg-blue-700' : 'hover:bg-blue-800'}`}>
                  <Building className="h-4 w-4 mr-3" />
                  Projects
                </div>
                <div className="flex items-center px-3 py-2 rounded-lg cursor-pointer hover:bg-blue-800 transition-colors">
                  <Users className="h-4 w-4 mr-3" />
                  Clients
                </div>
                <div className="flex items-center px-3 py-2 rounded-lg cursor-pointer hover:bg-blue-800 transition-colors">
                  <DollarSign className="h-4 w-4 mr-3" />
                  Accounting
                </div>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-gray-50 relative">
            {/* Header */}
            <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {activeView === 'dashboard' ? 'Dashboard' : 'Projects'}
                </h1>
                <p className="text-gray-600 text-sm">
                  {activeView === 'dashboard' 
                    ? 'Real Estate Management Overview' 
                    : 'Manage your real estate projects and units'
                  }
                </p>
              </div>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                New {activeView === 'dashboard' ? '' : 'Project'}
              </Button>
            </div>

            {/* Content Area */}
            <div className="p-6">
              {activeView === 'dashboard' ? (
                <div className="grid grid-cols-2 gap-4">
                  <Card className="bg-gradient-to-br from-purple-500 to-blue-600 text-white">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm opacity-90">Total Projects</p>
                          <p className="text-2xl font-bold">24</p>
                        </div>
                        <Building className="h-8 w-8 opacity-80" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm opacity-90">Active Clients</p>
                          <p className="text-2xl font-bold">1,247</p>
                        </div>
                        <Users className="h-8 w-8 opacity-80" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="space-y-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">Victoria Gardens Estate</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className="bg-blue-100 text-blue-800">Housing</Badge>
                            <Badge className="bg-green-100 text-green-800">Active</Badge>
                          </div>
                          <div className="flex items-center text-sm text-gray-600 mt-2">
                            <MapPin className="h-4 w-4 mr-1" />
                            Lekki, Lagos
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-purple-600">₦2.5B</p>
                          <p className="text-sm text-gray-500">Revenue</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">Lagos Estate</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className="bg-purple-100 text-purple-800">Mixed</Badge>
                            <Badge className="bg-green-100 text-green-800">Active</Badge>
                          </div>
                          <div className="flex items-center text-sm text-gray-600 mt-2">
                            <MapPin className="h-4 w-4 mr-1" />
                            Victoria Island, Lagos
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-purple-600">₦890M</p>
                          <p className="text-sm text-gray-500">Revenue</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Project Modal */}
        {showProjectModal && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
            <Card className="w-96 max-w-full mx-4">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Create New Project</h3>
                  <Button variant="ghost" size="icon">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Project Name</label>
                    <div className="w-full h-8 bg-gray-100 rounded border animate-pulse"></div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Location</label>
                    <div className="w-full h-8 bg-gray-100 rounded border animate-pulse"></div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Project Type</label>
                    <div className="w-full h-8 bg-gray-100 rounded border animate-pulse"></div>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button className="flex-1 bg-purple-600 hover:bg-purple-700">Create Project</Button>
                    <Button variant="outline" className="flex-1">Cancel</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </Card>

      {/* Controls */}
      <div className="flex items-center justify-center mt-6 space-x-4">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePlayPause}
          className="flex items-center space-x-2"
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          <span>{isPlaying ? 'Pause' : 'Play'}</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRestart}
          className="flex items-center space-x-2"
        >
          <RotateCcw className="h-4 w-4" />
          <span>Restart</span>
        </Button>
      </div>

      {/* Caption */}
      <div className="text-center mt-4">
        <p className="text-gray-600 text-sm">
          See how ProptyOS helps you manage real estate in real-time.
        </p>
        <div className="mt-2 text-xs text-gray-500">
          Current: {animationSteps[currentStep]?.description}
        </div>
      </div>

      {/* Fallback Message (hidden by default) */}
      <div className="hidden absolute inset-0 bg-gray-100 rounded-2xl flex items-center justify-center">
        <div className="text-center">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white">
            <Play className="h-4 w-4 mr-2" />
            Play Product Tour
          </Button>
          <p className="text-sm text-gray-600 mt-2">Interactive demo unavailable</p>
        </div>
      </div>
    </div>
  );
}
