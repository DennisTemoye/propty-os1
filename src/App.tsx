
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
import MarketerDetailPage from "./pages/MarketerDetailPage";
import NewClientPage from "./pages/NewClientPage";
import NotFound from "./pages/NotFound";
import { CompanyLayout } from "./components/layouts/CompanyLayout";

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
            
            {/* All company routes wrapped in CompanyLayout */}
            <Route path="/company/*" element={<CompanyLayout />} />
            
            {/* Catch-all route - MUST be last */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
