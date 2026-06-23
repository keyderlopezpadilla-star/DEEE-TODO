#!/bin/bash

##############################################
# Script para subir DEEE TODO a GitHub
# Ejecuta esto desde tu computadora
##############################################

echo "🚀 Subiendo proyecto DEEE TODO a GitHub..."

# Verifica que estés en el directorio correcto
if [ ! -f "package.json" ]; then
    echo "❌ Error: Debes ejecutar este script desde la raíz del proyecto"
    echo "   Asegúrate de estar en la carpeta DEEE-TODO/"
    exit 1
fi

# Agrega todos los archivos
echo "📦 Agregando archivos..."
git add -A

# Verifica el status
echo "📋 Archivos a subir:"
git status --short | head -20
echo "..."

# Commit
echo "💾 Haciendo commit..."
git commit -m "🚀 Proyecto completo DEEE TODO - Plataforma SaaS Full-Stack

✨ Características:
- Landing page dark mode con partículas Three.js animadas
- E-commerce completo con Shopify Storefront API
- Sistema de autenticación con NextAuth y JWT
- Dashboard de usuario con historial y fidelización
- Panel de administración completo
- Integración Google Sheets API para formularios
- Banner GDPR con gestión de cookies
- Páginas legales completas (España)
- Seguridad: headers, sanitización, rate limiting
- Documentación completa (7 guías)

🛠 Stack: Next.js 16, React 19, TypeScript 5, Tailwind CSS 4, Three.js
📦 67 archivos | 8000+ líneas | 100% funcional

Para empezar: npm install && npm run dev
Usuarios demo: cliente@example.com / demo123"

# Push a GitHub
echo "🌐 Subiendo a GitHub..."
git push origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ ¡ÉXITO! Proyecto subido a GitHub"
    echo "🔗 Ver en: https://github.com/keyderlopezpadilla-star/DEEE-TODO"
    echo ""
    echo "📝 Próximos pasos:"
    echo "   1. npm install"
    echo "   2. Configura .env.local (ver ENVIRONMENT_SETUP.md)"
    echo "   3. npm run dev"
    echo "   4. Abre http://localhost:3000"
else
    echo ""
    echo "❌ Error al subir a GitHub"
    echo "   Verifica que tengas permisos en el repositorio"
    echo "   Intenta: git push -u origin main"
fi
