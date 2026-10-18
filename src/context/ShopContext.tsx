import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Coupon, Order, ShippingDetails, Review } from '../types';
import { INITIAL_PRODUCTS, AVAILABLE_COUPONS } from '../data/products';

interface ShopContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  cartCount: number;
  wishlistCount: number;
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  estimatedTax: number;
  total: number;
  freeShippingThreshold: number;
  freeShippingRemaining: number;

  isCartOpen: boolean;
  isWishlistOpen: boolean;
  isCheckoutOpen: boolean;
  isOrdersOpen: boolean;
  quickViewProduct: Product | null;

  searchQuery: string;
  selectedCategory: string;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating';
  inStockOnly: boolean;
  activeCoupon: Coupon | null;

  setSearchQuery: (query: string) => void;
  setSelectedCategory: (cat: string) => void;
  setSortBy: (sort: 'featured' | 'price-asc' | 'price-desc' | 'rating') => void;
  setInStockOnly: (val: boolean) => void;

  addToCart: (product: Product, quantity?: number, selectedColor?: string) => void;
  removeFromCart: (productId: string, selectedColor?: string) => void;
  updateQuantity: (productId: string, quantity: number, selectedColor?: string) => void;
  clearCart: () => void;

  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;

  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;

  placeOrder: (
    shippingDetails: ShippingDetails,
    shippingMethod: 'standard' | 'express',
    paymentMethod: 'card' | 'cod' | 'digital'
  ) => Order;

  addReview: (productId: string, rating: number, comment: string, author: string) => void;

  openCart: () => void;
  closeCart: () => void;
  openWishlist: () => void;
  closeWishlist: () => void;
  openCheckout: () => void;
  closeCheckout: () => void;
  openOrders: () => void;
  closeOrders: () => void;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;

  toast: { message: string; type: 'success' | 'info' | 'error' } | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const SAMPLE_INITIAL_ORDER: Order = {
  id: 'ord-init-1',
  orderNumber: 'ATL-94021',
  date: 'October 16, 2026',
  items: [
    {
      product: INITIAL_PRODUCTS[0],
      quantity: 1,
      selectedColor: 'Sand Limestone'
    }
  ],
  subtotal: 145,
  discount: 0,
  shippingFee: 0,
  tax: 11.6,
  total: 156.6,
  shippingDetails: {
    fullName: 'Sophia Martinez',
    email: 'sophia.m@atelier.design',
    phone: '+1 (555) 349-8291',
    street: '742 Evergreen Terrace',
    city: 'San Francisco',
    state: 'CA',
    postalCode: '94110',
    country: 'United States'
  },
  shippingMethod: 'standard',
  paymentMethod: 'card',
  status: 'processing',
  estimatedDelivery: 'October 21, 2026',
  trackingNumber: 'ATL-TRK-7840192DK'
};

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('atelier_products');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_PRODUCTS;
      }
    }
    return INITIAL_PRODUCTS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('atelier_cart');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    // Default starter item so user immediately sees functional cart
    return [
      {
        product: INITIAL_PRODUCTS[0],
        quantity: 1,
        selectedColor: INITIAL_PRODUCTS[0].colors?.[0]?.name || 'Sand Limestone'
      }
    ];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('atelier_wishlist');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [INITIAL_PRODUCTS[1].id];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('atelier_orders');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [SAMPLE_INITIAL_ORDER];
      }
    }
    return [SAMPLE_INITIAL_ORDER];
  });

  const [activeCoupon, setActiveCoupon] = useState<Coupon | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [inStockOnly, setInStockOnly] = useState(false);

  // Toast
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  useEffect(() => {
    localStorage.setItem('atelier_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('atelier_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('atelier_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('atelier_products', JSON.stringify(products));
  }, [products]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 2800);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 200;
  const freeShippingRemaining = Math.max(0, freeShippingThreshold - subtotal);

  let discountAmount = 0;
  if (activeCoupon) {
    if (activeCoupon.discountPercent > 0) {
      discountAmount = (subtotal * activeCoupon.discountPercent) / 100;
    }
  }

  const shippingFee = (subtotal >= freeShippingThreshold || activeCoupon?.code === 'FREESHIP' || subtotal === 0) ? 0 : 15;
  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const estimatedTax = Number((taxableAmount * 0.08).toFixed(2));
  const total = Number((taxableAmount + shippingFee + estimatedTax).toFixed(2));

  const addToCart = (product: Product, quantity = 1, selectedColor?: string) => {
    const color = selectedColor || product.colors?.[0]?.name;
    setCart(prev => {
      const existingIndex = prev.findIndex(
        item => item.product.id === product.id && item.selectedColor === color
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity
        };
        return next;
      }
      return [...prev, { product, quantity, selectedColor: color }];
    });
    showToast(`Added ${product.name} to shopping bag`, 'success');
  };

  const removeFromCart = (productId: string, selectedColor?: string) => {
    setCart(prev =>
      prev.filter(
        item => !(item.product.id === productId && (!selectedColor || item.selectedColor === selectedColor))
      )
    );
    showToast('Item removed from bag', 'info');
  };

  const updateQuantity = (productId: string, quantity: number, selectedColor?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedColor);
      return;
    }
    setCart(prev =>
      prev.map(item => {
        if (item.product.id === productId && (!selectedColor || item.selectedColor === selectedColor)) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from saved list', 'info');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Saved to personal wishlist', 'success');
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    const found = AVAILABLE_COUPONS.find(c => c.code === clean);
    if (!found) {
      return { success: false, message: 'Invalid promo code' };
    }
    if (subtotal < found.minSpend) {
      return {
        success: false,
        message: `Requires minimum subtotal of $${found.minSpend}`
      };
    }
    setActiveCoupon(found);
    showToast(`Promo ${found.code} applied!`, 'success');
    return { success: true, message: `Applied: ${found.description}` };
  };

  const removeCoupon = () => {
    setActiveCoupon(null);
    showToast('Promo code removed', 'info');
  };

  const placeOrder = (
    shippingDetails: ShippingDetails,
    shippingMethod: 'standard' | 'express',
    paymentMethod: 'card' | 'cod' | 'digital'
  ): Order => {
    const finalShippingFee = shippingMethod === 'express' ? shippingFee + 20 : shippingFee;
    const finalTotal = Number((taxableAmount + finalShippingFee + estimatedTax).toFixed(2));
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: `ATL-${randomSuffix}`,
      date: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }),
      items: [...cart],
      subtotal,
      discount: discountAmount,
      shippingFee: finalShippingFee,
      tax: estimatedTax,
      total: finalTotal,
      shippingDetails,
      shippingMethod,
      paymentMethod,
      status: 'confirmed',
      estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }),
      trackingNumber: `ATL-TRK-${Math.floor(10000000 + Math.random() * 90000000)}DK`
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    setActiveCoupon(null);
    return newOrder;
  };

  const addReview = (productId: string, rating: number, comment: string, author: string) => {
    const newRev: Review = {
      id: `rev-${Date.now()}`,
      author: author.trim() || 'Anonymous Collector',
      rating,
      date: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }),
      comment,
      verified: true
    };

    setProducts(prev =>
      prev.map(p => {
        if (p.id === productId) {
          const updatedReviews = [newRev, ...p.reviews];
          const newAvg = Number(
            (updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length).toFixed(1)
          );
          return {
            ...p,
            reviews: updatedReviews,
            rating: newAvg,
            reviewCount: updatedReviews.length
          };
        }
        return p;
      })
    );

    if (quickViewProduct && quickViewProduct.id === productId) {
      setQuickViewProduct(prev => (prev ? {
        ...prev,
        reviews: [newRev, ...prev.reviews],
        reviewCount: prev.reviewCount + 1
      } : null));
    }

    showToast('Your review has been verified and published', 'success');
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const openWishlist = () => setIsWishlistOpen(true);
  const closeWishlist = () => setIsWishlistOpen(false);
  const openCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };
  const closeCheckout = () => setIsCheckoutOpen(false);
  const openOrders = () => setIsOrdersOpen(true);
  const closeOrders = () => setIsOrdersOpen(false);
  const openQuickView = (product: Product) => setQuickViewProduct(product);
  const closeQuickView = () => setQuickViewProduct(null);

  return (
    <ShopContext.Provider
      value={{
        products,
        cart,
        wishlist,
        orders,
        cartCount,
        wishlistCount,
        subtotal,
        discountAmount,
        shippingFee,
        estimatedTax,
        total,
        freeShippingThreshold,
        freeShippingRemaining,
        isCartOpen,
        isWishlistOpen,
        isCheckoutOpen,
        isOrdersOpen,
        quickViewProduct,
        searchQuery,
        selectedCategory,
        sortBy,
        inStockOnly,
        activeCoupon,
        setSearchQuery,
        setSelectedCategory,
        setSortBy,
        setInStockOnly,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isWishlisted,
        applyCoupon,
        removeCoupon,
        placeOrder,
        addReview,
        openCart,
        closeCart,
        openWishlist,
        closeWishlist,
        openCheckout,
        closeCheckout,
        openOrders,
        closeOrders,
        openQuickView,
        closeQuickView,
        toast,
        showToast
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
