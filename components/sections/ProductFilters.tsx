'use client';

import { useState } from 'react';
import { Filter, X, ChevronDown } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

interface ProductFiltersProps {
  categories: FilterOption[];
  priceRanges: FilterOption[];
  onFilterChange: (filters: ProductFilterState) => void;
  isMobile?: boolean;
}

export interface ProductFilterState {
  categories: string[];
  priceRange: string | null;
  sortBy: string;
  searchQuery: string;
}

export default function ProductFilters({ 
  categories, 
  priceRanges, 
  onFilterChange,
  isMobile = false 
}: ProductFiltersProps) {
  const [isOpen, setIsOpen] = useState(!isMobile);
  const [filters, setFilters] = useState<ProductFilterState>({
    categories: [],
    priceRange: null,
    sortBy: 'featured',
    searchQuery: '',
  });

  const handleCategoryToggle = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    
    const newFilters = { ...filters, categories: newCategories };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handlePriceRangeChange = (range: string) => {
    const newFilters = { 
      ...filters, 
      priceRange: filters.priceRange === range ? null : range 
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSortChange = (sortBy: string) => {
    const newFilters = { ...filters, sortBy };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const newFilters: ProductFilterState = {
      categories: [],
      priceRange: null,
      sortBy: 'featured',
      searchQuery: '',
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const hasActiveFilters = filters.categories.length > 0 || filters.priceRange !== null;

  return (
    <div className="space-y-4">
      {/* Mobile Toggle */}
      {isMobile && (
        <Button
          variant="outline"
          className="w-full"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Filter size={20} className="mr-2" />
          Filtros
          <ChevronDown 
            size={20} 
            className={`ml-auto transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </Button>
      )}

      {/* Filters Panel */}
      <div className={`space-y-4 ${isMobile && !isOpen ? 'hidden' : 'block'}`}>
        {/* Active Filters / Clear */}
        {hasActiveFilters && (
          <Card>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Filtros activos</span>
              <button
                onClick={clearFilters}
                className="text-xs text-neon-pink hover:text-neon-cyan transition-colors flex items-center"
              >
                <X size={14} className="mr-1" />
                Limpiar todo
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => handleCategoryToggle(cat)}
                  className="glass rounded-full px-3 py-1 text-xs flex items-center space-x-1 hover:bg-neon-pink/20 transition-colors"
                >
                  <span>{cat}</span>
                  <X size={12} />
                </button>
              ))}
              {filters.priceRange && (
                <button
                  onClick={() => handlePriceRangeChange(filters.priceRange!)}
                  className="glass rounded-full px-3 py-1 text-xs flex items-center space-x-1 hover:bg-neon-pink/20 transition-colors"
                >
                  <span>{priceRanges.find(p => p.value === filters.priceRange)?.label}</span>
                  <X size={12} />
                </button>
              )}
            </div>
          </Card>
        )}

        {/* Sort By */}
        <Card>
          <h3 className="font-semibold mb-4 text-neon-cyan">Ordenar por</h3>
          <div className="space-y-2">
            {[
              { label: 'Destacados', value: 'featured' },
              { label: 'Precio: Menor a Mayor', value: 'price-asc' },
              { label: 'Precio: Mayor a Menor', value: 'price-desc' },
              { label: 'Más recientes', value: 'newest' },
              { label: 'Más populares', value: 'popular' },
            ].map(option => (
              <label
                key={option.value}
                className="flex items-center space-x-2 cursor-pointer group"
              >
                <input
                  type="radio"
                  name="sort"
                  value={option.value}
                  checked={filters.sortBy === option.value}
                  onChange={() => handleSortChange(option.value)}
                  className="w-4 h-4 text-neon-pink focus:ring-neon-cyan"
                />
                <span className="text-sm group-hover:text-neon-cyan transition-colors">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </Card>

        {/* Categories */}
        <Card>
          <h3 className="font-semibold mb-4 text-neon-cyan">Categorías</h3>
          <div className="space-y-2">
            {categories.map(category => (
              <label
                key={category.value}
                className="flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(category.value)}
                    onChange={() => handleCategoryToggle(category.value)}
                    className="w-4 h-4 text-neon-pink focus:ring-neon-cyan rounded"
                  />
                  <span className="text-sm group-hover:text-neon-cyan transition-colors">
                    {category.label}
                  </span>
                </div>
                {category.count !== undefined && (
                  <span className="text-xs text-gray-500">({category.count})</span>
                )}
              </label>
            ))}
          </div>
        </Card>

        {/* Price Range */}
        <Card>
          <h3 className="font-semibold mb-4 text-neon-cyan">Rango de precio</h3>
          <div className="space-y-2">
            {priceRanges.map(range => (
              <label
                key={range.value}
                className="flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="priceRange"
                    value={range.value}
                    checked={filters.priceRange === range.value}
                    onChange={() => handlePriceRangeChange(range.value)}
                    className="w-4 h-4 text-neon-pink focus:ring-neon-cyan"
                  />
                  <span className="text-sm group-hover:text-neon-cyan transition-colors">
                    {range.label}
                  </span>
                </div>
                {range.count !== undefined && (
                  <span className="text-xs text-gray-500">({range.count})</span>
                )}
              </label>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
