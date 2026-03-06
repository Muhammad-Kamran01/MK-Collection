import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { formatPrice } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export default function Cart() {
  const { items, removeItem, updateQuantity, totalAmount, totalItems } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-brand-muted rounded-full mb-8">
          <ShoppingBag size={32} className="text-brand-gray" />
        </div>
        <h1 className="text-3xl font-display mb-4">Your Shopping Bag Is Empty</h1>
        <p className="text-brand-gray text-sm mb-10 max-w-md mx-auto">
          Discover our latest collection of premium apparel designed for the modern individual who values both style and comfort.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/shop?cat=unstitched" className="btn-primary">Shop Unstitched</Link>
          <Link to="/shop?cat=ready-to-wear" className="btn-outline">Shop Ready to Wear</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-end mb-12">
        <h1 className="text-4xl font-display">Your Cart</h1>
        <Link to="/shop" className="text-xs uppercase tracking-widest font-bold border-b border-brand-dark pb-1 hover:text-brand-gold hover:border-brand-gold transition-colors">
          Continue Shopping
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-8">
          <div className="hidden sm:grid grid-cols-6 gap-4 pb-4 border-b border-brand-muted text-[10px] uppercase tracking-widest font-bold text-brand-gray">
            <div className="col-span-3">Product</div>
            <div className="text-center">Price</div>
            <div className="text-center">Quantity</div>
            <div className="text-right">Total</div>
          </div>

          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <motion.div 
                key={item.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="grid grid-cols-1 sm:grid-cols-6 gap-6 items-center pb-8 border-b border-brand-muted"
              >
                <div className="sm:col-span-3 flex gap-6">
                  <div className="w-24 aspect-[3/4] bg-brand-muted overflow-hidden flex-shrink-0 rounded-sm">
                    <img 
                      src={item.product.images[0]} 
                      alt={item.product.title} 
                      className="w-full h-full object-cover rounded-sm"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-medium">{item.product.title}</h3>
                    <p className="text-[10px] text-brand-gray uppercase tracking-widest">Size: {item.size}</p>
                    <p className="text-[10px] text-brand-gray uppercase tracking-widest">Color: {item.color}</p>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-[10px] text-state-error uppercase tracking-widest font-bold flex items-center gap-1 pt-2 hover:opacity-70"
                    >
                      <Trash2 size={12} /> Remove
                    </button>
                  </div>
                </div>

                <div className="text-center text-sm font-medium">
                  {formatPrice(item.product.discount_price || item.product.price)}
                </div>

                <div className="flex justify-center">
                  <div className="flex items-center border border-brand-muted rounded-full overflow-hidden">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-2 hover:bg-brand-muted transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-10 text-center text-xs font-bold">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 hover:bg-brand-muted transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                <div className="text-right text-sm font-bold">
                  {formatPrice((item.product.discount_price || item.product.price) * item.quantity)}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-brand-muted p-8 sticky top-32">
            <h2 className="text-xl font-display mb-8">Order Summary</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm">
                <span className="text-brand-gray">Subtotal ({totalItems} items)</span>
                <span className="font-medium">{formatPrice(totalAmount)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-brand-gray">Shipping</span>
                <span className="text-state-success font-medium">Free</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-brand-gray">Tax</span>
                <span className="font-medium">{formatPrice(0)}</span>
              </div>
              <div className="pt-4 border-t border-brand-muted flex justify-between items-end">
                <span className="text-lg font-display">Total</span>
                <span className="text-2xl font-bold">{formatPrice(totalAmount)}</span>
              </div>
            </div>

            <button 
              onClick={() => navigate('/checkout')}
              className="w-full btn-primary flex items-center justify-center gap-3 py-4"
            >
              Proceed To Checkout <ArrowRight size={18} />
            </button>
            
            <div className="mt-8 space-y-4">
              <p className="text-[10px] text-brand-gray uppercase tracking-[0.2em] text-center">We Accept</p>
              <div className="flex justify-center gap-4 opacity-50 grayscale">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
