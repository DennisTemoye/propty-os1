
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/ThemeProvider';

// Page imports
import Index from '@/pages/Index';
import LoginPage from '@/pages/LoginPage';
import SignupPage from '@/pages/SignupPage';
import ForgotPasswordPage from '@/pages/ForgotPasswordPage';
import ResetCodePage from '@/pages/ResetCodePage';
import ResetPasswordPage from '@/pages/ResetPasswordPage';
import BookDemoPage from '@/pages/BookDemoPage';
import CompanyDashboard from '@/pages/CompanyDashboard';
import SuperAdminDashboard from '@/pages/SuperAdminDashboard';
import SuperAdminLoginPage from '@/pages/SuperAdminLoginPage';
import ProjectDetailPage from '@/pages/ProjectDetailPage';
import ProjectBlocksPage from '@/pages/ProjectBlocksPage';
import ClientDetailPage from '@/pages/ClientDetailPage';
import NewClientPage from '@/pages/NewClientPage';
import MarketerDetailPage from '@/pages/MarketerDetailPage';
import MarketersCommissionPage from '@/pages/MarketersCommissionPage';
import { NewProjectPage } from '@/pages/NewProjectPage';
import { EditProjectPage } from '@/pages/EditProjectPage';
import NotFound from '@/pages/NotFound';

import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Router>
          <div className="min-h-screen bg-background">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-code" element={<ResetCodePage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route path="/book-demo" element={<BookDemoPage />} />
              
              {/* Super Admin routes */}
              <Route path="/super-admin/login" element={<SuperAdminLoginPage />} />
              <Route path="/super-admin/*" element={<SuperAdminDashboard />} />
              
              {/* Company dashboard routes */}
              <Route path="/company/*" element={<CompanyDashboard />} />
              <Route path="/company/projects/:id" element={<ProjectDetailPage />} />
              <Route path="/company/projects/:id/blocks" element={<ProjectBlocksPage />} />
              <Route path="/company/projects/new" element={<NewProjectPage />} />
              <Route path="/company/projects/:id/edit" element={<EditProjectPage />} />
              <Route path="/company/clients/:id" element={<ClientDetailPage />} />
              <Route path="/company/clients/new" element={<NewClientPage />} />
              <Route path="/company/marketers/:id" element={<MarketerDetailPage />} />
              <Route path="/company/marketers/commission" element={<MarketersCommissionPage />} />
              
              {/* 404 route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </div>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
