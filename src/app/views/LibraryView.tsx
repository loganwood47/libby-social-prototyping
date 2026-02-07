import React, { useState, useMemo } from "react";
import { Header } from "../components/Header";
import { FilterBar, FilterState } from "../components/FilterBar";
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
import { ReviewsView, BookInfo } from "./ReviewsView";
import { BookDetailView, BookDetail, FriendReading } from "./BookDetailView";

// Sample friend data for social reading
const FRIEND_AVATARS = {
  jessica: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
  michael: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
  emma: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
  david: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
  sarah: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80",
};

// Mock Data with availability information and social reading data
const BOOKS_JUST_FOR_YOU: BookDetail[] = [
  { 
    id: 101, 
    title: "The Inner Calm", 
    author: "Sarah Jenkins", 
    image: "https://images.unsplash.com/photo-1557752281-d4b2e550aba9?w=400&q=80", 
    duration: "5 HOURS", 
    isAudiobook: true, 
    rating: 4.5, 
    reviewCount: 2847,
    availability: { status: 'available', copiesAvailable: 3, totalCopies: 5, friendsReading: 4 } as BookAvailability,
    description: "A transformative guide to finding peace in our chaotic world. Sarah Jenkins draws on decades of mindfulness practice to offer practical techniques for cultivating inner calm. Through guided exercises and real-world examples, you'll learn to quiet your mind and find balance in everyday moments.",
    genres: ["Self-Help", "Mindfulness", "Wellness"],
    pageCount: 256,
    publishDate: "Oct 2025",
    friendsWhoRead: [
      { id: 1, name: "Jessica R.", avatar: FRIEND_AVATARS.jessica, rating: 5, status: 'read', review: "This book changed my morning routine completely. I feel so much more centered now.", finishedDate: "2 weeks ago" },
      { id: 2, name: "Michael T.", avatar: FRIEND_AVATARS.michael, rating: 4, status: 'read', finishedDate: "1 month ago" },
      { id: 3, name: "Emma L.", avatar: FRIEND_AVATARS.emma, status: 'reading' },
    ]
  },
  { 
    id: 102, 
    title: "Finding Balance", 
    author: "Dr. Robert Chen", 
    image: "https://images.unsplash.com/photo-1759494080879-2990a4f0fe7c?w=400&q=80", 
    rating: 4.2, 
    reviewCount: 1923,
    availability: { status: 'coming_soon', estimatedWaitDays: 3, friendsReading: 2 } as BookAvailability,
    description: "Dr. Chen's research-backed approach to work-life harmony has helped thousands find equilibrium. This book provides a scientific framework for understanding stress and practical strategies for creating sustainable balance in your professional and personal life.",
    genres: ["Psychology", "Self-Help", "Business"],
    pageCount: 312,
    publishDate: "Nov 2025",
    friendsWhoRead: [
      { id: 4, name: "David K.", avatar: FRIEND_AVATARS.david, rating: 4, status: 'read', review: "Great insights on managing work stress. The chapter on boundaries was exactly what I needed.", finishedDate: "3 weeks ago" },
      { id: 5, name: "Sarah M.", avatar: FRIEND_AVATARS.sarah, status: 'want_to_read' },
    ]
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
    availability: { status: 'high_demand', copiesAvailable: 2, totalCopies: 10, trendingInNetwork: true, friendsReading: 12 } as BookAvailability,
    description: "A beautiful collection of micro-meditations for the modern reader. Elena Rodriguez shows how even 60 seconds of mindful awareness can transform your day. Perfect for busy professionals who want the benefits of meditation without the time commitment.",
    genres: ["Meditation", "Self-Help", "Spirituality"],
    pageCount: 180,
    publishDate: "Jan 2026",
    friendsWhoRead: [
      { id: 1, name: "Jessica R.", avatar: FRIEND_AVATARS.jessica, rating: 5, status: 'read', review: "The 1-minute meditations are brilliant. I do them between meetings now.", finishedDate: "1 week ago" },
      { id: 3, name: "Emma L.", avatar: FRIEND_AVATARS.emma, rating: 5, status: 'read', finishedDate: "2 weeks ago" },
      { id: 2, name: "Michael T.", avatar: FRIEND_AVATARS.michael, status: 'reading' },
      { id: 4, name: "David K.", avatar: FRIEND_AVATARS.david, status: 'reading' },
    ]
  },
  { 
    id: 104, 
    title: "Patterns of Thought", 
    author: "James Wilson", 
    image: "https://images.unsplash.com/photo-1687093777245-bc60c636ddf0?w=400&q=80", 
    rating: 4.0, 
    reviewCount: 894,
    availability: { status: 'available', copiesAvailable: 8, totalCopies: 10 } as BookAvailability,
    description: "An exploration of how our thinking patterns shape our reality. Wilson combines cognitive science with practical wisdom to help readers identify and reshape unhelpful thought patterns. A must-read for anyone interested in personal growth.",
    genres: ["Psychology", "Cognitive Science", "Self-Help"],
    pageCount: 288,
    publishDate: "Sep 2025",
    friendsWhoRead: [
      { id: 5, name: "Sarah M.", avatar: FRIEND_AVATARS.sarah, rating: 3, status: 'read', review: "Interesting concepts but a bit academic at times.", finishedDate: "2 months ago" },
    ]
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

// Helper to check if a book is available now
const isBookAvailable = (availability?: BookAvailability) => {
  if (!availability) return true; // Show books without availability data
  return availability.status === 'available' || availability.status === 'high_demand';
};

// All books combined for counting
const ALL_BOOKS = [...BOOKS_JUST_FOR_YOU, ...BOOKS_1, ...BOOKS_2, ...BOOKS_3];

export function LibraryView({ onSyncGoodreads }: LibraryViewProps) {
  const [showSurvey, setShowSurvey] = useState(false);
  const [activeSocialView, setActiveSocialView] = useState<SocialView>(null);
  const [selectedBookForReviews, setSelectedBookForReviews] = useState<BookInfo | null>(null);
  const [selectedBookForDetail, setSelectedBookForDetail] = useState<BookDetail | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    availableNow: false,
    sortBy: null
  });

  // Sort books based on selected sort option
  const sortBooks = <T extends { rating?: number; reviewCount?: number }>(books: T[]): T[] => {
    if (!filters.sortBy) return books;
    
    const sorted = [...books];
    switch (filters.sortBy) {
      case 'most_reviews':
        return sorted.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
      case 'highest_rated':
        return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case 'random':
        // Shuffle using Fisher-Yates
        for (let i = sorted.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [sorted[i], sorted[j]] = [sorted[j], sorted[i]];
        }
        return sorted;
      default:
        return books;
    }
  };

  // Filter books based on availability
  const filterBooks = <T extends { availability?: BookAvailability }>(books: T[]): T[] => {
    if (!filters.availableNow) return books;
    return books.filter(book => isBookAvailable(book.availability));
  };

  // Filter and sort books
  const filterAndSortBooks = <T extends { availability?: BookAvailability; rating?: number; reviewCount?: number }>(books: T[]): T[] => {
    return sortBooks(filterBooks(books));
  };

  // Count available books
  const availableCount = useMemo(() => 
    ALL_BOOKS.filter(book => isBookAvailable(book.availability)).length,
    []
  );

  // Filtered and sorted book lists
  const filteredBooksJustForYou = useMemo(() => filterAndSortBooks(BOOKS_JUST_FOR_YOU), [filters.availableNow, filters.sortBy]);
  const filteredBooks1 = useMemo(() => filterAndSortBooks(BOOKS_1), [filters.availableNow, filters.sortBy]);
  const filteredBooks2 = useMemo(() => filterAndSortBooks(BOOKS_2), [filters.availableNow, filters.sortBy]);
  const filteredBooks3 = useMemo(() => filterAndSortBooks(BOOKS_3), [filters.availableNow, filters.sortBy]);

  // Helper to create a reviews click handler for a book
  const handleReviewsClick = (book: { title: string; author: string; image?: string; rating?: number; reviewCount?: number }) => {
    setSelectedBookForReviews({
      title: book.title,
      author: book.author,
      coverImage: book.image,
      rating: book.rating || 4.0,
      reviewCount: book.reviewCount || 0
    });
  };

  // Render reviews view (check first so it shows when navigating from book detail)
  if (selectedBookForReviews) {
    return (
      <ReviewsView 
        book={selectedBookForReviews} 
        onBack={() => {
          // Clear reviews - if we came from book detail, we'll go back there
          setSelectedBookForReviews(null);
        }} 
      />
    );
  }

  // Render book detail view
  if (selectedBookForDetail) {
    return (
      <BookDetailView 
        book={selectedBookForDetail}
        onBack={() => setSelectedBookForDetail(null)}
        onViewReviews={() => {
          setSelectedBookForReviews({
            title: selectedBookForDetail.title,
            author: selectedBookForDetail.author,
            coverImage: selectedBookForDetail.image,
            rating: selectedBookForDetail.rating,
            reviewCount: selectedBookForDetail.reviewCount
          });
        }}
      />
    );
  }

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
        <FilterBar 
          filters={filters} 
          onFilterChange={setFilters}
          availableCount={availableCount}
        />
        
        {/* Filter/Sort Active Indicator */}
        {(filters.availableNow || filters.sortBy) && (
          <div className="px-5 pb-3 -mt-2 flex flex-wrap gap-2">
            {filters.sortBy && (
              <div className="bg-[#00838F]/20 border border-[#00838F]/30 rounded-lg px-3 py-2 flex items-center gap-3">
                <span className="text-[#00E5FF] text-sm font-medium">
                  Sorted by {filters.sortBy === 'most_reviews' ? 'most reviews' : filters.sortBy === 'highest_rated' ? 'highest rated' : 'random'}
                </span>
                <button 
                  onClick={() => setFilters(f => ({ ...f, sortBy: null }))}
                  className="text-[#00E5FF] text-xs underline hover:text-[#4DD0E1]"
                >
                  Clear
                </button>
              </div>
            )}
            {filters.availableNow && (
              <div className="bg-emerald-500/20 border border-emerald-500/30 rounded-lg px-3 py-2 flex items-center gap-3">
                <span className="text-emerald-400 text-sm font-medium">
                  Available only
                </span>
                <button 
                  onClick={() => setFilters(f => ({ ...f, availableNow: false }))}
                  className="text-emerald-400 text-xs underline hover:text-emerald-300"
                >
                  Clear
                </button>
              </div>
            )}
          </div>
        )}

        {filteredBooksJustForYou.length > 0 && (
          <Section 
            title="Just For You" 
            subtitle={filters.availableNow 
              ? `${filteredBooksJustForYou.length} available titles picked for you`
              : "These were picked based on your past reading history and searches."
            }
            className="mt-2"
            showClose
          >
             <HorizontalScroll>
               {filteredBooksJustForYou.map(book => (
                 <BookCard 
                   key={book.id} 
                   {...book} 
                   showTitle
                   onClick={() => setSelectedBookForDetail(book)}
                   onReviewsClick={() => handleReviewsClick(book)}
                 />
               ))}
             </HorizontalScroll>
          </Section>
        )}

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
          availableNowFilter={filters.availableNow}
        />

        {filteredBooks1.length > 0 && (
          <Section 
            title="African American History Month..." 
            subtitle={filters.availableNow 
              ? `${filteredBooks1.length} available titles`
              : "Over 260 titles chosen by our librarians"
            }
            showClose
          >
             <HorizontalScroll>
               {filteredBooks1.map(book => (
                 <BookCard 
                   key={book.id} 
                   {...book} 
                   onReviewsClick={() => handleReviewsClick(book)}
                 />
               ))}
             </HorizontalScroll>
          </Section>
        )}

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

        {filteredBooks2.length > 0 && (
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
                  {filteredBooks2.map(book => (
                      <BookCard 
                        key={book.id} 
                        {...book} 
                        onReviewsClick={() => handleReviewsClick(book)}
                      />
                  ))}
              </HorizontalScroll>
          </Section>
        )}

        <Section 
            title="Favorite Magazines" 
            subtitle="Over 100 titles chosen by our librarians"
            className="mt-2"
            showClose
        >
            <MagazineGrid />
        </Section>
        
        {filteredBooks3.length > 0 && (
          <Section 
              title="Galentine's Day" 
              subtitle={filters.availableNow 
                ? `${filteredBooks3.length} available titles`
                : "Over 190 titles chosen by our librarians"
              }
              className="mt-2"
              showClose
          >
               <HorizontalScroll>
                  {filteredBooks3.map(book => (
                      <BookCard 
                        key={book.id} 
                        {...book} 
                        onReviewsClick={() => handleReviewsClick(book)}
                      />
                  ))}
              </HorizontalScroll>
          </Section>
        )}
        
         {[...filteredBooks2, ...filteredBooks1].length > 0 && (
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
                  {[...filteredBooks2, ...filteredBooks1].map((book, i) => (
                      <BookCard 
                        key={i} 
                        {...book} 
                        isAudiobook={false} 
                        duration="" 
                        onReviewsClick={() => handleReviewsClick(book)}
                      />
                  ))}
              </HorizontalScroll>
          </Section>
         )}
    </>
  );
}