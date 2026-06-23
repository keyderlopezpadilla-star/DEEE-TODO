import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import { logUserRegistration } from '@/lib/api/googleSheets';
import { 
  sanitizeString, 
  sanitizeEmail, 
  sanitizePhone,
  checkRateLimit 
} from '@/lib/utils/sanitize';

/**
 * User Registration API Endpoint
 * In production, connect to a real database
 * Rate limited to 3 registrations per hour per IP
 */

export async function POST(request: NextRequest) {
  try {
    // Rate limiting - 3 registrations per hour
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';
    const rateLimit = checkRateLimit(`register:${ip}`, 3, 60 * 60 * 1000);
    
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Demasiados intentos de registro. Por favor, intenta más tarde.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    let { name, email, phone, password } = body;

    // Validation
    if (!name || !email || !phone || !password) {
      return NextResponse.json(
        { error: 'Todos los campos son obligatorios' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'La contraseña debe tener al menos 6 caracteres' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    name = sanitizeString(name);
    email = sanitizeEmail(email);
    phone = sanitizePhone(phone);

    // Email validation after sanitization
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      );
    }

    // Phone validation after sanitization
    if (phone.length < 9) {
      return NextResponse.json(
        { error: 'Teléfono inválido' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hash(password, 10);

    // In production, save to database:
    // const user = await prisma.user.create({
    //   data: {
    //     name,
    //     email,
    //     phone,
    //     password: hashedPassword,
    //     role: 'customer',
    //     discountPercentage: 0,
    //   },
    // });

    // Log to Google Sheets
    await logUserRegistration({ name, email, phone });

    return NextResponse.json(
      {
        success: true,
        message: 'Usuario registrado correctamente',
        user: {
          name,
          email,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Registration error:', error);
    
    // Handle duplicate email error
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Este email ya está registrado' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Error al registrar usuario' },
      { status: 500 }
    );
  }
}
