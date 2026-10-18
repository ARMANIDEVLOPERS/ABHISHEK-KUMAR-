import React from 'react';
import { useShop } from '../context/ShopContext';
import { ArrowRight, Sparkles, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

export const Hero: React.FC = () => {
  const { setSelectedCategory } = useShop();

  const handleExplore = () => {
    setSelectedCategory('all');
    document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBestSellers = () => {
    setSelectedCategory('all');
    document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative pt-6 pb-12 sm:pt-10 sm:pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Split Hero Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Content Column */}
          <div className="lg:col-span-5 flex flex-col justify-center py-4 lg:py-8">
            
            {/* Quiet 1-line text kicker without pills */}
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500 font-medium mb-3">
              <span>Atelier Edition 2026</span>
              <span aria-hidden="true">·</span>
              <span>Architectural Living</span>
            </div>

            {/* Display headline with balanced wrapping */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif-display font-normal text-stone-900 tracking-tight leading-[1.12] mb-5 [text-wrap:balance]">
              Objects shaped by patience and raw material honesty.
            </h1>

            <p className="text-base text-stone-600 leading-relaxed max-w-xl mb-8 font-light">
              We collaborate directly with generational European and Japanese ateliers to craft stoneware, spun brass lighting, and acoustical instruments designed to outlive trends.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={handleExplore}
                className="px-6 py-3.5 bg-stone-900 text-stone-50 rounded-lg text-sm font-medium hover:bg-stone-800 transition-all shadow-xs flex items-center gap-2 group whitespace-nowrap active:translate-y-px"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={handleBestSellers}
                className="px-5 py-3.5 bg-white border border-stone-300 text-stone-800 rounded-lg text-sm font-medium hover:bg-stone-50 transition-colors whitespace-nowrap"
              >
                View Best Sellers
              </button>
            </div>

            {/* Adjacent Trust Proof */}
            <div className="mt-10 pt-6 border-t border-stone-200/80 flex items-center gap-6 text-xs text-stone-500">
              <div>
                <span className="block font-serif-display text-lg text-stone-900 font-medium tabular-nums">4.92 / 5</span>
                <span>Verified Buyer Rating</span>
              </div>
              <div className="h-8 w-px bg-stone-200" />
              <div>
                <span className="block font-serif-display text-lg text-stone-900 font-medium tabular-nums">100%</span>
                <span>Traceable Sourcing</span>
              </div>
              <div className="h-8 w-px bg-stone-200" />
              <div>
                <span className="block font-serif-display text-lg text-stone-900 font-medium tabular-nums">30-Day</span>
                <span>In-Home Trial</span>
              </div>
            </div>

          </div>

          {/* Hero Visual Imagery */}
          <div className="lg:col-span-7 flex">
            <div className="relative w-full h-80 sm:h-[420px] lg:h-full min-h-[380px] rounded-2xl overflow-hidden shadow-sm border border-stone-200/70 bg-stone-100">
              <img
                src="/src/assets/images/hero_atelier_living_1792336426964.jpg"
                alt="Contemporary architectural living interior with travertine coffee table and warm morning daylight"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 via-transparent to-transparent pointer-events-none" />
              
              {/* Caption Overlay */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 flex items-center justify-between text-white text-xs backdrop-blur-sm bg-stone-950/30 px-3.5 py-2 rounded-lg border border-white/10">
                <span className="font-medium tracking-wide">Living Space Concept & Furniture Plinth</span>
                <span className="font-mono text-stone-200">Kyoto / Milan Studio</span>
              </div>
            </div>
          </div>

        </div>

        {/* Adjacency strip in full width row below hero */}
        <div className="mt-12 pt-8 pb-4 border-t border-stone-200/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-xs text-stone-600">
          <div className="flex items-center gap-3">
            <Truck className="w-4 h-4 text-stone-700 shrink-0" />
            <div>
              <p className="font-medium text-stone-900">Carbon-Neutral Freight</p>
              <p className="text-stone-500">Fully offset domestic & global transit</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Sparkles className="w-4 h-4 text-stone-700 shrink-0" />
            <div>
              <p className="font-medium text-stone-900">Small-Batch Production</p>
              <p className="text-stone-500">Numbered artisan runs, no mass surplus</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <RefreshCw className="w-4 h-4 text-stone-700 shrink-0" />
            <div>
              <p className="font-medium text-stone-900">30-Day In-Home Trial</p>
              <p className="text-stone-500">Experience in your space risk-free</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ShieldCheck className="w-4 h-4 text-stone-700 shrink-0" />
            <div>
              <p className="font-medium text-stone-900">Material Guarantee</p>
              <p className="text-stone-500">Solid woods, brass & raw ceramics</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
