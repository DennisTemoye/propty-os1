
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { CompanySidebar } from '@/components/dashboard/CompanySidebar';
import { DashboardOverview } from '@/components/dashboard/DashboardOverview';
import { ProjectsUnits } from '@/components/dashboard/ProjectsUnits';
import { Clients } from '@/components/dashboard/Clients';
import { AgentsMarketers } from '@/components/dashboard/AgentsMarketers';
import { Commissions } from '@/components/dashboard/Commissions';
import { Accounting } from '@/components/dashboard/Accounting';
import { Documents } from '@/components/dashboard/Documents';
import { VendorsExpenses } from '@/components/dashboard/VendorsExpenses';
import { StaffPayroll } from '@/components/dashboard/StaffPayroll';
import { RolesPermissions } from '@/components/dashboard/RolesPermissions';
import { Settings } from '@/components/dashboard/Settings';
import { useLocation } from 'react-router-dom';

const CompanyDashboard = () => {
  const location = useLocation();

  const renderActiveModule = () => {
    const path = location.pathname;
    
    if (path === '/company/dashboard') {
      return <DashboardOverview />;
    } else if (path.startsWith('/company/projects')) {
      return <ProjectsUnits />;
    } else if (path.startsWith('/company/clients')) {
      return <Clients />;
    } else if (path.startsWith('/company/agents')) {
      return <AgentsMarketers />;
    } else if (path.startsWith('/company/commissions')) {
      return <Commissions />;
    } else if (path.startsWith('/company/accounting')) {
      return <Accounting />;
    } else if (path.startsWith('/company/documents')) {
      return <Documents />;
    } else if (path.startsWith('/company/vendors')) {
      return <VendorsExpenses />;
    } else if (path.startsWith('/company/staff')) {
      return <StaffPayroll />;
    } else if (path.startsWith('/company/roles')) {
      return <RolesPermissions />;
    } else if (path.startsWith('/company/settings')) {
      return <Settings />;
    } else {
      return <DashboardOverview />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <CompanySidebar />
        <main className="flex-1 p-6">
          {renderActiveModule()}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default CompanyDashboard;
