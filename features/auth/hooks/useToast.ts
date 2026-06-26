// ============================================================
// CARTICOM AUTHENTICATION — Toast Notifications
// ============================================================
// Re-exports from centralized notification system
// for backward compatibility
// ============================================================

'use client';

export {
  showToast,
  toastSuccess,
  toastError,
  toastWarning,
  toastInfo,
  toastLoading,
  dismissToast,
  dismissAllToasts,
  showPromiseToast,
  authToasts,
  notificationToasts,
} from '@/lib/notifications/toast';

export type { ToastType, ToastOptions } from '@/lib/notifications/toast';