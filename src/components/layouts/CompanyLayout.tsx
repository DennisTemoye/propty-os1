import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { CompanySidebar } from '@/components/dashboard/CompanySidebar';
import CompanyDashboard from '@/pages/CompanyDashboard';
import ProjectDetailPage from '@/pages/ProjectDetailPage';
import ProjectBlocksPage from '@/pages/ProjectBlocksPage';
import ClientDetailPage from '@/pages/ClientDetailPage';
import MarketerDetailPage from '@/pages/MarketerDetailPage';
import NewClientPage from '@/pages/NewClientPage';

export const CompanyLayout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <CompanySidebar />
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route path="dashboard" element={<CompanyDashboard />} />
            
            {/* Project Routes */}
            <Route path="projects" element={<CompanyDashboard />} />
            <Route path="projects/new" element={<CompanyDashboard />} />
            <Route path="projects/:projectId" element={<ProjectDetailPage />} />
            <Route path="projects/:projectId/overview" element={<ProjectDetailPage />} />
            <Route path="projects/:projectId/layout" element={<ProjectDetailPage />} />
            <Route path="projects/:projectId/blocks" element={<ProjectBlocksPage />} />
            <Route path="projects/:projectId/documents" element={<ProjectDetailPage />} />
            <Route path="projects/:projectId/settings" element={<ProjectDetailPage />} />
            
            {/* Client Routes */}
            <Route path="clients" element={<CompanyDashboard />} />
            <Route path="clients/new" element={<NewClientPage />} />
            <Route path="clients/:clientId" element={<ClientDetailPage />} />
            
            {/* Marketer Routes */}
            <Route path="marketers" element={<CompanyDashboard />} />
            <Route path="marketers/new" element={<CompanyDashboard />} />
            <Route path="marketers/:marketerId" element={<MarketerDetailPage />} />
            
            {/* Sales & Allocation Routes */}
            <Route path="sales" element={<CompanyDashboard />} />
            <Route path="sales-allocations" element={<CompanyDashboard />} />
            <Route path="sales-allocations/new" element={<CompanyDashboard />} />
            
            {/* Fees Collection Routes */}
            <Route path="fees" element={<CompanyDashboard />} />
            <Route path="fees/setup" element={<CompanyDashboard />} />
            <Route path="fees/collection" element={<CompanyDashboard />} />
            <Route path="fees/monitoring" element={<CompanyDashboard />} />
            
            {/* Accounting Routes */}
            <Route path="accounting" element={<CompanyDashboard />} />
            <Route path="accounting/summary" element={<CompanyDashboard />} />
            <Route path="accounting/expense/new" element={<CompanyDashboard />} />
            <Route path="accounting/payment/new" element={<CompanyDashboard />} />
            <Route path="accounting/invoice/:id" element={<CompanyDashboard />} />
            
            {/* Team & Roles Routes */}
            <Route path="team" element={<CompanyDashboard />} />
            <Route path="settings/team" element={<CompanyDashboard />} />
            
            {/* Reports Routes */}
            <Route path="reports" element={<CompanyDashboard />} />
            
            {/* Advanced Tools Routes */}
            <Route path="tools/crm-pipelines" element={<CompanyDashboard />} />
            <Route path="tools/calendar" element={<CompanyDashboard />} />
            <Route path="tools/document-manager" element={<CompanyDashboard />} />
            <Route path="tools/send-notice" element={<CompanyDashboard />} />
            
            {/* Other Routes */}
            <Route path="settings" element={<CompanyDashboard />} />
            <Route path="referrals" element={<CompanyDashboard />} />
            <Route path="help" element={<CompanyDashboard />} />
          </Routes>
        </main>
      </div>
    </SidebarProvider>
  );
};
