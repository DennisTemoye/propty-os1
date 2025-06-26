
import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface ProjectStatsCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  gradient: string;
}

export function ProjectStatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendUp = true,
  gradient,
}: ProjectStatsCardProps) {
  const TrendIcon = trendUp ? TrendingUp : TrendingDown;
  
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100/50 w-full">
      {/* Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />
      
      {/* Content */}
      <div className="relative p-4 md:p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <div className="text-xs md:text-sm font-medium text-gray-600 mb-2 truncate">
              {title}
            </div>
            <div className="text-xl md:text-3xl font-bold text-gray-900 mb-1 group-hover:scale-105 transition-transform duration-300 truncate">
              {value}
            </div>
            <div className="text-xs md:text-sm text-gray-500 truncate">{subtitle}</div>
          </div>
          
          <div className={`p-2 md:p-3 rounded-xl bg-gradient-to-br ${gradient} shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
            <Icon className="h-4 w-4 md:h-6 md:w-6 text-white" />
          </div>
        </div>
        
        {/* Trend Indicator */}
        {trend && (
          <div className="flex items-center space-x-2">
            <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
              trendUp 
                ? 'bg-emerald-100 text-emerald-700' 
                : 'bg-red-100 text-red-700'
            }`}>
              <TrendIcon className="h-3 w-3" />
              <span>{trend}</span>
            </div>
            <span className="text-xs text-gray-500 hidden sm:inline">vs last month</span>
          </div>
        )}
      </div>
      
      {/* Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 transform translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000" />
    </div>
  );
}
