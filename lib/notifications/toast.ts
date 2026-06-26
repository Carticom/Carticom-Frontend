// ============================================================
// CARTICOM — Enhanced Toast & Notification System
// ============================================================

'use client';

import { toast } from 'sonner';

// ─── Types ───────────────────────────────────────────────────

export type ToastType = 'success' | 'error' | 'info' | 'warning' | 'loading';

export interface ToastOptions {
  /** Secondary text displayed below the title */
  description?: string;
  /** Duration in ms before auto-dismiss (default: 5000) */
  duration?: number;
  /** Action button config */
  action?: {
    label: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  };
  /** Cancel/dismiss button config */
  cancel?: string | {
    label: string;
    onClick?: () => void;
  };
  /** Callback when toast is dismissed */
  onDismiss?: () => void;
  /** Whether to show a close button (default: true) */
  closeButton?: boolean;
  /** Custom CSS class */
  className?: string;
  /** Toast position override */
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center';
  /** Unique ID to prevent duplicate toasts */
  id?: string;
  /** Whether to stack with existing toasts (default: true) */
  important?: boolean;
}

// ─── Internal Toast ID Tracker ──────────────────────────────

const activeToasts = new Set<string>();

// ─── Show Toast ──────────────────────────────────────────────

export function showToast(
  type: ToastType,
  message: string,
  options?: ToastOptions
): string | number {
  const duration = options?.duration ?? 5000;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sonnerOptions: Record<string, any> = {
    duration,
    closeButton: options?.closeButton ?? true,
    description: options?.description,
    className: options?.className,
    position: options?.position,
    onDismiss: options?.onDismiss,
    id: options?.id,
    important: options?.important,
  };

  if (options?.action) {
    sonnerOptions.action = options.action;
  }

  if (options?.cancel) {
    sonnerOptions.cancel = options.cancel;
  }

  // Prevent duplicate toasts with the same ID
  if (options?.id && activeToasts.has(options.id)) {
    return options.id;
  }

  let toastId: string | number;

  switch (type) {
    case 'success':
      toastId = toast.success(message, sonnerOptions);
      break;
    case 'error':
      toastId = toast.error(message, sonnerOptions);
      break;
    case 'warning':
      toastId = toast.warning(message, sonnerOptions);
      break;
    case 'info':
      toastId = toast.info(message, sonnerOptions);
      break;
    case 'loading':
      toastId = toast.loading(message, { description: options?.description });
      break;
    default:
      toastId = toast(message, sonnerOptions);
  }

  if (options?.id) {
    activeToasts.add(options.id);
    setTimeout(() => activeToasts.delete(options.id!), duration + 1000);
  }

  return toastId;
}

// ─── Dismiss Toast ──────────────────────────────────────────

export function dismissToast(toastId?: string | number) {
  toast.dismiss(toastId);
}

// ─── Dismiss All Toasts ─────────────────────────────────────

export function dismissAllToasts() {
  toast.dismiss();
  activeToasts.clear();
}

// ─── Promise Toast ──────────────────────────────────────────

interface PromiseToastData<T = unknown> {
  loading: string;
  success: string | ((data: T) => string);
  error: string | ((error: Error) => string);
}

export function showPromiseToast<T = unknown>(
  promise: Promise<T>,
  messages: PromiseToastData<T>,
  options?: ToastOptions
) {
  return toast.promise(promise, {
    loading: messages.loading,
    success: messages.success,
    error: messages.error,
    duration: options?.duration ?? 5000,
    closeButton: options?.closeButton ?? true,
    position: options?.position,
  });
}

// ─── Convenience Methods ─────────────────────────────────────

export const toastSuccess = (message: string, options?: ToastOptions) =>
  showToast('success', message, options);

export const toastError = (message: string, options?: ToastOptions) =>
  showToast('error', message, options);

export const toastWarning = (message: string, options?: ToastOptions) =>
  showToast('warning', message, options);

export const toastInfo = (message: string, options?: ToastOptions) =>
  showToast('info', message, options);

export const toastLoading = (message: string, options?: ToastOptions) =>
  showToast('loading', message, options);

// ─── Domain-Specific Notifications ──────────────────────────

export const notificationToasts = {
  created: (entityName: string) =>
    toastSuccess(`${entityName} created`, {
      description: `The ${entityName.toLowerCase()} has been created successfully.`,
    }),

  updated: (entityName: string) =>
    toastSuccess(`${entityName} updated`, {
      description: `The ${entityName.toLowerCase()} has been updated successfully.`,
    }),

  deleted: (entityName: string) =>
    toastSuccess(`${entityName} deleted`, {
      description: `The ${entityName.toLowerCase()} has been deleted successfully.`,
    }),

  createFailed: (entityName: string, error?: string) =>
    toastError(`Failed to create ${entityName.toLowerCase()}`, {
      description: error || `An error occurred while creating the ${entityName.toLowerCase()}.`,
    }),

  updateFailed: (entityName: string, error?: string) =>
    toastError(`Failed to update ${entityName.toLowerCase()}`, {
      description: error || `An error occurred while updating the ${entityName.toLowerCase()}.`,
    }),

  deleteFailed: (entityName: string, error?: string) =>
    toastError(`Failed to delete ${entityName.toLowerCase()}`, {
      description: error || `An error occurred while deleting the ${entityName.toLowerCase()}.`,
    }),

  networkError: () =>
    toastError('Network error', {
      description: 'Unable to connect to the server. Please check your internet connection.',
      duration: 7000,
    }),

  serverError: () =>
    toastError('Server error', {
      description: 'Something went wrong on our end. Please try again later.',
      duration: 7000,
    }),

  requestTimeout: () =>
    toastError('Request timed out', {
      description: 'The request took too long to complete. Please try again.',
      duration: 6000,
    }),

  rateLimited: () =>
    toastWarning('Too many requests', {
      description: 'Please wait a moment before trying again.',
      duration: 6000,
    }),

  dataRefreshed: () =>
    toastInfo('Data refreshed', {
      description: 'The latest data has been loaded.',
      duration: 3000,
    }),

  changesSaved: () =>
    toastSuccess('Changes saved', {
      description: 'Your changes have been saved successfully.',
    }),

  changesDiscarded: () =>
    toastWarning('Changes discarded', {
      description: 'Unsaved changes have been discarded.',
    }),

  uploadStarted: (fileName: string) =>
    toastLoading(`Uploading ${fileName}...`),

  uploadComplete: (fileName: string) =>
    toastSuccess('Upload complete', {
      description: `${fileName} has been uploaded successfully.`,
    }),

  uploadFailed: (fileName: string, error?: string) =>
    toastError('Upload failed', {
      description: error || `Failed to upload ${fileName}. Please try again.`,
    }),

  validationError: (message: string) =>
    toastError('Validation error', {
      description: message,
      duration: 6000,
    }),

  confirmAction: (message: string, onConfirm: () => void) =>
    toastWarning(message, {
      duration: 8000,
      action: {
        label: 'Confirm',
        onClick: onConfirm as (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
      },
      cancel: {
        label: 'Cancel',
      },
    }),
};

// ─── Auth-Specific Toasts ──────────────────────────────────

export const authToasts = {
  loginSuccess: () =>
    toastSuccess('Welcome back!', {
      description: 'You have been logged in successfully.',
    }),

  loginError: (message: string) =>
    toastError('Login failed', {
      description: message || 'Invalid credentials. Please try again.',
    }),

  registerSuccess: () =>
    toastSuccess('Account created!', {
      description: 'Your business account has been created successfully.',
    }),

  registerError: (message: string) =>
    toastError('Registration failed', {
      description: message || 'Please check your information and try again.',
    }),

  logoutSuccess: () =>
    toastInfo('Logged out', {
      description: 'You have been logged out successfully.',
    }),

  forgotPasswordSuccess: () =>
    toastSuccess('Reset link sent!', {
      description: 'Please check your email for the reset link.',
    }),

  forgotPasswordError: (message: string) =>
    toastError('Failed to send reset email', {
      description: message || 'Please try again later.',
    }),

  resetPasswordSuccess: () =>
    toastSuccess('Password reset!', {
      description: 'Your password has been reset successfully.',
    }),

  resetPasswordError: (message: string) =>
    toastError('Password reset failed', {
      description: message || 'Please try again.',
    }),

  verifyEmailSuccess: () =>
    toastSuccess('Email verified!', {
      description: 'Your email has been verified successfully.',
    }),

  verifyEmailError: (message: string) =>
    toastError('Verification failed', {
      description: message || 'The verification link is invalid or expired.',
    }),

  sessionExpired: () =>
    toastWarning('Session expired', {
      description: 'Please login again to continue.',
      duration: 7000,
    }),

  networkError: () =>
    toastError('Network error', {
      description: 'Unable to connect to the server. Please check your internet connection.',
      duration: 7000,
    }),
};

export default showToast;