import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { formatPrice } from '@/lib/utils';
import { ChevronRight, Truck, CreditCard, ShieldCheck, Lock, CheckCircle2, Info, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/supabase';

export default function Checkout() {
  const { items, totalAmount, totalItems, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    province: 'Punjab',
    postalCode: '',
    phone: '',
    paymentMethod: 'cod'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    if (step < 3) {
      setStep(step + 1);
      return;
    }

    if (!items.length) {
      setSubmitError('Your cart is empty. Please add items before checkout.');
      return;
    }

    setSubmitting(true);

    const orderedQtyByProduct = items.reduce<Record<string, number>>((acc, item) => {
      acc[item.product_id] = (acc[item.product_id] || 0) + item.quantity;
      return acc;
    }, {});

    const productIds = Object.keys(orderedQtyByProduct);
    const titleByProduct = items.reduce<Record<string, string>>((acc, item) => {
      if (!acc[item.product_id]) {
        acc[item.product_id] = item.product.title;
      }
      return acc;
    }, {});

    const { data: stockRows, error: stockFetchError } = await supabase
      .from('products')
      .select('id, stock')
      .in('id', productIds);

    if (stockFetchError || !stockRows) {
      setSubmitting(false);
      setSubmitError(stockFetchError?.message || 'Unable to verify stock. Please try again.');
      return;
    }

    const stockByProductId = stockRows.reduce<Record<string, number>>((acc, row) => {
      acc[row.id] = Number(row.stock) || 0;
      return acc;
    }, {});

    for (const productId of productIds) {
      if (!(productId in stockByProductId)) {
        setSubmitting(false);
        setSubmitError(`Product not found: ${titleByProduct[productId] || productId}`);
        return;
      }

      const available = stockByProductId[productId];
      const required = orderedQtyByProduct[productId];

      if (available < required) {
        setSubmitting(false);
        setSubmitError(`Insufficient stock for ${titleByProduct[productId] || 'an item'}. Available: ${available}`);
        return;
      }
    }

    const orderNumber = `ORD-${Date.now()}-${Math.floor(Math.random() * 900 + 100)}`;
    const shippingFee = 0;

    const shippingAddress = {
      email: formData.email,
      first_name: formData.firstName,
      last_name: formData.lastName,
      address: formData.address,
      city: formData.city,
      province: formData.province,
      postal_code: formData.postalCode,
      phone: formData.phone,
      payment_method: formData.paymentMethod,
    };

    const { data: orderInsert, error: orderError } = await supabase
      .from('orders')
      .insert([
        {
          user_id: user?.id || null,
          order_number: orderNumber,
          total_amount: totalAmount + shippingFee,
          shipping_fee: shippingFee,
          payment_status: 'pending',
          order_status: 'processing',
          shipping_address: shippingAddress,
        },
      ])
      .select('id')
      .single();

    if (orderError || !orderInsert?.id) {
      setSubmitting(false);
      setSubmitError(orderError?.message || 'Failed to place order. Please try again.');
      return;
    }

    const orderItemsPayload = items.map((item) => ({
      order_id: orderInsert.id,
      product_id: item.product_id,
      title: item.product.title,
      price: item.product.discount_price || item.product.price,
      quantity: item.quantity,
      size: item.size,
      color: item.color,
      image: item.product.images[0] || null,
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItemsPayload);

    if (itemsError) {
      await supabase.from('orders').delete().eq('id', orderInsert.id);
      setSubmitting(false);
      setSubmitError(itemsError.message || 'Order items could not be saved.');
      return;
    }

    const stockUpdates = await Promise.all(
      productIds.map(async (productId) => {
        const newStock = Math.max(0, stockByProductId[productId] - orderedQtyByProduct[productId]);
        const { error } = await supabase
          .from('products')
          .update({ stock: newStock })
          .eq('id', productId);

        return { productId, error };
      })
    );

    const failedStockUpdate = stockUpdates.find((result) => result.error);

    if (failedStockUpdate) {
      await Promise.all(
        productIds.map((productId) =>
          supabase
            .from('products')
            .update({ stock: stockByProductId[productId] })
            .eq('id', productId)
        )
      );
      await supabase.from('order_items').delete().eq('order_id', orderInsert.id);
      await supabase.from('orders').delete().eq('id', orderInsert.id);

      setSubmitting(false);
      setSubmitError(failedStockUpdate.error?.message || 'Failed to update inventory for this order.');
      return;
    }

    clearCart();
    setSubmitting(false);
    navigate('/checkout/success');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-brand-muted/30 to-white py-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Premium Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-gold/10 px-4 py-1.5 mb-6 border border-brand-gold/20">
            <Zap size={14} className="text-brand-gold" />
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-gold">Secure Checkout</p>
          </div>
          <h1 className="text-4xl sm:text-5xl font-display leading-tight mb-3">Complete Your Order</h1>
          <p className="text-sm text-brand-gray max-w-2xl mx-auto">Step through our streamlined checkout process. Your order details are encrypted and secure.</p>
        </div>

        {/* Step Indicator - Premium */}
        <div className="mb-14">
          <div className="flex items-center justify-between max-w-2xl mx-auto mb-4">
            {[
              { num: 1, label: 'Information', desc: 'Your Details' },
              { num: 2, label: 'Shipping', desc: 'Delivery Method' },
              { num: 3, label: 'Payment', desc: 'Confirm & Pay' }
            ].map((s, i) => (
              <div key={s.num} className="flex items-center gap-3 sm:gap-6 flex-1">
                <div className="flex flex-col items-center gap-2 flex-1">
                  <div className={cn(
                    'w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 border-2',
                    step >= s.num
                      ? 'bg-brand-dark text-white border-brand-dark shadow-lg'
                      : 'bg-white text-brand-gray border-brand-muted'
                  )}>
                    {step > s.num ? <CheckCircle2 size={20} /> : s.num}
                  </div>
                  <div className="hidden sm:block text-center">
                    <p className="text-[10px] uppercase tracking-widest font-bold text-brand-gray">{s.label}</p>
                    <p className="text-[9px] text-brand-gray/70">{s.desc}</p>
                  </div>
                </div>
                {i < 2 && (
                  <div className={cn(
                    'h-0.5 flex-1 transition-all duration-300',
                    step > s.num ? 'bg-brand-dark' : 'bg-brand-muted'
                  )} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 xl:gap-16">
          {/* Checkout Form - Enhanced */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-12">
              {/* Step 1: Information */}
              {step === 1 && (
                <div className="space-y-8">
                  {/* Contact Section */}
                  <div className="bg-white rounded-3xl border border-brand-muted p-8 shadow-[0_8px_30px_-12px_rgba(20,20,20,0.1)]">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-2 h-2 bg-brand-gold rounded-full" />
                      <h2 className="text-lg font-display font-bold">Contact Information</h2>
                    </div>
                    <p className="text-xs text-brand-gray uppercase tracking-widest mb-6">Where we'll send your order confirmations</p>
                    <input 
                      type="email" 
                      name="email"
                      placeholder="your@email.com" 
                      required
                      className="w-full px-4 py-3 rounded-xl border border-brand-muted bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-gold transition-all"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Shipping Address Section */}
                  <div className="bg-white rounded-3xl border border-brand-muted p-8 shadow-[0_8px_30px_-12px_rgba(20,20,20,0.1)]">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-2 h-2 bg-brand-gold rounded-full" />
                      <h2 className="text-lg font-display font-bold">Shipping Address</h2>
                    </div>
                    <p className="text-xs text-brand-gray uppercase tracking-widest mb-6">Where your order will be delivered</p>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] uppercase tracking-widest font-bold text-brand-gray mb-2">First Name</label>
                          <input 
                            type="text" 
                            name="firstName"
                            placeholder="First Name" 
                            required
                            className="w-full px-4 py-3 rounded-xl border border-brand-muted bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-gold transition-all"
                            value={formData.firstName}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase tracking-widest font-bold text-brand-gray mb-2">Last Name</label>
                          <input 
                            type="text" 
                            name="lastName"
                            placeholder="Last Name" 
                            required
                            className="w-full px-4 py-3 rounded-xl border border-brand-muted bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-gold transition-all"
                            value={formData.lastName}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest font-bold text-brand-gray mb-2">Street Address</label>
                        <input 
                          type="text" 
                          name="address"
                          placeholder="House #, Street Name, Apartment #" 
                          required
                          className="w-full px-4 py-3 rounded-xl border border-brand-muted bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-gold transition-all"
                          value={formData.address}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] uppercase tracking-widest font-bold text-brand-gray mb-2">City</label>
                          <input 
                            type="text" 
                            name="city"
                            placeholder="City" 
                            required
                            className="w-full px-4 py-3 rounded-xl border border-brand-muted bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-gold transition-all"
                            value={formData.city}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase tracking-widest font-bold text-brand-gray mb-2">Province</label>
                          <select 
                            name="province"
                            className="w-full px-4 py-3 rounded-xl border border-brand-muted bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-gold transition-all"
                            value={formData.province}
                            onChange={handleInputChange}
                          >
                            <option>Punjab</option>
                            <option>Sindh</option>
                            <option>KPK</option>
                            <option>Balochistan</option>
                            <option>Islamabad</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] uppercase tracking-widest font-bold text-brand-gray mb-2">Postal Code</label>
                          <input 
                            type="text" 
                            name="postalCode"
                            placeholder="Postal Code" 
                            required
                            className="w-full px-4 py-3 rounded-xl border border-brand-muted bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-gold transition-all"
                            value={formData.postalCode}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase tracking-widest font-bold text-brand-gray mb-2">Phone Number</label>
                          <input 
                            type="tel" 
                            name="phone"
                            placeholder="+92 300 1234567" 
                            required
                            className="w-full px-4 py-3 rounded-xl border border-brand-muted bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-gold transition-all"
                            value={formData.phone}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Shipping */}
              {step === 2 && (
                <div className="space-y-8">
                  <div className="bg-white rounded-3xl border border-brand-muted p-8 shadow-[0_8px_30px_-12px_rgba(20,20,20,0.1)]">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-2 h-2 bg-brand-gold rounded-full" />
                      <h2 className="text-lg font-display font-bold">Delivery Method</h2>
                    </div>
                    <p className="text-xs text-brand-gray uppercase tracking-widest mb-6">Standard shipping is complimentary on all orders</p>
                    
                    <div className="relative border-2 border-brand-dark rounded-2xl p-6 bg-gradient-to-br from-brand-dark/5 to-transparent">
                      <div className="flex items-start gap-6">
                        <div className="p-3 rounded-xl bg-brand-dark text-white flex-shrink-0">
                          <Truck size={24} />
                        </div>
                        <div className="flex-grow">
                          <h3 className="text-lg font-bold mb-1">Standard Delivery</h3>
                          <p className="text-sm text-brand-gray mb-3">Nationwide delivery in 3-5 business days</p>
                          <div className="flex flex-wrap gap-2">
                            <span className="text-[10px] uppercase tracking-widest font-bold bg-brand-gold/10 text-brand-dark px-2.5 py-1 rounded-full border border-brand-gold/30">Free Shipping</span>
                            <span className="text-[10px] uppercase tracking-widest font-bold bg-state-success/10 text-state-success px-2.5 py-1 rounded-full border border-state-success/30">Trackable</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Payment */}
              {step === 3 && (
                <div className="space-y-8">
                  <div className="bg-white rounded-3xl border border-brand-muted p-8 shadow-[0_8px_30px_-12px_rgba(20,20,20,0.1)]">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-2 h-2 bg-brand-gold rounded-full" />
                      <h2 className="text-lg font-display font-bold">Payment Method</h2>
                    </div>
                    <p className="text-xs text-brand-gray uppercase tracking-widest mb-6">Select your preferred payment method below</p>
                    
                    <div className="space-y-3">
                      {/* COD Option */}
                      <label className={cn(
                        'relative flex items-start gap-4 p-5 rounded-2xl cursor-pointer transition-all duration-200 border-2',
                        formData.paymentMethod === 'cod'
                          ? 'border-brand-dark bg-white'
                          : 'border-brand-muted/60 hover:border-brand-muted bg-white'
                      )}>
                        {/* Left Accent Bar */}
                        <div className={cn(
                          'w-1 h-full rounded-full transition-all duration-200 flex-shrink-0 -mx-5 pl-5',
                          formData.paymentMethod === 'cod' ? 'bg-brand-dark' : 'bg-transparent'
                        )} />
                        
                        <input 
                          type="radio" 
                          name="paymentMethod" 
                          value="cod" 
                          checked={formData.paymentMethod === 'cod'}
                          onChange={handleInputChange}
                          className="mt-1 w-5 h-5 accent-brand-dark flex-shrink-0 cursor-pointer"
                        />
                        
                        <div className="flex-grow">
                          <p className="text-sm font-bold text-brand-dark mb-1">Cash on Delivery</p>
                          <p className="text-xs text-brand-gray leading-relaxed">Pay securely when you receive your order.<br />No hidden charges, full transparency.</p>
                        </div>
                        
                        <div className={cn(
                          'w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200',
                          formData.paymentMethod === 'cod'
                            ? 'border-brand-dark bg-brand-dark'
                            : 'border-brand-muted/60 bg-white'
                        )}>
                          {formData.paymentMethod === 'cod' && (
                            <div className="w-2 h-2 bg-white rounded-full" />
                          )}
                        </div>
                      </label>

                      {/* Card Option - Coming Soon */}
                      <label className={cn(
                        'relative flex items-start gap-4 p-5 rounded-2xl cursor-not-allowed transition-all duration-200 border-2 opacity-50 grayscale'
                      )}>
                        {/* Left Accent Bar */}
                        <div className="w-1 h-full rounded-full bg-transparent flex-shrink-0 -mx-5 pl-5" />
                        
                        <input 
                          type="radio" 
                          name="paymentMethod" 
                          value="card" 
                          disabled
                          className="mt-1 w-5 h-5 accent-brand-dark flex-shrink-0 cursor-not-allowed"
                        />
                        
                        <div className="flex-grow">
                          <p className="text-sm font-bold text-brand-dark mb-1">Credit / Debit Card</p>
                          <p className="text-xs text-brand-gray leading-relaxed">Secure online payment processing<br />Coming soon to our platform.</p>
                        </div>
                        
                        <div className="w-6 h-6 rounded-full border-2 border-brand-muted/60 bg-white flex-shrink-0" />
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {submitError && (
                <div className="rounded-2xl border border-state-error/30 bg-state-error/10 px-5 py-4 flex items-start gap-3">
                  <Info size={18} className="text-state-error flex-shrink-0 mt-0.5" />
                  <p className="text-xs uppercase tracking-widest font-bold text-state-error">{submitError}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-brand-muted">
                <button 
                  type="button"
                  onClick={() => step > 1 ? setStep(step - 1) : navigate('/cart')}
                  className="text-xs uppercase tracking-widest font-bold text-brand-gray hover:text-brand-dark transition-colors disabled:opacity-50"
                  disabled={submitting}
                >
                  {step > 1 ? "← Back to Previous Step" : "← Return to Cart"}
                </button>
                <button 
                  type="submit" 
                  className="w-full sm:w-auto btn-primary px-8 py-4 flex items-center justify-center gap-3 disabled:opacity-70"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Placing Order...
                    </>
                  ) : (
                    <>
                      {step === 3 ? 'Complete Your Order' : 'Continue'}
                      <ChevronRight size={18} />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Order Summary - Premium */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-6">
              {/* Summary Card */}
              <div className="bg-white rounded-3xl border border-brand-muted p-8 shadow-[0_12px_40px_-20px_rgba(20,20,20,0.12)]">
                <div className="flex items-center gap-2 mb-6">
                  <Lock size={16} className="text-brand-gold" />
                  <h2 className="text-xl font-display font-bold">Order Review</h2>
                </div>
                
                {/* Items List */}
                <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3 pb-4 border-b border-brand-muted/50">
                      <div className="w-14 aspect-[3/4] bg-brand-muted rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={item.product.images[0]} 
                          alt={item.product.title}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex-grow text-xs">
                        <p className="font-bold leading-tight mb-1">{item.product.title}</p>
                        <p className="text-brand-gray text-[9px] mb-2">{item.size} • {item.color}</p>
                        <p className="font-semibold text-brand-dark">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right text-xs font-bold flex-shrink-0">
                        {formatPrice((item.product.discount_price || item.product.price) * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pricing Breakdown */}
                <div className="space-y-3 pt-6 border-t border-brand-muted">
                  <div className="flex justify-between text-xs">
                    <span className="text-brand-gray uppercase tracking-widest font-bold">Subtotal</span>
                    <span className="font-semibold">{formatPrice(totalAmount)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-brand-gray uppercase tracking-widest font-bold">Shipping</span>
                    <span className="text-state-success font-semibold">Free</span>
                  </div>
                  <div className="pt-3 border-t border-brand-muted flex justify-between items-end">
                    <span className="font-display font-bold uppercase tracking-widest text-sm">Total</span>
                    <span className="text-3xl font-bold text-brand-dark">{formatPrice(totalAmount)}</span>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="space-y-3">
                <div className="bg-gradient-to-br from-state-success/10 to-transparent rounded-2xl border border-state-success/20 p-4">
                  <div className="flex items-start gap-3">
                    <ShieldCheck size={18} className="text-state-success flex-shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <p className="font-bold text-state-success mb-0.5">100% Secure</p>
                      <p className="text-brand-gray leading-snug">SSL encrypted payments & data protection</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-brand-gold/10 to-transparent rounded-2xl border border-brand-gold/20 p-4">
                  <div className="flex items-start gap-3">
                    <Truck size={18} className="text-brand-gold flex-shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <p className="font-bold text-brand-dark mb-0.5">Fast & Trackable</p>
                      <p className="text-brand-gray leading-snug">3-5 day delivery with real-time tracking</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
