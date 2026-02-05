import React from "react";
import { X } from "lucide-react";

const extras = [
  { name: "Kanopy", image: "https://images.unsplash.com/photo-1641064464128-81cfd55d5c8a?w=400&q=80" },
  { name: "ArtistWorks", image: "https://images.unsplash.com/photo-1643487237895-ed2e3d2eb6ca?w=400&q=80" },
  { name: "Craftsy", image: "https://images.unsplash.com/photo-1640270712121-ae4a538a8ffc?w=400&q=80" },
  { name: "Craftsy en Español", image: "https://images.unsplash.com/photo-1732714403349-05fc43b67042?w=400&q=80" },
];

export function ExtrasSection() {
  return (
    <div className="px-5">
      <div className="bg-[#1A1A1A] rounded-lg overflow-hidden">
        {extras.map((extra, i) => (
          <div key={i} className="flex border-b border-[#333] last:border-0 h-24 relative overflow-hidden group cursor-pointer">
            <div className="w-1/3 flex items-center pl-4 bg-[#111] z-10 relative">
               <span className="text-gray-200 font-medium">{extra.name}</span>
            </div>
            <div className="w-2/3 relative">
                <img src={extra.image} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" alt={extra.name} />
                <div className="absolute inset-0 bg-gradient-to-r from-[#111] to-transparent"></div>
            </div>
          </div>
        ))}
        <div className="p-4 bg-[#111] flex items-center gap-3">
            <div className="w-10 h-10 bg-white text-black font-serif font-bold text-2xl flex items-center justify-center">k</div>
            <div>
                <p className="text-sm text-gray-300">Quality movies,</p>
                <p className="text-sm text-gray-300">documentaries and...</p>
            </div>
            <button className="ml-auto bg-[#222] text-xs font-bold px-4 py-2 rounded-full hover:bg-[#333]">GET</button>
        </div>
      </div>
    </div>
  );
}
