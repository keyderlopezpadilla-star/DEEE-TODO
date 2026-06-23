'use client';

import { useState, useMemo } from 'react';
import { Search, Grid3x3, List } from 'lucide-react';
import ProductCard from '../ui/ProductCard';
import ProductFilters, { ProductFilterState } from './ProductFilters';
import Input from '../ui/Input';
import { Product } from '@/lib/types';

interface ProductCatalogProps {
  products: Product[];
  userDiscountPercentage?: number;
}

export default function ProductCatalog({ products, userDiscountPercentage = 0 }: ProductCatalogProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<ProductFilterState>({
    categories: [],
    priceRange: null,
    sortBy: 'featured',
    searchQuery: '',
  });

  // Extract unique categories from products
  const categories = useMemo(() => {
    const categoryMap = new Map<string, number>();
    products.forEach(product => {
      if (product.category) {
        categoryMap.set(
          product.category, 
          (categoryMap.get(product.category) || 0) + 1
        );
      }
    });
    return Array.from(categoryMap.entries()).map(([label, count]) => ({
      label,
      value: label,
      count,
    }));
  }, [products]);

  const priceRanges = [
    { label: 'Menos de 10€', value: '0-10', count: 0 },
    { label: '10€ - 25€', value: '10-25', count: 0 },
    { label: '25€ - 50€', value: '25-50', count: 0 },
    { label: '50€ - 100€', value: '50-100', count: 0 },
    { label: 'Más de 100€', value: '100+', count: 0 },
  ];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product =>
        product.title.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query) ||
        product.category?.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (filters.categories.length > 0) {
      result = result.filter(product =>
        product.category && filters.categories.includes(product.category)
      );
    }

    // Price range filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(v => 
        v === '+' ? Infinity : parseFloat(v)
      );
      result = result.filter(product => {
        const price = product.price;
        return price >= min && (max === Infinity || price <= max);
      });
    }

    // Sorting
    switch (filters.sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        // Assuming products are already sorted by newest
        break;
      case 'popular':
        // Would need view count or sales data
        break;
      case 'featured':
      default:
        // Keep original order
        break;
    }

    return result;
  }, [products, searchQuery, filters]);

  const handleFilterChange = (newFilters: ProductFilterState) => {
    setFilters(newFilters);
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24">
              <ProductFilters
                categories={categories}
                priceRanges={priceRanges}
                onFilterChange={handleFilterChange}
                isMobile={false}
              />
            </div>
          </div>

          {/* Product Grid */}
          <div className="lg:col-span-3">
            {/* Search and View Controls */}
            <div className="mb-8 space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-lg bg-dark-lighter border border-dark-accent text-foreground placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:border-transparent"
                />
              </div>

              {/* Results Count and View Toggle */}
              <div className="flex items-center justify-between">
                <p className="text-gray-400">
                  <span className="text-neon-cyan font-semibold">{filteredProducts.length}</span> productos encontrados
                </p>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'grid' 
                        ? 'bg-neon-cyan text-dark' 
                        : 'glass hover:bg-dark-lighter'
                    }`}
                    aria-label="Vista de cuadrícula"
                  >
                    <Grid3x3 size={20} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'list' 
                        ? 'bg-neon-cyan text-dark' 
                        : 'glass hover:bg-dark-lighter'
                    }`}
                    aria-label="Vista de lista"
                  >
                    <List size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            {filteredProducts.length > 0 ? (
              <div className={
                viewMode === 'grid' 
                  ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'
                  : 'flex flex-col gap-6'
              }>
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    discountPercentage={userDiscountPercentage}
                  />
                ))}
              </div>
            ) : (
              <div className="glass rounded-lg p-12 text-center">
                <p className="text-xl text-gray-400 mb-4">
                  No se encontraron productos
                </p>
                <p className="text-gray-500">
                  Intenta ajustar los filtros o la búsqueda
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
