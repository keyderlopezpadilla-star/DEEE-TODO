import { Metadata } from 'next';
import MainLayout from '@/components/layout/MainLayout';
import ProductCustomizer from '@/components/customizer/ProductCustomizer';
import { Palette } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Personaliza tu Producto - DEEE TODO',
  description: 'Diseña y personaliza tus productos de impresión. Editor visual interactivo para crear tu diseño perfecto: libretas, carteles, vinilos y más.',
};

export default function CustomizerPage() {
  return (
    <MainLayout showParticles={false}>
      {/* Page Header */}
      <section className="py-10 glass border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 glass rounded-full px-6 py-2 mb-6">
              <Palette className="text-neon-cyan" size={20} />
              <span className="text-sm font-medium">Personalizador Interactivo</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Diseña tu{' '}
              <span className="text-neon-pink">producto ideal</span>
            </h1>
            
            <p className="text-lg text-gray-400">
              Usa nuestro editor visual para crear tu diseño personalizado. 
              Añade textos, imágenes, elige materiales y envíanos tu pedido.
            </p>
          </div>
        </div>
      </section>

      {/* Product Customizer */}
      <ProductCustomizer />
    </MainLayout>
  );
}
