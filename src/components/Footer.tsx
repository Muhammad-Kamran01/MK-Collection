import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Youtube, MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-[#1a1a1a] text-white pt-20 pb-8">
      <div className="pointer-events-none absolute -top-24 -left-16 h-56 w-56 rounded-full bg-brand-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-16 h-56 w-56 rounded-full bg-brand-gold/10 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* <div className="mb-10 border-y border-white/10 py-4 text-center text-[11px] uppercase tracking-[0.28em] text-white/50">
          Crafted With Elegance. Worn With Confidence.
        </div> */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* Brand Info */}
          <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-8 shadow-[0_20px_45px_rgba(0,0,0,0.5)]">
            <Link to="/" className="flex justify-center mb-5">
              <div className="flex items-center justify-center gap-3">
                <img
                  src="/logo.png"
                  alt="MK Collection Logo"
                  className="w-11 h-11 rounded-xl object-cover ring-1 ring-white/20"
                />
                <span className="text-2xl font-display tracking-tight text-white">MK COLLECTION</span>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-xl">
              Redefining fashion with elegance and quality. Our collection is crafted for those who appreciate the finer things in life.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="#" className="group w-10 h-10 rounded-full border border-white/15 bg-white/5 text-white/60 hover:text-white hover:border-brand-gold hover:bg-brand-gold/15 transition-all duration-300 flex items-center justify-center hover:-translate-y-0.5">
                <Facebook size={18} className="group-hover:scale-105 transition-transform" />
              </a>
              <a href="#" className="group w-10 h-10 rounded-full border border-white/15 bg-white/5 text-white/60 hover:text-white hover:border-brand-gold hover:bg-brand-gold/15 transition-all duration-300 flex items-center justify-center hover:-translate-y-0.5">
                <Instagram size={18} className="group-hover:scale-105 transition-transform" />
              </a>
              <a href="#" className="group w-10 h-10 rounded-full border border-white/15 bg-white/5 text-white/60 hover:text-white hover:border-brand-gold hover:bg-brand-gold/15 transition-all duration-300 flex items-center justify-center hover:-translate-y-0.5">
                <Linkedin size={18} className="group-hover:scale-105 transition-transform" />
              </a>
              <a href="#" className="group w-10 h-10 rounded-full border border-white/15 bg-white/5 text-white/60 hover:text-white hover:border-brand-gold hover:bg-brand-gold/15 transition-all duration-300 flex items-center justify-center hover:-translate-y-0.5">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-105 transition-transform">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </a>
              <a href="#" className="group w-10 h-10 rounded-full border border-white/15 bg-white/5 text-white/60 hover:text-white hover:border-brand-gold hover:bg-brand-gold/15 transition-all duration-300 flex items-center justify-center hover:-translate-y-0.5">
                <Youtube size={18} className="group-hover:scale-105 transition-transform" />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 shadow-[0_14px_32px_rgba(0,0,0,0.4)]">
            <h4 className="text-[11px] uppercase tracking-[0.24em] font-semibold mb-6 text-white" style={{textAlign: 'center'}}>Shop / Our Collections</h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li><Link to="/shop?cat=men" className="inline-flex items-center gap-2 hover:text-brand-gold transition-colors"><span className="h-1.5 w-1.5 rounded-full bg-brand-gold/70" />Men's Collection</Link></li>
              <li><Link to="/shop?cat=women" className="inline-flex items-center gap-2 hover:text-brand-gold transition-colors"><span className="h-1.5 w-1.5 rounded-full bg-brand-gold/70" />Women's Collection</Link></li>
              <li><Link to="/shop?cat=accessories" className="inline-flex items-center gap-2 hover:text-brand-gold transition-colors"><span className="h-1.5 w-1.5 rounded-full bg-brand-gold/70" />Accessories</Link></li>
              <li><Link to="/shop?cat=new" className="inline-flex items-center gap-2 hover:text-brand-gold transition-colors"><span className="h-1.5 w-1.5 rounded-full bg-brand-gold/70" />New Arrivals</Link></li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 shadow-[0_14px_32px_rgba(0,0,0,0.4)]">
            <h4 className="text-[11px] uppercase tracking-[0.24em] font-semibold mb-6 text-white" style={{textAlign: 'center'}}>You Know Us</h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li><Link to="/about" className="inline-flex items-center gap-2 hover:text-brand-gold transition-colors"><span className="h-1.5 w-1.5 rounded-full bg-brand-gold/70" />About Us</Link></li>
              <li><Link to="/careers" className="inline-flex items-center gap-2 hover:text-brand-gold transition-colors"><span className="h-1.5 w-1.5 rounded-full bg-brand-gold/70" />Careers</Link></li>
              <li><Link to="/contact" className="inline-flex items-center gap-2 hover:text-brand-gold transition-colors"><span className="h-1.5 w-1.5 rounded-full bg-brand-gold/70" />Contact</Link></li>
              <li><Link to="/payment" className="inline-flex items-center gap-2 hover:text-brand-gold transition-colors"><span className="h-1.5 w-1.5 rounded-full bg-brand-gold/70" />Payment Methods</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-2 lg:col-span-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 shadow-[0_16px_34px_rgba(0,0,0,0.4)]">
            <h4 className="text-[11px] uppercase tracking-[0.24em] font-semibold mb-5 text-white" style={{textAlign: 'center'}}>Contact Us</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-white/60">
              <p className="flex justify-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3"><MapPin size={16} className="flex-shrink-0 text-brand-gold" /><span>F-7 Markaz, Islamabad, Pakistan</span></p>
              <p className="flex justify-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3"><Phone size={16} className="flex-shrink-0 text-brand-gold" /><span>+92 336 2818701</span></p>
              <p className="flex justify-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3"><Mail size={16} className="flex-shrink-0 text-brand-gold" /><span>info@mkcollection.pk</span></p>
              <p className="flex justify-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3"><Clock size={16} className="flex-shrink-0 text-brand-gold" /><span>10:00 AM to 10:00 PM</span></p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm px-5 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-[10px] uppercase tracking-[0.2em] text-white/50">
          <p>© {currentYear} MK COLLECTION. All Rights Reserved.</p>
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            <Link to="/shipping" className="hover:text-brand-gold transition-colors">Shipping & Returns</Link>
            <Link to="/terms" className="hover:text-brand-gold transition-colors">Terms of Service</Link>
            <Link to="/privacy" className="hover:text-brand-gold transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
