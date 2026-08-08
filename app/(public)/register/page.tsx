// ============================================================
// CARTICOM — Register (Business Owner Only)
// ============================================================

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';
import { AuthLayout } from '@/features/auth/components/AuthLayout';
import { registerBusinessOwnerSchema } from '@/features/auth/schemas';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { authToasts } from '@/features/auth/hooks/useToast';
import type { RegisterBusinessOwnerSchema } from '@/features/auth/schemas';

export default function RegisterPage() {
  const { register: authRegister } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }} = useForm<RegisterBusinessOwnerSchema>({
    resolver: zodResolver(registerBusinessOwnerSchema),
    defaultValues: {
      fullName: '',
      businessName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''}});

  const onSubmit = async (data: RegisterBusinessOwnerSchema) => {
    setServerError(null);
    const result = await authRegister({
      fullName: data.fullName,
      businessName: data.businessName,
      email: data.email,
      phone: data.phone,
      password: data.password});

    if (result.success) {
      authToasts.registerSuccess();
      // On success, the useAuth hook handles redirect via login
    } else {
      const errorMessage = result.error ?? 'Registration failed. Please try again.';
      setServerError(errorMessage);
      authToasts.registerError(errorMessage);
    }
  };

  return (
    <AuthLayout
      title="Create your business account"
      subtitle="Start your 30-day free trial. No credit card required."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
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

        {/* Full Name */}
        <div>
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            autoComplete="name"
            {...register('fullName')}
            className={`mt-1 block w-full rounded-xl border px-4 py-2.5 text-sm shadow-sm transition-colors placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 ${
              errors.fullName
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 dark:border-gray-700'
            }`}
            placeholder="John Doe"
            aria-invalid={errors.fullName ? 'true' : 'false'}
            aria-describedby={errors.fullName ? 'fullName-error' : undefined}
          />
          {errors.fullName && (
            <p id="fullName-error" className="mt-1 text-xs text-red-500">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Business Name */}
        <div>
          <label
            htmlFor="businessName"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Business Name
          </label>
          <input
            id="businessName"
            type="text"
            autoComplete="organization"
            {...register('businessName')}
            className={`mt-1 block w-full rounded-xl border px-4 py-2.5 text-sm shadow-sm transition-colors placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 ${
              errors.businessName
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 dark:border-gray-700'
            }`}
            placeholder="TechWorld Africa Ltd"
            aria-invalid={errors.businessName ? 'true' : 'false'}
            aria-describedby={errors.businessName ? 'businessName-error' : undefined}
          />
          {errors.businessName && (
            <p id="businessName-error" className="mt-1 text-xs text-red-500">
              {errors.businessName.message}
            </p>
          )}
        </div>

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
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <p id="email-error" className="mt-1 text-xs text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            {...register('phone')}
            className={`mt-1 block w-full rounded-xl border px-4 py-2.5 text-sm shadow-sm transition-colors placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 ${
              errors.phone
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 dark:border-gray-700'
            }`}
            placeholder="+234 800 000 0000"
            aria-invalid={errors.phone ? 'true' : 'false'}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
          />
          {errors.phone && (
            <p id="phone-error" className="mt-1 text-xs text-red-500">
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Password
          </label>
          <div className="relative mt-1">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              {...register('password')}
              className={`block w-full rounded-xl border px-4 py-2.5 pr-10 text-sm shadow-sm transition-colors placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 ${
                errors.password
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300 dark:border-gray-700'
              }`}
              placeholder="Min. 8 characters"
              aria-invalid={errors.password ? 'true' : 'false'}
              aria-describedby={errors.password ? 'password-error' : undefined}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Eye className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          </div>
          {errors.password && (
            <p id="password-error" className="mt-1 text-xs text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Confirm Password
          </label>
          <div className="relative mt-1">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              autoComplete="new-password"
              {...register('confirmPassword')}
              className={`block w-full rounded-xl border px-4 py-2.5 pr-10 text-sm shadow-sm transition-colors placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 ${
                errors.confirmPassword
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300 dark:border-gray-700'
              }`}
              placeholder="Repeat your password"
              aria-invalid={errors.confirmPassword ? 'true' : 'false'}
              aria-describedby={
                errors.confirmPassword ? 'confirmPassword-error' : undefined
              }
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              aria-label={
                showConfirmPassword ? 'Hide password' : 'Show password'
              }
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Eye className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p id="confirmPassword-error" className="mt-1 text-xs text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Password Requirements Hint */}
        <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50">
          <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
            Password must contain:
          </p>
          <ul className="mt-1 space-y-0.5 text-xs text-gray-500 dark:text-gray-400">
            <li>At least 8 characters</li>
            <li>One uppercase letter</li>
            <li>One lowercase letter</li>
            <li>One number</li>
            <li>One special character</li>
          </ul>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:from-blue-700 hover:to-cyan-700 hover:shadow-blue-500/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Creating account...
            </>
          ) : (
            'Create Business Account'
          )}
        </button>
      </form>

      {/* Footer Link */}
      <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
        Already have an account?{' '}
        <Link
          href="/login"
          className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
        >
          Login
        </Link>
      </p>
    </AuthLayout>
  );
}