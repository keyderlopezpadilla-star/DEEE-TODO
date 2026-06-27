'use client';

import { 
  Ruler, 
  FileText, 
  BookOpen, 
  Copy, 
  StickyNote,
  Package
} from 'lucide-react';
import { useCustomizerStore } from '@/lib/stores/customizerStore';
import { cn } from '@/lib/utils/cn';

const SIZES = [
  { value: 'A3', label: 'A3 (297×420mm)', icon: '📐' },
  { value: 'A4', label: 'A4 (210×297mm)', icon: '📄' },
  { value: 'A5', label: 'A5 (148×210mm)', icon: '📋' },
  { value: 'custom', label: 'Personalizado', icon: '✏️' },
] as const;

const MATERIALS = [
  { value: 'estucado', label: 'Estucado', description: 'Brillo profesional' },
  { value: 'reciclado', label: 'Reciclado', description: 'Eco-friendly' },
  { value: 'fotografico', label: 'Fotográfico', description: 'Máxima calidad' },
  { value: 'dtf', label: 'DTF', description: 'Transfer textil' },
  { value: 'vinilo', label: 'Vinilo', description: 'Adhesivo duradero' },
] as const;

const BINDINGS = [
  { value: 'sin_encuadernacion', label: 'Sin encuadernación', icon: '📃' },
  { value: 'espiral', label: 'Espiral', icon: '🔗' },
  { value: 'encolado', label: 'Encolado', icon: '📖' },
  { value: 'grapado', label: 'Grapado', icon: '📌' },
] as const;

export default function OrderSettingsPanel() {
  const { orderSettings, setOrderSettings } = useCustomizerStore();

  return (
    <div className="glass rounded-lg p-6 space-y-6 h-fit lg:sticky lg:top-28">
      <div className="flex items-center gap-2 mb-2">
        <Package className="text-neon-pink" size={22} />
        <h2 className="text-lg font-bold text-foreground">Ajustes del Pedido</h2>
      </div>

      {/* Size Selection */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-foreground">
          <Ruler size={16} className="text-neon-cyan" />
          Tamaño
        </label>
        <div className="grid grid-cols-2 gap-2">
          {SIZES.map((size) => (
            <button
              key={size.value}
              onClick={() => setOrderSettings({ size: size.value })}
              className={cn(
                'flex items-center gap-2 px-3 py-2.5 rounded-md border text-sm transition-all text-left',
                orderSettings.size === size.value
                  ? 'border-neon-cyan bg-neon-cyan/10 text-neon-cyan'
                  : 'border-dark-accent hover:border-neon-cyan/50 text-gray-400 hover:text-foreground'
              )}
            >
              <span>{size.icon}</span>
              <span className="font-medium">{size.label}</span>
            </button>
          ))}
        </div>
        
        {/* Custom size inputs */}
        {orderSettings.size === 'custom' && (
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Ancho (mm)</label>
              <input
                type="number"
                value={orderSettings.customWidth || ''}
                onChange={(e) => setOrderSettings({ customWidth: parseInt(e.target.value) || undefined })}
                placeholder="Ancho"
                min={10}
                max={1000}
                className="w-full px-3 py-2 rounded-md bg-dark-lighter border border-dark-accent text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-neon-cyan"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Alto (mm)</label>
              <input
                type="number"
                value={orderSettings.customHeight || ''}
                onChange={(e) => setOrderSettings({ customHeight: parseInt(e.target.value) || undefined })}
                placeholder="Alto"
                min={10}
                max={1000}
                className="w-full px-3 py-2 rounded-md bg-dark-lighter border border-dark-accent text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-neon-cyan"
              />
            </div>
          </div>
        )}
      </div>

      {/* Material Selection */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-foreground">
          <FileText size={16} className="text-neon-cyan" />
          Material / Papel
        </label>
        <div className="space-y-1.5">
          {MATERIALS.map((material) => (
            <button
              key={material.value}
              onClick={() => setOrderSettings({ material: material.value })}
              className={cn(
                'w-full flex items-center justify-between px-3 py-2.5 rounded-md border text-sm transition-all',
                orderSettings.material === material.value
                  ? 'border-neon-cyan bg-neon-cyan/10 text-neon-cyan'
                  : 'border-dark-accent hover:border-neon-cyan/50 text-gray-400 hover:text-foreground'
              )}
            >
              <span className="font-medium">{material.label}</span>
              <span className="text-xs opacity-70">{material.description}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Binding Selection */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-foreground">
          <BookOpen size={16} className="text-neon-cyan" />
          Encuadernación
        </label>
        <div className="grid grid-cols-2 gap-2">
          {BINDINGS.map((binding) => (
            <button
              key={binding.value}
              onClick={() => setOrderSettings({ binding: binding.value })}
              className={cn(
                'flex items-center gap-2 px-3 py-2.5 rounded-md border text-sm transition-all',
                orderSettings.binding === binding.value
                  ? 'border-neon-cyan bg-neon-cyan/10 text-neon-cyan'
                  : 'border-dark-accent hover:border-neon-cyan/50 text-gray-400 hover:text-foreground'
              )}
            >
              <span>{binding.icon}</span>
              <span className="font-medium">{binding.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Quantity */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-foreground">
          <Copy size={16} className="text-neon-cyan" />
          Cantidad de copias
        </label>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setOrderSettings({ copies: Math.max(1, orderSettings.copies - 1) })}
            className="w-10 h-10 rounded-md border border-dark-accent hover:border-neon-cyan text-foreground hover:text-neon-cyan flex items-center justify-center text-lg font-bold transition-all"
          >
            −
          </button>
          <input
            type="number"
            value={orderSettings.copies}
            onChange={(e) => setOrderSettings({ copies: Math.max(1, parseInt(e.target.value) || 1) })}
            min={1}
            max={9999}
            className="w-20 text-center px-3 py-2 rounded-md bg-dark-lighter border border-dark-accent text-foreground text-lg font-bold focus:outline-none focus:ring-2 focus:ring-neon-cyan"
          />
          <button
            onClick={() => setOrderSettings({ copies: Math.min(9999, orderSettings.copies + 1) })}
            className="w-10 h-10 rounded-md border border-dark-accent hover:border-neon-cyan text-foreground hover:text-neon-cyan flex items-center justify-center text-lg font-bold transition-all"
          >
            +
          </button>
        </div>
      </div>

      {/* Notes */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-foreground">
          <StickyNote size={16} className="text-neon-cyan" />
          Notas adicionales
        </label>
        <textarea
          value={orderSettings.notes}
          onChange={(e) => setOrderSettings({ notes: e.target.value })}
          placeholder="Instrucciones especiales, acabados, urgencia..."
          rows={3}
          className="w-full px-3 py-2 rounded-md bg-dark-lighter border border-dark-accent text-foreground placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-neon-cyan resize-none"
        />
      </div>
    </div>
  );
}
