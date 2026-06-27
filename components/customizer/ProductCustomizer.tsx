'use client';

import dynamic from 'next/dynamic';
import OrderSettingsPanel from './OrderSettingsPanel';
import SubmitPanel from './SubmitPanel';

// Dynamic import for Fabric.js (requires browser APIs)
const CanvasEditor = dynamic(() => import('./CanvasEditor'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-[600px] glass rounded-lg">
      <div className="text-center space-y-3">
        <div className="w-12 h-12 border-2 border-neon-cyan border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-gray-400 text-sm">Cargando editor...</p>
      </div>
    </div>
  ),
});

export default function ProductCustomizer() {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Canvas Editor - Main area */}
          <div className="lg:col-span-7 xl:col-span-8">
            <CanvasEditor />
          </div>

          {/* Right Panel - Settings + Submit */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-6">
            <OrderSettingsPanel />
            <SubmitPanel />
          </div>
        </div>
      </div>
    </section>
  );
}
