import { Metadata } from 'next';
import { requireAdmin } from '@/lib/utils/adminAuth';
import AdminLayout from '@/components/admin/AdminLayout';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Clock, Calendar, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Horarios - Admin - DEEE TODO',
  description: 'Gestiona los horarios de atención del negocio',
};

const days = [
  { key: 'monday', label: 'Lunes' },
  { key: 'tuesday', label: 'Martes' },
  { key: 'wednesday', label: 'Miércoles' },
  { key: 'thursday', label: 'Jueves' },
  { key: 'friday', label: 'Viernes' },
  { key: 'saturday', label: 'Sábado' },
  { key: 'sunday', label: 'Domingo' },
];

export default async function SchedulePage() {
  await requireAdmin();

  return (
    <AdminLayout>
      <div className="max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Horarios de Atención</h1>
          <p className="text-gray-400">
            Configura los horarios de apertura y cierre del negocio
          </p>
        </div>

        <div className="space-y-6">
          {/* Weekly Schedule */}
          <Card>
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 glass rounded-lg">
                <Clock className="text-neon-cyan" size={24} />
              </div>
              <h2 className="text-2xl font-bold">Horario Semanal</h2>
            </div>

            <form className="space-y-4">
              {days.map((day) => {
                const isSunday = day.key === 'sunday';
                return (
                  <div key={day.key} className="glass rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold">{day.label}</h3>
                      {isSunday && (
                        <span className="text-xs px-2 py-1 rounded-full bg-red-500/10 text-red-400">
                          Cerrado
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-gray-400 mb-2">Mañana</label>
                        <div className="flex items-center space-x-2">
                          <Input
                            type="time"
                            defaultValue={isSunday ? '' : '09:30'}
                            disabled={isSunday}
                          />
                          <span className="text-gray-500">-</span>
                          <Input
                            type="time"
                            defaultValue={isSunday ? '' : '14:00'}
                            disabled={isSunday}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-2">Tarde</label>
                        <div className="flex items-center space-x-2">
                          <Input
                            type="time"
                            defaultValue={isSunday ? '' : '17:00'}
                            disabled={isSunday}
                          />
                          <span className="text-gray-500">-</span>
                          <Input
                            type="time"
                            defaultValue={isSunday ? '' : '20:00'}
                            disabled={isSunday}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              <Button type="submit" variant="primary">
                Guardar Horarios
              </Button>
            </form>
          </Card>

          {/* Holidays */}
          <Card>
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 glass rounded-lg">
                <Calendar className="text-neon-pink" size={24} />
              </div>
              <h2 className="text-2xl font-bold">Festivos y Cierres</h2>
            </div>

            <div className="space-y-4">
              <div className="glass rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                  <Input label="Fecha" type="date" />
                  <Input label="Motivo" placeholder="Ej: Festivo local" />
                  <Button variant="outline" size="sm">Añadir cierre</Button>
                </div>
              </div>

              {/* Existing holidays */}
              <div className="space-y-2">
                <div className="flex items-center justify-between glass rounded-lg p-3">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="text-yellow-500" size={16} />
                    <div>
                      <p className="text-sm font-medium">24 de Junio</p>
                      <p className="text-xs text-gray-400">Natividad de San Juan Bautista</p>
                    </div>
                  </div>
                  <button className="text-xs text-red-400 hover:text-red-300">Eliminar</button>
                </div>
                <div className="flex items-center justify-between glass rounded-lg p-3">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="text-yellow-500" size={16} />
                    <div>
                      <p className="text-sm font-medium">25 de Diciembre</p>
                      <p className="text-xs text-gray-400">Navidad</p>
                    </div>
                  </div>
                  <button className="text-xs text-red-400 hover:text-red-300">Eliminar</button>
                </div>
              </div>

              <Button variant="primary">Guardar Festivos</Button>
            </div>
          </Card>

          {/* Special Notice */}
          <Card className="border-yellow-500/30">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="text-yellow-500 mt-1" size={20} />
              <div>
                <h3 className="font-semibold mb-2">Nota importante</h3>
                <p className="text-sm text-gray-400">
                  Los cambios en los horarios se reflejarán automáticamente en el footer del sitio 
                  web y en la sección de contacto. Los clientes verán los horarios actualizados 
                  inmediatamente.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
