import React from "react";
import { ChevronLeft, Clock, Filter, MapPin } from "lucide-react";

const popularUsers = [
  { name: "Sarah J.", avatar: "https://images.unsplash.com/photo-1594318223885-20dc4b889f9e?w=200&q=80", status: "Reading 'Dune'" },
  { name: "Michael C.", avatar: "https://images.unsplash.com/flagged/photo-1576507643602-a0ab95093c1f?w=200&q=80", status: "Shared 2 reviews" },
  { name: "Elara V.", avatar: "https://images.unsplash.com/photo-1652549752120-d9beb4c86bd4?w=200&q=80", status: "Finished 'The Hobbit'" },
  { name: "David K.", avatar: "https://images.unsplash.com/photo-1601233748618-c0d3963fd030?w=200&q=80", status: "Active 5m ago" },
  { name: "Patricia M.", avatar: "https://images.unsplash.com/photo-1496672254107-b07a26403885?w=200&q=80", status: "Added 4 books" },
];

const genres = ["Mystery", "Sci-Fi", "Romance", "History", "Biographies", "Fantasy", "Cooking"];

function SectionHeader({ title, className = "" }: { title: string, className?: string }) {
  return (
    <h3 className={`text-[#00838F] text-[19px] font-medium border-b border-[#004D40] pb-2 mb-1 ${className}`}>
      {title}
    </h3>
  );
}

interface AccountsViewProps {
  onBack: () => void;
}

export function AccountsView({ onBack }: AccountsViewProps) {
  return (
    <div className="bg-black min-h-full pb-20 animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="bg-[#0D2626] px-4 py-4 flex items-center gap-4 border-b border-[#1A3A3A] sticky top-0 z-30">
        <button onClick={onBack} className="text-[#00E5FF] p-2 -ml-2 hover:bg-white/5 rounded-full">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="text-white text-xl font-bold">Accounts You Follow</h2>
      </div>

      <div className="p-5">
        {/* Most Recent Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <SectionHeader title="Most Recent Activity" className="!mb-0 !border-b-0" />
            <Filter className="w-4 h-4 text-[#00E5FF]" />
          </div>
          
          <div className="flex flex-col gap-1">
            {[1, 2, 3, 4].map((_, i) => (
              <div key={i} className="flex items-center gap-3 py-3 border-b border-[#222] group cursor-pointer hover:bg-white/5 -mx-2 px-2 rounded-lg">
                <img src={popularUsers[i].avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="text-white font-medium text-sm">{popularUsers[i].name}</h4>
                    <span className="text-gray-500 text-xs flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {i * 15 + 5}m
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs mt-0.5">Started reading <span className="text-[#00E5FF]">The Great Gatsby</span></p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* By Genre Section */}
        <div className="mb-8">
          <SectionHeader title="Browse by Genre" className="mb-4" />
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <button key={genre} className="bg-[#1A1A1A] hover:bg-[#2A2A2A] text-gray-200 px-4 py-2 rounded-full text-sm font-medium border border-[#333] transition-colors">
                {genre}
              </button>
            ))}
            <button className="text-[#00E5FF] px-4 py-2 text-sm font-medium">See all...</button>
          </div>
        </div>

        {/* Discover Readers in Your Area Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <SectionHeader title="Discover Readers in Your Area" className="!mb-0 !border-b-0" />
            <div className="flex items-center gap-1 text-[#00E5FF] text-xs font-medium bg-[#00838F]/10 px-2 py-1 rounded-full">
              <MapPin className="w-3 h-3" /> Los Angeles
            </div>
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-5 px-5 no-scrollbar">
            {popularUsers.map((user, i) => (
              <div key={i} className="flex flex-col items-center min-w-[100px] gap-2 group cursor-pointer">
                <div className="w-20 h-20 rounded-full border-2 border-[#00838F] p-[2px] relative">
                  <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                  <div className="absolute bottom-0 right-0 bg-[#00838F] w-5 h-5 rounded-full border-2 border-black flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-white font-medium text-sm">{user.name}</p>
                  <p className="text-gray-400 text-xs truncate max-w-[100px]">{user.status}</p>
                </div>
                <button className="bg-[#00838F] hover:bg-[#00A0A0] text-black px-3 py-1 rounded-full text-xs font-bold transition-colors">
                  Follow
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
