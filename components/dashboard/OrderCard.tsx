import { Order } from '@/lib/types';
import Card from '../ui/Card';
import { Package, Truck, CheckCircle, Clock, XCircle, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface OrderCardProps {
  order: Order;
}

const statusConfig = {
  pending: {
    label: 'Pendiente',
    icon: Clock,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
  },
  processing: {
    label: 'En proceso',
    icon: Package,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  shipped: {
    label: 'Enviado',
    icon: Truck,
    color: 'text-neon-cyan',
    bgColor: 'bg-neon-cyan/10',
  },
  delivered: {
    label: 'Entregado',
    icon: CheckCircle,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
  },
  cancelled: {
    label: 'Cancelado',
    icon: XCircle,
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
  },
};

export default function OrderCard({ order }: OrderCardProps) {
  const status = statusConfig[order.status];
  const StatusIcon = status.icon;

  return (
    <Card hover className="group">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-bold text-lg group-hover:text-neon-cyan transition-colors">
              Pedido #{order.orderNumber}
            </h3>
            <p className="text-sm text-gray-400">
              {new Date(order.createdAt).toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>
          </div>
          
          <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${status.bgColor}`}>
            <StatusIcon size={16} className={status.color} />
            <span className={`text-sm font-medium ${status.color}`}>
              {status.label}
            </span>
          </div>
        </div>

        {/* Items Preview */}
        <div className="space-y-2">
          {order.items.slice(0, 2).map((item) => (
            <div key={item.id} className="flex items-center space-x-3">
              <div className="relative w-12 h-12 flex-shrink-0 rounded bg-dark-lighter overflow-hidden">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Package className="text-gray-600" size={20} />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{item.title}</p>
                <p className="text-xs text-gray-400">
                  Cantidad: {item.quantity} × {item.price.toFixed(2)}€
                </p>
              </div>
            </div>
          ))}
          {order.items.length > 2 && (
            <p className="text-xs text-gray-500 pl-15">
              +{order.items.length - 2} artículo(s) más
            </p>
          )}
        </div>

        {/* Tracking Info */}
        {order.trackingNumber && order.status === 'shipped' && (
          <div className="glass rounded-lg p-3">
            <p className="text-xs text-gray-400 mb-1">Número de seguimiento</p>
            <p className="text-sm font-mono text-neon-cyan">{order.trackingNumber}</p>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div>
            <p className="text-xs text-gray-400">Total</p>
            <p className="text-xl font-bold text-neon-cyan">{order.total.toFixed(2)}€</p>
          </div>
          
          <Link
            href={`/cuenta/pedidos/${order.id}`}
            className="flex items-center space-x-1 text-sm text-neon-cyan hover:text-neon-pink transition-colors"
          >
            <span>Ver detalles</span>
            <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    </Card>
  );
}
