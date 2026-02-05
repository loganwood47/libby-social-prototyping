import React, { useState } from "react";
import { 
  Bookmark, 
  Calendar, 
  Activity, 
  Mail, 
  ChevronRight, 
  Settings,
  BookOpen,
  X,
  Plus,
  Tag,
  Share2,
  CheckCircle2,
  Hourglass,
  Book,
  MoreVertical,
  Check,
  Headphones,
  ChevronLeft,
  Loader2
} from "lucide-react";
import { BookRating } from "../components/BookRating";

export function ShelfView({ onGoHome }: { onGoHome?: () => void }) {
  const [viewState, setViewState] = useState<'shelf' | 'loan-detail' | 'return-early'>('shelf');

  if (viewState === 'return-early') {
      return (
        <ReturnEarlyView 
            onBack={() => setViewState('loan-detail')} 
            onReturnConfirm={() => setViewState('shelf')} 
            onGoHome={onGoHome}
        />
      );
  }

  if (viewState === 'loan-detail') {
      return <LoanDetailView onBack={() => setViewState('shelf')} onReturnEarly={() => setViewState('return-early')} />;
  }

  return (
    <div className="bg-black min-h-full pb-20 px-5 pt-12">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-white text-4xl font-serif">Shelf</h1>
        <button className="bg-[#00838F] hover:bg-[#0097A7] text-black font-bold text-sm px-4 py-1.5 rounded-full transition-colors">
            ACTIONS
        </button>
      </div>

      {/* Menu List */}
      <div className="flex flex-col mb-12">
        <ShelfMenuItem 
            icon={<Bookmark className="w-6 h-6 text-[#00838F]" />} 
            label="Loans" 
            count={1} 
        />
        <ShelfMenuItem 
            icon={<Calendar className="w-6 h-6 text-[#00838F]" />} 
            label="Holds" 
            count={0} 
        />
        <ShelfMenuItem 
            icon={<Activity className="w-6 h-6 text-[#00838F]" />} 
            label="Timeline" 
        />
        <ShelfMenuItem 
            icon={<Mail className="w-6 h-6 text-[#00838F]" />} 
            label="Notices" 
        />
      </div>

      {/* Recent Loans Section */}
      <div className="mb-10">
          <div className="flex items-center justify-between mb-4 border-b border-[#2A2A2A] pb-2">
            <h2 className="text-white text-xl font-serif">Recent Loans</h2>
            <button className="bg-[#333] rounded-full p-1 text-gray-400">
                <X className="w-4 h-4" />
            </button>
          </div>

          <div 
            onClick={() => setViewState('loan-detail')}
            className="flex gap-4 p-4 -mx-4 rounded-xl hover:bg-white/5 cursor-pointer transition-colors group relative"
          >
              {/* Book Cover Placeholder */}
              <div className="w-24 shrink-0">
                  <BookPlaceholder title="Self Help" />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                      <h3 className="text-gray-300 text-sm mb-0.5">Gabrielle Bernstein</h3>
                      <h4 className="text-white font-bold text-lg leading-tight mb-4">Self Help</h4>
                  </div>

                  <div className="flex flex-col gap-0 border-t border-[#333]">
                      <div className="py-3 border-b border-[#333] text-white font-medium flex items-center justify-between">
                          Read With...
                      </div>
                      <div className="py-3 border-b border-[#333] text-white font-medium flex items-center justify-between">
                          Manage Loan
                      </div>
                      <div className="py-3 text-gray-400 text-sm flex items-center justify-between">
                          <span>Due In 21 Days</span>
                      </div>
                      <div className="text-[#81D4FA] font-bold text-sm">
                          0%
                      </div>
                  </div>
              </div>

              {/* Checkmark Icon Overlay */}
              <div className="absolute top-4 right-4">
                   <div className="w-10 h-8 bg-gradient-to-tr from-[#D35F30] to-[#1565C0] rounded-md flex items-center justify-center shadow-lg">
                       <div className="bg-white rounded-full p-0.5">
                           <Check className="w-4 h-4 text-black" />
                       </div>
                   </div>
              </div>
          </div>
      </div>

      {/* Magazine Rack Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2 border-b border-[#2A2A2A] pb-2">
            <h2 className="text-white text-xl font-serif">Magazine Rack</h2>
            <button className="text-gray-400 hover:text-white">
                <Settings className="w-5 h-5" />
            </button>
        </div>

        {/* Promo Card */}
        <div className="bg-gradient-to-br from-[#004D40] to-[#00251A] rounded-lg p-6 relative overflow-hidden min-h-[220px] border border-[#1A3A3A]">
            <p className="text-white text-lg font-serif italic mb-8 relative z-10 leading-relaxed max-w-[90%]">
                Your library has thousands of magazines with no wait lists, no loan limits, and no due dates.
            </p>

            {/* Magazine Covers Collage */}
            <div className="flex gap-[-20px] relative z-0 mt-4 overflow-x-visible">
                <MagazineCover src="https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=300&q=80" rotate="-6deg" zIndex={1} />
                <MagazineCover src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&q=80" rotate="-3deg" zIndex={2} />
                <MagazineCover src="https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&q=80" rotate="0deg" zIndex={3} isCenter />
                <MagazineCover src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&q=80" rotate="3deg" zIndex={2} />
                <MagazineCover src="https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=300&q=80" rotate="6deg" zIndex={1} />
            </div>
        </div>
      </div>
    </div>
  );
}

function LoanDetailView({ onBack, onReturnEarly }: { onBack: () => void, onReturnEarly: () => void }) {
    return (
        <div className="bg-black min-h-full pb-20 animate-in slide-in-from-right duration-300">
             {/* Header */}
            <div className="pt-12 px-5 pb-4 flex items-center justify-between bg-black sticky top-0 z-30">
                <button 
                    onClick={onBack}
                    className="flex items-center gap-1 cursor-pointer group text-[#757575] hover:text-white transition-colors"
                >
                    <ChevronLeft className="w-8 h-8" />
                    <h1 className="text-4xl font-serif">Shelf</h1>
                </button>
                <button className="bg-[#00838F] hover:bg-[#0097A7] text-black font-bold text-sm px-4 py-1.5 rounded-full transition-colors">
                    ACTIONS
                </button>
            </div>

            {/* Pull Down Indicator */}
            <div className="flex justify-center -mt-2 mb-4">
                 <div className="w-12 h-1 bg-[#333] rounded-full"></div>
            </div>

            <div className="px-5">
                {/* Book Header */}
                <div className="flex gap-4 mb-4">
                    <div className="w-16 shrink-0">
                        <BookPlaceholder title="Self Help" small />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-white text-lg font-medium">Gabrielle Bernstein</h2>
                        <h1 className="text-white text-xl font-bold mb-2">Self Help</h1>
                        <p className="text-gray-400 text-sm leading-snug line-clamp-2">
                            #1 New York Times best-selling author Gabrielle Bernstein charts a path to healing...
                        </p>
                    </div>
                    {/* Progress Circle Icon */}
                    <div className="shrink-0 pt-2">
                        <div className="w-12 h-12 rounded-full bg-white relative overflow-hidden">
                             <div className="absolute inset-0 border-4 border-white rounded-full"></div>
                             {/* Mock Pie Chart Segment */}
                             <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-black origin-bottom-left rotate-45"></div>
                             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-black rotate-[-45deg]"></div>
                             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-black rotate-[-90deg]"></div>
                             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-black rotate-[-135deg]"></div>
                             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-black rotate-[-10deg]"></div>
                        </div>
                    </div>
                </div>
                
                {/* Rating */}
                <div className="mb-4">
                    <BookRating rating={4.5} reviewCount={2847} size="sm" />
                </div>

                {/* Due Date Line */}
                <div className="flex items-center gap-3 py-4 border-t border-[#222]">
                    <div className="w-8 h-5 bg-gradient-to-r from-orange-400 to-blue-500 rounded-[2px] relative overflow-hidden shrink-0">
                         <div className="absolute inset-0 flex gap-[1px]">
                             {[...Array(6)].map((_, i) => (
                                 <div key={i} className="w-[1px] bg-black/20 h-full"></div>
                             ))}
                         </div>
                    </div>
                    <span className="text-white font-medium">Due 24 Feb, 2:29pm</span>
                    <span className="text-gray-500 ml-auto font-mono text-sm">272440841059...</span>
                </div>

                {/* Actions List */}
                <div className="border-t border-[#222]">
                    <button className="w-full text-left py-4 text-[#FF4081] font-medium border-b border-[#222] hover:bg-white/5 transition-colors">
                        Read With...
                    </button>
                    <button 
                        onClick={onReturnEarly}
                        className="w-full text-left py-4 text-[#FF4081] font-medium border-b border-[#222] hover:bg-white/5 transition-colors"
                    >
                        Return Early
                    </button>
                    <div className="flex items-center justify-between border-b border-[#222] py-4 pr-2">
                        <span className="text-gray-400">Renew Loan</span>
                        <Hourglass className="w-5 h-5 text-gray-500" />
                    </div>
                </div>

                {/* Reading Journey */}
                <div className="mt-8 bg-[#0D1515] rounded-lg p-4 flex items-center justify-between border border-[#1A2A2A]">
                    <div>
                        <h3 className="text-[#00838F] font-medium mb-1">Reading Journey</h3>
                        <p className="text-white">No progress yet.</p>
                    </div>
                    {/* Book Icon */}
                    <div className="w-12 h-10 relative">
                        <div className="absolute inset-0 bg-[#E0F7FA] transform skew-x-12 rounded-sm border-b-4 border-[#006064]"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-6 h-3 border-2 border-black rounded-full"></div>
                        </div>
                    </div>
                </div>

                {/* Tags & Share */}
                <div className="flex gap-4 mt-4">
                    <div className="flex-1 bg-[#12181F] rounded-lg p-4 border border-[#232F3E] min-h-[100px] relative">
                         <div className="flex items-center justify-between mb-2">
                             <span className="text-white font-medium">Tags</span>
                             <div className="bg-[#5C9EAD] rounded-full p-0.5">
                                 <Plus className="w-3 h-3 text-black" />
                             </div>
                         </div>
                         <div className="flex items-center gap-1 mt-auto absolute bottom-4 left-4">
                            <div className="w-6 h-8 bg-gray-300 rounded-[2px] flex items-center justify-center">
                                <div className="w-3 h-[2px] bg-black/50 mb-1"></div>
                                <div className="w-3 h-[2px] bg-black/50"></div>
                            </div>
                            <div className="w-6 h-8 bg-[#546E7A] rounded-[2px] flex items-center justify-center text-[10px] font-bold text-white">
                                8
                            </div>
                         </div>
                    </div>

                    <div className="w-[120px] bg-[#2E1A25] rounded-lg p-4 border border-[#4A2030] flex flex-col justify-between">
                         <div className="bg-[#EC407A] w-6 h-6 rounded flex items-center justify-center">
                             <span className="text-white font-bold text-xs">#</span>
                         </div>
                         <span className="text-[#F48FB1] font-medium text-sm">Share Title</span>
                    </div>
                </div>

                {/* Download Info */}
                <div className="mt-4 bg-[#1A1A1A] rounded-lg p-4 border border-[#333]">
                    <p className="text-gray-300 text-sm leading-relaxed mb-4">
                        Removing this download frees up 6.6 MB of storage on your device, but you'll need to be online when opening this title.
                    </p>
                    <div className="flex items-center justify-between">
                        <button className="text-[#00838F] font-medium text-sm hover:underline">
                            Remove Download
                        </button>
                        <div className="w-6 h-6 rounded-full border border-[#00838F] flex items-center justify-center">
                            <Check className="w-3 h-3 text-[#00838F]" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ReturnEarlyView({ onBack, onReturnConfirm, onGoHome }: { onBack: () => void, onReturnConfirm: () => void, onGoHome?: () => void }) {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

    const handleReturn = () => {
        setStatus('loading');
        // Simulate API call
        setTimeout(() => {
            setStatus('success');
        }, 2000);
    };

    if (status === 'loading') {
        return (
            <div className="flex flex-col items-center justify-center min-h-full bg-[#121212] animate-in fade-in duration-300">
                <Loader2 className="w-16 h-16 text-[#FF4081] animate-spin mb-6" />
                <h2 className="text-white text-2xl font-serif font-medium">Returning loan...</h2>
            </div>
        )
    }

    if (status === 'success') {
        return (
             <div className="flex flex-col items-center justify-center min-h-full bg-[#121212] animate-in fade-in zoom-in duration-300 px-6 text-center">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-xl">
                    <CheckCircle2 className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-white text-3xl font-serif font-medium mb-2">Success!</h2>
                <p className="text-gray-400 text-lg mb-8">You have returned this book.</p>
                
                {onGoHome && (
                    <button 
                        onClick={() => {
                            onReturnConfirm(); // Reset internal state
                            onGoHome(); // Navigate to Library
                        }}
                        className="text-[#00E5FF] font-bold text-lg hover:underline"
                    >
                        Find your next read!
                    </button>
                )}

                <button 
                    onClick={onReturnConfirm}
                    className="mt-8 text-gray-500 hover:text-white text-sm"
                >
                    Back to Shelf
                </button>
            </div>
        )
    }

    return (
        <div className="bg-[#121212] min-h-full flex flex-col animate-in fade-in duration-300">
             {/* Header */}
            <div className="pt-14 px-5 flex items-start">
                <button 
                    onClick={onBack}
                    className="w-10 h-10 bg-gray-200 hover:bg-white rounded-full flex items-center justify-center transition-colors"
                >
                    <ChevronLeft className="w-6 h-6 text-black" />
                </button>
            </div>

            {/* Book Section */}
            <div className="flex flex-col items-center mt-8 mb-12">
                <div className="w-40 shadow-2xl rounded-sm overflow-hidden mb-8 relative">
                    <BookPlaceholder title="Self Help" />
                </div>
                
                <h2 className="text-gray-400 text-lg mb-1">Returning</h2>
                <h1 className="text-white text-3xl font-bold mb-1 font-serif">Self Help</h1>
                <p className="text-gray-400 text-lg">Gabrielle Bernstein</p>
            </div>

            {/* Library Card Section */}
            <div className="px-5 mb-6">
                <div className="bg-[#1A1A1A] rounded-lg p-5 border border-[#333]">
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
                             <span className="text-white font-bold tracking-wider text-lg">27244084105967</span>
                         </div>
                         {/* Logo Icon */}
                         <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center p-1.5">
                            <div className="w-full h-full bg-black rounded-full relative overflow-hidden">
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

            {/* Due Date Info */}
            <div className="px-5 mb-12">
                <div className="flex items-center justify-between py-4 border-t border-[#333] border-b">
                    <span className="text-white text-lg">Due 24 Feb, 2:29pm</span>
                    <span className="text-white text-lg font-bold">21 days</span>
                </div>
            </div>

            {/* Return Button */}
            <div className="mt-auto pb-12 px-12 flex justify-center">
                <button 
                    onClick={handleReturn}
                    className="bg-[#FF4081] hover:bg-[#F50057] text-black text-lg font-bold py-3.5 px-12 rounded-full w-full max-w-xs shadow-lg transition-colors uppercase tracking-wide"
                >
                    RETURN LOAN
                </button>
            </div>
        </div>
    );
}

function ShelfMenuItem({ icon, label, count }: { icon: React.ReactNode, label: string, count?: number }) {
    return (
        <div className="flex items-center justify-between py-4 border-b border-[#1A1A1A] cursor-pointer group hover:bg-white/5 px-2 -mx-2 rounded-lg transition-colors">
            <div className="flex items-center gap-4">
                {icon}
                <span className="text-white text-lg font-medium">{label}</span>
            </div>
            <div className="flex items-center gap-3">
                {count !== undefined && (
                    <span className="bg-[#333] text-white text-sm font-bold px-2.5 py-0.5 rounded-full min-w-[30px] text-center">
                        {count}
                    </span>
                )}
                <ChevronRight className="w-5 h-5 text-gray-500" />
            </div>
        </div>
    )
}

function MagazineCover({ src, rotate, zIndex, isCenter }: { src: string, rotate: string, zIndex: number, isCenter?: boolean }) {
    return (
        <div 
            className={`w-24 h-32 shrink-0 rounded-sm shadow-lg border border-white/10 transition-transform hover:scale-110 hover:z-50 duration-300 ${isCenter ? 'scale-110' : ''}`}
            style={{ 
                transform: `rotate(${rotate})`,
                zIndex: zIndex,
                marginLeft: '-40px',
                backgroundImage: `url(${src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
        </div>
    )
}

function BookPlaceholder({ title, small }: { title: string, small?: boolean }) {
    return (
        <div className={`aspect-[2/3] relative rounded-sm overflow-hidden shadow-lg bg-[#222] border border-[#333] flex items-center justify-center p-2 text-center ${small ? 'w-16' : 'w-full'}`}>
            <span className={`text-gray-500 font-medium font-serif leading-tight ${small ? 'text-[10px]' : 'text-xs'}`}>
                {title}
            </span>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        </div>
    )
}