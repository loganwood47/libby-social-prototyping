import React from "react";
import { Flame, Users } from "lucide-react";

interface SocialTrendingIndicatorProps {
  friendsReading?: number;
  trendingInNetwork?: boolean;
  size?: 'sm' | 'md';
  showAvatars?: boolean;
}

// Sample friend avatars for visual display
const FRIEND_AVATARS = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
];

export function SocialTrendingIndicator({ 
  friendsReading, 
  trendingInNetwork, 
  size = 'sm',
  showAvatars = false 
}: SocialTrendingIndicatorProps) {
  // Don't render if no social signals
  if (!friendsReading && !trendingInNetwork) {
    return null;
  }

  const iconSize = size === 'sm' ? 'w-2.5 h-2.5' : 'w-3 h-3';
  const textSize = size === 'sm' ? 'text-[10px]' : 'text-xs';
  const avatarSize = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';

  // Trending in network takes priority for visual display
  if (trendingInNetwork) {
    return (
      <div className={`flex items-center gap-1 ${textSize}`}>
        <Flame className={`${iconSize} text-orange-400 fill-orange-400`} />
        <span className="text-orange-400 font-medium">Trending</span>
        {friendsReading && friendsReading > 0 && (
          <span className="text-gray-500">• {friendsReading} friends</span>
        )}
      </div>
    );
  }

  // Friends reading display
  if (friendsReading && friendsReading > 0) {
    return (
      <div className={`flex items-center gap-1.5 ${textSize}`}>
        {showAvatars && friendsReading >= 2 ? (
          <div className="flex -space-x-1.5">
            {FRIEND_AVATARS.slice(0, Math.min(friendsReading, 3)).map((avatar, idx) => (
              <div 
                key={idx}
                className={`${avatarSize} rounded-full border border-black overflow-hidden`}
                style={{ zIndex: 10 - idx }}
              >
                <img src={avatar} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
            {friendsReading > 3 && (
              <div 
                className={`${avatarSize} rounded-full border border-black bg-[#00838F] flex items-center justify-center text-[8px] font-bold text-black`}
                style={{ zIndex: 7 }}
              >
                +{friendsReading - 3}
              </div>
            )}
          </div>
        ) : (
          <Users className={`${iconSize} text-[#00838F]`} />
        )}
        <span className="text-[#00838F] font-medium">
          {friendsReading} friend{friendsReading !== 1 ? 's' : ''} reading
        </span>
      </div>
    );
  }

  return null;
}
