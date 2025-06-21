
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
import { useLocation } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

const CompanyDashboard = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
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

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <CompanySidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
        />
        
        <div className="flex-1 flex flex-col">
          {/* Mobile Header */}
          {isMobile && (
            <header className="bg-white border-b border-gray-200 px-4 py-3 lg:hidden">
              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden"
                >
                  <Menu className="h-5 w-5" />
                </Button>
                <h1 className="text-lg font-semibold text-gray-900">ProptyOS</h1>
                <div className="w-8" /> {/* Spacer for center alignment */}
              </div>
            </header>
          )}
          
          <main className="flex-1 p-3 sm:p-6">
            {renderActiveModule()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default CompanyDashboard;
