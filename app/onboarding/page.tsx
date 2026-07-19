'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthGuard } from '@/features/auth/components/AuthGuard';

function OnboardingRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.push('/dashboard');
  }, [router]);

  return null;
}

export default function OnboardingPage() {
  return (
    <AuthGuard>
      <OnboardingRedirect />
    </AuthGuard>
  );
}