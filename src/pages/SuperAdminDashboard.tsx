
import React, { useState } from 'react';
import { SuperAdminSidebar } from '@/components/dashboard/SuperAdminSidebar';
import { SuperAdminHeader } from '@/components/dashboard/SuperAdminHeader';
import { SuperAdminOverview } from '@/components/dashboard/SuperAdminOverview';
import { CompaniesManagement } from '@/components/dashboard/superadmin/CompaniesManagement';
import { BillingSubscriptions } from '@/components/dashboard/superadmin/BillingSubscriptions';
import { GlobalSettings } from '@/components/dashboard/superadmin/GlobalSettings';
import { SystemLogs } from '@/components/dashboard/superadmin/SystemLogs';
import { SupportTools } from '@/components/dashboard/superadmin/SupportTools';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const SuperAdminDashboard = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const currentPath = location.pathname;

  const getPageTitle = () => {
    if (currentPath.includes('/companies')) return 'Companies Management';
    if (currentPath.includes('/billing')) return 'Billing & Subscriptions';
    if (currentPath.includes('/settings')) return 'Global Settings';
    if (currentPath.includes('/logs')) return 'System Logs';
    if (currentPath.includes('/support')) return 'Support Tools';
    return 'Super Admin Dashboard';
  };

  return (
    <div className="flex h-screen bg-slate-50">
      <SuperAdminSidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <SuperAdminHeader 
          title={getPageTitle()} 
          onMenuToggle={() => setSidebarOpen(true)}
        />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 p-3 sm:p-6">
          <Routes>
            <Route path="/" element={<SuperAdminOverview />} />
            <Route path="/companies" element={<CompaniesManagement />} />
            <Route path="/billing" element={<BillingSubscriptions />} />
            <Route path="/settings" element={<GlobalSettings />} />
            <Route path="/logs" element={<SystemLogs />} />
            <Route path="/support" element={<SupportTools />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
