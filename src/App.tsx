
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from './components/ThemeProvider';
import { Clients } from './components/dashboard/Clients';
import { Projects } from './components/dashboard/Projects';
import { Reports } from './components/dashboard/Reports';
import { CRMPipelines } from './components/dashboard/CRMPipelines';
import { FeesCollection } from './components/dashboard/FeesCollection';
import { Accounting } from './components/dashboard/Accounting';
import { MarketersCommission } from './components/dashboard/MarketersCommission';
import ProjectDetailPage from './pages/ProjectDetailPage';
import ProjectBlocksPage from './pages/ProjectBlocksPage';
import AddClientPage from './pages/AddClientPage';
import Index from './pages/Index';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/company/dashboard" element={<div className="p-6"><h1 className="text-2xl font-bold">Dashboard</h1><p>Dashboard coming soon...</p></div>} />
            <Route path="/company/clients" element={<Clients />} />
            <Route path="/company/clients/add" element={<AddClientPage />} />
            <Route path="/company/projects" element={<Projects />} />
            <Route path="/company/projects/:projectId" element={<ProjectDetailPage />} />
            <Route path="/company/projects/:projectId/blocks" element={<ProjectBlocksPage />} />
            <Route path="/company/accounting" element={<Accounting />} />
            <Route path="/company/reports" element={<Reports />} />
            <Route path="/company/fees" element={<FeesCollection />} />
            <Route path="/company/commissions" element={<MarketersCommission />} />
            <Route path="/company/crm-pipelines" element={<CRMPipelines />} />
            <Route path="/company/marketers" element={<div className="p-6"><h1 className="text-2xl font-bold">Marketers</h1><p>Marketers page coming soon...</p></div>} />
            <Route path="/company/sales" element={<div className="p-6"><h1 className="text-2xl font-bold">Sales & Allocation</h1><p>Sales page coming soon...</p></div>} />
            <Route path="/company/team" element={<div className="p-6"><h1 className="text-2xl font-bold">Team & Roles</h1><p>Team page coming soon...</p></div>} />
            <Route path="/company/tools/crm-pipelines" element={<CRMPipelines />} />
            <Route path="/company/tools/document-manager" element={<div className="p-6"><h1 className="text-2xl font-bold">Document Manager</h1><p>Document manager coming soon...</p></div>} />
            <Route path="/company/tools/calendar" element={<div className="p-6"><h1 className="text-2xl font-bold">Calendar & Scheduling</h1><p>Calendar coming soon...</p></div>} />
            <Route path="/company/settings" element={<div className="p-6"><h1 className="text-2xl font-bold">Settings</h1><p>Settings coming soon...</p></div>} />
            <Route path="/company/referrals" element={<div className="p-6"><h1 className="text-2xl font-bold">Referral Program</h1><p>Referral program coming soon...</p></div>} />
            <Route path="/company/help" element={<div className="p-6"><h1 className="text-2xl font-bold">Help & Support</h1><p>Help center coming soon...</p></div>} />
          </Routes>
        </Router>
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
