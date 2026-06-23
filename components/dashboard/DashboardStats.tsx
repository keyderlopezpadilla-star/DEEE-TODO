import { ShoppingBag, TrendingUp, Gift, Award } from 'lucide-react';
import Card from '../ui/Card';

interface DashboardStatsProps {
  totalOrders: number;
  totalSpent: number;
  discountPercentage: number;
  savedAmount: number;
}

export default function DashboardStats({
  totalOrders,
  totalSpent,
  discountPercentage,
  savedAmount,
}: DashboardStatsProps) {
  const stats = [
    {
      label: 'Pedidos totales',
      value: totalOrders,
      icon: ShoppingBag,
      color: 'text-neon-cyan',
      bgColor: 'bg-neon-cyan/10',
    },
    {
      label: 'Total gastado',
      value: `${totalSpent.toFixed(2)}€`,
      icon: TrendingUp,
      color: 'text-neon-pink',
      bgColor: 'bg-neon-pink/10',
    },
    {
      label: 'Tu descuento',
      value: `${discountPercentage}%`,
      icon: Gift,
      color: 'text-neon-cyan',
      bgColor: 'bg-neon-cyan/10',
    },
    {
      label: 'Ahorro total',
      value: `${savedAmount.toFixed(2)}€`,
      icon: Award,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} hover>
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <Icon size={24} className={stat.color} />
              </div>
              <div>
                <p className="text-sm text-gray-400">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
