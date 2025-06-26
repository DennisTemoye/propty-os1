
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './components/ThemeProvider';
import { Toaster } from './components/ui/toaster';
import { Toaster as SonnerToaster } from 'sonner';
import { AppLayout } from './components/layouts/AppLayout';

// Pages
import Index from './pages/Index';
import LoginPage from './pages/LoginPage';
import SuperAdminLoginPage from './pages/SuperAdminLoginPage';
import SignupPage from './pages/SignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetCodePage from './pages/ResetCodePage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import BookDemoPage from './pages/BookDemoPage';
import NotFound from './pages/NotFound';

// Dashboard Pages
import CompanyDashboard from './pages/CompanyDashboard';
import SuperAdminDashboard from './pages/SuperAdminDashboard';
import ProjectDetailPage from './pages/ProjectDetailPage';
import ProjectBlocksPage from './pages/ProjectBlocksPage';
import ClientDetailPage from './pages/ClientDetailPage';
import NewClientPage from './pages/NewClientPage';
import MarketersCommissionPage from './pages/MarketersCommissionPage';
import MarketerDetailPage from './pages/MarketerDetailPage';
import NewProjectPage from './pages/NewProjectPage';
import EditProjectPage from './pages/EditProjectPage';

import './App.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="proptyos-ui-theme">
        <div className="min-h-screen w-full bg-white dark:bg-gray-900">
          <Router>
            <Routes>
              <Route path="/" element={<AppLayout />}>
                {/* Public Routes */}
                <Route index element={<Index />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="superadmin-login" element={<SuperAdminLoginPage />} />
                <Route path="signup" element={<SignupPage />} />
                <Route path="forgot-password" element={<ForgotPasswordPage />} />
                <Route path="reset-code" element={<ResetCodePage />} />
                <Route path="reset-password" element={<ResetPasswordPage />} />
                <Route path="book-demo" element={<BookDemoPage />} />

                {/* Company Routes - All will have fixed sidebar */}
                <Route path="company">
                  <Route index element={<CompanyDashboard />} />
                  <Route path="dashboard" element={<CompanyDashboard />} />
                  <Route path="projects" element={<CompanyDashboard />} />
                  <Route path="projects/new" element={<NewProjectPage />} />
                  <Route path="projects/:projectId" element={<ProjectDetailPage />} />
                  <Route path="projects/:projectId/edit" element={<EditProjectPage />} />
                  <Route path="projects/:projectId/blocks" element={<ProjectBlocksPage />} />
                  <Route path="clients" element={<CompanyDashboard />} />
                  <Route path="clients/:clientId" element={<ClientDetailPage />} />
                  <Route path="clients/new" element={<NewClientPage />} />
                  <Route path="marketers" element={<CompanyDashboard />} />
                  <Route path="marketers-commission" element={<MarketersCommissionPage />} />
                  <Route path="marketers/:marketerId" element={<MarketerDetailPage />} />
                  <Route path="sales" element={<CompanyDashboard />} />
                  <Route path="fees" element={<CompanyDashboard />} />
                  <Route path="accounting" element={<CompanyDashboard />} />
                  <Route path="team" element={<CompanyDashboard />} />
                  <Route path="reports" element={<CompanyDashboard />} />
                  <Route path="tools/crm-pipelines" element={<CompanyDashboard />} />
                  <Route path="tools/document-manager" element={<CompanyDashboard />} />
                  <Route path="tools/calendar" element={<CompanyDashboard />} />
                  <Route path="tools/send-notice" element={<CompanyDashboard />} />
                  <Route path="settings" element={<CompanyDashboard />} />
                  <Route path="referrals" element={<CompanyDashboard />} />
                  <Route path="help" element={<CompanyDashboard />} />
                </Route>

                {/* Super Admin Routes */}
                <Route path="superadmin/*" element={<SuperAdminDashboard />} />

                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Router>
        </div>
        <Toaster />
        <SonnerToaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
