// ============================================================
// CARTICOM — Verify Email
// ============================================================

'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Loader2, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import authService from '@/features/auth/services/auth.service';
import { EmailVerificationStatus } from '@/features/auth/types';
import { authToasts } from '@/features/auth/hooks/useToast';

type VerificationState =
  | { status: EmailVerificationStatus.PENDING }
  | { status: EmailVerificationStatus.VERIFIED }
  | { status: EmailVerificationStatus.EXPIRED }
  | { status: EmailVerificationStatus.INVALID_TOKEN; error?: string }
  | { status: 'LOADING' }
  | { status: 'ERROR'; message: string };

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') ?? '';
  const [state, setState] = useState<VerificationState>(() =>
    token
      ? { status: 'LOADING' }
      : { status: EmailVerificationStatus.INVALID_TOKEN, error: 'No verification token provided' }
  );
  const [resending, setResending] = useState(false);
  const [resent, setResent] = useState(false);

  useEffect(() => {
    if (!token) return;

    const verifyEmail = async () => {
      try {
        const dto = { token };
        await authService.verifyEmail(dto);
        setState({ status: EmailVerificationStatus.VERIFIED });
        authToasts.verifyEmailSuccess();
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'Verification failed';

        if (message.toLowerCase().includes('expired')) {
          setState({ status: EmailVerificationStatus.EXPIRED });
        } else {
          setState({
            status: EmailVerificationStatus.INVALID_TOKEN,
            error: message});
        }
        authToasts.verifyEmailError(message);
      }
    };

    verifyEmail();
  }, [token]);

  // ─── Loading ─────────────────────────────────────────────
  if (state.status === 'LOADING') {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" aria-hidden="true" />
        <h2 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">
          Verifying your email...
        </h2>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Please wait while we verify your email address.
        </p>
      </div>
    );
  }

  // ─── Verified ────────────────────────────────────────────
  if (state.status === EmailVerificationStatus.VERIFIED) {
    return (
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 dark:bg-green-900/20">
          <CheckCircle className="h-8 w-8 text-blue-500" aria-hidden="true" />
        </div>
        <h2 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">
          Email Verified Successfully
        </h2>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Your email address has been verified. You can now access all features
          of your Carticom account.
        </p>
        <div className="mt-8">
          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:from-blue-700 hover:to-blue-800"
          >
            Continue to Login
          </Link>
        </div>
      </div>
    );
  }

  // ─── Expired ─────────────────────────────────────────────
  if (state.status === EmailVerificationStatus.EXPIRED) {
    return (
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-50 dark:bg-amber-900/20">
          <Clock className="h-8 w-8 text-amber-500" aria-hidden="true" />
        </div>
        <h2 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">
          Verification Link Expired
        </h2>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          This verification link has expired. Please request a new verification
          email.
        </p>
        <div className="mt-8">
          <button
            type="button"
            disabled={resending}
            onClick={async () => {
              setResending(true);
              try {
                await authService.resendVerification();
                setResent(true);
              } catch {
                setState({
                  status: 'ERROR',
                  message: 'Failed to resend verification email. Please make sure you are logged in and try again.'});
              } finally {
                setResending(false);
              }
            }}
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:from-blue-700 hover:to-blue-800 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {resending ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Sending...
              </>
            ) : resent ? (
              'Verification Email Sent'
            ) : (
              'Resend Verification Email'
            )}
          </button>
          {resent && (
            <p className="mt-3 text-sm text-green-600 dark:text-green-400">
              A new verification link has been sent to your email address.
            </p>
          )}
        </div>
      </div>
    );
  }

  // ─── Invalid Token ───────────────────────────────────────
  return (
    <div className="text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 dark:bg-red-900/20">
        <AlertCircle className="h-8 w-8 text-red-500" aria-hidden="true" />
      </div>
      <h2 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">
        Verification Failed
      </h2>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        {state.status === EmailVerificationStatus.INVALID_TOKEN
          ? state.error ?? 'Invalid verification token.'
          : 'An error occurred during verification.'}
      </p>
      <div className="mt-8">
        <Link
          href="/login"
          className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:from-blue-700 hover:to-blue-800"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
}

// ─── Verify Email Page ───────────────────────────────────────

export default function VerifyEmailPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 dark:bg-gray-950">
      <div className="mx-auto w-full max-w-md">
        <Suspense
          fallback={
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          }
        >
          <VerifyEmailContent />
        </Suspense>
      </div>
    </div>
  );
}