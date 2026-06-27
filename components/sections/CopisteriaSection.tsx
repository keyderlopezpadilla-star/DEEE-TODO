'use client';

import Link from 'next/link';
import { ArrowRight, Coffee } from 'lucide-react';

// Frases divertidas y cercanas para el ticker (marquee)
const TICKER_PHRASES = [
  '¿Una copia urgente? Corre, que te esperamos 🏃',
  'Plastificamos hasta tus recuerdos 📸',
  'Tu TFG encuadernado y reluciente 🎓',
  'Carteles que se ven desde la luna 🌙',
  'Fotocopias en color que dan gustito 🌈',
  'Camisetas con tu cara (sí, en serio) 👕',
  'Tarjetas de visita que molan 💼',
  'Pegatinas para todo lo pegable 🏷️',
  'Imprimimos tus memes favoritos 😎',
];

// Tarjetas con servicios "de copistería de toda la vida" pero con chispa
const FUN_CARDS = [
  {
    emoji: '🖨️',
    title: 'Fotocopias e impresiones',
    text: 'En blanco y negro o a todo color. Una hoja o mil, sin dramas.',
    anim: 'animate-bounce-soft',
    glow: 'rgba(255,0,122,0.4)',
  },
  {
    emoji: '📚',
    title: 'Encuadernación',
    text: 'Espiral, grapa o tapa dura. Tu trabajo, presentable y con orgullo.',
    anim: 'animate-swing',
    glow: 'rgba(0,240,255,0.4)',
  },
  {
    emoji: '✨',
    title: 'Plastificado',
    text: 'Para que tus documentos sobrevivan a cafés, lluvias y manazas.',
    anim: 'animate-wiggle',
    glow: 'rgba(179,0,255,0.4)',
  },
  {
    emoji: '🎨',
    title: 'Personalización',
    text: 'Tazas, camisetas, cojines... lo que se te ocurra, con tu diseño.',
    anim: 'animate-float-tilt',
    glow: 'rgba(0,255,136,0.4)',
  },
];

export default function CopisteriaSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Ticker / marquee de frases divertidas */}
      <div className="relative mb-16 border-y border-white/10 bg-dark-lighter/40 py-4 marquee-paused">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...TICKER_PHRASES, ...TICKER_PHRASES].map((phrase, i) => (
            <span
              key={i}
              className="mx-6 text-lg md:text-xl font-semibold text-gray-300 flex items-center gap-2"
            >
              <span className="text-neon-pink">✦</span>
              {phrase}
            </span>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header con tono cercano */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 glass rounded-full px-6 py-2 mb-6 animate-float">
            <Coffee className="text-neon-pink animate-wiggle" size={20} />
            <span className="text-sm font-medium">La copistería de siempre, con un puntito gamberro</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Sí, también hacemos{' '}
            <span className="relative inline-block">
              <span className="text-neon-pink">las fotocopias</span>
              <span className="absolute left-0 -bottom-1 h-1 w-full bg-neon-pink/60 rounded-full animate-draw-underline" />
            </span>
            <br />
            de toda la vida 😄
          </h2>

          <p className="text-lg text-gray-400">
            Que no te engañe el rollo futurista: en el fondo somos esa copistería
            de barrio donde entras con un pendrive perdido y sales con todo
            resuelto. Solo que ahora también te lo dejamos diseñar desde el sofá.
          </p>
        </div>

        {/* Tarjetas divertidas con doodles animados */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {FUN_CARDS.map((card, index) => (
            <div
              key={index}
              className="glass rounded-2xl p-6 text-center group hover:scale-105 hover:border-neon-cyan transition-all duration-300"
            >
              <div
                className={`text-5xl md:text-6xl mb-4 inline-block ${card.anim}`}
                style={{
                  animationDelay: `${index * 0.2}s`,
                  filter: `drop-shadow(0 0 14px ${card.glow})`,
                }}
              >
                {card.emoji}
              </div>
              <h3 className="text-lg font-bold mb-2 group-hover:text-neon-cyan transition-colors">
                {card.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">{card.text}</p>
            </div>
          ))}
        </div>

        {/* CTA divertido hacia el personalizador */}
        <div className="relative glass rounded-3xl p-8 md:p-12 max-w-4xl mx-auto overflow-hidden text-center">
          {/* Doodles decorativos */}
          <span className="absolute -top-2 left-6 text-4xl animate-float-tilt opacity-60" aria-hidden="true">📌</span>
          <span className="absolute bottom-4 right-8 text-4xl animate-bounce-soft opacity-60" aria-hidden="true">🖍️</span>

          <h3 className="text-2xl md:text-4xl font-bold mb-4">
            ¿Tienes algo en la cabeza?{' '}
            <span className="text-neon-cyan">Suéltalo aquí</span>
          </h3>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Diséñalo tú mismo en nuestro editor, súbenos tu archivo o cuéntanos
            la locura que tienes en mente. Nosotros ponemos la tinta, el papel y
            las ganas. 🙌
          </p>
          <Link
            href="/personalizar"
            className="inline-flex items-center gap-2 bg-neon-pink text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-neon-pink/50 hover:shadow-neon-pink/70 hover:scale-105 transition-all duration-300"
          >
            Envía o ajusta tu copia aquí
            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
          </Link>
        </div>
      </div>

      {/* Blobs decorativos */}
      <div className="absolute top-1/3 -right-20 w-72 h-72 bg-neon-purple/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 -left-20 w-80 h-80 bg-neon-pink/10 rounded-full blur-3xl -z-10" />
    </section>
  );
}
