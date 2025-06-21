
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Building, UserPlus, MapPin, DollarSign, CreditCard, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface QuickAction {
  label: string;
  icon: 'building' | 'user-plus' | 'pin' | 'money-out' | 'credit-card';
  linkTo: string;
}

interface QuickActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  actions?: QuickAction[];
}

const iconMap = {
  'building': Building,
  'user-plus': UserPlus,
  'pin': MapPin,
  'money-out': DollarSign,
  'credit-card': CreditCard,
};

const colorMap = {
  'building': 'text-purple-600',
  'user-plus': 'text-blue-600',
  'pin': 'text-green-600',
  'money-out': 'text-red-600',
  'credit-card': 'text-emerald-600',
};

const defaultActions: QuickAction[] = [
  {
    label: 'New Development',
    icon: 'building',
    linkTo: '/company/developments/new'
  },
  {
    label: 'New Client',
    icon: 'user-plus',
    linkTo: '/company/clients/new'
  },
  {
    label: 'New Allocation',
    icon: 'pin',
    linkTo: '/company/sales-allocations/new'
  },
  {
    label: 'New Expense',
    icon: 'money-out',
    linkTo: '/company/accounting/expense/new'
  },
  {
    label: 'New Payment',
    icon: 'credit-card',
    linkTo: '/company/accounting/payment/new'
  }
];

export function QuickActionModal({ 
  isOpen, 
  onClose, 
  actions = defaultActions 
}: QuickActionModalProps) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredActions = actions.filter(action =>
    action.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleActionClick = (linkTo: string) => {
    navigate(linkTo);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Quick Actions</DialogTitle>
          <DialogDescription>
            Choose an action to get started quickly
          </DialogDescription>
        </DialogHeader>
        
        {actions.length > 6 && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search actions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        )}

        <div className="grid grid-cols-1 gap-2 mt-4">
          {filteredActions.map((action, index) => {
            const Icon = iconMap[action.icon];
            const iconColor = colorMap[action.icon];
            
            return (
              <Button
                key={index}
                variant="ghost"
                onClick={() => handleActionClick(action.linkTo)}
                className="flex items-center justify-start space-x-3 p-4 h-auto hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <Icon className={`h-5 w-5 ${iconColor}`} />
                <span className="font-medium">{action.label}</span>
              </Button>
            );
          })}
        </div>

        {filteredActions.length === 0 && (
          <div className="text-center py-4 text-gray-500">
            No actions found matching "{searchQuery}"
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
