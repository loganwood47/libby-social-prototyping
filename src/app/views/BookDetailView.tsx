import React from "react";
import { ChevronLeft, Share, Star, Clock, CheckCircle, Zap, Users, Headphones, ThumbsUp, ThumbsDown, BookOpen, Heart } from "lucide-react";
import { BookAvailability } from "../components/AvailabilityBadge";

// Friend reading data type
export interface FriendReading {
  id: number;
  name: string;
  avatar: string;
  rating?: number;
  status: 'read' | 'reading' | 'want_to_read';
  review?: string;
  finishedDate?: string;
}

// Extended book type with all detail data
export interface BookDetail {
  id: number;
  title: string;
  author: string;
  image: string;
  description: string;
  rating: number;
  reviewCount: number;
  duration?: string;
  isAudiobook?: boolean;
  availability: BookAvailability;
  friendsWhoRead?: FriendReading[];
  genres?: string[];
  pageCount?: number;
  publishDate?: string;
}

interface BookDetailViewProps {
  book: BookDetail;
  onBack: () => void;
  onViewReviews: () => void;
}

export function BookDetailView({ book, onBack, onViewReviews }: BookDetailViewProps) {
  const { 
    title, 
    author, 
    image, 
    description, 
    rating, 
    reviewCount, 
    duration, 
    isAudiobook,
    availability,
    friendsWhoRead = [],
    genres = [],
    pageCount,
    publishDate
  } = book;

  // Calculate friends who liked it
  const friendsWhoLiked = friendsWhoRead.filter(f => f.rating && f.rating >= 4);
  const friendsCurrentlyReading = friendsWhoRead.filter(f => f.status === 'reading');
  const friendsWhoFinished = friendsWhoRead.filter(f => f.status === 'read');

  return (
    <div className="bg-black min-h-full pb-24 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#1a1a1a] to-transparent px-4 pt-14 pb-8 sticky top-0 z-30">
        <div className="flex items-center justify-between">
          <button onClick={onBack} className="text-white hover:text-[#00E5FF] transition-colors">
            <ChevronLeft className="w-7 h-7" />
          </button>
          <button className="text-[#00E5FF] hover:text-white transition-colors">
            <Share className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="px-5 -mt-4">
        {/* Book Cover and Basic Info */}
        <div className="flex gap-5 mb-6">
          {/* Cover */}
          <div className="w-32 shrink-0">
            <div className="relative aspect-[2/3] rounded-sm overflow-hidden shadow-2xl">
              <img src={image} alt={title} className="w-full h-full object-cover" />
              {isAudiobook && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/90 py-1.5 flex items-center justify-center gap-1.5">
                  <Headphones className="w-3.5 h-3.5 text-white" />
                  <span className="text-[10px] font-bold text-white uppercase tracking-wide">{duration}</span>
                </div>
              )}
            </div>
          </div>

          {/* Title, Author, Quick Stats */}
          <div className="flex-1 flex flex-col justify-center">
            <h1 className="text-white text-2xl font-bold leading-tight mb-1">{title}</h1>
            <p className="text-gray-400 text-base mb-3">{author}</p>
            
            {/* Rating */}
            <button onClick={onViewReviews} className="flex items-center gap-2 mb-3 group">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star 
                    key={star} 
                    className={`w-4 h-4 ${star <= Math.round(rating) ? 'fill-[#00838F] text-[#00838F]' : 'fill-none text-gray-600'}`} 
                  />
                ))}
              </div>
              <span className="text-[#00838F] text-sm underline group-hover:text-[#00E5FF]">
                {reviewCount.toLocaleString()} reviews
              </span>
            </button>

            {/* Genres */}
            {genres.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {genres.slice(0, 3).map(genre => (
                  <span key={genre} className="text-xs text-gray-400 bg-[#1a1a1a] px-2 py-1 rounded">
                    {genre}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* AVAILABILITY SECTION - Very prominent */}
        <AvailabilityCard availability={availability} isAudiobook={isAudiobook} />

        {/* SOCIAL PROOF SECTION - Who in your network has read this */}
        {friendsWhoRead.length > 0 && (
          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#1a2a2a] rounded-2xl p-4 mb-6 border border-[#333]">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-[#00838F]" />
              <h2 className="text-white font-bold text-lg">From Your Network</h2>
            </div>

            {/* Summary Stats */}
            <div className="flex gap-4 mb-4 pb-4 border-b border-[#333]">
              {friendsWhoFinished.length > 0 && (
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#00E5FF]" />
                  <span className="text-gray-300 text-sm">
                    <span className="text-white font-medium">{friendsWhoFinished.length}</span> friend{friendsWhoFinished.length !== 1 ? 's' : ''} read this
                  </span>
                </div>
              )}
              {friendsWhoLiked.length > 0 && (
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-pink-400 fill-pink-400" />
                  <span className="text-gray-300 text-sm">
                    <span className="text-white font-medium">{friendsWhoLiked.length}</span> loved it
                  </span>
                </div>
              )}
            </div>

            {/* Individual Friend Cards */}
            <div className="space-y-3">
              {friendsWhoRead.slice(0, 3).map(friend => (
                <FriendReadingCard key={friend.id} friend={friend} />
              ))}
            </div>

            {friendsWhoRead.length > 3 && (
              <button className="w-full mt-3 text-[#00838F] text-sm font-medium hover:text-[#00E5FF] transition-colors">
                See all {friendsWhoRead.length} friends →
              </button>
            )}
          </div>
        )}

        {/* Currently Reading - Urgency signal */}
        {friendsCurrentlyReading.length > 0 && (
          <div className="bg-[#00838F]/10 border border-[#00838F]/30 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {friendsCurrentlyReading.slice(0, 3).map((friend, idx) => (
                  <img 
                    key={friend.id}
                    src={friend.avatar} 
                    alt={friend.name}
                    className="w-8 h-8 rounded-full border-2 border-black object-cover"
                    style={{ zIndex: 10 - idx }}
                  />
                ))}
              </div>
              <p className="text-[#00E5FF] text-sm">
                <span className="font-medium">
                  {friendsCurrentlyReading.map(f => f.name.split(' ')[0]).slice(0, 2).join(' & ')}
                </span>
                {friendsCurrentlyReading.length > 2 && ` +${friendsCurrentlyReading.length - 2} more`}
                {' '}reading now
              </p>
            </div>
          </div>
        )}

        {/* Description */}
        <div className="mb-6">
          <h2 className="text-white font-bold text-lg mb-3">About this book</h2>
          <p className="text-gray-300 text-[15px] leading-relaxed">{description}</p>
        </div>

        {/* Quick Details */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {pageCount && (
            <div className="bg-[#1a1a1a] rounded-lg p-3">
              <p className="text-gray-500 text-xs uppercase mb-1">Pages</p>
              <p className="text-white font-medium">{pageCount}</p>
            </div>
          )}
          {publishDate && (
            <div className="bg-[#1a1a1a] rounded-lg p-3">
              <p className="text-gray-500 text-xs uppercase mb-1">Published</p>
              <p className="text-white font-medium">{publishDate}</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          {availability.status === 'available' || availability.status === 'high_demand' ? (
            <button className="w-full bg-[#00838F] hover:bg-[#0097A7] text-black font-bold py-4 px-6 rounded-full transition-colors text-lg uppercase tracking-wide">
              Borrow Now
            </button>
          ) : (
            <button className="w-full bg-[#333] hover:bg-[#444] text-white font-bold py-4 px-6 rounded-full transition-colors text-lg uppercase tracking-wide">
              Place Hold
            </button>
          )}
          <button className="w-full bg-transparent border border-[#333] hover:border-[#00838F] text-white font-bold py-3 px-6 rounded-full transition-colors">
            Save for Later
          </button>
        </div>
      </div>
    </div>
  );
}

// Availability Card Component - Very prominent
function AvailabilityCard({ availability, isAudiobook }: { availability: BookAvailability; isAudiobook?: boolean }) {
  const { status, copiesAvailable, totalCopies, estimatedWaitDays } = availability;

  if (status === 'available') {
    return (
      <div className="bg-emerald-500/20 border-2 border-emerald-500/50 rounded-2xl p-5 mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-black" />
          </div>
          <div>
            <h2 className="text-emerald-400 font-bold text-xl">Available Now</h2>
            <p className="text-emerald-300/70 text-sm">No waiting - borrow instantly</p>
          </div>
        </div>
        {copiesAvailable && totalCopies && (
          <div className="mt-3 flex items-center gap-2">
            <div className="flex-1 h-2 bg-emerald-900/50 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-500 rounded-full"
                style={{ width: `${(copiesAvailable / totalCopies) * 100}%` }}
              />
            </div>
            <span className="text-emerald-400 text-sm font-medium">
              {copiesAvailable} of {totalCopies} available
            </span>
          </div>
        )}
      </div>
    );
  }

  if (status === 'high_demand') {
    return (
      <div className="bg-amber-500/20 border-2 border-amber-500/50 rounded-2xl p-5 mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center animate-pulse">
            <Zap className="w-6 h-6 text-black" />
          </div>
          <div>
            <h2 className="text-amber-400 font-bold text-xl">High Demand</h2>
            <p className="text-amber-300/70 text-sm">Available now, but going fast!</p>
          </div>
        </div>
        {copiesAvailable && totalCopies && (
          <div className="mt-3 flex items-center gap-2">
            <div className="flex-1 h-2 bg-amber-900/50 rounded-full overflow-hidden">
              <div 
                className="h-full bg-amber-500 rounded-full"
                style={{ width: `${(copiesAvailable / totalCopies) * 100}%` }}
              />
            </div>
            <span className="text-amber-400 text-sm font-medium">
              Only {copiesAvailable} left!
            </span>
          </div>
        )}
      </div>
    );
  }

  // Coming soon / unavailable
  return (
    <div className="bg-gray-500/10 border-2 border-gray-500/30 rounded-2xl p-5 mb-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
          <Clock className="w-6 h-6 text-gray-300" />
        </div>
        <div>
          <h2 className="text-gray-300 font-bold text-xl">Currently Unavailable</h2>
          {estimatedWaitDays && (
            <p className="text-gray-400 text-sm">
              Estimated wait: ~{estimatedWaitDays} days
            </p>
          )}
        </div>
      </div>
      <p className="text-gray-500 text-sm mt-2">
        Place a hold and we'll notify you when it's ready
      </p>
    </div>
  );
}

// Friend Reading Card
function FriendReadingCard({ friend }: { friend: FriendReading }) {
  const statusText = friend.status === 'read' 
    ? 'Read' 
    : friend.status === 'reading' 
      ? 'Currently reading'
      : 'Wants to read';

  return (
    <div className="flex gap-3 items-start">
      <img 
        src={friend.avatar} 
        alt={friend.name}
        className="w-10 h-10 rounded-full object-cover shrink-0"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-white font-medium text-sm">{friend.name}</span>
          {friend.rating && (
            <div className="flex items-center gap-1">
              {friend.rating >= 4 ? (
                <ThumbsUp className="w-3 h-3 text-emerald-400 fill-emerald-400" />
              ) : friend.rating <= 2 ? (
                <ThumbsDown className="w-3 h-3 text-red-400 fill-red-400" />
              ) : null}
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star 
                    key={star}
                    className={`w-2.5 h-2.5 ${star <= friend.rating! ? 'fill-[#00838F] text-[#00838F]' : 'fill-none text-gray-600'}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
        <p className="text-gray-500 text-xs mb-1">{statusText} {friend.finishedDate && `• ${friend.finishedDate}`}</p>
        {friend.review && (
          <p className="text-gray-400 text-sm line-clamp-2">"{friend.review}"</p>
        )}
      </div>
    </div>
  );
}
