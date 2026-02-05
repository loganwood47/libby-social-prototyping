import React from "react";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white font-sans flex justify-center overflow-hidden">
      <div className="w-full max-w-md bg-black relative flex flex-col h-[100dvh]">
        {children}
      </div>
    </div>
  );
}
