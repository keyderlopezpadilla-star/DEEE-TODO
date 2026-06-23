# Guía de Configuración de Variables de Entorno

Esta guía detalla todas las variables de entorno necesarias para ejecutar DEEE TODO.

## 📋 Resumen de Variables

| Variable | Requerida | Descripción | Ejemplo |
|----------|-----------|-------------|---------|
| `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` | ✅ Sí | Dominio de tu tienda Shopify | `tu-tienda.myshopify.com` |
| `NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN` | ✅ Sí | Token de acceso Storefront API | `shpat_xxxxx` |
| `NEXTAUTH_URL` | ✅ Sí | URL base de la aplicación | `http://localhost:3000` |
| `NEXTAUTH_SECRET` | ✅ Sí | Secreto para firmar tokens JWT | Genera con `openssl` |
| `DATABASE_URL` | ⚠️ Producción | Conexión a base de datos | `postgresql://user:pass@host/db` |
| `GOOGLE_SHEETS_CLIENT_EMAIL` | ✅ Sí | Email del service account | `cuenta@proyecto.iam.gserviceaccount.com` |
| `GOOGLE_SHEETS_PRIVATE_KEY` | ✅ Sí | Clave privada del service account | Ver formato abajo |
| `GOOGLE_SHEETS_SPREADSHEET_ID` | ✅ Sí | ID de la hoja de cálculo | `1ABC123xyz` |
| `NEXT_PUBLIC_SITE_URL` | ⚠️ Opcional | URL pública del sitio | `https://deeetodo.com` |
| `NEXT_PUBLIC_SITE_NAME` | ⚠️ Opcional | Nombre del sitio | `DEEE TODO` |

## 🔧 Configuración Paso a Paso

### 1. Crear Archivo de Variables de Entorno

```bash
# En la raíz del proyecto
cp .env.example .env.local
```

### 2. Shopify Configuration

#### NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN

Tu dominio de Shopify en formato `tu-tienda.myshopify.com`

**Cómo obtenerlo:**
1. Accede a tu panel de Shopify
2. El dominio aparece en la URL: `admin.shopify.com/store/TU-TIENDA`
3. Tu dominio es: `TU-TIENDA.myshopify.com`

```env
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=deeetodo.myshopify.com
```

#### NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN

Token de acceso a la Storefront API de Shopify.

**Cómo obtenerlo:**
1. En Shopify Admin: **Settings** → **Apps and sales channels**
2. Click **Develop apps** → **Create an app**
3. Nombra tu app (ej: "DEEE TODO Headless")
4. **Configure Storefront API scopes** → Habilita:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_product_inventory`
   - `unauthenticated_read_checkouts`
   - `unauthenticated_write_checkouts`
5. **Install app**
6. En **API credentials**, copia el **Storefront API access token**

```env
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=shpat_1a2b3c4d5e6f7g8h9i0j
```

> Ver [SHOPIFY_SETUP.md](./SHOPIFY_SETUP.md) para guía completa

---

### 3. NextAuth Configuration

#### NEXTAUTH_URL

URL base donde corre tu aplicación.

**Desarrollo:**
```env
NEXTAUTH_URL=http://localhost:3000
```

**Producción:**
```env
NEXTAUTH_URL=https://deeetodo.com
```

#### NEXTAUTH_SECRET

Secreto aleatorio para firmar y encriptar tokens JWT.

**Generar en Linux/Mac:**
```bash
openssl rand -base64 32
```

**Generar en Windows:**
```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

**Ejemplo:**
```env
NEXTAUTH_SECRET=jZ8x9kL2mN3pQ4rT5vW6yA7bC8dE9fG0h
```

> ⚠️ **IMPORTANTE**: Usa un secreto diferente para desarrollo y producción

---

### 4. Database Configuration

#### DATABASE_URL

Conexión a tu base de datos PostgreSQL.

**Formato:**
```
postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public
```

**Desarrollo Local:**
```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/deeetodo
```

**Producción (Vercel Postgres):**
```env
DATABASE_URL=postgres://default:abc123@ep-example.us-east-1.postgres.vercel-storage.com:5432/verceldb
```

**Producción (Supabase):**
```env
DATABASE_URL=postgresql://postgres:password@db.projectref.supabase.co:5432/postgres
```

**Producción (Railway):**
```env
DATABASE_URL=postgresql://postgres:password@containers-us-west-123.railway.app:7654/railway
```

> 📝 **Nota**: En desarrollo puedes usar usuarios mock sin base de datos. La base de datos es necesaria para producción.

---

### 5. Google Sheets API Configuration

#### GOOGLE_SHEETS_CLIENT_EMAIL

Email del service account de Google Cloud.

**Cómo obtenerlo:**
1. Ve a [Google Cloud Console](https://console.cloud.google.com)
2. Crea un proyecto nuevo o selecciona uno existente
3. **APIs & Services** → **Credentials**
4. **Create Credentials** → **Service Account**
5. Copia el email generado (termina en `@xxx.iam.gserviceaccount.com`)

```env
GOOGLE_SHEETS_CLIENT_EMAIL=deeetodo-sheets@proyecto-123456.iam.gserviceaccount.com
```

#### GOOGLE_SHEETS_PRIVATE_KEY

Clave privada del service account en formato PEM.

**Cómo obtenerla:**
1. En Google Cloud Console, después de crear el service account
2. Click en el service account → **Keys** tab
3. **Add Key** → **Create new key** → **JSON**
4. Descarga el archivo JSON
5. Abre el archivo y copia el valor de `"private_key"`

**⚠️ FORMATO IMPORTANTE:**

El valor debe incluir:
- Las comillas al inicio y final
- Los saltos de línea como `\n`
- `-----BEGIN PRIVATE KEY-----` y `-----END PRIVATE KEY-----`

**Ejemplo:**
```env
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC\nxyz123...\n-----END PRIVATE KEY-----\n"
```

**Problemas comunes:**
- ❌ Olvidar las comillas externas: `GOOGLE_SHEETS_PRIVATE_KEY="..."`
- ❌ Saltos de línea literales en lugar de `\n`
- ❌ Espacios extra al copiar/pegar

**Validar formato:**
```bash
# La clave debe tener exactamente 1 línea
echo "$GOOGLE_SHEETS_PRIVATE_KEY" | wc -l
# Output esperado: 1
```

#### GOOGLE_SHEETS_SPREADSHEET_ID

ID de tu hoja de cálculo de Google Sheets.

**Cómo obtenerlo:**
1. Abre tu Google Sheet
2. La URL tiene este formato:
   ```
   https://docs.google.com/spreadsheets/d/1ABC123xyz456DEF/edit
   ```
3. El ID es la parte entre `/d/` y `/edit`: `1ABC123xyz456DEF`

```env
GOOGLE_SHEETS_SPREADSHEET_ID=1ABC123xyz456DEF
```

**Configurar la hoja:**
1. Crea 3 hojas (tabs) con estos nombres exactos:
   - `Contactos`
   - `Presupuestos`
   - `Usuarios`

2. Comparte la hoja con el service account:
   - Click en **Share** (Compartir)
   - Pega el `GOOGLE_SHEETS_CLIENT_EMAIL`
   - Permiso: **Editor**

> Ver [GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md) para guía completa

---

### 6. Site Configuration (Opcional)

#### NEXT_PUBLIC_SITE_URL

URL pública de tu sitio para SEO y compartir en redes sociales.

```env
# Desarrollo
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Producción
NEXT_PUBLIC_SITE_URL=https://deeetodo.com
```

#### NEXT_PUBLIC_SITE_NAME

Nombre del sitio para metadatos y SEO.

```env
NEXT_PUBLIC_SITE_NAME="DEEE TODO"
```

---

## 📄 Archivo Completo de Ejemplo

### .env.local (Desarrollo)

```env
# ============================================
# SHOPIFY CONFIGURATION
# ============================================
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=tu-tienda.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=shpat_1a2b3c4d5e6f7g8h9i0j

# ============================================
# NEXTAUTH CONFIGURATION
# ============================================
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=jZ8x9kL2mN3pQ4rT5vW6yA7bC8dE9fG0h

# ============================================
# DATABASE CONFIGURATION (Opcional en dev)
# ============================================
# DATABASE_URL=postgresql://postgres:password@localhost:5432/deeetodo

# ============================================
# GOOGLE SHEETS API CONFIGURATION
# ============================================
GOOGLE_SHEETS_CLIENT_EMAIL=deeetodo-sheets@proyecto-123456.iam.gserviceaccount.com
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCxyz...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEETS_SPREADSHEET_ID=1ABC123xyz456DEF

# ============================================
# SITE CONFIGURATION
# ============================================
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME="DEEE TODO"

# ============================================
# EMAIL CONFIGURATION (Opcional)
# ============================================
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=587
# SMTP_USER=info@deeetodo.com
# SMTP_PASSWORD=tu_app_password_aqui
```

### .env.production (Producción)

```env
# ============================================
# SHOPIFY CONFIGURATION
# ============================================
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=deeetodo.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=shpat_produccion_token_aqui

# ============================================
# NEXTAUTH CONFIGURATION
# ============================================
NEXTAUTH_URL=https://deeetodo.com
NEXTAUTH_SECRET=secret_diferente_para_produccion_muy_largo_y_seguro

# ============================================
# DATABASE CONFIGURATION
# ============================================
DATABASE_URL=postgresql://user:pass@production-host.com:5432/deeetodo_prod?sslmode=require

# ============================================
# GOOGLE SHEETS API CONFIGURATION
# ============================================
GOOGLE_SHEETS_CLIENT_EMAIL=deeetodo-prod@proyecto-prod.iam.gserviceaccount.com
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEETS_SPREADSHEET_ID=1ProductionSheetID

# ============================================
# SITE CONFIGURATION
# ============================================
NEXT_PUBLIC_SITE_URL=https://deeetodo.com
NEXT_PUBLIC_SITE_NAME="DEEE TODO"
```

---

## ✅ Verificar Configuración

### Script de Verificación

Crea `scripts/verify-env.js`:

```javascript
const requiredEnvVars = [
  'NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN',
  'NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN',
  'NEXTAUTH_URL',
  'NEXTAUTH_SECRET',
  'GOOGLE_SHEETS_CLIENT_EMAIL',
  'GOOGLE_SHEETS_PRIVATE_KEY',
  'GOOGLE_SHEETS_SPREADSHEET_ID',
];

console.log('🔍 Verificando variables de entorno...\n');

let allPresent = true;

requiredEnvVars.forEach((varName) => {
  if (process.env[varName]) {
    console.log(`✅ ${varName}`);
  } else {
    console.log(`❌ ${varName} - FALTA`);
    allPresent = false;
  }
});

console.log('\n' + '='.repeat(50));

if (allPresent) {
  console.log('✅ Todas las variables requeridas están configuradas');
  process.exit(0);
} else {
  console.log('❌ Faltan variables de entorno. Revisa .env.local');
  process.exit(1);
}
```

**Ejecutar:**
```bash
node scripts/verify-env.js
```

---

## 🔒 Seguridad

### Buenas Prácticas

1. **Nunca hacer commit de archivos `.env`**
   ```bash
   # Ya incluido en .gitignore
   .env.local
   .env.production
   .env*.local
   ```

2. **Usar diferentes secretos por entorno**
   - Desarrollo: `NEXTAUTH_SECRET` simple
   - Producción: `NEXTAUTH_SECRET` complejo y único

3. **Rotar credenciales regularmente**
   - Google Sheets: cada 6 meses
   - NEXTAUTH_SECRET: cada año
   - Shopify tokens: según políticas de Shopify

4. **Limitar permisos de service accounts**
   - Google Sheets: Solo acceso a la hoja específica
   - Shopify: Solo permisos necesarios

### Variables Públicas vs Privadas

**Variables PÚBLICAS** (incluyen `NEXT_PUBLIC_`):
- Se exponen en el navegador
- Pueden ser vistas por usuarios
- Usar solo para: dominios, IDs públicos, configuración no sensible

**Variables PRIVADAS** (sin `NEXT_PUBLIC_`):
- Solo disponibles en servidor
- Nunca se exponen al cliente
- Usar para: secretos, claves privadas, tokens, passwords

---

## 🆘 Troubleshooting

### "NEXTAUTH_URL environment variable is not set"

**Solución:**
```bash
# Verifica que .env.local existe
ls -la .env.local

# Verifica el contenido
cat .env.local | grep NEXTAUTH_URL

# Reinicia el servidor dev
npm run dev
```

### "Invalid signature" en Google Sheets

**Problema**: `GOOGLE_SHEETS_PRIVATE_KEY` mal formateado

**Solución:**
1. Asegúrate de que tiene comillas: `GOOGLE_SHEETS_PRIVATE_KEY="..."`
2. Verifica que los `\n` son literales, no saltos de línea reales
3. Copia directo del archivo JSON descargado

### "Shopify Storefront API access denied"

**Problema**: Token inválido o permisos incorrectos

**Solución:**
1. Verifica que el app está **instalada** en tu tienda
2. Confirma los scopes de API están habilitados
3. Regenera el token si es necesario

### "Failed to connect to database"

**Problema**: DATABASE_URL incorrecta o DB no accesible

**Solución:**
1. Verifica el formato de la URL
2. Comprueba que la DB está corriendo
3. Verifica firewall/IP whitelist
4. En desarrollo: la DB es opcional, usa usuarios mock

---

## 📚 Referencias

- [Next.js Environment Variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)
- [NextAuth.js Configuration](https://next-auth.js.org/configuration/options)
- [Shopify Storefront API](https://shopify.dev/docs/api/storefront)
- [Google Sheets API](https://developers.google.com/sheets/api)

---

**¿Necesitas ayuda?** Consulta las guías específicas:
- [SHOPIFY_SETUP.md](./SHOPIFY_SETUP.md)
- [GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md)
- [DEPLOYMENT.md](./DEPLOYMENT.md)
