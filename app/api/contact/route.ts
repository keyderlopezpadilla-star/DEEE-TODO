import { NextRequest, NextResponse } from 'next/server';
import { logContactForm } from '@/lib/api/googleSheets';
import { z } from 'zod';
import { sanitizeString, sanitizeEmail, sanitizePhone, checkRateLimit } from '@/lib/utils/sanitize';

/**
 * Contact Form Submission API
 * Validates input and logs to Google Sheets
 */

const contactSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(9, 'Teléfono inválido'),
  subject: z.string().min(3, 'El asunto debe tener al menos 3 caracteres'),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
});

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIp = request.headers.get('x-forwarded-for') || 'unknown';
    const rateLimit = checkRateLimit(`contact-${clientIp}`, 5, 60000); // 5 requests per minute
    
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Demasiadas solicitudes. Por favor, intenta de nuevo más tarde.' },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Sanitize inputs before validation
    const sanitizedBody = {
      name: sanitizeString(body.name),
      email: sanitizeEmail(body.email),
      phone: sanitizePhone(body.phone),
      subject: sanitizeString(body.subject),
      message: sanitizeString(body.message),
    };

    // Validate input
    const validationResult = contactSchema.safeParse(sanitizedBody);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Datos inválidos', 
          details: validationResult.error.issues 
        },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Log to Google Sheets
    const logged = await logContactForm(data);

    if (!logged) {
      console.warn('Failed to log to Google Sheets, but continuing...');
    }

    // In production, you might also want to:
    // - Send email notification
    // - Save to database
    // - Send to CRM

    return NextResponse.json(
      {
        success: true,
        message: 'Mensaje enviado correctamente. Nos pondremos en contacto contigo pronto.',
      },
      { 
        status: 200,
        headers: {
          'X-RateLimit-Remaining': rateLimit.remaining.toString(),
        }
      }
    );
  } catch (error: any) {
    console.error('Contact form error:', error);
    
    return NextResponse.json(
      { error: 'Error al enviar el mensaje. Por favor, intenta de nuevo.' },
      { status: 500 }
    );
  }
}
