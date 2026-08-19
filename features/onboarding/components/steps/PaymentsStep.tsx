'use client';


import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CreditCard, CheckCircle } from 'lucide-react';

interface PaymentsStepProps {
  onNext: () => void;
  onBack: () => void;
}

export function PaymentsStep({ onNext, onBack }: PaymentsStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Payment Setup
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Configure how you&apos;ll receive payments
        </p>
      </div>

      <div className="space-y-4">
        <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
          <div className="flex items-start gap-4">
            <CreditCard className="h-8 w-8 text-blue-600 dark:text-blue-400 mt-1" />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Why Payment Setup Matters
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Setting up payments allows you to receive money securely from customers. Carticom supports multiple payment providers to make transactions seamless for you and your customers.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Secure payment processing
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Automatic escrow protection
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Multiple payment methods
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-800">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
            Supported Payment Providers
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
              <p className="font-medium text-gray-900 dark:text-white">Paystack</p>
              <p className="text-sm text-gray-500">Cards, Bank Transfer, USSD</p>
            </div>
            <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
              <p className="font-medium text-gray-900 dark:text-white">Flutterwave</p>
              <p className="text-sm text-gray-500">Cards, Mobile Money</p>
            </div>
            <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
              <p className="font-medium text-gray-900 dark:text-white">Bank Transfer</p>
              <p className="text-sm text-gray-500">Direct bank payments</p>
            </div>
            <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
              <p className="font-medium text-gray-900 dark:text-white">Cash on Delivery</p>
              <p className="text-sm text-gray-500">Pay when you receive</p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-lg border border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-900/20">
          <p className="text-sm text-amber-800 dark:text-amber-300">
            ℹ️ <strong>Note:</strong> You can connect payment providers later from your dashboard settings. This step is optional for now.
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