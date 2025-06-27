
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { TooltipProvider } from '@/components/ui/tooltip';
import { SalesAllocationProvider } from '@/contexts/SalesAllocationContext';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { ResponsiveContainer } from '@/components/common/ResponsiveContainer';

// Import existing components that are available
import { SalesAllocationOverview } from '@/components/dashboard/SalesAllocationOverview';
import { SalesAllocation } from '@/components/dashboard/SalesAllocation';
import { ClientDetailView } from '@/components/dashboard/ClientDetailView';
import { Settings } from '@/components/dashboard/Settings';

// Simple placeholder components for missing ones
const Dashboard = () => <div className="p-6"><h1 className="text-2xl font-bold">Dashboard Overview</h1></div>;
const Projects = () => <div className="p-6"><h1 className="text-2xl font-bold">Projects</h1></div>;
const Clients = () => <div className="p-6"><h1 className="text-2xl font-bold">Clients</h1></div>;
const CRMDashboard = () => <div className="p-6"><h1 className="text-2xl font-bold">CRM Dashboard</h1></div>;
const Marketers = () => <div className="p-6"><h1 className="text-2xl font-bold">Marketers</h1></div>;
const Fees = () => <div className="p-6"><h1 className="text-2xl font-bold">Fees</h1></div>;
const Accounting = () => <div className="p-6"><h1 className="text-2xl font-bold">Accounting</h1></div>;
const AdvancedTools = () => <div className="p-6"><h1 className="text-2xl font-bold">Advanced Tools</h1></div>;

// Simple sidebar component
const Sidebar = () => (
  <div className="w-64 bg-gray-900 text-white p-4">
    <h2 className="text-xl font-bold mb-4">ProptyOS</h2>
    <nav className="space-y-2">
      <a href="/company" className="block p-2 hover:bg-gray-700 rounded">Dashboard</a>
      <a href="/company/projects" className="block p-2 hover:bg-gray-700 rounded">Projects</a>
      <a href="/company/clients" className="block p-2 hover:bg-gray-700 rounded">Clients</a>
      <a href="/company/sales" className="block p-2 hover:bg-gray-700 rounded">Sales</a>
      <a href="/company/settings" className="block p-2 hover:bg-gray-700 rounded">Settings</a>
    </nav>
  </div>
);

// Simple nav component
const DashboardNav = () => (
  <div className="h-16 bg-white border-b border-gray-200 flex items-center px-6">
    <h1 className="text-lg font-semibold">Company Dashboard</h1>
  </div>
);

export default function CompanyDashboard() {
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
