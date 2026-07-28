export interface GuestCheckoutRequest {
  storeId: string;
  items: {
    productId: string;
    quantity: number;
    variantId?: string;
  }[];
  email: string;
  phone: string;
  shippingAddress: {
    fullName: string;
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  couponCode?: string;
}

export interface GuestCheckoutResponse {
  orderId: string;
  orderNumber: string;
  reference: string;
  total: number;
  paymentUrl: string;
  status: string;
}

export interface GuestOrderTrackResponse {
  orderNumber: string;
  status: string;
  items: {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  timeline: {
    status: string;
    timestamp: string;
    note?: string;
  }[];
}
