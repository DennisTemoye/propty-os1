import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { CompanyLayout } from "@/components/layouts/CompanyLayout";
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
import MarketerDetailPage from "./pages/MarketerDetailPage";
import NewClientPage from "./pages/NewClientPage";
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
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/book-demo" element={<BookDemoPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-code" element={<ResetCodePage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            
            {/* Company Routes with Consistent Layout */}
            <Route path="/company/dashboard" element={<CompanyLayout><CompanyDashboard /></CompanyLayout>} />
            
            {/* Project Routes */}
            <Route path="/company/projects" element={<CompanyLayout><CompanyDashboard /></CompanyLayout>} />
            <Route path="/company/projects/new" element={<CompanyLayout><CompanyDashboard /></CompanyLayout>} />
            <Route path="/company/projects/:projectId" element={<CompanyLayout><ProjectDetailPage /></CompanyLayout>} />
            <Route path="/company/projects/:projectId/overview" element={<CompanyLayout><ProjectDetailPage /></CompanyLayout>} />
            <Route path="/company/projects/:projectId/layout" element={<CompanyLayout><ProjectDetailPage /></CompanyLayout>} />
            <Route path="/company/projects/:projectId/blocks" element={<CompanyLayout><ProjectBlocksPage /></CompanyLayout>} />
            <Route path="/company/projects/:projectId/documents" element={<CompanyLayout><ProjectDetailPage /></CompanyLayout>} />
            <Route path="/company/projects/:projectId/settings" element={<CompanyLayout><ProjectDetailPage /></CompanyLayout>} />
            
            {/* Client Routes */}
            <Route path="/company/clients" element={<CompanyLayout><CompanyDashboard /></CompanyLayout>} />
            <Route path="/company/clients/new" element={<CompanyLayout><NewClientPage /></CompanyLayout>} />
            <Route path="/company/clients/:clientId" element={<CompanyLayout><ClientDetailPage /></CompanyLayout>} />
            
            {/* Marketer Routes */}
            <Route path="/company/marketers" element={<CompanyLayout><CompanyDashboard /></CompanyLayout>} />
            <Route path="/company/marketers/new" element={<CompanyLayout><CompanyDashboard /></CompanyLayout>} />
            <Route path="/company/marketers/:marketerId" element={<CompanyLayout><MarketerDetailPage /></CompanyLayout>} />
            
            {/* Sales & Allocation Routes */}
            <Route path="/company/sales" element={<CompanyLayout><CompanyDashboard /></CompanyLayout>} />
            <Route path="/company/sales-allocations" element={<CompanyLayout><CompanyDashboard /></CompanyLayout>} />
            <Route path="/company/sales-allocations/new" element={<CompanyLayout><CompanyDashboard /></CompanyLayout>} />
            
            {/* Fees Collection Routes */}
            <Route path="/company/fees" element={<CompanyLayout><CompanyDashboard /></CompanyLayout>} />
            <Route path="/company/fees/setup" element={<CompanyLayout><CompanyDashboard /></CompanyLayout>} />
            <Route path="/company/fees/collection" element={<CompanyLayout><CompanyDashboard /></CompanyLayout>} />
            <Route path="/company/fees/monitoring" element={<CompanyLayout><CompanyDashboard /></CompanyLayout>} />
            
            {/* Accounting Routes */}
            <Route path="/company/accounting" element={<CompanyLayout><CompanyDashboard /></CompanyLayout>} />
            <Route path="/company/accounting/summary" element={<CompanyLayout><CompanyDashboard /></CompanyLayout>} />
            <Route path="/company/accounting/expense/new" element={<CompanyLayout><CompanyDashboard /></CompanyLayout>} />
            <Route path="/company/accounting/payment/new" element={<CompanyLayout><CompanyDashboard /></CompanyLayout>} />
            <Route path="/company/accounting/invoice/:id" element={<CompanyLayout><CompanyDashboard /></CompanyLayout>} />
            
            {/* Team & Roles Routes */}
            <Route path="/company/team" element={<CompanyLayout><CompanyDashboard /></CompanyLayout>} />
            <Route path="/company/settings/team" element={<CompanyLayout><CompanyDashboard /></CompanyLayout>} />
            
            {/* Reports Routes */}
            <Route path="/company/reports" element={<CompanyLayout><CompanyDashboard /></CompanyLayout>} />
            
            {/* Advanced Tools Routes */}
            <Route path="/company/tools/crm-pipelines" element={<CompanyLayout><CompanyDashboard /></CompanyLayout>} />
            <Route path="/company/tools/calendar" element={<CompanyLayout><CompanyDashboard /></CompanyLayout>} />
            <Route path="/company/tools/document-manager" element={<CompanyLayout><CompanyDashboard /></CompanyLayout>} />
            <Route path="/company/tools/send-notice" element={<CompanyLayout><CompanyDashboard /></CompanyLayout>} />
            
            {/* Other Routes */}
            <Route path="/company/settings" element={<CompanyLayout><CompanyDashboard /></CompanyLayout>} />
            <Route path="/company/referrals" element={<CompanyLayout><CompanyDashboard /></CompanyLayout>} />
            <Route path="/company/help" element={<CompanyLayout><CompanyDashboard /></CompanyLayout>} />
            
            {/* Catch-all route - MUST be last */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
