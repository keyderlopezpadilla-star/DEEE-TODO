import { Metadata } from 'next';
import { requireAdmin } from '@/lib/utils/adminAuth';
import AdminLayout from '@/components/admin/AdminLayout';
import Card from '@/components/ui/Card';
import { 
  Users, 
  Package, 
  TrendingUp, 
  ShoppingCart,
  DollarSign,
  Clock,
  AlertCircle
} from 'lucide-react';
import { sampleOrders } from '@/lib/data/sampleOrders';

export const metadata: Metadata = {
  title: 'Admin Dashboard - DEEE TODO',
  description: 'Panel de administración de DEEE TODO',
};

export default async function AdminDashboard() {
  await requireAdmin();

  // In production, fetch real data from database
  const stats = {
    totalUsers: 25,
    totalOrders: sampleOrders.length,
    revenue: sampleOrders.reduce((sum, order) => sum + order.total, 0),
    pendingOrders: sampleOrders.filter(o => o.status === 'pending').length,
  };

  const recentActivity = [
    { id: 1, type: 'order', message: 'Nuevo pedido #DEEE-2024-1003', time: '5 min ago' },
    { id: 2, type: 'user', message: 'Nuevo usuario registrado', time: '1 hora ago' },
    { id: 3, type: 'order', message: 'Pedido #DEEE-2024-1002 enviado', time: '2 horas ago' },
  ];

  return (
    <AdminLayout>
      <div className="max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-gray-400">
            Resumen general del negocio
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card hover>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Total Usuarios</p>
                <p className="text-3xl font-bold text-neon-cyan">{stats.totalUsers}</p>
              </div>
              <div className="p-3 glass rounded-lg">
                <Users className="text-neon-cyan" size={32} />
              </div>
            </div>
          </Card>

          <Card hover>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Total Pedidos</p>
                <p className="text-3xl font-bold text-neon-pink">{stats.totalOrders}</p>
              </div>
              <div className="p-3 glass rounded-lg">
                <Package className="text-neon-pink" size={32} />
              </div>
            </div>
          </Card>

          <Card hover>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Ingresos</p>
                <p className="text-3xl font-bold text-green-500">
                  {stats.revenue.toFixed(2)}€
                </p>
              </div>
              <div className="p-3 glass rounded-lg">
                <DollarSign className="text-green-500" size={32} />
              </div>
            </div>
          </Card>

          <Card hover>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Pendientes</p>
                <p className="text-3xl font-bold text-yellow-500">{stats.pendingOrders}</p>
              </div>
              <div className="p-3 glass rounded-lg">
                <AlertCircle className="text-yellow-500" size={32} />
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <Card>
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Clock className="text-neon-cyan mr-2" size={24} />
              Actividad Reciente
            </h2>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start space-x-3 p-3 glass rounded-lg"
                >
                  <div className="p-2 bg-neon-cyan/10 rounded-lg">
                    {activity.type === 'order' ? (
                      <ShoppingCart className="text-neon-cyan" size={16} />
                    ) : (
                      <Users className="text-neon-pink" size={16} />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Actions */}
          <Card>
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <TrendingUp className="text-neon-pink mr-2" size={24} />
              Acciones Rápidas
            </h2>
            <div className="space-y-3">
              <a
                href="/admin/usuarios"
                className="block p-4 glass hover:bg-dark-lighter rounded-lg transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Gestionar Usuarios</span>
                  <Users className="text-neon-cyan" size={20} />
                </div>
                <p className="text-sm text-gray-400 mt-1">
                  Ver y editar usuarios registrados
                </p>
              </a>

              <a
                href="/admin/pedidos"
                className="block p-4 glass hover:bg-dark-lighter rounded-lg transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Ver Pedidos</span>
                  <Package className="text-neon-pink" size={20} />
                </div>
                <p className="text-sm text-gray-400 mt-1">
                  Gestionar pedidos y envíos
                </p>
              </a>

              <a
                href="/admin/configuracion"
                className="block p-4 glass hover:bg-dark-lighter rounded-lg transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Configuración</span>
                  <TrendingUp className="text-neon-cyan" size={20} />
                </div>
                <p className="text-sm text-gray-400 mt-1">
                  Ajustes del sitio y descuentos
                </p>
              </a>
            </div>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
