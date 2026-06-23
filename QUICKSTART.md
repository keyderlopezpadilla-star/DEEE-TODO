# 🚀 Guía de Inicio Rápido - DEEE TODO

Empieza a trabajar con DEEE TODO en menos de 10 minutos.

## ⚡ Setup Express (Para Desarrollo)

### 1️⃣ Clonar y Instalar (2 min)

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/deee-todo.git
cd deee-todo

# Instalar dependencias
npm install
```

### 2️⃣ Configurar Variables Mínimas (3 min)

```bash
# Copiar template
cp .env.example .env.local
```

Edita `.env.local` con estos valores mínimos:

```env
# NextAuth (Obligatorio)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=development-secret-change-in-production

# Shopify (Puedes usar valores de prueba temporalmente)
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=demo-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=demo-token

# Google Sheets (Configurar después o dejar vacío)
GOOGLE_SHEETS_CLIENT_EMAIL=
GOOGLE_SHEETS_PRIVATE_KEY=
GOOGLE_SHEETS_SPREADSHEET_ID=
```

> 💡 **Tip**: La app funcionará con usuarios mock sin necesidad de base de datos en desarrollo

### 3️⃣ Iniciar Servidor (1 min)

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) 🎉

### 4️⃣ Probar la Aplicación (2 min)

**Login con usuarios demo:**

| Usuario | Email | Password | Rol |
|---------|-------|----------|-----|
| Cliente Demo | `cliente@example.com` | `demo123` | Cliente |
| Admin Demo | `admin@deeetodo.com` | `admin123` | Administrador |

**Rutas principales:**
- `/` - Landing page
- `/tienda` - Catálogo de productos
- `/cuenta` - Dashboard del usuario
- `/admin` - Panel de administración (solo admin)
- `/contacto` - Formulario de contacto

---

## 🔧 Configuración Completa (Opcional)

### Paso A: Shopify (E-commerce Real)

**Tiempo: ~15 minutos**

1. Crea cuenta en [Shopify](https://shopify.com) (prueba gratis 14 días)
2. Sigue [SHOPIFY_SETUP.md](./SHOPIFY_SETUP.md) para:
   - Crear app personalizada
   - Obtener Storefront API token
   - Configurar productos

3. Actualiza en `.env.local`:
   ```env
   NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=tu-tienda.myshopify.com
   NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=shpat_tu_token_aqui
   ```

### Paso B: Google Sheets (Formularios)

**Tiempo: ~10 minutos**

1. Ve a [Google Cloud Console](https://console.cloud.google.com)
2. Sigue [GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md) para:
   - Crear service account
   - Obtener credenciales JSON
   - Configurar hoja de cálculo

3. Actualiza en `.env.local`:
   ```env
   GOOGLE_SHEETS_CLIENT_EMAIL=cuenta@proyecto.iam.gserviceaccount.com
   GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
   GOOGLE_SHEETS_SPREADSHEET_ID=1ABC123xyz
   ```

### Paso C: Base de Datos (Producción)

**Tiempo: ~5 minutos**

**Opción 1: Vercel Postgres** (Recomendado)
```bash
# Desplegar en Vercel incluye DB gratis
# https://vercel.com/docs/storage/vercel-postgres
```

**Opción 2: Supabase** (Gratis)
1. Crea cuenta en [supabase.com](https://supabase.com)
2. Crea nuevo proyecto
3. Copia connection string de Settings → Database
4. Añade a `.env.local`:
   ```env
   DATABASE_URL=postgresql://postgres:password@db.xxx.supabase.co:5432/postgres
   ```

**Opción 3: PostgreSQL Local**
```bash
# Instalar PostgreSQL
brew install postgresql  # Mac
# o
sudo apt install postgresql  # Linux

# Crear base de datos
createdb deeetodo

# Configurar
DATABASE_URL=postgresql://postgres:password@localhost:5432/deeetodo
```

---

## 📚 Estructura del Código

### Componentes Principales

```
components/
├── ui/                    # Componentes base reutilizables
│   ├── Button.tsx        # Botón con variantes
│   ├── Card.tsx          # Tarjeta glassmorphism
│   ├── Input.tsx         # Campo de entrada
│   └── ParticleBackground.tsx  # Fondo animado
├── layout/               # Layout y navegación
│   ├── Header.tsx        # Header con menú
│   ├── Footer.tsx        # Footer con info
│   └── MainLayout.tsx    # Layout wrapper
├── sections/             # Secciones de páginas
│   ├── HeroSection.tsx   # Hero de landing
│   ├── ProductCatalog.tsx # Catálogo e-commerce
│   └── ContactSection.tsx # Formulario contacto
└── admin/                # Componentes admin panel
    ├── AdminLayout.tsx
    └── AdminSidebar.tsx
```

### APIs y Lógica

```
lib/
├── api/                  # Clientes de APIs externas
│   ├── shopify.ts       # GraphQL queries Shopify
│   └── googleSheets.ts  # Cliente Google Sheets
├── auth/                # Configuración NextAuth
│   └── auth.config.ts   # JWT, providers
├── stores/              # Estado global (Zustand)
│   ├── cartStore.ts     # Estado del carrito
│   └── cookieConsentStore.ts  # Consentimiento cookies
├── utils/               # Utilidades
│   ├── sanitize.ts      # Sanitización inputs
│   ├── adminAuth.ts     # Protección rutas admin
│   └── cn.ts            # Merge de clases CSS
└── types/               # Tipos TypeScript
    └── index.ts         # Tipos compartidos
```

### Rutas de API

```
app/api/
├── auth/
│   ├── [...nextauth]/route.ts  # NextAuth endpoints
│   └── register/route.ts       # Registro de usuarios
├── contact/route.ts            # Formulario de contacto
└── quote/route.ts              # Solicitud de presupuesto
```

---

## 🎨 Personalización

### Cambiar Colores

Edita `app/globals.css`:

```css
:root {
  /* Fondo */
  --color-bg: #0b0c10;
  
  /* Acentos neón */
  --color-primary: #ff007a;    /* Rosa neón */
  --color-secondary: #00f0ff;  /* Cian neón */
  
  /* Glassmorphism */
  --glass-bg: rgba(26, 27, 31, 0.7);
  --glass-border: rgba(255, 255, 255, 0.1);
}
```

### Modificar Partículas

Edita `components/ui/ParticleBackground.tsx`:

```typescript
// Línea ~30
const particleCount = 150;  // Cambiar cantidad

// Línea ~45
const colors = [
  new THREE.Color(0xff007a),  // Color 1
  new THREE.Color(0x00f0ff),  // Color 2
];
```

### Cambiar Información del Negocio

Edita `components/layout/Footer.tsx` y `components/sections/ContactSection.tsx`:

```typescript
const businessInfo = {
  name: "DEEE TODO",
  address: "Carrer de la Muntanya, 11, 46680 Algemesí, Valencia",
  phone: "657 66 67 41",
  email: "info@deeetodo.com",
  schedule: {
    weekdays: "9:30 - 14:00 y 17:00 - 20:00",
    sunday: "Cerrado"
  }
};
```

---

## 🧪 Testing

### Probar Funcionalidades

**E-commerce:**
```bash
# 1. Abrir tienda
open http://localhost:3000/tienda

# 2. Filtrar productos por categoría
# 3. Añadir al carrito
# 4. Abrir carrito desde header
# 5. Modificar cantidades
```

**Autenticación:**
```bash
# 1. Ir a login
open http://localhost:3000/auth/login

# 2. Usar credenciales demo
Email: cliente@example.com
Password: demo123

# 3. Verificar redirección a /cuenta
# 4. Probar logout
```

**Admin Panel:**
```bash
# 1. Login como admin
Email: admin@deeetodo.com
Password: admin123

# 2. Acceder a panel
open http://localhost:3000/admin

# 3. Verificar acceso denegado con usuario normal
```

### Verificar Integraciones

**Google Sheets:**
```bash
# 1. Enviar formulario de contacto
open http://localhost:3000/contacto

# 2. Verificar en Google Sheets que se registró
# 3. Revisar logs en terminal
```

**Shopify:**
```bash
# 1. Verificar productos cargan
open http://localhost:3000/tienda

# 2. Añadir producto al carrito
# 3. Proceder a checkout (redirige a Shopify)
```

---

## 🐛 Problemas Comunes

### Puerto 3000 ya en uso

```bash
# Cambiar puerto
PORT=3001 npm run dev

# O matar proceso en puerto 3000
lsof -ti:3000 | xargs kill
```

### Error: "Cannot find module"

```bash
# Limpiar caché y reinstalar
rm -rf node_modules package-lock.json .next
npm install
```

### Partículas no se ven

```bash
# Verificar que Three.js está instalado
npm list three @react-three/fiber @react-three/drei

# Reinstalar si es necesario
npm install three @react-three/fiber @react-three/drei
```

### "NEXTAUTH_URL must be provided"

```bash
# Verificar .env.local existe
cat .env.local | grep NEXTAUTH_URL

# Si no existe, añadir:
echo "NEXTAUTH_URL=http://localhost:3000" >> .env.local

# Reiniciar servidor
```

---

## 📖 Próximos Pasos

### 1. Configurar Integraciones Completas
- [ ] Shopify para productos reales
- [ ] Google Sheets para formularios
- [ ] Base de datos para usuarios

### 2. Personalizar Contenido
- [ ] Cambiar colores de marca
- [ ] Actualizar textos del hero
- [ ] Añadir productos propios
- [ ] Modificar servicios mostrados

### 3. Preparar para Producción
- [ ] Configurar dominio personalizado
- [ ] Generar NEXTAUTH_SECRET seguro
- [ ] Configurar base de datos producción
- [ ] Revisar páginas legales
- [ ] Configurar analytics

### 4. Desplegar
- [ ] Seguir [DEPLOYMENT.md](./DEPLOYMENT.md)
- [ ] Probar en producción
- [ ] Configurar monitoreo

---

## 📞 Recursos de Ayuda

### Documentación Detallada
- [README.md](./README.md) - Información completa del proyecto
- [ENVIRONMENT_SETUP.md](./ENVIRONMENT_SETUP.md) - Variables de entorno
- [SHOPIFY_SETUP.md](./SHOPIFY_SETUP.md) - Integración Shopify
- [GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md) - Integración Sheets
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Guía de despliegue

### Tecnologías Usadas
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [NextAuth.js](https://next-auth.js.org)
- [Shopify Storefront API](https://shopify.dev/docs/api/storefront)
- [Three.js](https://threejs.org/docs)

---

**¡Listo para empezar! 🚀**

Si tienes problemas, revisa la documentación detallada o los logs de la consola.
