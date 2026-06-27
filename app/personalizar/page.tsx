import { Metadata } from 'next';
import MainLayout from '@/components/layout/MainLayout';
import ProductCustomizer from '@/components/customizer/ProductCustomizer';
import { Printer, Wand2, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Envía o ajusta tu impresión o copia aquí - DEEE TODO',
  description: 'Diseña, ajusta y envíanos tu copia o impresión sin moverte del sofá. Editor visual con texto, imágenes y quitar fondo con IA. Elige tamaño, papel y encuadernación, y mándanoslo en un clic.',
};

export default function CustomizerPage() {
  return (
    <MainLayout showParticles={false}>
      {/* Page Header */}
      <section className="py-12 glass border-b border-white/10 relative overflow-hidden">
        {/* Doodles decorativos animados */}
        <span className="absolute top-6 left-[8%] text-3xl md:text-4xl animate-float-tilt opacity-50 select-none" aria-hidden="true">🖨️</span>
        <span className="absolute bottom-6 right-[10%] text-3xl md:text-4xl animate-bounce-soft opacity-50 select-none" aria-hidden="true">✨</span>
        <span className="absolute top-10 right-[20%] text-2xl md:text-3xl animate-wiggle opacity-50 select-none" aria-hidden="true">📄</span>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 glass rounded-full px-6 py-2 mb-6 animate-float">
              <Printer className="text-neon-cyan animate-bounce-soft" size={20} />
              <span className="text-sm font-medium">Tu copia o impresión, a tu manera</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Envía o ajusta tu{' '}
              <span className="text-neon-pink text-neon-glow">impresión</span>
              {' '}o{' '}
              <span className="text-neon-cyan text-neon-glow">copia</span>
              {' '}aquí
            </h1>

            <p className="text-lg text-gray-400">
              Diséñalo a tu gusto, súbenos tu archivo y, si quieres, deja que la{' '}
              <span className="inline-flex items-center gap-1 text-neon-purple font-medium">
                <Wand2 size={16} /> IA
              </span>{' '}
              te quite el fondo de la imagen en un clic. Tú lo imaginas, nosotros lo imprimimos. →
            </p>

            {/* Mini badges de funciones */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
              {[
                { icon: '✏️', text: 'Añade texto' },
                { icon: '🖼️', text: 'Sube imágenes' },
                { icon: '🪄', text: 'Quita el fondo con IA' },
                { icon: '🎨', text: 'Elige material y tamaño' },
                { icon: '📲', text: 'Envía por Email o WhatsApp' },
              ].map((badge, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-300 glass rounded-full px-3 py-1.5"
                >
                  <span>{badge.icon}</span>
                  {badge.text}
                </span>
              ))}
            </div>

            <p className="flex items-center justify-center gap-1.5 text-xs text-gray-500 mt-5">
              <Sparkles size={12} className="text-neon-cyan" />
              Todo se procesa en tu navegador: tus archivos son tuyos.
            </p>
          </div>
        </div>
      </section>

      {/* Product Customizer */}
      <ProductCustomizer />
    </MainLayout>
  );
}
