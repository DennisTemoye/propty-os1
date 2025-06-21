
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Plus, 
  Building, 
  Home, 
  DollarSign, 
  MapPin, 
  Play, 
  Pause, 
  RotateCcw,
  User,
  FileText,
  Calendar,
  Target
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const AnimatedDashboardWalkthrough = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [showAssignUnitModal, setShowAssignUnitModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const steps = [
    { name: 'overview', duration: 2000, description: 'Viewing Projects Overview' },
    { name: 'new-project-hover', duration: 1000, description: 'Hovering New Project Button' },
    { name: 'new-project-click', duration: 2000, description: 'Opening New Project Form' },
    { name: 'project-details', duration: 2000, description: 'Viewing Project Details' },
    { name: 'assign-unit', duration: 2000, description: 'Assigning Unit to Client' },
    { name: 'record-payment', duration: 2000, description: 'Recording Payment' },
    { name: 'reset', duration: 3000, description: 'Completing Workflow' }
  ];

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setTimeout(() => {
      const nextStep = (currentStep + 1) % steps.length;
      setCurrentStep(nextStep);

      // Handle step transitions
      switch (steps[nextStep].name) {
        case 'new-project-click':
          setShowNewProjectModal(true);
          setCursorPosition({ x: 50, y: 20 });
          break;
        case 'project-details':
          setShowNewProjectModal(false);
          setCursorPosition({ x: 30, y: 40 });
          break;
        case 'assign-unit':
          setShowAssignUnitModal(true);
          setCursorPosition({ x: 70, y: 60 });
          break;
        case 'record-payment':
          setShowAssignUnitModal(false);
          setShowPaymentModal(true);
          setCursorPosition({ x: 80, y: 70 });
          break;
        case 'reset':
          setShowPaymentModal(false);
          setCursorPosition({ x: 0, y: 0 });
          break;
        case 'new-project-hover':
          setCursorPosition({ x: 85, y: 15 });
          break;
        default:
          setCursorPosition({ x: 20, y: 30 });
      }
    }, steps[currentStep].duration);

    return () => clearTimeout(timer);
  }, [currentStep, isPlaying]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setShowNewProjectModal(false);
    setShowAssignUnitModal(false);
    setShowPaymentModal(false);
    setCursorPosition({ x: 0, y: 0 });
    setIsPlaying(true);
  };

  return (
    <div className="relative">
      {/* Animated Cursor */}
      <div 
        className="absolute w-4 h-4 pointer-events-none z-50 transition-all duration-1000 ease-in-out"
        style={{ 
          left: `${cursorPosition.x}%`, 
          top: `${cursorPosition.y}%`,
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[12px] border-b-gray-800 rotate-[-15deg]"></div>
      </div>

      {/* Main Dashboard Interface */}
      <div className="bg-white border border-gray-200/60 rounded-3xl shadow-2xl backdrop-blur-sm overflow-hidden">
        {/* Browser Header */}
        <div className="flex items-center space-x-2 p-4 bg-gray-50 border-b">
          <div className="w-3 h-3 bg-red-400 rounded-full"></div>
          <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
          <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
          <div className="ml-4 text-sm text-gray-600 font-medium">ProptyOS - Projects Dashboard</div>
        </div>

        {/* Dashboard Content */}
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
              <p className="text-gray-600 mt-1">Manage your real estate projects, blocks, and units</p>
            </div>
            <Button 
              className={`bg-purple-600 hover:bg-purple-700 text-white transition-all duration-300 ${
                currentStep === 1 ? 'ring-4 ring-purple-200 scale-105' : ''
              }`}
            >
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </div>

          {/* Project KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className={`transition-all duration-500 ${currentStep === 0 ? 'ring-2 ring-blue-200' : ''}`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-600 mb-1">Total Projects</div>
                    <div className="text-2xl font-bold text-gray-900">12</div>
                    <div className="text-xs text-green-600 mt-1">+2 this month</div>
                  </div>
                  <div className="p-2 rounded-lg bg-purple-100">
                    <Building className="h-5 w-5 text-purple-700" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className={`transition-all duration-500 ${currentStep === 0 ? 'ring-2 ring-blue-200' : ''}`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-600 mb-1">Total Units</div>
                    <div className="text-2xl font-bold text-gray-900">1,247</div>
                    <div className="text-xs text-gray-500 mt-1">Across all projects</div>
                  </div>
                  <div className="p-2 rounded-lg bg-emerald-100">
                    <Home className="h-5 w-5 text-emerald-700" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className={`transition-all duration-500 ${currentStep === 0 ? 'ring-2 ring-blue-200' : ''}`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-600 mb-1">Units Sold</div>
                    <div className="text-2xl font-bold text-gray-900">845</div>
                    <div className="text-xs text-green-600 mt-1">68% sold</div>
                  </div>
                  <div className="p-2 rounded-lg bg-blue-100">
                    <Target className="h-5 w-5 text-blue-700" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className={`transition-all duration-500 ${currentStep === 0 ? 'ring-2 ring-blue-200' : ''}`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-600 mb-1">Total Revenue</div>
                    <div className="text-2xl font-bold text-gray-900">₦15.2B</div>
                    <div className="text-xs text-green-600 mt-1">+12% this quarter</div>
                  </div>
                  <div className="p-2 rounded-lg bg-amber-100">
                    <DollarSign className="h-5 w-5 text-amber-700" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Projects List */}
          <div className="space-y-4">
            <Card className={`transition-all duration-500 ${currentStep === 3 ? 'ring-2 ring-purple-200 scale-[1.02]' : ''}`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-lg font-semibold text-gray-800">Victoria Gardens Estate</div>
                      <Badge className="bg-blue-100 text-blue-800">Housing</Badge>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <MapPin className="h-4 w-4 mr-2" />
                      Lekki, Lagos State
                    </div>
                    <div className="flex gap-6 text-sm text-gray-600">
                      <span>5 blocks • 150 units</span>
                      <span className="text-green-600 font-medium">89 sold</span>
                      <span className="text-blue-600 font-medium">₦2.5B revenue</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '59%' }}></div>
                    </div>
                    <div className="text-sm text-gray-500">59% complete</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-lg font-semibold text-gray-800">Emerald Heights</div>
                      <Badge className="bg-purple-100 text-purple-800">Mixed Use</Badge>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <MapPin className="h-4 w-4 mr-2" />
                      Abuja, FCT
                    </div>
                    <div className="flex gap-6 text-sm text-gray-600">
                      <span>8 blocks • 200 units</span>
                      <span className="text-green-600 font-medium">156 sold</span>
                      <span className="text-blue-600 font-medium">₦4.2B revenue</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                    <div className="text-sm text-gray-500">78% complete</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* New Project Modal */}
      <Dialog open={showNewProjectModal} onOpenChange={() => {}}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Project Name</label>
              <Input placeholder="Enter project name..." defaultValue="Golden View Towers" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Location</label>
              <Input placeholder="Enter location..." defaultValue="Victoria Island, Lagos" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Project Type</label>
              <Select defaultValue="housing">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="housing">Residential Housing</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="mixed">Mixed Use</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full bg-purple-600 hover:bg-purple-700">
              Create Project
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Assign Unit Modal */}
      <Dialog open={showAssignUnitModal} onOpenChange={() => {}}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Assign Unit to Client</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Select Client</label>
              <Select defaultValue="john-doe">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="john-doe">John Doe</SelectItem>
                  <SelectItem value="jane-smith">Jane Smith</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Unit</label>
              <Select defaultValue="block-a-02">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="block-a-02">Block A - Unit 02</SelectItem>
                  <SelectItem value="block-a-03">Block A - Unit 03</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full bg-green-600 hover:bg-green-700">
              Assign Unit
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Payment Modal */}
      <Dialog open={showPaymentModal} onOpenChange={() => {}}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Record Payment</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Client</label>
              <div className="p-3 bg-gray-50 rounded-lg text-sm">John Doe - Block A Unit 02</div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Payment Amount</label>
              <Input placeholder="Enter amount..." defaultValue="₦5,000,000" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Payment Method</label>
              <Select defaultValue="bank-transfer">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="check">Check</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              Record Payment
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Playback Controls */}
      <div className="flex items-center justify-center space-x-3 mt-6">
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
        <p className="text-sm text-gray-600">
          See how ProptyOS helps you manage real estate in real-time.
        </p>
        <p className="text-xs text-gray-500 mt-1">
          {steps[currentStep].description}
        </p>
      </div>
    </div>
  );
};

export default AnimatedDashboardWalkthrough;
