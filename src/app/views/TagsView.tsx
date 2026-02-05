import React from "react";
import { AlignJustify, Heart } from "lucide-react";

export function TagsView() {
  return (
    <div className="bg-black min-h-full pb-20 px-5 pt-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-white text-4xl font-serif">Tags</h1>
        <button className="bg-[#00838F] hover:bg-[#0097A7] text-black font-bold text-sm px-4 py-1.5 rounded-full transition-colors">
            ACTIONS
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex gap-3 mb-8">
        <button className="w-10 h-9 bg-[#549F9B] rounded-[4px] flex items-center justify-center text-black">
            <AlignJustify className="w-5 h-5" />
        </button>
        <button className="bg-[#1A1A1A] text-gray-300 px-4 h-9 rounded-[4px] text-[15px] font-medium flex items-center">
            smart tag <span className="text-gray-500 ml-2 text-xs">1</span>
        </button>
      </div>

      {/* Tags List */}
      <div className="flex flex-col">
        {/* Favorites Item */}
        <div className="group cursor-pointer">
            <div className="flex items-center justify-between mb-1">
                <div className="flex items-center">
                    <div className="bg-[#37474F] text-white px-2 py-1 rounded-l-[4px] flex items-center gap-2 h-8">
                        <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                        <span className="font-medium text-sm">Favorites</span>
                    </div>
                    <div className="bg-[#455A64] h-8 px-1.5 rounded-r-[4px] flex items-center justify-center border-l border-white/10">
                         <div className="w-1 h-1 bg-white/50 rounded-full"></div>
                         <div className="w-1 h-1 bg-white/50 rounded-full mt-1"></div>
                    </div>
                </div>
                
                <span className="bg-[#263238] text-gray-300 text-sm font-bold px-3 py-1 rounded-full">
                    0
                </span>
            </div>
            
            <div className="mb-1">
                <span className="text-gray-300 text-[15px]">Smart Tag: Notify Me</span>
            </div>
            <div className="mb-4">
                 <span className="text-gray-500 text-sm">Created 3 Feb 2026.</span>
            </div>
            
            {/* Divider */}
            <div className="h-[1px] bg-[#222] w-full"></div>
        </div>
      </div>

      {/* Flourish Decoration */}
      <div className="mt-32 flex justify-center opacity-20">
         <svg width="60" height="20" viewBox="0 0 60 20" fill="none" stroke="white" strokeWidth="2">
             <path d="M5 10 C 15 10, 15 15, 25 15 C 35 15, 35 5, 45 5 C 55 5, 55 10, 60 10" strokeLinecap="round" />
             <path d="M10 12 C 18 12, 20 16, 26 16" strokeWidth="1" opacity="0.5" />
         </svg>
      </div>
    </div>
  );
}
