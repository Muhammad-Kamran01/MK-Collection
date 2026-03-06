import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, ShieldCheck, Clock, Star } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';
import { MOCK_PRODUCTS } from '@/constants';

export default function Home() {
  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[80vh] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://picsum.photos/seed/fashion-hero/1920/1080" 
            alt="Hero"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
        <div className="relative h-full max-w-7xl mx-auto px-4 flex flex-col justify-center items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl text-white"
          >
            <h1 className="text-5xl md:text-7xl font-display mb-6 leading-tight">
              Elegance in Simplicity, <br />
              <span className="italic">Earth's Harmony</span>
            </h1>
            <Link to="/shop" className="btn-primary bg-white text-brand-dark hover:bg-brand-gold hover:text-white">
              Shop Now
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-10">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gray font-bold mb-2 block">Most Loved</span>
            <h2 className="text-4xl font-display">Best Sellers</h2>
          </div>
          <Link to="/shop" className="text-xs uppercase tracking-widest font-bold border-b border-brand-dark pb-1 hover:text-brand-gold hover:border-brand-gold transition-colors">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10">
          {MOCK_PRODUCTS.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Category Grid */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/shop?cat=unstitched" className="group relative h-[600px] overflow-hidden rounded-2xl">
            <img 
              src="https://picsum.photos/seed/unstitched/1200/1600" 
              alt="Unstitched"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 rounded-2xl"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
            <div className="absolute bottom-12 left-12 text-white">
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold mb-2 block">Collection</span>
              <h3 className="text-4xl font-display mb-4">Unstitched</h3>
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold group-hover:gap-4 transition-all">
                Explore Now <ArrowRight size={16} />
              </div>
            </div>
          </Link>
          <Link to="/shop?cat=ready-to-wear" className="group relative h-[600px] overflow-hidden rounded-2xl">
            <img 
              src="https://picsum.photos/seed/ready/1200/1600" 
              alt="Ready to Wear"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 rounded-2xl"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
            <div className="absolute bottom-12 left-12 text-white">
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold mb-2 block">Collection</span>
              <h3 className="text-4xl font-display mb-4">Ready to Wear</h3>
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold group-hover:gap-4 transition-all">
                Explore Now <ArrowRight size={16} />
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Wedding Collection Banner */}
      <section className="relative h-[600px] overflow-hidden group">
        <img 
          src="https://picsum.photos/seed/wedding-main/1920/1080" 
          alt="Wedding Collection"
          className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white p-4">
          <span className="text-[10px] uppercase tracking-[0.5em] font-bold mb-6 animate-fade-in">The Bridal Edit</span>
          <h2 className="text-6xl md:text-8xl font-display mb-8">Wedding Wear</h2>
          <p className="max-w-xl text-sm text-brand-muted mb-10 leading-relaxed uppercase tracking-widest">
            Exquisite craftsmanship for your most special moments. Custom stitching available for all bridal ensembles.
          </p>
          <div className="flex gap-6">
            <Link to="/shop?cat=wedding" className="btn-primary bg-white text-brand-dark hover:bg-brand-gold hover:text-white">
              Explore Collection
            </Link>
            <Link to="/contact?subject=Wedding%20Inquiry" className="btn-outline border-white text-white hover:bg-white hover:text-brand-dark">
              Book Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* Mixed Product View (Bento Grid Style) */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[800px]">
          <div className="md:col-span-2 md:row-span-2 relative overflow-hidden group rounded-2xl">
            <img src="https://picsum.photos/seed/bento1/800/1200" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 rounded-2xl" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-black/20 flex items-end p-8">
              <h3 className="text-3xl text-white font-display">New Arrivals</h3>
            </div>
          </div>
          <div className="relative overflow-hidden group rounded-2xl">
            <img src="https://picsum.photos/seed/bento2/600/600" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 rounded-2xl" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-black/20 flex items-end p-6">
              <h3 className="text-xl text-white font-display">Accessories</h3>
            </div>
          </div>
          <div className="relative overflow-hidden group rounded-2xl">
            <img src="https://picsum.photos/seed/bento3/600/600" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 rounded-2xl" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-black/20 flex items-end p-6">
              <h3 className="text-xl text-white font-display">Trending</h3>
            </div>
          </div>
          <div className="md:col-span-2 relative overflow-hidden group rounded-2xl">
            <img src="https://picsum.photos/seed/bento4/1200/600" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 rounded-2xl" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-black/20 flex items-end p-8">
              <h3 className="text-2xl text-white font-display">Luxury Pret</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="bg-brand-muted py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gray font-bold mb-2 block">Community Voice</span>
          <h2 className="text-4xl font-display mb-12">Customer Love</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Ayesha Khan', city: 'Lahore', text: 'The quality of the lawn is unmatched. I\'ve been a customer for 5 years and Zari & Zest never disappoints.' },
              { name: 'Sana Ahmed', city: 'Karachi', text: 'Absolutely love the ready-to-wear collection. The fit is perfect and the designs are so modern yet traditional.' },
              { name: 'Zainab Malik', city: 'Islamabad', text: 'Fast delivery and beautiful packaging. The festive collection made my Eid so special!' }
            ].map((review, i) => (
              <div key={i} className="bg-white p-10 shadow-sm border border-brand-muted rounded-2xl">
                <div className="flex justify-center gap-1 mb-6 text-brand-gold">
                  {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
                </div>
                <p className="text-brand-gray italic mb-8 leading-relaxed">"{review.text}"</p>
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-bold">{review.name}</h4>
                  <p className="text-[10px] text-brand-gray uppercase tracking-widest">{review.city}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-brand-muted p-12 md:p-20 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 space-y-6">
            <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-bold block">Our Commitment</span>
            <h2 className="text-4xl font-display">Stylish Sustainability: Clothing Promotes Eco-Friendly Choices For A Greater Future</h2>
            <p className="text-sm text-brand-gray leading-relaxed">
              At MK Collection, we believe in fashion that respects the planet. Our sustainable collection uses organic cotton and recycled materials to reduce our environmental footprint.
            </p>
            <Link to="/sustainability" className="btn-outline inline-block">Learn More</Link>
          </div>
          <div className="md:w-1/2">
            <img 
              src="https://picsum.photos/seed/sustainability/800/600" 
              alt="Sustainability"
              className="w-full h-full object-cover shadow-xl rounded-sm"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* Instagram Gallery */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display mb-2">Follow Us @Modimal</h2>
          <p className="text-[10px] uppercase tracking-[0.2em] text-brand-gray">Tag us in your photos to be featured</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="aspect-square overflow-hidden group relative rounded-sm">
              <img 
                src={`https://picsum.photos/seed/insta${i}/600/600`} 
                alt="Instagram"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 rounded-sm"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white text-xs font-bold">View Post</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs Preview */}
      <section className="max-w-3xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-4">
          {[
            { q: 'How Do I Contact Your Customer Service?', a: 'Our customer service team is available Monday through Friday, 9 AM - 5 PM PKT.' },
            { q: 'When Will My Order Ship?', a: 'Orders typically ship within 2-3 business days.' },
            { q: 'Can I Cancel Or Modify My Order?', a: 'Orders can be modified within 2 hours of placement.' }
          ].map((faq, i) => (
            <details key={i} className="group border-b border-brand-muted pb-4 cursor-pointer">
              <summary className="flex justify-between items-center list-none text-sm font-bold uppercase tracking-widest">
                {faq.q}
                <span className="transition-transform group-open:rotate-180">↓</span>
              </summary>
              <p className="mt-4 text-sm text-brand-gray leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/faqs" className="text-xs uppercase tracking-widest font-bold border-b border-brand-dark pb-1">View All FAQs</Link>
        </div>
      </section>

      {/* Above Footer Info */}
      <section className="max-w-7xl mx-auto px-4 py-20 border-t border-brand-muted">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { icon: Truck, title: 'Free Shipping', desc: 'On orders over PKR 5,000' },
            { icon: ShieldCheck, title: 'Secure Payment', desc: '100% secure checkout' },
            { icon: Clock, title: '24/7 Support', desc: 'Dedicated support team' },
            { icon: Star, title: 'Quality Assured', desc: 'Premium materials only' }
          ].map((item, i) => (
            <div key={i} className="text-center space-y-4">
              <div className="flex justify-center">
                <item.icon size={32} strokeWidth={1} className="text-brand-gold" />
              </div>
              <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-brand-dark">{item.title}</h4>
              <p className="text-[11px] text-brand-gray tracking-wide">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="w-full bg-gradient-to-r from-[#E2C16C] to-[#C5A04D] py-24">
        <div className="max-w-7xl mx-auto px-4 flex flex-col justify-center items-center text-center text-brand-dark">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold mb-4 text-white block">Keep Me Updated</span>
            <h2 className="text-4xl md:text-5xl font-display mb-6">NEWSLETTER</h2>
            <p className="max-w-md text-sm text-brand-dark/80 mb-10 leading-relaxed">Subscribe to get notified about product launches, special offers and company news.</p>
            <form className="flex w-full max-w-md rounded-full overflow-hidden border border-brand-dark/10 bg-white/40 backdrop-blur-md shadow-lg">
              <input 
                type="email" 
                placeholder="E-mail Address" 
                className="flex-grow bg-transparent px-8 py-4 text-sm outline-none transition-all placeholder:text-brand-dark/50 focus:bg-white/10"
              />
              <button type="submit" className="bg-brand-dark text-white px-10 py-4 text-[10px] uppercase tracking-widest font-bold hover:bg-black transition-colors">Subscribe</button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
