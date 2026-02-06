import React from "react";
import { Headphones } from "lucide-react";
import { BookRating } from "./BookRating";
import { AvailabilityBadge, BookAvailability } from "./AvailabilityBadge";
import { SocialTrendingIndicator } from "./SocialTrendingIndicator";

interface BookCardProps {
  image: string;
  title: string;
  author: string;
  duration?: string;
  isAudiobook?: boolean;
  rating?: number;
  reviewCount?: number;
  availability?: BookAvailability;
  onReviewsClick?: () => void;
  showTitle?: boolean;
  onClick?: () => void;
}

export function BookCard({ 
  image, 
  title, 
  author, 
  duration, 
  isAudiobook, 
  rating, 
  reviewCount,
  availability,
  onReviewsClick,
  showTitle = false,
  onClick
}: BookCardProps) {
  return (
    <div 
      className="snap-start shrink-0 w-[140px] flex flex-col gap-2 group cursor-pointer"
      onClick={onClick}
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-[2px] shadow-lg">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Availability Badge Overlay */}
        {availability && (
          <AvailabilityBadge availability={availability} variant="overlay" size="sm" />
        )}
        
        {/* Audio bar overlay */}
        {(isAudiobook || duration) && (
          <div className="absolute bottom-0 left-0 right-0 bg-[#1a1a1a] bg-opacity-95 h-8 flex items-center justify-center gap-2 text-[10px] font-bold tracking-wider text-white">
            <Headphones className="w-3 h-3" />
            <span>{duration || "AUDIO"}</span>
          </div>
        )}
      </div>
      
      {/* Title and Author */}
      {showTitle && (
        <div className="flex flex-col gap-0.5">
          <h3 className="text-white text-sm font-medium leading-tight line-clamp-2">{title}</h3>
          <p className="text-gray-400 text-xs truncate">{author}</p>
        </div>
      )}
      
      {/* Rating and Reviews */}
      {rating !== undefined && reviewCount !== undefined && (
        <BookRating 
          rating={rating} 
          reviewCount={reviewCount} 
          size="sm" 
          onReviewsClick={onReviewsClick}
        />
      )}
      
      {/* Inline Availability (Coming Soon wait time) */}
      {availability && (
        <AvailabilityBadge availability={availability} variant="inline" size="sm" />
      )}
      
      {/* Social Trending Indicator */}
      {availability && (availability.friendsReading || availability.trendingInNetwork) && (
        <SocialTrendingIndicator 
          friendsReading={availability.friendsReading}
          trendingInNetwork={availability.trendingInNetwork}
          size="sm"
        />
      )}
    </div>
  );
}
