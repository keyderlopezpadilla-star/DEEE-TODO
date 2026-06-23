import { Product } from '../types';

/**
 * Sample products for demonstration
 * In production, these would come from Shopify Storefront API
 */
export const sampleProducts: Product[] = [
  {
    id: '1',
    title: 'Camiseta Personalizada DTF',
    description: 'Camiseta 100% algodón con impresión DTF de alta calidad. Colores vibrantes y durabilidad excepcional.',
    price: 15.99,
    compareAtPrice: 19.99,
    images: [
      {
        id: '1-1',
        url: '/images/products/camiseta-dtf.jpg',
        altText: 'Camiseta personalizada con impresión DTF',
      },
    ],
    variants: [],
    category: 'Textil',
    tags: ['personalización', 'dtf', 'camisetas'],
    available: true,
  },
  {
    id: '2',
    title: 'Taza Sublimada Personalizada',
    description: 'Taza de cerámica blanca con sublimación. Resistente al lavavajillas. Personalízala con tu diseño.',
    price: 8.99,
    images: [
      {
        id: '2-1',
        url: '/images/products/taza-sublimada.jpg',
        altText: 'Taza personalizada con sublimación',
      },
    ],
    variants: [],
    category: 'Regalos',
    tags: ['sublimación', 'tazas', 'regalos'],
    available: true,
  },
  {
    id: '3',
    title: 'Cartel Publicitario A1',
    description: 'Cartel impreso en papel de alta calidad. Ideal para eventos, tiendas y promociones.',
    price: 24.99,
    compareAtPrice: 29.99,
    images: [
      {
        id: '3-1',
        url: '/images/products/cartel-a1.jpg',
        altText: 'Cartel publicitario A1',
      },
    ],
    variants: [],
    category: 'Cartelería',
    tags: ['carteles', 'publicidad', 'gran formato'],
    available: true,
  },
  {
    id: '4',
    title: 'Vinilo Decorativo Personalizado',
    description: 'Vinilo adhesivo de corte personalizado. Perfecto para paredes, cristales y vehículos.',
    price: 12.99,
    images: [
      {
        id: '4-1',
        url: '/images/products/vinilo-decorativo.jpg',
        altText: 'Vinilo decorativo personalizado',
      },
    ],
    variants: [],
    category: 'Vinilos',
    tags: ['vinilos', 'decoración', 'adhesivos'],
    available: true,
  },
  {
    id: '5',
    title: 'Cojín Sublimado 40x40cm',
    description: 'Cojín con funda sublimada a doble cara. Relleno incluido. Perfecto para regalar.',
    price: 16.99,
    images: [
      {
        id: '5-1',
        url: '/images/products/cojin-sublimado.jpg',
        altText: 'Cojín sublimado personalizado',
      },
    ],
    variants: [],
    category: 'Regalos',
    tags: ['sublimación', 'cojines', 'hogar'],
    available: true,
  },
  {
    id: '6',
    title: 'Lona Publicitaria 2x1m',
    description: 'Lona impresa en alta resolución. Resistente al agua y rayos UV. Incluye ojales.',
    price: 45.00,
    images: [
      {
        id: '6-1',
        url: '/images/products/lona-publicitaria.jpg',
        altText: 'Lona publicitaria impresa',
      },
    ],
    variants: [],
    category: 'Cartelería',
    tags: ['lonas', 'exterior', 'publicidad'],
    available: true,
  },
  {
    id: '7',
    title: 'Calendario Personalizado A3',
    description: 'Calendario de pared con tus fotos. Papel de 250g. Espiral metálica incluida.',
    price: 18.99,
    images: [
      {
        id: '7-1',
        url: '/images/products/calendario-a3.jpg',
        altText: 'Calendario personalizado A3',
      },
    ],
    variants: [],
    category: 'Regalos',
    tags: ['calendarios', 'personalización', 'papelería'],
    available: true,
  },
  {
    id: '8',
    title: 'Sudadera DTF Personalizada',
    description: 'Sudadera con capucha de calidad premium. Impresión DTF de larga duración.',
    price: 28.99,
    compareAtPrice: 34.99,
    images: [
      {
        id: '8-1',
        url: '/images/products/sudadera-dtf.jpg',
        altText: 'Sudadera personalizada con DTF',
      },
    ],
    variants: [],
    category: 'Textil',
    tags: ['dtf', 'sudaderas', 'ropa'],
    available: true,
  },
  {
    id: '9',
    title: 'Banner Roll-Up 85x200cm',
    description: 'Banner enrollable con estructura metálica y bolsa de transporte. Impresión de alta calidad.',
    price: 65.00,
    images: [
      {
        id: '9-1',
        url: '/images/products/roll-up.jpg',
        altText: 'Banner Roll-Up publicitario',
      },
    ],
    variants: [],
    category: 'Cartelería',
    tags: ['roll-up', 'banner', 'eventos'],
    available: true,
  },
  {
    id: '10',
    title: 'Pegatinas Troqueladas (100 uds)',
    description: 'Pegatinas personalizadas con forma a tu elección. Vinilo resistente al agua.',
    price: 22.99,
    images: [
      {
        id: '10-1',
        url: '/images/products/pegatinas.jpg',
        altText: 'Pegatinas personalizadas troqueladas',
      },
    ],
    variants: [],
    category: 'Vinilos',
    tags: ['pegatinas', 'stickers', 'vinilo'],
    available: true,
  },
  {
    id: '11',
    title: 'Bolsa de Tela Sublimada',
    description: 'Bolsa de tela de algodón con sublimación. Ecológica y reutilizable.',
    price: 9.99,
    images: [
      {
        id: '11-1',
        url: '/images/products/bolsa-tela.jpg',
        altText: 'Bolsa de tela sublimada',
      },
    ],
    variants: [],
    category: 'Textil',
    tags: ['bolsas', 'sublimación', 'ecológico'],
    available: true,
  },
  {
    id: '12',
    title: 'Póster Impresión UV A0',
    description: 'Póster de gran formato con impresión UV. Colores intensos y acabado profesional.',
    price: 38.99,
    images: [
      {
        id: '12-1',
        url: '/images/products/poster-uv.jpg',
        altText: 'Póster impresión UV A0',
      },
    ],
    variants: [],
    category: 'Cartelería',
    tags: ['posters', 'uv', 'gran formato'],
    available: false,
  },
];
