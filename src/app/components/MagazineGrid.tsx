import React from "react";

const MAGAZINES = [
  "https://images.unsplash.com/photo-1640270712121-ae4a538a8ffc?w=400&q=80",
  "https://images.unsplash.com/photo-1643487237895-ed2e3d2eb6ca?w=400&q=80",
  "https://images.unsplash.com/photo-1732714403349-05fc43b67042?w=400&q=80",
  "https://images.unsplash.com/photo-1722706731912-dde6e451e59f?w=400&q=80",
  "https://images.unsplash.com/photo-1641064464128-81cfd55d5c8a?w=400&q=80",
  "https://images.unsplash.com/photo-1752243731865-c2fa851af7ec?w=400&q=80",
  "https://images.unsplash.com/photo-1769963121626-7f1885db412c?w=400&q=80",
  "https://images.unsplash.com/photo-1710976483763-25290f0212ed?w=400&q=80",
  "https://images.unsplash.com/photo-1722706731912-dde6e451e59f?w=400&q=80"
];

export function MagazineGrid() {
  return (
    <div className="relative h-[320px] w-full overflow-hidden my-4 bg-black">
      <div className="absolute inset-0 flex flex-wrap content-center justify-center gap-2 rotate-[-15deg] scale-125 origin-center opacity-90">
          {MAGAZINES.map((src, i) => (
             <div key={i} className="w-[90px] h-[130px] shadow-2xl shrink-0 brightness-75 hover:brightness-100 transition-all duration-500 hover:scale-110 z-0 hover:z-10">
                <img src={src} className="w-full h-full object-cover rounded-[2px]" alt="Magazine" />
             </div>
          ))}
      </div>
      
      {/* Gradient Overlay for Fade Effect */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black via-transparent to-black opacity-60"></div>
    </div>
  );
}
