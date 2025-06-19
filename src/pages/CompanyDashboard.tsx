
import React, { useState } from 'react';
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

const CompanyDashboard = () => {
  const [activeModule, setActiveModule] = useState('dashboard');

  const renderActiveModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'projects':
        return <ProjectsUnits />;
      case 'clients':
        return <Clients />;
      case 'agents':
        return <AgentsMarketers />;
      case 'commissions':
        return <Commissions />;
      case 'accounting':
        return <Accounting />;
      case 'documents':
        return <Documents />;
      case 'vendors':
        return <VendorsExpenses />;
      case 'staff':
        return <StaffPayroll />;
      case 'roles':
        return <RolesPermissions />;
      case 'settings':
        return <Settings />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <CompanySidebar activeModule={activeModule} setActiveModule={setActiveModule} />
        <main className="flex-1 p-6">
          {renderActiveModule()}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default CompanyDashboard;
