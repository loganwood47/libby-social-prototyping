import React, { useState } from "react";
import { ChevronLeft, Star, ThumbsUp, MessageCircle, Flag, ChevronDown, Filter } from "lucide-react";

// Types
export interface Review {
  id: number;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  title?: string;
  content: string;
  helpfulCount: number;
  commentsCount: number;
  isVerifiedReader?: boolean;
  readingFormat?: 'ebook' | 'audiobook';
}

export interface BookInfo {
  title: string;
  author: string;
  coverImage?: string;
  rating: number;
  reviewCount: number;
}

// Mock Reviews Data
export const MOCK_REVIEWS: Review[] = [
  {
    id: 1,
    userName: "Sarah M.",
    userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    rating: 5,
    date: "Jan 28, 2026",
    title: "Life-changing perspective on self-healing",
    content: "This book completely transformed how I approach my inner work. Gabby's integration of IFS therapy with her spiritual teachings creates a powerful framework for healing. I found myself highlighting almost every page. The exercises at the end of each chapter are practical and profound.",
    helpfulCount: 147,
    commentsCount: 12,
    isVerifiedReader: true,
    readingFormat: 'ebook'
  },
  {
    id: 2,
    userName: "Michael T.",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    rating: 4,
    date: "Jan 15, 2026",
    title: "Great concepts, some repetition",
    content: "The core ideas in this book are excellent and the IFS approach is explained clearly for beginners. I took off one star because some concepts are repeated across chapters. Still, this is a valuable addition to anyone's self-help library.",
    helpfulCount: 89,
    commentsCount: 5,
    isVerifiedReader: true,
    readingFormat: 'audiobook'
  },
  {
    id: 3,
    userName: "Emma L.",
    userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    rating: 5,
    date: "Jan 10, 2026",
    content: "Listened to the audiobook and Gabby's narration adds so much warmth to the material. She really practices what she preaches. The meditation exercises are particularly powerful when heard rather than read.",
    helpfulCount: 234,
    commentsCount: 18,
    isVerifiedReader: true,
    readingFormat: 'audiobook'
  },
  {
    id: 4,
    userName: "David K.",
    rating: 3,
    date: "Dec 28, 2025",
    title: "Good but not groundbreaking",
    content: "If you're already familiar with IFS therapy, you might not find much new here. However, for newcomers to this approach, it's a gentle and accessible introduction. The writing is clear and the examples are relatable.",
    helpfulCount: 45,
    commentsCount: 3,
    isVerifiedReader: false
  },
  {
    id: 5,
    userName: "Jennifer R.",
    userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80",
    rating: 5,
    date: "Dec 20, 2025",
    title: "Finally, a self-help book that delivers",
    content: "I've read dozens of self-help books and most leave me feeling inspired but without practical tools. This one is different. The step-by-step approach to working with your inner parts is something I can actually implement daily. My therapist even recommended it!",
    helpfulCount: 312,
    commentsCount: 24,
    isVerifiedReader: true,
    readingFormat: 'ebook'
  },
  {
    id: 6,
    userName: "Alex P.",
    rating: 4,
    date: "Dec 15, 2025",
    content: "Solid book with practical exercises. The chapters on dealing with protective parts were especially helpful for me. Would recommend to anyone starting their healing journey.",
    helpfulCount: 67,
    commentsCount: 2,
    isVerifiedReader: true,
    readingFormat: 'ebook'
  },
];

// Rating Distribution (would be calculated from reviews in real app)
const RATING_DISTRIBUTION = [
  { stars: 5, percentage: 68 },
  { stars: 4, percentage: 22 },
  { stars: 3, percentage: 7 },
  { stars: 2, percentage: 2 },
  { stars: 1, percentage: 1 },
];

interface ReviewsViewProps {
  book: BookInfo;
  onBack: () => void;
}

export function ReviewsView({ book, onBack }: ReviewsViewProps) {
  const [sortBy, setSortBy] = useState<'helpful' | 'recent' | 'rating'>('helpful');
  const [filterRating, setFilterRating] = useState<number | null>(null);

  const sortedReviews = [...MOCK_REVIEWS]
    .filter(r => filterRating === null || r.rating === filterRating)
    .sort((a, b) => {
      if (sortBy === 'helpful') return b.helpfulCount - a.helpfulCount;
      if (sortBy === 'recent') return new Date(b.date).getTime() - new Date(a.date).getTime();
      return b.rating - a.rating;
    });

  return (
    <div className="bg-black min-h-full pb-24 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#1a1a1a] to-black px-4 pt-14 pb-6 sticky top-0 z-30">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={onBack} className="text-white hover:text-[#00E5FF] transition-colors">
            <ChevronLeft className="w-7 h-7" />
          </button>
          <div className="flex-1">
            <h1 className="text-white text-xl font-bold">Reviews</h1>
            <p className="text-gray-400 text-sm">{book.title} by {book.author}</p>
          </div>
        </div>

        {/* Rating Summary */}
        <div className="bg-[#1a1a1a] rounded-2xl p-4 border border-[#333]">
          <div className="flex gap-6">
            {/* Overall Rating */}
            <div className="flex flex-col items-center justify-center">
              <div className="text-5xl font-bold text-white mb-1">{book.rating.toFixed(1)}</div>
              <div className="flex items-center gap-0.5 mb-1">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star 
                    key={star} 
                    className={`w-4 h-4 ${star <= Math.round(book.rating) ? 'fill-[#00838F] text-[#00838F]' : 'fill-none text-gray-600'}`} 
                  />
                ))}
              </div>
              <div className="text-gray-400 text-xs">{book.reviewCount.toLocaleString()} reviews</div>
            </div>

            {/* Rating Distribution */}
            <div className="flex-1 flex flex-col gap-1.5">
              {RATING_DISTRIBUTION.map(({ stars, percentage }) => (
                <button 
                  key={stars}
                  onClick={() => setFilterRating(filterRating === stars ? null : stars)}
                  className={`flex items-center gap-2 group ${filterRating === stars ? 'opacity-100' : filterRating !== null ? 'opacity-40' : 'opacity-100'}`}
                >
                  <span className="text-gray-400 text-xs w-3">{stars}</span>
                  <Star className="w-3 h-3 fill-[#00838F] text-[#00838F]" />
                  <div className="flex-1 h-2 bg-[#333] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#00838F] rounded-full transition-all group-hover:bg-[#00E5FF]"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-gray-500 text-xs w-8">{percentage}%</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sort & Filter Bar */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-[#222] sticky top-[200px] bg-black z-20">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <span className="text-gray-400 text-sm">
            {filterRating ? `${filterRating} star reviews` : 'All reviews'}
          </span>
          {filterRating && (
            <button 
              onClick={() => setFilterRating(null)}
              className="text-[#00838F] text-xs underline"
            >
              Clear
            </button>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-gray-500 text-sm">Sort:</span>
          <button 
            onClick={() => {
              const options: ('helpful' | 'recent' | 'rating')[] = ['helpful', 'recent', 'rating'];
              const currentIdx = options.indexOf(sortBy);
              setSortBy(options[(currentIdx + 1) % options.length]);
            }}
            className="flex items-center gap-1 text-[#00E5FF] text-sm font-medium"
          >
            {sortBy === 'helpful' ? 'Most Helpful' : sortBy === 'recent' ? 'Most Recent' : 'Highest Rated'}
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Reviews List */}
      <div className="px-4">
        {sortedReviews.map(review => (
          <ReviewCard key={review.id} review={review} />
        ))}

        {sortedReviews.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-gray-500">No reviews match your filter.</p>
            <button 
              onClick={() => setFilterRating(null)}
              className="text-[#00838F] text-sm underline mt-2"
            >
              Show all reviews
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [markedHelpful, setMarkedHelpful] = useState(false);

  const shouldTruncate = review.content.length > 200;
  const displayContent = shouldTruncate && !isExpanded 
    ? review.content.slice(0, 200) + '...' 
    : review.content;

  return (
    <div className="py-5 border-b border-[#222]">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          {review.userAvatar ? (
            <img 
              src={review.userAvatar} 
              alt={review.userName}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-[#333] flex items-center justify-center text-gray-400 font-medium">
              {review.userName.charAt(0)}
            </div>
          )}
          
          <div>
            <div className="flex items-center gap-2">
              <span className="text-white font-medium">{review.userName}</span>
              {review.isVerifiedReader && (
                <span className="text-[10px] text-[#00838F] bg-[#00838F]/20 px-1.5 py-0.5 rounded font-medium">
                  Verified
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>{review.date}</span>
              {review.readingFormat && (
                <>
                  <span>•</span>
                  <span className="capitalize">{review.readingFormat}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-0.5">
          {[1, 2, 3, 4, 5].map(star => (
            <Star 
              key={star} 
              className={`w-3.5 h-3.5 ${star <= review.rating ? 'fill-[#00838F] text-[#00838F]' : 'fill-none text-gray-600'}`} 
            />
          ))}
        </div>
      </div>

      {/* Title */}
      {review.title && (
        <h3 className="text-white font-semibold mb-2">{review.title}</h3>
      )}

      {/* Content */}
      <p className="text-gray-300 text-[15px] leading-relaxed mb-3">
        {displayContent}
        {shouldTruncate && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[#00838F] ml-1 hover:underline"
          >
            {isExpanded ? 'Show less' : 'Read more'}
          </button>
        )}
      </p>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setMarkedHelpful(!markedHelpful)}
          className={`flex items-center gap-1.5 text-sm transition-colors ${
            markedHelpful ? 'text-[#00E5FF]' : 'text-gray-500 hover:text-gray-300'
          }`}
        >
          <ThumbsUp className={`w-4 h-4 ${markedHelpful ? 'fill-current' : ''}`} />
          <span>Helpful ({markedHelpful ? review.helpfulCount + 1 : review.helpfulCount})</span>
        </button>
        
        <button className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-300 transition-colors">
          <MessageCircle className="w-4 h-4" />
          <span>{review.commentsCount} comments</span>
        </button>
        
        <button className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-300 transition-colors ml-auto">
          <Flag className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
