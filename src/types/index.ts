export type UserRole = 'customer' | 'staff' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  address?: string;
  city?: string;
  province?: string;
  postal_code?: string;
  created_at: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  fitting_details?: string;
  fabric_and_care?: string;
  product_details?: string;
  shipping_and_return?: string;
  material_title?: string;
  material_description?: string;
  material_tags?: string[];
  size_chart?: string;
  price: number;
  discount_price?: number;
  category: string;
  subcategory?: string;
  stock: number;
  sizes: string[];
  colors: string[];
  fabric: string;
  images: string[];
  featured: boolean;
  trending: boolean;
  is_new: boolean;
  rating: number;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  banner_image: string;
}

export interface Order {
  id: string;
  user_id?: string | null;
  order_number: string;
  items?: OrderItem[];
  total_amount: number;
  shipping_fee: number;
  payment_status: 'pending' | 'paid' | 'failed';
  order_status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  tracking_number?: string;
  shipping_address?: Record<string, unknown> | null;
  created_at: string;
}

export interface OrderItem {
  product_id: string;
  title: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
  image: string;
}

export interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  size: string;
  color: string;
  product: Product;
}

export interface Review {
  id: string;
  product_id: string;
  user_id: string;
  rating: number;
  comment: string;
  approved: boolean;
  created_at: string;
  user?: { name: string };
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject?: string;
  phone?: string | null;
  status?: ContactMessageStatus | null;
  message: string;
  deleted_at?: string | null;
  created_at: string;
}

export type ContactMessageStatus = 'viewed' | 'in_progress' | 'responded' | 'completed';
