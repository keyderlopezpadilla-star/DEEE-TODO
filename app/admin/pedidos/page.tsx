import { Metadata } from 'next';
import { requireAdmin } from '@/lib/utils/adminAuth';
import AdminLayout from '@/components/admin/AdminLayout';
import Card from '@/components/ui/Card';
import { Package, Search, Eye, Truck, CheckCircle, Clock, XCircle } from 'lucide-react';
import { sampleOrders } from '@/lib/data/sampleOrders';

export const metadata: Metadata = {
  title: 'Gestión de Pedidos - Admin - DEEE TODO',
  description: 'Gestiona todos los pedidos de la tienda',
};

const statusConfig: Record<string, { label: string; color: string; bgColor: string }> = {
  pending: { label: 'Pendiente', color: 'text-yellow-500', bgColor: 'bg-yellow-500/10' },
  processing: { label: 'En proceso', color: 'text-blue-500', bgColor: 'bg-blue-500/10' },
  shipped: { label: 'Enviado', color: 'text-neon-cyan', bgColor: 'bg-neon-cyan/10' },
  delivered: { label: 'Entregado', color: 'text-green-500', bgColor: 'bg-green-500/10' },
  cancelled: { label: 'Cancelado', color: 'text-red-500', bgColor: 'bg-red-500/10' },
};

export default async function OrdersManagementPage() {
  await requireAdmin();

  const totalRevenue = sampleOrders.reduce((sum, o) => sum + o.total, 0);

  return (
    <AdminLayout>
      <div className="max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Gestión de Pedidos</h1>
            <p className="text-gray-400">
              {sampleOrders.length} pedidos • Ingresos: {totalRevenue.toFixed(2)}€
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <div className="flex items-center space-x-3">
              <Clock className="text-yellow-500" size={24} />
              <div>
                <p className="text-2xl font-bold">{sampleOrders.filter(o => o.status === 'pending').length}</p>
                <p className="text-xs text-gray-400">Pendientes</p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-center space-x-3">
              <Package className="text-blue-500" size={24} />
              <div>
                <p className="text-2xl font-bold">{sampleOrders.filter(o => o.status === 'processing').length}</p>
                <p className="text-xs text-gray-400">En proceso</p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-center space-x-3">
              <Truck className="text-neon-cyan" size={24} />
              <div>
                <p className="text-2xl font-bold">{sampleOrders.filter(o => o.status === 'shipped').length}</p>
                <p className="text-xs text-gray-400">Enviados</p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-center space-x-3">
              <CheckCircle className="text-green-500" size={24} />
              <div>
                <p className="text-2xl font-bold">{sampleOrders.filter(o => o.status === 'delivered').length}</p>
                <p className="text-xs text-gray-400">Entregados</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input
                type="text"
                placeholder="Buscar por número de pedido, cliente..."
                className="w-full pl-12 pr-4 py-3 rounded-lg bg-dark-lighter border border-dark-accent text-foreground placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:border-transparent"
              />
            </div>
            <select className="px-4 py-3 rounded-lg bg-dark-lighter border border-dark-accent text-foreground focus:outline-none focus:ring-2 focus:ring-neon-cyan">
              <option value="">Todos los estados</option>
              <option value="pending">Pendiente</option>
              <option value="processing">En proceso</option>
              <option value="shipped">Enviado</option>
              <option value="delivered">Entregado</option>
              <option value="cancelled">Cancelado</option>
            </select>
          </div>
        </Card>

        {/* Orders Table */}
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-400">Pedido</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-400">Cliente</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-400">Productos</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-400">Total</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-400">Estado</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-400">Fecha</th>
                  <th className="text-right py-4 px-4 text-sm font-semibold text-gray-400">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {sampleOrders.map((order) => {
                  const status = statusConfig[order.status];
                  return (
                    <tr
                      key={order.id}
                      className="border-b border-white/5 hover:bg-dark-lighter transition-colors"
                    >
                      <td className="py-4 px-4">
                        <p className="font-semibold text-neon-cyan">#{order.orderNumber}</p>
                      </td>
                      <td className="py-4 px-4">
                        <p className="font-medium">{order.shippingAddress.name}</p>
                        <p className="text-xs text-gray-400">{order.shippingAddress.city}</p>
                      </td>
                      <td className="py-4 px-4">
                        <p className="text-sm">{order.items.length} artículo(s)</p>
                        <p className="text-xs text-gray-400 truncate max-w-[150px]">
                          {order.items.map(i => i.title).join(', ')}
                        </p>
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-bold text-green-500">{order.total.toFixed(2)}€</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${status.bgColor} ${status.color}`}>
                          {status.label}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-gray-400">
                          {new Date(order.createdAt).toLocaleDateString('es-ES')}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            className="p-2 hover:bg-neon-cyan/10 rounded-lg transition-colors group"
                            aria-label="Ver pedido"
                          >
                            <Eye className="text-gray-400 group-hover:text-neon-cyan" size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
}
