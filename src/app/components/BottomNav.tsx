import { Search, Library, Menu, Book, Tag } from "lucide-react";

interface BottomNavProps {
  activeTab: 'search' | 'library' | 'menu' | 'shelf' | 'timeline';
  onTabChange: (tab: 'search' | 'library' | 'menu' | 'shelf' | 'timeline') => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <div className="h-[60px] bg-[#111111] border-t border-[#222] flex items-center justify-around px-2 relative z-50 shrink-0">
      
      <button 
        onClick={() => onTabChange('search')}
        className={`flex flex-col items-center justify-center w-12 h-12 hover:text-white transition-colors ${activeTab === 'search' ? 'text-[#D37F2F]' : 'text-gray-400'}`}
      >
        <Search className="w-6 h-6" />
        {activeTab === 'search' && (
           <div className="h-[4px] w-[20px] bg-[#D37F2F] rounded-t-lg absolute bottom-0 shadow-[0_0_8px_rgba(211,127,47,0.6)]"></div>
        )}
      </button>

      <button 
        onClick={() => onTabChange('library')}
        className={`flex flex-col items-center justify-center w-12 h-12 relative group hover:text-white transition-colors ${activeTab === 'library' ? 'text-[#D37F2F]' : 'text-[#D37F2F] opacity-50'}`}
      >
        <Library className="w-6 h-6" />
        {activeTab === 'library' && (
             <div className="h-[6px] w-[34px] bg-[#D37F2F] rounded-t-lg absolute -bottom-1 shadow-[0_0_10px_rgba(211,127,47,0.5)]"></div>
        )}
      </button>

      {/* Center "Libby" Button */}
      <button 
        onClick={() => onTabChange('menu')}
        className="flex flex-col items-center justify-center w-14 h-14 -mt-8 bg-[#111111] rounded-full border-[5px] border-[#111111] relative z-10 shadow-2xl active:scale-95 transition-transform"
      >
        <div className="w-10 h-10 rounded-full border-[1.5px] border-gray-400 flex items-center justify-center overflow-hidden bg-white relative">
             <div className="absolute inset-0 bg-[#E0F2F1]"></div> 
             <div className="absolute top-[8px] right-[8px] w-3 h-3 bg-[#FF4081] rounded-full z-20"></div> 
             <div className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 w-8 h-8 bg-[#333] rounded-full z-10"></div> 
        </div>
      </button>

      <button 
        onClick={() => onTabChange('shelf')}
        className={`flex flex-col items-center justify-center w-12 h-12 hover:text-white transition-colors ${activeTab === 'shelf' ? 'text-[#D37F2F]' : 'text-gray-400'}`}
      >
        <Book className="w-6 h-6" />
        {activeTab === 'shelf' && (
            <div className="h-[4px] w-[20px] bg-[#D37F2F] rounded-t-lg absolute bottom-0 shadow-[0_0_8px_rgba(211,127,47,0.6)]"></div>
        )}
      </button>

      <button 
        onClick={() => onTabChange('timeline')}
        className={`flex flex-col items-center justify-center w-12 h-12 hover:text-white transition-colors ${activeTab === 'timeline' ? 'text-[#D37F2F]' : 'text-gray-400'}`}
      >
        <Tag className="w-6 h-6" />
        {activeTab === 'timeline' && (
            <div className="h-[4px] w-[20px] bg-[#D37F2F] rounded-t-lg absolute bottom-0 shadow-[0_0_8px_rgba(211,127,47,0.6)]"></div>
        )}
      </button>
    </div>
  );
}

