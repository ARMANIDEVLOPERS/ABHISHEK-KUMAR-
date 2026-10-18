import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Trash2, Plus, Minus, ArrowRight, Tag, Sparkles } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    closeCart,
    cart,
    removeFromCart,
    updateQuantity,
    subtotal,
    discountAmount,
    shippingFee,
    estimatedTax,
    total,
    freeShippingThreshold,
    freeShippingRemaining,
    activeCoupon,
    applyCoupon,
    removeCoupon,
    openCheckout
  } = useShop();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponInput('');
    }
  };

  const progressPercent = Math.min(100, Math.round(((freeShippingThreshold - freeShippingRemaining) / freeShippingThreshold) * 100));

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
      className="fixed inset-0 z-50 overflow-hidden bg-stone-950/50 backdrop-blur-xs flex justify-end"
    >
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col transform transition-transform animate-in slide-in-from-right duration-250">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 id="cart-drawer-title" className="text-lg font-serif-display font-medium text-stone-900">
              Shopping Bag
            </h2>
            <span className="font-mono tabular-nums text-xs text-stone-500">
              ({cart.reduce((s, i) => s + i.quantity, 0)})
            </span>
          </div>
          <button
            onClick={closeCart}
            className="p-1.5 text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors"
            title="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Meter */}
        <div className="px-5 py-3 bg-stone-50 border-b border-stone-200 text-xs">
          {freeShippingRemaining > 0 ? (
            <div>
              <p className="text-stone-700 font-medium mb-1.5">
                Add <span className="font-mono tabular-nums font-semibold text-stone-900">${freeShippingRemaining}</span> more for complimentary shipping
              </p>
              <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-stone-900 transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-emerald-800 font-medium">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Complimentary climate-neutral shipping unlocked!</span>
            </div>
          )}
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedColor || ''}`}
                className="flex gap-4 p-3 rounded-xl border border-stone-100 bg-[#FAF9F5] text-xs"
              >
                {/* Thumbnail */}
                <div className="w-18 h-18 rounded-lg overflow-hidden bg-stone-200 shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-medium text-stone-900 leading-snug line-clamp-1">
                        {item.product.name}
                      </h3>
                      <button
                        onClick={() => removeFromCart(item.product.id, item.selectedColor)}
                        className="text-stone-400 hover:text-stone-700 p-0.5"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {item.selectedColor && (
                      <p className="text-[11px] text-stone-500 mt-0.5">
                        Color: {item.selectedColor}
                      </p>
                    )}
                  </div>

                  {/* Price & Quantity Stepper */}
                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-stone-200/50">
                    <div className="flex items-center border border-stone-300 rounded bg-white">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedColor)}
                        className="p-1 hover:bg-stone-100 text-stone-600"
                        title="Decrease"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-7 text-center font-mono tabular-nums font-medium text-stone-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedColor)}
                        className="p-1 hover:bg-stone-100 text-stone-600"
                        title="Increase"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="font-mono tabular-nums font-semibold text-stone-900 text-sm">
                      ${item.product.price * item.quantity}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-24 text-center text-stone-400">
              <p className="font-serif-display text-lg text-stone-600 mb-1">Your bag is empty</p>
              <p className="text-xs">Explore the permanent collection to select timeless objects.</p>
            </div>
          )}
        </div>

        {/* Cart Footer: Coupons, Calculations & Checkout Button */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-stone-200 bg-white space-y-4 text-xs">
            
            {/* Promo Code Input */}
            <div>
              {activeCoupon ? (
                <div className="flex items-center justify-between bg-stone-100 px-3 py-2 rounded-lg text-stone-800">
                  <div className="flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-stone-600" />
                    <span className="font-mono font-medium">{activeCoupon.code}</span>
                    <span className="text-stone-500 text-[11px]">({activeCoupon.description})</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-stone-500 hover:text-stone-900 font-semibold"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Promo code (e.g. WELCOME10)"
                    className="flex-1 px-3 py-1.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 text-xs focus:outline-none focus:border-stone-900 font-mono uppercase placeholder:normal-case"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-stone-900 text-white rounded-lg font-medium hover:bg-stone-800 transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponError && (
                <p className="text-[11px] text-rose-600 mt-1">{couponError}</p>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 pt-2 border-t border-stone-100 text-stone-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums font-medium text-stone-900">${subtotal}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Promotion Discount</span>
                  <span className="font-mono tabular-nums font-medium">-${discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-mono tabular-nums font-medium text-stone-900">
                  {shippingFee === 0 ? 'Complimentary' : `$${shippingFee}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Sales Tax</span>
                <span className="font-mono tabular-nums font-medium text-stone-900">${estimatedTax}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-stone-200 text-sm font-semibold text-stone-900">
                <span>Total Due</span>
                <span className="font-mono tabular-nums text-base">${total}</span>
              </div>
            </div>

            {/* Primary Checkout CTA */}
            <button
              onClick={openCheckout}
              className="w-full py-3.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg font-medium text-xs tracking-wide flex items-center justify-center gap-2 shadow-xs transition-colors active:translate-y-px"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[10px] text-center text-stone-400">
              Encrypted SSL checkout · 30-Day in-home return policy
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
