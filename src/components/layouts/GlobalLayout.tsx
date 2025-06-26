
import React from 'react';
import { cn } from '@/lib/utils';
import { useBreakpoints } from '@/hooks/use-breakpoints';

interface GlobalLayoutProps {
  children: React.ReactNode;
  className?: string;
  sidebar?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  fullWidth?: boolean;
  formLayout?: boolean;
}

export function GlobalLayout({ 
  children, 
  className, 
  sidebar, 
  header, 
  footer,
  fullWidth = true,
  formLayout = false
}: GlobalLayoutProps) {
  const { isSmallScreen } = useBreakpoints();

  return (
    <div className={cn(
      "min-h-screen bg-background flex flex-col w-full",
      className
    )}>
      {/* Header - only shown on small screens when sidebar is present */}
      {header && isSmallScreen && (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          {header}
        </header>
      )}

      <div className="flex flex-1 w-full min-h-0">
        {/* Sidebar - Fixed on desktop, overlay on mobile/tablet */}
        {sidebar && (
          <>
            {isSmallScreen ? (
              // Mobile/Tablet overlay sidebar
              <aside className="fixed inset-y-0 left-0 z-40 w-64 transform transition-transform bg-white border-r">
                {sidebar}
              </aside>
            ) : (
              // Desktop fixed sidebar - permanently fixed
              <aside className="fixed top-0 left-0 h-screen w-[260px] z-40 bg-white border-r overflow-y-auto">
                {sidebar}
              </aside>
            )}
          </>
        )}

        {/* Main Content */}
        <main className={cn(
          "flex-1 min-h-screen",
          // Desktop: full width with sidebar offset
          sidebar && !isSmallScreen && "ml-[260px] w-[calc(100%-260px)]",
          // Mobile: full width
          isSmallScreen && "w-full"
        )}>
          <div className={cn(
            "w-full h-full min-h-screen",
            formLayout 
              ? "max-w-3xl mx-auto px-4 py-6" 
              : "w-full px-6 py-4"
          )}>
            {children}
          </div>
        </main>
      </div>

      {/* Footer */}
      {footer && (
        <footer className={cn(
          "border-t bg-background",
          sidebar && !isSmallScreen && "ml-[260px]"
        )}>
          {footer}
        </footer>
      )}
    </div>
  );
}
