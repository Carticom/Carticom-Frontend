// ============================================================
// CARTICOM AI — Domain Types
// ============================================================

export interface AIConfigDto {
  id: string;
  storeId: string;
  enabled: boolean;
  provider: string;
  model: string;
  status: AIStatus;
  settings: AISettings;
  usage: AIUsage;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface AISettings {
  welcomeMessage: string;
  fallbackMessage: string;
  language: string;
  tone: string;
  autoReply: boolean;
  businessHours: {
    enabled: boolean;
    timezone: string;
    schedule: Record<string, { start: string; end: string }>;
  };
}

export interface AIUsage {
  conversations: number;
  messages: number;
  tokensUsed: number;
  lastUsed?: string;
}

export interface CreateAIConfigDto {
  provider: string;
  model: string;
  settings?: Partial<AISettings>;
  metadata?: Record<string, unknown>;
}

export interface UpdateAIConfigDto {
  enabled?: boolean;
  settings?: Partial<AISettings>;
  metadata?: Record<string, unknown>;
}

export enum AIStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  ERROR = 'ERROR',
  PENDING = 'PENDING'}