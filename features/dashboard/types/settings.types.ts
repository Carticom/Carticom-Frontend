// ============================================================
// CARTICOM SETTINGS — Domain Types
// ============================================================

export interface SettingsDto {
  id: string;
  storeId: string;
  business: BusinessSettings;
  notifications: NotificationSettings;
  security: SecuritySettings;
  store: StoreSettings;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface BusinessSettings {
  businessName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  taxId?: string;
  logo?: string;
}

export interface NotificationSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  orderNotifications: boolean;
  customerNotifications: boolean;
  marketingEmails: boolean;
}

export interface SecuritySettings {
  twoFactorEnabled: boolean;
  sessionTimeout: number;
  allowedIps: string[];
}

export interface StoreSettings {
  storeName: string;
  slug: string;
  description: string;
  currency: string;
  timezone: string;
  language: string;
  maintenanceMode: boolean;
  domain?: string;
}

export interface UpdateSettingsDto {
  business?: Partial<BusinessSettings>;
  notifications?: Partial<NotificationSettings>;
  security?: Partial<SecuritySettings>;
  store?: Partial<StoreSettings>;
  metadata?: Record<string, unknown>;
}