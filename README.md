# DEEE TODO - Plataforma SaaS para Copistería Moderna

![DEEE TODO](https://img.shields.io/badge/DEEE%20TODO-Imprime%2C%20Envía%2C%20Crea%2C%20Sorprende-ff007a?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-16.2.9-000000?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-06B6D4?style=flat-square&logo=tailwindcss)

Una plataforma web completa, moderna e interactiva para gestionar una copistería avanzada con servicios de impresión DTF, UV, sublimación, cartelería, vinilos y regalos personalizados.

## 🌟 Características Principales

### 🎨 Diseño Premium Dark Mode
- **Tema oscuro con acentos neón**: Fondo #0b0c10, Rosa neón #ff007a, Cian neón #00f0ff
- **Fondo animado con partículas Three.js**: 150 partículas flotantes con colores neón
- **Glassmorphism design system**: Tarjetas semitransparentes con efecto de desenfoque
- **100% Responsive**: Mobile-first con CSS Grid y Flexbox

### 🛒 E-commerce Completo
- **Catálogo de productos** con filtros por categoría, precio y búsqueda
- **Integración Shopify Storefront API** (Headless Commerce)
- **Carrito de compras** persistente con Zustand
- **Vista grid/lista** con toggle dinámico
- **Sistema de favoritos** para productos

### 👤 Sistema de Usuarios
- **Autenticación segura** con NextAuth.js y JWT
- **Dashboard personal** con historial de pedidos
- **Sistema de fidelización** con descuentos personalizados
- **Perfil editable** con información de contacto
- **Seguimiento de envíos** y estadísticas de compra

### 🔐 Panel de Administración
- **Dashboard con métricas** de usuarios, pedidos y ventas
- **Gestión de usuarios** con asignación de descuentos
- **Configuración del sitio** (horarios, información de contacto)
- **Control de contenido** dinámico
- **Sistema de roles** (admin, customer)

### 📊 Integraciones
- **Google Sheets API**: Registro automático de formularios (contacto, presupuestos, usuarios)
- **Shopify Storefront API**: Gestión de productos y carrito
- **NextAuth**: Autenticación y sesiones
- **Google Maps**: Mapa embebido con ubicación del negocio

### 🔒 Seguridad y Cumplimiento
- **Headers de seguridad**: X-Frame-Options, CSP, HSTS, X-Content-Type-Options
- **Sanitización de inputs**: Protección contra XSS, SQL Injection
- **Rate limiting**: Límites por IP en formularios y registro
- **GDPR compliant**: Banner de cookies con consentimiento granular
- **Páginas legales**: Política de Privacidad, Términos y Condiciones, Aviso Legal (España)

## 📋 Requisitos Previos

- **Node.js** 18.x o superior
- **npm** o **yarn**
- Cuenta de **Shopify** (para e-commerce)
- Proyecto de **Google Cloud** con Sheets API habilitada
- **PostgreSQL** (para producción) o cualquier base de datos compatible con Prisma

## 🚀 Instalación Rápida

### 1. Clonar el Repositorio

```bash
git clone https://github.com/tu-usuario/deee-todo.git
cd deee-todo
```

### 2. Instalar Dependencias

```bash
npm install
# o
yarn install
```

### 3. Configurar Variables de Entorno

Copia el archivo de ejemplo y configura tus credenciales:

```bash
cp .env.example .env.local
```

Edita `.env.local` con tus valores reales:

```env
# Shopify Storefront API
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=tu-tienda.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=tu_token_storefront

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=genera_un_secret_aleatorio_aqui

# Base de Datos
DATABASE_URL=postgresql://user:password@localhost:5432/deeetodo

# Google Sheets API
GOOGLE_SHEETS_CLIENT_EMAIL=tu-service-account@proyecto.iam.gserviceaccount.com
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nTU_CLAVE_PRIVADA\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEETS_SPREADSHEET_ID=tu_id_de_spreadsheet

# Configuración del Sitio
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME="DEEE TODO"
```

### 4. Configurar Integraciones

Sigue las guías detalladas de configuración:

- **Shopify**: Ver [SHOPIFY_SETUP.md](./SHOPIFY_SETUP.md)
- **Google Sheets**: Ver [GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md)

### 5. Iniciar el Servidor de Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📁 Estructura del Proyecto

```
deee-todo/
├── app/                          # Next.js App Router
│   ├── (auth)/
│   │   ├── login/               # Página de inicio de sesión
│   │   └── registro/            # Página de registro
│   ├── admin/                   # Panel de administración
│   │   ├── page.tsx            # Dashboard admin
│   │   ├── usuarios/           # Gestión de usuarios
│   │   └── configuracion/      # Configuración del sitio
│   ├── api/                     # API Routes
│   │   ├── auth/               # Endpoints de autenticación
│   │   ├── contact/            # Formulario de contacto
│   │   └── quote/              # Solicitud de presupuesto
│   ├── cuenta/                  # Dashboard del usuario
│   │   ├── page.tsx            # Resumen de cuenta
│   │   ├── pedidos/            # Historial de pedidos
│   │   └── configuracion/      # Configuración de perfil
│   ├── legal/                   # Páginas legales
│   │   ├── privacidad/         # Política de Privacidad
│   │   ├── terminos/           # Términos y Condiciones
│   │   └── aviso-legal/        # Aviso Legal
│   ├── tienda/                  # Catálogo de productos
│   ├── contacto/                # Página de contacto
│   └── page.tsx                 # Landing page
├── components/
│   ├── admin/                   # Componentes del admin panel
│   ├── auth/                    # Formularios de autenticación
│   ├── dashboard/               # Componentes del dashboard
│   ├── layout/                  # Header, Footer, MainLayout
│   ├── sections/                # Secciones de la landing
│   └── ui/                      # Componentes UI reutilizables
├── lib/
│   ├── api/                     # Clientes API (Shopify, Sheets)
│   ├── auth/                    # Configuración NextAuth
│   ├── data/                    # Datos de ejemplo
│   ├── hooks/                   # Custom React hooks
│   ├── stores/                  # Zustand stores (cart, cookies)
│   ├── types/                   # Tipos TypeScript
│   └── utils/                   # Utilidades (sanitize, cn, etc.)
├── public/                      # Archivos estáticos
├── .env.example                 # Template de variables de entorno
├── SHOPIFY_SETUP.md            # Guía setup Shopify
├── GOOGLE_SHEETS_SETUP.md      # Guía setup Google Sheets
├── middleware.ts                # Middleware (security headers)
└── package.json
```

## 🎯 Funcionalidades por Sección

### Landing Page (`/`)
- Hero section con animaciones de gradiente
- Sección de servicios (8 categorías)
- Características destacadas
- Call-to-actions principales

### Tienda (`/tienda`)
- Catálogo completo de productos
- Filtros por categoría y precio
- Búsqueda en tiempo real
- Toggle vista grid/lista
- Carrito lateral (drawer)

### Dashboard Usuario (`/cuenta`)
- Estadísticas personales
- Historial de pedidos
- Beneficios de fidelización
- Edición de perfil

### Panel Admin (`/admin`)
- Métricas de negocio
- Gestión de usuarios y descuentos
- Configuración del sitio
- Feed de actividad reciente

### Páginas de Contacto (`/contacto`)
- Formulario de contacto
- Formulario de presupuesto personalizado
- Mapa de Google Maps embebido
- Información de contacto (dirección, teléfono, horarios)

## 🔑 Credenciales de Demostración

Para probar la aplicación en desarrollo, usa:

**Cliente Demo:**
- Email: `cliente@example.com`
- Contraseña: `demo123`

**Admin Demo:**
- Email: `admin@deeetodo.com`
- Contraseña: `admin123`

> **Nota**: Estos usuarios son ficticios. En producción, conéctate a una base de datos real.

## 🛠️ Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo en localhost:3000

# Producción
npm run build        # Compila la aplicación para producción
npm run start        # Inicia servidor de producción

# Linting
npm run lint         # Ejecuta ESLint
```

## 🌐 Despliegue

### Vercel (Recomendado)

1. Push tu código a GitHub
2. Importa el proyecto en [Vercel](https://vercel.com)
3. Configura las variables de entorno en Vercel Dashboard
4. Deploy automático en cada push

### Otras Plataformas

También puedes desplegar en:
- **Netlify**
- **AWS Amplify**
- **DigitalOcean App Platform**
- **Railway**

Ver [DEPLOYMENT.md](./DEPLOYMENT.md) para más detalles.

## 📚 Tecnologías Utilizadas

- **Framework**: Next.js 16.2.9 (App Router)
- **Lenguaje**: TypeScript 5.x
- **Estilos**: Tailwind CSS 4.x
- **Animaciones**: Three.js + React Three Fiber
- **Estado Global**: Zustand
- **Autenticación**: NextAuth.js
- **Validación**: Zod
- **Formularios**: React Hook Form
- **Iconos**: Lucide React
- **E-commerce**: Shopify Storefront API
- **Base de Datos**: PostgreSQL (recomendado) con Prisma ORM

## 🔧 Configuración Avanzada

### Añadir Nuevos Productos

Los productos se gestionan desde Shopify. Ver [SHOPIFY_SETUP.md](./SHOPIFY_SETUP.md) para detalles.

### Personalizar Colores

Edita las variables CSS en `app/globals.css`:

```css
:root {
  --color-bg: #0b0c10;
  --color-primary: #ff007a;  /* Rosa neón */
  --color-secondary: #00f0ff; /* Cian neón */
}
```

### Configurar Base de Datos Real

1. Instala Prisma:
   ```bash
   npm install @prisma/client
   npm install -D prisma
   ```

2. Inicializa Prisma:
   ```bash
   npx prisma init
   ```

3. Define tu schema en `prisma/schema.prisma`
4. Ejecuta migraciones:
   ```bash
   npx prisma migrate dev
   ```

### Añadir Pasarela de Pago

El checkout se gestiona a través de Shopify, que incluye su propia pasarela. Para pagos custom:

1. Integra Stripe/PayPal
2. Crea endpoints en `/app/api/checkout`
3. Actualiza el flujo del carrito

## 🐛 Solución de Problemas

### Error: "Invalid API credentials"
- Verifica que las variables de entorno estén correctamente configuradas
- Asegúrate de que no hay espacios extra en los tokens

### Google Sheets no registra datos
- Verifica que el service account tenga acceso a la hoja
- Revisa que `GOOGLE_SHEETS_SPREADSHEET_ID` sea correcto
- Asegúrate de que la hoja tenga las columnas correctas

### Productos de Shopify no aparecen
- Verifica que los productos estén publicados en el canal "Headless"
- Revisa los permisos del Storefront API
- Comprueba el dominio de la tienda en `.env.local`

### El login no funciona
- Regenera `NEXTAUTH_SECRET` con: `openssl rand -base64 32`
- Verifica que `NEXTAUTH_URL` coincida con tu URL

## 📝 Licencia

Este proyecto es privado y pertenece a DEEE TODO.

## 📞 Contacto

**DEEE TODO**
- 📍 Dirección: Carrer de la Muntanya, 11, 46680 Algemesí, Valencia
- 📱 Teléfono/WhatsApp: 657 66 67 41
- 🕒 Horario: Lunes a Sábado, 9:30-14:00 y 17:00-20:00
- ✉️ Email: info@deeetodo.com

---

**"Literalmente, hacemos DEEE TODO"** 🎨✨
