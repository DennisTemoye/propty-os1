
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from '@/components/ui/sonner';
import LandingPage from '@/pages/LandingPage';
import CompanyDashboard from '@/pages/CompanyDashboard';
import ProjectDetailPage from '@/pages/ProjectDetailPage';
import NewProjectPage from '@/pages/NewProjectPage';
import EditProjectPage from '@/pages/EditProjectPage';
import ProjectBlocksPage from '@/pages/ProjectBlocksPage';
import './App.css';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="proptyos-theme">
      <Router>
        <div className="min-h-screen">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/company/*" element={<CompanyDashboard />} />
            <Route path="/company/projects/:projectId" element={<ProjectDetailPage />} />
            <Route path="/company/projects/new" element={<NewProjectPage />} />
            <Route path="/company/projects/:projectId/edit" element={<EditProjectPage />} />
            <Route path="/company/projects/:projectId/blocks" element={<ProjectBlocksPage />} />
          </Routes>
        </div>
        <Toaster />
      </Router>
    </ThemeProvider>
  );
}

export default App;
