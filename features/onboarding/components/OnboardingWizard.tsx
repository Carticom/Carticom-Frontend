'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { OnboardingShell } from './OnboardingShell';
import { OnboardingStepper } from './OnboardingStepper';
import { WelcomeStep } from './steps/WelcomeStep';
import { BusinessInfoStep } from './steps/BusinessInfoStep';
import { StoreSetupStep } from './steps/StoreSetupStep';
import { StoreBrandingStep } from './steps/StoreBrandingStep';
import { TemplateSelectStep } from './steps/TemplateSelectStep';
import { FirstProductStep } from './steps/FirstProductStep';
import { PaymentsStep } from './steps/PaymentsStep';
import { SubscriptionStep } from './steps/SubscriptionStep';
import { AIStep } from './steps/AIStep';
import { CompletionStep } from './steps/CompletionStep';
import type { BusinessInfoFormData } from '@/features/onboarding/schemas';
import type { StoreDto } from '@/features/onboarding/types';

const STEPS = [
  'welcome',
  'business-info',
  'store-setup',
  'store-branding',
  'template',
  'first-product',
  'payments',
  'subscription',
  'ai',
  'complete',
] as const;

export function OnboardingWizard() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = STEPS.length;
  const [store, setStore] = useState<StoreDto | null>(null);
  const [category, setCategory] = useState('');

  const goNext = useCallback(() => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((s) => s + 1);
    }
  }, [currentStep, totalSteps]);

  const goBack = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
    }
  }, []);

  const finish = useCallback(() => {
    router.push('/dashboard');
  }, [router]);

  const renderStep = () => {
    const step = STEPS[currentStep];
    switch (step) {
      case 'welcome':
        return <WelcomeStep key="welcome" onNext={goNext} />;
      case 'business-info':
        return (
          <BusinessInfoStep
            key="business-info"
            onNext={goNext}
            onBack={goBack}
            onSave={(data: BusinessInfoFormData) => setCategory(data.businessCategory)}
          />
        );
      case 'store-setup':
        return (
          <StoreSetupStep
            key="store-setup"
            onNext={goNext}
            onBack={goBack}
            store={store}
            onStoreUpdated={(s: StoreDto) => setStore(s)}
          />
        );
      case 'store-branding':
        return (
          <StoreBrandingStep
            key="store-branding"
            onNext={goNext}
            onBack={goBack}
            storeId={store?.id}
            onStoreCreated={(s: StoreDto) => setStore(s)}
          />
        );
      case 'template':
        return (
          <TemplateSelectStep
            key="template"
            category={category}
            onSelect={() => {}}
            onNext={goNext}
            onBack={goBack}
          />
        );
      case 'first-product':
        return (
          <FirstProductStep
            key="first-product"
            storeId={store?.id}
            onNext={goNext}
            onBack={goBack}
            onProductCreated={() => {}}
          />
        );
      case 'payments':
        return <PaymentsStep key="payments" onNext={goNext} onBack={goBack} />;
      case 'subscription':
        return <SubscriptionStep key="subscription" onNext={goNext} onBack={goBack} />;
      case 'ai':
        return <AIStep key="ai" onNext={goNext} onBack={goBack} />;
      case 'complete':
        return <CompletionStep key="complete" onComplete={finish} />;
      default:
        return null;
    }
  };

  return (
    <OnboardingShell>
      <OnboardingStepper
        currentStep={currentStep}
        totalSteps={totalSteps}
        onNext={goNext}
        onBack={goBack}
      />
      <div className="pt-8">
        {renderStep()}
      </div>
    </OnboardingShell>
  );
}
