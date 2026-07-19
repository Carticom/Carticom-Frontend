'use client';

import React from 'react';

interface OnboardingShellProps {
  children: React.ReactNode;
}

export function OnboardingShell({ children }: OnboardingShellProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Business Setup
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Complete the following steps to launch your business
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}
