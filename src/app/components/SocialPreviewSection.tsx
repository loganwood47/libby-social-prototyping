import React from "react";
import { Coffee, UserCheck, Users, History, ChevronRight, MessageCircle, Heart, Clock } from "lucide-react";

// Sample data for social previews
const BOOK_CLUB_PREVIEW = {
  clubName: "The Midnight Readers",
  currentBook: "The Silent Ocean",
  coverImage: "https://images.unsplash.com/photo-1563818072824-ed3d6ff52955?w=400&q=80",
  nextMeeting: "Tuesday, 8 PM",
  recentActivity: "3 new comments",
  members: 8
};

const FOLLOWED_ACCOUNTS_PREVIEW = [
  {
    id: 1,
    name: "Sarah Jenkins",
    username: "@sarahreads",
    recentBook: "The Inner Calm",
    coverImage: "https://images.unsplash.com/photo-1557752281-d4b2e550aba9?w=400&q=80",
    action: "finished reading",
    timeAgo: "2h ago"
  },
  {
    id: 2,
    name: "Dr. Robert Chen",
    username: "@drchen",
    recentBook: "Patterns of Thought",
    coverImage: "https://images.unsplash.com/photo-1687093777245-bc60c636ddf0?w=400&q=80",
    action: "started reading",
    timeAgo: "5h ago"
  }
];

const FRIENDS_PREVIEW = [
  {
    id: 1,
    name: "Jessica R.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    currentlyReading: "Pride & Prejudice",
    sharedBooks: 12
  },
  {
    id: 2,
    name: "Michael T.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    currentlyReading: "The Hobbit",
    sharedBooks: 8
  },
  {
    id: 3,
    name: "Emma L.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    currentlyReading: "Dune",
    sharedBooks: 15
  }
];

const SHARED_READING_HISTORY = [
  {
    id: 1,
    book: "My Brilliant Friend",
    coverImage: "https://images.unsplash.com/photo-1641064464128-81cfd55d5c8a?w=400&q=80",
    readers: ["You", "Jessica R.", "Emma L."],
    totalReaders: 3,
    discussions: 7
  }
];

interface SocialPreviewSectionProps {
  onBookClubsClick?: () => void;
  onAccountsClick?: () => void;
  onFriendsClick?: () => void;
  onSharedHistoryClick?: () => void;
}

export function SocialPreviewSection({ 
  onBookClubsClick, 
  onAccountsClick,
  onFriendsClick,
  onSharedHistoryClick 
}: SocialPreviewSectionProps) {
  return (
    <div className="px-5 pb-6 pt-4 bg-gradient-to-b from-black via-[#0A0A0A] to-black">
      {/* Section Title */}
      <div className="mb-4">
        <h2 className="text-white text-xl font-bold mb-1">Connect & Discover</h2>
        <p className="text-gray-400 text-sm">See what your friends are reading and join book clubs</p>
      </div>

      {/* Social Features Grid */}
      <div className="flex flex-col gap-4">
        
        {/* Libby Book Clubs Preview */}
        <div onClick={onBookClubsClick} className="bg-gradient-to-br from-[#1A1A1A] to-[#2A1A2A] rounded-2xl overflow-hidden border border-[#333] hover:border-[#A72B4B] transition-all cursor-pointer group">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#A72B4B] rounded-full flex items-center justify-center">
                  <Coffee className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-base group-hover:text-[#00E5FF] transition-colors">Libby Book Clubs</h3>
                  <p className="text-gray-400 text-xs">Your reading communities</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-[#00E5FF] transition-colors" />
            </div>
            
            {/* Preview Content */}
            <div className="bg-black/30 rounded-xl p-3 flex gap-3">
              <img 
                src={BOOK_CLUB_PREVIEW.coverImage} 
                alt={BOOK_CLUB_PREVIEW.currentBook}
                className="w-16 h-20 object-cover rounded shadow-lg"
              />
              <div className="flex-1 flex flex-col justify-center">
                <p className="text-[#00E5FF] text-xs font-medium mb-0.5">{BOOK_CLUB_PREVIEW.clubName}</p>
                <p className="text-white text-sm font-medium mb-1">{BOOK_CLUB_PREVIEW.currentBook}</p>
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {BOOK_CLUB_PREVIEW.nextMeeting}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3 h-3" />
                    {BOOK_CLUB_PREVIEW.recentActivity}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Accounts You Follow Preview */}
        <div onClick={onAccountsClick} className="bg-gradient-to-br from-[#1A1A1A] to-[#1A2A2A] rounded-2xl overflow-hidden border border-[#333] hover:border-[#00838F] transition-all cursor-pointer group">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#00838F] rounded-full flex items-center justify-center">
                  <UserCheck className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-base group-hover:text-[#00E5FF] transition-colors">Accounts You Follow</h3>
                  <p className="text-gray-400 text-xs">Recent activity from readers you follow</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-[#00E5FF] transition-colors" />
            </div>
            
            {/* Preview Content - Activity Feed */}
            <div className="space-y-2">
              {FOLLOWED_ACCOUNTS_PREVIEW.map(account => (
                <div key={account.id} className="bg-black/30 rounded-xl p-3 flex gap-3 items-center">
                  <img 
                    src={account.coverImage} 
                    alt={account.recentBook}
                    className="w-10 h-14 object-cover rounded shadow"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{account.name} <span className="text-gray-500 text-xs font-normal">{account.username}</span></p>
                    <p className="text-gray-400 text-xs">
                      {account.action} <span className="text-[#00E5FF]">{account.recentBook}</span>
                    </p>
                    <p className="text-gray-500 text-xs">{account.timeAgo}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Two-Column Layout for Friends and Shared History */}
        <div className="grid grid-cols-2 gap-4">
          
          {/* Friends Preview */}
          <div onClick={onFriendsClick} className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A1A] rounded-2xl overflow-hidden border border-[#333] hover:border-[#00838F] transition-all cursor-pointer group">
            <div className="p-3">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-[#00838F] rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 text-black" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-bold text-sm group-hover:text-[#00E5FF] transition-colors truncate">Friends</h3>
                  <p className="text-gray-400 text-xs truncate">Connect with readers</p>
                </div>
              </div>
              
              {/* Friends Avatars Preview */}
              <div className="flex -space-x-3 mb-2">
                {FRIENDS_PREVIEW.slice(0, 4).map((friend, idx) => (
                  <div 
                    key={friend.id}
                    className="w-10 h-10 rounded-full border-2 border-[#1A1A1A] overflow-hidden"
                    style={{ zIndex: 10 - idx }}
                  >
                    <img src={friend.avatar} alt={friend.name} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <p className="text-gray-400 text-xs">
                <span className="text-[#00E5FF] font-medium">{FRIENDS_PREVIEW.length} friends</span> are currently reading
              </p>
            </div>
            <div className="bg-black/30 px-3 py-2 flex items-center justify-between">
              <span className="text-xs text-gray-400">View all</span>
              <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-[#00E5FF] transition-colors" />
            </div>
          </div>

          {/* Shared Reading History Preview */}
          <div onClick={onSharedHistoryClick} className="bg-gradient-to-br from-[#1A1A1A] to-[#1A2A1A] rounded-2xl overflow-hidden border border-[#333] hover:border-[#00838F] transition-all cursor-pointer group">
            <div className="p-3">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-[#00838F] rounded-full flex items-center justify-center">
                  <History className="w-4 h-4 text-black" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-bold text-sm group-hover:text-[#00E5FF] transition-colors truncate">Shared Reads</h3>
                  <p className="text-gray-400 text-xs truncate">Books you've both read</p>
                </div>
              </div>
              
              {/* Shared Book Preview */}
              <div className="bg-black/30 rounded-lg p-2 mb-2">
                <img 
                  src={SHARED_READING_HISTORY[0].coverImage} 
                  alt={SHARED_READING_HISTORY[0].book}
                  className="w-full h-16 object-cover rounded shadow mb-1"
                />
                <p className="text-white text-xs font-medium truncate">{SHARED_READING_HISTORY[0].book}</p>
              </div>
              <p className="text-gray-400 text-xs">
                <span className="text-[#00E5FF] font-medium">{SHARED_READING_HISTORY[0].totalReaders} readers</span> • {SHARED_READING_HISTORY[0].discussions} discussions
              </p>
            </div>
            <div className="bg-black/30 px-3 py-2 flex items-center justify-between">
              <span className="text-xs text-gray-400">Explore</span>
              <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-[#00E5FF] transition-colors" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}