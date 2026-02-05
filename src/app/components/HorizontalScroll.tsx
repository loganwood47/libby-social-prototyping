import React, { useRef } from "react";

interface HorizontalScrollProps {
  children: React.ReactNode;
  className?: string;
}

export function HorizontalScroll({ children, className = "" }: HorizontalScrollProps) {
  return (
    <div 
      className={`flex overflow-x-auto gap-4 pb-4 pr-5 no-scrollbar snap-x snap-mandatory ${className}`}
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      {children}
    </div>
  );
}
