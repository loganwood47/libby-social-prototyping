import React from "react";

const guides = [
  { title: "Kids", color: "bg-[#FFD54F]", image: "https://images.unsplash.com/photo-1710976483763-25290f0212ed?w=400&q=80" },
  { title: "Teens", color: "bg-[#A020F0]", image: "https://images.unsplash.com/photo-1752243731865-c2fa851af7ec?w=400&q=80" },
  { title: "Available Now", color: "bg-[#004D40]", image: "https://images.unsplash.com/photo-1722706731912-dde6e451e59f?w=400&q=80" },
  { title: "More Guides", color: "bg-gradient-to-br from-[#D35400] to-[#2980B9]", isTextOnly: true, subtitle: "Magazines\nComics..." },
];

export function GuideSection() {
  return (
    <div className="grid grid-cols-2 gap-3 px-5 pb-4">
      {guides.map((guide, i) => (
        <div key={i} className={`${guide.color} aspect-[1.1/1] rounded-lg relative overflow-hidden p-4 cursor-pointer hover:opacity-95 transition-opacity`}>
           <h3 className="text-xl font-bold text-white relative z-10 drop-shadow-md">{guide.title}</h3>
           
           {!guide.isTextOnly && (
             <div className="absolute right-0 bottom-0 w-3/4 h-3/4 translate-x-1/4 translate-y-1/4">
                <img src={guide.image} className="w-full h-full object-cover rounded-tl-md shadow-lg rotate-[-5deg]" alt="" />
             </div>
           )}

           {guide.isTextOnly && guide.subtitle && (
             <p className="text-white/80 mt-4 whitespace-pre-line leading-relaxed">{guide.subtitle}</p>
           )}
           
           {/* Background Pattern Overlay (Dots/Grid) */}
           <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:10px_10px]"></div>
        </div>
      ))}
    </div>
  );
}
