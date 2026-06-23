// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'admin';
  discountPercentage: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserSession {
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
  expires: string;
}

// Product Types
export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  images: ProductImage[];
  variants: ProductVariant[];
  category: string;
  tags: string[];
  available: boolean;
}

export interface ProductImage {
  id: string;
  url: string;
  altText?: string;
}

export interface ProductVariant {
  id: string;
  title: string;
  price: number;
  available: boolean;
  selectedOptions: { name: string; value: string }[];
}

// Order Types
export interface Order {
  id: string;
  userId: string;
  orderNumber: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  status: OrderStatus;
  shippingAddress: Address;
  trackingNumber?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: string;
  productId: string;
  variantId?: string;
  title: string;
  quantity: number;
  price: number;
  image?: string;
}

export type OrderStatus = 
  | 'pending' 
  | 'processing' 
  | 'shipped' 
  | 'delivered' 
  | 'cancelled';

export interface Address {
  name: string;
  phone: string;
  address1: string;
  address2?: string;
  city: string;
  province: string;
  country: string;
  zip: string;
}

// Form Types
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface QuoteFormData {
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  quantity: number;
  description: string;
  files?: File[];
}

// Admin Types
export interface SiteSettings {
  businessHours: BusinessHours;
  contactInfo: ContactInfo;
  siteContent: SiteContent;
  discounts: DiscountSettings;
}

export interface BusinessHours {
  monday: DayHours;
  tuesday: DayHours;
  wednesday: DayHours;
  thursday: DayHours;
  friday: DayHours;
  saturday: DayHours;
  sunday: DayHours;
  holidays: Holiday[];
}

export interface DayHours {
  open: boolean;
  morning: { start: string; end: string };
  afternoon: { start: string; end: string };
}

export interface Holiday {
  date: string;
  name: string;
  closed: boolean;
}

export interface ContactInfo {
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  mapEmbedUrl: string;
}

export interface SiteContent {
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  slogans: string[];
  services: ServiceItem[];
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  featured: boolean;
}

export interface DiscountSettings {
  enabled: boolean;
  defaultPercentage: number;
  userDiscounts: { [userId: string]: number };
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
