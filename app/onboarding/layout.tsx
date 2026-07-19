import { Metadata } from 'next';
import { OnboardingShell } from '@/features/onboarding/components/OnboardingShell';

export const metadata: Metadata = {
  title: 'Business Setup | Carticom',
  description: 'Complete your business setup',
};

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <OnboardingShell>{children}</OnboardingShell>;
}