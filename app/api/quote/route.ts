import { NextRequest, NextResponse } from 'next/server';
import { logQuoteRequest } from '@/lib/api/googleSheets';
import { z } from 'zod';
import { 
  sanitizeString, 
  sanitizeEmail, 
  sanitizePhone, 
  checkRateLimit 
} from '@/lib/utils/sanitize';

/**
 * Quote Request API
 * Validates input, sanitizes data, and logs to Google Sheets
 * Rate limited to 5 requests per hour per IP
 */

const quoteSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(9, 'Teléfono inválido'),
  serviceType: z.string().min(3, 'Selecciona un tipo de servicio'),
  quantity: z.number().min(1, 'La cantidad debe ser al menos 1'),
  description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
});

export async function POST(request: NextRequest) {
  try {
    // Rate limiting - 5 requests per hour
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';
    const rateLimit = checkRateLimit(`quote:${ip}`, 5, 60 * 60 * 1000);
    
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Demasiadas solicitudes. Por favor, intenta más tarde.' },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Validate input
    const validationResult = quoteSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Datos inválidos', 
          details: validationResult.error.issues 
        },
        { status: 400 }
      );
    }

    // Sanitize validated data
    const data = {
      name: sanitizeString(validationResult.data.name),
      email: sanitizeEmail(validationResult.data.email),
      phone: sanitizePhone(validationResult.data.phone),
      serviceType: sanitizeString(validationResult.data.serviceType),
      quantity: validationResult.data.quantity,
      description: sanitizeString(validationResult.data.description),
    };

    // Log to Google Sheets
    const logged = await logQuoteRequest(data);

    if (!logged) {
      console.warn('Failed to log to Google Sheets, but continuing...');
    }

    // In production, you might also want to:
    // - Send email notification to admin
    // - Send confirmation email to customer
    // - Save to database
    // - Create task in project management tool

    return NextResponse.json(
      {
        success: true,
        message: 'Solicitud de presupuesto enviada. Te contactaremos en las próximas 24 horas.',
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Quote request error:', error);
    
    return NextResponse.json(
      { error: 'Error al enviar la solicitud. Por favor, intenta de nuevo.' },
      { status: 500 }
    );
  }
}
