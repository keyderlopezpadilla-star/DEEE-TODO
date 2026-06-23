'use client';

import { 
  Printer, 
  Truck, 
  Palette, 
  Gift, 
  FileText, 
  Sparkles,
  Zap,
  Package,
  Image as ImageIcon
} from 'lucide-react';
import Card from '../ui/Card';

const services = [
  {
    icon: Printer,
    title: 'Impresión DTF',
    description: 'Tecnología de impresión directa sobre textil de última generación. Colores vibrantes y durabilidad excepcional.',
    color: 'neon-pink',
  },
  {
    icon: Sparkles,
    title: 'Impresión UV',
    description: 'Impresión sobre cualquier superficie: madera, metal, cristal, plástico. Resistente a rayos UV y agua.',
    color: 'neon-cyan',
  },
  {
    icon: Palette,
    title: 'Sublimación',
    description: 'Personalización de textiles, tazas, cojines y más. Colores vivos que no se desgastan con el tiempo.',
    color: 'neon-purple',
  },
  {
    icon: ImageIcon,
    title: 'Cartelería',
    description: 'Carteles, banners, vinilos de gran formato. Perfectos para eventos, tiendas y publicidad exterior.',
    color: 'neon-green',
  },
  {
    icon: FileText,
    title: 'Vinilos',
    description: 'Vinilos decorativos, rotulación de vehículos, escaparates. Adhesivos de alta calidad y larga duración.',
    color: 'neon-cyan',
  },
  {
    icon: Gift,
    title: 'Regalos Personalizados',
    description: 'Crea regalos únicos y memorables. Tazas, camisetas, cojines, calendarios y mucho más.',
    color: 'neon-pink',
  },
  {
    icon: Truck,
    title: 'Envíos Rápidos',
    description: 'Envío express 24-48h a toda España. Seguimiento en tiempo real de tu pedido.',
    color: 'neon-purple',
  },
  {
    icon: Package,
    title: 'Packaging Personalizado',
    description: 'Diseño y producción de cajas, bolsas y envases personalizados para tu negocio.',
    color: 'neon-green',
  },
];

export default function ServicesSection() {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 glass rounded-full px-6 py-2 mb-6">
            <Zap className="text-neon-cyan" size={20} />
            <span className="text-sm font-medium">Nuestros Servicios</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            No somos una copistería más,
            <br />
            <span className="text-neon-cyan">somos tu fábrica de ideas</span>
          </h2>
          
          <p className="text-lg text-gray-400">
            Tecnología de última generación y años de experiencia al servicio de tu creatividad.
            Desde una simple fotocopia hasta proyectos de gran formato.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={index}
                hover
                neonBorder="cyan"
                className="group"
              >
                <div className="flex flex-col items-center text-center">
                  {/* Icon */}
                  <div className="mb-4 p-4 glass rounded-full group-hover:scale-110 transition-transform duration-300">
                    <Icon 
                      className="text-neon-cyan group-hover:text-neon-pink transition-colors duration-300" 
                      size={32} 
                    />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-bold mb-3 group-hover:text-neon-cyan transition-colors">
                    {service.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="glass rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              ¿Tienes un proyecto en mente?
            </h3>
            <p className="text-gray-400 mb-6">
              Nuestro equipo está listo para ayudarte a hacerlo realidad. 
              Solicita un presupuesto sin compromiso.
            </p>
            <a
              href="/presupuesto"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-neon-pink to-neon-cyan text-white font-semibold px-8 py-4 rounded-lg hover:opacity-90 transition-opacity"
            >
              <span>Solicitar Presupuesto Gratis</span>
              <Sparkles size={20} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
