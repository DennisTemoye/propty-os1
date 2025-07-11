
import React, { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { CompanySidebar } from '@/components/dashboard/CompanySidebar';
import { DashboardOverview } from '@/components/dashboard/DashboardOverview';
import { ProjectsUnits } from '@/components/dashboard/ProjectsUnits';
import { Clients } from '@/components/dashboard/Clients';
import { MarketersCommission } from '@/components/dashboard/MarketersCommission';
import { SalesAllocation } from '@/components/dashboard/SalesAllocation';
import { FeesCollection } from '@/components/dashboard/FeesCollection';
import { Accounting } from '@/components/dashboard/Accounting';
import { TeamRoles } from '@/components/dashboard/TeamRoles';
import { Reports } from '@/components/dashboard/Reports';
import { CRMPipelinesPage } from '@/components/dashboard/tools/CRMPipelines';
import { DocumentManagerPage } from '@/components/dashboard/tools/DocumentManager';
import { CalendarSchedulingPage } from '@/components/dashboard/tools/CalendarScheduling';
import { SendNotice } from '@/components/dashboard/SendNotice';
import { Settings } from '@/components/dashboard/Settings';
import { ReferralProgram } from '@/components/dashboard/ReferralProgram';
import { HelpSupport } from '@/components/dashboard/HelpSupport';
import { MobileWarningBanner } from '@/components/common/MobileWarningBanner';
import { ResponsiveContainer } from '@/components/common/ResponsiveContainer';
import { ProjectDetailView } from '@/components/dashboard/projects/ProjectDetailView';
import { ClientDetailView } from '@/components/dashboard/ClientDetailView';
import { MarketerDetailView } from '@/components/dashboard/MarketerDetailView';
import { useLocation } from 'react-router-dom';
import { useResponsive } from '@/hooks/use-responsive';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const CompanyDashboard = () => {
  const location = useLocation();
  const { isMobile, isTablet, isSmallScreen } = useResponsive();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderActiveModule = () => {
    const path = location.pathname;
    
    // Handle detail pages - these render with the dashboard layout
    if (path.match(/^\/company\/projects\/\d+$/)) {
      return <ProjectDetailView />;
    } else if (path.match(/^\/company\/clients\/\d+$/)) {
      return <ClientDetailView />;
    } else if (path.match(/^\/company\/marketers\/\d+$/)) {
      return <MarketerDetailView />;
    }
    
    // Handle main module pages
    if (path === '/company/dashboard') {
      return <DashboardOverview />;
    } else if (path.startsWith('/company/projects')) {
      return <ProjectsUnits />;
    } else if (path.startsWith('/company/clients')) {
      return <Clients />;
    } else if (path.startsWith('/company/marketers') && !path.includes('/company/marketers/')) {
      return <MarketersCommission />;
    } else if (path.startsWith('/company/sales')) {
      return <SalesAllocation />;
    } else if (path.startsWith('/company/fees')) {
      return <FeesCollection />;
    } else if (path.startsWith('/company/accounting')) {
      return <Accounting />;
    } else if (path.startsWith('/company/team')) {
      return <TeamRoles />;
    } else if (path.startsWith('/company/reports')) {
      return <Reports />;
    } else if (path.startsWith('/company/tools/crm-pipelines')) {
      return <CRMPipelinesPage />;
    } else if (path.startsWith('/company/tools/document-manager')) {
      return <DocumentManagerPage />;
    } else if (path.startsWith('/company/tools/calendar')) {
      return <CalendarSchedulingPage />;
    } else if (path.startsWith('/company/tools/send-notice')) {
      return <SendNotice />;
    } else if (path.startsWith('/company/settings')) {
      return <Settings />;
    } else if (path.startsWith('/company/referrals')) {
      return <ReferralProgram />;
    } else if (path.startsWith('/company/help')) {
      return <HelpSupport />;
    } else {
      return <DashboardOverview />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900">
        <MobileWarningBanner />
        
        {/* Global Fixed Sidebar - Always present */}
        <CompanySidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
        />
        
        {/* Main Content Area */}
        <div className={`min-h-screen transition-all duration-300 ${
          isSmallScreen ? 'ml-0' : 'ml-64'
        }`}>
          {/* Mobile Header - Only show on small screens */}
          {isSmallScreen && (
            <div className="fixed top-16 sm:top-20 left-0 right-0 z-40 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-3 py-2 shadow-sm">
              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {sidebarOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </Button>
                <h1 className="text-base font-semibold text-gray-900 dark:text-white truncate">
                  ProptyOS
                </h1>
                <div className="w-9" />
              </div>
            </div>
          )}
          
          {/* Scrollable Content Area - All pages use ResponsiveContainer */}
          <main className={`min-h-screen ${
            isSmallScreen ? 'pt-32 sm:pt-36' : 'pt-0'
          }`}>
            <ResponsiveContainer 
              className="min-h-full"
              padding={isMobile ? 'sm' : isTablet ? 'md' : 'lg'}
            >
              {renderActiveModule()}
            </ResponsiveContainer>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default CompanyDashboard;
