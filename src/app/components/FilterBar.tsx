import { ArrowUpDown, CheckCircle, Star, MessageSquare } from "lucide-react";

interface PillProps {
  label: string;
  active?: boolean;
  hasSortIcon?: boolean;
  count?: string;
  onClick?: () => void;
  showCheckmark?: boolean;
  icon?: React.ReactNode;
}

export function Pill({ label, active = false, hasSortIcon = false, count, onClick, showCheckmark = false, icon }: PillProps) {
  return (
    <button 
      onClick={onClick}
      className={`
        h-9 px-4 rounded-[4px] flex items-center gap-2 text-[15px] font-medium transition-all
        ${active 
          ? 'bg-[#4B8F8C] text-black shadow-[0_2px_0_0_#3A7270]' 
          : 'bg-[#1A1A1A] text-gray-200 hover:bg-[#2A2A2A]'
        }
      `}
    >
      {showCheckmark && active && <CheckCircle className="w-3.5 h-3.5" />}
      {icon && <span className={active ? 'opacity-100' : 'opacity-70'}>{icon}</span>}
      <span>{label}</span>
      {hasSortIcon && <ArrowUpDown className="w-3 h-3 opacity-50" />}
      {count && <span className={`text-xs ml-1 ${active ? 'opacity-70' : 'opacity-50'}`}>{count}</span>}
    </button>
  );
}

export type SortOption = 'most_reviews' | 'highest_rated' | 'random' | null;

export type FilterState = {
  availableNow: boolean;
  sortBy: SortOption;
};

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  availableCount?: number;
}

export function FilterBar({ filters, onFilterChange, availableCount }: FilterBarProps) {
  const handleSortChange = (sortBy: SortOption) => {
    onFilterChange({
      ...filters,
      sortBy: filters.sortBy === sortBy ? null : sortBy
    });
  };

  const handleAvailableNowToggle = () => {
    onFilterChange({
      ...filters,
      availableNow: !filters.availableNow
    });
  };

  return (
    <div className="px-5 py-4 flex flex-wrap gap-3 items-start">
       {/* Teal Hamburger Menu Button */}
       <button className="h-9 w-12 bg-[#549F9B] rounded-[8px] flex flex-col items-center justify-center gap-[3px] relative shadow-[0_4px_0_0_#3A7270] hover:translate-y-[2px] hover:shadow-[0_2px_0_0_#3A7270] active:translate-y-[4px] active:shadow-none transition-all mr-1">
          <div className="w-5 h-[2px] bg-black rounded-full"></div>
          <div className="w-5 h-[2px] bg-black rounded-full"></div>
          <div className="w-3 h-[2px] bg-black rounded-full mr-auto ml-[14px]"></div>
          
          {/* Notification dot */}
          <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#00E5FF] rounded-full border-2 border-black z-10 shadow-sm"></div>
       </button>
       
       <Pill 
         label="most reviews" 
         icon={<MessageSquare className="w-3.5 h-3.5" />}
         hasSortIcon 
         active={filters.sortBy === 'most_reviews'}
         onClick={() => handleSortChange('most_reviews')}
       />
       <Pill 
         label="highest rated" 
         icon={<Star className="w-3.5 h-3.5" />}
         hasSortIcon 
         active={filters.sortBy === 'highest_rated'}
         onClick={() => handleSortChange('highest_rated')}
       />
       <Pill 
         label="random" 
         hasSortIcon 
         active={filters.sortBy === 'random'}
         onClick={() => handleSortChange('random')}
       />
       <Pill 
         label="available now" 
         count={availableCount ? `${availableCount}` : undefined}
         active={filters.availableNow}
         onClick={handleAvailableNowToggle}
         showCheckmark
       />
    </div>
  );
}
