import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';
import { formatPrice, cn } from '@/lib/utils';
import ProductCard from '@/components/ProductCard';
import { MOCK_PRODUCTS } from '@/constants';

export default function Wishlist() {
  const { items: wishlistItems, removeItem, clearWishlist } = useWishlist();
  const { addItem } = useCart();
  const [selectedForCart, setSelectedForCart] = React.useState<Set<number>>(new Set());

  const handleAddToCart = (product: typeof wishlistItems[0]) => {
    addItem(product, 1, product.sizes[0], product.colors[0]);
    setSelectedForCart(prev => new Set([...prev, product.id]));
  };

  const handleAddAllToCart = () => {
    wishlistItems.forEach(product => {
      addItem(product, 1, product.sizes[0], product.colors[0]);
    });
    setSelectedForCart(new Set(wishlistItems.map(p => p.id)));
  };

  const recommendedProducts = MOCK_PRODUCTS.filter(
    p => !wishlistItems.find(w => w.id === p.id)
  ).slice(0, 4);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#F7F4ED] to-white">
      {/* Breadcrumbs */}
      <div className="relative max-w-7xl mx-auto px-4 pt-8 pb-7">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-muted bg-white/80 px-4 py-2 text-[10px] uppercase tracking-widest text-brand-gray shadow-sm backdrop-blur-sm">
          <Link to="/" className="hover:text-brand-dark">Home</Link>
          <ChevronRight size={10} />
          <span className="text-brand-dark">Wishlist</span>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 pb-24">
        {/* Header */}
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6"
          >
            <div>
              <h1 className="text-5xl md:text-6xl font-display mb-3">My Wishlist</h1>
              <p className="text-base text-brand-gray">
                {wishlistItems.length === 0
                  ? 'Your wishlist is empty. Start adding items you love!'
                  : `You have ${wishlistItems.length} item${wishlistItems.length !== 1 ? 's' : ''} saved`}
              </p>
            </div>
            {wishlistItems.length > 0 && (
              <div className="flex gap-3">
                <button
                  onClick={handleAddAllToCart}
                  className="btn-primary flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <ShoppingBag size={16} />
                  Add All To Bag
                </button>
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to clear your wishlist?')) {
                      clearWishlist();
                    }
                  }}
                  className="px-6 py-3 border border-brand-muted hover:border-state-error hover:text-state-error text-brand-gray transition-colors rounded-full uppercase tracking-widest text-[10px] font-bold"
                >
                  Clear
                </button>
              </div>
            )}
          </motion.div>
        </div>

        {/* Wishlist Items */}
        {wishlistItems.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-4 mb-16"
          >
            {wishlistItems.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-white border border-brand-muted/70 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                  {/* Product Image */}
                  <Link to={`/product/${product.slug}`} className="sm:col-span-2">
                    <div className="aspect-[3/4] overflow-hidden rounded-lg bg-brand-muted">
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </Link>

                  {/* Product Details */}
                  <div className="sm:col-span-5 space-y-2">
                    <Link to={`/product/${product.slug}`} className="block">
                      <h3 className="text-lg font-display text-brand-dark hover:text-brand-gold transition-colors">
                        {product.title}
                      </h3>
                    </Link>
                    <p className="text-sm text-brand-gray line-clamp-2">{product.description}</p>
                    <div className="flex flex-wrap gap-3 pt-2">
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-brand-gray font-bold mb-1">
                          Category
                        </p>
                        <span className="inline-block px-3 py-1 rounded-full bg-brand-dark/8 text-[10px] font-bold uppercase tracking-widest">
                          {product.category}
                        </span>
                      </div>
                      {product.is_new && (
                        <div>
                          <p className="text-[10px] uppercase tracking-widest text-brand-gray font-bold mb-1">
                            Status
                          </p>
                          <span className="inline-block px-3 py-1 rounded-full bg-brand-gold/15 text-[10px] font-bold uppercase tracking-widest text-brand-dark">
                            New Arrival
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Stock & Price */}
                  <div className="sm:col-span-2 space-y-3">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-brand-gray font-bold mb-1">
                        Stock
                      </p>
                      <span
                        className={cn(
                          'text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full inline-block',
                          product.stock > 0
                            ? 'bg-state-success/15 text-state-success'
                            : 'bg-state-error/15 text-state-error'
                        )}
                      >
                        {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-brand-gray font-bold mb-1">
                        Price
                      </p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-bold text-brand-dark">
                          {formatPrice(product.discount_price || product.price)}
                        </span>
                        {product.discount_price && (
                          <span className="text-xs text-brand-gray line-through">
                            {formatPrice(product.price)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="sm:col-span-2 flex flex-col gap-2">
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={product.stock === 0}
                      className={cn(
                        'btn-primary py-2.5 text-xs flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none',
                        selectedForCart.has(product.id) && 'bg-state-success hover:bg-state-success'
                      )}
                    >
                      {selectedForCart.has(product.id) ? (
                        <>✓ Added</>
                      ) : (
                        <>
                          <ShoppingBag size={14} />
                          Add to Bag
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => removeItem(product.id)}
                      className="px-3 py-2.5 border border-state-error/30 text-state-error hover:bg-state-error/5 transition-colors rounded-lg text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2"
                    >
                      <Trash2 size={14} />
                      Remove
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          // Empty State
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-24"
          >
            <div className="w-20 h-20 rounded-full bg-brand-muted flex items-center justify-center mx-auto mb-8">
              <Heart size={40} className="text-brand-gold/40" />
            </div>
            <h2 className="text-3xl font-display mb-3 text-brand-dark">No Items Yet</h2>
            <p className="text-base text-brand-gray mb-10 max-w-lg mx-auto">
              Start building your wishlist by adding items you love. You'll be able to easily access them later!
            </p>
            <Link to="/shop" className="btn-primary inline-flex items-center gap-2">
              Shop Now
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        )}

        {/* Recommended Products */}
        {wishlistItems.length > 0 && recommendedProducts.length > 0 && (
          <section className="border-t border-brand-muted pt-20">
            <div className="mb-10">
              <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-bold mb-2 block">
                You Might Like
              </span>
              <h2 className="text-4xl font-display">Recommended For You</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {recommendedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
