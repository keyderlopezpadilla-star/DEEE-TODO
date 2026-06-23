'use client';

import { useEffect } from 'react';
import { X, ShoppingBag, Trash2, Plus, Minus, ExternalLink } from 'lucide-react';
import { useCartStore } from '@/lib/stores/cartStore';
import Button from './Button';
import Image from 'next/image';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const {
    items,
    totalQuantity,
    totalAmount,
    checkoutUrl,
    isLoading,
    updateItemQuantity,
    removeItem,
    initializeCart,
  } = useCartStore();

  useEffect(() => {
    initializeCart();
  }, [initializeCart]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-96 glass border-l border-white/10 z-50 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="text-neon-cyan" size={24} />
            <h2 className="text-xl font-bold">
              Carrito{' '}
              {totalQuantity > 0 && (
                <span className="text-neon-pink">({totalQuantity})</span>
              )}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-dark-lighter rounded-lg transition-colors"
            aria-label="Cerrar carrito"
          >
            <X size={24} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag size={64} className="text-gray-600 mb-4" />
              <p className="text-gray-400 mb-2">Tu carrito está vacío</p>
              <p className="text-sm text-gray-500">
                Añade productos para comenzar tu compra
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="glass rounded-lg p-4">
                  <div className="flex space-x-4">
                    {/* Product Image */}
                    <div className="relative w-20 h-20 flex-shrink-0 rounded-lg bg-dark-lighter overflow-hidden">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ShoppingBag className="text-gray-600" size={24} />
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm line-clamp-2 mb-1">
                        {item.title}
                      </h3>
                      {item.variantTitle && item.variantTitle !== 'Default Title' && (
                        <p className="text-xs text-gray-400 mb-2">
                          {item.variantTitle}
                        </p>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-neon-cyan font-bold">
                          {item.price.toFixed(2)}€
                        </span>

                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                            disabled={isLoading}
                            className="p-1 glass rounded hover:bg-dark-lighter transition-colors disabled:opacity-50"
                            aria-label="Disminuir cantidad"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-8 text-center font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                            disabled={isLoading}
                            className="p-1 glass rounded hover:bg-dark-lighter transition-colors disabled:opacity-50"
                            aria-label="Aumentar cantidad"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.id)}
                      disabled={isLoading}
                      className="p-2 hover:text-red-500 transition-colors disabled:opacity-50"
                      aria-label="Eliminar producto"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-white/10 p-6 space-y-4">
            {/* Subtotal */}
            <div className="flex items-center justify-between text-lg">
              <span className="font-semibold">Total</span>
              <span className="text-2xl font-bold text-neon-cyan">
                {totalAmount.toFixed(2)}€
              </span>
            </div>

            {/* Checkout Button */}
            {checkoutUrl && (
              <a
                href={checkoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={isLoading}
                >
                  Ir a pagar
                  <ExternalLink size={18} className="ml-2" />
                </Button>
              </a>
            )}

            <p className="text-xs text-center text-gray-500">
              Serás redirigido a Shopify para completar tu compra de forma segura
            </p>
          </div>
        )}
      </div>
    </>
  );
}
