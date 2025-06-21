
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { AllocationStatus } from '@/types/allocation';
import { Eye, Gift, CheckCircle } from 'lucide-react';

interface AllocationStatusBadgeProps {
  status: AllocationStatus;
  size?: 'sm' | 'md' | 'lg';
}

export function AllocationStatusBadge({ status, size = 'md' }: AllocationStatusBadgeProps) {
  const getStatusConfig = (status: AllocationStatus) => {
    switch (status) {
      case 'interested':
        return {
          label: 'Interested',
          className: 'bg-blue-100 text-blue-800 border-blue-200',
          icon: Eye
        };
      case 'offered':
        return {
          label: 'Offered',
          className: 'bg-orange-100 text-orange-800 border-orange-200',
          icon: Gift
        };
      case 'allocated':
        return {
          label: 'Allocated',
          className: 'bg-green-100 text-green-800 border-green-200',
          icon: CheckCircle
        };
      default:
        return {
          label: 'Unknown',
          className: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: Eye
        };
    }
  };

  const config = getStatusConfig(status);
  const Icon = config.icon;
  const iconSize = size === 'sm' ? 'h-3 w-3' : size === 'lg' ? 'h-5 w-5' : 'h-4 w-4';

  return (
    <Badge className={`${config.className} flex items-center gap-1`}>
      <Icon className={iconSize} />
      {config.label}
    </Badge>
  );
}
