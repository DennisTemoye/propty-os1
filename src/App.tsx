
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetCodePage from "./pages/ResetCodePage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import CompanyDashboard from "./pages/CompanyDashboard";
import LandlordDashboard from "./pages/LandlordDashboard";
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
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-code" element={<ResetCodePage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/company/dashboard" element={<CompanyDashboard />} />
            <Route path="/company/projects" element={<CompanyDashboard />} />
            <Route path="/company/projects/:projectId" element={<ProjectDetailPage />} />
            <Route path="/company/projects/:projectId/blocks" element={<ProjectBlocksPage />} />
            <Route path="/company/clients" element={<CompanyDashboard />} />
            <Route path="/company/clients/:clientId" element={<ClientDetailPage />} />
            <Route path="/company/marketers" element={<CompanyDashboard />} />
            <Route path="/company/accounting" element={<CompanyDashboard />} />
            <Route path="/company/staff" element={<CompanyDashboard />} />
            <Route path="/company/roles" element={<CompanyDashboard />} />
            <Route path="/company/documents" element={<CompanyDashboard />} />
            <Route path="/company/settings" element={<CompanyDashboard />} />
            <Route path="/company/reports" element={<CompanyDashboard />} />
            <Route path="/company/help" element={<CompanyDashboard />} />
            <Route path="/landlord/dashboard" element={<LandlordDashboard />} />
            <Route path="/landlord/properties" element={<LandlordDashboard />} />
            <Route path="/landlord/tenants" element={<LandlordDashboard />} />
            <Route path="/landlord/rent-collection" element={<LandlordDashboard />} />
            <Route path="/landlord/accounting" element={<LandlordDashboard />} />
            <Route path="/landlord/lease-documents" element={<LandlordDashboard />} />
            <Route path="/landlord/staff-vendors" element={<LandlordDashboard />} />
            <Route path="/landlord/settings" element={<LandlordDashboard />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
