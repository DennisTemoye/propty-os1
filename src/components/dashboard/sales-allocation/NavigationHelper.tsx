
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Users, 
  Building, 
  Calculator, 
  FileText, 
  CreditCard,
  ArrowRight 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface NavigationHelperProps {
  onNavigate?: (module: string, section?: string) => void;
}

const navigationItems = [
  {
    module: 'clients',
    title: 'View Client Details',
    description: 'Check client payment history and documents',
    icon: Users,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    module: 'projects',
    title: 'Manage Units',
    description: 'View available units and project details',
    icon: Building,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
  },
  {
    module: 'accounting',
    title: 'Payment Records',
    description: 'Track payments and generate receipts',
    icon: Calculator,
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  {
    module: 'documents',
    title: 'Allocation Documents',
    description: 'Generate and manage allocation papers',
    icon: FileText,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50'
  },
  {
    module: 'fees',
    title: 'Fee Collection',
    description: 'Manage service charges and fees',
    icon: CreditCard,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50'
  }
];

export function NavigationHelper({ onNavigate }: NavigationHelperProps) {
  const navigate = useNavigate();
  
  const handleNavigation = (module: string) => {
    if (onNavigate) {
      onNavigate(module);
    } else {
      // Use React Router for navigation
      navigate(`/company/${module}`);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {navigationItems.map((item) => (
          <Card 
            key={item.module}
            className={`cursor-pointer hover:shadow-md transition-all border-2 hover:border-gray-300 ${item.bgColor}`}
            onClick={() => handleNavigation(item.module)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <item.icon className={`h-5 w-5 ${item.color}`} />
                    <h4 className="font-medium text-gray-900">{item.title}</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                  <Button variant="ghost" size="sm" className="p-0 h-auto">
                    <span className="text-sm">Go to module</span>
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
