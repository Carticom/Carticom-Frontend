'use client';


import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Brain, MessageCircle, CheckCircle } from 'lucide-react';

interface AIStepProps {
  onNext: () => void;
  onBack: () => void;
}

export function AIStep({ onNext, onBack }: AIStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Carticom AI
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Enable AI-powered customer service
        </p>
      </div>

      <div className="space-y-4">
        <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
          <div className="flex items-start gap-4">
            <Brain className="h-8 w-8 text-purple-600 dark:text-purple-400 mt-1" />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                What is Carticom AI?
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Carticom AI allows your customers to place orders directly through WhatsApp. Our AI assistant handles customer inquiries, takes orders, and processes payments automatically.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  24/7 customer support
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Automated order processing
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Multi-language support
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-800">
          <div className="flex items-start gap-4">
            <MessageCircle className="h-8 w-8 text-green-600 dark:text-green-400 mt-1" />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                WhatsApp Integration
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Connect your WhatsApp Business account to enable AI-powered ordering. Customers can browse products, ask questions, and place orders directly in WhatsApp.
              </p>
              <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong>Status:</strong> <span className="text-gray-500">Coming soon</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  AI features will be available in a future update
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-lg border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/20">
          <p className="text-sm text-blue-800 dark:text-blue-300">
            💡 <strong>Tip:</strong> Carticom AI is available on Pro and Enterprise plans. You can try it free for 14 days!
          </p>
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button
          onClick={onNext}
          className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
        >
          Continue
        </Button>
      </div>
    </motion.div>
  );
}