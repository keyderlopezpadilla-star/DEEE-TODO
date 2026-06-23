'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  Settings, 
  FileText,
  Clock,
  TrendingUp
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';

const menuItems = [
  {
    label: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    label: 'Usuarios',
    href: '/admin/usuarios',
    icon: Users,
  },
  {
    label: 'Pedidos',
    href: '/admin/pedidos',
    icon: Package,
  },
  {
    label: 'Contenido',
    href: '/admin/contenido',
    icon: FileText,
  },
  {
    label: 'Horarios',
    href: '/admin/horarios',
    icon: Clock,
  },
  {
    label: 'Configuración',
    href: '/admin/configuracion',
    icon: Settings,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 glass border-r border-white/10 min-h-screen p-6">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold">
          <span className="text-neon-pink">Admin</span>
          <span className="text-neon-cyan"> Panel</span>
        </h2>
        <p className="text-sm text-gray-400 mt-1">Panel de control</p>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200',
                isActive
                  ? 'bg-neon-cyan text-dark font-semibold'
                  : 'text-foreground hover:bg-dark-lighter'
              )}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Back to Site */}
      <div className="mt-8 pt-8 border-t border-white/10">
        <Link
          href="/"
          className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-400 hover:text-foreground hover:bg-dark-lighter transition-all"
        >
          <TrendingUp size={20} />
          <span>Ver sitio web</span>
        </Link>
      </div>
    </aside>
  );
}
