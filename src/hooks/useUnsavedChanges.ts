
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function useUnsavedChanges(hasChanges: boolean) {
  const navigate = useNavigate();
  const [showWarning, setShowWarning] = useState(false);
  const [nextLocation, setNextLocation] = useState<string | null>(null);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasChanges]);

  const confirmNavigation = (path: string) => {
    if (hasChanges) {
      if (window.confirm('You have unsaved changes. Are you sure you want to leave?')) {
        navigate(path);
      }
    } else {
      navigate(path);
    }
  };

  return { confirmNavigation };
}
