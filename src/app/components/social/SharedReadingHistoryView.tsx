import React from "react";
import { ChevronLeft, MessageCircle, Users, Star, Book, Plus, Bookmark } from "lucide-react";

interface SharedBook {
  id: number;
  title: string;
  author: string;
  coverImage: string;
  sharedWith: string[];
  totalReaders: number;
  rating: number;
  discussions: number;
  lastActivity: string;
  highlights?: string[];
}

const SHARED_BOOKS: SharedBook[] = [
  {
    id: 1,
    title: "My Brilliant Friend",
    author: "Elena Ferrante",
    coverImage: "https://images.unsplash.com/photo-1641064464128-81cfd55d5c8a?w=400&q=80",
    sharedWith: ["Jessica R.", "Emma L."],
    totalReaders: 3,
    rating: 4.3,
    discussions: 7,
    lastActivity: "2h ago",
    highlights: ["The portrayal of friendship is stunning", "Naples comes alive in these pages"]
  },
  {
    id: 2,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    coverImage: "https://images.unsplash.com/photo-1760030427721-38c1bac5ac30?w=400&q=80",
    sharedWith: ["Michael T.", "Sarah J."],
    totalReaders: 4,
    rating: 4.9,
    discussions: 12,
    lastActivity: "5h ago",
    highlights: ["Perfect adventure story", "Tolkien's world-building is unmatched"]
  },
  {
    id: 3,
    title: "Dune",
    author: "Frank Herbert",
    coverImage: "https://images.unsplash.com/photo-1655723122539-6f4288ed14c6?w=400&q=80",
    sharedWith: ["Emma L.", "David K."],
    totalReaders: 3,
    rating: 4.7,
    discussions: 15,
    lastActivity: "1d ago",
    highlights: ["Complex political intrigue", "The ecology of Arrakis is fascinating"]
  },
  {
    id: 4,
    title: "Pride & Prejudice",
    author: "Jane Austen",
    coverImage: "https://images.unsplash.com/photo-1769963121626-7f1885db412c?w=400&q=80",
    sharedWith: ["Jessica R.", "Emma L.", "Patricia M."],
    totalReaders: 5,
    rating: 4.9,
    discussions: 23,
    lastActivity: "2d ago",
    highlights: ["Darcy's character arc is perfect", "Austen's wit never gets old"]
  },
  {
    id: 5,
    title: "The Silent Ocean",
    author: "Marion D.",
    coverImage: "https://images.unsplash.com/photo-1563818072824-ed3d6ff52955?w=400&q=80",
    sharedWith: ["Marcus T."],
    totalReaders: 2,
    rating: 4.5,
    discussions: 4,
    lastActivity: "3d ago",
    highlights: ["Underwater scenes are magical"]
  }
];

interface SharedReadingHistoryViewProps {
  onBack: () => void;
}

export function SharedReadingHistoryView({ onBack }: SharedReadingHistoryViewProps) {
  return (
    <div className="bg-black min-h-full pb-20 animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="bg-[#0D2626] px-4 py-4 flex items-center justify-between border-b border-[#1A3A3A] sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="text-[#00E5FF] p-2 -ml-2 hover:bg-white/5 rounded-full">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h2 className="text-white text-xl font-bold">Shared Reading History</h2>
        </div>
      </div>

      <div className="p-5">
        {/* Description */}
        <div className="mb-6 bg-[#1A1A1A] rounded-xl p-4 border border-[#333]">
          <p className="text-gray-300 text-sm leading-relaxed">
            Discover books you've read with friends and see their thoughts and highlights. 
            Join the conversation and share your own insights!
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar">
          <button className="bg-[#00838F] text-black px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap">
            All Books
          </button>
          <button className="bg-[#1A1A1A] hover:bg-[#2A2A2A] text-gray-300 px-4 py-2 rounded-full text-sm font-medium border border-[#333] whitespace-nowrap">
            Most Discussed
          </button>
          <button className="bg-[#1A1A1A] hover:bg-[#2A2A2A] text-gray-300 px-4 py-2 rounded-full text-sm font-medium border border-[#333] whitespace-nowrap">
            Recent Activity
          </button>
        </div>

        {/* Shared Books List */}
        <div className="space-y-4">
          {SHARED_BOOKS.map((book) => (
            <div 
              key={book.id}
              className="bg-[#1A1A1A] rounded-xl overflow-hidden border border-[#333] hover:border-[#00838F] transition-all cursor-pointer group"
            >
              <div className="flex gap-4 p-4">
                {/* Book Cover */}
                <div className="w-20 h-28 shrink-0 rounded shadow-lg overflow-hidden">
                  <img 
                    src={book.coverImage} 
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Book Details */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-bold text-base mb-1 group-hover:text-[#00E5FF] transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-2">by {book.author}</p>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-3 h-3 ${i < Math.floor(book.rating) ? 'fill-[#FFD700] text-[#FFD700]' : 'text-gray-600'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-gray-400 text-xs">{book.rating}</span>
                  </div>

                  {/* Shared With */}
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-[#00E5FF]" />
                    <p className="text-gray-300 text-xs">
                      Read by <span className="text-[#00E5FF] font-medium">you</span>
                      {book.sharedWith.length > 0 && (
                        <>
                          {" & "}
                          <span className="text-[#00E5FF] font-medium">
                            {book.sharedWith.slice(0, 2).join(", ")}
                            {book.sharedWith.length > 2 && ` +${book.sharedWith.length - 2} more`}
                          </span>
                        </>
                      )}
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-3 h-3" />
                      {book.discussions} discussions
                    </span>
                    <span className="flex items-center gap-1">
                      <Bookmark className="w-3 h-3" />
                      {book.highlights?.length || 0} highlights
                    </span>
                  </div>
                </div>
              </div>

              {/* Highlight Preview */}
              {book.highlights && book.highlights.length > 0 && (
                <div className="bg-black/30 px-4 py-3 border-t border-[#222]">
                  <p className="text-gray-300 text-xs italic mb-1">
                    "{book.highlights[0]}"
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-xs">— Highlighted by {book.sharedWith[0] || "a friend"}</span>
                    <span className="text-gray-500 text-xs">{book.lastActivity}</span>
                  </div>
                </div>
              )}

              {/* Action Button */}
              <div className="bg-black/20 px-4 py-3 flex items-center justify-between border-t border-[#222]">
                <button className="flex items-center gap-2 text-[#00E5FF] hover:text-white transition-colors text-sm font-medium">
                  <MessageCircle className="w-4 h-4" />
                  View Discussion
                </button>
                <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium">
                  <Plus className="w-4 h-4" />
                  Re-borrow
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State (shown when scrolled to bottom) */}
        <div className="text-center py-8 mt-4">
          <Book className="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-500 text-sm mb-2">Looking for more shared reads?</p>
          <button className="text-[#00E5FF] text-sm font-medium hover:underline">
            Invite friends to join Libby
          </button>
        </div>
      </div>
    </div>
  );
}
