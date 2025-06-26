
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { CompanySidebar } from '@/components/dashboard/CompanySidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useResponsive } from '@/hooks/use-responsive';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

export function AppLayout() {
  const location = useLocation();
  const { isMobile, isTablet } = useResponsive();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  
  // Check if current route is a company route
  const isCompanyRoute = location.pathname.startsWith('/company');
  
  // For non-company routes, render completely full-width without sidebar
  if (!isCompanyRoute) {
    return (
      <div className="full-viewport bg-white dark:bg-gray-900 no-overflow">
        <Outlet />
      </div>
    );
  }

  // For company routes, render with fixed sidebar - Paystack style
  return (
    <SidebarProvider>
      <div className="full-viewport flex bg-gray-50 dark:bg-gray-900 no-overflow">
        {/* Mobile/Tablet Sidebar Overlay */}
        {(isMobile || isTablet) && sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        {/* Fixed Sidebar - Desktop - Paystack Style */}
        <div className="fixed left-0 top-0 h-screen w-64 z-30 hidden lg:block shadow-lg">
          <CompanySidebar />
        </div>
        
        {/* Mobile Sidebar */}
        {(isMobile || isTablet) && (
          <div className={cn(
            'fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 z-50 transform transition-transform duration-300 lg:hidden shadow-2xl',
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          )}>
            <CompanySidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          </div>
        )}
        
        {/* Main Content Area - Full Width with Sidebar Offset */}
        <div className="full-width lg:ml-64 min-h-screen flex flex-col">
          {/* Mobile Header */}
          {(isMobile || isTablet) && (
            <header className="full-width bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 lg:hidden sticky top-0 z-20 shadow-sm">
              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  {sidebarOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </Button>
                <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                  ProptyOS
                </h1>
                <div className="w-9" />
              </div>
            </header>
          )}
          
          {/* Page Content - Complete Full Width */}
          <main className="flex-1 full-width no-overflow">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
