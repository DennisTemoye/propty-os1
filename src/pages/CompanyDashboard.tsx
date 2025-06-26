
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { DashboardNav } from '@/components/dashboard/DashboardNav';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { TooltipProvider } from '@/components/ui/tooltip';
import { SalesAllocationProvider } from '@/contexts/SalesAllocationContext';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { ResponsiveContainer } from '@/components/common/ResponsiveContainer';

// Dashboard components
import { Dashboard } from '@/components/dashboard/Dashboard';
import { Projects } from '@/components/dashboard/Projects';
import { Clients } from '@/components/dashboard/Clients';
import { ClientDetailView } from '@/components/dashboard/ClientDetailView';
import { SalesAllocationOverview } from '@/components/dashboard/SalesAllocationOverview';
import { SalesAllocation } from '@/components/dashboard/SalesAllocation';
import { CRMDashboard } from '@/components/dashboard/CRMDashboard';
import { Marketers } from '@/components/dashboard/Marketers';
import { Fees } from '@/components/dashboard/Fees';
import { Accounting } from '@/components/dashboard/Accounting';
import { AdvancedTools } from '@/components/dashboard/AdvancedTools';
import { Settings } from '@/components/dashboard/Settings';

export function CompanyDashboard() {
  return (
    <ErrorBoundary>
      <SalesAllocationProvider>
        <TooltipProvider>
          <SidebarProvider>
            <div className="flex h-screen bg-gray-50">
              <Sidebar />
              <SidebarInset className="flex-1 flex flex-col overflow-hidden">
                <DashboardNav />
                <main className="flex-1 overflow-y-auto">
                  <ResponsiveContainer>
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/projects/*" element={<Projects />} />
                      <Route path="/clients" element={<Clients />} />
                      <Route path="/clients/:clientId" element={<ClientDetailView />} />
                      <Route path="/sales" element={<SalesAllocationOverview />} />
                      <Route path="/sales-allocations/*" element={<SalesAllocation />} />
                      <Route path="/crm" element={<CRMDashboard />} />
                      <Route path="/marketers" element={<Marketers />} />
                      <Route path="/fees" element={<Fees />} />
                      <Route path="/accounting" element={<Accounting />} />
                      <Route path="/advanced-tools" element={<AdvancedTools />} />
                      <Route path="/settings" element={<Settings />} />
                    </Routes>
                  </ResponsiveContainer>
                </main>
              </SidebarInset>
            </div>
          </SidebarProvider>
        </TooltipProvider>
      </SalesAllocationProvider>
    </ErrorBoundary>
  );
}
