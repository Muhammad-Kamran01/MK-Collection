import { Link, NavLink } from 'react-router-dom';
import { ShoppingBag, User, Heart, Search, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const { user } = useAuth();

  const navLinks = [
    { name: 'Collection', href: '/shop' },
    { name: 'New In', href: '/shop?filter=new' },
    { name: 'Track Order', href: '/track-order' },
    { name: 'Contact', href: '/contact' },
    { name: 'Sustainability', href: '/sustainability' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-brand-muted">
      <div className="bg-header-promo text-brand-dark text-[10px] py-1.5 text-center uppercase tracking-[0.2em]">
        Enjoy Free Shipping On All Orders
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo & Brand Name (Left) */}
          <div className="flex items-center">
            <button 
              className="lg:hidden p-2 mr-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Link to="/" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-brand-gold rounded-full flex items-center justify-center text-white">
                <span className="font-display text-lg">MK</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-display tracking-tighter text-brand-dark leading-none">MK COLLECTION</span>
                <span className="text-[7px] uppercase tracking-[0.3em] text-brand-gray">premium women clothing</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation (Center) */}
          <nav className="hidden lg:flex space-x-8 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.href}
                className={({ isActive }) =>
                  cn(
                    "text-[10px] uppercase tracking-widest font-bold transition-colors hover:text-brand-gold",
                    isActive ? "text-brand-gold" : "text-brand-dark"
                  )
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Icons (Right) */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button className="p-2 hover:text-brand-gold transition-colors">
              <Search size={20} strokeWidth={1.5} />
            </button>
            <Link to={user ? "/dashboard" : "/auth/login"} className="p-2 hover:text-brand-gold transition-colors">
              <User size={20} strokeWidth={1.5} />
            </Link>
            <Link to="/wishlist" className="p-2 hover:text-brand-gold transition-colors relative">
              <Heart size={20} strokeWidth={1.5} />
            </Link>
            <Link to="/cart" className="p-2 hover:text-brand-gold transition-colors relative">
              <ShoppingBag size={20} strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="absolute top-1 right-1 bg-brand-gold text-white text-[8px] w-4 h-4 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-white pt-20">
          <div className="px-4 space-y-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="block text-lg uppercase tracking-widest font-medium border-b border-brand-muted pb-4"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
