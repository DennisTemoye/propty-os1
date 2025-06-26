
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
    <div className="flex min-h-screen w-full bg-background">
      {/* Fixed Sidebar - Desktop */}
      {sidebar && !isSmallScreen && (
        <aside className="fixed left-0 top-0 h-screen w-[260px] bg-white border-r shadow-sm z-50 overflow-y-auto">
          {sidebar}
        </aside>
      )}

      {/* Mobile/Tablet Header */}
      {header && isSmallScreen && (
        <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-white border-b shadow-sm">
          {header}
        </header>
      )}

      {/* Mobile/Tablet Sidebar Overlay */}
      {sidebar && isSmallScreen && (
        <aside className="fixed inset-y-0 left-0 z-40 w-64 transform transition-transform bg-white border-r shadow-lg">
          {sidebar}
        </aside>
      )}

      {/* Main Content Area */}
      <main className={cn(
        "flex-1 min-h-screen",
        // Desktop: Account for fixed sidebar
        !isSmallScreen && sidebar && "ml-[260px] w-[calc(100%-260px)]",
        // Mobile/Tablet: Full width with top padding for header
        isSmallScreen && "w-full",
        isSmallScreen && header && "pt-14",
        className
      )}>
        <div className={cn(
          "h-full min-h-screen",
          formLayout 
            ? "max-w-3xl mx-auto px-4 py-6" 
            : "w-full px-6 py-4"
        )}>
          {children}
        </div>
      </main>

      {/* Footer */}
      {footer && (
        <footer className={cn(
          "border-t bg-background",
          !isSmallScreen && sidebar && "ml-[260px]"
        )}>
          {footer}
        </footer>
      )}
    </div>
  );
}
