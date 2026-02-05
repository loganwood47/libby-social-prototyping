import { ChevronDown, ArrowUpDown } from "lucide-react";

interface PillProps {
  label: string;
  active?: boolean;
  hasSortIcon?: boolean;
  count?: string;
}

export function Pill({ label, active = false, hasSortIcon = false, count }: PillProps) {
  return (
    <button className={`
      h-9 px-4 rounded-[4px] flex items-center gap-2 text-[15px] font-medium transition-colors
      ${active ? 'bg-[#4B8F8C] text-black' : 'bg-[#1A1A1A] text-gray-200 hover:bg-[#2A2A2A]'}
    `}>
      <span>{label}</span>
      {hasSortIcon && <ArrowUpDown className="w-3 h-3 opacity-50" />}
      {count && <span className="opacity-50 text-xs ml-1">{count}</span>}
    </button>
  );
}

export function FilterBar() {
  return (
    <div className="px-5 py-4 flex flex-wrap gap-3 items-start">
       {/* Teal Hamburger Menu Button */}
       <button className="h-9 w-12 bg-[#549F9B] rounded-[8px] flex flex-col items-center justify-center gap-[3px] relative shadow-[0_4px_0_0_#3A7270] hover:translate-y-[2px] hover:shadow-[0_2px_0_0_#3A7270] active:translate-y-[4px] active:shadow-none transition-all mr-1">
          <div className="w-5 h-[2px] bg-black rounded-full"></div>
          <div className="w-5 h-[2px] bg-black rounded-full"></div>
          <div className="w-3 h-[2px] bg-black rounded-full mr-auto ml-[14px]"></div> {/* Aligned slightly left or right? Screenshot shows centered or slightly offset. Let's stick to centered or standard for now, but screenshot shows 3 lines. Actually looks like standard 3 lines. Let's make them equal for now or check detail. Screenshot shows bottom line might be shorter? Hard to tell, looks equal. I will stick to equal for simplicity or slightly styled. Reference says "no, i'd like a hamburger menu". */}
          
          {/* Notification dot */}
          <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#00E5FF] rounded-full border-2 border-black z-10 shadow-sm"></div>
       </button>
       
       <Pill label="newest" hasSortIcon />
       <Pill label="popular" hasSortIcon />
       <Pill label="random" hasSortIcon />
       <Pill label="available now" count="714k" />
    </div>
  );
}
