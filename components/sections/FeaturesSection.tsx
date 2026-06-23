'use client';

import { Shield, Clock, Award, Heart, Zap, Users } from 'lucide-react';
import Card from '../ui/Card';

const features = [
  {
    icon: Clock,
    title: 'Entregas Rápidas',
    description: 'Servicio express disponible. La mayoría de pedidos listos en 24-48 horas.',
  },
  {
    icon: Shield,
    title: 'Calidad Garantizada',
    description: 'Materiales premium y tecnología de última generación en todos nuestros servicios.',
  },
  {
    icon: Award,
    title: 'Experiencia Comprobada',
    description: 'Más de 15 años de experiencia respaldando cada proyecto que realizamos.',
  },
  {
    icon: Heart,
    title: 'Atención Personalizada',
    description: 'Asesoramiento profesional en cada etapa de tu proyecto.',
  },
  {
    icon: Zap,
    title: 'Tecnología Avanzada',
    description: 'Equipos de impresión de última generación para resultados excepcionales.',
  },
  {
    icon: Users,
    title: 'Clientes Satisfechos',
    description: 'Miles de clientes confían en nosotros para sus proyectos de impresión.',
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            ¿Por qué elegir{' '}
            <span className="text-neon-pink">DEEE TODO</span>?
          </h2>
          <p className="text-lg text-gray-400">
            Combinamos tecnología, experiencia y pasión para ofrecerte 
            el mejor servicio de impresión y personalización.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="group hover:border-neon-pink/50 transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="p-3 glass rounded-lg group-hover:bg-neon-pink/10 transition-colors">
                      <Icon className="text-neon-cyan group-hover:text-neon-pink transition-colors" size={24} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-neon-cyan transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Trust Indicators */}
        <div className="mt-20 glass rounded-2xl p-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold bg-gradient-to-r from-neon-cyan to-neon-pink bg-clip-text text-transparent mb-2">15+</div>
              <div className="text-gray-400 font-medium">Años de Experiencia</div>
            </div>
            <div>
              <div className="text-5xl font-bold bg-gradient-to-r from-neon-pink to-neon-purple bg-clip-text text-transparent mb-2">10K+</div>
              <div className="text-gray-400 font-medium">Proyectos Completados</div>
            </div>
            <div>
              <div className="text-5xl font-bold bg-gradient-to-r from-neon-cyan to-neon-green bg-clip-text text-transparent mb-2">99%</div>
              <div className="text-gray-400 font-medium">Satisfacción del Cliente</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-neon-cyan/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-neon-pink/5 rounded-full blur-3xl -z-10" />
    </section>
  );
}
