# Guía de Despliegue - DEEE TODO

Esta guía te ayudará a desplegar la plataforma DEEE TODO en producción.

## 📋 Checklist Pre-Despliegue

Antes de desplegar, asegúrate de completar:

- [ ] Todas las variables de entorno están configuradas
- [ ] Integración de Shopify funcionando correctamente
- [ ] Google Sheets API configurada y probada
- [ ] Base de datos de producción configurada
- [ ] Credenciales de admin actualizadas (no usar demo)
- [ ] Páginas legales revisadas y personalizadas
- [ ] SSL/HTTPS configurado
- [ ] Dominio personalizado listo (opcional)
- [ ] Analytics configurados (opcional)

## 🚀 Opción 1: Vercel (Recomendado)

Vercel es la plataforma oficial de Next.js y ofrece la mejor experiencia de despliegue.

### Paso 1: Preparar el Proyecto

```bash
# Asegúrate de que el build funciona localmente
npm run build
npm run start

# Haz commit de tus cambios
git add .
git commit -m "Preparar para producción"
git push origin main
```

### Paso 2: Importar en Vercel

1. Ve a [vercel.com](https://vercel.com) y crea una cuenta
2. Click en **"Add New Project"**
3. Importa tu repositorio de GitHub/GitLab/Bitbucket
4. Vercel detectará automáticamente que es un proyecto Next.js

### Paso 3: Configurar Variables de Entorno

En el dashboard de Vercel, ve a **Settings** → **Environment Variables** y añade:

```env
# Shopify
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=tu-tienda.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=shpat_xxxxx

# NextAuth
NEXTAUTH_URL=https://tu-dominio.vercel.app
NEXTAUTH_SECRET=tu_secret_produccion_aqui

# Base de Datos
DATABASE_URL=postgresql://user:pass@host:5432/db

# Google Sheets
GOOGLE_SHEETS_CLIENT_EMAIL=service@project.iam.gserviceaccount.com
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEETS_SPREADSHEET_ID=1ABC123xyz

# Site Config
NEXT_PUBLIC_SITE_URL=https://tu-dominio.vercel.app
NEXT_PUBLIC_SITE_NAME="DEEE TODO"
```

> **Importante**: Asegúrate de entrecomillar correctamente `GOOGLE_SHEETS_PRIVATE_KEY`

### Paso 4: Deploy

1. Click en **"Deploy"**
2. Espera a que termine el build (2-5 minutos)
3. Tu sitio estará disponible en `https://tu-proyecto.vercel.app`

### Paso 5: Configurar Dominio Personalizado (Opcional)

1. En Vercel, ve a **Settings** → **Domains**
2. Añade tu dominio (ej: `deeetodo.com`)
3. Configura los DNS según las instrucciones de Vercel
4. Actualiza `NEXTAUTH_URL` y `NEXT_PUBLIC_SITE_URL` con tu nuevo dominio

### Despliegues Automáticos

Vercel desplegará automáticamente:
- **Production**: cada push a `main`
- **Preview**: cada push a otras ramas o pull requests

## 🌊 Opción 2: Netlify

### Paso 1: Preparar netlify.toml

Crea un archivo `netlify.toml` en la raíz:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "camera=(), microphone=(), geolocation=()"
```

### Paso 2: Deploy en Netlify

1. Ve a [netlify.com](https://netlify.com)
2. Click en **"Add new site"** → **"Import an existing project"**
3. Conecta tu repositorio
4. Netlify detectará la configuración automáticamente
5. Añade las variables de entorno (igual que en Vercel)
6. Click en **"Deploy site"**

## ☁️ Opción 3: AWS Amplify

### Paso 1: Instalar AWS CLI

```bash
npm install -g @aws-amplify/cli
amplify configure
```

### Paso 2: Inicializar Amplify

```bash
amplify init
amplify add hosting
amplify publish
```

### Paso 3: Configurar Variables

```bash
amplify env add prod
# Configura las variables en AWS Console → Amplify → Environment variables
```

## 🐳 Opción 4: Docker + VPS (Avanzado)

### Paso 1: Crear Dockerfile

```dockerfile
FROM node:18-alpine AS base

# Dependencias
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Runner
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

### Paso 2: Crear docker-compose.yml

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
      - NEXTAUTH_URL=${NEXTAUTH_URL}
      - NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
    depends_on:
      - db
    restart: unless-stopped

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: deeetodo
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - app
    restart: unless-stopped

volumes:
  postgres_data:
```

### Paso 3: Desplegar en VPS

```bash
# En tu VPS (DigitalOcean, Linode, etc.)
git clone https://github.com/tu-usuario/deee-todo.git
cd deee-todo

# Configurar variables de entorno
cp .env.example .env.production
nano .env.production

# Build y start
docker-compose up -d
```

## 🗄️ Configuración de Base de Datos

### PostgreSQL en Producción

#### Opción A: Vercel Postgres

```bash
# Instalar
npm install @vercel/postgres

# En Vercel Dashboard:
# Storage → Create Database → Postgres
# Vercel añadirá automáticamente DATABASE_URL
```

#### Opción B: Supabase

1. Crea una cuenta en [supabase.com](https://supabase.com)
2. Crea un nuevo proyecto
3. Copia la connection string desde Settings → Database
4. Añade `DATABASE_URL` a tus variables de entorno

#### Opción C: Railway

1. Ve a [railway.app](https://railway.app)
2. Click en **"New Project"** → **"Provision PostgreSQL"**
3. Copia la connection string
4. Añádela como `DATABASE_URL`

### Migrar Base de Datos

```bash
# Si usas Prisma
npx prisma migrate deploy

# Si usas SQL directo
psql $DATABASE_URL < schema.sql
```

## 🔐 Seguridad en Producción

### 1. Generar NEXTAUTH_SECRET Seguro

```bash
openssl rand -base64 32
```

### 2. Configurar HTTPS

Todas las plataformas modernas (Vercel, Netlify) incluyen SSL automático.

Para VPS con nginx:

```bash
# Instalar Certbot
sudo apt install certbot python3-certbot-nginx

# Obtener certificado
sudo certbot --nginx -d deeetodo.com -d www.deeetodo.com
```

### 3. Proteger Variables de Entorno

- **Nunca** hagas commit de `.env.local` o `.env.production`
- Usa servicios como **Vercel Secrets** o **AWS Secrets Manager**
- Rota las credenciales regularmente

### 4. Configurar Rate Limiting

Ya está implementado en el código, pero considera añadir:
- Cloudflare para protección DDoS
- AWS WAF para reglas avanzadas

## 📊 Monitoreo y Analytics

### Google Analytics 4

1. Crea una propiedad GA4 en [analytics.google.com](https://analytics.google.com)
2. Obtén tu `MEASUREMENT_ID`
3. Añade el script en `app/layout.tsx`:

```tsx
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  `}
</Script>
```

### Sentry (Monitoreo de Errores)

```bash
npm install @sentry/nextjs
npx @sentry/wizard -i nextjs
```

### Vercel Analytics

Ya incluido automáticamente en Vercel. Actívalo en:
**Dashboard → Analytics → Enable**

## 🚦 Testing Post-Despliegue

Después de desplegar, verifica:

### Funcionalidad Básica
- [ ] Landing page carga correctamente
- [ ] Partículas de fondo se animan
- [ ] Navegación funciona en mobile y desktop
- [ ] Footer muestra información correcta

### E-commerce
- [ ] Productos se cargan desde Shopify
- [ ] Filtros y búsqueda funcionan
- [ ] Carrito añade/elimina productos
- [ ] Checkout redirige a Shopify

### Autenticación
- [ ] Registro crea nuevo usuario
- [ ] Login funciona correctamente
- [ ] Dashboard del usuario accesible
- [ ] Logout funciona

### Admin Panel
- [ ] Solo accesible con rol admin
- [ ] Dashboard muestra estadísticas
- [ ] Gestión de usuarios funciona

### Integraciones
- [ ] Formulario de contacto envía a Google Sheets
- [ ] Solicitud de presupuesto registra en Sheets
- [ ] Mapas de Google se muestran correctamente

### Legal y Seguridad
- [ ] Banner de cookies funciona
- [ ] Páginas legales accesibles
- [ ] Headers de seguridad activos (verifica con [securityheaders.com](https://securityheaders.com))
- [ ] HTTPS forzado

### Performance
- [ ] Lighthouse score > 90 (Performance, Accessibility, SEO)
- [ ] Tiempo de carga < 3 segundos
- [ ] Imágenes optimizadas

## 🔄 Actualizaciones y Mantenimiento

### Actualizar Contenido

```bash
# Pull últimos cambios
git pull origin main

# En Vercel/Netlify se desplegará automáticamente
# En VPS con Docker:
docker-compose down
docker-compose up -d --build
```

### Backups de Base de Datos

```bash
# Backup automático con pg_dump
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d).sql

# Restaurar
psql $DATABASE_URL < backup_20240101.sql
```

### Actualizar Dependencias

```bash
# Verificar actualizaciones
npm outdated

# Actualizar
npm update

# Actualizar Next.js major version
npm install next@latest react@latest react-dom@latest
```

## 🆘 Troubleshooting Producción

### Error: "NEXTAUTH_URL environment variable not set"
- Añade `NEXTAUTH_URL=https://tu-dominio.com` en variables de entorno

### Error: "Failed to connect to database"
- Verifica que `DATABASE_URL` esté correctamente configurada
- Comprueba que la IP del servidor está permitida en el firewall de la DB

### Productos no cargan en producción
- Verifica que `NEXT_PUBLIC_SHOPIFY_*` variables estén configuradas
- Asegúrate de que el dominio de producción está permitido en Shopify

### Google Sheets no registra
- Verifica que `GOOGLE_SHEETS_PRIVATE_KEY` está entrecomillado correctamente
- Comprueba que los saltos de línea `\n` están presentes

## 📞 Soporte

Para problemas de despliegue:
1. Revisa los logs de la plataforma (Vercel, Netlify, etc.)
2. Verifica las variables de entorno
3. Comprueba la consola del navegador
4. Revisa los errores de API en Network tab

---

**¡Tu plataforma DEEE TODO está lista para producción!** 🚀
