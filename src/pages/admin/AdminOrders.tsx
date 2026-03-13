import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Order } from '@/types';
import { formatPrice } from '@/lib/utils';
import {
  Search, Filter, Eye, Package, CheckCircle, XCircle,
  Clock, Truck, AlertCircle, ChevronRight, X
} from 'lucide-react';

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [searchTerm, filterStatus, orders]);

  const fetchOrders = async () => {
    setLoading(true);
    const { data: ordersData } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (ordersData && ordersData.length > 0) {
      const orderIds = ordersData.map((order) => order.id);
      const { data: orderItemsData } = await supabase
        .from('order_items')
        .select('*')
        .in('order_id', orderIds);

      const itemsByOrderId = (orderItemsData || []).reduce<Record<string, any[]>>((acc, item) => {
        const key = item.order_id;
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(item);
        return acc;
      }, {});

      const hydratedOrders = ordersData.map((order) => ({
        ...order,
        items: itemsByOrderId[order.id] || [],
      }));

      setOrders(hydratedOrders as Order[]);
    } else if (ordersData) {
      setOrders([]);
    }
    setLoading(false);
  };

  const filterOrders = () => {
    let filtered = orders;

    if (searchTerm) {
      filtered = filtered.filter(o =>
        o.order_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (o.user_id || '').toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(o => o.order_status === filterStatus);
    }

    setFilteredOrders(filtered);
  };

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    const { error } = await supabase
      .from('orders')
      .update({ order_status: newStatus })
      .eq('id', orderId);

    if (!error) {
      setOrders(orders.map(o => o.id === orderId ? { ...o, order_status: newStatus as any } : o));
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder({ ...selectedOrder, order_status: newStatus as any });
      }
    }
  };

  const handlePaymentStatusUpdate = async (orderId: string, newStatus: string) => {
    const { error } = await supabase
      .from('orders')
      .update({ payment_status: newStatus })
      .eq('id', orderId);

    if (!error) {
      setOrders(orders.map(o => o.id === orderId ? { ...o, payment_status: newStatus as any } : o));
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder({ ...selectedOrder, payment_status: newStatus as any });
      }
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle size={18} className="text-green-600" />;
      case 'shipped':
        return <Truck size={18} className="text-blue-600" />;
      case 'cancelled':
        return <XCircle size={18} className="text-red-600" />;
      default:
        return <Clock size={18} className="text-yellow-600" />;
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

  const statusStats = {
    all: orders.length,
    processing: orders.filter(o => o.order_status === 'processing').length,
    shipped: orders.filter(o => o.order_status === 'shipped').length,
    delivered: orders.filter(o => o.order_status === 'delivered').length,
    cancelled: orders.filter(o => o.order_status === 'cancelled').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-bold text-gray-900">Orders</h1>
        <p className="text-sm text-gray-600 mt-1">Manage and fulfill customer orders</p>
      </div>

      {/* Status Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {[
          { label: 'All Orders', value: statusStats.all, key: 'all', color: 'from-gray-500 to-gray-600' },
          { label: 'Processing', value: statusStats.processing, key: 'processing', color: 'from-yellow-500 to-yellow-600' },
          { label: 'Shipped', value: statusStats.shipped, key: 'shipped', color: 'from-blue-500 to-blue-600' },
          { label: 'Delivered', value: statusStats.delivered, key: 'delivered', color: 'from-green-500 to-green-600' },
          { label: 'Cancelled', value: statusStats.cancelled, key: 'cancelled', color: 'from-red-500 to-red-600' },
        ].map((stat) => (
          <button
            key={stat.key}
            onClick={() => setFilterStatus(stat.key)}
            className={`p-4 rounded-xl border-2 transition-all ${
              filterStatus === stat.key
                ? 'border-brand-gold bg-brand-gold/5'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className={`text-2xl font-display font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
              {stat.value}
            </div>
            <div className="text-[10px] uppercase tracking-widest font-bold text-gray-600 mt-1">
              {stat.label}
            </div>
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by order number or user ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold transition-all"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
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
                  Items
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
                <th className="px-6 py-4 text-right text-[10px] uppercase tracking-widest font-bold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-gold mx-auto mb-4"></div>
                    <p className="text-sm text-gray-500 uppercase tracking-widest">Loading...</p>
                  </td>
                </tr>
              ) : filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
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
                        {order.items?.length || 0} items
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-gray-900">
                        {formatPrice(order.total_amount)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={order.order_status}
                        onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                        className="text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full border-2 border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-gold/20"
                      >
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={order.payment_status}
                        onChange={(e) => handlePaymentStatusUpdate(order.id, e.target.value)}
                        className={`text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full border-2 focus:outline-none focus:ring-2 focus:ring-brand-gold/20 ${
                          order.payment_status === 'paid' ? 'text-green-700 bg-green-50 border-green-200' :
                          order.payment_status === 'failed' ? 'text-red-700 bg-red-50 border-red-200' :
                          'text-yellow-700 bg-yellow-50 border-yellow-200'
                        }`}
                      >
                        <option value="pending">Pending</option>
                        <option value="paid">Paid</option>
                        <option value="failed">Failed</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end">
                        <button
                          onClick={() => {
                            setSelectedOrder(order);
                            setShowDetailModal(true);
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold text-brand-gold hover:bg-brand-gold hover:text-white border border-brand-gold rounded-lg transition-all"
                        >
                          <Eye size={16} />
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center">
                    <AlertCircle size={48} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-sm text-gray-500 uppercase tracking-widest font-bold">
                      No orders found
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {showDetailModal && selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          onClose={() => {
            setShowDetailModal(false);
            setSelectedOrder(null);
          }}
        />
      )}
    </div>
  );
}

function OrderDetailModal({ order, onClose }: { order: Order; onClose: () => void }) {
  const shippingAddress = (order.shipping_address && typeof order.shipping_address === 'object'
    ? order.shipping_address
    : {}) as Record<string, unknown>;

  const firstName = typeof shippingAddress.first_name === 'string' ? shippingAddress.first_name : '';
  const lastName = typeof shippingAddress.last_name === 'string' ? shippingAddress.last_name : '';
  const fullName = `${firstName} ${lastName}`.trim();
  const email = typeof shippingAddress.email === 'string' ? shippingAddress.email : '';
  const phone = typeof shippingAddress.phone === 'string' ? shippingAddress.phone : '';
  const address = typeof shippingAddress.address === 'string' ? shippingAddress.address : '';
  const city = typeof shippingAddress.city === 'string' ? shippingAddress.city : '';
  const province = typeof shippingAddress.province === 'string' ? shippingAddress.province : '';
  const postalCode = typeof shippingAddress.postal_code === 'string' ? shippingAddress.postal_code : '';
  const paymentMethod = typeof shippingAddress.payment_method === 'string' ? shippingAddress.payment_method : '';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-brand-gold to-amber-500">
          <div>
            <h2 className="text-xl font-display font-bold text-white">
              Order #{order.order_number}
            </h2>
            <p className="text-sm text-white/90 mt-0.5">
              {new Date(order.created_at).toLocaleString()}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)] space-y-6">
          {/* Status & Payment */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
              <p className="text-[10px] uppercase tracking-widest font-bold text-gray-600 mb-2">
                Order Status
              </p>
              <div className="flex items-center gap-2">
                {order.order_status === 'delivered' && <CheckCircle size={20} className="text-green-600" />}
                {order.order_status === 'shipped' && <Truck size={20} className="text-blue-600" />}
                {order.order_status === 'cancelled' && <XCircle size={20} className="text-red-600" />}
                {order.order_status === 'processing' && <Clock size={20} className="text-yellow-600" />}
                <span className="text-lg font-semibold capitalize">{order.order_status}</span>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
              <p className="text-[10px] uppercase tracking-widest font-bold text-gray-600 mb-2">
                Payment Status
              </p>
              <span className={`text-lg font-semibold capitalize ${
                order.payment_status === 'paid' ? 'text-green-600' :
                order.payment_status === 'failed' ? 'text-red-600' : 'text-yellow-600'
              }`}>
                {order.payment_status}
              </span>
            </div>
          </div>

          {/* Customer Info */}
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
            <p className="text-[10px] uppercase tracking-widest font-bold text-gray-600 mb-2">
              Customer Information
            </p>
            <div className="space-y-2 text-sm text-gray-900">
              <p>
                <span className="font-semibold">Name:</span> {fullName || 'N/A'}
              </p>
              <p>
                <span className="font-semibold">Email:</span> {email || 'N/A'}
              </p>
              <p>
                <span className="font-semibold">Phone:</span> {phone || 'N/A'}
              </p>
              <p>
                <span className="font-semibold">Address:</span> {address || 'N/A'}
              </p>
              <p>
                <span className="font-semibold">City/Province:</span> {city || 'N/A'}{city && province ? ', ' : ''}{province || ''}
              </p>
              <p>
                <span className="font-semibold">Postal Code:</span> {postalCode || 'N/A'}
              </p>
              <p>
                <span className="font-semibold">Payment Method:</span> {paymentMethod ? paymentMethod.toUpperCase() : 'N/A'}
              </p>
              <p>
                <span className="font-semibold">User ID:</span> {order.user_id || 'Guest Checkout'}
              </p>
            </div>
          </div>

          {/* Tracking */}
          {order.tracking_number && (
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
              <p className="text-[10px] uppercase tracking-widest font-bold text-blue-900 mb-2">
                Tracking Number
              </p>
              <p className="text-sm font-mono font-semibold text-blue-900">
                {order.tracking_number}
              </p>
            </div>
          )}

          {/* Order Items */}
          <div>
            <h3 className="text-lg font-display font-bold text-gray-900 mb-4">Order Items</h3>
            <div className="space-y-3">
              {(order.items || []).map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-lg"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-grow">
                    <h4 className="text-sm font-semibold text-gray-900">{item.title}</h4>
                    <p className="text-xs text-gray-600 mt-1">
                      Size: {item.size} • Color: {item.color} • Qty: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatPrice(item.price)} each
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-semibold text-gray-900">
                {formatPrice(order.total_amount - order.shipping_fee)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Shipping:</span>
              <span className="font-semibold text-gray-900">
                {formatPrice(order.shipping_fee)}
              </span>
            </div>
            <div className="flex justify-between text-lg font-display font-bold pt-2 border-t border-gray-200">
              <span>Total:</span>
              <span className="text-brand-gold">{formatPrice(order.total_amount)}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-4 px-6 py-4 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
