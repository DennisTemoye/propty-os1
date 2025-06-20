
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface GradientKpiCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: LucideIcon;
  gradientFrom: string;
  gradientTo: string;
  iconBgColor: string;
  iconColor: string;
}

export function GradientKpiCard({
  title,
  value,
  subtitle,
  icon: Icon,
  gradientFrom,
  gradientTo,
  iconBgColor,
  iconColor,
}: GradientKpiCardProps) {
  return (
    <div className={`bg-gradient-to-br ${gradientFrom} ${gradientTo} rounded-2xl shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300 transform border border-white/20`}>
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-600 mb-2">
              {title}
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
            <div className="text-xs text-gray-500">{subtitle}</div>
          </div>
          <div className={`p-3 rounded-xl ${iconBgColor} shadow-sm`}>
            <Icon className={`h-6 w-6 ${iconColor}`} />
          </div>
        </div>
      </div>
    </div>
  );
}
