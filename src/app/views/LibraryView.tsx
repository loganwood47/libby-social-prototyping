import React, { useState } from "react";
import { Header } from "../components/Header";
import { FilterBar } from "../components/FilterBar";
import { Section } from "../components/Section";
import { HorizontalScroll } from "../components/HorizontalScroll";
import { BookCard } from "../components/BookCard";
import { MagazineGrid } from "../components/MagazineGrid";
import { GuideSection } from "../components/GuideSection";
import { ExtrasSection } from "../components/ExtrasSection";
import { SurveyModal } from "../components/SurveyModal";
import { SocialPreviewSection } from "../components/SocialPreviewSection";
import { BookClubsView } from "../components/social/BookClubsView";
import { AccountsView } from "../components/social/AccountsView";
import { FriendsView } from "../components/social/FriendsView";
import { SharedReadingHistoryView } from "../components/social/SharedReadingHistoryView";
import { BookAvailability } from "../components/AvailabilityBadge";

// Mock Data with availability information
const BOOKS_JUST_FOR_YOU = [
  { 
    id: 101, 
    title: "The Inner Calm", 
    author: "Sarah Jenkins", 
    image: "https://images.unsplash.com/photo-1557752281-d4b2e550aba9?w=400&q=80", 
    duration: "5 HOURS", 
    isAudiobook: true, 
    rating: 4.5, 
    reviewCount: 2847,
    availability: { status: 'available', copiesAvailable: 3, totalCopies: 5, friendsReading: 4 } as BookAvailability
  },
  { 
    id: 102, 
    title: "Finding Balance", 
    author: "Dr. Robert Chen", 
    image: "https://images.unsplash.com/photo-1759494080879-2990a4f0fe7c?w=400&q=80", 
    rating: 4.2, 
    reviewCount: 1923,
    availability: { status: 'coming_soon', estimatedWaitDays: 3, friendsReading: 2 } as BookAvailability
  },
  { 
    id: 103, 
    title: "Mindful Moments", 
    author: "Elena Rodriguez", 
    image: "https://images.unsplash.com/photo-1758201553379-b88559e7bfb0?w=400&q=80", 
    duration: "3 HOURS", 
    isAudiobook: true, 
    rating: 4.7, 
    reviewCount: 3256,
    availability: { status: 'high_demand', copiesAvailable: 2, totalCopies: 10, trendingInNetwork: true, friendsReading: 12 } as BookAvailability
  },
  { 
    id: 104, 
    title: "Patterns of Thought", 
    author: "James Wilson", 
    image: "https://images.unsplash.com/photo-1687093777245-bc60c636ddf0?w=400&q=80", 
    rating: 4.0, 
    reviewCount: 894,
    availability: { status: 'available', copiesAvailable: 8, totalCopies: 10 } as BookAvailability
  },
];

const BOOKS_1 = [
  { 
    id: 1, 
    title: "The Fire Next Time", 
    author: "James Baldwin", 
    image: "https://images.unsplash.com/photo-1769963121626-7f1885db412c?w=400&q=80", 
    duration: "2 HOURS", 
    isAudiobook: true, 
    rating: 4.8, 
    reviewCount: 5432,
    availability: { status: 'available', copiesAvailable: 5, totalCopies: 8, friendsReading: 7, trendingInNetwork: true } as BookAvailability
  },
  { 
    id: 2, 
    title: "Cicely Tyson", 
    author: "Cicely Tyson", 
    image: "https://images.unsplash.com/photo-1640270712121-ae4a538a8ffc?w=400&q=80", 
    duration: "16 HOURS", 
    isAudiobook: true, 
    rating: 4.6, 
    reviewCount: 3187,
    availability: { status: 'high_demand', copiesAvailable: 1, totalCopies: 6, friendsReading: 3 } as BookAvailability
  },
  { 
    id: 3, 
    title: "Adversity For Sale", 
    author: "Jay Jenkins", 
    image: "https://images.unsplash.com/photo-1641064464128-81cfd55d5c8a?w=400&q=80", 
    duration: "8 HOURS", 
    isAudiobook: true, 
    rating: 4.3, 
    reviewCount: 1654,
    availability: { status: 'coming_soon', estimatedWaitDays: 7 } as BookAvailability
  },
  { 
    id: 4, 
    title: "Music Is History", 
    author: "Questlove", 
    image: "https://images.unsplash.com/photo-1732714403349-05fc43b67042?w=400&q=80", 
    duration: "12 HOURS", 
    isAudiobook: true, 
    rating: 4.7, 
    reviewCount: 4289,
    availability: { status: 'available', copiesAvailable: 4, totalCopies: 4 } as BookAvailability
  },
];

const BOOKS_2 = [
  { 
    id: 5, 
    title: "Black Dahlia", 
    author: "William J. Mann", 
    image: "https://images.unsplash.com/photo-1722706731912-dde6e451e59f?w=400&q=80", 
    rating: 3.9, 
    reviewCount: 2145,
    availability: { status: 'available', copiesAvailable: 6, totalCopies: 10 } as BookAvailability
  },
  { 
    id: 6, 
    title: "Tender Cruelty", 
    author: "Katee Robert", 
    image: "https://images.unsplash.com/photo-1752243731865-c2fa851af7ec?w=400&q=80", 
    rating: 4.1, 
    reviewCount: 1876,
    availability: { status: 'available', copiesAvailable: 2, totalCopies: 5, friendsReading: 5 } as BookAvailability
  },
  { 
    id: 7, 
    title: "Fallen Stars", 
    author: "Imani Erriu", 
    image: "https://images.unsplash.com/photo-1769963121626-7f1885db412c?w=400&q=80", 
    rating: 4.4, 
    reviewCount: 967,
    availability: { status: 'available', copiesAvailable: 12, totalCopies: 15 } as BookAvailability
  },
  { 
    id: 8, 
    title: "Death and Dinuguan", 
    author: "Mia P. Manansala", 
    image: "https://images.unsplash.com/photo-1710976483763-25290f0212ed?w=400&q=80", 
    rating: 4.5, 
    reviewCount: 2301,
    availability: { status: 'available', copiesAvailable: 3, totalCopies: 8, trendingInNetwork: true, friendsReading: 8 } as BookAvailability
  },
];

const BOOKS_3 = [
    { 
      id: 9, 
      title: "Pride & Prejudice", 
      author: "Jane Austen", 
      image: "https://images.unsplash.com/photo-1769963121626-7f1885db412c?w=400&q=80", 
      rating: 4.9, 
      reviewCount: 12547,
      availability: { status: 'available', copiesAvailable: 20, totalCopies: 25, friendsReading: 15, trendingInNetwork: true } as BookAvailability
    },
    { 
      id: 10, 
      title: "Little Women", 
      author: "Louisa May Alcott", 
      image: "https://images.unsplash.com/photo-1722706731912-dde6e451e59f?w=400&q=80", 
      rating: 4.6, 
      reviewCount: 8932,
      availability: { status: 'high_demand', copiesAvailable: 1, totalCopies: 12, friendsReading: 6 } as BookAvailability
    },
    { 
      id: 11, 
      title: "My Brilliant Friend", 
      author: "Elena Ferrante", 
      image: "https://images.unsplash.com/photo-1641064464128-81cfd55d5c8a?w=400&q=80", 
      rating: 4.3, 
      reviewCount: 6543,
      availability: { status: 'coming_soon', estimatedWaitDays: 5, friendsReading: 3 } as BookAvailability
    },
];

interface LibraryViewProps {
    onSyncGoodreads?: () => void;
}

type SocialView = 'bookclubs' | 'accounts' | 'friends' | 'shared-history' | null;

export function LibraryView({ onSyncGoodreads }: LibraryViewProps) {
  const [showSurvey, setShowSurvey] = useState(false);
  const [activeSocialView, setActiveSocialView] = useState<SocialView>(null);

  // Render social detail views
  if (activeSocialView === 'bookclubs') {
    return <BookClubsView onBack={() => setActiveSocialView(null)} />;
  }
  if (activeSocialView === 'accounts') {
    return <AccountsView onBack={() => setActiveSocialView(null)} />;
  }
  if (activeSocialView === 'friends') {
    return <FriendsView onBack={() => setActiveSocialView(null)} />;
  }
  if (activeSocialView === 'shared-history') {
    return <SharedReadingHistoryView onBack={() => setActiveSocialView(null)} />;
  }

  return (
    <>
        {showSurvey && <SurveyModal onClose={() => setShowSurvey(false)} />}
        <Header />
        <FilterBar />

        <Section 
          title="Just For You" 
          subtitle="These were picked based on your past reading history and searches."
          className="mt-2"
          showClose
        >
           <HorizontalScroll>
             {BOOKS_JUST_FOR_YOU.map(book => (
               <BookCard key={book.id} {...book} />
             ))}
           </HorizontalScroll>
        </Section>

        <Section
            title="Want More Personalized Recommendations?"
            subtitle="Take a short survey letting us know your preferences or sync your Goodreads account."
            className="mt-2"
            showClose
        >
            <div className="flex gap-4 mt-2 mb-4">
                <button 
                  onClick={() => setShowSurvey(true)}
                  className="bg-[#00838F] hover:bg-[#0097A7] text-black font-bold py-3 px-6 rounded-full flex-1 transition-colors text-sm uppercase tracking-wide"
                >
                    Take Survey
                </button>
                <button 
                    onClick={onSyncGoodreads}
                    className="bg-[#2a2a2a] hover:bg-[#333] border border-[#444] text-white font-bold py-3 px-6 rounded-full flex-1 transition-colors text-sm uppercase tracking-wide"
                >
                    Sync Goodreads
                </button>
            </div>
        </Section>

        {/* Social Preview Section - Highlighted social features */}
        <SocialPreviewSection 
          onBookClubsClick={() => setActiveSocialView('bookclubs')}
          onAccountsClick={() => setActiveSocialView('accounts')}
          onFriendsClick={() => setActiveSocialView('friends')}
          onSharedHistoryClick={() => setActiveSocialView('shared-history')}
        />

        <Section 
          title="African American History Month..." 
          subtitle="Over 260 titles chosen by our librarians"
          showClose
        >
           <HorizontalScroll>
             {BOOKS_1.map(book => (
               <BookCard key={book.id} {...book} />
             ))}
           </HorizontalScroll>
        </Section>

        <Section
          title="Guides"
          textColor="text-[#00838F]"
          showClose
          className="mt-2"
        >
             <div className="text-gray-300 mb-4 text-[15px] leading-snug">
                Our librarians curate these guides to help you explore our catalog.
             </div>
             <GuideSection />
        </Section>

        <Section
          title="Extras"
          textColor="text-[#00838F]"
          showClose
          className="mt-2"
        >
             <div className="text-gray-300 mb-4 text-[15px] leading-snug">
                Use your library card to access additional resources across the web.
             </div>
             <div className="mb-4 text-white font-bold flex items-center gap-1 cursor-pointer">
                See all extras <span className="text-xl">›</span>
            </div>
             <ExtrasSection />
        </Section>

        <Section 
            title="New and Now" 
            subtitle="It's your lucky day! No waiting required—these popular titles are available now!"
            className="mt-6"
            showClose
        >
            <div className="mb-4 text-white font-bold flex items-center gap-1 cursor-pointer text-sm">
                See over 200 titles <span className="text-xl">›</span>
            </div>
            <HorizontalScroll>
                {BOOKS_2.map(book => (
                    <BookCard key={book.id} {...book} />
                ))}
            </HorizontalScroll>
        </Section>

        <Section 
            title="Favorite Magazines" 
            subtitle="Over 100 titles chosen by our librarians"
            className="mt-2"
            showClose
        >
            <MagazineGrid />
        </Section>
        
        <Section 
            title="Galentine's Day" 
            subtitle="Over 190 titles chosen by our librarians"
            className="mt-2"
            showClose
        >
             <HorizontalScroll>
                {BOOKS_3.map(book => (
                    <BookCard key={book.id} {...book} />
                ))}
            </HorizontalScroll>
        </Section>
        
         <Section 
            title="Just Added Books" 
            subtitle="A list of over 1,000 titles"
            className="mt-2"
            showClose
        >
             <div className="mb-4 text-white font-bold flex items-center gap-1 cursor-pointer text-sm">
                A list of over 1,000 titles <span className="text-xl">›</span>
            </div>
             <HorizontalScroll>
                {[...BOOKS_2, ...BOOKS_1].map((book, i) => (
                    <BookCard key={i} {...book} isAudiobook={false} duration="" />
                ))}
            </HorizontalScroll>
        </Section>

        {/* Social Features */}
        <Section
            title="Book Clubs"
            textColor="text-[#00838F]"
            showClose
            className="mt-2"
        >
            <BookClubsView onOpen={() => setActiveSocialView('bookclubs')} />
        </Section>

        <Section
            title="Accounts"
            textColor="text-[#00838F]"
            showClose
            className="mt-2"
        >
            <AccountsView onOpen={() => setActiveSocialView('accounts')} />
        </Section>

        <Section
            title="Friends"
            textColor="text-[#00838F]"
            showClose
            className="mt-2"
        >
            <FriendsView onOpen={() => setActiveSocialView('friends')} />
        </Section>

        <Section
            title="Shared Reading History"
            textColor="text-[#00838F]"
            showClose
            className="mt-2"
        >
            <SharedReadingHistoryView onOpen={() => setActiveSocialView('shared-history')} />
        </Section>
    </>
  );
}