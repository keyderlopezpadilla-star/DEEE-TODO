'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { Canvas as FabricCanvas, FabricText, FabricImage } from 'fabric';
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
  AlignRight,
  Wand2,
  Copy as CopyIcon,
  BringToFront,
  SendToBack,
  Loader2,
  Sparkles,
} from 'lucide-react';
import { useCustomizerStore } from '@/lib/stores/customizerStore';
import { removeImageBackground } from '@/lib/utils/backgroundRemoval';
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

// Fondos de producto rápidos
const BG_PRESETS = [
  { label: 'Blanco', value: '#ffffff' },
  { label: 'Negro', value: '#0b0c10' },
  { label: 'Crema', value: '#faf3e0' },
  { label: 'Kraft', value: '#c9a66b' },
];

export default function CanvasEditor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fabricRef = useRef<FabricCanvas | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const exportTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const {
    backgroundColor,
    setBackgroundColor,
    setCanvasDataUrl,
    addUploadedFile,
    hasActiveObject,
    activeObjectType,
    setActiveObject,
    isRemovingBg,
    setRemovingBg,
    bgRemovalProgress,
    setBgRemovalProgress,
  } = useCustomizerStore();

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
  const [bgError, setBgError] = useState<string | null>(null);

  // Exportación con debounce
  const scheduleExport = useCallback(() => {
    if (exportTimerRef.current) clearTimeout(exportTimerRef.current);
    exportTimerRef.current = setTimeout(() => {
      if (fabricRef.current) {
        const dataUrl = fabricRef.current.toDataURL({
          format: 'png',
          quality: 1,
          multiplier: 2,
        });
        setCanvasDataUrl(dataUrl);
      }
    }, 250);
  }, [setCanvasDataUrl]);

  const refreshActiveObject = useCallback(() => {
    const canvas = fabricRef.current;
    if (!canvas) return;
    const obj = canvas.getActiveObject();
    if (!obj) {
      setActiveObject(null);
      return;
    }
    if (obj.type === 'text' || obj.type === 'i-text' || obj.type === 'textbox') {
      setActiveObject('text');
    } else if (obj.type === 'image') {
      setActiveObject('image');
    } else {
      setActiveObject('other');
    }
  }, [setActiveObject]);

  const deleteSelected = useCallback(() => {
    if (!fabricRef.current) return;
    const activeObjects = fabricRef.current.getActiveObjects();
    if (activeObjects.length > 0) {
      activeObjects.forEach((obj) => fabricRef.current!.remove(obj));
      fabricRef.current.discardActiveObject();
      fabricRef.current.renderAll();
      setActiveObject(null);
    }
  }, [setActiveObject]);

  // Initialize Fabric.js canvas
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const containerWidth = containerRef.current.clientWidth - 32;
    const canvasWidth = Math.min(containerWidth, 560);
    const canvasHeight = Math.round(canvasWidth * 1.2);

    const canvas = new FabricCanvas(canvasRef.current, {
      width: canvasWidth,
      height: canvasHeight,
      backgroundColor: backgroundColor,
      selection: true,
      preserveObjectStacking: true,
    });

    fabricRef.current = canvas;
    setCanvasReady(true);

    const handleChange = () => scheduleExport();
    canvas.on('object:modified', handleChange);
    canvas.on('object:added', handleChange);
    canvas.on('object:removed', handleChange);
    canvas.on('selection:created', refreshActiveObject);
    canvas.on('selection:updated', refreshActiveObject);
    canvas.on('selection:cleared', () => setActiveObject(null));

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        const tag = document.activeElement?.tagName;
        if (tag !== 'INPUT' && tag !== 'TEXTAREA') {
          deleteSelected();
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (exportTimerRef.current) clearTimeout(exportTimerRef.current);
      canvas.dispose();
      fabricRef.current = null;
      setCanvasReady(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (fabricRef.current) {
      fabricRef.current.backgroundColor = backgroundColor;
      fabricRef.current.renderAll();
      scheduleExport();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [backgroundColor]);

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

  const placeImageOnCanvas = (dataUrl: string) => {
    const canvas = fabricRef.current;
    if (!canvas) return;

    const imgElement = new Image();
    imgElement.onload = () => {
      const fabricImage = new FabricImage(imgElement, {
        left: 50 + Math.random() * 40,
        top: 50 + Math.random() * 40,
      });

      const maxWidth = canvas.width! * 0.7;
      const maxHeight = canvas.height! * 0.7;
      const scale = Math.min(maxWidth / imgElement.width, maxHeight / imgElement.height, 1);
      fabricImage.scaleX = scale;
      fabricImage.scaleY = scale;
      canvas.add(fabricImage);
      canvas.setActiveObject(fabricImage);
      canvas.renderAll();
      refreshActiveObject();
    };
    imgElement.src = dataUrl;
  };

  const processFiles = (files: FileList | File[]) => {
    Array.from(files).forEach((file) => {
      if (!file.type.startsWith('image/')) return;
      if (file.size > 10 * 1024 * 1024) {
        alert(`El archivo "${file.name}" excede los 10MB.`);
        return;
      }
      addUploadedFile(file);
      const reader = new FileReader();
      reader.onload = (event) => placeImageOnCanvas(event.target?.result as string);
      reader.readAsDataURL(file);
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !fabricRef.current) return;
    processFiles(files);
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
    processFiles(files);
  };

  // ===== Quitar fondo con IA =====
  const handleRemoveBackground = async () => {
    const canvas = fabricRef.current;
    if (!canvas) return;
    const active = canvas.getActiveObject();
    if (!active || active.type !== 'image') {
      setBgError('Selecciona primero una imagen en el lienzo.');
      return;
    }

    setBgError(null);
    setRemovingBg(true);
    setBgRemovalProgress(0);

    try {
      const imageObj = active as FabricImage;
      const element = imageObj.getElement() as HTMLImageElement;
      const sourceSrc = element.src;

      const resultDataUrl = await removeImageBackground(sourceSrc, {
        onProgress: (pct) => setBgRemovalProgress(pct),
      });

      const newImg = new Image();
      newImg.onload = () => {
        imageObj.setElement(newImg);
        imageObj.dirty = true;
        canvas.renderAll();
        scheduleExport();
        setRemovingBg(false);
        setBgRemovalProgress(100);
      };
      newImg.src = resultDataUrl;
    } catch (err) {
      console.error('Error al quitar el fondo:', err);
      setBgError('No se pudo quitar el fondo. Inténtalo de nuevo con otra imagen.');
      setRemovingBg(false);
    }
  };

  const duplicateSelected = async () => {
    const canvas = fabricRef.current;
    if (!canvas) return;
    const active = canvas.getActiveObject();
    if (!active) return;
    const cloned = await active.clone();
    cloned.set({ left: (active.left || 0) + 20, top: (active.top || 0) + 20 });
    canvas.add(cloned);
    canvas.setActiveObject(cloned);
    canvas.renderAll();
  };

  const bringForward = () => {
    const canvas = fabricRef.current;
    const active = canvas?.getActiveObject();
    if (canvas && active) {
      canvas.bringObjectForward(active);
      canvas.renderAll();
      scheduleExport();
    }
  };

  const sendBackward = () => {
    const canvas = fabricRef.current;
    const active = canvas?.getActiveObject();
    if (canvas && active) {
      canvas.sendObjectBackwards(active);
      canvas.renderAll();
      scheduleExport();
    }
  };

  const clearCanvas = () => {
    if (!fabricRef.current) return;
    if (!confirm('¿Limpiar todo el lienzo? Esta acción no se puede deshacer.')) return;
    fabricRef.current.clear();
    fabricRef.current.backgroundColor = backgroundColor;
    fabricRef.current.renderAll();
    setActiveObject(null);
    scheduleExport();
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
        <button
          onClick={() => setActiveTab('text')}
          className={cn('flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-all', activeTab === 'text' ? 'bg-neon-cyan text-dark' : 'hover:bg-dark-lighter text-gray-400')}
        >
          <Type size={16} /> Texto
        </button>
        <button
          onClick={() => setActiveTab('image')}
          className={cn('flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-all', activeTab === 'image' ? 'bg-neon-cyan text-dark' : 'hover:bg-dark-lighter text-gray-400')}
        >
          <ImagePlus size={16} /> Imagen
        </button>
        <button
          onClick={() => setActiveTab('background')}
          className={cn('flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-all', activeTab === 'background' ? 'bg-neon-cyan text-dark' : 'hover:bg-dark-lighter text-gray-400')}
        >
          <Palette size={16} /> Fondo
        </button>

        <div className="flex-1" />

        <button onClick={zoomIn} className="p-2 rounded-md hover:bg-dark-lighter text-gray-400 hover:text-neon-cyan transition-all" title="Acercar">
          <ZoomIn size={18} />
        </button>
        <button onClick={zoomOut} className="p-2 rounded-md hover:bg-dark-lighter text-gray-400 hover:text-neon-cyan transition-all" title="Alejar">
          <ZoomOut size={18} />
        </button>
        <button onClick={deleteSelected} className="p-2 rounded-md hover:bg-dark-lighter text-gray-400 hover:text-red-400 transition-all" title="Eliminar seleccionado (Supr)">
          <Trash2 size={18} />
        </button>
        <button onClick={clearCanvas} className="p-2 rounded-md hover:bg-dark-lighter text-gray-400 hover:text-red-400 transition-all" title="Limpiar lienzo">
          <RotateCcw size={18} />
        </button>
      </div>

      {/* Panel contextual del objeto seleccionado */}
      {hasActiveObject && (
        <div className="glass rounded-lg p-3 flex items-center gap-2 flex-wrap animate-pop-in border border-neon-cyan/30">
          <span className="text-xs font-medium text-neon-cyan flex items-center gap-1.5">
            <Move size={14} />
            {activeObjectType === 'image' ? 'Imagen seleccionada' : activeObjectType === 'text' ? 'Texto seleccionado' : 'Elemento seleccionado'}
          </span>
          <div className="w-px h-6 bg-dark-accent mx-1" />

          {activeObjectType === 'image' && (
            <button
              onClick={handleRemoveBackground}
              disabled={isRemovingBg}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-neon-purple/20 border border-neon-purple/50 text-neon-purple hover:bg-neon-purple/30 text-xs font-semibold transition-all disabled:opacity-50 disabled:cursor-wait"
            >
              {isRemovingBg ? <Loader2 size={14} className="animate-spin" /> : <Wand2 size={14} />}
              {isRemovingBg ? `Quitando fondo... ${bgRemovalProgress}%` : 'Quitar fondo (IA)'}
            </button>
          )}

          <button onClick={duplicateSelected} className="flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-dark-lighter text-gray-400 hover:text-neon-cyan text-xs font-medium transition-all" title="Duplicar">
            <CopyIcon size={14} /> Duplicar
          </button>
          <button onClick={bringForward} className="p-1.5 rounded-md hover:bg-dark-lighter text-gray-400 hover:text-neon-cyan transition-all" title="Traer al frente">
            <BringToFront size={16} />
          </button>
          <button onClick={sendBackward} className="p-1.5 rounded-md hover:bg-dark-lighter text-gray-400 hover:text-neon-cyan transition-all" title="Enviar atrás">
            <SendToBack size={16} />
          </button>
        </div>
      )}

      {/* Aviso de error de quitar fondo */}
      {bgError && (
        <div className="text-xs text-red-400 px-3 py-2 rounded-md bg-red-500/10 border border-red-500/30">
          {bgError}
        </div>
      )}

      {/* Barra de progreso de quitar fondo */}
      {isRemovingBg && (
        <div className="glass rounded-lg p-3 space-y-2 animate-pop-in">
          <div className="flex items-center justify-between text-xs text-neon-purple">
            <span className="flex items-center gap-1.5">
              <Sparkles size={14} className="animate-pulse" />
              La IA está recortando tu imagen...
            </span>
            <span>{bgRemovalProgress}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-dark-lighter overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-neon-purple to-neon-pink transition-all duration-300"
              style={{ width: `${bgRemovalProgress}%` }}
            />
          </div>
          <p className="text-[11px] text-gray-500">
            La primera vez puede tardar un poco mientras se descarga el modelo. Todo ocurre en tu navegador. 🔒
          </p>
        </div>
      )}

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
                  <option key={font} value={font} style={{ fontFamily: font }}>{font}</option>
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
                className={cn('p-2 rounded-md transition-all', textOptions.bold ? 'bg-neon-cyan text-dark' : 'hover:bg-dark-lighter text-gray-400')}
                title="Negrita"
              >
                <Bold size={16} />
              </button>
              <button
                onClick={() => setTextOptions((prev) => ({ ...prev, italic: !prev.italic }))}
                className={cn('p-2 rounded-md transition-all', textOptions.italic ? 'bg-neon-cyan text-dark' : 'hover:bg-dark-lighter text-gray-400')}
                title="Cursiva"
              >
                <Italic size={16} />
              </button>
              <button
                onClick={() => setTextOptions((prev) => ({ ...prev, underline: !prev.underline }))}
                className={cn('p-2 rounded-md transition-all', textOptions.underline ? 'bg-neon-cyan text-dark' : 'hover:bg-dark-lighter text-gray-400')}
                title="Subrayado"
              >
                <Underline size={16} />
              </button>

              <div className="w-px h-6 bg-dark-accent mx-1" />

              <button onClick={() => setTextOptions((prev) => ({ ...prev, align: 'left' }))} className={cn('p-2 rounded-md transition-all', textOptions.align === 'left' ? 'bg-neon-cyan text-dark' : 'hover:bg-dark-lighter text-gray-400')} title="Alinear izquierda">
                <AlignLeft size={16} />
              </button>
              <button onClick={() => setTextOptions((prev) => ({ ...prev, align: 'center' }))} className={cn('p-2 rounded-md transition-all', textOptions.align === 'center' ? 'bg-neon-cyan text-dark' : 'hover:bg-dark-lighter text-gray-400')} title="Centrar">
                <AlignCenter size={16} />
              </button>
              <button onClick={() => setTextOptions((prev) => ({ ...prev, align: 'right' }))} className={cn('p-2 rounded-md transition-all', textOptions.align === 'right' ? 'bg-neon-cyan text-dark' : 'hover:bg-dark-lighter text-gray-400')} title="Alinear derecha">
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
              Sube una imagen o logo. Podrás moverla, redimensionarla, rotarla y{' '}
              <span className="text-neon-purple font-medium">quitarle el fondo con IA</span>.
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
            <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />

            <div className="flex items-start gap-2 p-3 rounded-md bg-neon-purple/5 border border-neon-purple/20">
              <Wand2 size={16} className="text-neon-purple flex-shrink-0 mt-0.5" />
              <p className="text-xs text-gray-400">
                <span className="text-neon-purple font-medium">Quitar fondo con IA:</span> selecciona
                una imagen del lienzo y pulsa el botón &quot;Quitar fondo&quot; que aparece arriba. Ideal
                para logos y fotos de producto. 100% privado, se procesa en tu dispositivo.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Move size={14} />
              <span>Arrastra para mover · Esquinas para redimensionar · Borde superior para rotar</span>
            </div>
          </div>
        )}

        {activeTab === 'background' && (
          <div className="space-y-3">
            <p className="text-sm text-gray-400 mb-2">Color de fondo del producto:</p>

            <div className="flex flex-wrap gap-2 mb-2">
              {BG_PRESETS.map((preset) => (
                <button
                  key={preset.value}
                  onClick={() => setBackgroundColor(preset.value)}
                  className={cn(
                    'px-3 py-1.5 rounded-md border text-xs font-medium transition-all',
                    backgroundColor === preset.value ? 'border-neon-cyan text-neon-cyan bg-neon-cyan/10' : 'border-dark-accent text-gray-400 hover:text-foreground'
                  )}
                >
                  {preset.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-6 gap-2">
              {PRESET_COLORS.map((color) => (
                <button
                  key={color}
                  onClick={() => setBackgroundColor(color)}
                  className={cn(
                    'w-full aspect-square rounded-md border-2 transition-all hover:scale-110',
                    backgroundColor === color ? 'border-neon-cyan ring-2 ring-neon-cyan/50' : 'border-dark-accent'
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
