import React from "react";

export function Header() {
  return (
    <div className="px-5 pt-12 pb-4 flex justify-between items-start">
      <div className="pt-2">
        <p className="text-gray-400 text-lg font-normal mb-1">Welcome to</p>
        <h1 className="text-2xl font-bold text-white leading-tight">
          Los Angeles<br />
          Public Library
        </h1>
      </div>
      
      {/* Library Logo Circle */}
      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shrink-0 p-3">
        {/* Simple geometric representation of the logo in the screenshot */}
        <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-black rounded-full overflow-hidden">
                <div className="absolute top-0 right-0 w-[120%] h-[120%] bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
                {/* Sun rays / book pages */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
                    <div className="absolute top-1/2 left-1/2 w-[2px] h-6 bg-white -translate-y-full origin-bottom rotate-[-30deg]"></div>
                    <div className="absolute top-1/2 left-1/2 w-[2px] h-6 bg-white -translate-y-full origin-bottom rotate-[-15deg]"></div>
                    <div className="absolute top-1/2 left-1/2 w-[2px] h-6 bg-white -translate-y-full origin-bottom rotate-[0deg]"></div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
