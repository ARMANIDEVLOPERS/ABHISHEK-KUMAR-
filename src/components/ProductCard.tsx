import React, { useState } from 'react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { Heart, Plus, Star, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleWishlist, isWishlisted, openQuickView } = useShop();
  const [imageError, setImageError] = useState(false);
  const wishlisted = isWishlisted(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <article
      onClick={() => openQuickView(product)}
      className="group cursor-pointer flex flex-col bg-white rounded-xl border border-stone-200/80 overflow-hidden hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
    >
      {/* 4:3 Image Container */}
      <div className="relative aspect-[4/3] w-full bg-[#F5F2EB] overflow-hidden flex items-center justify-center">
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300 ease-out"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-stone-100 text-stone-500">
            <span className="font-serif-display text-lg text-stone-700 mb-1">{product.name}</span>
            <span className="text-xs text-stone-400">{product.material}</span>
          </div>
        )}

        {/* Minimal text badge if Best Seller or New */}
        {(product.isBestSeller || product.isNewArrival) && (
          <div className="absolute top-3 left-3">
            <span className="text-[11px] font-medium tracking-wide uppercase px-2 py-0.5 bg-stone-900/90 text-stone-100 rounded backdrop-blur-xs">
              {product.isBestSeller ? 'Collection Focus' : 'New Arrival'}
            </span>
          </div>
        )}

        {/* Wishlist Heart Button */}
        <button
          onClick={handleWishlistClick}
          aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all ${
            wishlisted
              ? 'bg-rose-50 text-rose-600 shadow-xs'
              : 'bg-white/80 backdrop-blur-xs text-stone-600 hover:text-stone-900 hover:bg-white shadow-xs'
          }`}
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-rose-600 text-rose-600' : ''}`} />
        </button>

        {/* Action Overlay Bar */}
        <div className="absolute inset-x-3 bottom-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
          <button
            onClick={handleQuickAdd}
            className="flex-1 py-2 px-3 bg-stone-900/95 hover:bg-stone-900 text-stone-100 text-xs font-medium rounded-lg backdrop-blur-xs shadow-sm flex items-center justify-center gap-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Quick Add</span>
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              openQuickView(product);
            }}
            className="p-2 bg-white/95 hover:bg-white text-stone-800 rounded-lg backdrop-blur-xs shadow-sm transition-colors"
            title="Quick view product specs"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Card Content & Metadata */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Clean unboxed metadata with typographic dot separator */}
          <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1.5 font-light">
            <span>{product.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{product.origin}</span>
          </div>

          {/* Product Title */}
          <h3 className="text-base font-semibold text-stone-900 group-hover:text-stone-700 transition-colors line-clamp-1 mb-1">
            {product.name}
          </h3>

          <p className="text-xs text-stone-500 line-clamp-1 mb-3">
            {product.subtitle}
          </p>
        </div>

        {/* Price & Rating Bar */}
        <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-semibold font-mono tabular-nums text-stone-900">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-stone-400 line-through font-mono tabular-nums">
                ${product.originalPrice}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 text-xs text-stone-500">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-mono tabular-nums font-medium text-stone-700">{product.rating}</span>
            <span className="text-stone-400">({product.reviewCount})</span>
          </div>
        </div>
      </div>
    </article>
  );
};
