
import React, { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save } from 'lucide-react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { CompanySidebar } from '@/components/dashboard/CompanySidebar';
import { MobileWarningBanner } from '@/components/common/MobileWarningBanner';
import { useResponsive } from '@/hooks/use-responsive';

interface EditFormLayoutProps {
  title: string;
  description: string;
  backPath: string;
  onSave: () => void;
  onBack: () => void;
  children: ReactNode;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export function EditFormLayout({
  title,
  description,
  backPath,
  onSave,
  onBack,
  children,
  sidebarOpen,
  setSidebarOpen
}: EditFormLayoutProps) {
  const { isSmallScreen } = useResponsive();

  return (
    <div className="w-full">
      <MobileWarningBanner />
      <SidebarProvider>
        <div className={`min-h-screen flex w-full bg-gray-50 dark:bg-gray-900 ${isSmallScreen ? 'pt-16 sm:pt-20' : ''}`}>
          <CompanySidebar 
            isOpen={sidebarOpen} 
            onClose={() => setSidebarOpen(false)} 
          />
          
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden w-full">
            <main className="flex-1 overflow-auto w-full">
              <div className="w-full min-h-screen bg-gray-50">
                <div className="w-full max-w-none px-4 md:px-6 py-4">
                  <div className="mb-6">
                    <div className="flex items-center justify-between">
                      <Button 
                        variant="outline" 
                        onClick={onBack}
                        className="mb-4"
                      >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back
                      </Button>
                      
                      <Button 
                        onClick={onSave}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </Button>
                    </div>
                    
                    <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
                    <p className="text-gray-600 mt-2">{description}</p>
                  </div>

                  {children}
                </div>
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}
