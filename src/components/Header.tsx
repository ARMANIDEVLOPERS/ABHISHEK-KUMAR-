import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ShoppingBag, Heart, Search, PackageCheck, X } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    cartCount,
    wishlistCount,
    openCart,
    openWishlist,
    openOrders,
    searchQuery,
    setSearchQuery,
    setSelectedCategory
  } = useShop();

  const [showSearchInput, setShowSearchInput] = useState(false);

  const handleNavClick = (category: string) => {
    setSelectedCategory(category);
    const catalogElem = document.getElementById('catalog-section');
    if (catalogElem) {
      catalogElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStoryClick = () => {
    const storyElem = document.getElementById('story-section');
    if (storyElem) {
      storyElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Subtle announcement bar - strictly <= 40px */}
      <aside aria-label="Announcement" className="h-9 bg-stone-900 text-stone-200 text-xs px-4 flex items-center justify-center font-medium tracking-wide">
        <p className="text-center truncate">
          Complimentary insured shipping on domestic acquisitions over $200 · Use code <span className="font-mono text-stone-100 font-semibold underline underline-offset-2">WELCOME10</span> for 10% off
        </p>
      </aside>

      {/* Top Bar Contract: 3 zones separated by gap-8 */}
      <header className="sticky top-0 z-30 bg-[#FAF9F5]/90 backdrop-blur-md border-b border-stone-200/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
          
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => handleNavClick('all')}
            className="text-2xl font-serif-display font-medium tracking-tight text-stone-900 whitespace-nowrap shrink-0 hover:text-stone-700 transition-colors focus-visible:outline-none"
          >
            ATELIER
          </button>

          {/* Zone 2: 4–5 clean single-line text navigation links */}
          <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600">
            <button
              onClick={() => handleNavClick('all')}
              className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none"
            >
              Collection
            </button>
            <button
              onClick={() => handleNavClick('ceramics')}
              className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none"
            >
              Ceramics
            </button>
            <button
              onClick={() => handleNavClick('lighting')}
              className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none"
            >
              Lighting
            </button>
            <button
              onClick={() => handleNavClick('audio')}
              className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none"
            >
              Acoustics
            </button>
            <button
              onClick={handleStoryClick}
              className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none"
            >
              Our Story
            </button>
          </nav>

          {/* Zone 3: 1 primary interactive action cluster */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Search Toggle */}
            <div className="relative flex items-center">
              {showSearchInput ? (
                <div className="flex items-center bg-white border border-stone-300 rounded-lg px-2.5 py-1.5 shadow-xs w-48 sm:w-64 transition-all">
                  <Search className="w-4 h-4 text-stone-400 shrink-0 mr-2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search objects..."
                    autoFocus
                    className="w-full text-xs text-stone-900 bg-transparent focus:outline-none placeholder:text-stone-400"
                  />
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setShowSearchInput(false);
                    }}
                    className="text-stone-400 hover:text-stone-700 ml-1"
                    title="Close search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowSearchInput(true)}
                  aria-label="Search collection"
                  className="p-2 text-stone-700 hover:text-stone-950 rounded-lg hover:bg-stone-100 transition-colors focus-visible:ring-1 focus-visible:ring-stone-400"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Orders Tracker Button */}
            <button
              onClick={openOrders}
              aria-label="View Orders"
              title="Track Orders"
              className="hidden sm:flex items-center gap-1.5 p-2 text-stone-700 hover:text-stone-950 rounded-lg hover:bg-stone-100 transition-colors text-xs font-medium focus-visible:ring-1 focus-visible:ring-stone-400"
            >
              <PackageCheck className="w-5 h-5" />
              <span className="whitespace-nowrap">Orders</span>
            </button>

            {/* Wishlist Button */}
            <button
              onClick={openWishlist}
              aria-label="Saved Wishlist"
              className="relative p-2 text-stone-700 hover:text-stone-950 rounded-lg hover:bg-stone-100 transition-colors focus-visible:ring-1 focus-visible:ring-stone-400"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 bg-stone-900 text-stone-100 text-[10px] font-mono tabular-nums flex items-center justify-center rounded-full leading-none">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Bag Primary Trigger */}
            <button
              onClick={openCart}
              aria-label="Shopping Bag"
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors whitespace-nowrap shrink-0 shadow-xs active:translate-y-px"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Bag</span>
              <span className="font-mono tabular-nums text-stone-300">
                ({cartCount})
              </span>
            </button>
          </div>

        </div>
      </header>
    </>
  );
};
