import { Metadata } from 'next';
import { requireAdmin } from '@/lib/utils/adminAuth';
import AdminLayout from '@/components/admin/AdminLayout';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import TextArea from '@/components/ui/TextArea';
import Button from '@/components/ui/Button';
import { Settings, MapPin, Phone, Mail, Clock, Gift } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Configuración - Admin - DEEE TODO',
  description: 'Configura los ajustes del sitio',
};

export default async function ConfigurationPage() {
  await requireAdmin();

  return (
    <AdminLayout>
      <div className="max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Configuración</h1>
          <p className="text-gray-400">
            Gestiona la configuración del sitio web
          </p>
        </div>

        <div className="space-y-6">
          {/* Contact Information */}
          <Card>
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 glass rounded-lg">
                <MapPin className="text-neon-cyan" size={24} />
              </div>
              <h2 className="text-2xl font-bold">Información de Contacto</h2>
            </div>

            <form className="space-y-4">
              <Input
                label="Dirección"
                defaultValue="Carrer de la Muntanya, 11, 46680 Algemesí, Valencia"
              />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Teléfono"
                  defaultValue="657 66 67 41"
                  icon={<Phone size={16} />}
                />
                <Input
                  label="WhatsApp"
                  defaultValue="657 66 67 41"
                />
              </div>

              <Input
                label="Email"
                type="email"
                defaultValue="info@deeetodo.com"
                icon={<Mail size={16} />}
              />

              <Input
                label="URL del mapa de Google"
                defaultValue="https://www.google.com/maps/embed?pb=..."
              />

              <Button type="submit" variant="primary">
                Guardar cambios
              </Button>
            </form>
          </Card>

          {/* Business Hours */}
          <Card>
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 glass rounded-lg">
                <Clock className="text-neon-pink" size={24} />
              </div>
              <h2 className="text-2xl font-bold">Horario de Atención</h2>
            </div>

            <form className="space-y-4">
              {[
                { day: 'Lunes - Viernes', key: 'weekdays' },
                { day: 'Sábado', key: 'saturday' },
                { day: 'Domingo', key: 'sunday' },
              ].map((item) => (
                <div key={item.key} className="glass rounded-lg p-4">
                  <h3 className="font-semibold mb-3">{item.day}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">
                        Mañana
                      </label>
                      <div className="flex items-center space-x-2">
                        <Input
                          type="time"
                          defaultValue={item.key === 'sunday' ? '' : '09:30'}
                          disabled={item.key === 'sunday'}
                        />
                        <span>-</span>
                        <Input
                          type="time"
                          defaultValue={item.key === 'sunday' ? '' : '14:00'}
                          disabled={item.key === 'sunday'}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">
                        Tarde
                      </label>
                      <div className="flex items-center space-x-2">
                        <Input
                          type="time"
                          defaultValue={item.key === 'sunday' ? '' : '17:00'}
                          disabled={item.key === 'sunday'}
                        />
                        <span>-</span>
                        <Input
                          type="time"
                          defaultValue={item.key === 'sunday' ? '' : '20:00'}
                          disabled={item.key === 'sunday'}
                        />
                      </div>
                    </div>
                  </div>
                  {item.key === 'sunday' && (
                    <p className="text-sm text-red-400 mt-2">Cerrado</p>
                  )}
                </div>
              ))}

              <TextArea
                label="Nota sobre festivos"
                defaultValue="Los horarios pueden variar en festivos locales (ej. Natividad de San Juan Bautista)"
                rows={3}
              />

              <Button type="submit" variant="primary">
                Guardar horarios
              </Button>
            </form>
          </Card>

          {/* Site Content */}
          <Card>
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 glass rounded-lg">
                <Settings className="text-neon-cyan" size={24} />
              </div>
              <h2 className="text-2xl font-bold">Contenido del Sitio</h2>
            </div>

            <form className="space-y-4">
              <Input
                label="Título principal"
                defaultValue="Literalmente, hacemos DEEE TODO"
              />

              <Input
                label="Subtítulo"
                defaultValue="Imprime, Envía, Crea, Sorprende."
              />

              <TextArea
                label="Descripción"
                defaultValue="Si lo puedes imaginar, nosotros lo imprimimos. No somos una copistería más, somos tu fábrica de ideas."
                rows={4}
              />

              <Button type="submit" variant="primary">
                Guardar contenido
              </Button>
            </form>
          </Card>

          {/* Discount Management */}
          <Card>
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 glass rounded-lg">
                <Gift className="text-neon-pink" size={24} />
              </div>
              <h2 className="text-2xl font-bold">Gestión de Descuentos</h2>
            </div>

            <div className="space-y-4">
              <div className="glass rounded-lg p-4">
                <h3 className="font-semibold mb-3">Descuento por defecto</h3>
                <p className="text-sm text-gray-400 mb-4">
                  Este descuento se aplicará a todos los nuevos usuarios registrados
                </p>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  defaultValue="0"
                  placeholder="0"
                  label="Porcentaje de descuento (%)"
                />
              </div>

              <div className="glass rounded-lg p-4">
                <h3 className="font-semibold mb-3">Descuentos personalizados</h3>
                <p className="text-sm text-gray-400 mb-4">
                  Gestiona los descuentos desde la sección de{' '}
                  <a href="/admin/usuarios" className="text-neon-cyan hover:text-neon-pink">
                    Usuarios
                  </a>
                </p>
              </div>

              <Button variant="primary">
                Guardar configuración
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
