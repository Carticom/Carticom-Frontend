// ============================================================
// CARTICOM AUTHENTICATION — Zod Validation Schemas
// ============================================================

import { z } from 'zod';

// ─── Password Rules ──────────────────────────────────────────

const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(
    /[^A-Za-z0-9]/,
    'Password must contain at least one special character'
  );

// ─── Phone Number ────────────────────────────────────────────

const phoneSchema = z
  .string()
  .min(10, 'Phone number must be at least 10 digits')
  .regex(/^\+?[\d\s\-()]{10}$/, 'Please enter a valid phone number');

// ─── Email ───────────────────────────────────────────────────

const emailSchema = z
  .string()
  .email('Please enter a valid email address')
  .min(1, 'Email is required')
  .transform((email) => email.toLowerCase().trim());

// ─── Register Business Owner ─────────────────────────────────

export const registerBusinessOwnerSchema = z
  .object({
    fullName: z
      .string()
      .min(2, 'Full name must be at least 2 characters')
      .max(100, 'Full name must not exceed 100 characters')
      .regex(/^[a-zA-Z\s\-']+$/, 'Full name can only contain letters, spaces, hyphens, and apostrophes'),
    businessName: z
      .string()
      .min(2, 'Business name must be at least 2 characters')
      .max(200, 'Business name must not exceed 200 characters'),
    email: emailSchema,
    phone: phoneSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'Please confirm your password')})
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']});

export type RegisterBusinessOwnerSchema = z.infer<
  typeof registerBusinessOwnerSchema
>;

// ─── Login ───────────────────────────────────────────────────

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required')});

export type LoginSchema = z.infer<typeof loginSchema>;

// ─── Forgot Password ─────────────────────────────────────────

export const forgotPasswordSchema = z.object({
  email: emailSchema});

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

// ─── Reset Password ──────────────────────────────────────────

export const resetPasswordSchema = z.object({
  email: emailSchema,
  token: z.string().min(1, 'Reset token is required'),
  newPassword: passwordSchema});

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

// ─── Verify Email ────────────────────────────────────────────

export const verifyEmailSchema = z.object({
  token: z.string().min(1, 'Verification token is required')});

export type VerifyEmailSchema = z.infer<typeof verifyEmailSchema>;