'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingCart, User, Search } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useCartStore } from '@/lib/stores/cartStore';
import CartDrawer from '../ui/CartDrawer';
import { useSession, signOut } from 'next-auth/react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const { data: session } = useSession();
  const totalQuantity = useCartStore((state) => state.totalQuantity);
  const initializeCart = useCartStore((state) => state.initializeCart);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    initializeCart();
  }, [initializeCart]);

  const navigation = [
    { name: 'Inicio', href: '/' },
    { name: 'Tienda', href: '/tienda' },
    { name: 'Envía tu copia', href: '/personalizar' },
    { name: 'Servicios', href: '/servicios' },
    { name: 'Presupuesto', href: '/presupuesto' },
    { name: 'Contacto', href: '/contacto' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'glass py-3' : 'py-5'
      )}
    >
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <div className="absolute inset-0 bg-neon-pink blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
              <h1 className="relative text-2xl md:text-3xl font-bold">
                <span className="text-neon-pink">DEEE</span>
                <span className="text-neon-cyan"> TODO</span>
              </h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-foreground hover:text-neon-cyan transition-colors duration-200 font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            <button
              className="p-2 hover:text-neon-cyan transition-colors"
              aria-label="Buscar"
            >
              <Search size={20} />
            </button>

            <Link
              href="/carrito"
              onClick={(e) => {
                e.preventDefault();
                setIsCartOpen(true);
              }}
              className="p-2 hover:text-neon-cyan transition-colors relative"
              aria-label="Carrito"
            >
              <ShoppingCart size={20} />
              {totalQuantity > 0 && (
                <span className="absolute -top-1 -right-1 bg-neon-pink text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {totalQuantity}
                </span>
              )}
            </Link>

            <div className="relative">
              {session ? (
                <>
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="p-2 hover:text-neon-cyan transition-colors flex items-center space-x-2"
                    aria-label="Cuenta"
                  >
                    <User size={20} />
                    <span className="hidden md:inline text-sm">{session.user.name}</span>
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 glass rounded-lg border border-white/10 py-2 z-50">
                      <Link
                        href="/cuenta"
                        className="block px-4 py-2 hover:bg-dark-lighter transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Mi Cuenta
                      </Link>
                      <Link
                        href="/cuenta/pedidos"
                        className="block px-4 py-2 hover:bg-dark-lighter transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Mis Pedidos
                      </Link>
                      {session.user.role === 'admin' && (
                        <Link
                          href="/admin"
                          className="block px-4 py-2 hover:bg-dark-lighter transition-colors text-neon-pink"
                          onClick={() => setShowUserMenu(false)}
                        >
                          Panel Admin
                        </Link>
                      )}
                      <hr className="my-2 border-white/10" />
                      <button
                        onClick={() => {
                          signOut({ callbackUrl: '/' });
                          setShowUserMenu(false);
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-dark-lighter transition-colors text-red-400"
                      >
                        Cerrar Sesión
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href="/auth/login"
                  className="p-2 hover:text-neon-cyan transition-colors"
                  aria-label="Iniciar sesión"
                >
                  <User size={20} />
                </Link>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 hover:text-neon-cyan transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menú"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 glass rounded-lg p-4 space-y-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block py-2 text-foreground hover:text-neon-cyan transition-colors duration-200 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </nav>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
}
