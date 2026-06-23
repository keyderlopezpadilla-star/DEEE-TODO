#!/bin/bash

##############################################
# Script de Setup Completo - DEEE TODO
# Ejecuta este script en tu computadora para
# recrear todo el proyecto automáticamente
##############################################

echo "🚀 Iniciando setup de DEEE TODO..."

# Colores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 1. Verificar que estamos en un directorio git
if [ ! -d ".git" ]; then
    echo "❌ Error: Debes ejecutar este script dentro de tu repositorio clonado"
    echo "   Primero ejecuta: git clone https://github.com/keyderlopezpadilla-star/deeeeee.git"
    exit 1
fi

echo -e "${GREEN}✓${NC} Directorio git detectado"

# 2. Crear estructura de carpetas
echo -e "${BLUE}📁 Creando estructura de carpetas...${NC}"

mkdir -p app/{admin/{configuracion,usuarios},api/{auth,contact,quote},auth/{login,registro},cuenta/{configuracion,pedidos},legal/{aviso-legal,privacidad,terminos},tienda,contacto}
mkdir -p components/{admin,auth,dashboard,layout,sections,ui}
mkdir -p lib/{api,auth,data,hooks,stores,types,utils}
mkdir -p types
mkdir -p public

echo -e "${GREEN}✓${NC} Estructura de carpetas creada"

# 3. Instalar dependencias
echo -e "${BLUE}📦 Instalando dependencias...${NC}"

npm install next@16.2.9 react@19.2.4 react-dom@19.2.4
npm install @hookform/resolvers@^5.4.0 @react-three/drei@^10.7.7 @react-three/fiber@^9.6.1
npm install @types/bcrypt@^6.0.0 bcrypt@^6.0.0
npm install class-variance-authority@^0.7.1 clsx@^2.1.1
npm install googleapis@^173.0.0 jwt-decode@^4.0.0
npm install lucide-react@^1.21.0 next-auth@^4.24.14
npm install react-hook-form@^7.80.0 tailwind-merge@^3.6.0
npm install three@^0.184.0 zod@^4.4.3 zustand@^5.0.14

npm install -D @tailwindcss/postcss@^4 @types/node@^20 @types/react@^19
npm install -D @types/react-dom@^19 eslint@^9 eslint-config-next@16.2.9
npm install -D tailwindcss@^4 typescript@^5

echo -e "${GREEN}✓${NC} Dependencias instaladas"

echo ""
echo -e "${GREEN}════════════════════════════════════════${NC}"
echo -e "${GREEN}   ✓ Setup completado exitosamente      ${NC}"
echo -e "${GREEN}════════════════════════════════════════${NC}"
echo ""
echo "📝 Próximos pasos:"
echo "   1. Los archivos de código se crearán en el siguiente paso"
echo "   2. Ejecuta: npm run dev"
echo "   3. Abre: http://localhost:3000"
echo ""
