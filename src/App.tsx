
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Index as HomePage } from '@/pages/Index';
import { LoginPage as Auth } from '@/pages/LoginPage';
import CompanyDashboard from '@/pages/CompanyDashboard';
import EditClientPage from '@/pages/EditClientPage';
import NewClientPage from '@/pages/NewClientPage';
import ClientDetailPage from '@/pages/ClientDetailPage';
import NewProjectPage from '@/pages/NewProjectPage';
import ProjectDetailPage from '@/pages/ProjectDetailPage';
import EditProjectPage from '@/pages/EditProjectPage';
import ProjectBlocksPage from '@/pages/ProjectBlocksPage';
import MarketerDetailPage from '@/pages/MarketerDetailPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen bg-background font-sans antialiased w-full">
          <div className="relative flex min-h-screen flex-col w-full">
            <div className="flex-1 w-full">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/auth" element={<Auth />} />
                
                {/* Company Dashboard Routes */}
                <Route path="/company/*" element={<CompanyDashboard />} />
                
                {/* Specific Company Routes */}
                <Route path="/company/clients/:id/edit" element={<EditClientPage />} />
                <Route path="/company/clients/new" element={<NewClientPage />} />
                <Route path="/company/clients/:id" element={<ClientDetailPage />} />
                <Route path="/company/projects/new" element={<NewProjectPage />} />
                <Route path="/company/projects/:id" element={<ProjectDetailPage />} />
                <Route path="/company/projects/:id/edit" element={<EditProjectPage />} />
                <Route path="/company/projects/:id/blocks" element={<ProjectBlocksPage />} />
                <Route path="/company/marketers/:id" element={<MarketerDetailPage />} />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
