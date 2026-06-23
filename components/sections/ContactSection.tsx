'use client';

import { MapPin, Phone, Clock, Mail, MessageCircle } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';
import { useState } from 'react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al enviar el mensaje');
      }

      alert('¡Mensaje enviado! Nos pondremos en contacto contigo pronto.');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error: any) {
      alert(error.message || 'Error al enviar el mensaje. Por favor, intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Hablemos de tu{' '}
            <span className="text-neon-cyan">proyecto</span>
          </h2>
          <p className="text-lg text-gray-400">
            Estamos aquí para ayudarte. Visítanos, llámanos o envíanos un mensaje.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Contact Information & Map */}
          <div className="space-y-6">
            {/* Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Address */}
              <Card className="flex items-start space-x-4">
                <div className="p-3 glass rounded-lg">
                  <MapPin className="text-neon-pink" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Dirección</h3>
                  <p className="text-sm text-gray-400">
                    Carrer de la Muntanya, 11<br />
                    46680 Algemesí, Valencia
                  </p>
                </div>
              </Card>

              {/* Phone */}
              <Card className="flex items-start space-x-4">
                <div className="p-3 glass rounded-lg">
                  <Phone className="text-neon-cyan" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Teléfono</h3>
                  <a 
                    href="tel:+34657666741" 
                    className="text-sm text-neon-cyan hover:text-neon-pink transition-colors"
                  >
                    657 66 67 41
                  </a>
                </div>
              </Card>

              {/* Email */}
              <Card className="flex items-start space-x-4">
                <div className="p-3 glass rounded-lg">
                  <Mail className="text-neon-pink" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Email</h3>
                  <a 
                    href="mailto:info@deeetodo.com" 
                    className="text-sm text-neon-cyan hover:text-neon-pink transition-colors"
                  >
                    info@deeetodo.com
                  </a>
                </div>
              </Card>

              {/* WhatsApp */}
              <Card className="flex items-start space-x-4">
                <div className="p-3 glass rounded-lg">
                  <MessageCircle className="text-neon-cyan" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">WhatsApp</h3>
                  <a 
                    href="https://wa.me/34657666741" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-neon-cyan hover:text-neon-pink transition-colors"
                  >
                    Enviar mensaje
                  </a>
                </div>
              </Card>
            </div>

            {/* Business Hours */}
            <Card>
              <div className="flex items-start space-x-4">
                <div className="p-3 glass rounded-lg">
                  <Clock className="text-neon-cyan" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-4">Horario de Atención</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Lunes - Viernes</span>
                      <span className="font-medium">9:30 - 14:00 | 17:00 - 20:00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Sábado</span>
                      <span className="font-medium">9:30 - 14:00 | 17:00 - 20:00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Domingo</span>
                      <span className="font-medium text-red-400">Cerrado</span>
                    </div>
                    <div className="pt-3 border-t border-white/10">
                      <p className="text-xs text-gray-500">
                        * Los horarios pueden variar en festivos locales (ej. Natividad de San Juan Bautista)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Embedded Map */}
            <Card className="p-0 overflow-hidden">
              <div className="aspect-video w-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3082.8726448899845!2d-0.4394927!3d39.1918833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd604e5a8b8b8b8b%3A0x1234567890abcdef!2sCarrer%20de%20la%20Muntanya%2C%2011%2C%2046680%20Algemes%C3%AD%2C%20Valencia!5e0!3m2!1sen!2ses!4v1234567890123!5m2!1sen!2ses"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <div>
            <Card className="h-full">
              <h3 className="text-2xl font-bold mb-6">
                Envíanos un mensaje
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  name="name"
                  label="Nombre completo *"
                  placeholder="Tu nombre"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    name="email"
                    type="email"
                    label="Email *"
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    name="phone"
                    type="tel"
                    label="Teléfono *"
                    placeholder="657 66 67 41"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <Input
                  name="subject"
                  label="Asunto *"
                  placeholder="¿En qué podemos ayudarte?"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />

                <TextArea
                  name="message"
                  label="Mensaje *"
                  placeholder="Cuéntanos más sobre tu proyecto o consulta..."
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  required
                />

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    isLoading={isSubmitting}
                    className="flex-1"
                  >
                    Enviar Mensaje
                  </Button>
                  <a
                    href="https://wa.me/34657666741"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      className="w-full"
                    >
                      <MessageCircle size={20} className="mr-2" />
                      WhatsApp
                    </Button>
                  </a>
                </div>

                <p className="text-xs text-gray-500 text-center">
                  Al enviar este formulario, aceptas nuestra{' '}
                  <a href="/legal/privacidad" className="text-neon-cyan hover:text-neon-pink transition-colors">
                    Política de Privacidad
                  </a>
                </p>
              </form>
            </Card>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-pink/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full blur-3xl -z-10" />
    </section>
  );
}
