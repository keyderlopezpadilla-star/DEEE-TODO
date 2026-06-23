'use client';

import { useEffect, useState } from 'react';
import { useCookieConsentStore } from '@/lib/stores/cookieConsentStore';
import Button from './Button';
import Card from './Card';
import { Cookie, X, Settings } from 'lucide-react';
import Link from 'next/link';

export default function CookieConsent() {
  const { hasConsented, showBanner, consent, acceptAll, rejectAll, setConsent, hideBanner } = useCookieConsentStore();
  const [showSettings, setShowSettings] = useState(false);
  const [customConsent, setCustomConsent] = useState(consent);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't show banner if user has already consented or on server
  if (!mounted || !showBanner || hasConsented) {
    return null;
  }

  const handleAcceptAll = () => {
    acceptAll();
    // In production, initialize analytics/marketing scripts here
  };

  const handleRejectAll = () => {
    rejectAll();
  };

  const handleSavePreferences = () => {
    setConsent(customConsent);
    setShowSettings(false);
    // In production, conditionally initialize scripts based on consent
  };

  const toggleConsent = (key: keyof typeof customConsent) => {
    if (key === 'necessary') return; // Can't disable necessary cookies
    setCustomConsent(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <Card className="max-w-4xl mx-auto shadow-2xl border-neon-cyan/30">
        {!showSettings ? (
          /* Main Banner */
          <div>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-3">
                <div className="p-2 glass rounded-lg">
                  <Cookie className="text-neon-pink" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    🍪 Utilizamos cookies
                  </h3>
                  <p className="text-sm text-gray-400">
                    Usamos cookies para mejorar tu experiencia en nuestro sitio web, 
                    personalizar contenido y analizar nuestro tráfico. Al hacer clic en 
                    "Aceptar todas", consientes el uso de todas las cookies.
                  </p>
                </div>
              </div>
              <button
                onClick={hideBanner}
                className="p-2 hover:bg-dark-lighter rounded-lg transition-colors flex-shrink-0"
                aria-label="Cerrar"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
              <Link
                href="/legal/privacidad"
                className="text-sm text-neon-cyan hover:text-neon-pink transition-colors"
              >
                Leer nuestra Política de Privacidad →
              </Link>

              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSettings(true)}
                >
                  <Settings size={16} className="mr-2" />
                  Configurar
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRejectAll}
                >
                  Rechazar todas
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleAcceptAll}
                >
                  Aceptar todas
                </Button>
              </div>
            </div>
          </div>
        ) : (
          /* Settings Panel */
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold flex items-center">
                <Settings className="text-neon-cyan mr-2" size={24} />
                Configuración de Cookies
              </h3>
              <button
                onClick={() => setShowSettings(false)}
                className="p-2 hover:bg-dark-lighter rounded-lg transition-colors"
                aria-label="Volver"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              {/* Necessary Cookies */}
              <div className="glass rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-semibold">Cookies Necesarias</h4>
                    <p className="text-xs text-gray-400 mt-1">
                      Esenciales para el funcionamiento del sitio web
                    </p>
                  </div>
                  <div className="px-3 py-1 bg-neon-cyan/20 text-neon-cyan rounded-full text-xs font-semibold">
                    Siempre activas
                  </div>
                </div>
                <p className="text-sm text-gray-400">
                  Estas cookies son necesarias para que el sitio funcione correctamente 
                  y no se pueden desactivar.
                </p>
              </div>

              {/* Analytics Cookies */}
              <div className="glass rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-semibold">Cookies Analíticas</h4>
                    <p className="text-xs text-gray-400 mt-1">
                      Nos ayudan a entender cómo usas el sitio
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={customConsent.analytics}
                      onChange={() => toggleConsent('analytics')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-dark-accent rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon-cyan"></div>
                  </label>
                </div>
                <p className="text-sm text-gray-400">
                  Usamos Google Analytics para comprender cómo los visitantes interactúan 
                  con nuestro sitio.
                </p>
              </div>

              {/* Marketing Cookies */}
              <div className="glass rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-semibold">Cookies de Marketing</h4>
                    <p className="text-xs text-gray-400 mt-1">
                      Para mostrarte contenido relevante
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={customConsent.marketing}
                      onChange={() => toggleConsent('marketing')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-dark-accent rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon-cyan"></div>
                  </label>
                </div>
                <p className="text-sm text-gray-400">
                  Utilizadas para personalizar anuncios y medir la efectividad de 
                  nuestras campañas.
                </p>
              </div>

              {/* Preference Cookies */}
              <div className="glass rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-semibold">Cookies de Preferencias</h4>
                    <p className="text-xs text-gray-400 mt-1">
                      Recuerdan tus preferencias
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={customConsent.preferences}
                      onChange={() => toggleConsent('preferences')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-dark-accent rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon-cyan"></div>
                  </label>
                </div>
                <p className="text-sm text-gray-400">
                  Guardan tus preferencias como idioma, región o configuración de 
                  visualización.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowSettings(false)}
              >
                Cancelar
              </Button>
              <Button
                variant="primary"
                className="flex-1"
                onClick={handleSavePreferences}
              >
                Guardar Preferencias
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
