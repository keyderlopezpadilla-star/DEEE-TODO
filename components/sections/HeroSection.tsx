'use client';

import { ArrowRight, Printer } from 'lucide-react';
import Button from '../ui/Button';
import Link from 'next/link';
import RotatingSlogan from '../ui/RotatingSlogan';

const FUN_SLOGANS = [
  'lo imprimimos 🖨️',
  'lo copiamos 📑',
  'lo plastificamos ✨',
  'lo encuadernamos 📚',
  'lo personalizamos 🎨',
  'lo hacemos realidad →',
];

// Doodles flotantes que dan vida a la copistería
const DOODLES = [
  { emoji: '🖨️', className: 'top-[18%] left-[8%] animate-float-tilt', delay: '0s', size: 'text-4xl md:text-6xl' },
  { emoji: '📄', className: 'top-[28%] right-[10%] animate-bounce-soft', delay: '0.4s', size: 'text-3xl md:text-5xl' },
  { emoji: '✏️', className: 'bottom-[26%] left-[12%] animate-wiggle', delay: '0.2s', size: 'text-3xl md:text-5xl' },
  { emoji: '📚', className: 'bottom-[20%] right-[14%] animate-float-tilt', delay: '0.8s', size: 'text-3xl md:text-5xl' },
  { emoji: '🎨', className: 'top-[14%] right-[22%] animate-swing', delay: '0.1s', size: 'text-2xl md:text-4xl' },
  { emoji: '📎', className: 'bottom-[14%] left-[26%] animate-bounce-soft', delay: '0.6s', size: 'text-2xl md:text-4xl' },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark/50 to-dark pointer-events-none" />

      {/* Doodles flotantes divertidos */}
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
        {DOODLES.map((doodle, i) => (
          <span
            key={i}
            className={`absolute ${doodle.className} ${doodle.size} opacity-70 drop-shadow-[0_0_12px_rgba(0,240,255,0.35)]`}
            style={{ animationDelay: doodle.delay }}
          >
            {doodle.emoji}
          </span>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 glass rounded-full px-6 py-2 mb-8 animate-float">
            <Printer className="text-neon-cyan animate-bounce-soft" size={20} />
            <span className="text-sm font-medium">
              Tu copistería de barrio en Algemesí (pero con superpoderes)
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

          {/* Subtitle con eslogan rotativo divertido */}
          <div className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto">
            <p className="mb-2">
              Si lo puedes imaginar,{' '}
              <RotatingSlogan
                slogans={FUN_SLOGANS}
                className="text-neon-cyan font-bold"
              />
            </p>
          </div>

          {/* Frase humana y cercana */}
          <p className="text-base md:text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
            Fotocopias de toda la vida, impresiones que enamoran y regalos que
            sacan sonrisas. Ven con tu idea (o tu archivo a medio hacer) y nosotros
            le ponemos el resto. ✌️
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link href="/personalizar">
              <Button size="lg" variant="primary" className="group">
                Envía tu copia o diseño
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Button>
            </Link>
            <Link href="/tienda">
              <Button size="lg" variant="outline">
                Curiosear la tienda
              </Button>
            </Link>
          </div>

          {/* Stats con tono cercano */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { value: '1000+', label: 'Vecinos contentos' },
              { value: 'DEEE', label: 'Hasta lo más raro' },
              { value: '24h', label: 'Para los que van con prisas' },
              { value: '0', label: 'Pedidos aburridos' },
            ].map((stat, index) => (
              <div key={index} className="glass rounded-lg p-6 hover:scale-105 transition-transform duration-300">
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
