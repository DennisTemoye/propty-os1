
import React, { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { CompanySidebar } from '@/components/dashboard/CompanySidebar';
import { DashboardOverview } from '@/components/dashboard/DashboardOverview';
import { ProjectSites } from '@/components/dashboard/ProjectSites';
import { Clients } from '@/components/dashboard/Clients';
import { MarketersCommission } from '@/components/dashboard/MarketersCommission';
import { SalesAllocationOverview } from '@/components/dashboard/SalesAllocationOverview';
import { FeesCollection } from '@/components/dashboard/FeesCollection';
import { Accounting } from '@/components/dashboard/Accounting';
import { TeamRoles } from '@/components/dashboard/TeamRoles';
import { Reports } from '@/components/dashboard/Reports';
import { CRMPipelines } from '@/components/dashboard/CRMPipelines';
import { DocumentManager } from '@/components/dashboard/DocumentManager';
import { CalendarScheduling } from '@/components/dashboard/CalendarScheduling';
import { SendNotice } from '@/components/dashboard/SendNotice';
import { Settings } from '@/components/dashboard/Settings';
import { ReferralProgram } from '@/components/dashboard/ReferralProgram';
import { HelpSupport } from '@/components/dashboard/HelpSupport';
import { MobileWarningBanner } from '@/components/common/MobileWarningBanner';
import { ResponsiveContainer } from '@/components/common/ResponsiveContainer';
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
    
    if (path === '/company/dashboard') {
      return <DashboardOverview />;
    } else if (path.startsWith('/company/projects')) {
      return <ProjectSites />;
    } else if (path.startsWith('/company/clients')) {
      return <Clients />;
    } else if (path.startsWith('/company/marketers') && !path.includes('/company/marketers/')) {
      return <MarketersCommission />;
    } else if (path.startsWith('/company/sales')) {
      return <SalesAllocationOverview />;
    } else if (path.startsWith('/company/fees')) {
      return <FeesCollection />;
    } else if (path.startsWith('/company/accounting')) {
      return <Accounting />;
    } else if (path.startsWith('/company/team')) {
      return <TeamRoles />;
    } else if (path.startsWith('/company/reports')) {
      return <Reports />;
    } else if (path.startsWith('/company/tools/crm-pipelines')) {
      return <CRMPipelines />;
    } else if (path.startsWith('/company/tools/document-manager')) {
      return <DocumentManager />;
    } else if (path.startsWith('/company/tools/calendar')) {
      return <CalendarScheduling />;
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

  // Close sidebar when clicking outside on mobile
  const handleOverlayClick = () => {
    if (isMobile && sidebarOpen) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="w-full">
      <MobileWarningBanner />
      <SidebarProvider>
        <div className={`min-h-screen flex w-full bg-gray-50 dark:bg-gray-900 ${isSmallScreen ? 'pt-16 sm:pt-20' : ''}`}>
          {/* Mobile/Tablet Sidebar Overlay */}
          {isSmallScreen && sidebarOpen && (
            <div 
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={handleOverlayClick}
            />
          )}
          
          <CompanySidebar 
            isOpen={sidebarOpen} 
            onClose={() => setSidebarOpen(false)} 
          />
          
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden w-full">
            {/* Mobile/Tablet Header */}
            {isSmallScreen && (
              <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-3 py-2 lg:hidden sticky top-16 sm:top-20 z-30 shadow-sm w-full">
                <div className="flex items-center justify-between">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
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
              </header>
            )}
            
            <main className="flex-1 overflow-auto w-full">
              <ResponsiveContainer 
                fullWidth={true}
                className="h-full min-h-0 w-full"
                padding={isMobile ? 'sm' : isTablet ? 'md' : 'lg'}
              >
                {renderActiveModule()}
              </ResponsiveContainer>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default CompanyDashboard;
