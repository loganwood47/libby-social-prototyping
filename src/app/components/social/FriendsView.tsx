import React from "react";
import { ChevronLeft, Plus, Star, Heart, MessageCircle, MoreVertical, Bookmark } from "lucide-react";

const feedItems = [
  {
    id: 1,
    user: { name: "Jessica R.", avatar: "https://images.unsplash.com/photo-1594318223885-20dc4b889f9e?w=200&q=80" },
    action: "finished reading",
    time: "2h ago",
    content: {
      type: "book",
      title: "The Silent Ocean",
      author: "Marion D.",
      image: "https://images.unsplash.com/photo-1612094264296-0a0fc161e367?w=600&q=80",
      rating: 5,
      review: "Absolutely breathtaking. The way the author describes the underwater scenes is just magical. Couldn't put it down!"
    },
    likes: 24,
    comments: 3
  },
  {
    id: 2,
    user: { name: "Marcus T.", avatar: "https://images.unsplash.com/flagged/photo-1576507643602-a0ab95093c1f?w=200&q=80" },
    action: "is currently reading",
    time: "5h ago",
    content: {
      type: "status",
      title: "Modern Architecture",
      author: "David S.",
      image: "https://images.unsplash.com/photo-1769490315625-6e669d53e698?w=600&q=80",
      progress: "45%"
    },
    likes: 12,
    comments: 0
  },
  {
    id: 3,
    user: { name: "Elena K.", avatar: "https://images.unsplash.com/photo-1652549752120-d9beb4c86bd4?w=200&q=80" },
    action: "shared a tag",
    time: "1d ago",
    content: {
      type: "tag",
      tagName: "Summer Mysteries",
      count: 12,
      images: [
        "https://images.unsplash.com/photo-1711185892790-4cabb6701cb8?w=300&q=80",
        "https://images.unsplash.com/photo-1769963121626-7f1885db412c?w=300&q=80",
        "https://images.unsplash.com/photo-1769987935906-0dce6d6a635a?w=300&q=80"
      ]
    },
    likes: 45,
    comments: 8
  }
];

interface FriendsViewProps {
  onBack: () => void;
}

export function FriendsView({ onBack }: FriendsViewProps) {
  return (
    <div className="bg-black min-h-full pb-20 animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="bg-[#0D2626] px-4 py-4 flex items-center justify-between border-b border-[#1A3A3A] sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="text-[#00E5FF] p-2 -ml-2 hover:bg-white/5 rounded-full">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h2 className="text-white text-xl font-bold">Friends</h2>
        </div>
        <button className="text-[#00E5FF] hover:bg-[#00838F]/10 p-2 rounded-full">
          <Plus className="w-6 h-6" />
        </button>
      </div>

      <div className="flex flex-col gap-6 py-6">
        {feedItems.map((item) => (
          <div key={item.id} className="border-b border-[#222] pb-6 last:border-0">
            {/* Feed Header */}
            <div className="px-5 flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-[#333] overflow-hidden cursor-pointer">
                  <img src={item.user.avatar} alt={item.user.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="flex items-baseline gap-1.5 flex-wrap">
                    <span className="text-white font-bold text-[15px]">{item.user.name}</span>
                    <span className="text-gray-400 text-sm">{item.action}</span>
                  </div>
                  <span className="text-gray-500 text-xs">{item.time}</span>
                </div>
              </div>
              <button className="text-gray-500 hover:text-white">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>

            {/* Content Area */}
            <div className="px-5">
              {item.content.type === 'book' && (
                <div className="bg-[#1A1A1A] rounded-xl overflow-hidden border border-[#333]">
                  <div className="flex flex-col sm:flex-row">
                    <div className="w-full sm:w-1/3 aspect-[2/3] relative">
                      <img src={item.content.image} alt="Book Cover" className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-center">
                      <div className="flex items-center gap-1 text-[#FFD700] mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < (item.content.rating || 0) ? 'fill-current' : 'text-gray-600'}`} />
                        ))}
                      </div>
                      <h3 className="text-white text-lg font-bold font-serif mb-1">{item.content.title}</h3>
                      <p className="text-gray-400 text-sm mb-3">by {item.content.author}</p>
                      <p className="text-gray-300 text-sm italic border-l-2 border-[#A72B4B] pl-3 py-1">"{item.content.review}"</p>
                    </div>
                  </div>
                </div>
              )}

              {item.content.type === 'status' && (
                <div className="bg-[#1A1A1A] rounded-xl p-4 border border-[#333] flex gap-4 items-center">
                  <div className="w-16 h-24 shrink-0 rounded shadow-md overflow-hidden">
                    <img src={item.content.image} alt="Book Cover" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-medium mb-1">{item.content.title}</h3>
                    <p className="text-gray-400 text-sm mb-3">{item.content.author}</p>
                    <div className="w-full bg-[#333] h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#00E5FF] h-full rounded-full" style={{ width: item.content.progress }}></div>
                    </div>
                    <p className="text-[#00E5FF] text-xs mt-1.5 font-medium">{item.content.progress} complete</p>
                  </div>
                </div>
              )}

              {item.content.type === 'tag' && (
                <div className="bg-[#1A1A1A] rounded-xl p-4 border border-[#333]">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="bg-[#A72B4B] p-1.5 rounded text-white">
                      <Bookmark className="w-4 h-4" />
                    </div>
                    <span className="text-white font-medium">{item.content.tagName}</span>
                    <span className="text-gray-500 text-sm">({item.content.count} books)</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {item.content.images?.map((img, idx) => (
                      <div key={idx} className="aspect-[2/3] rounded-md overflow-hidden relative">
                        <img src={img} className="w-full h-full object-cover" alt="" />
                        {idx === 2 && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <span className="text-white font-bold text-lg">+{item.content.count && item.content.count - 3}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="px-5 mt-4 flex items-center gap-6">
              <button className="flex items-center gap-2 text-gray-400 hover:text-[#FF4081] transition-colors group">
                <Heart className="w-6 h-6 group-hover:fill-current" />
                <span className="text-sm font-medium">{item.likes}</span>
              </button>
              <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <MessageCircle className="w-6 h-6" />
                <span className="text-sm font-medium">{item.comments}</span>
              </button>
              <button className="flex items-center gap-2 text-gray-400 hover:text-[#00E5FF] transition-colors ml-auto">
                <Plus className="w-6 h-6" />
                <span className="text-sm font-medium">Borrow</span>
              </button>
            </div>
          </div>
        ))}

        <div className="text-center py-6">
          <p className="text-gray-500 text-sm">You're all caught up!</p>
        </div>
      </div>
    </div>
  );
}
