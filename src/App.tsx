
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import BookDemoPage from "./pages/BookDemoPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetCodePage from "./pages/ResetCodePage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import CompanyDashboard from "./pages/CompanyDashboard";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import ProjectBlocksPage from "./pages/ProjectBlocksPage";
import ClientDetailPage from "./pages/ClientDetailPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="proptyos-ui-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/book-demo" element={<BookDemoPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-code" element={<ResetCodePage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            
            {/* Dashboard Routes */}
            <Route path="/company/dashboard" element={<CompanyDashboard />} />
            
            {/* Project Routes */}
            <Route path="/company/projects" element={<CompanyDashboard />} />
            <Route path="/company/projects/new" element={<CompanyDashboard />} />
            <Route path="/company/projects/:projectId" element={<ProjectDetailPage />} />
            <Route path="/company/projects/:projectId/blocks" element={<ProjectBlocksPage />} />
            <Route path="/company/projects/:projectId/overview" element={<ProjectDetailPage />} />
            <Route path="/company/projects/:projectId/layout" element={<ProjectDetailPage />} />
            <Route path="/company/projects/:projectId/documents" element={<ProjectDetailPage />} />
            <Route path="/company/projects/:projectId/settings" element={<ProjectDetailPage />} />
            
            {/* Client Routes */}
            <Route path="/company/clients" element={<CompanyDashboard />} />
            <Route path="/company/clients/new" element={<CompanyDashboard />} />
            <Route path="/company/clients/:clientId" element={<ClientDetailPage />} />
            
            {/* Sales & Allocation Routes */}
            <Route path="/company/sales" element={<CompanyDashboard />} />
            <Route path="/company/sales-allocations" element={<CompanyDashboard />} />
            <Route path="/company/sales-allocations/new" element={<CompanyDashboard />} />
            
            {/* Accounting Routes */}
            <Route path="/company/accounting" element={<CompanyDashboard />} />
            <Route path="/company/accounting/summary" element={<CompanyDashboard />} />
            <Route path="/company/accounting/expense/new" element={<CompanyDashboard />} />
            <Route path="/company/accounting/payment/new" element={<CompanyDashboard />} />
            <Route path="/company/accounting/invoice/:id" element={<CompanyDashboard />} />
            
            {/* Team & Roles Routes */}
            <Route path="/company/team" element={<CompanyDashboard />} />
            <Route path="/company/settings/team" element={<CompanyDashboard />} />
            
            {/* Reports Routes */}
            <Route path="/company/reports" element={<CompanyDashboard />} />
            
            {/* Advanced Tools Routes */}
            <Route path="/company/tools/crm-pipelines" element={<CompanyDashboard />} />
            <Route path="/company/tools/calendar" element={<CompanyDashboard />} />
            <Route path="/company/tools/document-manager" element={<CompanyDashboard />} />
            
            {/* Other Routes */}
            <Route path="/company/settings" element={<CompanyDashboard />} />
            <Route path="/company/referrals" element={<CompanyDashboard />} />
            <Route path="/company/help" element={<CompanyDashboard />} />
            
            {/* Catch-all route - MUST be last */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
