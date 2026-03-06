import React, { useState } from 'react';
import { Search, Package, Truck, CheckCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Order } from '@/types';

export default function TrackOrder() {
  const [orderNumber, setOrderNumber] = useState('');
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setOrder(null);

    const { data, error: fetchError } = await supabase
      .from('orders')
      .select('*')
      .eq('order_number', orderNumber)
      .single();

    if (fetchError) {
      setError('Order not found. Please check your order number.');
    } else {
      setOrder(data as Order);
    }
    setLoading(false);
  };

  const steps = [
    { id: 'processing', label: 'Processing', icon: Package },
    { id: 'shipped', label: 'Shipped', icon: Truck },
    { id: 'delivered', label: 'Delivered', icon: CheckCircle },
  ];

  const currentStepIndex = order ? steps.findIndex(s => s.id === order.order_status) : -1;

  return (
    <div className="max-w-3xl mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-display mb-4">Track Your Order</h1>
        <p className="text-brand-gray uppercase tracking-widest text-[10px]">Enter your order number to see the current status</p>
      </div>

      <form onSubmit={handleTrack} className="flex gap-4 mb-16">
        <input 
          type="text" 
          placeholder="Order Number (e.g. ORD-12345)" 
          required
          className="flex-grow input-field"
          value={orderNumber}
          onChange={(e) => setOrderNumber(e.target.value)}
        />
        <button type="submit" disabled={loading} className="btn-primary flex items-center gap-2">
          {loading ? 'Searching...' : <><Search size={16} /> Track</>}
        </button>
      </form>

      {error && (
        <div className="bg-state-error/10 text-state-error p-6 text-center text-xs uppercase tracking-widest font-bold">
          {error}
        </div>
      )}

      {order && (
        <div className="space-y-12 animate-fade-in">
          <div className="flex justify-between items-center pb-8 border-b border-brand-muted">
            <div>
              <p className="text-[10px] text-brand-gray uppercase tracking-widest font-bold mb-1">Order Status</p>
              <h3 className="text-2xl font-display uppercase tracking-widest">{order.order_status}</h3>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-brand-gray uppercase tracking-widest font-bold mb-1">Expected Delivery</p>
              <p className="text-sm font-bold">3-5 Business Days</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative flex justify-between">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-brand-muted -translate-y-1/2 z-0" />
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index <= currentStepIndex;
              return (
                <div key={step.id} className="relative z-10 flex flex-col items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-500 ${isActive ? 'bg-brand-dark text-white' : 'bg-white border-2 border-brand-muted text-brand-gray'}`}>
                    <Icon size={20} />
                  </div>
                  <span className={`text-[10px] uppercase tracking-widest font-bold ${isActive ? 'text-brand-dark' : 'text-brand-gray'}`}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="bg-brand-muted p-8 space-y-4 rounded-2xl">
            <div className="flex justify-between text-xs uppercase tracking-widest">
              <span className="text-brand-gray">Order Number</span>
              <span className="font-bold">{order.order_number}</span>
            </div>
            <div className="flex justify-between text-xs uppercase tracking-widest">
              <span className="text-brand-gray">Tracking Number</span>
              <span className="font-bold">{order.tracking_number || 'Not Assigned Yet'}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
