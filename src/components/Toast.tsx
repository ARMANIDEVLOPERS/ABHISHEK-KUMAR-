import React from 'react';
import { useShop } from '../context/ShopContext';
import { CheckCircle2, Info, AlertCircle } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast } = useShop();

  if (!toast) return null;

  const Icon = toast.type === 'success' ? CheckCircle2 : toast.type === 'error' ? AlertCircle : Info;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-stone-900 text-stone-50 rounded-xl shadow-xl text-xs font-medium border border-stone-800 animate-in fade-in slide-in-from-bottom-2 duration-200">
      <Icon className={`w-4 h-4 shrink-0 ${toast.type === 'success' ? 'text-emerald-400' : toast.type === 'error' ? 'text-rose-400' : 'text-stone-300'}`} />
      <span>{toast.message}</span>
    </div>
  );
};
