import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, ShieldCheck, Clock, Star } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';
import { MOCK_PRODUCTS } from '@/constants';

export default function Home() {
  return (
    <div className="pb-20">
      {/* Premium Hero Section */}
      <section className="relative h-[90vh] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1920&q=80" 
            alt="Hero"
            className="w-full h-full object-cover scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        </div>
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-2xl text-white space-y-8"
          >
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-[11px] uppercase tracking-[0.5em] font-bold text-brand-gold block"
            >
              MK Collection 2026
            </motion.span>
            <h1 className="text-6xl md:text-8xl font-display leading-[1.1] mb-8">
              Elegance<br />
              <span className="text-brand-gold italic">Redefined</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-xl leading-relaxed font-light">
              Discover our curated collection of premium Pakistani fashion, where traditional craftsmanship meets contemporary design.
            </p>
            <div className="flex gap-6 pt-4">
              <Link to="/shop" className="btn-primary bg-brand-gold text-white hover:bg-white hover:text-brand-dark px-10 py-5 text-sm">
                Explore Collection
              </Link>
              <Link to="/shop?cat=wedding" className="btn-outline border-2 border-white text-white hover:bg-white hover:text-brand-dark px-10 py-5 text-sm">
                Wedding Edit
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-white text-center"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-[9px] uppercase tracking-[0.3em] font-bold">Scroll</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-px h-12 bg-gradient-to-b from-white to-transparent"
            />
          </div>
        </motion.div>
      </section>

      {/* Best Sellers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-brand-gold font-bold mb-4 block">Curated For You</span>
          <h2 className="text-5xl md:text-6xl font-display mb-4">Best Sellers</h2>
          <p className="text-brand-gray text-sm max-w-2xl mx-auto">
            Discover our most coveted pieces, handpicked by fashion connoisseurs
          </p>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10 mb-12"
        >
          {MOCK_PRODUCTS.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
        <div className="text-center">
          <Link to="/shop" className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] font-bold border-b-2 border-brand-dark pb-2 hover:text-brand-gold hover:border-brand-gold transition-all">
            View All Products <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Premium Category Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-brand-gold font-bold mb-4 block">Explore Collections</span>
          <h2 className="text-5xl md:text-6xl font-display">Shop By Style</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Link to="/shop?cat=unstitched" className="group relative h-[650px] overflow-hidden block shadow-2xl rounded-2xl">
              <img 
                src="https://images.unsplash.com/photo-1610652492223-67d0faac5e06?auto=format&fit=crop&w=1200&q=80" 
                alt="Unstitched"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 rounded-2xl"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition-all duration-500" />
              <div className="absolute inset-0 flex flex-col justify-end p-12">
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold mb-3 block text-brand-gold">Fabric Collection</span>
                <h3 className="text-5xl font-display mb-6 text-white">Unstitched</h3>
                <p className="text-sm text-white/80 mb-6 max-w-md leading-relaxed">
                  Premium lawn, silk, and chiffon fabrics for your custom creations
                </p>
                <div className="flex items-center gap-3 text-white text-xs uppercase tracking-[0.2em] font-bold group-hover:gap-5 transition-all">
                  Explore Collection <ArrowRight size={18} strokeWidth={2.5} />
                </div>
              </div>
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Link to="/shop?cat=ready-to-wear" className="group relative h-[650px] overflow-hidden block shadow-2xl rounded-2xl">
              <img 
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80" 
                alt="Ready to Wear"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 rounded-2xl"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition-all duration-500" />
              <div className="absolute inset-0 flex flex-col justify-end p-12">
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold mb-3 block text-brand-gold">Pret Collection</span>
                <h3 className="text-5xl font-display mb-6 text-white">Ready to Wear</h3>
                <p className="text-sm text-white/80 mb-6 max-w-md leading-relaxed">
                  Expertly tailored pieces ready for your wardrobe
                </p>
                <div className="flex items-center gap-3 text-white text-xs uppercase tracking-[0.2em] font-bold group-hover:gap-5 transition-all">
                  Explore Collection <ArrowRight size={18} strokeWidth={2.5} />
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Premium Wedding Collection */}
      <section className="relative h-[700px] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1920&q=80" 
            alt="Wedding Collection"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative h-full flex flex-col justify-center items-center text-center text-white px-4"
        >
          <span className="text-[10px] uppercase tracking-[0.6em] font-bold mb-6 text-brand-gold">The Bridal Edit</span>
          <h2 className="text-6xl md:text-8xl lg:text-9xl font-display mb-8 leading-[1.1]">Wedding<br/>Couture</h2>
          <div className="w-24 h-px bg-brand-gold mb-8"></div>
          <p className="max-w-2xl text-base md:text-lg text-white/90 mb-12 leading-relaxed">
            Exquisite craftsmanship for your most cherished moments.<br/>
            Custom tailoring and bespoke designs for the modern bride.
          </p>
          <div className="flex flex-col sm:flex-row gap-6">
            <Link to="/shop?cat=wedding" className="btn-primary bg-brand-gold text-white hover:bg-white hover:text-brand-dark px-12 py-5 text-sm">
              View Bridal Collection
            </Link>
            <Link to="/contact?subject=Wedding%20Inquiry" className="btn-outline border-2 border-white text-white hover:bg-white hover:text-brand-dark px-12 py-5 text-sm">
              Book Private Consultation
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Premium Customer Reviews */}
      <section className="py-32 bg-gradient-to-b from-white via-brand-muted/30 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <span className="text-[10px] uppercase tracking-[0.4em] text-brand-gold font-bold mb-4 block">Testimonials</span>
            <h2 className="text-5xl md:text-6xl font-display mb-4">What Our Clients Say</h2>
            <p className="text-brand-gray text-sm max-w-2xl mx-auto">
              Hear from our valued customers about their experience with MK Collection
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Ayesha Khan', city: 'Lahore', text: 'The quality of the fabric is exceptional. Every piece is crafted with attention to detail. MK Collection has become my go-to for all special occasions.', rating: 5 },
              { name: 'Sana Ahmed', city: 'Karachi', text: 'Absolutely in love with the ready-to-wear collection. The fit is perfect and the designs beautifully balance modern aesthetics with traditional elegance.', rating: 5 },
              { name: 'Zainab Malik', city: 'Islamabad', text: 'Outstanding service and exquisite designs! The bridal collection exceeded all my expectations. Thank you for making my wedding day so special.', rating: 5 }
            ].map((review, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="bg-white p-10 shadow-xl hover:shadow-2xl transition-shadow duration-300 border-t-4 border-brand-gold relative rounded-2xl"
              >
                {/* Quote Icon */}
                <div className="absolute -top-4 left-10 w-12 h-12 bg-brand-gold flex items-center justify-center text-white text-3xl font-serif shadow-lg rounded-lg">
                  "
                </div>
                
                <div className="flex justify-center gap-1 mb-6 text-brand-gold text-lg pt-6">
                  {[...Array(review.rating)].map((_, i) => <span key={i}>★</span>)}
                </div>
                
                <p className="text-brand-gray mb-8 leading-relaxed text-center italic">
                  "{review.text}"
                </p>
                
                <div className="text-center pt-6 border-t border-brand-muted/30">
                  <h4 className="text-sm uppercase tracking-[0.2em] font-bold text-brand-dark mb-1">{review.name}</h4>
                  <p className="text-[10px] text-brand-gray uppercase tracking-widest">{review.city}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-12"
        >
          {[
            { icon: Truck, title: 'Complimentary Shipping', desc: 'Free delivery on orders over PKR 5,000' },
            { icon: ShieldCheck, title: 'Secure Checkout', desc: '100% safe and encrypted payment' },
            { icon: Clock, title: 'Premium Support', desc: 'Dedicated assistance 24/7' },
            { icon: Star, title: 'Exclusive Quality', desc: 'Handpicked premium fabrics' }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center space-y-6 group"
            >
              <div className="flex justify-center">
                <div className="w-20 h-20 bg-brand-muted flex items-center justify-center group-hover:bg-brand-gold transition-all duration-300 shadow-lg group-hover:shadow-xl">
                  <item.icon size={36} strokeWidth={1.5} className="text-brand-gold group-hover:text-white transition-colors" />
                </div>
              </div>
              <div>
                <h4 className="text-sm uppercase tracking-[0.2em] font-bold text-brand-dark mb-3">{item.title}</h4>
                <p className="text-xs text-brand-gray leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Premium Newsletter */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-gold via-[#D4AF37] to-[#C5A04D]"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ 
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)'
          }}></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <span className="text-[10px] uppercase tracking-[0.5em] font-bold mb-6 block">Stay Connected</span>
            <h2 className="text-5xl md:text-6xl font-display mb-6 leading-tight">Join Our<br/>Exclusive Circle</h2>
            <p className="max-w-2xl mx-auto text-base text-white/90 mb-12 leading-relaxed">
              Be the first to discover new collections, exclusive offers, and fashion insights curated just for you.
            </p>
            
            <form className="max-w-xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-4 bg-white/95 backdrop-blur-sm p-3 shadow-2xl">
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  required
                  className="flex-grow bg-transparent px-6 py-4 text-brand-dark text-sm outline-none placeholder:text-brand-gray/60"
                />
                <button 
                  type="submit" 
                  className="bg-brand-dark text-white px-10 py-4 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-black transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap"
                >
                  Subscribe Now
                </button>
              </div>
              <p className="text-xs text-white/70 mt-6">
                By subscribing, you agree to receive marketing emails from MK Collection. Unsubscribe anytime.
              </p>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
