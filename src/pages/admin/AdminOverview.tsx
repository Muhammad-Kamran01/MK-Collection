import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { formatPrice } from '@/lib/utils';
import {
  ShoppingBag, Users, Package, DollarSign, TrendingUp,
  TrendingDown, Clock, CheckCircle, XCircle, AlertCircle
} from 'lucide-react';

interface Stats {
  totalRevenue: number;
  totalOrders: number;
  totalUsers: number;
  totalProducts: number;
  revenueChange: number;
  ordersChange: number;
  usersChange: number;
  productsChange: number;
}

export default function AdminOverview() {
  const [stats, setStats] = useState<Stats>({
    totalRevenue: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalProducts: 0,
    revenueChange: 0,
    ordersChange: 0,
    usersChange: 0,
    productsChange: 0,
  });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);

    // Fetch orders
    const { data: orders } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    // Fetch users
    const { data: users } = await supabase
      .from('users')
      .select('id, created_at');

    // Fetch products
    const { data: products } = await supabase
      .from('products')
      .select('id, created_at');

    // Calculate stats
    const totalRevenue = orders?.reduce((sum, order) => sum + (order.total_amount || 0), 0) || 0;
    const totalOrders = orders?.length || 0;
    const totalUsers = users?.length || 0;
    const totalProducts = products?.length || 0;

    // Calculate changes (mock data for now)
    setStats({
      totalRevenue,
      totalOrders,
      totalUsers,
      totalProducts,
      revenueChange: 12.5,
      ordersChange: 8.3,
      usersChange: 15.2,
      productsChange: 5.1,
    });

    setRecentOrders(orders?.slice(0, 5) || []);
    setLoading(false);
  };

  const statCards = [
    {
      title: 'Total Revenue',
      value: formatPrice(stats.totalRevenue),
      change: stats.revenueChange,
      icon: DollarSign,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders.toString(),
      change: stats.ordersChange,
      icon: ShoppingBag,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Total Users',
      value: stats.totalUsers.toString(),
      change: stats.usersChange,
      icon: Users,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      title: 'Total Products',
      value: stats.totalProducts.toString(),
      change: stats.productsChange,
      icon: Package,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600'
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle size={16} className="text-green-600" />;
      case 'shipped':
        return <Clock size={16} className="text-blue-600" />;
      case 'cancelled':
        return <XCircle size={16} className="text-red-600" />;
      default:
        return <AlertCircle size={16} className="text-yellow-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const statusColors: Record<string, string> = {
      processing: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      shipped: 'bg-blue-100 text-blue-800 border-blue-200',
      delivered: 'bg-green-100 text-green-800 border-green-200',
      cancelled: 'bg-red-100 text-red-800 border-red-200',
    };

    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold border ${statusColors[status] || statusColors.processing}`}>
        {getStatusIcon(status)}
        {status}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-gold mx-auto mb-4"></div>
          <p className="text-sm text-gray-500 uppercase tracking-widest">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">Dashboard Overview</h1>
        <p className="text-sm text-gray-600">Welcome back! Here's what's happening with your store today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <div
            key={stat.title}
            className="relative bg-white rounded-2xl shadow-sm border border-gray-200 p-6 overflow-hidden group hover:shadow-lg transition-all duration-300"
          >
            {/* Background Icon */}
            <div className={`absolute -right-4 -top-4 w-24 h-24 ${stat.bgColor} rounded-full opacity-20 group-hover:scale-110 transition-transform duration-300`}></div>
            
            {/* Icon */}
            <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.color} mb-4 shadow-md`}>
              <stat.icon size={24} className="text-white" strokeWidth={2} />
            </div>

            {/* Content */}
            <div className="relative">
              <p className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-1">
                {stat.title}
              </p>
              <div className="flex items-end justify-between">
                <h3 className="text-3xl font-display font-bold text-gray-900">
                  {stat.value}
                </h3>
                <div className={`flex items-center gap-1 text-xs font-semibold ${stat.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                  <span>{Math.abs(stat.change)}%</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
        <div className="px-6 py-5 border-b border-gray-200">
          <h2 className="text-xl font-display font-bold text-gray-900">Recent Orders</h2>
          <p className="text-sm text-gray-600 mt-1">Latest orders from your store</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-[10px] uppercase tracking-widest font-bold text-gray-600">
                  Order ID
                </th>
                <th className="px-6 py-4 text-left text-[10px] uppercase tracking-widest font-bold text-gray-600">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-[10px] uppercase tracking-widest font-bold text-gray-600">
                  Customer
                </th>
                <th className="px-6 py-4 text-left text-[10px] uppercase tracking-widest font-bold text-gray-600">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-[10px] uppercase tracking-widest font-bold text-gray-600">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-[10px] uppercase tracking-widest font-bold text-gray-600">
                  Payment
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentOrders.length > 0 ? (
                recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-gray-900">
                        #{order.order_number}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">
                        {new Date(order.created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-900">
                        {order.user_id ? `User #${order.user_id.slice(0, 8)}` : 'Guest Checkout'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-gray-900">
                        {formatPrice(order.total_amount)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(order.order_status)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs uppercase tracking-wider font-bold ${
                        order.payment_status === 'paid' ? 'text-green-600' : 
                        order.payment_status === 'failed' ? 'text-red-600' : 'text-yellow-600'
                      }`}>
                        {order.payment_status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <ShoppingBag size={48} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-sm text-gray-500 uppercase tracking-widest font-bold">
                      No orders yet
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-brand-gold to-amber-500 rounded-2xl shadow-lg p-6 text-white">
          <Package size={32} className="mb-4" />
          <h3 className="text-xl font-display font-bold mb-2">Add New Product</h3>
          <p className="text-sm opacity-90 mb-4">Expand your catalog with new items</p>
          <button className="bg-white text-brand-gold px-4 py-2 rounded-lg text-sm font-semibold hover:shadow-md transition-all">
            Add Product
          </button>
        </div>
        
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white">
          <ShoppingBag size={32} className="mb-4" />
          <h3 className="text-xl font-display font-bold mb-2">Manage Orders</h3>
          <p className="text-sm opacity-90 mb-4">Process and fulfill customer orders</p>
          <button className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-semibold hover:shadow-md transition-all">
            View Orders
          </button>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
          <Users size={32} className="mb-4" />
          <h3 className="text-xl font-display font-bold mb-2">User Management</h3>
          <p className="text-sm opacity-90 mb-4">Manage customers and staff</p>
          <button className="bg-white text-purple-600 px-4 py-2 rounded-lg text-sm font-semibold hover:shadow-md transition-all">
            View Users
          </button>
        </div>
      </div>
    </div>
  );
}
