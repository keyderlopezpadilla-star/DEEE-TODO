'use client';

import { ArrowRight, Sparkles } from 'lucide-react';
import Button from '../ui/Button';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark/50 to-dark pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 glass rounded-full px-6 py-2 mb-8 animate-float">
            <Sparkles className="text-neon-cyan" size={20} />
            <span className="text-sm font-medium">
              Tu fábrica de ideas en Algemesí
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            <span className="block mb-2">Literalmente,</span>
            <span className="block">
              hacemos{' '}
              <span className="text-neon-pink text-neon-glow">DEEE</span>
              <span className="text-neon-cyan text-neon-glow"> TODO</span>
            </span>
          </h1>

          {/* Subtitle with rotating slogans */}
          <div className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
            <p className="mb-4">
              <span className="text-neon-cyan font-semibold">Imprime</span>,{' '}
              <span className="text-neon-pink font-semibold">Envía</span>,{' '}
              <span className="text-neon-cyan font-semibold">Crea</span>,{' '}
              <span className="text-neon-pink font-semibold">Sorprende</span>
            </p>
            <p className="text-lg text-gray-400">
              Si lo puedes imaginar, nosotros lo imprimimos.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link href="/tienda">
              <Button size="lg" variant="primary" className="group">
                Explorar Tienda
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Button>
            </Link>
            <Link href="/presupuesto">
              <Button size="lg" variant="outline">
                Solicitar Presupuesto
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { value: '1000+', label: 'Clientes Satisfechos' },
              { value: '50+', label: 'Productos Disponibles' },
              { value: '24h', label: 'Envío Express' },
              { value: '100%', label: 'Calidad Garantizada' },
            ].map((stat, index) => (
              <div key={index} className="glass rounded-lg p-6">
                <div className="text-3xl md:text-4xl font-bold text-neon-cyan mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Animated gradient blobs */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-neon-pink/20 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-neon-cyan/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
    </section>
  );
}
