import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-footer-bg text-brand-dark pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div>
            <Link to="/" className="inline-block mb-6">
              <span className="text-2xl font-display tracking-tighter text-brand-dark">MK COLLECTION</span>
            </Link>
            <p className="text-brand-gray text-sm leading-relaxed mb-6">
              Redefining fashion with elegance and quality. Our collection is crafted for those who appreciate the finer things in life.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-brand-gray hover:text-brand-gold transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-brand-gray hover:text-brand-gold transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-brand-gray hover:text-brand-gold transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-brand-gray hover:text-brand-gold transition-colors"><Youtube size={20} /></a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold mb-6 text-brand-dark">Shop</h4>
            <ul className="space-y-4 text-sm text-brand-gray">
              <li><Link to="/shop?cat=men" className="hover:text-brand-gold transition-colors">Men's Collection</Link></li>
              <li><Link to="/shop?cat=women" className="hover:text-brand-gold transition-colors">Women's Collection</Link></li>
              <li><Link to="/shop?cat=accessories" className="hover:text-brand-gold transition-colors">Accessories</Link></li>
              <li><Link to="/shop?cat=new" className="hover:text-brand-gold transition-colors">New Arrivals</Link></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold mb-6 text-brand-dark">Company</h4>
            <ul className="space-y-4 text-sm text-brand-gray">
              <li><Link to="/about" className="hover:text-brand-gold transition-colors">About Us</Link></li>
              <li><Link to="/careers" className="hover:text-brand-gold transition-colors">Careers</Link></li>
              <li><Link to="/contact" className="hover:text-brand-gold transition-colors">Contact</Link></li>
              <li><Link to="/privacy" className="hover:text-brand-gold transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold mb-6 text-brand-dark">Newsletter</h4>
            <p className="text-brand-gray text-sm mb-6">Subscribe to receive updates, access to exclusive deals, and more.</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-transparent border-b border-brand-gray py-2 flex-grow text-sm focus:border-brand-gold outline-none transition-colors"
              />
              <button type="submit" className="border-b border-brand-gray px-4 py-2 text-xs uppercase tracking-widest font-semibold hover:border-brand-gold transition-colors">Join</button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-brand-gray uppercase tracking-widest">
          <p>© {currentYear} MK COLLECTION. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <Link to="/shipping" className="hover:text-brand-gold transition-colors">Shipping & Returns</Link>
            <Link to="/terms" className="hover:text-brand-gold transition-colors">Terms of Service</Link>
            <Link to="/payment" className="hover:text-brand-gold transition-colors">Payment Methods</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
