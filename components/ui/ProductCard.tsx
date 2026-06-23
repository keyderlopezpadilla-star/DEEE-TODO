'use client';

import { ShoppingCart, Eye, Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Card from './Card';
import Button from './Button';
import { Product } from '@/lib/types';
import { useCartStore } from '@/lib/stores/cartStore';

interface ProductCardProps {
  product: Product;
  discountPercentage?: number;
}

export default function ProductCard({ product, discountPercentage = 0 }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  
  const addItem = useCartStore((state) => state.addItem);

  const finalPrice = discountPercentage > 0 
    ? product.price * (1 - discountPercentage / 100) 
    : product.price;

  const hasDiscount = discountPercentage > 0 || (product.compareAtPrice && product.compareAtPrice > product.price);

  const handleAddToCart = async () => {
    setIsAdding(true);
    
    try {
      // Get the first available variant or use a default
      const variantId = product.variants && product.variants.length > 0 
        ? product.variants[0].id 
        : `gid://shopify/ProductVariant/${product.id}`;

      await addItem({
        variantId,
        productId: product.id,
        title: product.title,
        variantTitle: product.variants?.[0]?.title,
        quantity: 1,
        price: finalPrice,
        image: product.images?.[0]?.url,
      });
    } catch (error) {
      console.error('Failed to add to cart:', error);
      alert('Error al añadir al carrito. Por favor, intenta de nuevo.');
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Card hover neonBorder="cyan" className="group overflow-hidden">
      {/* Image Container */}
      <Link href={`/tienda/producto/${product.id}`} className="block relative aspect-square mb-4 overflow-hidden rounded-lg bg-dark-lighter">
        {product.images && product.images.length > 0 && !imageError ? (
          <Image
            src={product.images[0].url}
            alt={product.images[0].altText || product.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Eye className="text-gray-600" size={48} />
          </div>
        )}
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-2">
          {!product.available && (
            <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              Agotado
            </span>
          )}
          {hasDiscount && product.available && (
            <span className="bg-neon-pink text-white text-xs font-bold px-3 py-1 rounded-full">
              {discountPercentage > 0 ? `-${discountPercentage}%` : '¡Oferta!'}
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsFavorite(!isFavorite);
          }}
          className="absolute top-2 right-2 p-2 glass rounded-full hover:bg-neon-pink/20 transition-colors"
          aria-label="Añadir a favoritos"
        >
          <Heart 
            size={20} 
            className={isFavorite ? 'fill-neon-pink text-neon-pink' : 'text-white'}
          />
        </button>
      </Link>

      {/* Product Info */}
      <div className="space-y-3">
        {/* Category */}
        {product.category && (
          <span className="text-xs text-neon-cyan font-medium uppercase tracking-wide">
            {product.category}
          </span>
        )}

        {/* Title */}
        <Link href={`/tienda/producto/${product.id}`}>
          <h3 className="font-bold text-lg line-clamp-2 group-hover:text-neon-cyan transition-colors">
            {product.title}
          </h3>
        </Link>

        {/* Description */}
        {product.description && (
          <p className="text-sm text-gray-400 line-clamp-2">
            {product.description}
          </p>
        )}

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-neon-cyan">
            {finalPrice.toFixed(2)}€
          </span>
          {hasDiscount && (
            <span className="text-sm text-gray-500 line-through">
              {(product.compareAtPrice || product.price).toFixed(2)}€
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button
            variant="primary"
            size="sm"
            className="flex-1"
            disabled={!product.available}
            isLoading={isAdding}
            onClick={handleAddToCart}
          >
            <ShoppingCart size={18} className="mr-2" />
            {product.available ? 'Añadir' : 'Agotado'}
          </Button>
          <Link href={`/tienda/producto/${product.id}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full">
              <Eye size={18} className="mr-2" />
              Ver
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
