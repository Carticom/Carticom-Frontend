// ============================================================
// CARTICOM ONBOARDING — Zod Validation Schemas
// ============================================================

import { z } from 'zod';

// ─── Business Info ────────────────────────────────────────────

export const businessInfoSchema = z.object({
  businessName: z.string().min(2, 'Business name must be at least 2 characters'),
  businessCategory: z.string().min(2, 'Please select a business category'),
  phone: z.string().min(6, 'Please enter a valid phone number'),
  email: z.string().email('Please enter a valid email'),
  address: z.string().optional(),
  description: z.string().max(500, 'Description must be under 500 characters').optional(),
});

export type BusinessInfoFormData = z.infer<typeof businessInfoSchema>;

// ─── Store Branding ───────────────────────────────────────────

export const storeBrandingSchema = z.object({
  storeName: z.string().min(2, 'Store name must be at least 2 characters'),
  slug: z
    .string()
    .min(2, 'Slug must be at least 2 characters')
    .regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
  themeColor: z.string().regex(/^#[0-9a-fA-F]{6}$/, 'Must be a valid hex color'),
  storeVisibility: z.boolean(),
  maintenanceMode: z.boolean(),
});

export type StoreBrandingFormData = z.infer<typeof storeBrandingSchema>;

// ─── First Product ────────────────────────────────────────────

export const firstProductSchema = z.object({
  name: z.string().min(2, 'Product name must be at least 2 characters'),
  description: z.string().max(1000).optional(),
  price: z.string().min(1, 'Price is required'),
  quantity: z.string().min(1, 'Quantity is required'),
});

export type FirstProductFormData = z.infer<typeof firstProductSchema>;

// ─── Invite Staff ─────────────────────────────────────────────

export const inviteStaffSchema = z.object({
  emails: z
    .array(
      z.object({
        value: z.string().email('Invalid email').optional().or(z.literal('')),
      })
    )
    .optional()
    .default([]),
});

export type InviteStaffFormData = z.infer<typeof inviteStaffSchema>;

// ─── Subscription ─────────────────────────────────────────────

export const subscriptionSchema = z.object({
  planId: z.string().min(1, 'Please select a plan'),
  billingCycle: z.enum(['MONTHLY', 'YEARLY']).default('MONTHLY'),
  autoRenewal: z.boolean().default(true),
});

export type SubscriptionFormData = z.infer<typeof subscriptionSchema>;