import React, { useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import { SlidersHorizontal, Check, RefreshCw } from 'lucide-react';

const CATEGORIES = [
  { id: 'all', label: 'All Objects' },
  { id: 'ceramics', label: 'Ceramics & Vessels' },
  { id: 'lighting', label: 'Lamps & Lighting' },
  { id: 'audio', label: 'Audio & Acoustics' },
  { id: 'textiles', label: 'Textiles & Living' },
  { id: 'workspace', label: 'Workspace' },
];

export const ProductCatalog: React.FC = () => {
  const {
    products,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    inStockOnly,
    setInStockOnly
  } = useShop();

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Category filter
        if (selectedCategory !== 'all' && product.category !== selectedCategory) {
          return false;
        }
        // Search filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = product.name.toLowerCase().includes(q);
          const matchSub = product.subtitle.toLowerCase().includes(q);
          const matchMat = product.material.toLowerCase().includes(q);
          const matchOrig = product.origin.toLowerCase().includes(q);
          if (!matchName && !matchSub && !matchMat && !matchOrig) {
            return false;
          }
        }
        // In-stock filter
        if (inStockOnly && !product.inStock) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        // Default featured: best sellers first, then rating
        if (a.isBestSeller && !b.isBestSeller) return -1;
        if (!a.isBestSeller && b.isBestSeller) return 1;
        return b.rating - a.rating;
      });
  }, [products, selectedCategory, searchQuery, inStockOnly, sortBy]);

  const clearAllFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setInStockOnly(false);
    setSortBy('featured');
  };

  return (
    <section id="catalog-section" className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading & Filter Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-stone-500 font-medium mb-1">
              <span>Permanent Storefront</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums">{filteredProducts.length} Objects</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif-display font-medium text-stone-900 tracking-tight">
              Curated Catalog
            </h2>
          </div>

          {/* Sort & Quick Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* In stock toggle */}
            <button
              onClick={() => setInStockOnly(!inStockOnly)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                inStockOnly
                  ? 'bg-stone-900 text-stone-50 border-stone-900'
                  : 'bg-white text-stone-700 border-stone-300 hover:border-stone-400'
              }`}
            >
              <Check className={`w-3.5 h-3.5 ${inStockOnly ? 'opacity-100' : 'opacity-0'}`} />
              <span>In Stock Only</span>
            </button>

            {/* Sort Selector */}
            <div className="flex items-center gap-1.5 bg-white border border-stone-300 rounded-lg px-2.5 py-1.5 text-xs text-stone-700">
              <SlidersHorizontal className="w-3.5 h-3.5 text-stone-400" />
              <span className="text-stone-400">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent font-medium text-stone-800 focus:outline-none cursor-pointer pr-1"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Segmented Controls (Button tabs) */}
        <div className="py-6 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-stone-900 text-stone-50 shadow-xs'
                  : 'bg-white border border-stone-200 text-stone-600 hover:text-stone-900 hover:border-stone-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Active search filter indicator if query exists */}
        {searchQuery && (
          <div className="mb-6 flex items-center justify-between bg-stone-100 px-4 py-2.5 rounded-lg text-xs text-stone-700">
            <span>
              Showing results matching &ldquo;<strong>{searchQuery}</strong>&rdquo;
            </span>
            <button
              onClick={() => setSearchQuery('')}
              className="text-stone-500 hover:text-stone-900 font-medium underline"
            >
              Clear search
            </button>
          </div>
        )}

        {/* Products Grid: 3-column desktop, 2-column tablet, 1-column mobile */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-white rounded-2xl border border-stone-200/80 p-8">
            <h3 className="text-lg font-serif-display text-stone-800 mb-2">No matching objects found</h3>
            <p className="text-xs text-stone-500 max-w-md mx-auto mb-6">
              We couldn&apos;t find any objects matching your current filter criteria. Try adjusting your query or resetting filters.
            </p>
            <button
              onClick={clearAllFilters}
              className="inline-flex items-center gap-2 px-4 py-2 bg-stone-900 text-white rounded-lg text-xs font-medium hover:bg-stone-800 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
