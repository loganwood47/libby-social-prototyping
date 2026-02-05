import React from "react";
import { Clock, Zap, CheckCircle } from "lucide-react";

export type AvailabilityStatus = 'available' | 'coming_soon' | 'high_demand' | 'unavailable';

export interface BookAvailability {
  status: AvailabilityStatus;
  copiesAvailable?: number;
  totalCopies?: number;
  estimatedWaitDays?: number;
  friendsReading?: number;
  trendingInNetwork?: boolean;
}

interface AvailabilityBadgeProps {
  availability: BookAvailability;
  variant?: 'overlay' | 'inline';
  size?: 'sm' | 'md';
}

export function AvailabilityBadge({ availability, variant = 'overlay', size = 'sm' }: AvailabilityBadgeProps) {
  const { status, copiesAvailable, estimatedWaitDays } = availability;

  // Overlay badges for prominent states (Available Now, High Demand)
  if (variant === 'overlay') {
    if (status === 'available') {
      return (
        <div className="absolute top-0 right-0 z-10">
          <div className={`
            bg-emerald-500 text-black font-bold uppercase tracking-wide
            flex items-center gap-1 shadow-lg
            ${size === 'sm' ? 'text-[8px] px-1.5 py-0.5' : 'text-[10px] px-2 py-1'}
          `}>
            <CheckCircle className={size === 'sm' ? 'w-2.5 h-2.5' : 'w-3 h-3'} />
            <span>Now</span>
          </div>
        </div>
      );
    }

    if (status === 'high_demand') {
      return (
        <div className="absolute bottom-8 left-0 right-0 z-10">
          <div className={`
            bg-amber-500 text-black font-bold uppercase tracking-wide
            flex items-center justify-center gap-1 
            ${size === 'sm' ? 'text-[8px] py-0.5' : 'text-[10px] py-1'}
            animate-pulse
          `}>
            <Zap className={size === 'sm' ? 'w-2.5 h-2.5' : 'w-3 h-3'} />
            <span>{copiesAvailable ? `${copiesAvailable} left` : 'High Demand'}</span>
          </div>
        </div>
      );
    }

    // No overlay for coming_soon or unavailable - handled inline
    return null;
  }

  // Inline indicators for subtle states (Coming Soon wait time)
  if (variant === 'inline') {
    if (status === 'coming_soon' && estimatedWaitDays) {
      return (
        <div className={`
          flex items-center gap-1 text-gray-400
          ${size === 'sm' ? 'text-[10px]' : 'text-xs'}
        `}>
          <Clock className={size === 'sm' ? 'w-2.5 h-2.5' : 'w-3 h-3'} />
          <span>~{estimatedWaitDays} day{estimatedWaitDays !== 1 ? 's' : ''} wait</span>
        </div>
      );
    }

    if (status === 'unavailable') {
      return (
        <div className={`
          flex items-center gap-1 text-gray-500
          ${size === 'sm' ? 'text-[10px]' : 'text-xs'}
        `}>
          <Clock className={size === 'sm' ? 'w-2.5 h-2.5' : 'w-3 h-3'} />
          <span>Unavailable</span>
        </div>
      );
    }

    // Available and high_demand don't need inline indicators
    return null;
  }

  return null;
}
