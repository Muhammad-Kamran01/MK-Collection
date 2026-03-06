import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Filter, ChevronDown, Grid, List, Plus, Minus, X, Check } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';

interface FilterSection {
  id: string;
  label: string;
  options: { label: string; value: string; color?: string }[];
}

const FILTER_SECTIONS: FilterSection[] = [
  {
    id: 'sort',
    label: 'Sort By',
    options: [
      { label: 'Featured', value: 'featured' },
      { label: 'Best Seller', value: 'best-seller' },
      { label: 'Price: Low To High', value: 'price-asc' },
      { label: 'Price: High To Low', value: 'price-desc' },
    ],
  },
  {
    id: 'size',
    label: 'Size',
    options: [
      { label: 'XS / US (0-4)', value: 'XS' },
      { label: 'S / US (4-6)', value: 'S' },
      { label: 'M / US (6-10)', value: 'M' },
      { label: 'L / US (10-14)', value: 'L' },
      { label: 'XL / US (12-16)', value: 'XL' },
    ],
  },
  {
    id: 'color',
    label: 'Color',
    options: [
      { label: 'Black', value: 'Black', color: '#000000' },
      { label: 'Red', value: 'Red', color: '#FF0000' },
      { label: 'Green', value: 'Green', color: '#7D8E7D' },
      { label: 'Yellow', value: 'Yellow', color: '#BDB76B' },
      { label: 'Dark Blue', value: 'Dark Blue', color: '#00008B' },
      { label: 'Purple', value: 'Purple', color: '#800080' },
      { label: 'Pink', value: 'Pink', color: '#FFC0CB' },
      { label: 'Light Blue', value: 'Light Blue', color: '#ADD8E6' },
      { label: 'Orange', value: 'Orange', color: '#FFA500' },
      { label: 'White', value: 'White', color: '#FFFFFF' },
    ],
  },
  {
    id: 'collection',
    label: 'Collection',
    options: [
      { label: 'In Stock', value: 'in-stock' },
      { label: 'Out Of Stock', value: 'out-of-stock' },
    ],
  },
  {
    id: 'fabric',
    label: 'Fabric',
    options: [
      { label: 'Cotton', value: 'Cotton' },
      { label: 'Linen', value: 'Linen' },
      { label: 'Wool', value: 'Wool' },
      { label: 'Silk', value: 'Silk' },
      { label: 'Cashmere', value: 'Cashmere' },
    ],
  },
];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedSections, setExpandedSections] = useState<string[]>(['sort', 'size']);
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  
  const category = searchParams.get('cat');

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      let query = supabase.from('products').select('*');
      
      if (category) {
        query = query.eq('category', category);
      }

      const { data, error } = await query;
      
      if (data) {
        let filtered = data as Product[];
        
        // Simple mock filtering for demo purposes
        if (activeFilters['size']?.length) {
          filtered = filtered.filter(p => p.sizes.some(s => activeFilters['size'].includes(s)));
        }
        if (activeFilters['color']?.length) {
          filtered = filtered.filter(p => p.colors.some(c => activeFilters['color'].includes(c)));
        }
        if (activeFilters['fabric']?.length) {
          filtered = filtered.filter(p => activeFilters['fabric'].includes(p.fabric));
        }
        
        // Sort logic
        if (activeFilters['sort']?.includes('price-asc')) {
          filtered.sort((a, b) => (a.discount_price || a.price) - (b.discount_price || b.price));
        } else if (activeFilters['sort']?.includes('price-desc')) {
          filtered.sort((a, b) => (b.discount_price || b.price) - (a.discount_price || a.price));
        }

        setProducts(filtered);
      } else {
        // Fallback to mock if no DB connection
        setProducts([
          {
            id: '1',
            title: 'Embroidered Lawn Suit - 3PC',
            slug: 'embroidered-lawn-suit-3pc',
            description: 'Beautifully crafted 3-piece embroidered lawn suit.',
            price: 12000,
            discount_price: 8500,
            category: 'Unstitched',
            stock: 50,
            sizes: ['XS', 'S', 'M', 'L'],
            colors: ['White', 'Blue'],
            fabric: 'Lawn',
            images: ['https://picsum.photos/seed/dress1/800/1200'],
            featured: true,
            trending: true,
            is_new: true,
            rating: 4.8,
            created_at: new Date().toISOString()
          },
          {
            id: '2',
            title: 'Silk Collection - Midnight Bloom',
            slug: 'silk-collection-midnight-bloom',
            description: 'Elegant silk dress for formal occasions.',
            price: 15000,
            category: 'Luxury',
            stock: 30,
            sizes: ['S', 'M', 'L'],
            colors: ['Black', 'Gold'],
            fabric: 'Silk',
            images: ['https://picsum.photos/seed/dress2/800/1200'],
            featured: true,
            trending: false,
            is_new: true,
            rating: 4.9,
            created_at: new Date().toISOString()
          }
        ]);
      }
      setLoading(false);
    }

    fetchProducts();
  }, [category, activeFilters]);

  const toggleSection = (id: string) => {
    setExpandedSections(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const toggleFilter = (sectionId: string, value: string) => {
    setActiveFilters(prev => {
      const current = prev[sectionId] || [];
      const next = current.includes(value) 
        ? current.filter(v => v !== value) 
        : [...current, value];
      return { ...prev, [sectionId]: next };
    });
  };

  const clearAllFilters = () => setActiveFilters({});

  const removeFilter = (sectionId: string, value: string) => {
    setActiveFilters(prev => ({
      ...prev,
      [sectionId]: (prev[sectionId] || []).filter(v => v !== value)
    }));
  };

  const allActiveFilters = Object.entries(activeFilters).flatMap(([sectionId, values]) => 
    (values as string[]).map(v => ({ sectionId, value: v, label: FILTER_SECTIONS.find(s => s.id === sectionId)?.options.find(o => o.value === v)?.label || v }))
  );

  return (
    <div className="pb-20">
      {/* Hero Section - Split Images */}
      <div className="relative h-[50vh] md:h-[70vh] overflow-hidden mb-12">
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white pointer-events-none">
          <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.2em] mb-4 pointer-events-auto">
            <Link to="/" className="hover:text-brand-gold transition-colors">Home</Link>
            <span className="opacity-50">/</span>
            <span className="font-bold">
              {category ? category.replace('-', ' ') : 'Shop All'}
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-display uppercase tracking-widest text-center">
            {category ? category.replace('-', ' ') : 'Shop All'}
          </h1>
        </div>

        <div className="grid grid-cols-2 h-full">
          <div className="relative">
            <img 
              src="https://picsum.photos/seed/shop-hero-1/1200/1600" 
              alt="Shop Collection 1"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>
          <div className="relative">
            <img 
              src="https://picsum.photos/seed/shop-hero-2/1200/1600" 
              alt="Shop Collection 2"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 flex-shrink-0 space-y-8">
            <div>
              <h2 className="text-2xl font-display mb-6">Filters</h2>
              
              {/* Active Filter Tags */}
              {allActiveFilters.length > 0 && (
                <div className="space-y-4 mb-8">
                  <div className="flex flex-wrap gap-2">
                    {allActiveFilters.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 bg-brand-muted px-3 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-bold">
                        {f.label}
                        <button onClick={() => removeFilter(f.sectionId, f.value)} className="hover:text-brand-dark">
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={clearAllFilters}
                      className="text-[10px] uppercase tracking-widest font-bold text-brand-gray hover:text-brand-dark transition-colors"
                    >
                      Clear All Filters
                    </button>
                    <div className="bg-brand-dark text-white px-4 py-2 text-[10px] uppercase tracking-widest font-bold rounded-full">
                      Applied Filters
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {FILTER_SECTIONS.map((section) => (
                  <div key={section.id} className="border border-brand-muted overflow-hidden rounded-xl mb-4">
                    <button 
                      onClick={() => toggleSection(section.id)}
                      className={cn(
                        "w-full flex items-center justify-between px-4 py-3 text-xs uppercase tracking-widest font-bold transition-colors",
                        expandedSections.includes(section.id) ? "bg-white text-brand-dark" : "bg-brand-dark text-white"
                      )}
                    >
                      {section.label}
                      {expandedSections.includes(section.id) ? <Minus size={14} /> : <Plus size={14} />}
                    </button>
                    
                    {expandedSections.includes(section.id) && (
                      <div className="p-4 space-y-3 bg-white">
                        {section.options.map((option) => (
                          <label key={option.value} className="flex items-center gap-3 cursor-pointer group">
                            <div className="relative flex items-center justify-center">
                              <input 
                                type="checkbox"
                                className="sr-only"
                                checked={(activeFilters[section.id] || []).includes(option.value)}
                                onChange={() => toggleFilter(section.id, option.value)}
                              />
                              <div className={cn(
                                "w-4 h-4 border transition-colors flex items-center justify-center rounded-sm",
                                (activeFilters[section.id] || []).includes(option.value) 
                                  ? "bg-brand-dark border-brand-dark text-white" 
                                  : "border-brand-muted group-hover:border-brand-dark"
                              )}>
                                {(activeFilters[section.id] || []).includes(option.value) && (
                                  <Check size={12} strokeWidth={3} />
                                )}
                              </div>
                            </div>
                            {option.color && (
                              <div className="w-3 h-3 rounded-full border border-gray-100" style={{ backgroundColor: option.color }} />
                            )}
                            <span className="text-[11px] uppercase tracking-widest text-brand-gray group-hover:text-brand-dark transition-colors">
                              {option.label}
                            </span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Grid Area */}
          <div className="flex-grow">
            {/* Toolbar */}
            <div className="flex flex-col md:flex-row justify-between items-center border-y border-brand-muted py-4 mb-10 gap-4">
              <div className="flex items-center gap-8">
                <span className="text-[10px] uppercase tracking-widest text-brand-gray">Showing {products.length} Items</span>
              </div>
              
              <div className="flex items-center gap-8">
                <button className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold hover:text-brand-gold transition-colors">
                  Sort By <ChevronDown size={14} />
                </button>
              </div>
            </div>

            {/* Product Grid */}
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse space-y-4">
                    <div className="aspect-[2/3] bg-brand-muted rounded-sm" />
                    <div className="h-4 bg-brand-muted w-2/3 rounded-sm" />
                    <div className="h-4 bg-brand-muted w-1/2 rounded-sm" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {products.length === 0 && !loading && (
              <div className="text-center py-20">
                <p className="text-brand-gray uppercase tracking-widest text-sm">No products found with the selected filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
