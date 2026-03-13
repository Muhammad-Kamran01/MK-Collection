import { useAuth } from '@/contexts/AuthContext';
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Heart, User, Settings, LogOut, Package, Users, FileText, HelpCircle, Plus, Edit, Trash2 } from 'lucide-react';
import { cn, formatPrice } from '@/lib/utils';
import { supabase } from '@/lib/supabase';
import { Product } from '@/types';

export default function Dashboard() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate('/auth/login');
      } else if (user.role === 'admin') {
        // Redirect admins to admin dashboard
        navigate('/admin');
      }
    }
  }, [user, loading, navigate]);

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-brand-gold mx-auto mb-4"></div>
          <p className="text-sm text-gray-500 uppercase tracking-widest font-bold">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (user.role === 'admin') {
    return null; // Will redirect
  }

  const displayName = user.name?.trim() || user.email?.split('@')[0] || 'User';

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const sidebarLinks = [
    { name: 'Overview', href: '/dashboard', icon: LayoutDashboard, roles: ['customer', 'staff'] },
    { name: 'My Orders', href: '/dashboard/orders', icon: ShoppingBag, roles: ['customer'] },
    { name: 'Manage Orders', href: '/dashboard/manage-orders', icon: Package, roles: ['staff'] },
    { name: 'Products', href: '/dashboard/products', icon: Package, roles: ['staff'] },
    { name: 'Wishlist', href: '/dashboard/wishlist', icon: Heart, roles: ['customer'] },
    { name: 'Profile', href: '/dashboard/profile', icon: User, roles: ['customer', 'staff'] },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings, roles: ['customer', 'staff'] },
  ];

  const filteredLinks = sidebarLinks.filter(link => link.roles.includes(user.role));

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col md:flex-row gap-12">
      {/* Sidebar */}
      <aside className="w-full md:w-64 space-y-8">
        <div className="pb-8 border-b border-brand-muted">
          <h2 className="text-xl font-display mb-1">{displayName}</h2>
          <p className="text-[10px] uppercase tracking-widest text-brand-gray font-bold">{user.role} Account</p>
        </div>
        
        <nav className="space-y-2">
          {filteredLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="flex items-center gap-3 px-4 py-3 text-xs uppercase tracking-widest font-bold text-brand-gray hover:text-brand-dark hover:bg-brand-muted transition-all"
            >
              <link.icon size={18} strokeWidth={1.5} />
              {link.name}
            </Link>
          ))}
          <button 
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-3 text-xs uppercase tracking-widest font-bold text-state-error hover:bg-red-50 transition-all"
          >
            <LogOut size={18} strokeWidth={1.5} />
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-grow">
        <Routes>
          <Route index element={<Overview user={user} />} />
          <Route path="orders" element={<div className="py-20 text-center text-brand-gray uppercase tracking-widest text-sm">Order History Coming Soon</div>} />
          <Route path="manage-orders" element={<div className="py-20 text-center text-brand-gray uppercase tracking-widest text-sm">Manage Orders Coming Soon</div>} />
          <Route path="products" element={<ManageProducts />} />
          <Route path="wishlist" element={<div className="py-20 text-center text-brand-gray uppercase tracking-widest text-sm">Wishlist Coming Soon</div>} />
          <Route path="profile" element={<div className="py-20 text-center text-brand-gray uppercase tracking-widest text-sm">Profile Settings Coming Soon</div>} />
          <Route path="settings" element={<div className="py-20 text-center text-brand-gray uppercase tracking-widest text-sm">Account Settings Coming Soon</div>} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>
    </div>
  );
}

function ManageProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false });
      if (data) setProducts(data as Product[]);
      setLoading(false);
    }
    fetchProducts();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-display">Manage Products</h2>
        <button className="btn-primary py-2 px-4 text-[10px] flex items-center gap-2">
          <Plus size={14} /> Add Product
        </button>
      </div>

      <div className="bg-white border border-brand-muted overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-brand-muted border-b border-brand-muted">
            <tr>
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-brand-gray">Product</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-brand-gray">Category</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-brand-gray">Price</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-brand-gray">Stock</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-brand-gray text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-muted">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-brand-muted transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <img src={product.images[0]} alt="" className="w-10 h-10 object-cover rounded-sm" referrerPolicy="no-referrer" />
                    <span className="text-xs font-bold">{product.title}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-xs text-brand-gray uppercase tracking-widest">{product.category}</td>
                <td className="px-6 py-4 text-xs font-bold">{formatPrice(product.price)}</td>
                <td className="px-6 py-4 text-xs">{product.stock}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="p-2 hover:text-brand-gold transition-colors"><Edit size={16} /></button>
                    <button className="p-2 hover:text-state-error transition-colors"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {loading && <div className="p-12 text-center text-brand-gray uppercase tracking-widest text-[10px]">Loading products...</div>}
        {!loading && products.length === 0 && (
          <div className="p-12 text-center text-brand-gray uppercase tracking-widest text-[10px]">No products found.</div>
        )}
      </div>
    </div>
  );
}

function Overview({ user }: { user: any }) {
  return (
    <div className="space-y-12">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-display">Welcome back, {user.name}</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-brand-muted p-8 border border-brand-muted rounded-2xl">
          <p className="text-[10px] uppercase tracking-widest text-brand-gray font-bold mb-2">Total Orders</p>
          <p className="text-3xl font-display">0</p>
        </div>
        <div className="bg-brand-muted p-8 border border-brand-muted rounded-2xl">
          <p className="text-[10px] uppercase tracking-widest text-brand-gray font-bold mb-2">Wishlist Items</p>
          <p className="text-3xl font-display">0</p>
        </div>
        <div className="bg-brand-muted p-8 border border-brand-muted rounded-2xl">
          <p className="text-[10px] uppercase tracking-widest text-brand-gray font-bold mb-2">Account Status</p>
          <p className="text-3xl font-display text-state-success">Active</p>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-display">Recent Activity</h3>
        <div className="bg-white border border-brand-muted p-12 text-center">
          <p className="text-sm text-brand-gray italic">No recent activity to show.</p>
        </div>
      </div>
    </div>
  );
}
