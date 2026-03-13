import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import {
  Plus, Edit, Trash2, Search, Filter, Eye, X, Save,
  Upload, Image as ImageIcon, AlertCircle
} from 'lucide-react';

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [searchTerm, filterCategory, products]);

  const fetchProducts = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) {
      setProducts(data as Product[]);
    }
    setLoading(false);
  };

  const fetchCategories = async () => {
    const { data } = await supabase
      .from('products')
      .select('category');
    
    if (data) {
      const uniqueCategories = Array.from(new Set(data.map(p => p.category)));
      setCategories(uniqueCategories);
    }
  };

  const filterProducts = () => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterCategory !== 'all') {
      filtered = filtered.filter(p => p.category === filterCategory);
    }

    setFilteredProducts(filtered);
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (!error) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900">Products</h1>
          <p className="text-sm text-gray-600 mt-1">Manage your product catalog</p>
        </div>
        <button
          onClick={() => {
            setEditingProduct(null);
            setShowAddModal(true);
          }}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-gold to-amber-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
        >
          <Plus size={20} />
          Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold transition-all"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold transition-all appearance-none"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-[10px] uppercase tracking-widest font-bold text-gray-600">
                  Product
                </th>
                <th className="px-6 py-4 text-left text-[10px] uppercase tracking-widest font-bold text-gray-600">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-[10px] uppercase tracking-widest font-bold text-gray-600">
                  Price
                </th>
                <th className="px-6 py-4 text-left text-[10px] uppercase tracking-widest font-bold text-gray-600">
                  Stock
                </th>
                <th className="px-6 py-4 text-left text-[10px] uppercase tracking-widest font-bold text-gray-600">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-[10px] uppercase tracking-widest font-bold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-gold mx-auto mb-4"></div>
                    <p className="text-sm text-gray-500 uppercase tracking-widest">Loading...</p>
                  </td>
                </tr>
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={product.images[0]}
                          alt={product.title}
                          className="w-14 h-14 object-cover rounded-lg border border-gray-200"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <p className="text-sm font-semibold text-gray-900 line-clamp-1">
                            {product.title}
                          </p>
                          <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                            {product.description.substring(0, 50)}...
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold bg-gray-100 text-gray-700 border border-gray-200">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {formatPrice(product.discount_price || product.price)}
                        </p>
                        {product.discount_price && (
                          <p className="text-xs text-gray-500 line-through">
                            {formatPrice(product.price)}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-sm font-semibold ${
                        product.stock > 10 ? 'text-green-600' :
                        product.stock > 0 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold border ${
                        product.stock > 0 
                          ? 'bg-green-100 text-green-800 border-green-200'
                          : 'bg-red-100 text-red-800 border-red-200'
                      }`}>
                        {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setEditingProduct(product);
                            setShowAddModal(true);
                          }}
                          className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <AlertCircle size={48} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-sm text-gray-500 uppercase tracking-widest font-bold">
                      No products found
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <ProductModal
          product={editingProduct}
          onClose={() => {
            setShowAddModal(false);
            setEditingProduct(null);
          }}
          onSuccess={() => {
            setShowAddModal(false);
            setEditingProduct(null);
            fetchProducts();
          }}
        />
      )}
    </div>
  );
}

function ProductModal({ 
  product, 
  onClose, 
  onSuccess 
}: { 
  product: Product | null;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [formData, setFormData] = useState({
    title: product?.title || '',
    description: product?.description || '',
    fitting_details: product?.fitting_details || '',
    fabric_and_care: product?.fabric_and_care || '',
    product_details: product?.product_details || '',
    shipping_and_return: product?.shipping_and_return || '',
    material_title: product?.material_title || '',
    material_description: product?.material_description || '',
    material_tags: product?.material_tags?.join(', ') || '',
    size_chart: product?.size_chart || '',
    rating: product?.rating ?? 4.5,
    price: product?.price || 0,
    discount_price: product?.discount_price || 0,
    category: product?.category || '',
    subcategory: product?.subcategory || '',
    stock: product?.stock || 0,
    sizes: product?.sizes?.join(', ') || '',
    colors: product?.colors?.join(', ') || '',
    fabric: product?.fabric || '',
    images: product?.images?.join(', ') || '',
    featured: product?.featured || false,
    trending: product?.trending || false,
    is_new: product?.is_new || false,
  });
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const parsedRating = Number(formData.rating);
    const normalizedRating = Number.isFinite(parsedRating)
      ? Math.max(0, Math.min(5, parsedRating))
      : 4.5;

    const existingImageUrls = formData.images
      .split(',')
      .map(i => i.trim())
      .filter(Boolean);

    const uploadedImageUrls: string[] = [];

    for (const file of selectedFiles) {
      const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
      const safeTitle = formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const filePath = `${safeTitle}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('products')
        .upload(filePath, file, { upsert: false });

      if (uploadError) {
        alert(`Failed to upload image: ${file.name}. ${uploadError.message}`);
        setSaving(false);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from('products')
        .getPublicUrl(filePath);

      if (publicUrlData?.publicUrl) {
        uploadedImageUrls.push(publicUrlData.publicUrl);
      }
    }

    const finalImages = [...existingImageUrls, ...uploadedImageUrls];

    if (finalImages.length === 0) {
      alert('Please upload at least one product image.');
      setSaving(false);
      return;
    }

    const productData = {
      ...formData,
      slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      sizes: formData.sizes.split(',').map(s => s.trim()).filter(Boolean),
      colors: formData.colors.split(',').map(c => c.trim()).filter(Boolean),
      images: finalImages,
      material_tags: formData.material_tags.split(',').map(tag => tag.trim()).filter(Boolean),
      rating: normalizedRating,
    };

    if (product) {
      // Update
      const { error } = await supabase
        .from('products')
        .update(productData)
        .eq('id', product.id);

      if (!error) {
        onSuccess();
      }
    } else {
      // Insert
      const { error } = await supabase
        .from('products')
        .insert([productData]);

      if (!error) {
        onSuccess();
      }
    }

    setSaving(false);
  };

  const existingImages = formData.images
    .split(',')
    .map(i => i.trim())
    .filter(Boolean);

  const removeExistingImage = (url: string) => {
    const updatedImages = existingImages.filter((img) => img !== url);
    setFormData({ ...formData, images: updatedImages.join(', ') });
  };

  const removeSelectedFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-brand-gold to-amber-500">
          <h2 className="text-xl font-display font-bold text-white">
            {product ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Product Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold"
                placeholder="Enter product title"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold"
                placeholder="Enter product description"
              />
            </div>

            {/* Product Detail Sections (Left Side) */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Fitting Details
              </label>
              <textarea
                value={formData.fitting_details}
                onChange={(e) => setFormData({ ...formData, fitting_details: e.target.value })}
                rows={3}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold"
                placeholder="Enter fitting details shown in product page accordion"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Fabric & Care
              </label>
              <textarea
                value={formData.fabric_and_care}
                onChange={(e) => setFormData({ ...formData, fabric_and_care: e.target.value })}
                rows={3}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold"
                placeholder="Enter fabric and care details"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Product Details (In Detail)
              </label>
              <textarea
                value={formData.product_details}
                onChange={(e) => setFormData({ ...formData, product_details: e.target.value })}
                rows={4}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold"
                placeholder="Enter detailed product information"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Shipping and Return
              </label>
              <textarea
                value={formData.shipping_and_return}
                onChange={(e) => setFormData({ ...formData, shipping_and_return: e.target.value })}
                rows={3}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold"
                placeholder="Enter shipping and return information"
              />
            </div>

            {/* Right Side Material Box */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Material Box Title (Right Side)
              </label>
              <input
                type="text"
                value={formData.material_title}
                onChange={(e) => setFormData({ ...formData, material_title: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold"
                placeholder="e.g., Silk"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Material Box Description (Right Side)
              </label>
              <textarea
                value={formData.material_description}
                onChange={(e) => setFormData({ ...formData, material_description: e.target.value })}
                rows={4}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold"
                placeholder="Enter material description for right-side info box"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Material Tags (comma-separated)
              </label>
              <input
                type="text"
                value={formData.material_tags}
                onChange={(e) => setFormData({ ...formData, material_tags: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold"
                placeholder="e.g., Quick Dry, Chemical Free, Machine Washable"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Size Chart (one row per line)
              </label>
              <textarea
                value={formData.size_chart}
                onChange={(e) => setFormData({ ...formData, size_chart: e.target.value })}
                rows={5}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold"
                placeholder={"Format: Size|Chest|Waist|Length\nXS|32 - 33|24 - 25|38\nS|34 - 35|26 - 27|39"}
              />
              <p className="mt-2 text-xs text-gray-500">
                Use <span className="font-mono">|</span> between values. Example row: <span className="font-mono">M|36 - 37|28 - 29|40</span>
              </p>
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Price (PKR) *
              </label>
              <input
                type="number"
                required
                min="0"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold"
                placeholder="0"
              />
            </div>

            {/* Discount Price */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Discount Price (PKR)
              </label>
              <input
                type="number"
                min="0"
                value={formData.discount_price}
                onChange={(e) => setFormData({ ...formData, discount_price: Number(e.target.value) })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold"
                placeholder="0"
              />
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Rating (0 to 5)
              </label>
              <input
                type="number"
                min="0"
                max="5"
                step="0.1"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold"
                placeholder="4.5"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category *
              </label>
              <input
                type="text"
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold"
                placeholder="e.g., Suits, Shirts"
              />
            </div>

            {/* Subcategory */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Subcategory
              </label>
              <input
                type="text"
                value={formData.subcategory}
                onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold"
                placeholder="e.g., Summer Collection"
              />
            </div>

            {/* Stock */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Stock Quantity *
              </label>
              <input
                type="number"
                required
                min="0"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold"
                placeholder="0"
              />
            </div>

            {/* Fabric */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Fabric
              </label>
              <input
                type="text"
                value={formData.fabric}
                onChange={(e) => setFormData({ ...formData, fabric: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold"
                placeholder="e.g., Cotton, Silk"
              />
            </div>

            {/* Sizes */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Sizes (comma-separated)
              </label>
              <input
                type="text"
                value={formData.sizes}
                onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold"
                placeholder="e.g., S, M, L, XL"
              />
            </div>

            {/* Colors */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Colors (comma-separated)
              </label>
              <input
                type="text"
                value={formData.colors}
                onChange={(e) => setFormData({ ...formData, colors: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold"
                placeholder="e.g., Red, Blue, Green"
              />
            </div>

            {/* Images */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Product Images *
              </label>
              <label className="w-full flex items-center justify-center gap-2 px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-brand-gold hover:bg-brand-gold/5 transition-colors">
                <Upload size={18} className="text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Click to upload from laptop</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    if (files.length > 0) {
                      setSelectedFiles((prev) => [...prev, ...files]);
                    }
                  }}
                />
              </label>
              <p className="mt-2 text-xs text-gray-500">
                You can upload multiple images. They will be stored in your Supabase products bucket.
              </p>

              {existingImages.length > 0 && (
                <div className="mt-4">
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Existing Images</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {existingImages.map((url) => (
                      <div key={url} className="relative border border-gray-200 rounded-lg overflow-hidden">
                        <img src={url} alt="Existing" className="w-full h-24 object-cover" referrerPolicy="no-referrer" />
                        <button
                          type="button"
                          onClick={() => removeExistingImage(url)}
                          className="absolute top-1 right-1 p-1 bg-black/70 text-white rounded-full hover:bg-black"
                          title="Remove image"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedFiles.length > 0 && (
                <div className="mt-4">
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">New Uploads</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {selectedFiles.map((file, index) => (
                      <div key={`${file.name}-${index}`} className="relative border border-gray-200 rounded-lg overflow-hidden">
                        <img src={URL.createObjectURL(file)} alt={file.name} className="w-full h-24 object-cover" />
                        <button
                          type="button"
                          onClick={() => removeSelectedFile(index)}
                          className="absolute top-1 right-1 p-1 bg-black/70 text-white rounded-full hover:bg-black"
                          title="Remove image"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Flags */}
            <div className="md:col-span-2 flex flex-wrap gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 text-brand-gold border-gray-300 rounded focus:ring-brand-gold"
                />
                <span className="text-sm font-semibold text-gray-700">Featured</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.trending}
                  onChange={(e) => setFormData({ ...formData, trending: e.target.checked })}
                  className="w-4 h-4 text-brand-gold border-gray-300 rounded focus:ring-brand-gold"
                />
                <span className="text-sm font-semibold text-gray-700">Trending</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.is_new}
                  onChange={(e) => setFormData({ ...formData, is_new: e.target.checked })}
                  className="w-4 h-4 text-brand-gold border-gray-300 rounded focus:ring-brand-gold"
                />
                <span className="text-sm font-semibold text-gray-700">New Arrival</span>
              </label>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end gap-4 px-6 py-4 border-t border-gray-200 bg-gray-50">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="px-6 py-2.5 bg-gradient-to-r from-brand-gold to-amber-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50"
          >
            {saving ? 'Saving...' : product ? 'Update Product' : 'Add Product'}
          </button>
        </div>
      </div>
    </div>
  );
}
