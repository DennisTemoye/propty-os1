
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building, Home, DollarSign, Plus, MousePointer2, Check, MapPin } from 'lucide-react';

const AnimatedDashboardDemo = () => {
  const [step, setStep] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [cursorPosition, setCursorPosition] = useState({ x: 50, y: 50 });
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showProjectDetails, setShowProjectDetails] = useState(false);
  const [showAllocationModal, setShowAllocationModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [highlightKPIs, setHighlightKPIs] = useState(false);

  const animationSteps = [
    { x: 85, y: 15, action: 'moveToNewButton' },
    { x: 85, y: 15, action: 'clickNewButton' },
    { x: 80, y: 25, action: 'selectProject' },
    { x: 50, y: 50, action: 'showModal' },
    { x: 30, y: 60, action: 'clickProjectCard' },
    { x: 40, y: 70, action: 'hoverBlock' },
    { x: 60, y: 75, action: 'clickAllocate' },
    { x: 50, y: 80, action: 'selectClient' },
    { x: 70, y: 85, action: 'confirmAllocation' },
    { x: 80, y: 20, action: 'showToast' },
    { x: 20, y: 30, action: 'highlightKPIs' },
    { x: 50, y: 50, action: 'reset' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const currentStep = animationSteps[step];
      
      // Smooth cursor movement
      setCursorPosition({ x: currentStep.x, y: currentStep.y });
      
      // Execute step action after cursor movement
      setTimeout(() => {
        switch (currentStep.action) {
          case 'clickNewButton':
            setShowDropdown(true);
            break;
          case 'selectProject':
            setShowDropdown(false);
            setShowModal(true);
            break;
          case 'showModal':
            setTimeout(() => setShowModal(false), 1500);
            break;
          case 'clickProjectCard':
            setShowProjectDetails(true);
            break;
          case 'clickAllocate':
            setShowAllocationModal(true);
            break;
          case 'confirmAllocation':
            setShowAllocationModal(false);
            setShowToast(true);
            setTimeout(() => setShowToast(false), 2000);
            break;
          case 'highlightKPIs':
            setHighlightKPIs(true);
            setTimeout(() => setHighlightKPIs(false), 2000);
            break;
          case 'reset':
            setShowProjectDetails(false);
            break;
        }
      }, 500);
      
      setStep((prev) => (prev + 1) % animationSteps.length);
    }, 1200);

    return () => clearInterval(interval);
  }, [step]);

  return (
    <div className="relative w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-white">ProptyOS Dashboard</h3>
            <p className="text-purple-100 text-sm">Real Estate Management Platform</p>
          </div>
          <div className="relative">
            <Button 
              size="sm" 
              className="bg-white/20 hover:bg-white/30 text-white border-white/30"
            >
              <Plus className="h-4 w-4 mr-2" />
              New
            </Button>
            {showDropdown && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-50 animate-fade-in">
                <div className="py-2">
                  <div className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm font-medium text-purple-600">
                    New Project Site
                  </div>
                  <div className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm">New Client</div>
                  <div className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm">New Unit</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="p-6">
        <div className={`grid grid-cols-4 gap-4 mb-6 transition-all duration-500 ${highlightKPIs ? 'scale-105' : ''}`}>
          <Card className={`${highlightKPIs ? 'ring-2 ring-purple-400 shadow-lg' : ''} transition-all duration-300`}>
            <CardContent className="p-4 bg-gradient-to-br from-violet-500 to-purple-600 text-white rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs opacity-90">Total Projects</p>
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-xs opacity-75">8 active</p>
                </div>
                <Building className="h-8 w-8 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className={`${highlightKPIs ? 'ring-2 ring-emerald-400 shadow-lg' : ''} transition-all duration-300`}>
            <CardContent className="p-4 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs opacity-90">Total Units</p>
                  <p className="text-2xl font-bold">1,247</p>
                  <p className="text-xs opacity-75">Across all projects</p>
                </div>
                <Home className="h-8 w-8 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className={`${highlightKPIs ? 'ring-2 ring-blue-400 shadow-lg' : ''} transition-all duration-300`}>
            <CardContent className="p-4 bg-gradient-to-br from-blue-500 to-cyan-600 text-white rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs opacity-90">Units Sold</p>
                  <p className="text-2xl font-bold">845</p>
                  <p className="text-xs opacity-75">67.8% rate</p>
                </div>
                <DollarSign className="h-8 w-8 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className={`${highlightKPIs ? 'ring-2 ring-amber-400 shadow-lg' : ''} transition-all duration-300`}>
            <CardContent className="p-4 bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs opacity-90">Revenue</p>
                  <p className="text-2xl font-bold">₦15.2B</p>
                  <p className="text-xs opacity-75">All time earnings</p>
                </div>
                <DollarSign className="h-8 w-8 opacity-80" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <div className="relative h-32">
              <img 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400" 
                alt="Victoria Gardens"
                className="w-full h-full object-cover rounded-t-lg"
              />
              <div className="absolute top-2 left-2 flex space-x-1">
                <Badge className="bg-blue-100 text-blue-700">Housing</Badge>
                <Badge className="bg-green-100 text-green-700">Active</Badge>
              </div>
            </div>
            
            <CardContent className="p-4">
              <h3 className="font-bold mb-2">Victoria Gardens Estate</h3>
              <div className="flex items-center text-gray-600 mb-3 text-sm">
                <MapPin className="h-3 w-3 mr-1" />
                Lekki, Lagos
              </div>

              <div className="grid grid-cols-2 gap-2 mb-3 p-2 bg-gray-50 rounded">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Building className="h-3 w-3 mr-1 text-gray-600" />
                    <span className="font-bold">8</span>
                  </div>
                  <div className="text-xs text-gray-500">Blocks</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Home className="h-3 w-3 mr-1 text-gray-600" />
                    <span className="font-bold">150</span>
                  </div>
                  <div className="text-xs text-gray-500">Units</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Sales Progress</span>
                  <span className="font-medium">59%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '59%' }} />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-3 text-center text-sm">
                <div>
                  <div className="font-bold text-emerald-600">89</div>
                  <div className="text-gray-500 text-xs">Sold</div>
                </div>
                <div>
                  <div className="font-bold text-amber-600">23</div>
                  <div className="text-gray-500 text-xs">Reserved</div>
                </div>
                <div>
                  <div className="font-bold text-blue-600">38</div>
                  <div className="text-gray-500 text-xs">Available</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <div className="relative h-32">
              <img 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400" 
                alt="Emerald Heights"
                className="w-full h-full object-cover rounded-t-lg"
              />
              <div className="absolute top-2 left-2 flex space-x-1">
                <Badge className="bg-purple-100 text-purple-700">Mixed</Badge>
                <Badge className="bg-green-100 text-green-700">Active</Badge>
              </div>
            </div>
            
            <CardContent className="p-4">
              <h3 className="font-bold mb-2">Emerald Heights</h3>
              <div className="flex items-center text-gray-600 mb-3 text-sm">
                <MapPin className="h-3 w-3 mr-1" />
                Abuja, FCT
              </div>

              <div className="grid grid-cols-2 gap-2 mb-3 p-2 bg-gray-50 rounded">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Building className="h-3 w-3 mr-1 text-gray-600" />
                    <span className="font-bold">12</span>
                  </div>
                  <div className="text-xs text-gray-500">Blocks</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Home className="h-3 w-3 mr-1 text-gray-600" />
                    <span className="font-bold">200</span>
                  </div>
                  <div className="text-xs text-gray-500">Units</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Sales Progress</span>
                  <span className="font-medium">78%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '78%' }} />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-3 text-center text-sm">
                <div>
                  <div className="font-bold text-emerald-600">156</div>
                  <div className="text-gray-500 text-xs">Sold</div>
                </div>
                <div>
                  <div className="font-bold text-amber-600">24</div>
                  <div className="text-gray-500 text-xs">Reserved</div>
                </div>
                <div>
                  <div className="font-bold text-blue-600">20</div>
                  <div className="text-gray-500 text-xs">Available</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modal Overlays */}
      {showModal && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-40 animate-fade-in">
          <div className="bg-white rounded-lg p-6 w-96 animate-scale-in">
            <h3 className="text-lg font-bold mb-4">Create New Project Site</h3>
            <div className="space-y-4">
              <input className="w-full p-2 border rounded" placeholder="Project Name" />
              <input className="w-full p-2 border rounded" placeholder="Location" />
              <div className="flex gap-2">
                <Button className="flex-1">Create Project</Button>
                <Button variant="outline">Cancel</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showAllocationModal && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-40 animate-fade-in">
          <div className="bg-white rounded-lg p-6 w-80 animate-scale-in">
            <h3 className="text-lg font-bold mb-4">Allocate Unit</h3>
            <div className="space-y-4">
              <select className="w-full p-2 border rounded">
                <option>Select Client</option>
                <option>John Doe</option>
                <option>Jane Smith</option>
              </select>
              <div className="flex gap-2">
                <Button className="flex-1">Allocate</Button>
                <Button variant="outline">Cancel</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Toast */}
      {showToast && (
        <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in z-50">
          <div className="flex items-center">
            <Check className="h-4 w-4 mr-2" />
            Unit allocated successfully!
          </div>
        </div>
      )}

      {/* Animated Cursor */}
      {showCursor && (
        <div 
          className="absolute pointer-events-none z-50 transition-all duration-700 ease-out"
          style={{ 
            left: `${cursorPosition.x}%`, 
            top: `${cursorPosition.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <MousePointer2 className="h-6 w-6 text-purple-600 drop-shadow-lg" />
        </div>
      )}
    </div>
  );
};

export default AnimatedDashboardDemo;
