import React from "react";
import { Star } from "lucide-react";

interface BookRatingProps {
  rating: number; // Rating out of 5
  reviewCount: number;
  size?: "sm" | "md" | "lg";
  showReviewLink?: boolean;
}

export function BookRating({ rating, reviewCount, size = "sm", showReviewLink = true }: BookRatingProps) {
  const starSize = size === "sm" ? "w-3 h-3" : size === "md" ? "w-4 h-4" : "w-5 h-5";
  const textSize = size === "sm" ? "text-xs" : size === "md" ? "text-sm" : "text-base";
  
  // Render 5 stars, filled based on rating
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const isFilled = i <= Math.round(rating);
      stars.push(
        <Star
          key={i}
          className={`${starSize} ${isFilled ? "fill-[#00838F] text-[#00838F]" : "fill-none text-gray-600"}`}
        />
      );
    }
    return stars;
  };

  const formatReviewCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  return (
    <div className="flex flex-col gap-1">
      {/* Stars */}
      <div className="flex items-center gap-0.5">
        {renderStars()}
      </div>
      
      {/* Review Link */}
      {showReviewLink && (
        <button className={`${textSize} text-[#00838F] hover:text-[#0097A7] underline text-left transition-colors`}>
          Read {formatReviewCount(reviewCount)} reviews
        </button>
      )}
    </div>
  );
}
