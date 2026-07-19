// ============================================================
// CARTICOM ORDERS — Domain Types
// ============================================================

export interface OrderDto {
  id: string;
  storeId: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  escrowStatus: EscrowStatus;
  shippingAddress: Address;
  billingAddress: Address;
  notes?: string;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  total: number;
  image?: string;
}

export interface Address {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

export enum OrderStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
  PARTIALLY_REFUNDED = 'PARTIALLY_REFUNDED',
}

export enum EscrowStatus {
  NOT_APPLICABLE = 'NOT_APPLICABLE',
  HELD = 'HELD',
  RELEASED = 'RELEASED',
  DISPUTED = 'DISPUTED',
}

export interface CreateOrderDto {
  customerId: string;
  items: {
    productId: string;
    quantity: number;
  }[];
  shippingAddress: Address;
  billingAddress: Address;
  notes?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateOrderDto {
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
  escrowStatus?: EscrowStatus;
  notes?: string;
  metadata?: Record<string, unknown>;
}
