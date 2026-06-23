'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { LogIn, Mail, Lock } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Link from 'next/link';

export default function LoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
        setIsLoading(false);
        return;
      }

      if (result?.ok) {
        router.push('/cuenta');
        router.refresh();
      }
    } catch (error) {
      setError('Error al iniciar sesión. Por favor, intenta de nuevo.');
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Card className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full glass mb-4">
          <LogIn className="text-neon-cyan" size={32} />
        </div>
        <h2 className="text-3xl font-bold mb-2">Iniciar Sesión</h2>
        <p className="text-gray-400">
          Accede a tu cuenta para gestionar tus pedidos
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/50 text-red-500">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full pl-12 pr-4 py-3 rounded-lg bg-dark-lighter border border-dark-accent text-foreground placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:border-transparent"
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full pl-12 pr-4 py-3 rounded-lg bg-dark-lighter border border-dark-accent text-foreground placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:border-transparent"
          />
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 text-neon-pink focus:ring-neon-cyan rounded"
            />
            <span className="text-gray-400">Recordarme</span>
          </label>
          <Link
            href="/auth/recuperar"
            className="text-neon-cyan hover:text-neon-pink transition-colors"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          isLoading={isLoading}
        >
          Iniciar Sesión
        </Button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-dark-lighter text-gray-400">o</span>
          </div>
        </div>

        <p className="text-center text-gray-400">
          ¿No tienes cuenta?{' '}
          <Link
            href="/auth/registro"
            className="text-neon-cyan hover:text-neon-pink transition-colors font-semibold"
          >
            Regístrate aquí
          </Link>
        </p>
      </form>

      {/* Demo credentials info */}
      <div className="mt-6 p-4 rounded-lg bg-neon-cyan/10 border border-neon-cyan/30">
        <p className="text-xs text-gray-400 mb-2">
          <strong className="text-neon-cyan">Demo:</strong> Usa estas credenciales para probar:
        </p>
        <p className="text-xs text-gray-400">
          Email: <code className="text-neon-pink">cliente@example.com</code>
          <br />
          Password: <code className="text-neon-pink">demo123</code>
        </p>
      </div>
    </Card>
  );
}
