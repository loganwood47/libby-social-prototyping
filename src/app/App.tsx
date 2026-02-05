import React, { useState } from "react";
import { Layout } from "./components/Layout";
import { BottomNav } from "./components/BottomNav";
import { LibraryView } from "./views/LibraryView";
import { SearchView } from "./views/SearchView";
import { MenuView } from "./views/MenuView";
import { ShelfView } from "./views/ShelfView";
import { TagsView } from "./views/TagsView";

type View = 'search' | 'library' | 'menu' | 'shelf' | 'timeline';

export default function App() {
  const [activeTab, setActiveTab] = useState<View>('library');
  const [scrollToGoodreads, setScrollToGoodreads] = useState(false);

  const handleTabChange = (tab: View) => {
    setActiveTab(tab);
    if (tab !== 'menu') {
        setScrollToGoodreads(false);
    }
  };

  const handleSyncGoodreads = () => {
      setActiveTab('menu');
      setScrollToGoodreads(true);
  };

  return (
    <Layout>
      <div className="flex-1 overflow-y-auto no-scrollbar pb-0 relative bg-black">
        {activeTab === 'library' && <LibraryView onSyncGoodreads={handleSyncGoodreads} />}
        {activeTab === 'search' && <SearchView onNavigateToShelf={() => setActiveTab('shelf')} />}
        {activeTab === 'menu' && <MenuView scrollToGoodreads={scrollToGoodreads} />}
        {activeTab === 'shelf' && <ShelfView onGoHome={() => setActiveTab('library')} />}
        {activeTab === 'timeline' && <TagsView />}
      </div>
      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </Layout>
  );
}
