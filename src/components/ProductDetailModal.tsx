import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Star, Heart, Check, Plus, Minus, Shield, Truck, CornerDownRight, MessageSquarePlus } from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const {
    quickViewProduct,
    closeQuickView,
    addToCart,
    toggleWishlist,
    isWishlisted,
    openCheckout,
    addReview
  } = useShop();

  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'story' | 'reviews'>('details');

  // Review form state
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const wishlisted = isWishlisted(product.id);
  const currentColor = selectedColor || product.colors?.[0]?.name || '';

  const handleAdd = () => {
    addToCart(product, quantity, currentColor);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, currentColor);
    closeQuickView();
    openCheckout();
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewComment.trim()) return;
    addReview(product.id, reviewRating, reviewComment, reviewAuthor);
    setReviewComment('');
    setReviewAuthor('');
    setShowReviewForm(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-detail-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Modal Close Button */}
        <button
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 hover:bg-white text-stone-600 hover:text-stone-900 shadow-xs border border-stone-200 transition-colors"
          title="Close product detail"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Body */}
        <div className="overflow-y-auto flex-1 p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Gallery Left (Sticky Desktop) */}
            <div className="md:col-span-6 flex flex-col gap-3">
              <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-[#F5F2EB] border border-stone-200/80">
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                
                {product.isBestSeller && (
                  <span className="absolute top-3 left-3 text-[11px] font-medium tracking-wide uppercase px-2.5 py-0.5 bg-stone-900 text-stone-100 rounded">
                    Collection Focus
                  </span>
                )}
              </div>

              {/* Material & Provenance Callout */}
              <div className="bg-stone-50 border border-stone-200/60 rounded-lg p-3 text-xs text-stone-600 flex items-center justify-between">
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase tracking-wider">Provenance</span>
                  <span className="font-medium text-stone-800">{product.origin}</span>
                </div>
                <div className="h-6 w-px bg-stone-200" />
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase tracking-wider">Material</span>
                  <span className="font-medium text-stone-800">{product.material}</span>
                </div>
              </div>
            </div>

            {/* Contiguous Purchase Module Right */}
            <div className="md:col-span-6 flex flex-col">
              
              {/* Category & Origin unboxed */}
              <div className="flex items-center gap-2 text-xs text-stone-500 mb-2 font-light">
                <span>{product.categoryLabel}</span>
                <span aria-hidden="true">·</span>
                <span>Small Batch Run</span>
              </div>

              {/* Title */}
              <h2 id="product-detail-title" className="text-2xl sm:text-3xl font-serif-display font-medium text-stone-900 tracking-tight mb-2">
                {product.name}
              </h2>

              {/* Price & Rating */}
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-stone-100">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-mono tabular-nums font-semibold text-stone-900">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-stone-400 line-through font-mono tabular-nums">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => setActiveTab('reviews')}
                  className="flex items-center gap-1.5 text-xs text-stone-600 hover:text-stone-900 transition-colors"
                >
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-mono tabular-nums font-semibold text-stone-800">{product.rating}</span>
                  <span className="text-stone-400">({product.reviewCount} reviews)</span>
                </button>
              </div>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Colorway Variant Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-stone-500">Colorway:</span>
                    <span className="font-medium text-stone-800">{currentColor}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`group relative w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                          currentColor === c.name
                            ? 'ring-2 ring-stone-900 ring-offset-2 border-transparent scale-105'
                            : 'border-stone-300 hover:border-stone-500'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      >
                        {currentColor === c.name && (
                          <Check className="w-3.5 h-3.5 text-stone-900 drop-shadow-xs" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Stepper & Stock */}
              <div className="flex items-center justify-between mb-6 pb-6 border-b border-stone-100">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-stone-500">Quantity:</span>
                  <div className="flex items-center border border-stone-300 rounded-lg bg-stone-50 overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 hover:bg-stone-200 text-stone-700 transition-colors"
                      title="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-9 text-center font-mono tabular-nums text-xs font-semibold text-stone-800">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 hover:bg-stone-200 text-stone-700 transition-colors"
                      title="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <div className="text-xs text-stone-500 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block" />
                  <span>In Stock ({product.inventoryCount} units remaining)</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
                <button
                  onClick={handleAdd}
                  className="w-full sm:flex-1 py-3 px-4 bg-stone-900 text-white text-xs font-medium rounded-lg hover:bg-stone-800 transition-all shadow-xs flex items-center justify-center gap-2 active:translate-y-px"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add to Shopping Bag</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="w-full sm:w-auto py-3 px-5 bg-stone-100 text-stone-900 hover:bg-stone-200 text-xs font-medium rounded-lg transition-colors whitespace-nowrap"
                >
                  Buy Now
                </button>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                  className={`p-3 rounded-lg border transition-colors ${
                    wishlisted
                      ? 'border-rose-300 bg-rose-50 text-rose-600'
                      : 'border-stone-300 hover:border-stone-400 text-stone-600 hover:text-stone-900'
                  }`}
                  title={wishlisted ? 'Saved to Wishlist' : 'Save to Wishlist'}
                >
                  <Heart className={`w-4 h-4 ${wishlisted ? 'fill-rose-600 text-rose-600' : ''}`} />
                </button>
              </div>

              {/* Guarantee highlights */}
              <div className="space-y-2 pt-2 border-t border-stone-100 text-xs text-stone-500">
                <div className="flex items-center gap-2">
                  <Truck className="w-3.5 h-3.5 text-stone-700" />
                  <span>Insured climate-neutral transit with signature on delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5 text-stone-700" />
                  <span>Lifetime warranty against structural material defects</span>
                </div>
              </div>

            </div>
          </div>

          {/* Deep Tabs: Specifications, Craft Story, Customer Reviews */}
          <div className="mt-10 pt-6 border-t border-stone-200">
            <div className="flex items-center gap-6 border-b border-stone-200 pb-3 mb-6">
              <button
                onClick={() => setActiveTab('details')}
                className={`text-xs font-medium tracking-wide transition-colors pb-1 ${
                  activeTab === 'details'
                    ? 'text-stone-900 border-b-2 border-stone-900 font-semibold'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                Specifications & Features
              </button>
              <button
                onClick={() => setActiveTab('story')}
                className={`text-xs font-medium tracking-wide transition-colors pb-1 ${
                  activeTab === 'story'
                    ? 'text-stone-900 border-b-2 border-stone-900 font-semibold'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                Atelier Craftsmanship
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`text-xs font-medium tracking-wide transition-colors pb-1 flex items-center gap-1.5 ${
                  activeTab === 'reviews'
                    ? 'text-stone-900 border-b-2 border-stone-900 font-semibold'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                <span>Collector Reviews</span>
                <span className="font-mono tabular-nums text-stone-400">({product.reviews.length})</span>
              </button>
            </div>

            {/* Tab 1: Details */}
            {activeTab === 'details' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-stone-600">
                <div>
                  <h4 className="font-medium text-stone-900 mb-2 uppercase tracking-wider text-[11px]">Dimensions & Specifications</h4>
                  <p className="mb-2"><strong className="text-stone-800 font-normal">Physical Dimensions:</strong> {product.dimensions}</p>
                  <p className="mb-2"><strong className="text-stone-800 font-normal">Base Material:</strong> {product.material}</p>
                  <p><strong className="text-stone-800 font-normal">Workshop Location:</strong> {product.origin}</p>
                </div>
                <div>
                  <h4 className="font-medium text-stone-900 mb-2 uppercase tracking-wider text-[11px]">Architectural Highlights</h4>
                  <ul className="space-y-1.5">
                    {product.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CornerDownRight className="w-3.5 h-3.5 text-stone-400 mt-0.5 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Tab 2: Craft Story */}
            {activeTab === 'story' && (
              <div className="max-w-2xl text-xs sm:text-sm text-stone-600 leading-relaxed space-y-3">
                <p>{product.story}</p>
                <p className="text-xs text-stone-500 italic">
                  Crafted by dedicated artisans whose trade has been handed down through generations. Due to the unadulterated nature of raw clay, brass, and wood, each piece contains subtle character marks unique to its maker.
                </p>
              </div>
            )}

            {/* Tab 3: Reviews & Review Submission */}
            {activeTab === 'reviews' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h4 className="font-medium text-stone-900 text-sm">Verified Reviews</h4>
                    <p className="text-xs text-stone-500">Real feedback from design collectors and patrons</p>
                  </div>
                  <button
                    onClick={() => setShowReviewForm(!showReviewForm)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 text-stone-50 rounded-lg text-xs font-medium hover:bg-stone-800 transition-colors"
                  >
                    <MessageSquarePlus className="w-3.5 h-3.5" />
                    <span>{showReviewForm ? 'Cancel Review' : 'Write a Review'}</span>
                  </button>
                </div>

                {/* Interactive Review Form */}
                {showReviewForm && (
                  <form onSubmit={handleReviewSubmit} className="bg-stone-50 border border-stone-200 rounded-xl p-4 sm:p-5 mb-6 text-xs">
                    <h5 className="font-semibold text-stone-800 mb-3">Share your collector experience</h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
                      <div>
                        <label className="block text-stone-600 mb-1">Your Full Name</label>
                        <input
                          type="text"
                          required
                          value={reviewAuthor}
                          onChange={(e) => setReviewAuthor(e.target.value)}
                          placeholder="e.g. Maya Lin"
                          className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-stone-800"
                        />
                      </div>
                      <div>
                        <label className="block text-stone-600 mb-1">Rating</label>
                        <select
                          value={reviewRating}
                          onChange={(e) => setReviewRating(Number(e.target.value))}
                          className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-stone-800 cursor-pointer"
                        >
                          <option value={5}>5 Stars - Exceptional</option>
                          <option value={4}>4 Stars - Very Good</option>
                          <option value={3}>3 Stars - Average</option>
                          <option value={2}>2 Stars - Below Expectations</option>
                          <option value={1}>1 Star - Unsatisfactory</option>
                        </select>
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="block text-stone-600 mb-1">Your Feedback</label>
                      <textarea
                        required
                        rows={3}
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        placeholder="Detail the texture, lighting presence, or material finish..."
                        className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-stone-800"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-stone-900 text-white rounded-lg font-medium hover:bg-stone-800 transition-colors"
                    >
                      Publish Verified Review
                    </button>
                  </form>
                )}

                {/* Review Cards List */}
                <div className="space-y-4">
                  {product.reviews.map((rev) => (
                    <div key={rev.id} className="p-4 rounded-xl bg-stone-50 border border-stone-200/60 text-xs">
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-stone-900">{rev.author}</span>
                          {rev.verified && (
                            <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-medium">
                              Verified Patron
                            </span>
                          )}
                        </div>
                        <span className="text-stone-400 font-mono">{rev.date}</span>
                      </div>
                      <div className="flex items-center gap-1 mb-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-stone-300'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-stone-600 leading-relaxed">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
