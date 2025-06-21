
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface KPIOverviewCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  gradientFrom: string;
  gradientTo: string;
  linkTo: string;
}

export function KPIOverviewCard({
  title,
  value,
  subtitle,
  icon: Icon,
  gradientFrom,
  gradientTo,
  linkTo,
}: KPIOverviewCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(linkTo);
  };

  return (
    <div
      onClick={handleClick}
      className={`bg-gradient-to-tr ${gradientFrom} ${gradientTo} rounded-2xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 transform cursor-pointer`}
    >
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="text-sm font-medium text-white/80 mb-2">
              {title}
            </div>
            <div className="text-2xl font-bold text-white mb-1">{value}</div>
            {subtitle && (
              <div className="text-xs text-white/70">{subtitle}</div>
            )}
          </div>
          <div className="p-3 rounded-xl bg-white/20 shadow-sm">
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}
