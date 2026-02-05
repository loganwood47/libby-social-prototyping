import React, { useState } from "react";
import { ChevronLeft, Plus, Users, Calendar, Lock, Globe, Clock, Video, MapPin, Book, Coffee } from "lucide-react";

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
    image: "https://images.unsplash.com/photo-1563818072824-ed3d6ff52955?w=600&q=80"
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
    image: "https://images.unsplash.com/photo-1655723122539-6f4288ed14c6?w=600&q=80"
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
    image: "https://images.unsplash.com/photo-1758854486928-08f8264726b6?w=600&q=80"
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
    image: "https://images.unsplash.com/photo-1760030427721-38c1bac5ac30?w=600&q=80"
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
    image: "https://images.unsplash.com/photo-1720982018833-7aba9e747e61?w=600&q=80"
  }
];

function SectionHeader({ title, className = "" }: { title: string, className?: string }) {
  return (
    <h3 className={`text-[#00838F] text-[19px] font-medium border-b border-[#004D40] pb-2 mb-1 ${className}`}>
      {title}
    </h3>
  );
}

interface BookClubsViewProps {
  onBack: () => void;
}

export function BookClubsView({ onBack }: BookClubsViewProps) {
  const myClubs = CLUBS_DATA.filter(c => c.role === 'admin' || c.role === 'member');
  const discoverClubs = CLUBS_DATA.filter(c => c.role === 'guest');

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
                      <Coffee className="w-3 h-3" /> {club.friendInClub} is a member
                    </p>
                  )}
                </div>
              </div>
              <button className="bg-[#00838F] hover:bg-[#00A0A0] text-black px-4 py-2 rounded-full text-sm font-bold transition-colors">
                Join
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
