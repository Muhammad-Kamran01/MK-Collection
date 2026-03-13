import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Heart, ShoppingBag, ChevronRight, ChevronUp, ChevronDown, Star, Truck, RotateCcw, ShieldCheck, Plus, Minus, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '@/types';
import { supabase } from '@/lib/supabase';
import { formatPrice, cn } from '@/lib/utils';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import ProductCard from '@/components/ProductCard';
import { MOCK_PRODUCTS } from '@/constants';

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);
  const [openAccordion, setOpenAccordion] = useState<string | null>('fabric');
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [isZoomed, setIsZoomed] = useState(false);
  const zoomRafRef = useRef<number | null>(null);
  const VISIBLE_THUMBS = 4;
  const [thumbOffset, setThumbOffset] = useState(0);
  const zoomEnterIntentRef = useRef<number | null>(null);
  const zoomLeaveIntentRef = useRef<number | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('slug', slug)
          .single();

        let currentProduct: Product;

        if (data) {
          currentProduct = data as Product;
          setProduct(currentProduct);
          setSelectedSize(currentProduct.sizes[0] || '');
          setSelectedColor(currentProduct.colors[0] || '');
          
          // Save to recently viewed
          saveToRecentlyViewed(currentProduct);

          // Fetch related products
          const { data: related } = await supabase
            .from('products')
            .select('*')
            .eq('category', currentProduct.category)
            .neq('id', currentProduct.id)
            .limit(4);
          
          if (related && related.length > 0) {
            setRelatedProducts(related as Product[]);
          } else {
            setRelatedProducts(MOCK_PRODUCTS.filter(item => item.id !== currentProduct.id).slice(0, 4));
          }

          // Fetch trending products
          const { data: trending } = await supabase
            .from('products')
            .select('*')
            .eq('trending', true)
            .neq('id', currentProduct.id)
            .limit(4);
          
          if (trending && trending.length > 0) {
            setTrendingProducts(trending as Product[]);
          } else {
            setTrendingProducts(MOCK_PRODUCTS.filter(item => item.trending && item.id !== currentProduct.id).slice(0, 4));
          }
        } else {
          // Fallback mock
          const mock = MOCK_PRODUCTS.find(p => p.slug === slug) || MOCK_PRODUCTS[0];
          setProduct(mock);
          setSelectedSize(mock.sizes[0]);
          setSelectedColor(mock.colors[0]);
          saveToRecentlyViewed(mock);
          setRelatedProducts(MOCK_PRODUCTS.filter(item => item.id !== mock.id).slice(0, 4));
          setTrendingProducts(MOCK_PRODUCTS.filter(item => item.trending && item.id !== mock.id).slice(0, 4));
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        // Final fallback
        const mock = MOCK_PRODUCTS[0];
        setProduct(mock);
        setRelatedProducts(MOCK_PRODUCTS.filter(item => item.id !== mock.id).slice(0, 4));
        setTrendingProducts(MOCK_PRODUCTS.filter(item => item.trending && item.id !== mock.id).slice(0, 4));
      } finally {
        setLoading(false);
      }
    }

    function saveToRecentlyViewed(p: Product) {
      const stored = localStorage.getItem('recentlyViewed');
      let list: Product[] = stored ? JSON.parse(stored) : [];
      
      // Remove if already exists to move to front
      list = list.filter(item => item.id !== p.id);
      list.unshift(p);
      
      // Keep only last 4
      const limited = list.slice(0, 5); // Store 5, show 4 excluding current
      localStorage.setItem('recentlyViewed', JSON.stringify(limited));
      setRecentlyViewed(limited.filter(item => item.id !== p.id).slice(0, 4));
    }

    fetchProduct();
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (selectedImage < thumbOffset) {
      setThumbOffset(selectedImage);
    } else if (selectedImage >= thumbOffset + VISIBLE_THUMBS) {
      setThumbOffset(selectedImage - VISIBLE_THUMBS + 1);
    }
  }, [selectedImage]);

  useEffect(() => {
    return () => {
      if (zoomEnterIntentRef.current) {
        window.clearTimeout(zoomEnterIntentRef.current);
      }
      if (zoomLeaveIntentRef.current) {
        window.clearTimeout(zoomLeaveIntentRef.current);
      }
      if (zoomRafRef.current) {
        cancelAnimationFrame(zoomRafRef.current);
      }
    };
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!product) return <div className="min-h-screen flex items-center justify-center">Product not found</div>;

  const handleAddToCart = () => {
    addItem(product, quantity, selectedSize, selectedColor);
    // Optional: show toast or open cart sidebar
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;

    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    if (zoomRafRef.current) {
      cancelAnimationFrame(zoomRafRef.current);
    }

    zoomRafRef.current = requestAnimationFrame(() => {
      setZoomPos({ x, y });
    });
  };

  const handleMainImageEnter = () => {
    if (zoomLeaveIntentRef.current) {
      window.clearTimeout(zoomLeaveIntentRef.current);
      zoomLeaveIntentRef.current = null;
    }

    if (zoomEnterIntentRef.current) {
      window.clearTimeout(zoomEnterIntentRef.current);
    }

    zoomEnterIntentRef.current = window.setTimeout(() => {
      setIsZoomed(true);
    }, 120);
  };

  const handleMainImageLeave = () => {
    if (zoomEnterIntentRef.current) {
      window.clearTimeout(zoomEnterIntentRef.current);
      zoomEnterIntentRef.current = null;
    }
    if (zoomRafRef.current) {
      cancelAnimationFrame(zoomRafRef.current);
      zoomRafRef.current = null;
    }

    zoomLeaveIntentRef.current = window.setTimeout(() => {
      setIsZoomed(false);
    }, 120);
  };

  const detailSections = [
    {
      id: 'fitting',
      title: 'Fitting',
      content: product.fitting_details || 'Tailored fit that complements the silhouette. True to size.',
    },
    {
      id: 'fabric',
      title: 'Fabric & Care',
      content:
        product.fabric_and_care ||
        'Tailored Stretch, Made In Italy 62% Nylon, 38% Elastane, 100% Vegan Materials\n\nCare: Cold Machine Wash, Line Dry. Do Not Tumble Dry Or Dry Clean, Do Not Use Bleach Or Fabric Softener',
    },
    {
      id: 'detail',
      title: 'Product Detail',
      content:
        product.product_details ||
        'Intricate embroidery on premium lawn fabric. Includes shirt, dupatta, and trousers.',
    },
    {
      id: 'shipping',
      title: 'Shipping And Return',
      content:
        product.shipping_and_return ||
        'Shipping: Is Free On US, Canada Orders Are $175\n\nReturns: Unwashed, Unworn Items Are Eligible For Returns Or Exchanges Within 30 Days Of Purchase. Final Sale Items Are Not Eligible For Returns.',
    },
  ];

  const materialTitle = product.material_title || product.fabric || 'Material';
  const materialDescription =
    product.material_description ||
    'This Material Is Our Signature High-Stretch Fabric That Drapes Like Silk And Is Soft To The Touch. Silk Is OEKO-TEX Certified And Made In Italy In A Mill 100% Powered By Renewable Energy (Solar And Biomass)';
  const materialTags = product.material_tags && product.material_tags.length > 0
    ? product.material_tags
    : ['Quick Dry', 'Chemical Free', 'Machine Washable'];

  const defaultSizeChartRows = [
    ['XS', '32 - 33', '24 - 25', '38'],
    ['S', '34 - 35', '26 - 27', '39'],
    ['M', '36 - 37', '28 - 29', '40'],
    ['L', '38 - 40', '30 - 32', '41'],
  ];

  const sizeChartRows = product.size_chart
    ? product.size_chart
        .split('\n')
        .map((row) => row.trim())
        .filter(Boolean)
        .map((row) => row.split('|').map((cell) => cell.trim()))
        .filter((cells) => cells.length === 4)
    : defaultSizeChartRows;

  const hasDiscount = Boolean(product.discount_price);
  const currentPrice = product.discount_price || product.price;
  const savingsAmount = hasDiscount ? product.price - currentPrice : 0;
  const savingsPercent = hasDiscount ? Math.round((savingsAmount / product.price) * 100) : 0;

  return (
    <div className="relative pb-24 overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(circle_at_top_left,rgba(190,155,80,0.16),transparent_52%),radial-gradient(circle_at_top_right,rgba(35,31,32,0.06),transparent_48%)]" />
      <div className="pointer-events-none absolute -left-24 top-64 h-72 w-72 rounded-full bg-brand-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-[380px] h-80 w-80 rounded-full bg-brand-dark/5 blur-3xl" />

      {/* Breadcrumbs */}
      <div className="relative max-w-7xl mx-auto px-4 pt-8 pb-7">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-muted bg-white/80 px-4 py-2 text-[10px] uppercase tracking-widest text-brand-gray shadow-sm backdrop-blur-sm">
          <Link to="/" className="hover:text-brand-dark">Home</Link>
          <ChevronRight size={10} />
          <Link to="/shop" className="hover:text-brand-dark">Shop</Link>
          <ChevronRight size={10} />
          <span className="text-brand-dark">{product.title}</span>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Image Gallery */}
        <div className="flex flex-col-reverse lg:flex-row items-start gap-5 lg:pr-4">
          {/* Thumbnails — desktop: arrow-controlled vertical strip; mobile: horizontal scroll */}
          <div className="hidden lg:flex flex-col items-center gap-2 w-[88px] flex-shrink-0">
            {/* Up arrow */}
            <button
              onClick={() => setThumbOffset(o => Math.max(0, o - 1))}
              disabled={thumbOffset === 0}
              className="w-8 h-8 rounded-full border border-brand-muted flex items-center justify-center text-brand-gray hover:border-brand-gold hover:text-brand-gold transition-all disabled:opacity-20 disabled:pointer-events-none bg-white shadow-sm"
            >
              <ChevronUp size={14} />
            </button>

            {/* Visible thumbnail window */}
            <div className="flex flex-col gap-3 w-full">
              {product.images.slice(thumbOffset, thumbOffset + VISIBLE_THUMBS).map((img, idx) => {
                const i = thumbOffset + idx;
                return (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={cn(
                      "group relative flex-shrink-0 w-full aspect-[3/4] overflow-hidden bg-brand-muted border transition-all rounded-xl",
                      selectedImage === i
                        ? "border-brand-gold shadow-md shadow-brand-gold/20"
                        : "border-brand-muted/80 hover:border-brand-gold/50"
                    )}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-105" referrerPolicy="no-referrer" />
                  </button>
                );
              })}
            </div>

            {/* Down arrow */}
            <button
              onClick={() => setThumbOffset(o => Math.min(Math.max(0, product.images.length - VISIBLE_THUMBS), o + 1))}
              disabled={thumbOffset + VISIBLE_THUMBS >= product.images.length}
              className="w-8 h-8 rounded-full border border-brand-muted flex items-center justify-center text-brand-gray hover:border-brand-gold hover:text-brand-gold transition-all disabled:opacity-20 disabled:pointer-events-none bg-white shadow-sm"
            >
              <ChevronDown size={14} />
            </button>
          </div>

          {/* Mobile: horizontal thumbnail row */}
          <div className="flex lg:hidden gap-3 overflow-x-auto no-scrollbar">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={cn(
                  "group relative flex-shrink-0 w-16 aspect-[3/4] overflow-hidden bg-brand-muted border transition-all rounded-xl",
                  selectedImage === i
                    ? "border-brand-gold shadow-md shadow-brand-gold/20"
                    : "border-brand-muted/80 hover:border-brand-gold/50"
                )}
              >
                <img src={img} alt="" className="w-full h-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-105" referrerPolicy="no-referrer" />
              </button>
            ))}
          </div>
          {/* Main Image */}
          <div className="relative w-full rounded-2xl border border-brand-muted/70 bg-white p-2 shadow-[0_24px_45px_-30px_rgba(35,31,32,0.45)]">
            <div 
            className="group aspect-[3/4] overflow-hidden bg-brand-muted rounded-xl cursor-zoom-in relative"
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMainImageEnter}
            onMouseLeave={handleMainImageLeave}
            >
            <span className="pointer-events-none absolute left-4 top-4 z-20 rounded-full bg-white/85 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-brand-dark backdrop-blur-sm">
              Detail View
            </span>
            <img 
              src={product.images[selectedImage]} 
              alt={product.title}
              className="w-full h-full object-cover rounded-xl transition-transform duration-300 ease-out will-change-transform"
              style={{
                transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                transform: isZoomed ? 'scale(2.2)' : 'scale(1)'
              }}
              referrerPolicy="no-referrer"
            />
            </div>
          </div>
        </div>

        {/* Product Info */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="space-y-8 lg:sticky lg:top-24 h-fit"
        >
          <div className="rounded-2xl border border-brand-muted/80 bg-white p-7 shadow-[0_26px_60px_-42px_rgba(35,31,32,0.5)]">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="rounded-full bg-brand-dark px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                {product.category}
              </span>
              {product.is_new && (
                <span className="rounded-full bg-brand-gold/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-dark">
                  New Arrival
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-brand-gold">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
                ))}
              </div>
              <span className="text-[10px] text-brand-gray uppercase tracking-widest font-bold">({product.rating} Rating)</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display mb-5 leading-tight">{product.title}</h1>
            <div className="flex flex-wrap items-center gap-4 mb-4">
              {hasDiscount ? (
                <>
                  <span className="text-3xl font-bold text-brand-dark">{formatPrice(currentPrice)}</span>
                  <span className="text-lg text-brand-gray line-through">{formatPrice(product.price)}</span>
                  <span className="rounded-full bg-brand-gold/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-dark">
                    Save {savingsPercent}%
                  </span>
                </>
              ) : (
                <span className="text-3xl font-bold text-brand-dark">{formatPrice(product.price)}</span>
              )}
            </div>
            {hasDiscount && (
              <p className="text-[11px] uppercase tracking-[0.16em] font-bold text-brand-gray">
                You save {formatPrice(savingsAmount)} on this piece
              </p>
            )}
          </div>

          <div className="prose prose-sm text-brand-gray max-w-none rounded-2xl border border-brand-muted/70 bg-white p-6 shadow-sm">
            <p className="whitespace-pre-line">{product.description}</p>
          </div>

          {/* Options */}
          <div className="space-y-6 rounded-2xl border border-brand-muted/80 bg-white p-6 shadow-sm">
            {/* Size Selection */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] uppercase tracking-widest font-bold">Select Size</span>
                <button 
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-[10px] uppercase tracking-widest font-bold border-b border-brand-dark pb-0.5 hover:text-brand-gold hover:border-brand-gold transition-colors"
                >
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "w-12 h-12 flex items-center justify-center text-xs font-bold border transition-all rounded-full",
                      selectedSize === size ? "bg-brand-dark text-white border-brand-dark shadow-md shadow-brand-dark/20" : "border-gray-200 hover:border-brand-dark"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] uppercase tracking-widest font-bold">Select Color</span>
                <span className={cn(
                  "text-[9px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-full",
                  product.stock > 0 ? "bg-state-success/10 text-state-success" : "bg-state-error/10 text-state-error"
                )}>
                  {product.stock > 0 ? 'In Stock' : 'Sold Out'}
                </span>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={cn(
                      "w-10 h-10 rounded-full border-2 transition-all p-0.5",
                      selectedColor === color ? "border-brand-gold shadow-md shadow-brand-gold/30" : "border-transparent"
                    )}
                  >
                    <div className="w-full h-full rounded-full border border-gray-100" style={{ backgroundColor: color.toLowerCase() }} />
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex items-center border border-brand-muted rounded-full overflow-hidden bg-brand-muted/25">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 hover:bg-brand-muted transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-12 text-center text-sm font-bold">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-3 hover:bg-brand-muted transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <button 
                  onClick={handleAddToCart}
                  className="flex-grow btn-primary flex items-center justify-center gap-3 shadow-lg shadow-brand-dark/20"
                >
                  <ShoppingBag size={18} /> Add to Bag <ArrowRight size={16} />
                </button>
                <button 
                  onClick={(e) => {
                    if (isInWishlist(product.id)) {
                      removeFromWishlist(product.id);
                    } else {
                      addToWishlist(product);
                    }
                  }}
                  className="p-4 border border-brand-muted hover:bg-brand-muted transition-colors rounded-full bg-white"
                >
                  <Heart size={20} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
                </button>
              </div>
              
              <button 
                onClick={() => {
                  handleAddToCart();
                  navigate('/cart');
                }}
                className="w-full py-4 border-2 border-brand-dark text-brand-dark uppercase tracking-[0.2em] text-xs font-bold hover:bg-brand-dark hover:text-white transition-all duration-300 rounded-full"
              >
                Buy It Now
              </button>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-brand-muted/80">
            <div className="flex items-center gap-3 rounded-xl border border-brand-muted/70 bg-white px-4 py-4">
              <Truck size={20} className="text-brand-gold" />
              <div>
                <h4 className="text-[10px] uppercase tracking-widest font-bold">Fast Delivery</h4>
                <p className="text-[9px] text-brand-gray uppercase tracking-widest">Across Pakistan</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-brand-muted/70 bg-white px-4 py-4">
              <RotateCcw size={20} className="text-brand-gold" />
              <div>
                <h4 className="text-[10px] uppercase tracking-widest font-bold">Easy Returns</h4>
                <p className="text-[9px] text-brand-gray uppercase tracking-widest">7 Days Policy</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-brand-muted/70 bg-white px-4 py-4">
              <ShieldCheck size={20} className="text-brand-gold" />
              <div>
                <h4 className="text-[10px] uppercase tracking-widest font-bold">Secure Payment</h4>
                <p className="text-[9px] text-brand-gray uppercase tracking-widest">COD & Online</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Detailed Info Section */}
      <section className="max-w-7xl mx-auto px-4 mt-20 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-4">
          {/* Accordions */}
          {detailSections.map((item) => (
            <div key={item.id} className="rounded-2xl border border-brand-muted/80 bg-white px-5">
              <button 
                onClick={() => setOpenAccordion(openAccordion === item.id ? null : item.id)}
                className="w-full flex justify-between items-center py-4 text-left font-bold uppercase tracking-widest text-sm"
              >
                {item.title}
                {openAccordion === item.id ? <Minus size={16} /> : <Plus size={16} />}
              </button>
              {openAccordion === item.id && (
                <div className="pb-6 text-sm text-brand-gray leading-relaxed whitespace-pre-line border-t border-brand-muted/60 pt-4">
                  {item.content}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Material Info Box */}
        <div className="h-fit rounded-2xl border border-brand-muted/80 bg-[linear-gradient(160deg,rgba(255,255,255,1)_10%,rgba(240,235,229,0.45)_100%)] p-8 shadow-sm">
          <h3 className="text-lg font-medium mb-4 pb-4 border-b border-brand-muted">{materialTitle}</h3>
          <p className="text-sm text-brand-gray leading-relaxed mb-8">
            {materialDescription}
          </p>
          <div className="flex flex-wrap gap-2">
            {materialTags.map(tag => (
              <span key={tag} className="px-4 py-2 rounded-full bg-white text-[10px] uppercase tracking-widest font-bold shadow-sm border border-brand-muted/60">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 mt-32 border-t border-brand-muted pt-20">
          <div className="flex justify-between items-end mb-10">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-bold mb-2 block">Recommendations</span>
              <h2 className="text-4xl font-display">You May Also Like</h2>
            </div>
            <Link to="/shop" className="text-xs uppercase tracking-widest font-bold border-b border-brand-dark pb-1 hover:text-brand-gold hover:border-brand-gold transition-colors">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {relatedProducts.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}

      {/* Trending Products */}
      {trendingProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 mt-32">
          <div className="flex justify-between items-end mb-10">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-bold mb-2 block">Hot This Week</span>
              <h2 className="text-4xl font-display">Trending Now</h2>
            </div>
            <Link to="/shop" className="text-xs uppercase tracking-widest font-bold border-b border-brand-dark pb-1 hover:text-brand-gold hover:border-brand-gold transition-colors">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {trendingProducts.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}

      {/* Recently Viewed */}
      {recentlyViewed.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 mt-32">
          <div className="flex justify-between items-end mb-10">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-bold mb-2 block">Your History</span>
              <h2 className="text-4xl font-display">Recently Viewed</h2>
            </div>
            <Link to="/shop" className="text-xs uppercase tracking-widest font-bold border-b border-brand-dark pb-1 hover:text-brand-gold hover:border-brand-gold transition-colors">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {recentlyViewed.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}

      {/* Size Guide Modal */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white w-full max-w-2xl p-8 rounded-2xl border border-brand-muted shadow-2xl relative"
          >
            <button 
              onClick={() => setIsSizeGuideOpen(false)}
              className="absolute top-4 right-4 p-2 hover:bg-brand-muted rounded-full transition-colors"
            >
              <Minus size={24} className="rotate-45" />
            </button>
            
            <h3 className="text-2xl font-display mb-8">Size Guide</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-brand-muted">
                    <th className="py-4 font-bold uppercase tracking-widest text-[10px]">Size</th>
                    <th className="py-4 font-bold uppercase tracking-widest text-[10px]">Chest (in)</th>
                    <th className="py-4 font-bold uppercase tracking-widest text-[10px]">Waist (in)</th>
                    <th className="py-4 font-bold uppercase tracking-widest text-[10px]">Length (in)</th>
                  </tr>
                </thead>
                <tbody className="text-brand-gray">
                  {sizeChartRows.map((row, idx) => (
                    <tr key={`${row[0]}-${idx}`} className="border-b border-brand-muted/50">
                      <td className="py-4 font-bold text-brand-dark">{row[0]}</td>
                      <td className="py-4">{row[1]}</td>
                      <td className="py-4">{row[2]}</td>
                      <td className="py-4">{row[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <p className="mt-8 text-[10px] text-brand-gray uppercase tracking-widest leading-relaxed">
              * Measurements are in inches. Please allow 0.5 - 1 inch difference due to manual measurement.
            </p>
          </motion.div>
        </div>
      )}
    </div>
  );
}
