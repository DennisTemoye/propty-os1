
import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { CompanySidebar } from '@/components/dashboard/CompanySidebar';
import { Toaster } from '@/components/ui/sonner';
import { SidebarProvider } from '@/components/ui/sidebar';

// Import all the page/component files
import { DashboardOverview } from '@/components/dashboard/DashboardOverview';
import { ProjectsUnits } from '@/components/dashboard/ProjectsUnits';
import { Clients } from '@/components/dashboard/Clients';
import { AgentsMarketers } from '@/components/dashboard/AgentsMarketers';
import { SalesAllocation } from '@/components/dashboard/SalesAllocation';
import { FeesCollection } from '@/components/dashboard/FeesCollection';
import { Accounting } from '@/components/dashboard/Accounting';
import { TeamRoles } from '@/components/dashboard/TeamRoles';
import { Reports } from '@/components/dashboard/Reports';
import { Settings } from '@/components/dashboard/Settings';
import { ReferralProgram } from '@/components/dashboard/ReferralProgram';
import { HelpSupport } from '@/components/dashboard/HelpSupport';
import { CRMPipelinesPage } from '@/components/dashboard/tools/CRMPipelines';
import { DocumentManagerPage } from '@/components/dashboard/tools/DocumentManager';
import { CalendarSchedulingPage } from '@/components/dashboard/tools/CalendarScheduling';
import { SendNotice } from '@/components/dashboard/SendNotice';

// Import detail pages
import ClientDetailPage from './ClientDetailPage';
import ProjectDetailPage from './ProjectDetailPage';
import MarketerDetailPage from './MarketerDetailPage';
import NewClientPage from './NewClientPage';
import NewProjectPage from './NewProjectPage';
import EditProjectPage from './EditProjectPage';
import ProjectBlocksPage from './ProjectBlocksPage';
import MarketersCommissionPage from './MarketersCommissionPage';

export default function CompanyDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <CompanySidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
        />
        
        {/* Main content area - remove any width constraints for full-width pages */}
        <main className="flex-1 overflow-auto w-full">
          <Routes>
            <Route path="/" element={<Navigate to="/company/dashboard" replace />} />
            <Route path="/dashboard" element={
              <div className="container mx-auto p-4 md:p-6 lg:p-8">
                <DashboardOverview />
              </div>
            } />
            <Route path="/projects" element={
              <div className="container mx-auto p-4 md:p-6 lg:p-8">
                <ProjectsUnits />
              </div>
            } />
            <Route path="/clients" element={
              <div className="container mx-auto p-4 md:p-6 lg:p-8">
                <Clients />
              </div>
            } />
            <Route path="/marketers" element={
              <div className="container mx-auto p-4 md:p-6 lg:p-8">
                <AgentsMarketers />
              </div>
            } />
            <Route path="/sales" element={
              <div className="container mx-auto p-4 md:p-6 lg:p-8">
                <SalesAllocation />
              </div>
            } />
            <Route path="/fees" element={
              <div className="container mx-auto p-4 md:p-6 lg:p-8">
                <FeesCollection />
              </div>
            } />
            <Route path="/accounting" element={
              <div className="container mx-auto p-4 md:p-6 lg:p-8">
                <Accounting />
              </div>
            } />
            <Route path="/team" element={
              <div className="container mx-auto p-4 md:p-6 lg:p-8">
                <TeamRoles />
              </div>
            } />
            <Route path="/reports" element={
              <div className="container mx-auto p-4 md:p-6 lg:p-8">
                <Reports />
              </div>
            } />
            <Route path="/settings" element={
              <div className="container mx-auto p-4 md:p-6 lg:p-8">
                <Settings />
              </div>
            } />
            <Route path="/referrals" element={
              <div className="container mx-auto p-4 md:p-6 lg:p-8">
                <ReferralProgram />
              </div>
            } />
            <Route path="/help" element={
              <div className="container mx-auto p-4 md:p-6 lg:p-8">
                <HelpSupport />
              </div>
            } />
            
            {/* Tool routes */}
            <Route path="/tools/crm-pipelines" element={
              <div className="container mx-auto p-4 md:p-6 lg:p-8">
                <CRMPipelinesPage />
              </div>
            } />
            <Route path="/tools/document-manager" element={
              <div className="container mx-auto p-4 md:p-6 lg:p-8">
                <DocumentManagerPage />
              </div>
            } />
            <Route path="/tools/calendar" element={
              <div className="container mx-auto p-4 md:p-6 lg:p-8">
                <CalendarSchedulingPage />
              </div>
            } />
            <Route path="/tools/send-notice" element={
              <div className="container mx-auto p-4 md:p-6 lg:p-8">
                <SendNotice />
              </div>
            } />
            
            {/* Detail pages - NO container wrapper for full width */}
            <Route path="/clients/:clientId" element={<ClientDetailPage />} />
            <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
            <Route path="/marketers/:marketerId" element={<MarketerDetailPage />} />
            
            {/* Form pages */}
            <Route path="/clients/new" element={
              <div className="container mx-auto p-4 md:p-6 lg:p-8">
                <NewClientPage />
              </div>
            } />
            <Route path="/projects/new" element={
              <div className="container mx-auto p-4 md:p-6 lg:p-8">
                <NewProjectPage />
              </div>
            } />
            <Route path="/projects/:projectId/edit" element={
              <div className="container mx-auto p-4 md:p-6 lg:p-8">
                <EditProjectPage />
              </div>
            } />
            <Route path="/projects/:projectId/blocks" element={
              <div className="container mx-auto p-4 md:p-6 lg:p-8">
                <ProjectBlocksPage />
              </div>
            } />
            <Route path="/marketers/commission" element={
              <div className="container mx-auto p-4 md:p-6 lg:p-8">
                <MarketersCommissionPage />
              </div>
            } />
          </Routes>
        </main>
        
        <Toaster />
      </div>
    </SidebarProvider>
  );
}
