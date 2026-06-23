import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth.config';
import MainLayout from '@/components/layout/MainLayout';
import OrderCard from '@/components/dashboard/OrderCard';
import { Package } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { sampleOrders } from '@/lib/data/sampleOrders';

export const metadata: Metadata = {
  title: 'Mis Pedidos - DEEE TODO',
  description: 'Consulta el historial completo de tus pedidos y su estado de envío.',
};

export default async function OrdersPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/login?callbackUrl=/cuenta/pedidos');
  }

  // In production, fetch from database/Shopify
  const userOrders = sampleOrders.filter(order => order.userId === session.user.id);

  return (
    <MainLayout showParticles={false}>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link href="/cuenta" className="text-neon-cyan hover:text-neon-pink transition-colors text-sm mb-2 inline-block">
            ← Volver a Mi Cuenta
          </Link>
          <h1 className="text-4xl font-bold mb-2">Mis Pedidos</h1>
          <p className="text-gray-400">
            Historial completo de tus pedidos y su estado
          </p>
        </div>

        {/* Orders List */}
        {userOrders.length > 0 ? (
          <>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-gray-400">
                <span className="text-neon-cyan font-semibold">{userOrders.length}</span> pedido(s) en total
              </p>
            </div>

            <div className="space-y-4">
              {userOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          </>
        ) : (
          <Card>
            <div className="text-center py-16">
              <Package size={80} className="mx-auto text-gray-600 mb-6" />
              <h2 className="text-2xl font-bold mb-3">
                No tienes pedidos aún
              </h2>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                Explora nuestra tienda y descubre productos únicos para ti o para regalar
              </p>
              <Link href="/tienda">
                <Button variant="primary" size="lg">
                  Explorar Tienda
                </Button>
              </Link>
            </div>
          </Card>
        )}
      </div>
    </MainLayout>
  );
}
