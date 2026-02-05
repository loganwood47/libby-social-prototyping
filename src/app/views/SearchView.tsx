import React, { useState, useEffect } from "react";
import { Search, X, ChevronLeft, Filter, Headphones, MoreVertical, Plus, Tag, Calendar, ChevronDown, AlignJustify, ChevronsUpDown, Share, Star, ChevronRight, CreditCard, Loader2, CheckCircle2, Clock, Zap, CheckCircle, Users, Flame } from "lucide-react";
import imgGabrielleCover from 'figma:asset/93eeec261bc09dca00bbfb89454040b0b68f2316.png';
import { BookRating } from "../components/BookRating";
import { BookAvailability } from "../components/AvailabilityBadge";

export function SearchView({ onNavigateToShelf }: { onNavigateToShelf: () => void }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewState, setViewState] = useState<'search' | 'results' | 'details' | 'borrow'>('search');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.toLowerCase() === "self help") {
      setViewState('results');
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setViewState('search');
  };

  if (viewState === 'borrow') {
      return (
          <BorrowBookView 
            onBack={() => setViewState('details')} 
            onBorrowSuccess={onNavigateToShelf}
          />
      )
  }

  if (viewState === 'details') {
      return (
          <BookDetailsView 
            onBack={() => setViewState('results')} 
            onSearch={() => setViewState('search')}
            onBorrow={() => setViewState('borrow')}
          />
      )
  }

  if (viewState === 'results') {
    return (
      <SearchResultsView 
        query={searchQuery} 
        onBack={clearSearch} 
        onBookClick={() => setViewState('details')}
      />
    );
  }

  return (
    <div className="p-5">
      {/* Header with Search Input and Logo */}
      <div className="flex gap-4 items-center mb-8">
        <div className="flex-1 bg-[#0D2626] rounded-full h-12 flex items-center px-4 border border-[#1A3A3A] relative">
            <Search className="text-[#00838F] w-5 h-5 mr-3" />
            <input 
                type="text" 
                placeholder="Search..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
                className="bg-transparent border-none outline-none text-[#00838F] text-lg font-medium placeholder-[#006064] w-full"
            />
            {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="ml-2 text-[#006064]">
                    <X className="w-5 h-5" />
                </button>
            )}
        </div>
        {/* Logo Circle */}
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0 p-2">
            <div className="relative w-full h-full">
                <div className="absolute inset-0 bg-black rounded-full overflow-hidden">
                    <div className="absolute top-0 right-0 w-[120%] h-[120%] bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
                         <div className="absolute top-1/2 left-1/2 w-[2px] h-4 bg-white -translate-y-full origin-bottom rotate-[-30deg]"></div>
                         <div className="absolute top-1/2 left-1/2 w-[2px] h-4 bg-white -translate-y-full origin-bottom rotate-[-15deg]"></div>
                         <div className="absolute top-1/2 left-1/2 w-[2px] h-4 bg-white -translate-y-full origin-bottom rotate-[0deg]"></div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Catalog Filters */}
      <div className="mb-8">
        <h2 className="text-white text-xl font-serif mb-4 pb-2 border-b border-[#2A2A2A]">Catalog Filters</h2>
        
        <div className="flex flex-wrap gap-2">
            {/* Teal Filter Icon Button */}
            <button className="h-9 w-10 bg-[#549F9B] rounded-[4px] flex flex-col items-center justify-center gap-[3px] shadow-[0_2px_0_0_#3A7270] active:translate-y-[2px] active:shadow-none transition-all">
                <div className="w-4 h-[2px] bg-black rounded-full"></div>
                <div className="w-4 h-[2px] bg-black rounded-full"></div>
                <div className="w-4 h-[2px] bg-black rounded-full"></div>
            </button>

            <FilterTag label="books" count="536k" />
            <FilterTag label="audiobooks" count="172k" />
            <FilterTag label="magazines" count="6k" />
            <FilterTag label="available now" count="714k" />
            <FilterTag label="kindle" count="411k" />
            <FilterTag label="skip the line" icon="🍀" />
        </div>
      </div>

      {/* Recent Searches */}
      <div>
        <div className="flex items-center justify-between mb-2 pb-2 border-b border-[#2A2A2A]">
             <h2 className="text-white text-xl font-serif">Recent Searches</h2>
             <button className="bg-[#333] rounded-full p-0.5">
                 <X className="w-4 h-4 text-gray-400" />
             </button>
        </div>
        
        <div className="flex flex-col">
            <SearchItem text="Self Help" onClick={() => handleSearch("Self Help")} />
            
            <SearchItem text="Health and Fitness" onClick={() => handleSearch("Health and Fitness")} />
            <SearchItem text="Self Improvement" onClick={() => handleSearch("Self Improvement")} />
        </div>
      </div>
    </div>
  );
}

function SearchResultsView({ query, onBack, onBookClick }: { query: string, onBack: () => void, onBookClick: () => void }) {
    return (
        <div className="bg-black min-h-full pb-20">
            {/* Top Blue Header Area */}
            <div className="bg-[#004B76] pb-4 pt-14 px-4 sticky top-0 z-30">
                <div className="flex items-center gap-3 mb-6">
                    <button onClick={onBack} className="text-white">
                        <ChevronLeft className="w-7 h-7" />
                    </button>
                    <div className="flex-1 bg-[#003655] rounded-full h-10 flex items-center px-4 border border-[#005A8D] relative">
                        <Search className="text-white/70 w-4 h-4 mr-2" />
                        <span className="text-white font-medium flex-1">{query.toLowerCase()}</span>
                        <button onClick={onBack} className="bg-[#004B76] rounded-full p-0.5">
                            <X className="w-3 h-3 text-white" />
                        </button>
                    </div>
                     {/* Logo Circle (Small) */}
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shrink-0 p-1.5">
                        <div className="relative w-full h-full">
                            <div className="absolute inset-0 bg-black rounded-full overflow-hidden">
                                <div className="absolute top-0 right-0 w-[120%] h-[120%] bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
                                    <div className="absolute top-1/2 left-1/2 w-[2px] h-3 bg-white -translate-y-full origin-bottom rotate-[-30deg]"></div>
                                    <div className="absolute top-1/2 left-1/2 w-[2px] h-3 bg-white -translate-y-full origin-bottom rotate-[-15deg]"></div>
                                    <div className="absolute top-1/2 left-1/2 w-[2px] h-3 bg-white -translate-y-full origin-bottom rotate-[0deg]"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-[#81D4FA] text-xs font-bold tracking-wider mb-1 uppercase">
                    37,892 titles in
                </div>
                <h1 className="text-white text-3xl font-serif">Search Results</h1>
            </div>

            {/* Filters Bar */}
            <div className="bg-black px-4 py-3 flex gap-2 overflow-x-auto no-scrollbar sticky top-[168px] z-20 shadow-xl border-b border-[#222]">
                <button className="h-8 w-10 bg-[#549F9B] rounded-[4px] flex flex-col items-center justify-center gap-[3px] shrink-0">
                    <AlignJustify className="text-black w-5 h-5" />
                </button>
                <FilterPill label="books" count="26k" isActive />
                <FilterPill label="audiobooks" count="11k" />
                <FilterPill label="available now" icon={<Filter className="w-3 h-3 fill-current" />} />
            </div>

            {/* Pagination & Sort */}
            <div className="px-4 py-4 flex items-center justify-between border-b border-[#222]">
                <span className="text-white text-lg font-serif">Page 1 of 1,579</span>
                <button className="bg-[#333] w-8 h-8 rounded-full flex items-center justify-center text-gray-400">
                    <ChevronsUpDown className="w-5 h-5" />
                </button>
            </div>

            {/* Results List */}
            <div className="flex flex-col">
                <BookResultItem 
                    author="Gabrielle Bernstein"
                    title="Self Help"
                    onClick={onBookClick}
                    description="#1 New York Times best-selling author Gabrielle Bernstein charts a path to healing that can literally change your life — a simple, powerful method..."
                    actions={[
                        { label: "Borrow", type: "primary" },
                        { label: "Read Sample", type: "secondary" },
                        { label: "Save", type: "secondary", icon: <Tag className="w-4 h-4" /> },
                    ]}
                    availability={{ status: 'available', copiesAvailable: 5, totalCopies: 16, friendsReading: 8, trendingInNetwork: true }}
                />
                
                <BookResultItem 
                    author="Lorrie Moore"
                    title="Self-Help"
                    isAudiobook
                    duration="5 HOURS"
                    description="From the national bestselling author of A Gate at the Stairs — and a master of contemporary American fiction — comes 'a funny, cohesive, and...'"
                    actions={[
                        { label: "Place Hold", type: "primary" },
                        { label: "Play Sample", type: "secondary" },
                        { label: "Save", type: "secondary", icon: <Tag className="w-4 h-4" /> },
                    ]}
                    availability={{ status: 'coming_soon', estimatedWaitDays: 12, friendsReading: 3 }}
                />

                <BookResultItem 
                    author="Samuel Smiles"
                    title="Self-Help"
                    description="Selling 20,000 copies in the first year after its publication in 1859, Samuel Smiles' Self-Help made its author an overnight celebrity and much..."
                    actions={[
                        { label: "Borrow", type: "primary" },
                        { label: "Read Sample", type: "secondary" },
                        { label: "Save", type: "secondary", icon: <Tag className="w-4 h-4" /> },
                    ]}
                    availability={{ status: 'high_demand', copiesAvailable: 2, totalCopies: 8 }}
                />
            </div>
        </div>
    );
}

function BookDetailsView({ onBack, onSearch, onBorrow }: { onBack: () => void, onSearch: () => void, onBorrow: () => void }) {
    return (
        <div className="bg-black min-h-full pb-20 animate-in slide-in-from-right duration-300">
             {/* Header */}
             <div className="bg-[#333] px-4 pt-14 pb-4 sticky top-0 z-30 shadow-md">
                <div className="flex items-center gap-3">
                    <button onClick={onBack} className="text-gray-300 hover:text-white">
                        <ChevronLeft className="w-7 h-7" />
                    </button>
                    <div className="flex-1 bg-[#444] rounded-full h-10 flex items-center px-4 relative group cursor-pointer hover:bg-[#555] transition-colors">
                        <Search className="text-gray-400 w-4 h-4 mr-2" />
                        <span className="text-white font-medium flex-1">self help</span>
                        <button onClick={onSearch} className="bg-[#666] rounded-full p-0.5 hover:bg-[#777]">
                            <X className="w-3 h-3 text-white" />
                        </button>
                    </div>
                     {/* Logo Circle (Small) */}
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shrink-0 p-1.5">
                        <div className="relative w-full h-full">
                            <div className="absolute inset-0 bg-black rounded-full overflow-hidden">
                                <div className="absolute top-0 right-0 w-[120%] h-[120%] bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
                                    <div className="absolute top-1/2 left-1/2 w-[2px] h-3 bg-white -translate-y-full origin-bottom rotate-[-30deg]"></div>
                                    <div className="absolute top-1/2 left-1/2 w-[2px] h-3 bg-white -translate-y-full origin-bottom rotate-[-15deg]"></div>
                                    <div className="absolute top-1/2 left-1/2 w-[2px] h-3 bg-white -translate-y-full origin-bottom rotate-[0deg]"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-5">
                {/* Book Header Info */}
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h3 className="text-gray-400 text-sm font-medium mb-1 uppercase tracking-wide">GABRIELLE BERNSTEIN</h3>
                        <h1 className="text-white text-3xl font-serif">Self Help</h1>
                    </div>
                    <button className="text-[#00E5FF]">
                        <Share className="w-6 h-6" />
                    </button>
                </div>

                {/* Hero Image */}
                <div className="w-full flex justify-center mb-8">
                    <div className="w-48 shadow-2xl rounded-sm overflow-hidden relative group">
                        {/* Replaced Image with Placeholder */}
                        <BookPlaceholder title="Self Help" />
                        {/* Shadow/Depth Effect */}
                        <div className="absolute inset-0 ring-1 ring-white/10 pointer-events-none"></div>
                    </div>
                </div>
                
                {/* Rating Section */}
                <div className="flex justify-center mb-8">
                    <BookRating rating={4.5} reviewCount={2847} size="md" />
                </div>

                {/* Actions */}
                <div className="flex flex-col border-t border-[#333] border-b mb-8">
                    <button 
                        onClick={onBorrow}
                        className="flex items-center justify-between py-4 border-b border-[#333] hover:bg-white/5 px-2 -mx-2 transition-colors"
                    >
                        <span className="text-white font-bold text-lg">Borrow</span>
                        <div className="w-8 h-8 bg-[#D35F30] rounded-sm flex items-center justify-center relative shadow-sm">
                            <Plus className="text-black w-5 h-5 absolute z-10" />
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#1565C0] rounded-tl-sm"></div>
                        </div>
                    </button>
                    <button className="flex items-center justify-between py-4 border-b border-[#333] hover:bg-white/5 px-2 -mx-2 transition-colors">
                        <span className="text-white font-bold text-lg">Read Sample</span>
                    </button>
                    <button className="flex items-center justify-between py-4 hover:bg-white/5 px-2 -mx-2 transition-colors">
                        <span className="text-white font-bold text-lg">Save</span>
                        <div className="border border-white rounded px-2 py-0.5 flex items-center gap-1">
                            <Tag className="w-4 h-4 text-white fill-transparent" />
                        </div>
                    </button>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                    <FilterPill label="similar" icon={<span className="text-gray-500">≈</span>} />
                    <FilterPill label="nonfiction" count="222k" />
                    <FilterPill label="self-improvement" count="24k" />
                    <FilterPill label="self help" count="2k" />
                </div>

                {/* Description */}
                <div className="mb-8">
                    <p className="text-white font-bold text-sm mb-4 tracking-wide text-center uppercase">** NEW YORK TIMES BESTSELLER! **</p>
                    <p className="text-gray-300 leading-relaxed text-[17px]">
                        #1 New York Times best-selling author Gabrielle Bernstein charts a path to healing that can literally change your life — a simple, powerful method informed by Internal Family Systems (IFS) Therapy.
                    </p>
                    <p className="text-gray-300 leading-relaxed text-[17px] mt-4">
                        Are you ready to unlock the greatest resource of your life? Gabby Bernstein has written the ultimate self-help guide, offering a revolutionary practice to radically rooted in love, compassion, and authenticity, has resonated with millions of readers worldwide. In these pages, Gabby empowers you to become your own inner healer. This is your chance to change your life.
                    </p>
                </div>

                {/* Reviews */}
                <div className="mb-8">
                    <h4 className="text-gray-500 text-sm font-medium uppercase mb-3">REVIEWS</h4>
                    <div className="flex flex-col gap-2">
                         <div className="flex items-center gap-2 text-[#FF4081] font-medium">
                             <Star className="w-4 h-4 fill-current" />
                             <span>Publisher's Weekly</span>
                         </div>
                         <div className="flex items-center gap-2 text-[#FF4081] font-medium">
                             <Star className="w-4 h-4 fill-current" />
                             <span>Good Reading Magazine</span>
                         </div>
                    </div>
                </div>

                {/* Metadata Table */}
                <div className="mb-12">
                    <MetaRow label="FORMAT" value="Book" />
                    <MetaRow label="LANGUAGE" value="English" />
                    <MetaRow label="AUTHOR" value="Gabrielle Bernstein" hasArrow />
                    <MetaRow label="INTRODUCTION" value="Richard C. Schwartz, Ph.D" hasArrow />
                    <MetaRow label="PUBLISHER" value="Hay House" hasArrow />
                    <MetaRow label="IMPRINT" value="Hay House LLC" hasArrow />
                    <MetaRow label="RELEASE" value="30 Dec 2024" />
                    <MetaRow label="COPIES" value="5 of 16 available" />
                    <MetaRow label="AUDIENCE" value="General Content" />
                    <MetaRow label="ACCESSIBILITY" value="Publisher Statement (EPUB)" isLink />
                    <MetaRow label="READ WITH..." value="Libby Book, EPUB (DRM), Kindle" isLink />
                </div>

                {/* Other Titles Section */}
                <div>
                    <div className="flex items-center justify-between mb-2 border-b border-[#333] pb-2">
                        <h2 className="text-white text-xl font-serif">Other Titles in List</h2>
                        <button className="bg-[#333] rounded-full w-8 h-8 flex items-center justify-center text-gray-400">
                             <ChevronLeft className="w-5 h-5" />
                        </button>
                    </div>

                     <div className="flex flex-col">
                        <BookResultItem 
                            author="Lorrie Moore"
                            title="Self-Help"
                            isAudiobook
                            duration="5 HOURS"
                            description="From the national bestselling author of A Gate at the Stairs — and a master of contemporary American fiction — comes 'a funny, cohesive, and...'"
                            actions={[
                                { label: "Place Hold", type: "primary" },
                                { label: "Play Sample", type: "secondary" },
                                { label: "Save", type: "secondary", icon: <Tag className="w-4 h-4" /> },
                            ]}
                            availability={{ status: 'coming_soon', estimatedWaitDays: 12, friendsReading: 3 }}
                        />
                        <BookResultItem 
                            author="Samuel Smiles"
                            title="Self-Help"
                            description="Selling 20,000 copies in the first year after its publication in 1859, Samuel Smiles' Self-Help made its author an overnight celebrity and much..."
                            actions={[
                                { label: "Borrow", type: "primary" },
                                { label: "Read Sample", type: "secondary" },
                                { label: "Save", type: "secondary", icon: <Tag className="w-4 h-4" /> },
                            ]}
                            availability={{ status: 'high_demand', copiesAvailable: 2, totalCopies: 8 }}
                        />
                     </div>
                </div>
            </div>
        </div>
    );
}

function BorrowBookView({ onBack, onBorrowSuccess }: { onBack: () => void, onBorrowSuccess: () => void }) {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

    const handleBorrow = () => {
        setStatus('loading');
        // Simulate API call
        setTimeout(() => {
            setStatus('success');
            // Redirect after showing success for a brief moment
            setTimeout(() => {
                onBorrowSuccess();
            }, 1500);
        }, 3000);
    };

    if (status === 'loading') {
        return (
            <div className="flex flex-col items-center justify-center min-h-full bg-[#121212] animate-in fade-in duration-300">
                <Loader2 className="w-16 h-16 text-[#FF4081] animate-spin mb-6" />
                <h2 className="text-white text-2xl font-serif font-medium">Checking out book...</h2>
            </div>
        )
    }

    if (status === 'success') {
        return (
             <div className="flex flex-col items-center justify-center min-h-full bg-[#121212] animate-in fade-in zoom-in duration-300">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-xl">
                    <CheckCircle2 className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-white text-3xl font-serif font-medium mb-2">Success!</h2>
                <p className="text-gray-400 text-lg">You have borrowed this book.</p>
            </div>
        )
    }

    return (
        <div className="bg-[#121212] min-h-full flex flex-col relative animate-in fade-in duration-300">
            {/* Header / Top Controls */}
            <div className="pt-14 px-5 flex items-start">
                <button 
                    onClick={onBack}
                    className="w-10 h-10 bg-gray-200 hover:bg-white rounded-full flex items-center justify-center transition-colors"
                >
                    <ChevronLeft className="w-6 h-6 text-black" />
                </button>
            </div>

            {/* Book Preview Section */}
            <div className="flex flex-col items-center mt-4 mb-6">
                <div className="w-32 shadow-2xl rounded-sm overflow-hidden mb-8 relative">
                    {/* Replaced Image with Placeholder */}
                    <BookPlaceholder title="Self Help" />
                </div>
                
                <h2 className="text-gray-400 text-lg mb-1">Borrowing</h2>
                <h1 className="text-white text-2xl font-bold mb-1">Self Help</h1>
                <p className="text-gray-400 text-lg">Gabrielle Bernstein</p>
            </div>

            {/* Library Card Section */}
            <div className="px-5 mb-6">
                <div className="bg-[#1A1A1A] rounded-lg p-5 border border-[#333]">
                    <h3 className="text-white font-bold text-[17px] mb-4">Los Angeles Public Library</h3>
                    
                    <div className="h-[1px] bg-[#333] w-full mb-4"></div>
                    
                    <div className="flex items-center justify-between">
                         <div className="flex items-center gap-3">
                             {/* Small Card Icon */}
                             <div className="w-8 h-5 bg-gradient-to-r from-orange-400 to-blue-500 rounded-[2px] relative overflow-hidden">
                                 <div className="absolute inset-0 flex gap-[1px]">
                                     {[...Array(6)].map((_, i) => (
                                         <div key={i} className="w-[1px] bg-black/20 h-full"></div>
                                     ))}
                                 </div>
                             </div>
                             <span className="text-white font-bold tracking-wider">27244084105967</span>
                         </div>
                         <div className="text-right">
                             <p className="text-gray-400 text-xs font-medium">0 / 30 loans</p>
                             <p className="text-gray-400 text-xs font-medium">0 / 30 holds</p>
                         </div>
                    </div>
                </div>
            </div>

            {/* Borrow Duration */}
            <div className="px-5 mb-8">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-white text-lg">Borrowing for...</span>
                    <span className="text-[#FF4081] text-lg font-bold">21 days</span>
                </div>
                <div className="h-[1px] bg-white w-full"></div>
            </div>

            {/* Borrow Button Footer */}
            <div className="mt-auto pb-12 px-12 flex justify-center">
                <button 
                    onClick={handleBorrow}
                    className="bg-[#FF4081] hover:bg-[#F50057] text-black text-lg font-bold py-3.5 px-12 rounded-full w-full max-w-xs shadow-lg transition-colors uppercase tracking-wide"
                >
                    Borrow
                </button>
            </div>
        </div>
    );
}

function MetaRow({ label, value, hasArrow, isLink }: { label: string, value: string, hasArrow?: boolean, isLink?: boolean }) {
    return (
        <div className="flex py-3 border-t border-[#222] first:border-t-0">
            <div className="w-32 shrink-0 text-gray-500 text-[13px] uppercase font-medium pt-0.5">{label}</div>
            <div className={`flex-1 flex justify-between items-center ${isLink ? 'underline decoration-dotted decoration-gray-500' : ''}`}>
                <span className={`text-[15px] ${hasArrow || isLink ? 'text-white font-medium' : 'text-gray-300'}`}>{value}</span>
                {hasArrow && <ChevronRight className="w-5 h-5 text-gray-500" />}
            </div>
        </div>
    );
}


function BookResultItem({ 
    author, 
    title, 
    description, 
    actions, 
    isAudiobook, 
    duration,
    extraInfo,
    onClick,
    rating = 4.5,
    reviewCount = 2847,
    availability
}: { 
    author: string, 
    title: string, 
    description: string, 
    actions: { label: string, type: 'primary' | 'secondary', icon?: React.ReactNode }[],
    isAudiobook?: boolean,
    duration?: string,
    extraInfo?: React.ReactNode,
    onClick?: () => void,
    rating?: number,
    reviewCount?: number,
    availability?: BookAvailability
}) {
    // Render availability badge for search results
    const renderAvailabilityBadge = () => {
        if (!availability) return null;
        
        const { status, copiesAvailable, estimatedWaitDays, friendsReading, trendingInNetwork } = availability;
        
        if (status === 'available') {
            return (
                <div className="absolute top-0 right-0 z-10">
                    <div className="bg-emerald-500 text-black font-bold uppercase tracking-wide text-[8px] px-1.5 py-0.5 flex items-center gap-1">
                        <CheckCircle className="w-2.5 h-2.5" />
                        <span>Now</span>
                    </div>
                </div>
            );
        }
        
        if (status === 'high_demand') {
            return (
                <div className="absolute bottom-0 left-0 right-0 z-10">
                    <div className="bg-amber-500 text-black font-bold uppercase tracking-wide text-[8px] py-0.5 flex items-center justify-center gap-1 animate-pulse">
                        <Zap className="w-2.5 h-2.5" />
                        <span>{copiesAvailable ? `${copiesAvailable} left` : 'High Demand'}</span>
                    </div>
                </div>
            );
        }
        
        return null;
    };
    
    // Render inline availability info (wait time, social signals)
    const renderAvailabilityInfo = () => {
        if (!availability) return null;
        
        const { status, estimatedWaitDays, friendsReading, trendingInNetwork } = availability;
        
        return (
            <div className="flex flex-col gap-1 mt-1">
                {status === 'coming_soon' && estimatedWaitDays && (
                    <div className="flex items-center gap-1 text-gray-400 text-[10px]">
                        <Clock className="w-2.5 h-2.5" />
                        <span>~{estimatedWaitDays} day{estimatedWaitDays !== 1 ? 's' : ''} wait</span>
                    </div>
                )}
                {trendingInNetwork && (
                    <div className="flex items-center gap-1 text-[10px]">
                        <Flame className="w-2.5 h-2.5 text-orange-400 fill-orange-400" />
                        <span className="text-orange-400 font-medium">Trending</span>
                        {friendsReading && friendsReading > 0 && (
                            <span className="text-gray-500">• {friendsReading} friends</span>
                        )}
                    </div>
                )}
                {!trendingInNetwork && friendsReading && friendsReading > 0 && (
                    <div className="flex items-center gap-1 text-[10px]">
                        <Users className="w-2.5 h-2.5 text-[#00838F]" />
                        <span className="text-[#00838F] font-medium">{friendsReading} friend{friendsReading !== 1 ? 's' : ''} reading</span>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="p-4 border-b border-[#222] cursor-pointer" onClick={onClick}>
            <div className="flex justify-between items-start mb-2">
                <div>
                    <div className="text-gray-300 text-[15px]">{author}</div>
                    <div className="text-white font-bold text-lg">{title}</div>
                </div>
                
                {/* Plus/Tag Icon Combo */}
                <div className="flex items-center">
                    <div className="w-8 h-8 bg-[#D35F30] rounded-l-md flex items-center justify-center border-r border-black/20">
                         <Plus className="text-black w-5 h-5" />
                    </div>
                     <div className="w-4 h-8 bg-[#1565C0] rounded-r-md"></div>
                </div>
            </div>

            <div className="flex gap-4">
                {/* Book Cover Placeholder */}
                <div className="w-[100px] shrink-0 flex flex-col gap-2">
                    {/* Reuse BookPlaceholder or similar design */}
                    <div className="aspect-[2/3] relative rounded-sm overflow-hidden shadow-lg bg-[#222] border border-[#333] flex items-center justify-center p-2 text-center">
                        <span className="text-gray-500 text-xs font-medium font-serif leading-tight">{title}</span>
                        
                        {/* Availability Badge Overlay */}
                        {renderAvailabilityBadge()}
                        
                        {isAudiobook && (
                            <div className="absolute bottom-0 left-0 right-0 bg-black/80 py-1 px-2 flex items-center justify-center gap-1">
                                <Headphones className="w-3 h-3 text-white" />
                                <span className="text-[10px] font-bold text-white uppercase">{duration}</span>
                            </div>
                        )}
                    </div>
                    
                    {/* Rating */}
                    <BookRating rating={rating} reviewCount={reviewCount} size="sm" />
                    
                    {/* Availability Info (wait time, social) */}
                    {renderAvailabilityInfo()}
                </div>

                {/* Content & Actions */}
                <div className="flex-1 min-w-0">
                    <div className="flex flex-col gap-0 mb-4 border-b border-[#222] pb-2">
                        {actions.map((action, idx) => (
                            <button 
                                key={idx} 
                                className={`text-left py-2.5 flex items-center gap-2 text-[15px] font-medium border-b border-[#222] last:border-0 ${
                                    action.type === 'primary' ? 'text-[#00E5FF]' : 'text-gray-200'
                                }`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}
                            >
                                {action.label}
                                {action.icon}
                            </button>
                        ))}
                    </div>
                    {extraInfo}
                </div>
            </div>

            {/* Description Footer */}
            <div className="mt-3 text-gray-400 text-[13px] leading-relaxed line-clamp-3">
                {description}
            </div>
        </div>
    );
}

function FilterPill({ label, count, icon, isActive }: { label: string, count?: string, icon?: React.ReactNode, isActive?: boolean }) {
    return (
        <button className={`h-8 px-3 rounded-[4px] flex items-center gap-2 text-[15px] font-medium whitespace-nowrap transition-colors ${
            isActive ? 'bg-[#1A1A1A] text-white border border-[#333]' : 'bg-[#1A1A1A] text-gray-300'
        }`}>
            <span>{label}</span>
            {count && <span className="text-gray-500 text-xs">{count}</span>}
            {icon && <span className="text-gray-400">{icon}</span>}
        </button>
    )
}

function FilterTag({ label, count, icon }: { label: string, count?: string, icon?: React.ReactNode }) {
    return (
        <button className="bg-[#1A1A1A] hover:bg-[#252525] h-9 px-3 rounded-[4px] flex items-center gap-2 text-[15px] font-medium transition-colors">
            <span className="text-gray-200">{label}</span>
            {count && <span className="text-gray-500 text-xs">{count}</span>}
            {icon && <span className="text-green-500">{icon}</span>}
        </button>
    )
}

function SearchItem({ text, onClick }: { text: string, onClick?: () => void }) {
    return (
        <button 
            onClick={onClick}
            className="text-left py-4 text-lg text-gray-300 border-b border-[#2A2A2A] hover:text-white hover:bg-white/5 px-2 -mx-2 transition-colors w-full"
        >
            {text}
        </button>
    )
}

function BookPlaceholder({ title, small }: { title: string, small?: boolean }) {
    return (
        <div className={`aspect-[2/3] relative rounded-sm overflow-hidden shadow-lg bg-[#222] border border-[#333] flex items-center justify-center p-2 text-center w-full`}>
            <span className={`text-gray-500 font-medium font-serif leading-tight ${small ? 'text-[10px]' : 'text-sm'}`}>
                {title}
            </span>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        </div>
    )
}