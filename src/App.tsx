
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from './components/ThemeProvider';
import { Clients } from './components/dashboard/Clients';
import { Projects } from './components/dashboard/Projects';
import { Reports } from './components/dashboard/Reports';
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
            <Route path="/" element={<div>Dashboard Placeholder</div>} />
            <Route path="/company/dashboard" element={<div>Dashboard Placeholder</div>} />
            <Route path="/company/clients" element={<Clients />} />
            <Route path="/company/projects" element={<Projects />} />
            <Route path="/company/projects/:projectId" element={<ProjectDetailPage />} />
            <Route path="/company/projects/:projectId/blocks" element={<ProjectBlocksPage />} />
            <Route path="/company/accounting" element={<div>Accounting Placeholder</div>} />
            <Route path="/company/reports" element={<Reports />} />
            <Route path="/company/fees" element={<div>Fees Placeholder</div>} />
            <Route path="/company/commissions" element={<div>Commission Placeholder</div>} />
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
