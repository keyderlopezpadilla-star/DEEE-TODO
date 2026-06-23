'use client';

import { ShoppingBag, ArrowRight, Star, Truck, Shield } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Link from 'next/link';
import { sampleProducts } from '@/lib/data/sampleProducts';

export default function ShopPreview() {
  const featuredProducts = sampleProducts.slice(0, 4);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-cyan/[0.02] to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 glass rounded-full px-5 py-2 mb-6">
              <ShoppingBag className="text-neon-pink" size={18} />
              <span className="text-sm font-medium">Tienda Virtual</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Tu tienda online{' '}
              <span className="text-neon-pink">24/7</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-xl">
              Compra desde casa y recibe tu pedido personalizado en 24-48 horas. 
              Todos nuestros productos con la misma calidad profesional.
            </p>
          </div>
          <Link href="/tienda">
            <Button variant="outline" className="group whitespace-nowrap">
              Ver toda la tienda
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
            </Button>
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {featuredProducts.map((product) => (
            <Link href="/tienda" key={product.id}>
              <Card hover neonBorder="cyan" className="group h-full">
                {/* Product Image Placeholder */}
                <div className="aspect-square mb-4 rounded-lg bg-gradient-to-br from-dark-lighter to-dark-accent flex items-center justify-center overflow-hidden relative">
                  <ShoppingBag className="text-gray-600 group-hover:text-neon-cyan transition-colors" size={48} />
                  {product.compareAtPrice && (
                    <span className="absolute top-2 left-2 bg-neon-pink text-white text-xs font-bold px-2 py-1 rounded-full">
                      Oferta
                    </span>
                  )}
                </div>

                {/* Product Info */}
                <div className="space-y-2">
                  {product.category && (
                    <span className="text-xs text-neon-cyan font-medium uppercase tracking-wide">
                      {product.category}
                    </span>
                  )}
                  <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-neon-cyan transition-colors">
                    {product.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-neon-cyan">
                      {product.price.toFixed(2)}€
                    </span>
                    {product.compareAtPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        {product.compareAtPrice.toFixed(2)}€
                      </span>
                    )}
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass rounded-xl p-6 flex items-center space-x-4">
            <div className="p-3 rounded-lg bg-neon-cyan/10">
              <Truck className="text-neon-cyan" size={28} />
            </div>
            <div>
              <h4 className="font-semibold mb-1">Envío Rápido</h4>
              <p className="text-sm text-gray-400">24-48h a toda España</p>
            </div>
          </div>
          <div className="glass rounded-xl p-6 flex items-center space-x-4">
            <div className="p-3 rounded-lg bg-neon-pink/10">
              <Shield className="text-neon-pink" size={28} />
            </div>
            <div>
              <h4 className="font-semibold mb-1">Pago Seguro</h4>
              <p className="text-sm text-gray-400">Checkout protegido con SSL</p>
            </div>
          </div>
          <div className="glass rounded-xl p-6 flex items-center space-x-4">
            <div className="p-3 rounded-lg bg-neon-cyan/10">
              <Star className="text-neon-cyan" size={28} />
            </div>
            <div>
              <h4 className="font-semibold mb-1">Calidad Premium</h4>
              <p className="text-sm text-gray-400">Materiales de primera calidad</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
