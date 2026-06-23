'use client';

import Link from 'next/link';
import { MapPin, Phone, Clock, Mail, Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="glass border-t border-white/10 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4">
              <span className="text-neon-pink">DEEE</span>
              <span className="text-neon-cyan"> TODO</span>
            </h2>
            <p className="text-gray-400 mb-4">
              No somos una copistería más, somos tu fábrica de ideas.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="p-2 glass-hover rounded-full hover:text-neon-cyan transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="p-2 glass-hover rounded-full hover:text-neon-cyan transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="p-2 glass-hover rounded-full hover:text-neon-cyan transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-neon-cyan">Contacto</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start space-x-2">
                <MapPin size={20} className="text-neon-pink flex-shrink-0 mt-1" />
                <span>
                  Carrer de la Muntanya, 11<br />
                  46680 Algemesí, Valencia
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={20} className="text-neon-pink flex-shrink-0" />
                <a href="tel:+34657666741" className="hover:text-neon-cyan transition-colors">
                  657 66 67 41
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={20} className="text-neon-pink flex-shrink-0" />
                <a href="mailto:info@deeetodo.com" className="hover:text-neon-cyan transition-colors">
                  info@deeetodo.com
                </a>
              </li>
            </ul>
          </div>

          {/* Business Hours */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-neon-cyan">Horario</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center space-x-2">
                <Clock size={16} className="text-neon-pink flex-shrink-0" />
                <span className="font-medium">Lunes - Sábado</span>
              </li>
              <li className="pl-6">9:30 - 14:00</li>
              <li className="pl-6">17:00 - 20:00</li>
              <li className="flex items-center space-x-2 mt-3">
                <Clock size={16} className="text-neon-pink flex-shrink-0" />
                <span className="font-medium">Domingo</span>
              </li>
              <li className="pl-6">Cerrado</li>
              <li className="text-xs text-gray-500 mt-4 pl-6">
                * Los horarios pueden variar en festivos
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-neon-cyan">Enlaces</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/tienda" className="hover:text-neon-cyan transition-colors">
                  Tienda Online
                </Link>
              </li>
              <li>
                <Link href="/servicios" className="hover:text-neon-cyan transition-colors">
                  Nuestros Servicios
                </Link>
              </li>
              <li>
                <Link href="/presupuesto" className="hover:text-neon-cyan transition-colors">
                  Solicitar Presupuesto
                </Link>
              </li>
              <li>
                <Link href="/cuenta" className="hover:text-neon-cyan transition-colors">
                  Mi Cuenta
                </Link>
              </li>
              <li>
                <Link href="/ayuda" className="hover:text-neon-cyan transition-colors">
                  Ayuda y Soporte
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-400 text-sm">
            © {currentYear} DEEE TODO. Todos los derechos reservados.
          </p>
          <div className="flex space-x-6 text-sm text-gray-400">
            <Link href="/legal/privacidad" className="hover:text-neon-cyan transition-colors">
              Política de Privacidad
            </Link>
            <Link href="/legal/terminos" className="hover:text-neon-cyan transition-colors">
              Términos y Condiciones
            </Link>
            <Link href="/legal/aviso-legal" className="hover:text-neon-cyan transition-colors">
              Aviso Legal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
