import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from './components/ThemeProvider';
import { Dashboard } from './pages/Dashboard';
import { Clients } from './components/dashboard/Clients';
import { Projects } from './components/dashboard/Projects';
import { Accounting } from './pages/Accounting';
import { Reports } from './components/dashboard/Reports';
import { Fees } from './pages/Fees';
import { Commission } from './pages/Commission';
import { CRMPipelines } from './components/dashboard/CRMPipelines';
import ProjectDetailPage from './pages/ProjectDetailPage';
import ProjectBlocksPage from './pages/ProjectBlocksPage';

import AddClientPage from './pages/AddClientPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Router>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/company/dashboard" element={<Dashboard />} />
            <Route path="/company/clients" element={<Clients />} />
            <Route path="/company/projects" element={<Projects />} />
            <Route path="/company/projects/:projectId" element={<ProjectDetailPage />} />
            <Route path="/company/projects/:projectId/blocks" element={<ProjectBlocksPage />} />
            <Route path="/company/accounting" element={<Accounting />} />
            <Route path="/company/reports" element={<Reports />} />
            <Route path="/company/fees" element={<Fees />} />
            <Route path="/company/commissions" element={<Commission />} />
            <Route path="/company/crm-pipelines" element={<CRMPipelines />} />
            <Route path="/company/clients/add" element={<AddClientPage />} />
          </Routes>
        </Router>
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
