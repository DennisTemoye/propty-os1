import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Building, Users, DollarSign, FileText, UserCheck, Calculator, TrendingUp, Plus, MapPin, Calendar, CheckCircle, X, Bell, CreditCard, Send } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Area, AreaChart } from 'recharts';
import { GradientKpiCard } from '@/components/ui/gradient-kpi-card';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { ThemeToggle } from '@/components/ThemeToggle';
import { AddPaymentModal } from '@/components/dashboard/clients/AddPaymentModal';
import { NewAllocationForm } from '@/components/dashboard/forms/NewAllocationForm';
import { NewExpenseForm } from '@/components/dashboard/forms/NewExpenseForm';
import { SendNoticeForm } from '@/components/dashboard/notices/SendNoticeForm';
import { NewClientForm } from '@/components/dashboard/forms/NewClientForm';
import { useResponsive } from '@/hooks/use-responsive';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const salesData = [
  { month: 'Jan', sales: 65, revenue: 2.4, allocations: 58 },
  { month: 'Feb', sales: 59, revenue: 2.1, allocations: 62 },
  { month: 'Mar', sales: 80, revenue: 2.8, allocations: 75 },
  { month: 'Apr', sales: 81, revenue: 3.2, allocations: 79 },
  { month: 'May', sales: 56, revenue: 2.0, allocations: 54 },
  { month: 'Jun', sales: 72, revenue: 2.6, allocations: 68 },
];

const projectStatusData = [
  { name: 'Active Projects', value: 45, color: '#10b981' },
  { name: 'In Planning', value: 25, color: '#3b82f6' },
  { name: 'Pre-Launch', value: 20, color: '#f59e0b' },
  { name: 'Completed', value: 10, color: '#8b5cf6' },
];

const financialData = [
  { month: 'Jan', income: 450, expenses: 180, profit: 270 },
  { month: 'Feb', income: 520, expenses: 195, profit: 325 },
  { month: 'Mar', income: 480, expenses: 170, profit: 310 },
  { month: 'Apr', income: 680, expenses: 220, profit: 460 },
  { month: 'May', income: 590, expenses: 200, profit: 390 },
  { month: 'Jun', income: 720, expenses: 240, profit: 480 },
];

export function DashboardOverview() {
  const navigate = useNavigate();
  const { isMobile, isTablet, isSmallScreen, isLargeDesktop } = useResponsive();
  const [showNotification, setShowNotification] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  // KPI data with navigation handlers
  const kpiData = [
    {
      title: 'Total Projects',
      value: '24',
      subtitle: '3 New This Quarter',
      icon: Building,
      gradientFrom: 'from-blue-500',
      gradientTo: 'to-cyan-400',
      iconBgColor: 'bg-white/20',
      iconColor: 'text-white',
      onClick: () => navigate('/company/projects'),
    },
    {
      title: 'Active Clients',
      value: '1,247',
      subtitle: '89 New This Month',
      icon: Users,
      gradientFrom: 'from-emerald-500',
      gradientTo: 'to-teal-400',
      iconBgColor: 'bg-white/20',
      iconColor: 'text-white',
      onClick: () => navigate('/company/clients'),
    },
    {
      title: 'Total Sales Revenue',
      value: '₦2.4B',
      subtitle: '156 Plots Sold',
      icon: DollarSign,
      gradientFrom: 'from-purple-500',
      gradientTo: 'to-pink-400',
      iconBgColor: 'bg-white/20',
      iconColor: 'text-white',
      onClick: () => navigate('/company/accounting'),
    },
    {
      title: 'Pending Allocations',
      value: '23',
      subtitle: 'Awaiting Processing',
      icon: FileText,
      gradientFrom: 'from-orange-500',
      gradientTo: 'to-amber-400',
      iconBgColor: 'bg-white/20',
      iconColor: 'text-white',
      onClick: () => navigate('/company/sales'),
    },
    {
      title: 'Available Plots',
      value: '187',
      subtitle: 'Ready for Allocation',
      icon: MapPin,
      gradientFrom: 'from-indigo-500',
      gradientTo: 'to-purple-400',
      iconBgColor: 'bg-white/20',
      iconColor: 'text-white',
      onClick: () => navigate('/company/projects'),
    },
    {
      title: 'Installment Collections',
      value: '₦450M',
      subtitle: '92% Collection Rate',
      icon: Calculator,
      gradientFrom: 'from-green-500',
      gradientTo: 'to-emerald-400',
      iconBgColor: 'bg-white/20',
      iconColor: 'text-white',
      onClick: () => navigate('/company/accounting'),
    },
    {
      title: 'Completed Deals',
      value: '89',
      subtitle: 'This Quarter',
      icon: CheckCircle,
      gradientFrom: 'from-teal-500',
      gradientTo: 'to-cyan-400',
      iconBgColor: 'bg-white/20',
      iconColor: 'text-white',
      onClick: () => navigate('/company/sales'),
    },
    {
      title: 'Scheduled Inspections',
      value: '34',
      subtitle: 'Next 7 Days',
      icon: Calendar,
      gradientFrom: 'from-rose-500',
      gradientTo: 'to-pink-400',
      iconBgColor: 'bg-white/20',
      iconColor: 'text-white',
      onClick: () => navigate('/company/tools/calendar'),
    },
  ];

  const handleNewAction = (action: string) => {
    // Navigate to the appropriate page for creating new items
    const routes = {
      'client': '/company/clients/new',
      'project': '/company/projects/new', 
      'marketer': '/company/agents-marketers',
      'allocation': '/company/sales'
    };
    const route = routes[action as keyof typeof routes];
    if (route) {
      navigate(route);
      toast.success(`Navigating to create new ${action}`);
    } else {
      toast.error(`Unknown action: ${action}`);
    }
    if (action === 'payment') {
      setShowPaymentModal(true);
    } else if (action === 'client') {
      navigate('/company/clients/new');
    } else if (action === 'development') {
      navigate('/company/projects/new');
    } else {
      setActiveModal(action);
    }
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  // Mock client data for payment modal (in real app, this would come from props or context)
  const mockClient = {
    id: '1',
    name: 'General Payment Entry',
    email: 'payment@company.com'
  };

  const getModalTitle = (action: string) => {
    switch (action) {
      case 'project_site': return 'Create New Project Site';
      case 'client': return 'Create New Client';
      case 'allocation': return 'Create New Allocation';
      case 'expense': return 'Record New Expense';
      case 'notice': return 'Send New Notice';
      default: return 'Create New';
    }
  };

  const getModalDescription = (action: string) => {
    switch (action) {
      case 'project_site': return 'Add a new project site to track development progress';
      case 'client': return 'Add a new client to your database';
      case 'allocation': return 'Allocate a plot to a client';
      case 'expense': return 'Record a new business expense';
      case 'notice': return 'Send a notice to clients or staff members';
      default: return '';
    }
  };

  const renderModalContent = (action: string) => {
    switch (action) {
      case 'project_site':
        return <div>Project Site Form - To be implemented</div>;
      case 'client':
        return <NewClientForm onClose={closeModal} />;
      case 'allocation':
        return <NewAllocationForm onClose={closeModal} />;
      case 'expense':
        return <NewExpenseForm onClose={closeModal} />;
      case 'notice':
        return <SendNoticeForm />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Notification Bar */}
      {showNotification && (
        <div className="bg-blue-600 dark:bg-blue-700 text-white px-3 sm:px-6 py-2 sm:py-3 flex items-center justify-between rounded-lg mb-4">
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
            <Bell className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
            <span className={`font-medium ${isMobile ? 'text-sm' : ''} truncate`}>
              {isMobile ? 'Referral program live! Earn rewards.' : '🎉 Referral program is now live! Earn rewards for every successful referral.'}
            </span>
          </div>
          <Button
            variant="ghost"
            size={isMobile ? "sm" : "icon"}
            onClick={() => setShowNotification(false)}
            className="text-white hover:bg-blue-700 dark:hover:bg-blue-600 flex-shrink-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 sm:px-6 py-4 sm:py-6 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <div className="min-w-0 flex-1">
            <h1 className={`font-bold text-gray-900 dark:text-white ${isMobile ? 'text-xl' : isTablet ? 'text-2xl' : 'text-3xl'}`}>
              Dashboard
            </h1>
            <p className={`text-gray-600 dark:text-gray-300 mt-1 ${isMobile ? 'text-sm' : ''}`}>
              Real Estate Sales & Project Management Overview
            </p>
          </div>
          <div className="flex items-center space-x-3 w-full sm:w-auto">
            {!isMobile && <ThemeToggle />}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className={`bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${isMobile ? 'flex-1 text-sm py-2' : 'px-6 py-3'}`}>
                  <Plus className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
                  {isMobile ? 'New' : 'New'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                className="w-48 sm:w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg rounded-xl z-50"
                align="end"
              >
                <DropdownMenuItem 
                  onClick={() => handleNewAction('development')}
                  className="flex items-center space-x-3 p-2 sm:p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                >
                  <Building className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
                  <span className="font-medium text-sm">New Project</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => handleNewAction('client')}
                  className="flex items-center space-x-3 p-2 sm:p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                >
                  <Users className="h-4 w-4 text-blue-600" />
                  <span className="font-medium">New Client</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => handleNewAction('allocation')}
                  className="flex items-center space-x-3 p-2 sm:p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                >
                  <MapPin className="h-4 w-4 text-green-600" />
                  <span className="font-medium">New Allocation</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => handleNewAction('expense')}
                  className="flex items-center space-x-3 p-2 sm:p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                >
                  <DollarSign className="h-4 w-4 text-red-600" />
                  <span className="font-medium">New Expense</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => handleNewAction('payment')}
                  className="flex items-center space-x-3 p-2 sm:p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                >
                  <CreditCard className="h-4 w-4 text-emerald-600" />
                  <span className="font-medium">New Payment</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => handleNewAction('notice')}
                  className="flex items-center space-x-3 p-2 sm:p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                >
                  <Send className="h-4 w-4 text-orange-600" />
                  <span className="font-medium">New Notice</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <div className="space-y-6 sm:space-y-8">
        {/* KPI Cards - Responsive Grid */}
        <div className={`grid gap-3 sm:gap-4 lg:gap-6 ${
          isMobile 
            ? 'grid-cols-2' 
            : isTablet 
              ? 'grid-cols-2 lg:grid-cols-3' 
              : isLargeDesktop
                ? 'grid-cols-4'
                : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
        }`}>
          {kpiData.map((kpi, index) => (
            <div
              key={index}
              onClick={kpi.onClick}
              className="cursor-pointer transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:ring-offset-2 rounded-xl animate-fade-in hover:shadow-xl"
              style={{ animationDelay: `${index * 0.1}s` }}
              tabIndex={0}
              role="button"
              aria-label={`Navigate to ${kpi.title}`}
            >
              <GradientKpiCard
                title={kpi.title}
                value={kpi.value}
                subtitle={isMobile ? '' : kpi.subtitle}
                icon={kpi.icon}
                gradientFrom={kpi.gradientFrom}
                gradientTo={kpi.gradientTo}
                iconBgColor={kpi.iconBgColor}
                iconColor={kpi.iconColor}
              />
            </div>
          ))}
        </div>

        {/* Main Analytics Charts - Responsive Layout */}
        <div className={`grid gap-4 sm:gap-6 ${
          isMobile || isTablet 
            ? 'grid-cols-1' 
            : 'grid-cols-1 lg:grid-cols-2'
        }`}>
          <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden animate-fade-in">
            <CardHeader className="pb-2 sm:pb-4">
              <CardTitle className={`font-semibold text-gray-800 dark:text-white ${isMobile ? 'text-base' : 'text-lg'}`}>
                Sales & Allocations Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="p-2 sm:p-6">
              <ResponsiveContainer width="100%" height={isMobile ? 200 : isTablet ? 250 : 300}>
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" stroke="#64748b" fontSize={isMobile ? 10 : 12} />
                  <YAxis stroke="#64748b" fontSize={isMobile ? 10 : 12} />
                  <Tooltip 
                    formatter={(value, name) => [
                      value, 
                      name === 'sales' ? 'Plots Sold' : 
                      name === 'allocations' ? 'Allocations' : 'Revenue (₦M)'
                    ]}
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: 'none', 
                      borderRadius: '12px', 
                      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                      fontSize: isMobile ? '12px' : '14px'
                    }}
                  />
                  <Bar dataKey="sales" fill="#8b5cf6" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="allocations" fill="#06b6d4" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm rounded-xl overflow-hidden">
            <CardHeader className="pb-2 sm:pb-4">
              <CardTitle className={`font-semibold text-gray-800 dark:text-white ${isMobile ? 'text-base' : 'text-lg'}`}>
                Financial Overview (₦M)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-2 sm:p-6">
              <ResponsiveContainer width="100%" height={isMobile ? 200 : isTablet ? 250 : 300}>
                <AreaChart data={financialData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" stroke="#64748b" fontSize={isMobile ? 10 : 12} />
                  <YAxis stroke="#64748b" fontSize={isMobile ? 10 : 12} />
                  <Tooltip 
                    formatter={(value, name) => [
                      `₦${value}M`, 
                      name === 'income' ? 'Income' : 
                      name === 'expenses' ? 'Expenses' : 'Profit'
                    ]}
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: 'none', 
                      borderRadius: '12px', 
                      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                      fontSize: isMobile ? '12px' : '14px'
                    }}
                  />
                  <Area type="monotone" dataKey="income" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="expenses" stackId="2" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="profit" stackId="3" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.8} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Secondary Analytics - Responsive Grid */}
        <div className={`grid gap-4 sm:gap-6 ${isMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1 lg:grid-cols-3'}`}>
          <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm rounded-xl">
            <CardHeader className="pb-2 sm:pb-4">
              <CardTitle className={`font-semibold text-gray-800 dark:text-white ${isMobile ? 'text-base' : 'text-lg'}`}>
                Project Status Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={isMobile ? 180 : isTablet ? 200 : 250}>
                <PieChart>
                  <Pie
                    data={projectStatusData}
                    cx="50%"
                    cy="50%"
                    outerRadius={isMobile ? 60 : isTablet ? 80 : 100}
                    fill="#8884d8"
                    dataKey="value"
                    label={isMobile ? false : ({ name, value }) => `${name}: ${value}%`}
                  >
                    {projectStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: 'none', 
                      borderRadius: '12px', 
                      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                      fontSize: isMobile ? '12px' : '14px'
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm rounded-xl ${
            isMobile ? '' : 'lg:col-span-2'
          }`}>
            <CardHeader>
              <CardTitle className={`font-semibold text-gray-800 dark:text-white ${isMobile ? 'text-base' : 'text-lg'}`}>
                Recent Activity Log
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 sm:space-y-4 max-h-80 overflow-y-auto">
                <div className="flex items-center space-x-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-xl border-l-4 border-green-500">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800 dark:text-white">New client allocation completed</p>
                    <p className="text-xs text-gray-600 dark:text-gray-300">John Doe - Victoria Gardens Block A, Plot 12</p>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-700 px-2 py-1 rounded-lg">5 min ago</span>
                </div>
                <div className="flex items-center space-x-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-l-4 border-blue-500">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800 dark:text-white">Payment received</p>
                    <p className="text-xs text-gray-600 dark:text-gray-300">₦2.5M initial payment - Lagos Estate Project</p>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-700 px-2 py-1 rounded-lg">1 hour ago</span>
                </div>
                <div className="flex items-center space-x-4 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl border-l-4 border-purple-500">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800 dark:text-white">Site inspection scheduled</p>
                    <p className="text-xs text-gray-600 dark:text-gray-300">Sunrise Estate - Tomorrow 10:00 AM</p>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-700 px-2 py-1 rounded-lg">2 hours ago</span>
                </div>
                <div className="flex items-center space-x-4 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-xl border-l-4 border-orange-500">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800 dark:text-white">Document uploaded</p>
                    <p className="text-xs text-gray-600 dark:text-gray-300">Survey plan - Greenfield Heights</p>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-700 px-2 py-1 rounded-lg">4 hours ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & Performance Metrics */}
        <div className={`grid gap-4 sm:gap-6 ${
          isMobile 
            ? 'grid-cols-1' 
            : isTablet 
              ? 'grid-cols-1' 
              : 'grid-cols-1 lg:grid-cols-2'
        }`}>
          <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm rounded-xl">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800 dark:text-white">Top Performing Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-100 dark:border-green-800 cursor-pointer hover:scale-105 transition-transform" onClick={() => navigate('/company/developments/1')}>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center shadow-sm">
                      <Building className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800 dark:text-white">Victoria Gardens</p>
                      <p className="text-xs text-gray-600 dark:text-gray-300">85% plots sold • 127 allocations</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-green-600">₦1.2B</span>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Revenue</div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl border border-blue-100 dark:border-blue-800 cursor-pointer hover:scale-105 transition-transform" onClick={() => navigate('/company/developments/2')}>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-sm">
                      <Building className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800 dark:text-white">Lagos Estate</p>
                      <p className="text-xs text-gray-600 dark:text-gray-300">72% plots sold • 98 allocations</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-blue-600">₦890M</span>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Revenue</div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-100 dark:border-purple-800 cursor-pointer hover:scale-105 transition-transform" onClick={() => navigate('/company/developments/3')}>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center shadow-sm">
                      <Building className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800 dark:text-white">Sunrise Estate</p>
                      <p className="text-xs text-gray-600 dark:text-gray-300">68% plots sold • 76 allocations</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-purple-600">₦650M</span>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Revenue</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm rounded-xl">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800 dark:text-white">Client Allocation Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Allocated Plots</span>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">456</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Fully Paid</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                      <span className="text-sm font-medium dark:text-white">298</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-300">On Payment Plan</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                      </div>
                      <span className="text-sm font-medium dark:text-white">134</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Pending Documentation</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-orange-500 h-2 rounded-full" style={{ width: '10%' }}></div>
                      </div>
                      <span className="text-sm font-medium dark:text-white">24</span>
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Collection Rate</span>
                    <span className="text-xl font-bold text-green-600">92.3%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Payment Modal */}
      <AddPaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        client={mockClient}
      />

      {/* Centered Modal for Forms */}
      <Dialog open={!!activeModal} onOpenChange={closeModal}>
        <DialogContent className={`${
          isMobile 
            ? 'max-w-[95vw] max-h-[90vh] m-2' 
            : 'max-w-2xl max-h-[90vh]'
        } overflow-y-auto`}>
          <DialogHeader>
            <DialogTitle className={isMobile ? 'text-lg' : 'text-xl'}>
              {activeModal ? getModalTitle(activeModal) : ''}
            </DialogTitle>
            <DialogDescription className={isMobile ? 'text-sm' : ''}>
              {activeModal ? getModalDescription(activeModal) : ''}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 sm:mt-6">
            {activeModal && renderModalContent(activeModal)}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
