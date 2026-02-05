import React, { useState, useEffect } from "react";
import { 
  Book, 
  Settings, 
  Bell, 
  Accessibility, 
  Smartphone, 
  Ban, 
  CloudRain, 
  MapPin, 
  Globe, 
  Lock, 
  Copy, 
  Activity, 
  EyeOff, 
  RotateCcw, 
  Phone, 
  CheckSquare, 
  Search,
  MoreHorizontal,
  Share,
  Loader,
  Check,
  X,
  Users,
  UserCheck,
  History,
  ChevronLeft,
  Clock,
  Filter,
  Heart,
  MessageCircle,
  Plus,
  MoreVertical,
  Star,
  Bookmark,
  Coffee,
  Calendar,
  User,
  Video,
  Edit,
  UserPlus,
  Trash2,
  Shield,
  Share2
} from "lucide-react";

interface MenuViewProps {
    scrollToGoodreads?: boolean;
}

export function MenuView({ scrollToGoodreads }: MenuViewProps) {
  const [connectStatus, setConnectStatus] = useState<'idle' | 'confirming' | 'connecting' | 'connected'>('idle');
  const [isAgreed, setIsAgreed] = useState(false);
  const [currentView, setCurrentView] = useState<'menu' | 'accounts' | 'friends' | 'bookclubs'>('menu');

  useEffect(() => {
      if (scrollToGoodreads && currentView === 'menu') {
          const element = document.getElementById('goodreads-section');
          if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
      }
  }, [scrollToGoodreads, currentView]);

  const handleConnectClick = () => {
    setConnectStatus('confirming');
    setIsAgreed(false);
  };

  const handleConfirm = () => {
    setConnectStatus('connecting');
    setTimeout(() => {
        setConnectStatus('connected');
        setTimeout(() => {
            setConnectStatus('idle');
        }, 1500);
    }, 3000);
  };

  const handleCancel = () => {
      setConnectStatus('idle');
  };

  // Render Sub-views
  if (currentView === 'accounts') {
      return <AccountsView onBack={() => setCurrentView('menu')} />;
  }

  if (currentView === 'friends') {
      return <FriendsView onBack={() => setCurrentView('menu')} />;
  }

  if (currentView === 'bookclubs') {
      return <BookClubsView onBack={() => setCurrentView('menu')} />;
  }

  if (connectStatus === 'confirming') {
      return (
        <div className="bg-black min-h-full flex flex-col items-center justify-center p-8 fixed inset-0 z-50">
            <div className="bg-[#1A1A1A] p-6 rounded-2xl flex flex-col items-start shadow-2xl border border-[#333] max-w-sm w-full animate-in fade-in zoom-in duration-300 relative">
                <button 
                    onClick={handleCancel}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>
                
                <h2 className="text-white text-xl font-bold mb-4 pr-8">Confirm Connection</h2>
                <p className="text-gray-300 mb-6">
                    By connecting, you allow Libby to sync your reading progress and shelves with Goodreads.
                </p>
                
                <div 
                    className="flex items-center gap-3 mb-8 cursor-pointer group"
                    onClick={() => setIsAgreed(!isAgreed)}
                >
                    <div className={`w-6 h-6 rounded border flex items-center justify-center transition-colors ${isAgreed ? 'bg-[#00838F] border-[#00838F]' : 'border-gray-500 group-hover:border-gray-300'}`}>
                        {isAgreed && <Check className="w-4 h-4 text-white" />}
                    </div>
                    <span className="text-gray-200 select-none">I agree to import my Goodreads data.</span>
                </div>

                <button 
                    onClick={handleConfirm}
                    disabled={!isAgreed}
                    className={`w-full py-3 rounded-full font-bold text-center transition-all ${
                        isAgreed 
                        ? 'bg-[#A72B4B] hover:bg-[#B93D60] text-white shadow-lg' 
                        : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    }`}
                >
                    I Agree
                </button>
            </div>
        </div>
      );
  }

  if (connectStatus === 'connecting') {
    return (
        <div className="bg-black min-h-full flex flex-col items-center justify-center p-8 fixed inset-0 z-50">
            <div className="bg-[#1A1A1A] p-8 rounded-2xl flex flex-col items-center shadow-2xl border border-[#333] max-w-sm w-full animate-in fade-in duration-300">
                <Loader className="w-12 h-12 text-[#00E5FF] animate-spin mb-4" />
                <h2 className="text-white text-xl font-bold mb-2">Connecting Now</h2>
                <p className="text-gray-400 text-center">Please wait while we link your Goodreads account...</p>
            </div>
        </div>
    );
  }

  if (connectStatus === 'connected') {
    return (
        <div className="bg-black min-h-full flex flex-col items-center justify-center p-8 fixed inset-0 z-50">
            <div className="bg-[#1A1A1A] p-8 rounded-2xl flex flex-col items-center shadow-2xl border border-[#333] max-w-sm w-full animate-in fade-in duration-300">
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                    <Check className="w-8 h-8 text-green-500" />
                </div>
                <h2 className="text-white text-xl font-bold mb-2">Connected!</h2>
                <p className="text-gray-400 text-center">Your accounts have been successfully linked.</p>
            </div>
        </div>
    );
  }

  return (
    <div className="bg-black min-h-full pb-20">
      {/* Top Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[#2E1A47] via-[#1A3A3A] to-black pt-16 pb-8 px-5">
        {/* Stars overlay (CSS simulation) */}
        <div className="absolute inset-0 opacity-30" 
             style={{ 
               backgroundImage: 'radial-gradient(white 1px, transparent 1px)', 
               backgroundSize: '30px 30px' 
             }}>
        </div>

        <div className="relative z-10 flex flex-col items-center">
            {/* Libby Icon */}
            <div className="w-16 h-16 rounded-full border-[3px] border-[#5C2D5C] bg-[#A72B4B] flex items-center justify-center mb-6 shadow-lg overflow-hidden relative">
                <div className="absolute top-[12px] right-[12px] w-3 h-3 bg-[#4FC3F7] rounded-full z-20"></div> {/* The little blue bow/clip */}
                <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-10 h-10 bg-[#FFD180] rounded-full z-10"></div> {/* Face */}
                <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border-b-2 border-[#A72B4B] opacity-50 z-20"></div> {/* Smile hint */}
            </div>

            <h2 className="text-white text-xl font-medium mb-4">Inspire me with...</h2>
            
            <div className="flex gap-2 w-full justify-center">
                <button className="bg-[#1A1A1A] hover:bg-[#2A2A2A] text-gray-200 px-5 py-3 rounded-md font-medium text-[17px]">
                    fiction
                </button>
                <button className="bg-[#1A1A1A] hover:bg-[#2A2A2A] text-gray-200 px-5 py-3 rounded-md font-medium text-[17px]">
                    nonfiction
                </button>
                <button className="bg-[#5C7C99] hover:bg-[#6D8DAA] text-white px-4 py-3 rounded-md font-medium flex items-center gap-2">
                    tag
                    <div className="w-2 h-2 rounded-full border border-white bg-transparent"></div>
                </button>
            </div>
        </div>
      </div>

      <div className="px-5">
        {/* Your Libraries Section */}
        <SectionHeader title="Your Libraries" />
        
        <div className="flex items-center justify-between py-4 border-b border-[#222] cursor-pointer group">
            <div className="flex items-center gap-4">
                <div className="w-12 h-8 bg-gradient-to-r from-orange-400 to-blue-500 rounded-sm flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 flex gap-[2px]">
                         {[...Array(10)].map((_, i) => (
                             <div key={i} className="w-[2px] bg-black/20 h-full"></div>
                         ))}
                    </div>
                </div>
                <div>
                    <h3 className="text-white font-bold text-[17px]">Los Angeles Public Library</h3>
                    <p className="text-gray-400 text-sm">1 card, 0 of 30 loans.</p>
                </div>
            </div>
            {/* Library Card Icon */}
             <div className="w-10 h-10 bg-[#D37F2F] rounded-md relative overflow-hidden shadow-sm">
                <div className="absolute bottom-1 right-1 flex gap-0.5">
                    <div className="w-1 h-3 bg-white/40"></div>
                    <div className="w-1 h-4 bg-white/40"></div>
                    <div className="w-1 h-2 bg-white/40"></div>
                </div>
            </div>
        </div>

        <MenuItem title="Manage Cards" icon={<MoreHorizontal className="text-[#A72B4B]\" />} isPink />

        {/* Settings Section */}
        <SectionHeader title="Settings" className="mt-8" />
        <MenuItem title="Notifications" icon={<Bell />} />
        <MenuItem title="Accessibility" icon={<Accessibility />} />
        <MenuItem title="Read Books With..." icon={<Book />} />
        <MenuItem title="Content Controls" icon={<Ban className="rotate-90" />} />
        <MenuItem title="Downloads" icon={<CloudRain />} />
        <MenuItem title="Navigation" icon={<MapPin />} />
        <MenuItem title="Language" icon={<Globe />} />

        {/* Your Information Section */}
        <div id="goodreads-section">
            <SectionHeader title="Your Information" className="mt-8" />
            <MenuItem 
                title="Connect My Goodreads Account" 
                icon={<Share />} 
                onClick={handleConnectClick}
            />
            <MenuItem title="Back Up Your Data" icon={<Lock />} />
            <MenuItem title="Copy To Another Device" icon={<Copy />} />
            <MenuItem title="Diagnostics & Analytics" icon={<Activity />} />
            <MenuItem title="Privacy Statement" icon={<EyeOff />} />
            <MenuItem title="Reset Everything" icon={<RotateCcw />} />
        </div>

        {/* Help & Support Section */}
        <SectionHeader title="Help & Support" className="mt-8" />
        <MenuItem title="Contact Your Library" icon={<Phone />} />
        <MenuItem title="Take Our Survey" icon={<CheckSquare />} />

        {/* Search Bar Footer */}
        <div className="mt-8 mb-4">
            <div className="bg-[#0D2626] border border-[#1A3A3A] rounded-2xl h-14 flex items-center px-4 justify-between cursor-pointer hover:bg-[#113030] transition-colors">
                <span className="text-[#00838F] font-bold text-lg">How can we help?</span>
                <div className="w-8 h-8 bg-[#00838F] rounded-md flex items-center justify-center">
                    <Search className="w-5 h-5 text-[#0D2626]" />
                </div>
            </div>
        </div>

        <div className="text-center text-gray-500 text-sm pb-8 mt-8">
            <p>Libby 6.5.0</p>
        </div>
      </div>
    </div>
  );
}

// --- Types & Data for Book Clubs ---

type ClubRole = 'admin' | 'member' | 'guest';

interface ClubData {
    id: string;
    name: string;
    role: ClubRole;
    isPrivate: boolean;
    members: number;
    currentBook: string;
    nextMeeting: string;
    meetingType: 'Zoom' | 'In-person';
    location?: string;
    frequency: string;
    description: string;
    image: string;
    friendInClub?: string;
}

const CLUBS_DATA: ClubData[] = [
    {
        id: "c1",
        name: "The Midnight Readers",
        role: "admin",
        isPrivate: true,
        members: 8,
        currentBook: "The Silent Ocean",
        nextMeeting: "Tuesday, 8 PM",
        meetingType: "Zoom",
        frequency: "Weekly",
        description: "Late night reading sessions for night owls. We focus on thrillers and mysteries that keep you up at night.",
        image: "https://images.unsplash.com/photo-1563818072824-ed3d6ff52955?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxteXN0ZXJ5JTIwYm9vayUyMGNvdmVyJTIwZGFya3xlbnwxfHx8fDE3NzAxNTcwNzF8MA&ixlib=rb-4.1.0&q=80&w=600"
    },
    {
        id: "c2",
        name: "Sci-Fi Lovers",
        role: "member",
        isPrivate: false,
        members: 142,
        currentBook: "Dune",
        nextMeeting: "Oct 24, 6 PM",
        meetingType: "In-person",
        location: "Central Library, Room 3B",
        frequency: "Monthly",
        description: "Exploring the galaxy one book at a time. Join us for deep discussions on classic and modern sci-fi.",
        image: "https://images.unsplash.com/photo-1655723122539-6f4288ed14c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbmNlJTIwZmljdGlvbiUyMGJvb2slMjBjb3ZlciUyMGFydHxlbnwxfHx8fDE3NzAxNTcwNzF8MA&ixlib=rb-4.1.0&q=80&w=600"
    },
    {
        id: "c3",
        name: "Cozy Corner",
        role: "guest",
        isPrivate: false,
        members: 45,
        currentBook: "Little Women",
        nextMeeting: "Sunday, 2 PM",
        meetingType: "Zoom",
        frequency: "Bi-weekly",
        description: "Grab a blanket and a cup of tea. We read heartwarming classics and contemporary comfort reads.",
        friendInClub: "Sarah J.",
        image: "https://images.unsplash.com/photo-1758854486928-08f8264726b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwcmVhZGluZyUyMG5vb2slMjBhZXN0aGV0aWN8ZW58MXx8fHwxNzcwMTU3MDcwfDA&ixlib=rb-4.1.0&q=80&w=600"
    },
    {
        id: "c4",
        name: "Fantasy Worlds",
        role: "guest",
        isPrivate: false,
        members: 1205,
        currentBook: "The Hobbit",
        nextMeeting: "Nov 1, 7 PM",
        meetingType: "Zoom",
        frequency: "Monthly",
        description: "From Middle Earth to Westeros, we travel to magical lands. Cosplay encouraged but not required!",
        image: "https://images.unsplash.com/photo-1760030427721-38c1bac5ac30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW50YXN5JTIwYm9vayUyMGRyYWdvbnxlbnwxfHx8fDE3NzAwOTAxMzd8MA&ixlib=rb-4.1.0&q=80&w=600"
    },
    {
        id: "c5",
        name: "Romance Readers",
        role: "guest",
        isPrivate: false,
        members: 89,
        currentBook: "Pride & Prejudice",
        nextMeeting: "Friday, 6 PM",
        meetingType: "In-person",
        location: "The Coffee Bean, 4th St.",
        frequency: "Weekly",
        description: "Swoon-worthy reads and lively discussions about our favorite book boyfriends.",
        friendInClub: "Jessica R.",
        image: "https://images.unsplash.com/photo-1720982018833-7aba9e747e61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21hbmNlJTIwYm9vayUyMGNvdmVyJTIwZmxvcmFsfGVufDF8fHx8MTc3MDE1NzA3MHww&ixlib=rb-4.1.0&q=80&w=600"
    }
];

// --- Sub Views ---

function BookClubsView({ onBack }: { onBack: () => void }) {
    const [selectedClubId, setSelectedClubId] = useState<string | null>(null);

    const myClubs = CLUBS_DATA.filter(c => c.role === 'admin' || c.role === 'member');
    const discoverClubs = CLUBS_DATA.filter(c => c.role === 'guest');

    if (selectedClubId) {
        const club = CLUBS_DATA.find(c => c.id === selectedClubId);
        if (club) {
            return <ClubDetailView club={club} onBack={() => setSelectedClubId(null)} />;
        }
    }

    return (
        <div className="bg-black min-h-full pb-20 animate-in slide-in-from-right duration-300">
             {/* Header */}
             <div className="bg-[#0D2626] px-4 py-4 flex items-center justify-between border-b border-[#1A3A3A] sticky top-0 z-30">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="text-[#00E5FF] p-2 -ml-2 hover:bg-white/5 rounded-full">
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <h2 className="text-white text-xl font-bold">Libby Book Clubs</h2>
                </div>
                <button className="text-[#00E5FF] hover:bg-[#00838F]/10 p-2 rounded-full">
                    <Plus className="w-6 h-6" />
                </button>
            </div>

            <div className="p-5">
                {/* My Clubs */}
                <SectionHeader title="Your Clubs" className="mb-4" />
                <div className="flex flex-col gap-4 mb-8">
                    {myClubs.map((club) => (
                        <div 
                            key={club.id} 
                            onClick={() => setSelectedClubId(club.id)}
                            className="bg-[#1A1A1A] rounded-xl overflow-hidden border border-[#333] flex relative cursor-pointer hover:bg-[#222] transition-colors group"
                        >
                            <div className="w-24 bg-gray-800 relative">
                                <img src={club.image} className="w-full h-full object-cover opacity-80" alt={club.name} />
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1A1A1A]"></div>
                            </div>
                            <div className="p-4 flex-1 flex flex-col justify-center">
                                <div className="flex items-center justify-between mb-1">
                                    <h3 className="text-white font-bold text-lg group-hover:text-[#00E5FF] transition-colors">{club.name}</h3>
                                    {club.isPrivate ? (
                                        <Lock className="w-4 h-4 text-gray-400" />
                                    ) : (
                                        <Globe className="w-4 h-4 text-[#00E5FF]" />
                                    )}
                                </div>
                                <div className="flex items-center gap-4 text-sm text-gray-400 mb-2">
                                    <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {club.members}</span>
                                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {club.nextMeeting}</span>
                                </div>
                                <div className="bg-[#333] px-3 py-1.5 rounded-lg self-start">
                                    <span className="text-gray-300 text-xs">Current Read: <span className="text-white font-medium">{club.currentBook}</span></span>
                                </div>
                            </div>
                            <div className="w-1.5 h-full bg-[#A72B4B] absolute left-0 top-0"></div>
                        </div>
                    ))}
                </div>

                {/* Discover Clubs */}
                <SectionHeader title="Discover Clubs" className="mb-4" />
                <div className="grid grid-cols-1 gap-4">
                    {discoverClubs.map((club) => (
                        <div 
                            key={club.id} 
                            onClick={() => setSelectedClubId(club.id)}
                            className="bg-[#1A1A1A] rounded-xl p-4 border border-[#333] flex items-center justify-between group cursor-pointer hover:bg-[#222] transition-colors"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#333]">
                                    <img src={club.image} className="w-full h-full object-cover" alt={club.name} />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold group-hover:text-[#00E5FF] transition-colors">{club.name}</h4>
                                    <p className="text-gray-400 text-sm mb-1">{club.members} members • Reading {club.currentBook}</p>
                                    {club.friendInClub && (
                                        <p className="text-[#00E5FF] text-xs flex items-center gap-1">
                                            <User className="w-3 h-3" /> {club.friendInClub} is a member
                                        </p>
                                    )}
                                </div>
                            </div>
                            <button className="bg-[#333] hover:bg-[#444] text-white px-4 py-2 rounded-full text-sm font-medium transition-colors">
                                View
                            </button>
                        </div>
                    ))}
                </div>
                
                <div className="mt-6 text-center">
                    <button className="text-[#00E5FF] text-sm font-medium hover:underline">
                        Explore all public book clubs
                    </button>
                </div>
            </div>
        </div>
    );
}

function ClubDetailView({ club, onBack }: { club: ClubData, onBack: () => void }) {
    const isAdmin = club.role === 'admin';
    const isMember = club.role === 'member';
    const isGuest = club.role === 'guest';

    return (
        <div className="bg-black min-h-full pb-20 animate-in slide-in-from-bottom duration-300">
            {/* Header */}
            <div className="bg-[#0D2626] px-4 py-4 flex items-center justify-between border-b border-[#1A3A3A] sticky top-0 z-30">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="text-[#00E5FF] p-2 -ml-2 hover:bg-white/5 rounded-full">
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <h2 className="text-white text-xl font-bold truncate max-w-[200px]">{club.name}</h2>
                </div>
                <div className="flex items-center gap-2">
                    {/* Share Option (available for admin and members) */}
                    {(isAdmin || isMember) && (
                        <button className="text-[#00E5FF] hover:bg-[#00838F]/10 p-2 rounded-full" title="Share Club">
                            <Share2 className="w-5 h-5" />
                        </button>
                    )}
                    {isAdmin && (
                        <button className="text-[#00E5FF] hover:bg-[#00838F]/10 p-2 rounded-full" title="Edit Club Info">
                            <Edit className="w-5 h-5" />
                        </button>
                    )}
                </div>
            </div>

            <div className="p-5">
                {/* Hero Section */}
                <div className="flex flex-col items-center mb-8">
                    <div className="w-32 h-32 rounded-full border-4 border-[#00838F] overflow-hidden shadow-2xl mb-4 relative">
                        <img src={club.image} alt={club.name} className="w-full h-full object-cover" />
                        {isAdmin && (
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                                <Edit className="w-8 h-8 text-white" />
                            </div>
                        )}
                    </div>
                    <h1 className="text-white text-2xl font-bold text-center mb-2">{club.name}</h1>
                    <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-300">
                        <span className="flex items-center gap-1.5 px-3 py-1 bg-[#222] rounded-full">
                            <Users className="w-3.5 h-3.5 text-[#00E5FF]" /> {club.members} Members
                        </span>
                        <span className="flex items-center gap-1.5 px-3 py-1 bg-[#222] rounded-full">
                            <Clock className="w-3.5 h-3.5 text-[#00E5FF]" /> {club.frequency}
                        </span>
                        <span className="flex items-center gap-1.5 px-3 py-1 bg-[#222] rounded-full">
                            {club.meetingType === 'Zoom' ? <Video className="w-3.5 h-3.5 text-[#00E5FF]" /> : <MapPin className="w-3.5 h-3.5 text-[#00E5FF]" />} {club.meetingType}
                        </span>
                    </div>
                    {club.location && (
                         <p className="text-gray-400 text-sm mt-3 flex items-center gap-1">
                             <MapPin className="w-3 h-3" /> {club.location}
                         </p>
                    )}
                </div>

                {/* Description */}
                <div className="bg-[#1A1A1A] rounded-xl p-5 border border-[#333] mb-6">
                    <h3 className="text-[#00838F] font-bold mb-2 text-sm uppercase tracking-wider">About the Club</h3>
                    <p className="text-gray-300 leading-relaxed">{club.description}</p>
                </div>

                 {/* Current Read */}
                 <div className="bg-gradient-to-r from-[#1A1A1A] to-[#221A1A] rounded-xl p-5 border border-[#333] mb-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-3 opacity-10">
                        <Book className="w-32 h-32 text-white" />
                    </div>
                    <h3 className="text-[#00838F] font-bold mb-4 text-sm uppercase tracking-wider relative z-10">Currently Reading</h3>
                    <div className="flex gap-4 relative z-10">
                        <div className="w-20 shadow-lg rounded-sm overflow-hidden shrink-0">
                             {/* Placeholder book cover based on club image color palette roughly */}
                            <div className="w-full h-28 bg-gray-700 flex items-center justify-center text-xs text-center p-1">
                                {club.currentBook} Cover
                            </div>
                        </div>
                        <div className="flex flex-col justify-center">
                            <h4 className="text-white font-bold text-lg">{club.currentBook}</h4>
                            <p className="text-gray-400 text-sm mb-3">Discussing on {club.nextMeeting}</p>
                            <button className="bg-[#A72B4B] hover:bg-[#B93D60] text-white px-4 py-1.5 rounded-full text-sm font-medium self-start transition-colors shadow-lg">
                                Borrow Book
                            </button>
                        </div>
                    </div>
                 </div>

                 {/* Admin Controls */}
                 {isAdmin && (
                     <div className="mb-8">
                        <h3 className="text-white font-bold mb-4 text-lg">Admin Controls</h3>
                        <div className="grid grid-cols-2 gap-3">
                            <button className="bg-[#222] hover:bg-[#333] p-4 rounded-xl flex flex-col items-center gap-2 transition-colors border border-[#333]">
                                <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400">
                                    <UserPlus className="w-5 h-5" />
                                </div>
                                <span className="text-gray-200 font-medium text-sm">Invite People</span>
                            </button>
                            <button className="bg-[#222] hover:bg-[#333] p-4 rounded-xl flex flex-col items-center gap-2 transition-colors border border-[#333]">
                                <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center text-green-400">
                                    <Shield className="w-5 h-5" />
                                </div>
                                <span className="text-gray-200 font-medium text-sm">Manage Members</span>
                            </button>
                             <button className="bg-[#222] hover:bg-[#333] p-4 rounded-xl flex flex-col items-center gap-2 transition-colors border border-[#333]">
                                <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center text-orange-400">
                                    <Calendar className="w-5 h-5" />
                                </div>
                                <span className="text-gray-200 font-medium text-sm">Edit Schedule</span>
                            </button>
                             <button className="bg-[#222] hover:bg-[#333] p-4 rounded-xl flex flex-col items-center gap-2 transition-colors border border-[#333]">
                                <div className="w-10 h-10 bg-pink-500/20 rounded-full flex items-center justify-center text-pink-400">
                                    <Book className="w-5 h-5" />
                                </div>
                                <span className="text-gray-200 font-medium text-sm">Next Book</span>
                            </button>
                        </div>
                     </div>
                 )}

                 {/* Member Actions */}
                 {isMember && (
                    <div className="flex flex-col gap-3">
                        <button className="w-full bg-[#1A1A1A] hover:bg-[#2A2A2A] border border-[#333] text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                            <UserPlus className="w-5 h-5" /> Invite Friends
                        </button>
                        <button className="w-full text-red-400 hover:text-red-300 py-3 font-medium transition-colors text-sm">
                            Leave Club
                        </button>
                    </div>
                 )}

                 {/* Guest Actions */}
                 {isGuest && (
                    <button className="w-full bg-[#00838F] hover:bg-[#0097A7] text-white py-4 rounded-xl font-bold text-lg shadow-lg transition-all flex items-center justify-center gap-2">
                        Join Club
                    </button>
                 )}
            </div>
        </div>
    );
}

function FriendsView({ onBack }: { onBack: () => void }) {
    const feedItems = [
        {
            id: 1,
            user: { name: "Jessica R.", avatar: "https://images.unsplash.com/photo-1594318223885-20dc4b889f9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWlsaW5nJTIwd29tYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzAxMjI2Mzd8MA&ixlib=rb-4.1.0&q=80&w=200" },
            action: "finished reading",
            time: "2h ago",
            content: {
                type: "book",
                title: "The Silent Ocean",
                author: "Marion D.",
                image: "https://images.unsplash.com/photo-1612094264296-0a0fc161e367?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjBhcnQlMjBhcnRpc3RpY3xlbnwxfHx8fDE3NzAxNTY5MDh8MA&ixlib=rb-4.1.0&q=80&w=600",
                rating: 5,
                review: "Absolutely breathtaking. The way the author describes the underwater scenes is just magical. Couldn't put it down!"
            },
            likes: 24,
            comments: 3
        },
        {
            id: 2,
            user: { name: "Marcus T.", avatar: "https://images.unsplash.com/flagged/photo-1576507643602-a0ab95093c1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwb3J0cmFpdCUyMGdsYXNzZXN8ZW58MXx8fHwxNzcwMTU2NjQwfDA&ixlib=rb-4.1.0&q=80&w=200" },
            action: "is currently reading",
            time: "5h ago",
            content: {
                type: "status",
                title: "Modern Architecture",
                author: "David S.",
                image: "https://images.unsplash.com/photo-1769490315625-6e669d53e698?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwYm9vayUyMGNvdmVyJTIwZGVzaWdufGVufDF8fHx8MTc3MDEyOTA1NXww&ixlib=rb-4.1.0&q=80&w=600",
                progress: "45%"
            },
            likes: 12,
            comments: 0
        },
        {
            id: 3,
            user: { name: "Elena K.", avatar: "https://images.unsplash.com/photo-1652549752120-d9beb4c86bd4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHBlcnNvbiUyMGZhY2V8ZW58MXx8fHwxNzcwMDY5OTU0fDA&ixlib=rb-4.1.0&q=80&w=200" },
            action: "shared a tag",
            time: "1d ago",
            content: {
                type: "tag",
                tagName: "Summer Mysteries",
                count: 12,
                images: [
                    "https://images.unsplash.com/photo-1711185892790-4cabb6701cb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxub3ZlbCUyMGJvb2slMjBjb3ZlciUyMGZhbnRhc3l8ZW58MXx8fHwxNzcwMTU2OTA4fDA&ixlib=rb-4.1.0&q=80&w=300",
                    "https://images.unsplash.com/photo-1769963121626-7f1885db412c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaW9ncmFwaHklMjBib29rJTIwY292ZXJ8ZW58MXx8fHwxNzcwMDgwMDI5fDA&ixlib=rb-4.1.0&q=80&w=300",
                    "https://images.unsplash.com/photo-1769987935906-0dce6d6a635a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb29raW5nJTIwYm9vayUyMGNvdmVyfGVufDF8fHx8MTc3MDEyODY2NXww&ixlib=rb-4.1.0&q=80&w=300"
                ]
            },
            likes: 45,
            comments: 8
        }
    ];

    return (
        <div className="bg-black min-h-full pb-20 animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="bg-[#0D2626] px-4 py-4 flex items-center justify-between border-b border-[#1A3A3A] sticky top-0 z-30">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="text-[#00E5FF] p-2 -ml-2 hover:bg-white/5 rounded-full">
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <h2 className="text-white text-xl font-bold">Friends</h2>
                </div>
                <button className="text-[#00E5FF] hover:bg-[#00838F]/10 p-2 rounded-full">
                    <Plus className="w-6 h-6" />
                </button>
            </div>

            <div className="flex flex-col gap-6 py-6">
                {feedItems.map((item) => (
                    <div key={item.id} className="border-b border-[#222] pb-6 last:border-0">
                        {/* Feed Header */}
                        <div className="px-5 flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full border border-[#333] overflow-hidden cursor-pointer">
                                    <img src={item.user.avatar} alt={item.user.name} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <div className="flex items-baseline gap-1.5 flex-wrap">
                                        <span className="text-white font-bold text-[15px]">{item.user.name}</span>
                                        <span className="text-gray-400 text-sm">{item.action}</span>
                                    </div>
                                    <span className="text-gray-500 text-xs">{item.time}</span>
                                </div>
                            </div>
                            <button className="text-gray-500 hover:text-white">
                                <MoreVertical className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Content Area */}
                        <div className="px-5">
                            {item.content.type === 'book' && (
                                <div className="bg-[#1A1A1A] rounded-xl overflow-hidden border border-[#333]">
                                    <div className="flex flex-col sm:flex-row">
                                        <div className="w-full sm:w-1/3 aspect-[2/3] relative">
                                            <img src={item.content.image} alt="Book Cover" className="w-full h-full object-cover" />
                                        </div>
                                        <div className="p-4 flex-1 flex flex-col justify-center">
                                            <div className="flex items-center gap-1 text-[#FFD700] mb-2">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className={`w-4 h-4 ${i < (item.content.rating || 0) ? 'fill-current' : 'text-gray-600'}`} />
                                                ))}
                                            </div>
                                            <h3 className="text-white text-lg font-bold font-serif mb-1">{item.content.title}</h3>
                                            <p className="text-gray-400 text-sm mb-3">by {item.content.author}</p>
                                            <p className="text-gray-300 text-sm italic border-l-2 border-[#A72B4B] pl-3 py-1">"{item.content.review}"</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {item.content.type === 'status' && (
                                <div className="bg-[#1A1A1A] rounded-xl p-4 border border-[#333] flex gap-4 items-center">
                                    <div className="w-16 h-24 shrink-0 rounded shadow-md overflow-hidden">
                                        <img src={item.content.image} alt="Book Cover" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-white font-medium mb-1">{item.content.title}</h3>
                                        <p className="text-gray-400 text-sm mb-3">{item.content.author}</p>
                                        <div className="w-full bg-[#333] h-1.5 rounded-full overflow-hidden">
                                            <div className="bg-[#00E5FF] h-full rounded-full" style={{ width: item.content.progress }}></div>
                                        </div>
                                        <p className="text-[#00E5FF] text-xs mt-1.5 font-medium">{item.content.progress} complete</p>
                                    </div>
                                </div>
                            )}

                            {item.content.type === 'tag' && (
                                <div className="bg-[#1A1A1A] rounded-xl p-4 border border-[#333]">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="bg-[#A72B4B] p-1.5 rounded text-white">
                                            <Bookmark className="w-4 h-4" />
                                        </div>
                                        <span className="text-white font-medium">{item.content.tagName}</span>
                                        <span className="text-gray-500 text-sm">({item.content.count} books)</span>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2">
                                        {item.content.images?.map((img, idx) => (
                                            <div key={idx} className="aspect-[2/3] rounded-md overflow-hidden relative">
                                                <img src={img} className="w-full h-full object-cover" alt="" />
                                                {idx === 2 && (
                                                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                                        <span className="text-white font-bold text-lg">+{item.content.count && item.content.count - 3}</span>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="px-5 mt-4 flex items-center gap-6">
                            <button className="flex items-center gap-2 text-gray-400 hover:text-[#FF4081] transition-colors group">
                                <Heart className="w-6 h-6 group-hover:fill-current" />
                                <span className="text-sm font-medium">{item.likes}</span>
                            </button>
                            <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                                <MessageCircle className="w-6 h-6" />
                                <span className="text-sm font-medium">{item.comments}</span>
                            </button>
                            <button className="flex items-center gap-2 text-gray-400 hover:text-[#00E5FF] transition-colors ml-auto">
                                <Plus className="w-6 h-6" />
                                <span className="text-sm font-medium">Borrow</span>
                            </button>
                        </div>
                    </div>
                ))}

                <div className="text-center py-6">
                    <p className="text-gray-500 text-sm">You're all caught up!</p>
                </div>
            </div>
        </div>
    );
}

function AccountsView({ onBack }: { onBack: () => void }) {
    const popularUsers = [
        { name: "Sarah J.", avatar: "https://images.unsplash.com/photo-1594318223885-20dc4b889f9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWlsaW5nJTIwd29tYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzAxMjI2Mzd8MA&ixlib=rb-4.1.0&q=80&w=200", status: "Reading 'Dune'" },
        { name: "Michael C.", avatar: "https://images.unsplash.com/flagged/photo-1576507643602-a0ab95093c1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwb3J0cmFpdCUyMGdsYXNzZXN8ZW58MXx8fHwxNzcwMTU2NjQwfDA&ixlib=rb-4.1.0&q=80&w=200", status: "Shared 2 reviews" },
        { name: "Elara V.", avatar: "https://images.unsplash.com/photo-1652549752120-d9beb4c86bd4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHBlcnNvbiUyMGZhY2V8ZW58MXx8fHwxNzcwMDY5OTU0fDA&ixlib=rb-4.1.0&q=80&w=200", status: "Finished 'The Hobbit'" },
        { name: "David K.", avatar: "https://images.unsplash.com/photo-1601233748618-c0d3963fd030?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG1hbiUyMHBvcnRyYWl0JTIwY29sb3JmdWx8ZW58MXx8fHwxNzcwMTU2NjQwfDA&ixlib=rb-4.1.0&q=80&w=200", status: "Active 5m ago" },
        { name: "Patricia M.", avatar: "https://images.unsplash.com/photo-1496672254107-b07a26403885?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZW5pb3IlMjB3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MDEyNjY4OXww&ixlib=rb-4.1.0&q=80&w=200", status: "Added 4 books" },
    ];

    const genres = ["Mystery", "Sci-Fi", "Romance", "History", "Biographies", "Fantasy", "Cooking"];

    return (
        <div className="bg-black min-h-full pb-20 animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="bg-[#0D2626] px-4 py-4 flex items-center gap-4 border-b border-[#1A3A3A] sticky top-0 z-30">
                <button onClick={onBack} className="text-[#00E5FF] p-2 -ml-2 hover:bg-white/5 rounded-full">
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <h2 className="text-white text-xl font-bold">Accounts You Follow</h2>
            </div>

            <div className="p-5">
                {/* Most Recent Section */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <SectionHeader title="Most Recent Activity" className="!mb-0 !border-b-0" />
                        <Filter className="w-4 h-4 text-[#00E5FF]" />
                    </div>
                    
                    <div className="flex flex-col gap-1">
                        {[1, 2, 3, 4].map((_, i) => (
                            <div key={i} className="flex items-center gap-3 py-3 border-b border-[#222] group cursor-pointer hover:bg-white/5 -mx-2 px-2 rounded-lg">
                                <img src={popularUsers[i].avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <h4 className="text-white font-medium text-sm">{popularUsers[i].name}</h4>
                                        <span className="text-gray-500 text-xs flex items-center gap-1">
                                            <Clock className="w-3 h-3" /> {i * 15 + 5}m
                                        </span>
                                    </div>
                                    <p className="text-gray-400 text-xs mt-0.5">Started reading <span className="text-[#00E5FF]">The Great Gatsby</span></p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* By Genre Section */}
                <div className="mb-8">
                    <SectionHeader title="Browse by Genre" className="mb-4" />
                    <div className="flex flex-wrap gap-2">
                        {genres.map((genre) => (
                            <button key={genre} className="bg-[#1A1A1A] hover:bg-[#2A2A2A] text-gray-200 px-4 py-2 rounded-full text-sm font-medium border border-[#333] transition-colors">
                                {genre}
                            </button>
                        ))}
                        <button className="text-[#00E5FF] px-4 py-2 text-sm font-medium">See all...</button>
                    </div>
                </div>

                {/* Discover Readers in Your Area Section */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <SectionHeader title="Discover Readers in Your Area" className="!mb-0 !border-b-0" />
                        <div className="flex items-center gap-1 text-[#00E5FF] text-xs font-medium bg-[#00838F]/10 px-2 py-1 rounded-full">
                            <MapPin className="w-3 h-3" /> Los Angeles
                        </div>
                    </div>
                    
                    <div className="flex gap-4 overflow-x-auto pb-4 -mx-5 px-5 no-scrollbar">
                        {popularUsers.map((user, i) => (
                            <div key={i} className="flex flex-col items-center min-w-[100px] gap-2 group cursor-pointer">
                                <div className="w-20 h-20 rounded-full border-2 border-[#00838F] p-[2px] relative">
                                    <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                                    <div className="absolute bottom-0 right-0 bg-[#00838F] w-5 h-5 rounded-full border-2 border-black flex items-center justify-center">
                                        <div className="w-2 h-2 bg-white rounded-full"></div>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <p className="text-white font-medium text-sm">{user.name}</p>
                                    <p className="text-gray-400 text-xs truncate max-w-[100px]">{user.status}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

// --- Helpers ---

function SectionHeader({ title, className = "" }: { title: string, className?: string }) {
    return (
        <h3 className={`text-[#00838F] text-[19px] font-medium border-b border-[#004D40] pb-2 mb-1 ${className}`}>
            {title}
        </h3>
    );
}

interface MenuItemProps {
    title: string;
    icon: React.ReactNode;
    isPink?: boolean;
    onClick?: () => void;
}

function MenuItem({ title, icon, isPink = false, onClick }: MenuItemProps) {
    return (
        <div 
            onClick={onClick}
            className="flex items-center justify-between py-4 border-b border-[#222] cursor-pointer group hover:bg-white/5 transition-colors -mx-2 px-2 rounded-lg"
        >
            <span className={`text-[17px] font-medium ${isPink ? 'text-[#FF4081]' : 'text-gray-100'}`}>
                {title}
            </span>
            
            {/* Styled Icon Container with Hashed Background */}
            <div className="relative w-10 h-7 rounded-[4px] overflow-hidden flex items-center justify-center shrink-0">
                {/* Hashed Background Pattern */}
                <div className="absolute inset-0 bg-[#112222]">
                    <div className="absolute inset-0 opacity-20" style={{
                        backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, #00838F 2px, #00838F 4px)'
                    }}></div>
                </div>
                
                {/* Icon */}
                <div className="relative z-10 text-[#00E5FF] [&>svg]:w-5 [&>svg]:h-5">
                    {icon}
                </div>
            </div>
        </div>
    );
}