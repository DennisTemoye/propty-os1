import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './components/ThemeProvider';
import { Toaster } from './components/ui/toaster';
import { Toaster as SonnerToaster } from 'sonner';

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
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/superadmin-login" element={<SuperAdminLoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-code" element={<ResetCodePage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/book-demo" element={<BookDemoPage />} />

            {/* Dashboard Routes */}
            <Route path="/company/*" element={<CompanyDashboard />} />
            <Route path="/company/projects/new" element={<NewProjectPage />} />
            <Route path="/company/projects/:projectId" element={<ProjectDetailPage />} />
            <Route path="/company/projects/:projectId/edit" element={<EditProjectPage />} />
            <Route path="/company/projects/:projectId/blocks" element={<ProjectBlocksPage />} />
            <Route path="/company/clients/:clientId" element={<ClientDetailPage />} />
            <Route path="/company/clients/new" element={<NewClientPage />} />
            <Route path="/company/marketers-commission" element={<MarketersCommissionPage />} />
            <Route path="/company/marketers/:marketerId" element={<MarketerDetailPage />} />

            {/* Super Admin Routes */}
            <Route path="/superadmin/*" element={<SuperAdminDashboard />} />

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
        <Toaster />
        <SonnerToaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
