'use client';


import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Crown, Check, Zap } from 'lucide-react';

interface SubscriptionStepProps {
  onNext: () => void;
  onBack: () => void;
}

export function SubscriptionStep({ onNext, onBack }: SubscriptionStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Choose Your Plan
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Your 30-day free trial includes every feature - no credit card required. Upgrade anytime.
        </p>
      </div>

      <div className="space-y-4">
        {/* Free Plan */}
        <div className="p-6 rounded-lg border-2 border-blue-600 dark:border-blue-500 bg-blue-50 dark:bg-blue-900/20">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Crown className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Free Trial
                </h3>
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                30 days<span className="text-lg text-gray-600 dark:text-gray-400"> free</span>
              </p>
            </div>
            <div className="px-3 py-1 rounded-full bg-blue-600 text-white text-sm font-medium">
              Current Plan
            </div>
          </div>

          <ul className="space-y-3 mb-6">
            <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <Check className="h-4 w-4 text-green-600" />
              Unlimited-length feature access for 30 days
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <Check className="h-4 w-4 text-green-600" />
              Basic analytics
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <Check className="h-4 w-4 text-green-600" />
              Standard support
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <Check className="h-4 w-4 text-green-600" />
              1 staff member
            </li>
          </ul>

          <Button variant="outline" className="w-full" disabled>
            Current Plan
          </Button>
        </div>

        {/* Upgrade info */}
        <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
            Upgrade to unlock more features:
          </h4>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <Zap className="h-4 w-4 text-yellow-600" />
              Carticom AI (WhatsApp ordering)
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <Zap className="h-4 w-4 text-yellow-600" />
              Unlimited products
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <Zap className="h-4 w-4 text-yellow-600" />
              Advanced analytics
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <Zap className="h-4 w-4 text-yellow-600" />
              Multiple staff members
            </li>
          </ul>
        </div>

        <div className="p-4 rounded-lg border border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-900/20">
          <p className="text-sm text-amber-800 dark:text-amber-300">
            ℹ️ <strong>Note:</strong> You can upgrade your plan anytime from the dashboard. Start with the free tier and upgrade when you need more features!
          </p>
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button
          onClick={onNext}
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
        >
          Continue
        </Button>
      </div>
    </motion.div>
  );
}