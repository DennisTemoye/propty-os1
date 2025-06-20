
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
    <div className={`bg-gradient-to-tr ${gradientFrom} ${gradientTo} rounded-2xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 transform`}>
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="text-sm font-medium text-white/80 mb-2">
              {title}
            </div>
            <div className="text-2xl font-bold text-white mb-1">{value}</div>
            <div className="text-xs text-white/70">{subtitle}</div>
          </div>
          <div className={`p-3 rounded-xl ${iconBgColor} shadow-sm`}>
            <Icon className={`h-6 w-6 ${iconColor}`} />
          </div>
        </div>
      </div>
    </div>
  );
}
