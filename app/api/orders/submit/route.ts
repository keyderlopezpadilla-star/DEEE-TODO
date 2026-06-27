import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';
import { sanitizeString, sanitizeEmail, sanitizePhone, checkRateLimit } from '@/lib/utils/sanitize';

/**
 * Order Submission API - Sends customized product order via email with Nodemailer
 * Handles file attachments (design image + uploaded files)
 * Rate limited to 3 requests per 10 minutes per IP
 */

const orderSchema = z.object({
  customerName: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  customerEmail: z.string().email('Email inválido'),
  customerPhone: z.string().optional(),
  size: z.string(),
  material: z.string(),
  binding: z.string(),
  copies: z.number().min(1),
  notes: z.string().optional(),
  designImage: z.string().optional(), // Base64 data URL
});

export async function POST(request: NextRequest) {
  try {
    // Rate limiting - 3 requests per 10 minutes
    const ip = request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      'unknown';
    const rateLimit = checkRateLimit(`order:${ip}`, 3, 10 * 60 * 1000);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Demasiadas solicitudes. Por favor, intenta más tarde.' },
        { status: 429 }
      );
    }

    const formData = await request.formData();

    // Extract order data from form
    const orderData = {
      customerName: formData.get('customerName') as string,
      customerEmail: formData.get('customerEmail') as string,
      customerPhone: formData.get('customerPhone') as string || '',
      size: formData.get('size') as string,
      material: formData.get('material') as string,
      binding: formData.get('binding') as string,
      copies: parseInt(formData.get('copies') as string) || 1,
      notes: formData.get('notes') as string || '',
      designImage: formData.get('designImage') as string || '',
    };

    // Validate
    const validationResult = orderSchema.safeParse(orderData);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Datos inválidos', details: validationResult.error.issues },
        { status: 400 }
      );
    }

    // Sanitize
    const data = {
      customerName: sanitizeString(validationResult.data.customerName),
      customerEmail: sanitizeEmail(validationResult.data.customerEmail),
      customerPhone: sanitizePhone(validationResult.data.customerPhone || ''),
      size: sanitizeString(validationResult.data.size),
      material: sanitizeString(validationResult.data.material),
      binding: sanitizeString(validationResult.data.binding),
      copies: validationResult.data.copies,
      notes: sanitizeString(validationResult.data.notes || ''),
      designImage: validationResult.data.designImage || '',
    };

    // Collect uploaded file attachments
    const attachments: { filename: string; content: Buffer; contentType: string }[] = [];

    // Process design image (Base64 -> Buffer)
    if (data.designImage && data.designImage.startsWith('data:image/')) {
      const matches = data.designImage.match(/^data:image\/(png|jpeg|jpg|webp);base64,(.+)$/);
      if (matches) {
        const ext = matches[1];
        const buffer = Buffer.from(matches[2], 'base64');
        attachments.push({
          filename: `diseno-personalizado.${ext}`,
          content: buffer,
          contentType: `image/${ext}`,
        });
      }
    }

    // Process additional uploaded files
    const fileKeys = Array.from(formData.keys()).filter(key => key.startsWith('file_'));
    for (const key of fileKeys) {
      const file = formData.get(key) as File;
      if (file && file.size > 0) {
        const buffer = Buffer.from(await file.arrayBuffer());
        attachments.push({
          filename: file.name,
          content: buffer,
          contentType: file.type || 'application/octet-stream',
        });
      }
    }

    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Build HTML email body
    const htmlBody = `
      <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #1a1a2e; color: #ededed; padding: 30px; border-radius: 12px;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h1 style="color: #ff007a; margin: 0; font-size: 24px;">🎨 Nuevo Pedido Personalizado</h1>
          <p style="color: #888; margin-top: 8px;">DEEE TODO - Personalizador</p>
        </div>
        
        <div style="background: rgba(0,240,255,0.1); border: 1px solid rgba(0,240,255,0.3); border-radius: 8px; padding: 16px; margin-bottom: 16px;">
          <h3 style="color: #00f0ff; margin: 0 0 12px 0;">👤 Datos del Cliente</h3>
          <p style="margin: 4px 0;"><strong>Nombre:</strong> ${data.customerName}</p>
          <p style="margin: 4px 0;"><strong>Email:</strong> ${data.customerEmail}</p>
          <p style="margin: 4px 0;"><strong>Teléfono:</strong> ${data.customerPhone || 'No indicado'}</p>
        </div>
        
        <div style="background: rgba(255,0,122,0.1); border: 1px solid rgba(255,0,122,0.3); border-radius: 8px; padding: 16px; margin-bottom: 16px;">
          <h3 style="color: #ff007a; margin: 0 0 12px 0;">📋 Detalles del Pedido</h3>
          <p style="margin: 4px 0;"><strong>📐 Tamaño:</strong> ${data.size}</p>
          <p style="margin: 4px 0;"><strong>📄 Material:</strong> ${data.material}</p>
          <p style="margin: 4px 0;"><strong>📖 Encuadernación:</strong> ${data.binding}</p>
          <p style="margin: 4px 0;"><strong>🔢 Copias:</strong> ${data.copies}</p>
          ${data.notes ? `<p style="margin: 4px 0;"><strong>📝 Notas:</strong> ${data.notes}</p>` : ''}
        </div>
        
        <div style="background: rgba(0,255,136,0.1); border: 1px solid rgba(0,255,136,0.3); border-radius: 8px; padding: 16px;">
          <h3 style="color: #00ff88; margin: 0 0 8px 0;">📎 Archivos Adjuntos</h3>
          <p style="margin: 0; color: #888;">${attachments.length} archivo(s) adjunto(s) a este email.</p>
        </div>
        
        <div style="text-align: center; margin-top: 24px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.1);">
          <p style="color: #666; font-size: 12px; margin: 0;">Enviado desde el personalizador de DEEE TODO</p>
        </div>
      </div>
    `;

    // Send email
    await transporter.sendMail({
      from: `"DEEE TODO Pedidos" <${process.env.SMTP_USER || 'pedidos@deeetodo.com'}>`,
      to: process.env.ORDER_EMAIL_TO || 'info@deeetodo.com',
      replyTo: data.customerEmail,
      subject: `🎨 Nuevo pedido personalizado - ${data.customerName} (${data.copies} copias, ${data.size})`,
      html: htmlBody,
      attachments: attachments.map((att) => ({
        filename: att.filename,
        content: att.content,
        contentType: att.contentType,
      })),
    });

    // Optionally send confirmation to customer
    if (data.customerEmail) {
      await transporter.sendMail({
        from: `"DEEE TODO" <${process.env.SMTP_USER || 'pedidos@deeetodo.com'}>`,
        to: data.customerEmail,
        subject: '✅ Tu pedido ha sido recibido - DEEE TODO',
        html: `
          <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 30px;">
            <h2 style="color: #ff007a;">¡Gracias por tu pedido, ${data.customerName}!</h2>
            <p>Hemos recibido tu diseño personalizado con los siguientes detalles:</p>
            <ul>
              <li><strong>Tamaño:</strong> ${data.size}</li>
              <li><strong>Material:</strong> ${data.material}</li>
              <li><strong>Encuadernación:</strong> ${data.binding}</li>
              <li><strong>Copias:</strong> ${data.copies}</li>
            </ul>
            <p>Te contactaremos en breve con el presupuesto final y plazo de entrega.</p>
            <p style="color: #888; font-size: 12px; margin-top: 24px;">— El equipo de DEEE TODO</p>
          </div>
        `,
      });
    }

    return NextResponse.json(
      { success: true, message: 'Pedido enviado correctamente. Recibirás una confirmación por email.' },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error('Order submission error:', error);

    return NextResponse.json(
      { error: 'Error al enviar el pedido. Por favor, intenta de nuevo o usa WhatsApp.' },
      { status: 500 }
    );
  }
}
