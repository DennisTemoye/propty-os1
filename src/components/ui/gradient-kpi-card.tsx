
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface GradientKpiCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: LucideIcon;
  gradientFrom: string;
  gradientTo: string;
  iconColor: string;
}

export function GradientKpiCard({
  title,
  value,
  subtitle,
  icon: Icon,
  gradientFrom,
  gradientTo,
  iconColor,
}: GradientKpiCardProps) {
  return (
    <div className={`bg-gradient-to-br ${gradientFrom} ${gradientTo} rounded-xl p-6 relative overflow-hidden`}>
      <div className="relative z-10">
        <div className="text-sm font-medium text-gray-600 mb-2">
          {title}
        </div>
        <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
        <div className="text-sm text-gray-500">{subtitle}</div>
      </div>
      <div className="absolute top-4 right-4">
        <Icon className={`h-8 w-8 ${iconColor} opacity-30`} />
      </div>
    </div>
  );
}
