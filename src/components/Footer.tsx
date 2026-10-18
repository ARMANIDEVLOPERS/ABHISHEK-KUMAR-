import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ArrowRight, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setSelectedCategory } = useShop();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
  };

  const handleCategoryClick = (cat: string) => {
    setSelectedCategory(cat);
    document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
          
          {/* Brand Column */}
          <div className="md:col-span-4 space-y-4">
            <span className="text-2xl font-serif-display font-medium text-stone-100 tracking-tight block">
              ATELIER
            </span>
            <p className="text-stone-400 leading-relaxed max-w-sm font-light">
              An independent design studio and curation collective dedicated to objects of enduring weight, unlacquered honesty, and architectural calm.
            </p>
            <div className="pt-2 text-stone-500 text-[11px] font-mono">
              Atelier Archive № 2026 · Kyoto · Milan · Copenhagen
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-stone-100 font-medium uppercase tracking-wider text-[11px]">Collection</h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button onClick={() => handleCategoryClick('ceramics')} className="hover:text-stone-100 transition-colors">
                  Ceramics & Vessels
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('lighting')} className="hover:text-stone-100 transition-colors">
                  Lighting & Lamps
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('audio')} className="hover:text-stone-100 transition-colors">
                  Audio & Soundboxes
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('textiles')} className="hover:text-stone-100 transition-colors">
                  Woven Textiles
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('workspace')} className="hover:text-stone-100 transition-colors">
                  Workspace Objects
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h4 className="text-stone-100 font-medium uppercase tracking-wider text-[11px]">Patron Care</h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <span className="hover:text-stone-100 transition-colors cursor-pointer">
                  30-Day In-Home Trial
                </span>
              </li>
              <li>
                <span className="hover:text-stone-100 transition-colors cursor-pointer">
                  Freight & Global Transit
                </span>
              </li>
              <li>
                <span className="hover:text-stone-100 transition-colors cursor-pointer">
                  Stoneware & Brass Care
                </span>
              </li>
              <li>
                <span className="hover:text-stone-100 transition-colors cursor-pointer">
                  Lifetime Material Warranty
                </span>
              </li>
              <li>
                <span className="hover:text-stone-100 transition-colors cursor-pointer">
                  Trade & Hospitality Inquiries
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-stone-100 font-medium uppercase tracking-wider text-[11px]">The Atelier Gazette</h4>
            <p className="text-stone-400 leading-relaxed font-light">
              Receive notifications when new kiln firings and small-batch editions arrive. Strictly seasonal; zero marketing noise.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 p-3 bg-stone-800 text-stone-200 rounded-lg">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>You have been subscribed to the seasonal edition.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="patron@example.com"
                  className="flex-1 px-3.5 py-2.5 bg-stone-800 border border-stone-700 rounded-lg text-stone-100 placeholder:text-stone-500 text-xs focus:outline-none focus:border-stone-400"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-stone-100 text-stone-900 rounded-lg font-medium hover:bg-white transition-colors flex items-center justify-center shrink-0"
                  title="Subscribe"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-500 text-[11px]">
          <p>© 2026 ATELIER Living & Design Store. All international rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-stone-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-stone-400 cursor-pointer">Privacy Protocol</span>
            <span className="hover:text-stone-400 cursor-pointer">Carbon Offset Verification</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
