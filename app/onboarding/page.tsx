'use client';

import { OnboardingWizard } from '@/features/onboarding/components/OnboardingWizard';
import { AuthGuard } from '@/features/auth/components/AuthGuard';

export default function OnboardingPage() {
  return (
    <AuthGuard>
      <OnboardingWizard />
    </AuthGuard>
  );
}