export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface ColorOption {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: 'ceramics' | 'lighting' | 'audio' | 'textiles' | 'workspace';
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  inventoryCount: number;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  origin: string;
  material: string;
  dimensions: string;
  description: string;
  story: string;
  features: string[];
  image: string;
  secondaryImage?: string;
  colors?: ColorOption[];
  reviews: Review[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface Coupon {
  code: string;
  discountPercent: number;
  minSpend: number;
  description: string;
}

export interface ShippingDetails {
  fullName: string;
  email: string;
  phone: string;
  street: string;
  apartment?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  tax: number;
  total: number;
  shippingDetails: ShippingDetails;
  shippingMethod: 'standard' | 'express';
  paymentMethod: 'card' | 'cod' | 'digital';
  status: 'confirmed' | 'processing' | 'shipped' | 'delivered';
  estimatedDelivery: string;
  trackingNumber: string;
}
