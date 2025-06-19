
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface GradientKpiCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: LucideIcon;
  gradient: string;
  iconBg: string;
  iconColor: string;
  trend?: string;
  className?: string;
}

export function GradientKpiCard({
  title,
  value,
  subtitle,
  icon: Icon,
  gradient,
  iconBg,
  iconColor,
  trend,
  className = ""
}: GradientKpiCardProps) {
  return (
    <Card className={`${gradient} border-0 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-2xl overflow-hidden ${className}`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-2">
            <div className="text-sm font-semibold text-white/80 uppercase tracking-wide">
              {title}
            </div>
            <div className="text-3xl font-bold text-white">{value}</div>
            <div className="text-sm text-white/70 font-medium">{subtitle}</div>
            {trend && (
              <div className={`text-xs font-bold ${trend.startsWith('+') ? 'text-emerald-200' : 'text-red-200'} bg-white/20 px-3 py-1 rounded-full inline-block`}>
                {trend}
              </div>
            )}
          </div>
          <div className={`p-3 rounded-xl ${iconBg} shadow-sm`}>
            <Icon className={`h-6 w-6 ${iconColor}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
