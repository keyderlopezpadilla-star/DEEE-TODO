import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth.config';
import MainLayout from '@/components/layout/MainLayout';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { User, Mail, Phone, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Configuración - DEEE TODO',
  description: 'Gestiona la configuración de tu cuenta y preferencias.',
};

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/login?callbackUrl=/cuenta/configuracion');
  }

  return (
    <MainLayout showParticles={false}>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/cuenta" className="text-neon-cyan hover:text-neon-pink transition-colors text-sm mb-2 inline-block">
            ← Volver a Mi Cuenta
          </Link>
          <h1 className="text-4xl font-bold mb-2">Configuración</h1>
          <p className="text-gray-400">
            Gestiona la información de tu cuenta
          </p>
        </div>

        <div className="space-y-6">
          {/* Personal Information */}
          <Card>
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 glass rounded-lg">
                <User className="text-neon-cyan" size={24} />
              </div>
              <h2 className="text-2xl font-bold">Información Personal</h2>
            </div>

            <form className="space-y-4">
              <Input
                label="Nombre completo"
                defaultValue={session.user.name}
                placeholder="Tu nombre"
              />
              <Input
                label="Email"
                type="email"
                defaultValue={session.user.email}
                placeholder="tu@email.com"
                disabled
              />
              <Input
                label="Teléfono"
                type="tel"
                defaultValue="657 66 67 41"
                placeholder="Teléfono"
              />

              <Button type="submit" variant="primary">
                Guardar cambios
              </Button>
            </form>
          </Card>

          {/* Security */}
          <Card>
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 glass rounded-lg">
                <Shield className="text-neon-pink" size={24} />
              </div>
              <h2 className="text-2xl font-bold">Seguridad</h2>
            </div>

            <div className="space-y-4">
              <div className="glass rounded-lg p-4">
                <p className="text-sm text-gray-400 mb-2">Contraseña</p>
                <p className="text-sm mb-4">••••••••</p>
                <Button variant="outline" size="sm">
                  Cambiar contraseña
                </Button>
              </div>

              <div className="glass rounded-lg p-4">
                <p className="text-sm text-gray-400 mb-2">Autenticación de dos factores</p>
                <p className="text-sm text-gray-500 mb-4">
                  Añade una capa extra de seguridad a tu cuenta
                </p>
                <Button variant="outline" size="sm" disabled>
                  Activar 2FA (Próximamente)
                </Button>
              </div>
            </div>
          </Card>

          {/* Loyalty Program Info */}
          {session.user.discountPercentage > 0 && (
            <Card className="bg-gradient-to-r from-neon-pink/10 to-neon-cyan/10 border-neon-cyan/30">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 glass rounded-lg">
                  <Mail className="text-neon-cyan" size={24} />
                </div>
                <h2 className="text-2xl font-bold">Programa de Fidelización</h2>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Tu nivel de descuento</span>
                  <span className="text-2xl font-bold text-neon-pink">
                    {session.user.discountPercentage}%
                  </span>
                </div>
                <p className="text-sm text-gray-400">
                  Este descuento se aplica automáticamente en todos tus pedidos.
                  Sigue comprando para mantener tus ventajas.
                </p>
              </div>
            </Card>
          )}

          {/* Account Actions */}
          <Card className="border-red-500/30">
            <h2 className="text-xl font-bold mb-4 text-red-400">Zona de Peligro</h2>
            <p className="text-sm text-gray-400 mb-4">
              Estas acciones son irreversibles. Por favor, procede con precaución.
            </p>
            <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-500/10">
              Eliminar cuenta
            </Button>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
