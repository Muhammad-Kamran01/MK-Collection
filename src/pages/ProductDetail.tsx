import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Heart, ShoppingBag, ChevronRight, Star, Truck, RotateCcw, ShieldCheck, Plus, Minus, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '@/types';
import { supabase } from '@/lib/supabase';
import { formatPrice, cn } from '@/lib/utils';
import { useCart } from '@/contexts/CartContext';
import ProductCard from '@/components/ProductCard';
import { MOCK_PRODUCTS } from '@/constants';

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
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

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!product) return <div className="min-h-screen flex items-center justify-center">Product not found</div>;

  const handleAddToCart = () => {
    addItem(product, quantity, selectedSize, selectedColor);
    // Optional: show toast or open cart sidebar
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  return (
    <div className="pb-20">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-brand-gray">
          <Link to="/" className="hover:text-brand-dark">Home</Link>
          <ChevronRight size={10} />
          <Link to="/shop" className="hover:text-brand-dark">Shop</Link>
          <ChevronRight size={10} />
          <span className="text-brand-dark">{product.title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Image Gallery */}
        <div className="flex flex-col-reverse lg:flex-row gap-4">
          {/* Thumbnails */}
          <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-y-auto lg:max-h-[600px] no-scrollbar lg:w-24">
            {product.images.map((img, i) => (
                  <button 
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={cn(
                      "flex-shrink-0 w-20 lg:w-full aspect-[3/4] overflow-hidden bg-brand-muted border-2 transition-all rounded-lg",
                      selectedImage === i ? "border-brand-gold" : "border-transparent"
                    )}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover rounded-lg" referrerPolicy="no-referrer" />
                  </button>
            ))}
          </div>
          {/* Main Image */}
          <div 
            className="flex-grow aspect-[3/4] overflow-hidden bg-brand-muted rounded-sm cursor-zoom-in relative"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
          >
            <img 
              src={product.images[selectedImage]} 
              alt={product.title}
              className="w-full h-full object-cover rounded-sm transition-transform duration-150 ease-out"
              style={{
                transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                transform: isZoomed ? 'scale(2.5)' : 'scale(1)'
              }}
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-brand-gold">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
                ))}
              </div>
              <span className="text-[10px] text-brand-gray uppercase tracking-widest font-bold">({product.rating} Rating)</span>
            </div>
            <h1 className="text-4xl font-display mb-4">{product.title}</h1>
            <div className="flex items-center gap-4">
              {product.discount_price ? (
                <>
                  <span className="text-2xl font-bold text-brand-dark">{formatPrice(product.discount_price)}</span>
                  <span className="text-lg text-brand-gray line-through">{formatPrice(product.price)}</span>
                </>
              ) : (
                <span className="text-2xl font-bold text-brand-dark">{formatPrice(product.price)}</span>
              )}
            </div>
          </div>

          <div className="prose prose-sm text-brand-gray max-w-none">
            <p className="whitespace-pre-line">{product.description}</p>
          </div>

          {/* Options */}
          <div className="space-y-6">
            {/* Size Selection */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] uppercase tracking-widest font-bold">Select Size</span>
                <button 
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-[10px] uppercase tracking-widest font-bold border-b border-brand-dark pb-0.5"
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
                      selectedSize === size ? "bg-brand-dark text-white border-brand-dark" : "border-gray-200 hover:border-brand-dark"
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
                      selectedColor === color ? "border-brand-gold" : "border-transparent"
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
                <div className="flex items-center border border-brand-muted rounded-full overflow-hidden">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 hover:bg-brand-muted transition-colors"
                  >
                    -
                  </button>
                  <span className="w-12 text-center text-sm font-bold">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-3 hover:bg-brand-muted transition-colors"
                  >
                    +
                  </button>
                </div>
                <button 
                  onClick={handleAddToCart}
                  className="flex-grow btn-primary flex items-center justify-center gap-3"
                >
                  <ShoppingBag size={18} /> Add to Bag
                </button>
                <button className="p-4 border border-brand-muted hover:bg-brand-muted transition-colors rounded-full">
                  <Heart size={20} />
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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-brand-muted">
            <div className="flex items-center gap-3">
              <Truck size={20} className="text-brand-gold" />
              <div>
                <h4 className="text-[10px] uppercase tracking-widest font-bold">Fast Delivery</h4>
                <p className="text-[9px] text-brand-gray uppercase tracking-widest">Across Pakistan</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <RotateCcw size={20} className="text-brand-gold" />
              <div>
                <h4 className="text-[10px] uppercase tracking-widest font-bold">Easy Returns</h4>
                <p className="text-[9px] text-brand-gray uppercase tracking-widest">7 Days Policy</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck size={20} className="text-brand-gold" />
              <div>
                <h4 className="text-[10px] uppercase tracking-widest font-bold">Secure Payment</h4>
                <p className="text-[9px] text-brand-gray uppercase tracking-widest">COD & Online</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Info Section */}
      <section className="max-w-7xl mx-auto px-4 mt-20 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-4">
          {/* Accordions */}
          {[
            { id: 'fitting', title: 'Fitting', content: 'Tailored fit that complements the silhouette. True to size.' },
            { id: 'fabric', title: 'Fabric & Care', content: (
              <div className="space-y-4">
                <div>
                  <h5 className="font-bold text-brand-sage mb-1">Fabric :</h5>
                  <p>Tailored Stretch, Made In Italy 62% Nylon, 38% Elastane, 100% Vegan Materials</p>
                </div>
                <div>
                  <h5 className="font-bold text-brand-sage mb-1">Care:</h5>
                  <p>Cold Machine Wash, Line Dry. Do Not Tumble Dry Or Dry Clean, Do Not Use Bleach Or Fabric Softener</p>
                </div>
              </div>
            )},
            { id: 'detail', title: 'Product Detail', content: 'Intricate embroidery on premium lawn fabric. Includes shirt, dupatta, and trousers.' },
            { id: 'shipping', title: 'Shipping And Return', content: (
              <div className="space-y-4">
                <div>
                  <h5 className="font-bold text-brand-sage mb-1">Shipping:</h5>
                  <p>Is Free On US, Canada Orders Are $175</p>
                </div>
                <div>
                  <h5 className="font-bold text-brand-sage mb-1">Returns:</h5>
                  <p>Unwashed, Unworn Items Are Eligible For Returns Or Exchanges Within 30 Days Of Purchase. Final Sale Items Are Not Eligible For Returns.</p>
                </div>
              </div>
            )},
          ].map((item) => (
            <div key={item.id} className="border-b border-brand-muted">
              <button 
                onClick={() => setOpenAccordion(openAccordion === item.id ? null : item.id)}
                className="w-full flex justify-between items-center py-4 text-left font-bold uppercase tracking-widest text-sm"
              >
                {item.title}
                {openAccordion === item.id ? <Minus size={16} /> : <Plus size={16} />}
              </button>
              {openAccordion === item.id && (
                <div className="pb-6 text-sm text-brand-gray leading-relaxed">
                  {item.content}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Material Info Box */}
        <div className="bg-brand-muted/30 p-8 rounded-sm h-fit">
          <h3 className="text-lg font-medium mb-4 pb-4 border-b border-brand-muted">Silk</h3>
          <p className="text-sm text-brand-gray leading-relaxed mb-8">
            This Material Is Our Signature High-Stretch Fabric That Drapes Like Silk And Is Soft To The Touch. Silk Is OEKO-TEX® Certified And Made In Italy In A Mill 100% Powered By Renewable Energy (Solar And Biomass)
          </p>
          <div className="flex flex-wrap gap-2">
            {['Quick Dry', 'Chemical Free', 'Machine Washable'].map(tag => (
              <span key={tag} className="px-4 py-2 bg-white text-[10px] uppercase tracking-widest font-bold shadow-sm">
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
            className="bg-white w-full max-w-2xl p-8 rounded-sm shadow-2xl relative"
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
                  <tr className="border-b border-brand-muted/50">
                    <td className="py-4 font-bold text-brand-dark">XS</td>
                    <td className="py-4">32 - 33</td>
                    <td className="py-4">24 - 25</td>
                    <td className="py-4">38</td>
                  </tr>
                  <tr className="border-b border-brand-muted/50">
                    <td className="py-4 font-bold text-brand-dark">S</td>
                    <td className="py-4">34 - 35</td>
                    <td className="py-4">26 - 27</td>
                    <td className="py-4">39</td>
                  </tr>
                  <tr className="border-b border-brand-muted/50">
                    <td className="py-4 font-bold text-brand-dark">M</td>
                    <td className="py-4">36 - 37</td>
                    <td className="py-4">28 - 29</td>
                    <td className="py-4">40</td>
                  </tr>
                  <tr className="border-b border-brand-muted/50">
                    <td className="py-4 font-bold text-brand-dark">L</td>
                    <td className="py-4">38 - 40</td>
                    <td className="py-4">30 - 32</td>
                    <td className="py-4">41</td>
                  </tr>
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
