'use client';


import { ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OnboardingStepperProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
  onPreview?: () => void;
}

export function OnboardingStepper({
  currentStep,
  totalSteps,
  onNext,
  onBack,
  onPreview}: OnboardingStepperProps) {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="w-full space-y-4">
      {/* Progress bar */}
      <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-blue-600 to-blue-700 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Navigation buttons */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          disabled={currentStep === 0}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-lg transition-colors',
            currentStep === 0
              ? 'invisible'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
          )}
        >
          <ChevronLeft className="h-5 w-5" />
          <span className="text-sm font-medium">Back</span>
        </button>

        <div className="flex items-center gap-2">
          {onPreview && (
            <button
              onClick={onPreview}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Eye className="h-5 w-5" />
              <span className="text-sm font-medium">Preview</span>
            </button>
          )}
          <button
            onClick={onNext}
            className="flex items-center gap-2 px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transition-colors"
          >
            <span className="text-sm font-medium">
              {currentStep === totalSteps - 1 ? 'Finish' : 'Next'}
            </span>
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
