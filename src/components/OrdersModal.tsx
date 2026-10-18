import React from 'react';
import { useShop } from '../context/ShopContext';
import { X, Package, CheckCircle2, Clock, Truck, ShieldCheck } from 'lucide-react';

export const OrdersModal: React.FC = () => {
  const { isOrdersOpen, closeOrders, orders } = useShop();

  if (!isOrdersOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="orders-tracker-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-auto max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50/50">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-stone-400 font-medium">Patron Account</span>
            <h2 id="orders-tracker-title" className="text-xl font-serif-display font-medium text-stone-900">
              Orders & Consignment Tracking
            </h2>
          </div>
          <button
            onClick={closeOrders}
            className="p-1.5 text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {orders.length > 0 ? (
            orders.map((order) => {
              const statusSteps = [
                { id: 'confirmed', label: 'Order Confirmed', icon: CheckCircle2 },
                { id: 'processing', label: 'Artisan Inspection', icon: Clock },
                { id: 'shipped', label: 'In Transit', icon: Truck },
                { id: 'delivered', label: 'Delivered', icon: ShieldCheck }
              ];

              const currentStepIndex =
                order.status === 'confirmed'
                  ? 0
                  : order.status === 'processing'
                  ? 1
                  : order.status === 'shipped'
                  ? 2
                  : 3;

              return (
                <div key={order.id} className="p-5 rounded-xl border border-stone-200 bg-[#FAF9F5] text-xs space-y-4">
                  {/* Top Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-stone-200">
                    <div>
                      <span className="text-stone-400 block text-[10px] uppercase tracking-wider">Consignment Number</span>
                      <span className="font-serif-display text-base font-semibold text-stone-900">
                        Order #{order.orderNumber}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-stone-400 block text-[10px] uppercase tracking-wider">Acquisition Date</span>
                      <span className="font-mono text-stone-700">{order.date}</span>
                    </div>
                  </div>

                  {/* Status Progression Bar */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-stone-500">Logistics Status:</span>
                      <span className="font-medium text-stone-900 capitalize">
                        {statusSteps[currentStepIndex].label}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-2">
                      {statusSteps.map((step, idx) => {
                        const Icon = step.icon;
                        const isDone = idx <= currentStepIndex;
                        return (
                          <div key={step.id} className="flex flex-col items-center text-center">
                            <div
                              className={`w-7 h-7 rounded-full flex items-center justify-center mb-1.5 transition-colors ${
                                isDone
                                  ? 'bg-stone-900 text-stone-50'
                                  : 'bg-stone-200 text-stone-400'
                              }`}
                            >
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                            <span className={`text-[10px] line-clamp-1 ${isDone ? 'font-medium text-stone-900' : 'text-stone-400'}`}>
                              {step.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Tracking reference */}
                  <div className="bg-white p-3 rounded-lg border border-stone-200/80 flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <span className="text-stone-400 text-[10px] block uppercase tracking-wider">Tracking Reference</span>
                      <span className="font-mono font-semibold text-stone-800">{order.trackingNumber}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 text-[10px] block uppercase tracking-wider">Estimated Delivery</span>
                      <span className="font-medium text-stone-800">{order.estimatedDelivery}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 text-[10px] block uppercase tracking-wider">Total</span>
                      <span className="font-mono font-semibold text-stone-900 tabular-nums">${order.total}</span>
                    </div>
                  </div>

                  {/* Itemized list */}
                  <div className="space-y-2 pt-2 border-t border-stone-200/50">
                    <span className="text-stone-400 text-[10px] uppercase tracking-wider block">Acquired Objects</span>
                    {order.items.map((item, i) => (
                      <div key={i} className="flex items-center justify-between text-stone-700">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-stone-500">{item.quantity}×</span>
                          <span>{item.product.name}</span>
                          {item.selectedColor && (
                            <span className="text-stone-400 text-[11px]">({item.selectedColor})</span>
                          )}
                        </div>
                        <span className="font-mono tabular-nums font-medium text-stone-900">
                          ${item.product.price * item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Shipping address footer */}
                  <div className="pt-2 text-[11px] text-stone-500">
                    <span>Delivering to: </span>
                    <strong className="text-stone-700 font-medium">{order.shippingDetails.fullName}</strong> — {order.shippingDetails.street}, {order.shippingDetails.city}, {order.shippingDetails.postalCode}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-16 text-center text-stone-400">
              <Package className="w-10 h-10 mx-auto mb-2 text-stone-300" />
              <p className="font-serif-display text-base text-stone-700 mb-1">No Orders Found</p>
              <p className="text-xs">Once you acquire an object, its live logistics progression will display here.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end">
          <button
            onClick={closeOrders}
            className="px-5 py-2 bg-stone-900 text-white rounded-lg text-xs font-medium hover:bg-stone-800 transition-colors"
          >
            Close Tracking
          </button>
        </div>

      </div>
    </div>
  );
};
