import { Metadata } from 'next';
import { requireAdmin } from '@/lib/utils/adminAuth';
import AdminLayout from '@/components/admin/AdminLayout';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Users, Search, Edit, Trash2, Gift } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Gestión de Usuarios - Admin - DEEE TODO',
  description: 'Gestiona usuarios y sus descuentos personalizados',
};

// Mock data - In production, fetch from database
const users = [
  {
    id: '1',
    name: 'Admin DEEE TODO',
    email: 'admin@deeetodo.com',
    role: 'admin',
    discountPercentage: 0,
    createdAt: new Date('2023-01-01'),
    totalOrders: 0,
    totalSpent: 0,
  },
  {
    id: '2',
    name: 'Cliente Ejemplo',
    email: 'cliente@example.com',
    role: 'customer',
    discountPercentage: 10,
    createdAt: new Date('2024-01-10'),
    totalOrders: 3,
    totalSpent: 141.24,
  },
  {
    id: '3',
    name: 'Juan García',
    email: 'juan@example.com',
    role: 'customer',
    discountPercentage: 5,
    createdAt: new Date('2024-02-05'),
    totalOrders: 1,
    totalSpent: 45.00,
  },
];

export default async function UsersManagementPage() {
  await requireAdmin();

  return (
    <AdminLayout>
      <div className="max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Gestión de Usuarios</h1>
            <p className="text-gray-400">
              {users.length} usuarios registrados
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input
                type="text"
                placeholder="Buscar usuarios..."
                className="w-full pl-12 pr-4 py-3 rounded-lg bg-dark-lighter border border-dark-accent text-foreground placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:border-transparent"
              />
            </div>
            <select className="px-4 py-3 rounded-lg bg-dark-lighter border border-dark-accent text-foreground focus:outline-none focus:ring-2 focus:ring-neon-cyan">
              <option>Todos los roles</option>
              <option>Administradores</option>
              <option>Clientes</option>
            </select>
          </div>
        </Card>

        {/* Users Table */}
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-400">
                    Usuario
                  </th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-400">
                    Rol
                  </th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-400">
                    Descuento
                  </th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-400">
                    Pedidos
                  </th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-400">
                    Total gastado
                  </th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-400">
                    Registro
                  </th>
                  <th className="text-right py-4 px-4 text-sm font-semibold text-gray-400">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-white/5 hover:bg-dark-lighter transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-400">{user.email}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          user.role === 'admin'
                            ? 'bg-neon-pink/10 text-neon-pink'
                            : 'bg-neon-cyan/10 text-neon-cyan'
                        }`}
                      >
                        {user.role === 'admin' ? 'Admin' : 'Cliente'}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        {user.discountPercentage > 0 ? (
                          <>
                            <Gift className="text-neon-pink" size={16} />
                            <span className="font-semibold text-neon-pink">
                              {user.discountPercentage}%
                            </span>
                          </>
                        ) : (
                          <span className="text-gray-500">Sin descuento</span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-semibold">{user.totalOrders}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-semibold text-green-500">
                        {user.totalSpent.toFixed(2)}€
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-400">
                        {new Date(user.createdAt).toLocaleDateString('es-ES')}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          className="p-2 hover:bg-neon-cyan/10 rounded-lg transition-colors group"
                          aria-label="Editar usuario"
                        >
                          <Edit className="text-gray-400 group-hover:text-neon-cyan" size={16} />
                        </button>
                        <button
                          className="p-2 hover:bg-red-500/10 rounded-lg transition-colors group"
                          aria-label="Eliminar usuario"
                          disabled={user.role === 'admin'}
                        >
                          <Trash2
                            className={`${
                              user.role === 'admin'
                                ? 'text-gray-600'
                                : 'text-gray-400 group-hover:text-red-500'
                            }`}
                            size={16}
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
}
