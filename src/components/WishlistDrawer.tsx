import React from 'react';
import { useShop } from '../context/ShopContext';
import { X, Trash2, ShoppingBag, Heart } from 'lucide-react';

export const WishlistDrawer: React.FC = () => {
  const {
    isWishlistOpen,
    closeWishlist,
    wishlist,
    products,
    toggleWishlist,
    addToCart
  } = useShop();

  if (!isWishlistOpen) return null;

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  const handleMoveToBag = (product: any) => {
    addToCart(product, 1);
    toggleWishlist(product.id);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="wishlist-title"
      className="fixed inset-0 z-50 overflow-hidden bg-stone-950/50 backdrop-blur-xs flex justify-end"
    >
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col transform transition-transform animate-in slide-in-from-right duration-250">
        
        {/* Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 id="wishlist-title" className="text-lg font-serif-display font-medium text-stone-900">
              Saved Collection
            </h2>
            <span className="font-mono tabular-nums text-xs text-stone-500">
              ({wishlist.length})
            </span>
          </div>
          <button
            onClick={closeWishlist}
            className="p-1.5 text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wishlist Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {wishlistedProducts.length > 0 ? (
            wishlistedProducts.map((product) => (
              <div
                key={product.id}
                className="flex gap-4 p-3.5 rounded-xl border border-stone-200/80 bg-[#FAF9F5] text-xs"
              >
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-stone-200 shrink-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h3 className="font-semibold text-stone-900 line-clamp-1">
                        {product.name}
                      </h3>
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="text-stone-400 hover:text-stone-700 p-0.5"
                        title="Remove from saved"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-[11px] text-stone-500 mt-0.5">{product.origin}</p>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-stone-200/50">
                    <span className="font-mono tabular-nums font-semibold text-stone-900 text-sm">
                      ${product.price}
                    </span>

                    <button
                      onClick={() => handleMoveToBag(product)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-md text-[11px] font-medium transition-colors"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-24 text-center text-stone-400">
              <Heart className="w-10 h-10 mx-auto mb-2 text-stone-300" />
              <p className="font-serif-display text-base text-stone-700 mb-1">Your wishlist is empty</p>
              <p className="text-xs">Click the heart icon on any object to curate your personal archive.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        {wishlistedProducts.length > 0 && (
          <div className="p-4 border-t border-stone-200 bg-stone-50">
            <button
              onClick={() => {
                wishlistedProducts.forEach((p) => addToCart(p, 1));
                wishlist.forEach((id) => toggleWishlist(id));
                closeWishlist();
              }}
              className="w-full py-2.5 bg-stone-900 text-white rounded-lg text-xs font-medium hover:bg-stone-800 transition-colors shadow-xs"
            >
              Move All to Bag ({wishlist.length})
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
