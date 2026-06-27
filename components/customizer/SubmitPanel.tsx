'use client';

import { useState } from 'react';
import { 
  Send, 
  MessageCircle, 
  Mail, 
  Download, 
  CheckCircle2, 
  AlertCircle,
  Sparkles,
  Loader2
} from 'lucide-react';
import { useCustomizerStore } from '@/lib/stores/customizerStore';
import { cn } from '@/lib/utils/cn';

const WHATSAPP_NUMBER = '34657666741';

const SIZE_LABELS: Record<string, string> = {
  A3: 'A3 (297×420mm)',
  A4: 'A4 (210×297mm)',
  A5: 'A5 (148×210mm)',
  custom: 'Personalizado',
};

const MATERIAL_LABELS: Record<string, string> = {
  estucado: 'Estucado',
  reciclado: 'Reciclado',
  fotografico: 'Fotográfico',
  dtf: 'DTF (Transfer textil)',
  vinilo: 'Vinilo adhesivo',
};

const BINDING_LABELS: Record<string, string> = {
  sin_encuadernacion: 'Sin encuadernación',
  espiral: 'Espiral',
  encolado: 'Encolado',
  grapado: 'Grapado',
};

export default function SubmitPanel() {
  const {
    canvasDataUrl,
    uploadedFiles,
    orderSettings,
    sendMethod,
    setSendMethod,
    isSubmitting,
    setSubmitting,
    submitSuccess,
    setSubmitSuccess,
    submitError,
    setSubmitError,
  } = useCustomizerStore();

  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

  const getSizeText = () => {
    if (orderSettings.size === 'custom') {
      return `Personalizado (${orderSettings.customWidth || '?'}×${orderSettings.customHeight || '?'}mm)`;
    }
    return SIZE_LABELS[orderSettings.size];
  };

  const buildWhatsAppMessage = () => {
    const sizeText = getSizeText();
    return [
      `📋 *NUEVO PEDIDO PERSONALIZADO*`,
      `━━━━━━━━━━━━━━━━━━`,
      `👤 *Cliente:* ${customerName || 'No indicado'}`,
      `📧 *Email:* ${customerEmail || 'No indicado'}`,
      `📱 *Teléfono:* ${customerPhone || 'No indicado'}`,
      `━━━━━━━━━━━━━━━━━━`,
      `📐 *Tamaño:* ${sizeText}`,
      `📄 *Material:* ${MATERIAL_LABELS[orderSettings.material]}`,
      `📖 *Encuadernación:* ${BINDING_LABELS[orderSettings.binding]}`,
      `🔢 *Copias:* ${orderSettings.copies}`,
      orderSettings.notes ? `📝 *Notas:* ${orderSettings.notes}` : '',
      `━━━━━━━━━━━━━━━━━━`,
      `🎨 *Diseño personalizado adjunto*`,
      `(Por favor, envía la imagen descargada junto con este mensaje)`,
    ].filter(Boolean).join('\n');
  };

  const downloadDesign = () => {
    if (!canvasDataUrl) return;
    const link = document.createElement('a');
    link.download = `DEEE-TODO-diseno-${Date.now()}.png`;
    link.href = canvasDataUrl;
    link.click();
  };

  const handleWhatsAppSubmit = () => {
    const message = buildWhatsAppMessage();
    const encodedText = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`;

    // Download design first so user can attach it
    downloadDesign();

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    setSubmitSuccess(true);
  };

  const handleEmailSubmit = async () => {
    if (!customerEmail) {
      setSubmitError('Por favor, introduce tu email para recibir confirmación.');
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    try {
      const sizeText = getSizeText();

      // Build FormData with all files and order info
      const formData = new FormData();
      formData.append('customerName', customerName || 'Cliente anónimo');
      formData.append('customerEmail', customerEmail);
      formData.append('customerPhone', customerPhone);
      formData.append('size', sizeText);
      formData.append('material', MATERIAL_LABELS[orderSettings.material]);
      formData.append('binding', BINDING_LABELS[orderSettings.binding]);
      formData.append('copies', orderSettings.copies.toString());
      formData.append('notes', orderSettings.notes || '');

      // Attach the canvas design as base64
      if (canvasDataUrl) {
        formData.append('designImage', canvasDataUrl);
      }

      // Attach uploaded files
      uploadedFiles.forEach((file, index) => {
        formData.append(`file_${index}`, file);
      });

      const response = await fetch('/api/orders/submit', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Error al enviar el pedido');
      }

      setSubmitSuccess(true);
    } catch (error: unknown) {
      console.error('Error sending order:', error);
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      setSubmitError(
        `${errorMessage}. Puedes intentar con WhatsApp o contactarnos directamente.`
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = () => {
    if (sendMethod === 'whatsapp') {
      handleWhatsAppSubmit();
    } else {
      handleEmailSubmit();
    }
  };

  if (submitSuccess) {
    return (
      <div className="glass rounded-lg p-6 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-neon-green/20 flex items-center justify-center mx-auto">
          <CheckCircle2 className="text-neon-green" size={32} />
        </div>
        <h3 className="text-xl font-bold text-foreground">¡Pedido enviado!</h3>
        <p className="text-gray-400 text-sm">
          {sendMethod === 'whatsapp'
            ? 'Se ha abierto WhatsApp con tu pedido. Recuerda adjuntar la imagen descargada al mensaje.'
            : 'Hemos recibido tu pedido y diseño. Te contactaremos pronto con el presupuesto.'}
        </p>
        <button
          onClick={() => {
            setSubmitSuccess(false);
            setSubmitError(null);
          }}
          className="px-6 py-2 rounded-md border border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-dark font-medium text-sm transition-all"
        >
          Crear otro diseño
        </button>
      </div>
    );
  }

  return (
    <div className="glass rounded-lg p-6 space-y-5">
      <div className="flex items-center gap-2">
        <Sparkles className="text-neon-pink" size={20} />
        <h3 className="text-lg font-bold text-foreground">Finalizar Pedido</h3>
      </div>

      {/* Customer Info */}
      <div className="space-y-3">
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder="Tu nombre"
          className="w-full px-3 py-2.5 rounded-md bg-dark-lighter border border-dark-accent text-foreground placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-neon-cyan"
        />
        <input
          type="email"
          value={customerEmail}
          onChange={(e) => setCustomerEmail(e.target.value)}
          placeholder="Tu email *"
          className="w-full px-3 py-2.5 rounded-md bg-dark-lighter border border-dark-accent text-foreground placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-neon-cyan"
        />
        <input
          type="tel"
          value={customerPhone}
          onChange={(e) => setCustomerPhone(e.target.value)}
          placeholder="Tu teléfono"
          className="w-full px-3 py-2.5 rounded-md bg-dark-lighter border border-dark-accent text-foreground placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-neon-cyan"
        />
      </div>

      {/* Send Method Toggle */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Método de envío:</label>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setSendMethod('email')}
            className={cn(
              'flex items-center justify-center gap-2 px-4 py-3 rounded-md border text-sm font-medium transition-all',
              sendMethod === 'email'
                ? 'border-neon-cyan bg-neon-cyan/10 text-neon-cyan'
                : 'border-dark-accent hover:border-neon-cyan/50 text-gray-400'
            )}
          >
            <Mail size={18} />
            Email
          </button>
          <button
            onClick={() => setSendMethod('whatsapp')}
            className={cn(
              'flex items-center justify-center gap-2 px-4 py-3 rounded-md border text-sm font-medium transition-all',
              sendMethod === 'whatsapp'
                ? 'border-neon-green bg-neon-green/10 text-neon-green'
                : 'border-dark-accent hover:border-neon-green/50 text-gray-400'
            )}
          >
            <MessageCircle size={18} />
            WhatsApp
          </button>
        </div>
        {sendMethod === 'whatsapp' && (
          <p className="text-xs text-gray-500 mt-1">
            ⚠️ Se descargará tu diseño y se abrirá WhatsApp. Adjunta la imagen manualmente al chat.
          </p>
        )}
        {sendMethod === 'email' && (
          <p className="text-xs text-gray-500 mt-1">
            ✅ Recomendado. Tu diseño y archivos se enviarán automáticamente adjuntos al email.
          </p>
        )}
      </div>

      {/* Download Design Button */}
      <button
        onClick={downloadDesign}
        disabled={!canvasDataUrl}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-md border border-dark-accent hover:border-neon-cyan text-gray-400 hover:text-neon-cyan text-sm font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <Download size={16} />
        Descargar diseño (PNG)
      </button>

      {/* File count indicator */}
      {uploadedFiles.length > 0 && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-neon-cyan/5 border border-neon-cyan/20">
          <span className="text-xs text-neon-cyan font-medium">
            📎 {uploadedFiles.length} archivo(s) adjunto(s) al pedido
          </span>
        </div>
      )}

      {/* Error Message */}
      {submitError && (
        <div className="flex items-start gap-2 p-3 rounded-md bg-red-500/10 border border-red-500/30">
          <AlertCircle className="text-red-400 mt-0.5 flex-shrink-0" size={16} />
          <p className="text-sm text-red-400">{submitError}</p>
        </div>
      )}

      {/* Submit CTA */}
      <button
        onClick={handleSubmit}
        disabled={isSubmitting || !canvasDataUrl}
        className={cn(
          'w-full flex items-center justify-center gap-2 px-6 py-4 rounded-lg font-bold text-base transition-all',
          'bg-neon-pink hover:bg-neon-pink/90 text-white',
          'shadow-lg shadow-neon-pink/50 hover:shadow-neon-pink/70',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none',
          isSubmitting && 'opacity-70 cursor-wait'
        )}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin" size={20} />
            Enviando pedido...
          </>
        ) : (
          <>
            <Send size={20} />
            Finalizar y Enviar Diseño
          </>
        )}
      </button>
    </div>
  );
}
