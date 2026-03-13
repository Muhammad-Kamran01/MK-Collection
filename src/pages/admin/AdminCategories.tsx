import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Category } from '@/types';
import { Plus, Edit, Trash2, X, Save, FolderOpen, AlertCircle } from 'lucide-react';

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('categories')
      .select('*')
      .order('name', { ascending: true });

    if (data) {
      setCategories(data as Category[]);
    }
    setLoading(false);
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return;

    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id);

    if (!error) {
      setCategories(categories.filter(c => c.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900">Categories</h1>
          <p className="text-sm text-gray-600 mt-1">Manage product categories</p>
        </div>
        <button
          onClick={() => {
            setEditingCategory(null);
            setShowAddModal(true);
          }}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-gold to-amber-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
        >
          <Plus size={20} />
          Add Category
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-gold mx-auto mb-4"></div>
              <p className="text-sm text-gray-500 uppercase tracking-widest">Loading...</p>
            </div>
          </div>
        ) : categories.length > 0 ? (
          categories.map((category) => (
            <div
              key={category.id}
              className="group relative bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all"
            >
              {/* Category Image */}
              <div className="aspect-[16/9] overflow-hidden bg-gray-100">
                <img
                  src={category.banner_image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Category Info */}
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-display font-bold text-gray-900 mb-1">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Slug: <span className="font-mono">{category.slug}</span>
                    </p>
                  </div>
                  <FolderOpen size={24} className="text-brand-gold" />
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 mt-4">
                  <button
                    onClick={() => {
                      setEditingCategory(category);
                      setShowAddModal(true);
                    }}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-semibold hover:bg-blue-100 transition-colors"
                  >
                    <Edit size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg font-semibold hover:bg-red-100 transition-colors"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full flex items-center justify-center py-20">
            <div className="text-center">
              <AlertCircle size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-sm text-gray-500 uppercase tracking-widest font-bold">
                No categories found
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <CategoryModal
          category={editingCategory}
          onClose={() => {
            setShowAddModal(false);
            setEditingCategory(null);
          }}
          onSuccess={() => {
            setShowAddModal(false);
            setEditingCategory(null);
            fetchCategories();
          }}
        />
      )}
    </div>
  );
}

function CategoryModal({
  category,
  onClose,
  onSuccess
}: {
  category: Category | null;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [formData, setFormData] = useState({
    name: category?.name || '',
    banner_image: category?.banner_image || '',
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const categoryData = {
      ...formData,
      slug: formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    };

    if (category) {
      // Update
      const { error } = await supabase
        .from('categories')
        .update(categoryData)
        .eq('id', category.id);

      if (!error) {
        onSuccess();
      }
    } else {
      // Insert
      const { error } = await supabase
        .from('categories')
        .insert([categoryData]);

      if (!error) {
        onSuccess();
      }
    }

    setSaving(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-brand-gold to-amber-500">
          <h2 className="text-xl font-display font-bold text-white">
            {category ? 'Edit Category' : 'Add New Category'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold"
              placeholder="e.g., Suits, Shirts, Accessories"
            />
          </div>

          {/* Banner Image */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Banner Image URL *
            </label>
            <input
              type="url"
              required
              value={formData.banner_image}
              onChange={(e) => setFormData({ ...formData, banner_image: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold"
              placeholder="https://example.com/image.jpg"
            />
            {formData.banner_image && (
              <div className="mt-3 rounded-lg overflow-hidden border border-gray-200">
                <img
                  src={formData.banner_image}
                  alt="Preview"
                  className="w-full h-32 object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}
          </div>

          {/* Slug Preview */}
          {formData.name && (
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-[10px] uppercase tracking-widest font-bold text-gray-600 mb-1">
                Generated Slug
              </p>
              <p className="text-sm font-mono text-gray-900">
                {formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
              </p>
            </div>
          )}
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
            {saving ? 'Saving...' : category ? 'Update Category' : 'Add Category'}
          </button>
        </div>
      </div>
    </div>
  );
}
