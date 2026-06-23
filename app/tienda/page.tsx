import { Metadata } from 'next';
import MainLayout from '@/components/layout/MainLayout';
import ProductCatalog from '@/components/sections/ProductCatalog';
import { sampleProducts } from '@/lib/data/sampleProducts';
import { Store } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Tienda Online - DEEE TODO',
  description: 'Compra online productos personalizados: camisetas DTF, tazas sublimadas, carteles, vinilos y mucho más. Envío rápido a toda España.',
};

export default function ShopPage() {
  // In production, this would check user session for discount
  const userDiscountPercentage = 0; // TODO: Get from user session

  return (
    <MainLayout showParticles={false}>
      {/* Page Header */}
      <section className="py-12 glass border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 glass rounded-full px-6 py-2 mb-6">
              <Store className="text-neon-cyan" size={20} />
              <span className="text-sm font-medium">Tienda Online</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Explora nuestros{' '}
              <span className="text-neon-pink">productos</span>
            </h1>
            
            <p className="text-lg text-gray-400">
              Productos de alta calidad listos para personalizar. 
              Impresión profesional con entrega rápida.
            </p>
          </div>
        </div>
      </section>

      {/* Product Catalog */}
      <ProductCatalog 
        products={sampleProducts} 
        userDiscountPercentage={userDiscountPercentage}
      />
    </MainLayout>
  );
}
