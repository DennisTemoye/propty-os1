
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X, Monitor, Tablet, Smartphone } from 'lucide-react';
import { useResponsive } from '@/hooks/use-responsive';

export function MobileWarningBanner() {
  const [dismissed, setDismissed] = useState(false);
  const { isMobile, isSmallScreen } = useResponsive();

  // Check if banner was dismissed in this session
  useEffect(() => {
    const isDismissed = sessionStorage.getItem('proptyos-mobile-banner-dismissed');
    if (isDismissed) {
      setDismissed(true);
    }
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem('proptyos-mobile-banner-dismissed', 'true');
  };

  if (!isSmallScreen || dismissed) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 text-white shadow-lg">
      <Card className="mx-3 my-2 bg-white/10 backdrop-blur-sm border-white/20 dark:bg-white/5">
        <div className="p-3 sm:p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <div className="flex gap-1 mt-0.5 flex-shrink-0">
                {isMobile ? (
                  <Smartphone className="h-4 w-4 text-white/90" />
                ) : (
                  <>
                    <Monitor className="h-4 w-4 text-white/90" />
                    <Tablet className="h-4 w-4 text-white/90" />
                  </>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm mb-1 text-white">
                  {isMobile ? 'Mobile Experience Notice' : 'Optimized for Larger Screens'}
                </h3>
                <p className="text-xs text-white/90 leading-relaxed">
                  ProptyOS is optimized for desktop or tablet use. You can continue on {isMobile ? 'mobile' : 'this device'}, 
                  but for the best experience, we recommend using a larger screen.
                </p>
                <div className="flex gap-2 mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDismiss}
                    className="text-xs bg-white/20 border-white/30 text-white hover:bg-white/30 hover:text-white"
                  >
                    Continue Using {isMobile ? 'Mobile' : 'Device'}
                  </Button>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDismiss}
              className="h-6 w-6 text-white/80 hover:text-white hover:bg-white/20 flex-shrink-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
