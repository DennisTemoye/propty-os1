
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
            <Route path="/company/dashboard" element={<CompanyDashboard />} />
            <Route path="/company/developments" element={<CompanyDashboard />} />
            <Route path="/company/developments/:projectId" element={<ProjectDetailPage />} />
            <Route path="/company/developments/:projectId/blocks" element={<ProjectBlocksPage />} />
            <Route path="/company/developments/:projectId/overview" element={<ProjectDetailPage />} />
            <Route path="/company/developments/:projectId/layout" element={<ProjectDetailPage />} />
            <Route path="/company/developments/:projectId/documents" element={<ProjectDetailPage />} />
            <Route path="/company/developments/:projectId/settings" element={<ProjectDetailPage />} />
            <Route path="/company/clients" element={<CompanyDashboard />} />
            <Route path="/company/clients/:clientId" element={<ClientDetailPage />} />
            <Route path="/company/sales" element={<CompanyDashboard />} />
            <Route path="/company/accounting" element={<CompanyDashboard />} />
            <Route path="/company/team" element={<CompanyDashboard />} />
            <Route path="/company/reports" element={<CompanyDashboard />} />
            <Route path="/company/crm" element={<CompanyDashboard />} />
            <Route path="/company/documents" element={<CompanyDashboard />} />
            <Route path="/company/calendar" element={<CompanyDashboard />} />
            <Route path="/company/settings" element={<CompanyDashboard />} />
            <Route path="/company/referrals" element={<CompanyDashboard />} />
            <Route path="/company/help" element={<CompanyDashboard />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
