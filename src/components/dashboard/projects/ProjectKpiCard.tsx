
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ProjectKpiCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: LucideIcon;
  bgColor: string;
  iconColor: string;
}

export function ProjectKpiCard({
  title,
  value,
  subtitle,
  icon: Icon,
  bgColor,
  iconColor,
}: ProjectKpiCardProps) {
  return (
    <div className={`${bgColor} rounded-xl p-6 relative overflow-hidden border border-gray-100/50`}>
      <div className="relative z-10">
        <div className="text-sm font-medium text-gray-600 mb-2">
          {title}
        </div>
        <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
        <div className="text-sm text-gray-500">{subtitle}</div>
      </div>
      <div className="absolute top-4 right-4 opacity-30">
        <Icon className={`h-8 w-8 ${iconColor}`} />
      </div>
    </div>
  );
}
