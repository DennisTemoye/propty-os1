
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X, Monitor, Tablet } from 'lucide-react';
import { useResponsive } from '@/hooks/use-responsive';

export function MobileWarningBanner() {
  const [dismissed, setDismissed] = useState(false);
  const { isMobile } = useResponsive();

  if (!isMobile || dismissed) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg">
      <Card className="mx-4 my-3 bg-white/10 backdrop-blur-sm border-white/20">
        <div className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 flex-1">
              <div className="flex gap-1 mt-1">
                <Monitor className="h-4 w-4" />
                <Tablet className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm mb-1">
                  Better Experience Available
                </h3>
                <p className="text-xs text-white/90 leading-relaxed">
                  For the best ProptyOS experience, please use a PC or tablet device. 
                  Some features may be limited on mobile.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setDismissed(true)}
                  className="mt-2 text-xs bg-white/20 border-white/30 text-white hover:bg-white/30"
                >
                  Continue Anyway
                </Button>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDismissed(true)}
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
