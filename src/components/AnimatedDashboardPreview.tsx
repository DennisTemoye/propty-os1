
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Play, Pause, RotateCcw, Building, Users, DollarSign, FileText, Plus, X, MapPin, Home } from 'lucide-react';

interface AnimationStep {
  id: string;
  duration: number;
  action: string;
  cursorX: number;
  cursorY: number;
  showModal?: boolean;
  modalType?: string;
}

const AnimatedDashboardPreview = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [cursorPosition, setCursorPosition] = useState({ x: 50, y: 50 });
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');

  const animationSteps: AnimationStep[] = [
    { id: 'overview', duration: 2000, action: 'Viewing Dashboard Overview', cursorX: 50, cursorY: 30 },
    { id: 'new-project', duration: 1500, action: 'Clicking +New Project', cursorX: 85, cursorY: 15, showModal: true, modalType: 'project' },
    { id: 'close-modal', duration: 800, action: 'Adding Project', cursorX: 75, cursorY: 25 },
    { id: 'clients', duration: 1500, action: 'Navigating to Clients', cursorX: 20, cursorY: 40 },
    { id: 'new-client', duration: 1500, action: 'Adding New Client', cursorX: 85, cursorY: 40, showModal: true, modalType: 'client' },
    { id: 'close-client', duration: 800, action: 'Saving Client', cursorX: 70, cursorY: 60 },
    { id: 'allocation', duration: 1500, action: 'Assigning Unit to Client', cursorX: 60, cursorY: 70 },
    { id: 'fees', duration: 1500, action: 'Viewing Fees Collection', cursorX: 20, cursorY: 55 },
    { id: 'payment', duration: 1500, action: 'Recording Payment', cursorX: 80, cursorY: 55, showModal: true, modalType: 'payment' },
    { id: 'close-payment', duration: 800, action: 'Processing Payment', cursorX: 65, cursorY: 65 },
    { id: 'marketers', duration: 1500, action: 'Viewing Marketers', cursorX: 20, cursorY: 70 },
    { id: 'notice', duration: 1500, action: 'Sending Notice', cursorX: 75, cursorY: 80, showModal: true, modalType: 'notice' },
    { id: 'finish', duration: 2000, action: 'Complete Workflow', cursorX: 50, cursorY: 50 }
  ];

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setTimeout(() => {
      const step = animationSteps[currentStep];
      
      // Animate cursor movement
      setCursorPosition({ x: step.cursorX, y: step.cursorY });
      
      // Handle modal display
      if (step.showModal && step.modalType) {
        setTimeout(() => {
          setShowModal(true);
          setModalType(step.modalType!);
        }, 500);
      } else {
        setShowModal(false);
        setModalType('');
      }

      // Move to next step
      setTimeout(() => {
        setCurrentStep((prev) => (prev + 1) % animationSteps.length);
      }, step.duration);

    }, 100);

    return () => clearTimeout(timer);
  }, [currentStep, isPlaying]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setIsPlaying(true);
    setShowModal(false);
    setCursorPosition({ x: 50, y: 50 });
  };

  const renderModal = () => {
    if (!showModal) return null;

    const modalContent = {
      project: {
        title: 'Add New Project',
        content: (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
              <input className="w-full p-2 border border-gray-300 rounded-md" placeholder="Victoria Gardens Estate" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input className="w-full p-2 border border-gray-300 rounded-md" placeholder="Lekki, Lagos" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Project Type</label>
              <select className="w-full p-2 border border-gray-300 rounded-md">
                <option>Housing Estate</option>
                <option>Commercial</option>
                <option>Mixed Development</option>
              </select>
            </div>
          </div>
        )
      },
      client: {
        title: 'Add New Client',
        content: (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input className="w-full p-2 border border-gray-300 rounded-md" placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input className="w-full p-2 border border-gray-300 rounded-md" placeholder="john.doe@email.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input className="w-full p-2 border border-gray-300 rounded-md" placeholder="+234 801 234 5678" />
            </div>
          </div>
        )
      },
      payment: {
        title: 'Record Payment',
        content: (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Client</label>
              <select className="w-full p-2 border border-gray-300 rounded-md">
                <option>John Doe - Unit A12</option>
                <option>Sarah Wilson - Unit B05</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
              <input className="w-full p-2 border border-gray-300 rounded-md" placeholder="₦2,500,000" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
              <select className="w-full p-2 border border-gray-300 rounded-md">
                <option>Bank Transfer</option>
                <option>Cash</option>
                <option>Cheque</option>
              </select>
            </div>
          </div>
        )
      },
      notice: {
        title: 'Send Notice',
        content: (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Recipients</label>
              <select className="w-full p-2 border border-gray-300 rounded-md">
                <option>All Clients</option>
                <option>Victoria Gardens Clients</option>
                <option>Overdue Payments</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <input className="w-full p-2 border border-gray-300 rounded-md" placeholder="Payment Reminder" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea className="w-full p-2 border border-gray-300 rounded-md h-20" placeholder="Dear valued client..."></textarea>
            </div>
          </div>
        )
      }
    };

    const modal = modalContent[modalType as keyof typeof modalContent];

    return (
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
        <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 transform animate-scale-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">{modal.title}</h3>
            <button className="text-gray-400 hover:text-gray-600">
              <X className="h-5 w-5" />
            </button>
          </div>
          {modal.content}
          <div className="flex justify-end space-x-3 mt-6">
            <Button variant="outline" size="sm">Cancel</Button>
            <Button size="sm" className="bg-purple-600 hover:bg-purple-700">Save</Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative">
      {/* Main Dashboard Preview */}
      <div className="transform hover:scale-105 transition-transform duration-700">
        <div className="bg-white border border-gray-200/60 rounded-3xl shadow-2xl backdrop-blur-sm overflow-hidden relative">
          {/* Animated Cursor */}
          <div 
            className="absolute w-4 h-4 pointer-events-none z-20 transition-all duration-1000 ease-in-out"
            style={{ 
              left: `${cursorPosition.x}%`, 
              top: `${cursorPosition.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div className="w-0 h-0 border-l-[8px] border-l-gray-900 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent rotate-[15deg]"></div>
          </div>

          {/* Browser Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
              <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
              <div className="ml-4 text-sm text-gray-600 font-medium">ProptyOS - Company Dashboard</div>
            </div>
            <div className="text-xs text-gray-500">
              {animationSteps[currentStep]?.action}
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
                <p className="text-gray-600">Welcome back, manage your properties efficiently</p>
              </div>
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                New
              </Button>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Projects</p>
                    <p className="text-2xl font-bold text-gray-900">24</p>
                    <p className="text-xs text-emerald-600">+12% this month</p>
                  </div>
                  <Building className="h-8 w-8 text-purple-600" />
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Active Clients</p>
                    <p className="text-2xl font-bold text-gray-900">1,247</p>
                    <p className="text-xs text-emerald-600">+8% this month</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">₦15.2B</p>
                    <p className="text-xs text-emerald-600">+15% this month</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-emerald-600" />
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Units Sold</p>
                    <p className="text-2xl font-bold text-gray-900">845</p>
                    <p className="text-xs text-emerald-600">+22% this month</p>
                  </div>
                  <Home className="h-8 w-8 text-amber-600" />
                </div>
              </Card>
            </div>

            {/* Navigation Sidebar Preview */}
            <div className="grid grid-cols-4 gap-6">
              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-900 mb-3">Quick Actions</div>
                <div className="space-y-1">
                  <div className="p-2 text-sm text-gray-700 hover:bg-purple-50 rounded cursor-pointer">📊 Dashboard</div>
                  <div className="p-2 text-sm text-gray-700 hover:bg-purple-50 rounded cursor-pointer">👥 Clients</div>
                  <div className="p-2 text-sm text-gray-700 hover:bg-purple-50 rounded cursor-pointer">🏢 Projects</div>
                  <div className="p-2 text-sm text-gray-700 hover:bg-purple-50 rounded cursor-pointer">💰 Fees Collection</div>
                  <div className="p-2 text-sm text-gray-700 hover:bg-purple-50 rounded cursor-pointer">📈 Marketers</div>
                  <div className="p-2 text-sm text-gray-700 hover:bg-purple-50 rounded cursor-pointer">📢 Send Notice</div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="col-span-3">
                <div className="text-sm font-medium text-gray-900 mb-3">Recent Activity</div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">New client John Doe registered</span>
                    </div>
                    <span className="text-xs text-gray-500">2 mins ago</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">Payment received from Sarah Wilson</span>
                    </div>
                    <span className="text-xs text-gray-500">15 mins ago</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">Unit A12 assigned to Mike Johnson</span>
                    </div>
                    <span className="text-xs text-gray-500">1 hour ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Overlay */}
          {renderModal()}
        </div>
      </div>

      {/* Playback Controls */}
      <div className="flex items-center justify-center space-x-4 mt-4">
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
      <p className="text-center text-gray-600 mt-4 text-sm">
        See how ProptyOS helps you manage real estate in real-time.
      </p>

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
