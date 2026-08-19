// ============================================================
// CARTICOM — Forgot Password
// ============================================================

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, AlertCircle, Mail, ArrowLeft } from 'lucide-react';
import { AuthLayout } from '@/features/auth/components/AuthLayout';
import { forgotPasswordSchema } from '@/features/auth/schemas';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { authToasts } from '@/features/auth/hooks/useToast';
import type { ForgotPasswordSchema } from '@/features/auth/schemas';

export default function ForgotPasswordPage() {
  const { forgotPassword } = useAuth();
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }} = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: ''}});

  const onSubmit = async (data: ForgotPasswordSchema) => {
    setServerError(null);
    const result = await forgotPassword({ email: data.email });

    if (result.success) {
      setIsSuccess(true);
      authToasts.forgotPasswordSuccess();
    } else {
      const errorMessage = result.error ?? 'Failed to send reset email. Please try again.';
      setServerError(errorMessage);
      authToasts.forgotPasswordError(errorMessage);
    }
  };

  return (
    <AuthLayout
      title="Reset your password"
      subtitle="Enter your email address and we'll send you a reset link"
      hideSocialProof
    >
      {isSuccess ? (
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 dark:bg-green-900/20">
            <Mail className="h-8 w-8 text-blue-500" aria-hidden="true" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Check your email
          </h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            We&apos;ve sent a password reset link to your email. Please check
            your inbox and follow the instructions.
          </p>
          <p className="mt-4 text-xs text-gray-400 dark:text-gray-500">
            Didn&apos;t receive the email? Check your spam folder or{' '}
            <button
              type="button"
              onClick={() => setIsSuccess(false)}
              className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
            >
              try again
            </button>
          </p>
        </div>
      ) : (
        <>
          {/* Server Error */}
          {serverError && (
            <div
              className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/30 dark:text-red-400"
              role="alert"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <p>{serverError}</p>
            </div>
          )}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
            noValidate
          >
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                {...register('email')}
                className={`mt-1 block w-full rounded-xl border px-4 py-2.5 text-sm shadow-sm transition-colors placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 ${
                  errors.email
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                    : 'border-gray-300 dark:border-gray-700'
                }`}
                placeholder="hello@techworld.africa"
                autoFocus
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <p id="email-error" className="mt-1 text-xs text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:from-blue-700 hover:to-blue-800 hover:shadow-blue-500/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Sending reset link...
                </>
              ) : (
                'Send Reset Link'
              )}
            </button>
          </form>

          {/* Back to Login */}
          <div className="mt-6 text-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to login
            </Link>
          </div>
        </>
      )}
    </AuthLayout>
  );
}