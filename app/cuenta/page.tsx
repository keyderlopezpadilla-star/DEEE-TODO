import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth.config';
import MainLayout from '@/components/layout/MainLayout';
import DashboardStats from '@/components/dashboard/DashboardStats';
import OrderCard from '@/components/dashboard/OrderCard';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { User, Package, Settings, Gift } from 'lucide-react';
import Link from 'next/link';
import { sampleOrders } from '@/lib/data/sampleOrders';

export const metadata: Metadata = {
  title: 'Mi Cuenta - DEEE TODO',
  description: 'Gestiona tu cuenta, consulta tus pedidos y accede a tus ventajas exclusivas.',
};

export default async function AccountPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/login?callbackUrl=/cuenta');
  }

  // In production, fetch user's orders from database/Shopify
  const userOrders = sampleOrders.filter(order => order.userId === session.user.id);
  const recentOrders = userOrders.slice(0, 3);
  
  // Calculate stats
  const totalSpent = userOrders.reduce((sum, order) => sum + order.total, 0);
  const totalDiscount = userOrders.reduce((sum, order) => sum + order.discount, 0);

  return (
    <MainLayout showParticles={false}>
      <div className="container mx-auto px-4 py-12">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Hola, <span className="text-neon-cyan">{session.user.name}</span>
          </h1>
          <p className="text-gray-400">
            Bienvenido a tu panel de control
          </p>
        </div>

        {/* Stats */}
        <div className="mb-12">
          <DashboardStats
            totalOrders={userOrders.length}
            totalSpent={totalSpent}
            discountPercentage={session.user.discountPercentage || 0}
            savedAmount={totalDiscount}
          />
        </div>

        {/* Loyalty Benefits */}
        {session.user.discountPercentage > 0 && (
          <Card className="mb-12 bg-gradient-to-r from-neon-pink/10 to-neon-cyan/10 border-neon-cyan/30">
            <div className="flex items-start space-x-4">
              <div className="p-3 glass rounded-lg">
                <Gift className="text-neon-pink" size={32} />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">
                  🎉 Ventaja Exclusiva Activa
                </h3>
                <p className="text-gray-300 mb-3">
                  Tienes un <span className="text-neon-pink font-bold">{session.user.discountPercentage}%</span> de descuento 
                  en todos tus pedidos. ¡Has ahorrado {totalDiscount.toFixed(2)}€ hasta ahora!
                </p>
                <p className="text-sm text-gray-400">
                  Este descuento se aplica automáticamente en todos los productos de la tienda.
                </p>
              </div>
            </div>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold mb-6">Accesos Rápidos</h2>
            <div className="space-y-4">
              <Link href="/cuenta/pedidos">
                <Card hover className="group">
                  <div className="flex items-center space-x-3">
                    <Package className="text-neon-cyan group-hover:text-neon-pink transition-colors" size={24} />
                    <div>
                      <h3 className="font-semibold">Mis Pedidos</h3>
                      <p className="text-sm text-gray-400">{userOrders.length} pedidos</p>
                    </div>
                  </div>
                </Card>
              </Link>

              <Link href="/cuenta/configuracion">
                <Card hover className="group">
                  <div className="flex items-center space-x-3">
                    <Settings className="text-neon-cyan group-hover:text-neon-pink transition-colors" size={24} />
                    <div>
                      <h3 className="font-semibold">Configuración</h3>
                      <p className="text-sm text-gray-400">Editar perfil</p>
                    </div>
                  </div>
                </Card>
              </Link>

              <Link href="/tienda">
                <Card hover className="group">
                  <div className="flex items-center space-x-3">
                    <Gift className="text-neon-cyan group-hover:text-neon-pink transition-colors" size={24} />
                    <div>
                      <h3 className="font-semibold">Tienda</h3>
                      <p className="text-sm text-gray-400">Explorar productos</p>
                    </div>
                  </div>
                </Card>
              </Link>

              <Card className="bg-neon-cyan/10 border-neon-cyan/30">
                <div className="text-center">
                  <p className="text-sm font-semibold text-neon-cyan mb-2">
                    ¿Necesitas ayuda?
                  </p>
                  <p className="text-xs text-gray-400 mb-3">
                    Contáctanos por WhatsApp
                  </p>
                  <a
                    href="https://wa.me/34657666741"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="sm" variant="outline" className="w-full">
                      Enviar mensaje
                    </Button>
                  </a>
                </div>
              </Card>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Pedidos Recientes</h2>
              {userOrders.length > 3 && (
                <Link
                  href="/cuenta/pedidos"
                  className="text-sm text-neon-cyan hover:text-neon-pink transition-colors"
                >
                  Ver todos →
                </Link>
              )}
            </div>

            {recentOrders.length > 0 ? (
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </div>
            ) : (
              <Card>
                <div className="text-center py-12">
                  <Package size={64} className="mx-auto text-gray-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    No tienes pedidos aún
                  </h3>
                  <p className="text-gray-400 mb-6">
                    Explora nuestra tienda y realiza tu primer pedido
                  </p>
                  <Link href="/tienda">
                    <Button variant="primary">
                      Ir a la tienda
                    </Button>
                  </Link>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
