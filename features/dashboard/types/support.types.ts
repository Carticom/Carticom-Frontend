// ============================================================
// CARTICOM SUPPORT — Domain Types
// ============================================================

export interface SupportTicketDto {
  id: string;
  storeId: string;
  subject: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  category: string;
  assignedTo?: string;
  messages: TicketMessage[];
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface TicketMessage {
  id: string;
  ticketId: string;
  senderId: string;
  senderName: string;
  senderType: 'customer' | 'support' | 'system';
  content: string;
  attachments: string[];
  createdAt: string;
}

export interface CreateSupportTicketDto {
  subject: string;
  description: string;
  category: string;
  priority?: TicketPriority;
  metadata?: Record<string, unknown>;
}

export interface UpdateSupportTicketDto {
  status?: TicketStatus;
  priority?: TicketPriority;
  assignedTo?: string;
  metadata?: Record<string, unknown>;
}

export enum TicketStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  WAITING_FOR_RESPONSE = 'WAITING_FOR_RESPONSE',
  RESOLVED = 'RESOLVED',
  CLOSED = 'CLOSED',
}

export enum TicketPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT',
}