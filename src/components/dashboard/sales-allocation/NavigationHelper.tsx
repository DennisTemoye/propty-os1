
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const useNavigationHelper = () => {
  const navigate = useNavigate();

  const navigateToProjects = () => {
    navigate('/company/projects');
  };

  const navigateToClients = () => {
    navigate('/company/clients');
  };

  const navigateToReports = () => {
    navigate('/company/reports');
  };

  const navigateToAccounting = () => {
    navigate('/company/accounting');
  };

  const navigateToProjectDetail = (projectId: string) => {
    navigate(`/company/projects/${projectId}`);
  };

  const navigateToClientDetail = (clientId: string) => {
    navigate(`/company/clients/${clientId}`);
  };

  const navigateToCRM = () => {
    navigate('/company/crm');
  };

  const navigateToSettings = () => {
    navigate('/company/settings');
  };

  const showComingSoon = (feature: string) => {
    toast.info(`${feature} feature coming soon!`);
  };

  return {
    navigateToProjects,
    navigateToClients,
    navigateToReports,
    navigateToAccounting,
    navigateToProjectDetail,
    navigateToClientDetail,
    navigateToCRM,
    navigateToSettings,
    showComingSoon
  };
};
