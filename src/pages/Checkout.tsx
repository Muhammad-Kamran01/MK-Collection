import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { formatPrice } from '@/lib/utils';
import { ChevronRight, Truck, CreditCard, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Checkout() {
  const { items, totalAmount, totalItems } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Final order submission
      navigate('/checkout/success');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Checkout Form */}
        <div className="lg:col-span-7">
          {/* Steps */}
          <div className="flex items-center gap-4 mb-12 text-[10px] uppercase tracking-widest font-bold">
            <span className={step >= 1 ? "text-brand-dark" : "text-brand-gray"}>Information</span>
            <ChevronRight size={12} className="text-brand-gray" />
            <span className={step >= 2 ? "text-brand-dark" : "text-brand-gray"}>Shipping</span>
            <ChevronRight size={12} className="text-brand-gray" />
            <span className={step >= 3 ? "text-brand-dark" : "text-brand-gray"}>Payment</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-12">
            {step === 1 && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-display mb-6">Contact Information</h2>
                  <input 
                    type="email" 
                    name="email"
                    placeholder="Email Address" 
                    required
                    className="input-field"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <h2 className="text-xl font-display mb-6">Shipping Address</h2>
                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <input 
                      type="text" 
                      name="firstName"
                      placeholder="First Name" 
                      required
                      className="input-field"
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                    <input 
                      type="text" 
                      name="lastName"
                      placeholder="Last Name" 
                      required
                      className="input-field"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <input 
                    type="text" 
                    name="address"
                    placeholder="Address" 
                    required
                    className="input-field mb-6"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <input 
                      type="text" 
                      name="city"
                      placeholder="City" 
                      required
                      className="input-field"
                      value={formData.city}
                      onChange={handleInputChange}
                    />
                    <select 
                      name="province"
                      className="input-field"
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
                  <div className="grid grid-cols-2 gap-6">
                    <input 
                      type="text" 
                      name="postalCode"
                      placeholder="Postal Code" 
                      required
                      className="input-field"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                    />
                    <input 
                      type="tel" 
                      name="phone"
                      placeholder="Phone Number" 
                      required
                      className="input-field"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8">
                <h2 className="text-xl font-display mb-6">Shipping Method</h2>
                <div className="border border-brand-dark p-6 flex justify-between items-center rounded-2xl">
                  <div className="flex items-center gap-4">
                    <Truck size={24} />
                    <div>
                      <p className="text-sm font-bold">Standard Delivery</p>
                      <p className="text-xs text-brand-gray">3-5 Business Days</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold">Free</span>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8">
                <h2 className="text-xl font-display mb-6">Payment Method</h2>
                <div className="space-y-4">
                  <label className={cn(
                    "flex items-center justify-between p-6 border cursor-pointer transition-all rounded-2xl",
                    formData.paymentMethod === 'cod' ? "border-brand-dark bg-brand-muted" : "border-brand-muted"
                  )}>
                    <div className="flex items-center gap-4">
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        value="cod" 
                        checked={formData.paymentMethod === 'cod'}
                        onChange={handleInputChange}
                        className="accent-brand-dark"
                      />
                      <div>
                        <p className="text-sm font-bold uppercase tracking-widest">Cash on Delivery</p>
                        <p className="text-[10px] text-brand-gray uppercase tracking-widest">Pay when you receive your order</p>
                      </div>
                    </div>
                  </label>
 
                  <label className={cn(
                    "flex items-center justify-between p-6 border cursor-pointer transition-all opacity-50 grayscale rounded-2xl",
                    formData.paymentMethod === 'card' ? "border-brand-dark bg-brand-muted" : "border-brand-muted"
                  )}>
                    <div className="flex items-center gap-4">
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        value="card" 
                        disabled
                        className="accent-brand-dark"
                      />
                      <div>
                        <p className="text-sm font-bold uppercase tracking-widest">Credit / Debit Card</p>
                        <p className="text-[10px] text-brand-gray uppercase tracking-widest">Secure online payment (Coming Soon)</p>
                      </div>
                    </div>
                    <CreditCard size={20} />
                  </label>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-brand-muted">
              <button 
                type="button"
                onClick={() => step > 1 ? setStep(step - 1) : navigate('/cart')}
                className="text-xs uppercase tracking-widest font-bold text-brand-gray hover:text-brand-dark transition-colors"
              >
                {step > 1 ? "Return to Information" : "Return to Cart"}
              </button>
              <button type="submit" className="w-full sm:w-auto btn-primary">
                {step === 3 ? "Complete Order" : "Continue to Shipping"}
              </button>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-5">
          <div className="bg-brand-muted p-8 sticky top-32 border border-brand-muted">
            <h2 className="text-xl font-display mb-8">Order Summary</h2>
            
            <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto pr-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative w-16 aspect-[3/4] bg-white overflow-hidden flex-shrink-0 border border-brand-muted rounded-sm">
                    <img 
                      src={item.product.images[0]} 
                      alt={item.product.title} 
                      className="w-full h-full object-cover rounded-sm"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute -top-2 -right-2 bg-brand-gray text-white text-[8px] w-5 h-5 flex items-center justify-center rounded-full">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xs font-bold uppercase tracking-widest">{item.product.title}</h3>
                    <p className="text-[9px] text-brand-gray uppercase tracking-widest">{item.size} / {item.color}</p>
                  </div>
                  <span className="text-xs font-bold">{formatPrice((item.product.discount_price || item.product.price) * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-4 pt-6 border-t border-brand-muted">
              <div className="flex justify-between text-xs uppercase tracking-widest">
                <span className="text-brand-gray">Subtotal</span>
                <span className="font-bold">{formatPrice(totalAmount)}</span>
              </div>
              <div className="flex justify-between text-xs uppercase tracking-widest">
                <span className="text-brand-gray">Shipping</span>
                <span className="text-state-success font-bold">Free</span>
              </div>
              <div className="pt-4 border-t border-brand-muted flex justify-between items-end">
                <span className="text-sm font-display uppercase tracking-widest font-bold">Total</span>
                <span className="text-2xl font-bold">{formatPrice(totalAmount)}</span>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-brand-muted flex items-center gap-4 text-[10px] text-brand-gray uppercase tracking-widest">
              <ShieldCheck size={20} className="text-state-success" />
              <p>Your transaction is secure and encrypted.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
