import { Metadata } from 'next';
import MainLayout from '@/components/layout/MainLayout';
import RegisterForm from '@/components/auth/RegisterForm';

export const metadata: Metadata = {
  title: 'Crear Cuenta - DEEE TODO',
  description: 'Crea tu cuenta en DEEE TODO y disfruta de ventajas exclusivas, descuentos personalizados y gestión de pedidos.',
};

export default function RegisterPage() {
  return (
    <MainLayout showParticles={true}>
      <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <RegisterForm />
      </div>
    </MainLayout>
  );
}
