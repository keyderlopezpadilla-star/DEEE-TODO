import { Metadata } from 'next';
import MainLayout from '@/components/layout/MainLayout';
import LoginForm from '@/components/auth/LoginForm';

export const metadata: Metadata = {
  title: 'Iniciar Sesión - DEEE TODO',
  description: 'Inicia sesión en tu cuenta de DEEE TODO para gestionar tus pedidos y acceder a ventajas exclusivas.',
};

export default function LoginPage() {
  return (
    <MainLayout showParticles={true}>
      <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <LoginForm />
      </div>
    </MainLayout>
  );
}
