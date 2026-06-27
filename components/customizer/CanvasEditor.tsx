'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { Canvas as FabricCanvas, FabricText, FabricImage, Rect } from 'fabric';
import {
  Type,
  ImagePlus,
  Palette,
  Trash2,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Move,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight
} from 'lucide-react';
import { useCustomizerStore } from '@/lib/stores/customizerStore';
import { cn } from '@/lib/utils/cn';

const FONTS = [
  'Arial',
  'Georgia',
  'Courier New',
  'Impact',
  'Comic Sans MS',
  'Verdana',
  'Times New Roman',
  'Helvetica',
  'Trebuchet MS',
  'Palatino',
];

const PRESET_COLORS = [
  '#ffffff', '#000000', '#ff007a', '#00f0ff', '#b300ff', '#00ff88',
  '#ff6b35', '#ffd700', '#ff1744', '#2979ff', '#00e676', '#ff9100',
  '#e91e63', '#9c27b0', '#3f51b5', '#009688', '#795548', '#607d8b',
];

export default function CanvasEditor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fabricRef = useRef<FabricCanvas | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { backgroundColor, setBackgroundColor, setCanvasDataUrl, addUploadedFile } = useCustomizerStore();

  const [activeTab, setActiveTab] = useState<'text' | 'image' | 'background'>('text');
  const [textOptions, setTextOptions] = useState({
    text: '',
    font: 'Arial',
    color: '#ffffff',
    size: 28,
    bold: false,
    italic: false,
    underline: false,
    align: 'left' as 'left' | 'center' | 'right',
  });
  const [canvasReady, setCanvasReady] = useState(false);

  // Initialize Fabric.js canvas
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    // Calculate responsive canvas size
    const containerWidth = containerRef.current.clientWidth - 32; // padding
    const canvasWidth = Math.min(containerWidth, 560);
    const canvasHeight = Math.round(canvasWidth * 1.2); // ~A4 proportion

    const canvas = new FabricCanvas(canvasRef.current, {
      width: canvasWidth,
      height: canvasHeight,
      backgroundColor: backgroundColor,
      selection: true,
      preserveObjectStacking: true,
    });

    fabricRef.current = canvas;
    setCanvasReady(true);

    // Update canvas data URL on changes
    const handleChange = () => exportCanvas();
    canvas.on('object:modified', handleChange);
    canvas.on('object:added', handleChange);
    canvas.on('object:removed', handleChange);

    // Keyboard shortcut for delete
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
          deleteSelected();
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      canvas.dispose();
      fabricRef.current = null;
      setCanvasReady(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update background color
  useEffect(() => {
    if (fabricRef.current) {
      fabricRef.current.backgroundColor = backgroundColor;
      fabricRef.current.renderAll();
      exportCanvas();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [backgroundColor]);

  const exportCanvas = useCallback(() => {
    if (fabricRef.current) {
      const dataUrl = fabricRef.current.toDataURL({
        format: 'png',
        quality: 1,
        multiplier: 2,
      });
      setCanvasDataUrl(dataUrl);
    }
  }, [setCanvasDataUrl]);

  const addText = () => {
    if (!fabricRef.current || !textOptions.text.trim()) return;

    const text = new FabricText(textOptions.text, {
      left: 50,
      top: 50,
      fontFamily: textOptions.font,
      fill: textOptions.color,
      fontSize: textOptions.size,
      fontWeight: textOptions.bold ? 'bold' : 'normal',
      fontStyle: textOptions.italic ? 'italic' : 'normal',
      underline: textOptions.underline,
      textAlign: textOptions.align,
    });

    fabricRef.current.add(text);
    fabricRef.current.setActiveObject(text);
    fabricRef.current.renderAll();
    setTextOptions((prev) => ({ ...prev, text: '' }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !fabricRef.current) return;

    Array.from(files).forEach((file) => {
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert(`El archivo "${file.name}" excede los 10MB.`);
        return;
      }

      addUploadedFile(file);

      const reader = new FileReader();
      reader.onload = (event) => {
        const imgElement = new Image();
        imgElement.onload = () => {
          const fabricImage = new FabricImage(imgElement, {
            left: 50 + Math.random() * 50,
            top: 50 + Math.random() * 50,
          });

          // Scale image to fit within canvas
          const canvas = fabricRef.current!;
          const maxWidth = canvas.width! * 0.7;
          const maxHeight = canvas.height! * 0.7;
          const scaleX = maxWidth / imgElement.width;
          const scaleY = maxHeight / imgElement.height;
          const scale = Math.min(scaleX, scaleY, 1);

          fabricImage.scaleX = scale;
          fabricImage.scaleY = scale;

          canvas.add(fabricImage);
          canvas.setActiveObject(fabricImage);
          canvas.renderAll();
        };
        imgElement.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    });

    // Reset input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    if (!files || !fabricRef.current) return;

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith('image/')) return;
      if (file.size > 10 * 1024 * 1024) return;

      addUploadedFile(file);

      const reader = new FileReader();
      reader.onload = (event) => {
        const imgElement = new Image();
        imgElement.onload = () => {
          const fabricImage = new FabricImage(imgElement, {
            left: 80,
            top: 80,
          });

          const canvas = fabricRef.current!;
          const maxWidth = canvas.width! * 0.7;
          const maxHeight = canvas.height! * 0.7;
          const scaleX = maxWidth / imgElement.width;
          const scaleY = maxHeight / imgElement.height;
          const scale = Math.min(scaleX, scaleY, 1);

          fabricImage.scaleX = scale;
          fabricImage.scaleY = scale;

          canvas.add(fabricImage);
          canvas.setActiveObject(fabricImage);
          canvas.renderAll();
        };
        imgElement.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  const deleteSelected = () => {
    if (!fabricRef.current) return;
    const activeObjects = fabricRef.current.getActiveObjects();
    if (activeObjects.length > 0) {
      activeObjects.forEach((obj) => fabricRef.current!.remove(obj));
      fabricRef.current.discardActiveObject();
      fabricRef.current.renderAll();
    }
  };

  const clearCanvas = () => {
    if (!fabricRef.current) return;
    if (!confirm('¿Limpiar todo el lienzo? Esta acción no se puede deshacer.')) return;
    fabricRef.current.clear();
    fabricRef.current.backgroundColor = backgroundColor;
    fabricRef.current.renderAll();
    exportCanvas();
  };

  const zoomIn = () => {
    if (!fabricRef.current) return;
    const zoom = fabricRef.current.getZoom();
    fabricRef.current.setZoom(Math.min(zoom * 1.2, 3));
  };

  const zoomOut = () => {
    if (!fabricRef.current) return;
    const zoom = fabricRef.current.getZoom();
    fabricRef.current.setZoom(Math.max(zoom / 1.2, 0.5));
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Toolbar */}
      <div className="glass rounded-lg p-3 flex items-center gap-2 flex-wrap">
        {/* Tab buttons */}
        <button
          onClick={() => setActiveTab('text')}
          className={cn(
            'flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-all',
            activeTab === 'text'
              ? 'bg-neon-cyan text-dark'
              : 'hover:bg-dark-lighter text-gray-400'
          )}
        >
          <Type size={16} /> Texto
        </button>
        <button
          onClick={() => setActiveTab('image')}
          className={cn(
            'flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-all',
            activeTab === 'image'
              ? 'bg-neon-cyan text-dark'
              : 'hover:bg-dark-lighter text-gray-400'
          )}
        >
          <ImagePlus size={16} /> Imagen
        </button>
        <button
          onClick={() => setActiveTab('background')}
          className={cn(
            'flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-all',
            activeTab === 'background'
              ? 'bg-neon-cyan text-dark'
              : 'hover:bg-dark-lighter text-gray-400'
          )}
        >
          <Palette size={16} /> Fondo
        </button>

        <div className="flex-1" />

        {/* Action buttons */}
        <button
          onClick={zoomIn}
          className="p-2 rounded-md hover:bg-dark-lighter text-gray-400 hover:text-neon-cyan transition-all"
          title="Acercar"
        >
          <ZoomIn size={18} />
        </button>
        <button
          onClick={zoomOut}
          className="p-2 rounded-md hover:bg-dark-lighter text-gray-400 hover:text-neon-cyan transition-all"
          title="Alejar"
        >
          <ZoomOut size={18} />
        </button>
        <button
          onClick={deleteSelected}
          className="p-2 rounded-md hover:bg-dark-lighter text-gray-400 hover:text-red-400 transition-all"
          title="Eliminar seleccionado (Supr)"
        >
          <Trash2 size={18} />
        </button>
        <button
          onClick={clearCanvas}
          className="p-2 rounded-md hover:bg-dark-lighter text-gray-400 hover:text-red-400 transition-all"
          title="Limpiar lienzo"
        >
          <RotateCcw size={18} />
        </button>
      </div>

      {/* Tool Panel */}
      <div className="glass rounded-lg p-4">
        {activeTab === 'text' && (
          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={textOptions.text}
                onChange={(e) => setTextOptions((prev) => ({ ...prev, text: e.target.value }))}
                onKeyDown={(e) => e.key === 'Enter' && addText()}
                placeholder="Escribe tu texto aquí..."
                className="flex-1 px-3 py-2 rounded-md bg-dark-lighter border border-dark-accent text-foreground placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neon-cyan text-sm"
              />
              <button
                onClick={addText}
                disabled={!textOptions.text.trim()}
                className="px-4 py-2 rounded-md bg-neon-cyan text-dark font-medium text-sm hover:bg-neon-cyan/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Añadir
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <select
                value={textOptions.font}
                onChange={(e) => setTextOptions((prev) => ({ ...prev, font: e.target.value }))}
                className="px-3 py-2 rounded-md bg-dark-lighter border border-dark-accent text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-neon-cyan"
              >
                {FONTS.map((font) => (
                  <option key={font} value={font} style={{ fontFamily: font }}>
                    {font}
                  </option>
                ))}
              </select>

              <div className="flex items-center gap-1">
                <label className="text-xs text-gray-500 whitespace-nowrap">Tam:</label>
                <input
                  type="number"
                  value={textOptions.size}
                  onChange={(e) => setTextOptions((prev) => ({ ...prev, size: parseInt(e.target.value) || 24 }))}
                  min={8}
                  max={200}
                  className="w-full px-3 py-2 rounded-md bg-dark-lighter border border-dark-accent text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-neon-cyan"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setTextOptions((prev) => ({ ...prev, bold: !prev.bold }))}
                className={cn(
                  'p-2 rounded-md transition-all',
                  textOptions.bold ? 'bg-neon-cyan text-dark' : 'hover:bg-dark-lighter text-gray-400'
                )}
                title="Negrita"
              >
                <Bold size={16} />
              </button>
              <button
                onClick={() => setTextOptions((prev) => ({ ...prev, italic: !prev.italic }))}
                className={cn(
                  'p-2 rounded-md transition-all',
                  textOptions.italic ? 'bg-neon-cyan text-dark' : 'hover:bg-dark-lighter text-gray-400'
                )}
                title="Cursiva"
              >
                <Italic size={16} />
              </button>
              <button
                onClick={() => setTextOptions((prev) => ({ ...prev, underline: !prev.underline }))}
                className={cn(
                  'p-2 rounded-md transition-all',
                  textOptions.underline ? 'bg-neon-cyan text-dark' : 'hover:bg-dark-lighter text-gray-400'
                )}
                title="Subrayado"
              >
                <Underline size={16} />
              </button>

              <div className="w-px h-6 bg-dark-accent mx-1" />

              <button
                onClick={() => setTextOptions((prev) => ({ ...prev, align: 'left' }))}
                className={cn(
                  'p-2 rounded-md transition-all',
                  textOptions.align === 'left' ? 'bg-neon-cyan text-dark' : 'hover:bg-dark-lighter text-gray-400'
                )}
                title="Alinear izquierda"
              >
                <AlignLeft size={16} />
              </button>
              <button
                onClick={() => setTextOptions((prev) => ({ ...prev, align: 'center' }))}
                className={cn(
                  'p-2 rounded-md transition-all',
                  textOptions.align === 'center' ? 'bg-neon-cyan text-dark' : 'hover:bg-dark-lighter text-gray-400'
                )}
                title="Centrar"
              >
                <AlignCenter size={16} />
              </button>
              <button
                onClick={() => setTextOptions((prev) => ({ ...prev, align: 'right' }))}
                className={cn(
                  'p-2 rounded-md transition-all',
                  textOptions.align === 'right' ? 'bg-neon-cyan text-dark' : 'hover:bg-dark-lighter text-gray-400'
                )}
                title="Alinear derecha"
              >
                <AlignRight size={16} />
              </button>

              <div className="flex-1" />
              <label className="text-xs text-gray-400">Color:</label>
              <input
                type="color"
                value={textOptions.color}
                onChange={(e) => setTextOptions((prev) => ({ ...prev, color: e.target.value }))}
                className="w-8 h-8 rounded cursor-pointer border border-dark-accent"
              />
            </div>
          </div>
        )}

        {activeTab === 'image' && (
          <div className="space-y-3">
            <p className="text-sm text-gray-400">
              Sube una imagen o logo para añadir al diseño. Podrás moverla, redimensionarla y rotarla.
            </p>
            <button
              onClick={() => fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className="w-full py-8 rounded-lg border-2 border-dashed border-dark-accent hover:border-neon-cyan text-gray-400 hover:text-neon-cyan transition-all flex flex-col items-center gap-2 cursor-pointer"
            >
              <ImagePlus size={32} />
              <span className="text-sm font-medium">Haz clic o arrastra una imagen</span>
              <span className="text-xs text-gray-500">PNG, JPG, SVG hasta 10MB</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Move size={14} />
              <span>Arrastra para mover · Esquinas para redimensionar · Borde superior para rotar</span>
            </div>
          </div>
        )}

        {activeTab === 'background' && (
          <div className="space-y-3">
            <p className="text-sm text-gray-400 mb-2">Color de fondo del producto:</p>
            <div className="grid grid-cols-6 gap-2">
              {PRESET_COLORS.map((color) => (
                <button
                  key={color}
                  onClick={() => setBackgroundColor(color)}
                  className={cn(
                    'w-full aspect-square rounded-md border-2 transition-all hover:scale-110',
                    backgroundColor === color
                      ? 'border-neon-cyan ring-2 ring-neon-cyan/50'
                      : 'border-dark-accent'
                  )}
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
            <div className="flex items-center gap-3 pt-2">
              <label className="text-sm text-gray-400">Personalizado:</label>
              <input
                type="color"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
                className="w-10 h-10 rounded cursor-pointer border border-dark-accent"
              />
              <span className="text-xs text-gray-500 font-mono">{backgroundColor}</span>
            </div>
          </div>
        )}
      </div>

      {/* Canvas Area */}
      <div
        ref={containerRef}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="relative rounded-lg overflow-hidden border border-dark-accent bg-dark-lighter flex items-center justify-center p-4"
      >
        {!canvasReady && (
          <div className="absolute inset-0 flex items-center justify-center z-10 bg-dark-lighter">
            <div className="text-center space-y-3">
              <div className="w-10 h-10 border-2 border-neon-cyan border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-gray-400 text-sm">Iniciando editor...</p>
            </div>
          </div>
        )}
        <div className="shadow-2xl rounded-md overflow-hidden">
          <canvas ref={canvasRef} />
        </div>
      </div>

      {/* Help text */}
      <p className="text-xs text-gray-600 text-center">
        Selecciona un elemento para moverlo, redimensionarlo o rotarlo · Pulsa Supr para eliminar
      </p>
    </div>
  );
}
