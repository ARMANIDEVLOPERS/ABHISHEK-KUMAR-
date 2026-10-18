/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShopProvider } from './context/ShopContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCatalog } from './components/ProductCatalog';
import { BrandStory } from './components/BrandStory';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CheckoutModal } from './components/CheckoutModal';
import { OrdersModal } from './components/OrdersModal';
import { Toast } from './components/Toast';

export default function App() {
  return (
    <ShopProvider>
      <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-stone-900 selection:bg-stone-200">
        <Header />
        <main className="flex-1">
          <Hero />
          <ProductCatalog />
          <BrandStory />
        </main>
        <Footer />

        {/* Global Overlays & Drawers */}
        <CartDrawer />
        <WishlistDrawer />
        <ProductDetailModal />
        <CheckoutModal />
        <OrdersModal />
        <Toast />
      </div>
    </ShopProvider>
  );
}
