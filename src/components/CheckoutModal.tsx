import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ShippingDetails, Order } from '../types';
import { X, CheckCircle2, ShieldCheck, Truck, CreditCard, Banknote, Smartphone, ArrowRight, ArrowLeft } from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    closeCheckout,
    cart,
    subtotal,
    discountAmount,
    shippingFee,
    estimatedTax,
    total,
    placeOrder,
    openOrders
  } = useShop();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod' | 'digital'>('card');
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  const [formData, setFormData] = useState<ShippingDetails>({
    fullName: 'Sophia Martinez',
    email: 'sophia.m@atelier.design',
    phone: '+1 (555) 349-8291',
    street: '742 Evergreen Terrace',
    apartment: 'Apt 4B',
    city: 'San Francisco',
    state: 'CA',
    postalCode: '94110',
    country: 'United States'
  });

  const [cardDetails, setCardDetails] = useState({
    number: '•••• •••• •••• 4242',
    exp: '12/28',
    cvc: '883'
  });

  if (!isCheckoutOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const currentShippingFee = shippingMethod === 'express' ? shippingFee + 20 : shippingFee;
  const currentTotal = Number((Math.max(0, subtotal - discountAmount) + currentShippingFee + estimatedTax).toFixed(2));

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      // Place real order
      const newOrder = placeOrder(formData, shippingMethod, paymentMethod);
      setPlacedOrder(newOrder);
      setStep(4);
    }
  };

  const handleFinish = () => {
    closeCheckout();
    setStep(1);
    openOrders();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Modal Top */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50/50">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-stone-400 font-medium">Secured Checkout</span>
            <h2 id="checkout-title" className="text-xl font-serif-display font-medium text-stone-900">
              {step === 4 ? 'Acquisition Confirmed' : 'Complete Your Acquisition'}
            </h2>
          </div>
          {step !== 4 && (
            <button
              onClick={closeCheckout}
              className="p-1.5 text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Step Indicator (Steps 1-3) */}
        {step !== 4 && (
          <div className="px-6 py-3 bg-stone-50 border-b border-stone-200 flex items-center justify-between text-xs">
            <div className={`flex items-center gap-1.5 ${step >= 1 ? 'text-stone-900 font-semibold' : 'text-stone-400'}`}>
              <span className="w-5 h-5 rounded-full bg-stone-900 text-white text-[10px] flex items-center justify-center font-mono">1</span>
              <span>Address</span>
            </div>
            <div className="w-8 h-px bg-stone-300" />
            <div className={`flex items-center gap-1.5 ${step >= 2 ? 'text-stone-900 font-semibold' : 'text-stone-400'}`}>
              <span className={`w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-mono ${step >= 2 ? 'bg-stone-900 text-white' : 'bg-stone-200 text-stone-600'}`}>2</span>
              <span>Delivery</span>
            </div>
            <div className="w-8 h-px bg-stone-300" />
            <div className={`flex items-center gap-1.5 ${step >= 3 ? 'text-stone-900 font-semibold' : 'text-stone-400'}`}>
              <span className={`w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-mono ${step >= 3 ? 'bg-stone-900 text-white' : 'bg-stone-200 text-stone-600'}`}>3</span>
              <span>Payment</span>
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {step === 1 && (
            <form id="step-form" onSubmit={handleNextStep} className="space-y-4 text-xs">
              <h3 className="font-semibold text-stone-800 text-sm">Delivery Destination</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-stone-600 mb-1 font-medium">Full Legal Name</label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-stone-800"
                  />
                </div>
                <div>
                  <label className="block text-stone-600 mb-1 font-medium">Email for Order Updates</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-stone-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-stone-600 mb-1 font-medium">Phone Number (For Carrier SMS)</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-stone-800"
                  />
                </div>
                <div>
                  <label className="block text-stone-600 mb-1 font-medium">Street Address</label>
                  <input
                    type="text"
                    name="street"
                    required
                    value={formData.street}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-stone-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-stone-600 mb-1 font-medium">City</label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-stone-800"
                  />
                </div>
                <div>
                  <label className="block text-stone-600 mb-1 font-medium">State / Region</label>
                  <input
                    type="text"
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-stone-800"
                  />
                </div>
                <div>
                  <label className="block text-stone-600 mb-1 font-medium">Postal Code</label>
                  <input
                    type="text"
                    name="postalCode"
                    required
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-stone-800 font-mono"
                  />
                </div>
              </div>
            </form>
          )}

          {step === 2 && (
            <div className="space-y-4 text-xs">
              <h3 className="font-semibold text-stone-800 text-sm">Select Courier Logistics</h3>
              
              <div className="space-y-3">
                <label
                  onClick={() => setShippingMethod('standard')}
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                    shippingMethod === 'standard'
                      ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Truck className="w-5 h-5 text-stone-700" />
                    <div>
                      <p className="font-semibold text-stone-900">Standard Climate-Neutral Freight</p>
                      <p className="text-stone-500">Delivered within 3–5 business days · Signature required</p>
                    </div>
                  </div>
                  <span className="font-mono font-medium text-stone-900">
                    {shippingFee === 0 ? 'Complimentary' : `$${shippingFee}`}
                  </span>
                </label>

                <label
                  onClick={() => setShippingMethod('express')}
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                    shippingMethod === 'express'
                      ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Truck className="w-5 h-5 text-stone-700" />
                    <div>
                      <p className="font-semibold text-stone-900">White-Glove Express Air</p>
                      <p className="text-stone-500">Delivered within 1–2 business days · Priority handling</p>
                    </div>
                  </div>
                  <span className="font-mono font-medium text-stone-900">
                    +${shippingFee + 20}
                  </span>
                </label>
              </div>

              <div className="p-3 bg-stone-50 rounded-lg text-stone-600 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-stone-700 shrink-0" />
                <span>All shipments are insured up to $5,000 against transit damage or loss.</span>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 text-xs">
              <h3 className="font-semibold text-stone-800 text-sm">Settlement Method</h3>

              {/* Payment Tabs */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-lg border text-center transition-all ${
                    paymentMethod === 'card'
                      ? 'border-stone-900 bg-stone-50 font-semibold text-stone-900'
                      : 'border-stone-200 text-stone-600 hover:border-stone-300'
                  }`}
                >
                  <CreditCard className="w-4 h-4 mx-auto mb-1 text-stone-700" />
                  <span>Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('digital')}
                  className={`p-3 rounded-lg border text-center transition-all ${
                    paymentMethod === 'digital'
                      ? 'border-stone-900 bg-stone-50 font-semibold text-stone-900'
                      : 'border-stone-200 text-stone-600 hover:border-stone-300'
                  }`}
                >
                  <Smartphone className="w-4 h-4 mx-auto mb-1 text-stone-700" />
                  <span>Apple / Google Pay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3 rounded-lg border text-center transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-stone-900 bg-stone-50 font-semibold text-stone-900'
                      : 'border-stone-200 text-stone-600 hover:border-stone-300'
                  }`}
                >
                  <Banknote className="w-4 h-4 mx-auto mb-1 text-stone-700" />
                  <span>Cash on Delivery</span>
                </button>
              </div>

              {/* Method form body */}
              {paymentMethod === 'card' && (
                <div className="space-y-3 p-4 bg-stone-50 rounded-xl border border-stone-200">
                  <div>
                    <label className="block text-stone-600 mb-1">Card Number</label>
                    <input
                      type="text"
                      value={cardDetails.number}
                      onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-stone-900 font-mono text-xs focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-stone-600 mb-1">Expiration</label>
                      <input
                        type="text"
                        value={cardDetails.exp}
                        onChange={(e) => setCardDetails({ ...cardDetails, exp: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-stone-900 font-mono text-xs focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-600 mb-1">CVC Security</label>
                      <input
                        type="password"
                        value={cardDetails.cvc}
                        onChange={(e) => setCardDetails({ ...cardDetails, cvc: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-stone-900 font-mono text-xs focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'digital' && (
                <div className="p-6 bg-stone-50 rounded-xl border border-stone-200 text-center">
                  <Smartphone className="w-8 h-8 mx-auto text-stone-700 mb-2" />
                  <p className="font-semibold text-stone-900 mb-1">Biometric 1-Click Authentication</p>
                  <p className="text-stone-500 text-xs">Simulated instant authorization via Apple Pay / Google Wallet.</p>
                </div>
              )}

              {paymentMethod === 'cod' && (
                <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
                  <div className="flex items-center gap-2 text-stone-900 font-semibold">
                    <Banknote className="w-4 h-4 text-stone-800" />
                    <span>Cash on Delivery Verification</span>
                  </div>
                  <p className="text-stone-600">
                    Pay upon arrival at <strong>{formData.street}, {formData.city}</strong>. Exact cash or courier card terminal accepted upon physical inspection.
                  </p>
                  <p className="text-[11px] text-stone-500">
                    A carrier dispatch SMS will be sent to {formData.phone} prior to delivery.
                  </p>
                </div>
              )}

              {/* Order total confirmation */}
              <div className="p-3 bg-stone-100 rounded-lg flex items-center justify-between text-xs font-semibold text-stone-900">
                <span>Total Charge (USD):</span>
                <span className="font-mono tabular-nums text-base">${currentTotal}</span>
              </div>
            </div>
          )}

          {step === 4 && placedOrder && (
            <div className="py-6 text-center space-y-4">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-wider text-emerald-700 font-semibold">Order Placed Successfully</span>
                <h3 className="text-2xl font-serif-display font-medium text-stone-900 mt-1">
                  Order #{placedOrder.orderNumber} Confirmed
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Confirmation and receipt dispatched to {placedOrder.shippingDetails.email}
                </p>
              </div>

              {/* Receipt Overview Card */}
              <div className="max-w-md mx-auto p-4 bg-stone-50 border border-stone-200 rounded-xl text-left text-xs space-y-2">
                <div className="flex justify-between border-b border-stone-200 pb-2">
                  <span className="text-stone-500">Tracking Reference:</span>
                  <span className="font-mono text-stone-900 font-semibold">{placedOrder.trackingNumber}</span>
                </div>
                <div className="flex justify-between border-b border-stone-200 pb-2">
                  <span className="text-stone-500">Estimated Delivery:</span>
                  <span className="text-stone-900 font-medium">{placedOrder.estimatedDelivery}</span>
                </div>
                <div className="flex justify-between border-b border-stone-200 pb-2">
                  <span className="text-stone-500">Shipping Address:</span>
                  <span className="text-stone-900 text-right font-medium">
                    {placedOrder.shippingDetails.street}, {placedOrder.shippingDetails.city}
                  </span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="font-semibold text-stone-900">Total Settled:</span>
                  <span className="font-mono tabular-nums font-semibold text-stone-900 text-sm">
                    ${placedOrder.total}
                  </span>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-center gap-3">
                <button
                  onClick={handleFinish}
                  className="px-6 py-2.5 bg-stone-900 text-white rounded-lg text-xs font-medium hover:bg-stone-800 transition-colors"
                >
                  View Order Status & Tracking
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Controls (Steps 1-3) */}
        {step !== 4 && (
          <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between text-xs">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((step - 1) as any)}
                className="flex items-center gap-1.5 px-3 py-2 text-stone-600 hover:text-stone-900 font-medium transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            <button
              type="button"
              onClick={handleNextStep}
              className="flex items-center gap-2 px-5 py-2.5 bg-stone-900 text-white rounded-lg font-medium hover:bg-stone-800 transition-colors shadow-xs active:translate-y-px"
            >
              <span>{step === 3 ? `Authorize $${currentTotal}` : 'Continue'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
