import { useAuth } from '@/contexts/AuthContext';
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { 
  LayoutDashboard, ShoppingBag, Package, Users, FolderOpen, 
  Star, Settings, LogOut, Menu, X, TrendingUp, Bell, Mail,
  Search
} from 'lucide-react';
import { cn } from '@/lib/utils';
import AdminOverview from '@/pages/admin/AdminOverview';
import AdminProducts from '@/pages/admin/AdminProducts';
import AdminOrders from '@/pages/admin/AdminOrders';
import AdminUsers from '@/pages/admin/AdminUsers';
import AdminCategories from '@/pages/admin/AdminCategories';
import AdminReviews from '@/pages/admin/AdminReviews';
import AdminSettings from '@/pages/admin/AdminSettings';
import AdminContactMessages from '@/pages/admin/AdminContactMessages';

export default function AdminDashboard() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate('/auth/login');
      } else if (user.role !== 'admin') {
        navigate('/dashboard'); // Redirect non-admins
      }
    }
  }, [user, loading, navigate]);

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-brand-gold mx-auto mb-4"></div>
          <p className="text-sm text-gray-500 uppercase tracking-widest font-bold">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return null;
  }

  const displayName = user.name?.trim() || user.email?.split('@')[0] || 'Admin';
  const avatarLetter = displayName.charAt(0).toUpperCase();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const sidebarLinks = [
    { name: 'Overview', href: '/admin', icon: LayoutDashboard, badge: null },
    { name: 'Products', href: '/admin/products', icon: Package, badge: null },
    { name: 'Orders', href: '/admin/orders', icon: ShoppingBag, badge: 'new' },
    { name: 'Users', href: '/admin/users', icon: Users, badge: null },
    { name: 'Categories', href: '/admin/categories', icon: FolderOpen, badge: null },
    { name: 'Reviews', href: '/admin/reviews', icon: Star, badge: null },
    { name: 'Contact Messages', href: '/admin/contact-messages', icon: Mail, badge: null },
    { name: 'Analytics', href: '/admin/analytics', icon: TrendingUp, badge: null },
    { name: 'Settings', href: '/admin/settings', icon: Settings, badge: null },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Top Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between px-4 lg:px-8 h-16">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <Link to="/" className="flex items-center gap-2">
              <h1 className="text-xl font-display font-bold bg-gradient-to-r from-brand-dark to-brand-gold bg-clip-text text-transparent">
                MK Collection
              </h1>
              <span className="hidden sm:block px-2 py-0.5 text-[9px] uppercase tracking-widest font-bold bg-brand-gold text-white rounded">
                Admin
              </span>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search products, orders, users..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold transition-all"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell size={20} className="text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-semibold text-gray-900">{displayName}</p>
                <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Administrator</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-gold to-brand-dark flex items-center justify-center text-white font-bold text-sm">
                {avatarLetter}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-16 left-0 bottom-0 z-30 w-64 bg-white border-r border-gray-200 transition-transform duration-300 overflow-y-auto",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <nav className="p-4 space-y-1">
          {sidebarLinks.map((link) => {
            const isActive = location.pathname === link.href || 
              (link.href !== '/admin' && location.pathname.startsWith(link.href));
            
            return (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center justify-between gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all",
                  isActive
                    ? "bg-gradient-to-r from-brand-gold to-amber-400 text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <div className="flex items-center gap-3">
                  <link.icon size={20} strokeWidth={1.5} />
                  <span>{link.name}</span>
                </div>
                {link.badge && (
                  <span className="px-2 py-0.5 text-[9px] uppercase font-bold bg-red-500 text-white rounded">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200 mt-auto">
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-all"
          >
            <LogOut size={20} strokeWidth={1.5} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="pt-16 lg:pl-64 min-h-screen">
        <div className="p-4 lg:p-8">
          <Routes>
            <Route index element={<AdminOverview />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="reviews" element={<AdminReviews />} />
            <Route path="contact-messages" element={<AdminContactMessages />} />
            <Route path="analytics" element={<ComingSoon title="Analytics" />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

function ComingSoon({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-center h-96">
      <div className="text-center">
        <TrendingUp size={48} className="mx-auto text-gray-300 mb-4" />
        <h2 className="text-2xl font-display text-gray-900 mb-2">{title}</h2>
        <p className="text-sm text-gray-500 uppercase tracking-widest">Coming Soon</p>
      </div>
    </div>
  );
}
