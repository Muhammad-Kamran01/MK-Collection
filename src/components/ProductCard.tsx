import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye, X, ArrowRight, Maximize2 } from 'lucide-react';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '@/contexts/CartContext';
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  key?: string | number;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [showQuickView, setShowQuickView] = useState(false);

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="group"
      >
        <div className="relative aspect-[2/3] overflow-hidden bg-brand-muted mb-4 rounded-2xl">
          <Link to={`/product/${product.slug}`}>
            <img 
              src={product.images[0]} 
              alt={product.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 rounded-2xl"
              referrerPolicy="no-referrer"
            />
          </Link>
          
          {/* Badges */}
          <div className="absolute top-4 left-4 z-10">
            {product.discount_price && (
              <div className="w-12 h-12 rounded-full bg-brand-gray/60 flex items-center justify-center text-white text-[10px] font-bold backdrop-blur-sm">
                -{Math.round((1 - product.discount_price / product.price) * 100)}%
              </div>
            )}
          </div>

          {/* Quick Actions Overlay (Bottom Bar) */}
          <div className="absolute bottom-4 left-4 right-4 z-20">
            <div className="bg-white rounded-lg p-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 shadow-xl">
              <Link 
                to={`/product/${product.slug}`}
                className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-brand-dark hover:text-brand-gold transition-colors"
              >
                View Details <ArrowRight size={14} />
              </Link>
              <div className="flex items-center gap-3 border-l border-brand-muted pl-3">
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    setShowQuickView(true);
                  }}
                  className="text-brand-gray hover:text-brand-gold transition-colors"
                >
                  <Maximize2 size={18} strokeWidth={1.5} />
                </button>
                <button 
                  className="text-brand-gray hover:text-brand-gold transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    // Wishlist logic would go here
                  }}
                >
                  <Heart size={18} strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Link to={`/product/${product.slug}`} className="block">
            <h3 className="text-xs font-medium text-brand-dark hover:text-brand-gold transition-colors line-clamp-1">{product.title}</h3>
          </Link>
          <div className="flex items-center gap-3">
            {product.discount_price ? (
              <>
                <span className="text-xs text-brand-gray line-through">{formatPrice(product.price)}</span>
                <span className="text-xs font-bold text-brand-dark">{formatPrice(product.discount_price)}</span>
              </>
            ) : (
              <span className="text-xs font-bold text-brand-dark">{formatPrice(product.price)}</span>
            )}
          </div>
          
          {/* Size & Color Options */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex gap-1">
              {['S', 'M', 'L'].map(size => {
                const isAvailable = product.sizes.includes(size);
                return (
                  <div 
                    key={size}
                    className={cn(
                      "w-6 h-6 border flex items-center justify-center text-[8px] font-bold transition-colors rounded-full",
                      isAvailable 
                        ? "border-brand-gray text-brand-dark hover:bg-brand-dark hover:text-white cursor-pointer" 
                        : "border-brand-muted text-brand-gray/30 cursor-not-allowed"
                    )}
                  >
                    {size}
                  </div>
                );
              })}
            </div>

            <div className="flex gap-1.5">
              {product.colors.slice(0, 3).map(color => (
                <div 
                  key={color}
                  className="w-3 h-3 rounded-full border border-black/5 shadow-sm"
                  style={{ backgroundColor: color.toLowerCase() }}
                  title={color}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {showQuickView && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowQuickView(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto grid grid-cols-1 md:grid-cols-2 rounded-3xl"
            >
              <button 
                onClick={() => setShowQuickView(false)}
                className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-lg hover:text-brand-gold transition-colors"
              >
                <X size={20} />
              </button>

              <div className="aspect-[3/4] bg-brand-muted rounded-2xl overflow-hidden m-4">
                <img 
                  src={product.images[0]} 
                  alt={product.title} 
                  className="w-full h-full object-cover rounded-2xl"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-8 md:p-12 space-y-8">
                <div>
                  <p className="text-[10px] text-brand-gray uppercase tracking-widest font-bold mb-2">{product.category}</p>
                  <h2 className="text-3xl font-display mb-4">{product.title}</h2>
                  <div className="flex items-center gap-4">
                    {product.discount_price ? (
                      <>
                        <span className="text-xl font-bold text-brand-dark">{formatPrice(product.discount_price)}</span>
                        <span className="text-sm text-brand-gray line-through">{formatPrice(product.price)}</span>
                      </>
                    ) : (
                      <span className="text-xl font-bold text-brand-dark">{formatPrice(product.price)}</span>
                    )}
                  </div>
                </div>

                <p className="text-sm text-brand-gray leading-relaxed line-clamp-3">{product.description}</p>

                <div className="space-y-4">
                  <div className="flex gap-2">
                    {product.sizes.map(size => (
                      <span key={size} className="px-3 py-1 border border-brand-muted text-[10px] font-bold uppercase tracking-widest rounded-full">{size}</span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    {product.colors.map(color => (
                      <div key={color} className="w-4 h-4 rounded-full border border-brand-muted" style={{ backgroundColor: color.toLowerCase() }} />
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <button 
                    onClick={() => {
                      addItem(product, 1, product.sizes[0], product.colors[0]);
                      setShowQuickView(false);
                    }}
                    className="flex-grow btn-primary flex items-center justify-center gap-2"
                  >
                    <ShoppingBag size={16} /> Add to Bag
                  </button>
                  <Link 
                    to={`/product/${product.slug}`}
                    className="btn-outline flex items-center justify-center"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
