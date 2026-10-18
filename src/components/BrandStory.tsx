import React from 'react';
import { Compass, Feather, Hammer } from 'lucide-react';

export const BrandStory: React.FC = () => {
  return (
    <section id="story-section" className="py-16 sm:py-24 border-t border-stone-200/80 bg-[#F5F2EB]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Heading */}
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500 font-medium mb-2">
            <span>The Workshop Manifesto</span>
            <span aria-hidden="true">·</span>
            <span>Ethical Materiality</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif-display font-normal text-stone-900 tracking-tight leading-tight [text-wrap:balance]">
            Resisting the ephemeral through heavyweight honest materials.
          </h2>
        </div>

        {/* 3-Column Craftsmanship Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="p-6 bg-white rounded-xl border border-stone-200/80 shadow-xs">
            <div className="w-9 h-9 rounded-lg bg-stone-100 flex items-center justify-center text-stone-900 mb-4">
              <Hammer className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-stone-900 text-sm mb-2">
              Unadulterated Raw Surfaces
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed font-light">
              We decline synthetic lacquers and plastic stabilizers. Our stoneware remains unsealed where tactile interaction occurs, and our brass is wax-rubbed to evolve an authentic living patina.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl border border-stone-200/80 shadow-xs">
            <div className="w-9 h-9 rounded-lg bg-stone-100 flex items-center justify-center text-stone-900 mb-4">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-stone-900 text-sm mb-2">
              Direct Atelier Cooperatives
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed font-light">
              By bypassing wholesalers, 68% of object proceeds flow directly back to master ceramicists in Kyoto and metal turners in Lombardy, sustaining regional craft traditions.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl border border-stone-200/80 shadow-xs">
            <div className="w-9 h-9 rounded-lg bg-stone-100 flex items-center justify-center text-stone-900 mb-4">
              <Feather className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-stone-900 text-sm mb-2">
              Lifetime Repair Guarantee
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed font-light">
              Every lamp, speaker enclosure, and stoneware vessel is constructed with serviceable fasteners and modular drivers so they may be repaired, rewired, or restored indefinitely.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
