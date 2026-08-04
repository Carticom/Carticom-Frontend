export interface CustomSolutionDto {
  id: string;
  businessName: string;
  industry: string;
  country: string;
  currentWebsite: string;
  employees: string;
  monthlyOrders: string;
  budget: string;
  timeline: string;
  services: string[];
  additionalRequirements: string;
  status: CustomSolutionStatus;
  quotationUrl?: string;
  quotationAmount?: number;
  quotationNote?: string;
  storeId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCustomSolutionDto {
  businessName: string;
  industry: string;
  country: string;
  currentWebsite: string;
  employees: string;
  monthlyOrders: string;
  budget: string;
  timeline: string;
  services: string[];
  additionalRequirements: string;
}

export enum CustomSolutionStatus {
  SUBMITTED = 'SUBMITTED',
  UNDER_REVIEW = 'UNDER_REVIEW',
  MEETING_SCHEDULED = 'MEETING_SCHEDULED',
  QUOTATION_SENT = 'QUOTATION_SENT',
  NEGOTIATION = 'NEGOTIATION',
  APPROVED = 'APPROVED',
  DEVELOPMENT = 'DEVELOPMENT',
  TESTING = 'TESTING',
  DEPLOYED = 'DEPLOYED',
  COMPLETED = 'COMPLETED',
  REJECTED = 'REJECTED'}

export const SERVICE_OPTIONS = [
  'Customer App',
  'Vendor App',
  'Inventory',
  'Marketplace',
  'ERP',
  'POS',
  'WhatsApp Commerce',
  'AI',
  'CRM',
  'Accounting',
  'Delivery',
  'API Integration',
  'Other',
] as const;

export interface CustomSolutionStatistics {
  total: number;
  submitted: number;
  underReview: number;
  meetingScheduled: number;
  quotationSent: number;
  negotiation: number;
  approved: number;
  development: number;
  testing: number;
  deployed: number;
  completed: number;
  rejected: number;
}

export interface UpdateStatusDto {
  status: CustomSolutionStatus;
  note?: string;
}

export interface QuotationDto {
  amount: number;
  note: string;
  file?: File;
}
