import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus, ShieldCheck, Truck, RotateCcw, Lock } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { formatPrice } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export default function Cart() {
  const { items, removeItem, updateQuantity, totalAmount, totalItems } = useCart();
  const navigate = useNavigate();
  const originalTotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalSavings = Math.max(0, originalTotal - totalAmount);

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
    <div className="max-w-7xl mx-auto px-4 py-10 sm:py-12">
      <section className="relative overflow-hidden rounded-3xl border border-brand-muted bg-gradient-to-br from-brand-muted/70 via-white to-brand-muted/40 p-6 sm:p-8 mb-10">
        <div className="absolute -top-20 -right-16 h-56 w-56 rounded-full bg-brand-gold/15 blur-3xl" />
        <div className="absolute -bottom-24 -left-10 h-48 w-48 rounded-full bg-brand-dark/5 blur-3xl" />
        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-3">
            <p className="inline-flex items-center rounded-full bg-white/80 px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] text-brand-gray font-bold border border-brand-muted">
              Curated Checkout Experience
            </p>
            <h1 className="text-4xl sm:text-5xl font-display leading-tight">Your Shopping Bag</h1>
            <p className="text-sm text-brand-gray max-w-xl">
              Finalize your handpicked pieces with complimentary shipping, secure payment, and easy returns.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <p className="inline-flex items-center rounded-full bg-brand-dark text-white px-4 py-1.5 text-[10px] uppercase tracking-widest font-bold">
              {totalItems} {totalItems === 1 ? 'Item' : 'Items'} In Bag
            </p>
            <Link to="/shop" className="text-xs uppercase tracking-widest font-bold border-b border-brand-dark pb-1 hover:text-brand-gold hover:border-brand-gold transition-colors">
              Continue Shopping
            </Link>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 xl:gap-16">
        <div className="lg:col-span-2 space-y-6">
          <div className="hidden sm:grid grid-cols-6 gap-4 px-2 pb-4 border-b border-brand-muted text-[10px] uppercase tracking-[0.2em] font-bold text-brand-gray">
            <div className="col-span-3">Product</div>
            <div className="text-center">Price</div>
            <div className="text-center">Quantity</div>
            <div className="text-right">Total</div>
          </div>

          <AnimatePresence mode="popLayout">
            {items.map((item) => {
              const discountedPrice = item.product.discount_price || item.product.price;
              const hasDiscount = !!item.product.discount_price && item.product.discount_price < item.product.price;
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.25 }}
                  className="grid grid-cols-1 sm:grid-cols-6 gap-6 items-center p-4 sm:p-5 rounded-2xl border border-brand-muted bg-white shadow-[0_16px_45px_-30px_rgba(20,20,20,0.5)]"
                >
                  <div className="sm:col-span-3 flex gap-5 sm:gap-6">
                    <div className="w-24 sm:w-28 aspect-[3/4] bg-brand-muted overflow-hidden flex-shrink-0 rounded-md">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-sm sm:text-base font-medium leading-snug">{item.product.title}</h3>
                      <div className="flex flex-wrap gap-2">
                        <p className="text-[10px] text-brand-gray uppercase tracking-widest rounded-full bg-brand-muted px-2.5 py-1">Size: {item.size}</p>
                        <p className="text-[10px] text-brand-gray uppercase tracking-widest rounded-full bg-brand-muted px-2.5 py-1">Color: {item.color}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-[10px] text-state-error uppercase tracking-widest font-bold flex items-center gap-1 pt-1 hover:opacity-70"
                      >
                        <Trash2 size={12} /> Remove
                      </button>
                    </div>
                  </div>

                  <div className="text-center text-sm font-medium">
                    <p className="sm:hidden text-[10px] uppercase tracking-widest text-brand-gray mb-1">Price</p>
                    <div className="space-y-1">
                      <p>{formatPrice(discountedPrice)}</p>
                      {hasDiscount && (
                        <p className="text-[11px] text-brand-gray line-through">{formatPrice(item.product.price)}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <div className="flex items-center border border-brand-muted rounded-full overflow-hidden bg-white">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2.5 hover:bg-brand-muted transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-10 text-center text-xs font-bold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2.5 hover:bg-brand-muted transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="text-right text-sm font-bold">
                    <p className="sm:hidden text-[10px] uppercase tracking-widest text-brand-gray mb-1">Total</p>
                    {formatPrice(discountedPrice * item.quantity)}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white p-7 sm:p-8 sticky top-28 rounded-3xl border border-brand-muted shadow-[0_28px_60px_-38px_rgba(15,15,15,0.55)]">
            <div className="flex items-start justify-between gap-4 mb-7">
              <div>
                <h2 className="text-2xl font-display">Order Summary</h2>
                <p className="text-xs uppercase tracking-[0.18em] text-brand-gray mt-1">Secure Checkout</p>
              </div>
              <Lock size={18} className="text-brand-gray mt-1" />
            </div>

            <div className="space-y-4 mb-7">
              <div className="flex justify-between text-sm">
                <span className="text-brand-gray">Subtotal ({totalItems} items)</span>
                <span className="font-medium">{formatPrice(totalAmount)}</span>
              </div>
              {totalSavings > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-brand-gray">You Saved</span>
                  <span className="font-medium text-state-success">-{formatPrice(totalSavings)}</span>
                </div>
              )}
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
                <span className="text-3xl font-bold leading-none">{formatPrice(totalAmount)}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full btn-primary flex items-center justify-center gap-3 py-4 group"
            >
              Proceed To Checkout <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>

            <div className="mt-5 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-xl border border-brand-muted p-2.5">
                <Truck size={14} className="mx-auto mb-1 text-brand-gray" />
                <p className="text-[9px] uppercase tracking-widest text-brand-gray font-bold">Fast Dispatch</p>
              </div>
              <div className="rounded-xl border border-brand-muted p-2.5">
                <RotateCcw size={14} className="mx-auto mb-1 text-brand-gray" />
                <p className="text-[9px] uppercase tracking-widest text-brand-gray font-bold">Easy Returns</p>
              </div>
              <div className="rounded-xl border border-brand-muted p-2.5">
                <ShieldCheck size={14} className="mx-auto mb-1 text-brand-gray" />
                <p className="text-[9px] uppercase tracking-widest text-brand-gray font-bold">Protected</p>
              </div>
            </div>

            <div className="mt-8 space-y-4 border-t border-brand-muted pt-6">
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
